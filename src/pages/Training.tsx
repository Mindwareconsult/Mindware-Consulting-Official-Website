import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  Sparkles,
  Briefcase,
  ArrowRight,
  Video,
  ChevronRight,
  ChevronDown,
  MessageSquare,
  Camera,
  HelpCircle
} from "lucide-react";
import { DIGITAL_SKILLS_PROGRAMS, PROFESSIONAL_DEVELOPMENT_PROGRAMS, TRAINING_TESTIMONIALS, TRAINING_FAQS } from "../data/training";
import { AcademySubNav } from "../components/academy/AcademySubNav";
import { SEO } from "../components/SEO";
import { FadeInSection } from "../components/FadeInSection";

export function Training() {
  const [activeTab, setActiveTab] = useState<"digital" | "professional">("digital");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="bg-mw-dark min-h-screen text-white">
      <SEO
        title="Training Academy | Digital Skills & Professional Development | Mindware Consulting"
        description="Mindware Consulting Training Academy offers career-transforming programs across two specialized tracks: Digital Skills (Web Design, SEO, Video, Analytics, Apps) and Professional Development (PMP, HRM, CRM, HSE Levels 1, 2, 3)."
      />

      {/* Hero Section */}
      <FadeInSection className="pt-28 sm:pt-36 md:pt-44 pb-14 sm:pb-20 border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full sm:w-2/3 h-full bg-gradient-to-l from-mw-orange/15 via-blue-600/10 to-transparent blur-3xl pointer-events-none mix-blend-screen" />
        <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80 text-xs sm:text-sm font-medium mb-4 sm:mb-6 backdrop-blur-md">
              <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-mw-orange shrink-0" />
              <span className="tracking-wide">MINDWARE CONSULTING ACADEMY</span>
            </div>

            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-4 sm:mb-6 leading-[1.15] sm:leading-[1.1] font-display">
              Learn skills that <br className="hidden xs:inline" />
              <span className="text-gradient">accelerate your career</span> & business.
            </h1>
            <p className="text-sm sm:text-base md:text-xl text-white/70 max-w-3xl leading-relaxed mb-8 sm:mb-10">
              We have divided our training programs into two specialized, world-class academies: <strong>Digital Skills</strong> for modern tech creators & marketers, and <strong>Professional Development</strong> for certified corporate leaders and safety professionals.
            </p>

            {/* Quick Track Switcher Hero Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 pt-2">
              {/* Digital Skills Card */}
              <Link
                to="/training/digital-skills"
                className="group relative p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-mw-orange/5 hover:border-mw-orange/50 transition-all duration-300 hover:shadow-2xl hover:shadow-mw-orange/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5 sm:mb-4">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-mw-orange/10 border border-mw-orange/20 flex items-center justify-center text-mw-orange">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-mw-orange/20 text-mw-orange font-mono">
                      Page 1
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-white mb-1.5 sm:mb-2 group-hover:text-mw-orange transition-colors">
                    Digital Skills
                  </h2>
                  <p className="text-xs text-white/60 mb-4 sm:mb-5 leading-relaxed">
                    Web Design, Social Media, Video Editing, Data Analytics, SEO & App Dev.
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4 sm:mb-5">
                    {["Web", "SEO", "Analytics", "Apps"].map(tag => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/80">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-mw-orange group-hover:translate-x-1 transition-transform min-h-[36px] items-center">
                  <span>Enter Page 1</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>

              {/* Professional Development Card */}
              <Link
                to="/training/professional-development"
                className="group relative p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-blue-900/10 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5 sm:mb-4">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-mono">
                      Page 2
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-white mb-1.5 sm:mb-2 group-hover:text-blue-400 transition-colors">
                    Professional & HSE
                  </h2>
                  <p className="text-xs text-white/60 mb-4 sm:mb-5 leading-relaxed">
                    PMP® Exam Prep, Strategic HRM, CRM Systems & HSE Levels 1, 2, 3.
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4 sm:mb-5">
                    {["PMP®", "HRM", "HSE 1-3", "Safety"].map(tag => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/80">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 group-hover:translate-x-1 transition-transform min-h-[36px] items-center">
                  <span>Enter Page 2</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>

              {/* Graduate Video Reviews Card */}
              <Link
                to="/training/testimonials"
                className="group relative p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-emerald-900/10 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5 sm:mb-4">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <Video className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
                      Page 3
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-white mb-1.5 sm:mb-2 group-hover:text-emerald-400 transition-colors">
                    Video Reviews
                  </h2>
                  <p className="text-xs text-white/60 mb-4 sm:mb-5 leading-relaxed">
                    Verified video testimonials from students sharing career transitions & ROI.
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4 sm:mb-5">
                    {["PMP® Proof", "HSE Hires", "Tech Jobs"].map(tag => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/80">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 group-hover:translate-x-1 transition-transform min-h-[36px] items-center">
                  <span>Watch Reviews</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>

              {/* Training Gallery Card */}
              <Link
                to="/training/gallery"
                className="group relative p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-purple-900/10 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5 sm:mb-4">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                      <Camera className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono">
                      Page 4
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-white mb-1.5 sm:mb-2 group-hover:text-purple-300 transition-colors">
                    Training Gallery
                  </h2>
                  <p className="text-xs text-white/60 mb-4 sm:mb-5 leading-relaxed">
                    Live classroom photographs, active labs, PPE safety drills & ceremonies.
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4 sm:mb-5">
                    {["Live Labs", "Safety Drills", "Awards"].map(tag => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/80">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-400 group-hover:translate-x-1 transition-transform min-h-[36px] items-center">
                  <span>Browse Photos</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            </div>
          </motion.div>
        </div>
      </FadeInSection>

      {/* Academy Sub Navigation Bar */}
      <AcademySubNav activeTab="overview" />

      {/* Interactive Tabs Showcase */}
      <section className="py-14 sm:py-20 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs font-semibold mb-3">
                PROGRAM EXPLORER
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold font-display tracking-tight text-white">
                Choose Your Learning Pathway
              </h2>
            </div>

            {/* Toggle Tabs (Optimized for Mobile Touch) */}
            <div className="grid grid-cols-2 sm:flex p-1 sm:p-1.5 rounded-2xl bg-white/5 border border-white/10 w-full sm:w-auto gap-1">
              <button
                onClick={() => setActiveTab("digital")}
                className={`px-3 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 sm:gap-2 min-h-[44px] ${
                  activeTab === "digital"
                    ? "bg-mw-orange text-white shadow-lg shadow-mw-orange/20"
                    : "text-white/60 hover:text-white"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span>Digital Skills <span className="text-[11px] opacity-80">(6)</span></span>
              </button>
              <button
                onClick={() => setActiveTab("professional")}
                className={`px-3 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 sm:gap-2 min-h-[44px] ${
                  activeTab === "professional"
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                    : "text-white/60 hover:text-white"
                }`}
              >
                <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span>Professional & HSE <span className="text-[11px] opacity-80">(5)</span></span>
              </button>
            </div>
          </div>

          {/* Active Tab Preview Grid */}
          {activeTab === "digital" ? (
            <div>
              {/* Mobile-Responsive Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-6 rounded-2xl bg-mw-orange/10 border border-mw-orange/20 mb-6 sm:mb-8 gap-4">
                <div className="flex items-start sm:items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-mw-orange/20 flex items-center justify-center text-mw-orange shrink-0 mt-0.5 sm:mt-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm sm:text-base">
                      Digital Skills Track Overview
                    </h3>
                    <p className="text-xs sm:text-sm text-white/70 mt-0.5 leading-relaxed">
                      Explore detailed curriculum, syllabus modules, tools, and enrollment on the dedicated Digital Skills sub-page.
                    </p>
                  </div>
                </div>
                <Link
                  to="/training/digital-skills"
                  className="inline-flex items-center justify-center gap-1.5 bg-mw-orange hover:bg-mw-orange-hover text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl transition-all shrink-0 w-full sm:w-auto min-h-[44px]"
                >
                  <span>View Full Digital Page</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {DIGITAL_SKILLS_PROGRAMS.map((program) => (
                  <div
                    key={program.id}
                    className="p-5 sm:p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3.5 sm:mb-4">
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-white/5 text-mw-orange border border-white/5">
                          {program.duration}
                        </span>
                        <span className="text-[11px] text-white/40">
                          {program.level}
                        </span>
                      </div>
                      <h4 className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug">
                        {program.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-white/60 mb-4 line-clamp-3 leading-relaxed">
                        {program.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-5 sm:mb-6">
                        {program.tools.slice(0, 4).map(tool => (
                          <span key={tool} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-white/70">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Link
                      to="/training/digital-skills"
                      className="inline-flex items-center justify-between w-full p-3 rounded-xl border border-white/10 hover:border-mw-orange/40 hover:bg-mw-orange/5 text-xs font-semibold text-white transition-all min-h-[44px]"
                    >
                      <span>View Modules & Register</span>
                      <ArrowRight className="w-3.5 h-3.5 text-mw-orange" />
                    </Link>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <Link
                  to="/training/digital-skills"
                  className="inline-flex items-center justify-center gap-2 bg-mw-orange hover:bg-mw-orange-hover text-white px-6 sm:px-8 py-3.5 rounded-full font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-lg shadow-mw-orange/20 w-full sm:w-auto min-h-[48px]"
                >
                  <span>Go to Full Digital Skills Sub-Page</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ) : (
            <div>
              {/* Mobile-Responsive Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-6 rounded-2xl bg-blue-500/10 border border-blue-500/20 mb-6 sm:mb-8 gap-4">
                <div className="flex items-start sm:items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0 mt-0.5 sm:mt-0">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm sm:text-base">
                      Professional Development & HSE Track Overview
                    </h3>
                    <p className="text-xs sm:text-sm text-white/70 mt-0.5 leading-relaxed">
                      Explore accreditation standards, PMP contact hours, HSE Level 1, 2, 3 certifications, and corporate options.
                    </p>
                  </div>
                </div>
                <Link
                  to="/training/professional-development"
                  className="inline-flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl transition-all shrink-0 w-full sm:w-auto min-h-[44px]"
                >
                  <span>View Full Professional Page</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {PROFESSIONAL_DEVELOPMENT_PROGRAMS.map((program) => (
                  <div
                    key={program.id}
                    className="p-5 sm:p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3.5 sm:mb-4">
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-white/5 text-blue-400 border border-white/5">
                          {program.duration}
                        </span>
                        <span className="text-[11px] text-white/40">
                          {program.format}
                        </span>
                      </div>
                      <h4 className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug">
                        {program.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-white/60 mb-4 line-clamp-3 leading-relaxed">
                        {program.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-5 sm:mb-6">
                        {program.tools.slice(0, 4).map(tool => (
                          <span key={tool} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-white/70">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Link
                      to="/training/professional-development"
                      className="inline-flex items-center justify-between w-full p-3 rounded-xl border border-white/10 hover:border-blue-500/40 hover:bg-blue-500/5 text-xs font-semibold text-white transition-all min-h-[44px]"
                    >
                      <span>View Accreditation & Register</span>
                      <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
                    </Link>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <Link
                  to="/training/professional-development"
                  className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 sm:px-8 py-3.5 rounded-full font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-600/20 w-full sm:w-auto min-h-[48px]"
                >
                  <span>Go to Full Professional Development Sub-Page</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-14 sm:py-20 md:py-24 bg-white/[0.02] border-t border-white/5">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mw-orange/10 border border-mw-orange/20 text-mw-orange text-xs font-semibold mb-4">
            PRACTICAL EXECUTION
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6 font-display text-white">
            Not just theory. Real-world commercial capability.
          </h2>
          <p className="text-sm sm:text-base md:text-xl text-white/60 mb-8 sm:mb-10 leading-relaxed">
            Our training academies are led by active consultants and engineering directors at Mindware Consulting. You build actual commercial portfolios, use enterprise tools, and graduate with verified credentials that open doors locally and internationally.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 w-full">
            <Link
              to="/training/digital-skills"
              className="inline-flex items-center justify-center gap-2 bg-mw-orange text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-lg shadow-mw-orange/20 w-full sm:w-auto min-h-[48px]"
            >
              <span>Explore Digital Skills Track</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/training/professional-development"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-600/20 w-full sm:w-auto min-h-[48px]"
            >
              <span>Explore Professional Track</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-14 sm:py-20 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <div className="text-center mb-10 sm:mb-16 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-white mb-3 sm:mb-4">
              Alumni Success Stories
            </h2>
            <p className="text-white/60 text-xs sm:text-sm md:text-base">
              Hear from graduates who accelerated their careers through Mindware training programs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
            {TRAINING_TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-white/[0.02] border border-white/10 flex flex-col justify-between"
              >
                <p className="text-white/80 text-xs sm:text-sm md:text-base leading-relaxed italic mb-6 sm:mb-8">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3.5 sm:gap-4 pt-4 border-t border-white/5">
                  <img
                    src={t.avatar}
                    alt={t.author}
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover border border-white/10 shrink-0"
                  />
                  <div>
                    <div className="font-bold text-white text-xs sm:text-sm">{t.author}</div>
                    <div className="text-[11px] sm:text-xs text-white/50">{t.role}</div>
                    <div className="text-[10px] sm:text-[11px] text-mw-orange font-medium mt-0.5">{t.program}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 sm:mt-12 text-center">
            <Link
              to="/training/testimonials"
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-600/20 hover:scale-105 active:scale-95 w-full sm:w-auto min-h-[48px]"
            >
              <Video className="w-4 h-4 shrink-0" />
              <span>Watch All Graduate Video Reviews (Page 3)</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </Link>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-14 sm:py-20 md:py-24 bg-white/[0.015] border-t border-white/5">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-4xl">
          <div className="text-center mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs font-semibold mb-3">
              <HelpCircle className="w-3.5 h-3.5 text-mw-orange" />
              FREQUENTLY ASKED QUESTIONS
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-white mb-3">
              Everything You Need to Know
            </h2>
            <p className="text-white/60 text-xs sm:text-sm md:text-base max-w-2xl mx-auto">
              Got questions regarding scheduling, certificates, corporate cohorts, or payment arrangements? Here are answers to commonly asked questions.
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {TRAINING_FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden transition-colors hover:border-white/20"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-4 transition-colors min-h-[52px]"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm sm:text-base font-semibold text-white">
                      {faq.question}
                    </span>
                    <span className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-white/70">
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-mw-orange" : ""
                        }`}
                      />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-xs sm:text-sm text-white/70 leading-relaxed border-t border-white/5 pt-3">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Corporate Inquiries CTA */}
      <section className="py-14 sm:py-20 bg-gradient-to-br from-mw-orange/15 to-blue-950/40 border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 text-center max-w-3xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-white mb-3 sm:mb-4">
            Upskill Your Corporate Workforce
          </h2>
          <p className="text-white/70 text-xs sm:text-base md:text-lg mb-6 sm:mb-8 leading-relaxed">
            Need customized in-house training for your company in PMP, HSE Compliance, Web Development, or Data Analytics? Contact our corporate solutions team for a tailored proposal.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 w-full">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-mw-dark hover:bg-white/90 px-6 sm:px-8 py-3.5 rounded-full font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-xl w-full sm:w-auto min-h-[48px]"
            >
              <span>Request Corporate Training Proposal</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </Link>
            <a
              href="https://wa.me/2348125082354?text=Hello%20Mindware%20Consulting%2C%20our%20company%20wants%20to%20discuss%20corporate%20training%20solutions."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 sm:px-8 py-3.5 rounded-full font-semibold text-sm transition-all w-full sm:w-auto min-h-[48px]"
            >
              <MessageSquare className="w-4 h-4 shrink-0" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

