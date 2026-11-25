import { getUpstashConfig, isProductionMode } from "./env.js";
import type { ApiResponse } from "./http.js";

export type RateLimitScope = "enquiries" | "careers" | "newsletter" | "gemini";

export type ProtectionLevel =
  | "distributed-upstash"
  | "degraded-memory-fallback"
  | "degraded-fail-closed";

export interface RateLimitPolicy {
  maxRequests: number;
  degradedMaxRequests: number;
  windowMs: number;
  failClosedWhenRedisOutage: boolean;
}

const POLICIES: Record<RateLimitScope, RateLimitPolicy> = {
  enquiries: {
    maxRequests: 10,
    degradedMaxRequests: 5,
    windowMs: 10 * 60 * 1000,
    failClosedWhenRedisOutage: false,
  },
  careers: {
    maxRequests: 8,
    degradedMaxRequests: 4,
    windowMs: 10 * 60 * 1000,
    failClosedWhenRedisOutage: false,
  },
  newsletter: {
    maxRequests: 8,
    degradedMaxRequests: 4,
    windowMs: 10 * 60 * 1000,
    failClosedWhenRedisOutage: false,
  },
  gemini: {
    maxRequests: 12,
    degradedMaxRequests: 6,
    windowMs: 10 * 60 * 1000,
    failClosedWhenRedisOutage: true,
  },
};

export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  retryAfterSeconds: number;
  protectionLevel: ProtectionLevel;
  degraded: boolean;
  reason?: string;
}

const MAX_MEMORY_KEYS = 5000;
const REDIS_FAILURE_CIRCUIT_THRESHOLD = 3;
const REDIS_CIRCUIT_OPEN_MS = 60 * 1000;

const memoryStore = new Map<string, number[]>();
let consecutiveRedisFailures = 0;
let redisCircuitOpenUntil = 0;
let loggedMissingUpstashProd = false;

function checkMemoryRateLimit(
  scopedKey: string,
  maxAllowed: number,
  windowMs: number,
  reason: string
): RateLimitResult {
  const now = Date.now();
  const windowStart = now - windowMs;

  if (memoryStore.size >= MAX_MEMORY_KEYS) {
    for (const [key, timestamps] of memoryStore.entries()) {
      const valid = timestamps.filter((ts) => ts > windowStart);
      if (valid.length === 0) {
        memoryStore.delete(key);
      } else {
        memoryStore.set(key, valid);
      }
      if (memoryStore.size < MAX_MEMORY_KEYS * 0.8) break;
    }
  }

  const recent = (memoryStore.get(scopedKey) || []).filter((ts) => ts > windowStart);
  if (recent.length >= maxAllowed) {
    memoryStore.set(scopedKey, recent);
    const oldest = recent[0] ?? now;
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((oldest + windowMs - now) / 1000)
    );
    return {
      allowed: false,
      limit: maxAllowed,
      remaining: 0,
      retryAfterSeconds,
      protectionLevel: "degraded-memory-fallback",
      degraded: true,
      reason,
    };
  }

  recent.push(now);
  memoryStore.set(scopedKey, recent);
  return {
    allowed: true,
    limit: maxAllowed,
    remaining: Math.max(0, maxAllowed - recent.length),
    retryAfterSeconds: 0,
    protectionLevel: "degraded-memory-fallback",
    degraded: true,
    reason,
  };
}

function handleRedisOutage(
  scope: RateLimitScope,
  scopedKey: string,
  policy: RateLimitPolicy,
  reason: string
): RateLimitResult {
  consecutiveRedisFailures += 1;
  if (consecutiveRedisFailures >= REDIS_FAILURE_CIRCUIT_THRESHOLD) {
    redisCircuitOpenUntil = Date.now() + REDIS_CIRCUIT_OPEN_MS;
  }

  const circuitOpen = Date.now() < redisCircuitOpenUntil;

  console.warn(
    JSON.stringify({
      event: "rate_limit_degraded_mode",
      scope,
      consecutiveFailures: consecutiveRedisFailures,
      circuitOpen,
      failClosed: policy.failClosedWhenRedisOutage && circuitOpen,
      reason,
    })
  );

  if (policy.failClosedWhenRedisOutage && circuitOpen) {
    return {
      allowed: false,
      limit: policy.maxRequests,
      remaining: 0,
      retryAfterSeconds: Math.max(
        1,
        Math.ceil((redisCircuitOpenUntil - Date.now()) / 1000)
      ),
      protectionLevel: "degraded-fail-closed",
      degraded: true,
      reason: "redis_outage_circuit_open",
    };
  }

  return checkMemoryRateLimit(
    scopedKey,
    policy.degradedMaxRequests,
    policy.windowMs,
    reason
  );
}

export async function enforceRateLimit(
  scope: RateLimitScope,
  hashedClientIp: string,
  timeoutMs = 1000
): Promise<RateLimitResult> {
  const boundedTimeoutMs = Math.max(300, Math.min(1200, timeoutMs));
  const policy = POLICIES[scope];
  const scopedKey = `mw:rl:${scope}:${hashedClientIp}`;
  const upstash = getUpstashConfig();

  if (!upstash.configured) {
    if (isProductionMode() && !loggedMissingUpstashProd) {
      loggedMissingUpstashProd = true;
      console.warn(
        JSON.stringify({
          event: "rate_limit_unconfigured_in_production",
          scope,
          mode: "degraded-memory-fallback",
        })
      );
    }
    return checkMemoryRateLimit(
      scopedKey,
      isProductionMode() ? policy.degradedMaxRequests : policy.maxRequests,
      policy.windowMs,
      "upstash_not_configured"
    );
  }

  if (Date.now() < redisCircuitOpenUntil) {
    if (policy.failClosedWhenRedisOutage) {
      return {
        allowed: false,
        limit: policy.maxRequests,
        remaining: 0,
        retryAfterSeconds: Math.max(
          1,
          Math.ceil((redisCircuitOpenUntil - Date.now()) / 1000)
        ),
        protectionLevel: "degraded-fail-closed",
        degraded: true,
        reason: "redis_circuit_open",
      };
    }
    return checkMemoryRateLimit(
      scopedKey,
      policy.degradedMaxRequests,
      policy.windowMs,
      "redis_circuit_open"
    );
  }

  try {
    const resp = await fetch(`${upstash.url}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${upstash.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        ["INCR", scopedKey],
        ["PEXPIRE", scopedKey, String(policy.windowMs), "NX"],
        ["PTTL", scopedKey],
      ]),
      signal: AbortSignal.timeout(boundedTimeoutMs),
    });

    if (!resp.ok) {
      return handleRedisOutage(scope, scopedKey, policy, `upstash_http_${resp.status}`);
    }

    const pipelineResults = (await resp.json()) as Array<{
      result?: number;
      error?: string;
    }>;

    if (!Array.isArray(pipelineResults) || pipelineResults[0]?.error) {
      return handleRedisOutage(scope, scopedKey, policy, "upstash_invalid_pipeline");
    }

    consecutiveRedisFailures = 0;
    redisCircuitOpenUntil = 0;

    const count = Number(pipelineResults[0]?.result ?? 1);
    const pttlRaw = Number(pipelineResults[2]?.result ?? policy.windowMs);
    const ttlMs = pttlRaw > 0 ? pttlRaw : policy.windowMs;
    const allowed = count <= policy.maxRequests;

    return {
      allowed,
      limit: policy.maxRequests,
      remaining: Math.max(0, policy.maxRequests - count),
      retryAfterSeconds: allowed ? 0 : Math.max(1, Math.ceil(ttlMs / 1000)),
      protectionLevel: "distributed-upstash",
      degraded: false,
    };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown_error";
    return handleRedisOutage(scope, scopedKey, policy, msg);
  }
}

export function applyRateLimitHeaders(
  res: ApiResponse,
  result: RateLimitResult
): void {
  res.setHeader("X-RateLimit-Limit", String(result.limit));
  res.setHeader("X-RateLimit-Remaining", String(result.remaining));
  res.setHeader("X-RateLimit-Mode", result.protectionLevel);
  if (!result.allowed && result.retryAfterSeconds > 0) {
    res.setHeader("Retry-After", String(result.retryAfterSeconds));
  }
}

export function resetMemoryRateLimitForTests(): void {
  memoryStore.clear();
  consecutiveRedisFailures = 0;
  redisCircuitOpenUntil = 0;
  loggedMissingUpstashProd = false;
}
