import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sparkles, ChevronRight, Award, Zap, Briefcase, Users, GraduationCap } from "lucide-react";
import { AICVBuilder, CVData } from "../components/careers/AICVBuilder";
import { CareersSubNav } from "../components/careers/CareersSubNav";
import { SEO } from "../components/SEO";
import { saveStoredCV, getStoredCV } from "../lib/cvStorage";

export function CareersCVBuilder() {
  const navigate = useNavigate();
  const [initialCV, setInitialCV] = useState<CVData | null>(null);

  useEffect(() => {
    const saved = getStoredCV();
    if (saved) {
      setInitialCV(saved);
    }
  }, []);

  const handleApplyWithCV = (cv: CVData) => {
    saveStoredCV(cv);
    navigate("/careers/jobs");
  };

  const handleConnectTalent = (cv: CVData) => {
    saveStoredCV(cv);
    navigate("/careers/employers");
  };

  return (
    <div className="min-h-screen bg-[#02040a] text-white pt-28 pb-24">
      <SEO
        title="AI CV Builder | Gemini AI | Careers | Mindware Consulting"
        description="Craft an ATS-optimized professional CV using Gemini AI. Enhance job bullets with quantifiable metrics, generate executive summaries, and apply directly to enterprise positions."
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
            <span className="text-white font-semibold">1. AI CV Builder (Gemini AI)</span>
          </div>

          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-mw-orange/10 border border-mw-orange/20 text-mw-orange text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Subpage 1 • AI CV Builder • Gemini AI</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-white tracking-tight leading-[1.1]">
              Build Your ATS-Proof Resume with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-mw-orange via-amber-400 to-amber-200">
                Gemini AI
              </span>
            </h1>

            <p className="text-base sm:text-lg text-white/70 max-w-2xl leading-relaxed">
              Synthesize your real-world experience, enterprise qualifications (PMP®, HSE, Engineering), and technical skills into an authoritative resume that passes ATS scanners and captures executive attention.
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10">
              <div>
                <div className="text-2xl font-display font-bold text-white">98%</div>
                <div className="text-xs text-white/50 mt-0.5">ATS Scanner Compatibility</div>
              </div>
              <div>
                <div className="text-2xl font-display font-bold text-mw-orange">Gemini 3.8</div>
                <div className="text-xs text-white/50 mt-0.5">AI Engine Intelligence</div>
              </div>
              <div>
                <div className="text-2xl font-display font-bold text-white">3 Mins</div>
                <div className="text-xs text-white/50 mt-0.5">Full Synthesis Time</div>
              </div>
              <div>
                <div className="text-2xl font-display font-bold text-emerald-400">PDF / Print</div>
                <div className="text-xs text-white/50 mt-0.5">Direct Export & Apply</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subpage Navigation Switcher */}
      <CareersSubNav activeTab="builder" />

      {/* Main AI CV Builder Interface */}
      <section className="container mx-auto px-3 sm:px-6 md:px-12 py-6 sm:py-8">
        <AICVBuilder
          onApplyWithCV={handleApplyWithCV}
          onConnectTalent={handleConnectTalent}
        />
      </section>

      {/* Next Step Cross-Promotion */}
      <section className="container mx-auto px-4 sm:px-6 md:px-12 pt-8 sm:pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/careers/jobs"
            className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20 transition-all flex items-center justify-between group"
          >
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-mw-orange font-bold flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5" />
                Subpage 2
              </span>
              <h3 className="text-lg font-bold text-white group-hover:text-mw-orange transition-colors">
                Explore Job Openings (Direct Apply)
              </h3>
              <p className="text-xs text-white/60">
                Browse verified openings at Mindware and partner firms. Apply directly with your new CV.
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
                Get discovered by enterprises searching for certified talent with your exact credentials.
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
