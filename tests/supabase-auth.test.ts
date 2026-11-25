import assert from "node:assert/strict";
import { EventEmitter } from "node:events";
import { afterEach, describe, it } from "node:test";
import {
  claimDueOutboxBatch,
  DuplicateSubmissionError,
  isTargetAlreadyNotified,
  markOutboxDelivered,
  markOutboxRetryOrDeadLetter,
  PersistenceUnavailableError,
  recordDeliveryAudit,
  releaseUnattemptedOutboxRow,
  saveBusinessEnquiry,
  saveCareerApplication,
  unsubscribeNewsletterSubscriber,
  upsertNewsletterSubscriber,
} from "../api/_lib/database";
import {
  getNewsletterPreviousSigningSecret,
  getNewsletterSigningSecret,
  getRateLimitSalt,
  getSupabaseConfig,
} from "../api/_lib/env";
import {
  handleCareerApplicationRequest,
  handleEnquiriesRequest,
  handleNewsletterRequest,
  handleProcessOutboxRequest,
} from "../api/_lib/handlers";
import { createUnsubscribeToken, verifyUnsubscribeToken } from "../api/_lib/newsletterTokens";
import { enforceRateLimit, resetMemoryRateLimitForTests } from "../api/_lib/rateLimit";

const TEST_SB_URL = "https://example-staging.supabase.co";
const TEST_SB_SECRET = "sb_secret_test_staging_key_0123456789abcdef";

const ORIGINAL_ENV = { ...process.env };
const ORIGINAL_FETCH = globalThis.fetch;

function restoreEnvironment(): void {
  for (const key of Object.keys(process.env)) {
    if (!(key in ORIGINAL_ENV)) {
      delete process.env[key];
    }
  }
  Object.assign(process.env, ORIGINAL_ENV);
  globalThis.fetch = ORIGINAL_FETCH;
  resetMemoryRateLimitForTests();
}

function makeMockReq(body: Record<string, unknown>, headers: Record<string, string> = {}) {
  const req = new EventEmitter() as EventEmitter & {
    method: string;
    url: string;
    headers: Record<string, string>;
    body: Record<string, unknown>;
    ip: string;
    socket: { remoteAddress: string };
  };
  req.method = "POST";
  req.url = "/";
  req.headers = { ...headers };
  req.body = body;
  req.ip = "198.51.100.42";
  req.socket = { remoteAddress: "198.51.100.42" };
  return req;
}

function makeMockRes() {
  const headers: Record<string, string> = {};
  let raw = "";
  const res = {
    statusCode: 200,
    setHeader(k: string, v: string) {
      headers[k.toLowerCase()] = String(v);
    },
    status(code: number) {
      this.statusCode = code;
      return this;
    },
    json(payload: unknown) {
      raw = JSON.stringify(payload);
      return this;
    },
    end(chunk?: string) {
      if (chunk) raw = String(chunk);
    },
  };
  return {
    res,
    get statusCode() {
      return res.statusCode;
    },
    jsonBody() {
      return JSON.parse(raw || "{}");
    },
  };
}

describe("Supabase Secret API Key (SUPABASE_SECRET_KEY) Migration", () => {
  afterEach(() => {
    restoreEnvironment();
  });

  it("accepts SUPABASE_SECRET_KEY starting with sb_secret_ and ignores legacy SUPABASE_SERVICE_ROLE_KEY", () => {
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;
    process.env.SUPABASE_URL = `${TEST_SB_URL}/`;
    process.env.SUPABASE_SECRET_KEY = TEST_SB_SECRET;

    const cfg = getSupabaseConfig();
    assert.equal(cfg.configured, true);
    assert.equal(cfg.url, TEST_SB_URL);
    assert.equal(cfg.secretKey, TEST_SB_SECRET);

    // Setting only the retired legacy key must NOT configure Supabase
    delete process.env.SUPABASE_SECRET_KEY;
    process.env.SUPABASE_SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.legacy";
    assert.equal(getSupabaseConfig().configured, false);
  });

  it("fails safely in production when SUPABASE_SECRET_KEY or SUPABASE_URL is missing or placeholder", async () => {
    process.env.NODE_ENV = "production";
    process.env.SUPABASE_URL = TEST_SB_URL;
    process.env.SUPABASE_SECRET_KEY = "YOUR_SUPABASE_SECRET_KEY";

    assert.equal(getSupabaseConfig().configured, false);

    await assert.rejects(
      () =>
        saveBusinessEnquiry("MW-ENQ-MISS", {
          honeypot: "",
          fullName: "Adaeze Okafor",
          businessName: "Apex Ltd",
          email: "ada@example.com",
          phone: "",
          enquiryCategory: "digital-transformation",
          industrySector: "",
          campaignTrack: "",
          consultationTopic: "",
          serviceNeeded: "Web Platform",
          engagementModel: "",
          projectDesc: "Digital transformation scoping request",
          submissionSource: "contact-page",
          landingPage: "/contact",
          utmSource: "",
          utmMedium: "",
          utmCampaign: "",
          utmContent: "",
          utmTerm: "",
          fingerprint: "fp-missing",
        }),
      PersistenceUnavailableError
    );

    delete process.env.SUPABASE_SECRET_KEY;
    const enqRes = makeMockRes();
    await handleEnquiriesRequest(
      makeMockReq({
        fullName: "Adaeze Okafor",
        email: "ada@example.com",
        projectDesc: "Missing secret safe 503 test",
      }) as never,
      enqRes.res as never
    );
    assert.equal(enqRes.statusCode, 503);

    const carRes = makeMockRes();
    await handleCareerApplicationRequest(
      makeMockReq({
        mode: "general",
        fullName: "Kemi Balogun",
        email: "kemi@example.com",
        phone: "+2348000000001",
        motivation: "Digital transformation consultant with 6 years experience.",
      }) as never,
      carRes.res as never
    );
    assert.equal(carRes.statusCode, 503);

    const newsRes = makeMockRes();
    await handleNewsletterRequest(
      makeMockReq({ email: "news@example.com" }) as never,
      newsRes.res as never
    );
    assert.equal(newsRes.statusCode, 503);

    process.env.CRON_SECRET = "cron-test-secret";
    const cronRes = makeMockRes();
    await handleProcessOutboxRequest(
      makeMockReq({}, { authorization: "Bearer cron-test-secret" }) as never,
      cronRes.res as never
    );
    assert.equal(cronRes.statusCode, 503);
  });

  it("sends SUPABASE_SECRET_KEY strictly via apikey header with Content-Type and zero Authorization Bearer headers across all RPC and REST operations", async () => {
    process.env.NODE_ENV = "production";
    process.env.SUPABASE_URL = TEST_SB_URL;
    process.env.SUPABASE_SECRET_KEY = TEST_SB_SECRET;

    const capturedCalls: Array<{ url: string; method: string; headers: Record<string, string> }> = [];

    globalThis.fetch = (async (input: string | URL | Request, init?: RequestInit) => {
      const url = String(input);
      const normalizedHeaders: Record<string, string> = {};
      const rawHeaders = (init?.headers || {}) as Record<string, string>;
      for (const [k, v] of Object.entries(rawHeaders)) {
        normalizedHeaders[k.toLowerCase()] = String(v);
      }
      capturedCalls.push({
        url,
        method: (init?.method || "GET").toUpperCase(),
        headers: normalizedHeaders,
      });

      if (url.includes("/rpc/create_business_enquiry_atomic")) {
        return new Response(
          JSON.stringify([
            {
              record_id: "rec-1",
              reference_id: "MW-ENQ-TEST",
              email_outbox_id: "ob-email-1",
              webhook_outbox_id: null,
            },
          ]),
          { status: 200 }
        );
      }
      if (url.includes("/rpc/create_career_application_atomic")) {
        return new Response(
          JSON.stringify([
            {
              record_id: "rec-2",
              reference_id: "MW-CAR-TEST",
              email_outbox_id: "ob-email-2",
              webhook_outbox_id: null,
            },
          ]),
          { status: 200 }
        );
      }
      if (url.includes("/rpc/upsert_newsletter_subscriber_atomic")) {
        return new Response(
          JSON.stringify([{ already_active: false, was_reactivated: false }]),
          { status: 200 }
        );
      }
      if (url.includes("/rpc/unsubscribe_newsletter_subscriber_atomic")) {
        return new Response(
          JSON.stringify([{ updated_count: 1, status: "unsubscribed" }]),
          { status: 200 }
        );
      }
      if (url.includes("/rpc/claim_notification_outbox_batch")) {
        return new Response(JSON.stringify([]), { status: 200 });
      }
      if (url.includes("?select=notification_sent_at")) {
        return new Response(JSON.stringify([{ notification_sent_at: null }]), { status: 200 });
      }
      return new Response("", { status: 204 });
    }) as typeof fetch;

    const enqSaved = await saveBusinessEnquiry("MW-ENQ-TEST", {
      honeypot: "",
      fullName: "Chinedu Eze",
      businessName: "GrowthCorp",
      email: "chinedu@example.com",
      phone: "+2348000000002",
      enquiryCategory: "digital-transformation",
      industrySector: "Construction",
      campaignTrack: "",
      consultationTopic: "CRM Setup",
      serviceNeeded: "Digital Transformation",
      engagementModel: "Project",
      projectDesc: "Upgrade corporate digital infrastructure and CRM",
      submissionSource: "contact-page",
      landingPage: "/contact",
      utmSource: "",
      utmMedium: "",
      utmCampaign: "",
      utmContent: "",
      utmTerm: "",
      fingerprint: "fp-1",
    });
    assert.equal(enqSaved.backend, "supabase");
    assert.equal(enqSaved.referenceId, "MW-ENQ-TEST");

    const carSaved = await saveCareerApplication("MW-CAR-TEST", {
      honeypot: "",
      mode: "vacancy",
      vacancyCode: "MW-CON-01",
      vacancyTitle: "Consultant",
      fullName: "Ngozi Obi",
      email: "ngozi@example.com",
      phone: "+2348000000003",
      location: "Lagos",
      discipline: "Strategy",
      engagementType: "Full-time",
      experienceYears: "3-5 years",
      portfolioUrl: "https://example.com/portfolio",
      cvFileName: "cv.pdf",
      cvSubmissionMethod: "email_reference",
      motivation: "Extensive experience delivering enterprise digital roadmaps.",
      fingerprint: "fp-2",
    });
    assert.equal(carSaved.backend, "supabase");

    const subRes = await upsertNewsletterSubscriber({
      honeypot: "",
      email: "sub@example.com",
      source: "insights-page",
      campaign: "",
    });
    assert.equal(subRes.backend, "supabase");
    assert.equal(subRes.alreadyActive, false);

    const unsubRes = await unsubscribeNewsletterSubscriber("sub@example.com");
    assert.equal(unsubRes.backend, "supabase");
    assert.equal(unsubRes.unsubscribed, true);

    assert.equal(await isTargetAlreadyNotified("business_enquiry", "MW-ENQ-TEST", "email"), false);
    await markOutboxDelivered("ob-email-1");
    await markOutboxRetryOrDeadLetter("ob-email-1", 1, 5, "Temporary failure");
    await releaseUnattemptedOutboxRow("ob-email-1");
    await claimDueOutboxBatch(8);
    await recordDeliveryAudit("business_enquiries", "MW-ENQ-TEST", {
      notificationSent: true,
      lastError: null,
    });

    assert.equal(capturedCalls.length, 10);
    for (const call of capturedCalls) {
      assert.equal(call.headers["apikey"], TEST_SB_SECRET, `Missing sb_secret apikey on ${call.url}`);
      assert.equal(call.headers["content-type"], "application/json", `Missing Content-Type on ${call.url}`);
      assert.equal(call.headers["authorization"], undefined, `Unexpected Authorization header on ${call.url}`);
    }
  });

  it("maps duplicate RPC exceptions to DuplicateSubmissionError using SUPABASE_SECRET_KEY", async () => {
    process.env.NODE_ENV = "production";
    process.env.SUPABASE_URL = TEST_SB_URL;
    process.env.SUPABASE_SECRET_KEY = TEST_SB_SECRET;

    globalThis.fetch = (async () =>
      new Response(JSON.stringify({ code: "P0001", message: "DUPLICATE_SUBMISSION" }), {
        status: 400,
      })) as typeof fetch;

    await assert.rejects(
      () =>
        saveBusinessEnquiry("MW-ENQ-DUP", {
          honeypot: "",
          fullName: "Dup User",
          businessName: "",
          email: "dup@example.com",
          phone: "",
          enquiryCategory: "digital-transformation",
          industrySector: "",
          campaignTrack: "",
          consultationTopic: "",
          serviceNeeded: "SEO",
          engagementModel: "",
          projectDesc: "Duplicate submission test description",
          submissionSource: "contact-page",
          landingPage: "/contact",
          utmSource: "",
          utmMedium: "",
          utmCampaign: "",
          utmContent: "",
          utmTerm: "",
          fingerprint: "fp-dup",
        }),
      DuplicateSubmissionError
    );
  });

  it("never falls back to SUPABASE_SECRET_KEY for RATE_LIMIT_SALT or NEWSLETTER_SIGNING_SECRET and preserves rotation", async () => {
    process.env.SUPABASE_URL = TEST_SB_URL;
    process.env.SUPABASE_SECRET_KEY = TEST_SB_SECRET;
    delete process.env.RATE_LIMIT_SALT;
    delete process.env.NEWSLETTER_SIGNING_SECRET;
    delete process.env.NEWSLETTER_PREVIOUS_SIGNING_SECRET;

    assert.notEqual(getRateLimitSalt(), TEST_SB_SECRET);
    assert.notEqual(getNewsletterSigningSecret(), TEST_SB_SECRET);
    assert.equal(getNewsletterPreviousSigningSecret(), "");

    // Independent secrets take precedence cleanly and support token rotation
    process.env.RATE_LIMIT_SALT = "independent-rate-salt-2026";
    process.env.NEWSLETTER_SIGNING_SECRET = "independent-signing-secret-v1";
    const tokenFromV1 = createUnsubscribeToken("reader@example.com");

    process.env.NEWSLETTER_PREVIOUS_SIGNING_SECRET = "independent-signing-secret-v1";
    process.env.NEWSLETTER_SIGNING_SECRET = "independent-signing-secret-v2";

    assert.equal(getRateLimitSalt(), "independent-rate-salt-2026");
    const verified = verifyUnsubscribeToken(tokenFromV1);
    assert.equal(verified.valid, true);
    if (verified.valid) {
      assert.equal(verified.email, "reader@example.com");
    }

    const rl = await enforceRateLimit("newsletter", "hashed-ip-check");
    assert.equal(rl.allowed, true);
  });
});
