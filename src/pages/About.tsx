import { motion } from "motion/react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Compass,
  Users,
  Sparkles,
  Building2,
  Cpu,
  TrendingUp,
  Briefcase,
  Video
} from "lucide-react";
import { METRICS } from "../data/content";
import { GROWTH_FRAMEWORK, SOLUTIONS_PILLARS, STRATEGIC_POSITIONING } from "../data/solutionsData";
import { INDUSTRIES } from "../data/industriesData";
import { PRACTICE_DIVISIONS, LEADERSHIP_TEAM } from "../data/aboutData";
import { EASE } from "../lib/utils";
import { FadeInSection } from "../components/FadeInSection";
import { SEO } from "../components/SEO";
import { MEDIA_ASSETS } from "../assets/media";
import { AboutSubNav } from "../components/about/AboutSubNav";
import { AboutCertifications } from "../components/about/AboutCertifications";
import { GoogleClientReviews } from "../components/reviews/GoogleClientReviews";
import { CONVERSION_CTAS } from "../data/companyStats";
import { trackPrimaryCtaClick } from "../lib/analytics";

export function About() {
  const md = LEADERSHIP_TEAM[0];

  return (
    <div className="bg-mw-dark text-white">
      <SEO
        title="About Mindware Consulting Ltd | Business Growth & Digital Transformation Partner"
        description="Learn how Mindware Consulting Ltd helps businesses strengthen digital infrastructure, acquire customers, optimize operations, and accelerate sustainable growth."
      />

      {/* 1. Company Overview & Business Growth Positioning */}
      <FadeInSection className="pt-32 sm:pt-40 pb-16 sm:pb-20 border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-mw-orange/5 to-transparent blur-3xl mix-blend-screen" />
        <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mw-orange/10 border border-mw-orange/20 text-mw-orange text-xs font-semibold uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{STRATEGIC_POSITIONING.brandLine} · RC 1309926</span>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold font-display tracking-tight mb-5 sm:mb-8 leading-tight text-white">
              Your Business Growth &amp; <br />
              <span className="text-gradient">Digital Transformation</span> Partner.
            </h1>
            <p className="text-base sm:text-xl text-white/75 max-w-3xl leading-relaxed mb-8">
              Incorporated in Nigeria in January 2016, Mindware Consulting Ltd partners with ambitious businesses, civil contractors, real estate developers, energy operators, and commercial organizations to build stronger digital infrastructure, acquire qualified customers, and improve operational execution.
            </p>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                to={CONVERSION_CTAS.primaryPath}
                onClick={() => trackPrimaryCtaClick("about-hero", CONVERSION_CTAS.primaryPath)}
                className="inline-flex items-center gap-2 bg-mw-orange text-white px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-amber-600 transition-all shadow-lg shadow-mw-orange/20 min-h-[44px]"
              >
                <span>{CONVERSION_CTAS.primaryLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/about/mission-vision"
                className="inline-flex items-center gap-2 bg-white text-mw-dark px-5 sm:px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold hover:bg-mw-orange hover:text-white transition-all"
              >
                <Compass className="w-4 h-4" />
                <span>Mission &amp; Values</span>
              </Link>
              <Link
                to="/about/leadership"
                className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-5 sm:px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold transition-all"
              >
                <Users className="w-4 h-4 text-blue-400" />
                <span>Leadership &amp; Governance</span>
              </Link>
              <Link
                to="/about/testimonials"
                className="inline-flex items-center gap-2 bg-red-600/10 hover:bg-red-600/20 text-red-400 border border-red-500/20 px-5 sm:px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold transition-all"
              >
                <Video className="w-4 h-4 text-red-400" />
                <span>Video Testimonials</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </FadeInSection>

      {/* Sticky About Sub-Navigation */}
      <AboutSubNav activeTab="overview" />

      {/* Verified Practice Indicators */}
      <FadeInSection className="py-12 sm:py-16 border-b border-white/5 bg-[#03060f]">
        <h2 className="sr-only">Verified Practice Indicators</h2>
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {METRICS.map((metric, i) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-5 rounded-2xl bg-white/[0.02] border border-white/10"
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-mw-orange mb-2">{metric.value}</div>
                <p className="text-white/70 font-medium text-xs sm:text-sm">{metric.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* 2. Mission, Vision & Strategic Growth Framework */}
      <FadeInSection className="py-16 sm:py-24 border-b border-white/5">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <div className="text-xs uppercase tracking-widest text-mw-orange font-bold font-mono mb-2">
                Mission, Vision &amp; Growth System
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold mb-5 text-white">
                How We Approach Sustainable Business Growth
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-white/70 leading-relaxed mb-6">
                <p>
                  Simply having a brochure website or sporadic social posts no longer builds commercial advantage. Growing organizations require a unified system connecting credibility, search visibility, lead conversion, and operational follow-through.
                </p>
                <p>
                  Mindware bridges management consulting, software engineering, and B2B marketing under one roof using our proprietary five-stage framework.
                </p>
              </div>
              <Link
                to="/about/mission-vision"
                className="inline-flex items-center gap-2 text-mw-orange hover:text-white font-semibold text-sm group"
              >
                <span>Explore Full Mission, Vision &amp; Core Values</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="lg:col-span-7 space-y-3">
              <div className="text-xs font-mono uppercase tracking-widest text-white/50 mb-3">
                The Mindware Growth Framework: ACQUIRE → GROW → OPTIMIZE → ACCELERATE → PROTECT
              </div>
              {GROWTH_FRAMEWORK.map((stage) => (
                <div
                  key={stage.step}
                  className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/10 flex items-start gap-4 hover:border-mw-orange/40 transition-colors"
                >
                  <div className="px-2.5 py-1 rounded-lg bg-mw-orange/15 border border-mw-orange/30 text-mw-orange font-mono text-xs font-bold shrink-0">
                    {stage.step}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="text-base font-bold text-white">{stage.title}</h3>
                      <span className="text-xs text-white/45">— {stage.tagline}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-white/65 leading-relaxed">{stage.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* 3. What Mindware Does & How We Work */}
      <FadeInSection className="py-16 sm:py-24 bg-[#03060f] border-b border-white/5">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <div className="max-w-3xl mb-12">
            <div className="text-xs uppercase tracking-widest text-mw-orange font-bold font-mono mb-2">
              Integrated Operating Model
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4">
              What Mindware Does &amp; How Our Practice Works
            </h2>
            <p className="text-white/65 text-sm sm:text-base leading-relaxed">
              Rather than splitting strategy, website/software engineering, and customer acquisition across disconnected vendors, Mindware organizes delivery around three unified consulting pillars.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PRACTICE_DIVISIONS.map((div, idx) => {
              const IconComp = idx === 0 ? Cpu : idx === 1 ? TrendingUp : Briefcase;
              const matchedPillar = SOLUTIONS_PILLARS[idx];
              return (
                <div
                  key={div.id}
                  className="p-6 sm:p-7 rounded-3xl bg-white/[0.02] border border-white/10 flex flex-col justify-between hover:border-mw-orange/40 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 rounded-2xl bg-mw-orange/10 border border-mw-orange/25 flex items-center justify-center text-mw-orange">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono text-white/45 uppercase">{div.pillar}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{div.title}</h3>
                    <p className="text-xs sm:text-sm text-white/65 leading-relaxed mb-5">{div.summary}</p>
                    <ul className="space-y-2 border-t border-white/10 pt-4">
                      {div.capabilities.map((cap) => (
                        <li key={cap} className="flex items-start gap-2 text-xs text-white/80">
                          <CheckCircle2 className="w-3.5 h-3.5 text-mw-orange shrink-0 mt-0.5" />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {matchedPillar && (
                    <div className="mt-6 pt-4 border-t border-white/10">
                      <Link
                        to={`/solutions#${matchedPillar.id}`}
                        className="inline-flex items-center gap-2 text-xs font-bold text-mw-orange hover:text-white transition-colors"
                      >
                        <span>Explore Solution Pillar</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </FadeInSection>

      {/* 4. Leadership & Consulting Capability */}
      <FadeInSection className="py-16 sm:py-24 bg-[#02040a] relative overflow-hidden border-b border-white/5">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-5">
              <div className="relative group max-w-md mx-auto">
                <div className="absolute -inset-1 bg-gradient-to-br from-mw-orange via-orange-600/40 to-transparent rounded-3xl blur-md opacity-40" />
                <div className="relative bg-mw-dark rounded-3xl p-2 border border-white/10 shadow-2xl overflow-hidden">
                  <div className="aspect-[4/5] rounded-2xl overflow-hidden relative bg-[#0a0a0a]">
                    <img
                      src={md.image}
                      alt={`${md.name} - ${md.role}`}
                      className="w-full h-full object-cover object-top"
                      onError={(e) => {
                        e.currentTarget.src = MEDIA_ASSETS.leadershipExecutiveTeam;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-mw-dark/95 via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="inline-block bg-mw-orange text-white px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase mb-2">
                        Founder / MD / CEO
                      </div>
                      <h3 className="text-2xl font-bold text-white">{md.name}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-5">
              <div className="text-xs uppercase tracking-widest text-mw-orange font-bold font-mono">
                Executive Leadership &amp; Consulting Oversight
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                {md.name} — Managing Director &amp; CEO
              </h2>
              <p className="text-sm sm:text-base text-white/75 leading-relaxed">{md.bio}</p>

              {md.quote && (
                <blockquote className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border-l-4 border-mw-orange text-sm text-white/85 italic leading-relaxed">
                  "{md.quote}"
                </blockquote>
              )}

              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                {md.credentials.map((cred) => (
                  <div key={cred} className="flex items-start gap-2 text-xs text-white/80 p-3 rounded-xl bg-white/[0.02] border border-white/10">
                    <CheckCircle2 className="w-3.5 h-3.5 text-mw-orange shrink-0 mt-0.5" />
                    <span>{cred}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  to="/about/leadership"
                  className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/15 px-5 py-3 rounded-full text-xs font-semibold transition-all"
                >
                  <Users className="w-4 h-4 text-mw-orange" />
                  <span>View Leadership &amp; Governance Framework</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* 5. Credentials, Official Registrations & Practical Client Value */}
      <AboutCertifications />

      {/* 6. Core Industries & Sectors Served */}
      <FadeInSection className="py-16 sm:py-24 bg-[#03060f] border-t border-b border-white/5">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl">
              <div className="text-xs uppercase tracking-widest text-mw-orange font-bold font-mono mb-2">
                Sector Focus · Construction Flagship
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-white">
                Industries We Help Transform &amp; Grow
              </h2>
            </div>
            <Link
              to="/industries"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-mw-orange hover:text-white"
            >
              <span>Explore All 6 Focus Sectors</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {INDUSTRIES.map((ind) => (
              <Link
                key={ind.id}
                to={`/industries/${ind.slug}`}
                className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                  ind.isFlagship
                    ? "bg-mw-orange/10 border-mw-orange/40 hover:border-mw-orange"
                    : "bg-white/[0.02] border-white/10 hover:border-white/25"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-mw-orange font-semibold">
                      {ind.isFlagship ? "Flagship Sector" : ind.category}
                    </span>
                    <Building2 className="w-4 h-4 text-white/40" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{ind.name}</h3>
                  <p className="text-xs text-white/65 leading-relaxed line-clamp-3">{ind.tagline}</p>
                </div>
                <div className="pt-4 mt-4 border-t border-white/10 inline-flex items-center gap-1.5 text-xs font-semibold text-white/80">
                  <span>View Sector Approach</span>
                  <ArrowRight className="w-3.5 h-3.5 text-mw-orange" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* 7. Why Businesses Trust Mindware */}
      <FadeInSection className="py-16 sm:py-24 border-b border-white/5">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
              Why Ambitious Businesses Partner with Mindware
            </h2>
            <p className="text-white/65 text-sm sm:text-base">
              Built on statutory accountability, multi-disciplinary capability, and ongoing support that lasts beyond project launch.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: "Strategy + Technology + Acquisition Together",
                desc: "We align positioning, website and software engineering, SEO, and operational advice inside one unified partner instead of siloed freelancers."
              },
              {
                title: "Deep Real-Economy & Construction Experience",
                desc: "Proven live work with civil engineers, contractors, industrial operators, and luxury dealerships where buyer trust decides deals."
              },
              {
                title: "Ongoing Maintenance & Ethical Accountability",
                desc: "Registered RC 1309926 corporate governance, clear scope milestones, and responsive post-launch technical support."
              }
            ].map((item) => (
              <div key={item.title} className="p-6 sm:p-8 rounded-2xl border border-white/10 bg-white/[0.02]">
                <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8 text-mw-orange mb-4" />
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-white">{item.title}</h3>
                <p className="text-white/65 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* Verified Google Client Reviews (Preserved Intact) */}
      <GoogleClientReviews
        variant="about"
        heading="Trusted by Businesses. Valued by Clients."
        supportingText="At Mindware Consulting Limited, we believe that successful business relationships are built on trust, consistent delivery and genuine value. Here is what some of our clients have shared about their experience working with us."
      />

      {/* 8. Growth Consultation CTA */}
      <FadeInSection className="py-16 sm:py-24 border-t border-white/5 bg-gradient-to-t from-mw-orange/10 via-transparent to-transparent">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 text-center max-w-3xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 text-white">
            Let&apos;s Discuss Your Next Phase of Growth.
          </h2>
          <p className="text-white/65 text-sm sm:text-base mb-8 leading-relaxed">
            Schedule a Business Growth Review to evaluate your current digital infrastructure, market visibility, and operational priorities with Mindware Consulting Ltd.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              to={CONVERSION_CTAS.primaryPath}
              onClick={() => trackPrimaryCtaClick("about-bottom", CONVERSION_CTAS.primaryPath)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-mw-dark hover:bg-mw-orange hover:text-white px-8 py-4 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-xl min-h-[48px]"
            >
              <span>{CONVERSION_CTAS.primaryLabel}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/business-growth-season"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white px-7 py-4 rounded-full font-semibold text-xs uppercase tracking-wider transition-all min-h-[48px]"
            >
              <span>Business Growth Season 2026</span>
            </Link>
          </div>
        </div>
      </FadeInSection>
    </div>
  );
}
