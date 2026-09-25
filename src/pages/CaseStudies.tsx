import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight, CheckCircle2, TrendingUp, Clock, Layers, Award } from "lucide-react";
import { getAllCaseStudies } from "../data/caseStudies";
import { FadeInSection } from "../components/FadeInSection";
import { SEO } from "../components/SEO";
import { EASE } from "../lib/utils";

export function CaseStudies() {
  const caseStudies = getAllCaseStudies();
  const [activeFilter, setActiveFilter] = useState("All");

  const industries = ["All", ...new Set(caseStudies.map((c) => c.industry))];

  const filteredStudies = activeFilter === "All"
    ? caseStudies
    : caseStudies.filter((c) => c.industry === activeFilter);

  return (
    <div className="bg-mw-dark min-h-screen text-white">
      <SEO
        title="Case Studies & Success Stories | Mindware Consulting"
        description="Discover how Mindware Consulting builds high-impact digital platforms, structural SEO strategies, and custom software that drive measurable revenue and market authority."
      />

      {/* Hero Header */}
      <FadeInSection className="pt-36 md:pt-48 pb-20 md:pb-28 border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-mw-orange/10 via-transparent to-transparent blur-3xl mix-blend-screen pointer-events-none" />
        <div className="absolute -bottom-24 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-mw-orange/10 border border-mw-orange/20 text-xs font-semibold text-mw-orange uppercase tracking-wider mb-6">
              <Award className="w-3.5 h-3.5" />
              <span>Proven Outcomes & Case Studies</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.08]">
              Engineered for Growth. <br />
              <span className="text-gradient">Validated by Data.</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/60 font-light leading-relaxed max-w-3xl mb-12">
              Every business has unique operational realities. Explore our in-depth case studies documenting how we translate strategic clarity into custom digital platforms, technical SEO, and rapid revenue expansion.
            </p>

            {/* Quick Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-white/10">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-white tracking-tight">150+</div>
                <div className="text-xs uppercase tracking-wider text-white/50 mt-1">Platforms Delivered</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-mw-orange tracking-tight">300%</div>
                <div className="text-xs uppercase tracking-wider text-white/50 mt-1">Average Client ROI</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-white tracking-tight">85%+</div>
                <div className="text-xs uppercase tracking-wider text-white/50 mt-1">Avg Search Lift</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-mw-orange tracking-tight">100%</div>
                <div className="text-xs uppercase tracking-wider text-white/50 mt-1">On-Time Delivery</div>
              </div>
            </div>
          </motion.div>
        </div>
      </FadeInSection>

      {/* Filter Tabs & Case Studies Grid */}
      <FadeInSection className="py-20 md:py-28">
        <div className="container mx-auto px-6 md:px-12">
          {/* Header Controls */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16 pb-8 border-b border-white/10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">All Case Studies ({filteredStudies.length})</h2>
              <p className="text-white/50 text-sm mt-1">Detailed breakdowns of architecture, challenges, and measurable results.</p>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter case studies by industry">
              {industries.map((ind) => (
                <button
                  key={ind}
                  type="button"
                  aria-pressed={activeFilter === ind}
                  onClick={() => setActiveFilter(ind)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mw-orange ${
                    activeFilter === ind
                      ? "bg-white text-mw-dark border-white shadow-lg shadow-white/10"
                      : "bg-white/5 text-white/60 border-white/10 hover:border-white/30 hover:text-white"
                  }`}
                >
                  {ind}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {filteredStudies.map((study, index) => {
              const highlightMetric = study.metrics?.[0] || { label: "Performance", value: "+85%" };

              return (
                <motion.article
                  key={study.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: (index % 2) * 0.1, ease: EASE }}
                  className="group rounded-3xl border border-white/10 bg-[#0a0d14] hover:bg-[#0f1420] hover:border-white/20 transition-all duration-500 overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    {/* Visual Preview Container */}
                    <div className="relative aspect-[16/10] bg-[#02040a] overflow-hidden flex items-center justify-center p-4 border-b border-white/5">
                      <img
                        src={study.image}
                        alt={`${study.title} for ${study.client}`}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-mw-dark/20 group-hover:bg-transparent transition-colors duration-500" />

                      {/* Top Metric Tag */}
                      <div className="absolute top-4 left-4 bg-[#02040a]/80 backdrop-blur-md border border-white/10 px-3.5 py-1.5 rounded-full flex items-center gap-2">
                        <TrendingUp className="w-3.5 h-3.5 text-mw-orange" />
                        <span className="text-xs font-bold text-white tracking-wide">
                          {highlightMetric.value} {highlightMetric.label}
                        </span>
                      </div>

                      {study.link && (
                        <a
                          href={study.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Visit live website for ${study.client}`}
                          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-mw-dark transition-all duration-300 shadow-md"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                      )}
                    </div>

                    {/* Content Body */}
                    <div className="p-6 md:p-8">
                      {/* Meta info */}
                      <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-mw-orange mb-3">
                        <span>{study.industry}</span>
                        <span className="w-1 h-1 rounded-full bg-white/20" />
                        <span className="text-white/50">{study.service}</span>
                      </div>

                      <div className="text-sm font-medium text-white/50 mb-1">{study.client}</div>
                      <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 group-hover:text-mw-orange transition-colors">
                        <Link to={`/case-studies/${study.id}`} className="hover:underline">
                          {study.title}
                        </Link>
                      </h3>

                      <p className="text-white/60 text-sm md:text-base leading-relaxed mb-6 line-clamp-3">
                        {study.challenge}
                      </p>

                      {/* Highlights */}
                      <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-white/10 mb-6 bg-white/[0.015] rounded-xl px-4">
                        <div className="flex items-center gap-3">
                          <TrendingUp className="w-4 h-4 text-mw-orange shrink-0" />
                          <div>
                            <div className="text-[10px] uppercase tracking-wider text-white/40">Growth Metric</div>
                            <div className="text-sm font-bold text-white">{study.metrics[0]?.value || "+85%"}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Clock className="w-4 h-4 text-white/60 shrink-0" />
                          <div>
                            <div className="text-[10px] uppercase tracking-wider text-white/40">Turnaround</div>
                            <div className="text-sm font-bold text-white">{study.projectDuration}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="px-6 md:px-8 pb-8 pt-0 flex flex-wrap items-center justify-between gap-4">
                    <Link
                      to={`/case-studies/${study.id}`}
                      className="inline-flex items-center gap-2 bg-white text-mw-dark hover:bg-mw-orange hover:text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md group/btn"
                    >
                      <span>Read Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                    </Link>

                    {study.link && (
                      <a
                        href={study.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/60 hover:text-white transition-colors"
                      >
                        <span>Visit Live Site</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </FadeInSection>

      {/* Methodology Section */}
      <FadeInSection className="py-24 border-t border-white/5 bg-[#030712]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-3xl mb-16">
            <div className="text-xs font-bold uppercase tracking-widest text-mw-orange mb-3">Our Framework</div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              How Every Project Achieves Repeatable Commercial Success.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02]">
              <div className="w-12 h-12 rounded-xl bg-mw-orange/10 border border-mw-orange/20 flex items-center justify-center text-mw-orange font-bold text-lg mb-6">
                01
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Strategic Deep-Dive</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                We dissect industry competitive dynamics, identify untapped search intent, and architect an information flow that immediately communicates authority.
              </p>
            </div>

            <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02]">
              <div className="w-12 h-12 rounded-xl bg-mw-orange/10 border border-mw-orange/20 flex items-center justify-center text-mw-orange font-bold text-lg mb-6">
                02
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Precision Engineering</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                No templates or bloat. We engineer lightning-fast modern web applications with sub-second response times, immaculate typography, and frictionless UX.
              </p>
            </div>

            <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02]">
              <div className="w-12 h-12 rounded-xl bg-mw-orange/10 border border-mw-orange/20 flex items-center justify-center text-mw-orange font-bold text-lg mb-6">
                03
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Commercial Conversion</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Direct WhatsApp integration, frictionless RFQ funnels, and enterprise Schema.org SEO transform everyday organic traffic into lucrative contract opportunities.
              </p>
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* Bottom CTA */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 0.8, ease: EASE }}
        className="py-28 border-t border-white/5 relative overflow-hidden"
      >
        <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Ready to Build Your Success Story?
          </h2>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            Let's design and engineer an authoritative digital platform that outperforms competitors and accelerates your commercial growth.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white text-mw-dark hover:bg-mw-orange hover:text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-xl"
            >
              <span>Schedule Strategic Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/pricing"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white px-8 py-4 rounded-full font-medium text-sm transition-colors"
            >
              <span>View Pricing Plans</span>
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
