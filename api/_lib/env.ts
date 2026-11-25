export interface SupabaseConfig {
  url: string;
  serviceRoleKey: string;
  configured: boolean;
}

export interface UpstashConfig {
  url: string;
  token: string;
  configured: boolean;
}

export interface ResendConfig {
  apiKey: string;
  fromEmail: string;
  enquiryNotificationEmail: string;
  careersNotificationEmail: string;
  configured: boolean;
}

export interface WebhookConfig {
  enquiryWebhookUrl: string;
  careersWebhookUrl: string;
  allowedHosts: string[];
}

const PLACEHOLDER_VALUES = new Set([
  "",
  "MY_GEMINI_API_KEY",
  "MY_APP_URL",
  "YOUR_SUPABASE_URL",
  "YOUR_SUPABASE_SERVICE_ROLE_KEY",
  "YOUR_RESEND_API_KEY",
  "YOUR_UPSTASH_REDIS_REST_URL",
  "YOUR_UPSTASH_REDIS_REST_TOKEN",
]);

function readEnv(key: string): string {
  const raw = process.env[key];
  if (!raw) return "";
  const trimmed = raw.trim();
  if (PLACEHOLDER_VALUES.has(trimmed)) return "";
  return trimmed;
}

export function isVercelRuntime(): boolean {
  return process.env.VERCEL === "1" || Boolean(process.env.VERCEL_ENV);
}

export function isProductionMode(): boolean {
  return (
    process.env.NODE_ENV === "production" ||
    process.env.VERCEL_ENV === "production" ||
    process.env.VERCEL_ENV === "preview" ||
    isVercelRuntime()
  );
}

export function getSupabaseConfig(): SupabaseConfig {
  const url = readEnv("SUPABASE_URL").replace(/\/+$/, "");
  const serviceRoleKey = readEnv("SUPABASE_SERVICE_ROLE_KEY");
  const configured = Boolean(url && serviceRoleKey && url.startsWith("https://"));
  return { url, serviceRoleKey, configured };
}

export function getUpstashConfig(): UpstashConfig {
  const url = readEnv("UPSTASH_REDIS_REST_URL").replace(/\/+$/, "");
  const token = readEnv("UPSTASH_REDIS_REST_TOKEN");
  const configured = Boolean(url && token && url.startsWith("https://"));
  return { url, token, configured };
}

export function getResendConfig(): ResendConfig {
  const apiKey = readEnv("RESEND_API_KEY");
  const fromEmail = readEnv("ENQUIRY_FROM_EMAIL");
  const enquiryNotificationEmail =
    readEnv("ENQUIRY_NOTIFICATION_EMAIL") ||
    readEnv("ENQUIRY_TO_EMAIL") ||
    "contact@mindwareconsult.com.ng";
  const careersNotificationEmail =
    readEnv("CAREERS_NOTIFICATION_EMAIL") || enquiryNotificationEmail;

  return {
    apiKey,
    fromEmail,
    enquiryNotificationEmail,
    careersNotificationEmail,
    configured: Boolean(apiKey && fromEmail),
  };
}

export function getWebhookConfig(): WebhookConfig {
  const allowedHostsRaw = readEnv("WEBHOOK_ALLOWED_HOSTS");
  const allowedHosts = allowedHostsRaw
    ? allowedHostsRaw
        .split(",")
        .map((h) => h.trim().toLowerCase())
        .filter(Boolean)
    : [];

  return {
    enquiryWebhookUrl: readEnv("ENQUIRY_WEBHOOK_URL"),
    careersWebhookUrl: readEnv("CAREERS_WEBHOOK_URL"),
    allowedHosts,
  };
}

export function getGeminiApiKey(): string {
  return readEnv("GEMINI_API_KEY");
}

export function getRateLimitSalt(): string {
  return (
    readEnv("RATE_LIMIT_SALT") ||
    readEnv("SUPABASE_SERVICE_ROLE_KEY") ||
    "mindware-local-dev-rate-salt"
  );
}

export function getNewsletterSigningSecret(): string {
  return (
    readEnv("NEWSLETTER_SIGNING_SECRET") ||
    readEnv("SUPABASE_SERVICE_ROLE_KEY") ||
    "mindware-local-dev-newsletter-secret"
  );
}

export function getNewsletterPreviousSigningSecret(): string {
  return readEnv("NEWSLETTER_PREVIOUS_SIGNING_SECRET");
}

export function getCronSecret(): string {
  return readEnv("CRON_SECRET");
}

export function getAppOriginUrl(): string {
  const raw = readEnv("APP_URL");
  if (raw && raw.startsWith("https://")) {
    return raw.replace(/\/+$/, "");
  }
  return "https://mindwareconsult.com.ng";
}
