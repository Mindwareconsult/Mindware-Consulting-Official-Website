import { useParams, Link, Navigate } from "react-router-dom";
import { SERVICES, PORTFOLIO } from "../data/content";
import { SERVICES_DETAILED } from "../data/servicesData";
import { motion } from "motion/react";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Briefcase,
  GraduationCap,
  ShieldCheck,
  Clock,
  Layers,
  HelpCircle,
  MessageSquare,
  ChevronRight,
  BarChart3,
  Award,
  Zap,
  Target
} from "lucide-react";
import { EASE } from "../lib/utils";
import { FadeInSection } from "../components/FadeInSection";
import { SEO } from "../components/SEO";

export function ServiceDetail() {
  const { id } = useParams();
  const service = SERVICES.find(s => s.id === id);
  const detail = id ? SERVICES_DETAILED[id] : null;

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const Icon = service.icon;
  const isTraining = service.id === "training";

  // Find next and previous service for bottom navigation
  const currentIndex = SERVICES.findIndex(s => s.id === id);
  const prevService = currentIndex > 0 ? SERVICES[currentIndex - 1] : SERVICES[SERVICES.length - 1];
  const nextService = currentIndex < SERVICES.length - 1 ? SERVICES[currentIndex + 1] : SERVICES[0];

  // Find related case studies if specified
  const relatedProjects = detail?.relatedCaseStudyIds
    ? PORTFOLIO.filter(p => detail.relatedCaseStudyIds.includes(p.id))
    : PORTFOLIO.slice(0, 3);

  return (
    <div className="bg-mw-dark text-white min-h-screen">
      <SEO
        title={`${service.title} | Mindware Consulting`}
        description={detail ? detail.executiveSummary.slice(0, 160) : service.tagline}
      />

      {/* Top Header & Breadcrumb with Prominent "Back to Services" button */}
      <div className="pt-28 sm:pt-32 border-b border-white/5 bg-[#02040a]/50">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 text-xs sm:text-sm font-semibold transition-all group shadow-sm min-h-[40px] active:scale-95"
              aria-label="Back to Services"
            >
              <ArrowLeft className="w-4 h-4 text-mw-orange group-hover:-translate-x-1 transition-transform" />
              <span>Back to All Services</span>
            </Link>

            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-white/50 flex-wrap">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link to="/services" className="hover:text-white transition-colors">Services</Link>
              <span>/</span>
              <span className="text-mw-orange font-medium truncate max-w-[180px] sm:max-w-none">{service.title}</span>
            </nav>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <FadeInSection className="py-12 sm:py-16 md:py-24 border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[600px] md:w-[800px] h-[320px] sm:h-[600px] md:h-[800px] bg-mw-orange/5 rounded-full blur-[80px] sm:blur-[120px] mix-blend-screen pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            {/* Category Badge */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-mw-orange/10 border border-mw-orange/20 text-mw-orange text-xs font-bold uppercase tracking-wider mb-4 sm:mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{detail?.badge || "ENTERPRISE SERVICE"}</span>
            </div>

            <div className="flex items-start sm:items-center gap-3.5 sm:gap-4 mb-4 sm:mb-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-mw-orange" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold tracking-tight leading-[1.15] font-display text-white">
                  {service.title}
                </h1>
                <p className="text-base sm:text-lg md:text-xl font-medium text-mw-orange mt-1">
                  {service.tagline}
                </p>
              </div>
            </div>

            <p className="text-sm sm:text-lg md:text-xl text-white/70 max-w-3xl leading-relaxed mb-8 sm:mb-10 font-light">
              {detail ? detail.executiveSummary : service.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              {isTraining ? (
                <>
                  <Link
                    to="/training/digital-skills"
                    className="inline-flex items-center justify-center gap-2 bg-mw-orange hover:bg-mw-orange-hover text-white px-6 sm:px-7 py-3.5 rounded-full font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-mw-orange/25 text-xs sm:text-sm min-h-[48px] w-full sm:w-auto"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Digital Skills Sub-Page</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/training/professional-development"
                    className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 sm:px-7 py-3.5 rounded-full font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-600/25 text-xs sm:text-sm min-h-[48px] w-full sm:w-auto"
                  >
                    <Briefcase className="w-4 h-4" />
                    <span>Professional & HSE Sub-Page</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/training"
                    className="inline-flex items-center justify-center gap-2 border border-white/20 hover:bg-white/5 text-white px-5 sm:px-6 py-3.5 rounded-full font-medium transition-colors text-xs sm:text-sm min-h-[48px] w-full sm:w-auto"
                  >
                    <GraduationCap className="w-4 h-4 text-mw-orange" />
                    <span>Academy Hub Overview</span>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 bg-white text-mw-dark hover:bg-mw-orange hover:text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl min-h-[48px] w-full sm:w-auto"
                  >
                    <span>Discuss Your Project</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/pricing"
                    className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/15 px-6 sm:px-7 py-3.5 sm:py-4 rounded-full font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all hover:scale-105 active:scale-95 min-h-[48px] w-full sm:w-auto"
                  >
                    <span>View Pricing Packages</span>
                  </Link>
                  <a
                    href={`https://wa.me/2348125082354?text=${encodeURIComponent(`Hello Mindware Consulting, I would like to inquire about your ${service.title} services.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-5 sm:px-6 py-3.5 sm:py-4 rounded-full font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg shadow-emerald-900/20 min-h-[48px] w-full sm:w-auto"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Inquiry</span>
                  </a>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </FadeInSection>

      {/* Metrics Banner */}
      {detail && (
        <section className="py-8 sm:py-10 border-b border-white/5 bg-white/[0.01]">
          <div className="container mx-auto px-4 sm:px-6 md:px-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 text-center">
              {detail.metrics.map((metric, i) => (
                <div key={i} className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold font-sans text-white mb-0.5 sm:mb-1">
                    {metric.value}
                  </div>
                  <div className="text-[11px] sm:text-xs md:text-sm font-semibold text-mw-orange mb-0.5 sm:mb-1">
                    {metric.label}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-white/50 leading-tight">
                    {metric.subtext}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Special Dedicated Section for Training (Dual Tracks) */}
      {isTraining && (
        <section className="py-12 sm:py-16 md:py-20 border-b border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent">
          <div className="container mx-auto px-4 sm:px-6 md:px-12">
            <div className="max-w-3xl mb-8 sm:mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-mw-orange px-3 py-1 rounded-full bg-mw-orange/10 border border-mw-orange/20">
                TWO ACCREDITED LEARNING PATHWAYS
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold font-display tracking-tight text-white mt-3 sm:mt-4 mb-3 sm:mb-4">
                Specialized Training Academies
              </h2>
              <p className="text-white/60 text-xs sm:text-base md:text-lg leading-relaxed font-light">
                To maximize learner outcomes and corporate workforce compliance, our academy is divided into two specialized tracks with dedicated curriculum pages.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
              {/* Track 1: Digital Skills */}
              <div className="p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/[0.04] to-mw-orange/5 border border-white/10 hover:border-mw-orange/40 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-mw-orange/20 text-mw-orange text-xs font-bold uppercase">
                      <Sparkles className="w-3.5 h-3.5" /> Sub-Page 1
                    </span>
                    <span className="text-[11px] sm:text-xs text-white/50">6 Core Programs</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3">
                    Digital Skills Training
                  </h3>
                  <p className="text-white/70 text-xs sm:text-sm md:text-base leading-relaxed mb-5 sm:mb-6 font-light">
                    Designed for individuals, creators, and freelancers seeking high-demand digital craft and commercial freelance or tech agency roles.
                  </p>

                  <div className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
                    {[
                      { title: "Web Design & Modern CMS", desc: "WordPress, Elementor, Figma UX, responsive layouts & e-commerce" },
                      { title: "Social Media Marketing & Paid Ads", desc: "Meta Ads, TikTok, LinkedIn B2B targeting, and conversion funnels" },
                      { title: "Video Editing & Content Production", desc: "Adobe Premiere Pro, CapCut Desktop, color grading & motion graphics" },
                      { title: "Data Analytics & Business Intelligence", desc: "Advanced Excel, SQL queries, Power BI DAX dashboards, and Python" },
                      { title: "Search Engine Optimization (SEO)", desc: "Technical audits, keyword intent, on-page optimization & local ranking" },
                      { title: "Full-Stack Web & Mobile App Development", desc: "React, TypeScript, Node.js APIs, MongoDB/PostgreSQL & Flutter apps" }
                    ].map((prog, pidx) => (
                      <div key={pidx} className="p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-white/[0.02] border border-white/5">
                        <div className="font-semibold text-white text-xs sm:text-sm">{prog.title}</div>
                        <div className="text-[11px] sm:text-xs text-white/50">{prog.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  to="/training/digital-skills"
                  className="inline-flex items-center justify-between w-full p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-mw-orange hover:bg-mw-orange-hover text-white text-xs sm:text-sm font-semibold transition-all shadow-lg shadow-mw-orange/20 min-h-[44px] active:scale-[0.99]"
                >
                  <span>Explore Digital Skills Sub-Page</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Track 2: Professional Development & HSE */}
              <div className="p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/[0.04] to-blue-900/10 border border-white/10 hover:border-blue-500/40 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase">
                      <Briefcase className="w-3.5 h-3.5" /> Sub-Page 2
                    </span>
                    <span className="text-[11px] sm:text-xs text-white/50">5 Accredited Certifications</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3">
                    Professional & Employability Skills
                  </h3>
                  <p className="text-white/70 text-xs sm:text-sm md:text-base leading-relaxed mb-5 sm:mb-6 font-light">
                    Designed for managers, site supervisors, HR professionals, and engineers requiring international accreditations and workplace excellence.
                  </p>

                  <div className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
                    {[
                      { title: "Project Management Professional (PMP®)", desc: "PMBOK® 7th Ed, Agile/Scrum, WBS, EVM, risk registers, 35 PDUs" },
                      { title: "Strategic Human Resources Management (HRM)", desc: "Nigerian Labour Act, PENCOM, NSITF, KPIs, talent acquisition & HR analytics" },
                      { title: "Customer Relationship Management (CRM)", desc: "HubSpot, Salesforce, pipeline automation, WhatsApp Business & CLV" },
                      { title: "Health, Safety & Environment (HSE Levels 1, 2, 3)", desc: "General safety, PTW hazard control, OSHA & ISO 45001/14001 audits" },
                      { title: "Workplace Employability & Leadership", desc: "Executive presentation, EQ, business proposals, and interview mastery" }
                    ].map((prog, pidx) => (
                      <div key={pidx} className="p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-white/[0.02] border border-white/5">
                        <div className="font-semibold text-white text-xs sm:text-sm">{prog.title}</div>
                        <div className="text-[11px] sm:text-xs text-white/50">{prog.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  to="/training/professional-development"
                  className="inline-flex items-center justify-between w-full p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold transition-all shadow-lg shadow-blue-600/20 min-h-[44px] active:scale-[0.99]"
                >
                  <span>Explore Professional & HSE Sub-Page</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Why Partner With Mindware */}
      {detail?.whyChooseUs && (
        <section className="py-12 sm:py-16 md:py-20 border-b border-white/5">
          <div className="container mx-auto px-4 sm:px-6 md:px-12">
            <div className="max-w-3xl mb-8 sm:mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-mw-orange px-3 py-1 rounded-full bg-mw-orange/10 border border-mw-orange/20">
                THE MINDWARE ADVANTAGE
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold font-display tracking-tight text-white mt-3 sm:mt-4 mb-3 sm:mb-4">
                Why Partner With Us for {service.title}
              </h2>
              <p className="text-white/60 text-xs sm:text-base md:text-lg font-light leading-relaxed">
                We combine technical rigor, commercial discipline, and measurable accountability into every project.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {detail.whyChooseUs.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all flex items-start gap-3 sm:gap-4"
                >
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-mw-orange/10 border border-mw-orange/20 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-mw-orange" />
                  </div>
                  <p className="text-white/80 text-xs sm:text-sm md:text-base leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Core Service Pillars & Capabilities */}
      {detail?.pillars && (
        <section className="py-12 sm:py-20 md:py-24 border-b border-white/5">
          <div className="container mx-auto px-4 sm:px-6 md:px-12">
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-mw-orange px-3 py-1 rounded-full bg-mw-orange/10 border border-mw-orange/20">
                CAPABILITY BLUEPRINT
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold font-display tracking-tight text-white mt-3 sm:mt-4 mb-3 sm:mb-4">
                What We Deliver
              </h2>
              <p className="text-white/60 text-xs sm:text-base md:text-lg font-light leading-relaxed">
                Comprehensive, end-to-end capabilities engineered to solve complex commercial challenges.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-5 sm:gap-8">
              {detail.pillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-white/[0.02] border border-white/10 hover:border-mw-orange/30 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
                      <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-mw-orange/10 border border-mw-orange/20 text-mw-orange flex items-center justify-center font-bold text-xs">
                        0{idx + 1}
                      </span>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                        {pillar.title}
                      </h3>
                    </div>
                    <p className="text-white/70 text-xs sm:text-sm md:text-base leading-relaxed mb-5 sm:mb-6 font-light">
                      {pillar.description}
                    </p>

                    <div className="space-y-2 sm:space-y-2.5 pt-4 border-t border-white/5">
                      {pillar.points.map((pt, pidx) => (
                        <div key={pidx} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/80">
                          <CheckCircle2 className="w-4 h-4 text-mw-orange shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Proven Phase-by-Phase Process */}
      {detail?.process && (
        <section className="py-12 sm:py-20 md:py-24 border-b border-white/5 bg-[#02040a]/40">
          <div className="container mx-auto px-4 sm:px-6 md:px-12">
            <div className="max-w-3xl mb-10 sm:mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-mw-orange px-3 py-1 rounded-full bg-mw-orange/10 border border-mw-orange/20">
                PROVEN METHODOLOGY
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold font-display tracking-tight text-white mt-3 sm:mt-4 mb-3 sm:mb-4">
                Our Execution Framework
              </h2>
              <p className="text-white/60 text-xs sm:text-base md:text-lg font-light leading-relaxed">
                How we take your project from strategic discovery to flawless execution and ongoing scale.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {detail.process.map((step, idx) => (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <span className="text-xs font-mono font-bold text-mw-orange px-2.5 py-1 rounded bg-mw-orange/10 border border-mw-orange/20">
                        {step.phase}
                      </span>
                      <span className="text-xs text-white/40 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {step.duration}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/60 leading-relaxed mb-5 sm:mb-6 font-light">
                      {step.description}
                    </p>
                  </div>

                  <div className="pt-3.5 sm:pt-4 border-t border-white/5">
                    <div className="text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-2">
                      Key Deliverables:
                    </div>
                    <ul className="space-y-1.5 text-xs text-white/70">
                      {step.deliverables.map((deliv, didx) => (
                        <li key={didx} className="flex items-start gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-mw-orange shrink-0 mt-1.5" />
                          <span>{deliv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Technologies & Tools Mastered */}
      {detail?.technologies && (
        <section className="py-10 sm:py-16 border-b border-white/5">
          <div className="container mx-auto px-4 sm:px-6 md:px-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
              <div className="max-w-md">
                <div className="text-xs font-bold uppercase tracking-wider text-white/50 mb-1">
                  TOOLS & ECOSYSTEM
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                  Technologies We Leverage
                </h3>
              </div>

              <div className="flex flex-wrap gap-2 sm:gap-2.5 flex-1 max-w-2xl md:justify-end">
                {detail.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm font-medium text-white/90"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Who This Is For & Deliverables Grid */}
      {detail?.idealFor && (
        <section className="py-12 sm:py-20 md:py-24 border-b border-white/5">
          <div className="container mx-auto px-4 sm:px-6 md:px-12">
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-12">
              {/* Ideal For */}
              <div className="p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-white/[0.02] border border-white/10">
                <div className="flex items-center gap-3 mb-5 sm:mb-6">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                    <Target className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                    Who This Service Is For
                  </h3>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  {detail.idealFor.map((target, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                      <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm md:text-base text-white/80 leading-relaxed">{target}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deliverables Summary */}
              <div className="p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-white/[0.02] border border-white/10">
                <div className="flex items-center gap-3 mb-5 sm:mb-6">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-mw-orange/10 border border-mw-orange/20 flex items-center justify-center text-mw-orange">
                    <Award className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                    Guaranteed Project Deliverables
                  </h3>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  {detail.deliverablesSummary.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                      <CheckCircle2 className="w-4 h-4 text-mw-orange shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm md:text-base text-white/80 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Relevant Portfolio & Case Studies Showcase */}
      {relatedProjects.length > 0 && !isTraining && (
        <section className="py-12 sm:py-20 md:py-24 border-b border-white/5 bg-white/[0.01]">
          <div className="container mx-auto px-4 sm:px-6 md:px-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-mw-orange px-3 py-1 rounded-full bg-mw-orange/10 border border-mw-orange/20">
                  REAL-WORLD PROOF
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold font-display tracking-tight text-white mt-3 sm:mt-4">
                  Featured Case Studies
                </h2>
              </div>
              <Link
                to="/portfolio/case-studies"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-mw-orange hover:text-white transition-colors"
              >
                <span>View All Case Studies</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {relatedProjects.map((project) => (
                <div
                  key={project.id}
                  className="group rounded-2xl border border-white/10 bg-white/[0.02] hover:border-white/20 overflow-hidden transition-all flex flex-col justify-between"
                >
                  <div className="p-5 sm:p-6">
                    <div className="flex items-center justify-between mb-3 text-xs text-white/50">
                      <span>{project.industry}</span>
                      <span className="text-mw-orange font-medium">{project.service}</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-mw-orange transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs font-semibold text-white/70 mb-3 sm:mb-4">
                      Client: {project.client}
                    </p>
                    <p className="text-xs text-white/60 line-clamp-3 leading-relaxed font-light">
                      {project.result}
                    </p>
                  </div>

                  <div className="p-4 pt-0">
                    <Link
                      to={`/portfolio/case-studies/${project.id}`}
                      className="inline-flex items-center justify-between w-full p-3 rounded-xl bg-white/5 hover:bg-mw-orange text-xs font-semibold text-white transition-all min-h-[44px]"
                    >
                      <span>Read Full Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Service-Specific FAQs */}
      {detail?.faqs && (
        <section className="py-12 sm:py-20 md:py-24 border-b border-white/5">
          <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-4xl">
            <div className="text-center mb-10 sm:mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-mw-orange px-3 py-1 rounded-full bg-mw-orange/10 border border-mw-orange/20">
                QUESTIONS & ANSWERS
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold font-display tracking-tight text-white mt-3 sm:mt-4 mb-3 sm:mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-white/60 text-xs sm:text-base md:text-lg font-light leading-relaxed">
                Common questions regarding deliverables, timelines, and technical scope.
              </p>
            </div>

            <div className="space-y-3.5 sm:space-y-4">
              {detail.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all"
                >
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2 sm:mb-3 flex items-start gap-2.5 sm:gap-3">
                    <HelpCircle className="w-5 h-5 text-mw-orange shrink-0 mt-0.5" />
                    <span>{faq.question}</span>
                  </h3>
                  <p className="text-white/70 text-xs sm:text-sm md:text-base leading-relaxed pl-7 sm:pl-8 font-light">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA Block */}
      <section className="py-14 sm:py-20 md:py-24 relative overflow-hidden bg-gradient-to-br from-mw-dark via-black to-mw-orange/10">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 text-center max-w-3xl">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold font-display text-white mb-4 sm:mb-6 tracking-tight leading-tight">
            Ready to Elevate Your {service.title}?
          </h2>
          <p className="text-white/70 text-sm sm:text-base md:text-xl mb-8 sm:mb-10 leading-relaxed font-light">
            Let's discuss your commercial goals, audit your current digital position, and map out a high-converting strategy.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-mw-dark hover:bg-mw-orange hover:text-white px-7 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl min-h-[48px] w-full sm:w-auto"
            >
              <span>Schedule Free Strategy Call</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/pricing"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all hover:scale-105 active:scale-95 min-h-[48px] w-full sm:w-auto"
            >
              <span>View Pricing Tiers</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Prev / Next Service & Back to Services Bottom Navigation Bar */}
      <nav aria-label="Services Navigation" className="py-6 sm:py-8 border-t border-white/10 bg-[#02040a]">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
            <Link
              to={`/services/${prevService.id}`}
              className="inline-flex items-center justify-start gap-2 text-xs sm:text-sm text-white/70 hover:text-white transition-colors py-2 px-3 rounded-lg bg-white/[0.02] sm:bg-transparent border border-white/5 sm:border-transparent min-h-[40px]"
            >
              <ArrowLeft className="w-4 h-4 text-mw-orange shrink-0" />
              <span>Previous: <strong className="text-white">{prevService.title}</strong></span>
            </Link>

            <Link
              to="/services"
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold transition-all hover:scale-105 min-h-[44px]"
            >
              <Layers className="w-4 h-4 text-mw-orange" />
              <span>Back to All Services</span>
            </Link>

            <Link
              to={`/services/${nextService.id}`}
              className="inline-flex items-center justify-end gap-2 text-xs sm:text-sm text-white/70 hover:text-white transition-colors py-2 px-3 rounded-lg bg-white/[0.02] sm:bg-transparent border border-white/5 sm:border-transparent min-h-[40px]"
            >
              <span>Next: <strong className="text-white">{nextService.title}</strong></span>
              <ArrowRight className="w-4 h-4 text-mw-orange shrink-0" />
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
