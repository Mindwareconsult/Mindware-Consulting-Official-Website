import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Briefcase,
  ShieldCheck,
  Users,
  Target,
  Award,
  Clock,
  Calendar,
  ChevronDown,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  MessageSquare,
  Building2,
  FileCheck,
  Video,
  Camera
} from "lucide-react";
import { PROFESSIONAL_DEVELOPMENT_PROGRAMS, TRAINING_FAQS } from "../data/training";
import { SEO } from "../components/SEO";
import { FadeInSection } from "../components/FadeInSection";

export function ProfessionalDevelopmentTraining() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [expandedProgram, setExpandedProgram] = useState<string | null>(PROFESSIONAL_DEVELOPMENT_PROGRAMS[0].id);

  const filters = [
    { id: "all", label: "All Professional Programs" },
    { id: "management", label: "Project & Operations (PMP)" },
    { id: "safety", label: "Health & Safety (HSE 1,2,3)" },
    { id: "talent-crm", label: "HRM & CRM Systems" },
    { id: "leadership", label: "Leadership & Employability" }
  ];

  const filteredPrograms = PROFESSIONAL_DEVELOPMENT_PROGRAMS.filter(prog => {
    if (activeFilter === "all") return true;
    if (activeFilter === "management") return prog.id === "pmp-project-management";
    if (activeFilter === "safety") return prog.id === "hse-levels-123";
    if (activeFilter === "talent-crm") return prog.id === "hrm-human-resources" || prog.id === "crm-customer-relationship-management";
    if (activeFilter === "leadership") return prog.id === "workplace-employability-leadership";
    return true;
  });

  const getProgramIcon = (id: string) => {
    switch (id) {
      case "pmp-project-management":
        return Target;
      case "hse-levels-123":
        return ShieldCheck;
      case "hrm-human-resources":
        return Users;
      case "crm-customer-relationship-management":
        return Building2;
      case "workplace-employability-leadership":
        return Briefcase;
      default:
        return Award;
    }
  };

  return (
    <div className="bg-mw-dark min-h-screen text-white">
      <SEO
        title="Professional Development & Employability Skills | PMP, HRM, CRM, HSE Levels 1, 2, 3 | Mindware Consulting"
        description="Accelerate your career with accredited professional development certifications from Mindware Consulting: Project Management Professional (PMP), Human Resources Management (HRM), CRM Systems, and Health, Safety & Environment (HSE Levels 1, 2 & 3)."
      />

      {/* Hero Section */}
      <FadeInSection className="pt-36 md:pt-44 pb-20 border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-blue-600/15 via-emerald-500/5 to-transparent blur-3xl pointer-events-none mix-blend-screen" />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs md:text-sm text-white/50 mb-8">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/training" className="hover:text-white transition-colors">Training Academy</Link>
            <span>/</span>
            <span className="text-blue-400 font-medium">Professional Development & Employability</span>
          </nav>

          {/* Track Switcher Banner */}
          <div className="inline-flex flex-wrap items-center gap-3 p-1.5 rounded-2xl bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
            <Link
              to="/training/digital-skills"
              className="px-4 py-1.5 rounded-xl text-white/70 hover:text-white hover:bg-white/5 text-xs md:text-sm font-medium transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-mw-orange" />
              1. Digital Skills Track
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <span className="px-4 py-1.5 rounded-xl bg-blue-600 text-white text-xs md:text-sm font-semibold shadow-lg shadow-blue-600/20 flex items-center gap-2">
              <Briefcase className="w-3.5 h-3.5" />
              2. Professional & HSE Track
            </span>
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
              Professional Development & <br />
              <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-emerald-400 bg-clip-text text-transparent">
                Employability Certifications
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-8 max-w-3xl">
              Industry-accredited qualifications engineered for ambitious professionals, corporate teams, and engineering leaders. Master <strong>Project Management Professional (PMP®)</strong>, <strong>Human Resources Management (HRM)</strong>, <strong>Customer Relationship Management (CRM)</strong>, and <strong>Health, Safety & Environment (HSE Levels 1, 2, & 3)</strong>.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#professional-programs"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3.5 rounded-full font-semibold transition-all hover:bg-blue-500 hover:scale-105 active:scale-95 shadow-lg shadow-blue-600/25"
              >
                Browse Certifications
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold border border-white/20 hover:bg-white/5 transition-all text-white"
              >
                Request Corporate Proposal
              </Link>
            </div>
          </motion.div>
        </div>
      </FadeInSection>

      {/* Accreditations & Key Standards Bar */}
      <section className="py-10 border-b border-white/5 bg-white/[0.01]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">PMI®</div>
              <div className="text-xs md:text-sm text-white/60">PMBOK Aligned Curriculum</div>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="text-3xl md:text-4xl font-bold text-emerald-400 mb-1">Levels 1,2,3</div>
              <div className="text-xs md:text-sm text-white/60">HSE Safety Certification</div>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-1">CIPM & Labor</div>
              <div className="text-xs md:text-sm text-white/60">Statutory HR Frameworks</div>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">Weekend</div>
              <div className="text-xs md:text-sm text-white/60">Executive & Hybrid Schedules</div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Selector & Grid */}
      <section id="professional-programs" className="py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-3">
                PROFESSIONAL CREDENTIALS
              </div>
              <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-white">
                Accredited Professional Programs
              </h2>
            </div>

            {/* Filter Buttons */}
            <div className="flex overflow-x-auto pb-1.5 scrollbar-none sm:flex-wrap gap-2 flex-nowrap sm:flex-wrap w-full md:w-auto">
              {filters.map(filter => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-4 py-2 rounded-xl text-xs md:text-sm font-medium transition-all whitespace-nowrap shrink-0 ${
                    activeFilter === filter.id
                      ? "bg-blue-600 text-white shadow-md font-semibold"
                      : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/5"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Programs Stack */}
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
                  {/* Program Header */}
                  <div className="p-6 md:p-10">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/5">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                          <Icon className="w-7 h-7 text-blue-400" />
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            {program.badge && (
                              <span className="px-3 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-semibold">
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
                          <p className="text-blue-400 text-sm md:text-base font-medium mt-1">
                            {program.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Right Meta info */}
                      <div className="flex flex-wrap lg:flex-col lg:items-end gap-3 text-xs md:text-sm text-white/70 shrink-0">
                        <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                          <Clock className="w-4 h-4 text-blue-400" />
                          <span>Duration: <strong>{program.duration}</strong></span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                          <Calendar className="w-4 h-4 text-blue-400" />
                          <span>{program.cohort}</span>
                        </div>
                      </div>
                    </div>

                    {/* Program Description */}
                    <p className="text-white/70 leading-relaxed my-6 text-sm md:text-base max-w-4xl">
                      {program.description}
                    </p>

                    {/* Frameworks & Tools */}
                    <div className="mb-6">
                      <div className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2.5">
                        Frameworks, Software & Industry Tools:
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
                        className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-blue-400 hover:text-white transition-colors"
                      >
                        <span>{isExpanded ? "Hide Curriculum Modules" : "View Curriculum & Certification Details"}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
                      </button>

                      <div className="flex items-center gap-3">
                        <a
                          href={`https://wa.me/2348125082354?text=${encodeURIComponent(`Hello Mindware Consulting, I would like to register or get cohort schedules for the ${program.title} professional certification program.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs md:text-sm font-semibold px-5 py-2.5 rounded-full transition-all shadow-lg shadow-emerald-900/30"
                        >
                          <MessageSquare className="w-4 h-4" />
                          WhatsApp Admissions Desk
                        </a>
                        <Link
                          to="/contact"
                          className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs md:text-sm font-semibold px-5 py-2.5 rounded-full transition-all"
                        >
                          Enroll Today
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Expandable Syllabus Detail */}
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
                          {/* Modules List */}
                          <div className="lg:col-span-2 space-y-6">
                            <h4 className="text-base font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                              <FileCheck className="w-4 h-4 text-blue-400" />
                              Accredited Syllabus Structure
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
                                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                                        <span>{topic}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Meta & Outcomes Box */}
                          <div className="space-y-6">
                            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
                              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                                <Award className="w-4 h-4 text-emerald-400" />
                                Credential & Certification
                              </h4>
                              <p className="text-sm text-white/90 font-medium mb-4">
                                {program.certification}
                              </p>

                              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3 flex items-center gap-2 pt-2 border-t border-white/5">
                                <Briefcase className="w-4 h-4 text-blue-400" />
                                Career Opportunities
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
                                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                                Certification Advantage
                              </h4>
                              <ul className="space-y-2 text-xs md:text-sm text-white/70">
                                {program.keyHighlights.map((highlight, hidx) => (
                                  <li key={hidx} className="flex items-start gap-2">
                                    <span className="text-blue-400 font-bold text-xs mt-0.5">✓</span>
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

      {/* Switch to Digital Skills Banner */}
      <section className="py-16 bg-gradient-to-r from-mw-orange/15 via-mw-dark to-blue-950/30 border-y border-white/10">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mw-orange/20 text-mw-orange text-xs font-semibold mb-3">
              DIGITAL TECH & CREATIVE TRACK
            </div>
            <h3 className="text-2xl md:text-4xl font-bold font-display text-white mb-3">
              Need Web Design, Social Media, Video Editing, or Data Analytics?
            </h3>
            <p className="text-sm md:text-base text-white/70 leading-relaxed">
              Explore our hands-on Digital Skills Academy with intensive bootcamps in Web Development, SEO Strategy, Python Data Analytics, and Video Production.
            </p>
          </div>
          <Link
            to="/training/digital-skills"
            className="inline-flex items-center gap-2 bg-mw-orange hover:bg-mw-orange-hover text-white px-8 py-4 rounded-full font-bold text-sm md:text-base transition-all hover:scale-105 active:scale-95 shrink-0 shadow-xl shadow-mw-orange/25"
          >
            <span>Explore Digital Skills Track</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Corporate Training Customization Section */}
      <section className="py-24 bg-white/[0.01]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="p-8 md:p-14 rounded-3xl bg-gradient-to-br from-white/[0.04] to-blue-900/10 border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-4">
                FOR CORPORATE ENTERPRISES & FIRMS
              </div>
              <h3 className="text-3xl md:text-4xl font-bold font-display text-white mb-4">
                Custom In-House Workforce & HSE Training
              </h3>
              <p className="text-white/70 text-base leading-relaxed mb-6">
                Equip your engineering crews, site supervisors, HR officers, and executive managers with certified training conducted at your corporate facility or via our dedicated executive portal.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 text-sm text-white/80">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Bespoke syllabi tailored to your industry</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Group discount packages (10% - 25%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Post-training impact & compliance audits</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Physical retreat or virtual cohort delivery</span>
                </div>
              </div>
            </div>

            <div className="shrink-0 flex flex-col gap-3 w-full sm:w-auto">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full font-bold text-base transition-all hover:scale-105 active:scale-95 shadow-xl shadow-blue-600/30 text-center"
              >
                <span>Request Corporate Training Quote</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/2348125082354?text=Hello%20Mindware%20Consulting%2C%20our%20organization%20is%20interested%20in%20corporate%20PMP%20%2F%20HSE%20%2F%20HRM%20training."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white/90 px-8 py-3.5 rounded-full font-semibold text-sm border border-white/10 transition-all text-center"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Instant Corporate WhatsApp Desk</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-white mb-4">
              Professional Certification FAQs
            </h2>
            <p className="text-white/60 text-base md:text-lg">
              Frequently asked questions on accreditation, eligibility, and cohort scheduling.
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
        </div>
      </section>
    </div>
  );
}
