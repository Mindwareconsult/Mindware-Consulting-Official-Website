import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Sparkles, Briefcase, Users, Layers } from "lucide-react";
import { cn } from "../../lib/utils";

interface CareersSubNavProps {
  activeTab?: "overview" | "builder" | "jobs" | "employers";
}

export function CareersSubNav({ activeTab }: CareersSubNavProps) {
  const location = useLocation();
  const path = location.pathname;

  const currentTab =
    activeTab ||
    (path.includes("/cv-builder") || path.includes("/ai-cv-builder")
      ? "builder"
      : path.includes("/jobs") || path.includes("/explore-jobs")
      ? "jobs"
      : path.includes("/employers") || path.includes("/talent-match") || path.includes("/talent-network")
      ? "employers"
      : "overview");

  return (
    <div className="bg-[#040812] border-y border-white/10 sticky top-[60px] sm:top-[68px] z-30 backdrop-blur-xl">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 py-2.5 sm:py-3 flex items-center justify-start sm:justify-between gap-3 sm:gap-4 overflow-x-auto scrollbar-none touch-pan-x">
        
        {/* Left Indicator */}
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/40 shrink-0">
          <Link
            to="/careers"
            className={cn(
              "flex items-center gap-1.5 transition-colors",
              currentTab === "overview" ? "text-white font-bold" : "hover:text-white"
            )}
          >
            <Layers className="w-3.5 h-3.5 text-mw-orange" />
            <span>Careers Hub:</span>
          </Link>
        </div>

        {/* 3 Subpage Tabs */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Subpage 1: AI CV Builder */}
          <Link
            to="/careers/cv-builder"
            className={cn(
              "inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all",
              currentTab === "builder"
                ? "bg-mw-orange text-white shadow-md shadow-mw-orange/20"
                : "text-white/70 hover:text-white hover:bg-white/5 border border-white/10 hover:border-white/20"
            )}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>1. AI CV Builder</span>
            <span
              className={cn(
                "text-[10px] px-1.5 py-0.5 rounded font-mono font-bold",
                currentTab === "builder" ? "bg-white/20 text-white" : "bg-mw-orange/20 text-mw-orange"
              )}
            >
              Gemini AI
            </span>
          </Link>

          {/* Subpage 2: Explore Job Openings */}
          <Link
            to="/careers/jobs"
            className={cn(
              "inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all",
              currentTab === "jobs"
                ? "bg-mw-orange text-white shadow-md shadow-mw-orange/20"
                : "text-white/70 hover:text-white hover:bg-white/5 border border-white/10 hover:border-white/20"
            )}
          >
            <Briefcase className="w-3.5 h-3.5 text-blue-300" />
            <span>2. Explore Job Openings</span>
            <span
              className={cn(
                "text-[10px] px-1.5 py-0.5 rounded font-mono font-bold",
                currentTab === "jobs" ? "bg-white/20 text-white" : "bg-blue-500/20 text-blue-300"
              )}
            >
              Direct Apply
            </span>
          </Link>

          {/* Subpage 3: Connect With Employers */}
          <Link
            to="/careers/employers"
            className={cn(
              "inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all",
              currentTab === "employers"
                ? "bg-mw-orange text-white shadow-md shadow-mw-orange/20"
                : "text-white/70 hover:text-white hover:bg-white/5 border border-white/10 hover:border-white/20"
            )}
          >
            <Users className="w-3.5 h-3.5 text-emerald-300" />
            <span>3. Connect With Employers</span>
            <span
              className={cn(
                "text-[10px] px-1.5 py-0.5 rounded font-mono font-bold",
                currentTab === "employers" ? "bg-white/20 text-white" : "bg-emerald-500/20 text-emerald-300"
              )}
            >
              Talent Match
            </span>
          </Link>

        </div>
      </div>
    </div>
  );
}
