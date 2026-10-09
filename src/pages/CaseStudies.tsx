import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  TrendingUp,
  Clock,
  Layers,
  Award,
  Search,
  SlidersHorizontal,
  Sparkles,
  Code2,
  Building2,
  ChevronDown,
  ShieldCheck,
  Calculator,
  Zap,
  BarChart3,
  Quote,
  RefreshCw,
  PhoneCall
} from "lucide-react";
import { getAllCaseStudies, CaseStudyDetail } from "../data/caseStudies";
import { FadeInSection } from "../components/FadeInSection";
import { SEO } from "../components/SEO";
import { EASE } from "../lib/utils";

export function CaseStudies() {
  const caseStudies = useMemo(() => getAllCaseStudies(), []);

  // Filter & Search states
  const [activeIndustry, setActiveIndustry] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"featured" | "growth" | "duration">("featured");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Interactive ROI Calculator states
  const [visitorScale, setVisitorScale] = useState<number>(2500);
  const [currentConversionRate, setCurrentConversionRate] = useState<number>(1.2);
  const [growthFocus, setGrowthFocus] = useState<"authority" | "conversion" | "turnkey">("turnkey");

  // Unique industries with case study counts
  const industryOptions = useMemo(() => {
    const counts: Record<string, number> = {};
    caseStudies.forEach((cs) => {
      counts[cs.industry] = (counts[cs.industry] || 0) + 1;
    });
    const unique = Object.keys(counts).sort();
    return [
      { name: "All", count: caseStudies.length },
      ...unique.map((ind) => ({ name: ind, count: counts[ind] })),
    ];
  }, [caseStudies]);

  // Filtered & Sorted case studies
  const filteredStudies = useMemo(() => {
    let result = [...caseStudies];

    // Industry filter
    if (activeIndustry !== "All") {
      result = result.filter((c) => c.industry === activeIndustry);
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.client.toLowerCase().includes(q) ||
          c.industry.toLowerCase().includes(q) ||
          c.service.toLowerCase().includes(q) ||
          c.challenge.toLowerCase().includes(q) ||
          c.technologies.some((tech) => tech.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (sortBy === "growth") {
      result.sort((a, b) => {
        const valA = parseInt(a.metrics?.[0]?.value?.replace(/[^0-9]/g, "") || "0", 10);
        const valB = parseInt(b.metrics?.[0]?.value?.replace(/[^0-9]/g, "") || "0", 10);
        return valB - valA;
      });
    } else if (sortBy === "duration") {
      result.sort((a, b) => {
        const durA = parseInt(a.projectDuration?.replace(/[^0-9]/g, "") || "4", 10);
        const durB = parseInt(b.projectDuration?.replace(/[^0-9]/g, "") || "4", 10);
        return durA - durB;
      });
    }

    return result;
  }, [caseStudies, activeIndustry, searchQuery, sortBy]);

  // Dynamic ROI calculation metrics
  const calculatedOutcomes = useMemo(() => {
    const multiplier = growthFocus === "turnkey" ? 2.8 : growthFocus === "conversion" ? 2.4 : 2.1;
    const projectedVisitors = Math.round(visitorScale * (1 + (growthFocus === "authority" ? 1.4 : 0.85)));
    const projectedRate = Number((currentConversionRate * multiplier).toFixed(1));
    const currentLeads = Math.round((visitorScale * currentConversionRate) / 100);
    const projectedLeads = Math.round((projectedVisitors * projectedRate) / 100);
    const incrementalLeads = Math.max(0, projectedLeads - currentLeads);
    const speedRating = "<0.85s TTFB";

    return {
      projectedVisitors,
      projectedRate,
      currentLeads,
      projectedLeads,
      incrementalLeads,
      speedRating,
    };
  }, [visitorScale, currentConversionRate, growthFocus]);

  // Frequently Asked Questions
  const caseStudyFaqs = [
    {
      question: "How do you measure and verify the growth metrics cited in these case studies?",
      answer:
        "Every client engagement establishes baseline metrics prior to development—including Google Search Console impressions, click-through rates, Core Web Vitals load times, and inbound lead form / WhatsApp consultation volumes. Outcomes are tracked across 30, 60, and 90-day intervals post-launch to document verifiable commercial uplift.",
    },
    {
      question: "Are these projects built using standard WordPress templates or custom engineering?",
      answer:
        "Every digital flagship is custom-engineered using modern web frameworks (React, TypeScript, Tailwind CSS, Vite) with zero template bloat. This guarantees sub-second page performance, rock-solid security, custom RFQ calculators, and bespoke UI hierarchies tailored strictly to your commercial market.",
    },
    {
      question: "How long does a full corporate platform with technical SEO take to launch?",
      answer:
        "Turnaround times typically range between 3 to 6 weeks, depending on the complexity of catalog assets, architectural specifications, and bespoke lead funnels. High-priority corporate deployments can be expedited through sprint-based milestones.",
    },
    {
      question: "Can you migrate our legacy domain without losing our current Google rankings?",
      answer:
        "Yes. We execute comprehensive 301 redirection maps, canonical link audits, and structural Schema.org markup. In virtually all migrations, clients experience a sharp lift in search visibility within weeks due to improved Core Web Vitals, mobile-first indexing, and localized schema.",
    },
    {
      question: "Do you support ongoing maintenance, server operations, and technical SEO post-launch?",
      answer:
        "Yes. We offer continuous SLA agreements covering cloud hosting uptime, security monitoring, schema updates, monthly SEO reporting, and rapid content expansion to keep your digital platform ahead of competitors.",
    },
  ];

  return (
    <div className="bg-mw-dark min-h-screen text-white">
      <SEO
        title="Case Studies & Client Outcomes | Portfolio | Mindware Consulting"
        description="Explore documented portfolio case studies and data-validated results. Discover how Mindware Consulting builds custom digital platforms, technical SEO, and conversion funnels that drive measurable commercial growth."
      />

      {/* Hero Header */}
      <FadeInSection className="pt-28 sm:pt-36 md:pt-48 pb-12 sm:pb-16 md:pb-24 border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-mw-orange/10 via-transparent to-transparent blur-3xl mix-blend-screen pointer-events-none" />
        <div className="absolute -bottom-24 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="max-w-4xl"
          >
            {/* Breadcrumb Hierarchy */}
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-white/50 mb-4 sm:mb-6 flex-wrap">
              <Link to="/portfolio" className="hover:text-mw-orange transition-colors flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-mw-orange shrink-0" />
                <span>Portfolio</span>
              </Link>
              <span>/</span>
              <span className="text-white/80 font-semibold">Case Studies</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-mw-orange/10 border border-mw-orange/20 text-[11px] sm:text-xs font-semibold text-mw-orange uppercase tracking-wider mb-4 sm:mb-6 max-w-full">
              <Award className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Proven Outcomes & Commercial Case Studies</span>
            </div>

            <h1 className="text-2xl xs:text-3xl sm:text-5xl md:text-7xl font-bold font-display tracking-tight mb-4 sm:mb-6 leading-[1.1] text-white">
              Engineered for Growth. <br />
              <span className="text-gradient">Validated by Data.</span>
            </h1>

            <p className="text-sm sm:text-lg md:text-xl text-white/70 font-light leading-relaxed max-w-3xl mb-8 sm:mb-10">
              Every enterprise operates in a distinct competitive reality. Explore our documented case studies detailing how we turn complex business models into fast, authoritative web flagships, precision SEO schemas, and repeatable inbound revenue funnels.
            </p>

            {/* Quick Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 pt-6 sm:pt-8 border-t border-white/10">
              <div className="p-3 sm:p-4 rounded-xl bg-white/[0.02] border border-white/5 sm:border-white/10">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">150+</div>
                <div className="text-[11px] sm:text-xs uppercase tracking-wider text-white/50 mt-1">Platforms Delivered</div>
              </div>
              <div className="p-3 sm:p-4 rounded-xl bg-white/[0.02] border border-white/5 sm:border-white/10">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-mw-orange tracking-tight">300%</div>
                <div className="text-[11px] sm:text-xs uppercase tracking-wider text-white/50 mt-1">Average Client ROI</div>
              </div>
              <div className="p-3 sm:p-4 rounded-xl bg-white/[0.02] border border-white/5 sm:border-white/10">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">85%+</div>
                <div className="text-[11px] sm:text-xs uppercase tracking-wider text-white/50 mt-1">Avg Search Lift</div>
              </div>
              <div className="p-3 sm:p-4 rounded-xl bg-white/[0.02] border border-white/5 sm:border-white/10">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-mw-orange tracking-tight">100%</div>
                <div className="text-[11px] sm:text-xs uppercase tracking-wider text-white/50 mt-1">On-Time Delivery</div>
              </div>
            </div>
          </motion.div>
        </div>
      </FadeInSection>

      {/* Portfolio Subpage Navigation Bar */}
      <div className="bg-[#040812]/95 border-b border-white/10 sticky top-[60px] sm:top-[68px] z-30 backdrop-blur-xl">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 py-2 sm:py-3 flex items-center justify-between gap-3 sm:gap-4 overflow-x-auto scrollbar-none touch-pan-x">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/40 shrink-0">
            <span>Portfolio Sections:</span>
          </div>
          <div className="flex items-center gap-2 shrink-0 py-0.5">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white/70 hover:text-white hover:bg-white/5 border border-white/10 hover:border-white/20 transition-all shrink-0 min-h-[38px]"
            >
              <Layers className="w-3.5 h-3.5 text-mw-orange shrink-0" />
              <span>Selected Works</span>
            </Link>

            <Link
              to="/portfolio/case-studies"
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-mw-dark shadow-sm transition-all shrink-0 min-h-[38px]"
            >
              <Award className="w-3.5 h-3.5 text-mw-dark shrink-0" />
              <span>Case Studies</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-mw-dark/10 text-mw-dark font-mono font-bold">
                {caseStudies.length}
              </span>
              <span className="hidden sm:inline-block text-[9px] px-1.5 py-0.5 rounded bg-mw-orange text-white font-bold uppercase">
                Active View
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Filter Tabs, Search & Case Studies Grid */}
      <FadeInSection className="py-12 sm:py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          {/* Header Controls & Search Bar */}
          <div className="flex flex-col gap-6 mb-8 sm:mb-12 pb-6 sm:pb-8 border-b border-white/10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
                  Detailed Case Studies ({filteredStudies.length})
                </h2>
                <p className="text-white/50 text-xs sm:text-sm mt-1">
                  Examine complete project narratives, challenges, architecture decisions, and commercial outcomes.
                </p>
              </div>

              {/* Search & Sort Controls */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
                <div className="relative flex-1 sm:w-72">
                  <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search client, tech, industry..."
                    aria-label="Search case studies by client, technology, or industry"
                    className="w-full bg-[#0a0d14] border border-white/10 rounded-xl pl-10 pr-8 py-2.5 text-xs sm:text-sm text-white placeholder-white/40 focus:outline-none focus:border-mw-orange transition-colors min-h-[44px]"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-xs font-bold"
                    >
                      ×
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#0a0d14] border border-white/10 text-xs text-white/70 min-h-[44px] shrink-0">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-mw-orange shrink-0" />
                    <span className="hidden xs:inline">Sort:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as "featured" | "growth" | "duration")}
                      aria-label="Sort case studies"
                      className="bg-transparent text-white font-medium focus:outline-none text-xs cursor-pointer"
                    >
                      <option value="featured" className="bg-[#0a0d14] text-white">Featured</option>
                      <option value="growth" className="bg-[#0a0d14] text-white">Highest Growth</option>
                      <option value="duration" className="bg-[#0a0d14] text-white">Fastest Delivery</option>
                    </select>
                  </div>

                  {(searchQuery || activeIndustry !== "All") && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery("");
                        setActiveIndustry("All");
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white border border-white/10 text-xs font-medium transition-colors min-h-[44px]"
                      title="Reset filters"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Reset</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Industry Filter Pills */}
            <div
              className="flex overflow-x-auto pb-2 scrollbar-none gap-2 flex-nowrap md:flex-wrap w-full -mx-4 px-4 sm:mx-0 sm:px-0 touch-pan-x"
              role="group"
              aria-label="Filter case studies by industry"
            >
              {industryOptions.map((ind) => {
                const isSelected = activeIndustry === ind.name;
                return (
                  <button
                    key={ind.name}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setActiveIndustry(ind.name)}
                    className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 border whitespace-nowrap shrink-0 min-h-[40px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mw-orange active:scale-95 ${
                      isSelected
                        ? "bg-white text-mw-dark border-white shadow-lg shadow-white/10"
                        : "bg-white/5 text-white/60 border-white/10 hover:border-white/30 hover:text-white"
                    }`}
                  >
                    <span>{ind.name}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
                        isSelected ? "bg-mw-dark/15 text-mw-dark" : "bg-white/10 text-white/60"
                      }`}
                    >
                      {ind.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cards Grid or Empty State */}
          {filteredStudies.length === 0 ? (
            <div className="text-center py-16 sm:py-20 rounded-3xl border border-white/10 bg-[#0a0d14] p-8 max-w-xl mx-auto">
              <Search className="w-10 h-10 text-mw-orange/50 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">No Matching Case Studies</h3>
              <p className="text-white/60 text-sm mb-6 leading-relaxed">
                We couldn't find any projects matching "{searchQuery}". Try searching for keywords like "Construction", "SEO", "React", or "Machinery".
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveIndustry("All");
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-mw-orange text-white text-xs font-bold uppercase tracking-wider hover:bg-white hover:text-mw-dark transition-colors min-h-[44px]"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Clear Filters</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
              {filteredStudies.map((study, index) => {
                const highlightMetric = study.metrics?.[0] || { label: "Performance", value: "+85%" };

                return (
                  <motion.article
                    key={study.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: (index % 2) * 0.1, ease: EASE }}
                    className="group rounded-2xl sm:rounded-3xl border border-white/10 bg-[#0a0d14] hover:bg-[#0e121c] hover:border-white/20 transition-all duration-500 overflow-hidden flex flex-col justify-between shadow-lg"
                  >
                    <div>
                      {/* Visual Preview Container */}
                      <div className="relative aspect-[16/10] bg-[#02040a] overflow-hidden flex items-center justify-center p-3 sm:p-5 border-b border-white/5">
                        <img
                          src={study.image}
                          alt={`${study.title} for ${study.client}`}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-mw-dark/20 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />

                        {/* Top Metric Tag */}
                        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-[#02040a]/90 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
                          <TrendingUp className="w-3.5 h-3.5 text-mw-orange shrink-0" />
                          <span className="text-xs font-bold text-white tracking-wide">
                            {highlightMetric.value} {highlightMetric.label}
                          </span>
                        </div>

                        {/* External Live Site Quick Button */}
                        {study.link && (
                          <a
                            href={study.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Visit live website for ${study.client}`}
                            className="absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 sm:w-10 sm:h-10 min-h-[36px] min-w-[36px] rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-mw-dark transition-all duration-300 shadow-md active:scale-95"
                            onClick={(e) => e.stopPropagation()}
                            title="Visit verified live website"
                          >
                            <ArrowUpRight className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                          </a>
                        )}
                      </div>

                      {/* Content Body */}
                      <div className="p-5 sm:p-6 md:p-8">
                        {/* Meta info badges */}
                        <div className="flex items-center gap-2 sm:gap-3 text-xs font-semibold uppercase tracking-wider text-mw-orange mb-2 sm:mb-3 flex-wrap">
                          <span className="flex items-center gap-1">
                            <Building2 className="w-3 h-3 shrink-0" />
                            <span>{study.industry}</span>
                          </span>
                          <span className="w-1 h-1 rounded-full bg-white/30" />
                          <span className="text-white/60">{study.service}</span>
                        </div>

                        <div className="text-xs sm:text-sm font-medium text-white/50 mb-1">{study.client}</div>
                        
                        <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-3 sm:mb-4 group-hover:text-mw-orange transition-colors">
                          <Link to={`/portfolio/case-studies/${study.id}`} className="hover:underline">
                            {study.title}
                          </Link>
                        </h3>

                        {study.tagline && (
                          <div className="text-xs sm:text-sm font-medium text-mw-orange/90 italic mb-3">
                            "{study.tagline}"
                          </div>
                        )}

                        <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-5 line-clamp-3">
                          {study.challenge}
                        </p>

                        {/* Tech Stack Preview */}
                        {study.technologies && study.technologies.length > 0 && (
                          <div className="mb-5 flex items-center gap-1.5 flex-wrap">
                            <span className="text-[10px] uppercase font-bold text-white/40 mr-1 flex items-center gap-1">
                              <Code2 className="w-3 h-3 text-mw-orange" /> Stack:
                            </span>
                            {study.technologies.slice(0, 4).map((tech) => (
                              <span
                                key={tech}
                                className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/10 text-white/70 font-mono"
                              >
                                {tech}
                              </span>
                            ))}
                            {study.technologies.length > 4 && (
                              <span className="text-[10px] text-white/40 font-mono">
                                +{study.technologies.length - 4} more
                              </span>
                            )}
                          </div>
                        )}

                        {/* Highlights Grid */}
                        <div className="grid grid-cols-2 gap-3 sm:gap-4 py-3 sm:py-4 border-t border-b border-white/10 mb-4 bg-white/[0.015] rounded-xl px-3 sm:px-4">
                          <div className="flex items-center gap-2.5 sm:gap-3">
                            <TrendingUp className="w-4 h-4 text-mw-orange shrink-0" />
                            <div>
                              <div className="text-[10px] uppercase tracking-wider text-white/40">Growth Metric</div>
                              <div className="text-xs sm:text-sm font-bold text-white">
                                {study.metrics[0]?.value || "+85%"}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2.5 sm:gap-3">
                            <Clock className="w-4 h-4 text-white/60 shrink-0" />
                            <div>
                              <div className="text-[10px] uppercase tracking-wider text-white/40">Turnaround</div>
                              <div className="text-xs sm:text-sm font-bold text-white">
                                {study.projectDuration || "4 Weeks"}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Client Quote Preview if available */}
                        {study.testimonial && (
                          <div className="p-3 rounded-xl bg-mw-orange/[0.04] border border-mw-orange/15 mb-4 text-xs text-white/80 italic flex items-start gap-2">
                            <Quote className="w-3.5 h-3.5 text-mw-orange shrink-0 mt-0.5" />
                            <div className="line-clamp-2">
                              "{study.testimonial.quote}"
                              <span className="not-italic text-white/50 block text-[10px] font-medium mt-1">
                                — {study.testimonial.author}, {study.testimonial.role}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions Bar */}
                    <div className="px-5 sm:px-6 md:px-8 pb-6 sm:pb-8 pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-t border-white/5 sm:border-0 pt-4 sm:pt-0">
                      <Link
                        to={`/portfolio/case-studies/${study.id}`}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-mw-dark hover:bg-mw-orange hover:text-white px-5 py-3 sm:py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md group/btn min-h-[44px] active:scale-95"
                      >
                        <span>Read Full Case Study</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                      </Link>

                      {study.link && (
                        <a
                          href={study.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full sm:w-auto inline-flex items-center justify-center sm:justify-start gap-1.5 text-xs font-semibold text-white/70 hover:text-white transition-colors min-h-[40px] py-1"
                        >
                          <span>Visit Live Site</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </motion.article>
                );
              })}
            </div>
          )}
        </div>
      </FadeInSection>

      {/* Interactive Growth & ROI Estimator Widget */}
      <FadeInSection className="py-14 sm:py-20 md:py-24 border-t border-white/10 bg-[#050811] relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-mw-orange/5 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-mw-orange/10 border border-mw-orange/20 text-xs font-semibold text-mw-orange uppercase tracking-wider mb-4">
              <Calculator className="w-3.5 h-3.5 shrink-0" />
              <span>Interactive Commercial Modeler</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Project Your Platform's Commercial Lift.
            </h2>
            <p className="text-white/70 text-xs sm:text-base max-w-2xl mx-auto leading-relaxed">
              Based on historical data from 150+ custom builds, estimate how our high-performance architecture and localized SEO will impact your monthly qualified inquiries.
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#090d16] border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl">
            {/* Input Controls */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              <div>
                <div className="flex items-center justify-between text-xs sm:text-sm font-semibold mb-2">
                  <span className="text-white/80">Estimated Monthly Organic Visitors</span>
                  <span className="text-mw-orange font-mono font-bold text-base">
                    {visitorScale.toLocaleString()} visits/mo
                  </span>
                </div>
                <input
                  type="range"
                  min={500}
                  max={20000}
                  step={500}
                  value={visitorScale}
                  onChange={(e) => setVisitorScale(Number(e.target.value))}
                  aria-label="Estimated Monthly Organic Visitors"
                  className="w-full accent-mw-orange bg-white/10 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-white/40 mt-1">
                  <span>500 (Early-Stage)</span>
                  <span>5,000 (Mid-Market)</span>
                  <span>20,000+ (High-Traffic)</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs sm:text-sm font-semibold mb-2">
                  <span className="text-white/80">Current Inquiry / RFQ Conversion Rate</span>
                  <span className="text-white font-mono font-bold">{currentConversionRate}%</span>
                </div>
                <input
                  type="range"
                  min={0.5}
                  max={3.0}
                  step={0.1}
                  value={currentConversionRate}
                  onChange={(e) => setCurrentConversionRate(Number(e.target.value))}
                  aria-label="Current Inquiry Conversion Rate"
                  className="w-full accent-mw-orange bg-white/10 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-white/40 mt-1">
                  <span>0.5% (Slow Inquiry Funnel)</span>
                  <span>1.5% (Average)</span>
                  <span>3.0% (Optimized)</span>
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-white/80 mb-2">
                  Primary Transformation Objective
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setGrowthFocus("authority")}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      growthFocus === "authority"
                        ? "bg-mw-orange/15 border-mw-orange text-white"
                        : "bg-white/[0.02] border-white/10 text-white/60 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    <div className="text-xs font-bold mb-1">Search Authority</div>
                    <div className="text-[10px] text-white/50 leading-snug">Google Top 3 rank & local dominance</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setGrowthFocus("conversion")}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      growthFocus === "conversion"
                        ? "bg-mw-orange/15 border-mw-orange text-white"
                        : "bg-white/[0.02] border-white/10 text-white/60 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    <div className="text-xs font-bold mb-1">Lead Conversion</div>
                    <div className="text-[10px] text-white/50 leading-snug">WhatsApp RFQs & contract intake</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setGrowthFocus("turnkey")}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      growthFocus === "turnkey"
                        ? "bg-mw-orange/15 border-mw-orange text-white"
                        : "bg-white/[0.02] border-white/10 text-white/60 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    <div className="text-xs font-bold mb-1">Turnkey Flagship</div>
                    <div className="text-[10px] text-white/50 leading-snug">Full stack rebuild + multi-channel SEO</div>
                  </button>
                </div>
              </div>
            </div>

            {/* Projected Outputs Card */}
            <div className="lg:col-span-5 bg-[#03060c] border border-white/15 rounded-2xl p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-mw-orange/10 rounded-full blur-2xl pointer-events-none" />

              <div className="mb-6">
                <div className="text-xs uppercase font-bold text-mw-orange tracking-wider mb-1 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" /> Projected Monthly Inbound Lift
                </div>
                <div className="text-4xl sm:text-5xl font-black text-white font-display tracking-tight my-2">
                  +{calculatedOutcomes.incrementalLeads} <span className="text-lg text-white/60 font-sans font-normal">leads/mo</span>
                </div>
                <p className="text-xs text-white/60">
                  Estimated increase in qualified project requests, tenders, or direct inquiries.
                </p>
              </div>

              <div className="space-y-3.5 border-t border-white/10 pt-4 mb-6">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/60">Projected Monthly Visitors:</span>
                  <span className="font-bold text-white font-mono">{calculatedOutcomes.projectedVisitors.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/60">Projected Conversion Rate:</span>
                  <span className="font-bold text-mw-orange font-mono">{calculatedOutcomes.projectedRate}%</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/60">Estimated Load Speed:</span>
                  <span className="font-bold text-emerald-400 font-mono">{calculatedOutcomes.speedRating}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/60">Target Delivery Timeline:</span>
                  <span className="font-bold text-white font-mono">4 to 6 Weeks</span>
                </div>
              </div>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 w-full bg-mw-orange hover:bg-white hover:text-mw-dark text-white py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all min-h-[44px] shadow-lg active:scale-95"
              >
                <span>Request Custom Strategy Brief</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* Methodology Section */}
      <FadeInSection className="py-14 sm:py-20 md:py-24 border-t border-white/5 bg-[#030712]">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <div className="max-w-3xl mb-10 sm:mb-14 md:mb-16">
            <div className="text-xs font-bold uppercase tracking-widest text-mw-orange mb-2 sm:mb-3">Our Framework</div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              How Every Project Achieves Repeatable Commercial Success.
            </h2>
            <p className="text-white/60 text-xs sm:text-base mt-3 leading-relaxed">
              We apply a rigid three-stage engineering cycle to ensure every deployment delivers both structural durability and commercial impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
            <div className="p-6 sm:p-8 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-mw-orange/30 transition-colors">
              <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-mw-orange/10 border border-mw-orange/20 flex items-center justify-center text-mw-orange font-bold text-base sm:text-lg mb-5 sm:mb-6">
                01
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-white">Strategic Deep-Dive</h3>
              <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-4">
                We dissect industry competitive dynamics, identify high-intent buyer searches, and architect an information flow that immediately communicates authority.
              </p>
              <div className="text-[11px] font-semibold text-mw-orange flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Competitor & Schema Audit
              </div>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-mw-orange/30 transition-colors">
              <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-mw-orange/10 border border-mw-orange/20 flex items-center justify-center text-mw-orange font-bold text-base sm:text-lg mb-5 sm:mb-6">
                02
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-white">Precision Engineering</h3>
              <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-4">
                No templates or bloat. We engineer lightning-fast modern web applications with sub-second response times, immaculate typography, and frictionless UX.
              </p>
              <div className="text-[11px] font-semibold text-mw-orange flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Sub-Second Core Web Vitals
              </div>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-mw-orange/30 transition-colors">
              <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-mw-orange/10 border border-mw-orange/20 flex items-center justify-center text-mw-orange font-bold text-base sm:text-lg mb-5 sm:mb-6">
                03
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-white">Commercial Conversion</h3>
              <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-4">
                Direct WhatsApp integration, frictionless RFQ funnels, and enterprise Schema.org SEO transform everyday organic traffic into lucrative contract opportunities.
              </p>
              <div className="text-[11px] font-semibold text-mw-orange flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> High-Converting Lead Channels
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* Interactive FAQ Accordion */}
      <FadeInSection className="py-14 sm:py-20 md:py-24 border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-4xl">
          <div className="text-center mb-10 sm:mb-14">
            <div className="text-xs font-bold uppercase tracking-widest text-mw-orange mb-2">Common Questions</div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
              Case Study & Client Engagement FAQs
            </h2>
            <p className="text-white/60 text-xs sm:text-base mt-2">
              Everything you need to know about our scope, performance guarantees, and delivery standards.
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {caseStudyFaqs.map((faq, idx) => {
              const isOpen = expandedFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/10 bg-[#0a0d14] overflow-hidden transition-all duration-300"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedFaq(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 text-sm sm:text-base font-bold text-white hover:text-mw-orange transition-colors min-h-[52px]"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-mw-orange" : "text-white/40"
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: EASE }}
                      >
                        <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-xs sm:text-sm text-white/70 leading-relaxed border-t border-white/5 pt-3">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </FadeInSection>

      {/* Bottom Strategic Consultation CTA */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 0.8, ease: EASE }}
        className="py-16 sm:py-20 md:py-28 border-t border-white/5 relative overflow-hidden bg-gradient-to-b from-mw-dark to-[#040710]"
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-12 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-mw-orange/10 border border-mw-orange/20 text-xs font-semibold text-mw-orange uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span>Begin Your Digital Transformation</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 tracking-tight">
            Ready to Build Your Next Milestone?
          </h2>
          <p className="text-sm sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
            Partner with Mindware Consulting to engineer a distinct, high-converting digital platform that outperforms your industry peers and accelerates commercial growth.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 sm:gap-4 max-w-md sm:max-w-none mx-auto">
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white text-mw-dark hover:bg-mw-orange hover:text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-xl min-h-[48px] active:scale-95"
            >
              <span>Schedule Strategic Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/pricing"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-medium text-xs sm:text-sm transition-colors min-h-[48px] active:scale-95"
            >
              <span>View Transparent Pricing</span>
            </Link>

            <Link
              to="/portfolio"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-white/60 hover:text-white px-4 py-3 rounded-full text-xs font-medium transition-colors min-h-[44px]"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Back to Portfolio</span>
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

