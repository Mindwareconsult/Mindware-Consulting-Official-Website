import https from "https";
import { getResendConfig, getWebhookConfig } from "./env.js";
import {
  claimDueOutboxBatch,
  isTargetAlreadyNotified,
  markOutboxDelivered,
  markOutboxRetryOrDeadLetter,
  recordDeliveryAudit,
  releaseUnattemptedOutboxRow,
  type OutboxEnqueuePayload,
  type PersistedRecordMeta,
} from "./database.js";
import { buildUnsubscribeUrl } from "./newsletterTokens.js";
import {
  EMAIL_REGEX,
  escapeHtml,
  isPrivateOrReservedIp,
  isSafeExternalHttpsUrl,
  resolveAndValidateExternalHostname,
  type DnsLookupFn,
  type ValidatedCareerApplicationInput,
  type ValidatedEnquiryInput,
  type ValidatedNewsletterInput,
} from "./validation.js";

export interface NotificationResult {
  emailSent: boolean;
  webhookSent: boolean;
  emailError: string | null;
  webhookError: string | null;
  queuedForRetry: boolean;
  skippedFastPathDueToBudget?: boolean;
}

const FAST_PATH_MAX_TIMEOUT_MS = 1800;
const MIN_BUDGET_TO_RUN_FAST_PATH_MS = 1300;
const RESERVED_POST_AUDIT_MS = 750;
const OUTBOX_WORKER_BUDGET_MS = 7500;
const dispatchedIdempotencyKeys = new Set<string>();

function buildKeyValueRowsHtml(rows: Array<[string, string]>): string {
  return rows
    .filter(([, value]) => Boolean(value))
    .map(
      ([label, value]) =>
        `<tr>
          <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#111827;width:190px;vertical-align:top;">${escapeHtml(label)}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#374151;vertical-align:top;white-space:pre-wrap;">${escapeHtml(value)}</td>
        </tr>`
    )
    .join("");
}

export function buildEnquiryNotificationPlan(
  referenceId: string,
  input: ValidatedEnquiryInput
): {
  outbox: OutboxEnqueuePayload;
  emailMessage: {
    idempotencyKey: string;
    from: string;
    to: string[];
    replyTo?: string;
    subject: string;
    html: string;
    text: string;
  } | null;
  webhookMessage: {
    url: string;
    idempotencyKey: string;
    body: Record<string, unknown>;
  } | null;
} {
  const resend = getResendConfig();
  const webhooks = getWebhookConfig();

  const subject = `[Mindware Growth Review · ${input.enquiryCategory}] ${referenceId} — ${
    input.businessName || input.fullName
  }`;

  const rows: Array<[string, string]> = [
    ["Reference ID", referenceId],
    ["Full Name", input.fullName],
    ["Company / Organization", input.businessName],
    ["Email", input.email],
    ["Phone / WhatsApp", input.phone],
    ["Enquiry Category", input.enquiryCategory],
    ["Industry Sector", input.industrySector],
    ["Campaign Track", input.campaignTrack],
    ["Consultation Topic", input.consultationTopic],
    ["Service Needed", input.serviceNeeded],
    ["Engagement Model", input.engagementModel],
    ["Submission Source", input.submissionSource],
    ["Landing Page", input.landingPage],
    ["UTM Source", input.utmSource],
    ["UTM Medium", input.utmMedium],
    ["UTM Campaign", input.utmCampaign],
    ["UTM Content", input.utmContent],
    ["UTM Term", input.utmTerm],
    ["Project Brief", input.projectDesc],
  ];

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
      <div style="background:#050b18;color:#ffffff;padding:20px 24px;">
        <div style="font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#fb923c;font-weight:700;">Mindware Consulting Ltd</div>
        <h2 style="margin:6px 0 0;font-size:18px;font-weight:700;">New Business Growth Review Enquiry</h2>
      </div>
      <div style="padding:20px 24px;">
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          ${buildKeyValueRowsHtml(rows)}
        </table>
      </div>
    </div>
  `.trim();

  const text = rows
    .filter(([, val]) => Boolean(val))
    .map(([label, val]) => `${label}: ${val}`)
    .join("\n");

  const emailMessage =
    resend.configured && EMAIL_REGEX.test(resend.enquiryNotificationEmail)
      ? {
          idempotencyKey: `enq-email-${referenceId}`,
          from: resend.fromEmail,
          to: [resend.enquiryNotificationEmail],
          replyTo: input.email && EMAIL_REGEX.test(input.email) ? input.email : undefined,
          subject,
          html,
          text,
        }
      : null;

  const webhookPayload: Record<string, unknown> = {
    event: "business_enquiry.created",
    referenceId,
    submittedAt: new Date().toISOString(),
    enquiryCategory: input.enquiryCategory,
    fullName: input.fullName,
    businessName: input.businessName,
    email: input.email,
    phone: input.phone,
    industrySector: input.industrySector,
    campaignTrack: input.campaignTrack,
    consultationTopic: input.consultationTopic,
    serviceNeeded: input.serviceNeeded,
    engagementModel: input.engagementModel,
    projectDesc: input.projectDesc,
    submissionSource: input.submissionSource,
    landingPage: input.landingPage,
    utm: {
      utmSource: input.utmSource,
      utmMedium: input.utmMedium,
      utmCampaign: input.utmCampaign,
      utmContent: input.utmContent,
      utmTerm: input.utmTerm,
    },
  };

  const webhookMessage = webhooks.enquiryWebhookUrl
    ? {
        url: webhooks.enquiryWebhookUrl,
        idempotencyKey: `enq-webhook-${referenceId}`,
        body: webhookPayload,
      }
    : null;

  return {
    outbox: {
      emailRecipient: emailMessage ? resend.enquiryNotificationEmail : "",
      emailSubject: emailMessage ? subject : "",
      emailPayload: emailMessage
        ? {
            from: emailMessage.from,
            to: emailMessage.to,
            reply_to: emailMessage.replyTo,
            subject: emailMessage.subject,
            html: emailMessage.html,
            text: emailMessage.text,
          }
        : null,
      webhookTarget: webhookMessage ? webhookMessage.url : "",
      webhookPayload: webhookMessage ? webhookMessage.body : null,
    },
    emailMessage,
    webhookMessage,
  };
}

export function buildCareerNotificationPlan(
  referenceId: string,
  input: ValidatedCareerApplicationInput
): {
  outbox: OutboxEnqueuePayload;
  emailMessage: {
    idempotencyKey: string;
    from: string;
    to: string[];
    replyTo?: string;
    subject: string;
    html: string;
    text: string;
  } | null;
  webhookMessage: {
    url: string;
    idempotencyKey: string;
    body: Record<string, unknown>;
  } | null;
} {
  const resend = getResendConfig();
  const webhooks = getWebhookConfig();

  const subject = `[Mindware Careers] ${referenceId} — ${input.fullName} (${
    input.vacancyTitle || input.discipline || input.mode
  })`;

  const rows: Array<[string, string]> = [
    ["Reference ID", referenceId],
    ["Application Mode", input.mode],
    ["Vacancy Code", input.vacancyCode],
    ["Vacancy Title", input.vacancyTitle],
    ["Candidate Name", input.fullName],
    ["Email", input.email],
    ["Phone / WhatsApp", input.phone],
    ["Location", input.location],
    ["Discipline", input.discipline],
    ["Engagement Type", input.engagementType],
    ["Experience", input.experienceYears],
    ["Portfolio / LinkedIn", input.portfolioUrl],
    ["Selected CV Filename", input.cvFileName || "None selected"],
    [
      "CV Submission Note",
      input.cvFileName
        ? `Candidate instructed to email CV referencing ${referenceId} to contact@mindwareconsult.com.ng.`
        : "Not attached",
    ],
    ["Suitability Summary", input.motivation],
  ];

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
      <div style="background:#050b18;color:#ffffff;padding:20px 24px;">
        <div style="font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#fb923c;font-weight:700;">Mindware Consulting Ltd · Careers</div>
        <h2 style="margin:6px 0 0;font-size:18px;font-weight:700;">New Career Application Received</h2>
      </div>
      <div style="padding:20px 24px;">
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          ${buildKeyValueRowsHtml(rows)}
        </table>
      </div>
    </div>
  `.trim();

  const text = rows
    .filter(([, val]) => Boolean(val))
    .map(([label, val]) => `${label}: ${val}`)
    .join("\n");

  const emailMessage =
    resend.configured && EMAIL_REGEX.test(resend.careersNotificationEmail)
      ? {
          idempotencyKey: `car-email-${referenceId}`,
          from: resend.fromEmail,
          to: [resend.careersNotificationEmail],
          replyTo: input.email,
          subject,
          html,
          text,
        }
      : null;

  const webhookPayload: Record<string, unknown> = {
    event: "career_application.created",
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
  };

  const webhookMessage = webhooks.careersWebhookUrl
    ? {
        url: webhooks.careersWebhookUrl,
        idempotencyKey: `car-webhook-${referenceId}`,
        body: webhookPayload,
      }
    : null;

  return {
    outbox: {
      emailRecipient: emailMessage ? resend.careersNotificationEmail : "",
      emailSubject: emailMessage ? subject : "",
      emailPayload: emailMessage
        ? {
            from: emailMessage.from,
            to: emailMessage.to,
            reply_to: emailMessage.replyTo,
            subject: emailMessage.subject,
            html: emailMessage.html,
            text: emailMessage.text,
          }
        : null,
      webhookTarget: webhookMessage ? webhookMessage.url : "",
      webhookPayload: webhookMessage ? webhookMessage.body : null,
    },
    emailMessage,
    webhookMessage,
  };
}

export async function sendResendEmailOnce(payload: {
  idempotencyKey: string;
  from: string;
  to: string[];
  replyTo?: string;
  subject: string;
  html: string;
  text: string;
  timeoutMs?: number;
}): Promise<{ ok: boolean; retryable: boolean; error: string | null }> {
  const resend = getResendConfig();
  if (!resend.configured) {
    return { ok: false, retryable: false, error: "RESEND_NOT_CONFIGURED" };
  }

  if (dispatchedIdempotencyKeys.has(payload.idempotencyKey)) {
    return { ok: true, retryable: false, error: null };
  }

  try {
    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resend.apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": payload.idempotencyKey,
      },
      body: JSON.stringify({
        from: payload.from,
        to: payload.to,
        ...(payload.replyTo && EMAIL_REGEX.test(payload.replyTo)
          ? { reply_to: payload.replyTo }
          : {}),
        subject: payload.subject,
        html: payload.html,
        text: payload.text,
      }),
      signal: AbortSignal.timeout(payload.timeoutMs ?? FAST_PATH_MAX_TIMEOUT_MS),
    });

    await resp.body?.cancel().catch(() => {});

    if (resp.ok) {
      if (dispatchedIdempotencyKeys.size > 1000) {
        dispatchedIdempotencyKeys.clear();
      }
      dispatchedIdempotencyKeys.add(payload.idempotencyKey);
      return { ok: true, retryable: false, error: null };
    }

    const retryable = resp.status === 429 || resp.status >= 500;
    return { ok: false, retryable, error: `Resend HTTP ${resp.status}` };
  } catch (err) {
    return {
      ok: false,
      retryable: true,
      error: err instanceof Error ? err.message : "Resend network/timeout error",
    };
  }
}

/**
 * Dispatches an HTTPS webhook using Node's `https.request` with connection-time
 * DNS lookup and IP validation (eliminating TOCTOU DNS-rebinding gaps),
 * non-redirect enforcement, keep-alive isolation (`agent: false`), and stream cancellation.
 */
export async function sendWebhookOnce(
  webhookUrl: string,
  idempotencyKey: string,
  body: Record<string, unknown>,
  options: {
    timeoutMs?: number;
    dnsLookup?: DnsLookupFn;
    requestFn?: typeof https.request;
  } = {}
): Promise<{ ok: boolean; retryable: boolean; error: string | null }> {
  if (!webhookUrl) {
    return { ok: false, retryable: false, error: null };
  }

  const webhooks = getWebhookConfig();
  if (!isSafeExternalHttpsUrl(webhookUrl, webhooks.allowedHosts)) {
    return {
      ok: false,
      retryable: false,
      error: "Blocked unsafe or unapproved webhook URL.",
    };
  }

  const parsed = new URL(webhookUrl);
  const timeoutMs = Math.max(400, options.timeoutMs ?? FAST_PATH_MAX_TIMEOUT_MS);
  const serializedBody = JSON.stringify(body);
  const requestImpl = options.requestFn ?? https.request;

  // Also pre-validate DNS cleanly before socket setup so explicit errors are deterministic
  const preCheck = await resolveAndValidateExternalHostname(
    parsed.hostname,
    options.dnsLookup
  );
  if ("reason" in preCheck) {
    return { ok: false, retryable: false, error: preCheck.reason };
  }

  return await new Promise((resolve) => {
    let settled = false;
    const finish = (result: { ok: boolean; retryable: boolean; error: string | null }) => {
      if (settled) return;
      settled = true;
      clearTimeout(hardTimer);
      resolve(result);
    };

    const connectionLookup: NonNullable<https.RequestOptions["lookup"]> = (
      hostname,
      opts,
      callback
    ) => {
      void resolveAndValidateExternalHostname(hostname, options.dnsLookup).then(
        (res) => {
          if ("reason" in res) {
            (callback as (err: Error) => void)(new Error(res.reason));
            return;
          }
          if (opts && (opts as { all?: boolean }).all) {
            (
              callback as unknown as (
                err: Error | null,
                addresses: Array<{ address: string; family: number }>
              ) => void
            )(null, res.records);
            return;
          }
          const first = res.records[0];
          (callback as (err: Error | null, address: string, family: number) => void)(
            null,
            first.address,
            first.family
          );
        }
      );
    };

    const req = requestImpl(
      {
        protocol: "https:",
        hostname: parsed.hostname.replace(/^\[|\]$/g, ""),
        port: 443,
        path: `${parsed.pathname}${parsed.search}`,
        method: "POST",
        agent: false,
        lookup: connectionLookup,
        headers: {
          "Content-Type": "application/json",
          "Content-Length": String(Buffer.byteLength(serializedBody, "utf8")),
          "X-Mindware-Idempotency-Key": idempotencyKey,
        },
      },
      (resp) => {
        const status = resp.statusCode ?? 0;
        // Destroy immediately to avoid buffering arbitrary/unbounded response bodies
        resp.destroy();

        if (status >= 300 && status < 400) {
          finish({
            ok: false,
            retryable: false,
            error: "Webhook redirects are disabled for security.",
          });
          return;
        }
        if (status >= 200 && status < 300) {
          finish({ ok: true, retryable: false, error: null });
          return;
        }
        finish({
          ok: false,
          retryable: status === 429 || status >= 500,
          error: `Webhook HTTP ${status}`,
        });
      }
    );

    const hardTimer = setTimeout(() => {
      req.destroy(new Error("Webhook request timed out"));
    }, timeoutMs);

    req.on("socket", (socket) => {
      socket.on("connect", () => {
        if (socket.remoteAddress && isPrivateOrReservedIp(socket.remoteAddress)) {
          req.destroy(new Error("Blocked non-public socket remote address."));
        }
      });
    });

    req.on("error", (err) => {
      const msg = err instanceof Error ? err.message : "Webhook network/timeout error";
      const nonRetryableSecurity =
        msg.includes("non-public") ||
        msg.includes("Blocked") ||
        msg.includes("DNS resolution failed");
      finish({
        ok: false,
        retryable: !nonRetryableSecurity,
        error: msg,
      });
    });

    req.write(serializedBody);
    req.end();
  });
}

/**
 * Budget-bounded fast-path delivery executed immediately after durable DB save.
 * Strictly obeys `deadlineAt` so total request duration stays safely under Vercel's 10s limit.
 * If remaining budget is insufficient, skips inline delivery so the pending outbox row
 * runs cleanly via the background worker without burning a retry attempt.
 */
export async function dispatchFastPathAndAudit(
  table: "business_enquiries" | "career_applications",
  persisted: PersistedRecordMeta,
  plan: {
    emailMessage: {
      idempotencyKey: string;
      from: string;
      to: string[];
      replyTo?: string;
      subject: string;
      html: string;
      text: string;
    } | null;
    webhookMessage: {
      url: string;
      idempotencyKey: string;
      body: Record<string, unknown>;
    } | null;
  },
  deadlineAt = Date.now() + 2600,
  dnsLookup?: DnsLookupFn,
  requestFn?: typeof https.request
): Promise<NotificationResult> {
  const remainingAtStart = deadlineAt - Date.now();
  if (remainingAtStart < MIN_BUDGET_TO_RUN_FAST_PATH_MS) {
    return {
      emailSent: false,
      webhookSent: false,
      emailError: null,
      webhookError: null,
      queuedForRetry: Boolean(persisted.emailOutboxId || persisted.webhookOutboxId),
      skippedFastPathDueToBudget: true,
    };
  }

  const timeoutMs = Math.max(
    500,
    Math.min(FAST_PATH_MAX_TIMEOUT_MS, remainingAtStart - RESERVED_POST_AUDIT_MS)
  );

  const emailPromise = plan.emailMessage
    ? sendResendEmailOnce({ ...plan.emailMessage, timeoutMs })
    : Promise.resolve({ ok: false, retryable: false, error: null as string | null });

  const webhookPromise = plan.webhookMessage
    ? sendWebhookOnce(
        plan.webhookMessage.url,
        plan.webhookMessage.idempotencyKey,
        plan.webhookMessage.body,
        { timeoutMs, dnsLookup, requestFn }
      )
    : Promise.resolve({ ok: false, retryable: false, error: null as string | null });

  const [emailRes, webhookRes] = await Promise.all([emailPromise, webhookPromise]);

  let queuedForRetry = false;
  const auditBudgetMs = Math.min(900, deadlineAt - Date.now());

  if (persisted.backend === "supabase" && auditBudgetMs >= 250) {
    const outboxUpdates: Array<Promise<void>> = [];

    if (persisted.emailOutboxId) {
      if (emailRes.ok) {
        outboxUpdates.push(markOutboxDelivered(persisted.emailOutboxId, auditBudgetMs));
      } else if (emailRes.error && emailRes.error !== "RESEND_NOT_CONFIGURED") {
        queuedForRetry = true;
        outboxUpdates.push(
          markOutboxRetryOrDeadLetter(
            persisted.emailOutboxId,
            1,
            5,
            emailRes.error,
            auditBudgetMs
          )
        );
      }
    }

    if (persisted.webhookOutboxId) {
      if (webhookRes.ok) {
        outboxUpdates.push(markOutboxDelivered(persisted.webhookOutboxId, auditBudgetMs));
      } else if (webhookRes.error) {
        queuedForRetry = true;
        outboxUpdates.push(
          markOutboxRetryOrDeadLetter(
            persisted.webhookOutboxId,
            1,
            5,
            webhookRes.error,
            auditBudgetMs
          )
        );
      }
    }

    const combinedError =
      [
        emailRes.error && emailRes.error !== "RESEND_NOT_CONFIGURED"
          ? emailRes.error
          : null,
        webhookRes.error,
      ]
        .filter(Boolean)
        .join("; ") || null;

    outboxUpdates.push(
      recordDeliveryAudit(
        table,
        persisted.referenceId,
        {
          notificationSent: emailRes.ok,
          webhookSent: webhookRes.ok,
          lastError: combinedError,
        },
        auditBudgetMs
      )
    );

    await Promise.all(outboxUpdates);
  } else if (
    (persisted.emailOutboxId && !emailRes.ok && plan.emailMessage) ||
    (persisted.webhookOutboxId && !webhookRes.ok && plan.webhookMessage)
  ) {
    queuedForRetry = true;
  }

  return {
    emailSent: emailRes.ok,
    webhookSent: webhookRes.ok,
    emailError: emailRes.error,
    webhookError: webhookRes.error,
    queuedForRetry,
  };
}

export async function dispatchNewsletterWebhookIfNew(
  input: ValidatedNewsletterInput,
  alreadyActive: boolean,
  deadlineAt = Date.now() + 2500,
  dnsLookup?: DnsLookupFn,
  requestFn?: typeof https.request
): Promise<boolean> {
  if (alreadyActive) return false;
  const webhooks = getWebhookConfig();
  if (!webhooks.enquiryWebhookUrl) return false;

  const remainingMs = deadlineAt - Date.now();
  if (remainingMs < 700) return false;

  const res = await sendWebhookOnce(
    webhooks.enquiryWebhookUrl,
    `news-${input.email}`,
    {
      event: "newsletter_subscriber.active",
      email: input.email,
      source: input.source,
      campaign: input.campaign,
      unsubscribeUrl: buildUnsubscribeUrl(input.email),
      subscribedAt: new Date().toISOString(),
    },
    {
      timeoutMs: Math.min(FAST_PATH_MAX_TIMEOUT_MS, remainingMs - 250),
      dnsLookup,
      requestFn,
    }
  );
  if (res.error) {
    console.warn(`[Mindware Notifications] Newsletter webhook warning: ${res.error}`);
  }
  return res.ok;
}

/**
 * Processes due rows from Supabase `notification_outbox` claimed atomically via
 * `FOR UPDATE SKIP LOCKED` (including stale `processing` recovery > 2 minutes),
 * respecting a shared worker execution budget (`OUTBOX_WORKER_BUDGET_MS`).
 */
export async function processDueOutboxBatch(
  batchLimit = 8,
  dnsLookup?: DnsLookupFn,
  requestFn?: typeof https.request
): Promise<{
  claimed: number;
  delivered: number;
  retrying: number;
  deadLettered: number;
  skippedDuplicate: number;
  deferred: number;
}> {
  const workerDeadlineAt = Date.now() + OUTBOX_WORKER_BUDGET_MS;
  const rows = await claimDueOutboxBatch(
    batchLimit,
    Math.min(2000, Math.max(600, workerDeadlineAt - Date.now()))
  );

  let delivered = 0;
  let retrying = 0;
  let deadLettered = 0;
  let skippedDuplicate = 0;
  let deferred = 0;

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const remainingMs = workerDeadlineAt - Date.now();

    if (remainingMs < 1500) {
      // Defer remaining unattempted jobs back to retrying without burning an attempt
      for (let j = i; j < rows.length; j++) {
        await releaseUnattemptedOutboxRow(rows[j].id, 600);
        deferred++;
      }
      break;
    }

    const preCheckTimeout = Math.min(900, Math.max(300, remainingMs - 1000));
    const alreadySent = await isTargetAlreadyNotified(
      row.entity_type,
      row.entity_reference_id,
      row.channel,
      preCheckTimeout
    );
    if (alreadySent) {
      await markOutboxDelivered(row.id, Math.min(800, workerDeadlineAt - Date.now()));
      skippedDuplicate++;
      continue;
    }

    const sendTimeoutMs = Math.max(
      500,
      Math.min(2600, workerDeadlineAt - Date.now() - 800)
    );
    let ok = false;
    let errMsg: string | null = null;

    if (row.channel === "email") {
      const p = row.payload as {
        from?: string;
        to?: string[];
        reply_to?: string;
        subject?: string;
        html?: string;
        text?: string;
      };
      const res = await sendResendEmailOnce({
        idempotencyKey: row.idempotency_key,
        from: p.from || getResendConfig().fromEmail,
        to: Array.isArray(p.to) && p.to.length > 0 ? p.to : [row.recipient],
        replyTo: p.reply_to,
        subject: p.subject || row.subject,
        html: p.html || "",
        text: p.text || "",
        timeoutMs: sendTimeoutMs,
      });
      ok = res.ok;
      errMsg = res.error;
    } else if (row.channel === "webhook") {
      const res = await sendWebhookOnce(
        row.recipient,
        row.idempotency_key,
        row.payload,
        { timeoutMs: sendTimeoutMs, dnsLookup, requestFn }
      );
      ok = res.ok;
      errMsg = res.error;
    }

    const table =
      row.entity_type === "business_enquiry"
        ? "business_enquiries"
        : row.entity_type === "career_application"
        ? "career_applications"
        : null;

    const patchBudgetMs = Math.max(300, Math.min(800, workerDeadlineAt - Date.now()));

    if (ok) {
      await markOutboxDelivered(row.id, patchBudgetMs);
      if (table) {
        await recordDeliveryAudit(
          table,
          row.entity_reference_id,
          {
            notificationSent: row.channel === "email",
            webhookSent: row.channel === "webhook",
            lastError: null,
          },
          patchBudgetMs
        );
      }
      delivered++;
    } else {
      await markOutboxRetryOrDeadLetter(
        row.id,
        row.attempt_count,
        row.max_attempts,
        errMsg || "Outbox delivery failed",
        patchBudgetMs
      );
      if (table && errMsg) {
        await recordDeliveryAudit(
          table,
          row.entity_reference_id,
          { lastError: errMsg },
          patchBudgetMs
        );
      }
      if (row.attempt_count >= row.max_attempts) {
        deadLettered++;
      } else {
        retrying++;
      }
    }
  }

  return {
    claimed: rows.length,
    delivered,
    retrying,
    deadLettered,
    skippedDuplicate,
    deferred,
  };
}

export function resetNotificationDedupeForTests(): void {
  dispatchedIdempotencyKeys.clear();
}
