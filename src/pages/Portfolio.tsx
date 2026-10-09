import { motion } from "motion/react";
import { PORTFOLIO } from "../data/content";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, BookOpen, Layers } from "lucide-react";
import { useState } from "react";
import { EASE } from "../lib/utils";
import { FadeInSection } from "../components/FadeInSection";
import { SEO } from "../components/SEO";
import { MetricChart } from "../components/MetricChart";

export function Portfolio() {
  const [filter, setFilter] = useState("All");
  
  const industries = ["All", ...new Set(PORTFOLIO.map(p => p.industry))];

  const filteredPortfolio = filter === "All" 
    ? PORTFOLIO 
    : PORTFOLIO.filter(p => p.industry === filter);

  return (
    <div className="bg-mw-dark">
      <SEO title="Portfolio | Mindware Consulting" description="Explore our recent projects and success stories." />
      {/* Hero */}
      <FadeInSection className="pt-28 sm:pt-36 md:pt-40 pb-12 sm:pb-16 md:pb-24 border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-mw-orange/5 to-transparent blur-3xl mix-blend-screen pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-mw-orange/10 border border-mw-orange/20 text-xs font-semibold text-mw-orange uppercase tracking-wider mb-4 sm:mb-6">
              <Layers className="w-3.5 h-3.5 shrink-0" />
              <span>Selected Works & Platform Portfolio</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold font-display tracking-tight mb-4 sm:mb-6 md:mb-8 leading-tight text-white">
              Selected <span className="text-gradient">Work.</span>
            </h1>
            <p className="text-base sm:text-xl text-white/70 max-w-2xl leading-relaxed mb-6 sm:mb-8">
              We turn ideas and insights into action that people feel, use and remember. See how we've helped ambitious businesses grow across the UK and internationally.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <Link
                to="/portfolio/case-studies"
                className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-mw-orange hover:text-white transition-colors py-2.5 sm:py-1 px-4 sm:px-0 rounded-xl sm:rounded-none bg-mw-orange/10 sm:bg-transparent border border-mw-orange/30 sm:border-0 sm:border-b sm:border-mw-orange/40 hover:border-white w-full sm:w-auto"
              >
                <BookOpen className="w-4 h-4 shrink-0" />
                <span className="text-center">Explore Case Studies & Technical Breakdowns</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </Link>
            </div>
          </motion.div>
        </div>
      </FadeInSection>

      {/* Portfolio Subpage Navigation Bar */}
      <div className="bg-[#040812]/95 border-b border-white/10 sticky top-[60px] sm:top-[68px] z-30 backdrop-blur-xl">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 py-2 sm:py-3 flex items-center justify-start sm:justify-between gap-2.5 sm:gap-4 overflow-x-auto scrollbar-none touch-pan-x">
          <div className="hidden sm:flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/40 shrink-0">
            <span>Portfolio Sections:</span>
          </div>
          <div className="flex items-center gap-2 shrink-0 py-0.5">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-mw-dark shadow-sm transition-all shrink-0 min-h-[36px]"
            >
              <Layers className="w-3.5 h-3.5 text-mw-dark shrink-0" />
              <span>Selected Works</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-mw-dark/10 text-mw-dark font-mono font-bold">
                {PORTFOLIO.length}
              </span>
            </Link>

            <Link
              to="/portfolio/case-studies"
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white/70 hover:text-white hover:bg-white/5 border border-white/10 hover:border-white/20 transition-all shrink-0 min-h-[36px]"
            >
              <BookOpen className="w-3.5 h-3.5 text-mw-orange shrink-0" />
              <span>Case Studies</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-mw-orange/20 text-mw-orange font-bold">
                Subpage
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Filters & Grid */}
      <FadeInSection className="py-12 sm:py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <h2 className="sr-only">Our Work</h2>
          
          {/* Horizontal scrollable industry pills with smooth touch dragging and visual indicator */}
          <div className="relative mb-8 sm:mb-12 md:mb-16">
            <div 
              className="flex overflow-x-auto pb-2 scrollbar-none gap-2 sm:gap-3 flex-nowrap sm:flex-wrap touch-pan-x -mx-4 px-4 sm:mx-0 sm:px-0" 
              role="group" 
              aria-label="Filter portfolio by industry"
            >
              {industries.map(ind => (
                <button
                  key={ind}
                  type="button"
                  aria-pressed={filter === ind}
                  onClick={() => setFilter(ind)}
                  className={`px-4 sm:px-5 md:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors border whitespace-nowrap shrink-0 min-h-[40px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mw-orange focus-visible:ring-offset-2 focus-visible:ring-offset-mw-dark ${
                    filter === ind 
                      ? "bg-white text-mw-dark border-white font-semibold shadow-sm" 
                      : "bg-white/[0.03] text-white/70 border-white/15 hover:border-white/40 hover:text-white"
                  }`}
                >
                  {ind}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-x-8 md:gap-y-16">
            {filteredPortfolio.map((project, i) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: (i % 2) * 0.1, ease: EASE }}
                className="group rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.015] hover:bg-white/[0.035] hover:border-white/20 p-4 sm:p-6 md:p-8 transition-all duration-500 flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail linking to Case Study */}
                  <div className="relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden mb-5 sm:mb-6 bg-white/5 flex items-center justify-center p-2.5 sm:p-3">
                    <Link
                      to={`/portfolio/case-studies/${project.id}`}
                      aria-label={`Read case study for ${project.title}`}
                      className="w-full h-full flex items-center justify-center block"
                    >
                      <img 
                        src={project.image} 
                        alt={`Portfolio preview showing ${project.title} designed for ${project.client}`}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                      />
                    </Link>
                    <div className="absolute inset-0 bg-mw-dark/20 group-hover:bg-transparent pointer-events-none transition-colors duration-500" />
                    
                    {/* Floating Tab linking directly to Case Study */}
                    <Link
                      to={`/portfolio/case-studies/${project.id}`}
                      className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-[#02040a]/85 backdrop-blur-md border border-white/10 hover:border-mw-orange text-white px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-md"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-mw-orange shrink-0" />
                      <span>Case Study</span>
                    </Link>

                    {/* External Link if exists */}
                    {(project as any).link && (
                      <a
                        href={(project as any).link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit live website for ${project.client}`}
                        className="absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 sm:w-10 sm:h-10 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white hover:text-mw-dark text-white rounded-full flex items-center justify-center transition-all duration-300 shadow-md min-w-[36px] min-h-[36px]"
                      >
                        <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                      </a>
                    )}
                  </div>

                  {/* Industry & Service meta */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-semibold uppercase tracking-wider text-mw-orange mb-2 sm:mb-3">
                    <span>{project.industry}</span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span className="text-white/60">{project.service}</span>
                  </div>

                  <div className="text-xs sm:text-sm font-medium text-white/50 mb-1">{project.client}</div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2.5 sm:mb-3 text-white group-hover:text-mw-orange transition-colors">
                    <Link to={`/portfolio/case-studies/${project.id}`} className="hover:underline">
                      {project.title}
                    </Link>
                  </h3>
                  <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-5 sm:mb-6">{project.challenge}</p>

                  {(project as any).projectMetrics && (
                    <div className="pt-4 sm:pt-6 border-t border-white/10 flex items-center justify-between gap-3 mb-5 sm:mb-6 bg-white/[0.02] sm:bg-transparent -mx-2 sm:mx-0 px-3 py-2 sm:px-0 sm:py-0 rounded-xl sm:rounded-none">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <MetricChart value={(project as any).projectMetrics.growth} />
                        <div>
                          <div className="text-[10px] sm:text-xs uppercase tracking-wider text-white/50">Growth</div>
                          <div className="text-base sm:text-lg font-bold text-mw-orange">+{(project as any).projectMetrics.growth}%</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] sm:text-xs uppercase tracking-wider text-white/50">Duration</div>
                        <div className="text-base sm:text-lg font-bold text-white">{(project as any).projectMetrics.duration} Wks</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Project Links & Tabs Bar */}
                <div className="pt-4 sm:pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <Link
                    to={`/portfolio/case-studies/${project.id}`}
                    className="inline-flex items-center justify-center gap-2 bg-white text-mw-dark hover:bg-mw-orange hover:text-white px-5 py-3 sm:py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md group/btn min-h-[44px] w-full sm:w-auto"
                  >
                    <span>Read Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                  </Link>

                  {(project as any).link && (
                    <a
                      href={(project as any).link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center sm:justify-start gap-1.5 text-xs font-semibold text-white/70 hover:text-white transition-colors py-1.5 min-h-[36px]"
                    >
                      <span>Visit Live Site</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
          
        </div>
      </FadeInSection>

      {/* CTA */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 0.8, ease: EASE }}
        className="py-14 sm:py-20 md:py-24 border-t border-white/5 bg-gradient-to-b from-transparent to-white/[0.02]"
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-12 text-center">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-8 text-white">
            Ready to be our next success story?
          </h2>
          <p className="text-sm sm:text-base text-white/60 max-w-xl mx-auto mb-6 sm:mb-8">
            Let's discuss how our design, development, and strategic digital services can elevate your business.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto">
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-mw-dark hover:bg-mw-orange hover:text-white px-8 py-3.5 sm:py-4 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-lg min-h-[48px]"
            >
              Start Your Project
            </Link>
            <Link
              to="/portfolio/case-studies"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white px-8 py-3.5 sm:py-4 rounded-full font-medium text-xs uppercase tracking-wider transition-colors min-h-[48px]"
            >
              Explore Case Studies
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
