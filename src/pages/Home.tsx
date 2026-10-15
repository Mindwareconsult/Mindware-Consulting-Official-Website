import { motion, useScroll, useTransform, AnimatePresence, useInView, useMotionValueEvent } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Globe2,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
  Quote,
  Plus,
  Sparkles,
  Briefcase,
  GraduationCap,
  ShieldCheck,
  CheckCircle2,
  Pause,
  Play
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { SERVICES, PORTFOLIO } from "../data/content";
import { cn, EASE } from "../lib/utils";
import React, { useRef, useState, useEffect } from "react";
import { FadeInSection } from "../components/FadeInSection";
import { SEO } from "../components/SEO";
import { MetricChart } from "../components/MetricChart";
import { HomeVideoTestimonials } from "../components/home/HomeVideoTestimonials";

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
    tabLabel: "Website Design",
    categoryBadge: "High-Converting Web Architecture",
    badgeType: "orange",
    overarchingAnchor: "We build digital experiences that power business growth",
    headlineLead: "Turn Clicks Into Customers With",
    headlineAccent: "Websites Engineered",
    headlineEnd: "to Sell.",
    supportingCaption:
      "High-performance, modern business websites and conversion funnels engineered to build instant credibility, load in milliseconds, and turn casual visitors into paying clients.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=2000&q=85",
    alt: "Mindware Consulting modern multi-screen UI/UX design studio displaying dark-mode responsive web layouts and live analytics",
    primaryCta: { label: "Explore Web Design", path: "/services/website-design" },
    secondaryCta: { label: "View Pricing", path: "/pricing" },
    statsBadge: { value: "Sub-Second", label: "Ultra-Fast Load Speed" },
    highlights: [
      "Custom UI/UX Architecture",
      "Mobile-First Responsive",
      "Fast Load Times",
      "High-Converting Landing Pages"
    ]
  },
  {
    id: "seo-growth",
    tabLabel: "SEO & Growth",
    categoryBadge: "Google Search Supremacy & Growth",
    badgeType: "emerald",
    overarchingAnchor: "We build digital experiences that power business growth",
    headlineLead: "Dominate Page 1 on Google &",
    headlineAccent: "Capture High-Intent",
    headlineEnd: "Buyers.",
    supportingCaption:
      "Data-driven technical SEO, local geo-targeting across Nigeria, and content strategies that outrank competitors and generate consistent organic leads.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2000&q=85",
    alt: "Data intelligence center with search query graphs, keyword ranking trajectories, and organic traffic growth dashboards",
    primaryCta: { label: "Explore SEO Services", path: "/services/seo" },
    secondaryCta: { label: "Get Free SEO Audit", path: "/contact?service=seo" },
    statsBadge: { value: "Page #1", label: "Organic Search Target" },
    highlights: [
      "Google Page 1 Rankings",
      "Technical SEO Audits",
      "Local Maps Geo-Targeting",
      "Keyword Supremacy"
    ]
  },
  {
    id: "social-media",
    tabLabel: "Social Media",
    categoryBadge: "Audience Attraction & Retention",
    badgeType: "purple",
    overarchingAnchor: "We build digital experiences that power business growth",
    headlineLead: "Stop The Scroll. Build An",
    headlineAccent: "Irresistible Brand",
    headlineEnd: "Community.",
    supportingCaption:
      "High-impact visual storytelling, viral social campaigns, and precision paid ad funnels that command audience attention and convert followers into brand advocates.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=2000&q=85",
    alt: "Dynamic digital creator creative studio with video content creation, engagement metrics, and social campaign visual production",
    primaryCta: { label: "Explore Social Marketing", path: "/services/social-media-marketing" },
    secondaryCta: { label: "Schedule Campaign Call", path: "/contact?service=social-media" },
    statsBadge: { value: "3.5x+", label: "Average Campaign ROAS" },
    highlights: [
      "Scroll-Stopping Content",
      "Paid Social Ads Funnels",
      "Community Building",
      "Influencer & Campaign ROI"
    ]
  },
  {
    id: "app-development",
    tabLabel: "App Development",
    categoryBadge: "Custom Software Engineering",
    badgeType: "blue",
    overarchingAnchor: "We build digital experiences that power business growth",
    headlineLead: "Transform Your Vision Into A",
    headlineAccent: "Scalable, Market-Ready",
    headlineEnd: "App.",
    supportingCaption:
      "Bespoke mobile and web applications built with modern architectures — delivering seamless user experiences, enterprise security, and frictionless scalability.",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=2000&q=85",
    alt: "Futuristic mobile app engineering environment with glowing iOS/Android device wireframes, code IDEs, and app interface flows",
    primaryCta: { label: "Explore App Development", path: "/services/app-development" },
    secondaryCta: { label: "Request App Estimate", path: "/contact?service=app-development" },
    statsBadge: { value: "99.9%", label: "Uptime & Scalability" },
    highlights: [
      "iOS & Android Native/Hybrid",
      "Cloud-Backed Web Apps",
      "Custom Business Portals",
      "Enterprise Security"
    ]
  },
  {
    id: "training-workforce",
    tabLabel: "Training & Workforce",
    categoryBadge: "Executive Academy & Skills",
    badgeType: "amber",
    overarchingAnchor: "We build digital experiences that power business growth",
    headlineLead: "Empower Your Team With",
    headlineAccent: "Tomorrow’s High-Income",
    headlineEnd: "Tech & Leadership Skills.",
    supportingCaption:
      "Hands-on bootcamps across our 2 specialized tracks: Digital Skills (Coding, Design, Analytics) & Professional Certifications (PMP®, HSE 1-3, Strategic HR, CRM Systems).",
    image: "/src/assets/images/training_web_lab_1790960908174.jpg",
    alt: "High-energy executive corporate training workshop and modern tech lab at Mindware Consulting",
    primaryCta: { label: "Explore Academy Tracks", path: "/training" },
    secondaryCta: { label: "Corporate Training Proposal", path: "/contact?topic=training" },
    statsBadge: { value: "2 Tracks", label: "Digital Skills & Certs" },
    highlights: [
      "Digital Skills Bootcamps",
      "PMP® & HSE 1-3 Certifications",
      "Live Project Capstones",
      "Corporate Team Upskilling"
    ]
  },
  {
    id: "consultancy",
    tabLabel: "Consultancy",
    categoryBadge: "Enterprise Strategy & Advisory",
    badgeType: "orange",
    overarchingAnchor: "We build digital experiences that power business growth",
    headlineLead: "Cut Through Complexity With",
    headlineAccent: "Strategic Roadmaps That",
    headlineEnd: "Multiply Revenue.",
    supportingCaption:
      "Senior advisory on digital transformation, technology audits, operational automation, and growth systems tailored to Nigerian and global market realities.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=2000&q=85",
    alt: "Executive boardroom strategy session with enterprise growth blueprints and tech roadmaps",
    primaryCta: { label: "Explore Advisory Services", path: "/services/consultancy" },
    secondaryCta: { label: "Book Strategy Session", path: "/contact?service=consultancy" },
    statsBadge: { value: "Senior Tier", label: "Executive Advisory" },
    highlights: [
      "Digital Transformation Strategy",
      "Tech Stack & Architecture Audits",
      "Process Automation",
      "Market Expansion Advisory"
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
                  className={cn(
                    "inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-sm md:text-base transition-all duration-300 shadow-xl hover:scale-105 active:scale-95 text-white w-full sm:w-auto text-center",
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
                  className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 rounded-full font-semibold text-sm md:text-base text-white/90 bg-white/5 hover:bg-white/10 border border-white/15 backdrop-blur-md transition-all hover:scale-105 active:scale-95 hover:border-white/30 w-full sm:w-auto text-center"
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
    { label: "Projects Completed", value: 150, suffix: "+", prefix: "" },
    { label: "ROI Delivered", value: 300, suffix: "%", prefix: "Up to " },
    { label: "Global Clients", value: 50, suffix: "+", prefix: "" },
    { label: "Years Experience", value: 10, suffix: "+", prefix: "" },
  ];

  return (
    <FadeInSection className="py-16 sm:py-24 md:py-32 bg-[#02040a] border-t border-white/5 relative z-10 overflow-hidden">
      <h2 className="sr-only">Our Growth Metrics</h2>
      <div className="absolute inset-0 bg-gradient-to-b from-mw-orange/5 to-transparent mix-blend-screen pointer-events-none" />
      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:divide-x divide-white/5">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
              className={cn("flex flex-col items-center md:items-start text-center md:text-left", i !== 0 && "pl-0 md:pl-8 lg:pl-12")}
            >
              <div className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-bold tracking-tight text-white mb-2 sm:mb-4 drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]">
                <AnimatedCounter end={metric.value} suffix={metric.suffix} prefix={metric.prefix} />
              </div>
              <p className="text-white/50 font-medium uppercase tracking-[0.2em] text-[10px] md:text-xs">
                {metric.label}
              </p>
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
  const options = [
    { id: "01", label: "I Need A Website", desc: "High-performance digital platforms.", path: "/services/website-design" },
    { id: "02", label: "I Need More Customers", desc: "SEO & Growth marketing.", path: "/services/seo" },
    { id: "03", label: "I Need A Digital Strategy", desc: "Consulting & transformation.", path: "/services/consultancy" },
  ];

  return (
    <FadeInSection className="py-16 sm:py-24 lg:py-48 bg-mw-dark relative z-10 border-t border-white/5 overflow-hidden">
      {/* Editorial background element */}
      <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-mw-orange/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-20">
           <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="inline-flex items-center gap-3 mb-6 sm:mb-8">
                 <div className="w-1.5 h-1.5 rounded-full bg-mw-orange" />
                 <span className="text-[10px] font-sans tracking-[0.2em] uppercase font-bold text-white/50">Your Objective</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 sm:mb-8 tracking-tight leading-[1.1] text-white">What can we <br/>help you achieve?</h2>
              <p className="text-base sm:text-xl text-white/50 max-w-md font-light leading-relaxed">Select your primary business objective to discover how our integrated approach can accelerate your growth.</p>
           </div>
           
           <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-6">
              {options.map((opt, i) => (
                <motion.div
                  key={opt.label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-20%" }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
                >
                  <Link 
                    to={opt.path}
                    className="group relative flex items-center justify-between p-4 sm:p-8 md:p-12 border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/20 transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mw-orange rounded-2xl overflow-hidden"
                  >
                    <div className="absolute -left-6 -top-10 text-[6rem] sm:text-[8rem] md:text-[12rem] font-sans font-bold text-white/[0.02] group-hover:text-white/[0.04] transition-colors duration-500 pointer-events-none select-none leading-none">
                      {opt.id}
                    </div>
                    
                    <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-1.5 sm:gap-4 md:gap-12 w-full min-w-0">
                       <div className="flex-1 min-w-0">
                          <h3 className="text-xl sm:text-3xl md:text-4xl font-sans font-bold tracking-tight mb-1 sm:mb-3 group-hover:text-mw-orange transition-colors text-white/90">{opt.label}</h3>
                          <p className="text-xs sm:text-lg text-white/50 group-hover:text-white/70 transition-colors font-light">{opt.desc}</p>
                       </div>
                    </div>
                    
                    <div className="relative z-10 w-9 h-9 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-mw-orange group-hover:border-mw-orange transition-all duration-500 shrink-0 ml-3">
                       <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white/50 group-hover:text-white group-hover:-rotate-45 transition-all duration-500" />
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

function Ecosystem() {
  const elements = [
    { name: "Website", deg: 0, color: "bg-blue-500" },
    { name: "SEO", deg: 51, color: "bg-green-500" },
    { name: "Social", deg: 102, color: "bg-pink-500" },
    { name: "Apps", deg: 153, color: "bg-purple-500" },
    { name: "Strategy", deg: 204, color: "bg-yellow-500" },
    { name: "Leads", deg: 255, color: "bg-red-500" },
    { name: "Analytics", deg: 306, color: "bg-cyan-500" },
  ];

  return (
    <FadeInSection className="py-16 sm:py-24 lg:py-48 relative overflow-hidden bg-[#02040A]">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10 text-center">
        <div className="max-w-4xl mx-auto mb-12 sm:mb-24 md:mb-32">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold mb-4 sm:mb-8 tracking-tight text-white">One Business.<br/>One Connected System.</h2>
          <p className="text-base sm:text-xl md:text-2xl text-white/50 font-light max-w-2xl mx-auto">
            Mindware does not operate disconnected services. We build intelligent, connected digital growth systems where strategy, technology, and marketing work in unison.
          </p>
        </div>

        <div className="relative h-[360px] sm:h-[450px] md:h-[600px] flex items-center justify-center max-w-5xl mx-auto overflow-hidden md:overflow-visible">
           {/* Radar Rings */}
           <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none scale-[0.6] sm:scale-[0.75] md:scale-100">
              <div className="w-[300px] h-[300px] border border-white/40 rounded-full absolute" />
              <div className="w-[500px] h-[500px] border border-white/20 rounded-full absolute border-dashed" />
              <div className="w-[700px] h-[700px] border border-white/10 rounded-full absolute" />
           </div>

           <div className="relative flex items-center justify-center scale-[0.6] sm:scale-[0.75] md:scale-100 w-full h-full">
             {/* Center Node */}
             <motion.div 
               animate={{ boxShadow: ["0 0 40px -10px rgba(249,115,22,0.3)", "0 0 80px 10px rgba(249,115,22,0.6)", "0 0 40px -10px rgba(249,115,22,0.3)"] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="relative z-20 w-36 h-36 sm:w-40 sm:h-40 rounded-full bg-mw-dark border border-mw-orange/50 flex flex-col items-center justify-center text-center shadow-2xl"
             >
                <div className="absolute inset-2 rounded-full bg-gradient-to-br from-mw-orange to-orange-700 flex items-center justify-center">
                   <span className="font-sans font-bold text-lg sm:text-xl leading-tight text-white tracking-wide">YOUR<br/>BUSINESS</span>
                </div>
             </motion.div>
  
             {/* Orbiting Elements */}
             {elements.map((el, i) => {
               const radius = 250;
               const rad = (el.deg * Math.PI) / 180;
               const x = Math.cos(rad) * radius;
               const y = Math.sin(rad) * radius;
  
               return (
                 <motion.div
                   key={el.name}
                   initial={{ opacity: 0, scale: 0 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   viewport={{ once: true, margin: "-20%" }}
                   transition={{ duration: 1, delay: i * 0.1, type: "spring", stiffness: 40 }}
                   className="absolute z-10 flex flex-col items-center gap-3 cursor-default"
                   style={{ x, y }}
                 >
                   <div className="relative">
                     <div className={cn("w-4 h-4 rounded-full relative z-10", el.color)} />
                     <div className={cn("w-4 h-4 rounded-full absolute inset-0 animate-ping opacity-50", el.color)} />
                   </div>
                   <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-white/70 bg-mw-dark/80 px-2.5 sm:px-3 py-1 rounded-full backdrop-blur-sm border border-white/10 whitespace-nowrap">{el.name}</span>
                 </motion.div>
               );
             })}
           </div>
        </div>
      </div>
    </FadeInSection>
  );
}

function ServicesOverview() {
  return (
    <FadeInSection className="py-32 lg:py-48 bg-mw-dark border-t border-white/5 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/[0.02] via-mw-dark to-mw-dark pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 mb-8">
               <div className="w-1.5 h-1.5 rounded-full bg-mw-orange" />
               <span className="text-[10px] font-sans tracking-[0.2em] uppercase font-bold text-white/50">Core Expertise</span>
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-8 tracking-tight leading-tight text-white">Digital Systems<br />Engineered for Growth.</h2>
            <p className="text-2xl text-white/50 font-light leading-relaxed">
              We design the digital infrastructure businesses need to become visible, credible, and fundamentally easier to buy from.
            </p>
          </div>
          <Link to="/services" className="group inline-flex items-center gap-4 text-mw-orange font-medium hover:text-orange-400 transition-colors pb-4 border-b border-mw-orange/30 hover:border-mw-orange/80 shrink-0">
            <span className="uppercase tracking-[0.2em] text-xs font-bold">View all capabilities</span> 
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            // Define span logic for asymmetric grid
            let colSpan = "md:col-span-4";
            if (i === 0) colSpan = "md:col-span-8";
            else if (i === 1) colSpan = "md:col-span-4";
            else if (i === 5) colSpan = "md:col-span-12 lg:col-span-8 lg:col-start-3"; 

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
                className={cn(
                  "group relative p-6 sm:p-10 lg:p-14 rounded-3xl lg:rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-white/[0.04] to-transparent flex flex-col h-full overflow-hidden hover:border-mw-orange/50 transition-all duration-700",
                  colSpan
                )}
              >
                <div className="absolute inset-0 bg-mw-orange/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="absolute top-0 right-0 p-6 sm:p-10 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0">
                  <ArrowUpRight className="w-8 h-8 sm:w-10 sm:h-10 text-mw-orange/80" />
                </div>
                
                <div className="relative z-10">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 sm:mb-10 group-hover:bg-mw-orange/10 group-hover:border-mw-orange/30 transition-all duration-500">
                     <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-mw-orange group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  
                  <h3 className={cn("font-sans font-bold tracking-tight mb-3 sm:mb-4", i === 0 ? "text-2xl sm:text-4xl lg:text-5xl" : "text-xl sm:text-3xl lg:text-4xl")}>
                    {service.title}
                  </h3>
                  
                  <p className="text-white/50 mb-8 sm:mb-12 flex-grow text-base sm:text-lg font-light leading-relaxed max-w-xl group-hover:text-white/70 transition-colors">
                    {service.tagline}
                  </p>
                </div>
                
                <Link
                  to={`/services/${service.id}`}
                  className="relative z-10 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] hover:text-mw-orange transition-colors mt-auto w-max text-white/50 group-hover:text-white"
                >
                  Explore <div className="w-8 h-[1px] bg-current" />
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </FadeInSection>
  );
}

function LatestWork() {
  const featuredIds = ["juptree-automobile", "osines-group", "quanxi-limited", "harmostructs-engineering", "eclectic-seals", "crescon-projects", "bcale-associates"];
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
                    <div className="flex items-center gap-4">
                      <MetricChart value={project.projectMetrics.growth} />
                      <div>
                        <div className="text-xs font-medium text-white/50 uppercase tracking-wider">Growth</div>
                        <div className="text-lg font-bold text-mw-orange">+{project.projectMetrics.growth}%</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-medium text-white/50 uppercase tracking-wider">Duration</div>
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
  const steps = [
    { title: "DISCOVER", desc: "Understand the business, audience, and market context." },
    { title: "STRATEGIZE", desc: "Create the digital growth roadmap and define KPIs." },
    { title: "BUILD", desc: "Engineer the website, platform, and digital assets." },
    { title: "ATTRACT", desc: "Deploy SEO and marketing to capture high-intent traffic." },
    { title: "CONVERT", desc: "Optimize UX to turn attention into qualified leads." },
    { title: "SCALE", desc: "Leverage data, AI, and iteration for compound growth." },
  ];

  return (
    <FadeInSection className="py-32 lg:py-48 bg-white text-mw-dark relative">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
           {/* Sticky Header Side */}
           <div className="lg:col-span-5">
              <div className="sticky top-40">
                 <div className="inline-flex items-center gap-3 mb-8">
                   <div className="w-1.5 h-1.5 rounded-full bg-mw-orange" />
                   <span className="text-[10px] font-sans tracking-[0.2em] uppercase font-bold text-black/40">The Framework</span>
                 </div>
                 <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-8 tracking-tight leading-[1.05]">The Mindware<br/>Growth System.</h2>
                 <p className="text-xl md:text-2xl text-black/50 font-light leading-relaxed max-w-md">
                    A systematic, battle-tested framework turning digital complexity into measurable, continuous growth.
                 </p>
              </div>
           </div>

           {/* Scrolling Steps Side */}
           <div className="lg:col-span-7 flex flex-col gap-12 lg:gap-24 pt-12 lg:pt-0">
             {steps.map((step, i) => (
               <motion.div 
                 key={step.title}
                 initial={{ opacity: 0, y: 40 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: "-20%" }}
                 transition={{ duration: 0.8, ease: EASE }}
                 className="relative group border-l-[3px] border-black/5 pl-10 md:pl-16 py-4 hover:border-mw-orange transition-colors duration-700"
               >
                 <div className="absolute top-0 -left-[3px] w-[3px] h-0 bg-mw-orange group-hover:h-full transition-all duration-1000 ease-out" />
                 
                 <div className="text-7xl md:text-9xl font-sans font-bold text-black/[0.03] absolute -top-8 -left-4 md:-top-12 md:-left-8 -z-10 group-hover:text-mw-orange/5 transition-colors duration-700 select-none">
                    0{i + 1}
                 </div>
                 
                 <h3 className="text-3xl md:text-5xl font-sans font-bold mb-4 tracking-tight group-hover:text-mw-orange transition-colors duration-500">{step.title}</h3>
                 <p className="text-xl md:text-2xl text-black/50 font-light leading-relaxed max-w-lg">{step.desc}</p>
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
    question: "How long does a typical website project take?",
    answer: "Our standard engagement for a premium, custom-architected website ranges from 6 to 10 weeks. This includes deep-dive strategy sessions, high-fidelity design iterations, full-stack development, and rigorous performance testing."
  },
  {
    question: "Do you offer ongoing support and maintenance?",
    answer: "Yes. We believe digital products are living assets. We offer comprehensive Growth & Maintenance retainers that cover security updates, performance optimization, content updates, and ongoing strategic consulting."
  },
  {
    question: "What platforms do you build on?",
    answer: "We are technology-agnostic but highly opinionated. We typically build custom solutions using React, Next.js, and Node.js for maximum performance, or leverage robust enterprise CMS platforms depending on your team's specific content management needs."
  },
  {
    question: "How do you measure the success of a project?",
    answer: "Success is defined during our initial strategy phase. We move beyond vanity metrics to focus on tangible business outcomes: increased conversion rates, lower customer acquisition costs, improved lead quality, and measurable revenue growth."
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
              to="/contact"
              className="w-full sm:w-auto bg-mw-dark text-white px-10 py-5 rounded-full font-bold text-xs tracking-widest uppercase transition-transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3 shadow-xl"
            >
              Start Your Project
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/2348125082354?text=Hello%20Mindware%20Consulting%2C%20I%20would%20like%20to%20start%20a%20project%20with%20your%20team." 
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-white/20 hover:bg-white text-mw-dark px-10 py-5 rounded-full font-bold text-xs tracking-widest uppercase transition-all hover:scale-105 active:scale-95 backdrop-blur-sm"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </FadeInSection>
  );
}

export function Home() {
  return (
    <div className="bg-mw-dark">
      <SEO title="Mindware Consulting | Digital Growth Lab" description="Mindware Consulting empowers businesses with strategy and technology." />
      <Hero />
      <GrowthMetrics />
      <TrustedBy />
      <SelfSelection />
      <Ecosystem />
      <ServicesOverview />
      <LatestWork />
      <GrowthSystem />
      <HomeVideoTestimonials />
      <FAQ />
      <CTASection />
    </div>
  );
}

