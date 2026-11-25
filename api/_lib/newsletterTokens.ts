import crypto from "crypto";
import {
  getAppOriginUrl,
  getNewsletterPreviousSigningSecret,
  getNewsletterSigningSecret,
} from "./env.js";
import { EMAIL_REGEX } from "./validation.js";

const TOKEN_TTL_MS = 90 * 24 * 60 * 60 * 1000; // 90 days

function signPayloadWithSecret(encodedPayload: string, secret: string): string {
  return crypto
    .createHmac("sha256", secret)
    .update(encodedPayload)
    .digest("base64url");
}

function timingSafeStrEqual(aStr: string, bStr: string): boolean {
  const a = Buffer.from(aStr, "utf8");
  const b = Buffer.from(bStr, "utf8");
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export function createUnsubscribeToken(email: string): string {
  const normalized = email.trim().toLowerCase();
  const payload = JSON.stringify({
    e: normalized,
    iat: Date.now(),
    v: 1,
  });
  const encodedPayload = Buffer.from(payload, "utf8").toString("base64url");
  const signature = signPayloadWithSecret(encodedPayload, getNewsletterSigningSecret());
  return `${encodedPayload}.${signature}`;
}

export function buildUnsubscribeUrl(email: string): string {
  const token = createUnsubscribeToken(email);
  return `${getAppOriginUrl()}/api/newsletter/unsubscribe?token=${encodeURIComponent(token)}`;
}

export function verifyUnsubscribeToken(
  token: string
): { valid: true; email: string } | { valid: false; error: string } {
  if (!token || typeof token !== "string") {
    return { valid: false, error: "Unsubscribe token is required." };
  }

  const parts = token.trim().split(".");
  if (parts.length !== 2 || !parts[0] || !parts[1]) {
    return { valid: false, error: "Invalid unsubscribe token format." };
  }

  const [encodedPayload, providedSig] = parts;
  const currentSig = signPayloadWithSecret(encodedPayload, getNewsletterSigningSecret());
  const prevSecret = getNewsletterPreviousSigningSecret();
  const prevSig = prevSecret ? signPayloadWithSecret(encodedPayload, prevSecret) : "";

  const matchesCurrent = timingSafeStrEqual(providedSig, currentSig);
  const matchesPrevious = prevSig ? timingSafeStrEqual(providedSig, prevSig) : false;

  if (!matchesCurrent && !matchesPrevious) {
    return { valid: false, error: "Invalid or tampered unsubscribe token." };
  }

  try {
    const decoded = JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString("utf8")
    ) as { e?: string; iat?: number; v?: number };

    const email = typeof decoded.e === "string" ? decoded.e.trim().toLowerCase() : "";
    const issuedAt = Number(decoded.iat ?? 0);

    if (!EMAIL_REGEX.test(email) || decoded.v !== 1 || !Number.isFinite(issuedAt)) {
      return { valid: false, error: "Invalid unsubscribe token claims." };
    }

    if (Date.now() - issuedAt > TOKEN_TTL_MS || issuedAt > Date.now() + 60_000) {
      return { valid: false, error: "Unsubscribe link has expired." };
    }

    return { valid: true, email };
  } catch {
    return { valid: false, error: "Malformed unsubscribe token payload." };
  }
}
