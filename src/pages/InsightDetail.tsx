import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { INSIGHTS } from "../data/insights";
import { FadeInSection } from "../components/FadeInSection";

export function InsightDetail() {
  const { id } = useParams();
  const article = INSIGHTS.find((a) => a.id === id);

  if (!article) {
    return (
      <div className="min-h-screen bg-mw-dark pt-40 pb-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-6 text-white">Article Not Found</h1>
          <Link to="/insights" className="text-mw-orange hover:text-white transition-colors inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Insights
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-mw-dark min-h-screen">
      {/* Hero Header */}
      <FadeInSection className="pt-32 md:pt-48 pb-16 md:pb-24 border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-mw-orange/5 to-transparent blur-3xl mix-blend-screen" />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <Link to="/insights" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8 md:mb-12 text-sm font-medium">
              <ArrowLeft className="w-4 h-4" /> Back to Insights
            </Link>
            
            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-white/60 mb-6 md:mb-8">
              <span className="text-mw-orange px-3 py-1 rounded-full bg-mw-orange/10 border border-mw-orange/20">{article.category}</span>
              <span>{article.date}</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span>{article.readTime}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-8 leading-tight">
              {article.title}
            </h1>
            <p className="text-xl text-white/70 leading-relaxed border-l-2 border-mw-orange pl-6">
              {article.excerpt}
            </p>
          </motion.div>
        </div>
      </FadeInSection>

      {/* Featured Image */}
      <FadeInSection className="py-12 md:py-16">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-5xl mx-auto aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden relative bg-white/5">
            <img 
              src={article.image} 
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </FadeInSection>

      {/* Article Content */}
      <FadeInSection className="pb-24 md:pb-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-3xl mx-auto space-y-8 md:space-y-10 text-white/80 text-lg md:text-xl leading-relaxed font-light">
            {article.content.map((block, idx) => {
              if (block.type === "heading") {
                return (
                  <h2 key={idx} className="text-2xl md:text-3xl font-bold text-white mt-16 mb-6">
                    {block.text}
                  </h2>
                );
              }
              return (
                <p key={idx}>
                  {block.text}
                </p>
              );
            })}
          </div>
        </div>
      </FadeInSection>

      {/* CTA Section */}
      <FadeInSection className="py-24 md:py-32 bg-[#02040a] relative overflow-hidden border-t border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-full bg-mw-orange/5 blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to apply these insights?</h2>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Stop leaving money on the table. Let our team of digital strategists help you implement the right systems to scale your business.
          </p>
          <Link 
            to="/contact" 
            className="inline-flex items-center gap-3 bg-mw-orange text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm transition-transform hover:scale-105 active:scale-95 shadow-[0_0_30px_-10px_rgba(249,115,22,0.4)]"
          >
            Start a Conversation <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </FadeInSection>
    </div>
  );
}
