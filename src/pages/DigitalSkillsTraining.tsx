import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Code,
  Globe,
  TrendingUp,
  Video,
  Database,
  Search,
  Smartphone,
  CheckCircle2,
  Clock,
  Calendar,
  Award,
  ChevronDown,
  ArrowRight,
  Briefcase,
  Users,
  Sparkles,
  MessageSquare,
  Camera
} from "lucide-react";
import { DIGITAL_SKILLS_PROGRAMS, TRAINING_FAQS } from "../data/training";
import { SEO } from "../components/SEO";
import { FadeInSection } from "../components/FadeInSection";

export function DigitalSkillsTraining() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [expandedProgram, setExpandedProgram] = useState<string | null>(DIGITAL_SKILLS_PROGRAMS[0].id);

  const categories = [
    { id: "all", label: "All Digital Skills" },
    { id: "web-code", label: "Web & Software Dev" },
    { id: "marketing-seo", label: "Marketing & SEO" },
    { id: "media-data", label: "Video & Analytics" }
  ];

  const filteredPrograms = DIGITAL_SKILLS_PROGRAMS.filter(prog => {
    if (activeCategory === "all") return true;
    if (activeCategory === "web-code") return prog.id === "web-design" || prog.id === "app-development";
    if (activeCategory === "marketing-seo") return prog.id === "social-media-marketing" || prog.id === "seo-strategy";
    if (activeCategory === "media-data") return prog.id === "video-editing" || prog.id === "data-analytics";
    return true;
  });

  const getProgramIcon = (id: string) => {
    switch (id) {
      case "web-design":
        return Globe;
      case "social-media-marketing":
        return TrendingUp;
      case "video-editing":
        return Video;
      case "data-analytics":
        return Database;
      case "seo-strategy":
        return Search;
      case "app-development":
        return Smartphone;
      default:
        return Code;
    }
  };

  return (
    <div className="bg-mw-dark min-h-screen text-white">
      <SEO
        title="Digital Skills Training | Web Design, SEO, Data Analytics, Apps & Marketing | Mindware Consulting"
        description="Master in-demand digital skills with Mindware Consulting. Industry-certified bootcamps in Web Design, Social Media Marketing, Video Editing, Data Analytics, SEO, and App Development."
      />

      {/* Hero Section */}
      <FadeInSection className="pt-36 md:pt-44 pb-20 border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-mw-orange/15 via-blue-500/5 to-transparent blur-3xl pointer-events-none mix-blend-screen" />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs md:text-sm text-white/50 mb-8">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/training" className="hover:text-white transition-colors">Training Academy</Link>
            <span>/</span>
            <span className="text-mw-orange font-medium">Digital Skills</span>
          </nav>

          {/* Track Switcher Banner */}
          <div className="inline-flex flex-wrap items-center gap-3 p-1.5 rounded-2xl bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
            <span className="px-4 py-1.5 rounded-xl bg-mw-orange text-white text-xs md:text-sm font-semibold shadow-lg shadow-mw-orange/20 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              1. Digital Skills Track
            </span>
            <Link
              to="/training/professional-development"
              className="px-4 py-1.5 rounded-xl text-white/70 hover:text-white hover:bg-white/5 text-xs md:text-sm font-medium transition-all flex items-center gap-1.5"
            >
              <Briefcase className="w-3.5 h-3.5 text-blue-400" />
              2. Professional & HSE Track
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/training/testimonials"
              className="px-4 py-1.5 rounded-xl text-white/70 hover:text-white hover:bg-white/5 text-xs md:text-sm font-medium transition-all flex items-center gap-1.5"
            >
              <Video className="w-3.5 h-3.5 text-emerald-400" />
              3. Graduate Video Reviews
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/training/gallery"
              className="px-4 py-1.5 rounded-xl text-white/70 hover:text-white hover:bg-white/5 text-xs md:text-sm font-medium transition-all flex items-center gap-1.5"
            >
              <Camera className="w-3.5 h-3.5 text-purple-400" />
              4. Training Gallery
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1] font-display">
              Learn High-Income <br />
              <span className="text-gradient">Digital Skills</span> That Deliver.
            </h1>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-8 max-w-3xl">
              Practical, project-based accelerators engineered to transform beginners and intermediate learners into job-ready professionals. Master <strong>Web Design</strong>, <strong>Social Media Marketing</strong>, <strong>Video Editing</strong>, <strong>Data Analytics</strong>, <strong>SEO</strong>, and <strong>Full-Stack App Development</strong> with direct mentorship from industry consultants.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#programs-grid"
                className="inline-flex items-center gap-2 bg-mw-orange text-white px-8 py-3.5 rounded-full font-semibold transition-all hover:bg-mw-orange-hover hover:scale-105 active:scale-95 shadow-lg shadow-mw-orange/25"
              >
                Explore All Programs
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold border border-white/20 hover:bg-white/5 transition-all text-white"
              >
                Inquire for Corporate Team
              </Link>
            </div>
          </motion.div>
        </div>
      </FadeInSection>

      {/* Track Stats Bar */}
      <section className="py-10 border-b border-white/5 bg-white/[0.01]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">100%</div>
              <div className="text-xs md:text-sm text-white/60">Hands-on Live Projects</div>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="text-3xl md:text-4xl font-bold text-mw-orange mb-1">6 to 12</div>
              <div className="text-xs md:text-sm text-white/60">Weeks Intensive Duration</div>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">500+</div>
              <div className="text-xs md:text-sm text-white/60">Students Trained</div>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="text-3xl md:text-4xl font-bold text-emerald-400 mb-1">Verified</div>
              <div className="text-xs md:text-sm text-white/60">Professional Certificate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter & Programs List */}
      <section id="programs-grid" className="py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mw-orange/10 border border-mw-orange/20 text-mw-orange text-xs font-semibold mb-3">
                CURATED DIGITAL CURRICULA
              </div>
              <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-white">
                Comprehensive Digital Tracks
              </h2>
            </div>

            {/* Filter buttons */}
            <div className="flex overflow-x-auto pb-1.5 scrollbar-none sm:flex-wrap gap-2 flex-nowrap sm:flex-wrap w-full md:w-auto">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs md:text-sm font-medium transition-all whitespace-nowrap shrink-0 ${
                    activeCategory === cat.id
                      ? "bg-white text-mw-dark shadow-md font-semibold"
                      : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/5"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Programs Grid */}
          <div className="space-y-8">
            {filteredPrograms.map((program) => {
              const Icon = getProgramIcon(program.id);
              const isExpanded = expandedProgram === program.id;

              return (
                <motion.div
                  key={program.id}
                  layout
                  className="rounded-3xl border border-white/10 bg-white/[0.02] overflow-hidden hover:border-white/20 transition-all duration-300"
                >
                  {/* Card Header & Summary */}
                  <div className="p-6 md:p-10">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/5">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-mw-orange/10 border border-mw-orange/20 flex items-center justify-center shrink-0">
                          <Icon className="w-7 h-7 text-mw-orange" />
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            {program.badge && (
                              <span className="px-3 py-0.5 rounded-full bg-mw-orange/20 border border-mw-orange/30 text-mw-orange text-xs font-semibold">
                                {program.badge}
                              </span>
                            )}
                            <span className="px-3 py-0.5 rounded-full bg-white/10 text-white/70 text-xs font-medium">
                              {program.format}
                            </span>
                            <span className="text-xs text-white/40">
                              {program.level}
                            </span>
                          </div>
                          <h3 className="text-2xl md:text-3xl font-bold font-display text-white">
                            {program.title}
                          </h3>
                          <p className="text-mw-orange text-sm md:text-base font-medium mt-1">
                            {program.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Right Meta details */}
                      <div className="flex flex-wrap lg:flex-col lg:items-end gap-3 text-xs md:text-sm text-white/70 shrink-0">
                        <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                          <Clock className="w-4 h-4 text-mw-orange" />
                          <span>Duration: <strong>{program.duration}</strong></span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                          <Calendar className="w-4 h-4 text-mw-orange" />
                          <span>{program.cohort}</span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-white/70 leading-relaxed my-6 text-sm md:text-base max-w-4xl">
                      {program.description}
                    </p>

                    {/* Tools Cloud */}
                    <div className="mb-6">
                      <div className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2.5">
                        Industry Tools & Technologies Mastered:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {program.tools.map((tool) => (
                          <span
                            key={tool}
                            className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-white/90"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/5">
                      <button
                        onClick={() => setExpandedProgram(isExpanded ? null : program.id)}
                        className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-mw-orange hover:text-white transition-colors"
                      >
                        <span>{isExpanded ? "Hide Detailed Syllabus" : "View Complete Syllabus & Modules"}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
                      </button>

                      <div className="flex items-center gap-3">
                        <a
                          href={`https://wa.me/2348125082354?text=${encodeURIComponent(`Hello Mindware Consulting, I would like to enroll in or get full details about the ${program.title} digital skills training program.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs md:text-sm font-semibold px-5 py-2.5 rounded-full transition-all shadow-lg shadow-emerald-900/30"
                        >
                          <MessageSquare className="w-4 h-4" />
                          WhatsApp Enrollment Desk
                        </a>
                        <Link
                          to="/contact"
                          className="inline-flex items-center gap-1.5 bg-mw-orange hover:bg-mw-orange-hover text-white text-xs md:text-sm font-semibold px-5 py-2.5 rounded-full transition-all"
                        >
                          Register Now
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Expandable Syllabus & Curriculum Breakdown */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-black/30 border-t border-white/5 p-6 md:p-10"
                      >
                        <div className="grid lg:grid-cols-3 gap-8">
                          {/* Left 2 Cols: Modules */}
                          <div className="lg:col-span-2 space-y-6">
                            <h4 className="text-base font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                              <Code className="w-4 h-4 text-mw-orange" />
                              Structured Module Breakdown
                            </h4>
                            <div className="grid md:grid-cols-2 gap-4">
                              {program.modules.map((mod, idx) => (
                                <div
                                  key={idx}
                                  className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
                                >
                                  <h5 className="font-bold text-sm md:text-base text-white mb-3">
                                    {mod.title}
                                  </h5>
                                  <ul className="space-y-2 text-xs md:text-sm text-white/70">
                                    {mod.topics.map((topic, tidx) => (
                                      <li key={tidx} className="flex items-start gap-2">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-mw-orange shrink-0 mt-0.5" />
                                        <span>{topic}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Right Col: Career Outcomes & Key Highlights */}
                          <div className="space-y-6">
                            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
                              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                                <Award className="w-4 h-4 text-mw-orange" />
                                Certification Awarded
                              </h4>
                              <p className="text-sm text-white/90 font-medium mb-4">
                                {program.certification}
                              </p>

                              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3 flex items-center gap-2 pt-2 border-t border-white/5">
                                <Briefcase className="w-4 h-4 text-blue-400" />
                                Qualifying Career Roles
                              </h4>
                              <ul className="space-y-2 text-xs md:text-sm text-white/70 mb-4">
                                {program.careerOutcomes.map((career, cidx) => (
                                  <li key={cidx} className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                    <span>{career}</span>
                                  </li>
                                ))}
                              </ul>

                              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3 flex items-center gap-2 pt-2 border-t border-white/5">
                                <Sparkles className="w-4 h-4 text-mw-orange" />
                                Program Highlights
                              </h4>
                              <ul className="space-y-2 text-xs md:text-sm text-white/70">
                                {program.keyHighlights.map((highlight, hidx) => (
                                  <li key={hidx} className="flex items-start gap-2">
                                    <span className="text-mw-orange font-bold text-xs mt-0.5">✓</span>
                                    <span>{highlight}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Switch to Professional Development Banner */}
      <section className="py-16 bg-gradient-to-r from-blue-950/40 via-mw-dark to-mw-orange/10 border-y border-white/10">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-3">
              EXECUTIVE & EMPLOYABILITY TRACK
            </div>
            <h3 className="text-2xl md:text-4xl font-bold font-display text-white mb-3">
              Looking for PMP, HRM, CRM, or HSE Levels 1, 2, 3?
            </h3>
            <p className="text-sm md:text-base text-white/70 leading-relaxed">
              Explore our accredited Professional Development & Employability Skills track designed for managers, engineers, HR leaders, and corporate teams.
            </p>
          </div>
          <Link
            to="/training/professional-development"
            className="inline-flex items-center gap-2 bg-white text-mw-dark hover:bg-white/90 px-8 py-4 rounded-full font-bold text-sm md:text-base transition-all hover:scale-105 active:scale-95 shrink-0 shadow-xl"
          >
            <span>Explore Professional Track</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-white/60 text-base md:text-lg">
              Everything you need to know about enrolling in Mindware Digital Skills programs.
            </p>
          </div>

          <div className="space-y-4">
            {TRAINING_FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
              >
                <h4 className="text-lg font-bold text-white mb-2">
                  {faq.question}
                </h4>
                <p className="text-white/70 text-sm md:text-base leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          {/* Need custom support */}
          <div className="mt-16 text-center p-8 rounded-3xl bg-white/5 border border-white/10">
            <h3 className="text-xl md:text-2xl font-bold mb-3">Have questions about upcoming cohort dates or payment?</h3>
            <p className="text-white/60 text-sm md:text-base mb-6 max-w-xl mx-auto">
              Our academic advisors are available on WhatsApp and phone to guide you on syllabus details, hardware requirements, and installment plans.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://wa.me/2348125082354?text=Hello%20Mindware%20Consulting%2C%20I%20have%20an%20inquiry%20regarding%20the%20digital%20skills%20training%20schedule."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-full font-semibold text-sm transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                Chat with Advisor (+2348125082354)
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white text-mw-dark hover:bg-white/90 px-6 py-3 rounded-full font-semibold text-sm transition-all"
              >
                <Users className="w-4 h-4" />
                Send an Application
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
