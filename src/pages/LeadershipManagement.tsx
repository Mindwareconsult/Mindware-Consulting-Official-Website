import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
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
  Mail,
  Building,
  Scale
} from "lucide-react";
import {
  LEADERSHIP_TEAM,
  ADVISORY_BOARD,
  GOVERNANCE_FRAMEWORK
} from "../data/aboutData";
import { SEO } from "../components/SEO";
import { EASE } from "../lib/utils";
import { AboutSubNav } from "../components/about/AboutSubNav";

export function LeadershipManagement() {
  const [selectedLeaderId, setSelectedLeaderId] = useState<string | null>(null);

  const ceo = LEADERSHIP_TEAM[0];
  const executiveOfficers = LEADERSHIP_TEAM.slice(1);

  const activeLeaderModal = LEADERSHIP_TEAM.find((l) => l.id === selectedLeaderId);

  return (
    <div className="bg-mw-dark min-h-screen text-white">
      <SEO
        title="Leadership & Management | Mindware Consulting"
        description="Meet the executive leadership, management team, and advisory board guiding Mindware Consulting Ltd in engineering digital growth and corporate excellence."
      />

      {/* Top Breadcrumbs & Back Navigation */}
      <section className="pt-28 sm:pt-32 pb-4 sm:pb-6 border-b border-white/5 bg-[#03060f]">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs md:text-sm text-white/50 flex-wrap">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/30" />
            <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/30" />
            <span className="text-mw-orange font-medium">Leadership & Management</span>
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
              <span>Sub-Page 2 · Executive Governance & Talent</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-display tracking-tight leading-[1.15] sm:leading-[1.1] mb-4 sm:mb-6">
              Leadership & <br className="hidden sm:inline" />
              <span className="text-gradient">Management.</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-3xl leading-relaxed mb-6 sm:mb-8">
              Guided by experienced digital strategists, systems engineers, performance marketers, and accredited project directors. Meet the executive team driving client transformation and talent acceleration across West Africa.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-4 text-xs sm:text-sm text-white/60">
              <div className="flex items-center gap-2 bg-white/5 px-3 py-2 sm:py-1.5 rounded-lg border border-white/5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Executive Governance & Integrity</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 px-3 py-2 sm:py-1.5 rounded-lg border border-white/5">
                <Award className="w-4 h-4 text-mw-orange shrink-0" />
                <span>PMI® & ISO Aligned Standards</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 px-3 py-2 sm:py-1.5 rounded-lg border border-white/5">
                <Briefcase className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Enterprise Consulting Experience</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee CEO Profile Section */}
      <section className="py-12 sm:py-20 md:py-28 border-b border-white/5 bg-[#02040a] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-mw-orange/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
          <div className="text-xs uppercase tracking-widest text-mw-orange font-bold font-mono mb-3 sm:mb-4">
            Founder & Chief Executive Officer
          </div>

          <div className="grid lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-start">
            {/* CEO Image Card */}
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
                        e.currentTarget.src = "/src/assets/images/leadership_executive_team_1790617221909.jpg";
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

              {/* CEO Core Credentials */}
              <div className="mt-4 sm:mt-6 p-4 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                <div className="text-xs font-mono uppercase tracking-wider text-white/40 mb-2 sm:mb-3">Key Focus Areas</div>
                {ceo.credentials.map((cred) => (
                  <div key={cred} className="flex items-center gap-2.5 text-xs text-white/70">
                    <CheckCircle2 className="w-3.5 h-3.5 text-mw-orange shrink-0" />
                    <span>{cred}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CEO Narrative & Quote */}
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

              {/* Executive Quote */}
              {ceo.quote && (
                <div className="p-4 sm:p-6 md:p-8 rounded-2xl bg-white/[0.03] border-l-4 border-mw-orange relative">
                  <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-mw-orange/20 absolute top-3 right-3 sm:top-4 sm:right-4" />
                  <p className="text-sm sm:text-base md:text-lg text-white/90 italic leading-relaxed pr-6 sm:pr-8">
                    "{ceo.quote}"
                  </p>
                </div>
              )}

              {/* Biography */}
              <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-white/70 leading-relaxed">
                <p>{ceo.bio}</p>
                <p>
                  Under his leadership, Mindware has grown from a specialized boutique digital studio into an integrated growth consulting firm and certified training academy that services mid-market and enterprise organizations across West Africa.
                </p>
              </div>

              {/* Key Executive Responsibilities */}
              <div className="pt-5 sm:pt-6 border-t border-white/10">
                <h3 className="text-xs sm:text-sm font-semibold text-white uppercase tracking-wider mb-3 sm:mb-4 font-mono">
                  Executive Mandate & Responsibilities
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

      {/* Senior Executive Leadership Team */}
      <section className="py-12 sm:py-20 md:py-28 border-b border-white/5">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <div className="max-w-3xl mb-8 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mw-orange/10 border border-mw-orange/20 text-mw-orange text-xs font-semibold uppercase tracking-wider mb-3 sm:mb-4">
              <Users className="w-3.5 h-3.5" />
              <span>Departmental Leadership</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight mb-3 sm:mb-4">
              Executive Management Team.
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-white/60 leading-relaxed">
              Every department at Mindware is led by specialized practitioners with proven track records in modern software engineering, search analytics, workforce certification, and agile delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
            {executiveOfficers.map((leader, i) => (
              <motion.div
                key={leader.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: EASE }}
                className="p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center gap-4 sm:gap-5 mb-4 sm:mb-6">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-xl sm:rounded-2xl overflow-hidden bg-white/5 border border-white/10 shrink-0 relative">
                      <img
                        src={leader.image}
                        alt={leader.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.src = "/src/assets/images/leadership_executive_team_1790617221909.jpg";
                        }}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-mono text-mw-orange font-bold uppercase truncate">{leader.division}</div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mt-0.5 truncate">{leader.name}</h3>
                      <div className="text-xs sm:text-sm text-white/60 font-medium truncate">{leader.role}</div>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-4 sm:mb-6">
                    {leader.bio}
                  </p>

                  {/* Credentials Pills */}
                  <div className="space-y-1.5 pt-3 sm:pt-4 border-t border-white/5">
                    <div className="text-[11px] font-mono uppercase text-white/40 mb-2">Qualifications & Certifications</div>
                    {leader.credentials.map((cred) => (
                      <div key={cred} className="flex items-center gap-2 text-xs text-white/60">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{cred}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 sm:mt-6 pt-3 sm:pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs text-white/40 font-mono">Senior Executive</span>
                  <button
                    onClick={() => setSelectedLeaderId(leader.id)}
                    className="text-xs font-semibold text-mw-orange hover:text-white transition-colors flex items-center gap-1.5 py-1 px-2.5 -mr-2.5 rounded-lg active:bg-white/10"
                  >
                    <span>View Mandate</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advisory Board & Strategic Counsel */}
      <section className="py-12 sm:py-20 md:py-28 bg-[#02040a] border-b border-white/5">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-16">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-3 sm:mb-4">
                <Scale className="w-3.5 h-3.5" />
                <span>External Governance</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight">
                Advisory Board & Counsel.
              </h2>
            </div>
            <p className="text-white/60 max-w-md text-xs sm:text-sm md:text-base">
              Distinguished senior practitioners in corporate law, multinational energy, and financial governance who ensure rigorous oversight and strategic alignment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {ADVISORY_BOARD.map((adv) => (
              <div
                key={adv.name}
                className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-white/[0.02] border border-white/10 hover:border-purple-500/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4 sm:mb-6">
                    <Building className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-1">{adv.name}</h3>
                  <div className="text-xs font-semibold text-purple-300 mb-1 sm:mb-2">{adv.title}</div>
                  <div className="text-xs text-white/50 mb-3 sm:mb-4">{adv.organization}</div>
                  <p className="text-xs text-white/70 leading-relaxed pt-3 sm:pt-4 border-t border-white/5">
                    <span className="font-semibold text-white/90">Focus: </span>
                    {adv.focusArea}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Governance & Management Principles */}
      <section className="py-12 sm:py-20 md:py-28 border-b border-white/5">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <div className="max-w-3xl mb-8 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3 sm:mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Operational Rigor</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight mb-3 sm:mb-4">
              How We Govern & Deliver.
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-white/60 leading-relaxed">
              Our management framework is built on quantifiable metrics, agile execution sprints, and strict compliance with national and international regulatory frameworks.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
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
                  <div className="text-[10px] font-mono text-white/40 uppercase">Standard Benchmark</div>
                  <div className="text-xs sm:text-sm font-bold text-emerald-400 font-mono mt-0.5">{gov.metric}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation Deck & Interlinking */}
      <section className="py-10 sm:py-16 bg-[#03060f]">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Link to Sub-Page 1 */}
            <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-white/[0.02] border border-white/5 flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono text-mw-orange font-bold uppercase mb-2">Sub-Page 1</div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Company Mission, Vision & Values</h3>
                <p className="text-xs sm:text-sm text-white/60 leading-relaxed mb-4 sm:mb-6">
                  Review our strategic horizons, our 6 core operating principles, and the "Mind + Technology + Growth" triad.
                </p>
              </div>
              <Link
                to="/about/mission-vision"
                className="inline-flex items-center justify-between sm:justify-start gap-2 text-mw-orange hover:text-white font-semibold text-xs sm:text-sm transition-colors group pt-2 border-t border-white/5 sm:border-0 sm:pt-0"
              >
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 shrink-0" />
                  <span>Explore Mission & Values</span>
                </div>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 shrink-0" />
              </Link>
            </div>

            {/* Link to Contact */}
            <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-mw-orange/10 to-transparent border border-white/10 flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono text-white/40 font-bold uppercase mb-2">Executive Advisory</div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Consult with Our Leadership</h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-4 sm:mb-6">
                  Schedule a private executive discovery session to evaluate your company's digital transformation or enterprise workforce training needs.
                </p>
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-mw-dark px-6 py-3 rounded-full font-semibold text-xs sm:text-sm hover:bg-mw-orange hover:text-white transition-all w-full sm:w-fit text-center"
              >
                <span>Request Executive Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Modal for Leader Details if requested */}
      <AnimatePresence>
        {activeLeaderModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#090d16] border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-8 max-w-xl w-full max-h-[90vh] overflow-y-auto relative my-auto shadow-2xl"
            >
              <button
                onClick={() => setSelectedLeaderId(null)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white/60 hover:text-white w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                aria-label="Close modal"
              >
                ✕
              </button>

              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 pr-8">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl overflow-hidden bg-white/5 border border-white/10 shrink-0">
                  <img
                    src={activeLeaderModal.image}
                    alt={activeLeaderModal.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/src/assets/images/leadership_executive_team_1790617221909.jpg";
                    }}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-mono text-mw-orange truncate">{activeLeaderModal.division}</div>
                  <h3 className="text-lg sm:text-xl font-bold text-white truncate">{activeLeaderModal.name}</h3>
                  <div className="text-xs text-white/60 truncate">{activeLeaderModal.role}</div>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-white/70">
                <p className="leading-relaxed">{activeLeaderModal.bio}</p>

                <div className="pt-3 sm:pt-4 border-t border-white/10">
                  <div className="text-xs font-mono text-white/40 uppercase mb-2">Key Responsibilities</div>
                  <ul className="space-y-1.5">
                    {activeLeaderModal.responsibilities.map((r) => (
                      <li key={r} className="text-xs text-white/80 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-mw-orange mt-1.5 shrink-0" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-5 sm:mt-6 pt-3 sm:pt-4 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => setSelectedLeaderId(null)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-white/10 text-white text-xs font-semibold hover:bg-white/20 transition-colors text-center"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
