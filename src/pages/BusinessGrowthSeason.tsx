import React, { useState, useRef, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Compass,
  FileCheck2,
  HardHat,
  Layers,
  Mail,
  MessageSquare,
  Phone,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { EASE } from "../lib/utils";
import {
  CAMPAIGN_OVERVIEW,
  GROWTH_SEASON_TRACKS,
  GrowthSeasonTrack,
} from "../data/campaignData";
import {
  COMPANY_INFO,
  CONVERSION_CTAS,
  INDUSTRY_SECTOR_OPTIONS,
} from "../data/companyStats";
import { GoogleClientReviews } from "../components/reviews/GoogleClientReviews";
import { AboutCertifications } from "../components/about/AboutCertifications";
import { SEO } from "../components/SEO";
import {
  getStoredUtmParams,
  trackCampaignConversion,
  trackEmailClick,
  trackFormSubmit,
  trackPhoneClick,
  trackPrimaryCtaClick,
  trackWhatsAppClick,
} from "../lib/analytics";

export function BusinessGrowthSeason() {
  const [searchParams] = useSearchParams();
  const formSectionRef = useRef<HTMLDivElement>(null);
  const [selectedTrack, setSelectedTrack] = useState<GrowthSeasonTrack>(() => {
    const requestedTrack = searchParams.get("track");
    return (
      GROWTH_SEASON_TRACKS.find((t) => t.id === requestedTrack) ||
      GROWTH_SEASON_TRACKS[0]
    );
  });

  useEffect(() => {
    const requestedTrack = searchParams.get("track");
    if (requestedTrack) {
      const found = GROWTH_SEASON_TRACKS.find((t) => t.id === requestedTrack);
      if (found) {
        setSelectedTrack(found);
      }
    }
  }, [searchParams]);

  // Embedded Lead Capture Form State
  const [fullName, setFullName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [industrySector, setIndustrySector] = useState<string>(
    INDUSTRY_SECTOR_OPTIONS[0]
  );
  const [projectDesc, setProjectDesc] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [referenceId, setReferenceId] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSelectTrack = (track: GrowthSeasonTrack) => {
    setSelectedTrack(track);
    if (track.id === "construction-business-growth") {
      setIndustrySector("Construction & Civil Engineering");
    }
    trackCampaignConversion(track.id, "select_track");
    formSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setSubmitError(null);
    setSubmitSuccess(false);

    if (!fullName.trim() || (!email.trim() && !phone.trim())) {
      setSubmitError("Please enter your full name and an email address or WhatsApp phone number.");
      return;
    }

    setIsSubmitting(true);
    trackFormSubmit("campaign-growth-season", "attempt", {
      track_id: selectedTrack.id,
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
          campaignTrack: selectedTrack.id,
          industrySector,
          consultationTopic: `${CAMPAIGN_OVERVIEW.title} — ${selectedTrack.title}`,
          serviceNeeded: selectedTrack.title,
          engagementModel: selectedTrack.badge,
          projectDesc:
            projectDesc.trim() ||
            `Requested Business Growth Review under ${selectedTrack.title}.`,
          source: "business-growth-season-2026",
          pagePath: window.location.pathname,
          utmParams: getStoredUtmParams(),
          _hp: honeypot,
        }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data?.success) {
        throw new Error(
          data?.error || "Unable to submit your Business Growth Review right now."
        );
      }

      setReferenceId(data.referenceId || null);
      setSubmitSuccess(true);
      trackFormSubmit("campaign-growth-season", "success", {
        track_id: selectedTrack.id,
        reference_id: data.referenceId,
      });
      trackCampaignConversion(selectedTrack.id, "submit_success");

      setFullName("");
      setBusinessName("");
      setEmail("");
      setPhone("");
      setProjectDesc("");
    } catch (err: any) {
      const msg =
        err?.message ||
        "We could not complete your request right now. Please contact us via WhatsApp or phone.";
      setSubmitError(msg);
      trackFormSubmit("campaign-growth-season", "error", {
        track_id: selectedTrack.id,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-28 sm:pt-32 pb-24 bg-[#02040a] text-white min-h-screen overflow-hidden">
      <SEO
        title="Business Growth Season 2026 | Mindware Consulting Ltd"
        description="Explore Mindware Business Growth Season 2026 advisory tracks for websites, search visibility, customer acquisition, construction leadership, and operational systems."
        canonicalPath="/business-growth-season"
      />
      {/* 1. CAMPAIGN HERO SECTION */}
      <section className="relative pt-8 pb-20 border-b border-white/10">
        <div className="absolute top-0 right-1/4 w-[520px] h-[520px] bg-mw-orange/10 rounded-full blur-[130px] pointer-events-none" />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-mw-orange/15 border border-mw-orange/30 text-mw-orange text-xs font-bold uppercase tracking-widest mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{CAMPAIGN_OVERVIEW.title}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.08] mb-6">
              {CAMPAIGN_OVERVIEW.headline}
            </h1>

            <p className="text-lg sm:text-xl text-white/70 font-light leading-relaxed mb-8 max-w-3xl">
              {CAMPAIGN_OVERVIEW.intro}
            </p>

            {/* Primary + Supporting CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
              <button
                type="button"
                onClick={() => {
                  trackPrimaryCtaClick(
                    "growth-season-hero",
                    "#campaign-review-form",
                    "campaign-growth-season"
                  );
                  formSectionRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
                className="min-h-[48px] inline-flex items-center justify-center gap-2.5 bg-mw-orange hover:bg-orange-500 text-white font-bold px-8 py-4 rounded-full text-sm uppercase tracking-wider shadow-[0_8px_28px_rgba(249,115,22,0.35)] transition-all active:scale-95"
              >
                <span>{CONVERSION_CTAS.primaryLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`${COMPANY_INFO.whatsappUrl}?text=${encodeURIComponent(
                  "Hello Mindware Consulting, I would like to discuss a Business Growth Review under Mindware Business Growth Season 2026."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackWhatsAppClick("growth-season-hero", "campaign-2026")
                }
                className="min-h-[48px] inline-flex items-center justify-center gap-2.5 bg-white/5 hover:bg-emerald-500/15 border border-white/15 hover:border-emerald-400/40 text-white font-semibold px-7 py-4 rounded-full text-sm transition-all"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>{CONVERSION_CTAS.secondaryAdvisor}</span>
              </a>
            </div>

            {/* Governance / Scope Disclosure Banner */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-3 max-w-3xl">
              <ShieldCheck className="w-5 h-5 text-mw-orange shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-white/65 leading-relaxed">
                <strong className="text-white font-semibold">
                  Advisory Scoping Transparency:
                </strong>{" "}
                {CAMPAIGN_OVERVIEW.scopeDisclosure}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. FIVE STRUCTURED CAMPAIGN TRACKS */}
      <section className="py-20 lg:py-24 border-b border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-3xl mb-14">
            <div className="text-xs font-mono uppercase tracking-widest text-mw-orange mb-3">
              5 Structured Growth Tracks · 2026 Initiative
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Select the Advisory Track Aligned With Your Commercial Priorities.
            </h2>
            <p className="text-white/60 text-base sm:text-lg font-light leading-relaxed">
              Choose a track below to pre-select it inside the Business Growth Review intake form and tailor your diagnostic briefing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GROWTH_SEASON_TRACKS.map((track) => {
              const isSelected = selectedTrack.id === track.id;
              const isFlagship = track.id === "construction-business-growth";

              return (
                <div
                  key={track.id}
                  className={`rounded-3xl p-7 border flex flex-col justify-between transition-all duration-300 ${
                    isSelected
                      ? "bg-white/[0.06] border-mw-orange shadow-[0_12px_36px_rgba(249,115,22,0.12)]"
                      : isFlagship
                      ? "bg-gradient-to-b from-mw-orange/10 to-white/[0.02] border-mw-orange/35 hover:border-mw-orange"
                      : "bg-white/[0.02] border-white/10 hover:border-white/25 hover:bg-white/[0.04]"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span
                        className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${
                          isFlagship
                            ? "bg-mw-orange text-white"
                            : "bg-white/10 text-mw-orange"
                        }`}
                      >
                        {track.badge}
                      </span>
                      {isSelected && (
                        <span className="text-[11px] font-semibold text-emerald-400 inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Selected
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                      {track.title}
                    </h3>

                    <div className="space-y-3 text-sm mb-6">
                      <div>
                        <div className="text-[11px] uppercase tracking-wider text-white/45 font-semibold mb-1">
                          Built For
                        </div>
                        <p className="text-white/75 leading-relaxed">
                          {track.targetBusinessProfile}
                        </p>
                      </div>
                      <div>
                        <div className="text-[11px] uppercase tracking-wider text-white/45 font-semibold mb-1">
                          Commercial Bottleneck Addressed
                        </div>
                        <p className="text-white/65 leading-relaxed">
                          {track.problemSolved}
                        </p>
                      </div>
                    </div>

                    {/* Framework tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {track.frameworkFocus.map((stage) => (
                        <span
                          key={stage}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/75"
                        >
                          {stage}
                        </span>
                      ))}
                    </div>

                    {/* Deliverables */}
                    <ul className="space-y-2 mb-6 border-t border-white/10 pt-5">
                      {track.deliverableHighlights.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-xs text-white/75 leading-relaxed"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-white/10 space-y-4">
                    <p className="text-[11px] text-white/50 leading-relaxed">
                      {track.recommendedStartingNote}
                    </p>
                    <button
                      type="button"
                      onClick={() => handleSelectTrack(track)}
                      className={`w-full min-h-[44px] py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                        isSelected
                          ? "bg-mw-orange text-white"
                          : "bg-white text-mw-dark hover:bg-mw-orange hover:text-white"
                      }`}
                    >
                      <span>{track.ctaText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. CONSTRUCTION SECTOR SPOTLIGHT + CROSS-LINKS */}
      <section className="py-16 border-b border-white/5 bg-white/[0.015]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="rounded-3xl p-8 md:p-10 bg-gradient-to-br from-mw-orange/15 via-[#070b14] to-blue-500/10 border border-mw-orange/25 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-mw-orange">
                <HardHat className="w-4 h-4" />
                <span>Flagship Sector Spotlight · Construction & Civil Engineering</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Winning Commercial & Institutional Construction Bids Starts Before the Room Meeting.
              </h2>
              <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                From Temamost Nigeria Ltd and Solugans &amp; Associates Engineering Ltd to Cosmozel, Harmostructs, Bcale Associates, Crescon, and Efudo Construction, Mindware helps Nigerian engineering contractors showcase completed projects, heavy plant readiness, and statutory compliance cleanly.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link
                to="/industries/construction-civil-engineering"
                onClick={() =>
                  trackCampaignConversion("construction-spotlight", "cta_click")
                }
                className="min-h-[44px] inline-flex items-center justify-center gap-2 bg-white text-mw-dark hover:bg-mw-orange hover:text-white font-bold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all"
              >
                <Building2 className="w-4 h-4" />
                <span>Explore Construction Solutions</span>
              </Link>
              <Link
                to="/pricing"
                className="min-h-[44px] inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/15 text-white font-semibold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all"
              >
                <Layers className="w-4 h-4 text-mw-orange" />
                <span>Compare Standard Packages</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DEDICATED BUSINESS GROWTH REVIEW INTAKE FORM */}
      <section
        ref={formSectionRef}
        id="campaign-review-form"
        className="py-20 lg:py-24 border-b border-white/5"
      >
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Qualification Context */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-mw-orange">
                <Compass className="w-4 h-4" />
                <span>Business Growth Review Intake</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                {CONVERSION_CTAS.primaryLabel}
              </h2>

              <p className="text-white/65 leading-relaxed">
                Share your company background and growth priority. Our senior consulting team reviews your current website, search presence, and operational goals before recommending the right roadmap.
              </p>

              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
                <div className="text-xs font-bold uppercase tracking-wider text-mw-orange">
                  Active Campaign Track Selected
                </div>
                <div className="text-lg font-bold text-white">
                  {selectedTrack.title}
                </div>
                <p className="text-xs text-white/60 leading-relaxed">
                  {selectedTrack.advisoryScopeNote}
                </p>
                <div className="pt-2 border-t border-white/10 flex flex-wrap gap-2">
                  {GROWTH_SEASON_TRACKS.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setSelectedTrack(t)}
                      className={`text-[11px] px-2.5 py-1.5 rounded-lg border transition-colors ${
                        selectedTrack.id === t.id
                          ? "bg-mw-orange border-mw-orange text-white font-semibold"
                          : "bg-white/5 border-white/10 text-white/65 hover:text-white"
                      }`}
                    >
                      {t.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Direct Executive Channels */}
              <div className="space-y-3 pt-2">
                <a
                  href={`tel:${COMPANY_INFO.phoneTel}`}
                  onClick={() => trackPhoneClick("growth-season-intake")}
                  className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-white/25 transition-colors"
                >
                  <Phone className="w-4 h-4 text-mw-orange shrink-0" />
                  <div className="text-sm">
                    <div className="text-white/45 text-xs">Direct Executive Line</div>
                    <div className="font-semibold text-white">
                      {COMPANY_INFO.phoneDisplay}
                    </div>
                  </div>
                </a>
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  onClick={() => trackEmailClick("growth-season-intake")}
                  className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-white/25 transition-colors"
                >
                  <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                  <div className="text-sm">
                    <div className="text-white/45 text-xs">Official Corporate Email</div>
                    <div className="font-semibold text-white">
                      {COMPANY_INFO.email}
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Right Interactive Form */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl p-6 sm:p-8 md:p-10 bg-white/[0.03] border border-white/10 shadow-2xl">
                {submitSuccess ? (
                  <div className="py-10 text-center space-y-5">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      Business Growth Review Request Recorded
                    </h3>
                    {referenceId && (
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-mw-orange">
                        <FileCheck2 className="w-3.5 h-3.5" />
                        <span>Reference: {referenceId}</span>
                      </div>
                    )}
                    <p className="text-sm sm:text-base text-white/70 max-w-lg mx-auto leading-relaxed">
                      Thank you. Your request under{" "}
                      <strong className="text-white">{selectedTrack.title}</strong>{" "}
                      has been logged by Mindware Consulting Ltd. Our team responds via email or WhatsApp within business hours.
                    </p>
                    <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => setSubmitSuccess(false)}
                        className="min-h-[44px] px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 text-xs font-bold uppercase tracking-wider text-white transition-colors"
                      >
                        Submit Another Review
                      </button>
                      <a
                        href={`${COMPANY_INFO.whatsappUrl}?text=${encodeURIComponent(
                          `Hello Mindware Consulting, I just submitted a Business Growth Review request (Ref: ${referenceId || "New"}) under ${selectedTrack.title}.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          trackWhatsAppClick("growth-season-post-submit", selectedTrack.id)
                        }
                        className="min-h-[44px] px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2 transition-colors"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Continue on WhatsApp</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Honeypot field invisible to human users */}
                    <input
                      type="text"
                      name="website_url_confirm"
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
                          htmlFor="gs-fullname"
                          className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-2"
                        >
                          Full Name *
                        </label>
                        <input
                          id="gs-fullname"
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Engr. Chinedu Okeke"
                          className="w-full min-h-[46px] px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-base text-white placeholder:text-white/30 focus:outline-none focus:border-mw-orange"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="gs-business"
                          className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-2"
                        >
                          Company / Organization
                        </label>
                        <input
                          id="gs-business"
                          type="text"
                          value={businessName}
                          onChange={(e) => setBusinessName(e.target.value)}
                          placeholder="e.g. Apex Civil Engineering Ltd"
                          className="w-full min-h-[46px] px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-base text-white placeholder:text-white/30 focus:outline-none focus:border-mw-orange"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="gs-email"
                          className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-2"
                        >
                          Corporate or Personal Email *
                        </label>
                        <input
                          id="gs-email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@company.com.ng"
                          className="w-full min-h-[46px] px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-base text-white placeholder:text-white/30 focus:outline-none focus:border-mw-orange"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="gs-phone"
                          className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-2"
                        >
                          Phone / WhatsApp Number *
                        </label>
                        <input
                          id="gs-phone"
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+234 800 000 0000"
                          className="w-full min-h-[46px] px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-base text-white placeholder:text-white/30 focus:outline-none focus:border-mw-orange"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="gs-track"
                          className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-2"
                        >
                          Growth Season Track *
                        </label>
                        <select
                          id="gs-track"
                          value={selectedTrack.id}
                          onChange={(e) => {
                            const found = GROWTH_SEASON_TRACKS.find(
                              (t) => t.id === e.target.value
                            );
                            if (found) setSelectedTrack(found);
                          }}
                          className="w-full min-h-[46px] px-4 py-3 rounded-xl bg-[#090d16] border border-white/15 text-base text-white focus:outline-none focus:border-mw-orange"
                        >
                          {GROWTH_SEASON_TRACKS.map((t) => (
                            <option key={t.id} value={t.id}>
                              {t.title}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="gs-sector"
                          className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-2"
                        >
                          Industry Sector *
                        </label>
                        <select
                          id="gs-sector"
                          value={industrySector}
                          onChange={(e) => setIndustrySector(e.target.value)}
                          className="w-full min-h-[46px] px-4 py-3 rounded-xl bg-[#090d16] border border-white/15 text-base text-white focus:outline-none focus:border-mw-orange"
                        >
                          {INDUSTRY_SECTOR_OPTIONS.map((sec) => (
                            <option key={sec} value={sec}>
                              {sec}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="gs-notes"
                        className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-2"
                      >
                        Current Challenge, Website URL or Growth Goals *
                      </label>
                      <textarea
                        id="gs-notes"
                        rows={4}
                        required
                        value={projectDesc}
                        onChange={(e) => setProjectDesc(e.target.value)}
                        placeholder="Briefly describe your business objectives, existing website (if any), and key outcomes you want over the next 3–6 months..."
                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-base text-white placeholder:text-white/30 focus:outline-none focus:border-mw-orange"
                      />
                    </div>

                    {submitError && (
                      <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs sm:text-sm text-red-300">
                        {submitError}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full min-h-[50px] py-4 px-6 rounded-full bg-mw-orange hover:bg-orange-500 disabled:opacity-60 text-white font-bold text-sm uppercase tracking-wider inline-flex items-center justify-center gap-2 shadow-lg shadow-mw-orange/25 transition-all"
                    >
                      <TrendingUp className="w-4 h-4" />
                      <span>
                        {isSubmitting
                          ? "Recording Review Request..."
                          : CONVERSION_CTAS.primaryLabel}
                      </span>
                    </button>

                    <p className="text-[11px] text-white/45 text-center leading-relaxed">
                      Handled confidentially by Mindware Consulting Ltd (RC 1309926). No automated spam.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. VERIFIED CLIENT REVIEWS & CREDENTIALS */}
      <GoogleClientReviews
        variant="about"
        heading="Real Businesses. Real Projects. Genuine Client Feedback."
        supportingText="Verified Google client feedback reflecting Mindware Consulting Limited's commitment to quality, reliability, and measurable business value."
      />
      <AboutCertifications />
    </div>
  );
}
