import crypto from "crypto";
import dns from "dns/promises";
import net from "net";
import path from "path";

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const CANONICAL_ENQUIRY_CATEGORIES = new Set([
  "digital-transformation",
  "marketing-customer-acquisition",
  "business-growth-consulting",
  "construction-business-growth",
  "campaign-growth-season",
  "other-organization",
]);

export function sanitizeText(value: unknown, maxLen = 2000): string {
  if (typeof value !== "string") return "";
  return value.replace(/\0/g, "").trim().slice(0, maxLen);
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function normalizeEnquiryCategory(
  rawCategory: unknown,
  topicText = "",
  industryText = ""
): string {
  const val = typeof rawCategory === "string" ? rawCategory.trim().toLowerCase() : "";
  if (CANONICAL_ENQUIRY_CATEGORIES.has(val)) return val;

  const combined = `${val} ${topicText} ${industryText}`.toLowerCase();
  if (combined.includes("construction") || combined.includes("civil")) {
    return "construction-business-growth";
  }
  if (combined.includes("season") || combined.includes("campaign")) {
    return "campaign-growth-season";
  }
  if (
    combined.includes("marketing") ||
    combined.includes("seo") ||
    combined.includes("acquisition") ||
    combined.includes("social")
  ) {
    return "marketing-customer-acquisition";
  }
  if (
    combined.includes("consult") ||
    combined.includes("growth") ||
    combined.includes("advisory") ||
    combined.includes("management") ||
    combined.includes("enablement") ||
    combined.includes("training")
  ) {
    return "business-growth-consulting";
  }
  if (combined.includes("other")) {
    return "other-organization";
  }
  return "digital-transformation";
}

export function isValidHttpUrl(rawUrl: string): boolean {
  if (!rawUrl) return true;
  try {
    const parsed = new URL(rawUrl);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function isPrivateOrReservedIpv4(ip: string): boolean {
  const parts = ip.split(".").map(Number);
  if (parts.length !== 4 || parts.some((n) => !Number.isInteger(n) || n < 0 || n > 255)) {
    return true;
  }
  const [a, b] = parts;
  if (a === 0) return true; // 0.0.0.0/8
  if (a === 10) return true; // 10.0.0.0/8
  if (a === 100 && b >= 64 && b <= 127) return true; // 100.64.0.0/10 CGNAT
  if (a === 127) return true; // 127.0.0.0/8 loopback
  if (a === 169 && b === 254) return true; // 169.254.0.0/16 link-local & cloud metadata
  if (a === 172 && b >= 16 && b <= 31) return true; // 172.16.0.0/12
  if (a === 192 && b === 0 && parts[2] === 0) return true; // 192.0.0.0/24
  if (a === 192 && b === 168) return true; // 192.168.0.0/16
  if (a === 198 && (b === 18 || b === 19)) return true; // 198.18.0.0/15 benchmarking
  if (a >= 224) return true; // multicast & reserved 240.0.0.0/4
  return false;
}

function expandIpv6ToGroups(ip: string): number[] | null {
  const lower = ip.toLowerCase();
  if (net.isIPv6(lower) === false) return null;

  const doubleColonParts = lower.split("::");
  if (doubleColonParts.length > 2) return null;

  const parseSegment = (segment: string): number[] | null => {
    if (!segment) return [];
    const rawParts = segment.split(":");
    const groups: number[] = [];
    for (let i = 0; i < rawParts.length; i++) {
      const part = rawParts[i];
      if (part.includes(".")) {
        if (i !== rawParts.length - 1 || !net.isIPv4(part)) return null;
        const octets = part.split(".").map(Number);
        groups.push((octets[0] << 8) | octets[1], (octets[2] << 8) | octets[3]);
      } else {
        if (!/^[0-9a-f]{1,4}$/i.test(part)) return null;
        groups.push(parseInt(part, 16));
      }
    }
    return groups;
  };

  if (doubleColonParts.length === 2) {
    const left = parseSegment(doubleColonParts[0]);
    const right = parseSegment(doubleColonParts[1]);
    if (!left || !right) return null;
    const missing = 8 - (left.length + right.length);
    if (missing < 1) return null;
    return [...left, ...Array(missing).fill(0), ...right];
  }

  const full = parseSegment(lower);
  if (!full || full.length !== 8) return null;
  return full;
}

function groupsToIpv4(hi: number, lo: number): string {
  return `${(hi >> 8) & 0xff}.${hi & 0xff}.${(lo >> 8) & 0xff}.${lo & 0xff}`;
}

export function isPrivateOrReservedIp(rawIp: string): boolean {
  const cleaned = rawIp.trim().replace(/^\[|\]$/g, "").split("%")[0];
  const version = net.isIP(cleaned);
  if (version === 4) {
    return isPrivateOrReservedIpv4(cleaned);
  }
  if (version === 6) {
    const g = expandIpv6ToGroups(cleaned);
    if (!g) return true;

    const allZeroPrefix =
      g[0] === 0 && g[1] === 0 && g[2] === 0 && g[3] === 0 && g[4] === 0;

    // :: unspecified & ::1 loopback
    if (allZeroPrefix && g[5] === 0 && g[6] === 0 && (g[7] === 0 || g[7] === 1)) {
      return true;
    }
    // ::ffff:0:0/96 IPv4-mapped (catches dotted, hex, and expanded forms)
    if (allZeroPrefix && g[5] === 0xffff) {
      return isPrivateOrReservedIpv4(groupsToIpv4(g[6], g[7]));
    }
    // ::/96 IPv4-compatible deprecated
    if (allZeroPrefix && g[5] === 0) {
      return isPrivateOrReservedIpv4(groupsToIpv4(g[6], g[7]));
    }
    // 64:ff9b::/96 & 64:ff9b:1::/48 NAT64
    if (g[0] === 0x0064 && g[1] === 0xff9b && g[2] <= 1) {
      return true;
    }
    // 100::/64 discard-only
    if (g[0] === 0x0100 && g[1] === 0 && g[2] === 0 && g[3] === 0) {
      return true;
    }
    // fc00::/7 Unique Local Addresses
    if ((g[0] & 0xfe00) === 0xfc00) {
      return true;
    }
    // fe80::/10 Link-local & fec0::/10 deprecated site-local
    if ((g[0] & 0xffc0) === 0xfe80 || (g[0] & 0xffc0) === 0xfec0) {
      return true;
    }
    // ff00::/8 Multicast
    if ((g[0] & 0xff00) === 0xff00) {
      return true;
    }
    return false;
  }
  return true;
}

export function isHostAllowedByAllowlist(
  hostname: string,
  allowedHosts: string[]
): boolean {
  if (!allowedHosts || allowedHosts.length === 0) return true;
  const host = hostname.toLowerCase();
  return allowedHosts.some((entry) => {
    const allowed = entry.toLowerCase();
    return host === allowed || host.endsWith(`.${allowed}`);
  });
}

export function isSafeExternalHttpsUrl(
  rawUrl: string,
  allowedHosts: string[] = []
): boolean {
  try {
    const parsed = new URL(rawUrl);
    if (parsed.protocol !== "https:") return false;
    if (parsed.username || parsed.password) return false;
    if (parsed.port && parsed.port !== "443") return false;

    const host = parsed.hostname.toLowerCase().replace(/^\[|\]$/g, "");
    if (!host) return false;
    if (
      host === "localhost" ||
      host.endsWith(".localhost") ||
      host.endsWith(".local") ||
      host.endsWith(".internal") ||
      host === "metadata.google.internal"
    ) {
      return false;
    }

    if (net.isIP(host) !== 0 && isPrivateOrReservedIp(host)) {
      return false;
    }

    if (!isHostAllowedByAllowlist(host, allowedHosts)) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

export type DnsLookupFn = (
  hostname: string
) => Promise<Array<{ address: string; family: number }>>;

const defaultDnsLookup: DnsLookupFn = async (hostname: string) => {
  return dns.lookup(hostname, { all: true });
};

export async function resolveAndValidateExternalHostname(
  hostname: string,
  lookupFn: DnsLookupFn = defaultDnsLookup
): Promise<
  | { ok: true; records: Array<{ address: string; family: number }> }
  | { ok: false; reason: string }
> {
  const host = hostname.toLowerCase().replace(/^\[|\]$/g, "");
  if (net.isIP(host) !== 0) {
    if (isPrivateOrReservedIp(host)) {
      return { ok: false, reason: "Blocked private/reserved webhook IP." };
    }
    return {
      ok: true,
      records: [{ address: host, family: net.isIP(host) }],
    };
  }

  let timer: NodeJS.Timeout | undefined;
  try {
    const records = await Promise.race([
      lookupFn(host),
      new Promise<never>((_, reject) => {
        timer = setTimeout(() => reject(new Error("DNS_TIMEOUT")), 1000);
      }),
    ]);
    if (!Array.isArray(records) || records.length === 0) {
      return { ok: false, reason: "Webhook host failed DNS resolution." };
    }
    for (const rec of records) {
      if (!rec?.address || isPrivateOrReservedIp(rec.address)) {
        return {
          ok: false,
          reason: "Webhook DNS resolved to a non-public IP address.",
        };
      }
    }
    return { ok: true, records };
  } catch {
    return { ok: false, reason: "Webhook DNS resolution failed or timed out." };
  } finally {
    if (timer) clearTimeout(timer);
  }
}

/**
 * Validates URL syntax, optional host allowlist, and DNS resolution
 * to block internal network targets and DNS-rebinding addresses.
 */
export async function validateExternalWebhookTarget(
  rawUrl: string,
  allowedHosts: string[] = [],
  lookupFn: DnsLookupFn = defaultDnsLookup
): Promise<
  | { ok: true; url: URL; records: Array<{ address: string; family: number }> }
  | { ok: false; reason: string }
> {
  if (!isSafeExternalHttpsUrl(rawUrl, allowedHosts)) {
    return { ok: false, reason: "Blocked unsafe or unapproved webhook URL." };
  }

  const parsed = new URL(rawUrl);
  const resolved = await resolveAndValidateExternalHostname(
    parsed.hostname,
    lookupFn
  );
  if ("reason" in resolved) {
    return resolved;
  }
  return { ok: true, url: parsed, records: resolved.records };
}

export function computeSha256Hex(input: string): string {
  return crypto.createHash("sha256").update(input).digest("hex");
}

export interface ValidatedEnquiryInput {
  honeypot: string;
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  enquiryCategory: string;
  industrySector: string;
  campaignTrack: string;
  consultationTopic: string;
  serviceNeeded: string;
  engagementModel: string;
  projectDesc: string;
  submissionSource: string;
  landingPage: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
  fingerprint: string;
}

export function validateEnquiryPayload(
  body: Record<string, unknown>
): { ok: true; data: ValidatedEnquiryInput } | { ok: false; error: string } {
  const honeypot = sanitizeText(body._hp, 120);
  const fullName = sanitizeText(body.fullName, 120);
  const businessName = sanitizeText(body.businessName, 160);
  const email = sanitizeText(body.email, 160).toLowerCase();
  const phone = sanitizeText(body.phone, 40);
  const consultationTopic = sanitizeText(body.consultationTopic, 160);
  const serviceNeeded = sanitizeText(body.serviceNeeded, 160);
  const engagementModel = sanitizeText(body.engagementModel, 120);
  const industrySector = sanitizeText(body.industrySector, 120);
  const campaignTrack = sanitizeText(body.campaignTrack, 120);
  const projectDesc = sanitizeText(body.projectDesc, 4000);
  const submissionSource = sanitizeText(body.source, 80) || "contact-page";
  const landingPage = sanitizeText(body.pagePath ?? body.landingPage, 200);

  const rawUtms =
    body.utmParams && typeof body.utmParams === "object" && !Array.isArray(body.utmParams)
      ? (body.utmParams as Record<string, unknown>)
      : {};
  const utmSource = sanitizeText(rawUtms.utmSource ?? body.utm_source, 80);
  const utmMedium = sanitizeText(rawUtms.utmMedium ?? body.utm_medium, 80);
  const utmCampaign = sanitizeText(rawUtms.utmCampaign ?? body.utm_campaign, 80);
  const utmContent = sanitizeText(rawUtms.utmContent ?? body.utm_content, 80);
  const utmTerm = sanitizeText(rawUtms.utmTerm ?? body.utm_term, 80);

  const enquiryCategory = normalizeEnquiryCategory(
    body.enquiryCategory,
    `${consultationTopic} ${serviceNeeded}`,
    industrySector
  );

  if (honeypot.length > 0) {
    return {
      ok: true,
      data: {
        honeypot,
        fullName,
        businessName,
        email,
        phone,
        enquiryCategory,
        industrySector,
        campaignTrack,
        consultationTopic,
        serviceNeeded,
        engagementModel,
        projectDesc,
        submissionSource,
        landingPage,
        utmSource,
        utmMedium,
        utmCampaign,
        utmContent,
        utmTerm,
        fingerprint: "",
      },
    };
  }

  if (fullName.length < 2) {
    return { ok: false, error: "Please provide your full name." };
  }
  if (!email && phone.length < 6) {
    return {
      ok: false,
      error: "Please provide a valid email address or phone/WhatsApp number.",
    };
  }
  if (email && !EMAIL_REGEX.test(email)) {
    return {
      ok: false,
      error: "Please enter a valid corporate or personal email address.",
    };
  }
  if (projectDesc.length < 5 && !serviceNeeded && !consultationTopic) {
    return {
      ok: false,
      error: "Please include brief details about your enquiry or required solution.",
    };
  }

  const fingerprint = computeSha256Hex(
    `enquiry|${email || phone}|${enquiryCategory}|${projectDesc
      .toLowerCase()
      .replace(/\s+/g, " ")
      .slice(0, 200)}`
  );

  return {
    ok: true,
    data: {
      honeypot,
      fullName,
      businessName,
      email,
      phone,
      enquiryCategory,
      industrySector,
      campaignTrack,
      consultationTopic,
      serviceNeeded,
      engagementModel,
      projectDesc,
      submissionSource,
      landingPage,
      utmSource,
      utmMedium,
      utmCampaign,
      utmContent,
      utmTerm,
      fingerprint,
    },
  };
}

export interface ValidatedCareerApplicationInput {
  honeypot: string;
  mode: "vacancy" | "general";
  vacancyCode: string;
  vacancyTitle: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  discipline: string;
  engagementType: string;
  experienceYears: string;
  portfolioUrl: string;
  cvFileName: string;
  cvSubmissionMethod: "email_reference" | "none";
  motivation: string;
  fingerprint: string;
}

export function validateCareerApplicationPayload(
  body: Record<string, unknown>
):
  | { ok: true; data: ValidatedCareerApplicationInput }
  | { ok: false; error: string } {
  const honeypot = sanitizeText(body._hp, 120);
  const mode: "vacancy" | "general" = body.mode === "vacancy" ? "vacancy" : "general";
  const vacancyCode = sanitizeText(body.vacancyCode, 40);
  const vacancyTitle = sanitizeText(body.vacancyTitle, 160);
  const fullName = sanitizeText(body.fullName, 120);
  const email = sanitizeText(body.email, 160).toLowerCase();
  const phone = sanitizeText(body.phone, 40);
  const location = sanitizeText(body.location, 120);
  const discipline = sanitizeText(body.discipline, 120);
  const engagementType = sanitizeText(body.engagementType, 60);
  const experienceYears = sanitizeText(body.experienceYears, 60);
  const portfolioUrl = sanitizeText(body.portfolioUrl, 300);
  const rawCvName = sanitizeText(body.cvFileName, 140);
  const cvFileName = rawCvName ? path.basename(rawCvName).slice(0, 140) : "";
  const motivation = sanitizeText(body.motivation, 4000);

  if (honeypot.length > 0) {
    return {
      ok: true,
      data: {
        honeypot,
        mode,
        vacancyCode,
        vacancyTitle,
        fullName,
        email,
        phone,
        location,
        discipline,
        engagementType,
        experienceYears,
        portfolioUrl,
        cvFileName,
        cvSubmissionMethod: cvFileName ? "email_reference" : "none",
        motivation,
        fingerprint: "",
      },
    };
  }

  if (fullName.length < 2) {
    return { ok: false, error: "Full name is required." };
  }
  if (!EMAIL_REGEX.test(email)) {
    return { ok: false, error: "A valid email address is required." };
  }
  if (phone.length < 6) {
    return { ok: false, error: "A valid phone or WhatsApp number is required." };
  }
  if (motivation.length < 10) {
    return {
      ok: false,
      error:
        "Please summarize your relevant experience and outcomes achieved (at least 10 characters).",
    };
  }
  if (portfolioUrl && !isValidHttpUrl(portfolioUrl)) {
    return {
      ok: false,
      error: "Portfolio/LinkedIn URL must start with http:// or https://.",
    };
  }
  if (cvFileName && !/\.(pdf|doc|docx)(\s*\(\d+\s*KB\))?$/i.test(cvFileName)) {
    return {
      ok: false,
      error: "Only PDF, DOC, or DOCX CV filenames are permitted.",
    };
  }

  const fingerprint = computeSha256Hex(
    `career|${email}|${mode}|${vacancyCode}|${motivation
      .toLowerCase()
      .replace(/\s+/g, " ")
      .slice(0, 200)}`
  );

  return {
    ok: true,
    data: {
      honeypot,
      mode,
      vacancyCode,
      vacancyTitle,
      fullName,
      email,
      phone,
      location,
      discipline,
      engagementType,
      experienceYears,
      portfolioUrl,
      cvFileName,
      cvSubmissionMethod: cvFileName ? "email_reference" : "none",
      motivation,
      fingerprint,
    },
  };
}

export interface ValidatedNewsletterInput {
  honeypot: string;
  email: string;
  source: string;
  campaign: string;
}

export function validateNewsletterPayload(
  body: Record<string, unknown>
): { ok: true; data: ValidatedNewsletterInput } | { ok: false; error: string } {
  const honeypot = sanitizeText(body._hp, 120);
  const email = sanitizeText(body.email, 160).toLowerCase();
  const source = sanitizeText(body.source, 80) || "footer";
  const campaign = sanitizeText(body.campaign, 120);

  if (honeypot.length > 0) {
    return { ok: true, data: { honeypot, email, source, campaign } };
  }

  if (!EMAIL_REGEX.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  return { ok: true, data: { honeypot, email, source, campaign } };
}
