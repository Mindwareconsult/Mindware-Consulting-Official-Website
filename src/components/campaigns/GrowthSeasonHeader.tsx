import React, { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { CAMPAIGN_2026_CONSTANTS } from "../../data/growthSeason2026Data";
import { trackPrimaryCtaClick } from "../../lib/analytics";
import {
  CAMPAIGN_HEADER_NAV_ITEMS,
  scrollToCampaignSection,
} from "./campaignNavigation";

export function GrowthSeasonHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!mobileMenuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const handleBrandClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setMobileMenuOpen(false);
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
    if (window.location.hash) {
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    }
  };

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    event.preventDefault();
    setMobileMenuOpen(false);
    scrollToCampaignSection(sectionId);
  };

  const handlePrimaryCta = (location: string) => {
    setMobileMenuOpen(false);
    trackPrimaryCtaClick(
      location,
      "#enquiry-qualification-form",
      "campaign-growth-season"
    );
    scrollToCampaignSection("enquiry-qualification-form");
  };

  return (
    <header
      id="gs2026-sticky-header"
      className="sticky top-0 z-50 w-full bg-[#040A18]/95 backdrop-blur-md border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-5">
        {/* Campaign Brand Identity */}
        <a
          href="#campaign-top"
          onClick={handleBrandClick}
          aria-label="Mindware Consulting Ltd — Business Growth Season 2026"
          className="inline-flex items-center gap-2 sm:gap-2.5 min-w-0 shrink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-lg py-1"
        >
          <img
            src="/logo.png"
            alt="Mindware Consulting Ltd"
            className="h-8 w-8 object-contain rounded-md shrink-0"
          />
          <span className="sm:hidden text-[11px] font-display font-bold text-white tracking-tight leading-[1.15]">
            <span className="block">Business Growth</span>
            <span className="block text-emerald-400">Season 2026</span>
          </span>
          <span className="hidden sm:inline text-sm font-display font-bold text-white tracking-tight whitespace-nowrap">
            Business Growth Season 2026
          </span>
        </a>

        {/* Desktop Campaign Section Navigation */}
        <nav
          aria-label="Business Growth Season 2026 sections"
          className="hidden lg:flex items-center gap-4 xl:gap-6"
        >
          {CAMPAIGN_HEADER_NAV_ITEMS.map((item) => (
            <a
              key={item.sectionId}
              href={`#${item.sectionId}`}
              onClick={(e) => handleNavClick(e, item.sectionId)}
              className="text-xs xl:text-[13px] font-medium text-slate-300 hover:text-white transition-colors whitespace-nowrap shrink-0 py-1.5 border-b-2 border-transparent hover:border-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-sm"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Primary Campaign CTA & Mobile Menu Toggle */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            type="button"
            onClick={() => handlePrimaryCta("gs2026-header-primary")}
            aria-label={CAMPAIGN_2026_CONSTANTS.primaryCtaLabel}
            className="min-h-[40px] sm:min-h-[42px] px-2.5 sm:px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] sm:text-xs uppercase tracking-normal sm:tracking-wider inline-flex items-center gap-1 sm:gap-1.5 transition-colors whitespace-nowrap shrink-0 shadow-sm shadow-emerald-950/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
          >
            <span className="sm:hidden">Prepare for 2027</span>
            <span className="hidden sm:inline">
              {CAMPAIGN_2026_CONSTANTS.primaryCtaLabel}
            </span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="gs2026-mobile-nav"
            aria-label={
              mobileMenuOpen
                ? "Close campaign navigation menu"
                : "Open campaign navigation menu"
            }
            className="lg:hidden min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/[0.04] hover:bg-white/10 text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Accessible Mobile Campaign Navigation Panel */}
      {mobileMenuOpen && (
        <nav
          id="gs2026-mobile-nav"
          aria-label="Mobile campaign navigation"
          className="lg:hidden border-t border-white/10 bg-[#040A18] px-4 pt-3 pb-4 shadow-2xl"
        >
          <div className="max-w-7xl mx-auto flex flex-col gap-1">
            {CAMPAIGN_HEADER_NAV_ITEMS.map((item) => (
              <a
                key={item.sectionId}
                href={`#${item.sectionId}`}
                onClick={(e) => handleNavClick(e, item.sectionId)}
                className="min-h-[44px] px-3 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:text-white hover:bg-white/[0.06] flex items-center justify-between transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                <span>{item.label}</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              </a>
            ))}

            <button
              type="button"
              onClick={() => handlePrimaryCta("gs2026-mobile-menu-primary")}
              className="mt-2 w-full min-h-[46px] px-4 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              <span>{CAMPAIGN_2026_CONSTANTS.primaryCtaLabel}</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
