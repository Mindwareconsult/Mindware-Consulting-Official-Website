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
      <FadeInSection className="pt-40 pb-24 border-b border-white/5 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-mw-orange/5 to-transparent blur-3xl mix-blend-screen" />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-mw-orange/10 border border-mw-orange/20 text-xs font-semibold text-mw-orange uppercase tracking-wider mb-6">
              <Layers className="w-3.5 h-3.5" />
              <span>Selected Works & Platform Portfolio</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter mb-6 md:mb-8 leading-tight">
              Selected <span className="text-gradient">Work.</span>
            </h1>
            <p className="text-xl text-white/60 max-w-2xl leading-relaxed mb-8">
              We turn ideas and insights into action that people feel, use and remember. See how we've helped ambitious businesses grow.
            </p>

            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 text-sm font-semibold text-mw-orange hover:text-white transition-colors pb-1 border-b border-mw-orange/40 hover:border-white"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explore All In-Depth Case Studies & Technical Breakdowns</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </FadeInSection>

      {/* Filters & Grid */}
      <FadeInSection className="py-24">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="sr-only">Our Work</h2>
          
          <div className="flex flex-wrap gap-4 mb-16" role="group" aria-label="Filter portfolio by industry">
            {industries.map(ind => (
              <button
                key={ind}
                type="button"
                aria-pressed={filter === ind}
                onClick={() => setFilter(ind)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mw-orange focus-visible:ring-offset-2 focus-visible:ring-offset-mw-dark ${
                  filter === ind 
                    ? "bg-white text-mw-dark border-white" 
                    : "bg-transparent text-white/60 border-white/20 hover:border-white/40 hover:text-white"
                }`}
              >
                {ind}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-x-8 gap-y-12 md:gap-y-16">
            {filteredPortfolio.map((project, i) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: (i % 2) * 0.1, ease: EASE }}
                className="group rounded-3xl border border-white/10 bg-white/[0.015] hover:bg-white/[0.035] hover:border-white/20 p-6 md:p-8 transition-all duration-500 flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail linking to Case Study */}
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-white/5 flex items-center justify-center p-3">
                    <Link
                      to={`/case-studies/${project.id}`}
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
                      to={`/case-studies/${project.id}`}
                      className="absolute top-4 left-4 bg-[#02040a]/80 backdrop-blur-md border border-white/10 hover:border-mw-orange text-white px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-mw-orange" />
                      <span>Case Study</span>
                    </Link>

                    {/* External Link if exists */}
                    {(project as any).link && (
                      <a
                        href={(project as any).link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit live website for ${project.client}`}
                        className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white hover:text-mw-dark text-white rounded-full flex items-center justify-center transition-all duration-300 shadow-md"
                      >
                        <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                      </a>
                    )}
                  </div>

                  {/* Industry & Service meta */}
                  <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-wider text-mw-orange mb-3">
                    <span>{project.industry}</span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span className="text-white/60">{project.service}</span>
                  </div>

                  <div className="text-sm font-medium text-white/50 mb-1">{project.client}</div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-mw-orange transition-colors">
                    <Link to={`/case-studies/${project.id}`} className="hover:underline">
                      {project.title}
                    </Link>
                  </h3>
                  <p className="text-white/60 text-base leading-relaxed mb-6">{project.challenge}</p>

                  {(project as any).projectMetrics && (
                    <div className="pt-6 border-t border-white/10 flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <MetricChart value={(project as any).projectMetrics.growth} />
                        <div>
                          <div className="text-xs uppercase tracking-wider text-white/50">Growth</div>
                          <div className="text-lg font-bold text-mw-orange">+{(project as any).projectMetrics.growth}%</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs uppercase tracking-wider text-white/50">Duration</div>
                        <div className="text-lg font-bold text-white">{(project as any).projectMetrics.duration} Weeks</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Project Links & Tabs Bar */}
                <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                  <Link
                    to={`/case-studies/${project.id}`}
                    className="inline-flex items-center gap-2 bg-white text-mw-dark hover:bg-mw-orange hover:text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md group/btn"
                  >
                    <span>Read Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                  </Link>

                  {(project as any).link && (
                    <a
                      href={(project as any).link}
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
        className="py-24 border-t border-white/5"
      >
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to be our next success story?</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-mw-dark hover:bg-mw-orange hover:text-white px-8 py-4 rounded-full font-bold text-xs uppercase tracking-wider transition-all"
            >
              Start Your Project
            </Link>
            <Link
              to="/case-studies"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white px-8 py-4 rounded-full font-medium text-xs uppercase tracking-wider transition-colors"
            >
              Explore Case Studies
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
