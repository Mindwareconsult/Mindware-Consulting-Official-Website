import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  Play,
  Youtube,
  Star,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  Building2
} from "lucide-react";
import { AGENCY_TESTIMONIALS, AgencyClientTestimonial } from "../../data/testimonialsData";
import { YouTubeModal } from "../testimonials/YouTubeModal";
import { FadeInSection } from "../FadeInSection";
import { cn, EASE } from "../../lib/utils";

export function HomeVideoTestimonials() {
  const [selectedVideo, setSelectedVideo] = useState<AgencyClientTestimonial | null>(null);

  // Take the first 3 video testimonials with attached links
  const previewVideos = AGENCY_TESTIMONIALS.slice(0, 3);

  return (
    <FadeInSection className="py-24 md:py-32 bg-mw-dark relative overflow-hidden border-t border-white/5">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-red-600/[0.04] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[300px] bg-mw-orange/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/10 border border-red-500/20 text-red-400 text-xs font-mono font-bold tracking-wide uppercase mb-4">
              <Youtube className="w-3.5 h-3.5 fill-current" />
              <span>Official YouTube Video Reviews</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-5 leading-tight">
              Real CEOs. Real Commercial Growth.
            </h2>
            <p className="text-base sm:text-lg text-white/60 leading-relaxed font-light">
              Watch verified video testimonials from managing directors and corporate founders sharing how Mindware Consulting engineered their digital identity, client acquisition pipelines, and commercial ROI.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
            className="shrink-0 w-full sm:w-auto"
          >
            <Link
              to="/about/testimonials?compartment=clients"
              className="group inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-white text-xs sm:text-sm font-bold border border-white/10 hover:border-mw-orange/40 transition-all duration-300 shadow-lg hover:shadow-mw-orange/10 w-full sm:w-auto text-center"
            >
              <span>View All Video Testimonials</span>
              <ArrowRight className="w-4 h-4 text-mw-orange group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* 3-Column Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {previewVideos.map((video, idx) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE, delay: idx * 0.12 }}
              className="rounded-3xl border border-white/10 bg-white/[0.02] hover:border-mw-orange/40 hover:bg-white/[0.04] transition-all duration-300 flex flex-col justify-between overflow-hidden group shadow-xl hover:shadow-2xl hover:shadow-black/60"
            >
              <div>
                {/* Clickable Video Thumbnail Box */}
                <div
                  onClick={() => setSelectedVideo(video)}
                  className="relative aspect-video overflow-hidden bg-black/80 cursor-pointer group/thumb"
                >
                  <img
                    src={video.thumbnail}
                    alt={`${video.company} Video Testimonial`}
                    className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-700 opacity-85 group-hover/thumb:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover/thumb:opacity-60 transition-opacity" />

                  {/* Red YouTube Play Button Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-red-600/90 group-hover/thumb:bg-red-600 text-white flex items-center justify-center shadow-2xl shadow-red-600/60 group-hover/thumb:scale-110 transition-all duration-300">
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    </div>
                  </div>

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-0.5 rounded-md bg-red-600 text-white text-[10px] font-bold flex items-center gap-1 shadow-md">
                      <Youtube className="w-3 h-3 fill-current" />
                      <span>YouTube</span>
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md text-white/90 text-[10px] font-mono font-bold">
                      {video.videoDuration}
                    </span>
                  </div>

                  {/* Video ID in bottom left */}
                  <div className="absolute bottom-2.5 left-3 text-[11px] text-white/80 font-mono">
                    ID: {video.youtubeVideoId}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 md:p-7 space-y-4">
                  {/* Service & Rating */}
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="text-mw-orange font-semibold tracking-wider uppercase truncate">
                      {video.serviceProvided}
                    </span>
                    <div className="flex items-center gap-0.5 text-amber-400 shrink-0">
                      {[...Array(video.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>

                  {/* Company Title */}
                  <h3 className="text-xl font-bold text-white group-hover:text-mw-orange transition-colors">
                    {video.company}
                  </h3>

                  {/* Quote */}
                  <p className="text-sm text-white/70 leading-relaxed line-clamp-3">
                    "{video.quote}"
                  </p>

                  {/* Highlight Metric Badge */}
                  <div className="p-3 rounded-xl bg-mw-orange/10 border border-mw-orange/20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-mw-orange" />
                      <span className="text-xs text-white/80 font-medium">{video.metricLabel}</span>
                    </div>
                    <span className="text-sm font-bold font-mono text-emerald-400">{video.metricValue}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer: CEO Meta & Action */}
              <div className="px-6 pb-6 md:px-7 md:pb-7 pt-3 border-t border-white/5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={video.avatar}
                    alt={video.name}
                    className="w-10 h-10 rounded-full object-cover border border-white/20 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white truncate flex items-center gap-1.5">
                      <span>{video.name}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    </div>
                    <div className="text-[11px] text-white/50 truncate">{video.role}</div>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedVideo(video)}
                  className="px-3.5 py-1.5 rounded-full bg-red-600/10 hover:bg-red-600/20 text-red-400 hover:text-red-300 text-xs font-bold border border-red-500/20 flex items-center gap-1.5 shrink-0 transition-colors"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Play</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Banner with 'View More' Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
          className="mt-14 p-6 sm:p-8 rounded-3xl border border-white/10 bg-gradient-to-r from-white/[0.03] via-white/[0.01] to-white/[0.03] flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-mw-orange/10 border border-mw-orange/20 flex items-center justify-center text-mw-orange shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="text-base font-bold text-white">
                Looking for more client case studies and verified reviews?
              </div>
              <div className="text-xs sm:text-sm text-white/60">
                Explore our full archive of corporate client testimonials and training academy graduate stories.
              </div>
            </div>
          </div>

          <Link
            to="/about/testimonials"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-mw-orange hover:bg-mw-orange-hover text-mw-dark font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-mw-orange/20 hover:scale-105 active:scale-95 shrink-0"
          >
            <span>View More Video Testimonials</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>

      {/* Responsive YouTube Video Modal */}
      {selectedVideo && (
        <YouTubeModal
          testimonial={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </FadeInSection>
  );
}
