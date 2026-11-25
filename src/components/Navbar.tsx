import { Link, useLocation } from "react-router-dom";
import { NAVIGATION } from "../data/content";
import { SOLUTIONS_PILLARS } from "../data/solutionsData";
import { INDUSTRIES } from "../data/industriesData";
import { cn } from "../lib/utils";
import { useState, useEffect, useRef, type MutableRefObject, type Dispatch, type SetStateAction } from "react";
import {
  Menu,
  X,
  ArrowRight,
  ChevronDown,
  Layers,
  Compass,
  Users,
  BookOpen,
  Video,
  Building2,
  Cpu,
  TrendingUp,
  Briefcase,
  MapPin,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CONVERSION_CTAS } from "../data/companyStats";
import { trackPrimaryCtaClick } from "../lib/analytics";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
  const [industriesDropdownOpen, setIndustriesDropdownOpen] = useState(false);
  const [workDropdownOpen, setWorkDropdownOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [mobileExpandedSection, setMobileExpandedSection] = useState<string | null>(null);

  const solutionsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const industriesTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const workTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const aboutTimeoutRef = useRef<NodeJS.Timeout | null>(null);
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
    setSolutionsDropdownOpen(false);
    setIndustriesDropdownOpen(false);
    setWorkDropdownOpen(false);
    setAboutDropdownOpen(false);
  }, [location.pathname, location.hash]);

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

  const handleEnter = (
    ref: MutableRefObject<ReturnType<typeof setTimeout> | null>,
    setter: Dispatch<SetStateAction<boolean>>
  ) => {
    if (ref.current) clearTimeout(ref.current);
    setter(true);
  };

  const handleLeave = (
    ref: MutableRefObject<ReturnType<typeof setTimeout> | null>,
    setter: Dispatch<SetStateAction<boolean>>
  ) => {
    ref.current = setTimeout(() => setter(false), 150);
  };

  const isScrolled = scrolled && !mobileMenuOpen;

  const getPillarIcon = (idx: number) => {
    if (idx === 0) return Cpu;
    if (idx === 1) return TrendingUp;
    return Briefcase;
  };

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
              ? "max-w-7xl rounded-2xl bg-[#02040a]/80 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
              : "bg-transparent border-b border-transparent"
          )}
        >
          <div
            className={cn(
              "flex items-center justify-between gap-4 transition-all duration-500 mx-auto",
              isScrolled ? "px-5 lg:px-7 py-3" : "container px-6 md:px-10 py-5"
            )}
          >
            <Link to="/" className="relative z-50 flex items-center group transition-opacity hover:opacity-80 shrink-0">
              <img src="/logo.png" alt="Mindware Consulting" className="h-8 md:h-9 w-auto object-contain" />
            </Link>

            {/* Desktop Nav: Home, Solutions, Industries, Our Work, About, Insights, Careers, Contact */}
            <nav className="hidden lg:flex items-center gap-3.5 xl:gap-5 2xl:gap-6">
              {NAVIGATION.map((item) => {
                if (item.name === "Solutions") {
                  const isSolutionsActive =
                    location.pathname.startsWith("/solutions") ||
                    location.pathname.startsWith("/services") ||
                    location.pathname.startsWith("/pricing") ||
                    location.pathname.startsWith("/service-areas");

                  return (
                    <div
                      key={item.name}
                      className="relative"
                      onMouseEnter={() => handleEnter(solutionsTimeoutRef, setSolutionsDropdownOpen)}
                      onMouseLeave={() => handleLeave(solutionsTimeoutRef, setSolutionsDropdownOpen)}
                    >
                      <Link
                        to="/solutions"
                        aria-label="Navigate to Solutions overview"
                        className={cn(
                          "text-[13px] xl:text-sm font-medium tracking-wide transition-colors hover:text-white relative whitespace-nowrap inline-flex items-center gap-1 py-1",
                          isSolutionsActive
                            ? "text-white after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-[2px] after:bg-mw-orange after:rounded-full"
                            : "text-white/60"
                        )}
                      >
                        {item.name}
                        <ChevronDown
                          className={cn(
                            "w-3.5 h-3.5 transition-transform duration-200",
                            solutionsDropdownOpen ? "rotate-180 text-white" : "opacity-60"
                          )}
                        />
                      </Link>

                      <AnimatePresence>
                        {solutionsDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 6, scale: 0.98 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[440px] z-50 pointer-events-auto"
                          >
                            <div className="rounded-2xl bg-[#090d16] border border-white/10 p-3 shadow-2xl shadow-black/80 backdrop-blur-2xl">
                              <div className="px-3 py-1.5 text-[11px] font-semibold text-white/40 uppercase tracking-wider flex items-center justify-between">
                                <span>Enterprise Growth Pillars</span>
                                <span className="text-[10px] text-mw-orange font-mono">ACQUIRE → PROTECT</span>
                              </div>

                              <div className="space-y-1 mt-1">
                                {SOLUTIONS_PILLARS.map((pillar, idx) => {
                                  const PIcon = getPillarIcon(idx);
                                  return (
                                    <Link
                                      key={pillar.id}
                                      to={`/solutions#${pillar.id}`}
                                      onClick={() => setSolutionsDropdownOpen(false)}
                                      className="group flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors"
                                    >
                                      <div className="w-8 h-8 rounded-lg bg-mw-orange/10 border border-mw-orange/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-mw-orange group-hover:text-white transition-colors">
                                        <PIcon className="w-4 h-4 text-mw-orange group-hover:text-white" />
                                      </div>
                                      <div className="min-w-0">
                                        <div className="text-sm font-semibold text-white group-hover:text-mw-orange transition-colors">
                                          {pillar.title}
                                        </div>
                                        <div className="text-[12px] text-white/50 leading-snug line-clamp-2 mt-0.5">
                                          {pillar.subtitle}
                                        </div>
                                      </div>
                                    </Link>
                                  );
                                })}
                              </div>

                              <div className="mt-2 pt-2 border-t border-white/5 px-2 grid grid-cols-2 gap-2">
                                <Link
                                  to="/services"
                                  onClick={() => setSolutionsDropdownOpen(false)}
                                  className="flex items-center justify-between p-2 rounded-xl bg-white/[0.03] hover:bg-white/10 border border-white/10 text-xs font-medium text-white/80 hover:text-white transition-colors"
                                >
                                  <span className="inline-flex items-center gap-1.5 truncate">
                                    <Layers className="w-3.5 h-3.5 text-mw-orange shrink-0" />
                                    <span>All Capabilities</span>
                                  </span>
                                  <ArrowRight className="w-3 h-3 shrink-0" />
                                </Link>
                                <Link
                                  to="/pricing"
                                  onClick={() => setSolutionsDropdownOpen(false)}
                                  className="flex items-center justify-between p-2 rounded-xl bg-white/[0.03] hover:bg-white/10 border border-white/10 text-xs font-medium text-white/80 hover:text-white transition-colors"
                                >
                                  <span className="truncate">Growth Tiers</span>
                                  <ArrowRight className="w-3 h-3 text-mw-orange shrink-0" />
                                </Link>
                              </div>

                              <div className="mt-1.5 px-2 grid grid-cols-1 gap-1.5">
                                <Link
                                  to="/business-growth-season"
                                  onClick={() => setSolutionsDropdownOpen(false)}
                                  className="flex items-center justify-between p-2 rounded-xl bg-mw-orange/15 hover:bg-mw-orange/25 border border-mw-orange/30 text-xs font-semibold text-white transition-colors"
                                >
                                  <span className="inline-flex items-center gap-1.5">
                                    <Sparkles className="w-3.5 h-3.5 text-mw-orange" />
                                    <span>Business Growth Season 2026</span>
                                  </span>
                                  <ArrowRight className="w-3 h-3 text-mw-orange" />
                                </Link>
                                <Link
                                  to="/service-areas"
                                  onClick={() => setSolutionsDropdownOpen(false)}
                                  className="flex items-center justify-between p-2 rounded-xl bg-white/[0.03] hover:bg-white/10 border border-white/10 text-xs font-medium text-white/80 hover:text-white transition-colors"
                                >
                                  <span className="inline-flex items-center gap-1.5">
                                    <MapPin className="w-3.5 h-3.5 text-mw-orange" />
                                    <span>Service Areas (36 States &amp; FCT)</span>
                                  </span>
                                  <ArrowRight className="w-3 h-3 text-mw-orange" />
                                </Link>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                if (item.name === "Industries") {
                  const isIndustriesActive = location.pathname.startsWith("/industries");
                  return (
                    <div
                      key={item.name}
                      className="relative"
                      onMouseEnter={() => handleEnter(industriesTimeoutRef, setIndustriesDropdownOpen)}
                      onMouseLeave={() => handleLeave(industriesTimeoutRef, setIndustriesDropdownOpen)}
                    >
                      <Link
                        to="/industries"
                        aria-label="Navigate to Industries overview"
                        className={cn(
                          "text-[13px] xl:text-sm font-medium tracking-wide transition-colors hover:text-white relative whitespace-nowrap inline-flex items-center gap-1 py-1",
                          isIndustriesActive
                            ? "text-white after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-[2px] after:bg-mw-orange after:rounded-full"
                            : "text-white/60"
                        )}
                      >
                        {item.name}
                        <ChevronDown
                          className={cn(
                            "w-3.5 h-3.5 transition-transform duration-200",
                            industriesDropdownOpen ? "rotate-180 text-white" : "opacity-60"
                          )}
                        />
                      </Link>

                      <AnimatePresence>
                        {industriesDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 6, scale: 0.98 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[430px] z-50 pointer-events-auto"
                          >
                            <div className="rounded-2xl bg-[#090d16] border border-white/10 p-3 shadow-2xl shadow-black/80 backdrop-blur-2xl">
                              <div className="px-3 py-1.5 text-[11px] font-semibold text-white/40 uppercase tracking-wider flex items-center justify-between">
                                <span>Sector Specializations</span>
                                <span className="text-[10px] text-mw-orange font-mono">Construction Flagship</span>
                              </div>

                              <div className="space-y-1 mt-1">
                                {INDUSTRIES.map((ind) => (
                                  <Link
                                    key={ind.id}
                                    to={`/industries/${ind.slug}`}
                                    onClick={() => setIndustriesDropdownOpen(false)}
                                    className={cn(
                                      "group flex items-start gap-3 p-2.5 rounded-xl transition-colors",
                                      ind.isFlagship
                                        ? "bg-mw-orange/10 border border-mw-orange/25 hover:bg-mw-orange/15"
                                        : "hover:bg-white/5 border border-transparent"
                                    )}
                                  >
                                    <div
                                      className={cn(
                                        "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors",
                                        ind.isFlagship
                                          ? "bg-mw-orange text-white"
                                          : "bg-white/5 border border-white/10 text-mw-orange group-hover:bg-mw-orange group-hover:text-white"
                                      )}
                                    >
                                      <Building2 className="w-4 h-4" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                      <div className="text-xs font-semibold text-white group-hover:text-mw-orange transition-colors flex items-center justify-between gap-2">
                                        <span className="truncate">{ind.shortName}</span>
                                        {ind.isFlagship && (
                                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-mw-orange text-white font-bold uppercase tracking-wider shrink-0">
                                            Flagship
                                          </span>
                                        )}
                                      </div>
                                      <div className="text-[11px] text-white/50 line-clamp-1 mt-0.5">
                                        {ind.tagline}
                                      </div>
                                    </div>
                                  </Link>
                                ))}
                              </div>

                              <div className="mt-2 pt-2 border-t border-white/5 px-2">
                                <Link
                                  to="/industries"
                                  onClick={() => setIndustriesDropdownOpen(false)}
                                  className="flex items-center justify-between text-xs text-white/70 hover:text-white py-1.5 px-2 rounded-lg hover:bg-white/5 transition-colors font-medium"
                                >
                                  <span>Explore All 6 Focus Industries</span>
                                  <ArrowRight className="w-3.5 h-3.5 text-mw-orange" />
                                </Link>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                if (item.name === "Our Work") {
                  const isWorkActive =
                    location.pathname.startsWith("/portfolio") ||
                    location.pathname.startsWith("/case-studies");
                  return (
                    <div
                      key={item.name}
                      className="relative"
                      onMouseEnter={() => handleEnter(workTimeoutRef, setWorkDropdownOpen)}
                      onMouseLeave={() => handleLeave(workTimeoutRef, setWorkDropdownOpen)}
                    >
                      <Link
                        to="/portfolio"
                        aria-label="Navigate to Our Work and Case Studies"
                        className={cn(
                          "text-[13px] xl:text-sm font-medium tracking-wide transition-colors hover:text-white relative whitespace-nowrap inline-flex items-center gap-1 py-1",
                          isWorkActive
                            ? "text-white after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-[2px] after:bg-mw-orange after:rounded-full"
                            : "text-white/60"
                        )}
                      >
                        {item.name}
                        <ChevronDown
                          className={cn(
                            "w-3.5 h-3.5 transition-transform duration-200",
                            workDropdownOpen ? "rotate-180 text-white" : "opacity-60"
                          )}
                        />
                      </Link>

                      <AnimatePresence>
                        {workDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 6, scale: 0.98 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-80 z-50 pointer-events-auto"
                          >
                            <div className="rounded-2xl bg-[#090d16] border border-white/10 p-2.5 shadow-2xl shadow-black/80 backdrop-blur-2xl">
                              <div className="px-3 py-1.5 text-[11px] font-semibold text-white/40 uppercase tracking-wider">
                                Client Engagements & Proof
                              </div>

                              <Link
                                to="/portfolio"
                                onClick={() => setWorkDropdownOpen(false)}
                                className="group flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors"
                              >
                                <div className="w-8 h-8 rounded-lg bg-mw-orange/10 border border-mw-orange/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-mw-orange group-hover:text-white transition-colors">
                                  <Layers className="w-4 h-4 text-mw-orange group-hover:text-white" />
                                </div>
                                <div>
                                  <div className="text-sm font-semibold text-white group-hover:text-mw-orange transition-colors">
                                    Selected Projects
                                  </div>
                                  <div className="text-[12px] text-white/50 leading-snug mt-0.5">
                                    Live client platforms across construction, automotive & energy
                                  </div>
                                </div>
                              </Link>

                              <Link
                                to="/portfolio/case-studies"
                                onClick={() => setWorkDropdownOpen(false)}
                                className="group flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors"
                              >
                                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                  <BookOpen className="w-4 h-4 text-blue-400 group-hover:text-white" />
                                </div>
                                <div>
                                  <div className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                                    Case Studies
                                  </div>
                                  <div className="text-[12px] text-white/50 leading-snug mt-0.5">
                                    Commercial challenges, architecture & measurable ROI metrics
                                  </div>
                                </div>
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                if (item.name === "About") {
                  const isAboutActive = location.pathname.startsWith("/about");
                  return (
                    <div
                      key={item.name}
                      className="relative"
                      onMouseEnter={() => handleEnter(aboutTimeoutRef, setAboutDropdownOpen)}
                      onMouseLeave={() => handleLeave(aboutTimeoutRef, setAboutDropdownOpen)}
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
                        <ChevronDown
                          className={cn(
                            "w-3.5 h-3.5 transition-transform duration-200",
                            aboutDropdownOpen ? "rotate-180 text-white" : "opacity-60"
                          )}
                        />
                      </Link>

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
                                About Mindware Consulting Ltd
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
                                  <div className="text-sm font-semibold text-white group-hover:text-mw-orange transition-colors">
                                    Mission, Vision & Values
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
                                  <div className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                                    Leadership & Management
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
                                  <div className="text-sm font-semibold text-white group-hover:text-red-400 transition-colors">
                                    Client Video Testimonials
                                  </div>
                                  <div className="text-[12px] text-white/50 leading-snug mt-0.5">
                                    Verified Corporate Client Video Reviews & Case Proof
                                  </div>
                                </div>
                              </Link>

                              <div className="mt-1 pt-1.5 border-t border-white/5 px-2">
                                <Link
                                  to="/about"
                                  onClick={() => setAboutDropdownOpen(false)}
                                  className="flex items-center justify-between text-xs text-white/60 hover:text-white py-1.5 px-2 rounded-lg hover:bg-white/5 transition-colors font-medium"
                                >
                                  <span>Company Overview & Accreditations</span>
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

                const isActive =
                  item.path === "/"
                    ? location.pathname === "/"
                    : location.pathname.startsWith(item.path);

                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    aria-label={`Navigate to ${item.name} page`}
                    className={cn(
                      "text-[13px] xl:text-sm font-medium tracking-wide transition-colors hover:text-white relative whitespace-nowrap py-1",
                      isActive
                        ? "text-white after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-[2px] after:bg-mw-orange after:rounded-full"
                        : "text-white/60"
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden lg:flex items-center shrink-0">
              <Link
                to={CONVERSION_CTAS.primaryPath}
                onClick={() => trackPrimaryCtaClick("navbar-desktop", CONVERSION_CTAS.primaryPath)}
                className="group flex items-center gap-2 bg-white text-mw-dark hover:bg-mw-orange hover:text-white px-4 xl:px-5 py-2.5 rounded-full text-xs xl:text-sm font-semibold whitespace-nowrap shrink-0 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-white/10"
              >
                <span>{CONVERSION_CTAS.primaryLabel}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 shrink-0" />
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              className="lg:hidden relative z-50 w-11 h-11 flex items-center justify-center text-white/90 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mw-orange rounded-xl bg-white/[0.04] border border-white/10 active:scale-95 transition-all"
              onClick={() => {
                const nextOpen = !mobileMenuOpen;
                setMobileMenuOpen(nextOpen);
                if (nextOpen) {
                  if (location.pathname.startsWith("/solutions") || location.pathname.startsWith("/services")) {
                    setMobileExpandedSection("Solutions");
                  } else if (location.pathname.startsWith("/industries")) {
                    setMobileExpandedSection("Industries");
                  } else if (location.pathname.startsWith("/portfolio") || location.pathname.startsWith("/case-studies")) {
                    setMobileExpandedSection("Our Work");
                  } else if (location.pathname.startsWith("/about")) {
                    setMobileExpandedSection("About");
                  } else {
                    setMobileExpandedSection(null);
                  }
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
                if (item.name === "Solutions") {
                  const isActive =
                    location.pathname.startsWith("/solutions") ||
                    location.pathname.startsWith("/services") ||
                    location.pathname.startsWith("/pricing");
                  const isExpanded = mobileExpandedSection === "Solutions";
                  return (
                    <div key={item.name} className="py-2 border-b border-white/5">
                      <div className="flex items-center justify-between">
                        <Link
                          to="/solutions"
                          onClick={() => setMobileMenuOpen(false)}
                          className={cn(
                            "transition-colors py-2 flex items-center gap-2",
                            isActive ? "text-mw-orange" : "text-white hover:text-white/80"
                          )}
                        >
                          <span>Solutions</span>
                        </Link>
                        <button
                          type="button"
                          onClick={() => setMobileExpandedSection(isExpanded ? null : "Solutions")}
                          aria-label={isExpanded ? "Collapse Solutions menu" : "Expand Solutions menu"}
                          className="w-11 h-11 flex items-center justify-center rounded-lg text-white/60 hover:text-white hover:bg-white/5"
                        >
                          <ChevronDown className={cn("w-5 h-5 transition-transform duration-200", isExpanded && "rotate-180 text-mw-orange")} />
                        </button>
                      </div>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden pl-3 mt-1 space-y-1.5 border-l border-white/10 ml-2"
                          >
                            {SOLUTIONS_PILLARS.map((pillar) => (
                              <Link
                                key={pillar.id}
                                to={`/solutions#${pillar.id}`}
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center gap-2.5 text-sm sm:text-base py-2 text-white/75 hover:text-white transition-colors"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-mw-orange shrink-0" />
                                <span>{pillar.title}</span>
                              </Link>
                            ))}
                            <Link
                              to="/services"
                              onClick={() => setMobileMenuOpen(false)}
                              className="flex items-center gap-2.5 text-sm sm:text-base py-2 text-white/75 hover:text-white transition-colors"
                            >
                              <Layers className="w-4 h-4 text-mw-orange shrink-0" />
                              <span>Technical Capabilities</span>
                            </Link>
                            <Link
                              to="/business-growth-season"
                              onClick={() => setMobileMenuOpen(false)}
                              className="flex items-center gap-2.5 text-sm sm:text-base py-2 text-mw-orange hover:text-white transition-colors font-semibold"
                            >
                              <Sparkles className="w-4 h-4 text-mw-orange shrink-0" />
                              <span>Business Growth Season 2026</span>
                            </Link>
                            <Link
                              to="/pricing"
                              onClick={() => setMobileMenuOpen(false)}
                              className="flex items-center gap-2.5 text-sm sm:text-base py-2 text-white/75 hover:text-white transition-colors"
                            >
                              <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0" />
                              <span>Commercial Growth Tiers</span>
                            </Link>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                if (item.name === "Industries") {
                  const isActive = location.pathname.startsWith("/industries");
                  const isExpanded = mobileExpandedSection === "Industries";
                  return (
                    <div key={item.name} className="py-2 border-b border-white/5">
                      <div className="flex items-center justify-between">
                        <Link
                          to="/industries"
                          onClick={() => setMobileMenuOpen(false)}
                          className={cn(
                            "transition-colors py-2 flex items-center gap-2",
                            isActive ? "text-mw-orange" : "text-white hover:text-white/80"
                          )}
                        >
                          <span>Industries</span>
                        </Link>
                        <button
                          type="button"
                          onClick={() => setMobileExpandedSection(isExpanded ? null : "Industries")}
                          aria-label={isExpanded ? "Collapse Industries menu" : "Expand Industries menu"}
                          className="w-11 h-11 flex items-center justify-center rounded-lg text-white/60 hover:text-white hover:bg-white/5"
                        >
                          <ChevronDown className={cn("w-5 h-5 transition-transform duration-200", isExpanded && "rotate-180 text-mw-orange")} />
                        </button>
                      </div>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden pl-3 mt-1 space-y-1.5 border-l border-white/10 ml-2"
                          >
                            {INDUSTRIES.map((ind) => (
                              <Link
                                key={ind.id}
                                to={`/industries/${ind.slug}`}
                                onClick={() => setMobileMenuOpen(false)}
                                className={cn(
                                  "flex items-center justify-between text-sm sm:text-base py-2 pr-2 transition-colors",
                                  ind.isFlagship ? "text-mw-orange font-semibold" : "text-white/75 hover:text-white"
                                )}
                              >
                                <span>{ind.shortName}</span>
                                {ind.isFlagship && (
                                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-mw-orange/20 text-mw-orange uppercase font-bold">
                                    Flagship
                                  </span>
                                )}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                if (item.name === "Our Work") {
                  const isActive =
                    location.pathname.startsWith("/portfolio") ||
                    location.pathname.startsWith("/case-studies");
                  const isExpanded = mobileExpandedSection === "Our Work";
                  return (
                    <div key={item.name} className="py-2 border-b border-white/5">
                      <div className="flex items-center justify-between">
                        <Link
                          to="/portfolio"
                          onClick={() => setMobileMenuOpen(false)}
                          className={cn(
                            "transition-colors py-2 flex items-center gap-2",
                            isActive ? "text-mw-orange" : "text-white hover:text-white/80"
                          )}
                        >
                          <span>Our Work</span>
                        </Link>
                        <button
                          type="button"
                          onClick={() => setMobileExpandedSection(isExpanded ? null : "Our Work")}
                          aria-label={isExpanded ? "Collapse Our Work menu" : "Expand Our Work menu"}
                          className="w-11 h-11 flex items-center justify-center rounded-lg text-white/60 hover:text-white hover:bg-white/5"
                        >
                          <ChevronDown className={cn("w-5 h-5 transition-transform duration-200", isExpanded && "rotate-180 text-mw-orange")} />
                        </button>
                      </div>

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
                              className="flex items-center gap-2.5 text-sm sm:text-base py-2 text-white/75 hover:text-white transition-colors"
                            >
                              <Layers className="w-4 h-4 text-mw-orange shrink-0" />
                              <span>Selected Projects</span>
                            </Link>
                            <Link
                              to="/portfolio/case-studies"
                              onClick={() => setMobileMenuOpen(false)}
                              className="flex items-center gap-2.5 text-sm sm:text-base py-2 text-white/75 hover:text-white transition-colors"
                            >
                              <BookOpen className="w-4 h-4 text-blue-400 shrink-0" />
                              <span>Case Studies</span>
                            </Link>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                if (item.name === "About") {
                  const isAboutActive = location.pathname.startsWith("/about");
                  const isExpanded = mobileExpandedSection === "About";
                  return (
                    <div key={item.name} className="py-2 border-b border-white/5">
                      <div className="flex items-center justify-between">
                        <Link
                          to="/about"
                          onClick={() => setMobileMenuOpen(false)}
                          className={cn(
                            "transition-colors py-2 flex items-center gap-2",
                            isAboutActive ? "text-mw-orange" : "text-white hover:text-white/80"
                          )}
                        >
                          <span>About</span>
                        </Link>
                        <button
                          type="button"
                          onClick={() => setMobileExpandedSection(isExpanded ? null : "About")}
                          aria-label={isExpanded ? "Collapse About menu" : "Expand About menu"}
                          className="w-11 h-11 flex items-center justify-center rounded-lg text-white/60 hover:text-white hover:bg-white/5"
                        >
                          <ChevronDown className={cn("w-5 h-5 transition-transform duration-200", isExpanded && "rotate-180 text-mw-orange")} />
                        </button>
                      </div>

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
                              className="flex items-center gap-2.5 text-sm sm:text-base py-2 text-white/75 hover:text-white transition-colors"
                            >
                              <Compass className="w-4 h-4 text-mw-orange shrink-0" />
                              <span>Mission, Vision & Core Values</span>
                            </Link>
                            <Link
                              to="/about/leadership"
                              onClick={() => setMobileMenuOpen(false)}
                              className="flex items-center gap-2.5 text-sm sm:text-base py-2 text-white/75 hover:text-white transition-colors"
                            >
                              <Users className="w-4 h-4 text-blue-400 shrink-0" />
                              <span>Leadership & Management</span>
                            </Link>
                            <Link
                              to="/about/testimonials"
                              onClick={() => setMobileMenuOpen(false)}
                              className="flex items-center gap-2.5 text-sm sm:text-base py-2 text-white/75 hover:text-white transition-colors"
                            >
                              <Video className="w-4 h-4 text-red-400 shrink-0" />
                              <span>Client Video Testimonials</span>
                            </Link>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                const isActive =
                  item.path === "/"
                    ? location.pathname === "/"
                    : location.pathname.startsWith(item.path);

                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "transition-colors flex items-center justify-between group py-3 border-b border-white/5",
                      isActive ? "text-mw-orange" : "text-white hover:text-white/80"
                    )}
                  >
                    <span>{item.name}</span>
                    <ArrowRight
                      className={cn(
                        "w-5 h-5 transition-transform opacity-40 group-hover:opacity-100 group-hover:translate-x-1",
                        isActive ? "opacity-100 text-mw-orange" : ""
                      )}
                    />
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto pb-6 pt-4">
              <Link
                to={CONVERSION_CTAS.primaryPath}
                onClick={() => {
                  trackPrimaryCtaClick("navbar-mobile", CONVERSION_CTAS.primaryPath);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-3 bg-mw-orange text-white w-full min-h-[48px] py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-transform active:scale-95 shadow-[0_0_30px_-10px_rgba(249,115,22,0.4)]"
              >
                <span>{CONVERSION_CTAS.primaryLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
