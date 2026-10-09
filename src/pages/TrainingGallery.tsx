import React, { useState, useEffect, useMemo } from "react";
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
  ChevronDown,
  X,
  ArrowRight,
  Sparkles,
  Briefcase,
  Video,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  ZoomIn,
  Search,
  Grid,
  List,
  Phone,
  MessageSquare,
  HelpCircle,
  Building2,
  Wifi,
  Zap,
  Clock,
  Share2,
  Check
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

interface FacilityHub {
  id: string;
  name: string;
  city: string;
  address: string;
  focus: string;
  specs: string[];
  image: string;
}

const ACADEMY_FACILITIES: FacilityHub[] = [
  {
    id: "lagos-tech-hub",
    name: "Mindware Digital Innovation Hub",
    city: "Ikeja & Lekki, Lagos",
    address: "Allen Avenue, Ikeja & Admiralty Way, Lekki Phase 1, Lagos State",
    focus: "Full-Stack Web Dev, Python Analytics, UI/UX Design & SEO",
    specs: [
      "Dual-screen developer workstations",
      "High-speed fiber & redundant Starlink backup",
      "Uninterrupted 24/7 solar & soundproof generator",
      "Interactive smart screens & live streaming studio"
    ],
    image: "/src/assets/images/training_web_lab_1790960908174.jpg"
  },
  {
    id: "ph-safety-yard",
    name: "Industrial HSE Practical Drill Yard",
    city: "Trans-Amadi, Port Harcourt",
    address: "Trans-Amadi Industrial Layout, Port Harcourt, Rivers State",
    focus: "OSHA Hazard Assessment, First Aid, PPE & Environmental Compliance",
    specs: [
      "Dedicated outdoor simulated hazard testing zones",
      "Certified PPE inspection harnesses & gas detectors",
      "Live fire extinguisher drill stations",
      "Accredited by British Safety Council & ISPON standards"
    ],
    image: "/src/assets/images/training_hse_drill_1790960918179.jpg"
  },
  {
    id: "abuja-vi-executive-suite",
    name: "Executive Leadership & PMP® Suites",
    city: "Victoria Island & Abuja FCT",
    address: "Ahmadu Bello Way, VI, Lagos & Central Business District, Abuja",
    focus: "PMP® Exam Prep, Agile Governance, Capital Project Controls",
    specs: [
      "Executive boardroom seating with ergonomic chairs",
      "PMBOK 7th Edition case study digital whiteboards",
      "Executive coffee lounge & networking break-out zones",
      "Direct consultation with certified delivery directors"
    ],
    image: "/src/assets/images/training_pmp_session_1790960928930.jpg"
  }
];

interface GalleryFaq {
  question: string;
  answer: string;
}

const GALLERY_FAQS: GalleryFaq[] = [
  {
    question: "Can I schedule a physical walk-through of your training center before registering?",
    answer: "Yes, absolutely! We encourage prospective students, enterprise HR sponsors, and working professionals to inspect our labs in Lagos (Ikeja & Lekki) or Port Harcourt before enrolling. You can test our internet speed, review student workstations, and speak directly with our course advisors Monday through Saturday."
  },
  {
    question: "Are safety PPE gear and lab testing materials provided for HSE practicals?",
    answer: "Yes. All high-visibility vests, hard hats, safety goggles, gas detector meters, and first-aid kits used during OSHA-standard drills are fully provided by Mindware Academy during your practical cohort days. You also receive field safety documentation templates."
  },
  {
    question: "What equipment do students need to bring to the digital skills lab?",
    answer: "Our labs are equipped with developer workstations and high-speed fiber internet. However, we strongly recommend students bring their own laptop (Windows, macOS, or Linux) so all software environments, Node/Python toolchains, and repository keys remain configured on your personal machine for lifelong usage."
  },
  {
    question: "What happens if I miss a scheduled physical classroom session?",
    answer: "All physical classroom lectures are digitally recorded and uploaded to the Mindware Academy Student Portal within 4 hours. You can review the full replay, access code repositories, and schedule a 30-minute one-on-one catch-up session with your lead tutor during open office hours."
  },
  {
    question: "Do you offer weekend-only cohorts for working professionals?",
    answer: "Yes. Both our Digital Skills track and Professional PMP®/HSE tracks have dedicated Executive Weekend cohorts (Saturdays 10:00 AM – 4:00 PM and Sundays 1:00 PM – 5:00 PM) designed specifically for full-time employees."
  }
];

export function TrainingGallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "compact">("grid");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Filtered gallery items
  const filteredItems = useMemo(() => {
    return TRAINING_GALLERY_ITEMS.filter((item) => {
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q) ||
        item.leadInstructor.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q) ||
        item.highlightTags.some((tag) => tag.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: TRAINING_GALLERY_ITEMS.length
    };
    TRAINING_GALLERY_CATEGORIES.forEach((cat) => {
      if (cat.id !== "all") {
        counts[cat.id] = TRAINING_GALLERY_ITEMS.filter((item) => item.category === cat.id).length;
      }
    });
    return counts;
  }, []);

  // Lightbox keyboard navigation
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

  const handleSharePhoto = (item: TrainingGalleryItem) => {
    const shareUrl = `${window.location.origin}/training/gallery?photo=${item.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  return (
    <div className="bg-[#02040a] min-h-screen text-white">
      <SEO
        title="Training Gallery | Live Session Photos & Workshops | Mindware Academy"
        description="Browse authentic photographs from Mindware Academy live physical training sessions, coding labs, HSE safety inspection drills, executive PMP classes, and cohort graduation ceremonies."
      />

      {/* Hero Header */}
      <section className="relative overflow-hidden pt-28 sm:pt-36 md:pt-40 pb-12 sm:pb-16 border-b border-white/5">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-purple-600/10 via-mw-orange/5 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumbs" className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-white/50 mb-6 flex-wrap">
            <Link to="/" className="hover:text-white transition-colors py-1">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0 text-white/30" />
            <Link to="/training" className="hover:text-white transition-colors py-1">Academy</Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0 text-white/30" />
            <span className="text-white font-semibold py-1">4. Training Gallery</span>
          </nav>

          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-600/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider">
              <Camera className="w-4 h-4 text-purple-400 shrink-0" />
              <span>Academy Sub-Page 4 • Live Training Session Photo Archive</span>
            </div>

            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight leading-[1.15]">
              Inside Our Live Classrooms, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300">
                Coding Labs & Safety Drills.
              </span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-white/70 max-w-2xl leading-relaxed">
              Experience the energy, rigor, and camaraderie of Mindware Academy. Explore photographs from our live physical cohorts across Full-Stack Web Design, Python Data Analytics, PMP® Project Governance, and OSHA-standard HSE safety drills.
            </p>

            {/* Quick action buttons */}
            <div className="pt-2 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
              <Link
                to="/training/testimonials"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 text-xs sm:text-sm font-semibold transition-colors min-h-[44px]"
              >
                <Video className="w-4 h-4" />
                <span>Watch Graduate Video Testimonials (Sub-Page 3)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                to="/training/digital-skills"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white text-xs sm:text-sm font-medium transition-colors min-h-[44px]"
              >
                <Sparkles className="w-3.5 h-3.5 text-mw-orange" />
                <span>Explore Digital Skills Track</span>
              </Link>

              <a
                href="https://wa.me/2348035439404?text=Hello%20Mindware%20Academy,%20I%20would%20like%20to%20book%20a%20physical%20campus%20tour%20and%20inspect%20your%20training%20labs."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-purple-300 text-xs sm:text-sm font-medium transition-colors min-h-[44px]"
              >
                <Building2 className="w-3.5 h-3.5 text-purple-400" />
                <span>Book Campus Walkthrough</span>
                <ExternalLink className="w-3 h-3 text-purple-400" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Academy Sub Navigation Bar */}
      <AcademySubNav activeTab="gallery" />

      {/* Main Gallery Area */}
      <main className="container mx-auto px-4 sm:px-6 md:px-12 py-10 sm:py-14 space-y-12">
        {/* Search & Filter Controls */}
        <section aria-label="Gallery filters and search" className="space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <div className="text-xs uppercase tracking-wider text-purple-400 font-bold mb-1">
                Live Cohort Archive
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span>Showing {filteredItems.length} Live Cohort Photo Records</span>
                {filteredItems.length !== TRAINING_GALLERY_ITEMS.length && (
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-purple-600/20 text-purple-300 border border-purple-500/30">
                    Filtered from {TRAINING_GALLERY_ITEMS.length}
                  </span>
                )}
              </h2>
            </div>

            {/* Right Controls: Search & View Mode Switcher */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Search Input */}
              <div className="relative min-w-[260px] sm:min-w-[300px]">
                <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search topic, location, instructor..."
                  className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/40 text-xs sm:text-sm focus:outline-none focus:border-purple-500/60 focus:bg-white/[0.07] transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white p-1"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center self-end sm:self-auto bg-white/5 border border-white/10 rounded-xl p-1 shrink-0">
                <button
                  onClick={() => setViewMode("grid")}
                  aria-label="Grid view"
                  className={cn(
                    "p-2 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-medium",
                    viewMode === "grid"
                      ? "bg-purple-600 text-white shadow-sm"
                      : "text-white/60 hover:text-white"
                  )}
                >
                  <Grid className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Grid</span>
                </button>
                <button
                  onClick={() => setViewMode("compact")}
                  aria-label="Compact view"
                  className={cn(
                    "p-2 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-medium",
                    viewMode === "compact"
                      ? "bg-purple-600 text-white shadow-sm"
                      : "text-white/60 hover:text-white"
                  )}
                >
                  <List className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Detailed List</span>
                </button>
              </div>
            </div>
          </div>

          {/* Category Filter Pills with Item Counts */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none touch-pan-x">
            {TRAINING_GALLERY_CATEGORIES.map((cat) => {
              const count = categoryCounts[cat.id] ?? 0;
              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={cn(
                    "px-4 py-2 rounded-full text-xs font-semibold transition-all shrink-0 flex items-center gap-2 min-h-[40px]",
                    isSelected
                      ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                      : "bg-white/5 text-white/70 hover:text-white border border-white/10 hover:border-white/20 hover:bg-white/[0.08]"
                  )}
                >
                  <span>{cat.label}</span>
                  <span
                    className={cn(
                      "text-[10px] px-1.5 py-0.5 rounded-full font-mono",
                      isSelected ? "bg-white/20 text-white font-bold" : "bg-white/10 text-white/60"
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Gallery Content State */}
        {filteredItems.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-12 text-center space-y-4 max-w-lg mx-auto">
            <div className="w-14 h-14 rounded-full bg-purple-600/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mx-auto">
              <Camera className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">No Photos Matched Your Filter</h3>
            <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
              We couldn&apos;t find any gallery records matching &quot;{searchQuery}&quot; in the selected category. Try resetting your search terms.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all min-h-[44px]"
            >
              <span>Reset All Filters</span>
            </button>
          </div>
        ) : viewMode === "grid" ? (
          /* Grid View Mode */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredItems.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.4), ease: EASE }}
                className="rounded-3xl border border-white/10 bg-white/[0.02] hover:border-purple-500/40 hover:bg-white/[0.04] transition-all flex flex-col justify-between overflow-hidden group shadow-lg"
              >
                <div>
                  {/* Photo Preview Container (Click to trigger Lightbox) */}
                  <div
                    onClick={() => setLightboxIndex(index)}
                    className="relative aspect-video overflow-hidden bg-black/80 cursor-pointer group/photo"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setLightboxIndex(index);
                      }
                    }}
                    aria-label={`Open photo lightbox for ${item.title}`}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover group-hover/photo:scale-105 transition-transform duration-700 opacity-90 group-hover/photo:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent group-hover/photo:opacity-60 transition-opacity" />

                    {/* Zoom In Badge Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/photo:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 rounded-full bg-purple-600/90 text-white flex items-center justify-center shadow-xl shadow-purple-600/50 scale-90 group-hover/photo:scale-100 transition-transform">
                        <ZoomIn className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-md bg-purple-600 text-white text-[10px] font-bold shadow-md">
                        {item.categoryLabel}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-white/90 text-[10px] font-mono flex items-center gap-1">
                        <Calendar className="w-2.5 h-2.5 text-purple-300" />
                        <span>{item.date}</span>
                      </span>
                    </div>

                    {/* Location badge in bottom */}
                    <div className="absolute bottom-2.5 left-3 right-3 text-[11px] text-white/90 font-medium flex items-center gap-1.5 truncate">
                      <MapPin className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </div>
                  </div>

                  {/* Card Content Details */}
                  <div className="p-5 sm:p-6 space-y-3">
                    <div className="flex items-center justify-between text-xs text-white/50">
                      <span className="flex items-center gap-1 text-purple-300">
                        <Users className="w-3.5 h-3.5 text-purple-400" />
                        <span>{item.attendeesCount}</span>
                      </span>
                      <span className="font-mono text-xs text-white/60 truncate max-w-[150px]">
                        {item.leadInstructor}
                      </span>
                    </div>

                    <h3
                      onClick={() => setLightboxIndex(index)}
                      className="text-base sm:text-lg font-bold text-white group-hover:text-purple-300 transition-colors cursor-pointer leading-snug"
                    >
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-white/70 line-clamp-3 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Highlight Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {item.highlightTags.map((tag) => (
                        <button
                          key={tag}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSearchQuery(tag);
                          }}
                          className="text-[10px] px-2 py-0.5 rounded bg-white/5 hover:bg-purple-600/20 border border-white/10 hover:border-purple-500/30 text-white/70 hover:text-purple-300 transition-colors cursor-pointer"
                        >
                          #{tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-white/5 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setLightboxIndex(index)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-400 group-hover:text-purple-300 transition-colors min-h-[36px]"
                  >
                    <span>View Full Photo</span>
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleSharePhoto(item)}
                      title="Copy link to this photo"
                      className="text-white/40 hover:text-white p-1.5 rounded-lg hover:bg-white/5 transition-colors"
                      aria-label="Share photo"
                    >
                      {copiedId === item.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Share2 className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <span className="text-[11px] font-mono text-white/40">
                      Ref #{index + 1}
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          /* Detailed List View Mode */
          <div className="space-y-4">
            {filteredItems.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.3), ease: EASE }}
                className="rounded-2xl border border-white/10 bg-white/[0.02] hover:border-purple-500/40 hover:bg-white/[0.04] p-4 sm:p-5 transition-all flex flex-col md:flex-row gap-5 items-stretch md:items-center justify-between"
              >
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center flex-1">
                  {/* Thumbnail */}
                  <div
                    onClick={() => setLightboxIndex(index)}
                    className="relative w-full sm:w-44 aspect-video rounded-xl overflow-hidden bg-black/80 cursor-pointer shrink-0 group/thumb"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover/thumb:opacity-0 transition-opacity" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-purple-600/90 text-white flex items-center justify-center shadow-lg">
                        <ZoomIn className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Text details */}
                  <div className="space-y-2 min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap text-[11px]">
                      <span className="px-2 py-0.5 rounded bg-purple-600 text-white font-bold">
                        {item.categoryLabel}
                      </span>
                      <span className="text-white/50 font-mono">{item.date}</span>
                      <span className="text-white/30">•</span>
                      <span className="text-white/70 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-purple-400" />
                        {item.location}
                      </span>
                    </div>

                    <h3
                      onClick={() => setLightboxIndex(index)}
                      className="text-base sm:text-lg font-bold text-white hover:text-purple-300 transition-colors cursor-pointer"
                    >
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-white/70 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-white/50 pt-1">
                      <span className="text-purple-300 font-medium">
                        Trainees: {item.attendeesCount}
                      </span>
                      <span>Faculty: {item.leadInstructor}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex sm:flex-col md:flex-row items-center gap-2 pt-3 md:pt-0 border-t md:border-t-0 border-white/5 shrink-0 justify-end">
                  <button
                    onClick={() => handleSharePhoto(item)}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                    title="Copy Link"
                    aria-label="Copy link to photo"
                  >
                    {copiedId === item.id ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Share2 className="w-4 h-4" />
                    )}
                  </button>

                  <button
                    onClick={() => setLightboxIndex(index)}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all min-h-[40px]"
                  >
                    <span>View Photo</span>
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* Live Training Stats Bar */}
        <FadeInSection className="rounded-3xl border border-white/10 bg-gradient-to-r from-purple-950/20 via-white/[0.02] to-mw-orange/10 p-6 sm:p-10 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-purple-400 mb-1">500+</div>
              <div className="text-xs sm:text-sm text-white/70">Certified Alumni Trained</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-1">18+</div>
              <div className="text-xs sm:text-sm text-white/70">Live Physical & Hybrid Cohorts</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-emerald-400 mb-1">100%</div>
              <div className="text-xs sm:text-sm text-white/70">Practical Live Fieldwork & Labs</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-mw-orange mb-1">94%</div>
              <div className="text-xs sm:text-sm text-white/70">1st-Attempt Certification Pass Rate</div>
            </div>
          </div>
        </FadeInSection>

        {/* State-of-the-Art Physical Facilities & Campuses Showcase */}
        <section aria-label="Physical Campuses and Facilities" className="space-y-8">
          <div className="space-y-2 text-center max-w-3xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-wider text-purple-400 font-bold">
              PHYSICAL HUBS & LABS
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white">
              Purpose-Built Training Centers Across Nigeria
            </h2>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              Every Mindware training facility is architected to replicate enterprise production environments — equipped with uninterrupted power, high-speed fiber connectivity, certified safety equipment, and modern presentation auditoriums.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
            {ACADEMY_FACILITIES.map((facility) => (
              <div
                key={facility.id}
                className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 space-y-5 hover:border-purple-500/30 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="relative aspect-video rounded-2xl overflow-hidden bg-black/60">
                    <img
                      src={facility.image}
                      alt={facility.name}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover opacity-85 hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md text-[11px] font-bold text-purple-300 border border-white/10 flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-purple-400" />
                      <span>{facility.city}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{facility.name}</h3>
                    <p className="text-xs text-white/50">{facility.address}</p>
                    <div className="mt-2 text-xs font-semibold text-purple-300">
                      Focus: {facility.focus}
                    </div>
                  </div>

                  {/* Specifications */}
                  <div className="space-y-2 pt-2 border-t border-white/5">
                    {facility.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-2 text-xs text-white/70">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <a
                    href={`https://wa.me/2348035439404?text=Hello%20Mindware%20Admissions,%20I%20would%20like%20to%20schedule%20a%20visit%20to%20the%20${encodeURIComponent(facility.name)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold transition-colors min-h-[44px]"
                  >
                    <Building2 className="w-3.5 h-3.5 text-purple-400" />
                    <span>Schedule Center Tour</span>
                    <ExternalLink className="w-3 h-3 text-white/40" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Infrastructure Guarantee Badges */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">24/7 Redundant Power</div>
                <div className="text-[11px] text-white/60">Solar + soundproof generators</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                <Wifi className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Dedicated Fiber Line</div>
                <div className="text-[11px] text-white/60">Low-latency high bandwidth</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">OSHA & HSE Certified</div>
                <div className="text-[11px] text-white/60">Compliant drill environments</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-600/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Executive Weekend Access</div>
                <div className="text-[11px] text-white/60">Flexible schedules for workers</div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Prospective Trainee FAQ Accordion */}
        <section aria-label="Frequently Asked Questions about Live Sessions" className="space-y-6">
          <div className="space-y-2 text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-600/10 border border-purple-500/20 text-purple-400 text-xs font-semibold">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Attending Live Physical Cohorts</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
              Questions About Our Classrooms & Drills?
            </h2>
            <p className="text-xs sm:text-sm text-white/70">
              Clear information for trainees preparing to attend in-person classes in Lagos, Port Harcourt, and Abuja.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {GALLERY_FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;

              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="w-full px-5 sm:px-6 py-4 flex items-center justify-between text-left gap-4 hover:bg-white/[0.02] transition-colors"
                  >
                    <span className="text-sm sm:text-base font-semibold text-white">
                      {faq.question}
                    </span>
                    <div
                      className={cn(
                        "w-7 h-7 rounded-full bg-white/5 flex items-center justify-center shrink-0 transition-transform",
                        isOpen ? "rotate-180 bg-purple-600/30 text-purple-300" : "text-white/50"
                      )}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: EASE }}
                        className="px-5 sm:px-6 pb-5 text-xs sm:text-sm text-white/70 leading-relaxed border-t border-white/5 pt-3"
                      >
                        {faq.answer}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* Cross Promotion & Cohort Registration CTA */}
        <FadeInSection className="rounded-3xl border border-white/10 bg-gradient-to-r from-purple-600/10 via-mw-orange/10 to-transparent p-6 sm:p-10 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="text-xs font-mono uppercase tracking-wider text-purple-400 font-bold">
              JOIN OUR NEXT LIVE COHORT
            </span>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
              Experience the Mindware Academy Advantage in Person.
            </h3>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              Enrol in our upcoming weekend or weekday cohorts in Lagos and Port Harcourt. Gain verified skills, build a live commercial portfolio, and network with industry leaders.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <Link
              to="/training/digital-skills"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-mw-orange hover:bg-mw-orange-hover text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-mw-orange/20 min-h-[48px]"
            >
              <span>Digital Skills Track</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/training/professional-development"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-blue-600/20 min-h-[48px]"
            >
              <span>Professional & HSE Track</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="https://wa.me/2348035439404?text=Hello%20Mindware%20Academy,%20I%20want%20to%20register%20for%20the%20upcoming%20training%20cohort."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-600/20 min-h-[48px]"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat with Admissions</span>
            </a>
          </div>
        </FadeInSection>
      </main>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeLightboxItem && lightboxIndex !== null && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Photo details: ${activeLightboxItem.title}`}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/90 backdrop-blur-2xl animate-fade-in"
            onClick={() => setLightboxIndex(null)}
          >
            <div
              className="relative w-full max-w-5xl bg-[#090d16] border border-white/15 rounded-3xl overflow-hidden shadow-2xl shadow-black/95 flex flex-col max-h-[94vh]"
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
                    onClick={() => handleSharePhoto(activeLightboxItem)}
                    className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white flex items-center justify-center transition-colors"
                    aria-label="Share photo"
                    title="Copy photo link"
                  >
                    {copiedId === activeLightboxItem.id ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Share2 className="w-4 h-4" />
                    )}
                  </button>

                  <button
                    onClick={() => setLightboxIndex(null)}
                    aria-label="Close photo preview"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white flex items-center justify-center transition-colors min-h-[36px] min-w-[36px]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Lightbox Image Stage with Previous/Next Arrows */}
              <div className="relative flex-1 bg-black flex items-center justify-center min-h-[220px] sm:min-h-[420px] max-h-[58vh] overflow-hidden group">
                <img
                  src={activeLightboxItem.image}
                  alt={activeLightboxItem.title}
                  referrerPolicy="no-referrer"
                  className="max-w-full max-h-[58vh] object-contain select-none"
                />

                {/* Left Arrow */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : null));
                  }}
                  aria-label="Previous photo"
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/85 border border-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all active:scale-95"
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
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/85 border border-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all active:scale-95"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>

              {/* Thumbnail Strip for Rapid Navigation */}
              {filteredItems.length > 1 && (
                <div className="px-4 py-2 border-t border-white/5 bg-black/40 overflow-x-auto scrollbar-none flex items-center gap-2">
                  {filteredItems.map((item, thumbIdx) => (
                    <button
                      key={item.id}
                      onClick={() => setLightboxIndex(thumbIdx)}
                      className={cn(
                        "w-12 sm:w-16 aspect-video rounded-lg overflow-hidden shrink-0 transition-all border-2",
                        thumbIdx === lightboxIndex
                          ? "border-purple-500 scale-105 opacity-100"
                          : "border-transparent opacity-50 hover:opacity-80"
                      )}
                      aria-label={`Jump to photo ${thumbIdx + 1}`}
                    >
                      <img
                        src={item.image}
                        alt=""
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Lightbox Description Bar */}
              <div className="p-4 sm:p-5 border-t border-white/10 bg-white/[0.02] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1.5 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-purple-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {activeLightboxItem.location}
                    </span>
                    <span className="text-white/30">•</span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      {activeLightboxItem.attendeesCount}
                    </span>
                    <span className="text-white/30">•</span>
                    <span className="text-white/60">{activeLightboxItem.leadInstructor}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                    {activeLightboxItem.description}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto shrink-0">
                  <Link
                    to="/training/digital-skills"
                    className="text-center px-4 py-2.5 rounded-full bg-mw-orange hover:bg-mw-orange-hover text-white text-xs font-bold transition-all shadow-md active:scale-95 min-h-[40px] flex items-center justify-center"
                  >
                    Enrol in Next Cohort
                  </Link>

                  <a
                    href={`https://wa.me/2348035439404?text=Hello%20Mindware%20Admissions,%20I%20am%20interested%20in%20joining%20the%20cohort%20session:%20${encodeURIComponent(activeLightboxItem.title)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-center px-4 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md active:scale-95 min-h-[40px] flex items-center justify-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp Inquiry</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
