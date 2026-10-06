import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Compass, Users, Video, Layers, Sparkles } from "lucide-react";
import { cn } from "../../lib/utils";

interface AboutSubNavProps {
  activeTab?: "overview" | "mission" | "leadership" | "testimonials";
}

export function AboutSubNav({ activeTab }: AboutSubNavProps) {
  const location = useLocation();
  const path = location.pathname;

  const currentTab =
    activeTab ||
    (path.includes("/mission") || path.includes("/mission-vision")
      ? "mission"
      : path.includes("/leadership")
      ? "leadership"
      : path.includes("/testimonials")
      ? "testimonials"
      : "overview");

  return (
    <div className="bg-[#040812] border-y border-white/10 sticky top-[60px] sm:top-[68px] z-30 backdrop-blur-xl">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 py-2.5 sm:py-3 flex items-center justify-start sm:justify-between gap-3 sm:gap-4 overflow-x-auto scrollbar-none touch-pan-x">
        {/* Left Indicator */}
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/40 shrink-0">
          <Link
            to="/about"
            className={cn(
              "flex items-center gap-1.5 transition-colors",
              currentTab === "overview" ? "text-white font-bold" : "hover:text-white"
            )}
          >
            <Layers className="w-3.5 h-3.5 text-mw-orange" />
            <span>About Mindware:</span>
          </Link>
        </div>

        {/* Subpage Tabs */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Subpage 1: Mission, Vision & Values */}
          <Link
            to="/about/mission-vision"
            className={cn(
              "inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all",
              currentTab === "mission"
                ? "bg-mw-orange text-white shadow-md shadow-mw-orange/20"
                : "text-white/70 hover:text-white hover:bg-white/5 border border-white/10 hover:border-white/20"
            )}
          >
            <Compass className="w-3.5 h-3.5 text-amber-300" />
            <span>1. Mission & Values</span>
            <span
              className={cn(
                "text-[10px] px-1.5 py-0.5 rounded font-mono font-bold",
                currentTab === "mission" ? "bg-white/20 text-white" : "bg-mw-orange/20 text-mw-orange"
              )}
            >
              Foundations
            </span>
          </Link>

          {/* Subpage 2: Leadership & Team */}
          <Link
            to="/about/leadership"
            className={cn(
              "inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all",
              currentTab === "leadership"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                : "text-white/70 hover:text-white hover:bg-white/5 border border-white/10 hover:border-white/20"
            )}
          >
            <Users className="w-3.5 h-3.5 text-blue-300" />
            <span>2. Leadership & Team</span>
            <span
              className={cn(
                "text-[10px] px-1.5 py-0.5 rounded font-mono font-bold",
                currentTab === "leadership" ? "bg-white/20 text-white" : "bg-blue-500/20 text-blue-300"
              )}
            >
              Executive
            </span>
          </Link>

          {/* Subpage 3: Client Video Reviews */}
          <Link
            to="/about/testimonials"
            className={cn(
              "inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all",
              currentTab === "testimonials"
                ? "bg-rose-600 text-white shadow-md shadow-rose-600/20"
                : "text-white/70 hover:text-white hover:bg-white/5 border border-white/10 hover:border-white/20"
            )}
          >
            <Video className="w-3.5 h-3.5 text-rose-300" />
            <span>3. Client Video Reviews</span>
            <span
              className={cn(
                "text-[10px] px-1.5 py-0.5 rounded font-mono font-bold",
                currentTab === "testimonials" ? "bg-white/20 text-white" : "bg-rose-500/20 text-rose-300"
              )}
            >
              Agency Proof
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
