import fsPromises from "fs/promises";
import path from "path";
import { getSupabaseConfig, isProductionMode } from "./env";
import type {
  ValidatedCareerApplicationInput,
  ValidatedEnquiryInput,
  ValidatedNewsletterInput,
} from "./validation";

const DUPLICATE_WINDOW_MS = 10 * 60 * 1000;
const localRecentFingerprints = new Map<string, number>();
const localInFlightFingerprints = new Set<string>();

export class PersistenceUnavailableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PersistenceUnavailableError";
  }
}

export class DuplicateSubmissionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DuplicateSubmissionError";
  }
}

export interface PersistedRecordMeta {
  backend: "supabase" | "local-ndjson";
  recordId: string | null;
  referenceId: string;
  emailOutboxId: string | null;
  webhookOutboxId: string | null;
}

export interface NewsletterPersistenceResult {
  backend: "supabase" | "local-ndjson";
  alreadyActive: boolean;
  wasReactivated: boolean;
}

export interface OutboxEnqueuePayload {
  emailRecipient?: string;
  emailSubject?: string;
  emailPayload?: Record<string, unknown> | null;
  webhookTarget?: string;
  webhookPayload?: Record<string, unknown> | null;
}

export interface ClaimedOutboxRow {
  id: string;
  entity_type: "business_enquiry" | "career_application" | "newsletter_subscriber";
  entity_reference_id: string;
  channel: "email" | "webhook";
  idempotency_key: string;
  recipient: string;
  subject: string;
  payload: Record<string, unknown>;
  status: string;
  attempt_count: number;
  max_attempts: number;
}

function getSupabaseHeaders(secretKey: string): Record<string, string> {
  return {
    apikey: secretKey,
    "Content-Type": "application/json",
  };
}

function assertProductionPersistenceReady():
  | { mode: "supabase"; url: string; secretKey: string }
  | { mode: "local-ndjson" } {
  const supa = getSupabaseConfig();
  if (supa.configured) {
    return {
      mode: "supabase",
      url: supa.url,
      secretKey: supa.secretKey,
    };
  }

  if (isProductionMode()) {
    throw new PersistenceUnavailableError(
      "Production database persistence is not configured. SUPABASE_URL and SUPABASE_SECRET_KEY are required."
    );
  }

  return { mode: "local-ndjson" };
}

function acquireLocalFingerprintLock(fingerprint: string): boolean {
  if (!fingerprint) return true;
  const now = Date.now();
  for (const [k, ts] of localRecentFingerprints.entries()) {
    if (now - ts > DUPLICATE_WINDOW_MS) {
      localRecentFingerprints.delete(k);
    }
  }
  if (localInFlightFingerprints.has(fingerprint)) {
    return false;
  }
  const existing = localRecentFingerprints.get(fingerprint);
  if (existing && now - existing < DUPLICATE_WINDOW_MS) {
    return false;
  }
  localInFlightFingerprints.add(fingerprint);
  return true;
}

function commitLocalFingerprint(fingerprint: string): void {
  if (!fingerprint) return;
  localInFlightFingerprints.delete(fingerprint);
  localRecentFingerprints.set(fingerprint, Date.now());
}

function releaseLocalFingerprintOnError(fingerprint: string): void {
  if (!fingerprint) return;
  localInFlightFingerprints.delete(fingerprint);
}

async function appendLocalNdjson(
  filename: "enquiries.ndjson" | "career-applications.ndjson" | "newsletter.ndjson",
  record: Record<string, unknown>
): Promise<void> {
  const submissionsDir = path.resolve(process.cwd(), "data", "submissions");
  await fsPromises.mkdir(submissionsDir, { recursive: true });
  const targetFile = path.resolve(submissionsDir, filename);
  if (!targetFile.startsWith(submissionsDir + path.sep)) {
    throw new Error("Invalid local submission storage path.");
  }
  await fsPromises.appendFile(targetFile, JSON.stringify(record) + "\n", "utf8");
}

async function readLocalNewsletterState(
  email: string
): Promise<"active" | "unsubscribed" | "none"> {
  try {
    const submissionsDir = path.resolve(process.cwd(), "data", "submissions");
    const targetFile = path.resolve(submissionsDir, "newsletter.ndjson");
    if (!targetFile.startsWith(submissionsDir + path.sep)) return "none";
    const content = await fsPromises.readFile(targetFile, "utf8");
    let latest: "active" | "unsubscribed" | "none" = "none";
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      try {
        const parsed = JSON.parse(trimmed) as { email?: string; status?: string };
        if (parsed.email?.toLowerCase() === email) {
          latest = parsed.status === "unsubscribed" ? "unsubscribed" : "active";
        }
      } catch {
        // Ignore malformed local line
      }
    }
    return latest;
  } catch (err: unknown) {
    if ((err as NodeJS.ErrnoException)?.code === "ENOENT") {
      return "none";
    }
    return "none";
  }
}

async function parseSupabaseRpcError(resp: Response): Promise<{
  code?: string;
  message?: string;
}> {
  try {
    const body = (await resp.json()) as { code?: string; message?: string };
    return body || {};
  } catch {
    return {};
  }
}

export async function saveBusinessEnquiry(
  referenceId: string,
  input: ValidatedEnquiryInput,
  outbox: OutboxEnqueuePayload = {},
  timeoutMs = 3000
): Promise<PersistedRecordMeta> {
  const target = assertProductionPersistenceReady();

  if (target.mode === "local-ndjson") {
    if (!acquireLocalFingerprintLock(input.fingerprint)) {
      throw new DuplicateSubmissionError(
        "A matching enquiry was already submitted just moments ago. Our team has received your request."
      );
    }

    try {
      await appendLocalNdjson("enquiries.ndjson", {
        referenceId,
        submittedAt: new Date().toISOString(),
        source: input.submissionSource,
        pagePath: input.landingPage,
        enquiryCategory: input.enquiryCategory,
        ...(input.industrySector ? { industrySector: input.industrySector } : {}),
        ...(input.campaignTrack ? { campaignTrack: input.campaignTrack } : {}),
        ...(input.utmSource ||
        input.utmMedium ||
        input.utmCampaign ||
        input.utmContent ||
        input.utmTerm
          ? {
              utm: {
                ...(input.utmSource ? { utmSource: input.utmSource } : {}),
                ...(input.utmMedium ? { utmMedium: input.utmMedium } : {}),
                ...(input.utmCampaign ? { utmCampaign: input.utmCampaign } : {}),
                ...(input.utmContent ? { utmContent: input.utmContent } : {}),
                ...(input.utmTerm ? { utmTerm: input.utmTerm } : {}),
              },
            }
          : {}),
        fullName: input.fullName,
        businessName: input.businessName,
        email: input.email,
        phone: input.phone,
        consultationTopic: input.consultationTopic,
        serviceNeeded: input.serviceNeeded,
        engagementModel: input.engagementModel,
        projectDesc: input.projectDesc,
        leadStatus: "new",
      });
      commitLocalFingerprint(input.fingerprint);
      return {
        backend: "local-ndjson",
        recordId: null,
        referenceId,
        emailOutboxId: null,
        webhookOutboxId: null,
      };
    } catch (err) {
      releaseLocalFingerprintOnError(input.fingerprint);
      throw err;
    }
  }

  const resp = await fetch(
    `${target.url}/rest/v1/rpc/create_business_enquiry_atomic`,
    {
      method: "POST",
      headers: getSupabaseHeaders(target.secretKey),
      body: JSON.stringify({
        p_reference_id: referenceId,
        p_full_name: input.fullName,
        p_business_name: input.businessName,
        p_email: input.email,
        p_phone: input.phone,
        p_enquiry_category: input.enquiryCategory,
        p_industry_sector: input.industrySector,
        p_campaign_track: input.campaignTrack,
        p_consultation_topic: input.consultationTopic,
        p_service_needed: input.serviceNeeded,
        p_engagement_model: input.engagementModel,
        p_project_desc: input.projectDesc,
        p_submission_source: input.submissionSource,
        p_landing_page: input.landingPage,
        p_utm_source: input.utmSource,
        p_utm_medium: input.utmMedium,
        p_utm_campaign: input.utmCampaign,
        p_utm_content: input.utmContent,
        p_utm_term: input.utmTerm,
        p_submission_fingerprint: input.fingerprint,
        p_email_outbox_recipient: outbox.emailRecipient || "",
        p_email_outbox_subject: outbox.emailSubject || "",
        p_email_outbox_payload: outbox.emailPayload || null,
        p_webhook_outbox_target: outbox.webhookTarget || "",
        p_webhook_outbox_payload: outbox.webhookPayload || null,
      }),
      signal: AbortSignal.timeout(Math.max(800, Math.min(3500, timeoutMs))),
    }
  );

  if (!resp.ok) {
    const rpcErr = await parseSupabaseRpcError(resp);
    if (
      rpcErr.message?.includes("DUPLICATE_SUBMISSION") ||
      rpcErr.code === "P0001" ||
      resp.status === 409
    ) {
      throw new DuplicateSubmissionError(
        "A matching enquiry was already submitted just moments ago. Our team has received your request."
      );
    }
    throw new PersistenceUnavailableError(
      `Supabase create_business_enquiry_atomic failed (${resp.status}).`
    );
  }

  const rows = (await resp.json()) as Array<{
    record_id?: string;
    reference_id?: string;
    email_outbox_id?: string | null;
    webhook_outbox_id?: string | null;
  }>;
  const row = Array.isArray(rows) ? rows[0] : undefined;

  return {
    backend: "supabase",
    recordId: row?.record_id ?? null,
    referenceId: row?.reference_id ?? referenceId,
    emailOutboxId: row?.email_outbox_id ?? null,
    webhookOutboxId: row?.webhook_outbox_id ?? null,
  };
}

export async function saveCareerApplication(
  referenceId: string,
  input: ValidatedCareerApplicationInput,
  outbox: OutboxEnqueuePayload = {},
  timeoutMs = 3000
): Promise<PersistedRecordMeta> {
  const target = assertProductionPersistenceReady();

  if (target.mode === "local-ndjson") {
    if (!acquireLocalFingerprintLock(input.fingerprint)) {
      throw new DuplicateSubmissionError(
        "A matching application was already submitted moments ago."
      );
    }

    try {
      await appendLocalNdjson("career-applications.ndjson", {
        referenceId,
        submittedAt: new Date().toISOString(),
        mode: input.mode,
        vacancyCode: input.vacancyCode,
        vacancyTitle: input.vacancyTitle,
        fullName: input.fullName,
        email: input.email,
        phone: input.phone,
        location: input.location,
        discipline: input.discipline,
        engagementType: input.engagementType,
        experienceYears: input.experienceYears,
        portfolioUrl: input.portfolioUrl,
        cvFileName: input.cvFileName,
        cvSubmissionMethod: input.cvSubmissionMethod,
        motivation: input.motivation,
        applicationStatus: "received",
      });
      commitLocalFingerprint(input.fingerprint);
      return {
        backend: "local-ndjson",
        recordId: null,
        referenceId,
        emailOutboxId: null,
        webhookOutboxId: null,
      };
    } catch (err) {
      releaseLocalFingerprintOnError(input.fingerprint);
      throw err;
    }
  }

  const resp = await fetch(
    `${target.url}/rest/v1/rpc/create_career_application_atomic`,
    {
      method: "POST",
      headers: getSupabaseHeaders(target.secretKey),
      body: JSON.stringify({
        p_reference_id: referenceId,
        p_application_mode: input.mode,
        p_vacancy_code: input.vacancyCode,
        p_vacancy_title: input.vacancyTitle,
        p_full_name: input.fullName,
        p_email: input.email,
        p_phone: input.phone,
        p_location: input.location,
        p_discipline: input.discipline,
        p_engagement_type: input.engagementType,
        p_experience_years: input.experienceYears,
        p_portfolio_url: input.portfolioUrl,
        p_cv_file_name: input.cvFileName,
        p_cv_submission_method: input.cvSubmissionMethod,
        p_motivation: input.motivation,
        p_submission_fingerprint: input.fingerprint,
        p_email_outbox_recipient: outbox.emailRecipient || "",
        p_email_outbox_subject: outbox.emailSubject || "",
        p_email_outbox_payload: outbox.emailPayload || null,
        p_webhook_outbox_target: outbox.webhookTarget || "",
        p_webhook_outbox_payload: outbox.webhookPayload || null,
      }),
      signal: AbortSignal.timeout(Math.max(800, Math.min(3500, timeoutMs))),
    }
  );

  if (!resp.ok) {
    const rpcErr = await parseSupabaseRpcError(resp);
    if (
      rpcErr.message?.includes("DUPLICATE_SUBMISSION") ||
      rpcErr.code === "P0001" ||
      resp.status === 409
    ) {
      throw new DuplicateSubmissionError(
        "A matching application was already submitted moments ago."
      );
    }
    throw new PersistenceUnavailableError(
      `Supabase create_career_application_atomic failed (${resp.status}).`
    );
  }

  const rows = (await resp.json()) as Array<{
    record_id?: string;
    reference_id?: string;
    email_outbox_id?: string | null;
    webhook_outbox_id?: string | null;
  }>;
  const row = Array.isArray(rows) ? rows[0] : undefined;

  return {
    backend: "supabase",
    recordId: row?.record_id ?? null,
    referenceId: row?.reference_id ?? referenceId,
    emailOutboxId: row?.email_outbox_id ?? null,
    webhookOutboxId: row?.webhook_outbox_id ?? null,
  };
}

export async function upsertNewsletterSubscriber(
  input: ValidatedNewsletterInput,
  timeoutMs = 3000
): Promise<NewsletterPersistenceResult> {
  const target = assertProductionPersistenceReady();

  if (target.mode === "local-ndjson") {
    const prevState = await readLocalNewsletterState(input.email);
    if (prevState !== "active") {
      await appendLocalNdjson("newsletter.ndjson", {
        email: input.email,
        source: input.source,
        ...(input.campaign ? { campaign: input.campaign } : {}),
        status: "active",
        marketingOptIn: true,
        consentedAt: new Date().toISOString(),
        subscribedAt: new Date().toISOString(),
      });
    }
    return {
      backend: "local-ndjson",
      alreadyActive: prevState === "active",
      wasReactivated: prevState === "unsubscribed",
    };
  }

  const resp = await fetch(
    `${target.url}/rest/v1/rpc/upsert_newsletter_subscriber_atomic`,
    {
      method: "POST",
      headers: getSupabaseHeaders(target.secretKey),
      body: JSON.stringify({
        p_email: input.email,
        p_source: input.source,
        p_campaign: input.campaign,
      }),
      signal: AbortSignal.timeout(Math.max(800, Math.min(3500, timeoutMs))),
    }
  );

  if (!resp.ok) {
    throw new PersistenceUnavailableError(
      `Supabase upsert_newsletter_subscriber_atomic failed (${resp.status}).`
    );
  }

  const rows = (await resp.json()) as Array<{
    already_active?: boolean;
    was_reactivated?: boolean;
  }>;
  const row = Array.isArray(rows) ? rows[0] : undefined;

  return {
    backend: "supabase",
    alreadyActive: Boolean(row?.already_active),
    wasReactivated: Boolean(row?.was_reactivated),
  };
}

export async function unsubscribeNewsletterSubscriber(
  email: string
): Promise<{ backend: "supabase" | "local-ndjson"; unsubscribed: boolean }> {
  const target = assertProductionPersistenceReady();
  const normalized = email.trim().toLowerCase();

  if (target.mode === "local-ndjson") {
    await appendLocalNdjson("newsletter.ndjson", {
      email: normalized,
      status: "unsubscribed",
      marketingOptIn: false,
      unsubscribedAt: new Date().toISOString(),
    });
    return { backend: "local-ndjson", unsubscribed: true };
  }

  const resp = await fetch(
    `${target.url}/rest/v1/rpc/unsubscribe_newsletter_subscriber_atomic`,
    {
      method: "POST",
      headers: getSupabaseHeaders(target.secretKey),
      body: JSON.stringify({ p_email: normalized }),
      signal: AbortSignal.timeout(3500),
    }
  );

  if (!resp.ok) {
    throw new PersistenceUnavailableError(
      `Supabase unsubscribe_newsletter_subscriber_atomic failed (${resp.status}).`
    );
  }

  return { backend: "supabase", unsubscribed: true };
}

export async function isTargetAlreadyNotified(
  entityType: "business_enquiry" | "career_application" | "newsletter_subscriber",
  referenceId: string,
  channel: "email" | "webhook",
  timeoutMs = 1000
): Promise<boolean> {
  const supa = getSupabaseConfig();
  if (!supa.configured) return false;
  if (entityType === "newsletter_subscriber") return false;

  const table =
    entityType === "business_enquiry" ? "business_enquiries" : "career_applications";
  const col = channel === "email" ? "notification_sent_at" : "webhook_sent_at";

  try {
    const resp = await fetch(
      `${supa.url}/rest/v1/${table}?select=${col}&reference_id=eq.${encodeURIComponent(
        referenceId
      )}&limit=1`,
      {
        method: "GET",
        headers: getSupabaseHeaders(supa.secretKey),
        signal: AbortSignal.timeout(Math.max(300, Math.min(1500, timeoutMs))),
      }
    );
    if (!resp.ok) return false;
    const rows = (await resp.json()) as Array<Record<string, unknown>>;
    return Boolean(Array.isArray(rows) && rows[0] && rows[0][col]);
  } catch {
    return false;
  }
}

export async function markOutboxDelivered(
  outboxId: string,
  timeoutMs = 900
): Promise<void> {
  const supa = getSupabaseConfig();
  if (!supa.configured || !outboxId) return;

  try {
    await fetch(
      `${supa.url}/rest/v1/notification_outbox?id=eq.${encodeURIComponent(outboxId)}`,
      {
        method: "PATCH",
        headers: {
          ...getSupabaseHeaders(supa.secretKey),
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          status: "delivered",
          delivered_at: new Date().toISOString(),
          last_error: null,
        }),
        signal: AbortSignal.timeout(Math.max(250, Math.min(1500, timeoutMs))),
      }
    );
  } catch {
    // Non-blocking audit update
  }
}

export async function markOutboxRetryOrDeadLetter(
  outboxId: string,
  attemptCount: number,
  maxAttempts: number,
  errorMessage: string,
  timeoutMs = 900
): Promise<void> {
  const supa = getSupabaseConfig();
  if (!supa.configured || !outboxId) return;

  const backoffMinutes = [1, 5, 15, 60, 120];
  const normalizedAttempt = Math.max(1, attemptCount);
  const delayMin =
    backoffMinutes[Math.min(normalizedAttempt - 1, backoffMinutes.length - 1)] ?? 60;
  const deadLetter = normalizedAttempt >= maxAttempts;

  try {
    await fetch(
      `${supa.url}/rest/v1/notification_outbox?id=eq.${encodeURIComponent(outboxId)}`,
      {
        method: "PATCH",
        headers: {
          ...getSupabaseHeaders(supa.secretKey),
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          status: deadLetter ? "dead_letter" : "retrying",
          attempt_count: normalizedAttempt,
          next_attempt_at: new Date(Date.now() + delayMin * 60 * 1000).toISOString(),
          last_error: errorMessage.slice(0, 400),
        }),
        signal: AbortSignal.timeout(Math.max(250, Math.min(1500, timeoutMs))),
      }
    );
  } catch {
    // Non-blocking outbox update
  }
}

export async function releaseUnattemptedOutboxRow(
  outboxId: string,
  timeoutMs = 800
): Promise<void> {
  const supa = getSupabaseConfig();
  if (!supa.configured || !outboxId) return;

  try {
    await fetch(`${supa.url}/rest/v1/rpc/release_unattempted_outbox_row`, {
      method: "POST",
      headers: getSupabaseHeaders(supa.secretKey),
      body: JSON.stringify({ p_outbox_id: outboxId }),
      signal: AbortSignal.timeout(Math.max(250, Math.min(1500, timeoutMs))),
    });
  } catch {
    // Stale-processing recovery in claim_notification_outbox_batch serves as backup
  }
}

export async function claimDueOutboxBatch(
  limit = 8,
  timeoutMs = 2000
): Promise<ClaimedOutboxRow[]> {
  const supa = getSupabaseConfig();
  if (!supa.configured) {
    throw new PersistenceUnavailableError(
      "Supabase must be configured to process the notification outbox."
    );
  }

  const resp = await fetch(
    `${supa.url}/rest/v1/rpc/claim_notification_outbox_batch`,
    {
      method: "POST",
      headers: getSupabaseHeaders(supa.secretKey),
      body: JSON.stringify({ p_limit: limit }),
      signal: AbortSignal.timeout(Math.max(500, Math.min(3000, timeoutMs))),
    }
  );

  if (!resp.ok) {
    throw new PersistenceUnavailableError(
      `Supabase claim_notification_outbox_batch failed (${resp.status}).`
    );
  }

  const rows = (await resp.json()) as ClaimedOutboxRow[];
  return Array.isArray(rows) ? rows : [];
}

/**
 * Best-effort audit update recording notification/webhook timestamps so
 * email retries/duplicates can be tracked without ever failing the primary save.
 */
export async function recordDeliveryAudit(
  table: "business_enquiries" | "career_applications",
  referenceId: string,
  updates: {
    notificationSent?: boolean;
    webhookSent?: boolean;
    lastError?: string | null;
  },
  timeoutMs = 900
): Promise<void> {
  const supa = getSupabaseConfig();
  if (!supa.configured) return;

  const patchBody: Record<string, unknown> = {};
  const nowIso = new Date().toISOString();
  if (updates.notificationSent) patchBody.notification_sent_at = nowIso;
  if (updates.webhookSent) patchBody.webhook_sent_at = nowIso;
  if (updates.lastError !== undefined) {
    patchBody.notification_last_error = updates.lastError
      ? updates.lastError.slice(0, 400)
      : null;
  }
  if (Object.keys(patchBody).length === 0) return;

  try {
    await fetch(
      `${supa.url}/rest/v1/${table}?reference_id=eq.${encodeURIComponent(referenceId)}`,
      {
        method: "PATCH",
        headers: {
          ...getSupabaseHeaders(supa.secretKey),
          Prefer: "return=minimal",
        },
        body: JSON.stringify(patchBody),
        signal: AbortSignal.timeout(Math.max(250, Math.min(1200, timeoutMs))),
      }
    );
  } catch {
    // Non-blocking audit update
  }
}

export function resetLocalDedupeForTests(): void {
  localRecentFingerprints.clear();
  localInFlightFingerprints.clear();
}
