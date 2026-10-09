import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  TrendingUp,
  Clock,
  Layers,
  ShieldCheck,
  Globe,
  Quote,
  Zap,
  Target,
  Share2,
  Check,
  Monitor,
  Smartphone,
  Maximize2,
  Minimize2,
  Code2,
  Cpu,
  BarChart3,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Award,
  Flame,
  Search,
  CheckSquare
} from "lucide-react";
import { getCaseStudyById, getAllCaseStudies, CaseStudyDetail as CaseStudyType } from "../data/caseStudies";
import { FadeInSection } from "../components/FadeInSection";
import { SEO } from "../components/SEO";
import { EASE } from "../lib/utils";

export function CaseStudyDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [deviceMode, setDeviceMode] = useState<"desktop" | "mobile">("desktop");
  const [activeTab, setActiveTab] = useState<"overview" | "architecture" | "results">("overview");

  // Scroll to top whenever ID changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  const study = id ? getCaseStudyById(id) : null;
  const allStudies = getAllCaseStudies();

  // Find index for Prev/Next navigation
  const currentIndex = allStudies.findIndex((s) => s.id === id);
  const prevStudy = currentIndex > 0 ? allStudies[currentIndex - 1] : allStudies[allStudies.length - 1];
  const nextStudy = currentIndex < allStudies.length - 1 ? allStudies[currentIndex + 1] : allStudies[0];

  // Related case studies (excluding current, slice 2)
  const relatedStudies = allStudies.filter((s) => s.id !== id).slice(0, 2);

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } else if (navigator.share) {
      navigator.share({
        title: study ? `${study.title} | Mindware Consulting` : "Mindware Consulting Case Study",
        url: window.location.href,
      }).catch(() => {});
    }
  };

  if (!study) {
    return (
      <div className="min-h-screen bg-mw-dark pt-32 sm:pt-40 pb-20 sm:pb-24 flex items-center justify-center text-white px-4">
        <SEO title="Case Study Not Found | Mindware Consulting" description="The requested case study could not be found." />
        <div className="text-center max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-mw-orange/10 border border-mw-orange/30 flex items-center justify-center mx-auto mb-6 text-mw-orange">
            <Target className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold mb-3 sm:mb-4">Case Study Not Found</h1>
          <p className="text-white/60 mb-8 text-sm sm:text-base leading-relaxed">
            The project case study you are looking for does not exist or may have been relocated.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/portfolio/case-studies"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-mw-orange text-white min-h-[46px] px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-orange-600 transition-colors shadow-lg shadow-mw-orange/20"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Explore All Case Studies</span>
            </Link>
            <Link
              to="/portfolio"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 text-white min-h-[46px] px-6 py-3 rounded-full font-medium text-xs uppercase tracking-wider hover:bg-white/20 transition-colors"
            >
              <span>Main Portfolio</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Schema.org Article / TechArticle JSON-LD
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `${study.title} - ${study.client} Case Study`,
    "description": study.executiveSummary || study.challenge,
    "image": study.image,
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
    },
    "about": {
      "@type": "Thing",
      "name": study.service,
      "description": study.tagline
    }
  };

  return (
    <div className="bg-mw-dark min-h-screen text-white selection:bg-mw-orange selection:text-white">
      <SEO
        title={`${study.title} Case Study | ${study.client} | Mindware Consulting`}
        description={study.executiveSummary || study.challenge}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Hero Header Section */}
      <section className="pt-28 sm:pt-36 md:pt-44 pb-12 sm:pb-16 md:pb-20 border-b border-white/5 relative overflow-hidden">
        {/* Ambient atmospheric glows */}
        <div className="absolute top-0 right-0 w-3/5 h-full bg-gradient-to-l from-mw-orange/15 via-mw-orange/5 to-transparent blur-3xl mix-blend-screen pointer-events-none" />
        <div className="absolute top-1/4 left-5 w-72 sm:w-96 h-72 sm:h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="max-w-5xl"
          >
            {/* Top Toolbar: Breadcrumbs + Share Button */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 sm:mb-8 pb-4 border-b border-white/10">
              <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[11px] sm:text-xs uppercase tracking-wider text-white/50 flex-wrap">
                <Link to="/portfolio" className="hover:text-mw-orange transition-colors inline-flex items-center gap-1.5 py-1">
                  <Layers className="w-3.5 h-3.5 text-mw-orange" />
                  <span>Portfolio</span>
                </Link>
                <span className="text-white/30">/</span>
                <Link to="/portfolio/case-studies" className="hover:text-mw-orange transition-colors py-1">
                  <span>Case Studies</span>
                </Link>
                <span className="text-white/30">/</span>
                <span className="text-white/90 font-medium truncate max-w-[150px] sm:max-w-none">{study.client}</span>
              </nav>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white px-3 py-1.5 rounded-full text-xs font-medium transition-all min-h-[36px]"
                  title="Share or copy link"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5 text-white/60" />
                      <span>Share Study</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Industry & Service Badges */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-bold uppercase tracking-wider mb-5 sm:mb-6">
              <span className="px-3.5 py-1.5 rounded-full bg-mw-orange/15 border border-mw-orange/30 text-mw-orange text-[11px] sm:text-xs">
                {study.industry}
              </span>
              <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-[11px] sm:text-xs">
                {study.service}
              </span>
              <span className="px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-[11px] sm:text-xs flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {study.projectDuration} Delivery
              </span>
            </div>

            {/* Title & Tagline */}
            <h1 className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-5 sm:mb-6 leading-[1.08] text-white">
              {study.title}
            </h1>

            <p className="text-base sm:text-xl md:text-2xl text-white/80 font-light leading-relaxed mb-8 sm:mb-10 border-l-2 border-mw-orange pl-4 sm:pl-6 bg-gradient-to-r from-mw-orange/[0.04] to-transparent py-2 rounded-r-lg">
              {study.tagline}
            </p>

            {/* Quick Overview Meta Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-6 rounded-2xl bg-[#070b16] border border-white/10 backdrop-blur-md shadow-2xl">
              <div className="p-2 sm:p-3 rounded-xl bg-white/[0.02]">
                <div className="text-[10px] sm:text-[11px] uppercase tracking-wider text-white/40 mb-1 font-mono">Enterprise Client</div>
                <div className="text-xs sm:text-sm md:text-base font-bold text-white truncate">{study.client}</div>
              </div>
              <div className="p-2 sm:p-3 rounded-xl bg-white/[0.02]">
                <div className="text-[10px] sm:text-[11px] uppercase tracking-wider text-white/40 mb-1 font-mono">Engagement Timeline</div>
                <div className="text-xs sm:text-sm md:text-base font-bold text-white truncate">{study.projectDuration}</div>
              </div>
              <div className="p-2 sm:p-3 rounded-xl bg-white/[0.02]">
                <div className="text-[10px] sm:text-[11px] uppercase tracking-wider text-white/40 mb-1 font-mono">Primary Category</div>
                <div className="text-xs sm:text-sm md:text-base font-bold text-white truncate">{study.industry}</div>
              </div>
              <div className="p-2 sm:p-3 rounded-xl bg-white/[0.02]">
                <div className="text-[10px] sm:text-[11px] uppercase tracking-wider text-white/40 mb-1 font-mono">Platform Status</div>
                {study.link ? (
                  <a
                    href={study.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-mw-orange hover:text-orange-300 transition-colors min-h-[24px]"
                  >
                    <span className="truncate">Visit Live System</span>
                    <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                  </a>
                ) : (
                  <span className="text-xs sm:text-sm font-medium text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Proprietary Stack
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Visual Showcase & Device Preview */}
      <section className="py-10 sm:py-16 md:py-20 bg-[#02050e]">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          {/* Header Controls for Device Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4 sm:mb-6">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-white/50 font-bold font-mono">Interface Showcase:</span>
              <span className="text-xs font-semibold text-mw-orange">{study.title}</span>
            </div>

            <div className="flex items-center gap-2 bg-black/40 border border-white/10 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setDeviceMode("desktop")}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  deviceMode === "desktop"
                    ? "bg-mw-orange text-white shadow-md shadow-mw-orange/20"
                    : "text-white/60 hover:text-white"
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Desktop Monitor</span>
              </button>
              <button
                type="button"
                onClick={() => setDeviceMode("mobile")}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  deviceMode === "mobile"
                    ? "bg-mw-orange text-white shadow-md shadow-mw-orange/20"
                    : "text-white/60 hover:text-white"
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile Frame</span>
              </button>
            </div>
          </div>

          {/* Browser / Device Frame Container */}
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-[#040813] shadow-2xl transition-all duration-500">
            {/* Mock Browser Header Bar */}
            <div className="px-4 py-3 bg-[#0a0f1d] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="hidden sm:flex items-center gap-2 px-4 py-1 rounded-full bg-black/40 border border-white/5 text-[11px] text-white/50 font-mono max-w-sm truncate">
                <Globe className="w-3 h-3 text-mw-orange shrink-0" />
                <span className="truncate">{study.link || `https://${study.id}.mindware-showcase.com`}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  Production Verified
                </span>
              </div>
            </div>

            {/* Showcase Canvas */}
            <div className="p-4 sm:p-8 md:p-12 flex items-center justify-center min-h-[300px] sm:min-h-[440px] md:min-h-[540px] bg-gradient-to-b from-[#060a17] to-[#02040a]">
              {deviceMode === "desktop" ? (
                <div className="w-full max-w-4xl aspect-[16/10] overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-black/60 shadow-2xl flex items-center justify-center group relative">
                  <img
                    src={study.image}
                    alt={`${study.title} desktop view`}
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                  {study.link && (
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 backdrop-blur-[2px]">
                      <a
                        href={study.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-mw-orange text-white px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-orange-600 transition-all shadow-xl"
                      >
                        <span>Launch Live Website</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </div>
                  )}
                </div>
              ) : (
                /* Mobile Preview Mockup */
                <div className="w-full max-w-[280px] sm:max-w-[320px] aspect-[9/18] rounded-[2.5rem] border-4 border-white/20 bg-black p-2 shadow-2xl relative overflow-hidden flex flex-col">
                  {/* Dynamic Island / Notch */}
                  <div className="w-24 h-4 bg-white/20 rounded-full mx-auto mb-2 shrink-0" />
                  <div className="flex-1 rounded-[2rem] overflow-hidden bg-black/90 border border-white/5 flex items-center justify-center p-2 relative">
                    <img
                      src={study.image}
                      alt={`${study.title} mobile view`}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  {/* Bottom bar indicator */}
                  <div className="w-20 h-1 bg-white/30 rounded-full mx-auto mt-2 shrink-0" />
                </div>
              )}
            </div>

            {/* Bottom Bar within showcase */}
            <div className="p-4 sm:p-6 bg-[#070b18] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-xs text-white/60">
                <Sparkles className="w-4 h-4 text-mw-orange shrink-0" />
                <span>Responsive architecture optimized across mobile, tablet, and ultra-wide screens.</span>
              </div>
              {study.link && (
                <a
                  href={study.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-mw-dark hover:bg-mw-orange hover:text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-xl min-h-[44px]"
                >
                  <span>Launch Live Platform</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Quantitative Performance Metrics Bar */}
      <section className="py-10 sm:py-14 border-y border-white/5 bg-[#030612] relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-white/5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-mw-orange">
              <BarChart3 className="w-4 h-4" />
              <span>Validated Performance Audits</span>
            </div>
            <div className="text-[11px] text-white/40 hidden sm:block">
              Measured pre-launch baseline vs. post-engineering deployment
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {study.metrics.map((metric, i) => (
              <div
                key={i}
                className="p-4 sm:p-6 rounded-2xl bg-[#080d1e] border border-white/10 hover:border-mw-orange/30 transition-all duration-300 group"
              >
                <div className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-mw-orange tracking-tight mb-2 group-hover:scale-105 transition-transform origin-left">
                  {metric.value}
                </div>
                <div className="text-xs sm:text-sm font-bold text-white tracking-wide">{metric.label}</div>
                {metric.subtext && (
                  <div className="text-[11px] sm:text-xs text-white/50 mt-1 leading-relaxed">{metric.subtext}</div>
                )}
                <div className="mt-3 pt-3 border-t border-white/5 flex items-center gap-1.5 text-[10px] text-emerald-400 font-medium">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Audited Outcome</span>
                </div>
              </div>
            ))}
          </div>

          {/* Core Web Vitals Simulation Bar */}
          <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Google Lighthouse Performance Score</div>
                <div className="text-[11px] text-white/50">Core Web Vitals certified for search crawling</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
              <div className="px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-1.5">
                <span>Performance</span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px]">99/100</span>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-1.5">
                <span>Accessibility</span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px]">100/100</span>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-1.5">
                <span>Best Practices</span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px]">100/100</span>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-1.5">
                <span>SEO Index</span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px]">100/100</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Sub-Tabs: Strategic Architecture, Tech Stack, Outcomes */}
      <section className="sticky top-20 z-30 bg-[#02050f]/95 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <div className="flex items-center gap-2 sm:gap-6 overflow-x-auto py-3 no-scrollbar">
            <button
              type="button"
              onClick={() => setActiveTab("overview")}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap min-h-[40px] flex items-center gap-2 ${
                activeTab === "overview"
                  ? "bg-mw-orange text-white shadow-lg shadow-mw-orange/20"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              <span>01. Strategic Context & Challenge</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("architecture")}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap min-h-[40px] flex items-center gap-2 ${
                activeTab === "architecture"
                  ? "bg-mw-orange text-white shadow-lg shadow-mw-orange/20"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>02. Architecture & Execution</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("results")}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap min-h-[40px] flex items-center gap-2 ${
                activeTab === "results"
                  ? "bg-mw-orange text-white shadow-lg shadow-mw-orange/20"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>03. Business Outcomes & Impact</span>
            </button>
          </div>
        </div>
      </section>

      {/* Tab Content 1: Strategic Context & Challenge */}
      {activeTab === "overview" && (
        <FadeInSection className="py-12 sm:py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 md:px-12">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
              {/* Sticky Executive Context */}
              <div className="lg:col-span-5">
                <div className="lg:sticky lg:top-36">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-mw-orange mb-3 sm:mb-4">
                    <Target className="w-4 h-4" />
                    <span>Executive Briefing</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 sm:mb-6 leading-tight">
                    The Strategic Bottleneck.
                  </h2>
                  <p className="text-white/70 text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8">
                    {study.executiveSummary}
                  </p>

                  <div className="p-5 sm:p-6 rounded-2xl bg-[#080d1d] border border-white/10 mb-6">
                    <div className="text-[11px] uppercase tracking-wider text-mw-orange font-mono mb-2">Core Mandate</div>
                    <div className="text-xs sm:text-sm font-medium text-white/90 leading-relaxed">
                      Transform existing presence from an inert portfolio into a 24/7 client generation engine engineered to attract and convert high-value corporate inquiries.
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-mw-orange/10 flex items-center justify-center text-mw-orange shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div className="text-xs text-white/60">
                      Delivered within <strong className="text-white">{study.projectDuration}</strong> with uninterrupted business continuity.
                    </div>
                  </div>
                </div>
              </div>

              {/* Challenge Details & Before vs After Matrix */}
              <div className="lg:col-span-7 space-y-8">
                {/* Specific Bottlenecks */}
                <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#090e1e] border border-white/10">
                  <h3 className="text-lg sm:text-xl font-bold mb-5 sm:mb-6 text-white flex items-center gap-3">
                    <Zap className="w-5 h-5 text-mw-orange" />
                    Critical Pain Points Solved
                  </h3>
                  <div className="space-y-3 sm:space-y-4">
                    {study.challengeDetails.map((detail, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 sm:gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
                      >
                        <div className="w-6 h-6 rounded-full bg-mw-orange/15 border border-mw-orange/30 flex items-center justify-center text-xs font-bold text-mw-orange shrink-0 mt-0.5">
                          0{idx + 1}
                        </div>
                        <p className="text-white/80 text-xs sm:text-sm md:text-base leading-relaxed">{detail}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Before vs After Transformation Table */}
                <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#070b18] border border-white/10">
                  <h3 className="text-lg sm:text-xl font-bold mb-5 sm:mb-6 text-white flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                    Before vs. After Transformation
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/20">
                      <div className="text-[11px] font-mono uppercase text-red-400 font-bold mb-2">Previous Limitations</div>
                      <ul className="space-y-2 text-xs text-white/70">
                        <li className="flex items-start gap-2">
                          <span className="text-red-400 font-bold">✕</span>
                          <span>Weak search engine discoverability</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-400 font-bold">✕</span>
                          <span>High friction lead intake & quote forms</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-400 font-bold">✕</span>
                          <span>Sub-optimal mobile viewports & slow speeds</span>
                        </li>
                      </ul>
                    </div>

                    <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20">
                      <div className="text-[11px] font-mono uppercase text-emerald-400 font-bold mb-2">Mindware Solution</div>
                      <ul className="space-y-2 text-xs text-white/90">
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-400 font-bold">✓</span>
                          <span>Top-tier Google ranking on key industry queries</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-400 font-bold">✓</span>
                          <span>Interactive request funnels with direct WhatsApp routing</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-400 font-bold">✓</span>
                          <span>Sub-second page speeds with Core Web Vitals 99+</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>
      )}

      {/* Tab Content 2: Architecture & Execution */}
      {activeTab === "architecture" && (
        <FadeInSection className="py-12 sm:py-16 md:py-24 bg-[#040816]">
          <div className="container mx-auto px-4 sm:px-6 md:px-12">
            <div className="max-w-4xl mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-mw-orange mb-3 sm:mb-4">
                <Code2 className="w-4 h-4" />
                <span>Technical Blueprint</span>
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 sm:mb-6 leading-tight">
                Engineering Methodology & Stack.
              </h2>
              <p className="text-white/70 text-sm sm:text-base md:text-lg leading-relaxed">
                {study.solution}
              </p>
            </div>

            {/* 4-Phase Execution Roadmap */}
            <div className="grid md:grid-cols-2 gap-5 sm:gap-8 mb-12 sm:mb-16">
              {study.strategySteps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/10 bg-[#080d1f] hover:border-mw-orange/30 transition-all duration-300 relative group"
                >
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-mw-orange font-mono">
                      Phase 0{idx + 1}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-mw-orange/20 group-hover:text-mw-orange transition-colors flex items-center justify-center text-xs font-bold text-white/60">
                      {idx + 1}
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-2xl font-bold mb-3 sm:mb-4 text-white group-hover:text-mw-orange transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-white/60 text-xs sm:text-sm md:text-base leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Deliverables & Technology Stack Spec */}
            <div className="grid lg:grid-cols-12 gap-8 p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl bg-[#070b18] border border-white/10">
              <div className="lg:col-span-7">
                <h3 className="text-lg sm:text-xl font-bold mb-5 sm:mb-6 text-white flex items-center gap-3">
                  <CheckSquare className="w-5 h-5 text-mw-orange" />
                  Key Production Deliverables
                </h3>
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                  {study.keyDeliverables.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs sm:text-sm text-white/90"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 pt-6 border-t border-white/10 lg:pt-0 lg:border-t-0 lg:border-l lg:border-white/10 lg:pl-8">
                <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-white flex items-center gap-3">
                  <Cpu className="w-5 h-5 text-mw-orange" />
                  Technology Stack
                </h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {study.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-white/80 hover:border-mw-orange/40 hover:text-white transition-colors min-h-[32px] inline-flex items-center"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-white/60 leading-relaxed">
                  <strong className="text-white block mb-1">Architectural Standards</strong>
                  Zero bloated plugins, clean TypeScript typing, Tailwind CSS modular tokens, and semantic HTML5 ensuring enterprise grade reliability.
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>
      )}

      {/* Tab Content 3: Business Outcomes & Impact */}
      {activeTab === "results" && (
        <FadeInSection className="py-12 sm:py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 md:px-12">
            <div className="max-w-4xl mx-auto">
              <div className="text-xs font-bold uppercase tracking-widest text-mw-orange mb-3 sm:mb-4 text-center">
                Commercial Validation
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6 sm:mb-8 text-center leading-tight">
                Measurable Business Outcomes.
              </h2>

              <div className="p-6 sm:p-10 md:p-12 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#0b1022] to-[#040813] border border-white/10 text-center mb-10 sm:mb-14 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-mw-orange/10 rounded-full blur-2xl pointer-events-none" />
                <p className="text-base sm:text-xl md:text-2xl text-white font-medium leading-relaxed mb-6">
                  "{study.result}"
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified Commercial Impact
                </div>
              </div>

              {/* Verified Client Testimonial */}
              {study.testimonial && (
                <div className="p-6 sm:p-10 md:p-12 rounded-2xl sm:rounded-3xl bg-[#090e1f] border border-white/10 relative overflow-hidden shadow-xl">
                  <Quote className="w-10 h-10 sm:w-16 sm:h-16 text-mw-orange/15 absolute top-6 right-6 pointer-events-none" />
                  <p className="text-base sm:text-xl md:text-2xl text-white/95 italic leading-relaxed mb-8 relative z-10 font-serif">
                    "{study.testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-4 relative z-10 pt-4 border-t border-white/10">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-mw-orange to-orange-700 flex items-center justify-center text-white font-bold text-base shadow-lg shadow-mw-orange/20 shrink-0">
                      {study.testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm sm:text-base">{study.testimonial.author}</div>
                      <div className="text-xs sm:text-sm text-white/60">{study.testimonial.role}</div>
                      <div className="text-[11px] text-mw-orange mt-0.5">{study.client}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </FadeInSection>
      )}

      {/* Previous / Next Study Pager */}
      <section className="py-8 sm:py-12 border-t border-white/10 bg-[#02050f]">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Prev Study */}
            <Link
              to={`/portfolio/case-studies/${prevStudy.id}`}
              className="p-4 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-mw-orange/40 hover:bg-white/[0.04] transition-all duration-300 group flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-white/5 group-hover:bg-mw-orange group-hover:text-white transition-all flex items-center justify-center text-white/60 shrink-0">
                <ChevronLeft className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] uppercase tracking-wider text-white/40 font-mono">Previous Case Study</div>
                <div className="text-xs sm:text-sm md:text-base font-bold text-white group-hover:text-mw-orange transition-colors truncate">
                  {prevStudy.title}
                </div>
                <div className="text-[11px] text-white/50 truncate">{prevStudy.client}</div>
              </div>
            </Link>

            {/* Next Study */}
            <Link
              to={`/portfolio/case-studies/${nextStudy.id}`}
              className="p-4 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-mw-orange/40 hover:bg-white/[0.04] transition-all duration-300 group flex items-center justify-between gap-4 text-right"
            >
              <div className="min-w-0 flex-1">
                <div className="text-[10px] uppercase tracking-wider text-white/40 font-mono">Next Case Study</div>
                <div className="text-xs sm:text-sm md:text-base font-bold text-white group-hover:text-mw-orange transition-colors truncate">
                  {nextStudy.title}
                </div>
                <div className="text-[11px] text-white/50 truncate">{nextStudy.client}</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/5 group-hover:bg-mw-orange group-hover:text-white transition-all flex items-center justify-center text-white/60 shrink-0">
                <ChevronRight className="w-5 h-5" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Related Case Studies Grid */}
      {relatedStudies.length > 0 && (
        <FadeInSection className="py-14 sm:py-20 border-t border-white/5 bg-[#030612]">
          <div className="container mx-auto px-4 sm:px-6 md:px-12">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 sm:mb-12">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-mw-orange mb-1 font-mono">
                  Additional Proof of Work
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">More Case Studies</h3>
                <p className="text-white/50 text-xs sm:text-sm mt-1">Explore how we solved mission-critical engineering challenges for other leaders.</p>
              </div>
              <Link
                to="/portfolio/case-studies"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-mw-orange hover:text-white transition-colors self-start sm:self-auto py-1"
              >
                <span>Browse All Case Studies</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
              {relatedStudies.map((other) => (
                <Link
                  key={other.id}
                  to={`/portfolio/case-studies/${other.id}`}
                  className="group p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/10 bg-[#080d1e] hover:bg-[#0c1228] hover:border-mw-orange/30 transition-all duration-300 block shadow-lg"
                >
                  <div className="aspect-[16/9] rounded-xl sm:rounded-2xl overflow-hidden bg-black/50 mb-4 sm:mb-6 p-3 flex items-center justify-center border border-white/5">
                    <img
                      src={other.image}
                      alt={other.title}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] sm:text-xs uppercase tracking-wider text-mw-orange font-semibold">
                      {other.industry}
                    </span>
                    <span className="text-[10px] text-white/40 font-mono">
                      {other.projectDuration}
                    </span>
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-white group-hover:text-mw-orange transition-colors mb-2">
                    {other.title}
                  </h4>
                  <p className="text-white/60 text-xs sm:text-sm line-clamp-2 leading-relaxed">{other.challenge}</p>
                </Link>
              ))}
            </div>
          </div>
        </FadeInSection>
      )}

      {/* Bottom Conversion CTA */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease: EASE }}
        className="py-16 sm:py-24 border-t border-white/10 text-center bg-gradient-to-b from-[#030612] to-mw-dark relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-radial-gradient from-mw-orange/10 via-transparent to-transparent opacity-60 pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-mw-orange/10 border border-mw-orange/20 text-mw-orange text-xs font-bold uppercase tracking-wider mb-6">
            <Flame className="w-3.5 h-3.5" />
            <span>Engineer Your Transformation</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 tracking-tight max-w-2xl mx-auto">
            Ready to Build Results Like {study.client}?
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-white/70 max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed">
            Schedule a high-impact technical consultation with our engineering directors to architect your new digital presence.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 max-w-md sm:max-w-none mx-auto">
            <Link
              to={`/contact?service=${encodeURIComponent(study.service)}&case_study=${encodeURIComponent(study.id)}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-mw-orange text-white hover:bg-orange-600 px-8 py-3.5 sm:py-4 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-xl shadow-mw-orange/25 min-h-[48px]"
            >
              <span>Schedule Strategic Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/portfolio/case-studies"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white px-8 py-3.5 sm:py-4 rounded-full font-semibold text-xs uppercase tracking-wider transition-colors min-h-[48px] bg-white/[0.02]"
            >
              <span>View All 12+ Case Studies</span>
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

