import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import {
  Check,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Zap,
  Building2,
  Calendar,
  MessageSquare,
  CheckCircle2,
  Globe,
  FileCheck2,
  Lock,
  Compass,
  Briefcase,
  Layers
} from "lucide-react";
import { PRICING_TIERS, ENGAGEMENT_MODELS, PricingLevel } from "../data/pricing";
import { FadeInSection } from "../components/FadeInSection";
import { SEO } from "../components/SEO";
import { EASE } from "../lib/utils";
import { PricingFAQ } from "../components/PricingFAQ";
import { PricingComparisonTable } from "../components/PricingComparisonTable";
import { CONVERSION_CTAS } from "../data/companyStats";
import { trackPrimaryCtaClick, trackWhatsAppClick } from "../lib/analytics";

type FilterTab = "all" | PricingLevel;

interface RecommenderOption {
  goal: string;
  recommendedTierId: string;
  reason: string;
}

const RECOMMENDER_GOALS: RecommenderOption[] = [
  {
    goal: "Establish a credible, mobile-ready corporate website & business emails (BUILD)",
    recommendedTierId: "starter-build",
    reason: "Starter Build (₦175,000) delivers a 5-page SEO-ready corporate website, custom domain, and 5 business emails."
  },
  {
    goal: "Present project portfolios cleanly & capture structured RFQs (BUILD)",
    recommendedTierId: "growth-engine",
    reason: "Growth Engine (₦295,000) adds multi-page project showcases, local SEO schema, and CRM intake workflows."
  },
  {
    goal: "Connect customer acquisition directly to billing & sales pipelines (GROW)",
    recommendedTierId: "pro-automation",
    reason: "Pro Automation (₦375,000) synchronizes sales inquiry routing, project tracking, and billing workflows."
  },
  {
    goal: "Scale visibility across 5 channels with dedicated account stewardship (GROW)",
    recommendedTierId: "enterprise-suite",
    reason: "Enterprise Suite (₦400,000) combines multi-channel visibility, internal recruitment portals, and dedicated oversight."
  },
  {
    goal: "Modernize internal project governance & corporate workflow adoption (TRANSFORM)",
    recommendedTierId: "operational-consulting-suite",
    reason: "Operational Transformation Suite (₦475,000) delivers internal workflow hubs and leadership system adoption."
  },
  {
    goal: "Deploy enterprise systems, Google Ads demand gen & compliance readiness (TRANSFORM)",
    recommendedTierId: "enterprise-transformation-flagship",
    reason: "Enterprise Growth & Compliance Flagship (₦595,000) unites platform systems, paid acquisition, and compliance portals."
  }
];

export function Pricing() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [highlightedTierId, setHighlightedTierId] = useState<string | null>(null);

  const filteredTiers = PRICING_TIERS.filter((tier) => {
    if (activeTab === "all") return true;
    return tier.level === activeTab;
  });

  const handleSelectGoal = (goalObj: RecommenderOption) => {
    setSelectedGoal(goalObj.goal);
    setHighlightedTierId(goalObj.recommendedTierId);
    setActiveTab("all");
    const el = document.getElementById(`tier-${goalObj.recommendedTierId}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const getTierIcon = (level: PricingLevel, tierNum: number) => {
    if (level === "BUILD") return <Globe className="w-5 h-5 text-blue-400" />;
    if (level === "GROW") return tierNum === 4 ? <Building2 className="w-5 h-5 text-mw-orange" /> : <TrendingUp className="w-5 h-5 text-emerald-400" />;
    return tierNum === 6 ? <ShieldCheck className="w-5 h-5 text-rose-400" /> : <Zap className="w-5 h-5 text-purple-400" />;
  };

  const schemaPricing = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Mindware Consulting BUILD, GROW & TRANSFORM Packages",
    "description": "Structured business growth and digital transformation engagement models: fixed-scope packages, monthly retainers, custom projects, and consulting engagements.",
    "brand": {
      "@type": "Brand",
      "name": "Mindware Consulting Ltd"
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "NGN",
      "lowPrice": "175000",
      "highPrice": "595000",
      "offerCount": "6",
      "offers": PRICING_TIERS.map((tier) => ({
        "@type": "Offer",
        "name": `${tier.level}: ${tier.name}`,
        "price": tier.priceNumeric.toString(),
        "priceCurrency": "NGN",
        "description": tier.targetAudience,
        "availability": "https://schema.org/InStock"
      }))
    }
  };

  return (
    <div className="bg-[#02040a] text-white min-h-screen selection:bg-mw-orange selection:text-white">
      <SEO
        title="Pricing & Engagement Models | BUILD, GROW & TRANSFORM | Mindware Consulting"
        description="Explore Mindware Consulting's BUILD, GROW, and TRANSFORM pricing across fixed-scope packages, monthly retainers, custom projects, and consulting engagements."
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaPricing) }}
      />

      {/* Hero Section */}
      <FadeInSection className="pt-28 sm:pt-36 md:pt-44 pb-14 sm:pb-20 border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-3/5 h-full bg-gradient-to-l from-mw-orange/15 via-mw-orange/5 to-transparent blur-3xl mix-blend-screen pointer-events-none" />
        <div className="absolute top-1/3 left-0 w-80 sm:w-96 h-80 sm:h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 px-3.5 sm:px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 sm:mb-8 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-mw-orange animate-pulse" />
              <span className="text-[10px] sm:text-[11px] font-sans font-semibold tracking-widest uppercase text-white/70">
                Mindware Consulting Ltd · BUILD → GROW → TRANSFORM
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold font-display tracking-tight mb-6 sm:mb-8 leading-[1.08] text-white">
              Structured Solutions for <br />
              <span className="text-gradient">BUILD, GROW &amp; TRANSFORM.</span>
            </h1>

            <p className="text-base sm:text-xl md:text-2xl text-white/70 leading-relaxed font-light mb-8 sm:mb-10 max-w-3xl">
              Clear pricing architecture designed around how ambitious organizations engage us: turnkey fixed-scope packages, ongoing growth retainers, custom software projects, and strategic consulting engagements.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl">
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs sm:text-sm text-white/80">1-Year Domain &amp; Managed Hosting Included</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
                <FileCheck2 className="w-4 h-4 text-mw-orange shrink-0" />
                <span className="text-xs sm:text-sm text-white/80">60% Mobilization / 40% Handover Milestone</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
                <Lock className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="text-xs sm:text-sm text-white/80">Formal Corporate Invoices (RC 1309926)</span>
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* Four Engagement Models */}
      <section className="py-12 sm:py-16 bg-[#03060f] border-b border-white/5">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <div className="max-w-3xl mb-8">
            <div className="text-xs font-bold uppercase tracking-widest text-mw-orange mb-2 flex items-center gap-2">
              <Layers className="w-4 h-4" />
              <span>Commercial Engagement Structures</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-2">
              Four Ways to Partner with Mindware Consulting
            </h2>
            <p className="text-xs sm:text-base text-white/60">
              Select a transparent turnkey tier below, or engage our team on an ongoing retainer, custom software scope, or consulting mandate.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ENGAGEMENT_MODELS.map((model, idx) => (
              <div
                key={model.id}
                className="p-6 rounded-2xl bg-white/[0.025] border border-white/10 flex flex-col justify-between hover:border-mw-orange/35 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-mw-orange font-bold uppercase">0{idx + 1}</span>
                    <Briefcase className="w-4 h-4 text-white/40" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{model.title}</h3>
                  <div className="text-xs font-medium text-white/50 mb-3">{model.subtitle}</div>
                  <p className="text-xs text-white/70 leading-relaxed mb-4">{model.description}</p>
                </div>

                <div className="pt-3 border-t border-white/10 space-y-1 text-[11px]">
                  <div className="text-white/50">
                    Best for: <span className="text-white/85">{model.bestFor}</span>
                  </div>
                  <div className="text-mw-orange font-mono font-semibold">{model.billingFormat}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Package Finder */}
      <section className="py-8 sm:py-12 bg-[#050814] border-b border-white/5">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <div className="max-w-4xl mx-auto p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#090e1f] border border-white/10 shadow-2xl">
            <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-mw-orange mb-3">
              <Compass className="w-4 h-4" />
              <span>Interactive Stage &amp; Package Finder</span>
            </div>
            <h2 className="text-lg sm:text-2xl font-bold mb-2">Which commercial priority matches your business right now?</h2>
            <p className="text-xs sm:text-sm text-white/60 mb-5">
              Select a goal across BUILD, GROW, or TRANSFORM to jump straight to the matching solution scope:
            </p>

            <div className="grid sm:grid-cols-2 gap-2.5">
              {RECOMMENDER_GOALS.map((opt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSelectGoal(opt)}
                  className={`p-3.5 rounded-xl text-left text-xs sm:text-sm font-medium transition-all flex items-start gap-3 border ${
                    selectedGoal === opt.goal
                      ? "bg-mw-orange/15 border-mw-orange text-white shadow-md shadow-mw-orange/20"
                      : "bg-white/[0.02] border-white/10 text-white/70 hover:bg-white/[0.05] hover:text-white"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${
                      selectedGoal === opt.goal ? "bg-mw-orange text-white" : "bg-white/10 text-white/50"
                    }`}
                  >
                    {i + 1}
                  </div>
                  <span className="leading-snug">{opt.goal}</span>
                </button>
              ))}
            </div>

            {selectedGoal && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 p-4 rounded-xl bg-mw-orange/10 border border-mw-orange/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="text-[11px] font-mono uppercase text-mw-orange font-bold">Recommended Scope:</div>
                  <div className="text-xs sm:text-sm text-white/90 mt-1">
                    {RECOMMENDER_GOALS.find((g) => g.goal === selectedGoal)?.reason}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById(`tier-${highlightedTierId}`);
                    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                  }}
                  className="px-4 py-2 rounded-full bg-mw-orange text-white text-xs font-bold uppercase tracking-wider shrink-0 hover:bg-orange-600 transition-colors"
                >
                  View Matching Tier ↓
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* BUILD / GROW / TRANSFORM Filter Tabs */}
      <section className="py-6 sm:py-8 border-b border-white/5 bg-white/[0.01]">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
            <div className="flex overflow-x-auto pb-1 scrollbar-none items-center gap-2 p-1.5 rounded-2xl bg-white/5 border border-white/10 w-full sm:w-auto touch-pan-x">
              {(["all", "BUILD", "GROW", "TRANSFORM"] as FilterTab[]).map((tab) => {
                const labels: Record<FilterTab, string> = {
                  all: "All 6 Packages",
                  BUILD: "BUILD (Foundations · ₦175k–₦295k)",
                  GROW: "GROW (Acquisition · ₦375k–₦400k)",
                  TRANSFORM: "TRANSFORM (Systems & Advisory · ₦475k–₦595k)"
                };
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-bold transition-all whitespace-nowrap shrink-0 min-h-[44px] ${
                      activeTab === tab
                        ? "bg-white text-mw-dark shadow-md"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {labels[tab]}
                  </button>
                );
              })}
            </div>

            <a
              href="#comparison"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-mw-orange hover:text-orange-400 transition-colors py-2 px-4 rounded-xl border border-mw-orange/20 hover:border-mw-orange/50 bg-mw-orange/5 min-h-[44px]"
            >
              <span>Compare All Features Matrix</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* Main Pricing Cards Grid */}
      <section className="py-12 sm:py-20 lg:py-28 relative">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredTiers.map((tier, idx) => {
                const isPopular = tier.isPopular;
                const isFlagship = tier.isFlagship;
                const isHighlighted = highlightedTierId === tier.id;

                return (
                  <motion.div
                    key={tier.id}
                    id={`tier-${tier.id}`}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, delay: idx * 0.06, ease: EASE }}
                    className={`relative rounded-3xl p-6 sm:p-8 transition-all duration-500 flex flex-col justify-between ${
                      isHighlighted
                        ? "ring-4 ring-mw-orange bg-[#0b1022] border-2 border-mw-orange shadow-[0_0_60px_rgba(249,115,22,0.3)]"
                        : isPopular
                        ? "bg-gradient-to-b from-white/[0.08] to-white/[0.02] border-2 border-mw-orange shadow-[0_0_50px_rgba(249,115,22,0.15)]"
                        : isFlagship
                        ? "bg-gradient-to-b from-white/[0.06] to-white/[0.015] border-2 border-amber-500/40 shadow-[0_0_50px_rgba(245,158,11,0.12)]"
                        : "bg-white/[0.02] border border-white/10 hover:border-white/20 hover:bg-white/[0.035]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 mb-6">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                          {getTierIcon(tier.level, tier.tierNumber)}
                        </div>
                        <div>
                          <span className="text-xs font-mono font-bold tracking-widest text-mw-orange uppercase block">
                            {tier.level} · Tier {tier.tierNumber}
                          </span>
                          <span className="text-[10px] text-white/45">{tier.engagementModel}</span>
                        </div>
                      </div>

                      {tier.badge && (
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                            isPopular
                              ? "bg-mw-orange text-white shadow-md shadow-mw-orange/30"
                              : isFlagship
                              ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md shadow-amber-500/20"
                              : "bg-white/10 text-white/80 border border-white/10"
                          }`}
                        >
                          {tier.badge}
                        </span>
                      )}
                    </div>

                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
                        {tier.name}
                      </h3>
                      <p className="text-sm text-white/65 leading-relaxed font-light min-h-[44px]">
                        {tier.targetAudience}
                      </p>
                    </div>

                    <div className="mb-8 pb-6 border-b border-white/10">
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                          {tier.price}
                        </span>
                      </div>
                      <p className="text-xs text-white/50 mt-1.5 font-mono">
                        Fixed-Scope Base · Domain &amp; Managed Hosting Included
                      </p>
                      <div className="mt-2 text-[11px] text-emerald-400 font-medium">
                        Milestones: 60% Mobilization / 40% Handover
                      </div>
                    </div>

                    <div className="space-y-3.5 mb-8 flex-grow">
                      <p className="text-[11px] font-bold uppercase tracking-widest text-white/40">
                        Included Scope:
                      </p>
                      {tier.summaryFeatures.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-3 text-sm text-white/80">
                          <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="leading-snug">{feat}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mb-8 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                      <div className="text-xs font-semibold text-mw-orange mb-1.5">Commercial Value</div>
                      <p className="text-xs text-white/70 leading-relaxed">{tier.costSavings}</p>
                    </div>

                    <div className="space-y-3 pt-2">
                      <Link
                        to={`/contact?package=${encodeURIComponent(tier.name)}&tier=${tier.id}&category=${tier.level === "GROW" ? "marketing-customer-acquisition" : tier.level === "TRANSFORM" ? "business-growth-consulting" : "digital-transformation"}&cta=business-growth-review`}
                        onClick={() =>
                          trackPrimaryCtaClick(
                            `pricing-tier-${tier.id}`,
                            `/contact?package=${tier.id}`,
                            tier.level === "GROW"
                              ? "marketing-customer-acquisition"
                              : tier.level === "TRANSFORM"
                              ? "business-growth-consulting"
                              : "digital-transformation"
                          )
                        }
                        className={`w-full py-4 px-6 rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 group min-h-[48px] ${
                          isPopular
                            ? "bg-mw-orange text-white hover:bg-orange-500 shadow-lg shadow-mw-orange/30"
                            : isFlagship
                            ? "bg-white text-mw-dark hover:bg-amber-400 shadow-lg shadow-white/20"
                            : "bg-white/10 hover:bg-white hover:text-mw-dark text-white border border-white/10"
                        }`}
                      >
                        <span>{tier.ctaText}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>

                      <a
                        href={`https://wa.me/2348125082354?text=${encodeURIComponent(
                          `Hello Mindware Consulting, I would like to discuss the ${tier.level} - ${tier.name} (${tier.price}) scope.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackWhatsAppClick(`pricing-tier-${tier.id}`, tier.name)}
                        className="w-full py-2.5 px-4 rounded-full text-center text-xs font-medium text-white/60 hover:text-white transition-colors flex items-center justify-center gap-1.5 min-h-[44px]"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Discuss Scope on WhatsApp</span>
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <PricingComparisonTable />

      {/* Custom Projects, Monthly Retainers & Consulting Value Breakdown */}
      <FadeInSection className="py-24 border-t border-white/5 bg-gradient-to-b from-transparent to-white/[0.02]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-3xl mb-14">
            <div className="inline-flex items-center gap-2 text-mw-orange text-xs font-bold uppercase tracking-widest mb-4">
              <Sparkles className="w-4 h-4" />
              <span>Commercial Architecture</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-5 text-white">
              Need a Monthly Retainer, Custom Software, or Consulting Mandate?
            </h2>
            <p className="text-base sm:text-lg text-white/65 leading-relaxed font-light">
              Beyond our fixed-scope packages, most B2B partners engage Mindware for custom applications, ongoing SEO &amp; ads management, or executive business growth advisory scoped specifically around internal goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-5">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Managed Infrastructure</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Domain registration, reliable cloud hosting, SSL hygiene, backups, and proactive maintenance keep your online platforms dependable.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-5">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Growth &amp; SEO Retainers</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Continuous search visibility improvements, Google Business optimization, and targeted ad management to grow qualified inquiry flow.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-mw-orange/10 text-mw-orange flex items-center justify-center mb-5">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Custom Software &amp; Portals</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Scoped bespoke portals, CRM workflows, client onboarding dashboards, and billing integrations built around how your business operates.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-5">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Consulting Engagements</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Management consulting, business development structuring, and staff system-adoption advisory under Mindware&apos;s ACQUIRE → PROTECT framework.
              </p>
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* FAQ */}
      <PricingFAQ />

      {/* Bottom CTA Banner */}
      <FadeInSection className="py-24 border-t border-white/5 bg-gradient-to-t from-mw-orange/10 via-transparent to-transparent">
        <div className="container mx-auto px-6 md:px-12 text-center max-w-4xl">
          <div className="w-16 h-16 rounded-2xl bg-mw-orange/20 border border-mw-orange/30 flex items-center justify-center mx-auto mb-8">
            <Sparkles className="w-8 h-8 text-mw-orange" />
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 text-white leading-tight">
            Ready to Scope Your <br />
            <span className="text-gradient">Growth Engagement?</span>
          </h2>

          <p className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl mx-auto font-light">
            Request a Business Growth Review to evaluate your current website, software, or market visibility needs and receive a tailored commercial scope.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to={CONVERSION_CTAS.primaryPath}
              onClick={() => trackPrimaryCtaClick("pricing-bottom-cta", CONVERSION_CTAS.primaryPath)}
              className="w-full sm:w-auto px-10 py-5 rounded-full bg-white text-mw-dark font-bold text-xs uppercase tracking-widest hover:bg-mw-orange hover:text-white transition-all shadow-xl flex items-center justify-center gap-2 min-h-[48px]"
            >
              <Calendar className="w-4 h-4" />
              <span>{CONVERSION_CTAS.primaryLabel}</span>
            </Link>

            <a
              href="https://wa.me/2348125082354?text=Hello%20Mindware%20Consulting%2C%20I%20would%20like%20to%20discuss%20growth%20package%20scoping."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("pricing-bottom-cta", "Growth Package Scope")}
              className="w-full sm:w-auto px-8 py-5 rounded-full bg-white/5 border border-white/10 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2 min-h-[48px]"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Speak on WhatsApp</span>
            </a>
          </div>
        </div>
      </FadeInSection>
    </div>
  );
}
