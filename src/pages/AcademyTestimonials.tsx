import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Video,
  Youtube,
  Play,
  Star,
  CheckCircle2,
  GraduationCap,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Award,
  Filter,
  Briefcase,
  TrendingUp,
  ShieldCheck,
  Building2,
  Search,
  MessageCircle,
  HelpCircle,
  ChevronDown
} from "lucide-react";
import {
  STUDENT_TESTIMONIALS,
  OFFICIAL_YOUTUBE_CHANNEL,
  StudentGraduateTestimonial
} from "../data/testimonialsData";
import { AcademySubNav } from "../components/academy/AcademySubNav";
import { YouTubeModal } from "../components/testimonials/YouTubeModal";
import { SEO } from "../components/SEO";
import { EASE, cn } from "../lib/utils";
import { FadeInSection } from "../components/FadeInSection";

const ACADEMY_FAQS = [
  {
    question: "Are these video reviews from verified graduates?",
    answer: "Yes, 100%. Every graduate featured in our video testimonials has successfully completed their coursework, submitted required capstone projects, and sat for either official PMI® credentials (such as PMP®) or accredited industrial HSE examinations. Their names, current roles, and verified certifications are authentic."
  },
  {
    question: "How does Mindware achieve a 94% first-attempt certification pass rate?",
    answer: "Our curriculum is structured around high-frequency exam domains, full-length timed mock simulations, and real-world case studies rather than rote memorization. Students also receive 1-on-1 mentorship audits before booking their official exam dates."
  },
  {
    question: "Can I take these courses remotely from outside Nigeria or the UK?",
    answer: "Absolutely. Our live virtual cohorts run with weekend and evening schedules tailored for working professionals across Africa, the UK, Europe, and the Middle East. All lectures are recorded and accompanied by cloud development environments and mock portals."
  },
  {
    question: "Does Mindware Academy offer career placement or CV auditing?",
    answer: "Yes. Every cohort includes dedicated career preparation modules covering LinkedIn portfolio optimization, executive CV structuring, technical interview drills, and introductions to our corporate recruitment partner network."
  }
];

export function AcademyTestimonials() {
  // Filter within academy tracks
  const [trackFilter, setTrackFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Selected video for the modal player
  const [selectedVideo, setSelectedVideo] = useState<StudentGraduateTestimonial | null>(null);

  // Calculate track counts
  const trackCounts = useMemo(() => {
    return {
      all: STUDENT_TESTIMONIALS.length,
      digital: STUDENT_TESTIMONIALS.filter(t => t.academyTrack === "Digital Skills Academy").length,
      professional: STUDENT_TESTIMONIALS.filter(t => t.academyTrack === "Professional & HSE Academy").length
    };
  }, []);

  // Filtered list
  const filteredTestimonials = useMemo(() => {
    return STUDENT_TESTIMONIALS.filter((t) => {
      const matchesTrack = trackFilter === "All" || t.academyTrack === trackFilter;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch = !query || 
        t.name.toLowerCase().includes(query) ||
        t.role.toLowerCase().includes(query) ||
        t.courseEnrolled.toLowerCase().includes(query) ||
        t.certificationEarned.toLowerCase().includes(query) ||
        t.careerImpact.toLowerCase().includes(query) ||
        t.currentEmployer.toLowerCase().includes(query);
      return matchesTrack && matchesSearch;
    });
  }, [trackFilter, searchQuery]);

  // Featured student spotlight
  const featuredStudent = STUDENT_TESTIMONIALS.find((t) => t.featured) || STUDENT_TESTIMONIALS[0];

  return (
    <div className="bg-[#02040a] min-h-screen text-white pt-28 sm:pt-36 md:pt-44 pb-16 sm:pb-24">
      <SEO
        title="Training Academy Graduate Video Reviews | Mindware Academy"
        description="Watch verified video testimonials from Mindware Academy graduates. Real career transitions into high-paying Web Development, Technical SEO, PMP® Project Management, and accredited HSE Levels 1, 2, and 3."
      />

      {/* Hero Header */}
      <section className="relative overflow-hidden py-8 sm:py-12 md:py-16 border-b border-white/5">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-emerald-600/10 via-mw-orange/5 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-white/50 mb-4 sm:mb-6 flex-wrap">
            <Link to="/" className="hover:text-white transition-colors py-1">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-60" />
            <Link to="/training" className="hover:text-white transition-colors py-1">Academy</Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-60" />
            <span className="text-white font-semibold py-1">3. Graduate Video Reviews</span>
          </nav>

          <div className="max-w-4xl space-y-3.5 sm:space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-600/10 border border-emerald-500/20 text-emerald-400 text-[11px] sm:text-xs font-semibold uppercase tracking-wider">
              <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
              <span>Academy Sub-Page 3 • Verified Graduate Video Reviews</span>
            </div>

            <h1 className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-display font-bold text-white tracking-tight leading-[1.15] break-words">
              Real Students. Real Career Growth. <br className="hidden xs:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">
                Verified on Video.
              </span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-white/70 max-w-2xl leading-relaxed">
              Watch certified alumni from Mindware Academy share how our project-driven bootcamps in Full-Stack Web Development, Technical SEO, PMP® Project Governance, and accredited HSE Levels 1–3 accelerated their careers, earnings, and global employment.
            </p>

            {/* Quick action bar */}
            <div className="pt-2 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-4">
              <a
                href={OFFICIAL_YOUTUBE_CHANNEL.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-red-600/15 hover:bg-red-600/25 border border-red-500/25 text-red-400 text-xs font-mono font-bold transition-colors min-h-[44px]"
              >
                <Youtube className="w-4 h-4 fill-current text-red-500 shrink-0" />
                <span>Official YouTube Channel ({OFFICIAL_YOUTUBE_CHANNEL.subscribersCount} Subscribers)</span>
                <ExternalLink className="w-3.5 h-3.5 ml-0.5 opacity-70 shrink-0" />
              </a>

              <Link
                to="/about/testimonials"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white text-xs font-medium transition-colors min-h-[44px]"
              >
                <Building2 className="w-3.5 h-3.5 text-mw-orange shrink-0" />
                <span className="text-center">Looking for Corporate Client Reviews? View Digital Agency Testimonials</span>
                <ArrowRight className="w-3.5 h-3.5 text-mw-orange shrink-0" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Academy Sub Navigation Bar */}
      <AcademySubNav activeTab="testimonials" />

      {/* Main Content Area */}
      <main className="container mx-auto px-4 sm:px-6 md:px-12 py-8 sm:py-12 md:py-16 space-y-10 sm:space-y-16">
        {/* Track Filter Pills & Search */}
        <div className="flex flex-col gap-4 pb-4 border-b border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-[11px] sm:text-xs uppercase tracking-wider text-emerald-400 font-bold mb-1">
                Graduate Video Showcase
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Showing {filteredTestimonials.length} Verified Student Success {filteredTestimonials.length === 1 ? "Story" : "Stories"}
              </h2>
            </div>

            {/* Quick Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search alumni, skill, role..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-full pl-9 pr-4 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-emerald-400 transition-colors min-h-[44px]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-xs px-1"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Filter Pills with Counts */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar">
            <button
              onClick={() => setTrackFilter("All")}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all shrink-0 min-h-[44px] flex items-center gap-1.5",
                trackFilter === "All"
                  ? "bg-white text-mw-dark shadow-md"
                  : "bg-white/5 text-white/70 hover:text-white border border-white/10"
              )}
            >
              <span>All Academy Tracks</span>
              <span className={cn(
                "px-1.5 py-0.2 rounded-full text-[10px] font-mono",
                trackFilter === "All" ? "bg-mw-dark/10 text-mw-dark font-bold" : "bg-white/10 text-white/60"
              )}>
                {trackCounts.all}
              </span>
            </button>

            <button
              onClick={() => setTrackFilter("Digital Skills Academy")}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all shrink-0 min-h-[44px] flex items-center gap-1.5",
                trackFilter === "Digital Skills Academy"
                  ? "bg-mw-orange text-white shadow-md shadow-mw-orange/20"
                  : "bg-white/5 text-white/70 hover:text-white border border-white/10"
              )}
            >
              <span>Digital Skills Track</span>
              <span className={cn(
                "px-1.5 py-0.2 rounded-full text-[10px] font-mono",
                trackFilter === "Digital Skills Academy" ? "bg-black/20 text-white font-bold" : "bg-white/10 text-white/60"
              )}>
                {trackCounts.digital}
              </span>
            </button>

            <button
              onClick={() => setTrackFilter("Professional & HSE Academy")}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all shrink-0 min-h-[44px] flex items-center gap-1.5",
                trackFilter === "Professional & HSE Academy"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                  : "bg-white/5 text-white/70 hover:text-white border border-white/10"
              )}
            >
              <span>Professional & HSE Track</span>
              <span className={cn(
                "px-1.5 py-0.2 rounded-full text-[10px] font-mono",
                trackFilter === "Professional & HSE Academy" ? "bg-black/20 text-white font-bold" : "bg-white/10 text-white/60"
              )}>
                {trackCounts.professional}
              </span>
            </button>
          </div>
        </div>

        {/* Featured Video Spotlight */}
        <section aria-labelledby="featured-student-title">
          <div className="rounded-2xl sm:rounded-3xl border border-white/15 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-4 sm:p-6 md:p-8 lg:p-10 overflow-hidden relative shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              {/* Video Preview Box (Clickable to open YouTube Player) */}
              <div className="lg:col-span-7">
                <div
                  onClick={() => setSelectedVideo(featuredStudent)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setSelectedVideo(featuredStudent);
                    }
                  }}
                  aria-label={`Play video testimonial from ${featuredStudent.name}`}
                  className="relative aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-black/80 border border-white/10 group cursor-pointer shadow-2xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
                >
                  <img
                    src={featuredStudent.thumbnail}
                    alt={`${featuredStudent.name} Video Testimonial`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                  {/* Red YouTube Play Button Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-red-600 group-hover:bg-red-500 text-white flex items-center justify-center shadow-2xl shadow-red-600/50 group-hover:scale-110 transition-all duration-300">
                      <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-current ml-1" />
                    </div>
                  </div>

                  {/* Duration & YouTube tags */}
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-2">
                    <span className="px-2 sm:px-2.5 py-1 rounded-md bg-red-600 text-white text-[10px] sm:text-xs font-bold flex items-center gap-1.5 shadow-md">
                      <Youtube className="w-3.5 h-3.5 fill-current" />
                      <span>YouTube Video</span>
                    </span>
                    <span className="px-2 sm:px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md text-white/90 text-[10px] sm:text-xs font-mono font-bold">
                      {featuredStudent.videoDuration}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
                    <div className="text-[10px] sm:text-xs text-white/70 uppercase tracking-wider font-semibold">Featured Student Spotlight</div>
                    <div className="text-sm sm:text-lg font-bold text-white truncate">{featuredStudent.name}</div>
                  </div>
                </div>
              </div>

              {/* Info & Quote Column */}
              <div className="lg:col-span-5 space-y-3.5 sm:space-y-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                  ))}
                  <span className="text-xs text-white/60 ml-2 font-mono">5.0 Star Graduate Review</span>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                  <Award className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{featuredStudent.certificationEarned}</span>
                </div>

                <h3 id="featured-student-title" className="text-lg sm:text-xl md:text-2xl font-bold text-white leading-snug">
                  "{featuredStudent.quote}"
                </h3>

                <div className="p-3.5 sm:p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
                  <div className="text-[11px] sm:text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    Career Acceleration:
                  </div>
                  <div className="text-xs sm:text-sm text-white/90 font-medium leading-relaxed">
                    {featuredStudent.careerImpact}
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-1 sm:pt-2">
                  <img
                    src={featuredStudent.avatar}
                    alt={featuredStudent.name}
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover border border-white/20 shrink-0"
                    loading="lazy"
                  />
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-white truncate">{featuredStudent.name}</div>
                    <div className="text-xs text-white/60 truncate">{featuredStudent.role}</div>
                    <div className="text-xs text-emerald-400 font-semibold truncate">{featuredStudent.currentEmployer}</div>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3">
                  <button
                    onClick={() => setSelectedVideo(featuredStudent)}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-red-600/20 min-h-[44px]"
                  >
                    <Play className="w-3.5 h-3.5 fill-current shrink-0" />
                    <span>Play Graduate Video Review</span>
                  </button>

                  <a
                    href={featuredStudent.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white font-semibold text-xs border border-white/10 transition-colors min-h-[44px]"
                  >
                    <span>Watch on YouTube</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-60 shrink-0" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Video Cards Grid */}
        <section aria-label="All Graduate Video Testimonials" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <Youtube className="w-5 h-5 text-red-500 shrink-0" />
              <span>All Graduate Video Testimonials</span>
            </h3>
            <span className="text-xs text-white/50 font-mono">Tap any video to play instantly</span>
          </div>

          {filteredTestimonials.length === 0 ? (
            <div className="text-center py-16 px-4 rounded-3xl border border-white/10 bg-white/[0.02]">
              <Video className="w-12 h-12 text-white/30 mx-auto mb-3" />
              <h4 className="text-lg font-bold text-white mb-1">No video testimonials match your filter</h4>
              <p className="text-sm text-white/60 mb-4">Try clearing your search query or selecting "All Academy Tracks".</p>
              <button
                onClick={() => {
                  setTrackFilter("All");
                  setSearchQuery("");
                }}
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
              {filteredTestimonials.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.02] hover:border-emerald-500/40 hover:bg-white/[0.04] transition-all flex flex-col justify-between overflow-hidden group shadow-lg"
                >
                  {/* Video Thumbnail Preview Header */}
                  <div>
                    <div
                      onClick={() => setSelectedVideo(item)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          setSelectedVideo(item);
                        }
                      }}
                      aria-label={`Watch testimonial by ${item.name}`}
                      className="relative aspect-video overflow-hidden bg-black/60 cursor-pointer group/thumb focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    >
                      <img
                        src={item.thumbnail}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-500 opacity-80 group-hover/thumb:opacity-100"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/35 group-hover/thumb:bg-black/15 transition-colors" />

                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-red-600/95 group-hover/thumb:bg-red-600 text-white flex items-center justify-center shadow-lg group-hover/thumb:scale-110 transition-all">
                          <Play className="w-5 h-5 fill-current ml-0.5" />
                        </div>
                      </div>

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded bg-red-600 text-white text-[10px] font-bold flex items-center gap-1">
                          <Youtube className="w-3 h-3 fill-current" />
                          <span>YouTube</span>
                        </span>
                        <span className="px-2 py-0.5 rounded bg-black/75 backdrop-blur-md text-white text-[10px] font-mono">
                          {item.videoDuration}
                        </span>
                      </div>

                      <div className="absolute bottom-2.5 left-3 right-3 text-[11px] text-white/80 font-mono truncate">
                        {item.academyTrack}
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="p-5 sm:p-6 space-y-3">
                      <div className="flex items-center justify-between text-xs gap-2">
                        <span className="text-emerald-400 font-semibold uppercase tracking-wider truncate">
                          {item.courseEnrolled}
                        </span>
                        <div className="flex items-center gap-0.5 text-amber-400 shrink-0">
                          {[...Array(item.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                      </div>

                      <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                        {item.name}
                      </h4>

                      <p className="text-xs sm:text-sm text-white/70 line-clamp-3 leading-relaxed">
                        "{item.quote}"
                      </p>

                      <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300">
                        <span className="font-semibold text-emerald-400">Impact: </span>
                        {item.careerImpact}
                      </div>

                      <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
                        <span className="text-white/50">{item.metricLabel}</span>
                        <span className="text-emerald-400 font-bold font-mono">{item.metricValue}</span>
                      </div>
                    </div>
                  </div>

                  {/* Footer Details */}
                  <div className="p-5 sm:p-6 pt-0 border-t border-white/5 flex items-center justify-between gap-3 mt-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border border-white/20 shrink-0"
                        loading="lazy"
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-white truncate flex items-center gap-1">
                          <span className="truncate">{item.name}</span>
                          <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                        </div>
                        <div className="text-[11px] text-white/50 truncate">{item.currentEmployer}</div>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedVideo(item)}
                      className="px-3.5 py-2 rounded-full bg-red-600/15 hover:bg-red-600/25 text-red-400 hover:text-red-300 text-xs font-bold border border-red-500/25 flex items-center gap-1.5 shrink-0 transition-colors min-h-[40px]"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Watch</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Academy Outcomes Metrics Bar */}
        <FadeInSection className="rounded-2xl sm:rounded-3xl border border-white/10 bg-gradient-to-r from-emerald-950/20 via-white/[0.02] to-blue-950/20 p-6 sm:p-8 md:p-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-emerald-400">94%</div>
              <div className="text-xs sm:text-sm text-white/70">1st-Sitting Certification Pass Rate</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white">3.2x</div>
              <div className="text-xs sm:text-sm text-white/70">Average Career ROI & Salary Lift</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-mw-orange">100%</div>
              <div className="text-xs sm:text-sm text-white/70">Practical Live Capstone Projects</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-blue-400">Global</div>
              <div className="text-xs sm:text-sm text-white/70">PMI® & HSE Recognized Curriculum</div>
            </div>
          </div>
        </FadeInSection>

        {/* Student Verification & Admissions FAQ Section */}
        <section aria-labelledby="faq-heading" className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              <HelpCircle className="w-4 h-4 text-emerald-400" />
              <span>Transparency & Verification</span>
            </div>
            <h3 id="faq-heading" className="text-2xl sm:text-3xl font-display font-bold text-white">
              Frequently Asked Graduate Questions
            </h3>
            <p className="text-xs sm:text-sm text-white/60">
              Everything you need to know about alumni verification, curriculum rigour, and cohort scheduling.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {ACADEMY_FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] hover:border-white/20 transition-all overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 min-h-[48px] focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm sm:text-base font-semibold text-white">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 sm:w-5 sm:h-5 text-white/50 shrink-0 transition-transform duration-300",
                        isOpen && "rotate-180 text-emerald-400"
                      )}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-white/70 leading-relaxed border-t border-white/5">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA to Explore Academy Programs */}
        <FadeInSection className="rounded-2xl sm:rounded-3xl border border-white/10 bg-gradient-to-r from-emerald-600/10 via-mw-orange/10 to-transparent p-6 sm:p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
              Ready to write your own career success story?
            </h3>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              Join the next cohort of certified software engineers, technical SEOs, project managers, and occupational safety specialists at Mindware Academy.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full md:w-auto">
            <Link
              to="/training/digital-skills"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-mw-orange hover:bg-mw-orange-hover text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-mw-orange/20 min-h-[48px]"
            >
              <span>Digital Skills Track</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/training/professional-development"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-blue-600/20 min-h-[48px]"
            >
              <span>Professional & HSE Track</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="https://wa.me/2348035439408?text=Hello%20Mindware%20Academy%2C%20I%20would%20like%20to%20speak%20with%20an%20admissions%20counselor%20about%20upcoming%20cohorts"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 font-bold text-xs uppercase tracking-wider transition-all min-h-[48px]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Admissions WhatsApp</span>
            </a>
          </div>
        </FadeInSection>
      </main>

      {/* Responsive YouTube Video Player Modal */}
      {selectedVideo && (
        <YouTubeModal
          testimonial={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </div>
  );
}

