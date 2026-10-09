import React, { useEffect } from "react";
import { X, ExternalLink, Youtube, Star, CheckCircle2, Volume2, ShieldCheck } from "lucide-react";
import { AgencyClientTestimonial, StudentGraduateTestimonial } from "../../data/testimonialsData";

interface YouTubeModalProps {
  testimonial: AgencyClientTestimonial | StudentGraduateTestimonial | null;
  onClose: () => void;
}

export function YouTubeModal({ testimonial, onClose }: YouTubeModalProps) {
  useEffect(() => {
    if (!testimonial) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [testimonial, onClose]);

  if (!testimonial) return null;

  const isAgency = "company" in testimonial;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/85 backdrop-blur-xl animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#090d16] border border-white/15 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-black/90 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-3 sm:px-6 py-2.5 sm:py-4 border-b border-white/10 bg-white/[0.02] gap-3">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="w-8 h-8 rounded-lg bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-500 shrink-0">
              <Youtube className="w-4 h-4 fill-current" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-red-400 flex items-center gap-1.5 truncate">
                <span>YouTube Testimonial</span>
                <span className="text-white/30">•</span>
                <span className="text-white/60">{testimonial.videoDuration}</span>
              </div>
              <h2 id="video-modal-title" className="text-xs sm:text-sm md:text-base font-bold text-white truncate">
                {testimonial.name} — {isAgency ? (testimonial as AgencyClientTestimonial).company : (testimonial as StudentGraduateTestimonial).courseEnrolled}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={testimonial.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-xs font-semibold border border-white/10 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Watch on YouTube</span>
            </a>
            <button
              onClick={onClose}
              aria-label="Close video player"
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Player Container (16:9 Aspect Ratio) */}
        <div className="relative w-full aspect-video bg-black flex items-center justify-center">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${testimonial.youtubeVideoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
            title={`${testimonial.name} Video Testimonial`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>

        {/* Video Meta & Testimonial Details */}
        <div className="p-4 sm:p-6 md:p-8 bg-[#090d16] overflow-y-auto space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-3 sm:pb-4 border-b border-white/10">
            <div className="flex items-center gap-4">
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full object-cover border border-white/20"
              />
              <div>
                <div className="text-base font-bold text-white flex items-center gap-2">
                  <span>{testimonial.name}</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-xs text-white/60">
                  {testimonial.role} • <strong className="text-white/80">{testimonial.organizationOrTrack}</strong>
                </div>
              </div>
            </div>

            {/* Stars & Metric badge */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <div className="px-3 py-1 rounded-lg bg-mw-orange/15 border border-mw-orange/30 text-mw-orange text-xs font-mono font-bold">
                {testimonial.metricLabel}: {testimonial.metricValue}
              </div>
            </div>
          </div>

          {/* Quote & Highlight */}
          <div className="space-y-2">
            <p className="text-sm md:text-base text-white/80 italic leading-relaxed">
              "{testimonial.quote}"
            </p>
            <div className="text-xs text-emerald-400 font-semibold flex items-center gap-2 pt-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Verified Impact: {testimonial.highlightOutcome}</span>
            </div>
          </div>

          {/* YouTube Integration Note / Link */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-white/40">
            <span>Video ID: <code className="text-white/60 font-mono">{testimonial.youtubeVideoId}</code></span>
            <a
              href="https://www.youtube.com/mindwareconsultingltd"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-400 hover:text-red-300 font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Youtube className="w-3.5 h-3.5 fill-current" />
              <span>Subscribe to @mindwareconsultingltd on YouTube</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
