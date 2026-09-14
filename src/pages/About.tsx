import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { METRICS } from "../data/content";
import { EASE } from "../lib/utils";
import { FadeInSection } from "../components/FadeInSection";

export function About() {
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
              Mind + Technology <br />
              + <span className="text-gradient">Growth.</span>
            </h1>
            <p className="text-xl text-white/60 max-w-2xl leading-relaxed">
              We are a premium digital growth partner. We combine human thinking, strategic clarity, and modern technology to help ambitious businesses scale.
            </p>
          </motion.div>
        </div>
      </FadeInSection>

      {/* Metrics */}
      <FadeInSection className="py-24 border-b border-white/5">
         <h2 className="sr-only">Our Impact Metrics</h2>
         <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
               {METRICS.map((metric, i) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                     <div className="text-5xl font-bold font-display text-mw-orange mb-2">{metric.value}</div>
                     <p className="text-white/60 font-medium">{metric.label}</p>
                  </motion.div>
               ))}
            </div>
         </div>
      </FadeInSection>

      {/* Philosophy */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 0.8, ease: EASE }}
        className="py-24 md:py-32"
      >
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Our Growth Philosophy</h2>
              <div className="space-y-6 text-lg text-white/60 leading-relaxed">
                <p>
                  We believe that simply "being online" is no longer a competitive advantage. In today's digital economy, businesses need a connected system that turns attention into opportunity.
                </p>
                <p>
                  Mindware Consulting was founded to bridge the gap between creative marketing and technical execution. We don't just build websites; we build the digital infrastructure that makes businesses visible, credible, and profitable.
                </p>
                <p>
                  Based in Nigeria, we bring world-class digital standards to local and global businesses, helping them navigate complexity and achieve measurable growth.
                </p>
              </div>
            </div>
            <div className="relative aspect-square md:aspect-[4/3] lg:aspect-square rounded-3xl overflow-hidden bg-white/5">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200" 
                alt="Mindware Consulting team strategizing digital growth"
                loading="lazy"
                decoding="async" 
                className="w-full h-full object-cover mix-blend-luminosity opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-mw-dark/80 via-transparent to-mw-orange/20 mix-blend-multiply" />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Leadership */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 0.8, ease: EASE }}
        className="py-24 md:py-32 bg-[#02040a] relative overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-mw-orange/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">Leadership</h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg md:text-xl font-light">
              Guiding our mission to empower businesses with transformative digital experiences.
            </p>
          </div>

          <div className="max-w-xl mx-auto relative group">
            {/* Beautiful Frame Glow */}
            <div className="absolute -inset-0.5 md:-inset-1 bg-gradient-to-br from-mw-orange via-orange-600/50 to-mw-dark rounded-3xl blur-md opacity-40 group-hover:opacity-100 transition duration-700" />
            
            <div className="relative bg-mw-dark rounded-3xl p-2 sm:p-3 border border-white/10 shadow-2xl overflow-hidden transition-all duration-500 group-hover:border-mw-orange/30 group-hover:-translate-y-2">
              {/* Image Box */}
              <div className="aspect-[4/5] sm:aspect-square md:aspect-[3/4] rounded-2xl overflow-hidden relative bg-[#0a0a0a]">
                <img 
                  src="/mindware-ceo.png" 
                  alt="Chike Onyekachukwu - Founder, MD and CEO"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                     e.currentTarget.src = "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800";
                  }}
                />
                
                {/* Gradient Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-mw-dark/95 via-mw-dark/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 transform md:translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                   <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">Chike Onyekachukwu</h3>
                   <div className="inline-block bg-mw-orange text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4 shadow-xl">
                      Founder / MD / CEO
                   </div>
                   <p className="text-white/80 text-sm md:text-base leading-relaxed md:opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      Leading the vision to empower businesses with the strategy and technology needed to thrive in the digital economy.
                   </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Why Choose Us */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 0.8, ease: EASE }}
        className="py-24 md:py-32"
      >
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16 max-w-3xl mx-auto">
             <h2 className="text-4xl font-bold mb-6">Why Ambitious Brands Choose Us</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
             {[
               { title: "Strategic Clarity", desc: "We don't just execute tasks. We start with your business goals and build the roadmap to get there." },
               { title: "Integrated Approach", desc: "Design, technology, and marketing working together in a unified system, not in silos." },
               { title: "Measurable Impact", desc: "Everything we build is designed to be measured, optimized, and aligned with your bottom line." }
             ].map(item => (
                <div key={item.title} className="p-8 rounded-2xl border border-white/10 bg-white/[0.02]">
                   <CheckCircle2 className="w-8 h-8 text-mw-orange mb-6" />
                   <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                   <p className="text-white/60">{item.desc}</p>
                </div>
             ))}
          </div>
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 0.8, ease: EASE }}
        className="py-24 border-t border-white/5"
      >
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to grow online?</h2>
          <Link
            to="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-mw-dark px-8 py-4 rounded-full font-medium transition-transform hover:scale-105 active:scale-95"
          >
            Let's Talk About Your Project <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.section>
    </div>
  );
}
