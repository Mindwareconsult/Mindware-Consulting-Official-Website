import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  Compass,
  Layers,
  MessageSquare,
  ShieldCheck,
  TrendingUp,
  Cpu
} from "lucide-react";
import {
  EIGHT_BUSINESS_OUTCOMES,
  GROWTH_FRAMEWORK,
  SOLUTIONS_PILLARS,
  STRATEGIC_POSITIONING
} from "../data/solutionsData";
import { INDUSTRIES } from "../data/industriesData";
import { FadeInSection } from "../components/FadeInSection";
import { SEO } from "../components/SEO";
import { EASE } from "../lib/utils";
import { CONVERSION_CTAS } from "../data/companyStats";
import { trackPrimaryCtaClick, trackWhatsAppClick } from "../lib/analytics";
import { MEDIA_ASSETS } from "../assets/media";

export function Solutions() {
  const constructionSector = INDUSTRIES.find(i => i.id === "construction-civil-engineering") || INDUSTRIES[0];

  const getPillarIcon = (id: string) => {
    if (id === "digital-transformation-technology") return Cpu;
    if (id === "digital-marketing-customer-acquisition") return TrendingUp;
    return Compass;
  };

  return (
    <div className="bg-[#02040a] min-h-screen text-white pt-28 pb-24">
      <SEO
        title="Solutions & Growth Framework | Mindware Consulting Ltd"
        description="Mindware Consulting is your Business Growth and Digital Transformation Partner. Explore our Digital Transformation, Customer Acquisition, and Management Consulting solutions built on the ACQUIRE -> GROW -> OPTIMIZE -> ACCELERATE -> PROTECT framework."
      />

      {/* Editorial Hero Split */}
      <section className="relative overflow-hidden py-14 md:py-20 border-b border-white/10">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="flex items-center gap-2 text-xs text-white/50 mb-8">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span aria-hidden="true">/</span>
            <span className="text-mw-orange font-semibold">Solutions</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
            <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
              <div className="text-xs font-medium tracking-wider uppercase text-mw-orange">
                Business Growth & Digital Transformation Partner
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-white tracking-tight leading-[1.08] [text-wrap:balance]">
                {STRATEGIC_POSITIONING.headline}
              </h1>

              <p className="text-base sm:text-lg text-white/70 max-w-2xl leading-relaxed font-normal">
                {STRATEGIC_POSITIONING.subheadline}
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  to={CONVERSION_CTAS.primaryPath}
                  onClick={() => trackPrimaryCtaClick("solutions-hero", CONVERSION_CTAS.primaryPath)}
                  className="min-h-[48px] inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-mw-orange hover:bg-mw-orange-hover text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-mw-orange/20 whitespace-nowrap"
                >
                  <span>{CONVERSION_CTAS.primaryLabel}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/business-growth-season-2026/"
                  className="min-h-[48px] inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/15 font-semibold text-xs uppercase tracking-wider transition-colors whitespace-nowrap"
                >
                  <span>Growth Season 2026</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative rounded-3xl overflow-hidden border border-white/10 bg-[#090d16] min-h-[280px] lg:min-h-[380px]">
              <img
                src={MEDIA_ASSETS.heroGrowthStrategy}
                alt="Mindware Consulting executive digital transformation and business growth strategy briefing"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] via-[#02040a]/30 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 border-t border-white/15 pt-4">
                <div className="text-xs text-white/60 uppercase tracking-wider">Strategic Mandate</div>
                <div className="text-sm sm:text-base font-semibold text-white mt-1">
                  Infrastructure · Visibility · Customer Acquisition · Operational Scale
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8 Core Business Outcomes Strip */}
      <section className="py-12 border-b border-white/10 bg-[#050812]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-mw-orange mb-2">
                Commercial Outcomes We Engineer
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
                How We Help Ambitious Businesses Compete and Scale
              </h2>
            </div>
            <Link
              to="/portfolio"
              className="text-xs font-semibold text-white/70 hover:text-mw-orange inline-flex items-center gap-1.5 transition-colors whitespace-nowrap"
            >
              <span>Inspect Client Results</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {EIGHT_BUSINESS_OUTCOMES.map((outcome, idx) => (
              <div
                key={outcome}
                className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] flex items-start gap-3"
              >
                <span className="text-xs font-mono tabular-nums text-mw-orange font-bold mt-0.5">
                  0{idx + 1}
                </span>
                <p className="text-sm text-white/85 font-medium leading-snug">{outcome}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Three Strategic Solution Pillars */}
      <FadeInSection className="py-16 md:py-24 border-b border-white/10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-3xl mb-14">
            <div className="text-xs font-semibold uppercase tracking-widest text-mw-orange mb-3">
              Three Integrated Solution Practices
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight leading-tight [text-wrap:balance]">
              Three Pillars Built to Operate as One Connected Growth Engine.
            </h2>
            <p className="text-base sm:text-lg text-white/65 mt-4 leading-relaxed">
              Rather than selling isolated websites or disconnected campaigns, our practice integrates technology systems, customer acquisition, and management advisory around your bottom line.
            </p>
          </div>

          <div className="space-y-8">
            {SOLUTIONS_PILLARS.map((pillar, index) => {
              const Icon = getPillarIcon(pillar.id);
              return (
                <motion.div
                  key={pillar.id}
                  id={pillar.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08, ease: EASE }}
                  className="scroll-mt-32 rounded-3xl border border-white/10 bg-[#070b14] p-7 sm:p-10 md:p-12"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    <div className="lg:col-span-5 space-y-5">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-mw-orange/10 border border-mw-orange/25 flex items-center justify-center text-mw-orange shrink-0">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="text-xs text-white/50 font-mono tabular-nums">
                          Practice {pillar.number} · {pillar.growthStages.join(" / ")}
                        </div>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                        {pillar.title}
                      </h3>

                      <p className="text-sm sm:text-base font-medium text-mw-orange">
                        {pillar.subtitle}
                      </p>

                      <p className="text-sm text-white/70 leading-relaxed">
                        {pillar.summary}
                      </p>

                      <div className="pt-2 flex flex-wrap gap-3">
                        {pillar.mappedServices.map((srv) => (
                          <Link
                            key={srv.path}
                            to={srv.path}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/85 hover:text-mw-orange border border-white/15 hover:border-mw-orange/40 px-4 py-2 rounded-full transition-colors whitespace-nowrap"
                          >
                            <span>{srv.label}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div className="lg:col-span-7 space-y-6 pt-6 lg:pt-0 border-t lg:border-t-0 lg:border-l border-white/10 lg:pl-10">
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-3">
                          Capabilities & Commercial Business Value ({pillar.subServices.length})
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                          {pillar.subServices.map((sub) => (
                            <Link
                              key={sub.title}
                              to={sub.link || "/contact"}
                              className="group/sub p-4 rounded-2xl bg-white/[0.025] border border-white/10 hover:border-mw-orange/45 hover:bg-white/[0.04] transition-all flex flex-col justify-between gap-2"
                            >
                              <div className="flex items-start justify-between gap-2">
                                <span className="text-sm font-bold text-white group-hover/sub:text-mw-orange transition-colors leading-snug">
                                  {sub.title}
                                </span>
                                <ArrowUpRight className="w-3.5 h-3.5 text-white/35 group-hover/sub:text-mw-orange shrink-0 mt-0.5" />
                              </div>
                              <p className="text-xs text-white/65 leading-relaxed">
                                {sub.businessValue}
                              </p>
                            </Link>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <ul className="space-y-1.5">
                          {pillar.outcomes.slice(0, 2).map((item) => (
                            <li key={item} className="flex items-start gap-2 text-xs text-emerald-300/90">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="flex flex-wrap items-center gap-3 shrink-0">
                          <Link
                            to={`/contact?category=${
                              pillar.id === "digital-transformation-technology"
                                ? "digital-transformation"
                                : pillar.id === "digital-marketing-customer-acquisition"
                                ? "marketing-customer-acquisition"
                                : "business-growth-consulting"
                            }&cta=business-growth-review`}
                            onClick={() => trackPrimaryCtaClick(`solutions-pillar-${pillar.number}`, "/contact", pillar.id)}
                            className="min-h-[40px] inline-flex items-center gap-2 px-4 py-2 rounded-full bg-mw-orange text-white text-xs font-bold hover:bg-orange-500 transition-colors"
                          >
                            <span>Discuss This Pillar</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                          <Link
                            to={pillar.recommendedPackage.path}
                            className="inline-flex items-center gap-2 text-xs font-bold text-mw-orange hover:text-white transition-colors"
                          >
                            <span>{pillar.recommendedPackage.label}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </FadeInSection>

      {/* Mindware 5-Stage Growth Framework */}
      <FadeInSection id="growth-framework" className="py-16 md:py-24 bg-white text-mw-dark border-b border-black/10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-3xl mb-14">
            <div className="text-xs font-semibold uppercase tracking-widest text-mw-orange mb-3">
              The Mindware Growth Framework
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-bold tracking-tight leading-tight text-mw-dark [text-wrap:balance]">
              ACQUIRE → GROW → OPTIMIZE → ACCELERATE → PROTECT
            </h2>
            <p className="text-base sm:text-lg text-black/65 mt-4 leading-relaxed">
              Every digital transformation and commercial consulting engagement follows a disciplined five-stage lifecycle designed to compound enterprise value.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
            {GROWTH_FRAMEWORK.map((stage) => (
              <div
                key={stage.step}
                className="p-6 rounded-2xl border border-black/10 bg-slate-50 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono tabular-nums text-black/45">
                    <span>STAGE {stage.step}</span>
                  </div>
                  <h3 className="text-xl font-display font-bold text-mw-dark">{stage.title}</h3>
                  <p className="text-xs font-semibold text-mw-orange leading-snug">{stage.tagline}</p>
                  <p className="text-xs text-black/65 leading-relaxed">{stage.description}</p>
                </div>

                <ul className="mt-5 pt-4 border-t border-black/10 space-y-2">
                  {stage.outcomes.map((o) => (
                    <li key={o} className="text-[11px] text-black/75 flex items-start gap-1.5 leading-snug">
                      <CheckCircle2 className="w-3.5 h-3.5 text-mw-orange shrink-0 mt-0.5" />
                      <span>{o}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* Construction Flagship Specialization Highlight */}
      <section className="py-16 md:py-24 border-b border-white/10 bg-[#050812]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch rounded-3xl border border-white/10 bg-[#090d16] overflow-hidden">
            <div className="lg:col-span-5 relative min-h-[260px]">
              <img
                src={MEDIA_ASSETS.heroConstructionFlagship}
                alt="Flagship civil engineering and construction digital transformation expertise"
                className="w-full h-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#090d16]/70 hidden lg:block" />
            </div>

            <div className="lg:col-span-7 p-7 sm:p-10 md:p-12 flex flex-col justify-center space-y-5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-mw-orange">
                <Building2 className="w-4 h-4" />
                <span>Flagship Sector Specialization</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight">
                {constructionSector.name}
              </h2>

              <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                Construction and civil engineering represent Mindware Consulting’s flagship vertical specialization—backed by proven transformation deliveries for Temamost, Solugans & Associates, Cosmozel, Bcale Associates, Harmostructs, Crescon, Watech, and Efudo Construction.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/industries/construction-civil-engineering"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-mw-dark hover:bg-mw-orange hover:text-white font-bold text-xs uppercase tracking-wider transition-colors whitespace-nowrap"
                >
                  <span>Explore Construction Solutions</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/industries"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/15 font-semibold text-xs uppercase tracking-wider transition-colors whitespace-nowrap"
                >
                  <span>View All 6 Focus Industries</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Executive CTA */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6 md:px-12">
          <div className="rounded-3xl border border-white/10 bg-[#090d16] p-8 md:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-mw-orange">
                <ShieldCheck className="w-4 h-4" />
                <span>Executive Engagement</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-display font-bold text-white">
                Ready to Build a Stronger, Faster, Higher-Converting Business?
              </h2>
              <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                Schedule a strategic growth consultation with our leadership team to review your digital infrastructure, visibility gaps, operational systems, and commercial expansion plan.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full lg:w-auto">
              <Link
                to={CONVERSION_CTAS.primaryPath}
                onClick={() => trackPrimaryCtaClick("solutions-bottom", CONVERSION_CTAS.primaryPath)}
                className="min-h-[48px] inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-mw-orange hover:bg-mw-orange-hover text-white font-bold text-xs uppercase tracking-wider transition-colors whitespace-nowrap"
              >
                <span>{CONVERSION_CTAS.primaryLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/2348125082354?text=Hello%20Mindware%20Consulting%2C%20I%20would%20like%20to%20request%20a%20Business%20Growth%20Review."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("solutions-bottom")}
                className="min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider transition-colors whitespace-nowrap"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Advisory</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
