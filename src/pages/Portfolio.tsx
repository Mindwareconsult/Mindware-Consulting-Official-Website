import { motion } from "motion/react";
import { PORTFOLIO } from "../data/content";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { EASE } from "../lib/utils";
import { FadeInSection } from "../components/FadeInSection";
import { SEO } from "../components/SEO";

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
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter mb-6 md:mb-8 leading-tight">
              Selected <span className="text-gradient">Work.</span>
            </h1>
            <p className="text-xl text-white/60 max-w-2xl leading-relaxed">
              We turn ideas and insights into action that people feel, use and remember. See how we've helped ambitious businesses grow.
            </p>
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
            {filteredPortfolio.map((project, i) => {
              const ContentWrapper = (project as any).link ? 'a' : 'div';
              const wrapperProps = (project as any).link ? { href: (project as any).link, target: "_blank", rel: "noopener noreferrer" } : {};
              
              return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <ContentWrapper {...wrapperProps} className="block">
                  <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-6 bg-white/5">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-mw-dark/20 group-hover:bg-transparent transition-colors duration-500" />
                    <div className="absolute top-6 right-6 w-12 h-12 bg-white text-mw-dark rounded-full flex items-center justify-center opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      <ArrowUpRight className="w-5 h-5" aria-hidden="true" />
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm font-medium text-mw-orange mb-3">
                    <span>{project.industry}</span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span className="text-white/60">{project.service}</span>
                  </div>
                  <h3 className="text-3xl font-bold mb-3 group-hover:text-mw-orange transition-colors">{project.title}</h3>
                  <p className="text-white/60 text-lg leading-relaxed">{project.challenge}</p>
                </ContentWrapper>
              </motion.article>
            )})}
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
          <Link
            to="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-mw-dark px-8 py-4 rounded-full font-medium transition-transform hover:scale-105 active:scale-95"
          >
            Start Your Project
          </Link>
        </div>
      </motion.section>
    </div>
  );
}
