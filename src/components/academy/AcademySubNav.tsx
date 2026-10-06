import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Sparkles, Briefcase, Video, GraduationCap, Camera, ArrowRight } from "lucide-react";
import { cn } from "../../lib/utils";

interface AcademySubNavProps {
  activeTab?: "overview" | "digital" | "professional" | "testimonials" | "gallery";
}

export function AcademySubNav({ activeTab }: AcademySubNavProps) {
  const location = useLocation();
  const path = location.pathname;

  const currentTab =
    activeTab ||
    (path.includes("/digital-skills")
      ? "digital"
      : path.includes("/professional-development")
      ? "professional"
      : path.includes("/testimonials")
      ? "testimonials"
      : path.includes("/gallery")
      ? "gallery"
      : "overview");

  return (
    <div className="bg-[#040812] border-y border-white/10 sticky top-[60px] sm:top-[68px] z-30 backdrop-blur-xl">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 py-2.5 sm:py-3 flex items-center justify-start sm:justify-between gap-3 sm:gap-4 overflow-x-auto scrollbar-none touch-pan-x">
        {/* Left Indicator */}
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/40 shrink-0">
          <Link
            to="/training"
            className={cn(
              "flex items-center gap-1.5 transition-colors",
              currentTab === "overview" ? "text-white font-bold" : "hover:text-white"
            )}
          >
            <GraduationCap className="w-3.5 h-3.5 text-mw-orange" />
            <span>Academy Hub:</span>
          </Link>
        </div>

        {/* Subpage Tabs */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Subpage 1: Digital Skills Track */}
          <Link
            to="/training/digital-skills"
            className={cn(
              "inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all",
              currentTab === "digital"
                ? "bg-mw-orange text-white shadow-md shadow-mw-orange/20"
                : "text-white/70 hover:text-white hover:bg-white/5 border border-white/10 hover:border-white/20"
            )}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>1. Digital Skills Track</span>
            <span
              className={cn(
                "text-[10px] px-1.5 py-0.5 rounded font-mono font-bold",
                currentTab === "digital" ? "bg-white/20 text-white" : "bg-mw-orange/20 text-mw-orange"
              )}
            >
              Page 1
            </span>
          </Link>

          {/* Subpage 2: Professional & HSE Track */}
          <Link
            to="/training/professional-development"
            className={cn(
              "inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all",
              currentTab === "professional"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                : "text-white/70 hover:text-white hover:bg-white/5 border border-white/10 hover:border-white/20"
            )}
          >
            <Briefcase className="w-3.5 h-3.5 text-blue-300" />
            <span>2. Professional & HSE</span>
            <span
              className={cn(
                "text-[10px] px-1.5 py-0.5 rounded font-mono font-bold",
                currentTab === "professional" ? "bg-white/20 text-white" : "bg-blue-500/20 text-blue-300"
              )}
            >
              Page 2
            </span>
          </Link>

          {/* Subpage 3: Graduate Video Reviews */}
          <Link
            to="/training/testimonials"
            className={cn(
              "inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all",
              currentTab === "testimonials"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                : "text-white/70 hover:text-white hover:bg-white/5 border border-white/10 hover:border-white/20"
            )}
          >
            <Video className="w-3.5 h-3.5 text-emerald-300" />
            <span>3. Video Reviews</span>
            <span
              className={cn(
                "text-[10px] px-1.5 py-0.5 rounded font-mono font-bold",
                currentTab === "testimonials" ? "bg-white/20 text-white" : "bg-emerald-500/20 text-emerald-300"
              )}
            >
              Page 3
            </span>
          </Link>

          {/* Subpage 4: Training Gallery */}
          <Link
            to="/training/gallery"
            className={cn(
              "inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all",
              currentTab === "gallery"
                ? "bg-purple-600 text-white shadow-md shadow-purple-600/20"
                : "text-white/70 hover:text-white hover:bg-white/5 border border-white/10 hover:border-white/20"
            )}
          >
            <Camera className="w-3.5 h-3.5 text-purple-300" />
            <span>4. Training Gallery</span>
            <span
              className={cn(
                "text-[10px] px-1.5 py-0.5 rounded font-mono font-bold",
                currentTab === "gallery" ? "bg-white/20 text-white" : "bg-purple-500/20 text-purple-300"
              )}
            >
              Live Photos
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
