import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { 
  Check, 
  Minus, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  TrendingUp, 
  Zap, 
  Building2, 
  GraduationCap, 
  Calendar,
  MessageSquare,
  BadgePercent,
  CheckCircle2,
  Globe
} from "lucide-react";
import { PRICING_TIERS, PricingTier } from "../data/pricing";
import { FadeInSection } from "../components/FadeInSection";
import { SEO } from "../components/SEO";
import { EASE } from "../lib/utils";
import { PricingFAQ } from "../components/PricingFAQ";
import { PricingComparisonTable } from "../components/PricingComparisonTable";

type FilterTab = "all" | "core" | "automation" | "workforce";

export function Pricing() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  const filteredTiers = PRICING_TIERS.filter((tier) => {
    if (activeTab === "core") return tier.tierNumber <= 2;
    if (activeTab === "automation") return tier.tierNumber === 3 || tier.tierNumber === 4;
    if (activeTab === "workforce") return tier.tierNumber >= 5;
    return true;
  });

  const getTierIcon = (tierNum: number) => {
    switch (tierNum) {
      case 1:
        return <Globe className="w-5 h-5 text-blue-400" />;
      case 2:
        return <TrendingUp className="w-5 h-5 text-emerald-400" />;
      case 3:
        return <Zap className="w-5 h-5 text-amber-400" />;
      case 4:
        return <Building2 className="w-5 h-5 text-mw-orange" />;
      case 5:
        return <GraduationCap className="w-5 h-5 text-purple-400" />;
      case 6:
      default:
        return <ShieldCheck className="w-5 h-5 text-rose-400" />;
    }
  };

  return (
    <div className="bg-[#02040a] text-white min-h-screen">
      <SEO 
        title="Pricing & Digital Growth Packages | Mindware Consulting" 
        description="Explore Mindware Consulting's 6-tier done-for-you digital solutions tailored for construction and engineering companies in Nigeria. From SEO websites to workflow automation, PMP, and HSE training." 
      />

      {/* Hero Section */}
      <FadeInSection className="pt-40 pb-20 border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-mw-orange/10 via-mw-orange/5 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-mw-orange animate-pulse" />
              <span className="text-[11px] font-sans font-semibold tracking-widest uppercase text-white/70">
                Mindware Consulting Ltd · RC 1309926
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.08] text-white">
              Our 6-Tier <br />
              <span className="text-gradient">Digital Growth</span> Packages.
            </h1>

            <p className="text-xl md:text-2xl text-white/60 leading-relaxed font-light mb-10 max-w-3xl">
              We offer done-for-you digital solutions tailored for construction companies. 
              From websites to automation, training, and safety compliance — everything your business needs under one roof.
            </p>

            {/* Inclusions Banner */}
            <div className="inline-flex flex-wrap items-center gap-3 px-5 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-white/80 text-sm">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>All Packages Include:</span>
              </div>
              <span className="text-white/70">1-Year Domain Name Registration &amp; High-Speed Web Hosting</span>
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* Filter Tabs */}
      <section className="py-10 border-b border-white/5 bg-white/[0.01]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-white/5 border border-white/10 w-full sm:w-auto">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-bold transition-all ${
                  activeTab === "all"
                    ? "bg-white text-mw-dark shadow-md"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                All 6 Packages
              </button>
              <button
                onClick={() => setActiveTab("core")}
                className={`px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-bold transition-all ${
                  activeTab === "core"
                    ? "bg-white text-mw-dark shadow-md"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                Tiers 1–2 (Web Foundations)
              </button>
              <button
                onClick={() => setActiveTab("automation")}
                className={`px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-bold transition-all ${
                  activeTab === "automation"
                    ? "bg-white text-mw-dark shadow-md"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                Tiers 3–4 (Operations &amp; Automation)
              </button>
              <button
                onClick={() => setActiveTab("workforce")}
                className={`px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-bold transition-all ${
                  activeTab === "workforce"
                    ? "bg-white text-mw-dark shadow-md"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                Tiers 5–6 (Workforce &amp; Safety)
              </button>
            </div>

            <a
              href="#comparison"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-mw-orange hover:text-orange-400 transition-colors py-2 px-4 rounded-xl border border-mw-orange/20 hover:border-mw-orange/50 bg-mw-orange/5"
            >
              <span>Compare All Features Matrix</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* Main Pricing Cards Grid */}
      <section className="py-20 lg:py-28 relative">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredTiers.map((tier, idx) => {
                const isPopular = tier.isPopular;
                const isFlagship = tier.isFlagship;

                return (
                  <motion.div
                    key={tier.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, delay: idx * 0.06, ease: EASE }}
                    className={`relative rounded-3xl p-8 transition-all duration-500 flex flex-col justify-between ${
                      isPopular
                        ? "bg-gradient-to-b from-white/[0.08] to-white/[0.02] border-2 border-mw-orange shadow-[0_0_50px_rgba(249,115,22,0.15)]"
                        : isFlagship
                        ? "bg-gradient-to-b from-white/[0.06] to-white/[0.015] border-2 border-amber-500/40 shadow-[0_0_50px_rgba(245,158,11,0.12)]"
                        : "bg-white/[0.02] border border-white/10 hover:border-white/20 hover:bg-white/[0.035]"
                    }`}
                  >
                    {/* Top Badges */}
                    <div className="flex items-center justify-between gap-3 mb-6">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                          {getTierIcon(tier.tierNumber)}
                        </div>
                        <span className="text-xs font-mono font-bold tracking-widest text-white/50 uppercase">
                          Tier {tier.tierNumber}
                        </span>
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

                    {/* Tier Name & Audience */}
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
                        {tier.name}
                      </h3>
                      <p className="text-sm text-white/60 leading-relaxed font-light min-h-[44px]">
                        {tier.targetAudience}
                      </p>
                    </div>

                    {/* Price Block */}
                    <div className="mb-8 pb-6 border-b border-white/10">
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                          {tier.price}
                        </span>
                      </div>
                      <p className="text-xs text-white/40 mt-1.5 font-mono">
                        Done-For-You Package · Domain &amp; Hosting Included
                      </p>
                    </div>

                    {/* Key Deliverables */}
                    <div className="space-y-3.5 mb-8 flex-grow">
                      <p className="text-[11px] font-bold uppercase tracking-widest text-white/40">
                        What's Included:
                      </p>
                      {tier.summaryFeatures.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-3 text-sm text-white/80">
                          <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="leading-snug">{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Cost Savings Box */}
                    <div className="mb-8 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                      <div className="flex items-center gap-2 text-xs font-semibold text-mw-orange mb-1.5">
                        <BadgePercent className="w-3.5 h-3.5" />
                        <span>Client Cost Savings</span>
                      </div>
                      <p className="text-xs text-white/70 leading-relaxed">
                        {tier.costSavings}
                      </p>
                    </div>

                    {/* CTA Area */}
                    <div className="space-y-3 pt-2">
                      <Link
                        to={`/contact?package=${encodeURIComponent(tier.name)}&tier=${tier.id}`}
                        className={`w-full py-4 px-6 rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 group ${
                          isPopular
                            ? "bg-mw-orange text-white hover:bg-orange-500 shadow-lg shadow-mw-orange/30 hover:scale-[1.02] active:scale-[0.98]"
                            : isFlagship
                            ? "bg-white text-mw-dark hover:bg-amber-400 shadow-lg shadow-white/20 hover:scale-[1.02] active:scale-[0.98]"
                            : "bg-white/10 hover:bg-white hover:text-mw-dark text-white border border-white/10 hover:scale-[1.02] active:scale-[0.98]"
                        }`}
                      >
                        <span>{tier.ctaText}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>

                      <a
                        href={`https://wa.me/2348125082354?text=${encodeURIComponent(
                          `Hello Mindware Consulting, I would like to inquire about the ${tier.name} package (${tier.price}).`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 px-4 rounded-full text-center text-xs font-medium text-white/50 hover:text-white transition-colors flex items-center justify-center gap-1.5"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Instant WhatsApp Inquiry</span>
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Feature Comparison Table Below Pricing Tiers */}
      <PricingComparisonTable />

      {/* ROI & Real Cost Savings Breakdown */}
      <FadeInSection className="py-24 border-t border-white/5 bg-gradient-to-b from-transparent to-white/[0.02]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center gap-2 text-mw-orange text-xs font-bold uppercase tracking-widest mb-4">
              <BadgePercent className="w-4 h-4" />
              <span>Measurable Bottom-Line Value</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-white">
              Why Our Done-For-You Packages Pay for Themselves.
            </h2>
            <p className="text-lg text-white/60 leading-relaxed font-light">
              We engineer our packages not as a cost center, but as an operational multiplier that slashes hiring expenses, eliminates tool subscriptions, and automates manual overhead.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-5">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Zero Hosting Overhead</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Save on separate domain registrars, high-tier hosting servers, and SSL certificates. 1 year of managed hosting and domain registration is bundled with every package.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-5">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Bookkeeping Staff Savings</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Save an average of <strong className="text-white">₦150,000–₦180,000/month</strong> by automating project billing, invoicing, and revenue workflows directly inside your digital portal.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-mw-orange/10 text-mw-orange flex items-center justify-center mb-5">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Automated HR &amp; Ads</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Eliminate external recruiter agency fees. Screen candidates automatically through dedicated career portals and generate qualified inbound construction bids.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-5">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Included PMP &amp; HSE Training</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Avoid paying <strong className="text-white">₦180,000–₦350,000+</strong> per employee for external certifications. Internal training portals and verified certificates are fully integrated.
              </p>
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* Conversion-Driven Pricing FAQ Component */}
      <PricingFAQ />

      {/* Bottom CTA Banner */}
      <FadeInSection className="py-24 border-t border-white/5 bg-gradient-to-t from-mw-orange/10 via-transparent to-transparent">
        <div className="container mx-auto px-6 md:px-12 text-center max-w-4xl">
          <div className="w-16 h-16 rounded-2xl bg-mw-orange/20 border border-mw-orange/30 flex items-center justify-center mx-auto mb-8">
            <Sparkles className="w-8 h-8 text-mw-orange" />
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 text-white leading-tight">
            Ready to Accelerate Your <br />
            <span className="text-gradient">Company's Growth?</span>
          </h2>

          <p className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl mx-auto font-light">
            Book a complimentary 30-minute discovery consultation with Mindware Consulting directors to review your requirements and identify your best-fit tier.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="w-full sm:w-auto px-10 py-5 rounded-full bg-white text-mw-dark font-bold text-xs uppercase tracking-widest hover:bg-mw-orange hover:text-white transition-all shadow-xl hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Strategy Consultation</span>
            </Link>

            <a
              href="https://wa.me/2348125082354"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-5 rounded-full bg-white/5 border border-white/10 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2"
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
