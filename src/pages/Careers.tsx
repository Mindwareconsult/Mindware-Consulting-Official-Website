import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  Briefcase,
  Building2,
  ChevronRight,
  Clock,
  Compass,
  Lock,
  Mail,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  ArrowRight
} from "lucide-react";
import {
  INTERNAL_DISCIPLINES,
  INTERNAL_ENGAGEMENT_TYPES,
  WORK_CULTURE_PILLARS,
  RECRUITMENT_STEPS,
  InternalDiscipline,
  InternalEngagementType
} from "../data/careersData";
import { InternalApplicationModal } from "../components/careers/InternalApplicationModal";
import { SEO } from "../components/SEO";
import { MEDIA_ASSETS } from "../assets/media";

export function Careers() {
  const [selectedDiscipline, setSelectedDiscipline] = useState<InternalDiscipline>("Website design & development");
  const [selectedEngagement, setSelectedEngagement] = useState<InternalEngagementType>("Full-time");
  const [modalOpen, setModalOpen] = useState(false);

  const openGeneralInterest = (
    disciplineOverride?: InternalDiscipline,
    engagementOverride?: InternalEngagementType
  ) => {
    if (disciplineOverride) setSelectedDiscipline(disciplineOverride);
    if (engagementOverride) setSelectedEngagement(engagementOverride);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#02040a] text-white pt-28 pb-24">
      <SEO
        title="Build Your Career at Mindware | Mindware Consulting Ltd"
        description="Build your career at Mindware Consulting Ltd across web engineering, SEO, digital marketing, software development, business development, project consulting, and operations."
      />

      {/* 1. Corporate Recruitment Hero & Intro */}
      <section className="relative overflow-hidden py-10 md:py-16 border-b border-white/5">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs md:text-sm text-white/50 mb-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-mw-orange font-medium">Careers at Mindware</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-mw-orange/10 border border-mw-orange/25 text-mw-orange text-xs font-semibold uppercase tracking-wider">
                <Building2 className="w-3.5 h-3.5" />
                <span>Mindware Consulting Ltd · Internal Careers</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight leading-[1.08]">
                Build Your Career at{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-mw-orange via-amber-400 to-amber-200">
                  Mindware.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-white/75 max-w-2xl leading-relaxed">
                Mindware Consulting Ltd partners with businesses across construction, civil engineering, real estate, energy, automotive, and commerce to strengthen digital infrastructure, acquire customers, and streamline operations. We welcome disciplined practitioners interested in joining our internal delivery and advisory teams.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#open-vacancies"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold text-sm transition-all"
                >
                  <Briefcase className="w-4 h-4 text-mw-orange" />
                  <span>Current Vacancies Status</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={() => openGeneralInterest()}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-mw-orange hover:bg-amber-600 text-white font-semibold text-sm transition-all shadow-lg shadow-mw-orange/25"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit General Expression of Interest</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10">
                <div>
                  <div className="text-2xl font-display font-bold text-white">08</div>
                  <div className="text-xs text-white/50 mt-0.5">Core Practice Disciplines</div>
                </div>
                <div>
                  <div className="text-2xl font-display font-bold text-mw-orange">05</div>
                  <div className="text-xs text-white/50 mt-0.5">Engagement Structures</div>
                </div>
                <div>
                  <div className="text-2xl font-display font-bold text-white">Direct</div>
                  <div className="text-xs text-white/50 mt-0.5">Internal Mindware Hiring</div>
                </div>
                <div>
                  <div className="text-2xl font-display font-bold text-emerald-400">HR-Verified</div>
                  <div className="text-xs text-white/50 mt-0.5">Official Vacancies Only</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl shadow-black/80 group">
                <img
                  src={MEDIA_ASSETS.careersHeroWorkspace}
                  alt="Mindware Consulting Ltd engineering and strategy workspace"
                  className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] via-[#02040a]/20 to-transparent" />

                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-[#090d16]/90 backdrop-blur-xl border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-mw-orange font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5" />
                      GROWTH FRAMEWORK PRACTICE
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-semibold">
                      Internal Roles Only
                    </span>
                  </div>
                  <p className="text-xs text-white/80 leading-relaxed">
                    Every team member at Mindware contributes directly to our ACQUIRE → GROW → OPTIMIZE → ACCELERATE → PROTECT client delivery standard.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Why Work at Mindware */}
      <section className="py-16 md:py-20 bg-[#03060f] border-b border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-semibold uppercase tracking-widest text-mw-orange mb-2">
              Why Work at Mindware Consulting Ltd
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-white mb-4">
              High Accountability. Real Craft Standards. Commercial Impact.
            </h2>
            <p className="text-white/65 text-sm sm:text-base leading-relaxed">
              We operate focused consulting and engineering teams where strategists, developers, marketers, and operations coordinators work closely on tangible business outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {WORK_CULTURE_PILLARS.map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06 }}
                className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between gap-4 hover:border-mw-orange/35 transition-colors"
              >
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-mw-orange uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{pillar.metric}</span>
                  </div>
                  <h3 className="text-lg font-display font-bold text-white leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/65 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Core Teams & Practice Disciplines */}
      <section className="py-16 md:py-20 border-b border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl">
              <div className="text-xs font-semibold uppercase tracking-widest text-mw-orange mb-2">
                Core Internal Teams &amp; Disciplines
              </div>
              <h2 className="text-2xl sm:text-4xl font-display font-bold text-white">
                Eight Specialist Disciplines Across Mindware
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-white/55 max-w-md">
              Select any discipline below to express interest in joining that team within Mindware Consulting Ltd.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {INTERNAL_DISCIPLINES.map((disc) => {
              const isSelected = selectedDiscipline === disc.name;
              return (
                <button
                  key={disc.name}
                  type="button"
                  onClick={() => openGeneralInterest(disc.name, undefined)}
                  className={`text-left p-5 rounded-2xl border transition-all flex flex-col justify-between gap-4 ${
                    isSelected
                      ? "bg-mw-orange/15 border-mw-orange/60 shadow-lg shadow-mw-orange/10"
                      : "bg-white/[0.025] border-white/10 hover:border-white/25 hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-mono text-mw-orange uppercase tracking-wider">
                        {disc.shortLabel}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-white/75 font-mono">
                        Express Interest
                      </span>
                    </div>
                    <h3 className="text-base font-display font-bold text-white">
                      {disc.name}
                    </h3>
                    <p className="text-xs text-white/60 leading-relaxed">
                      {disc.focus}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-white/50">
                    <span className="truncate">{disc.pillar}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-mw-orange shrink-0" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Engagement Structures */}
      <section className="py-12 bg-[#040814] border-b border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
              Internal Engagement Structures
            </h2>
            <p className="text-xs sm:text-sm text-white/60 mt-1">
              Click any engagement structure to indicate your preferred working arrangement in an Expression of Interest.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {INTERNAL_ENGAGEMENT_TYPES.map((item) => {
              const active = selectedEngagement === item.type;
              return (
                <button
                  key={item.type}
                  type="button"
                  onClick={() => openGeneralInterest(undefined, item.type)}
                  className={`text-left p-4 rounded-xl border transition-all ${
                    active
                      ? "bg-mw-orange/15 border-mw-orange text-white"
                      : "bg-white/[0.02] border-white/10 hover:border-white/25 text-white/80"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-display font-bold text-sm text-white">
                      {item.type}
                    </span>
                    <Clock className={`w-3.5 h-3.5 ${active ? "text-mw-orange" : "text-white/40"}`} />
                  </div>
                  <p className="text-[11px] text-white/60 leading-relaxed">
                    {item.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Current Vacancies Status (Official HR-Verified Only) */}
      <section id="open-vacancies" className="py-16 md:py-20 border-b border-white/5 scroll-mt-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="p-8 sm:p-10 rounded-3xl bg-[#070b18] border border-white/10 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <div className="text-xs font-semibold uppercase tracking-widest text-mw-orange mb-2 flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Direct Opportunities Within Mindware Consulting Ltd</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
                  Current Internal Vacancies
                </h2>
              </div>

              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold w-fit">
                <ShieldCheck className="w-4 h-4" />
                <span>Pending Official HR Role Release</span>
              </span>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-3">
                <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                  Mindware Consulting Ltd publishes only verified internal openings approved by management—never placeholder listings or third-party employer boards. When active positions open in web design, SEO, software engineering, business development, or project management, full role briefs appear right here.
                </p>
                <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                  If you would like to be considered ahead of public role releases across full-time, part-time, contract, internship, or project-based engagements, submit a General Expression of Interest directly to our internal hiring team.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => openGeneralInterest()}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-mw-orange hover:bg-amber-600 text-white font-semibold text-sm transition-colors shadow-lg shadow-mw-orange/25"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Expression of Interest</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Application & Selection Process */}
      <section className="py-16 md:py-20 bg-[#03060f] border-b border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-2xl mb-10">
            <div className="text-xs font-semibold uppercase tracking-widest text-mw-orange mb-2">
              How We Hire
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-white mb-3">
              Application &amp; Selection Process
            </h2>
            <p className="text-sm sm:text-base text-white/65">
              Every direct application or expression of interest receives a thoughtful review from Mindware Consulting leadership and practice leads.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {RECRUITMENT_STEPS.map((stage) => (
              <div
                key={stage.step}
                className="p-6 rounded-2xl bg-white/[0.025] border border-white/10 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-display font-bold text-mw-orange">
                    {stage.step}
                  </span>
                  <span className="text-[11px] font-mono text-white/55 px-2.5 py-0.5 rounded bg-white/5">
                    {stage.timeline}
                  </span>
                </div>
                <h3 className="text-base font-display font-bold text-white">
                  {stage.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/65 leading-relaxed">
                  {stage.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 & 7. General Expressions of Interest & Recruitment Contact */}
      <section className="py-16">
        <div className="container mx-auto px-6 md:px-12">
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0b132b] via-[#070b18] to-[#120b05] border border-mw-orange/30 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-mw-orange">
                <Mail className="w-4 h-4" />
                <span>General Expressions of Interest &amp; Recruitment Contact</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
                Connect Directly with Mindware Recruitment
              </h2>
              <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                Send your CV, portfolio, and target discipline directly through our application form or reach Mindware HR via email or telephone. Third-party recruitment boards are not accepted.
              </p>
            </div>

            <div className="flex flex-col gap-3 shrink-0">
              <button
                type="button"
                onClick={() => openGeneralInterest()}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-mw-orange hover:bg-amber-600 text-white text-sm font-semibold transition-colors shadow-lg shadow-mw-orange/25"
              >
                <Send className="w-4 h-4" />
                <span>Open Expression of Interest Form</span>
              </button>
              <a
                href="mailto:contact@mindwareconsult.com.ng?subject=Career%20Expression%20of%20Interest%20-%20Mindware%20Consulting%20Ltd"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-semibold text-white/85 transition-colors"
              >
                <Mail className="w-4 h-4 text-mw-orange" />
                <span>contact@mindwareconsult.com.ng</span>
              </a>
              <a
                href="tel:+2348125082354"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-semibold text-white/85 transition-colors"
              >
                <Phone className="w-4 h-4 text-mw-orange" />
                <span>+234 812 508 2354</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* General Expression of Interest Modal */}
      <InternalApplicationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        vacancy={{
          id: "general-eoi",
          code: "MW-EOI",
          title: `Expression of Interest (${selectedDiscipline})`,
          discipline: selectedDiscipline,
          engagementType: selectedEngagement,
          workModel: "Hybrid (Lagos)",
          location: "Lagos / Remote (Nigeria)",
          experienceLevel: "Mid-Level (2-4 yrs)",
          compensationRange: "",
          postedDate: "",
          status: "Open",
          reportsTo: "Mindware Leadership",
          summary: "",
          responsibilities: [],
          requirements: [],
          competencies: []
        }}
        mode="general"
      />
    </div>
  );
}
