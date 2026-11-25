-- ============================================================================
-- Mindware Consulting Ltd — Hardening, Atomic RPCs, Outbox & Newsletter Consent
-- Migration: 002_hardening_and_outbox.sql
-- ============================================================================
-- Run AFTER 001_initial_schema.sql in Supabase SQL Editor. Idempotent on rerun.
-- Provides:
--   1. Function search_path hardening on public.set_updated_at()
--   2. Newsletter consent, backfill & unsubscribe consistency constraints
--   3. Durable notification_outbox table + stale-processing index
--   4. Atomic PostgreSQL RPCs with 64-bit advisory locks
--   5. Concurrency-safe FOR UPDATE SKIP LOCKED outbox claiming + stale recovery
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 0. Harden shared trigger function search_path
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.set_updated_at() FROM PUBLIC, anon, authenticated;

-- ----------------------------------------------------------------------------
-- 1. Newsletter Consent & Unsubscribe Lifecycle Columns
-- ----------------------------------------------------------------------------
ALTER TABLE public.newsletter_subscribers
  ADD COLUMN IF NOT EXISTS unsubscribed_at timestamptz NULL,
  ADD COLUMN IF NOT EXISTS consented_at timestamptz NOT NULL DEFAULT now(),
  ADD COLUMN IF NOT EXISTS consent_source text NOT NULL DEFAULT '' CHECK (char_length(consent_source) <= 80),
  ADD COLUMN IF NOT EXISTS marketing_opt_in boolean NOT NULL DEFAULT true;

-- Backfill any pre-existing unsubscribed rows from 001_initial_schema safely
UPDATE public.newsletter_subscribers
SET
  marketing_opt_in = false,
  unsubscribed_at = coalesce(unsubscribed_at, updated_at, now())
WHERE status = 'unsubscribed'
  AND (marketing_opt_in = true OR unsubscribed_at IS NULL);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'chk_newsletter_opt_in_consistency'
      AND conrelid = 'public.newsletter_subscribers'::regclass
  ) THEN
    ALTER TABLE public.newsletter_subscribers
      ADD CONSTRAINT chk_newsletter_opt_in_consistency CHECK (
        (status = 'unsubscribed' AND marketing_opt_in = false AND unsubscribed_at IS NOT NULL)
        OR
        (status = 'active' AND unsubscribed_at IS NULL)
      );
  END IF;
END;
$$;

CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_active_marketing
  ON public.newsletter_subscribers (last_subscribed_at DESC)
  WHERE status = 'active' AND marketing_opt_in = true AND unsubscribed_at IS NULL;

-- ----------------------------------------------------------------------------
-- 2. Durable Notification Outbox
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.notification_outbox (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),

  entity_type text NOT NULL CHECK (
    entity_type IN ('business_enquiry', 'career_application', 'newsletter_subscriber')
  ),
  entity_reference_id text NOT NULL CHECK (char_length(trim(entity_reference_id)) >= 2 AND char_length(entity_reference_id) <= 160),
  channel text NOT NULL CHECK (channel IN ('email', 'webhook')),
  idempotency_key text NOT NULL UNIQUE CHECK (char_length(trim(idempotency_key)) >= 4 AND char_length(idempotency_key) <= 200),

  recipient text NOT NULL DEFAULT '' CHECK (char_length(recipient) <= 320),
  subject text NOT NULL DEFAULT '' CHECK (char_length(subject) <= 300),
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,

  status text NOT NULL DEFAULT 'pending' CHECK (
    status IN ('pending', 'processing', 'delivered', 'retrying', 'dead_letter')
  ),
  attempt_count integer NOT NULL DEFAULT 0 CHECK (attempt_count >= 0),
  max_attempts integer NOT NULL DEFAULT 5 CHECK (max_attempts >= 1 AND max_attempts <= 10),
  next_attempt_at timestamptz NOT NULL DEFAULT now(),
  last_error text NULL,
  delivered_at timestamptz NULL
);

DROP TRIGGER IF EXISTS trg_notification_outbox_updated_at ON public.notification_outbox;
CREATE TRIGGER trg_notification_outbox_updated_at
  BEFORE UPDATE ON public.notification_outbox
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX IF NOT EXISTS idx_notification_outbox_due
  ON public.notification_outbox (status, next_attempt_at ASC)
  WHERE status IN ('pending', 'retrying');

CREATE INDEX IF NOT EXISTS idx_notification_outbox_stale_processing
  ON public.notification_outbox (updated_at ASC)
  WHERE status = 'processing';

CREATE INDEX IF NOT EXISTS idx_notification_outbox_entity
  ON public.notification_outbox (entity_type, entity_reference_id);

ALTER TABLE public.notification_outbox ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE public.notification_outbox FROM PUBLIC, anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.notification_outbox TO service_role;

-- ----------------------------------------------------------------------------
-- 3. Atomic Business Enquiry Insert + Outbox Enqueue
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.create_business_enquiry_atomic(
  p_reference_id text,
  p_full_name text,
  p_business_name text,
  p_email text,
  p_phone text,
  p_enquiry_category text,
  p_industry_sector text,
  p_campaign_track text,
  p_consultation_topic text,
  p_service_needed text,
  p_engagement_model text,
  p_project_desc text,
  p_submission_source text,
  p_landing_page text,
  p_utm_source text,
  p_utm_medium text,
  p_utm_campaign text,
  p_utm_content text,
  p_utm_term text,
  p_submission_fingerprint text,
  p_email_outbox_recipient text DEFAULT '',
  p_email_outbox_subject text DEFAULT '',
  p_email_outbox_payload jsonb DEFAULT NULL,
  p_webhook_outbox_target text DEFAULT '',
  p_webhook_outbox_payload jsonb DEFAULT NULL
)
RETURNS TABLE (
  record_id uuid,
  reference_id text,
  email_outbox_id uuid,
  webhook_outbox_id uuid
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_record_id uuid;
  v_email_outbox_id uuid := NULL;
  v_webhook_outbox_id uuid := NULL;
BEGIN
  IF coalesce(p_submission_fingerprint, '') <> '' THEN
    PERFORM pg_advisory_xact_lock(hashtextextended(p_submission_fingerprint, 0));

    IF EXISTS (
      SELECT 1
      FROM public.business_enquiries be
      WHERE be.submission_fingerprint = p_submission_fingerprint
        AND be.created_at >= (now() - interval '10 minutes')
    ) THEN
      RAISE EXCEPTION 'DUPLICATE_SUBMISSION' USING ERRCODE = 'P0001';
    END IF;
  END IF;

  INSERT INTO public.business_enquiries (
    reference_id,
    full_name,
    business_name,
    email,
    phone,
    enquiry_category,
    industry_sector,
    campaign_track,
    consultation_topic,
    service_needed,
    engagement_model,
    project_desc,
    submission_source,
    landing_page,
    utm_source,
    utm_medium,
    utm_campaign,
    utm_content,
    utm_term,
    lead_status,
    submission_fingerprint
  )
  VALUES (
    p_reference_id,
    p_full_name,
    coalesce(p_business_name, ''),
    coalesce(p_email, ''),
    coalesce(p_phone, ''),
    p_enquiry_category,
    coalesce(p_industry_sector, ''),
    coalesce(p_campaign_track, ''),
    coalesce(p_consultation_topic, ''),
    coalesce(p_service_needed, ''),
    coalesce(p_engagement_model, ''),
    coalesce(p_project_desc, ''),
    coalesce(p_submission_source, 'contact-page'),
    coalesce(p_landing_page, ''),
    coalesce(p_utm_source, ''),
    coalesce(p_utm_medium, ''),
    coalesce(p_utm_campaign, ''),
    coalesce(p_utm_content, ''),
    coalesce(p_utm_term, ''),
    'new',
    coalesce(p_submission_fingerprint, '')
  )
  RETURNING id INTO v_record_id;

  IF coalesce(p_email_outbox_recipient, '') <> '' AND p_email_outbox_payload IS NOT NULL THEN
    INSERT INTO public.notification_outbox (
      entity_type,
      entity_reference_id,
      channel,
      idempotency_key,
      recipient,
      subject,
      payload,
      status
    )
    VALUES (
      'business_enquiry',
      p_reference_id,
      'email',
      'enq-email-' || p_reference_id,
      p_email_outbox_recipient,
      coalesce(p_email_outbox_subject, ''),
      p_email_outbox_payload,
      'pending'
    )
    ON CONFLICT (idempotency_key) DO NOTHING
    RETURNING id INTO v_email_outbox_id;
  END IF;

  IF coalesce(p_webhook_outbox_target, '') <> '' AND p_webhook_outbox_payload IS NOT NULL THEN
    INSERT INTO public.notification_outbox (
      entity_type,
      entity_reference_id,
      channel,
      idempotency_key,
      recipient,
      subject,
      payload,
      status
    )
    VALUES (
      'business_enquiry',
      p_reference_id,
      'webhook',
      'enq-webhook-' || p_reference_id,
      p_webhook_outbox_target,
      '',
      p_webhook_outbox_payload,
      'pending'
    )
    ON CONFLICT (idempotency_key) DO NOTHING
    RETURNING id INTO v_webhook_outbox_id;
  END IF;

  RETURN QUERY SELECT v_record_id, p_reference_id, v_email_outbox_id, v_webhook_outbox_id;
END;
$$;

-- ----------------------------------------------------------------------------
-- 4. Atomic Career Application Insert + Outbox Enqueue
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.create_career_application_atomic(
  p_reference_id text,
  p_application_mode text,
  p_vacancy_code text,
  p_vacancy_title text,
  p_full_name text,
  p_email text,
  p_phone text,
  p_location text,
  p_discipline text,
  p_engagement_type text,
  p_experience_years text,
  p_portfolio_url text,
  p_cv_file_name text,
  p_cv_submission_method text,
  p_motivation text,
  p_submission_fingerprint text,
  p_email_outbox_recipient text DEFAULT '',
  p_email_outbox_subject text DEFAULT '',
  p_email_outbox_payload jsonb DEFAULT NULL,
  p_webhook_outbox_target text DEFAULT '',
  p_webhook_outbox_payload jsonb DEFAULT NULL
)
RETURNS TABLE (
  record_id uuid,
  reference_id text,
  email_outbox_id uuid,
  webhook_outbox_id uuid
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_record_id uuid;
  v_email_outbox_id uuid := NULL;
  v_webhook_outbox_id uuid := NULL;
BEGIN
  IF coalesce(p_submission_fingerprint, '') <> '' THEN
    PERFORM pg_advisory_xact_lock(hashtextextended(p_submission_fingerprint, 0));

    IF EXISTS (
      SELECT 1
      FROM public.career_applications ca
      WHERE ca.submission_fingerprint = p_submission_fingerprint
        AND ca.created_at >= (now() - interval '10 minutes')
    ) THEN
      RAISE EXCEPTION 'DUPLICATE_SUBMISSION' USING ERRCODE = 'P0001';
    END IF;
  END IF;

  INSERT INTO public.career_applications (
    reference_id,
    application_mode,
    vacancy_code,
    vacancy_title,
    full_name,
    email,
    phone,
    location,
    discipline,
    engagement_type,
    experience_years,
    portfolio_url,
    cv_file_name,
    cv_submission_method,
    motivation,
    application_status,
    submission_fingerprint
  )
  VALUES (
    p_reference_id,
    p_application_mode,
    coalesce(p_vacancy_code, ''),
    coalesce(p_vacancy_title, ''),
    p_full_name,
    p_email,
    p_phone,
    coalesce(p_location, ''),
    coalesce(p_discipline, ''),
    coalesce(p_engagement_type, ''),
    coalesce(p_experience_years, ''),
    coalesce(p_portfolio_url, ''),
    coalesce(p_cv_file_name, ''),
    coalesce(p_cv_submission_method, 'none'),
    p_motivation,
    'received',
    coalesce(p_submission_fingerprint, '')
  )
  RETURNING id INTO v_record_id;

  IF coalesce(p_email_outbox_recipient, '') <> '' AND p_email_outbox_payload IS NOT NULL THEN
    INSERT INTO public.notification_outbox (
      entity_type,
      entity_reference_id,
      channel,
      idempotency_key,
      recipient,
      subject,
      payload,
      status
    )
    VALUES (
      'career_application',
      p_reference_id,
      'email',
      'car-email-' || p_reference_id,
      p_email_outbox_recipient,
      coalesce(p_email_outbox_subject, ''),
      p_email_outbox_payload,
      'pending'
    )
    ON CONFLICT (idempotency_key) DO NOTHING
    RETURNING id INTO v_email_outbox_id;
  END IF;

  IF coalesce(p_webhook_outbox_target, '') <> '' AND p_webhook_outbox_payload IS NOT NULL THEN
    INSERT INTO public.notification_outbox (
      entity_type,
      entity_reference_id,
      channel,
      idempotency_key,
      recipient,
      subject,
      payload,
      status
    )
    VALUES (
      'career_application',
      p_reference_id,
      'webhook',
      'car-webhook-' || p_reference_id,
      p_webhook_outbox_target,
      '',
      p_webhook_outbox_payload,
      'pending'
    )
    ON CONFLICT (idempotency_key) DO NOTHING
    RETURNING id INTO v_webhook_outbox_id;
  END IF;

  RETURN QUERY SELECT v_record_id, p_reference_id, v_email_outbox_id, v_webhook_outbox_id;
END;
$$;

-- ----------------------------------------------------------------------------
-- 5. Atomic Newsletter Upsert & Unsubscribe RPCs
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.upsert_newsletter_subscriber_atomic(
  p_email text,
  p_source text DEFAULT 'footer',
  p_campaign text DEFAULT ''
)
RETURNS TABLE (
  subscriber_id uuid,
  already_active boolean,
  was_reactivated boolean
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_norm_email text := lower(trim(p_email));
  v_prev_status text := NULL;
  v_sub_id uuid;
BEGIN
  SELECT ns.status INTO v_prev_status
  FROM public.newsletter_subscribers ns
  WHERE ns.email = v_norm_email
  FOR UPDATE;

  INSERT INTO public.newsletter_subscribers (
    email,
    source,
    campaign,
    status,
    resubscribed_count,
    last_subscribed_at,
    consented_at,
    consent_source,
    marketing_opt_in,
    unsubscribed_at
  )
  VALUES (
    v_norm_email,
    coalesce(nullif(trim(p_source), ''), 'footer'),
    coalesce(trim(p_campaign), ''),
    'active',
    0,
    now(),
    now(),
    coalesce(nullif(trim(p_source), ''), 'footer'),
    true,
    NULL
  )
  ON CONFLICT (email) DO UPDATE SET
    status = 'active',
    source = EXCLUDED.source,
    campaign = CASE WHEN EXCLUDED.campaign <> '' THEN EXCLUDED.campaign ELSE newsletter_subscribers.campaign END,
    resubscribed_count = CASE
      WHEN newsletter_subscribers.status = 'unsubscribed'
      THEN newsletter_subscribers.resubscribed_count + 1
      ELSE newsletter_subscribers.resubscribed_count
    END,
    last_subscribed_at = now(),
    consented_at = now(),
    consent_source = EXCLUDED.source,
    marketing_opt_in = true,
    unsubscribed_at = NULL
  RETURNING id INTO v_sub_id;

  RETURN QUERY SELECT
    v_sub_id,
    coalesce(v_prev_status = 'active', false),
    coalesce(v_prev_status = 'unsubscribed', false);
END;
$$;

CREATE OR REPLACE FUNCTION public.unsubscribe_newsletter_subscriber_atomic(
  p_email text
)
RETURNS TABLE (
  updated_count integer,
  status text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_norm_email text := lower(trim(p_email));
  v_count integer := 0;
BEGIN
  UPDATE public.newsletter_subscribers
  SET
    status = 'unsubscribed',
    marketing_opt_in = false,
    unsubscribed_at = coalesce(unsubscribed_at, now())
  WHERE email = v_norm_email;

  GET DIAGNOSTICS v_count = ROW_COUNT;

  RETURN QUERY SELECT v_count, 'unsubscribed'::text;
END;
$$;

-- ----------------------------------------------------------------------------
-- 6. Concurrency-Safe Outbox Batch Claiming + Stale Processing Recovery
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.claim_notification_outbox_batch(
  p_limit integer DEFAULT 8
)
RETURNS SETOF public.notification_outbox
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  -- Move crashed/timed-out processing rows that exhausted max_attempts to dead_letter
  UPDATE public.notification_outbox o
  SET
    status = 'dead_letter',
    last_error = coalesce(nullif(o.last_error, ''), 'Worker processing timed out after max attempts'),
    updated_at = now()
  WHERE o.status = 'processing'
    AND o.updated_at <= (now() - interval '2 minutes')
    AND o.attempt_count >= o.max_attempts;

  -- Claim due pending/retrying jobs OR recover stale crashed processing jobs
  RETURN QUERY
  WITH due AS (
    SELECT o.id
    FROM public.notification_outbox o
    WHERE (
      (o.status IN ('pending', 'retrying') AND o.next_attempt_at <= now())
      OR
      (o.status = 'processing' AND o.updated_at <= (now() - interval '2 minutes'))
    )
      AND o.attempt_count < o.max_attempts
    ORDER BY o.next_attempt_at ASC, o.created_at ASC
    LIMIT greatest(1, least(coalesce(p_limit, 8), 25))
    FOR UPDATE OF o SKIP LOCKED
  )
  UPDATE public.notification_outbox o
  SET
    status = 'processing',
    attempt_count = o.attempt_count + 1,
    updated_at = now()
  FROM due
  WHERE o.id = due.id
  RETURNING o.*;
END;
$$;

-- Release unattempted claimed rows cleanly when a worker nears its deadline
CREATE OR REPLACE FUNCTION public.release_unattempted_outbox_row(
  p_outbox_id uuid
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  UPDATE public.notification_outbox
  SET
    status = 'retrying',
    attempt_count = greatest(0, attempt_count - 1),
    next_attempt_at = now(),
    updated_at = now()
  WHERE id = p_outbox_id
    AND status = 'processing';
END;
$$;

REVOKE ALL ON FUNCTION public.create_business_enquiry_atomic FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.create_career_application_atomic FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.upsert_newsletter_subscriber_atomic FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.unsubscribe_newsletter_subscriber_atomic FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.claim_notification_outbox_batch FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.release_unattempted_outbox_row FROM PUBLIC, anon, authenticated;

GRANT EXECUTE ON FUNCTION public.create_business_enquiry_atomic TO service_role;
GRANT EXECUTE ON FUNCTION public.create_career_application_atomic TO service_role;
GRANT EXECUTE ON FUNCTION public.upsert_newsletter_subscriber_atomic TO service_role;
GRANT EXECUTE ON FUNCTION public.unsubscribe_newsletter_subscriber_atomic TO service_role;
GRANT EXECUTE ON FUNCTION public.claim_notification_outbox_batch TO service_role;
GRANT EXECUTE ON FUNCTION public.release_unattempted_outbox_row TO service_role;
