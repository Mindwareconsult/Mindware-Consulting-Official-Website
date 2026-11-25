import crypto from "crypto";
import type { IncomingMessage, ServerResponse } from "http";
import { getRateLimitSalt } from "./env";

export interface ApiRequest extends IncomingMessage {
  body?: unknown;
  ip?: string;
}

export interface ApiResponse extends ServerResponse {
  status?: (code: number) => ApiResponse;
  json?: (payload: unknown) => ApiResponse | void;
}

const MAX_JSON_BYTES = 64 * 1024; // 64 KB cap for form & AI endpoints

export function applyApiSecurityHeaders(res: ApiResponse): void {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  res.setHeader("Cache-Control", "no-store, max-age=0");
}

export function sendJson(
  res: ApiResponse,
  statusCode: number,
  payload: Record<string, unknown>
): void {
  applyApiSecurityHeaders(res);
  if (typeof res.status === "function" && typeof res.json === "function") {
    res.status(statusCode).json(payload);
    return;
  }
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(payload));
}

export function rejectUnsupportedMethod(req: ApiRequest, res: ApiResponse): boolean {
  const method = (req.method || "").toUpperCase();
  if (method === "POST") return false;
  res.setHeader("Allow", "POST");
  sendJson(res, 405, {
    success: false,
    error: "Method not allowed. Please submit this form using POST.",
  });
  return true;
}

export class PayloadError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

function parseBodyString(
  rawText: string,
  contentType: string
): Record<string, unknown> {
  const trimmed = rawText.trim();
  if (!trimmed) return {};

  if (contentType.includes("application/x-www-form-urlencoded")) {
    const params = new URLSearchParams(trimmed);
    const out: Record<string, unknown> = {};
    for (const [k, v] of params.entries()) {
      out[k] = v;
    }
    return out;
  }

  try {
    const parsed = JSON.parse(trimmed);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new PayloadError("Request body must be a JSON object.", 400);
    }
    return parsed as Record<string, unknown>;
  } catch (err) {
    if (err instanceof PayloadError) throw err;
    throw new PayloadError("Invalid JSON request body.", 400);
  }
}

export async function readJsonBody(
  req: ApiRequest
): Promise<Record<string, unknown>> {
  const contentType = String(req.headers["content-type"] || "").toLowerCase();
  const contentLengthHeader = req.headers["content-length"];
  if (typeof contentLengthHeader === "string") {
    const declaredLength = Number(contentLengthHeader);
    if (Number.isFinite(declaredLength) && declaredLength > MAX_JSON_BYTES) {
      throw new PayloadError("Request payload is too large.", 413);
    }
  }

  if (req.body !== undefined && req.body !== null) {
    if (typeof req.body === "string") {
      if (Buffer.byteLength(req.body, "utf8") > MAX_JSON_BYTES) {
        throw new PayloadError("Request payload is too large.", 413);
      }
      return parseBodyString(req.body, contentType);
    }
    if (typeof req.body === "object" && !Array.isArray(req.body)) {
      const approxBytes = Buffer.byteLength(JSON.stringify(req.body), "utf8");
      if (approxBytes > MAX_JSON_BYTES) {
        throw new PayloadError("Request payload is too large.", 413);
      }
      return req.body as Record<string, unknown>;
    }
    throw new PayloadError("Request body must be a JSON object.", 400);
  }

  const chunks: Buffer[] = [];
  let totalBytes = 0;

  await new Promise<void>((resolve, reject) => {
    req.on("data", (chunk: Buffer | string) => {
      const buf = typeof chunk === "string" ? Buffer.from(chunk, "utf8") : chunk;
      totalBytes += buf.length;
      if (totalBytes > MAX_JSON_BYTES) {
        reject(new PayloadError("Request payload is too large.", 413));
        req.destroy();
        return;
      }
      chunks.push(buf);
    });
    req.on("end", () => resolve());
    req.on("error", (err) => reject(err));
  });

  if (chunks.length === 0) {
    return {};
  }

  const rawText = Buffer.concat(chunks).toString("utf8");
  return parseBodyString(rawText, contentType);
}

export function getClientIp(req: ApiRequest): string {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.trim().length > 0) {
    return forwarded.split(",")[0].trim().slice(0, 64);
  }
  const realIp = req.headers["x-real-ip"];
  if (typeof realIp === "string" && realIp.trim().length > 0) {
    return realIp.trim().slice(0, 64);
  }
  return (req.ip || req.socket?.remoteAddress || "unknown").slice(0, 64);
}

/**
 * Produces an irreversible HMAC-SHA256 key from client IP so raw IPs are never
 * logged or persisted in plain text.
 */
export function getHashedClientIp(req: ApiRequest): string {
  const rawIp = getClientIp(req);
  return crypto
    .createHmac("sha256", getRateLimitSalt())
    .update(rawIp)
    .digest("hex")
    .slice(0, 24);
}
