import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  Users,
  Award,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Briefcase,
  Quote,
  Compass,
  Cpu,
  TrendingUp
} from "lucide-react";
import {
  LEADERSHIP_TEAM,
  PRACTICE_DIVISIONS,
  GOVERNANCE_FRAMEWORK
} from "../data/aboutData";
import { SEO } from "../components/SEO";
import { MEDIA_ASSETS } from "../assets/media";
import { EASE } from "../lib/utils";
import { AboutSubNav } from "../components/about/AboutSubNav";
import { CONVERSION_CTAS } from "../data/companyStats";
import { trackPrimaryCtaClick } from "../lib/analytics";

export function LeadershipManagement() {
  const ceo = LEADERSHIP_TEAM[0];

  return (
    <div className="bg-mw-dark min-h-screen text-white">
      <SEO
        title="Leadership & Practice Governance | Mindware Consulting Ltd"
        description="Executive leadership led by Founder & MD Chike Onyekachukwu alongside Mindware Consulting Ltd's specialized practice divisions and delivery governance framework."
      />

      {/* Top Breadcrumbs & Back Navigation */}
      <section className="pt-28 sm:pt-32 pb-4 sm:pb-6 border-b border-white/5 bg-[#03060f]">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs md:text-sm text-white/50 flex-wrap">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/30" />
            <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/30" />
            <span className="text-mw-orange font-medium">Leadership &amp; Governance</span>
          </nav>

          <Link
            to="/about"
            className="inline-flex items-center gap-2 text-xs font-semibold text-white/70 hover:text-white bg-white/5 hover:bg-white/10 px-3.5 py-1.5 rounded-full border border-white/10 transition-all hover:-translate-x-0.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to About Overview</span>
          </Link>
        </div>
      </section>

      {/* Sticky About Sub-Navigation */}
      <AboutSubNav activeTab="leadership" />

      {/* Hero Section */}
      <section className="pt-10 sm:pt-16 pb-14 sm:pb-20 md:py-24 relative overflow-hidden border-b border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-mw-orange/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4 sm:mb-6">
              <Users className="w-3.5 h-3.5" />
              <span>Executive Leadership &amp; Practice Structure</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-display tracking-tight leading-[1.15] sm:leading-[1.1] mb-4 sm:mb-6">
              Leadership &amp; <br className="hidden sm:inline" />
              <span className="text-gradient">Governance.</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-3xl leading-relaxed mb-6 sm:mb-8">
              Mindware Consulting Ltd is led directly by Founder and Managing Director Chike Onyekachukwu alongside specialized consulting, software engineering, and growth acquisition teams aligned around accountable B2B delivery.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-4 text-xs sm:text-sm text-white/60">
              <div className="flex items-center gap-2 bg-white/5 px-3 py-2 sm:py-1.5 rounded-lg border border-white/5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>RC 1309926 Corporate Governance</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 px-3 py-2 sm:py-1.5 rounded-lg border border-white/5">
                <Award className="w-4 h-4 text-mw-orange shrink-0" />
                <span>IMC-Nigeria Accredited Practice</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 px-3 py-2 sm:py-1.5 rounded-lg border border-white/5">
                <Briefcase className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Accountable Consulting Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CEO Profile Section */}
      <section className="py-12 sm:py-20 md:py-28 border-b border-white/5 bg-[#02040a] relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
          <div className="text-xs uppercase tracking-widest text-mw-orange font-bold font-mono mb-3 sm:mb-4">
            Founder &amp; Managing Director
          </div>

          <div className="grid lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-tr from-mw-orange via-orange-600/40 to-transparent rounded-3xl blur-md opacity-40 group-hover:opacity-75 transition-opacity duration-700" />
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-[#0a0f1d] p-1.5 sm:p-2">
                  <div className="aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden relative">
                    <img
                      src={ceo.image}
                      alt={ceo.name}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = MEDIA_ASSETS.leadershipExecutiveTeam;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
                      <div className="text-lg sm:text-xl font-bold text-white">{ceo.name}</div>
                      <div className="text-xs text-mw-orange font-semibold">{ceo.role}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 sm:mt-6 p-4 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                <div className="text-xs font-mono uppercase tracking-wider text-white/40 mb-2 sm:mb-3">Verified Standing</div>
                {ceo.credentials.map((cred) => (
                  <div key={cred} className="flex items-center gap-2.5 text-xs text-white/75">
                    <CheckCircle2 className="w-3.5 h-3.5 text-mw-orange shrink-0" />
                    <span>{cred}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 space-y-5 sm:space-y-6">
              <div>
                <span className="text-xs font-mono text-white/40 uppercase tracking-widest">{ceo.division}</span>
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white tracking-tight mt-1 mb-3 sm:mb-4">
                  {ceo.name}
                </h2>
                <div className="inline-block bg-mw-orange text-white px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4 sm:mb-6">
                  {ceo.role}
                </div>
              </div>

              {ceo.quote && (
                <div className="p-4 sm:p-6 md:p-8 rounded-2xl bg-white/[0.03] border-l-4 border-mw-orange relative">
                  <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-mw-orange/20 absolute top-3 right-3 sm:top-4 sm:right-4" />
                  <p className="text-sm sm:text-base md:text-lg text-white/90 italic leading-relaxed pr-6 sm:pr-8">
                    "{ceo.quote}"
                  </p>
                </div>
              )}

              <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-white/75 leading-relaxed">
                <p>{ceo.bio}</p>
              </div>

              <div className="pt-5 sm:pt-6 border-t border-white/10">
                <h3 className="text-xs sm:text-sm font-semibold text-white uppercase tracking-wider mb-3 sm:mb-4 font-mono">
                  Executive Mandate &amp; Responsibilities
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  {ceo.responsibilities.map((resp) => (
                    <div key={resp} className="p-3 sm:p-3.5 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-white/80 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-mw-orange mt-1.5 shrink-0" />
                      <span>{resp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Multidisciplinary Practice Capabilities */}
      <section className="py-12 sm:py-20 md:py-28 border-b border-white/5">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <div className="max-w-3xl mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mw-orange/10 border border-mw-orange/20 text-mw-orange text-xs font-semibold uppercase tracking-wider mb-3 sm:mb-4">
              <Users className="w-3.5 h-3.5" />
              <span>Specialist Practice Divisions</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight mb-3 sm:mb-4">
              Consulting &amp; Engineering Teams.
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-white/60 leading-relaxed">
              Every engagement is delivered through cross-functional squads spanning technology, search/demand generation, and commercial strategy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRACTICE_DIVISIONS.map((div, i) => {
              const IconComp = i === 0 ? Cpu : i === 1 ? TrendingUp : Briefcase;
              return (
                <motion.div
                  key={div.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.6, ease: EASE }}
                  className="p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-white/[0.02] border border-white/10 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 rounded-2xl bg-mw-orange/10 border border-mw-orange/20 flex items-center justify-center text-mw-orange">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono text-white/40 uppercase">{div.pillar}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{div.title}</h3>
                    <p className="text-xs sm:text-sm text-white/65 leading-relaxed mb-5">{div.summary}</p>
                    <ul className="space-y-2 border-t border-white/10 pt-4">
                      {div.capabilities.map((cap) => (
                        <li key={cap} className="flex items-start gap-2 text-xs text-white/80">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Corporate Governance & Delivery Discipline */}
      <section className="py-12 sm:py-20 md:py-28 bg-[#02040a] border-b border-white/5">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <div className="max-w-3xl mb-8 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3 sm:mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Operational Rigor</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight mb-3 sm:mb-4">
              How We Govern &amp; Deliver.
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-white/60 leading-relaxed">
              Our management framework is grounded in transparent milestone scope, statutory compliance, thorough pre-launch QA, and responsive maintenance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {GOVERNANCE_FRAMEWORK.map((gov) => (
              <div
                key={gov.number}
                className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-mono text-emerald-400 font-bold mb-2 sm:mb-3">
                    PILLAR {gov.number}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2">{gov.title}</h3>
                  <p className="text-xs text-white/60 leading-relaxed mb-4 sm:mb-6">
                    {gov.description}
                  </p>
                </div>
                <div className="pt-3 sm:pt-4 border-t border-white/5">
                  <div className="text-[10px] font-mono text-white/40 uppercase">Governance Focus</div>
                  <div className="text-xs sm:text-sm font-bold text-emerald-400 font-mono mt-0.5">{gov.metric}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation Deck & Consultation CTA */}
      <section className="py-10 sm:py-16 bg-[#03060f]">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-white/[0.02] border border-white/5 flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono text-mw-orange font-bold uppercase mb-2">Sub-Page 1</div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Company Mission, Vision &amp; Values</h3>
                <p className="text-xs sm:text-sm text-white/60 leading-relaxed mb-4 sm:mb-6">
                  Review our strategic horizons, our 6 operating principles, and the Mind + Technology + Growth model.
                </p>
              </div>
              <Link
                to="/about/mission-vision"
                className="inline-flex items-center justify-between sm:justify-start gap-2 text-mw-orange hover:text-white font-semibold text-xs sm:text-sm transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 shrink-0" />
                  <span>Explore Mission &amp; Values</span>
                </div>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 shrink-0" />
              </Link>
            </div>

            <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-mw-orange/10 to-transparent border border-white/10 flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono text-white/40 font-bold uppercase mb-2">Executive Advisory</div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Consult with Our Leadership</h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-4 sm:mb-6">
                  Request a consultation to evaluate your digital infrastructure, customer acquisition bottlenecks, or operational priorities.
                </p>
              </div>
              <Link
                to={CONVERSION_CTAS.primaryPath}
                onClick={() => trackPrimaryCtaClick("leadership-bottom", CONVERSION_CTAS.primaryPath)}
                className="inline-flex items-center justify-center gap-2 bg-white text-mw-dark px-6 py-3 rounded-full font-semibold text-xs sm:text-sm hover:bg-mw-orange hover:text-white transition-all w-full sm:w-fit text-center min-h-[44px]"
              >
                <span>{CONVERSION_CTAS.primaryLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
