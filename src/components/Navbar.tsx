import { Link, useLocation } from "react-router-dom";
import { NAVIGATION, SERVICES } from "../data/content";
import { SERVICES_DETAILED } from "../data/servicesData";
import { cn } from "../lib/utils";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ArrowRight, ChevronDown, Sparkles, Briefcase, Layers, Compass, Users, BookOpen, Video, Camera } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [trainingDropdownOpen, setTrainingDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [portfolioDropdownOpen, setPortfolioDropdownOpen] = useState(false);
  const [careersDropdownOpen, setCareersDropdownOpen] = useState(false);
  const [mobileExpandedSection, setMobileExpandedSection] = useState<string | null>(null);
  const aboutDropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const servicesDropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const portfolioDropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const careersDropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setAboutDropdownOpen(false);
    setTrainingDropdownOpen(false);
    setServicesDropdownOpen(false);
    setPortfolioDropdownOpen(false);
    setCareersDropdownOpen(false);
  }, [location.pathname]);

  const handleMouseEnterAbout = () => {
    if (aboutDropdownTimeoutRef.current) clearTimeout(aboutDropdownTimeoutRef.current);
    setAboutDropdownOpen(true);
  };

  const handleMouseLeaveAbout = () => {
    aboutDropdownTimeoutRef.current = setTimeout(() => {
      setAboutDropdownOpen(false);
    }, 150);
  };

  const handleMouseEnterPortfolio = () => {
    if (portfolioDropdownTimeoutRef.current) clearTimeout(portfolioDropdownTimeoutRef.current);
    setPortfolioDropdownOpen(true);
  };

  const handleMouseLeavePortfolio = () => {
    portfolioDropdownTimeoutRef.current = setTimeout(() => {
      setPortfolioDropdownOpen(false);
    }, 150);
  };

  const handleMouseEnterCareers = () => {
    if (careersDropdownTimeoutRef.current) clearTimeout(careersDropdownTimeoutRef.current);
    setCareersDropdownOpen(true);
  };

  const handleMouseLeaveCareers = () => {
    careersDropdownTimeoutRef.current = setTimeout(() => {
      setCareersDropdownOpen(false);
    }, 150);
  };

  const handleMouseEnterTraining = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setTrainingDropdownOpen(true);
  };

  const handleMouseLeaveTraining = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setTrainingDropdownOpen(false);
    }, 150);
  };

  const handleMouseEnterServices = () => {
    if (servicesDropdownTimeoutRef.current) clearTimeout(servicesDropdownTimeoutRef.current);
    setServicesDropdownOpen(true);
  };

  const handleMouseLeaveServices = () => {
    servicesDropdownTimeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 150);
  };

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const isScrolled = scrolled && !mobileMenuOpen;

  return (
    <>
      <header
        className={cn(
          "fixed left-0 right-0 z-50 transition-all duration-500 flex justify-center pointer-events-none",
          isScrolled ? "top-4 px-4" : "top-0 px-0"
        )}
      >
        <div
          className={cn(
            "w-full transition-all duration-500 pointer-events-auto",
            isScrolled
              ? "max-w-6xl rounded-2xl bg-[#02040a]/70 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
              : "bg-transparent border-b border-transparent"
          )}
        >
          <div
            className={cn(
              "flex items-center justify-between transition-all duration-500 mx-auto",
              isScrolled ? "px-6 py-3" : "container px-6 md:px-12 py-6"
            )}
          >
            <Link to="/" className="relative z-50 flex items-center group transition-opacity hover:opacity-80">
              <img src="/logo.png" alt="Mindware Consulting" className="h-8 md:h-9 w-auto object-contain" />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-3 xl:gap-4 2xl:gap-6">
              {NAVIGATION.map((item) => {
                if (item.name === "About") {
                  const isAboutActive = location.pathname.startsWith("/about");
                  return (
                    <div
                      key={item.name}
                      className="relative"
                      onMouseEnter={handleMouseEnterAbout}
                      onMouseLeave={handleMouseLeaveAbout}
                    >
                      <Link
                        to="/about"
                        aria-label="Navigate to About Us overview"
                        className={cn(
                          "text-[13px] xl:text-sm font-medium tracking-wide transition-colors hover:text-white relative whitespace-nowrap inline-flex items-center gap-1 py-1",
                          isAboutActive
                            ? "text-white after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-[2px] after:bg-mw-orange after:rounded-full"
                            : "text-white/60"
                        )}
                      >
                        {item.name}
                        <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", aboutDropdownOpen ? "rotate-180 text-white" : "opacity-60")} />
                      </Link>

                      {/* About Dropdown Menu */}
                      <AnimatePresence>
                        {aboutDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 6, scale: 0.98 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-80 z-50 pointer-events-auto"
                          >
                            <div className="rounded-2xl bg-[#090d16] border border-white/10 p-2.5 shadow-2xl shadow-black/80 backdrop-blur-2xl">
                              <div className="px-3 py-1.5 text-[11px] font-semibold text-white/40 uppercase tracking-wider">
                                About Mindware Consulting
                              </div>

                              <Link
                                to="/about/mission-vision"
                                onClick={() => setAboutDropdownOpen(false)}
                                className="group flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors"
                              >
                                <div className="w-8 h-8 rounded-lg bg-mw-orange/10 border border-mw-orange/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-mw-orange group-hover:text-white transition-colors">
                                  <Compass className="w-4 h-4 text-mw-orange group-hover:text-white" />
                                </div>
                                <div>
                                  <div className="text-sm font-semibold text-white group-hover:text-mw-orange transition-colors flex items-center gap-1.5">
                                    <span>Mission, Vision & Values</span>
                                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-mw-orange/20 text-mw-orange font-bold">Page 1</span>
                                  </div>
                                  <div className="text-[12px] text-white/50 leading-snug mt-0.5">
                                    Our Core Purpose, Horizons & 6 Guiding Values
                                  </div>
                                </div>
                              </Link>

                              <Link
                                to="/about/leadership"
                                onClick={() => setAboutDropdownOpen(false)}
                                className="group flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors"
                              >
                                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                  <Users className="w-4 h-4 text-blue-400 group-hover:text-white" />
                                </div>
                                <div>
                                  <div className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors flex items-center gap-1.5">
                                    <span>Leadership & Management</span>
                                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold">Page 2</span>
                                  </div>
                                  <div className="text-[12px] text-white/50 leading-snug mt-0.5">
                                    Founder & CEO, Executive Team & Governance
                                  </div>
                                </div>
                              </Link>

                              <Link
                                to="/about/testimonials"
                                onClick={() => setAboutDropdownOpen(false)}
                                className="group flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors"
                              >
                                <div className="w-8 h-8 rounded-lg bg-red-600/10 border border-red-500/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-red-600 group-hover:text-white transition-colors">
                                  <Video className="w-4 h-4 text-red-500 group-hover:text-white" />
                                </div>
                                <div>
                                  <div className="text-sm font-semibold text-white group-hover:text-red-400 transition-colors flex items-center gap-1.5">
                                    <span>Testimonials & Video Reviews</span>
                                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 font-bold">Videos</span>
                                  </div>
                                  <div className="text-[12px] text-white/50 leading-snug mt-0.5">
                                    Client & Student YouTube Reviews in 2 Compartments
                                  </div>
                                </div>
                              </Link>

                              <div className="mt-1 pt-1.5 border-t border-white/5 px-2">
                                <Link
                                  to="/about"
                                  onClick={() => setAboutDropdownOpen(false)}
                                  className="flex items-center justify-between text-xs text-white/60 hover:text-white py-1.5 px-2 rounded-lg hover:bg-white/5 transition-colors font-medium"
                                >
                                  <span>View About Overview</span>
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                if (item.name === "Services") {
                  const isServicesActive = location.pathname.startsWith("/services");
                  return (
                    <div
                      key={item.name}
                      className="relative"
                      onMouseEnter={handleMouseEnterServices}
                      onMouseLeave={handleMouseLeaveServices}
                    >
                      <Link
                        to="/services"
                        aria-label="Navigate to Services overview"
                        className={cn(
                          "text-[13px] xl:text-sm font-medium tracking-wide transition-colors hover:text-white relative whitespace-nowrap inline-flex items-center gap-1 py-1",
                          isServicesActive
                            ? "text-white after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-[2px] after:bg-mw-orange after:rounded-full"
                            : "text-white/60"
                        )}
                      >
                        {item.name}
                        <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", servicesDropdownOpen ? "rotate-180 text-white" : "opacity-60")} />
                      </Link>

                      {/* Services Dropdown Menu */}
                      <AnimatePresence>
                        {servicesDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 6, scale: 0.98 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[560px] z-50 pointer-events-auto"
                          >
                            <div className="rounded-2xl bg-[#090d16] border border-white/10 p-3 shadow-2xl shadow-black/80 backdrop-blur-2xl">
                              <div className="px-3 py-1.5 text-[11px] font-semibold text-white/40 uppercase tracking-wider flex items-center justify-between">
                                <span>Core Capabilities & Sub-Pages</span>
                                <span className="text-[10px] text-mw-orange font-mono">6 Services</span>
                              </div>

                              <div className="grid grid-cols-2 gap-1.5 mt-1">
                                {SERVICES.map((s) => {
                                  const SIcon = s.icon;
                                  const sDetail = SERVICES_DETAILED[s.id];
                                  return (
                                    <Link
                                      key={s.id}
                                      to={`/services/${s.id}`}
                                      onClick={() => setServicesDropdownOpen(false)}
                                      className="group flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-white/5 transition-colors"
                                    >
                                      <div className="w-8 h-8 rounded-lg bg-mw-orange/10 border border-mw-orange/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-mw-orange group-hover:text-white transition-colors">
                                        <SIcon className="w-4 h-4 text-mw-orange group-hover:text-white" />
                                      </div>
                                      <div className="min-w-0">
                                        <div className="text-xs font-semibold text-white group-hover:text-mw-orange transition-colors truncate">
                                          {s.title}
                                        </div>
                                        <div className="text-[11px] text-white/50 leading-snug line-clamp-1 mt-0.5">
                                          {sDetail?.menuDescription || s.tagline}
                                        </div>
                                      </div>
                                    </Link>
                                  );
                                })}
                              </div>

                              <div className="mt-2 pt-2 border-t border-white/5 px-2 flex flex-col gap-1.5">
                                <div className="flex items-center justify-between">
                                  <Link
                                    to="/services"
                                    onClick={() => setServicesDropdownOpen(false)}
                                    className="flex items-center gap-1.5 text-xs text-white/60 hover:text-white py-1 px-2 rounded-lg hover:bg-white/5 transition-colors font-medium"
                                  >
                                    <Layers className="w-3.5 h-3.5 text-mw-orange" />
                                    <span>View All Services Overview</span>
                                    <ArrowRight className="w-3 h-3 text-mw-orange" />
                                  </Link>
                                  <Link
                                    to="/pricing"
                                    onClick={() => setServicesDropdownOpen(false)}
                                    className="text-[11px] text-mw-orange hover:underline font-medium px-2"
                                  >
                                    Pricing Packages →
                                  </Link>
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                  <Link
                                    to="/service-areas"
                                    onClick={() => setServicesDropdownOpen(false)}
                                    className="flex items-center justify-between p-2 rounded-xl bg-mw-orange/10 hover:bg-mw-orange/20 border border-mw-orange/20 text-xs font-semibold text-white transition-colors"
                                  >
                                    <div className="flex items-center gap-1.5 truncate">
                                      <Compass className="w-3.5 h-3.5 text-mw-orange shrink-0" />
                                      <span className="truncate">Service Areas (36 States)</span>
                                    </div>
                                    <ArrowRight className="w-3 h-3 text-mw-orange shrink-0" />
                                  </Link>

                                  <Link
                                    to="/industries"
                                    onClick={() => setServicesDropdownOpen(false)}
                                    className="flex items-center justify-between p-2 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 text-xs font-semibold text-white transition-colors"
                                  >
                                    <div className="flex items-center gap-1.5 truncate">
                                      <Layers className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                                      <span className="truncate">Industries (6 Sectors)</span>
                                    </div>
                                    <ArrowRight className="w-3 h-3 text-blue-400 shrink-0" />
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                if (item.name === "Portfolio") {
                  const isPortfolioActive = location.pathname.startsWith("/portfolio") || location.pathname.startsWith("/case-studies");
                  return (
                    <div
                      key={item.name}
                      className="relative"
                      onMouseEnter={handleMouseEnterPortfolio}
                      onMouseLeave={handleMouseLeavePortfolio}
                    >
                      <Link
                        to="/portfolio"
                        aria-label="Navigate to Portfolio overview"
                        className={cn(
                          "text-[13px] xl:text-sm font-medium tracking-wide transition-colors hover:text-white relative whitespace-nowrap inline-flex items-center gap-1 py-1",
                          isPortfolioActive
                            ? "text-white after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-[2px] after:bg-mw-orange after:rounded-full"
                            : "text-white/60"
                        )}
                      >
                        {item.name}
                        <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", portfolioDropdownOpen ? "rotate-180 text-white" : "opacity-60")} />
                      </Link>

                      {/* Portfolio Dropdown Menu */}
                      <AnimatePresence>
                        {portfolioDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 6, scale: 0.98 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-80 z-50 pointer-events-auto"
                          >
                            <div className="rounded-2xl bg-[#090d16] border border-white/10 p-2.5 shadow-2xl shadow-black/80 backdrop-blur-2xl">
                              <div className="px-3 py-1.5 text-[11px] font-semibold text-white/40 uppercase tracking-wider">
                                Portfolio & Work
                              </div>

                              <Link
                                to="/portfolio"
                                onClick={() => setPortfolioDropdownOpen(false)}
                                className="group flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors"
                              >
                                <div className="w-8 h-8 rounded-lg bg-mw-orange/10 border border-mw-orange/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-mw-orange group-hover:text-white transition-colors">
                                  <Layers className="w-4 h-4 text-mw-orange group-hover:text-white" />
                                </div>
                                <div>
                                  <div className="text-sm font-semibold text-white group-hover:text-mw-orange transition-colors flex items-center gap-1.5">
                                    <span>Selected Works</span>
                                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-mw-orange/20 text-mw-orange font-bold">Projects</span>
                                  </div>
                                  <div className="text-[12px] text-white/50 leading-snug mt-0.5">
                                    Live client platforms, digital ecosystems & web applications
                                  </div>
                                </div>
                              </Link>

                              <Link
                                to="/portfolio/case-studies"
                                onClick={() => setPortfolioDropdownOpen(false)}
                                className="group flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors"
                              >
                                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                  <BookOpen className="w-4 h-4 text-blue-400 group-hover:text-white" />
                                </div>
                                <div>
                                  <div className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors flex items-center gap-1.5">
                                    <span>Case Studies</span>
                                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold">Subpage</span>
                                  </div>
                                  <div className="text-[12px] text-white/50 leading-snug mt-0.5">
                                    In-depth challenges, data metrics & ROI breakdowns
                                  </div>
                                </div>
                              </Link>

                              <div className="mt-1 pt-1.5 border-t border-white/5 px-2">
                                <Link
                                  to="/portfolio"
                                  onClick={() => setPortfolioDropdownOpen(false)}
                                  className="flex items-center justify-between text-xs text-white/60 hover:text-white py-1.5 px-2 rounded-lg hover:bg-white/5 transition-colors font-medium"
                                >
                                  <span>View Portfolio Overview</span>
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                if (item.name === "Academy" || item.name === "Training") {
                  const isTrainingActive = location.pathname.startsWith("/training");
                  return (
                    <div
                      key={item.name}
                      className="relative"
                      onMouseEnter={handleMouseEnterTraining}
                      onMouseLeave={handleMouseLeaveTraining}
                    >
                      <Link
                        to="/training"
                        aria-label="Navigate to Academy"
                        className={cn(
                          "text-[13px] xl:text-sm font-medium tracking-wide transition-colors hover:text-white relative whitespace-nowrap inline-flex items-center gap-1 py-1",
                          isTrainingActive
                            ? "text-white after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-[2px] after:bg-mw-orange after:rounded-full"
                            : "text-white/60"
                        )}
                      >
                        {item.name}
                        <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", trainingDropdownOpen ? "rotate-180 text-white" : "opacity-60")} />
                      </Link>

                      {/* Dropdown Menu */}
                      <AnimatePresence>
                        {trainingDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 6, scale: 0.98 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-80 z-50 pointer-events-auto"
                          >
                            <div className="rounded-2xl bg-[#090d16] border border-white/10 p-2.5 shadow-2xl shadow-black/80 backdrop-blur-2xl">
                              <div className="px-3 py-1.5 text-[11px] font-semibold text-white/40 uppercase tracking-wider">
                                Academy Tracks & Programs
                              </div>

                              <Link
                                to="/training/digital-skills"
                                onClick={() => setTrainingDropdownOpen(false)}
                                className="group flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors"
                              >
                                <div className="w-8 h-8 rounded-lg bg-mw-orange/10 border border-mw-orange/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-mw-orange group-hover:text-white transition-colors">
                                  <Sparkles className="w-4 h-4 text-mw-orange group-hover:text-white" />
                                </div>
                                <div>
                                  <div className="text-sm font-semibold text-white group-hover:text-mw-orange transition-colors flex items-center gap-1.5">
                                    <span>Digital Skills Track</span>
                                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-mw-orange/20 text-mw-orange font-bold">Page 1</span>
                                  </div>
                                  <div className="text-[12px] text-white/50 leading-snug mt-0.5">
                                    Web Design, Social Media, Video Editing, Data Analytics & Apps
                                  </div>
                                </div>
                              </Link>

                              <Link
                                to="/training/professional-development"
                                onClick={() => setTrainingDropdownOpen(false)}
                                className="group flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors"
                              >
                                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                  <Briefcase className="w-4 h-4 text-blue-400 group-hover:text-white" />
                                </div>
                                <div>
                                  <div className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors flex items-center gap-1.5">
                                    <span>Professional & Employability</span>
                                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold">Page 2</span>
                                  </div>
                                  <div className="text-[12px] text-white/50 leading-snug mt-0.5">
                                    PMP® Project Mgmt, HRM, CRM Systems & HSE Levels 1, 2, 3
                                  </div>
                                </div>
                              </Link>

                              <Link
                                to="/training/testimonials"
                                onClick={() => setTrainingDropdownOpen(false)}
                                className="group flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors"
                              >
                                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                  <Video className="w-4 h-4 text-emerald-400 group-hover:text-white" />
                                </div>
                                <div>
                                  <div className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                                    <span>Graduate Video Reviews</span>
                                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">Page 3</span>
                                  </div>
                                  <div className="text-[12px] text-white/50 leading-snug mt-0.5">
                                    Verified alumni video stories, PMP® pass proof & HSE reviews
                                  </div>
                                </div>
                              </Link>

                              <Link
                                to="/training/gallery"
                                onClick={() => setTrainingDropdownOpen(false)}
                                className="group flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors"
                              >
                                <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                  <Camera className="w-4 h-4 text-purple-400 group-hover:text-white" />
                                </div>
                                <div>
                                  <div className="text-sm font-semibold text-white group-hover:text-purple-400 transition-colors flex items-center gap-1.5">
                                    <span>Training Gallery</span>
                                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold">Page 4</span>
                                  </div>
                                  <div className="text-[12px] text-white/50 leading-snug mt-0.5">
                                    Live training photos, coding labs, HSE safety drills & ceremonies
                                  </div>
                                </div>
                              </Link>

                              <div className="mt-1 pt-1.5 border-t border-white/5 px-2">
                                <Link
                                  to="/training"
                                  onClick={() => setTrainingDropdownOpen(false)}
                                  className="flex items-center justify-between text-xs text-white/60 hover:text-white py-1.5 px-2 rounded-lg hover:bg-white/5 transition-colors font-medium"
                                >
                                  <span>View All Academy Programs</span>
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                if (item.name === "Careers") {
                  const isCareersActive = location.pathname.startsWith("/careers");
                  return (
                    <div
                      key={item.name}
                      className="relative"
                      onMouseEnter={handleMouseEnterCareers}
                      onMouseLeave={handleMouseLeaveCareers}
                    >
                      <Link
                        to="/careers"
                        aria-label="Navigate to Careers overview"
                        className={cn(
                          "text-[13px] xl:text-sm font-medium tracking-wide transition-colors hover:text-white relative whitespace-nowrap inline-flex items-center gap-1.5 py-1",
                          isCareersActive
                            ? "text-white after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-[2px] after:bg-mw-orange after:rounded-full"
                            : "text-white/60"
                        )}
                      >
                        <span>{item.name}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-mw-orange/20 text-mw-orange font-bold uppercase tracking-wider">
                          AI Hub
                        </span>
                        <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", careersDropdownOpen ? "rotate-180 text-white" : "opacity-60")} />
                      </Link>

                      {/* Careers Dropdown Menu */}
                      <AnimatePresence>
                        {careersDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 6, scale: 0.98 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-88 z-50 pointer-events-auto"
                          >
                            <div className="rounded-2xl bg-[#090d16] border border-white/10 p-2.5 shadow-2xl shadow-black/80 backdrop-blur-2xl">
                              <div className="px-3 py-1.5 text-[11px] font-semibold text-white/40 uppercase tracking-wider flex items-center justify-between">
                                <span>Careers & Talent Sub-Pages</span>
                                <span className="text-[10px] text-mw-orange font-mono">3 Subpages</span>
                              </div>

                              {/* 1. AI CV Builder */}
                              <Link
                                to="/careers/cv-builder"
                                onClick={() => setCareersDropdownOpen(false)}
                                className="group flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors"
                              >
                                <div className="w-8 h-8 rounded-lg bg-mw-orange/10 border border-mw-orange/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-mw-orange group-hover:text-white transition-colors">
                                  <Sparkles className="w-4 h-4 text-amber-300 group-hover:text-white" />
                                </div>
                                <div className="min-w-0">
                                  <div className="text-sm font-semibold text-white group-hover:text-mw-orange transition-colors flex items-center gap-1.5">
                                    <span>1. AI CV Builder</span>
                                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-mw-orange/20 text-mw-orange font-bold font-mono">
                                      Gemini AI
                                    </span>
                                  </div>
                                  <div className="text-[12px] text-white/50 leading-snug mt-0.5">
                                    ATS-proof resume creation, metric quantification & instant PDF
                                  </div>
                                </div>
                              </Link>

                              {/* 2. Explore Job Openings */}
                              <Link
                                to="/careers/jobs"
                                onClick={() => setCareersDropdownOpen(false)}
                                className="group flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors"
                              >
                                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                  <Briefcase className="w-4 h-4 text-blue-300 group-hover:text-white" />
                                </div>
                                <div className="min-w-0">
                                  <div className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors flex items-center gap-1.5">
                                    <span>2. Explore Job Openings</span>
                                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold font-mono">
                                      Direct Apply
                                    </span>
                                  </div>
                                  <div className="text-[12px] text-white/50 leading-snug mt-0.5">
                                    Verified enterprise vacancies in engineering, SEO & project mgmt
                                  </div>
                                </div>
                              </Link>

                              {/* 3. Connect With Employers */}
                              <Link
                                to="/careers/employers"
                                onClick={() => setCareersDropdownOpen(false)}
                                className="group flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors"
                              >
                                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                  <Users className="w-4 h-4 text-emerald-300 group-hover:text-white" />
                                </div>
                                <div className="min-w-0">
                                  <div className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors flex items-center gap-1.5">
                                    <span>3. Connect With Employers</span>
                                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold font-mono">
                                      Talent Match
                                    </span>
                                  </div>
                                  <div className="text-[12px] text-white/50 leading-snug mt-0.5">
                                    Direct candidate matching by verified PMP®, HSE & tech certifications
                                  </div>
                                </div>
                              </Link>

                              <div className="mt-1 pt-1.5 border-t border-white/5 px-2">
                                <Link
                                  to="/careers"
                                  onClick={() => setCareersDropdownOpen(false)}
                                  className="flex items-center justify-between text-xs text-white/60 hover:text-white py-1.5 px-2 rounded-lg hover:bg-white/5 transition-colors font-medium"
                                >
                                  <span>View Careers & Talent Hub Overview</span>
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    aria-label={`Navigate to ${item.name} page`}
                    className={cn(
                      "text-[13px] xl:text-sm font-medium tracking-wide transition-colors hover:text-white relative whitespace-nowrap",
                      location.pathname === item.path
                        ? "text-white after:absolute after:-bottom-1.5 after:left-0 after:right-0 after:h-[2px] after:bg-mw-orange after:rounded-full"
                        : "text-white/60"
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden lg:flex items-center gap-4">
              <Link
                to="/contact"
                className="group flex items-center gap-2 bg-white text-mw-dark px-6 py-2.5 rounded-full text-sm font-medium transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-white/10"
              >
                Get Started
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              className="lg:hidden relative z-50 w-11 h-11 flex items-center justify-center text-white/90 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mw-orange rounded-xl bg-white/[0.04] border border-white/10 active:scale-95 transition-all"
              onClick={() => {
                const nextOpen = !mobileMenuOpen;
                setMobileMenuOpen(nextOpen);
                if (nextOpen) {
                  if (location.pathname.startsWith("/about")) setMobileExpandedSection("About");
                  else if (location.pathname.startsWith("/services") || location.pathname.startsWith("/service-areas") || location.pathname.startsWith("/industries")) setMobileExpandedSection("Services");
                  else if (location.pathname.startsWith("/portfolio") || location.pathname.startsWith("/case-studies")) setMobileExpandedSection("Portfolio");
                  else if (location.pathname.startsWith("/training")) setMobileExpandedSection("Academy");
                  else if (location.pathname.startsWith("/careers")) setMobileExpandedSection("Careers");
                  else setMobileExpandedSection(null);
                }
              }}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-mw-orange" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(16px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#02040a]/95 flex flex-col pt-24 px-5 sm:px-8 pb-6 overflow-y-auto"
          >
            <nav className="flex flex-col gap-2 text-xl sm:text-2xl font-display font-medium tracking-tight mb-8">
              {NAVIGATION.map((item) => {
                if (item.name === "About") {
                  const isAboutActive = location.pathname.startsWith("/about");
                  const isExpanded = mobileExpandedSection === "About";
                  return (
                    <div key={item.name} className="py-2 border-b border-white/5">
                      <div className="flex items-center justify-between">
                        <Link
                          to="/about"
                          onClick={() => setMobileMenuOpen(false)}
                          aria-label="Navigate to About overview page"
                          className={cn(
                            "transition-colors py-2 flex items-center gap-2",
                            isAboutActive ? "text-mw-orange" : "text-white hover:text-white/80"
                          )}
                        >
                          <span>About Us</span>
                        </Link>
                        <button
                          type="button"
                          onClick={() => setMobileExpandedSection(isExpanded ? null : "About")}
                          aria-label={isExpanded ? "Collapse About menu" : "Expand About menu"}
                          className="w-11 h-11 flex items-center justify-center rounded-lg text-white/60 hover:text-white hover:bg-white/5 active:scale-95 transition-all"
                        >
                          <ChevronDown className={cn("w-5 h-5 transition-transform duration-200", isExpanded && "rotate-180 text-mw-orange")} />
                        </button>
                      </div>

                      {/* Sub-links */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden pl-3 mt-1 space-y-1.5 border-l border-white/10 ml-2"
                          >
                            <Link
                              to="/about/mission-vision"
                              onClick={() => setMobileMenuOpen(false)}
                              className={cn(
                                "flex items-center gap-2.5 text-sm sm:text-base py-2 transition-colors",
                                location.pathname === "/about/mission-vision" ? "text-mw-orange font-semibold" : "text-white/70 hover:text-white"
                              )}
                            >
                              <Compass className="w-4 h-4 text-mw-orange shrink-0" />
                              <span>Mission, Vision & Core Values</span>
                            </Link>
                            <Link
                              to="/about/leadership"
                              onClick={() => setMobileMenuOpen(false)}
                              className={cn(
                                "flex items-center gap-2.5 text-sm sm:text-base py-2 transition-colors",
                                location.pathname === "/about/leadership" ? "text-blue-400 font-semibold" : "text-white/70 hover:text-white"
                              )}
                            >
                              <Users className="w-4 h-4 text-blue-400 shrink-0" />
                              <span>Leadership & Management</span>
                            </Link>
                            <Link
                              to="/about/testimonials"
                              onClick={() => setMobileMenuOpen(false)}
                              className={cn(
                                "flex items-center justify-between text-sm sm:text-base py-2 transition-colors pr-2",
                                location.pathname === "/about/testimonials" ? "text-red-400 font-semibold" : "text-white/70 hover:text-white"
                              )}
                            >
                              <div className="flex items-center gap-2.5">
                                <Video className="w-4 h-4 text-red-400 shrink-0" />
                                <span>Testimonials & Video Reviews</span>
                              </div>
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 font-mono font-bold">
                                YouTube
                              </span>
                            </Link>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                if (item.name === "Services") {
                  const isServicesActive = location.pathname.startsWith("/services") || location.pathname.startsWith("/service-areas") || location.pathname.startsWith("/industries");
                  const isExpanded = mobileExpandedSection === "Services";
                  return (
                    <div key={item.name} className="py-2 border-b border-white/5">
                      <div className="flex items-center justify-between">
                        <Link
                          to="/services"
                          onClick={() => setMobileMenuOpen(false)}
                          aria-label="Navigate to Services overview page"
                          className={cn(
                            "transition-colors py-2 flex items-center gap-2",
                            isServicesActive ? "text-mw-orange" : "text-white hover:text-white/80"
                          )}
                        >
                          <span>Services</span>
                        </Link>
                        <button
                          type="button"
                          onClick={() => setMobileExpandedSection(isExpanded ? null : "Services")}
                          aria-label={isExpanded ? "Collapse Services menu" : "Expand Services menu"}
                          className="w-11 h-11 flex items-center justify-center rounded-lg text-white/60 hover:text-white hover:bg-white/5 active:scale-95 transition-all"
                        >
                          <ChevronDown className={cn("w-5 h-5 transition-transform duration-200", isExpanded && "rotate-180 text-mw-orange")} />
                        </button>
                      </div>

                      {/* Sub-links */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden pl-3 mt-1 space-y-1.5 border-l border-white/10 ml-2"
                          >
                            {SERVICES.map((s) => {
                              const SIcon = s.icon;
                              const isItemActive = location.pathname === `/services/${s.id}`;
                              return (
                                <Link
                                  key={s.id}
                                  to={`/services/${s.id}`}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className={cn(
                                    "flex items-center gap-2.5 text-sm sm:text-base py-2 transition-colors",
                                    isItemActive ? "text-mw-orange font-semibold" : "text-white/70 hover:text-white"
                                  )}
                                >
                                  <SIcon className="w-4 h-4 text-mw-orange shrink-0" />
                                  <span>{s.title}</span>
                                </Link>
                              );
                            })}
                            <Link
                              to="/service-areas"
                              onClick={() => setMobileMenuOpen(false)}
                              className={cn(
                                "flex items-center gap-2.5 text-sm sm:text-base py-2 px-3 rounded-xl bg-mw-orange/10 border border-mw-orange/20 text-mw-orange font-semibold transition-colors mt-2",
                                location.pathname.startsWith("/service-areas") && "bg-mw-orange text-white"
                              )}
                            >
                              <Compass className="w-4 h-4 text-mw-orange shrink-0" />
                              <span>Service Areas (36 States & FCT)</span>
                            </Link>
                            <Link
                              to="/industries"
                              onClick={() => setMobileMenuOpen(false)}
                              className={cn(
                                "flex items-center gap-2.5 text-sm sm:text-base py-2 px-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 font-semibold transition-colors mt-1.5",
                                location.pathname.startsWith("/industries") && "bg-blue-600 text-white"
                              )}
                            >
                              <Layers className="w-4 h-4 text-blue-400 shrink-0" />
                              <span>Industries We Serve (6 Focus Sectors)</span>
                            </Link>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                if (item.name === "Portfolio") {
                  const isPortfolioActive = location.pathname.startsWith("/portfolio") || location.pathname.startsWith("/case-studies");
                  const isExpanded = mobileExpandedSection === "Portfolio";
                  return (
                    <div key={item.name} className="py-2 border-b border-white/5">
                      <div className="flex items-center justify-between">
                        <Link
                          to="/portfolio"
                          onClick={() => setMobileMenuOpen(false)}
                          aria-label="Navigate to Portfolio overview page"
                          className={cn(
                            "transition-colors py-2 flex items-center gap-2",
                            isPortfolioActive ? "text-mw-orange" : "text-white hover:text-white/80"
                          )}
                        >
                          <span>Portfolio</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-white/70 font-semibold uppercase">
                            Works
                          </span>
                        </Link>
                        <button
                          type="button"
                          onClick={() => setMobileExpandedSection(isExpanded ? null : "Portfolio")}
                          aria-label={isExpanded ? "Collapse Portfolio menu" : "Expand Portfolio menu"}
                          className="w-11 h-11 flex items-center justify-center rounded-lg text-white/60 hover:text-white hover:bg-white/5 active:scale-95 transition-all"
                        >
                          <ChevronDown className={cn("w-5 h-5 transition-transform duration-200", isExpanded && "rotate-180 text-mw-orange")} />
                        </button>
                      </div>

                      {/* Sub-links */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden pl-3 mt-1 space-y-1.5 border-l border-white/10 ml-2"
                          >
                            <Link
                              to="/portfolio"
                              onClick={() => setMobileMenuOpen(false)}
                              className={cn(
                                "flex items-center gap-2.5 text-sm sm:text-base py-2 transition-colors",
                                location.pathname === "/portfolio" ? "text-mw-orange font-semibold" : "text-white/70 hover:text-white"
                              )}
                            >
                              <Layers className="w-4 h-4 text-mw-orange shrink-0" />
                              <span>Selected Works & Projects</span>
                            </Link>
                            <Link
                              to="/portfolio/case-studies"
                              onClick={() => setMobileMenuOpen(false)}
                              className={cn(
                                "flex items-center gap-2.5 text-sm sm:text-base py-2 transition-colors",
                                location.pathname.startsWith("/portfolio/case-studies") || location.pathname.startsWith("/case-studies")
                                  ? "text-blue-400 font-semibold"
                                  : "text-white/70 hover:text-white"
                              )}
                            >
                              <BookOpen className="w-4 h-4 text-blue-400 shrink-0" />
                              <div className="flex items-center gap-2">
                                <span>Case Studies</span>
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold uppercase">
                                  Subpage
                                </span>
                              </div>
                            </Link>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                if (item.name === "Academy" || item.name === "Training") {
                  const isTrainingActive = location.pathname.startsWith("/training");
                  const isExpanded = mobileExpandedSection === "Academy";
                  return (
                    <div key={item.name} className="py-2 border-b border-white/5">
                      <div className="flex items-center justify-between">
                        <Link
                          to="/training"
                          onClick={() => setMobileMenuOpen(false)}
                          aria-label="Navigate to Academy page"
                          className={cn(
                            "transition-colors py-2 flex items-center gap-2",
                            isTrainingActive ? "text-mw-orange" : "text-white hover:text-white/80"
                          )}
                        >
                          <span>Academy</span>
                        </Link>
                        <button
                          type="button"
                          onClick={() => setMobileExpandedSection(isExpanded ? null : "Academy")}
                          aria-label={isExpanded ? "Collapse Academy menu" : "Expand Academy menu"}
                          className="w-11 h-11 flex items-center justify-center rounded-lg text-white/60 hover:text-white hover:bg-white/5 active:scale-95 transition-all"
                        >
                          <ChevronDown className={cn("w-5 h-5 transition-transform duration-200", isExpanded && "rotate-180 text-mw-orange")} />
                        </button>
                      </div>

                      {/* Sub-links */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden pl-3 mt-1 space-y-1.5 border-l border-white/10 ml-2"
                          >
                            <Link
                              to="/training/digital-skills"
                              onClick={() => setMobileMenuOpen(false)}
                              className={cn(
                                "flex items-center gap-2.5 text-sm sm:text-base py-2 transition-colors",
                                location.pathname === "/training/digital-skills" ? "text-mw-orange font-semibold" : "text-white/70 hover:text-white"
                              )}
                            >
                              <Sparkles className="w-4 h-4 text-mw-orange shrink-0" />
                              <span>Digital Skills (Web, SEO, Analytics)</span>
                            </Link>
                            <Link
                              to="/training/professional-development"
                              onClick={() => setMobileMenuOpen(false)}
                              className={cn(
                                "flex items-center gap-2.5 text-sm sm:text-base py-2 transition-colors",
                                location.pathname === "/training/professional-development" ? "text-blue-400 font-semibold" : "text-white/70 hover:text-white"
                              )}
                            >
                              <Briefcase className="w-4 h-4 text-blue-400 shrink-0" />
                              <span>Professional Development (PMP, HSE 1,2,3)</span>
                            </Link>
                            <Link
                              to="/training/testimonials"
                              onClick={() => setMobileMenuOpen(false)}
                              className={cn(
                                "flex items-center gap-2.5 text-sm sm:text-base py-2 transition-colors",
                                location.pathname === "/training/testimonials" ? "text-emerald-400 font-semibold" : "text-white/70 hover:text-white"
                              )}
                            >
                              <Video className="w-4 h-4 text-emerald-400 shrink-0" />
                              <span>Graduate Video Reviews & Outcomes</span>
                            </Link>
                            <Link
                              to="/training/gallery"
                              onClick={() => setMobileMenuOpen(false)}
                              className={cn(
                                "flex items-center gap-2.5 text-sm sm:text-base py-2 transition-colors",
                                location.pathname === "/training/gallery" ? "text-purple-400 font-semibold" : "text-white/70 hover:text-white"
                              )}
                            >
                              <Camera className="w-4 h-4 text-purple-400 shrink-0" />
                              <span>Training Gallery (Live Photos)</span>
                            </Link>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                if (item.name === "Careers") {
                  const isCareersActive = location.pathname.startsWith("/careers");
                  const isExpanded = mobileExpandedSection === "Careers";
                  return (
                    <div key={item.name} className="py-2 border-b border-white/5">
                      <div className="flex items-center justify-between">
                        <Link
                          to="/careers"
                          onClick={() => setMobileMenuOpen(false)}
                          aria-label="Navigate to Careers & Talent Hub page"
                          className={cn(
                            "transition-colors py-2 flex items-center gap-2",
                            isCareersActive ? "text-mw-orange" : "text-white hover:text-white/80"
                          )}
                        >
                          <span>Careers & Talent Hub</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-mw-orange/20 text-mw-orange font-bold uppercase">
                            AI Hub
                          </span>
                        </Link>
                        <button
                          type="button"
                          onClick={() => setMobileExpandedSection(isExpanded ? null : "Careers")}
                          aria-label={isExpanded ? "Collapse Careers menu" : "Expand Careers menu"}
                          className="w-11 h-11 flex items-center justify-center rounded-lg text-white/60 hover:text-white hover:bg-white/5 active:scale-95 transition-all"
                        >
                          <ChevronDown className={cn("w-5 h-5 transition-transform duration-200", isExpanded && "rotate-180 text-mw-orange")} />
                        </button>
                      </div>

                      {/* Sub-links */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden pl-3 mt-1 space-y-1.5 border-l border-white/10 ml-2"
                          >
                            <Link
                              to="/careers/cv-builder"
                              onClick={() => setMobileMenuOpen(false)}
                              className={cn(
                                "flex items-center justify-between text-sm sm:text-base py-2 transition-colors pr-2",
                                location.pathname === "/careers/cv-builder" ? "text-mw-orange font-semibold" : "text-white/70 hover:text-white"
                              )}
                            >
                              <div className="flex items-center gap-2.5">
                                <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
                                <span>1. AI CV Builder</span>
                              </div>
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-mw-orange/20 text-mw-orange font-mono font-bold">
                                Gemini AI
                              </span>
                            </Link>
                            <Link
                              to="/careers/jobs"
                              onClick={() => setMobileMenuOpen(false)}
                              className={cn(
                                "flex items-center justify-between text-sm sm:text-base py-2 transition-colors pr-2",
                                location.pathname === "/careers/jobs" ? "text-blue-300 font-semibold" : "text-white/70 hover:text-white"
                              )}
                            >
                              <div className="flex items-center gap-2.5">
                                <Briefcase className="w-4 h-4 text-blue-300 shrink-0" />
                                <span>2. Explore Job Openings</span>
                              </div>
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono font-bold">
                                Direct Apply
                              </span>
                            </Link>
                            <Link
                              to="/careers/employers"
                              onClick={() => setMobileMenuOpen(false)}
                              className={cn(
                                "flex items-center justify-between text-sm sm:text-base py-2 transition-colors pr-2",
                                location.pathname === "/careers/employers" ? "text-emerald-300 font-semibold" : "text-white/70 hover:text-white"
                              )}
                            >
                              <div className="flex items-center gap-2.5">
                                <Users className="w-4 h-4 text-emerald-300 shrink-0" />
                                <span>3. Connect With Employers</span>
                              </div>
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono font-bold">
                                Talent Match
                              </span>
                            </Link>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label={`Navigate to ${item.name} page`}
                    className={cn(
                      "transition-colors flex items-center justify-between group py-3 border-b border-white/5",
                      location.pathname === item.path
                        ? "text-mw-orange"
                        : "text-white hover:text-white/80"
                    )}
                  >
                    <span>{item.name}</span>
                    <ArrowRight className={cn(
                      "w-5 h-5 transition-transform opacity-40 group-hover:opacity-100 group-hover:translate-x-1",
                      location.pathname === item.path ? "opacity-100 text-mw-orange" : ""
                    )} />
                  </Link>
                );
              })}
            </nav>
            <div className="mt-auto pb-6 pt-4">
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-3 bg-white text-mw-dark w-full py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-transform active:scale-95 shadow-[0_0_30px_-10px_rgba(255,255,255,0.3)]"
              >
                <span>Start A Project</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
