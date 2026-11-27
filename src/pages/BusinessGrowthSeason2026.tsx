import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarClock,
  Check,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  FileCheck2,
  Globe,
  Mail,
  MessageSquare,
  Phone,
  Search,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { MEDIA_ASSETS } from "../assets/media";
import { LEADERSHIP_TEAM } from "../data/aboutData";
import { COMPANY_INFO, INDUSTRY_SECTOR_OPTIONS } from "../data/companyStats";
import {
  BUSINESS_NEED_OPTIONS,
  CAMPAIGN_2026_CONSTANTS,
  CAMPAIGN_2026_FAQS,
  CAMPAIGN_2026_OFFERS,
  CAMPAIGN_INCLUDED_FOUNDATIONS,
  CAMPAIGN_PORTFOLIO_ENTRIES,
  READINESS_PAIN_POINTS,
  SCOPE_TRANSPARENCY_NOTE,
  SEO_VISIBILITY_FOUNDATIONS,
  WHY_MINDWARE_PILLARS,
  buildCampaignWhatsAppHref,
  validateGrowthSeasonFormInput,
  type GrowthSeason2026Offer,
} from "../data/growthSeason2026Data";
import { GrowthSeasonVideoProof } from "../components/campaigns/GrowthSeasonVideoProof";
import { scrollToCampaignSection } from "../components/campaigns/campaignNavigation";
import { GoogleClientReviews } from "../components/reviews/GoogleClientReviews";
import { SEO } from "../components/SEO";
import { EASE } from "../lib/utils";
import {
  getStoredUtmParams,
  trackCampaignConversion,
  trackEmailClick,
  trackFormStart,
  trackFormSubmit,
  trackPhoneClick,
  trackPrimaryCtaClick,
  trackWhatsAppClick,
} from "../lib/analytics";

const NOT_SURE_PACKAGE_ID = "recommend-after-review";

const LEGACY_TRACK_TO_OFFER_ID: Record<string, string> = {
  "digital-business-foundation": "digital-business-foundation",
  "visibility-growth-accelerator": "visibility-growth-accelerator",
  "construction-business-growth": "construction-business-growth",
  "construction-business-pro": "construction-business-pro",
  "business-growth-advisory": "business-growth-advisory",
  "business-growth-development-advisory": "business-growth-advisory",
  "business-launch": "business-launch",
  "business-launch-digital-starter": "business-launch",
};

export function BusinessGrowthSeason2026() {
  const [searchParams] = useSearchParams();
  const formSectionRef = useRef<HTMLElement>(null);
  const solutionsRef = useRef<HTMLElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const hasTrackedFormStart = useRef(false);

  // Form state
  const [fullName, setFullName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [industrySector, setIndustrySector] = useState<string>(
    INDUSTRY_SECTOR_OPTIONS[0]
  );
  const [businessLocation, setBusinessLocation] = useState("");
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([
    BUSINESS_NEED_OPTIONS[0],
  ]);
  const [preferredPackageId, setPreferredPackageId] = useState<string>(() => {
    const requested = searchParams.get("track")?.trim() || "";
    return LEGACY_TRACK_TO_OFFER_ID[requested] || CAMPAIGN_2026_OFFERS[0].id;
  });

  useEffect(() => {
    const requested = searchParams.get("track")?.trim() || "";
    const mapped = LEGACY_TRACK_TO_OFFER_ID[requested];
    if (mapped) {
      setPreferredPackageId(mapped);
    }
  }, [searchParams]);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [referenceId, setReferenceId] = useState<string | null>(null);
  const [openFaqId, setOpenFaqId] = useState<string | null>(
    CAMPAIGN_2026_FAQS[0].id
  );

  const founder = LEADERSHIP_TEAM[0];

  const selectedOffer = useMemo(
    () => CAMPAIGN_2026_OFFERS.find((o) => o.id === preferredPackageId) || null,
    [preferredPackageId]
  );

  const primaryWhatsappUrl = useMemo(
    () => buildCampaignWhatsAppHref(CAMPAIGN_2026_CONSTANTS.primaryWhatsappMessage),
    []
  );

  const structuredData = useMemo(
    () => [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: CAMPAIGN_2026_CONSTANTS.seoTitle,
        description: CAMPAIGN_2026_CONSTANTS.seoDescription,
        url: CAMPAIGN_2026_CONSTANTS.canonicalUrl,
        publisher: {
          "@type": "ProfessionalService",
          name: COMPANY_INFO.name,
          url: COMPANY_INFO.websiteUrl,
          telephone: COMPANY_INFO.phoneTel,
          email: COMPANY_INFO.email,
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: CAMPAIGN_2026_FAQS.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
    []
  );

  const scrollToForm = (ctaLocation: string) => {
    trackPrimaryCtaClick(
      ctaLocation,
      "#enquiry-qualification-form",
      "campaign-growth-season"
    );
    scrollToCampaignSection("enquiry-qualification-form");
  };

  const handleSelectOffer = (offer: GrowthSeason2026Offer) => {
    setPreferredPackageId(offer.id);
    if (
      offer.id === "construction-business-growth" ||
      offer.id === "construction-business-pro"
    ) {
      setIndustrySector("Construction & Civil Engineering");
    }
    trackCampaignConversion(offer.id, "select_track");
    scrollToCampaignSection("enquiry-qualification-form");
  };

  const handleToggleNeed = (need: string) => {
    markFormStarted();
    setSelectedNeeds((prev) =>
      prev.includes(need) ? prev.filter((item) => item !== need) : [...prev, need]
    );
  };

  const markFormStarted = () => {
    if (hasTrackedFormStart.current) return;
    hasTrackedFormStart.current = true;
    trackFormStart("campaign-growth-season", {
      campaign: CAMPAIGN_2026_CONSTANTS.campaignCode,
      package_id: preferredPackageId,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setEmailError(null);
    setSubmitError(null);
    setSubmitSuccess(false);

    const validation = validateGrowthSeasonFormInput({
      fullName,
      email,
      phone,
      businessLocation,
      selectedNeeds,
      additionalInfo,
    });

    if ("error" in validation) {
      if (validation.field === "email") {
        setEmailError(validation.error);
        emailInputRef.current?.focus();
      }
      setSubmitError(validation.error);
      return;
    }

    const packageLabel = selectedOffer
      ? `${selectedOffer.name} (${selectedOffer.priceRange})`
      : "Not sure yet — recommend best fit after review";

    const compiledBrief = [
      `Campaign: ${CAMPAIGN_2026_CONSTANTS.title} (2027 Readiness)`,
      `Business Location: ${businessLocation.trim()}`,
      `Preferred Solution / Package: ${packageLabel}`,
      selectedNeeds.length > 0
        ? `Business Needs Selected: ${selectedNeeds.join("; ")}`
        : null,
      additionalInfo.trim()
        ? `Additional Information: ${additionalInfo.trim()}`
        : null,
    ]
      .filter(Boolean)
      .join("\n");

    setIsSubmitting(true);
    trackFormSubmit("campaign-growth-season", "attempt", {
      track_id: preferredPackageId,
    });

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          businessName: businessName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          enquiryCategory: "campaign-growth-season",
          campaignTrack: preferredPackageId,
          industrySector,
          consultationTopic:
            selectedNeeds.slice(0, 2).join(" & ") ||
            CAMPAIGN_2026_CONSTANTS.title,
          serviceNeeded: selectedOffer
            ? selectedOffer.name
            : "Campaign Recommendation Review",
          engagementModel: selectedOffer
            ? selectedOffer.priceRange
            : "Business Growth Season 2026",
          projectDesc: compiledBrief,
          source: CAMPAIGN_2026_CONSTANTS.campaignCode,
          pagePath: window.location.pathname,
          utmParams: getStoredUtmParams(),
          _hp: honeypot,
        }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data?.success) {
        throw new Error(
          data?.error ||
            "Unable to submit your enquiry right now. Please try again or reach us on WhatsApp."
        );
      }

      setReferenceId(data.referenceId || null);
      setSubmitSuccess(true);
      trackFormSubmit("campaign-growth-season", "success", {
        track_id: preferredPackageId,
        reference_id: data.referenceId,
      });
      trackCampaignConversion(preferredPackageId, "submit_success");

      setEmailError(null);
      setFullName("");
      setBusinessName("");
      setEmail("");
      setPhone("");
      setBusinessLocation("");
      setAdditionalInfo("");
      hasTrackedFormStart.current = false;
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "We could not complete your submission right now. Please contact us on WhatsApp or by phone.";
      setSubmitError(message);
      trackFormSubmit("campaign-growth-season", "error", {
        track_id: preferredPackageId,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="campaign-top"
      className="bg-[#040A18] text-white min-h-screen overflow-x-clip"
    >
      <SEO
        title={CAMPAIGN_2026_CONSTANTS.seoTitle}
        description={CAMPAIGN_2026_CONSTANTS.seoDescription}
        canonicalPath={CAMPAIGN_2026_CONSTANTS.canonicalPath}
        ogType="website"
        ogImage={CAMPAIGN_2026_CONSTANTS.ogImage}
        ogImageAlt={CAMPAIGN_2026_CONSTANTS.ogImageAlt}
        structuredData={structuredData}
      />

      {/* =====================================================================
          SECTION 1: HERO
          ===================================================================== */}
      <section className="relative pt-10 sm:pt-14 pb-20 sm:pb-24 bg-[#040A18] border-b border-white/10">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.08),transparent_55%)] pointer-events-none"
        />
        <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono uppercase tracking-[0.18em] text-emerald-400 font-semibold">
                <span>Mindware Business Growth Season 2026</span>
                <span className="text-white/25" aria-hidden="true">
                  |
                </span>
                <span className="inline-flex items-center gap-1.5 text-slate-200">
                  <CalendarClock className="w-3.5 h-3.5 text-emerald-400" />
                  Closes {CAMPAIGN_2026_CONSTANTS.deadline}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-[3.35rem] font-display font-bold tracking-tight text-white leading-[1.07]">
                {CAMPAIGN_2026_CONSTANTS.primaryHeadline}
              </h1>

              <p className="text-lg sm:text-xl text-slate-100 font-medium leading-relaxed max-w-2xl">
                {CAMPAIGN_2026_CONSTANTS.subheadline}
              </p>

              <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed max-w-2xl">
                {CAMPAIGN_2026_CONSTANTS.supportingCopy}
              </p>

              {/* Hero CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <button
                  type="button"
                  onClick={() => scrollToForm("gs2026-hero-primary")}
                  className="min-h-[50px] inline-flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-7 py-3.5 rounded-xl text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-emerald-950/60 transition-all active:scale-[0.98]"
                >
                  <span>{CAMPAIGN_2026_CONSTANTS.primaryCtaLabel}</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>

                <a
                  href={primaryWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackWhatsAppClick("gs2026-hero", "primary_consultation")
                  }
                  className="min-h-[50px] inline-flex items-center justify-center gap-2.5 bg-white text-[#040A18] hover:bg-slate-100 font-bold px-6 py-3.5 rounded-xl text-xs sm:text-sm uppercase tracking-wider transition-all active:scale-[0.98]"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>{CAMPAIGN_2026_CONSTANTS.secondaryCtaLabel}</span>
                </a>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => scrollToCampaignSection("solutions-packages")}
                  className="text-xs font-mono uppercase tracking-wider text-slate-300 hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5"
                >
                  <span>View 2026 Solutions &amp; Indicative Investment Ranges</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Verified Institutional Trust Indicators */}
              <div className="pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <div className="text-sm font-mono font-bold text-white">
                    RC {COMPANY_INFO.rcNumber}
                  </div>
                  <div className="text-xs text-slate-400">
                    CAC Incorporated 2016
                  </div>
                </div>
                <div>
                  <div className="text-sm font-mono font-bold text-white">
                    FIRS &amp; IMC
                  </div>
                  <div className="text-xs text-slate-400">
                    Accredited Management Practice
                  </div>
                </div>
                <div>
                  <div className="text-sm font-mono font-bold text-white">
                    15+ Live Builds
                  </div>
                  <div className="text-xs text-slate-400">
                    Published Client Platforms
                  </div>
                </div>
                <div>
                  <div className="text-sm font-mono font-bold text-white">
                    36 States &amp; FCT
                  </div>
                  <div className="text-xs text-slate-400">
                    Nationwide Delivery
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Visual Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: EASE, delay: 0.1 }}
              className="lg:col-span-5"
            >
              <div className="rounded-2xl overflow-hidden border border-white/15 bg-[#081229] shadow-2xl">
                <div className="aspect-[4/3] overflow-hidden bg-slate-950">
                  <img
                    src={MEDIA_ASSETS.growthSeasonHero}
                    alt="Executive corporate growth strategy consultation ahead of 2027"
                    className="w-full h-full object-cover"
                    fetchPriority="high"
                  />
                </div>
                <div className="p-5 sm:p-6 border-t border-white/10 space-y-2">
                  <div className="flex items-center justify-between gap-2 text-xs font-mono text-emerald-400">
                    <span>CAMPAIGN WINDOW</span>
                    <span>ENDS {CAMPAIGN_2026_CONSTANTS.deadline.toUpperCase()}</span>
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    Built for Nigerian SMEs, startups, corporate service firms, and construction companies ready to enter 2027 with stronger positioning and dependable customer acquisition.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 2: PROBLEM AWARENESS
          ===================================================================== */}
      <section className="py-20 sm:py-24 bg-[#F8FAFC] text-[#071126] border-b border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <div className="max-w-3xl mb-12 sm:mb-14">
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-emerald-700 font-semibold mb-3">
              2027 Business Readiness Assessment
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight text-[#071126] mb-4">
              Is Your Business Ready for 2027?
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Many capable businesses lose high-value opportunities every month—not because their work lacks quality, but because their digital presence and acquisition systems hold them back.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {READINESS_PAIN_POINTS.map((item) => (
              <div
                key={item.number}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between gap-3"
              >
                <div>
                  <div className="text-xs font-mono font-bold text-emerald-700 mb-2">
                    CHALLENGE {item.number}
                  </div>
                  <h3 className="text-lg font-display font-bold text-[#071126] leading-snug mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}

            {/* 8th Grid Cell: Diagnostic Callout */}
            <div className="p-6 rounded-2xl bg-[#071126] text-white border border-[#0D1E42] flex flex-col justify-between gap-5 md:col-span-2 lg:col-span-2">
              <div className="space-y-2.5">
                <div className="text-xs font-mono uppercase tracking-[0.18em] text-emerald-400 font-semibold">
                  Break the Cycle Before January
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                  Fix These Gaps Before Entering 2027.
                </h3>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                  Whether your priority is a credible website, stronger Google visibility, tender-ready construction positioning, or structured business growth advisory, Mindware helps you address the exact bottleneck slowing down revenue.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => scrollToForm("gs2026-problem-callout")}
                  className="min-h-[44px] px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 transition-colors"
                >
                  <span>{CAMPAIGN_2026_CONSTANTS.primaryCtaLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 3: MINDWARE GROWTH SOLUTIONS (6 APPROVED OFFERS)
          ===================================================================== */}
      <section
        ref={solutionsRef}
        id="solutions-packages"
        className="scroll-mt-20 sm:scroll-mt-24 py-20 sm:py-28 bg-[#060E21] text-white border-b border-white/10"
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <div className="max-w-3xl mb-12 sm:mb-14">
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-emerald-400 font-semibold mb-3">
              Business Growth Season 2026 Solutions
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight text-white mb-4">
              Mindware Growth Solutions for 2027 Readiness
            </h2>
            <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
              Choose the solution that matches your current business stage and growth priorities. Every engagement begins with clear scope alignment—you only pay for what your business needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CAMPAIGN_2026_OFFERS.map((offer) => {
              const isSelected = preferredPackageId === offer.id;
              return (
                <article
                  key={offer.id}
                  className={`rounded-2xl p-6 sm:p-7 border flex flex-col justify-between transition-colors ${
                    isSelected
                      ? "bg-[#0B1936] border-emerald-400 shadow-xl"
                      : offer.isFeatured
                      ? "bg-[#09152E] border-emerald-500/40 hover:border-emerald-400/70"
                      : "bg-[#081228] border-white/10 hover:border-white/25"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                        Offer {offer.number}
                      </span>
                      {offer.isFeatured && (
                        <span className="text-[11px] font-mono uppercase tracking-wider text-white bg-emerald-700/60 border border-emerald-500/40 px-2 py-0.5 rounded">
                          Construction Focus
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-2">
                      {offer.name}
                    </h3>

                    <div className="pb-4 mb-4 border-b border-white/10">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-0.5">
                        Indicative Investment Range
                      </div>
                      <div className="text-2xl font-mono font-bold text-emerald-400">
                        {offer.priceRange}
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                        Ideal For
                      </div>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                        {offer.audience}
                      </p>
                    </div>

                    <p className="text-sm text-slate-300 leading-relaxed mb-5">
                      {offer.summary}
                    </p>

                    <ul className="space-y-2.5 mb-6">
                      {offer.focusAreas.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200 leading-relaxed"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-white/10 space-y-2.5">
                    <button
                      type="button"
                      onClick={() => handleSelectOffer(offer)}
                      className={`w-full min-h-[46px] px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 transition-colors ${
                        isSelected
                          ? "bg-emerald-500 text-[#040A18]"
                          : "bg-white text-[#040A18] hover:bg-emerald-500 hover:text-white"
                      }`}
                    >
                      <span>
                        {isSelected
                          ? "Selected — Complete Brief Below"
                          : "Select Solution & Prepare Brief"}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <a
                      href={buildCampaignWhatsAppHref(offer.whatsappMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackWhatsAppClick("gs2026-offer-card", offer.name)
                      }
                      className="w-full min-h-[44px] px-4 py-2.5 rounded-xl bg-white/5 hover:bg-emerald-600/20 border border-white/15 hover:border-emerald-400/50 text-slate-200 hover:text-white text-xs font-semibold inline-flex items-center justify-center gap-2 transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Ask About This Package on WhatsApp</span>
                    </a>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Scope Transparency Disclaimer */}
          <div className="mt-10 p-5 sm:p-6 rounded-2xl bg-[#0B1732] border border-white/10 flex items-start gap-3.5">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <strong className="text-white font-semibold">
                Scope &amp; Pricing Transparency:
              </strong>{" "}
              {SCOPE_TRANSPARENCY_NOTE}
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 4: PORTFOLIO SHOWCASE
          ===================================================================== */}
      <section
        id="portfolio-showcase"
        className="scroll-mt-20 sm:scroll-mt-24 py-20 sm:py-28 bg-white text-[#071126] border-b border-slate-200"
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <div className="max-w-3xl mb-12 sm:mb-16">
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-emerald-700 font-semibold mb-3">
              Selected Client Platforms
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight text-[#071126] mb-4">
              We Help Businesses Build a Stronger Digital Presence.
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Explore live websites and multi-platform business solutions delivered by Mindware Consulting across civil engineering, building construction, interior finishing, concrete supply, corporate services, and automotive retail.
            </p>
          </div>

          {/* Featured Case 1: Temamost Nigeria Limited — Before vs After Website Redesign */}
          {(() => {
            const temamost = CAMPAIGN_PORTFOLIO_ENTRIES[0];
            return (
              <article className="mb-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8 lg:p-10 shadow-sm">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 mb-8 border-b border-slate-200">
                  <div className="space-y-2">
                    <div className="text-xs font-mono uppercase tracking-wider text-emerald-700 font-bold">
                      Website Redesign &amp; Transformation · {temamost.sector}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#071126]">
                      {temamost.client}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
                      {temamost.summary}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 shrink-0">
                    {temamost.beforeUrl && (
                      <a
                        href={temamost.beforeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-h-[42px] px-4 py-2 rounded-lg bg-white border border-slate-300 hover:border-slate-400 text-slate-700 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
                      >
                        <span>Original Site (temamost.com)</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    <a
                      href={temamost.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[42px] px-4 py-2 rounded-lg bg-[#071126] hover:bg-emerald-700 text-white text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
                    >
                      <span>Redesigned Site (constructionstemamost.com)</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="rounded-xl overflow-hidden border border-slate-200 bg-white">
                    <div className="px-4 py-2.5 bg-slate-100 border-b border-slate-200 flex items-center justify-between text-xs font-mono">
                      <span className="font-bold text-slate-700">
                        BEFORE · Legacy Presence
                      </span>
                      <span className="text-slate-500">temamost.com</span>
                    </div>
                    <div className="aspect-[16/10] bg-slate-900 overflow-hidden">
                      <img
                        src={temamost.beforeImage}
                        alt="Temamost Nigeria Limited previous website before redesign"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="rounded-xl overflow-hidden border border-emerald-600/40 bg-white">
                    <div className="px-4 py-2.5 bg-emerald-50 border-b border-emerald-200 flex items-center justify-between text-xs font-mono">
                      <span className="font-bold text-emerald-800">
                        AFTER · Modern Website Redesign
                      </span>
                      <span className="text-emerald-700">
                        constructionstemamost.com
                      </span>
                    </div>
                    <div className="aspect-[16/10] bg-slate-900 overflow-hidden">
                      <img
                        src={temamost.afterImage}
                        alt="Temamost Nigeria Limited before and after website upgrade showcase"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </article>
            );
          })()}

          {/* Portfolio Grid covering remaining 9 websites (with Juptree Automobile & Juptree China Direct presented together) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CAMPAIGN_PORTFOLIO_ENTRIES.slice(1).map((project) => {
              const isJuptreeDual = Boolean(project.companionPlatform);
              return (
                <article
                  key={project.id}
                  className={`rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden flex flex-col justify-between transition-shadow hover:shadow-md ${
                    isJuptreeDual ? "md:col-span-2 lg:col-span-2" : ""
                  }`}
                >
                  <div>
                    {project.image ? (
                      <div
                        className={`bg-slate-900 overflow-hidden border-b border-slate-200 ${
                          isJuptreeDual ? "aspect-[16/9]" : "aspect-[4/3]"
                        }`}
                      >
                        <img
                          src={project.image}
                          alt={`${project.client} digital platform preview`}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="aspect-[4/3] bg-[#071126] text-white p-6 flex flex-col justify-between border-b border-slate-200">
                        <div className="flex items-center justify-between text-[11px] font-mono text-emerald-400">
                          <span>LIVE CLIENT PLATFORM</span>
                          <Globe className="w-4 h-4" />
                        </div>
                        <div className="space-y-1.5">
                          <div className="text-xl font-display font-bold text-white">
                            {project.client}
                          </div>
                          <div className="text-xs font-mono text-slate-300 break-all">
                            {project.liveUrl.replace(/^https?:\/\//, "")}
                          </div>
                        </div>
                        <div className="text-[11px] text-slate-400">
                          Verified live website link active below
                        </div>
                      </div>
                    )}

                    <div className="p-6 space-y-3">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-emerald-700 font-semibold">
                        {project.serviceDelivered}
                      </div>
                      <h3 className="text-xl font-display font-bold text-[#071126]">
                        {project.client}
                      </h3>
                      <div className="text-xs font-medium text-slate-500">
                        {project.sector}
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {project.summary}
                      </p>

                      {project.companionPlatform && (
                        <div className="mt-4 p-4 rounded-xl bg-white border border-slate-200 grid sm:grid-cols-2 gap-3">
                          <div>
                            <div className="text-[11px] font-mono uppercase text-slate-500">
                              Platform 01 · Dealership
                            </div>
                            <div className="text-sm font-bold text-[#071126]">
                              Juptree Automobile
                            </div>
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-mono text-emerald-700 hover:underline inline-flex items-center gap-1 mt-1"
                            >
                              <span>juptreeautomobile.com</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                          <div>
                            <div className="text-[11px] font-mono uppercase text-slate-500">
                              Platform 02 · Direct Sourcing
                            </div>
                            <div className="text-sm font-bold text-[#071126]">
                              {project.companionPlatform.name}
                            </div>
                            <a
                              href={project.companionPlatform.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-mono text-emerald-700 hover:underline inline-flex items-center gap-1 mt-1"
                            >
                              <span>juptreechinadirect.com.ng</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-3 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-2">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[40px] inline-flex items-center gap-1.5 text-xs font-bold text-[#071126] hover:text-emerald-700 transition-colors"
                    >
                      <span>Visit Live Website</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                    {project.companionPlatform && (
                      <a
                        href={project.companionPlatform.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-h-[40px] inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-900 transition-colors"
                      >
                        <span>Visit {project.companionPlatform.name}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 5: SEO AND GOOGLE VISIBILITY
          ===================================================================== */}
      <section
        id="seo-google-visibility"
        className="scroll-mt-20 sm:scroll-mt-24 py-20 sm:py-24 bg-[#040A18] text-white"
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-12">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-emerald-400 font-semibold">
                <Search className="w-4 h-4" />
                <span>SEO &amp; Google Business Profile Optimisation</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight text-white">
                Be Found Where Your Customers Are Searching.
              </h2>
              <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed max-w-3xl">
                A website alone is not enough if prospects cannot discover your company on Google. Mindware pairs clean technical SEO, local search architecture, Schema.org metadata, and Google Business Profile optimization so buyers actively looking for your services can find and contact you.
              </p>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <button
                type="button"
                onClick={() => scrollToForm("gs2026-seo-section")}
                className="min-h-[46px] px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 transition-colors"
              >
                <span>Request SEO &amp; Visibility Review</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Core Search Visibility & GBP Optimization Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SEO_VISIBILITY_FOUNDATIONS.map((pillar) => (
              <div
                key={pillar.id}
                className="rounded-2xl border border-white/10 bg-[#08132B] p-6 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2.5">
                  <div className="text-[11px] font-mono text-emerald-400 font-semibold tracking-wider">
                    {pillar.stepCode}
                  </div>
                  <h3 className="text-lg font-display font-bold text-white leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          REUSED HOMEPAGE SOCIAL PROOF (GOOGLE REVIEWS + REAL CEOS VIDEO PROOF)
          ===================================================================== */}
      <GoogleClientReviews
        id="google-client-reviews"
        className="scroll-mt-20 sm:scroll-mt-24"
        variant="about"
        heading="Real Businesses. Real Projects. Genuine Client Feedback."
        supportingText="Discover what businesses and professionals say about working with Mindware Consulting Limited. Verified feedback reflecting our commitment to quality, reliability, and commercial value."
      />

      <GrowthSeasonVideoProof />

      {/* =====================================================================
          SECTION 6: WHY MINDWARE + FOUNDER-LED STRATEGIC OVERSIGHT
          ===================================================================== */}
      <section
        id="why-mindware"
        className="py-20 sm:py-28 bg-[#F8FAFC] text-[#071126] border-t border-slate-200"
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <div className="max-w-3xl mb-12 sm:mb-14">
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-emerald-700 font-semibold mb-3">
              Why Mindware Consulting Ltd
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight text-[#071126] mb-4">
              Commercial Experience, Technical Delivery &amp; Founder-Led Oversight.
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Businesses partner with Mindware because we connect digital execution with real commercial and management consulting realities.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* 6 Core Pillars */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {WHY_MINDWARE_PILLARS.map((pillar) => (
                <div
                  key={pillar.number}
                  className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2"
                >
                  <div className="text-xs font-mono font-bold text-emerald-700">
                    {pillar.number}
                  </div>
                  <h3 className="text-lg font-display font-bold text-[#071126]">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Founder-Led Strategic Oversight Card (Reusing verified profile from aboutData.ts) */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-[#071126] text-white p-6 sm:p-8 border border-[#0D1E42] shadow-xl space-y-6">
                <div className="text-xs font-mono uppercase tracking-[0.18em] text-emerald-400 font-semibold">
                  Founder-Led Strategic Oversight
                </div>

                <div className="flex items-center gap-4">
                  <img
                    src={founder.image}
                    alt={`${founder.name} — ${founder.role}`}
                    loading="lazy"
                    decoding="async"
                    className="w-20 h-20 rounded-2xl object-cover border border-emerald-500/40 shrink-0"
                  />
                  <div>
                    <h3 className="text-xl font-display font-bold text-white">
                      {founder.name}
                    </h3>
                    <p className="text-xs text-slate-300 mt-1">
                      {founder.role}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-slate-200 leading-relaxed border-t border-white/10 pt-5">
                  {founder.bio}
                </p>

                {founder.quote && (
                  <blockquote className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-slate-200 italic leading-relaxed">
                    "{founder.quote}"
                  </blockquote>
                )}

                <ul className="space-y-2 pt-1">
                  {founder.credentials.map((cred) => (
                    <li
                      key={cred}
                      className="flex items-start gap-2 text-xs text-slate-300"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{cred}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 7: CAMPAIGN BONUSES & BUILT-IN ENGAGEMENT FOUNDATIONS
          ===================================================================== */}
      <section
        id="campaign-bonuses"
        className="py-16 sm:py-20 bg-[#08132B] text-white border-t border-white/10"
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <div className="max-w-3xl mb-10">
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-emerald-400 font-semibold mb-2">
              Campaign Value &amp; Inclusions
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight text-white mb-3">
              Included Foundations With Every Campaign Engagement
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Rather than inflated bonus claims, Mindware builds practical commercial protections and setup clarity into every Business Growth Season 2026 engagement. Any seasonal campaign inclusions are confirmed openly in your written proposal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {CAMPAIGN_INCLUDED_FOUNDATIONS.map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-2xl bg-[#0C1B3B] border border-white/10 space-y-2"
              >
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-semibold uppercase">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Included Standard</span>
                </div>
                <h3 className="text-lg font-display font-bold text-white">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 8: ENQUIRY & QUALIFICATION FORM
          ===================================================================== */}
      <section
        ref={formSectionRef}
        id="enquiry-qualification-form"
        className="scroll-mt-20 sm:scroll-mt-24 py-20 sm:py-28 bg-white text-[#071126] border-t border-slate-200"
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Guidance Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="text-xs font-mono uppercase tracking-[0.2em] text-emerald-700 font-semibold">
                2027 Readiness &amp; Qualification Brief
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-[#071126] leading-tight">
                Let's Identify the Right Growth Solution for Your Business.
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                Share a few details about your business and what you want to improve ahead of 2027. Our consulting team reviews every submission and responds with clear next steps.
              </p>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="text-xs font-mono uppercase tracking-wider text-emerald-700 font-bold">
                  Selected Campaign Option
                </div>
                <div className="text-lg font-display font-bold text-[#071126]">
                  {selectedOffer
                    ? `${selectedOffer.name} (${selectedOffer.priceRange})`
                    : "Recommend Best Solution After Review"}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Campaign window closes {CAMPAIGN_2026_CONSTANTS.deadline}. Submissions are handled confidentially under Mindware Consulting Ltd (RC {COMPANY_INFO.rcNumber}).
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <a
                  href={primaryWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackWhatsAppClick("gs2026-form-sidebar", "direct_chat")
                  }
                  className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-200 hover:border-emerald-400 transition-colors"
                >
                  <MessageSquare className="w-5 h-5 text-emerald-700 shrink-0" />
                  <div className="text-sm">
                    <div className="text-emerald-800 text-xs font-semibold">
                      Prefer WhatsApp?
                    </div>
                    <div className="font-bold text-[#071126]">
                      {CAMPAIGN_2026_CONSTANTS.secondaryCtaLabel}
                    </div>
                  </div>
                </a>

                <a
                  href={`tel:${COMPANY_INFO.phoneTel}`}
                  onClick={() => trackPhoneClick("gs2026-form-sidebar")}
                  className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors"
                >
                  <Phone className="w-5 h-5 text-[#071126] shrink-0" />
                  <div className="text-sm">
                    <div className="text-slate-500 text-xs">Direct Phone</div>
                    <div className="font-semibold text-[#071126]">
                      {COMPANY_INFO.phoneDisplay}
                    </div>
                  </div>
                </a>

                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  onClick={() => trackEmailClick("gs2026-form-sidebar")}
                  className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors"
                >
                  <Mail className="w-5 h-5 text-[#071126] shrink-0" />
                  <div className="text-sm">
                    <div className="text-slate-500 text-xs">Official Email</div>
                    <div className="font-semibold text-[#071126]">
                      {COMPANY_INFO.email}
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Right Interactive Form Card */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl p-6 sm:p-8 md:p-10 bg-[#040A18] text-white border border-slate-800 shadow-2xl">
                {submitSuccess ? (
                  <div className="py-10 text-center space-y-5">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-display font-bold text-white">
                      Your 2027 Business Growth Enquiry Is Recorded
                    </h3>
                    {referenceId && (
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-white/5 border border-white/15 text-xs font-mono text-emerald-400">
                        <FileCheck2 className="w-4 h-4" />
                        <span>Reference ID: {referenceId}</span>
                      </div>
                    )}
                    <p className="text-sm sm:text-base text-slate-300 max-w-lg mx-auto leading-relaxed">
                      Thank you. Mindware Consulting Ltd has received your Business Growth Season 2026 qualification brief and our consulting desk will respond via email or WhatsApp during business hours.
                    </p>
                    <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => setSubmitSuccess(false)}
                        className="min-h-[44px] px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold uppercase tracking-wider text-white transition-colors"
                      >
                        Submit Another Enquiry
                      </button>
                      <a
                        href={buildCampaignWhatsAppHref(
                          `Hello Mindware Consulting, I just submitted my Business Growth Season 2026 enquiry (Ref: ${
                            referenceId || "New"
                          }) for ${
                            selectedOffer ? selectedOffer.name : "a growth review"
                          }.`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          trackWhatsAppClick(
                            "gs2026-post-submit",
                            preferredPackageId
                          )
                        }
                        className="min-h-[44px] px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2 transition-colors"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Continue on WhatsApp</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    onFocus={markFormStarted}
                    className="space-y-5"
                    noValidate
                  >
                    {/* Honeypot field */}
                    <input
                      type="text"
                      name="company_website_verify"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      className="sr-only"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="gs2026-fullname"
                          className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2"
                        >
                          Full Name *
                        </label>
                        <input
                          id="gs2026-fullname"
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Your full name"
                          className="w-full min-h-[46px] px-4 py-3 rounded-xl bg-[#09152E] border border-white/15 text-base text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="gs2026-business"
                          className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2"
                        >
                          Business Name
                        </label>
                        <input
                          id="gs2026-business"
                          type="text"
                          value={businessName}
                          onChange={(e) => setBusinessName(e.target.value)}
                          placeholder="Company or organization name"
                          className="w-full min-h-[46px] px-4 py-3 rounded-xl bg-[#09152E] border border-white/15 text-base text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="gs2026-email"
                          className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2"
                        >
                          Email Address *
                        </label>
                        <input
                          ref={emailInputRef}
                          id="gs2026-email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (emailError) setEmailError(null);
                            if (submitError) setSubmitError(null);
                          }}
                          aria-invalid={Boolean(emailError)}
                          aria-describedby={emailError ? "gs2026-email-error" : undefined}
                          placeholder="name@company.com.ng"
                          className={`w-full min-h-[46px] px-4 py-3 rounded-xl bg-[#09152E] border text-base text-white placeholder:text-slate-500 focus:outline-none ${
                            emailError
                              ? "border-red-400 focus:border-red-400"
                              : "border-white/15 focus:border-emerald-400"
                          }`}
                        />
                        {emailError && (
                          <p
                            id="gs2026-email-error"
                            role="alert"
                            className="mt-1.5 text-xs text-red-300 font-medium"
                          >
                            {emailError}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="gs2026-phone"
                          className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2"
                        >
                          WhatsApp / Phone Number *
                        </label>
                        <input
                          id="gs2026-phone"
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+234 800 000 0000"
                          className="w-full min-h-[46px] px-4 py-3 rounded-xl bg-[#09152E] border border-white/15 text-base text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="gs2026-industry"
                          className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2"
                        >
                          Business Industry *
                        </label>
                        <select
                          id="gs2026-industry"
                          value={industrySector}
                          onChange={(e) => setIndustrySector(e.target.value)}
                          className="w-full min-h-[46px] px-4 py-3 rounded-xl bg-[#09152E] border border-white/15 text-base text-white focus:outline-none focus:border-emerald-400"
                        >
                          {INDUSTRY_SECTOR_OPTIONS.map((sector) => (
                            <option key={sector} value={sector}>
                              {sector}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="gs2026-location"
                          className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2"
                        >
                          Business Location *
                        </label>
                        <input
                          id="gs2026-location"
                          type="text"
                          required
                          value={businessLocation}
                          onChange={(e) => setBusinessLocation(e.target.value)}
                          placeholder="e.g. Lagos, Abuja, Port Harcourt"
                          className="w-full min-h-[46px] px-4 py-3 rounded-xl bg-[#09152E] border border-white/15 text-base text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400"
                        />
                      </div>
                    </div>

                    <div>
                      <span className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2.5">
                        What Does Your Business Need Help With? *
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {BUSINESS_NEED_OPTIONS.map((need) => {
                          const checked = selectedNeeds.includes(need);
                          return (
                            <label
                              key={need}
                              className={`min-h-[44px] flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm cursor-pointer transition-colors ${
                                checked
                                  ? "bg-emerald-950/70 border-emerald-400 text-white"
                                  : "bg-[#09152E] border-white/15 text-slate-300 hover:border-white/30"
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => handleToggleNeed(need)}
                                className="sr-only"
                              />
                              <span
                                className={`w-4 h-4 rounded flex items-center justify-center border shrink-0 ${
                                  checked
                                    ? "bg-emerald-500 border-emerald-400 text-[#040A18]"
                                    : "border-white/30 bg-transparent"
                                }`}
                              >
                                {checked && <Check className="w-3 h-3 stroke-[3]" />}
                              </span>
                              <span className="leading-snug">{need}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="gs2026-package"
                        className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2"
                      >
                        Preferred Service / Package *
                      </label>
                      <select
                        id="gs2026-package"
                        value={preferredPackageId}
                        onChange={(e) => setPreferredPackageId(e.target.value)}
                        className="w-full min-h-[46px] px-4 py-3 rounded-xl bg-[#09152E] border border-white/15 text-base text-white focus:outline-none focus:border-emerald-400"
                      >
                        {CAMPAIGN_2026_OFFERS.map((offer) => (
                          <option key={offer.id} value={offer.id}>
                            {offer.name} ({offer.priceRange})
                          </option>
                        ))}
                        <option value={NOT_SURE_PACKAGE_ID}>
                          Not sure yet — recommend the right solution after review
                        </option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="gs2026-notes"
                        className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2"
                      >
                        Additional Information
                      </label>
                      <textarea
                        id="gs2026-notes"
                        rows={4}
                        value={additionalInfo}
                        onChange={(e) => setAdditionalInfo(e.target.value)}
                        placeholder="Share your current website URL (if any), key business challenges, or what you want your business to achieve before 2027..."
                        className="w-full px-4 py-3 rounded-xl bg-[#09152E] border border-white/15 text-base text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400"
                      />
                    </div>

                    {submitError && (
                      <div
                        role="alert"
                        className="p-3.5 rounded-xl bg-red-950/70 border border-red-400/50 text-xs sm:text-sm text-red-200"
                      >
                        {submitError}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full min-h-[52px] py-4 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 text-white font-bold text-sm uppercase tracking-wider inline-flex items-center justify-center gap-2.5 shadow-lg transition-all"
                    >
                      <TrendingUp className="w-4 h-4 shrink-0" />
                      <span>
                        {isSubmitting
                          ? "Submitting Your Business Brief..."
                          : CAMPAIGN_2026_CONSTANTS.primaryCtaLabel}
                      </span>
                    </button>

                    <p className="text-[11px] text-slate-400 text-center leading-relaxed">
                      Submitted securely to Mindware Consulting Ltd (RC {COMPANY_INFO.rcNumber}). Offer closes {CAMPAIGN_2026_CONSTANTS.deadline}.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 9: FAQS
          ===================================================================== */}
      <section
        id="campaign-faqs"
        className="scroll-mt-20 sm:scroll-mt-24 py-20 sm:py-24 bg-[#040A18] text-white border-t border-white/10"
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-5 space-y-4">
              <div className="text-xs font-mono uppercase tracking-[0.2em] text-emerald-400 font-semibold">
                Frequently Asked Questions
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-white">
                Clarity Before You Commit.
              </h2>
              <p className="text-base text-slate-300 leading-relaxed">
                Straight answers on who Business Growth Season 2026 serves, pricing scope, instalment terms, and how our consultation works.
              </p>
            </div>

            <div className="lg:col-span-7 space-y-3">
              {CAMPAIGN_2026_FAQS.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className={`rounded-xl border transition-colors ${
                      isOpen
                        ? "bg-[#0B1733] border-emerald-500/40"
                        : "bg-[#081228] border-white/10 hover:border-white/25"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                      aria-expanded={isOpen}
                      aria-controls={`gs2026-faq-${faq.id}`}
                      className="w-full min-h-[52px] flex items-center justify-between gap-4 p-5 text-left"
                    >
                      <span className="text-base sm:text-lg font-display font-bold text-white">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-emerald-400 shrink-0 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div
                        id={`gs2026-faq-${faq.id}`}
                        className="px-5 pb-5 pt-1 text-sm sm:text-base text-slate-300 leading-relaxed border-t border-white/10"
                      >
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 10: FINAL CTA
          ===================================================================== */}
      <section className="py-20 sm:py-28 bg-[#061128] text-white border-t border-emerald-500/30">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 text-center max-w-4xl">
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-emerald-400 font-semibold mb-4">
            Mindware Business Growth Season 2026 · Closes {CAMPAIGN_2026_CONSTANTS.deadline}
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-white mb-5">
            2027 Is Coming. Is Your Business Ready?
          </h2>
          <p className="text-lg sm:text-xl text-slate-200 font-light leading-relaxed max-w-2xl mx-auto mb-10">
            Take the first step towards building a stronger, more visible and better-positioned business.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 mb-8">
            <button
              type="button"
              onClick={() => scrollToForm("gs2026-final-cta")}
              className="min-h-[52px] inline-flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-4 rounded-xl text-xs sm:text-sm uppercase tracking-wider shadow-xl transition-all active:scale-[0.98]"
            >
              <span>{CAMPAIGN_2026_CONSTANTS.primaryCtaLabel}</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>

            <a
              href={primaryWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackWhatsAppClick("gs2026-final-cta", "primary_consultation")
              }
              className="min-h-[52px] inline-flex items-center justify-center gap-2.5 bg-white text-[#040A18] hover:bg-slate-100 font-bold px-7 py-4 rounded-xl text-xs sm:text-sm uppercase tracking-wider transition-all active:scale-[0.98]"
            >
              <MessageSquare className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>{CAMPAIGN_2026_CONSTANTS.secondaryCtaLabel}</span>
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-300">
            <a
              href={`tel:${COMPANY_INFO.phoneTel}`}
              onClick={() => trackPhoneClick("gs2026-final-cta")}
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>{COMPANY_INFO.phoneDisplay}</span>
            </a>
            <a
              href={`mailto:${COMPANY_INFO.email}`}
              onClick={() => trackEmailClick("gs2026-final-cta")}
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-400" />
              <span>{COMPANY_INFO.email}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Click-to-Chat Button (Positioned cleanly in bottom-right without competing Layout CTAs) */}
      <a
        href={primaryWhatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          trackWhatsAppClick("gs2026-floating-whatsapp", "campaign_2026")
        }
        aria-label="Chat with a Mindware Growth Consultant on WhatsApp"
        className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-40 min-h-[48px] px-4 sm:px-5 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-[0_8px_28px_rgba(5,150,105,0.45)] border border-emerald-400/40 inline-flex items-center gap-2 transition-transform hover:-translate-y-0.5 active:scale-95"
      >
        <MessageSquare className="w-4 h-4 shrink-0" />
        <span className="hidden sm:inline">WhatsApp Consultant</span>
        <span className="sm:hidden">WhatsApp</span>
      </a>
    </div>
  );
}
