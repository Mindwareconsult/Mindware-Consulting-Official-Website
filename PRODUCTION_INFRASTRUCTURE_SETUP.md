# Mindware Consulting Ltd — Production Infrastructure Setup Guide

This document describes the production infrastructure configuration required to deploy the Mindware Consulting Ltd corporate website on **Vercel** with durable **Supabase PostgreSQL** persistence, transactional outbox recovery, **Resend** notifications, **Upstash Redis** distributed rate limiting, hardened CRM webhooks, signed newsletter unsubscribe links, and server-side **Gemini** AI endpoints.

All API routes execute identically in local development (`tsx server.ts`) and in Vercel Serverless Functions (`api/*.ts`) via shared handlers in `api/_lib/`.

---

## 1. Supabase Project Setup (PostgreSQL Schema, Atomic RPCs & RLS)

1. Create a Supabase project in an EMEA/EU region (**eu-west-1 (Ireland)** or **eu-central-1 (Frankfurt)**).
2. Open the Supabase **SQL Editor** and execute the migrations in exact order:
   1. `supabase/migrations/001_initial_schema.sql`
   2. `supabase/migrations/002_hardening_and_outbox.sql`
3. Verify tables and functions created under `public`:
   - `public.business_enquiries`
   - `public.career_applications`
   - `public.newsletter_subscribers` (includes consent timestamps & unsubscribe tracking)
   - `public.notification_outbox` (durable email/webhook outbox with unique `idempotency_key`)
   - Atomic `SECURITY DEFINER` RPCs (`create_business_enquiry_atomic`, `create_career_application_atomic`, `upsert_newsletter_subscriber_atomic`, `unsubscribe_newsletter_subscriber_atomic`, `claim_notification_outbox_batch`) using transaction-scoped advisory locks and `FOR UPDATE SKIP LOCKED` to eliminate duplicate race conditions.
4. **Row Level Security (RLS) & Access Model**:
   - RLS is enabled on all four tables.
   - All permissions for `PUBLIC`, `anon`, and `authenticated` roles are explicitly revoked (`REVOKE ALL`).
   - Only `service_role` may access tables or execute the atomic RPCs server-side.
5. Copy from **Project Settings -> API**:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY` (server-side only; never use `VITE_`)

> **Production Safety Rule**: When running on Vercel (`VERCEL=1`) or `NODE_ENV=production`, missing Supabase credentials return HTTP `503` immediately rather than falling back to ephemeral local files.

---

## 2. Resend Domain, Email Configuration & Timeout-Safe Outbox

1. Add and verify `mindwareconsult.com.ng` (or a dedicated mail subdomain such as `mail.mindwareconsult.com.ng`) in **Resend** with **SPF**, **DKIM**, and **DMARC** DNS records.
2. Configure server-side environment variables:
   - `RESEND_API_KEY`
   - `ENQUIRY_FROM_EMAIL`
   - `ENQUIRY_NOTIFICATION_EMAIL` (defaults to `contact@mindwareconsult.com.ng`)
   - `CAREERS_NOTIFICATION_EMAIL` (defaults to `ENQUIRY_NOTIFICATION_EMAIL`)
3. **Budget-Bounded Fast Path + At-Least-Once Outbox Retries**:
   - Leads and outbox jobs are inserted **atomically in a single PostgreSQL transaction** before any email/webhook call.
   - All synchronous stages share a single `7,800 ms` execution deadline (`REQUEST_DEADLINE_BUDGET_MS`), preserving `>= 2,200 ms` of headroom under Vercel's `10s` `maxDuration`.
   - If less than `1,300 ms` remains after rate-limit + DB persistence, the inline fast-path is skipped cleanly and the job stays `pending` for the outbox worker. Otherwise, fast-path delivery runs within `min(1,800 ms, remaining - 750 ms)`.
   - Any timeout, skip, or `429` / `5xx` failure leaves the job in `notification_outbox` (`pending` or `retrying`) and still returns `201 Created` to the user without losing the saved record.
   - `vercel.json` configures a Vercel Cron Job calling **`GET /api/internal/process-outbox`** on schedule **`*/5 * * * *`** (`maxDuration: 10`, matching the worker's `7,500 ms` execution budget).
   - **HTTP Method & Authentication Parity**: Both `GET` (used by Vercel Cron Jobs) and `POST` (for manual or external scheduler triggers) execute the identical outbox handler (`handleProcessOutboxRequest`) protected by timing-safe comparison against `Authorization: Bearer <CRON_SECRET>` (`401` on missing/invalid credentials, `503` if `CRON_SECRET` is unset).
   - **Outbox Locking & Recovery**: Claims pending/retrying jobs—and reclaims stale `processing` rows older than `2 minutes`—via `FOR UPDATE OF o SKIP LOCKED` under **at-least-once** delivery semantics. Re-checks `notification_sent_at` / `webhook_sent_at` before dispatch, applies exponential backoff (`1m -> 5m -> 15m -> 60m -> 120m`), releases unattempted claimed rows cleanly via `release_unattempted_outbox_row` near the `7,500 ms` budget, and moves rows exhausting 5 attempts to `dead_letter`.
   - **Preview Testing vs. Production-Only Cron Execution**:
     - **Vercel Preview Deployments**: Vercel Cron Jobs do **not** run automatically on Preview deployments. Verify the endpoint manually during Preview QA via authenticated `curl -X GET` (and `POST`) with `Authorization: Bearer <CRON_SECRET>`.
     - **Vercel Production Deployments**: Automated scheduled execution happens **only on Production deployments** (`*/5 * * * *` requires Vercel Pro/Enterprise; if deploying on Vercel Hobby, adjust `vercel.json` to a once-daily schedule such as `0 6 * * *` or invoke `GET`/`POST /api/internal/process-outbox` from an authenticated external scheduler every 1–5 minutes). Verify automated Cron logs in Vercel Production after launch.

---

## 3. Upstash Redis Setup & Degraded-Mode Behavior

1. Provision an Upstash Redis database in an EMEA/EU region and set:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`
   - `RATE_LIMIT_SALT` (independent 32+ character random secret for HMAC IP hashing)
2. **Standard Distributed Limits (10-minute windows)**:
   - `/api/enquiries`: 10 requests
   - `/api/careers/applications`: 8 requests
   - `/api/newsletter`: 8 requests
   - `/api/gemini/*`: 12 requests
3. **Degraded-Mode & Circuit Breaker Policy**:
   - Upstash checks use a strict `1,200 ms` timeout.
   - Every response emits `X-RateLimit-Mode: distributed-upstash | degraded-memory-fallback | degraded-fail-closed`.
   - After 3 consecutive Redis failures, an instance opens a 60-second circuit and emits structured non-PII `rate_limit_degraded_mode` warnings:
     - **Cost-incurring AI endpoints (`/api/gemini/*`) fail closed (`503`)** during sustained Redis outages to prevent unbounded API billing.
     - **Lead-capture endpoints (`enquiries`, `careers`, `newsletter`) stay available** under a stricter 50% degraded-mode per-instance cap (`5 / 4 / 4` per 10 mins) so genuine customer leads are not lost.

---

## 4. Vercel Deployment Environment Variables

Configure under **Vercel Project -> Settings -> Environment Variables**:

### Server-Side Only (Never prefix with `VITE_`)
| Variable | Required in Production | Purpose |
| --- | --- | --- |
| `SUPABASE_URL` | **Yes** | Supabase project HTTPS URL |
| `SUPABASE_SERVICE_ROLE_KEY` | **Yes** | Server-side DB & RPC credentials |
| `RESEND_API_KEY` | Recommended | Transactional notification emails |
| `ENQUIRY_FROM_EMAIL` | Recommended | Verified Resend sender identity |
| `ENQUIRY_NOTIFICATION_EMAIL` | Recommended | Lead alert recipient inbox |
| `CAREERS_NOTIFICATION_EMAIL` | Recommended | Careers alert recipient inbox |
| `UPSTASH_REDIS_REST_URL` | Recommended | Distributed rate-limit REST endpoint |
| `UPSTASH_REDIS_REST_TOKEN` | Recommended | Upstash REST token |
| `RATE_LIMIT_SALT` | Recommended | Independent HMAC salt for IP hashing |
| `CRON_SECRET` | Recommended | Bearer token protecting `/api/internal/process-outbox` |
| `NEWSLETTER_SIGNING_SECRET` | Recommended | Primary HMAC secret for signed unsubscribe tokens |
| `NEWSLETTER_PREVIOUS_SIGNING_SECRET` | Optional | Previous HMAC secret accepted during zero-downtime key rotation |
| `WEBHOOK_ALLOWED_HOSTS` | Optional/Recommended | Comma-separated allowlist of approved webhook hostnames |
| `ENQUIRY_WEBHOOK_URL` | Optional | Public HTTPS CRM webhook |
| `CAREERS_WEBHOOK_URL` | Optional | Public HTTPS ATS/CRM webhook |
| `GEMINI_API_KEY` | Optional | Enables `/api/gemini/*` CV & cover letter AI endpoints (`gemini-4-hydrogen`) |

### Client-Side Analytics Variables (Public `VITE_*` prefix)
- `VITE_GA4_MEASUREMENT_ID` (`G-XXXXXXXXXX`)
- `VITE_GTM_CONTAINER_ID` (`GTM-XXXXXXX`)
- `VITE_META_PIXEL_ID` (numeric ID)

---

## 5. Webhook Security Controls

All outgoing webhook calls (`ENQUIRY_WEBHOOK_URL`, `CAREERS_WEBHOOK_URL`) enforce:
- `https://` scheme only, port `443` only, no embedded URL credentials.
- Hostname allowlist check against `WEBHOOK_ALLOWED_HOSTS` when configured.
- **Connection-time DNS pinning & socket verification**: uses Node `https.request` (`agent: false`) with a custom `lookup` hook validating resolved A/AAAA records immediately prior to TCP connect and re-checking `socket.remoteAddress` on connect—eliminating TOCTOU DNS-rebinding gaps.
- **Full 128-bit IPv4/IPv6 canonicalization**: rejects localhost, `.local`, `.internal`, cloud metadata (`169.254.169.254`, `metadata.google.internal`), RFC1918 private IPv4, CGNAT (`100.64.0.0/10`), loopback (`::1`, `0:0:0:0:0:0:0:1`), ULA (`fc00::/7`), link-local (`fe80::/10`), site-local (`fec0::/10`), NAT64 (`64:ff9b::/96`, `64:ff9b:1::/48`), IPv4-compatible (`::/96`), and all dotted or hex IPv4-mapped IPv6 forms (`::ffff:...`, `0:0:0:0:0:ffff:...`).
- **Redirects blocked**: HTTP `3xx` responses are rejected rather than followed.
- **Bounded memory**: Response streams are immediately destroyed (`resp.destroy()`) after status inspection, with strict timeouts (`<= 1,800 ms` inline inside remaining budget, `<= 3,500 ms` outbox worker).

---

## 6. Newsletter Lifecycle & Scanner-Safe Unsubscribe Handling

- **Subscription (`POST /api/newsletter`)**: Atomically records `consented_at`, `consent_source`, `marketing_opt_in = true`, `status = 'active'`, emits `List-Unsubscribe` and `List-Unsubscribe-Post: List-Unsubscribe=One-Click` headers, and returns `201` (new or reactivated) or `200` (already active; `resubscribed_count` increments only when transitioning from `'unsubscribed'` back to `'active'`).
- **Scanner-Safe Two-Step Unsubscribe**:
  - `GET /api/newsletter/unsubscribe?token=...`: Validates signature and expiry only; **never mutates database state** (safe against email security link prefetchers/scanners) and renders an HTML confirmation form.
  - `POST /api/newsletter/unsubscribe`: Accepts `token` via JSON body, URL-encoded HTML form submission, or RFC 8058 One-Click (`List-Unsubscribe=One-Click` body + query/body token), verifies HMAC-SHA256 against `NEWSLETTER_SIGNING_SECRET` (or optional `NEWSLETTER_PREVIOUS_SIGNING_SECRET` during key rotation), and atomically sets `status = 'unsubscribed'`, `marketing_opt_in = false`, and `unsubscribed_at = now()`.
- **Marketing Dispatch Rule**: Always query active recipients strictly via:
  ```sql
  SELECT email, source, consented_at
  FROM public.newsletter_subscribers
  WHERE status = 'active'
    AND marketing_opt_in = true
    AND unsubscribed_at IS NULL;
  ```
- **Re-subscription after Unsubscribe**: Re-submitting `POST /api/newsletter` clears `unsubscribed_at`, sets `marketing_opt_in = true`, refreshes `consented_at`, and updates `consent_source`.

---

## 7. Incident Recovery & Outbox Reconciliation

```sql
-- Inspect outbox items awaiting retry or moved to dead_letter
SELECT id, entity_type, entity_reference_id, channel, status,
       attempt_count, next_attempt_at, last_error
FROM public.notification_outbox
WHERE status IN ('retrying', 'dead_letter')
ORDER BY created_at DESC;
```

To replay `dead_letter` items after fixing an external email/webhook outage:
```sql
UPDATE public.notification_outbox
SET status = 'retrying', attempt_count = 0, next_attempt_at = now()
WHERE status = 'dead_letter';
```
Then invoke `GET /api/internal/process-outbox` (or `POST /api/internal/process-outbox`) with `Authorization: Bearer <CRON_SECRET>`.

---

## 8. Data Privacy, Retention & Erasure Procedures

### Retention Schedule (Recommended Policy — Pending Company Approval)
| Dataset | Suggested Operational Window | Rationale |
| --- | --- | --- |
| `public.business_enquiries` | 24 months (or active client engagement + statutory archive) | Sales follow-up, project scoping, and audit trail |
| `public.career_applications` | 12 months per recruitment cycle | Candidate evaluation and talent pool consideration |
| `public.newsletter_subscribers` | Until unsubscribed; purge unsubscribed records after 12 months or upon erasure request | Consent-based Mindware Insights distribution |
| `public.notification_outbox` | Prune `delivered` rows older than 30 days | Delivery troubleshooting and duplicate prevention |

### Privacy & Minimization Controls
- Client IP addresses are HMAC-SHA256 hashed prior to Redis rate-limit key generation and are never persisted in PostgreSQL or emitted in logs.
- Client analytics (`src/lib/analytics.ts`) strip `email`, `phone`, `fullName`, `businessName`, `projectDesc`, and `motivation` prior to `dataLayer` / GA4 / Meta Pixel dispatch.
- Career applications use email-referenced CV submission (`cv_submission_method = 'email_reference'`) rather than storing binary documents on unauthenticated public storage.
- **Public Privacy Notice (`/privacy`) & Newsletter Copy**:
  - Dedicated corporate `/privacy` route (`src/pages/Privacy.tsx`) is linked from the global footer (`src/components/Footer.tsx`) and indexed in `public/sitemap.xml`. Retention durations and formal legal/regulatory approval remain explicitly flagged for company leadership sign-off.
  - `src/pages/Insights.tsx` displays truthful subscription receipt confirmation (`"Thank you! Your Mindware Insights subscription has been received and recorded."`) without promising a separate inbox confirmation email unless CRM/ESP welcome automation is intentionally connected later.

### Data Subject Erasure / Deletion Procedure (SQL)
Execute via Supabase SQL Editor upon verified NDPR/GDPR deletion request:
```sql
-- Delete all records (including outbox rows for leads, applications, and newsletter subscribers)
DELETE FROM public.notification_outbox
WHERE entity_reference_id IN (
  SELECT reference_id FROM public.business_enquiries WHERE lower(email) = lower('subject@example.com')
  UNION ALL
  SELECT reference_id FROM public.career_applications WHERE lower(email) = lower('subject@example.com')
  UNION ALL
  SELECT id::text FROM public.newsletter_subscribers WHERE lower(email) = lower('subject@example.com')
);

DELETE FROM public.business_enquiries WHERE lower(email) = lower('subject@example.com');
DELETE FROM public.career_applications WHERE lower(email) = lower('subject@example.com');
DELETE FROM public.newsletter_subscribers WHERE lower(email) = lower('subject@example.com');

-- Prune delivered outbox rows older than 30 days
DELETE FROM public.notification_outbox
WHERE status = 'delivered' AND delivered_at < now() - interval '30 days';
```
