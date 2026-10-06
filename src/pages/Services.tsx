import { motion } from "motion/react";
import { SERVICES } from "../data/content";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Briefcase, GraduationCap, MapPin, Building2, MessageSquare, CheckCircle2 } from "lucide-react";
import { EASE } from "../lib/utils";
import { FadeInSection } from "../components/FadeInSection";
import { SEO } from "../components/SEO";

export function Services() {
  return (
    <div className="bg-mw-dark">
      <SEO title="Our Services | Mindware Consulting" description="Explore the digital growth, engineering, and workforce training services we offer." />
      {/* Hero */}
      <FadeInSection className="pt-40 pb-24 border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-mw-orange/5 to-transparent blur-3xl mix-blend-screen" />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-xs font-semibold text-white/80 uppercase tracking-wider mb-6">
              <span>Enterprise Agency Capabilities</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold font-display tracking-tight mb-6 md:mb-8 leading-tight text-white">
              Technology That <br />
              Works For <span className="text-gradient">People.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed">
              We design the digital systems businesses need to become visible, credible and easier to buy from. Explore our core capabilities.
            </p>
          </motion.div>
        </div>
      </FadeInSection>

      {/* Services List */}
      <FadeInSection className="py-24">
        <h2 className="sr-only">Our Core Capabilities</h2>
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16 lg:gap-y-24">
            {SERVICES.map((service, i) => {
              const Icon = service.icon;
              const isTraining = service.id === "training";

              if (isTraining) {
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: (i % 2) * 0.1, ease: EASE }}
                    className="group relative lg:col-span-2 p-8 md:p-12 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.03] via-black/40 to-mw-orange/[0.04] hover:border-mw-orange/40 transition-all duration-500"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 mb-8">
                      <div className="max-w-3xl">
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          <div className="w-14 h-14 rounded-2xl bg-mw-orange/10 border border-mw-orange/20 flex items-center justify-center">
                            <GraduationCap className="w-7 h-7 text-mw-orange" />
                          </div>
                          <span className="px-3.5 py-1 rounded-full bg-mw-orange/20 border border-mw-orange/30 text-mw-orange text-xs font-bold uppercase tracking-wider">
                            Divided Into 2 Specialized Sub-Pages
                          </span>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">{service.title}</h3>
                        <p className="text-xl font-medium text-mw-orange mb-4">{service.tagline}</p>
                        <p className="text-white/70 leading-relaxed text-base max-w-3xl">
                          {service.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap sm:flex-col gap-3 shrink-0">
                        <Link
                          to="/training"
                          className="inline-flex items-center justify-center gap-2 bg-white text-mw-dark font-semibold text-xs md:text-sm px-6 py-3 rounded-full hover:bg-white/90 transition-all shadow-lg"
                        >
                          <span>Academy Hub</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                          to="/services/training"
                          className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-medium text-xs md:text-sm px-6 py-3 rounded-full hover:bg-white/10 transition-colors"
                        >
                          <span>Capability Details</span>
                        </Link>
                      </div>
                    </div>

                    {/* Dual Sub-Pages Highlight Cards */}
                    <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
                      {/* Sub-Track 1 */}
                      <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-mw-orange/30 transition-all flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mw-orange/15 text-mw-orange text-xs font-semibold">
                              <Sparkles className="w-3.5 h-3.5" /> Sub-Page 1
                            </span>
                            <span className="text-[11px] text-white/40">6 Core Programs</span>
                          </div>
                          <h4 className="text-xl font-bold text-white mb-2">Digital Skills Training</h4>
                          <p className="text-xs md:text-sm text-white/60 mb-4 leading-relaxed">
                            Practical, project-based accelerators in Web Design, Social Media Marketing, Video Editing, Data Analytics, SEO, and App Development.
                          </p>
                          <div className="flex flex-wrap gap-1.5 mb-6">
                            {["Web Design", "Social Media", "Video Editing", "Data Analytics", "SEO Strategy", "App Development"].map(skill => (
                              <span key={skill} className="text-[11px] px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-white/80">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        <Link
                          to="/training/digital-skills"
                          className="inline-flex items-center justify-between w-full p-3 rounded-xl bg-mw-orange/10 hover:bg-mw-orange border border-mw-orange/20 hover:border-transparent text-xs md:text-sm font-semibold text-white transition-all group/link"
                        >
                          <span>Explore Digital Skills Sub-Page</span>
                          <ArrowRight className="w-4 h-4 text-mw-orange group-hover/link:text-white group-hover/link:translate-x-1 transition-all" />
                        </Link>
                      </div>

                      {/* Sub-Track 2 */}
                      <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-all flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/15 text-blue-300 text-xs font-semibold">
                              <Briefcase className="w-3.5 h-3.5" /> Sub-Page 2
                            </span>
                            <span className="text-[11px] text-white/40">5 Accredited Programs</span>
                          </div>
                          <h4 className="text-xl font-bold text-white mb-2">Professional & Employability Skills</h4>
                          <p className="text-xs md:text-sm text-white/60 mb-4 leading-relaxed">
                            Corporate certifications in Project Management (PMP®), Human Resources (HRM), CRM Systems, Health Safety & Environment (HSE 1, 2, 3), and Leadership.
                          </p>
                          <div className="flex flex-wrap gap-1.5 mb-6">
                            {["Project Management (PMP®)", "HRM Strategy", "CRM Systems", "HSE Levels 1, 2, 3", "Leadership Excellence"].map(skill => (
                              <span key={skill} className="text-[11px] px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-white/80">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        <Link
                          to="/training/professional-development"
                          className="inline-flex items-center justify-between w-full p-3 rounded-xl bg-blue-600/10 hover:bg-blue-600 border border-blue-500/20 hover:border-transparent text-xs md:text-sm font-semibold text-white transition-all group/link"
                        >
                          <span>Explore Professional & HSE Sub-Page</span>
                          <ArrowRight className="w-4 h-4 text-blue-400 group-hover/link:text-white group-hover/link:translate-x-1 transition-all" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                );
              }

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: (i % 2) * 0.1, ease: EASE }}
                  className="group relative"
                >
                  <div className="mb-8">
                    <Link to={`/services/${service.id}`} className="inline-block group/icon">
                      <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover/icon:bg-mw-orange/20 transition-all duration-300 border border-white/10 group-hover/icon:border-mw-orange/40 group-hover/icon:scale-105">
                        <Icon className="w-8 h-8 text-white group-hover/icon:text-mw-orange transition-colors" />
                      </div>
                    </Link>
                    <Link to={`/services/${service.id}`} className="inline-block group/title">
                      <h3 className="text-3xl font-bold mb-4 tracking-tight group-hover/title:text-mw-orange transition-colors">{service.title}</h3>
                    </Link>
                    <p className="text-xl font-medium text-mw-orange mb-4">{service.tagline}</p>
                    <p className="text-white/60 leading-relaxed mb-8 max-w-md">
                      {service.description}
                    </p>
                    <ul className="space-y-3 mb-8">
                      {service.features.map(feature => (
                        <li key={feature} className="flex items-center gap-3 text-sm text-white/80">
                          <div className="w-1.5 h-1.5 rounded-full bg-mw-orange" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    to={`/services/${service.id}`}
                    className="inline-flex items-center gap-2 text-sm font-medium border border-white/20 rounded-full px-6 py-2.5 hover:bg-white hover:text-mw-dark transition-all group-hover:border-transparent"
                  >
                    <span>Explore {service.title}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </FadeInSection>

      {/* Specialized Extensions: Territorial Coverage & Industry Solutions */}
      <FadeInSection className="py-20 border-t border-white/10 bg-[#090d16]/60 relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Service Areas Box */}
            <div className="p-8 md:p-10 rounded-3xl border border-white/10 bg-white/[0.02] hover:border-purple-500/40 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-400 uppercase tracking-wider mb-3">
                  <MapPin className="w-4 h-4" />
                  <span>Territorial Authority</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-3">
                  Service Areas Across 36 States & FCT
                </h3>
                <p className="text-sm md:text-base text-white/60 leading-relaxed mb-6 font-light">
                  Tailored local SEO, Google Maps 3-Pack ranking, and geo-targeted commercial web portals across Lagos, Abuja, Port Harcourt, Kano, and all 774 Local Government Areas.
                </p>
              </div>
              <Link
                to="/service-areas"
                className="inline-flex items-center justify-between w-full p-4 rounded-2xl bg-purple-600/20 hover:bg-purple-600 border border-purple-500/30 hover:border-transparent text-sm font-semibold text-white transition-all group/sa"
              >
                <span>Explore 37 State Portals & Maps</span>
                <ArrowRight className="w-4 h-4 group-hover/sa:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Industry Solutions Box */}
            <div className="p-8 md:p-10 rounded-3xl border border-white/10 bg-white/[0.02] hover:border-amber-500/40 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-3">
                  <Building2 className="w-4 h-4" />
                  <span>B2B Sector Engineering</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-3">
                  Specialized Industry Solutions
                </h3>
                <p className="text-sm md:text-base text-white/60 leading-relaxed mb-6 font-light">
                  Custom technical architectures for Oil & Gas EPCs, Civil Construction, Diaspora Real Estate, Automotive Dealerships, Sub-Second E-Commerce, and Luxury Interior Finishing.
                </p>
              </div>
              <Link
                to="/industries"
                className="inline-flex items-center justify-between w-full p-4 rounded-2xl bg-amber-600/20 hover:bg-amber-600 border border-amber-500/30 hover:border-transparent text-sm font-semibold text-white transition-all group/ind"
              >
                <span>Explore 6 Core Industry Sectors</span>
                <ArrowRight className="w-4 h-4 group-hover/ind:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* Bottom Conversion CTA */}
      <FadeInSection className="py-24 border-t border-white/10 bg-gradient-to-b from-transparent to-mw-orange/10 relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 text-center max-w-4xl relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-mw-orange px-3 py-1 rounded-full bg-mw-orange/10 border border-mw-orange/20 inline-block mb-6">
            Ready To Accelerate Growth?
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight">
            Let's Engineer Your Next <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-mw-orange to-amber-300">
              Digital Competitive Advantage.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto mb-10 font-light">
            Whether you need a full enterprise platform overhaul, Page 1 Google dominance, or corporate team certification — our partners respond within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-mw-dark hover:bg-mw-orange hover:text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl flex items-center justify-center gap-2"
            >
              <span>Request Project Proposal</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/pricing"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/15 font-semibold text-xs uppercase tracking-widest transition-all hover:scale-105 active:scale-95 flex items-center justify-center"
            >
              <span>View 6-Tier Packages</span>
            </Link>
            <a
              href="https://wa.me/2348125082354?text=Hello%20Mindware%20Consulting%2C%20I%20would%20like%20to%20discuss%20your%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Chat</span>
            </a>
          </div>
        </div>
      </FadeInSection>
    </div>
  );
}
