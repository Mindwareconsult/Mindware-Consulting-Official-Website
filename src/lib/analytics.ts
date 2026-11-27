import { CanonicalEnquiryCategory } from "../data/companyStats";

declare global {
  interface Window {
    dataLayer?: Array<unknown>;
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export type ConversionEventName =
  | "primary_cta_click"
  | "growth_review_form_start"
  | "growth_review_submit_attempt"
  | "growth_review_submit_success"
  | "growth_review_submit_error"
  | "whatsapp_click"
  | "phone_click"
  | "email_click"
  | "campaign_track_select"
  | "campaign_conversion"
  | "industry_conversion"
  | "pillar_conversion";

export interface TrackingReadiness {
  ga4Configured: boolean;
  gtmConfigured: boolean;
  metaPixelConfigured: boolean;
  anyExternalConfigured: boolean;
}

const GA4_ID = (import.meta.env?.VITE_GA4_MEASUREMENT_ID ?? "").trim();
const GTM_ID = (import.meta.env?.VITE_GTM_CONTAINER_ID ?? "").trim();
const META_PIXEL_ID = (import.meta.env?.VITE_META_PIXEL_ID ?? "").trim();

const isValidGa4 = (id: string) => /^G-[A-Z0-9]{4,20}$/i.test(id);
const isValidGtm = (id: string) => /^GTM-[A-Z0-9]{4,20}$/i.test(id);
const isValidMetaPixel = (id: string) => /^\d{8,24}$/.test(id);

const UTM_STORAGE_KEY = "mw_utm_attribution_v1";
const FORBIDDEN_PII_KEYS = new Set([
  "email",
  "emailaddress",
  "phone",
  "phonenumber",
  "fullname",
  "name",
  "businessname",
  "motivation",
  "projectdesc",
  "password",
  "token",
]);

let analyticsInitialized = false;
let lastTrackedPath: string | null = null;

export function getTrackingReadiness(): TrackingReadiness {
  const ga4Configured = isValidGa4(GA4_ID);
  const gtmConfigured = isValidGtm(GTM_ID);
  const metaPixelConfigured = isValidMetaPixel(META_PIXEL_ID);
  return {
    ga4Configured,
    gtmConfigured,
    metaPixelConfigured,
    anyExternalConfigured: ga4Configured || gtmConfigured || metaPixelConfigured,
  };
}

function sanitizeAnalyticsParams(
  params: Record<string, unknown>
): Record<string, string | number | boolean> {
  const clean: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) continue;
    if (FORBIDDEN_PII_KEYS.has(key.toLowerCase())) continue;

    if (typeof value === "string") {
      const trimmed = value.trim();
      if (!trimmed) continue;
      // Guard against accidental email address leakage inside free-form metadata
      if (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)) continue;
      clean[key] = trimmed.slice(0, 180);
    } else if (typeof value === "number" || typeof value === "boolean") {
      clean[key] = value;
    }
  }
  return clean;
}

/**
 * Conditionally initializes GA4, GTM, or Meta Pixel ONLY when valid IDs are provided
 * in environment variables. Safe no-op in unconfigured environments.
 */
export function initExternalAnalytics(): void {
  if (typeof window === "undefined" || analyticsInitialized) return;
  analyticsInitialized = true;

  // Persist landing UTM parameters for multi-page conversion journeys
  getStoredUtmParams();

  const readiness = getTrackingReadiness();
  if (!readiness.anyExternalConfigured) return;

  window.dataLayer = window.dataLayer || [];

  if (readiness.gtmConfigured) {
    window.dataLayer.push({
      "gtm.start": Date.now(),
      event: "gtm.js",
    });
    const gtmScript = document.createElement("script");
    gtmScript.async = true;
    gtmScript.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(GTM_ID)}`;
    gtmScript.dataset.mwAnalytics = "gtm";
    document.head.appendChild(gtmScript);
  }

  if (readiness.ga4Configured) {
    const gaScript = document.createElement("script");
    gaScript.async = true;
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA4_ID)}`;
    gaScript.dataset.mwAnalytics = "ga4";
    document.head.appendChild(gaScript);

    // Standard gtag.js dataLayer queue function preserving arguments semantics
    if (!window.gtag) {
      window.gtag = function gtag() {
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer?.push(arguments);
      };
    }
    window.gtag("js", new Date());
    // Disable automatic initial page_view so SPA route tracking owns page views without duplicates
    window.gtag("config", GA4_ID, {
      anonymize_ip: true,
      send_page_view: false,
    });
  }

  if (readiness.metaPixelConfigured && !window.fbq) {
    const fbScript = document.createElement("script");
    fbScript.async = true;
    fbScript.src = "https://connect.facebook.net/en_US/fbevents.js";
    fbScript.dataset.mwAnalytics = "meta-pixel";
    document.head.appendChild(fbScript);

    const queue: unknown[] = [];
    const fbqStub = (...args: unknown[]) => {
      queue.push(args);
    };
    (fbqStub as unknown as { queue: unknown[]; version: string }).queue = queue;
    (fbqStub as unknown as { version: string }).version = "2.0";
    window.fbq = fbqStub;
    window.fbq("init", META_PIXEL_ID);
  }
}

export function getStoredUtmParams(): {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
} {
  if (typeof window === "undefined") return {};
  try {
    const params = new URLSearchParams(window.location.search);
    const urlSource = params.get("utm_source")?.trim();
    const urlMedium = params.get("utm_medium")?.trim();
    const urlCampaign = params.get("utm_campaign")?.trim();
    const urlContent = params.get("utm_content")?.trim();
    const urlTerm = params.get("utm_term")?.trim();

    let saved: {
      utmSource?: string;
      utmMedium?: string;
      utmCampaign?: string;
      utmContent?: string;
      utmTerm?: string;
    } = {};
    try {
      const raw = window.sessionStorage.getItem(UTM_STORAGE_KEY);
      if (raw) {
        saved = JSON.parse(raw) || {};
      }
    } catch {
      saved = {};
    }

    const merged = {
      ...(urlSource || saved.utmSource ? { utmSource: urlSource || saved.utmSource } : {}),
      ...(urlMedium || saved.utmMedium ? { utmMedium: urlMedium || saved.utmMedium } : {}),
      ...(urlCampaign || saved.utmCampaign ? { utmCampaign: urlCampaign || saved.utmCampaign } : {}),
      ...(urlContent || saved.utmContent ? { utmContent: urlContent || saved.utmContent } : {}),
      ...(urlTerm || saved.utmTerm ? { utmTerm: urlTerm || saved.utmTerm } : {}),
    };

    if (urlSource || urlMedium || urlCampaign || urlContent || urlTerm) {
      try {
        window.sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(merged));
      } catch {
        // Ignore storage errors in restricted browser modes
      }
    }

    return merged;
  } catch {
    return {};
  }
}

/**
 * Dispatches SPA route page_view events cleanly across GTM, GA4, and Meta Pixel
 * without duplicate firing on re-renders or leaking PII.
 */
export function trackPageView(pagePath: string, pageTitle?: string): void {
  if (typeof window === "undefined") return;
  const normalizedPath = pagePath || window.location.pathname;
  if (lastTrackedPath === normalizedPath) return;
  lastTrackedPath = normalizedPath;

  const utms = getStoredUtmParams();
  const payload = sanitizeAnalyticsParams({
    event: "mw_page_view",
    page_path: normalizedPath,
    page_title: pageTitle || document.title,
    ...utms,
  });

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);

  const readiness = getTrackingReadiness();
  if (readiness.ga4Configured && typeof window.gtag === "function") {
    window.gtag("event", "page_view", {
      send_to: GA4_ID,
      page_path: normalizedPath,
      page_title: pageTitle || document.title,
      ...utms,
    });
  }

  if (readiness.metaPixelConfigured && typeof window.fbq === "function") {
    window.fbq("track", "PageView");
  }
}

export function trackConversionEvent(
  eventName: ConversionEventName,
  params: Record<string, string | number | boolean | undefined> = {}
): void {
  if (typeof window === "undefined") return;

  const utms = getStoredUtmParams();
  const cleanParams = sanitizeAnalyticsParams({
    page_path: window.location.pathname,
    timestamp: new Date().toISOString(),
    ...utms,
    ...params,
  });

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...cleanParams,
  });

  const readiness = getTrackingReadiness();
  if (readiness.ga4Configured && typeof window.gtag === "function") {
    window.gtag("event", eventName, {
      send_to: GA4_ID,
      ...cleanParams,
    });
  }

  if (readiness.metaPixelConfigured && typeof window.fbq === "function") {
    if (eventName === "growth_review_submit_success") {
      window.fbq("track", "Lead", {
        content_category: cleanParams.category || "business-growth-review",
      });
    } else if (eventName === "whatsapp_click" || eventName === "phone_click") {
      window.fbq("track", "Contact", {
        content_name: cleanParams.location || eventName,
      });
    }
  }
}

export function trackPrimaryCtaClick(
  location: string,
  destination: string,
  category?: CanonicalEnquiryCategory | string
): void {
  trackConversionEvent("primary_cta_click", {
    cta_location: location,
    destination,
    category,
  });
}

export function trackFormStart(
  category: CanonicalEnquiryCategory | string,
  extra: Record<string, string | undefined> = {}
): void {
  trackConversionEvent("growth_review_form_start", {
    category,
    ...extra,
  });
}

export function trackFormSubmit(
  category: CanonicalEnquiryCategory | string,
  status: "attempt" | "success" | "error",
  extra: Record<string, string | undefined> = {}
): void {
  const eventMap = {
    attempt: "growth_review_submit_attempt",
    success: "growth_review_submit_success",
    error: "growth_review_submit_error",
  } as const;
  trackConversionEvent(eventMap[status], {
    category,
    ...extra,
  });
}

export function trackWhatsAppClick(location: string, topic?: string): void {
  trackConversionEvent("whatsapp_click", {
    location,
    topic,
  });
}

export function trackPhoneClick(location: string): void {
  trackConversionEvent("phone_click", {
    location,
  });
}

export function trackEmailClick(location: string): void {
  trackConversionEvent("email_click", {
    location,
  });
}

export function trackCampaignConversion(
  trackId: string,
  action: "select_track" | "cta_click" | "submit_success"
): void {
  trackConversionEvent(
    action === "select_track" ? "campaign_track_select" : "campaign_conversion",
    {
      campaign: "business-growth-season-2026",
      track_id: trackId,
      action,
    }
  );
}

export function trackIndustryConversion(
  industrySlug: string,
  action: string
): void {
  trackConversionEvent("industry_conversion", {
    industry_slug: industrySlug,
    action,
  });
}
