import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { EASE } from "../lib/utils";
import { FadeInSection } from "../components/FadeInSection";
import { INSIGHTS } from "../data/insights";

export function Insights() {
  

  return (
    <div className="bg-mw-dark">
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
              Mindware <br />
              Digital Growth <span className="text-gradient">Lab.</span>
            </h1>
            <p className="text-xl text-white/60 max-w-2xl leading-relaxed">
              Insights, strategies, and perspectives on navigating the digital economy and building businesses that scale.
            </p>
          </motion.div>
        </div>
      </FadeInSection>

      {/* Articles Grid */}
      <FadeInSection className="py-24">
        <h2 className="sr-only">Latest Articles</h2>
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {INSIGHTS.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="h-full"
              >
                <Link to={`/insights/${article.id}`} className="group cursor-pointer flex flex-col h-full">
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-6 bg-white/5">
                   <img 
                     src={article.image} 
                     alt={article.title}
                     loading="lazy"
                     decoding="async"
                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                   />
                   <div className="absolute inset-0 bg-mw-dark/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                
                <div className="flex items-center gap-4 text-xs font-medium text-white/60 mb-4">
                  <span className="text-mw-orange">{article.category}</span>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <span>{article.date}</span>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <span>{article.readTime}</span>
                </div>
                
                <h3 className="text-2xl font-bold mb-3 group-hover:text-mw-orange transition-colors leading-snug">
                  {article.title}
                </h3>
                
                <p className="text-white/60 mb-6 flex-grow">
                  {article.excerpt}
                </p>

                <div className="inline-flex items-center gap-2 text-sm font-medium mt-auto text-white group-hover:text-mw-orange transition-colors">
                  Read Article <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </div>
              </Link>
              </motion.div>
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
        className="py-24 border-t border-white/5 bg-white/5"
      >
        <div className="container mx-auto px-6 md:px-12 text-center max-w-3xl">
          <h2 className="text-4xl font-bold mb-6">Stay ahead of the curve.</h2>
          <p className="text-white/60 mb-8 text-lg">
            Join other ambitious business leaders receiving our latest insights on digital growth strategy.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <input 
              id="newsletter-email"
              name="newsletter-email"
              type="email" 
              required
              placeholder="Your email address" 
              className="flex-grow bg-mw-dark border border-white/10 rounded-full px-6 py-4 focus:outline-none focus:border-mw-orange focus:ring-1 focus:ring-mw-orange transition-all"
            />
            <button type="submit" className="bg-white text-mw-dark px-8 py-4 rounded-full font-medium transition-transform hover:scale-105 active:scale-95 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-mw-dark">
              Subscribe
            </button>
          </form>
        </div>
      </motion.section>
    </div>
  );
}
