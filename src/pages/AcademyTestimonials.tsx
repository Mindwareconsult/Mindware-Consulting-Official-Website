import React, { useState } from "react";
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
  Building2
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

export function AcademyTestimonials() {
  // Filter within academy tracks
  const [trackFilter, setTrackFilter] = useState<string>("All");

  // Selected video for the modal player
  const [selectedVideo, setSelectedVideo] = useState<StudentGraduateTestimonial | null>(null);

  // Filtered list
  const filteredTestimonials = STUDENT_TESTIMONIALS.filter((t) => {
    if (trackFilter === "All") return true;
    return t.academyTrack === trackFilter;
  });

  // Featured student spotlight
  const featuredStudent = STUDENT_TESTIMONIALS.find((t) => t.featured) || STUDENT_TESTIMONIALS[0];

  return (
    <div className="bg-[#02040a] min-h-screen text-white pt-28 pb-24">
      <SEO
        title="Training Academy Graduate Video Reviews | Mindware Academy"
        description="Watch verified video testimonials from Mindware Academy graduates. Real career transitions into high-paying Web Development, Technical SEO, PMP® Project Management, and accredited HSE Levels 1, 2, and 3."
      />

      {/* Hero Header */}
      <section className="relative overflow-hidden py-12 md:py-16 border-b border-white/5">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-emerald-600/10 via-mw-orange/5 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs md:text-sm text-white/50 mb-6 flex-wrap">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/training" className="hover:text-white transition-colors">Academy</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-semibold">3. Graduate Video Reviews</span>
          </div>

          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-600/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
              <GraduationCap className="w-4 h-4 text-emerald-400" />
              <span>Academy Sub-Page 3 • Verified Graduate Video Reviews</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-white tracking-tight leading-[1.1]">
              Real Students. Real Career Growth. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">
                Verified on Video.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-white/70 max-w-2xl leading-relaxed">
              Watch certified alumni from Mindware Academy share how our project-driven bootcamps in Full-Stack Web Development, Technical SEO, PMP® Project Governance, and accredited HSE Levels 1–3 accelerated their careers, earnings, and global employment.
            </p>

            {/* Quick action bar */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href={OFFICIAL_YOUTUBE_CHANNEL.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600/10 hover:bg-red-600/20 border border-red-500/20 text-red-400 text-xs font-mono font-bold transition-colors"
              >
                <Youtube className="w-4 h-4 fill-current text-red-500" />
                <span>Official YouTube Channel ({OFFICIAL_YOUTUBE_CHANNEL.subscribersCount} Subscribers)</span>
                <ExternalLink className="w-3 h-3 ml-0.5 opacity-60" />
              </a>

              <Link
                to="/about/testimonials"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white text-xs font-medium transition-colors"
              >
                <Building2 className="w-3.5 h-3.5 text-mw-orange" />
                <span>Looking for Corporate Client Reviews? View Digital Agency Testimonials</span>
                <ArrowRight className="w-3 h-3 text-mw-orange" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Academy Sub Navigation Bar */}
      <AcademySubNav activeTab="testimonials" />

      {/* Main Content Area */}
      <main className="container mx-auto px-6 md:px-12 py-12 md:py-16 space-y-16">
        {/* Track Filter Pills & Count */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <div className="text-xs uppercase tracking-wider text-emerald-400 font-bold mb-1">
              Graduate Video Showcase
            </div>
            <h3 className="text-xl font-bold text-white">
              Showing {filteredTestimonials.length} Verified Student Success Stories
            </h3>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            {["All", "Digital Skills Academy", "Professional & HSE Academy"].map((track) => (
              <button
                key={track}
                onClick={() => setTrackFilter(track)}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all",
                  trackFilter === track
                    ? "bg-white text-mw-dark shadow-md"
                    : "bg-white/5 text-white/60 hover:text-white border border-white/10"
                )}
              >
                {track === "All" ? "All Academy Tracks" : track}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Video Spotlight */}
        <div className="rounded-3xl border border-white/15 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-6 md:p-8 overflow-hidden relative shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Video Preview Box (Clickable to open YouTube Player) */}
            <div className="lg:col-span-7">
              <div
                onClick={() => setSelectedVideo(featuredStudent)}
                className="relative aspect-video rounded-2xl overflow-hidden bg-black/80 border border-white/10 group cursor-pointer shadow-2xl"
              >
                <img
                  src={featuredStudent.thumbnail}
                  alt={`${featuredStudent.name} Video Testimonial`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Red YouTube Play Button Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-600 group-hover:bg-red-500 text-white flex items-center justify-center shadow-2xl shadow-red-600/50 group-hover:scale-110 transition-all duration-300">
                    <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1" />
                  </div>
                </div>

                {/* Duration & YouTube tags */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-red-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-md">
                    <Youtube className="w-3.5 h-3.5 fill-current" />
                    <span>YouTube Video</span>
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-white/90 text-xs font-mono font-bold">
                    {featuredStudent.videoDuration}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-xs text-white/60 uppercase tracking-wider font-semibold">Featured Student Spotlight</div>
                  <div className="text-base sm:text-lg font-bold text-white truncate">{featuredStudent.name}</div>
                </div>
              </div>
            </div>

            {/* Info & Quote Column */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
                <span className="text-xs text-white/60 ml-2 font-mono">5.0 Star Graduate Review</span>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                <Award className="w-3.5 h-3.5" />
                <span>{featuredStudent.certificationEarned}</span>
              </div>

              <h4 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                "{featuredStudent.quote}"
              </h4>

              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Career Acceleration:
                </div>
                <div className="text-xs sm:text-sm text-white/90 font-medium">
                  {featuredStudent.careerImpact}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <img
                  src={featuredStudent.avatar}
                  alt={featuredStudent.name}
                  className="w-12 h-12 rounded-full object-cover border border-white/20"
                />
                <div>
                  <div className="text-sm font-bold text-white">{featuredStudent.name}</div>
                  <div className="text-xs text-white/60">{featuredStudent.role}</div>
                  <div className="text-xs text-emerald-400 font-semibold">{featuredStudent.currentEmployer}</div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setSelectedVideo(featuredStudent)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-red-600/20"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Play Graduate Video Review</span>
                </button>

                <a
                  href={featuredStudent.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white font-semibold text-xs border border-white/10 transition-colors"
                >
                  <span>Watch on YouTube</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Video Cards Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Youtube className="w-5 h-5 text-red-500" />
              <span>All Graduate Video Testimonials</span>
            </h3>
            <span className="text-xs text-white/50 font-mono">Click any video to play instantly</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredTestimonials.map((item) => (
              <div
                key={item.id}
                className="rounded-3xl border border-white/10 bg-white/[0.02] hover:border-emerald-500/40 hover:bg-white/[0.04] transition-all flex flex-col justify-between overflow-hidden group shadow-lg"
              >
                {/* Video Thumbnail Preview Header */}
                <div>
                  <div
                    onClick={() => setSelectedVideo(item)}
                    className="relative aspect-video overflow-hidden bg-black/60 cursor-pointer group/thumb"
                  >
                    <img
                      src={item.thumbnail}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-500 opacity-80 group-hover/thumb:opacity-100"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover/thumb:bg-black/10 transition-colors" />

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-red-600/90 group-hover/thumb:bg-red-600 text-white flex items-center justify-center shadow-lg group-hover/thumb:scale-110 transition-all">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
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

                  {/* Content Details */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-emerald-400 font-semibold uppercase tracking-wider truncate max-w-[200px]">
                        {item.courseEnrolled}
                      </span>
                      <div className="flex items-center gap-0.5 text-amber-400 shrink-0">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                    </div>

                    <h4 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
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
                <div className="p-6 pt-0 border-t border-white/5 flex items-center justify-between gap-4 mt-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-9 h-9 rounded-full object-cover border border-white/20 shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white truncate flex items-center gap-1">
                        <span>{item.name}</span>
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                      </div>
                      <div className="text-[11px] text-white/50 truncate">{item.currentEmployer}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedVideo(item)}
                    className="px-3 py-1.5 rounded-full bg-red-600/10 hover:bg-red-600/20 text-red-400 hover:text-red-300 text-xs font-bold border border-red-500/20 flex items-center gap-1.5 shrink-0 transition-colors"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Watch</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Academy Outcomes Metrics Bar */}
        <FadeInSection className="rounded-3xl border border-white/10 bg-gradient-to-r from-emerald-950/20 via-white/[0.02] to-blue-950/20 p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-display font-bold text-emerald-400 mb-1">94%</div>
              <div className="text-xs sm:text-sm text-white/70">1st-Sitting Certification Pass Rate</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-display font-bold text-white mb-1">3.2x</div>
              <div className="text-xs sm:text-sm text-white/70">Average Career ROI & Salary Lift</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-display font-bold text-mw-orange mb-1">100%</div>
              <div className="text-xs sm:text-sm text-white/70">Practical Live Capstone Projects</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-display font-bold text-blue-400 mb-1">Global</div>
              <div className="text-xs sm:text-sm text-white/70">PMI® & HSE Recognized Curriculum</div>
            </div>
          </div>
        </FadeInSection>

        {/* CTA to Explore Academy Programs */}
        <FadeInSection className="rounded-3xl border border-white/10 bg-gradient-to-r from-emerald-600/10 via-mw-orange/10 to-transparent p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Ready to write your own career success story?
            </h3>
            <p className="text-sm text-white/70">
              Join the next cohort of certified engineers, technical SEOs, project delivery managers, and occupational safety specialists at Mindware Academy.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full sm:w-auto">
            <Link
              to="/training/digital-skills"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-mw-orange hover:bg-mw-orange-hover text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-mw-orange/20"
            >
              <span>Digital Skills Track</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/training/professional-development"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-blue-600/20"
            >
              <span>Professional & HSE Track</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
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
