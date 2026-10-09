import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { 
  ArrowUpRight, 
  Search, 
  Clock, 
  Calendar, 
  Tag, 
  Sparkles, 
  Check, 
  BookOpen, 
  TrendingUp,
  ArrowRight
} from "lucide-react";
import { EASE } from "../lib/utils";
import { FadeInSection } from "../components/FadeInSection";
import { INSIGHTS } from "../data/insights";
import { SEO } from "../components/SEO";

export function Insights() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Categories extraction
  const categories = useMemo(() => {
    const cats = Array.from(new Set(INSIGHTS.map((a) => a.category)));
    return ["all", ...cats];
  }, []);

  // Filtered insights
  const filteredInsights = useMemo(() => {
    return INSIGHTS.filter((article) => {
      const matchesCat = selectedCategory === "all" || article.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query);
      return matchesCat && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const featuredArticle = INSIGHTS[0];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setIsSubscribed(true);
      setNewsletterEmail("");
      setTimeout(() => setIsSubscribed(false), 5000);
    }
  };

  return (
    <div className="bg-mw-dark min-h-screen text-white selection:bg-mw-orange selection:text-white">
      <SEO 
        title="Insights & Digital Strategy Lab | Mindware Consulting" 
        description="High-impact perspectives, SEO architecture guides, and operational strategies for scaling modern enterprises." 
      />

      {/* Hero Section */}
      <FadeInSection className="pt-28 sm:pt-36 md:pt-44 pb-14 sm:pb-20 border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-3/5 h-full bg-gradient-to-l from-mw-orange/15 via-mw-orange/5 to-transparent blur-3xl mix-blend-screen pointer-events-none" />
        <div className="absolute top-1/4 left-5 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-mw-orange/10 border border-mw-orange/20 text-mw-orange text-xs font-bold uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Thought Leadership &amp; Engineering Perspectives</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold font-display tracking-tight mb-6 sm:mb-8 leading-[1.08] text-white">
              Mindware <br />
              Digital Growth <span className="text-gradient">Lab.</span>
            </h1>

            <p className="text-base sm:text-xl md:text-2xl text-white/70 max-w-2xl leading-relaxed font-light mb-8 sm:mb-10">
              Insights, actionable frameworks, and perspectives on navigating the modern digital economy, driving search visibility, and scaling commercial enterprises.
            </p>

            {/* Quick Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-xl">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-white/40 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles, topics, or keywords..."
                  className="w-full bg-white/[0.03] border border-white/10 rounded-full pl-11 pr-4 py-3 text-xs sm:text-sm text-white placeholder-white/40 focus:outline-none focus:border-mw-orange focus:bg-white/[0.06] transition-all min-h-[44px]"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-white/50 hover:text-white"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </FadeInSection>

      {/* Category Filter Tabs */}
      <section className="py-6 sm:py-8 border-b border-white/5 bg-[#030612]/60 sticky top-20 z-20 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap min-h-[40px] ${
                  selectedCategory === cat
                    ? "bg-mw-orange text-white shadow-lg shadow-mw-orange/20"
                    : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10"
                }`}
              >
                {cat === "all" ? "All Topics" : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Spotlight Featured Article (if no filter or matches) */}
      {selectedCategory === "all" && !searchQuery && featuredArticle && (
        <section className="py-12 sm:py-16 border-b border-white/5 bg-gradient-to-b from-white/[0.015] to-transparent">
          <div className="container mx-auto px-4 sm:px-6 md:px-12">
            <div className="mb-4 text-xs font-bold uppercase tracking-wider text-mw-orange flex items-center gap-2 font-mono">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Editor's Spotlight</span>
            </div>

            <Link
              to={`/insights/${featuredArticle.id}`}
              className="group grid lg:grid-cols-12 gap-8 items-center p-6 sm:p-8 md:p-12 rounded-3xl bg-[#080d1e] border border-white/10 hover:border-mw-orange/40 transition-all duration-500 shadow-2xl block"
            >
              <div className="lg:col-span-7 aspect-[16/10] rounded-2xl overflow-hidden bg-white/5 relative">
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-semibold text-white">
                  Featured Read
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-center">
                <div className="flex items-center gap-3 text-xs font-semibold text-white/50 mb-3">
                  <span className="text-mw-orange uppercase tracking-wider">{featuredArticle.category}</span>
                  <span>·</span>
                  <span>{featuredArticle.date}</span>
                  <span>·</span>
                  <span>{featuredArticle.readTime}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white group-hover:text-mw-orange transition-colors leading-tight">
                  {featuredArticle.title}
                </h2>

                <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-6 font-light">
                  {featuredArticle.excerpt}
                </p>

                <div className="inline-flex items-center gap-2 text-sm font-bold text-mw-orange group-hover:translate-x-1 transition-transform">
                  <span>Read Full Article</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="py-12 sm:py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          {filteredInsights.length === 0 ? (
            <div className="text-center py-20 p-8 rounded-3xl bg-white/[0.02] border border-white/10 max-w-lg mx-auto">
              <BookOpen className="w-12 h-12 text-white/30 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">No matching insights found</h3>
              <p className="text-sm text-white/60 mb-6">
                Try searching for different keywords or reset your topic filters.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="px-6 py-2.5 rounded-full bg-white text-mw-dark text-xs font-bold uppercase tracking-wider hover:bg-mw-orange hover:text-white transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredInsights.map((article, i) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, ease: EASE }}
                  className="h-full"
                >
                  <Link
                    to={`/insights/${article.id}`}
                    className="group flex flex-col h-full p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#080d1e] border border-white/10 hover:border-mw-orange/40 hover:bg-[#0c1228] transition-all duration-300 shadow-xl"
                  >
                    <div className="relative aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden mb-5 bg-white/5">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-mw-dark/20 group-hover:bg-transparent transition-colors duration-500" />
                    </div>
                    
                    <div className="flex items-center gap-3 text-xs font-medium text-white/60 mb-3">
                      <span className="text-mw-orange font-semibold uppercase tracking-wider">{article.category}</span>
                      <span className="w-1 h-1 rounded-full bg-white/20" />
                      <span>{article.date}</span>
                      <span className="w-1 h-1 rounded-full bg-white/20" />
                      <span>{article.readTime}</span>
                    </div>
                    
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 text-white group-hover:text-mw-orange transition-colors leading-snug">
                      {article.title}
                    </h3>
                    
                    <p className="text-white/60 text-xs sm:text-sm mb-6 flex-grow leading-relaxed">
                      {article.excerpt}
                    </p>

                    <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold mt-auto text-mw-orange group-hover:translate-x-1 transition-transform">
                      <span>Read Strategy</span>
                      <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Subscription CTA */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease: EASE }}
        className="py-16 sm:py-24 border-t border-white/5 bg-gradient-to-b from-[#060a17] to-mw-dark relative overflow-hidden"
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-12 text-center max-w-3xl relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-mw-orange/15 border border-mw-orange/30 flex items-center justify-center mx-auto mb-6 text-mw-orange">
            <Sparkles className="w-6 h-6" />
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-white tracking-tight">
            Stay Ahead of the Curve.
          </h2>
          <p className="text-white/70 mb-8 sm:mb-10 text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Join hundreds of forward-thinking business owners receiving our bi-weekly deep-dives on technical web performance, search algorithms, and commercial conversion.
          </p>

          {isSubscribed ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 font-semibold text-sm inline-flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>Thank you for subscribing! Your confirmation is on its way.</span>
            </motion.div>
          ) : (
            <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto" onSubmit={handleSubscribe}>
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input 
                id="newsletter-email"
                name="newsletter-email"
                type="email" 
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your corporate email address..." 
                className="flex-grow bg-white/[0.04] border border-white/10 rounded-full px-6 py-3.5 text-xs sm:text-sm text-white placeholder-white/40 focus:outline-none focus:border-mw-orange focus:ring-1 focus:ring-mw-orange transition-all min-h-[48px]"
              />
              <button
                type="submit" 
                className="bg-mw-orange hover:bg-orange-600 text-white px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-mw-orange/20 whitespace-nowrap min-h-[48px]"
              >
                Join Free
              </button>
            </form>
          )}

          <p className="text-[11px] text-white/40 mt-3">
            Zero spam. Unsubscribe anytime with a single click.
          </p>
        </div>
      </motion.section>
    </div>
  );
}

