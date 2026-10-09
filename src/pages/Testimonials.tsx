import React, { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Video,
  Youtube,
  Play,
  Star,
  CheckCircle2,
  Building2,
  GraduationCap,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Award,
  Filter,
  Info,
  Clock,
  Briefcase
} from "lucide-react";
import {
  AGENCY_TESTIMONIALS,
  OFFICIAL_YOUTUBE_CHANNEL,
  AgencyClientTestimonial
} from "../data/testimonialsData";
import { AboutSubNav } from "../components/about/AboutSubNav";
import { YouTubeModal } from "../components/testimonials/YouTubeModal";
import { SEO } from "../components/SEO";
import { EASE, cn } from "../lib/utils";
import { FadeInSection } from "../components/FadeInSection";

export function Testimonials() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const compartmentParam = searchParams.get("compartment");

  // Redirect old student/graduate queries to the new Academy sub-page
  useEffect(() => {
    if (compartmentParam === "students" || compartmentParam === "graduates") {
      navigate("/training/testimonials", { replace: true });
    }
  }, [compartmentParam, navigate]);

  // Active filter for agency clients
  const [agencyFilter, setAgencyFilter] = useState<string>("All");

  // Selected video for the modal player
  const [selectedVideo, setSelectedVideo] = useState<AgencyClientTestimonial | null>(null);

  // Filtered list
  const filteredAgencyTestimonials = AGENCY_TESTIMONIALS.filter((t) => {
    if (agencyFilter === "All") return true;
    return (
      t.industry.toLowerCase().includes(agencyFilter.toLowerCase()) ||
      t.serviceProvided.toLowerCase().includes(agencyFilter.toLowerCase())
    );
  });

  // Featured agency spotlight
  const featuredAgency = AGENCY_TESTIMONIALS.find((t) => t.featured) || AGENCY_TESTIMONIALS[0];

  return (
    <div className="bg-[#02040a] min-h-screen text-white pt-24 sm:pt-28 pb-16 sm:pb-24">
      <SEO
        title="Corporate Client Video Testimonials | YouTube Video Reviews | Mindware Consulting"
        description="Watch verified video testimonials from managing directors and corporate founders whose web design, branding, and SEO strategy were engineered by Mindware Consulting."
      />

      {/* Hero Header */}
      <section className="relative overflow-hidden py-8 sm:py-12 md:py-16 border-b border-white/5">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-red-600/10 via-mw-orange/5 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs md:text-sm text-white/50 mb-4 sm:mb-6 flex-wrap">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-semibold">3. Client Video Reviews</span>
          </div>

          <div className="max-w-4xl space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/10 border border-red-500/20 text-red-400 text-xs font-semibold uppercase tracking-wider">
              <Youtube className="w-4 h-4 fill-current text-red-500" />
              <span>Sub-Page 3 • Official YouTube Client Video Reviews</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-white tracking-tight leading-[1.15] sm:leading-[1.1]">
              Real CEOs. Real Commercial Growth. <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-mw-orange to-amber-300">
                Verified on Video.
              </span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-white/70 max-w-2xl leading-relaxed">
              Watch verified video testimonials from managing directors, corporate founders, and engineering leaders sharing how Mindware Consulting engineered their digital identity, client acquisition pipelines, and commercial ROI.
            </p>

            {/* Quick action bar */}
            <div className="pt-2 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-4">
              <a
                href={OFFICIAL_YOUTUBE_CHANNEL.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 rounded-full bg-red-600/10 hover:bg-red-600/20 border border-red-500/20 text-red-400 text-xs font-mono font-bold transition-colors text-center"
              >
                <Youtube className="w-4 h-4 fill-current text-red-500 shrink-0" />
                <span>Official YouTube Channel ({OFFICIAL_YOUTUBE_CHANNEL.subscribersCount} Subs)</span>
                <ExternalLink className="w-3 h-3 ml-0.5 opacity-60 shrink-0" />
              </a>

              {/* Sub-page switch to Academy Graduate Reviews */}
              <Link
                to="/training/testimonials"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 text-xs font-semibold transition-colors text-center"
              >
                <GraduationCap className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Graduate Reviews & Certifications</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Sub Navigation Bar */}
      <AboutSubNav activeTab="testimonials" />

      {/* Main Content Area */}
      <main className="container mx-auto px-4 sm:px-6 md:px-12 py-8 sm:py-12 md:py-16 space-y-8 sm:space-y-12">
        {/* Dedicated Academy Graduate Videos Notice Banner */}
        <div className="p-4 sm:p-5 rounded-2xl border border-emerald-500/20 bg-emerald-950/20 backdrop-blur-md flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-white">
                Student & Graduate Video Testimonials have moved to the Academy Section
              </div>
              <div className="text-[11px] sm:text-xs text-white/60">
                Explore real career transitions, PMP® pass proof, and HSE alumni reviews under Academy Sub-Page 3.
              </div>
            </div>
          </div>

          <Link
            to="/training/testimonials"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shrink-0 w-full sm:w-auto text-center"
          >
            <span>View Graduate Videos</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Corporate Agency Clients Showcase */}
        <div className="space-y-6 sm:space-y-10">
          {/* Header & Filter Pills */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-mw-orange uppercase tracking-wider">
                <Building2 className="w-3.5 h-3.5" />
                <span>Corporate Client Testimonials</span>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mt-1">
                Enterprise Client Feedback & Commercial ROI ({filteredAgencyTestimonials.length})
              </h3>
            </div>

            {/* Filter Pills with Horizontal Scrolling on Mobile */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none touch-pan-x -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap w-full md:w-auto">
              {["All", "Engineering", "Energy", "Logistics", "Construction", "Interior", "Machinery"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setAgencyFilter(cat)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0",
                    agencyFilter === cat
                      ? "bg-white text-mw-dark"
                      : "bg-white/5 text-white/60 hover:text-white border border-white/10"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Video Spotlight */}
          <div className="rounded-2xl sm:rounded-3xl border border-white/15 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-4 sm:p-6 md:p-8 overflow-hidden relative shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              {/* Video Preview Box */}
              <div className="lg:col-span-7">
                <div className="relative aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-black/80 border border-white/10 shadow-2xl">
                  {featuredAgency.thumbnail ? (
                    <div
                      onClick={() => setSelectedVideo(featuredAgency)}
                      className="relative w-full h-full cursor-pointer group"
                    >
                      <img
                        src={featuredAgency.thumbnail}
                        alt={featuredAgency.company}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Red YouTube Play Button Icon */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-red-600 group-hover:bg-red-500 text-white flex items-center justify-center shadow-2xl shadow-red-600/50 group-hover:scale-110 transition-all duration-300">
                          <Play className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 fill-current ml-1" />
                        </div>
                      </div>

                      {/* Duration & YouTube tags */}
                      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-2">
                        <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-red-600 text-white text-[11px] sm:text-xs font-bold flex items-center gap-1.5 shadow-md">
                          <Youtube className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
                          <span>YouTube Video</span>
                        </span>
                        <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-black/70 backdrop-blur-md text-white/90 text-[11px] sm:text-xs font-mono font-bold">
                          {featuredAgency.videoDuration}
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
                        <div className="text-[11px] sm:text-xs text-white/60 uppercase tracking-wider font-semibold">Featured Case Spotlight</div>
                        <div className="text-sm sm:text-base md:text-lg font-bold text-white truncate">{featuredAgency.company}</div>
                      </div>
                    </div>
                  ) : (
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${featuredAgency.youtubeVideoId}?rel=0&modestbranding=1&playsinline=1`}
                      title={`${featuredAgency.company} Video Testimonial`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  )}
                </div>
              </div>

              {/* Info & Quote Column */}
              <div className="lg:col-span-5 space-y-3 sm:space-y-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                  ))}
                  <span className="text-xs text-white/60 ml-2 font-mono">5.0 Star Verified Review</span>
                </div>

                <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-white leading-snug">
                  "{featuredAgency.quote}"
                </h4>

                <div className="p-3.5 sm:p-4 rounded-xl bg-mw-orange/10 border border-mw-orange/20 space-y-1">
                  <div className="text-xs font-bold text-mw-orange uppercase tracking-wider">
                    Commercial Outcome:
                  </div>
                  <div className="text-xs sm:text-sm text-white/90 font-medium">
                    {featuredAgency.highlightOutcome}
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-1 sm:pt-2">
                  <img
                    src={featuredAgency.avatar}
                    alt={featuredAgency.name}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border border-white/20 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-bold text-white truncate">{featuredAgency.name}</div>
                    <div className="text-xs text-white/60 truncate">{featuredAgency.role}</div>
                    <div className="text-xs text-mw-orange font-semibold truncate">{featuredAgency.company}</div>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
                  <button
                    onClick={() => setSelectedVideo(featuredAgency)}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-red-600/20 w-full sm:w-auto text-center"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Play Client Video Review</span>
                  </button>

                  {featuredAgency.websiteUrl && (
                    <a
                      href={featuredAgency.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white font-semibold text-xs border border-white/10 transition-colors w-full sm:w-auto text-center"
                    >
                      <span>Visit Live Website</span>
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Video Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {filteredAgencyTestimonials.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.02] hover:border-mw-orange/40 hover:bg-white/[0.04] transition-all flex flex-col justify-between overflow-hidden group shadow-lg"
              >
                {/* Video Thumbnail Preview Header */}
                <div>
                  <div className="relative aspect-video overflow-hidden bg-black/60">
                    {item.thumbnail ? (
                      <div
                        onClick={() => setSelectedVideo(item)}
                        className="relative w-full h-full cursor-pointer group/thumb"
                      >
                        <img
                          src={item.thumbnail}
                          alt={item.company}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />

                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-red-600/90 group-hover:bg-red-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-all">
                            <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current ml-0.5" />
                          </div>
                        </div>

                        {/* Badges */}
                        <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded bg-red-600 text-white text-[10px] font-bold flex items-center gap-1">
                            <Youtube className="w-3 h-3 fill-current" />
                            <span>YouTube</span>
                          </span>
                          <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-white text-[10px] font-mono">
                            {item.videoDuration}
                          </span>
                        </div>

                        <div className="absolute bottom-2.5 left-3 right-3 text-[11px] text-white/80 font-mono truncate">
                          ID: {item.youtubeVideoId}
                        </div>
                      </div>
                    ) : (
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${item.youtubeVideoId}?rel=0&modestbranding=1`}
                        title={`${item.company} Video Testimonial`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="w-full h-full border-0"
                      />
                    )}
                  </div>

                  {/* Content Details */}
                  <div className="p-4 sm:p-6 space-y-2.5 sm:space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-mw-orange font-semibold uppercase tracking-wider text-[11px] sm:text-xs truncate mr-2">{item.serviceProvided}</span>
                      <div className="flex items-center gap-0.5 text-amber-400 shrink-0">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
                        ))}
                      </div>
                    </div>

                    <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-mw-orange transition-colors truncate">
                      {item.company}
                    </h4>

                    <p className="text-xs sm:text-sm text-white/70 line-clamp-3 leading-relaxed">
                      "{item.quote}"
                    </p>

                    <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
                      <span className="text-white/50 text-[11px] sm:text-xs">{item.metricLabel}</span>
                      <span className="text-emerald-400 font-bold font-mono text-xs sm:text-sm">{item.metricValue}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Details */}
                <div className="p-4 sm:p-6 pt-0 border-t border-white/5 flex items-center justify-between gap-3 mt-2">
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border border-white/20 shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white truncate flex items-center gap-1">
                        <span className="truncate">{item.name}</span>
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-white/50 truncate">{item.role}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                    <button
                      onClick={() => setSelectedVideo(item)}
                      className="px-2.5 sm:px-3 py-1.5 rounded-full bg-red-600/10 hover:bg-red-600/20 text-red-400 hover:text-red-300 text-[11px] sm:text-xs font-bold border border-red-500/20 flex items-center gap-1.5 transition-colors"
                    >
                      <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
                      <span>Watch</span>
                    </button>

                    {item.websiteUrl && (
                      <a
                        href={item.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit ${item.company} website`}
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/5 hover:bg-white/15 text-white/70 hover:text-white flex items-center justify-center transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Cross-Promotion Subpage Cards (About Subpages & Academy) */}
      <section className="container mx-auto px-4 sm:px-6 md:px-12 pt-6 sm:pt-8">
        <div className="mb-4 sm:mb-6">
          <div className="text-xs uppercase tracking-widest text-mw-orange font-bold font-mono">Related Sub-Pages & Portals</div>
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mt-1">Explore More About Mindware</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-6">
          <Link
            to="/about/mission-vision"
            className="p-5 sm:p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-mw-orange/30 transition-all flex items-center justify-between group"
          >
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-mw-orange font-bold flex items-center gap-1.5">
                About Sub-Page 1
              </span>
              <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-mw-orange transition-colors">
                Mission, Vision & Core Values
              </h4>
              <p className="text-xs text-white/60">
                Explore our commercial mission and 2030 strategic horizons.
              </p>
            </div>
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-mw-orange group-hover:text-white transition-colors">
              <ChevronRight className="w-4 h-4" />
            </div>
          </Link>

          <Link
            to="/about/leadership"
            className="p-5 sm:p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-blue-500/30 transition-all flex items-center justify-between group"
          >
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-blue-400 font-bold flex items-center gap-1.5">
                About Sub-Page 2
              </span>
              <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-blue-400 transition-colors">
                Leadership, Executive Team & Governance
              </h4>
              <p className="text-xs text-white/60">
                Meet the founder, executive directors, and governance team.
              </p>
            </div>
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <ChevronRight className="w-4 h-4" />
            </div>
          </Link>

          <Link
            to="/training/testimonials"
            className="p-5 sm:p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-emerald-500/40 transition-all flex items-center justify-between group"
          >
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                Academy Sub-Page 3
              </span>
              <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                Graduate Video Testimonials
              </h4>
              <p className="text-xs text-white/60">
                Watch certified alumni share their PMP®, HSE & tech career transformations.
              </p>
            </div>
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <ChevronRight className="w-4 h-4" />
            </div>
          </Link>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="container mx-auto px-4 sm:px-6 md:px-12 pt-12 sm:pt-20">
        <div className="rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 bg-gradient-to-r from-[#0d1627] via-[#090d16] to-[#1a0e0a] border border-white/10 relative overflow-hidden text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
          <div className="space-y-2 sm:space-y-3 max-w-xl">
            <span className="text-xs font-mono uppercase tracking-wider text-mw-orange font-bold">
              BE OUR NEXT CLIENT SUCCESS STORY
            </span>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-white">
              Ready to Accelerate Your Enterprise Commercial Growth?
            </h3>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              Partner with Mindware Consulting to build custom web platforms, search engine dominance, and high-converting customer acquisition systems.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-mw-orange hover:bg-mw-orange/90 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-mw-orange/20 text-center"
            >
              <span>Schedule Strategy Call</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/training/testimonials"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-xs uppercase tracking-wider border border-white/10 transition-colors text-center"
            >
              <span>View Graduate Reviews</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Video Modal Player */}
      {selectedVideo && (
        <YouTubeModal
          testimonial={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </div>
  );
}
