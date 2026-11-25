import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Flame,
  Building2,
  Landmark,
  Car,
  ShoppingBag,
  Palette,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Zap,
  Sparkles,
  HelpCircle,
  ChevronDown,
  Layers,
  MapPin,
  MessageSquare,
  Award,
  ExternalLink,
  Clock,
  Coins
} from "lucide-react";
import {
  getIndustryBySlug,
  getRelatedIndustries,
  INDUSTRIES,
  IndustryData
} from "../data/industriesData";
import { SEO } from "../components/SEO";
import { FadeInSection } from "../components/FadeInSection";
import { cn } from "../lib/utils";
import {
  getStoredUtmParams,
  trackFormSubmit,
  trackIndustryConversion,
  trackPhoneClick,
  trackWhatsAppClick,
} from "../lib/analytics";

function getIndustryIcon(iconName: string) {
  switch (iconName) {
    case "Flame":
      return Flame;
    case "Building2":
      return Building2;
    case "Landmark":
      return Landmark;
    case "Car":
      return Car;
    case "ShoppingBag":
      return ShoppingBag;
    case "Palette":
      return Palette;
    default:
      return Layers;
  }
}

export function IndustryDetail() {
  const { industrySlug } = useParams<{ industrySlug: string }>();
  const industryData = industrySlug ? getIndustryBySlug(industrySlug) : undefined;

  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formRef, setFormRef] = useState("");
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formCompany, setFormCompany] = useState("");
  const [formScope, setFormScope] = useState("Enterprise Web Platform");
  const [honeypot, setHoneypot] = useState("");

  if (!industryData) {
    return (
      <div className="bg-[#02040a] min-h-screen text-white pt-36 pb-24 text-center px-6">
        <SEO
          title="Industry Sector Not Found | Mindware Consulting Ltd"
          description="Explore specialized digital engineering and business growth solutions across Mindware Consulting's six commercial industry sectors."
          noindex
        />
        <div className="max-w-xl mx-auto space-y-5">
          <Layers className="w-16 h-16 text-mw-orange mx-auto opacity-70" />
          <h1 className="text-3xl font-bold font-display text-white">Industry Sector Not Found</h1>
          <p className="text-sm text-white/60">
            We provide specialized digital engineering across Nigeria's key commercial industries. Browse our national directory to select your sector.
          </p>
          <div className="pt-4">
            <Link
              to="/industries"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-mw-orange text-white font-bold text-xs uppercase tracking-wider"
            >
              <span>View All 6 Focus Industries</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const IconComponent = getIndustryIcon(industryData.iconName);
  const relatedIndustries = getRelatedIndustries(industryData.id);

  // Schema.org structured data (Service + FAQPage)
  const schemaStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `https://mindwareconsult.com.ng/industries/${industryData.slug}#service`,
        "name": `Digital Engineering for ${industryData.name}`,
        "description": industryData.metaDescription,
        "provider": {
          "@type": "Organization",
          "name": "Mindware Consulting Ltd",
          "url": "https://mindwareconsult.com.ng",
          "telephone": "+2348125082354"
        },
        "areaServed": "Nigeria",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": `${industryData.name} Technical Solutions`,
          "itemListElement": industryData.features.map((f) => ({
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": f.title,
              "description": f.description
            }
          }))
        }
      },
      {
        "@type": "FAQPage",
        "@id": `https://mindwareconsult.com.ng/industries/${industryData.slug}#faq`,
        "mainEntity": industryData.faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      }
    ]
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formSubmitting) return;
    setFormError(null);
    setFormSubmitting(true);

    const category = industryData.isFlagship
      ? "construction-business-growth"
      : "digital-transformation";

    trackFormSubmit(category, "attempt", {
      industry_slug: industryData.slug,
    });

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: `industry-${industryData.slug}`,
          pagePath: window.location.pathname,
          utmParams: getStoredUtmParams(),
          enquiryCategory: category,
          industrySector: industryData.name,
          fullName: formName.trim(),
          businessName: formCompany.trim(),
          email: formEmail.trim(),
          phone: formPhone.trim(),
          consultationTopic: industryData.name,
          serviceNeeded: formScope,
          projectDesc: `Sector Business Growth Review enquiry for ${industryData.name} (${formScope}).`,
          _hp: honeypot,
        })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data?.success) {
        throw new Error(data?.error || "Unable to submit your enquiry right now. Please call +234 812 508 2354.");
      }
      setFormRef(data.referenceId || "");
      setFormSubmitted(true);
      trackFormSubmit(category, "success", {
        industry_slug: industryData.slug,
        reference_id: data.referenceId || "",
      });
      trackIndustryConversion(industryData.slug, "form_submit_success");
    } catch (err: any) {
      setFormSubmitted(false);
      setFormError(err?.message || "Unable to submit your enquiry right now. Please call +234 812 508 2354.");
      trackFormSubmit(category, "error", {
        industry_slug: industryData.slug,
      });
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <div className="bg-[#02040a] min-h-screen text-white pt-28 pb-24">
      <SEO
        title={industryData.metaTitle}
        description={industryData.metaDescription}
      />

      {/* Structured Data Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaStructuredData) }}
      />

      {/* Hero Header */}
      <section className="relative overflow-hidden py-14 md:py-20 border-b border-white/5">
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-mw-orange/15 via-blue-600/10 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs md:text-sm text-white/50 mb-6 flex-wrap">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/industries" className="hover:text-white transition-colors">Industries</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-semibold">{industryData.shortName}</span>
          </div>

          <div className="max-w-4xl space-y-6">
            {/* Unboxed Editorial Metadata Kicker */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-white/60 font-medium">
              {industryData.isFlagship && (
                <>
                  <span className="text-white bg-mw-orange px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                    Flagship Specialization
                  </span>
                  <span className="text-white/25">·</span>
                </>
              )}
              <span className="text-mw-orange font-semibold flex items-center gap-1.5">
                <IconComponent className="w-3.5 h-3.5 text-mw-orange inline shrink-0" />
                <span>{industryData.category}</span>
              </span>
              <span aria-hidden="true" className="text-white/20">·</span>
              <span className="text-white/80">Starting: <strong className="font-mono text-white font-semibold">{industryData.startingPrice}</strong></span>
              <span aria-hidden="true" className="text-white/20">·</span>
              <span className="text-emerald-400 font-medium">Typical Delivery: {industryData.typicalTimeline}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white tracking-tight leading-[1.08] [text-wrap:balance]">
              {industryData.heroHeadline}
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-3xl leading-relaxed font-normal">
              {industryData.heroSubheadline}
            </p>

            {/* Quick Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#industry-consultation"
                onClick={() => trackIndustryConversion(industryData.slug, "hero_proposal_click")}
                className="min-h-[44px] inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-mw-orange hover:bg-mw-orange-hover text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-mw-orange/20 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Request a Business Growth Review</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={`https://wa.me/2348125082354?text=Hello%20Mindware%20Consulting%2C%20I%20am%20interested%20in%20a%20tailored%20digital%20platform%20for%20my%20business%20in%20${encodeURIComponent(
                  industryData.name
                )}.`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick(`industry-${industryData.slug}`, industryData.shortName)}
                className="min-h-[44px] inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Sector Desk</span>
              </a>
            </div>

            {/* Metric Counters */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {industryData.metrics.map((m) => (
                <div key={m.label} className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                  <div className="text-2xl sm:text-3xl font-display font-bold text-mw-orange">{m.value}</div>
                  <div className="text-xs font-semibold text-white/90 mt-0.5">{m.label}</div>
                  <div className="text-[11px] text-white/50 leading-snug mt-1">{m.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <main className="container mx-auto px-6 md:px-12 py-12 md:py-16 space-y-16">
        {/* Section 1: Industry Challenges vs. Mindware Solutions */}
        <section className="space-y-6">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-mw-orange font-bold">
              INDUSTRY-SPECIFIC BOTTLENECKS
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Challenges Facing Nigerian Operators in {industryData.name}
            </h2>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              Standard corporate websites fail because they ignore the unique operational, statutory, and buyer psychology obstacles of the Nigerian market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {industryData.challenges.map((c, idx) => (
              <div
                key={idx}
                className="p-7 rounded-3xl border border-white/10 bg-white/[0.02] hover:border-mw-orange/40 hover:bg-white/[0.04] transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <span className="text-xs font-mono font-bold text-mw-orange px-2 py-0.5 rounded bg-mw-orange/10 border border-mw-orange/20">
                    Challenge 0{idx + 1}
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    {c.title}
                  </h3>
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-white/70 leading-relaxed space-y-1">
                    <span className="text-[11px] font-semibold text-rose-400 uppercase tracking-wider block">The Operational Bottleneck</span>
                    <p>{c.problem}</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white/90 leading-relaxed space-y-1">
                  <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider block">Mindware Solution Architecture</span>
                  <p>{c.solution}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Specialized Technical Capabilities (4 Modules) */}
        <section className="space-y-6">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-mw-orange font-bold">
              SPECIALIZED ARCHITECTURE
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              What We Build Specifically for {industryData.shortName}
            </h2>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              Every feature is built from the ground up to satisfy local regulatory standards, enhance buyer trust, and automate sales conversions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {industryData.features.map((feat, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent hover:border-mw-orange/40 transition-all space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-mw-orange px-2.5 py-0.5 rounded bg-mw-orange/10 border border-mw-orange/20">
                    {feat.tag}
                  </span>
                  <span className="text-xs font-mono text-white/40">Module 0{idx + 1}</span>
                </div>

                <h3 className="text-xl font-bold text-white">
                  {feat.title}
                </h3>

                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  {feat.description}
                </p>

                <div className="pt-3 border-t border-white/5 flex items-center gap-2 text-xs text-emerald-400 font-medium">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Commercial Impact: {feat.benefit}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Verified Client Case Study Spotlight */}
        <FadeInSection className="rounded-3xl border border-mw-orange/30 bg-gradient-to-br from-mw-orange/10 via-[#090d16] to-transparent p-8 md:p-12 space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-mw-orange font-bold">
                PROVEN IN PORTFOLIO
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                Real Nigerian Client Case Study
              </h2>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-bold px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 self-start sm:self-auto">
              Verified Commercial Results
            </span>
          </div>

          <blockquote className="text-base sm:text-lg text-white/90 italic leading-relaxed border-l-2 border-mw-orange pl-5">
            "{industryData.caseStudy.resultQuote}"
          </blockquote>

          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
            <div>
              <div className="font-bold text-white text-sm">{industryData.caseStudy.clientName}</div>
              <div className="text-white/60">{industryData.caseStudy.companyName}</div>
              <div className="text-mw-orange mt-0.5">{industryData.caseStudy.serviceProvided}</div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-white/80 font-mono">
                Key Metric: <strong className="text-emerald-400">{industryData.caseStudy.metrics}</strong>
              </div>
              {industryData.caseStudy.link && (
                <Link
                  to={industryData.caseStudy.link}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-mw-orange text-white text-xs font-bold uppercase tracking-wider hover:bg-mw-orange/90 transition-all shadow-md"
                >
                  <span>View Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>
        </FadeInSection>

        {/* Section 4: Relevant Nigerian Service Areas (Cross-Linking) */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-mw-orange font-bold">
                GEOGRAPHIC CONCENTRATION
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                Primary Nigerian Hubs for {industryData.shortName}
              </h2>
            </div>

            <Link
              to="/service-areas"
              className="text-xs font-bold text-white/70 hover:text-white flex items-center gap-1.5"
            >
              <span>View All 36 States & FCT Maps</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {industryData.keyServiceAreas.map((area) => (
              <Link
                key={area.slug}
                to={`/service-areas/${area.slug}`}
                className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-mw-orange/50 hover:bg-white/[0.05] transition-all space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white group-hover:text-mw-orange transition-colors flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-mw-orange" />
                    <span>{area.name}</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-white/40 group-hover:text-mw-orange group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-[11px] text-white/50 leading-snug">
                  {area.reason}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Section 5: Sector-Specific FAQs */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-mw-orange font-bold">
              INDUSTRY FAQ
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Questions Regarding {industryData.shortName} Platforms
            </h2>
            <p className="text-xs sm:text-sm text-white/60">
              Clear answers regarding statutory compliance, development timelines, and integration with Nigerian business operations.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {industryData.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
                  >
                    <span className="text-sm sm:text-base font-bold text-white flex items-center gap-2.5">
                      <HelpCircle className="w-4 h-4 text-mw-orange shrink-0" />
                      <span>{faq.question}</span>
                    </span>
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 text-white/50 shrink-0 transition-transform duration-200",
                        isOpen && "rotate-180 text-mw-orange"
                      )}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-white/70 leading-relaxed border-t border-white/5">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 6: Tailored Consultation Desk */}
        <section id="industry-consultation" className="scroll-mt-32">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#090d16] via-[#0d1627] to-[#1a0e0a] p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-4">
                <span className="text-xs font-mono uppercase tracking-wider text-mw-orange font-bold">
                  SECTOR STRATEGY DESK
                </span>
                <h3 className="text-2xl sm:text-4xl font-display font-bold text-white leading-tight">
                  Schedule a Consultation for {industryData.shortName}
                </h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  Discuss your project scope with senior engineering architects who understand the Nigerian regulatory landscape and commercial procurement standards of {industryData.name}.
                </p>

                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2 text-xs text-white/80">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Free Technical Discovery & Competitor Digital Audit</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/80">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Compliant Wireframe & Architecture Blueprint</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/80">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Fixed Naira Pricing with Milestone-Based Delivery</span>
                  </div>
                </div>
              </div>

              {/* Form Column */}
              <div className="lg:col-span-6">
                <div className="p-6 sm:p-8 rounded-2xl bg-black/60 border border-white/15 backdrop-blur-xl">
                  {formSubmitted ? (
                    <div className="text-center py-8 space-y-4 animate-fade-in">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <h4 className="text-xl font-bold text-white">Strategy Request Received</h4>
                      {formRef && (
                        <div className="text-[11px] font-mono text-emerald-400">Reference: {formRef}</div>
                      )}
                      <p className="text-xs text-white/70 max-w-sm mx-auto">
                        Thank you, {formName}. Our lead consultant for <strong>{industryData.shortName}</strong> has logged your brief and will reach out promptly.
                      </p>
                      <button
                        onClick={() => setFormSubmitted(false)}
                        className="text-xs text-mw-orange hover:underline font-semibold"
                      >
                        Submit another inquiry
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-4">
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

                      <div className="text-sm font-bold text-white mb-2">
                        Request a Business Growth Review ({industryData.shortName})
                      </div>
                      {formError && (
                        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300">
                          {formError}
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-white/70 mb-1.5 font-medium">Your Full Name</label>
                          <input
                            type="text"
                            required
                            value={formName}
                            onChange={(e) => setFormName(e.target.value)}
                            placeholder="e.g. Engr. Victor Okonjo"
                            className="w-full min-h-[46px] px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white text-base placeholder-white/40 focus:outline-none focus:border-mw-orange focus:ring-1 focus:ring-mw-orange/30 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-white/70 mb-1.5 font-medium">Corporate Email (Optional)</label>
                          <input
                            type="email"
                            value={formEmail}
                            onChange={(e) => setFormEmail(e.target.value)}
                            placeholder="name@company.com.ng"
                            className="w-full min-h-[46px] px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white text-base placeholder-white/40 focus:outline-none focus:border-mw-orange focus:ring-1 focus:ring-mw-orange/30 transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-white/70 mb-1.5 font-medium">Phone / WhatsApp</label>
                          <input
                            type="tel"
                            required
                            value={formPhone}
                            onChange={(e) => setFormPhone(e.target.value)}
                            placeholder="0801 234 5678"
                            className="w-full min-h-[46px] px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white text-base placeholder-white/40 focus:outline-none focus:border-mw-orange focus:ring-1 focus:ring-mw-orange/30 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-white/70 mb-1.5 font-medium">Company Name</label>
                          <input
                            type="text"
                            required
                            value={formCompany}
                            onChange={(e) => setFormCompany(e.target.value)}
                            placeholder="e.g. Vigox Marine Ltd"
                            className="w-full min-h-[46px] px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white text-base placeholder-white/40 focus:outline-none focus:border-mw-orange focus:ring-1 focus:ring-mw-orange/30 transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs text-white/70 mb-1.5 font-medium">Project Scope Needed</label>
                        <select
                          value={formScope}
                          onChange={(e) => setFormScope(e.target.value)}
                          className="w-full min-h-[46px] px-4 py-3 rounded-xl bg-[#090d16] border border-white/15 text-white text-base focus:outline-none focus:border-mw-orange focus:ring-1 focus:ring-mw-orange/30 transition-all"
                        >
                          <option value="Enterprise Web Platform">Custom Corporate Web Platform &amp; SEO</option>
                          <option value="Tender / Bidding Portal">Tender &amp; Compliance Audit Portal</option>
                          <option value="Digital Showroom / Catalog">Digital Showroom / Asset Catalog</option>
                          <option value="E-Commerce & Payments">E-Commerce &amp; Automated Logistics</option>
                          <option value="Complete Digital Transformation">Full Digital Transformation Suite</option>
                        </select>
                      </div>

                      <button
                        type="submit"
                        disabled={formSubmitting}
                        className="w-full min-h-[46px] py-3.5 px-6 rounded-xl bg-mw-orange hover:bg-mw-orange-hover text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-mw-orange/20 mt-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
                      >
                        {formSubmitting ? "Submitting..." : "Request a Business Growth Review"}
                      </button>

                      <p className="text-[11px] text-white/45 text-center leading-relaxed">
                        Handled confidentially by Mindware Consulting Ltd (RC 1309926) solely for your consultation request.
                      </p>

                      <div className="text-[11px] text-white/40 text-center">
                        Prefer an instant call? Phone:{" "}
                        <a
                          href="tel:+2348125082354"
                          onClick={() => trackPhoneClick(`industry-${industryData.slug}`)}
                          className="text-white/70 hover:text-white underline"
                        >
                          +234 812 508 2354
                        </a>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Related Industries Cluster */}
        {relatedIndustries.length > 0 && (
          <section className="space-y-6 pt-4 border-t border-white/10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-mw-orange font-bold">
                  EXPLORE OTHER SECTORS
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  Other Specialized Industries We Empower
                </h3>
              </div>

              <Link
                to="/industries"
                className="text-xs font-bold text-white/70 hover:text-white flex items-center gap-1.5"
              >
                <span>View All 6 Industries</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedIndustries.map((rel) => {
                const RelIcon = getIndustryIcon(rel.iconName);
                return (
                  <Link
                    key={rel.id}
                    to={`/industries/${rel.slug}`}
                    className="p-6 rounded-3xl border border-white/10 bg-white/[0.02] hover:border-mw-orange/50 hover:bg-white/[0.04] transition-all space-y-3 group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-mw-orange/10 border border-mw-orange/20 flex items-center justify-center text-mw-orange group-hover:bg-mw-orange group-hover:text-white transition-colors">
                        <RelIcon className="w-5 h-5" />
                      </div>
                      <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-mw-orange group-hover:translate-x-1 transition-all" />
                    </div>

                    <h4 className="text-base font-bold text-white group-hover:text-mw-orange transition-colors">
                      {rel.name}
                    </h4>

                    <p className="text-xs text-white/60 line-clamp-2 leading-relaxed">
                      {rel.overview}
                    </p>

                    <div className="text-[11px] font-mono text-emerald-400">
                      Typical Timeline: {rel.typicalTimeline}
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
