import { motion } from "motion/react";
import { SERVICES } from "../data/content";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Briefcase, GraduationCap, MapPin, Building2, MessageSquare, CheckCircle2 } from "lucide-react";
import { EASE } from "../lib/utils";
import { FadeInSection } from "../components/FadeInSection";
import { SEO } from "../components/SEO";

export function Services() {
  const quickNav = [
    { name: "Website Design", href: "#website-design" },
    { name: "SEO", href: "#seo" },
    { name: "Social Media", href: "#social-media-marketing" },
    { name: "App Dev", href: "#app-development" },
    { name: "Training Academy", href: "#training" },
    { name: "Consultancy", href: "#consultancy" },
    { name: "37 States Coverage", href: "/service-areas", isRoute: true },
    { name: "Industries", href: "/industries", isRoute: true },
  ];

  return (
    <div className="bg-mw-dark">
      <SEO title="Our Services | Mindware Consulting" description="Explore the digital growth, engineering, and workforce training services we offer." />

      {/* Top Breadcrumbs & Back Navigation */}
      <section className="pt-28 sm:pt-32 pb-4 sm:pb-6 border-b border-white/5 bg-[#03060f]">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-white/50">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-mw-orange font-medium">Services</span>
          </nav>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-white/70 hover:text-white transition-colors group"
          >
            <ArrowRight className="w-3.5 h-3.5 rotate-180 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>
        </div>
      </section>

      {/* Hero */}
      <FadeInSection className="py-12 sm:py-20 md:py-24 border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-mw-orange/5 to-transparent blur-3xl mix-blend-screen" />
        <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-xs font-semibold text-white/80 uppercase tracking-wider mb-4 sm:mb-6">
              <span>Enterprise Agency Capabilities</span>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold font-display tracking-tight mb-4 sm:mb-6 md:mb-8 leading-[1.15] text-white">
              Technology That <br />
              Works For <span className="text-gradient">People.</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed font-light">
              We design the digital systems businesses need to become visible, credible and easier to buy from. Explore our core capabilities.
            </p>
          </motion.div>

          {/* Quick Capability Filter Scroller for Mobile & Desktop */}
          <div className="mt-8 sm:mt-10 pt-6 border-t border-white/10">
            <p className="text-xs font-mono uppercase tracking-wider text-white/40 mb-3 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-mw-orange" />
              <span>Quick Navigation:</span>
            </p>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent -mx-4 px-4 sm:mx-0 sm:px-0">
              {quickNav.map((item) => (
                item.isRoute ? (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="shrink-0 px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-mw-orange/20 border border-white/10 hover:border-mw-orange/40 text-xs font-medium text-white/80 hover:text-white transition-all whitespace-nowrap active:scale-95"
                  >
                    {item.name} →
                  </Link>
                ) : (
                  <a
                    key={item.name}
                    href={item.href}
                    className="shrink-0 px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 hover:border-white/20 text-xs font-medium text-white/80 hover:text-white transition-all whitespace-nowrap active:scale-95"
                  >
                    {item.name}
                  </a>
                )
              ))}
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* Services List */}
      <FadeInSection className="py-12 sm:py-20 md:py-24">
        <h2 className="sr-only">Our Core Capabilities</h2>
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-12 sm:gap-y-16 lg:gap-y-24">
            {SERVICES.map((service, i) => {
              const Icon = service.icon;
              const isTraining = service.id === "training";

              if (isTraining) {
                return (
                  <motion.div
                    key={service.id}
                    id={service.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: (i % 2) * 0.1, ease: EASE }}
                    className="group relative lg:col-span-2 p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.03] via-black/40 to-mw-orange/[0.04] hover:border-mw-orange/40 transition-all duration-500 scroll-mt-28"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 sm:gap-8 mb-6 sm:mb-8">
                      <div className="max-w-3xl">
                        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-4">
                          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-mw-orange/10 border border-mw-orange/20 flex items-center justify-center shrink-0">
                            <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 text-mw-orange" />
                          </div>
                          <span className="px-3 py-1 rounded-full bg-mw-orange/20 border border-mw-orange/30 text-mw-orange text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                            Divided Into 2 Specialized Sub-Pages
                          </span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 tracking-tight">{service.title}</h3>
                        <p className="text-base sm:text-lg md:text-xl font-medium text-mw-orange mb-3 sm:mb-4">{service.tagline}</p>
                        <p className="text-white/70 leading-relaxed text-sm sm:text-base max-w-3xl font-light">
                          {service.description}
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 sm:gap-3 w-full lg:w-auto shrink-0">
                        <Link
                          to="/training"
                          className="inline-flex items-center justify-center gap-2 bg-white text-mw-dark font-semibold text-xs sm:text-sm px-6 py-3 rounded-full hover:bg-white/90 transition-all shadow-lg w-full sm:w-auto min-h-[44px]"
                        >
                          <span>Academy Hub</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                          to="/services/training"
                          className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-medium text-xs sm:text-sm px-6 py-3 rounded-full hover:bg-white/10 transition-colors w-full sm:w-auto min-h-[44px]"
                        >
                          <span>Capability Details</span>
                        </Link>
                      </div>
                    </div>

                    {/* Dual Sub-Pages Highlight Cards */}
                    <div className="grid md:grid-cols-2 gap-4 sm:gap-6 pt-6 border-t border-white/10">
                      {/* Sub-Track 1 */}
                      <div className="p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/5 hover:border-mw-orange/30 transition-all flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-mw-orange/15 text-mw-orange text-xs font-semibold">
                              <Sparkles className="w-3.5 h-3.5" /> Sub-Page 1
                            </span>
                            <span className="text-[11px] text-white/40">6 Core Programs</span>
                          </div>
                          <h4 className="text-lg sm:text-xl font-bold text-white mb-2">Digital Skills Training</h4>
                          <p className="text-xs sm:text-sm text-white/60 mb-4 leading-relaxed font-light">
                            Practical, project-based accelerators in Web Design, Social Media Marketing, Video Editing, Data Analytics, SEO, and App Development.
                          </p>
                          <div className="flex flex-wrap gap-1.5 mb-5">
                            {["Web Design", "Social Media", "Video Editing", "Data Analytics", "SEO Strategy", "App Development"].map(skill => (
                              <span key={skill} className="text-[11px] px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-white/80">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        <Link
                          to="/training/digital-skills"
                          className="inline-flex items-center justify-between w-full p-3 sm:p-3.5 rounded-xl bg-mw-orange/10 hover:bg-mw-orange border border-mw-orange/20 hover:border-transparent text-xs sm:text-sm font-semibold text-white transition-all group/link min-h-[44px] active:scale-[0.99]"
                        >
                          <span>Explore Digital Skills Sub-Page</span>
                          <ArrowRight className="w-4 h-4 text-mw-orange group-hover/link:text-white group-hover/link:translate-x-1 transition-all" />
                        </Link>
                      </div>

                      {/* Sub-Track 2 */}
                      <div className="p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-all flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/15 text-blue-300 text-xs font-semibold">
                              <Briefcase className="w-3.5 h-3.5" /> Sub-Page 2
                            </span>
                            <span className="text-[11px] text-white/40">5 Accredited Programs</span>
                          </div>
                          <h4 className="text-lg sm:text-xl font-bold text-white mb-2">Professional & Employability Skills</h4>
                          <p className="text-xs sm:text-sm text-white/60 mb-4 leading-relaxed font-light">
                            Corporate certifications in Project Management (PMP®), Human Resources (HRM), CRM Systems, Health Safety & Environment (HSE 1, 2, 3), and Leadership.
                          </p>
                          <div className="flex flex-wrap gap-1.5 mb-5">
                            {["Project Management (PMP®)", "HRM Strategy", "CRM Systems", "HSE Levels 1, 2, 3", "Leadership Excellence"].map(skill => (
                              <span key={skill} className="text-[11px] px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-white/80">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        <Link
                          to="/training/professional-development"
                          className="inline-flex items-center justify-between w-full p-3 sm:p-3.5 rounded-xl bg-blue-600/10 hover:bg-blue-600 border border-blue-500/20 hover:border-transparent text-xs sm:text-sm font-semibold text-white transition-all group/link min-h-[44px] active:scale-[0.99]"
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
                  id={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: (i % 2) * 0.1, ease: EASE }}
                  className="group relative scroll-mt-28"
                >
                  <div className="mb-6 sm:mb-8">
                    <Link to={`/services/${service.id}`} className="inline-block group/icon">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-white/5 flex items-center justify-center mb-4 sm:mb-6 group-hover/icon:bg-mw-orange/20 transition-all duration-300 border border-white/10 group-hover/icon:border-mw-orange/40 group-hover/icon:scale-105">
                        <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white group-hover/icon:text-mw-orange transition-colors" />
                      </div>
                    </Link>
                    <Link to={`/services/${service.id}`} className="inline-block group/title">
                      <h3 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4 tracking-tight group-hover/title:text-mw-orange transition-colors">{service.title}</h3>
                    </Link>
                    <p className="text-base sm:text-xl font-medium text-mw-orange mb-3 sm:mb-4">{service.tagline}</p>
                    <p className="text-white/60 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base max-w-md font-light">
                      {service.description}
                    </p>
                    <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
                      {service.features.map(feature => (
                        <li key={feature} className="flex items-start sm:items-center gap-3 text-xs sm:text-sm text-white/80">
                          <div className="w-1.5 h-1.5 rounded-full bg-mw-orange shrink-0 mt-1.5 sm:mt-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    to={`/services/${service.id}`}
                    className="inline-flex items-center justify-center sm:justify-start gap-2 text-xs sm:text-sm font-semibold border border-white/20 rounded-full px-5 sm:px-6 py-2.5 sm:py-3 hover:bg-white hover:text-mw-dark transition-all group-hover:border-transparent w-full sm:w-auto min-h-[44px]"
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
      <FadeInSection className="py-14 sm:py-20 border-t border-white/10 bg-[#090d16]/60 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
          <div className="grid md:grid-cols-2 gap-5 sm:gap-8">
            {/* Service Areas Box */}
            <div className="p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.02] hover:border-purple-500/40 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-400 uppercase tracking-wider mb-2.5 sm:mb-3">
                  <MapPin className="w-4 h-4" />
                  <span>Territorial Authority</span>
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-white mb-2.5 sm:mb-3">
                  Service Areas Across 36 States & FCT
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-white/60 leading-relaxed mb-6 font-light">
                  Tailored local SEO, Google Maps 3-Pack ranking, and geo-targeted commercial web portals across Lagos, Abuja, Port Harcourt, Kano, and all 774 Local Government Areas.
                </p>
              </div>
              <Link
                to="/service-areas"
                className="inline-flex items-center justify-between w-full p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-purple-600/20 hover:bg-purple-600 border border-purple-500/30 hover:border-transparent text-xs sm:text-sm font-semibold text-white transition-all group/sa min-h-[44px]"
              >
                <span>Explore 37 State Portals & Maps</span>
                <ArrowRight className="w-4 h-4 group-hover/sa:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Industry Solutions Box */}
            <div className="p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.02] hover:border-amber-500/40 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-2.5 sm:mb-3">
                  <Building2 className="w-4 h-4" />
                  <span>B2B Sector Engineering</span>
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-white mb-2.5 sm:mb-3">
                  Specialized Industry Solutions
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-white/60 leading-relaxed mb-6 font-light">
                  Custom technical architectures for Oil & Gas EPCs, Civil Construction, Diaspora Real Estate, Automotive Dealerships, Sub-Second E-Commerce, and Luxury Interior Finishing.
                </p>
              </div>
              <Link
                to="/industries"
                className="inline-flex items-center justify-between w-full p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-amber-600/20 hover:bg-amber-600 border border-amber-500/30 hover:border-transparent text-xs sm:text-sm font-semibold text-white transition-all group/ind min-h-[44px]"
              >
                <span>Explore 6 Core Industry Sectors</span>
                <ArrowRight className="w-4 h-4 group-hover/ind:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* Bottom Conversion CTA */}
      <FadeInSection className="py-14 sm:py-20 md:py-24 border-t border-white/10 bg-gradient-to-b from-transparent to-mw-orange/10 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 text-center max-w-4xl relative z-10">
          <span className="text-xs font-bold uppercase tracking-wider sm:tracking-widest text-mw-orange px-3 py-1 rounded-full bg-mw-orange/10 border border-mw-orange/20 inline-block mb-4 sm:mb-6">
            Ready To Accelerate Growth?
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-display font-bold text-white mb-4 sm:mb-6 tracking-tight leading-tight">
            Let's Engineer Your Next <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-mw-orange to-amber-300">
              Digital Competitive Advantage.
            </span>
          </h2>
          <p className="text-xs sm:text-base md:text-lg text-white/60 max-w-2xl mx-auto mb-8 sm:mb-10 font-light leading-relaxed">
            Whether you need a full enterprise platform overhaul, Page 1 Google dominance, or corporate team certification — our partners respond within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
            <Link
              to="/contact"
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white text-mw-dark hover:bg-mw-orange hover:text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl flex items-center justify-center gap-2 min-h-[48px]"
            >
              <span>Request Project Proposal</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/pricing"
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/15 font-semibold text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95 flex items-center justify-center min-h-[48px]"
            >
              <span>View 6-Tier Packages</span>
            </Link>
            <a
              href="https://wa.me/2348125082354?text=Hello%20Mindware%20Consulting%2C%20I%20would%20like%20to%20discuss%20your%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg min-h-[48px]"
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
