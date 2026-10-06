import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Camera,
  Calendar,
  MapPin,
  Users,
  Award,
  ChevronLeft,
  ChevronRight,
  X,
  ArrowRight,
  Sparkles,
  Briefcase,
  Video,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  ZoomIn
} from "lucide-react";
import {
  TRAINING_GALLERY_ITEMS,
  TRAINING_GALLERY_CATEGORIES,
  TrainingGalleryItem
} from "../data/trainingGalleryData";
import { AcademySubNav } from "../components/academy/AcademySubNav";
import { SEO } from "../components/SEO";
import { cn, EASE } from "../lib/utils";
import { FadeInSection } from "../components/FadeInSection";

export function TrainingGallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Filtered gallery items
  const filteredItems = TRAINING_GALLERY_ITEMS.filter((item) => {
    if (selectedCategory === "all") return true;
    return item.category === selectedCategory;
  });

  // Lightbox keyboard controls
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxIndex(null);
      } else if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % filteredItems.length : null));
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : null));
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [lightboxIndex, filteredItems.length]);

  const activeLightboxItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <div className="bg-[#02040a] min-h-screen text-white pt-28 pb-24">
      <SEO
        title="Training Gallery | Live Session Photos & Workshops | Mindware Academy"
        description="Browse authentic photographs from Mindware Academy live physical training sessions, coding labs, HSE safety inspection drills, executive PMP classes, and cohort graduation ceremonies."
      />

      {/* Hero Header */}
      <section className="relative overflow-hidden py-12 md:py-16 border-b border-white/5">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-purple-600/10 via-mw-orange/5 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs md:text-sm text-white/50 mb-6 flex-wrap">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/training" className="hover:text-white transition-colors">Academy</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-semibold">4. Training Gallery</span>
          </div>

          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-600/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider">
              <Camera className="w-4 h-4 text-purple-400" />
              <span>Academy Sub-Page 4 • Live Training Session Photo Archive</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-white tracking-tight leading-[1.1]">
              Inside Our Live Classrooms, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300">
                Coding Labs & Safety Drills.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-white/70 max-w-2xl leading-relaxed">
              Experience the energy, rigor, and camaraderie of Mindware Academy. Explore photographs from our live physical cohorts across Web Design, Python Data Analytics, PMP® Project Governance, and OSHA-standard HSE safety drills.
            </p>

            {/* Quick action links */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                to="/training/testimonials"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 text-xs font-semibold transition-colors"
              >
                <Video className="w-4 h-4" />
                <span>Watch Graduate Video Testimonials (Sub-Page 3)</span>
                <ArrowRight className="w-3 h-3" />
              </Link>

              <Link
                to="/training/digital-skills"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white text-xs font-medium transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-mw-orange" />
                <span>Explore Digital Skills Track</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Academy Sub Navigation Bar */}
      <AcademySubNav activeTab="gallery" />

      {/* Main Gallery Area */}
      <main className="container mx-auto px-6 md:px-12 py-12 md:py-16 space-y-12">
        {/* Category Filter Pills & Counts */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <div className="text-xs uppercase tracking-wider text-purple-400 font-bold mb-1">
              Live Session Archive
            </div>
            <h3 className="text-xl font-bold text-white">
              Showing {filteredItems.length} Live Cohort Photo Records
            </h3>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            {TRAINING_GALLERY_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all",
                  selectedCategory === cat.id
                    ? "bg-purple-600 text-white shadow-md shadow-purple-600/25"
                    : "bg-white/5 text-white/60 hover:text-white border border-white/10 hover:border-white/20"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08, ease: EASE }}
              className="rounded-3xl border border-white/10 bg-white/[0.02] hover:border-purple-500/40 hover:bg-white/[0.04] transition-all flex flex-col justify-between overflow-hidden group shadow-lg"
            >
              <div>
                {/* Photo Preview Container (Click to trigger Lightbox) */}
                <div
                  onClick={() => setLightboxIndex(index)}
                  className="relative aspect-video overflow-hidden bg-black/80 cursor-pointer group/photo"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover/photo:scale-105 transition-transform duration-700 opacity-90 group-hover/photo:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover/photo:opacity-60 transition-opacity" />

                  {/* Zoom In Badge Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/photo:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 rounded-full bg-purple-600/90 text-white flex items-center justify-center shadow-xl shadow-purple-600/50 scale-90 group-hover/photo:scale-100 transition-transform">
                      <ZoomIn className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-0.5 rounded-md bg-purple-600 text-white text-[10px] font-bold shadow-md">
                      {item.categoryLabel}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-white/90 text-[10px] font-mono">
                      {item.date}
                    </span>
                  </div>

                  {/* Location badge in bottom left */}
                  <div className="absolute bottom-2.5 left-3 right-3 text-[11px] text-white/80 font-medium flex items-center gap-1.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span className="truncate">{item.location}</span>
                  </div>
                </div>

                {/* Card Content Details */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs text-white/50">
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-purple-400" />
                      <span>{item.attendeesCount}</span>
                    </span>
                    <span className="font-mono text-purple-300">{item.leadInstructor}</span>
                  </div>

                  <h3
                    onClick={() => setLightboxIndex(index)}
                    className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors cursor-pointer leading-snug"
                  >
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-white/70 line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Highlight Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.highlightTags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 pb-6 pt-2 border-t border-white/5 flex items-center justify-between">
                <button
                  onClick={() => setLightboxIndex(index)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-400 group-hover:text-purple-300 transition-colors"
                >
                  <span>View Full Photo</span>
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>

                <span className="text-[11px] font-mono text-white/40">
                  Ref #{index + 1}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Live Training Stats Bar */}
        <FadeInSection className="rounded-3xl border border-white/10 bg-gradient-to-r from-purple-950/20 via-white/[0.02] to-mw-orange/10 p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-display font-bold text-purple-400 mb-1">500+</div>
              <div className="text-xs sm:text-sm text-white/70">Certified Alumni Trained</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-display font-bold text-white mb-1">18+</div>
              <div className="text-xs sm:text-sm text-white/70">Live Physical & Hybrid Cohorts</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-display font-bold text-emerald-400 mb-1">100%</div>
              <div className="text-xs sm:text-sm text-white/70">Practical Live Fieldwork & Labs</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-display font-bold text-mw-orange mb-1">94%</div>
              <div className="text-xs sm:text-sm text-white/70">1st-Attempt Certification Pass Rate</div>
            </div>
          </div>
        </FadeInSection>

        {/* Cross Promotion & CTA */}
        <FadeInSection className="rounded-3xl border border-white/10 bg-gradient-to-r from-purple-600/10 via-mw-orange/10 to-transparent p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="text-xs font-mono uppercase tracking-wider text-purple-400 font-bold">
              JOIN OUR NEXT LIVE COHORT
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Experience the Mindware Academy Advantage in Person.
            </h3>
            <p className="text-sm text-white/70 leading-relaxed">
              Enrol in our upcoming weekend or weekday cohorts in Lagos and Port Harcourt. Gain verified skills, build a live commercial portfolio, and network with industry leaders.
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

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeLightboxItem && lightboxIndex !== null && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/90 backdrop-blur-2xl animate-fade-in"
            onClick={() => setLightboxIndex(null)}
          >
            <div
              className="relative w-full max-w-5xl bg-[#090d16] border border-white/15 rounded-3xl overflow-hidden shadow-2xl shadow-black/95 flex flex-col max-h-[92vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Lightbox Top Header */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-white/10 bg-white/[0.02] gap-3">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="w-8 h-8 rounded-lg bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                    <Camera className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-purple-400 flex items-center gap-2 truncate">
                      <span>{activeLightboxItem.categoryLabel}</span>
                      <span className="text-white/30">•</span>
                      <span className="text-white/60">{activeLightboxItem.date}</span>
                    </div>
                    <h2 className="text-xs sm:text-sm md:text-base font-bold text-white truncate">
                      {activeLightboxItem.title}
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-mono text-white/50 px-2 py-1 rounded bg-white/5 hidden sm:inline-block">
                    {lightboxIndex + 1} / {filteredItems.length}
                  </span>
                  <button
                    onClick={() => setLightboxIndex(null)}
                    aria-label="Close photo preview"
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white flex items-center justify-center transition-colors"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>

              {/* Lightbox Image Stage with Previous/Next Arrows */}
              <div className="relative flex-1 bg-black flex items-center justify-center min-h-[260px] sm:min-h-[480px] max-h-[60vh] overflow-hidden group">
                <img
                  src={activeLightboxItem.image}
                  alt={activeLightboxItem.title}
                  referrerPolicy="no-referrer"
                  className="max-w-full max-h-[60vh] object-contain select-none"
                />

                {/* Left Arrow */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : null));
                  }}
                  aria-label="Previous photo"
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all active:scale-95"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                {/* Right Arrow */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % filteredItems.length : null));
                  }}
                  aria-label="Next photo"
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all active:scale-95"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>

              {/* Lightbox Description Bar */}
              <div className="p-4 sm:p-6 border-t border-white/10 bg-white/[0.02] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-purple-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {activeLightboxItem.location}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      {activeLightboxItem.attendeesCount}
                    </span>
                    <span>•</span>
                    <span className="text-white/60">{activeLightboxItem.leadInstructor}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                    {activeLightboxItem.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                  <Link
                    to="/training/digital-skills"
                    className="w-full sm:w-auto text-center px-4 py-2.5 rounded-full bg-mw-orange hover:bg-mw-orange-hover text-white text-xs font-bold transition-all shadow-md active:scale-95"
                  >
                    Enrol in Next Cohort
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
