import { motion, AnimatePresence, useInView } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Plus,
  Sparkles,
  Briefcase,
  Building2,
  Cpu,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Pause,
  Play
} from "lucide-react";
import { Link } from "react-router-dom";
import { PORTFOLIO } from "../data/content";
import { CONVERSION_CTAS } from "../data/companyStats";
import {
  GROWTH_FRAMEWORK,
  SOLUTIONS_PILLARS,
  EIGHT_BUSINESS_OUTCOMES,
  BUSINESS_CHALLENGES_SOLVED,
  STRATEGIC_POSITIONING
} from "../data/solutionsData";
import { GROWTH_SEASON_TRACKS } from "../data/campaignData";
import { INDUSTRIES } from "../data/industriesData";
import { INSIGHTS } from "../data/insights";
import { cn, EASE } from "../lib/utils";
import {
  trackPrimaryCtaClick,
  trackWhatsAppClick,
  trackIndustryConversion,
  trackCampaignConversion
} from "../lib/analytics";
import React, { useRef, useState, useEffect } from "react";
import { FadeInSection } from "../components/FadeInSection";
import { SEO } from "../components/SEO";
import { HomeVideoTestimonials } from "../components/home/HomeVideoTestimonials";
import { CertificationsSection } from "../components/home/CertificationsSection";
import { GoogleClientReviews } from "../components/reviews/GoogleClientReviews";
import { MEDIA_ASSETS } from "../assets/media";

interface HeroSlide {
  id: string;
  tabLabel: string;
  categoryBadge: string;
  badgeType: "orange" | "blue" | "emerald" | "purple" | "amber";
  overarchingAnchor: string;
  headlineLead: string;
  headlineAccent: string;
  headlineEnd?: string;
  supportingCaption: string;
  image: string;
  alt: string;
  primaryCta: { label: string; path: string };
  secondaryCta: { label: string; path: string };
  statsBadge: { value: string; label: string };
  highlights: string[];
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "website-design",
    tabLabel: "Growth Partner",
    categoryBadge: "Business Growth & Digital Transformation",
    badgeType: "orange",
    overarchingAnchor: STRATEGIC_POSITIONING.brandLine,
    headlineLead: "Build a Stronger Business.",
    headlineAccent: "Transform the Way",
    headlineEnd: "You Grow.",
    supportingCaption: STRATEGIC_POSITIONING.subheadline,
    image: MEDIA_ASSETS.heroGrowthStrategy,
    alt: "Mindware Consulting executive boardroom presenting enterprise digital transformation architecture and business growth systems",
    primaryCta: { label: CONVERSION_CTAS.primaryLabel, path: CONVERSION_CTAS.primaryPath },
    secondaryCta: { label: "Explore Our Solutions", path: "/solutions" },
    statsBadge: { value: "RC 1309926", label: "Since 2016 Advisory" },
    highlights: [
      "Stronger Digital Infrastructure",
      "Attract & Convert Customers",
      "Optimize Core Operations",
      "Unlock Sustainable Growth"
    ]
  },
  {
    id: "seo-growth",
    tabLabel: "Visibility & Acquisition",
    categoryBadge: "Digital Marketing & Customer Acquisition",
    badgeType: "emerald",
    overarchingAnchor: "Mindware Consulting — Your Business Growth and Digital Transformation Partner",
    headlineLead: "Improve Online Visibility &",
    headlineAccent: "Acquire High-Value",
    headlineEnd: "Enterprise Clients.",
    supportingCaption:
      "Data-driven technical SEO, 36-state + FCT local search authority, and structured conversion pipelines that capture procurement buyers and expand commercial demand.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2000&q=85",
    alt: "Search intelligence analytics dashboard displaying enterprise visibility trajectories and acquisition funnels",
    primaryCta: { label: CONVERSION_CTAS.primaryLabel, path: "/contact?category=marketing-customer-acquisition&service=seo&cta=business-growth-review" },
    secondaryCta: { label: "View Acquisition Solutions", path: "/solutions#digital-marketing-customer-acquisition" },
    statsBadge: { value: "Search", label: "Commercial Authority" },
    highlights: [
      "Technical & Geo-SEO Authority",
      "Higher Customer Conversion",
      "Qualified Tender Pipelines",
      "Business Development Support"
    ]
  },
  {
    id: "construction-flagship",
    tabLabel: "Construction Flagship",
    categoryBadge: "Flagship Industry Specialization",
    badgeType: "amber",
    overarchingAnchor: "Mindware Consulting — Your Business Growth and Digital Transformation Partner",
    headlineLead: "Digital Transformation Built For",
    headlineAccent: "Construction & Civil",
    headlineEnd: "Engineering Leaders.",
    supportingCaption:
      "Trusted by Nigerian civil contractors, structural engineers, and EPC firms to pass BPP procurement scrutiny, showcase heavy plant readiness, and win flagship contracts.",
    image: MEDIA_ASSETS.heroConstructionFlagship,
    alt: "Major civil engineering and bridge infrastructure construction showcase representing Mindware Consulting flagship sector specialization",
    primaryCta: { label: "Explore Construction Solutions", path: "/industries/construction-civil-engineering" },
    secondaryCta: { label: CONVERSION_CTAS.primaryLabel, path: "/contact?category=construction-business-growth&industry=construction&cta=business-growth-review" },
    statsBadge: { value: "Flagship", label: "Construction Sector Leaders" },
    highlights: [
      "BPP Tender Readiness Centers",
      "Heavy Plant & Asset Registers",
      "Interactive Project Case Proof",
      "COREN & NSE Authority Portals"
    ]
  },
  {
    id: "app-development",
    tabLabel: "Systems & Apps",
    categoryBadge: "Operational Systems & Custom Software",
    badgeType: "blue",
    overarchingAnchor: "Mindware Consulting — Your Business Growth and Digital Transformation Partner",
    headlineLead: "Adopt Technology Systems That",
    headlineAccent: "Optimize Operations",
    headlineEnd: "At Scale.",
    supportingCaption:
      "Custom web applications, client portals, CRM workflows, and operational dashboards engineered to streamline project management and multi-branch execution.",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=2000&q=85",
    alt: "Custom enterprise software application and operational portal interfaces built by Mindware Consulting",
    primaryCta: { label: "Explore Tech Transformation", path: "/solutions#digital-transformation-technology" },
    secondaryCta: { label: CONVERSION_CTAS.primaryLabel, path: "/contact?category=digital-transformation&service=app-development&cta=business-growth-review" },
    statsBadge: { value: "Proactive", label: "Managed Care & Security" },
    highlights: [
      "Custom Operational Portals",
      "API & CRM Automations",
      "Project Management Tooling",
      "Enterprise Data Security"
    ]
  },
  {
    id: "social-media",
    tabLabel: "Brand Authority",
    categoryBadge: "Commercial Positioning & Demand",
    badgeType: "purple",
    overarchingAnchor: "Mindware Consulting — Your Business Growth and Digital Transformation Partner",
    headlineLead: "Turn Attention Into Authority,",
    headlineAccent: "Commercial Trust &",
    headlineEnd: "Client Retention.",
    supportingCaption:
      "Executive brand storytelling, B2B LinkedIn authority, and measurable social acquisition engines aligned directly to sales conversion targets.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=2000&q=85",
    alt: "Brand positioning and audience engagement analytics studio at Mindware Consulting",
    primaryCta: { label: "Explore Marketing Solutions", path: "/solutions#digital-marketing-customer-acquisition" },
    secondaryCta: { label: CONVERSION_CTAS.primaryLabel, path: "/contact?category=marketing-customer-acquisition&service=social-media&cta=business-growth-review" },
    statsBadge: { value: "Multi-Channel", label: "Lead & Brand Funnels" },
    highlights: [
      "B2B Brand Authority",
      "Targeted Ad Funnels",
      "Multi-Channel Attribution",
      "Commercial Lead Routing"
    ]
  },
  {
    id: "consultancy",
    tabLabel: "Growth Advisory",
    categoryBadge: "Business Growth & Management Consulting",
    badgeType: "orange",
    overarchingAnchor: "Mindware Consulting — Your Business Growth and Digital Transformation Partner",
    headlineLead: "Strengthen Business Development &",
    headlineAccent: "Project Delivery",
    headlineEnd: "Discipline.",
    supportingCaption:
      "Executive growth roadmaps, business development restructuring, operational management consulting, and B2B corporate capability enablement.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=2000&q=85",
    alt: "Executive boardroom strategy session with enterprise growth blueprints and tech roadmaps",
    primaryCta: { label: "Explore Consulting Solutions", path: "/solutions#business-growth-management-consulting" },
    secondaryCta: { label: CONVERSION_CTAS.primaryLabel, path: "/contact?category=business-growth-consulting&service=consultancy&cta=business-growth-review" },
    statsBadge: { value: "Executive", label: "B2B Growth Advisory" },
    highlights: [
      "Business Development Strategy",
      "Operational & Project Governance",
      "Corporate Team Enablement",
      "Sustainable Growth Systems"
    ]
  }
];

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const touchStartXRef = useRef<number | null>(null);

  const SLIDE_DURATION = 6500; // 6.5 seconds per slide
  const TICK_INTERVAL = 50;

  // Auto-advance timer with progress bar
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const increment = (TICK_INTERVAL / SLIDE_DURATION) * 100;
        if (prev + increment >= 100) {
          setCurrentSlide((curr) => (curr + 1) % HERO_SLIDES.length);
          return 0;
        }
        return prev + increment;
      });
    }, TICK_INTERVAL);

    return () => clearInterval(timer);
  }, [isPaused, currentSlide]);

  const handleSelectSlide = (index: number) => {
    setCurrentSlide(index);
    setProgress(0);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((curr) => (curr - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
    setProgress(0);
  };

  const handleNextSlide = () => {
    setCurrentSlide((curr) => (curr + 1) % HERO_SLIDES.length);
    setProgress(0);
  };

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      handleNextSlide();
    } else if (diff < -50) {
      handlePrevSlide();
    }
    touchStartXRef.current = null;
  };

  const activeSlide = HERO_SLIDES[currentSlide];

  return (
    <section
      aria-label="Mindware Consulting Showcase"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative min-h-[92vh] lg:min-h-[96vh] flex flex-col justify-between pt-24 sm:pt-36 pb-8 sm:pb-12 overflow-hidden bg-[#02040a]"
    >
      {/* Background Image Slider with Smooth Crossfade & Subtle Ken Burns Zoom */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <AnimatePresence initial={false}>
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1.02 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <img
              src={activeSlide.image}
              alt={activeSlide.alt}
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>

        {/* Cinematic Vignette, Darkening, and Theme Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] via-[#02040a]/85 to-[#02040a]/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#02040a] via-[#02040a]/90 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/[0.04] via-transparent to-transparent pointer-events-none" />

        {/* Dynamic ambient color glow based on slide */}
        <motion.div
          key={`glow-${activeSlide.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className={cn(
            "absolute -top-32 right-0 w-[600px] h-[600px] rounded-full blur-[140px] mix-blend-screen pointer-events-none",
            activeSlide.badgeType === "orange" && "bg-mw-orange",
            activeSlide.badgeType === "blue" && "bg-blue-600",
            activeSlide.badgeType === "emerald" && "bg-emerald-500",
            activeSlide.badgeType === "purple" && "bg-purple-600",
            activeSlide.badgeType === "amber" && "bg-amber-500"
          )}
        />
      </div>

      {/* Main Hero Content Area */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 md:px-12 flex-1 flex flex-col justify-center">
        <div className="max-w-4xl lg:max-w-5xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.id}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Overarching Strategic Anchor & Category Pill */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-6 md:mb-8">
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.07] border border-white/10 backdrop-blur-md shadow-sm">
                  <span
                    className={cn(
                      "w-2 h-2 rounded-full animate-pulse",
                      activeSlide.badgeType === "orange" && "bg-mw-orange shadow-[0_0_8px_#ff4d00]",
                      activeSlide.badgeType === "blue" && "bg-blue-400 shadow-[0_0_8px_#3b82f6]",
                      activeSlide.badgeType === "emerald" && "bg-emerald-400 shadow-[0_0_8px_#10b981]",
                      activeSlide.badgeType === "purple" && "bg-purple-400 shadow-[0_0_8px_#a855f7]",
                      activeSlide.badgeType === "amber" && "bg-amber-400 shadow-[0_0_8px_#f59e0b]"
                    )}
                  />
                  <span className="text-xs md:text-sm font-semibold tracking-wider uppercase text-white/90">
                    {activeSlide.categoryBadge}
                  </span>
                  <span className="text-white/30 text-xs">|</span>
                  <span className="text-[11px] font-medium text-white/60 hidden sm:inline">
                    Slide {String(currentSlide + 1).padStart(2, "0")} / {String(HERO_SLIDES.length).padStart(2, "0")}
                  </span>
                </div>

                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-mw-orange/10 border border-mw-orange/25 text-mw-orange text-xs md:text-sm font-semibold tracking-wide">
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span>{activeSlide.overarchingAnchor}</span>
                </div>
              </div>

              {/* Main Headline with Highlight Accent */}
              <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-bold font-display tracking-tight mb-6 md:mb-8 leading-[1.08] text-white">
                {activeSlide.headlineLead}{" "}
                <span
                  className={cn(
                    "inline-block",
                    activeSlide.badgeType === "orange" && "text-transparent bg-clip-text bg-gradient-to-r from-mw-orange via-orange-400 to-amber-300",
                    activeSlide.badgeType === "blue" && "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300",
                    activeSlide.badgeType === "emerald" && "text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-green-300",
                    activeSlide.badgeType === "purple" && "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-indigo-300",
                    activeSlide.badgeType === "amber" && "text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-yellow-300"
                  )}
                >
                  {activeSlide.headlineAccent}
                </span>{" "}
                {activeSlide.headlineEnd}
              </h1>

              {/* Supporting Caption */}
              <p className="text-lg md:text-2xl text-white/70 max-w-3xl leading-relaxed font-normal mb-8 md:mb-10">
                {activeSlide.supportingCaption}
              </p>

              {/* Interactive Key Highlights Tags */}
              <div className="flex flex-wrap items-center gap-2 mb-10">
                {activeSlide.highlights.map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-xs md:text-sm text-white/80 backdrop-blur-sm"
                  >
                    <CheckCircle2
                      className={cn(
                        "w-3.5 h-3.5",
                        activeSlide.badgeType === "orange" && "text-mw-orange",
                        activeSlide.badgeType === "blue" && "text-blue-400",
                        activeSlide.badgeType === "emerald" && "text-emerald-400",
                        activeSlide.badgeType === "purple" && "text-purple-400",
                        activeSlide.badgeType === "amber" && "text-amber-400"
                      )}
                    />
                    <span>{item}</span>
                  </span>
                ))}
              </div>

              {/* Call-to-Action Group */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                <Link
                  to={activeSlide.primaryCta.path}
                  onClick={() => trackPrimaryCtaClick(`home-hero-primary-${activeSlide.id}`, activeSlide.primaryCta.path)}
                  className={cn(
                    "inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-sm md:text-base transition-all duration-300 shadow-xl hover:scale-105 active:scale-95 text-white w-full sm:w-auto text-center min-h-[48px]",
                    activeSlide.badgeType === "orange" && "bg-mw-orange hover:bg-mw-orange-hover shadow-mw-orange/25",
                    activeSlide.badgeType === "blue" && "bg-blue-600 hover:bg-blue-500 shadow-blue-600/25",
                    activeSlide.badgeType === "emerald" && "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/25",
                    activeSlide.badgeType === "purple" && "bg-purple-600 hover:bg-purple-500 shadow-purple-600/25",
                    activeSlide.badgeType === "amber" && "bg-amber-600 hover:bg-amber-500 shadow-amber-600/25"
                  )}
                >
                  <span>{activeSlide.primaryCta.label}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to={activeSlide.secondaryCta.path}
                  onClick={() => trackPrimaryCtaClick(`home-hero-secondary-${activeSlide.id}`, activeSlide.secondaryCta.path)}
                  className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 rounded-full font-semibold text-sm md:text-base text-white/90 bg-white/5 hover:bg-white/10 border border-white/15 backdrop-blur-md transition-all hover:scale-105 active:scale-95 hover:border-white/30 w-full sm:w-auto text-center min-h-[48px]"
                >
                  <span>{activeSlide.secondaryCta.label}</span>
                </Link>

                {/* Floating Metric Pill */}
                <div className="hidden lg:inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/[0.03] border border-white/10 ml-2">
                  <div
                    className={cn(
                      "text-lg font-bold font-sans",
                      activeSlide.badgeType === "orange" && "text-mw-orange",
                      activeSlide.badgeType === "blue" && "text-blue-400",
                      activeSlide.badgeType === "emerald" && "text-emerald-400",
                      activeSlide.badgeType === "purple" && "text-purple-400",
                      activeSlide.badgeType === "amber" && "text-amber-400"
                    )}
                  >
                    {activeSlide.statsBadge.value}
                  </div>
                  <div className="text-xs text-white/60 uppercase tracking-wider leading-tight">
                    {activeSlide.statsBadge.label}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slider Control Deck & Live Indicator Tabs */}
      <div className="container relative z-20 mx-auto px-4 sm:px-6 md:px-12 mt-8 sm:mt-12 md:mt-16">
        <div className="p-3 md:p-4 rounded-2xl md:rounded-3xl bg-[#090d16]/80 border border-white/10 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Slide Tabs Navigation */}
          <div className="flex overflow-x-auto pb-1.5 scrollbar-none touch-pan-x sm:grid sm:grid-cols-3 lg:grid-cols-6 gap-2 w-full md:w-auto flex-1 flex-nowrap sm:flex-wrap">
            {HERO_SLIDES.map((slide, idx) => {
              const isActive = currentSlide === idx;
              return (
                <button
                  key={slide.id}
                  onClick={() => handleSelectSlide(idx)}
                  className={cn(
                    "relative text-left p-2.5 sm:p-3 rounded-xl transition-all duration-300 overflow-hidden flex flex-col justify-between min-w-[130px] sm:min-w-0 shrink-0",
                    isActive
                      ? "bg-white/[0.08] border border-white/15"
                      : "bg-transparent hover:bg-white/[0.03] border border-transparent"
                  )}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="text-[10px] sm:text-[11px] font-mono text-white/50">
                      0{idx + 1}
                    </span>
                    {isActive && (
                      <span
                        className={cn(
                          "w-1.5 h-1.5 rounded-full",
                          slide.badgeType === "orange" && "bg-mw-orange",
                          slide.badgeType === "blue" && "bg-blue-400",
                          slide.badgeType === "emerald" && "bg-emerald-400",
                          slide.badgeType === "purple" && "bg-purple-400",
                          slide.badgeType === "amber" && "bg-amber-400"
                        )}
                      />
                    )}
                  </div>
                  <span
                    className={cn(
                      "text-[11px] sm:text-xs font-semibold truncate",
                      isActive ? "text-white" : "text-white/60 hover:text-white/90"
                    )}
                  >
                    {slide.tabLabel}
                  </span>

                  {/* Real-time Progress Bar for Active Slide */}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-white/10 overflow-hidden">
                      <motion.div
                        className={cn(
                          "h-full",
                          slide.badgeType === "orange" && "bg-mw-orange",
                          slide.badgeType === "blue" && "bg-blue-400",
                          slide.badgeType === "emerald" && "bg-emerald-400",
                          slide.badgeType === "purple" && "bg-purple-400",
                          slide.badgeType === "amber" && "bg-amber-400"
                        )}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Controls: Prev / Next / Pause / Counter */}
          <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-white/5">
            {/* Slide Index Counter */}
            <div className="text-xs font-mono text-white/50 px-2">
              <strong className="text-white font-sans text-sm">0{currentSlide + 1}</strong>
              <span className="mx-1">/</span>
              <span>0{HERO_SLIDES.length}</span>
            </div>

            {/* Play/Pause Button */}
            <button
              onClick={() => setIsPaused(!isPaused)}
              aria-label={isPaused ? "Play slider" : "Pause slider"}
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
              title={isPaused ? "Resume autoplay" : "Pause autoplay"}
            >
              {isPaused ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5" />}
            </button>

            {/* Prev Button */}
            <button
              onClick={handlePrevSlide}
              aria-label="Previous slide"
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNextSlide}
              aria-label="Next slide"
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function AnimatedCounter({ end, duration = 2, suffix = "", prefix = "" }: { end: number, duration?: number, suffix?: string, prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  useEffect(() => {
    if (isInView) {
      let startTimestamp: number;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        
        // easeOutQuad easing
        const easeOutProgress = 1 - (1 - progress) * (1 - progress);
        
        setCount(Math.floor(easeOutProgress * end));
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{count}{suffix}
    </span>
  );
}

function GrowthMetrics() {
  const metrics = [
    { label: "Years Corporate Practice (Since 2016)", value: 10, suffix: "+", prefix: "" },
    { label: "Integrated Solution Practices", value: 3, suffix: "", prefix: "0" },
    { label: "Core Commercial Sectors", value: 6, suffix: "", prefix: "0" },
    { label: "Verified Company Credentials", value: 7, suffix: "", prefix: "0" },
  ];

  return (
    <FadeInSection className="py-14 sm:py-20 bg-[#02040a] border-t border-white/5 relative z-10 overflow-hidden">
      <h2 className="sr-only">Mindware Consulting Institutional Anchors</h2>
      <div className="absolute inset-0 bg-gradient-to-b from-mw-orange/5 to-transparent mix-blend-screen pointer-events-none" />
      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:divide-x divide-white/5">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
              className={cn("flex flex-col items-center md:items-start text-center md:text-left", i !== 0 && "pl-0 md:pl-8 lg:pl-12")}
            >
              <div className="text-3xl sm:text-5xl md:text-6xl font-sans font-bold tracking-tight text-white mb-2 drop-shadow-[0_0_30px_rgba(255,255,255,0.12)]">
                <AnimatedCounter end={metric.value} suffix={metric.suffix} prefix={metric.prefix} />
              </div>
              <p className="text-white/55 font-medium uppercase tracking-[0.16em] text-[10px] md:text-xs leading-snug">
                {metric.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </FadeInSection>
  );
}

function BusinessChallengesSection() {
  return (
    <FadeInSection className="py-20 sm:py-28 bg-[#030712] border-t border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-mw-orange" />
              <span className="text-[10px] font-sans tracking-[0.2em] uppercase font-bold text-mw-orange">
                Business Challenges We Help Solve
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight text-white">
              Practical Commercial Solutions for Real Growth Bottlenecks.
            </h2>
          </div>

          <p className="text-sm sm:text-base text-white/65 max-w-md leading-relaxed">
            Built for business owners, contractors, developers, and executives who require measurable business growth rather than vanity agency output.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {BUSINESS_CHALLENGES_SOLVED.map((item, idx) => (
            <motion.div
              key={item.problem}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (idx % 3) * 0.08, ease: EASE }}
              className="p-6 sm:p-7 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-mw-orange/40 transition-colors flex flex-col justify-between gap-5"
            >
              <div className="space-y-2.5">
                <div className="text-xs font-mono font-bold text-mw-orange">0{idx + 1}</div>
                <h3 className="text-lg font-display font-bold text-white leading-snug">
                  {item.problem}
                </h3>
                <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                  {item.detail}
                </p>
              </div>
              <div className="pt-4 border-t border-white/10 flex items-start gap-2 text-xs text-emerald-300/90 leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{item.fix}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </FadeInSection>
  );
}

function TrustedBy() {
  const partnerLogos = [
    "/logos/Juptree Automobile Logo.jpeg",
    "/logos/bcale.jpg",
    "/logos/C1.jpg",
    "/logos/C2.jpg",
    "/logos/C3.jpg",
    "/logos/C5.jpg",
    "/logos/C8.jpg",
    "/logos/crescon.png",
    "/logos/crystal-link.jpg",
    "/logos/egenibo.png",
    "/logos/frank-view.jpeg",
    "/logos/klogo.jpg",
    "/logos/logo-5.jpeg",
    "/logos/logo.jpg",
    "/logos/MH2.jpg",
    "/logos/MH3.jpg",
    "/logos/MH4.jpg",
    "/logos/MH5.jpg",
    "/logos/MH8.jpg",
    "/logos/p2.png",
    "/logos/whatsapp-logo.jpeg"
  ];

  return (
    <FadeInSection className="py-12 sm:py-20 md:py-24 bg-[#02040a] relative overflow-hidden border-t border-white/5">
      <h2 className="sr-only">Our Partners</h2>
      <div className="container mx-auto px-4 sm:px-6 md:px-12 mb-8 sm:mb-12 relative z-20">
        <p className="text-center text-white/40 text-[10px] uppercase tracking-[0.3em] font-semibold">
          Trusted by innovative companies worldwide
        </p>
      </div>
      
      <div className="relative flex overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-16 sm:w-24 md:w-64 bg-gradient-to-r from-[#02040a] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 sm:w-24 md:w-64 bg-gradient-to-l from-[#02040a] to-transparent z-10 pointer-events-none" />
        
        <motion.div
          className="flex items-center gap-8 sm:gap-10 md:gap-16 min-w-max pr-8 sm:pr-10 md:pr-16"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 50, ease: "linear", repeat: Infinity }}
        >
          {[...partnerLogos, ...partnerLogos].map((logo, i) => (
            <div key={i} className="flex items-center justify-center shrink-0">
              <img 
                src={logo} 
                alt="Client logo" 
                className="h-16 sm:h-20 md:h-24 w-auto object-contain opacity-80 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500 rounded-md"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </FadeInSection>
  );
}

function SelfSelection() {
  const pillarsWithRoutes = [
    { id: "01", pillar: SOLUTIONS_PILLARS[0], path: "/solutions#digital-transformation-technology", icon: Cpu },
    { id: "02", pillar: SOLUTIONS_PILLARS[1], path: "/solutions#digital-marketing-customer-acquisition", icon: TrendingUp },
    { id: "03", pillar: SOLUTIONS_PILLARS[2], path: "/solutions#business-growth-management-consulting", icon: Briefcase }
  ];

  return (
    <FadeInSection className="py-16 sm:py-24 lg:py-36 bg-mw-dark relative z-10 border-t border-white/5 overflow-hidden">
      <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-mw-orange/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-mw-orange" />
              <span className="text-[10px] font-sans tracking-[0.2em] uppercase font-bold text-white/50">
                Strategic Positioning
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight leading-[1.1] text-white">
              Your Business Growth & Digital Transformation Partner.
            </h2>
            <p className="text-base sm:text-lg text-white/60 font-light leading-relaxed mb-8">
              We go far beyond isolated websites or campaigns. Select a strategic solution pillar or review all 8 commercial outcomes we deliver for ambitious companies.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
              {EIGHT_BUSINESS_OUTCOMES.map((outcome) => (
                <div key={outcome} className="flex items-start gap-2 text-xs text-white/80 p-2.5 rounded-xl bg-white/[0.02] border border-white/10">
                  <CheckCircle2 className="w-3.5 h-3.5 text-mw-orange shrink-0 mt-0.5" />
                  <span>{outcome}</span>
                </div>
              ))}
            </div>

            <Link
              to="/solutions"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-mw-orange hover:text-white transition-colors"
            >
              <span>Explore Complete Growth Architecture</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-5">
            {pillarsWithRoutes.map(({ id, pillar, path, icon: PillarIcon }, i) => (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
              >
                <Link
                  to={path}
                  className="group relative flex items-center justify-between p-6 sm:p-8 md:p-10 border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-mw-orange/50 transition-all duration-500 rounded-2xl overflow-hidden"
                >
                  <div className="absolute -left-4 -top-8 text-[6rem] sm:text-[8rem] font-sans font-bold text-white/[0.02] group-hover:text-white/[0.04] transition-colors duration-500 pointer-events-none select-none leading-none">
                    {id}
                  </div>

                  <div className="relative z-10 flex items-start gap-4 flex-1 min-w-0">
                    <div className="w-11 h-11 rounded-xl bg-mw-orange/10 border border-mw-orange/25 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-mw-orange group-hover:text-white transition-colors">
                      <PillarIcon className="w-5 h-5 text-mw-orange group-hover:text-white" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg sm:text-2xl font-sans font-bold tracking-tight mb-1.5 group-hover:text-mw-orange transition-colors text-white">
                        {pillar.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-white/60 group-hover:text-white/80 transition-colors font-light leading-relaxed">
                        {pillar.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="relative z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-mw-orange group-hover:border-mw-orange transition-all duration-500 shrink-0 ml-4">
                    <ArrowRight className="w-4 h-4 text-white/60 group-hover:text-white group-hover:-rotate-45 transition-all duration-500" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </FadeInSection>
  );
}

function IndustriesFlagshipShowcase() {
  const flagshipIndustry = INDUSTRIES.find((ind) => ind.isFlagship) || INDUSTRIES[0];
  const secondaryIndustries = INDUSTRIES.filter((ind) => ind.id !== flagshipIndustry.id);

  return (
    <FadeInSection className="py-20 sm:py-28 bg-[#03060f] border-t border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-mw-orange" />
              <span className="text-[10px] font-sans tracking-[0.2em] uppercase font-bold text-mw-orange">
                Industry Expertise · Construction Flagship
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight text-white">
              Sector-Engineered Growth. Built for High-Stakes Markets.
            </h2>
          </div>

          <Link
            to="/industries"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/70 hover:text-mw-orange border-b border-white/20 hover:border-mw-orange pb-2 transition-colors shrink-0"
          >
            <span>Explore All 6 Focus Industries</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Construction & Civil Engineering Flagship Spotlight */}
        <div className="rounded-3xl border border-mw-orange/35 bg-gradient-to-br from-mw-orange/15 via-[#090d16] to-white/[0.02] p-6 sm:p-8 lg:p-10 mb-8 shadow-2xl">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-mw-orange uppercase tracking-wider font-bold">
                <Building2 className="w-4 h-4" />
                <span>Flagship Market Specialization · #1 Focus Sector</span>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white">
                {flagshipIndustry.name}
              </h3>
              <p className="text-sm sm:text-base text-white/75 leading-relaxed">
                {flagshipIndustry.heroSubheadline} Trusted by Temamost Nigeria Ltd, Solugans & Associates, Cosmozel Nigeria Limited, Bcale Associates, Harmostructs Engineering, Crescon Projects, Watech, and Efudo Construction.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {flagshipIndustry.metrics.map((m) => (
                  <div key={m.label} className="p-3 rounded-xl bg-black/30 border border-white/10">
                    <div className="text-lg font-bold text-mw-orange">{m.value}</div>
                    <div className="text-[11px] text-white/60 leading-tight mt-0.5">{m.label}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to={`/industries/${flagshipIndustry.slug}`}
                  onClick={() => trackIndustryConversion("construction-civil-engineering", "home_flagship_click")}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-mw-orange hover:bg-mw-orange-hover text-white text-xs font-bold uppercase tracking-wider transition-all min-h-[44px]"
                >
                  <span>Explore Construction Solutions</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/contact?category=construction-business-growth&industry=construction&cta=business-growth-review"
                  onClick={() => trackPrimaryCtaClick("home-construction-flagship", "/contact?category=construction-business-growth", "construction-business-growth")}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-semibold uppercase tracking-wider border border-white/10 transition-colors min-h-[44px]"
                >
                  <span>{CONVERSION_CTAS.primaryLabel}</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/15 shadow-xl">
                <img
                  src={MEDIA_ASSETS.heroConstructionFlagship}
                  alt="Civil engineering and construction infrastructure flagship digital specialization"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-xs text-white/90 font-medium">
                  Verified Track Record: 8 Live Construction &amp; Engineering Flagship Builds
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Other 5 Commercial Industries */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {secondaryIndustries.map((ind) => (
            <Link
              key={ind.id}
              to={`/industries/${ind.slug}`}
              className="group p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-mw-orange/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="text-[11px] font-mono text-mw-orange uppercase tracking-wider mb-1.5">
                  {ind.category}
                </div>
                <h4 className="text-base font-bold text-white group-hover:text-mw-orange transition-colors mb-2">
                  {ind.shortName}
                </h4>
                <p className="text-xs text-white/60 line-clamp-2 leading-relaxed">
                  {ind.tagline}
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-white/70 group-hover:text-white">
                <span>View Sector</span>
                <ArrowRight className="w-3.5 h-3.5 text-mw-orange group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </FadeInSection>
  );
}

function LatestWork() {
  const featuredIds = ["temamost-construction", "solugans-construction", "juptree-automobile", "osines-group", "quanxi-limited", "harmostructs-engineering", "eclectic-seals", "crescon-projects", "bcale-associates"];
  const featured = featuredIds
    .map(id => PORTFOLIO.find(p => p.id === id))
    .filter((p): p is typeof PORTFOLIO[0] => Boolean(p));

  const projectsToDisplay = featured.length >= 4 ? featured : PORTFOLIO.slice(0, 4);

  return (
    <FadeInSection className="py-32 lg:py-48 bg-[#02040a] border-t border-white/5 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-mw-orange/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-mw-orange animate-pulse" />
              <span className="text-[10px] font-sans tracking-[0.2em] uppercase font-bold text-white/50">Our Latest Work</span>
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 tracking-tight leading-tight text-white">
              Selected Projects.<br />Proven Outcomes.
            </h2>
            <p className="text-xl md:text-2xl text-white/50 font-light leading-relaxed">
              Explore high-performance digital platforms, architectural portals, and SEO-driven systems we have engineered for forward-thinking brands.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/portfolio/case-studies"
              className="inline-flex items-center gap-2 text-mw-orange font-medium hover:text-orange-400 transition-colors pb-4 border-b border-mw-orange/30 hover:border-mw-orange/80 shrink-0"
            >
              <span className="uppercase tracking-[0.2em] text-xs font-bold">Case Studies</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/portfolio"
              aria-label="View all projects in portfolio"
              className="group hidden sm:inline-flex items-center gap-3 text-white/60 font-medium hover:text-white transition-colors pb-4 border-b border-white/20 hover:border-white/60 shrink-0"
            >
              <span className="uppercase tracking-[0.2em] text-xs font-bold">View all projects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Featured Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-20">
          {projectsToDisplay.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (i % 2) * 0.1, ease: EASE }}
              className="group rounded-[2rem] border border-white/5 bg-white/[0.015] hover:bg-white/[0.035] hover:border-white/20 p-6 md:p-8 transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-white/5 flex items-center justify-center p-3">
                  <Link
                    to={`/portfolio/case-studies/${project.id}`}
                    aria-label={`View case study for ${project.title}`}
                    className="w-full h-full flex items-center justify-center block"
                  >
                    <img
                      src={project.image}
                      alt={`Portfolio preview showing ${project.title} designed for ${project.client}`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                    />
                  </Link>
                  <div className="absolute inset-0 bg-mw-dark/20 group-hover:bg-transparent pointer-events-none transition-colors duration-500" />
                  
                  {/* Floating Case Study Tab */}
                  <Link
                    to={`/portfolio/case-studies/${project.id}`}
                    className="absolute top-4 left-4 bg-[#02040a]/80 backdrop-blur-md border border-white/10 hover:border-mw-orange text-white px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                  >
                    <span>Case Study</span>
                  </Link>

                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit live website for ${project.client}`}
                      className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white hover:text-mw-dark text-white rounded-full flex items-center justify-center transition-all duration-300 shadow-xl"
                    >
                      <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-3 text-xs font-semibold text-mw-orange mb-3">
                  <span>{project.industry}</span>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <span className="text-white/60">{project.service}</span>
                </div>

                <div className="text-sm font-medium text-white/50 mb-1">{project.client}</div>
                <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white group-hover:text-mw-orange transition-colors">
                  <Link to={`/portfolio/case-studies/${project.id}`} className="hover:underline">
                    {project.title}
                  </Link>
                </h3>

                <p className="text-white/60 text-base md:text-lg leading-relaxed mb-6 font-light">
                  {project.challenge}
                </p>

                {project.projectMetrics && (
                  <div className="pt-6 border-t border-white/10 flex items-center justify-between mb-6">
                    <div>
                      <div className="text-xs font-medium text-white/50 uppercase tracking-wider">Delivered Scope</div>
                      <div className="text-base font-bold text-mw-orange">{project.service}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-medium text-white/50 uppercase tracking-wider">Timeline</div>
                      <div className="text-lg font-bold text-white">{project.projectMetrics.duration} Weeks</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <Link
                  to={`/portfolio/case-studies/${project.id}`}
                  className="inline-flex items-center gap-2 bg-white text-mw-dark hover:bg-mw-orange hover:text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md group/btn"
                >
                  <span>Read Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                </Link>

                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/60 hover:text-white transition-colors"
                  >
                    <span>Visit Live Site</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>

        {/* Action Button to see more projects */}
        <div className="flex flex-col items-center justify-center text-center pt-4">
          <Link
            to="/portfolio"
            aria-label="See more projects on the portfolio page"
            className="group inline-flex items-center justify-center gap-3 bg-white text-mw-dark hover:bg-mw-orange hover:text-white px-10 py-5 rounded-full font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl shadow-black/50"
          >
            <span>See More Projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </Link>
          <p className="text-sm text-white/40 mt-4 font-light">
            Explore our complete collection of case studies and industry solutions.
          </p>
        </div>
      </div>
    </FadeInSection>
  );
}

function GrowthSystem() {
  return (
    <FadeInSection className="py-28 lg:py-40 bg-white text-mw-dark relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-14 lg:gap-20">
          {/* Sticky Header Side */}
          <div className="lg:col-span-5">
            <div className="sticky top-40 space-y-6">
              <div className="inline-flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-mw-orange" />
                <span className="text-[10px] font-sans tracking-[0.2em] uppercase font-bold text-black/50">
                  The Mindware Growth Framework
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight leading-[1.06]">
                ACQUIRE → GROW → OPTIMIZE → ACCELERATE → PROTECT
              </h2>
              <p className="text-lg md:text-xl text-black/60 font-light leading-relaxed max-w-md">
                Our structured five-stage methodology that builds stronger digital infrastructure, captures market demand, optimizes internal systems, and protects sustainable commercial growth.
              </p>
              <Link
                to="/solutions#growth-framework"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-mw-orange hover:text-black transition-colors"
              >
                <span>Inspect Framework Architecture</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Scrolling 5-Stage Framework */}
          <div className="lg:col-span-7 flex flex-col gap-12 lg:gap-16 pt-6 lg:pt-0">
            {GROWTH_FRAMEWORK.map((stage) => (
              <motion.div
                key={stage.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 0.7, ease: EASE }}
                className="relative group border-l-[3px] border-black/10 pl-8 md:pl-14 py-3 hover:border-mw-orange transition-colors duration-700"
              >
                <div className="absolute top-0 -left-[3px] w-[3px] h-0 bg-mw-orange group-hover:h-full transition-all duration-1000 ease-out" />
                <div className="text-xs font-mono font-bold text-mw-orange uppercase tracking-widest mb-1">
                  Stage {stage.step}
                </div>
                <h3 className="text-3xl md:text-4xl font-sans font-bold mb-2 tracking-tight group-hover:text-mw-orange transition-colors duration-500">
                  {stage.title}
                </h3>
                <p className="text-base md:text-lg font-medium text-black/80 mb-2">
                  {stage.tagline}
                </p>
                <p className="text-sm md:text-base text-black/60 font-light leading-relaxed max-w-xl">
                  {stage.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </FadeInSection>
  );
}

const FAQS = [
  {
    question: "How does Mindware work with growing businesses and enterprise decision-makers?",
    answer: "We begin with a structured growth consultation to diagnose your current digital infrastructure, customer acquisition bottlenecks, and operational workflows. From there, we recommend either a fixed-scope BUILD package, a custom software/portal build, a monthly GROW visibility retainer, or management consulting advisory."
  },
  {
    question: "How long does a corporate website redesign or platform transformation take?",
    answer: "Standard fixed-scope corporate builds take 3 to 6 weeks, while custom multi-branch platforms, client portals, and enterprise software systems typically run 6 to 10 weeks—delivered through transparent weekly milestones."
  },
  {
    question: "Do you provide ongoing digital transformation, SEO, and operational support?",
    answer: "Yes. Beyond initial builds, we provide continuous monthly retainers covering technical SEO, Google Ads and social customer acquisition, website maintenance, security monitoring, and business growth advisory under our PROTECT and ACCELERATE stages."
  },
  {
    question: "What makes Mindware Consulting different from a standard web or marketing agency?",
    answer: "Registered with the CAC (RC 1309926) and accredited with the Institute of Management Consultants (IMC-Nigeria) alongside CICRM, NISCN, and WSO, we combine technical software engineering, customer acquisition, and practical management consulting around measurable business outcomes."
  }
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <FadeInSection className="py-32 lg:py-48 bg-[#02040a] relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.8, ease: EASE }}
              className="sticky top-32"
            >
              <div className="inline-flex items-center gap-3 mb-8">
                 <div className="w-1.5 h-1.5 rounded-full bg-mw-orange" />
                 <span className="text-[10px] font-sans tracking-[0.2em] uppercase font-bold text-white/40">Knowledge Base</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-white mb-6">
                Common<br/>Questions.
              </h2>
              <p className="text-xl text-white/50 font-light mb-12 max-w-md">
                Everything you need to know about partnering with Mindware to elevate your digital presence.
              </p>
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 text-mw-orange font-medium hover:text-orange-400 transition-colors pb-4 border-b border-mw-orange/30 hover:border-mw-orange/80 shrink-0"
              >
                <span className="uppercase tracking-[0.2em] text-xs font-bold">Have a different question?</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
          
          <div className="lg:col-span-7 flex flex-col gap-4">
            {FAQS.map((faq, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: EASE }}
                key={index}
                className="group border border-white/5 rounded-2xl bg-white/[0.02] overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                  className="w-full flex items-center justify-between p-6 md:p-10 text-left transition-colors hover:bg-white/[0.04]"
                >
                  <span className="text-xl md:text-2xl font-sans font-bold pr-8">{faq.question}</span>
                  <div className={cn(
                    "w-10 h-10 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300",
                    openIndex === index 
                      ? "border-mw-orange bg-mw-orange text-white rotate-45" 
                      : "border-white/10 text-white/40 group-hover:border-white/30 group-hover:text-white"
                  )}>
                    <Plus className="w-5 h-5" />
                  </div>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                    >
                      <div className="px-6 md:px-10 pb-10 text-lg text-white/50 font-light leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </FadeInSection>
  );
}

function CTASection() {
  return (
    <FadeInSection className="py-32 lg:py-48 relative overflow-hidden bg-mw-orange">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80')] mix-blend-multiply opacity-10 bg-cover bg-center" />
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-5xl mx-auto text-center text-mw-dark flex flex-col items-center">
          <div className="inline-flex items-center gap-3 mb-10">
             <div className="w-1.5 h-1.5 rounded-full bg-mw-dark" />
             <span className="text-[10px] font-sans tracking-[0.2em] uppercase font-bold text-mw-dark/60">Let's Talk</span>
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[7rem] font-display font-bold mb-8 md:mb-10 tracking-tight leading-tight md:leading-[0.95] text-mw-dark">
            Your next customer is already online.
          </h2>
          <p className="text-lg md:text-2xl opacity-75 max-w-2xl mx-auto mb-14 font-medium tracking-tight">
            Let's build the digital experience that helps them find you, trust you, and choose you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link
              to={CONVERSION_CTAS.primaryPath}
              onClick={() => trackPrimaryCtaClick("home-bottom-cta", CONVERSION_CTAS.primaryPath)}
              className="w-full sm:w-auto bg-mw-dark text-white px-10 py-5 rounded-full font-bold text-xs tracking-widest uppercase transition-transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3 shadow-xl min-h-[48px]"
            >
              <span>{CONVERSION_CTAS.primaryLabel}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/2348125082354?text=Hello%20Mindware%20Consulting%2C%20I%20would%20like%20to%20request%20a%20Business%20Growth%20Review." 
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("home-bottom-cta", "Business Growth Review")}
              className="w-full sm:w-auto bg-white/20 hover:bg-white text-mw-dark px-10 py-5 rounded-full font-bold text-xs tracking-widest uppercase transition-all hover:scale-105 active:scale-95 backdrop-blur-sm min-h-[48px] flex items-center justify-center"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </FadeInSection>
  );
}

function WhyChooseMindwareAndLeadership() {
  return (
    <FadeInSection className="py-20 sm:py-28 bg-[#03060f] border-t border-white/5">
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-widest text-mw-orange">
              <ShieldCheck className="w-4 h-4" />
              <span>Why Businesses Choose Mindware</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight leading-tight">
              Institutional Accountability Paired With Hands-On Digital Execution.
            </h2>

            <p className="text-sm sm:text-base text-white/70 leading-relaxed max-w-2xl">
              Led by Managing Director Chike Onyekachukwu and operating as a CAC-incorporated limited liability practice (RC 1309926) since 2016, Mindware brings structured corporate governance, IMC-Nigeria management consulting rigor, and direct engineering delivery under one roof.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white/[0.025] border border-white/10 space-y-1.5">
                <div className="text-sm font-bold text-white">Verified Institutional Credentials</div>
                <p className="text-xs text-white/60 leading-relaxed">
                  CAC RC 1309926, FIRS Tax Registered (TIN 19660429-0001), IMC-Nigeria, CICRM, NISCN & WSO recognitions.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.025] border border-white/10 space-y-1.5">
                <div className="text-sm font-bold text-white">Commercial Outcome Focus</div>
                <p className="text-xs text-white/60 leading-relaxed">
                  Every platform, SEO architecture, and operational portal is built around buyer trust, lead capture, and efficiency.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.025] border border-white/10 space-y-1.5">
                <div className="text-sm font-bold text-white">Real-Economy Sector Fluency</div>
                <p className="text-xs text-white/60 leading-relaxed">
                  Deep delivery experience across construction & civil engineering, real estate, oil & gas, automotive, retail, and fit-out.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.025] border border-white/10 space-y-1.5">
                <div className="text-sm font-bold text-white">Long-Term Advisory Continuity</div>
                <p className="text-xs text-white/60 leading-relaxed">
                  Flexible fixed-scope builds, ongoing optimization retainers, custom projects, and executive consulting support.
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-mw-dark hover:bg-mw-orange hover:text-white text-xs font-bold uppercase tracking-wider transition-colors"
              >
                <span>Explore Leadership & Story</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/pricing"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                <span>View Engagement Models</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-white/10 bg-[#080d1a] overflow-hidden p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-4">
                <img
                  src="/mindware-ceo.png"
                  alt="Chike Onyekachukwu — Managing Director, Mindware Consulting Ltd"
                  className="w-20 h-20 rounded-2xl object-cover border border-mw-orange/40 shrink-0"
                />
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-mw-orange font-bold">
                    Managing Director
                  </div>
                  <h3 className="text-xl font-display font-bold text-white">
                    Chike Onyekachukwu
                  </h3>
                  <p className="text-xs text-white/60 mt-0.5">
                    Founder & Principal Consultant · Mindware Consulting Ltd
                  </p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-white/75 leading-relaxed border-t border-white/10 pt-4">
                “Businesses do not hire Mindware simply for websites or ads. They partner with us to fix visibility gaps, modernize how work gets done, strengthen customer acquisition, and build credible digital assets that hold up under institutional scrutiny.”
              </p>
              <div className="flex items-center justify-between text-xs text-white/55 pt-1">
                <span>CAC RC 1309926 · Incorporated 2016</span>
                <Link to="/leadership" className="text-mw-orange hover:underline font-semibold">
                  Leadership Profile →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FadeInSection>
  );
}

function InsightsPreviewSection() {
  const featuredInsights = INSIGHTS.slice(0, 3);
  return (
    <FadeInSection className="py-20 sm:py-28 bg-[#02040a] border-t border-white/5">
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-mw-orange" />
              <span className="text-[10px] font-sans tracking-[0.2em] uppercase font-bold text-mw-orange">
                Insights & Business Resources
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight text-white">
              Executive Playbooks for Commercial Growth.
            </h2>
          </div>

          <Link
            to="/insights"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-mw-orange hover:text-white transition-colors shrink-0"
          >
            <span>Explore All Insights</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredInsights.map((article) => (
            <Link
              key={article.id}
              to={`/insights/${article.id}`}
              className="group rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-mw-orange/40 overflow-hidden transition-all flex flex-col"
            >
              <div className="aspect-[16/9] overflow-hidden bg-black">
                <img
                  src={article.image}
                  alt={article.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] font-mono text-white/50">
                    <span className="text-mw-orange uppercase font-semibold">{article.category}</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="text-lg font-display font-bold text-white group-hover:text-mw-orange transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs text-white/65 leading-relaxed line-clamp-2">
                    {article.excerpt}
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-mw-orange pt-2 border-t border-white/5">
                  <span>Read Playbook</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </FadeInSection>
  );
}

function BusinessGrowthSeasonBanner() {
  return (
    <FadeInSection className="py-16 sm:py-20 bg-[#050811] border-t border-white/5">
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        <div className="rounded-3xl border border-mw-orange/25 bg-gradient-to-br from-mw-orange/10 via-[#090d16] to-white/[0.02] p-6 sm:p-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-mw-orange font-bold">
                <Sparkles className="w-4 h-4" />
                <span>2026 Advisory Initiative · 5 Structured Tracks</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight">
                Mindware Business Growth Season 2026
              </h2>
              <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                Targeted growth review tracks designed for founders, contractors, and corporate executives ready to modernize infrastructure, expand customer acquisition, or align operations.
              </p>
            </div>
            <Link
              to="/business-growth-season-2026/"
              onClick={() => trackCampaignConversion("overview", "cta_click")}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-mw-orange hover:bg-mw-orange-hover text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-mw-orange/20 shrink-0 min-h-[48px]"
            >
              <span>Explore Growth Season 2026</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {GROWTH_SEASON_TRACKS.map((track) => (
              <Link
                key={track.id}
                to={`/business-growth-season-2026/?track=${track.id}`}
                onClick={() => trackCampaignConversion(track.id, "select_track")}
                className="p-4 rounded-2xl border border-white/10 bg-black/30 hover:border-mw-orange/50 hover:bg-white/[0.04] transition-all flex flex-col justify-between gap-2 group"
              >
                <div className="text-[10px] font-mono uppercase tracking-wider text-mw-orange font-bold">
                  {track.badge}
                </div>
                <div className="text-sm font-bold text-white group-hover:text-mw-orange transition-colors leading-snug">
                  {track.title}
                </div>
                <div className="text-[11px] text-white/55 flex items-center gap-1 pt-1">
                  <span>Review Track</span>
                  <ArrowRight className="w-3 h-3 text-mw-orange" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </FadeInSection>
  );
}

export function Home() {
  return (
    <div className="bg-mw-dark">
      <SEO
        title="Mindware Consulting Ltd | Business Growth & Digital Transformation Partner"
        description="Mindware Consulting helps businesses strengthen their digital infrastructure, attract more customers, improve operations and unlock sustainable growth through strategic consulting, technology and digital marketing."
      />
      <Hero />
      <GrowthMetrics />
      <TrustedBy />
      <BusinessChallengesSection />
      <SelfSelection />
      <GrowthSystem />
      <IndustriesFlagshipShowcase />
      <BusinessGrowthSeasonBanner />
      <LatestWork />
      <WhyChooseMindwareAndLeadership />
      <CertificationsSection />
      <GoogleClientReviews
        variant="homepage"
        heading="Real Businesses. Real Projects. Genuine Client Feedback."
        supportingText="Discover what businesses and professionals have to say about their experience working with Mindware Consulting Limited. Our commitment to quality, reliability and measurable business value is reflected in the feedback of our clients."
      />
      <HomeVideoTestimonials />
      <InsightsPreviewSection />
      <FAQ />
      <CTASection />
    </div>
  );
}

