import { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  Sparkles,
  Briefcase,
  ArrowRight,
  Code,
  Globe,
  TrendingUp,
  Video,
  Database,
  Search,
  Smartphone,
  ShieldCheck,
  Users,
  Target,
  Building2,
  CheckCircle2,
  Clock,
  Calendar,
  Award,
  ChevronRight,
  MessageSquare,
  Camera
} from "lucide-react";
import { DIGITAL_SKILLS_PROGRAMS, PROFESSIONAL_DEVELOPMENT_PROGRAMS, TRAINING_TESTIMONIALS, TRAINING_FAQS } from "../data/training";
import { AcademySubNav } from "../components/academy/AcademySubNav";
import { SEO } from "../components/SEO";
import { FadeInSection } from "../components/FadeInSection";

export function Training() {
  const [activeTab, setActiveTab] = useState<"digital" | "professional">("digital");

  return (
    <div className="bg-mw-dark min-h-screen text-white">
      <SEO
        title="Training Academy | Digital Skills & Professional Development | Mindware Consulting"
        description="Mindware Consulting Training Academy offers career-transforming programs across two specialized tracks: Digital Skills (Web Design, SEO, Video, Analytics, Apps) and Professional Development (PMP, HRM, CRM, HSE Levels 1, 2, 3)."
      />

      {/* Hero Section */}
      <FadeInSection className="pt-36 md:pt-44 pb-20 border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-mw-orange/15 via-blue-600/10 to-transparent blur-3xl pointer-events-none mix-blend-screen" />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80 text-xs md:text-sm font-medium mb-6 backdrop-blur-md">
              <GraduationCap className="w-4 h-4 text-mw-orange" />
              <span>MINDWARE CONSULTING ACADEMY</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1] font-display">
              Learn skills that <br />
              <span className="text-gradient">accelerate your career</span> & business.
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl leading-relaxed mb-10">
              We have divided our training programs into two specialized, world-class academies: <strong>Digital Skills</strong> for modern tech creators & marketers, and <strong>Professional Development</strong> for certified corporate leaders and safety professionals.
            </p>

            {/* Quick Track Switcher Hero Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-2">
              {/* Digital Skills Card */}
              <Link
                to="/training/digital-skills"
                className="group relative p-6 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-mw-orange/5 hover:border-mw-orange/50 transition-all duration-300 hover:shadow-2xl hover:shadow-mw-orange/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-mw-orange/10 border border-mw-orange/20 flex items-center justify-center text-mw-orange">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-mw-orange/20 text-mw-orange font-mono">
                      Page 1
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-white mb-2 group-hover:text-mw-orange transition-colors">
                    Digital Skills
                  </h2>
                  <p className="text-xs text-white/60 mb-5 leading-relaxed">
                    Web Design, Social Media, Video Editing, Data Analytics, SEO & App Dev.
                  </p>

                  <div className="flex flex-wrap gap-1 mb-5">
                    {["Web", "SEO", "Analytics", "Apps"].map(tag => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/80">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-mw-orange group-hover:translate-x-1 transition-transform">
                  <span>Enter Page 1</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>

              {/* Professional Development Card */}
              <Link
                to="/training/professional-development"
                className="group relative p-6 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-blue-900/10 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-mono">
                      Page 2
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    Professional & HSE
                  </h2>
                  <p className="text-xs text-white/60 mb-5 leading-relaxed">
                    PMP® Exam Prep, Strategic HRM, CRM Systems & HSE Levels 1, 2, 3.
                  </p>

                  <div className="flex flex-wrap gap-1 mb-5">
                    {["PMP®", "HRM", "HSE 1-3", "Safety"].map(tag => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/80">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 group-hover:translate-x-1 transition-transform">
                  <span>Enter Page 2</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>

              {/* Graduate Video Reviews Card */}
              <Link
                to="/training/testimonials"
                className="group relative p-6 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-emerald-900/10 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <Video className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
                      Page 3
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                    Video Reviews
                  </h2>
                  <p className="text-xs text-white/60 mb-5 leading-relaxed">
                    Verified video testimonials from students sharing career transitions & ROI.
                  </p>

                  <div className="flex flex-wrap gap-1 mb-5">
                    {["PMP® Proof", "HSE Hires", "Tech Jobs"].map(tag => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/80">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 group-hover:translate-x-1 transition-transform">
                  <span>Watch Reviews</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>

              {/* Training Gallery Card */}
              <Link
                to="/training/gallery"
                className="group relative p-6 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-purple-900/10 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                      <Camera className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono">
                      Page 4
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    Training Gallery
                  </h2>
                  <p className="text-xs text-white/60 mb-5 leading-relaxed">
                    Live classroom photographs, active labs, PPE safety drills & ceremonies.
                  </p>

                  <div className="flex flex-wrap gap-1 mb-5">
                    {["Live Labs", "Safety Drills", "Awards"].map(tag => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/80">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-400 group-hover:translate-x-1 transition-transform">
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
      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs font-semibold mb-3">
                PROGRAM EXPLORER
              </div>
              <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-white">
                Choose Your Learning Pathway
              </h2>
            </div>

            {/* Toggle Tabs */}
            <div className="inline-flex p-1.5 rounded-2xl bg-white/5 border border-white/10 self-start md:self-auto">
              <button
                onClick={() => setActiveTab("digital")}
                className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all flex items-center gap-2 ${
                  activeTab === "digital"
                    ? "bg-mw-orange text-white shadow-lg shadow-mw-orange/20"
                    : "text-white/60 hover:text-white"
                }`}
              >
                <Sparkles className="w-4 h-4" />
                Digital Skills (6 Programs)
              </button>
              <button
                onClick={() => setActiveTab("professional")}
                className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all flex items-center gap-2 ${
                  activeTab === "professional"
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                    : "text-white/60 hover:text-white"
                }`}
              >
                <Briefcase className="w-4 h-4" />
                Professional & HSE (5 Programs)
              </button>
            </div>
          </div>

          {/* Active Tab Preview Grid */}
          {activeTab === "digital" ? (
            <div>
              <div className="flex items-center justify-between p-4 md:p-6 rounded-2xl bg-mw-orange/10 border border-mw-orange/20 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-mw-orange/20 flex items-center justify-center text-mw-orange shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm md:text-base">
                      Digital Skills Track Overview
                    </h3>
                    <p className="text-xs md:text-sm text-white/70">
                      Explore detailed curriculum, syllabus modules, tools, and enrollment on the dedicated Digital Skills sub-page.
                    </p>
                  </div>
                </div>
                <Link
                  to="/training/digital-skills"
                  className="hidden sm:inline-flex items-center gap-1.5 bg-mw-orange hover:bg-mw-orange-hover text-white text-xs md:text-sm font-semibold px-4 py-2 rounded-xl transition-all shrink-0"
                >
                  View Full Digital Page
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {DIGITAL_SKILLS_PROGRAMS.map((program) => (
                  <div
                    key={program.id}
                    className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-white/5 text-mw-orange border border-white/5">
                          {program.duration}
                        </span>
                        <span className="text-[11px] text-white/40">
                          {program.level}
                        </span>
                      </div>
                      <h4 className="text-xl font-bold text-white mb-2">
                        {program.title}
                      </h4>
                      <p className="text-xs text-white/60 mb-4 line-clamp-3">
                        {program.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-6">
                        {program.tools.slice(0, 4).map(tool => (
                          <span key={tool} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-white/70">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Link
                      to="/training/digital-skills"
                      className="inline-flex items-center justify-between w-full p-3 rounded-xl border border-white/10 hover:border-mw-orange/40 hover:bg-mw-orange/5 text-xs font-semibold text-white transition-all"
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
                  className="inline-flex items-center gap-2 bg-mw-orange hover:bg-mw-orange-hover text-white px-8 py-3.5 rounded-full font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-lg shadow-mw-orange/20"
                >
                  <span>Go to Full Digital Skills Sub-Page</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between p-4 md:p-6 rounded-2xl bg-blue-500/10 border border-blue-500/20 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm md:text-base">
                      Professional Development & HSE Track Overview
                    </h3>
                    <p className="text-xs md:text-sm text-white/70">
                      Explore accreditation standards, PMP contact hours, HSE Level 1, 2, 3 certifications, and corporate options.
                    </p>
                  </div>
                </div>
                <Link
                  to="/training/professional-development"
                  className="hidden sm:inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs md:text-sm font-semibold px-4 py-2 rounded-xl transition-all shrink-0"
                >
                  View Full Professional Page
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {PROFESSIONAL_DEVELOPMENT_PROGRAMS.map((program) => (
                  <div
                    key={program.id}
                    className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-white/5 text-blue-400 border border-white/5">
                          {program.duration}
                        </span>
                        <span className="text-[11px] text-white/40">
                          {program.format}
                        </span>
                      </div>
                      <h4 className="text-xl font-bold text-white mb-2">
                        {program.title}
                      </h4>
                      <p className="text-xs text-white/60 mb-4 line-clamp-3">
                        {program.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-6">
                        {program.tools.slice(0, 4).map(tool => (
                          <span key={tool} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-white/70">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Link
                      to="/training/professional-development"
                      className="inline-flex items-center justify-between w-full p-3 rounded-xl border border-white/10 hover:border-blue-500/40 hover:bg-blue-500/5 text-xs font-semibold text-white transition-all"
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
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 rounded-full font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-600/20"
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
      <section className="py-24 bg-white/[0.02] border-t border-white/5">
        <div className="container mx-auto px-6 md:px-12 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mw-orange/10 border border-mw-orange/20 text-mw-orange text-xs font-semibold mb-4">
            PRACTICAL EXECUTION
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 font-display text-white">
            Not just theory. Real-world commercial capability.
          </h2>
          <p className="text-base md:text-xl text-white/60 mb-10 leading-relaxed">
            Our training academies are led by active consultants and engineering directors at Mindware Consulting. You build actual commercial portfolios, use enterprise tools, and graduate with verified credentials that open doors locally and internationally.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/training/digital-skills"
              className="inline-flex items-center gap-2 bg-mw-orange text-white px-8 py-4 rounded-full font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-lg shadow-mw-orange/20"
            >
              <span>Explore Digital Skills Track</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/training/professional-development"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-600/20"
            >
              <span>Explore Professional Track</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-white mb-4">
              Alumni Success Stories
            </h2>
            <p className="text-white/60 text-sm md:text-base">
              Hear from graduates who accelerated their careers through Mindware training programs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {TRAINING_TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 flex flex-col justify-between"
              >
                <p className="text-white/80 text-sm md:text-base leading-relaxed italic mb-8">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                  <img
                    src={t.avatar}
                    alt={t.author}
                    className="w-12 h-12 rounded-full object-cover border border-white/10"
                  />
                  <div>
                    <div className="font-bold text-white text-sm">{t.author}</div>
                    <div className="text-xs text-white/50">{t.role}</div>
                    <div className="text-[11px] text-mw-orange font-medium mt-0.5">{t.program}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/training/testimonials"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-600/20 hover:scale-105 active:scale-95"
            >
              <Video className="w-4 h-4" />
              <span>Watch All Graduate Video Reviews (Sub-Page 3)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Corporate Inquiries CTA */}
      <section className="py-20 bg-gradient-to-br from-mw-orange/15 to-blue-950/40 border-t border-white/10">
        <div className="container mx-auto px-6 md:px-12 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-white mb-4">
            Upskill Your Corporate Workforce
          </h2>
          <p className="text-white/70 text-base md:text-lg mb-8 leading-relaxed">
            Need customized in-house training for your company in PMP, HSE Compliance, Web Development, or Data Analytics? Contact our corporate solutions team for a tailored proposal.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white text-mw-dark hover:bg-white/90 px-8 py-3.5 rounded-full font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-xl"
            >
              Request Corporate Training Proposal
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/2348125082354?text=Hello%20Mindware%20Consulting%2C%20our%20company%20wants%20to%20discuss%20corporate%20training%20solutions."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3.5 rounded-full font-semibold text-sm transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
