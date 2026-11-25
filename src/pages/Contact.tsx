import { motion } from "motion/react";
import {
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Sparkles,
  Clock,
  ShieldCheck,
  Building2,
  Send,
  AlertCircle,
  Loader2,
  Globe,
  TrendingUp,
  Search,
  Settings,
  Briefcase,
  Layers,
  MessageSquare
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { SERVICES } from "../data/content";
import { PRICING_TIERS } from "../data/pricing";
import { EASE } from "../lib/utils";
import { FadeInSection } from "../components/FadeInSection";
import { SEO } from "../components/SEO";
import {
  CanonicalEnquiryCategory,
  CONVERSION_CTAS,
  ENQUIRY_CATEGORIES,
  ENQUIRY_CATEGORY_IDS,
  INDUSTRY_SECTOR_OPTIONS,
} from "../data/companyStats";
import { GROWTH_SEASON_TRACKS } from "../data/campaignData";
import {
  getStoredUtmParams,
  trackEmailClick,
  trackFormSubmit,
  trackPhoneClick,
  trackWhatsAppClick,
} from "../lib/analytics";

const CONSULTATION_TOPICS = [
  {
    id: "Website or platform redesign",
    label: "Website or Platform Redesign",
    description: "Turn an outdated website into a credible, fast, high-converting business flagship.",
    icon: Globe
  },
  {
    id: "Business growth & marketing strategy",
    label: "Business Growth & Marketing Strategy",
    description: "Build structured client acquisition, brand positioning, and pipeline governance.",
    icon: TrendingUp
  },
  {
    id: "SEO & customer acquisition",
    label: "SEO & Customer Acquisition",
    description: "Capture high-intent Google search demand, Google Business visibility, and paid campaigns.",
    icon: Search
  },
  {
    id: "Operational & software systems",
    label: "Operational & Software Systems",
    description: "Deploy custom portals, workflow automation, CRM pipelines, and internal business tools.",
    icon: Settings
  },
  {
    id: "Management consulting",
    label: "Management Consulting",
    description: "Strengthen commercial advisory, SOPs, project management controls, and governance.",
    icon: Briefcase
  },
  {
    id: "Long-term digital transformation support",
    label: "Long-Term Digital Transformation Support",
    description: "Retained strategic technology, SEO, security, and growth optimization partnership.",
    icon: Layers
  }
];

const ENGAGEMENT_MODELS = [
  "Fixed-Scope Package",
  "Monthly Retainer",
  "Custom Project",
  "Consulting Engagement",
  "Not sure yet — advise me"
];

export function Contact() {
  const [searchParams] = useSearchParams();
  const selectedPackageName = searchParams.get("package") || "";
  const selectedTierId = searchParams.get("tier") || "";
  const selectedService = searchParams.get("service") || "";
  const selectedCaseStudy = searchParams.get("case_study") || "";
  const selectedTopic = searchParams.get("topic") || "";
  const selectedEngagement = searchParams.get("engagement") || "";
  const selectedCategoryParam = searchParams.get("category") || "";
  const selectedIndustryParam = searchParams.get("industry") || "";
  const selectedTrackParam = searchParams.get("track") || "";

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [referenceId, setReferenceId] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [enquiryCategory, setEnquiryCategory] = useState<CanonicalEnquiryCategory>(
    "digital-transformation"
  );
  const [industrySector, setIndustrySector] = useState<string>(
    INDUSTRY_SECTOR_OPTIONS[0]
  );
  const [campaignTrack, setCampaignTrack] = useState<string>("");
  const [consultationTopic, setConsultationTopic] = useState("Website or platform redesign");
  const [engagementModel, setEngagementModel] = useState("Fixed-Scope Package");
  const [projectDesc, setProjectDesc] = useState("");
  const [serviceNeeded, setServiceNeeded] = useState(selectedTierId ? `pkg-${selectedTierId}` : "");
  const [fullName, setFullName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [honeypot, setHoneypot] = useState("");

  useEffect(() => {
    if (
      selectedCategoryParam &&
      (ENQUIRY_CATEGORY_IDS as readonly string[]).includes(selectedCategoryParam)
    ) {
      setEnquiryCategory(selectedCategoryParam as CanonicalEnquiryCategory);
      if (selectedCategoryParam === "other-organization") {
        setIndustrySector("Other Growing Organization / Institution");
      }
    }

    if (selectedTrackParam) {
      const matchedTrack = GROWTH_SEASON_TRACKS.find((t) => t.id === selectedTrackParam);
      if (matchedTrack) {
        setCampaignTrack(matchedTrack.id);
        setEnquiryCategory("campaign-growth-season");
        setProjectDesc(
          `We would like to request a Business Growth Review under ${matchedTrack.title}.`
        );
      }
    }

    if (selectedIndustryParam) {
      const lowerInd = selectedIndustryParam.toLowerCase();
      if (lowerInd.includes("construction") || lowerInd.includes("civil")) {
        setIndustrySector("Construction & Civil Engineering");
        if (!selectedCategoryParam) setEnquiryCategory("construction-business-growth");
      } else if (lowerInd.includes("real-estate")) {
        setIndustrySector("Real Estate & Property Development");
      } else if (lowerInd.includes("oil") || lowerInd.includes("marine")) {
        setIndustrySector("Oil, Gas, Marine & Energy");
      } else if (lowerInd.includes("auto")) {
        setIndustrySector("Automotive & Mobility");
      } else if (lowerInd.includes("ecommerce") || lowerInd.includes("retail")) {
        setIndustrySector("E-commerce & Retail");
      } else if (lowerInd.includes("interior") || lowerInd.includes("finishing")) {
        setIndustrySector("Interior Finishing & Allied Trades");
      } else if (lowerInd.includes("other")) {
        setIndustrySector("Other Growing Organization / Institution");
        if (!selectedCategoryParam) setEnquiryCategory("other-organization");
      }
    }

    if (selectedEngagement) {
      setEngagementModel(selectedEngagement);
    }
    if (selectedPackageName) {
      setProjectDesc(`We would like to initiate a Business Growth Review around the ${selectedPackageName} scope.`);
      if (selectedTierId) {
        setServiceNeeded(`pkg-${selectedTierId}`);
      }
    } else if (selectedCaseStudy) {
      setProjectDesc(`We are interested in achieving similar outcomes to the ${selectedCaseStudy} case study.`);
      if (selectedService) {
        setServiceNeeded(selectedService);
      }
    } else if (selectedTopic) {
      setConsultationTopic(selectedTopic);
      if (selectedTopic.toLowerCase().includes("marketing") || selectedTopic.toLowerCase().includes("seo")) {
        setEnquiryCategory("marketing-customer-acquisition");
      } else if (selectedTopic.toLowerCase().includes("consult")) {
        setEnquiryCategory("business-growth-consulting");
      }
      setProjectDesc(`We would like to request a Business Growth Review regarding: ${selectedTopic}.`);
    } else if (selectedService) {
      setServiceNeeded(selectedService);
      if (selectedService === "seo" || selectedService === "social-media-marketing") {
        setEnquiryCategory("marketing-customer-acquisition");
      } else if (selectedService === "consultancy" || selectedService === "training") {
        setEnquiryCategory("business-growth-consulting");
      }
      setProjectDesc(`We would like to discuss Mindware's ${selectedService} solutions for our organization.`);
    }
  }, [
    selectedPackageName,
    selectedTierId,
    selectedCaseStudy,
    selectedTopic,
    selectedService,
    selectedEngagement,
    selectedCategoryParam,
    selectedIndustryParam,
    selectedTrackParam,
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setErrorMessage(null);

    if (!fullName.trim() || (!emailAddress.trim() && phoneNumber.trim().length < 6) || !projectDesc.trim()) {
      setErrorMessage("Please provide your full name, a valid email address or phone number, and brief context on your business goals.");
      return;
    }

    setIsSubmitting(true);
    trackFormSubmit(enquiryCategory, "attempt", {
      industry_sector: industrySector,
      ...(campaignTrack ? { campaign_track: campaignTrack } : {}),
    });

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          source: campaignTrack ? "campaign-referral-contact" : "contact-page",
          pagePath: window.location.pathname,
          utmParams: getStoredUtmParams(),
          enquiryCategory,
          industrySector,
          campaignTrack,
          fullName: fullName.trim(),
          businessName: businessName.trim(),
          email: emailAddress.trim(),
          phone: phoneNumber.trim(),
          consultationTopic,
          serviceNeeded,
          engagementModel,
          projectDesc: projectDesc.trim(),
          _hp: honeypot,
        })
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data?.success) {
        throw new Error(
          data?.error || "We could not log your enquiry right now. Please reach us directly via WhatsApp or email."
        );
      }

      setReferenceId(data.referenceId || "");
      setIsSuccess(true);
      trackFormSubmit(enquiryCategory, "success", {
        reference_id: data.referenceId || "",
        industry_sector: industrySector,
      });
    } catch (err: any) {
      setIsSuccess(false);
      setErrorMessage(
        err?.message || "Network error submitting your request. Please call +234 812 508 2354 or email contact@mindwareconsult.com.ng."
      );
      trackFormSubmit(enquiryCategory, "error", {
        industry_sector: industrySector,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Schema.org ContactPage JSON-LD
  const schemaContact = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Mindware Consulting Ltd",
    "description": "Request a Business Growth Review with Mindware Consulting Ltd—your Business Growth and Digital Transformation Partner.",
    "publisher": {
      "@type": "Organization",
      "name": "Mindware Consulting Ltd",
      "url": "https://mindwareconsult.com.ng",
      "telephone": "+2348125082354",
      "email": "contact@mindwareconsult.com.ng",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "NG"
      }
    }
  };

  return (
    <div className="bg-mw-dark min-h-screen text-white selection:bg-mw-orange selection:text-white">
      <SEO
        title={`${CONVERSION_CTAS.primaryLabel} | Contact Mindware Consulting Ltd`}
        description="Request a Business Growth Review with Mindware Consulting Ltd—your Business Growth and Digital Transformation Partner for website redesign, SEO, marketing, software systems, and consulting."
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaContact) }}
      />

      {/* Hero */}
      <FadeInSection className="pt-28 sm:pt-36 md:pt-44 pb-12 sm:pb-16 border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-3/5 h-full bg-gradient-to-l from-mw-orange/15 via-mw-orange/5 to-transparent blur-3xl mix-blend-screen pointer-events-none" />
        <div className="absolute top-1/4 left-5 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-mw-orange/10 border border-mw-orange/20 text-mw-orange text-xs font-bold uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Business Enquiries & Strategic Consultations · RC 1309926</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-display tracking-tight mb-5 leading-[1.08] text-white">
              Let’s Discuss Your Next <br />
              <span className="text-gradient">Growth Opportunity.</span>
            </h1>
            <p className="text-base sm:text-xl text-white/70 max-w-3xl leading-relaxed font-light mb-6">
              Whether you are planning a corporate platform redesign, building repeatable customer acquisition, modernizing operations with custom software, or seeking management consulting support—speak directly with a Mindware strategic partner.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-white/65">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>Direct Leadership Review Within 4 Business Hours</span>
              </div>
              <span className="text-white/20">·</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-mw-orange" />
                <span>Structured Scope & Commercial Transparency</span>
              </div>
              <span className="text-white/20">·</span>
              <div className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-blue-400" />
                <span>Registered Corporate Governance (RC 1309926)</span>
              </div>
            </div>
          </motion.div>
        </div>
      </FadeInSection>

      {/* Consultation Areas Strip */}
      <section className="py-10 border-b border-white/5 bg-[#03060f]">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-mw-orange mb-1">
                Strategic Consultation Scope
              </div>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
                Select What You Want to Discuss With Our Team
              </h2>
            </div>
            <span className="text-xs text-white/50">Click a card to pre-select it in the consultation form below</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CONSULTATION_TOPICS.map((item) => {
              const Icon = item.icon;
              const isSelected = consultationTopic === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setConsultationTopic(item.id)}
                  className={`text-left p-5 rounded-2xl border transition-all flex items-start gap-3.5 ${
                    isSelected
                      ? "bg-mw-orange/15 border-mw-orange/60 shadow-lg shadow-mw-orange/10"
                      : "bg-white/[0.025] border-white/10 hover:border-white/25 hover:bg-white/[0.04]"
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    isSelected ? "bg-mw-orange text-white" : "bg-white/5 text-mw-orange"
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm font-bold text-white leading-snug">{item.label}</div>
                    <p className="text-xs text-white/60 leading-relaxed">{item.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.7, ease: EASE }}
        className="py-12 sm:py-20"
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* Contact Form */}
            <div className="lg:col-span-7">
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/[0.03] border border-emerald-500/30 rounded-3xl p-8 sm:p-12 text-center space-y-6"
                >
                  <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    {referenceId && (
                      <div className="text-xs font-mono uppercase tracking-wider text-emerald-400">
                        Confirmed Reference: {referenceId}
                      </div>
                    )}
                    <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                      Consultation Request Logged
                    </h3>
                    <p className="text-sm sm:text-base text-white/70 max-w-lg mx-auto leading-relaxed">
                      Thank you, <span className="text-white font-semibold">{fullName}</span>. Your brief regarding{" "}
                      <span className="text-mw-orange font-medium">{consultationTopic}</span> has been recorded for review by our leadership team.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <a
                      href={`https://wa.me/2348125082354?text=${encodeURIComponent(
                        `Hello Mindware Consulting Ltd, my name is ${fullName}${businessName ? ` from ${businessName}` : ""}. I just submitted Business Growth Review request ${referenceId} (${enquiryCategory}) regarding ${consultationTopic}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackWhatsAppClick("contact-post-submit", enquiryCategory)}
                      className="min-h-[44px] inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Fast-Track on WhatsApp</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSuccess(false);
                        setProjectDesc("");
                      }}
                      className="min-h-[44px] text-xs font-semibold text-white/70 hover:text-white px-4 py-3 underline"
                    >
                      Submit another enquiry
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/10">
                  {/* Honeypot field hidden from human users */}
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

                  <div>
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                      {CONVERSION_CTAS.primaryLabel}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/60 mt-1">
                      Tell us about your organization, priority growth challenges, and preferred engagement structure.
                    </p>
                  </div>

                  {errorMessage && (
                    <div role="alert" className="p-4 rounded-2xl bg-red-500/10 border border-red-500/35 flex items-start gap-3 text-xs sm:text-sm text-red-200">
                      <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <p className="font-semibold">Submission Error</p>
                        <p className="text-red-200/85">{errorMessage}</p>
                      </div>
                    </div>
                  )}

                  {selectedPackageName && (
                    <div className="p-4 rounded-2xl bg-mw-orange/10 border border-mw-orange/30 flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-mw-orange shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs uppercase font-bold tracking-widest text-mw-orange">
                          Selected Package Scope
                        </div>
                        <div className="text-base font-bold text-white">
                          {selectedPackageName}
                        </div>
                        <p className="text-xs text-white/60 mt-1">
                          Complete the details below and our solutions team will confirm deliverables, timeline, and onboarding.
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label htmlFor="fullName" className="text-xs sm:text-sm font-medium text-white/80">
                        Full Name <span className="text-mw-orange">*</span>
                      </label>
                      <input
                        id="fullName"
                        name="fullName"
                        required
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full min-h-[46px] bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-mw-orange focus:bg-white/10 transition-colors"
                        placeholder="e.g. Engr. Chidi Nwosu"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="businessName" className="text-xs sm:text-sm font-medium text-white/80">
                        Company / Organization
                      </label>
                      <input
                        id="businessName"
                        name="businessName"
                        type="text"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        className="w-full min-h-[46px] bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-mw-orange focus:bg-white/10 transition-colors"
                        placeholder="e.g. Zenith Civil Contractors Ltd"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label htmlFor="emailAddress" className="text-xs sm:text-sm font-medium text-white/80">
                        Work or Corporate Email <span className="text-mw-orange">*</span>
                      </label>
                      <input
                        id="emailAddress"
                        name="emailAddress"
                        required
                        type="email"
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                        className="w-full min-h-[46px] bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-mw-orange focus:bg-white/10 transition-colors"
                        placeholder="name@company.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phoneNumber" className="text-xs sm:text-sm font-medium text-white/80">
                        Phone / WhatsApp Number
                      </label>
                      <input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full min-h-[46px] bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-mw-orange focus:bg-white/10 transition-colors"
                        placeholder="+234 800 000 0000"
                      />
                    </div>
                  </div>

                  {/* Canonical Category & Industry Sector Qualification */}
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label htmlFor="enquiryCategory" className="text-xs sm:text-sm font-medium text-white/80">
                        Enquiry Category <span className="text-mw-orange">*</span>
                      </label>
                      <select
                        id="enquiryCategory"
                        name="enquiryCategory"
                        value={enquiryCategory}
                        onChange={(e) =>
                          setEnquiryCategory(e.target.value as CanonicalEnquiryCategory)
                        }
                        className="w-full min-h-[46px] bg-[#090d16] border border-white/10 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-mw-orange text-white"
                      >
                        {ENQUIRY_CATEGORIES.map((cat) => (
                          <option key={cat.id} value={cat.id} className="bg-mw-dark">
                            {cat.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="industrySector" className="text-xs sm:text-sm font-medium text-white/80">
                        Industry Sector <span className="text-mw-orange">*</span>
                      </label>
                      <select
                        id="industrySector"
                        name="industrySector"
                        value={industrySector}
                        onChange={(e) => setIndustrySector(e.target.value)}
                        className="w-full min-h-[46px] bg-[#090d16] border border-white/10 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-mw-orange text-white"
                      >
                        {INDUSTRY_SECTOR_OPTIONS.map((sec) => (
                          <option key={sec} value={sec} className="bg-mw-dark">
                            {sec}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label htmlFor="consultationTopic" className="text-xs sm:text-sm font-medium text-white/80">
                        Primary Enquiry Focus
                      </label>
                      <select
                        id="consultationTopic"
                        name="consultationTopic"
                        value={consultationTopic}
                        onChange={(e) => setConsultationTopic(e.target.value)}
                        className="w-full min-h-[46px] bg-[#090d16] border border-white/10 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-mw-orange text-white"
                      >
                        {CONSULTATION_TOPICS.map((t) => (
                          <option key={t.id} value={t.id} className="bg-mw-dark">
                            {t.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="engagementModel" className="text-xs sm:text-sm font-medium text-white/80">
                        Preferred Engagement Model
                      </label>
                      <select
                        id="engagementModel"
                        name="engagementModel"
                        value={engagementModel}
                        onChange={(e) => setEngagementModel(e.target.value)}
                        className="w-full min-h-[46px] bg-[#090d16] border border-white/10 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-mw-orange text-white"
                      >
                        {ENGAGEMENT_MODELS.map((m) => (
                          <option key={m} value={m} className="bg-mw-dark">
                            {m}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="serviceNeeded" className="text-xs sm:text-sm font-medium text-white/80">
                      Specific Solution or Package (Optional)
                    </label>
                    <select
                      id="serviceNeeded"
                      name="serviceNeeded"
                      value={serviceNeeded}
                      onChange={(e) => setServiceNeeded(e.target.value)}
                      className="w-full min-h-[46px] bg-[#090d16] border border-white/10 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-mw-orange text-white"
                    >
                      <option value="" className="bg-mw-dark">Select a package or solution pillar...</option>
                      <optgroup label="Structured Commercial Packages" className="bg-mw-dark text-white font-semibold">
                        {PRICING_TIERS.map((tier) => (
                          <option key={tier.id} value={`pkg-${tier.id}`} className="bg-mw-dark">
                            Tier {tier.tierNumber}: {tier.name} ({tier.price})
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Core Solution Areas" className="bg-mw-dark text-white font-semibold">
                        {SERVICES.map((s) => (
                          <option key={s.id} value={s.id} className="bg-mw-dark">{s.title}</option>
                        ))}
                      </optgroup>
                      <option value="custom" className="bg-mw-dark">Bespoke Enterprise Scope / Advisory Retainer</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="projectDesc" className="text-xs sm:text-sm font-medium text-white/80">
                      Business Objectives, Challenges &amp; Timeline <span className="text-mw-orange">*</span>
                    </label>
                    <textarea
                      id="projectDesc"
                      name="projectDesc"
                      required
                      rows={5}
                      value={projectDesc}
                      onChange={(e) => setProjectDesc(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-mw-orange focus:bg-white/10 transition-colors resize-none"
                      placeholder="Describe your current website or operational bottleneck, target customers, and desired outcomes..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-mw-orange hover:bg-orange-600 text-white px-8 py-4 sm:py-5 rounded-full font-bold uppercase tracking-wider text-xs sm:text-sm transition-all shadow-xl shadow-mw-orange/20 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed min-h-[52px]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting Growth Review Request...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>{CONVERSION_CTAS.primaryLabel}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-white/45 text-center leading-relaxed">
                    Handled confidentially by Mindware Consulting Ltd (RC 1309926) solely to evaluate and respond to your Business Growth Review request.
                  </p>
                </form>
              )}
            </div>

            {/* Contact Info & Executive Desk */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-mw-orange mb-2">
                  Direct Executive Access
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-6">
                  Connect With Mindware Consulting Ltd
                </h3>

                <div className="space-y-6">
                  <div className="flex gap-4 p-4 rounded-2xl bg-white/[0.025] border border-white/10">
                    <div className="w-11 h-11 bg-mw-orange/15 rounded-xl flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-mw-orange" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-0.5">Corporate Enquiries &amp; Proposals</h4>
                      <a
                        href="mailto:contact@mindwareconsult.com.ng"
                        onClick={() => trackEmailClick("contact-page")}
                        className="text-sm text-white/75 hover:text-mw-orange transition-colors break-all"
                      >
                        contact@mindwareconsult.com.ng
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 rounded-2xl bg-white/[0.025] border border-white/10">
                    <div className="w-11 h-11 bg-emerald-500/15 rounded-xl flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-0.5">Direct Phone / WhatsApp Strategy Desk</h4>
                      <a
                        href="tel:+2348125082354"
                        onClick={() => trackPhoneClick("contact-page")}
                        className="text-sm text-white/75 hover:text-emerald-400 transition-colors"
                      >
                        +234 812 508 2354
                      </a>
                      <p className="text-xs text-white/45 mt-0.5">Mon–Sat, 8:00 AM – 6:00 PM WAT</p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 rounded-2xl bg-white/[0.025] border border-white/10">
                    <div className="w-11 h-11 bg-blue-500/15 rounded-xl flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-0.5">Operating Coverage</h4>
                      <p className="text-sm text-white/75">Nigeria (36 States &amp; FCT Abuja) &amp; International Clients</p>
                      <p className="text-xs text-white/45 mt-0.5">CAC Registered Consulting &amp; Technology Firm · RC 1309926</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-mw-orange/15 via-[#0a0f1d] to-[#050811] border border-mw-orange/25 rounded-3xl p-6 sm:p-8 space-y-4">
                <h4 className="text-xl font-display font-bold text-white">Need an Urgent Project Review?</h4>
                <p className="text-sm text-white/75 leading-relaxed">
                  Share your current website link, tender readiness timeline, or operational goal directly with our team on WhatsApp for rapid scheduling.
                </p>
                <div className="flex flex-wrap gap-3 pt-1">
                  <a
                    href="https://wa.me/2348125082354?text=Hello%20Mindware%20Consulting%20Ltd%2C%20I%20would%20like%20to%20request%20a%20Business%20Growth%20Review."
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWhatsAppClick("contact-page-card")}
                    className="min-h-[44px] inline-flex items-center justify-center gap-2 bg-mw-orange hover:bg-amber-600 text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Strategy Desk</span>
                  </a>
                  <Link
                    to="/pricing"
                    className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/15 text-white px-5 py-3 rounded-full text-xs font-semibold transition-all"
                  >
                    <span>Explore Engagement Options</span>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </motion.section>
    </div>
  );
}
