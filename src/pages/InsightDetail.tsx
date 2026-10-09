import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { 
  ArrowLeft, 
  ArrowRight, 
  ArrowUpRight, 
  Share2, 
  Check, 
  Clock, 
  Calendar, 
  BookOpen, 
  Sparkles, 
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Bookmark
} from "lucide-react";
import { INSIGHTS } from "../data/insights";
import { FadeInSection } from "../components/FadeInSection";
import { SEO } from "../components/SEO";
import { EASE } from "../lib/utils";

export function InsightDetail() {
  const { id } = useParams<{ id: string }>();
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll to top on id change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const article = INSIGHTS.find((a) => a.id === id);

  if (!article) {
    return (
      <div className="min-h-screen bg-mw-dark pt-36 sm:pt-44 pb-24 flex items-center justify-center text-white px-4">
        <SEO title="Article Not Found | Mindware Consulting" description="The requested article could not be found." />
        <div className="text-center max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-mw-orange/10 border border-mw-orange/30 flex items-center justify-center mx-auto mb-6 text-mw-orange">
            <BookOpen className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold mb-3">Article Not Found</h1>
          <p className="text-white/60 mb-8 text-sm sm:text-base leading-relaxed">
            The perspective or strategy article you're seeking may have been archived or renamed.
          </p>
          <Link 
            to="/insights" 
            className="inline-flex items-center gap-2 bg-mw-orange text-white px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-orange-600 transition-colors shadow-lg shadow-mw-orange/20"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Insights Lab</span>
          </Link>
        </div>
      </div>
    );
  }

  // Find index for Prev/Next
  const currentIndex = INSIGHTS.findIndex((a) => a.id === article.id);
  const prevArticle = currentIndex > 0 ? INSIGHTS[currentIndex - 1] : INSIGHTS[INSIGHTS.length - 1];
  const nextArticle = currentIndex < INSIGHTS.length - 1 ? INSIGHTS[currentIndex + 1] : INSIGHTS[0];

  // Related articles (other than current)
  const relatedArticles = INSIGHTS.filter((a) => a.id !== article.id).slice(0, 2);

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } else if (navigator.share) {
      navigator.share({
        title: `${article.title} | Mindware Consulting`,
        url: window.location.href,
      }).catch(() => {});
    }
  };

  // Schema.org Article JSON-LD
  const schemaArticle = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "description": article.excerpt,
    "image": article.image,
    "datePublished": article.date,
    "author": {
      "@type": "Organization",
      "name": "Mindware Consulting Ltd",
      "url": "https://mindwareconsultingltd.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Mindware Consulting Ltd",
      "logo": {
        "@type": "ImageObject",
        "url": "https://mindwareconsultingltd.com/assets/images/logo.png"
      }
    }
  };

  return (
    <div className="bg-mw-dark min-h-screen text-white selection:bg-mw-orange selection:text-white">
      <SEO title={`${article.title} | Mindware Consulting`} description={article.excerpt} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaArticle) }}
      />

      {/* Reading Progress Indicator */}
      <div 
        className="fixed top-0 left-0 h-1 bg-mw-orange z-50 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Hero Header */}
      <FadeInSection className="pt-28 sm:pt-36 md:pt-44 pb-12 sm:pb-16 md:pb-20 border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-3/5 h-full bg-gradient-to-l from-mw-orange/15 via-mw-orange/5 to-transparent blur-3xl mix-blend-screen pointer-events-none" />
        <div className="absolute top-1/4 left-5 w-72 sm:w-96 h-72 sm:h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="max-w-4xl mx-auto"
          >
            {/* Top Bar: Back Link + Share */}
            <div className="flex items-center justify-between gap-4 mb-6 sm:mb-8 pb-4 border-b border-white/10">
              <Link 
                to="/insights" 
                className="inline-flex items-center gap-2 text-white/60 hover:text-mw-orange transition-colors text-xs font-semibold uppercase tracking-wider min-h-[36px]"
              >
                <ArrowLeft className="w-4 h-4" /> 
                <span>Back to All Insights</span>
              </Link>

              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white px-3 py-1.5 rounded-full text-xs font-medium transition-all min-h-[36px]"
                title="Share or copy article link"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-white/60" />
                    <span>Share Article</span>
                  </>
                )}
              </button>
            </div>
            
            {/* Metadata Pills */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs font-medium text-white/60 mb-5 sm:mb-6">
              <span className="text-mw-orange px-3.5 py-1 rounded-full bg-mw-orange/10 border border-mw-orange/20 font-bold uppercase tracking-wider text-[11px] sm:text-xs">
                {article.category}
              </span>
              <span className="flex items-center gap-1.5 text-white/70 text-[11px] sm:text-xs">
                <Calendar className="w-3.5 h-3.5 text-white/40" />
                {article.date}
              </span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="flex items-center gap-1.5 text-white/70 text-[11px] sm:text-xs">
                <Clock className="w-3.5 h-3.5 text-white/40" />
                {article.readTime}
              </span>
            </div>

            <h1 className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 sm:mb-8 leading-[1.1] text-white">
              {article.title}
            </h1>

            <p className="text-base sm:text-xl md:text-2xl text-white/80 leading-relaxed border-l-2 border-mw-orange pl-4 sm:pl-6 bg-gradient-to-r from-mw-orange/[0.04] to-transparent py-2 rounded-r-lg font-light">
              {article.excerpt}
            </p>
          </motion.div>
        </div>
      </FadeInSection>

      {/* Featured Image Canvas */}
      <FadeInSection className="py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <div className="max-w-4xl mx-auto aspect-[16/9] md:aspect-[21/9] rounded-2xl sm:rounded-3xl overflow-hidden relative bg-white/5 border border-white/10 shadow-2xl">
            <img 
              src={article.image} 
              alt={article.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </FadeInSection>

      {/* Article Content & Executive Box */}
      <FadeInSection className="pb-20 sm:pb-28">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <div className="max-w-3xl mx-auto">
            {/* Executive Summary Card */}
            <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#080d1e] border border-white/10 mb-10 sm:mb-14 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-mw-orange font-mono mb-3">
                <Bookmark className="w-4 h-4" />
                <span>Executive Takeaways</span>
              </div>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed font-light mb-4">
                Core implications for business executives and technical managers:
              </p>
              <ul className="space-y-2.5 text-xs sm:text-sm text-white/90">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Strategic friction in user flow directly suppresses commercial inquiry conversion.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Performance engineering and speed benchmarks are core search ranking signals.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Continuous iterative measurement outperforms periodic one-off redesigns.</span>
                </li>
              </ul>
            </div>

            {/* Main Content Blocks */}
            <div className="space-y-6 sm:space-y-8 text-white/80 text-base sm:text-lg leading-relaxed font-light">
              {article.content.map((block, idx) => {
                if (block.type === "heading") {
                  return (
                    <h2 key={idx} className="text-xl sm:text-2xl md:text-3xl font-bold text-white pt-6 sm:pt-10 mb-2 leading-tight">
                      {block.text}
                    </h2>
                  );
                }
                return (
                  <p key={idx} className="leading-relaxed">
                    {block.text}
                  </p>
                );
              })}
            </div>

            {/* Author Attribution Card */}
            <div className="mt-12 sm:mt-16 p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-mw-orange/20 border border-mw-orange/30 flex items-center justify-center text-mw-orange font-bold text-base shrink-0">
                MW
              </div>
              <div>
                <div className="text-sm font-bold text-white">Mindware Digital Research Group</div>
                <div className="text-xs text-white/50">Published by Mindware Consulting Ltd · Strategic Technology Advisory</div>
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* Prev / Next Article Navigation */}
      <section className="py-8 sm:py-12 border-t border-white/10 bg-[#02050f]">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {/* Prev */}
            <Link
              to={`/insights/${prevArticle.id}`}
              className="p-4 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-mw-orange/40 hover:bg-white/[0.04] transition-all duration-300 group flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-white/5 group-hover:bg-mw-orange group-hover:text-white transition-all flex items-center justify-center text-white/60 shrink-0">
                <ChevronLeft className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] uppercase tracking-wider text-white/40 font-mono">Previous Article</div>
                <div className="text-xs sm:text-sm font-bold text-white group-hover:text-mw-orange transition-colors truncate">
                  {prevArticle.title}
                </div>
                <div className="text-[11px] text-white/50 truncate">{prevArticle.category}</div>
              </div>
            </Link>

            {/* Next */}
            <Link
              to={`/insights/${nextArticle.id}`}
              className="p-4 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-mw-orange/40 hover:bg-white/[0.04] transition-all duration-300 group flex items-center justify-between gap-4 text-right"
            >
              <div className="min-w-0 flex-1">
                <div className="text-[10px] uppercase tracking-wider text-white/40 font-mono">Next Article</div>
                <div className="text-xs sm:text-sm font-bold text-white group-hover:text-mw-orange transition-colors truncate">
                  {nextArticle.title}
                </div>
                <div className="text-[11px] text-white/50 truncate">{nextArticle.category}</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/5 group-hover:bg-mw-orange group-hover:text-white transition-all flex items-center justify-center text-white/60 shrink-0">
                <ChevronRight className="w-5 h-5" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Related Insights Grid */}
      {relatedArticles.length > 0 && (
        <section className="py-14 sm:py-20 border-t border-white/5 bg-[#030612]">
          <div className="container mx-auto px-4 sm:px-6 md:px-12">
            <div className="max-w-4xl mx-auto mb-8 sm:mb-12 flex items-center justify-between">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold">Related Perspectives</h3>
                <p className="text-white/50 text-xs sm:text-sm mt-1">Explore other digital strategy guides from our research lab.</p>
              </div>
              <Link
                to="/insights"
                className="text-xs font-bold uppercase tracking-wider text-mw-orange hover:text-white transition-colors"
              >
                View All
              </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/insights/${rel.id}`}
                  className="group p-5 rounded-2xl bg-[#080d1e] border border-white/10 hover:border-mw-orange/40 transition-all block shadow-lg"
                >
                  <div className="aspect-[16/9] rounded-xl overflow-hidden bg-black/50 mb-4">
                    <img 
                      src={rel.image} 
                      alt={rel.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                      loading="lazy"
                    />
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-mw-orange font-bold mb-1">
                    {rel.category}
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-mw-orange transition-colors mb-2">
                    {rel.title}
                  </h4>
                  <p className="text-white/60 text-xs line-clamp-2">{rel.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <FadeInSection className="py-20 sm:py-28 bg-[#02040a] relative overflow-hidden border-t border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-full bg-mw-orange/5 blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10 text-center max-w-3xl">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 tracking-tight">
            Ready to Apply These Insights?
          </h2>
          <p className="text-white/70 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
            Stop losing qualified commercial demand to competitors. Let our technical engineering team architect your high-converting digital platform.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md sm:max-w-none mx-auto">
            <Link 
              to={`/contact?topic=${encodeURIComponent(article.title)}`} 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-mw-orange text-white px-8 py-3.5 sm:py-4 rounded-full font-bold uppercase tracking-wider text-xs transition-all hover:bg-orange-600 shadow-xl shadow-mw-orange/20 min-h-[48px]"
            >
              <span>Schedule Architecture Review</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/pricing"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white px-8 py-3.5 sm:py-4 rounded-full font-semibold uppercase tracking-wider text-xs transition-colors min-h-[48px]"
            >
              <span>Explore Growth Packages</span>
            </Link>
          </div>
        </div>
      </FadeInSection>
    </div>
  );
}

