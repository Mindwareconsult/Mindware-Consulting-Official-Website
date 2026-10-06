import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Users, ChevronRight, Sparkles, Briefcase, Award, ShieldCheck, CheckCircle2 } from "lucide-react";
import { TalentNetwork } from "../components/careers/TalentNetwork";
import { CareersSubNav } from "../components/careers/CareersSubNav";
import { SEO } from "../components/SEO";
import { getStoredCV } from "../lib/cvStorage";
import { CVData } from "../components/careers/AICVBuilder";

export function CareersEmployers() {
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
        title="Connect With Employers | Talent Match | Careers | Mindware Consulting"
        description="Connect with corporate employers hiring certified talent. Filter candidates by PMP®, HSE, and engineering qualifications, or join the verified talent network."
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
            <span className="text-white font-semibold">3. Connect With Employers (Talent Match)</span>
          </div>

          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold uppercase tracking-wider">
              <Users className="w-3.5 h-3.5 text-blue-400" />
              <span>Subpage 3 • Connect With Employers • Talent Match</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-white tracking-tight leading-[1.1]">
              Connect With Hiring Employers &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-amber-200">
                Talent Match
              </span>
            </h1>

            <p className="text-base sm:text-lg text-white/70 max-w-2xl leading-relaxed">
              Employers query our certified talent pool to recruit vetted specialists with verified credentials in PMP® Project Management, HSE Levels 1, 2, 3, Full-Stack Engineering, and Growth SEO.
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10">
              <div>
                <div className="text-2xl font-display font-bold text-white">1,200+</div>
                <div className="text-xs text-white/50 mt-0.5">Verified Candidates</div>
              </div>
              <div>
                <div className="text-2xl font-display font-bold text-blue-400">99%</div>
                <div className="text-xs text-white/50 mt-0.5">Credential Verification</div>
              </div>
              <div>
                <div className="text-2xl font-display font-bold text-white">14 Days</div>
                <div className="text-xs text-white/50 mt-0.5">Avg Time-to-Hire</div>
              </div>
              <div>
                <div className="text-2xl font-display font-bold text-emerald-400">Direct</div>
                <div className="text-xs text-white/50 mt-0.5">Interview Connections</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subpage Navigation Switcher */}
      <CareersSubNav activeTab="employers" />

      {/* Main Talent Network Interface */}
      <section className="container mx-auto px-3 sm:px-6 md:px-12 py-6 sm:py-8">
        <TalentNetwork
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
                Enhance your candidate profile with an AI-generated executive summary and ATS keywords.
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-mw-orange group-hover:text-white transition-colors">
              <ChevronRight className="w-4 h-4" />
            </div>
          </Link>

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
                Apply directly to open positions while waiting for inbound employer interview requests.
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-mw-orange group-hover:text-white transition-colors">
              <ChevronRight className="w-4 h-4" />
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
