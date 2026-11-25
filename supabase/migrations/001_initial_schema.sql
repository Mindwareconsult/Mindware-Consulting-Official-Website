-- ============================================================================
-- Mindware Consulting Ltd — Production PostgreSQL Schema (Supabase)
-- Migration: 001_initial_schema.sql
-- ============================================================================
-- Security model:
--   All three tables store sensitive corporate enquiries, career candidate data,
--   and subscriber emails. Row Level Security (RLS) is enabled on every table
--   with NO permissive policies for `anon` or `authenticated`. All privileges
--   for `PUBLIC`, `anon`, and `authenticated` are explicitly revoked so reads
--   and writes can only happen server-side via Vercel Serverless Functions /
--   backend API using `SUPABASE_SERVICE_ROLE_KEY`.
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Updated-at trigger function shared across tables
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- ----------------------------------------------------------------------------
-- 1. Business Enquiries
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.business_enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_id text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),

  full_name text NOT NULL CHECK (char_length(trim(full_name)) >= 2 AND char_length(full_name) <= 120),
  business_name text NOT NULL DEFAULT '' CHECK (char_length(business_name) <= 160),
  email text NOT NULL DEFAULT '' CHECK (char_length(email) <= 160),
  phone text NOT NULL DEFAULT '' CHECK (char_length(phone) <= 40),

  enquiry_category text NOT NULL CHECK (
    enquiry_category IN (
      'digital-transformation',
      'marketing-customer-acquisition',
      'business-growth-consulting',
      'construction-business-growth',
      'campaign-growth-season',
      'other-organization'
    )
  ),
  industry_sector text NOT NULL DEFAULT '' CHECK (char_length(industry_sector) <= 120),
  campaign_track text NOT NULL DEFAULT '' CHECK (char_length(campaign_track) <= 120),
  consultation_topic text NOT NULL DEFAULT '' CHECK (char_length(consultation_topic) <= 160),
  service_needed text NOT NULL DEFAULT '' CHECK (char_length(service_needed) <= 160),
  engagement_model text NOT NULL DEFAULT '' CHECK (char_length(engagement_model) <= 120),
  project_desc text NOT NULL DEFAULT '' CHECK (char_length(project_desc) <= 4000),

  submission_source text NOT NULL DEFAULT 'contact-page' CHECK (char_length(submission_source) <= 80),
  landing_page text NOT NULL DEFAULT '' CHECK (char_length(landing_page) <= 200),
  utm_source text NOT NULL DEFAULT '' CHECK (char_length(utm_source) <= 80),
  utm_medium text NOT NULL DEFAULT '' CHECK (char_length(utm_medium) <= 80),
  utm_campaign text NOT NULL DEFAULT '' CHECK (char_length(utm_campaign) <= 80),
  utm_content text NOT NULL DEFAULT '' CHECK (char_length(utm_content) <= 80),
  utm_term text NOT NULL DEFAULT '' CHECK (char_length(utm_term) <= 80),

  lead_status text NOT NULL DEFAULT 'new' CHECK (
    lead_status IN ('new', 'reviewing', 'contacted', 'qualified', 'archived')
  ),
  submission_fingerprint text NOT NULL DEFAULT '' CHECK (char_length(submission_fingerprint) <= 128),

  notification_sent_at timestamptz NULL,
  webhook_sent_at timestamptz NULL,
  notification_last_error text NULL,

  CONSTRAINT chk_business_enquiries_contact_channel CHECK (
    char_length(trim(email)) > 0 OR char_length(trim(phone)) >= 6
  )
);

DROP TRIGGER IF EXISTS trg_business_enquiries_updated_at ON public.business_enquiries;
CREATE TRIGGER trg_business_enquiries_updated_at
  BEFORE UPDATE ON public.business_enquiries
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX IF NOT EXISTS idx_business_enquiries_created_at
  ON public.business_enquiries (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_business_enquiries_category_created
  ON public.business_enquiries (enquiry_category, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_business_enquiries_status_created
  ON public.business_enquiries (lead_status, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_business_enquiries_fingerprint_created
  ON public.business_enquiries (submission_fingerprint, created_at DESC)
  WHERE submission_fingerprint <> '';

CREATE INDEX IF NOT EXISTS idx_business_enquiries_email
  ON public.business_enquiries (lower(email))
  WHERE email <> '';

-- ----------------------------------------------------------------------------
-- 2. Career Applications
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.career_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_id text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),

  application_mode text NOT NULL CHECK (application_mode IN ('vacancy', 'general')),
  vacancy_code text NOT NULL DEFAULT '' CHECK (char_length(vacancy_code) <= 40),
  vacancy_title text NOT NULL DEFAULT '' CHECK (char_length(vacancy_title) <= 160),

  full_name text NOT NULL CHECK (char_length(trim(full_name)) >= 2 AND char_length(full_name) <= 120),
  email text NOT NULL CHECK (char_length(trim(email)) >= 5 AND char_length(email) <= 160),
  phone text NOT NULL CHECK (char_length(trim(phone)) >= 6 AND char_length(phone) <= 40),
  location text NOT NULL DEFAULT '' CHECK (char_length(location) <= 120),
  discipline text NOT NULL DEFAULT '' CHECK (char_length(discipline) <= 120),
  engagement_type text NOT NULL DEFAULT '' CHECK (char_length(engagement_type) <= 60),
  experience_years text NOT NULL DEFAULT '' CHECK (char_length(experience_years) <= 60),
  portfolio_url text NOT NULL DEFAULT '' CHECK (char_length(portfolio_url) <= 300),
  cv_file_name text NOT NULL DEFAULT '' CHECK (char_length(cv_file_name) <= 140),
  cv_submission_method text NOT NULL DEFAULT 'email_reference' CHECK (
    cv_submission_method IN ('email_reference', 'none')
  ),
  motivation text NOT NULL CHECK (char_length(trim(motivation)) >= 10 AND char_length(motivation) <= 4000),

  application_status text NOT NULL DEFAULT 'received' CHECK (
    application_status IN ('received', 'shortlisted', 'interviewing', 'archived')
  ),
  submission_fingerprint text NOT NULL DEFAULT '' CHECK (char_length(submission_fingerprint) <= 128),

  notification_sent_at timestamptz NULL,
  webhook_sent_at timestamptz NULL,
  notification_last_error text NULL
);

DROP TRIGGER IF EXISTS trg_career_applications_updated_at ON public.career_applications;
CREATE TRIGGER trg_career_applications_updated_at
  BEFORE UPDATE ON public.career_applications
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX IF NOT EXISTS idx_career_applications_created_at
  ON public.career_applications (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_career_applications_mode_vacancy
  ON public.career_applications (application_mode, vacancy_code, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_career_applications_status_created
  ON public.career_applications (application_status, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_career_applications_fingerprint_created
  ON public.career_applications (submission_fingerprint, created_at DESC)
  WHERE submission_fingerprint <> '';

CREATE INDEX IF NOT EXISTS idx_career_applications_email
  ON public.career_applications (lower(email));

-- ----------------------------------------------------------------------------
-- 3. Newsletter Subscribers
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),

  email text NOT NULL UNIQUE CHECK (char_length(trim(email)) >= 5 AND char_length(email) <= 160 AND email = lower(email)),
  source text NOT NULL DEFAULT 'footer' CHECK (char_length(source) <= 80),
  campaign text NOT NULL DEFAULT '' CHECK (char_length(campaign) <= 120),
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
  resubscribed_count integer NOT NULL DEFAULT 0 CHECK (resubscribed_count >= 0),
  last_subscribed_at timestamptz NOT NULL DEFAULT now()
);

DROP TRIGGER IF EXISTS trg_newsletter_subscribers_updated_at ON public.newsletter_subscribers;
CREATE TRIGGER trg_newsletter_subscribers_updated_at
  BEFORE UPDATE ON public.newsletter_subscribers
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_status_created
  ON public.newsletter_subscribers (status, created_at DESC);

-- ----------------------------------------------------------------------------
-- 4. Row Level Security & Least-Privilege Grants
-- ----------------------------------------------------------------------------
ALTER TABLE public.business_enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE public.business_enquiries FROM PUBLIC, anon, authenticated;
REVOKE ALL ON TABLE public.career_applications FROM PUBLIC, anon, authenticated;
REVOKE ALL ON TABLE public.newsletter_subscribers FROM PUBLIC, anon, authenticated;

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.business_enquiries TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.career_applications TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.newsletter_subscribers TO service_role;
