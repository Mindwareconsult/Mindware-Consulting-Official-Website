import crypto from "crypto";
import type https from "https";
import {
  DuplicateSubmissionError,
  PersistenceUnavailableError,
  saveBusinessEnquiry,
  saveCareerApplication,
  unsubscribeNewsletterSubscriber,
  upsertNewsletterSubscriber,
} from "./database";
import { getCronSecret } from "./env";
import {
  enhanceExperienceBullets,
  GeminiUnavailableError,
  generateCoverLetterContent,
  generateCvContent,
} from "./gemini";
import {
  applyApiSecurityHeaders,
  getHashedClientIp,
  PayloadError,
  readJsonBody,
  rejectUnsupportedMethod,
  sendJson,
  type ApiRequest,
  type ApiResponse,
} from "./http";
import {
  buildUnsubscribeUrl,
  verifyUnsubscribeToken,
} from "./newsletterTokens";
import {
  buildCareerNotificationPlan,
  buildEnquiryNotificationPlan,
  dispatchFastPathAndAudit,
  dispatchNewsletterWebhookIfNew,
  processDueOutboxBatch,
} from "./notifications";
import { applyRateLimitHeaders, enforceRateLimit } from "./rateLimit";
import {
  escapeHtml,
  validateCareerApplicationPayload,
  validateEnquiryPayload,
  validateNewsletterPayload,
  type DnsLookupFn,
} from "./validation";

export const REQUEST_DEADLINE_BUDGET_MS = 7800;

function extractBearerToken(req: ApiRequest): string {
  const auth = req.headers["authorization"];
  if (typeof auth !== "string") return "";
  const match = /^Bearer\s+(.+)$/i.exec(auth.trim());
  return match?.[1]?.trim() || "";
}

function timingSafeMatch(provided: string, expected: string): boolean {
  if (!provided || !expected) return false;
  const a = Buffer.from(provided, "utf8");
  const b = Buffer.from(expected, "utf8");
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

function getStageTimeout(deadlineAt: number, capMs: number, minMs = 400): number {
  const remaining = Math.max(0, deadlineAt - Date.now());
  return Math.max(minMs, Math.min(capMs, remaining));
}

export async function handleEnquiriesRequest(
  req: ApiRequest,
  res: ApiResponse,
  options: { dnsLookup?: DnsLookupFn; requestFn?: typeof https.request } = {}
): Promise<void> {
  if (rejectUnsupportedMethod(req, res)) return;
  const deadlineAt = Date.now() + REQUEST_DEADLINE_BUDGET_MS;

  try {
    const body = await readJsonBody(req);
    const validation = validateEnquiryPayload(body);
    if ("error" in validation) {
      sendJson(res, 400, { success: false, error: validation.error });
      return;
    }

    const input = validation.data;
    if (input.honeypot.length > 0) {
      sendJson(res, 200, {
        success: true,
        referenceId: "MW-RECEIVED",
        message: "Thank you. Your submission has been received.",
      });
      return;
    }

    const rateResult = await enforceRateLimit(
      "enquiries",
      getHashedClientIp(req),
      getStageTimeout(deadlineAt, 1000, 300)
    );
    applyRateLimitHeaders(res, rateResult);
    if (!rateResult.allowed) {
      sendJson(res, 429, {
        success: false,
        error:
          "Too many enquiry requests from your network right now. Please try again in a few minutes or message us directly on WhatsApp.",
      });
      return;
    }

    const referenceId = `MW-ENQ-${Date.now()
      .toString(36)
      .toUpperCase()}-${crypto.randomBytes(2).toString("hex").toUpperCase()}`;

    const plan = buildEnquiryNotificationPlan(referenceId, input);
    const saved = await saveBusinessEnquiry(
      referenceId,
      input,
      plan.outbox,
      getStageTimeout(deadlineAt, 3000, 800)
    );

    try {
      await dispatchFastPathAndAudit(
        "business_enquiries",
        saved,
        plan,
        deadlineAt,
        options.dnsLookup,
        options.requestFn
      );
    } catch {
      console.warn(
        `[Mindware Enquiries] Non-blocking fast-path notification warning for ${saved.referenceId}.`
      );
    }

    sendJson(res, 201, {
      success: true,
      referenceId: saved.referenceId,
      enquiryCategory: input.enquiryCategory,
      message:
        "Your Business Growth Review enquiry has been received and logged by Mindware Consulting Ltd.",
    });
  } catch (err) {
    if (err instanceof PayloadError) {
      sendJson(res, err.statusCode, { success: false, error: err.message });
      return;
    }
    if (err instanceof DuplicateSubmissionError) {
      sendJson(res, 409, { success: false, error: err.message });
      return;
    }
    if (err instanceof PersistenceUnavailableError) {
      console.error("[Mindware Enquiries] Persistence unavailable:", err.message);
      sendJson(res, 503, {
        success: false,
        error:
          "Submission storage is temporarily unavailable on this runtime. Please contact +234 812 508 2354 or email contact@mindwareconsult.com.ng.",
      });
      return;
    }
    console.error("[Mindware Enquiries] Unexpected processing error.");
    sendJson(res, 500, {
      success: false,
      error:
        "We could not complete your enquiry submission right now. Please contact +234 812 508 2354 or email contact@mindwareconsult.com.ng.",
    });
  }
}

export async function handleCareerApplicationRequest(
  req: ApiRequest,
  res: ApiResponse,
  options: { dnsLookup?: DnsLookupFn; requestFn?: typeof https.request } = {}
): Promise<void> {
  if (rejectUnsupportedMethod(req, res)) return;
  const deadlineAt = Date.now() + REQUEST_DEADLINE_BUDGET_MS;

  try {
    const body = await readJsonBody(req);
    const validation = validateCareerApplicationPayload(body);
    if ("error" in validation) {
      sendJson(res, 400, { success: false, error: validation.error });
      return;
    }

    const input = validation.data;
    if (input.honeypot.length > 0) {
      sendJson(res, 200, {
        success: true,
        referenceId: "MW-EOI-RECEIVED",
        message: "Thank you. Your application has been received.",
      });
      return;
    }

    const rateResult = await enforceRateLimit(
      "careers",
      getHashedClientIp(req),
      getStageTimeout(deadlineAt, 1000, 300)
    );
    applyRateLimitHeaders(res, rateResult);
    if (!rateResult.allowed) {
      sendJson(res, 429, {
        success: false,
        error:
          "Too many submission attempts from your network right now. Please try again shortly.",
      });
      return;
    }

    const prefix =
      input.mode === "vacancy" && input.vacancyCode
        ? input.vacancyCode.replace(/[^A-Z0-9-]/gi, "").slice(0, 16)
        : "MW-EOI";
    const referenceId = `${prefix}-${Date.now()
      .toString(36)
      .toUpperCase()
      .slice(-4)}-${crypto.randomBytes(2).toString("hex").toUpperCase()}`;

    const plan = buildCareerNotificationPlan(referenceId, input);
    const saved = await saveCareerApplication(
      referenceId,
      input,
      plan.outbox,
      getStageTimeout(deadlineAt, 3000, 800)
    );

    try {
      await dispatchFastPathAndAudit(
        "career_applications",
        saved,
        plan,
        deadlineAt,
        options.dnsLookup,
        options.requestFn
      );
    } catch {
      console.warn(
        `[Mindware Careers] Non-blocking fast-path notification warning for ${saved.referenceId}.`
      );
    }

    sendJson(res, 201, {
      success: true,
      referenceId: saved.referenceId,
      message:
        "Your application has been recorded for review by Mindware Consulting Ltd.",
    });
  } catch (err) {
    if (err instanceof PayloadError) {
      sendJson(res, err.statusCode, { success: false, error: err.message });
      return;
    }
    if (err instanceof DuplicateSubmissionError) {
      sendJson(res, 409, { success: false, error: err.message });
      return;
    }
    if (err instanceof PersistenceUnavailableError) {
      console.error("[Mindware Careers] Persistence unavailable:", err.message);
      sendJson(res, 503, {
        success: false,
        error:
          "Application storage is temporarily unavailable right now. Please email your CV directly to contact@mindwareconsult.com.ng.",
      });
      return;
    }
    console.error("[Mindware Careers] Unexpected processing error.");
    sendJson(res, 500, {
      success: false,
      error:
        "We could not submit your application right now. Please email your CV directly to contact@mindwareconsult.com.ng.",
    });
  }
}

export async function handleNewsletterRequest(
  req: ApiRequest,
  res: ApiResponse,
  options: { dnsLookup?: DnsLookupFn; requestFn?: typeof https.request } = {}
): Promise<void> {
  if (rejectUnsupportedMethod(req, res)) return;
  const deadlineAt = Date.now() + REQUEST_DEADLINE_BUDGET_MS;

  try {
    const body = await readJsonBody(req);
    const validation = validateNewsletterPayload(body);
    if ("error" in validation) {
      sendJson(res, 400, { success: false, error: validation.error });
      return;
    }

    const input = validation.data;
    if (input.honeypot.length > 0) {
      sendJson(res, 200, {
        success: true,
        message: "Subscribed to Mindware Insights.",
      });
      return;
    }

    const rateResult = await enforceRateLimit(
      "newsletter",
      getHashedClientIp(req),
      getStageTimeout(deadlineAt, 1000, 300)
    );
    applyRateLimitHeaders(res, rateResult);
    if (!rateResult.allowed) {
      sendJson(res, 429, {
        success: false,
        error:
          "Too many subscription requests right now. Please try again shortly.",
      });
      return;
    }

    const result = await upsertNewsletterSubscriber(
      input,
      getStageTimeout(deadlineAt, 3000, 800)
    );

    try {
      await dispatchNewsletterWebhookIfNew(
        input,
        result.alreadyActive,
        deadlineAt,
        options.dnsLookup,
        options.requestFn
      );
    } catch {
      console.warn("[Mindware Newsletter] Non-blocking webhook warning.");
    }

    res.setHeader("List-Unsubscribe", `<${buildUnsubscribeUrl(input.email)}>`);
    res.setHeader("List-Unsubscribe-Post", "List-Unsubscribe=One-Click");

    sendJson(res, result.alreadyActive ? 200 : 201, {
      success: true,
      message: "Subscribed to Mindware Insights.",
    });
  } catch (err) {
    if (err instanceof PayloadError) {
      sendJson(res, err.statusCode, { success: false, error: err.message });
      return;
    }
    if (err instanceof PersistenceUnavailableError) {
      console.error("[Mindware Newsletter] Persistence unavailable:", err.message);
      sendJson(res, 503, {
        success: false,
        error: "Newsletter subscription storage is temporarily unavailable.",
      });
      return;
    }
    console.error("[Mindware Newsletter] Unexpected processing error.");
    sendJson(res, 500, {
      success: false,
      error: "Unable to subscribe right now. Please try again shortly.",
    });
  }
}

export async function handleNewsletterUnsubscribeRequest(
  req: ApiRequest,
  res: ApiResponse
): Promise<void> {
  const method = (req.method || "").toUpperCase();
  if (method !== "GET" && method !== "POST") {
    res.setHeader("Allow", "GET, POST");
    sendJson(res, 405, {
      success: false,
      error: "Method not allowed.",
    });
    return;
  }

  try {
    const rateResult = await enforceRateLimit("newsletter", getHashedClientIp(req), 1000);
    applyRateLimitHeaders(res, rateResult);
    if (!rateResult.allowed) {
      sendJson(res, 429, {
        success: false,
        error: "Too many requests right now. Please try again shortly.",
      });
      return;
    }

    const parsedUrl = new URL(req.url || "/", "https://mindwareconsult.com.ng");
    const queryToken = parsedUrl.searchParams.get("token")?.trim() || "";

    if (method === "GET") {
      // Scanner-safe confirmation view: GET never alters subscription state.
      const verification = verifyUnsubscribeToken(queryToken);
      applyApiSecurityHeaders(res);
      res.setHeader("Content-Type", "text/html; charset=utf-8");

      if ("error" in verification) {
        res.statusCode = 400;
        res.end(
          `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Unsubscribe Link Invalid | Mindware Consulting Ltd</title></head><body style="font-family:system-ui,sans-serif;background:#050b18;color:#fff;padding:48px 24px;text-align:center;"><h1>Unable to Process Unsubscribe Link</h1><p style="color:#cbd5e1;">${escapeHtml(
            verification.error
          )}</p></body></html>`
        );
        return;
      }

      res.statusCode = 200;
      res.end(
        `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Confirm Unsubscribe | Mindware Consulting Ltd</title></head><body style="font-family:system-ui,sans-serif;background:#050b18;color:#fff;padding:48px 24px;text-align:center;"><h1>Confirm Unsubscribe</h1><p style="color:#cbd5e1;max-width:520px;margin:16px auto;">Confirm below to stop receiving Mindware Insights marketing emails at <strong>${escapeHtml(
          verification.email
        )}</strong>.</p><form method="POST" action="/api/newsletter/unsubscribe" style="margin-top:24px;"><input type="hidden" name="token" value="${escapeHtml(
          queryToken
        )}" /><button type="submit" style="background:#f97316;color:#fff;border:none;border-radius:999px;padding:12px 28px;font-weight:700;cursor:pointer;">Confirm Unsubscribe</button></form></body></html>`
      );
      return;
    }

    // POST executes the unsubscribe mutation (supports JSON, form POST confirmation, and RFC 8058 One-Click)
    const body = await readJsonBody(req);
    const bodyToken = typeof body.token === "string" ? body.token.trim() : "";
    const token = bodyToken || queryToken;

    const verification = verifyUnsubscribeToken(token);
    if ("error" in verification) {
      sendJson(res, 400, { success: false, error: verification.error });
      return;
    }

    await unsubscribeNewsletterSubscriber(verification.email);

    const contentType = String(req.headers["content-type"] || "").toLowerCase();
    const acceptHeader = String(req.headers["accept"] || "").toLowerCase();
    const isOneClickHeader = body["List-Unsubscribe"] === "One-Click";
    if (
      contentType.includes("application/x-www-form-urlencoded") &&
      !isOneClickHeader &&
      acceptHeader.includes("text/html")
    ) {
      applyApiSecurityHeaders(res);
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.end(
        `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Unsubscribed | Mindware Consulting Ltd</title></head><body style="font-family:system-ui,sans-serif;background:#050b18;color:#fff;padding:48px 24px;text-align:center;"><h1>Unsubscribed from Mindware Insights</h1><p style="color:#cbd5e1;"><strong>${escapeHtml(
          verification.email
        )}</strong> will no longer receive marketing updates from Mindware Consulting Ltd.</p></body></html>`
      );
      return;
    }

    sendJson(res, 200, {
      success: true,
      unsubscribed: true,
      message: "You have been unsubscribed from Mindware Insights.",
    });
  } catch (err) {
    if (err instanceof PayloadError) {
      sendJson(res, err.statusCode, { success: false, error: err.message });
      return;
    }
    if (err instanceof PersistenceUnavailableError) {
      sendJson(res, 503, {
        success: false,
        error: "Newsletter storage is temporarily unavailable.",
      });
      return;
    }
    console.error("[Mindware Newsletter] Unsubscribe error.");
    sendJson(res, 500, {
      success: false,
      error: "Unable to process unsubscribe request right now.",
    });
  }
}

export async function handleProcessOutboxRequest(
  req: ApiRequest,
  res: ApiResponse,
  options: { dnsLookup?: DnsLookupFn; requestFn?: typeof https.request } = {}
): Promise<void> {
  const method = (req.method || "").toUpperCase();
  if (method !== "GET" && method !== "POST") {
    res.setHeader("Allow", "GET, POST");
    sendJson(res, 405, { success: false, error: "Method not allowed." });
    return;
  }

  const configuredSecret = getCronSecret();
  if (!configuredSecret) {
    sendJson(res, 503, {
      success: false,
      error: "Outbox worker authentication secret is not configured.",
    });
    return;
  }

  const providedToken = extractBearerToken(req);
  if (!timingSafeMatch(providedToken, configuredSecret)) {
    sendJson(res, 401, { success: false, error: "Unauthorized." });
    return;
  }

  try {
    const summary = await processDueOutboxBatch(8, options.dnsLookup, options.requestFn);
    sendJson(res, 200, {
      success: true,
      ...summary,
    });
  } catch (err) {
    if (err instanceof PersistenceUnavailableError) {
      sendJson(res, 503, { success: false, error: err.message });
      return;
    }
    console.error("[Mindware Outbox] Worker processing failure.");
    sendJson(res, 500, {
      success: false,
      error: "Failed to process notification outbox batch.",
    });
  }
}

async function handleGeminiEndpoint(
  req: ApiRequest,
  res: ApiResponse,
  runner: (body: Record<string, unknown>) => Promise<Record<string, unknown>>,
  fallbackError: string
): Promise<void> {
  if (rejectUnsupportedMethod(req, res)) return;

  try {
    const rateResult = await enforceRateLimit("gemini", getHashedClientIp(req));
    applyRateLimitHeaders(res, rateResult);
    if (!rateResult.allowed) {
      if (rateResult.protectionLevel === "degraded-fail-closed") {
        sendJson(res, 503, {
          success: false,
          error:
            "AI writing assistance is temporarily paused while rate-limit infrastructure recovers. Please retry shortly.",
        });
        return;
      }
      sendJson(res, 429, {
        success: false,
        error: "Too many AI requests right now. Please wait a few minutes.",
      });
      return;
    }

    const body = await readJsonBody(req);
    const result = await runner(body);
    sendJson(res, 200, result);
  } catch (err) {
    if (err instanceof PayloadError || err instanceof GeminiUnavailableError) {
      sendJson(res, err.statusCode, { success: false, error: err.message });
      return;
    }
    console.error("[Mindware Gemini] Upstream processing error.");
    sendJson(res, 502, {
      success: false,
      error: fallbackError,
    });
  }
}

export async function handleGenerateCvRequest(
  req: ApiRequest,
  res: ApiResponse
): Promise<void> {
  await handleGeminiEndpoint(
    req,
    res,
    async (body) => {
      const output = await generateCvContent(body);
      return {
        summary: output.summary,
        bullets: output.bullets,
        atsKeywords: output.atsKeywords,
        success: true,
        source: output.model,
      };
    },
    "Unable to generate CV enhancement right now. Please try again."
  );
}

export async function handleEnhanceBulletsRequest(
  req: ApiRequest,
  res: ApiResponse
): Promise<void> {
  await handleGeminiEndpoint(
    req,
    res,
    async (body) => {
      const output = await enhanceExperienceBullets(body);
      return {
        enhancedBullets: output.enhancedBullets,
        success: true,
        source: output.model,
      };
    },
    "Unable to enhance bullets right now. Please try again."
  );
}

export async function handleCoverLetterRequest(
  req: ApiRequest,
  res: ApiResponse
): Promise<void> {
  await handleGeminiEndpoint(
    req,
    res,
    async (body) => {
      const output = await generateCoverLetterContent(body);
      return {
        coverLetter: output.coverLetter,
        success: true,
        source: output.model,
      };
    },
    "Unable to generate cover letter right now. Please try again."
  );
}
