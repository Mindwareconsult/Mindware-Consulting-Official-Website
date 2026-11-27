export interface CampaignNavItem {
  label: string;
  sectionId: string;
}

export const CAMPAIGN_HEADER_NAV_ITEMS: readonly CampaignNavItem[] = [
  { label: "Growth Solutions", sectionId: "solutions-packages" },
  { label: "Our Work", sectionId: "portfolio-showcase" },
  { label: "Results & Visibility", sectionId: "seo-google-visibility" },
  { label: "Client Reviews", sectionId: "google-client-reviews" },
  { label: "FAQs", sectionId: "campaign-faqs" },
];

export const CAMPAIGN_FOOTER_NAV_ITEMS: readonly CampaignNavItem[] = [
  { label: "Growth Solutions", sectionId: "solutions-packages" },
  { label: "Our Work", sectionId: "portfolio-showcase" },
  { label: "Client Reviews", sectionId: "google-client-reviews" },
  { label: "FAQs", sectionId: "campaign-faqs" },
  { label: "Prepare My Business for 2027", sectionId: "enquiry-qualification-form" },
];

export function scrollToCampaignSection(sectionId: string): void {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return;
  }

  const target = document.getElementById(sectionId);
  if (!target) {
    return;
  }

  const stickyHeader = document.getElementById("gs2026-sticky-header");
  const headerHeight = stickyHeader
    ? Math.ceil(stickyHeader.getBoundingClientRect().height)
    : 64;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const targetTop = Math.max(
    0,
    target.getBoundingClientRect().top + window.scrollY - headerHeight - 16
  );

  window.scrollTo({
    top: targetTop,
    behavior: prefersReducedMotion ? "auto" : "smooth",
  });

  if (window.location.hash !== `#${sectionId}`) {
    window.history.replaceState(null, "", `#${sectionId}`);
  }
}
