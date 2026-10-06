import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { 
  Sparkles, 
  Briefcase, 
  Users, 
  FileText, 
  Award, 
  Building2, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  TrendingUp, 
  ShieldCheck,
  ChevronRight,
  GraduationCap
} from "lucide-react";
import { AICVBuilder, CVData } from "../components/careers/AICVBuilder";
import { JobBoard } from "../components/careers/JobBoard";
import { TalentNetwork } from "../components/careers/TalentNetwork";
import { CareersSubNav } from "../components/careers/CareersSubNav";
import { SEO } from "../components/SEO";
import { getStoredCV, saveStoredCV } from "../lib/cvStorage";

export function Careers() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get("tab");

  const [activeTab, setActiveTab] = useState<"builder" | "jobs" | "network">(
    tabParam === "jobs" ? "jobs" : tabParam === "network" ? "network" : "builder"
  );

  const [userCV, setUserCV] = useState<CVData | null>(null);

  useEffect(() => {
    const saved = getStoredCV();
    if (saved) setUserCV(saved);
  }, []);

  useEffect(() => {
    if (tabParam === "jobs") setActiveTab("jobs");
    else if (tabParam === "network") setActiveTab("network");
    else if (tabParam === "builder") setActiveTab("builder");
  }, [tabParam]);

  const handleTabChange = (tab: "builder" | "jobs" | "network") => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  const handleApplyWithCV = (cv: CVData) => {
    setUserCV(cv);
    saveStoredCV(cv);
    setActiveTab("jobs");
    setSearchParams({ tab: "jobs" });
    window.scrollTo({ top: 900, behavior: "smooth" });
  };

  const handleConnectTalent = (cv: CVData) => {
    setUserCV(cv);
    saveStoredCV(cv);
    setActiveTab("network");
    setSearchParams({ tab: "network" });
    window.scrollTo({ top: 900, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#02040a] text-white pt-28 pb-24">
      <SEO
        title="Careers & Talent Hub | Mindware Consulting"
        description="Accelerate your career with AI CV Builder (Gemini AI), Explore Job Openings (Direct Apply), and Connect With Employers (Talent Match)."
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 md:py-16">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs md:text-sm text-white/50 mb-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-medium">Careers & Talent Hub</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-mw-orange/10 border border-mw-orange/20 text-mw-orange text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI CV Builder • Explore Job Openings • Connect With Employers</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight leading-[1.1]">
                Launch Your Career with <span className="text-transparent bg-clip-text bg-gradient-to-r from-mw-orange via-amber-400 to-amber-200">AI-Engineered CVs</span> & Enterprise Connections
              </h1>

              <p className="text-base sm:text-lg text-white/70 max-w-2xl leading-relaxed">
                Build ATS-proof professional resumes using next-generation Gemini AI, apply directly to verified openings at Mindware and partner enterprises, and connect with hiring employers seeking your specific qualifications.
              </p>

              {/* Action Buttons linking directly to the 3 Subpages */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/careers/cv-builder"
                  className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-mw-orange hover:bg-mw-orange/90 text-white font-bold text-xs md:text-sm transition-all shadow-xl shadow-mw-orange/25 active:scale-95"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>1. AI CV Builder</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/20 text-white font-mono">Gemini AI</span>
                </Link>

                <Link
                  to="/careers/jobs"
                  className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs md:text-sm border border-white/10 transition-all active:scale-95"
                >
                  <Briefcase className="w-4 h-4 text-mw-orange" />
                  <span>2. Explore Job Openings</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/20 text-white font-mono">Direct Apply</span>
                </Link>

                <Link
                  to="/careers/employers"
                  className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 font-semibold text-xs md:text-sm border border-blue-500/30 transition-all active:scale-95"
                >
                  <Users className="w-4 h-4 text-blue-400" />
                  <span>3. Connect With Employers</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono">Talent Match</span>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10">
                <div>
                  <div className="text-2xl font-display font-bold text-white">98%</div>
                  <div className="text-xs text-white/50 mt-0.5">ATS Pass Rate</div>
                </div>
                <div>
                  <div className="text-2xl font-display font-bold text-mw-orange">₦1.2M+</div>
                  <div className="text-xs text-white/50 mt-0.5">Avg Placement Comp</div>
                </div>
                <div>
                  <div className="text-2xl font-display font-bold text-white">3 Mins</div>
                  <div className="text-xs text-white/50 mt-0.5">AI Generation Speed</div>
                </div>
                <div>
                  <div className="text-2xl font-display font-bold text-emerald-400">100%</div>
                  <div className="text-xs text-white/50 mt-0.5">Verified Employers</div>
                </div>
              </div>
            </div>

            {/* Right Visual Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl shadow-black/80 group">
                <img
                  src="/src/assets/images/careers_hero_workspace_1790617831121.jpg"
                  alt="Mindware Careers Tech Workspace"
                  className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] via-transparent to-transparent opacity-80" />

                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-[#090d16]/90 backdrop-blur-xl border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-mw-orange font-bold flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-mw-orange" />
                      CAREER ACCELERATION
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
                      Hiring Active
                    </span>
                  </div>
                  <p className="text-xs text-white/80 font-medium">
                    "Mindware bridges the gap between acquiring high-demand skills and landing lucrative enterprise roles."
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Subpage Cards Section */}
      <section className="container mx-auto px-6 md:px-12 py-12">
        <div className="mb-8">
          <div className="text-xs uppercase tracking-widest text-mw-orange font-bold mb-2">Dedicated Subpages</div>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white">
            Choose Your Career Gateway
          </h2>
          <p className="text-sm text-white/60 mt-1">
            Access dedicated modules built to maximize your employment opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Subpage Card 1 */}
          <div className="p-6 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] hover:border-mw-orange/50 transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-mw-orange/10 border border-mw-orange/20 flex items-center justify-center text-mw-orange">
                <Sparkles className="w-6 h-6 text-amber-300" />
              </div>
              <div>
                <div className="text-xs font-mono font-bold text-mw-orange uppercase tracking-wider mb-1 flex items-center gap-2">
                  <span>Subpage 1</span>
                  <span className="px-2 py-0.5 rounded bg-mw-orange/20 text-mw-orange text-[10px]">Gemini AI</span>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-mw-orange transition-colors">
                  AI CV Builder
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                Harness Gemini AI to generate persuasive summaries, rewrite bullet points with hard metrics, format ATS-proof resumes, and export as clean PDF.
              </p>
            </div>
            <div className="pt-6">
              <Link
                to="/careers/cv-builder"
                className="inline-flex items-center justify-between w-full px-5 py-3 rounded-xl bg-mw-orange text-white font-bold text-xs uppercase tracking-wider transition-all hover:bg-mw-orange/90 shadow-lg shadow-mw-orange/20"
              >
                <span>Open AI CV Builder</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Subpage Card 2 */}
          <div className="p-6 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] hover:border-blue-500/50 transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Briefcase className="w-6 h-6 text-blue-300" />
              </div>
              <div>
                <div className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider mb-1 flex items-center gap-2">
                  <span>Subpage 2</span>
                  <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px]">Direct Apply</span>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  Explore Job Openings
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                Filter verified enterprise openings across Software, SEO, Marketing, HSE, and Project Management. Apply directly with 1-click submission.
              </p>
            </div>
            <div className="pt-6">
              <Link
                to="/careers/jobs"
                className="inline-flex items-center justify-between w-full px-5 py-3 rounded-xl bg-white/10 hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider transition-all"
              >
                <span>Browse All Jobs</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Subpage Card 3 */}
          <div className="p-6 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] hover:border-emerald-500/50 transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Users className="w-6 h-6 text-emerald-300" />
              </div>
              <div>
                <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-2">
                  <span>Subpage 3</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px]">Talent Match</span>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                  Connect With Employers
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                Get discovered by enterprises searching for certified professionals. Employers filter by PMP®, HSE 1/2/3, Google UX, and Meta certifications.
              </p>
            </div>
            <div className="pt-6">
              <Link
                to="/careers/employers"
                className="inline-flex items-center justify-between w-full px-5 py-3 rounded-xl bg-white/10 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider transition-all"
              >
                <span>Connect With Employers</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Subpage Navigation Switcher */}
      <CareersSubNav activeTab="overview" />

      {/* Interactive Tabs on Hub Page */}
      <section className="container mx-auto px-6 md:px-12 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-white">Hub Live Workspace</h3>
            <p className="text-xs text-white/50">Preview and work directly, or navigate to individual subpages above.</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleTabChange("builder")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                activeTab === "builder" ? "bg-mw-orange text-white" : "bg-white/5 text-white/60 hover:text-white"
              }`}
            >
              CV Builder
            </button>
            <button
              onClick={() => handleTabChange("jobs")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                activeTab === "jobs" ? "bg-mw-orange text-white" : "bg-white/5 text-white/60 hover:text-white"
              }`}
            >
              Jobs
            </button>
            <button
              onClick={() => handleTabChange("network")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                activeTab === "network" ? "bg-mw-orange text-white" : "bg-white/5 text-white/60 hover:text-white"
              }`}
            >
              Talent Pool
            </button>
          </div>
        </div>

        {activeTab === "builder" && (
          <AICVBuilder
            onApplyWithCV={handleApplyWithCV}
            onConnectTalent={handleConnectTalent}
          />
        )}

        {activeTab === "jobs" && (
          <JobBoard
            activeCV={userCV}
            onNavigateToBuilder={() => handleTabChange("builder")}
          />
        )}

        {activeTab === "network" && (
          <TalentNetwork
            activeCV={userCV}
            onNavigateToBuilder={() => handleTabChange("builder")}
          />
        )}
      </section>

      {/* Dual Mandate / Training to Employment Bridge Banner */}
      <section className="container mx-auto px-6 md:px-12 pt-16">
        <div className="rounded-3xl p-8 md:p-12 bg-gradient-to-r from-[#0d1627] via-[#090d16] to-[#140e0a] border border-white/10 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mw-orange/10 border border-mw-orange/20 text-mw-orange text-xs font-semibold">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Upskill & Get Hired Fast</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight">
                Need Accredited Qualifications to Qualify for Top Positions?
              </h3>
              <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-2xl">
                Explore our accredited academies in <strong className="text-white">Digital Skills</strong> (Web Design, SEO, Analytics) and <strong className="text-white">Professional Certifications</strong> (PMP® Project Management, HSE Levels 1, 2, 3). Graduates receive priority recommendation in the Mindware Employer Talent Pool.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/training/professional-development"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs md:text-sm font-bold transition-all shadow-md shadow-blue-600/20"
                >
                  <Award className="w-4 h-4" />
                  <span>PMP® & HSE Academy</span>
                </Link>

                <Link
                  to="/training/digital-skills"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs md:text-sm font-semibold border border-white/10 transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-mw-orange" />
                  <span>Digital Skills Tracks</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                <img
                  src="/src/assets/images/talent_matching_network_1790617842281.jpg"
                  alt="Employer Interview & Talent Connection"
                  className="w-full h-48 object-cover object-center"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
