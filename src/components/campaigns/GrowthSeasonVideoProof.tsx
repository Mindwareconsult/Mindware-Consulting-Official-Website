import { useState } from "react";
import { motion } from "motion/react";
import { CheckCircle2, Play, Star, Youtube } from "lucide-react";
import {
  AGENCY_TESTIMONIALS,
  type AgencyClientTestimonial,
} from "../../data/testimonialsData";
import { YouTubeModal } from "../testimonials/YouTubeModal";
import { EASE } from "../../lib/utils";

export function GrowthSeasonVideoProof() {
  const [selectedVideo, setSelectedVideo] =
    useState<AgencyClientTestimonial | null>(null);

  // Use only verified corporate client video testimonials (no Training/Academy student videos)
  const featuredClientVideos = AGENCY_TESTIMONIALS.slice(0, 3);

  return (
    <section
      id="client-video-testimonials"
      aria-labelledby="gs2026-video-testimonials-heading"
      className="py-20 sm:py-28 bg-[#050C1C] border-t border-white/10"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        <div className="max-w-3xl mb-12 sm:mb-14">
          <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.2em] text-emerald-400 font-semibold mb-3">
            <Youtube className="w-4 h-4 shrink-0" />
            <span>Verified Client Video Reviews</span>
          </div>
          <h2
            id="gs2026-video-testimonials-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight text-white mb-4"
          >
            Real CEOs, Real Commercial Growth
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
            Hear directly from managing directors and business owners on working with Mindware Consulting to strengthen digital credibility and generate client enquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuredClientVideos.map((video, idx) => (
            <motion.article
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, ease: EASE, delay: idx * 0.08 }}
              className="rounded-2xl border border-white/10 bg-[#0A162F] hover:border-emerald-500/40 transition-colors flex flex-col justify-between overflow-hidden"
            >
              <div>
                {/* Click-to-play lazy thumbnail — iframe loads only inside modal on click */}
                <button
                  type="button"
                  onClick={() => setSelectedVideo(video)}
                  aria-label={`Play video testimonial from ${video.name}, ${video.company}`}
                  className="relative w-full aspect-video overflow-hidden bg-slate-950 group block text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                  <img
                    src={video.thumbnail}
                    alt={`${video.company} CEO video testimonial thumbnail`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040A18]/90 via-[#040A18]/20 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="w-14 h-14 rounded-full bg-emerald-600 group-hover:bg-emerald-500 text-white flex items-center justify-center shadow-xl transition-transform duration-300 group-hover:scale-110">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-white/85">
                    <span className="px-2 py-0.5 rounded bg-black/70">
                      YouTube · {video.videoDuration}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-950/90 border border-emerald-500/30 text-emerald-300">
                      Click to play
                    </span>
                  </div>
                </button>

                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="font-mono uppercase tracking-wider text-emerald-400 font-semibold truncate">
                      {video.serviceProvided}
                    </span>
                    <div
                      className="flex items-center gap-0.5 text-amber-400 shrink-0"
                      aria-label={`${video.rating} out of 5 stars`}
                    >
                      {[...Array(video.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>

                  <h3 className="text-xl font-display font-bold text-white">
                    {video.company}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed line-clamp-4">
                    "{video.quote}"
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={video.avatar}
                    alt={video.name}
                    loading="lazy"
                    decoding="async"
                    className="w-10 h-10 rounded-full object-cover border border-white/20 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white truncate flex items-center gap-1.5">
                      <span>{video.name}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    </div>
                    <div className="text-[11px] text-slate-400 truncate">
                      {video.role}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedVideo(video)}
                  className="min-h-[40px] px-3.5 py-2 rounded-lg bg-white/5 hover:bg-emerald-600 text-white text-xs font-semibold border border-white/15 hover:border-emerald-500 transition-colors inline-flex items-center gap-1.5 shrink-0"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Watch</span>
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {selectedVideo && (
        <YouTubeModal
          testimonial={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </section>
  );
}
