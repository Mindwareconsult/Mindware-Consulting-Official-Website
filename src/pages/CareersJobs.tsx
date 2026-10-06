import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Briefcase, ChevronRight, Sparkles, Users, Award, ShieldCheck } from "lucide-react";
import { JobBoard } from "../components/careers/JobBoard";
import { CareersSubNav } from "../components/careers/CareersSubNav";
import { SEO } from "../components/SEO";
import { getStoredCV } from "../lib/cvStorage";
import { CVData } from "../components/careers/AICVBuilder";

export function CareersJobs() {
  const navigate = useNavigate();
  const [activeCV, setActiveCV] = useState<CVData | null>(null);

  useEffect(() => {
    const saved = getStoredCV();
    if (saved) {
      setActiveCV(saved);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#02040a] text-white pt-28 pb-24">
      <SEO
        title="Explore Job Openings | Direct Apply | Careers | Mindware Consulting"
        description="Browse active engineering, digital marketing, project management, and HSE job openings. Apply directly with one click using your verified CV."
      />

      {/* Hero Header */}
      <section className="relative overflow-hidden py-10 md:py-14 border-b border-white/5">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-mw-orange/10 via-transparent to-transparent blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs md:text-sm text-white/50 mb-6 flex-wrap">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/careers" className="hover:text-white transition-colors">Careers</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-semibold">2. Explore Job Openings (Direct Apply)</span>
          </div>

          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-mw-orange/10 border border-mw-orange/20 text-mw-orange text-xs font-semibold uppercase tracking-wider">
              <Briefcase className="w-3.5 h-3.5 text-blue-300" />
              <span>Subpage 2 • Explore Job Openings • Direct Apply</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-white tracking-tight leading-[1.1]">
              Explore Career Openings &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-mw-orange via-amber-400 to-amber-200">
                Direct Apply
              </span>
            </h1>

            <p className="text-base sm:text-lg text-white/70 max-w-2xl leading-relaxed">
              Find positions matched to your certified qualifications across engineering, enterprise platforms, technical SEO, and project governance. Apply directly with complete salary transparency.
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10">
              <div>
                <div className="text-2xl font-display font-bold text-white">150+</div>
                <div className="text-xs text-white/50 mt-0.5">Active Enterprise Roles</div>
              </div>
              <div>
                <div className="text-2xl font-display font-bold text-mw-orange">₦1.2M+</div>
                <div className="text-xs text-white/50 mt-0.5">Average Compensation</div>
              </div>
              <div>
                <div className="text-2xl font-display font-bold text-white">48 Hrs</div>
                <div className="text-xs text-white/50 mt-0.5">Fast Direct Feedback</div>
              </div>
              <div>
                <div className="text-2xl font-display font-bold text-emerald-400">100%</div>
                <div className="text-xs text-white/50 mt-0.5">Verified Employers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subpage Navigation Switcher */}
      <CareersSubNav activeTab="jobs" />

      {/* Main Job Board Interface */}
      <section className="container mx-auto px-3 sm:px-6 md:px-12 py-6 sm:py-8">
        <JobBoard
          activeCV={activeCV}
          onNavigateToBuilder={() => navigate("/careers/cv-builder")}
        />
      </section>

      {/* Next Step Cross-Promotion */}
      <section className="container mx-auto px-4 sm:px-6 md:px-12 pt-8 sm:pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/careers/cv-builder"
            className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20 transition-all flex items-center justify-between group"
          >
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-mw-orange font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Subpage 1
              </span>
              <h3 className="text-lg font-bold text-white group-hover:text-mw-orange transition-colors">
                AI CV Builder (Gemini AI)
              </h3>
              <p className="text-xs text-white/60">
                Don't have an ATS-proof resume yet? Generate one in 3 minutes with our AI engine.
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-mw-orange group-hover:text-white transition-colors">
              <ChevronRight className="w-4 h-4" />
            </div>
          </Link>

          <Link
            to="/careers/employers"
            className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20 transition-all flex items-center justify-between group"
          >
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-blue-400 font-bold flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                Subpage 3
              </span>
              <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                Connect With Employers (Talent Match)
              </h3>
              <p className="text-xs text-white/60">
                Put your profile in front of hiring managers actively seeking certified professionals.
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <ChevronRight className="w-4 h-4" />
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
