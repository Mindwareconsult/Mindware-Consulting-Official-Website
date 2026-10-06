import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Compass, Users, Sparkles, Target, ShieldCheck, Video, Youtube } from "lucide-react";
import { METRICS } from "../data/content";
import { EASE } from "../lib/utils";
import { FadeInSection } from "../components/FadeInSection";
import { SEO } from "../components/SEO";
import { AboutSubNav } from "../components/about/AboutSubNav";

export function About() {
  return (
    <div className="bg-mw-dark">
      <SEO title="About Us | Mindware Consulting" description="Learn about Mindware Consulting, our corporate mission, long-term vision, core philosophy, executive leadership team, and verified client & student testimonials." />
      {/* Hero */}
      <FadeInSection className="pt-32 sm:pt-40 pb-16 sm:pb-20 border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-mw-orange/5 to-transparent blur-3xl mix-blend-screen" />
        <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mw-orange/10 border border-mw-orange/20 text-mw-orange text-xs font-semibold uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>About Mindware Consulting Ltd</span>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold font-display tracking-tight mb-4 sm:mb-8 leading-tight text-white">
              Mind + Technology <br />
              + <span className="text-gradient">Growth.</span>
            </h1>
            <p className="text-base sm:text-xl text-white/60 max-w-2xl leading-relaxed mb-8">
              We are a premium digital growth partner. We combine human thinking, strategic clarity, and modern technology to help ambitious businesses scale.
            </p>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                to="/about/mission-vision"
                className="inline-flex items-center gap-2 bg-white text-mw-dark px-5 sm:px-6 py-3 rounded-full text-xs sm:text-sm font-semibold hover:bg-mw-orange hover:text-white transition-all shadow-lg shadow-white/5"
              >
                <Compass className="w-4 h-4" />
                <span>Mission & Values</span>
              </Link>
              <Link
                to="/about/leadership"
                className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-5 sm:px-6 py-3 rounded-full text-xs sm:text-sm font-semibold transition-all"
              >
                <Users className="w-4 h-4 text-blue-400" />
                <span>Leadership Team</span>
              </Link>
              <Link
                to="/about/testimonials"
                className="inline-flex items-center gap-2 bg-red-600/10 hover:bg-red-600/20 text-red-400 border border-red-500/20 px-5 sm:px-6 py-3 rounded-full text-xs sm:text-sm font-semibold transition-all"
              >
                <Video className="w-4 h-4 text-red-400" />
                <span>Video Testimonials</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </FadeInSection>

      {/* Sticky About Sub-Navigation */}
      <AboutSubNav activeTab="overview" />

      {/* Sub-Pages Showcase Banner */}
      <section className="py-12 sm:py-16 bg-[#03060f] border-b border-white/5">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <div className="text-xs uppercase tracking-widest text-mw-orange font-bold font-mono mb-2">
            Explore Dedicated Sub-Pages
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
            Deep-Dive Into Our Institutional Fabric
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Sub-Page 1 Card */}
            <div className="p-7 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-mw-orange/40 transition-all flex flex-col justify-between group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-mw-orange/5 rounded-full blur-2xl pointer-events-none" />
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-mw-orange/10 border border-mw-orange/20 flex items-center justify-center text-mw-orange">
                    <Compass className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-mw-orange/10 text-mw-orange font-bold">
                    Sub-Page 1
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-mw-orange transition-colors">
                  Company Mission, Vision & Values
                </h3>
                <p className="text-xs text-white/60 leading-relaxed mb-5">
                  Detailed exploration of our commercial mission, our 2030 vision horizons, our 6 operational values, and the foundational "Mind + Technology + Growth" triad.
                </p>

                <div className="space-y-2 pt-3 border-t border-white/5">
                  <div className="flex items-center gap-2 text-xs text-white/70">
                    <CheckCircle2 className="w-3.5 h-3.5 text-mw-orange shrink-0" />
                    <span>Purpose Preceding Execution</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/70">
                    <CheckCircle2 className="w-3.5 h-3.5 text-mw-orange shrink-0" />
                    <span>3 Strategic Horizon Milestones</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-white/5">
                <Link
                  to="/about/mission-vision"
                  className="inline-flex items-center gap-2 text-xs font-bold text-mw-orange hover:text-white transition-colors"
                >
                  <span>Explore Mission & Values</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Sub-Page 2 Card */}
            <div className="p-7 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-blue-500/40 transition-all flex flex-col justify-between group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                    <Users className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 font-bold">
                    Sub-Page 2
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  Leadership & Management
                </h3>
                <p className="text-xs text-white/60 leading-relaxed mb-5">
                  Executive governance profiles including Founder & CEO Chike Onyekachukwu, departmental directors in engineering, growth marketing, and advisory counsel.
                </p>

                <div className="space-y-2 pt-3 border-t border-white/5">
                  <div className="flex items-center gap-2 text-xs text-white/70">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>Executive Leadership Profiles</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/70">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>Corporate Governance Mandates</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-white/5">
                <Link
                  to="/about/leadership"
                  className="inline-flex items-center gap-2 text-xs font-bold text-blue-400 hover:text-white transition-colors"
                >
                  <span>Meet Leadership Team</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Sub-Page 3 Card: Testimonials */}
            <div className="p-7 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-red-500/40 transition-all flex flex-col justify-between group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-red-600/5 rounded-full blur-2xl pointer-events-none" />
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-red-600/10 border border-red-500/20 flex items-center justify-center text-red-500">
                    <Video className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-red-500/10 text-red-400 font-bold">
                    Sub-Page 3
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                  Testimonials & Video Reviews
                </h3>
                <p className="text-xs text-white/60 leading-relaxed mb-5">
                  Watch authentic video reviews on YouTube from our digital agency clients and certified training academy graduates across two dedicated compartments.
                </p>

                <div className="space-y-2 pt-3 border-t border-white/5">
                  <div className="flex items-center gap-2 text-xs text-white/70">
                    <CheckCircle2 className="w-3.5 h-3.5 text-red-400 shrink-0" />
                    <span>Compartment 1: Agency Client Reviews</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/70">
                    <CheckCircle2 className="w-3.5 h-3.5 text-red-400 shrink-0" />
                    <span>Compartment 2: Academy Student Stories</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-white/5">
                <Link
                  to="/about/testimonials"
                  className="inline-flex items-center gap-2 text-xs font-bold text-red-400 hover:text-white transition-colors"
                >
                  <span>Watch Video Testimonials</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Metrics */}
      <FadeInSection className="py-12 sm:py-24 border-b border-white/5">
         <h2 className="sr-only">Our Impact Metrics</h2>
         <div className="container mx-auto px-4 sm:px-6 md:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
               {METRICS.map((metric, i) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                     <div className="text-3xl sm:text-5xl font-bold font-display text-mw-orange mb-2">{metric.value}</div>
                     <p className="text-white/60 font-medium text-xs sm:text-base">{metric.label}</p>
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
        className="py-12 sm:py-24 md:py-32"
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <div>
              <div className="text-xs uppercase tracking-widest text-mw-orange font-bold font-mono mb-2">Cognitive Strategy</div>
              <h2 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6">Our Growth Philosophy</h2>
              <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-white/60 leading-relaxed">
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

              <div className="mt-8">
                <Link
                  to="/about/mission-vision"
                  className="inline-flex items-center gap-2 text-mw-orange hover:text-white font-semibold text-sm group"
                >
                  <span>Explore Mission, Vision & Core Values in depth</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
            <div className="relative aspect-square md:aspect-[4/3] lg:aspect-square rounded-3xl overflow-hidden bg-white/5 border border-white/10">
              <img 
                src="/src/assets/images/values_innovation_culture_1790617210723.jpg" 
                alt="Mindware Consulting team strategizing digital growth"
                loading="lazy"
                decoding="async" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/src/assets/images/mission_hero_vision_1790617197716.jpg";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-mw-dark/80 via-transparent to-mw-orange/20 mix-blend-multiply" />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Leadership Preview */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 0.8, ease: EASE }}
        className="py-12 sm:py-24 md:py-32 bg-[#02040a] relative overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-mw-orange/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
          <div className="text-center mb-10 sm:mb-16 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 sm:mb-6">Leadership</h2>
            <p className="text-white/50 max-w-2xl mx-auto text-base sm:text-lg md:text-xl font-light">
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
                     e.currentTarget.src = "/src/assets/images/leadership_executive_team_1790617221909.jpg";
                  }}
                />
                
                {/* Gradient Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-mw-dark/95 via-mw-dark/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 md:p-8 transform md:translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                   <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-3">Chike Onyekachukwu</h3>
                   <div className="inline-block bg-mw-orange text-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-3 sm:mb-4 shadow-xl">
                      Founder / MD / CEO
                   </div>
                   <p className="text-white/80 text-xs sm:text-sm md:text-base leading-relaxed md:opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 mb-3 sm:mb-4">
                      Leading the vision to empower businesses with the strategy and technology needed to thrive in the digital economy.
                   </p>
                   <Link
                     to="/about/leadership"
                     className="inline-flex items-center gap-1.5 text-xs font-semibold text-mw-orange hover:text-white"
                   >
                     <span>View Full Executive Team & Advisory Board</span>
                     <ArrowRight className="w-3.5 h-3.5" />
                   </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <Link
              to="/about/leadership"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-5 sm:px-6 py-3 rounded-full text-xs sm:text-sm font-semibold transition-all text-center"
            >
              <Users className="w-4 h-4 text-mw-orange shrink-0" />
              <span>Explore Complete Leadership Sub-Page</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Why Choose Us */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 0.8, ease: EASE }}
        className="py-12 sm:py-24 md:py-32"
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <div className="text-center mb-10 sm:mb-16 max-w-3xl mx-auto">
             <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">Why Ambitious Brands Choose Us</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
             {[
               { title: "Strategic Clarity", desc: "We don't just execute tasks. We start with your business goals and build the roadmap to get there." },
               { title: "Integrated Approach", desc: "Design, technology, and marketing working together in a unified system, not in silos." },
               { title: "Measurable Impact", desc: "Everything we build is designed to be measured, optimized, and aligned with your bottom line." }
             ].map(item => (
                <div key={item.title} className="p-6 sm:p-8 rounded-2xl border border-white/10 bg-white/[0.02]">
                   <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8 text-mw-orange mb-4 sm:mb-6" />
                   <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4">{item.title}</h3>
                   <p className="text-white/60 text-sm sm:text-base leading-relaxed">{item.desc}</p>
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
        className="py-16 sm:py-24 border-t border-white/5"
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-12 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8">Ready to grow online?</h2>
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
