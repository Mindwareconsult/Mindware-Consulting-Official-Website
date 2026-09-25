import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  TrendingUp,
  Clock,
  Layers,
  ShieldCheck,
  Globe,
  Quote,
  Zap,
  Target
} from "lucide-react";
import { getCaseStudyById, getAllCaseStudies } from "../data/caseStudies";
import { FadeInSection } from "../components/FadeInSection";
import { SEO } from "../components/SEO";
import { EASE } from "../lib/utils";

export function CaseStudyDetail() {
  const { id } = useParams<{ id: string }>();
  const study = id ? getCaseStudyById(id) : null;

  if (!study) {
    return (
      <div className="min-h-screen bg-mw-dark pt-40 pb-24 flex items-center justify-center text-white">
        <SEO title="Case Study Not Found | Mindware Consulting" description="The requested case study could not be found." />
        <div className="text-center px-6">
          <h1 className="text-4xl font-bold mb-4">Case Study Not Found</h1>
          <p className="text-white/60 mb-8 max-w-md mx-auto">
            The project case study you're looking for doesn't exist or may have been updated.
          </p>
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-2 bg-white text-mw-dark px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-mw-orange hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Explore All Case Studies</span>
          </Link>
        </div>
      </div>
    );
  }

  // Related / other case studies for bottom navigation
  const allStudies = getAllCaseStudies();
  const otherStudies = allStudies.filter((s) => s.id !== study.id).slice(0, 2);

  return (
    <div className="bg-mw-dark min-h-screen text-white">
      <SEO
        title={`${study.title} Case Study | ${study.client} | Mindware Consulting`}
        description={study.executiveSummary || study.challenge}
      />

      {/* Hero Header */}
      <FadeInSection className="pt-36 md:pt-48 pb-16 md:pb-24 border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-mw-orange/10 via-transparent to-transparent blur-3xl mix-blend-screen pointer-events-none" />
        <div className="absolute top-1/3 left-10 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="max-w-4xl"
          >
            {/* Breadcrumb / Back link */}
            <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-white/50 mb-8">
              <Link to="/case-studies" className="hover:text-mw-orange transition-colors inline-flex items-center gap-1.5">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Case Studies</span>
              </Link>
              <span>/</span>
              <span className="text-white/80 font-medium truncate">{study.client}</span>
            </div>

            {/* Industry & Service Pill */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wider text-mw-orange mb-6">
              <span className="px-3 py-1 rounded-full bg-mw-orange/10 border border-mw-orange/20">
                {study.industry}
              </span>
              <span className="text-white/40">·</span>
              <span className="text-white/70">{study.service}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
              {study.title}
            </h1>

            <p className="text-lg md:text-2xl text-white/70 font-light leading-relaxed mb-10 border-l-2 border-mw-orange pl-6">
              {study.tagline}
            </p>

            {/* Quick Details Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-6 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-sm">
              <div>
                <div className="text-[11px] uppercase tracking-wider text-white/40 mb-1">Client</div>
                <div className="text-sm md:text-base font-bold text-white">{study.client}</div>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-white/40 mb-1">Timeline</div>
                <div className="text-sm md:text-base font-bold text-white">{study.projectDuration}</div>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-white/40 mb-1">Industry</div>
                <div className="text-sm md:text-base font-bold text-white truncate">{study.industry}</div>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-white/40 mb-1">Live Platform</div>
                {study.link ? (
                  <a
                    href={study.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-mw-orange hover:text-white transition-colors"
                  >
                    <span>Visit Website</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="text-sm text-white/50">Private Portal</span>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </FadeInSection>

      {/* Visual Showcase */}
      <FadeInSection className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#02040a] p-4 md:p-8 flex items-center justify-center shadow-2xl">
            <div className="w-full max-w-4xl aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-2xl flex items-center justify-center bg-white/[0.02]">
              <img
                src={study.image}
                alt={`${study.title} showcase for ${study.client}`}
                className="w-full h-full object-contain"
              />
            </div>

            {study.link && (
              <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10">
                <a
                  href={study.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-mw-dark hover:bg-mw-orange hover:text-white px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-xl"
                >
                  <span>Launch Live Platform</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>
        </div>
      </FadeInSection>

      {/* Metrics Bar */}
      <FadeInSection className="py-12 border-y border-white/5 bg-[#030610]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {study.metrics.map((metric, i) => (
              <div key={i} className="text-center md:text-left">
                <div className="text-3xl md:text-5xl font-bold text-mw-orange tracking-tight mb-2">
                  {metric.value}
                </div>
                <div className="text-sm font-semibold text-white tracking-wide">{metric.label}</div>
                {metric.subtext && <div className="text-xs text-white/40 mt-1">{metric.subtext}</div>}
              </div>
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* The Challenge & Executive Summary */}
      <FadeInSection className="py-20 md:py-28">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-5">
              <div className="sticky top-28">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-mw-orange mb-4">
                  <Target className="w-4 h-4" />
                  <span>The Context & Obstacle</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
                  The Strategic Challenge.
                </h2>
                <p className="text-white/60 text-base md:text-lg leading-relaxed mb-8">
                  {study.executiveSummary}
                </p>

                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                  <div className="text-xs uppercase tracking-wider text-white/40 mb-2">Primary Objective</div>
                  <div className="text-sm font-medium text-white/90 leading-relaxed">
                    Transforming digital touchpoints from passive web brochures into high-converting commercial client acquisition engines.
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="p-8 rounded-3xl bg-[#0a0d14] border border-white/10">
                <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-3">
                  <Zap className="w-5 h-5 text-mw-orange" />
                  Key Pain Points Addressed
                </h3>
                <div className="space-y-4">
                  {study.challengeDetails.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.015] border border-white/5">
                      <div className="w-6 h-6 rounded-full bg-mw-orange/10 border border-mw-orange/20 flex items-center justify-center text-xs font-bold text-mw-orange shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <p className="text-white/70 text-sm md:text-base leading-relaxed">{detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* Strategic Approach & Solutions */}
      <FadeInSection className="py-20 md:py-28 bg-[#040814] border-t border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-mw-orange mb-4">
              <Layers className="w-4 h-4" />
              <span>Architectural Execution</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
              Our Strategic Solution.
            </h2>
            <p className="text-white/60 text-base md:text-lg leading-relaxed">
              {study.solution}
            </p>
          </div>

          {/* Strategy Steps Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {study.strategySteps.map((step, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl border border-white/10 bg-[#090d18] hover:border-white/20 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-mw-orange">Phase 0{idx + 1}</span>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold text-white/60">
                    {idx + 1}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{step.title}</h3>
                <p className="text-white/60 text-sm md:text-base leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>

          {/* Deliverables & Tech Stack */}
          <div className="grid lg:grid-cols-12 gap-8 p-8 md:p-12 rounded-3xl bg-[#090d18] border border-white/10">
            <div className="lg:col-span-7">
              <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-mw-orange" />
                Key Deliverables
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {study.keyDeliverables.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm text-white/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-mw-orange" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 lg:border-l lg:border-white/10 lg:pl-8">
              <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-mw-orange" />
                Core Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {study.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* Results & Business Outcomes */}
      <FadeInSection className="py-20 md:py-28 border-t border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-xs font-bold uppercase tracking-widest text-mw-orange mb-4 text-center">
              The Bottom Line
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-8 text-center leading-tight">
              Measurable Business Outcomes.
            </h2>
            <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/10 text-center mb-16">
              <p className="text-lg md:text-2xl text-white/90 leading-relaxed font-light">
                "{study.result}"
              </p>
            </div>

            {/* Testimonial if available */}
            {study.testimonial && (
              <div className="p-8 md:p-12 rounded-3xl bg-[#090d18] border border-white/10 relative overflow-hidden">
                <Quote className="w-12 h-12 text-mw-orange/20 absolute top-6 right-6 pointer-events-none" />
                <p className="text-lg md:text-xl text-white/90 italic leading-relaxed mb-6 relative z-10">
                  "{study.testimonial.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-mw-orange/20 border border-mw-orange/30 flex items-center justify-center text-mw-orange font-bold text-sm">
                    {study.testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">{study.testimonial.author}</div>
                    <div className="text-xs text-white/50">{study.testimonial.role}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </FadeInSection>

      {/* Browse Other Case Studies */}
      {otherStudies.length > 0 && (
        <FadeInSection className="py-20 border-t border-white/5 bg-[#02050e]">
          <div className="container mx-auto px-6 md:px-12">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold">More Case Studies</h3>
                <p className="text-white/50 text-sm mt-1">Discover other transformative projects we've engineered.</p>
              </div>
              <Link
                to="/case-studies"
                className="hidden sm:inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-mw-orange hover:text-white transition-colors"
              >
                <span>View All Studies</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {otherStudies.map((other) => (
                <Link
                  key={other.id}
                  to={`/case-studies/${other.id}`}
                  className="group p-6 rounded-3xl border border-white/10 bg-white/[0.015] hover:bg-white/[0.035] hover:border-white/20 transition-all duration-300 block"
                >
                  <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-black/40 mb-6 p-3 flex items-center justify-center">
                    <img
                      src={other.image}
                      alt={other.title}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="text-xs uppercase tracking-wider text-mw-orange font-semibold mb-2">
                    {other.industry}
                  </div>
                  <h4 className="text-xl font-bold text-white group-hover:text-mw-orange transition-colors mb-2">
                    {other.title}
                  </h4>
                  <p className="text-white/50 text-sm line-clamp-2">{other.challenge}</p>
                </Link>
              ))}
            </div>
          </div>
        </FadeInSection>
      )}

      {/* Bottom CTA */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 0.8, ease: EASE }}
        className="py-24 border-t border-white/5 text-center"
      >
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
            Ready to Achieve Similar Results?
          </h2>
          <p className="text-base md:text-lg text-white/60 max-w-xl mx-auto mb-10 leading-relaxed">
            Let's discuss how our web engineering, SEO strategies, and digital authority positioning can scale your enterprise.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-mw-dark hover:bg-mw-orange hover:text-white px-8 py-4 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-xl"
            >
              <span>Start Your Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/case-studies"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white px-8 py-4 rounded-full font-medium text-xs uppercase tracking-wider transition-colors"
            >
              <span>Back to All Case Studies</span>
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
