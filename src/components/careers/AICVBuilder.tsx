import React, { useState } from "react";
import { 
  Sparkles, 
  Download, 
  Copy, 
  Check, 
  Plus, 
  Trash2, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Layers, 
  User, 
  Printer, 
  ExternalLink,
  ChevronRight,
  RefreshCw,
  Eye,
  FileText
} from "lucide-react";
import { POPULAR_CERTIFICATIONS } from "../../data/careersData";
import { getStoredCV, saveStoredCV } from "../../lib/cvStorage";

export interface CVData {
  fullName: string;
  professionalTitle: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  portfolio: string;
  summary: string;
  targetRole: string;
  experienceYears: string;
  experiences: {
    id: string;
    role: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    isCurrent: boolean;
    description: string;
    bullets: string[];
  }[];
  education: {
    id: string;
    degree: string;
    school: string;
    year: string;
    details: string;
  }[];
  certifications: string[];
  skills: string[];
  atsKeywords?: string[];
}

const INITIAL_CV: CVData = {
  fullName: "Oluwaseun Adeleke",
  professionalTitle: "Lead Full-Stack Solutions Architect & Digital Strategist",
  email: "oluwaseun.adeleke@example.com",
  phone: "+234 812 555 0192",
  location: "Lagos, Nigeria",
  linkedin: "linkedin.com/in/oluwaseun-adeleke",
  portfolio: "adeleke-solutions.com",
  targetRole: "Senior Full-Stack Engineer / Solutions Architect",
  experienceYears: "5+",
  summary: "High-impact Solutions Architect with 5+ years of demonstrable success delivering resilient web architectures, enterprise digital ecosystems, and high-converting commercial platforms across West Africa. Proven expertise in React, TypeScript, scalable cloud backend systems, and agile engineering leadership. Committed to driving quantifiable business value, 99.9% uptime, and cross-functional team acceleration.",
  experiences: [
    {
      id: "exp-1",
      role: "Senior Full-Stack Engineer",
      company: "Mindware Consulting Client Ecosystem",
      location: "Lagos, Nigeria",
      startDate: "2023",
      endDate: "Present",
      isCurrent: true,
      description: "Spearheaded technical development for corporate infrastructure and client web applications.",
      bullets: [
        "Architected and deployed 12+ mission-critical responsive web platforms with 99.9% uptime and <1.2s average load time.",
        "Optimized frontend bundle sizes by 42% through code-splitting and asset pipelines, elevating Google Lighthouse scores to 96+.",
        "Engineered secure RESTful and GraphQL APIs handling over 450,000 monthly transactions with zero critical vulnerabilities.",
        "Mentored a multidisciplinary engineering squad of 6 junior and mid-level software developers."
      ]
    },
    {
      id: "exp-2",
      role: "Frontend Systems Developer",
      company: "Apex Digital Dynamics",
      location: "Abuja, Nigeria",
      startDate: "2021",
      endDate: "2023",
      isCurrent: false,
      description: "Developed user-centric customer portals and analytical dashboards.",
      bullets: [
        "Delivered intuitive corporate dashboard modules in React and TypeScript, increasing daily active user engagement by 35%.",
        "Collaborated with product designers in Figma to translate complex client workflows into reusable component libraries.",
        "Integrated automated CI/CD testing pipelines, cutting software release rollback incidents by 80%."
      ]
    }
  ],
  education: [
    {
      id: "edu-1",
      degree: "B.Sc. Computer Science (First Class Honours)",
      school: "University of Lagos, Nigeria",
      year: "2020",
      details: "Specialized in Software Engineering, Distributed Systems, and Network Architecture."
    }
  ],
  certifications: [
    "AWS Certified Solutions Architect",
    "Project Management Professional (PMP®) In-View",
    "Meta Certified Front-End Developer"
  ],
  skills: [
    "React & Next.js",
    "TypeScript",
    "Node.js & Express",
    "PostgreSQL & Redis",
    "Tailwind CSS",
    "CI/CD & Docker",
    "System Architecture",
    "REST & GraphQL APIs",
    "Performance Optimization",
    "Agile Leadership"
  ],
  atsKeywords: [
    "Full-Stack Development",
    "TypeScript Architecture",
    "Scalable Cloud Systems",
    "Agile Sprint Planning",
    "Lighthouse Optimization",
    "Enterprise Security Standards"
  ]
};

interface AICVBuilderProps {
  onApplyWithCV?: (cv: CVData) => void;
  onConnectTalent?: (cv: CVData) => void;
}

export function AICVBuilder({ onApplyWithCV, onConnectTalent }: AICVBuilderProps) {
  const [cv, setCv] = useState<CVData>(() => getStoredCV() || INITIAL_CV);
  const [activeStep, setActiveStep] = useState<"info" | "experience" | "education" | "skills" | "preview">("info");
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [isEnhancingBullets, setIsEnhancingBullets] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<"modern" | "executive" | "minimal">("modern");
  const [customCert, setCustomCert] = useState("");
  const [customSkill, setCustomSkill] = useState("");
  const [aiTone, setAiTone] = useState("Executive & Metric-Heavy");

  // Call Server-side Gemini API to generate/enhance executive summary
  const handleGenerateSummary = async () => {
    setIsGeneratingSummary(true);
    try {
      const response = await fetch("/api/gemini/generate-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetRole: cv.targetRole || cv.professionalTitle,
          currentTitle: cv.professionalTitle,
          experienceYears: cv.experienceYears,
          skills: cv.skills,
          certifications: cv.certifications,
          rawSummary: cv.summary,
          tone: aiTone
        })
      });

      const data = await response.json();
      if (data && data.summary) {
        setCv(prev => ({
          ...prev,
          summary: data.summary,
          atsKeywords: data.atsKeywords && data.atsKeywords.length > 0 ? data.atsKeywords : prev.atsKeywords
        }));
      }
    } catch (err) {
      console.error("AI Generation error:", err);
      // Fallback
      setCv(prev => ({
        ...prev,
        summary: `Accomplished and results-driven ${prev.targetRole || prev.professionalTitle} with over ${prev.experienceYears || '5'} years of demonstrable expertise across high-growth digital environments. Recognized for delivering enterprise-grade architectures, cross-functional synergy, and measurable commercial value.`
      }));
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  // Enhance specific experience bullet points via Gemini
  const handleEnhanceBullets = async (expId: string) => {
    setIsEnhancingBullets(expId);
    const targetExp = cv.experiences.find(e => e.id === expId);
    if (!targetExp) return;

    try {
      const rawText = targetExp.bullets.join("\n") || targetExp.description;
      const response = await fetch("/api/gemini/enhance-bullets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: targetExp.role,
          company: targetExp.company,
          rawBullets: rawText
        })
      });

      const data = await response.json();
      if (data && data.enhancedBullets && data.enhancedBullets.length > 0) {
        setCv(prev => ({
          ...prev,
          experiences: prev.experiences.map(e => 
            e.id === expId ? { ...e, bullets: data.enhancedBullets } : e
          )
        }));
      }
    } catch (err) {
      console.error("Failed to enhance bullets:", err);
    } finally {
      setIsEnhancingBullets(null);
    }
  };

  const addExperience = () => {
    const newExp = {
      id: `exp-${Date.now()}`,
      role: "Software / Business Specialist",
      company: "Company Name Ltd",
      location: "Lagos, Nigeria",
      startDate: "2023",
      endDate: "Present",
      isCurrent: true,
      description: "Led key project deliverables and client coordination.",
      bullets: [
        "Spearheaded operational processes, improving turnaround velocity by 25%.",
        "Collaborated with cross-functional leadership to ensure regulatory and SLA compliance."
      ]
    };
    setCv(prev => ({ ...prev, experiences: [newExp, ...prev.experiences] }));
  };

  const removeExperience = (id: string) => {
    setCv(prev => ({ ...prev, experiences: prev.experiences.filter(e => e.id !== id) }));
  };

  const addEducation = () => {
    const newEdu = {
      id: `edu-${Date.now()}`,
      degree: "B.Sc. / Higher National Diploma",
      school: "Accredited University / Polytechnic",
      year: "2022",
      details: "Relevant coursework in engineering, commerce, or technical management."
    };
    setCv(prev => ({ ...prev, education: [...prev.education, newEdu] }));
  };

  const removeEducation = (id: string) => {
    setCv(prev => ({ ...prev, education: prev.education.filter(e => e.id !== id) }));
  };

  const toggleCert = (cert: string) => {
    setCv(prev => {
      const exists = prev.certifications.includes(cert);
      return {
        ...prev,
        certifications: exists 
          ? prev.certifications.filter(c => c !== cert)
          : [...prev.certifications, cert]
      };
    });
  };

  const addCustomCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (customCert.trim() && !cv.certifications.includes(customCert.trim())) {
      setCv(prev => ({ ...prev, certifications: [...prev.certifications, customCert.trim()] }));
      setCustomCert("");
    }
  };

  const addCustomSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (customSkill.trim() && !cv.skills.includes(customSkill.trim())) {
      setCv(prev => ({ ...prev, skills: [...prev.skills, customSkill.trim()] }));
      setCustomSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setCv(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }));
  };

  const handleCopyText = () => {
    const textCV = `
${cv.fullName.toUpperCase()}
${cv.professionalTitle}
Email: ${cv.email} | Phone: ${cv.phone} | Location: ${cv.location}
LinkedIn: ${cv.linkedin} | Portfolio: ${cv.portfolio}

PROFESSIONAL SUMMARY
${cv.summary}

CORE SKILLS & TECHNOLOGIES
${cv.skills.join(" • ")}

PROFESSIONAL CERTIFICATIONS
${cv.certifications.map(c => `• ${c}`).join("\n")}

WORK EXPERIENCE
${cv.experiences.map(e => `
${e.role.toUpperCase()} — ${e.company} (${e.startDate} - ${e.isCurrent ? 'Present' : e.endDate})
${e.bullets.map(b => `  * ${b}`).join("\n")}
`).join("\n")}

EDUCATION & ACADEMIC CREDENTIALS
${cv.education.map(ed => `• ${ed.degree} — ${ed.school} (${ed.year})\n  ${ed.details}`).join("\n")}
    `.trim();

    navigator.clipboard.writeText(textCV);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      {/* Top Banner / AI Feature Callout */}
      <div className="rounded-3xl p-6 md:p-8 bg-gradient-to-r from-[#0d1424] via-[#090d16] to-[#120e09] border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-mw-orange/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mw-orange/20 border border-mw-orange/30 text-mw-orange text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Next-Gen Gemini 3.8 AI Engine</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight">
              Create an ATS-Optimized Professional CV
            </h2>
            <p className="text-white/60 text-sm md:text-base mt-1.5 max-w-2xl leading-relaxed">
              Input your work history, certifications, and skills. Our AI dynamically generates executive summaries, writes quantifiable STAR-format achievement bullets, and tests ATS keyword density to help you stand out to premium employers.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveStep("preview")}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs md:text-sm font-semibold border border-white/10 transition-all"
            >
              <Eye className="w-4 h-4 text-mw-orange" />
              <span>View Live CV</span>
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-mw-orange hover:bg-mw-orange/90 text-white text-xs md:text-sm font-semibold transition-all shadow-lg shadow-mw-orange/20"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Step Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-white/10 touch-pan-x">
        {[
          { id: "info", label: "1. Personal & Target Role", icon: User },
          { id: "experience", label: "2. Work Experience", icon: Briefcase },
          { id: "education", label: "3. Education & Certifications", icon: GraduationCap },
          { id: "skills", label: "4. Skills & ATS Keywords", icon: Layers },
          { id: "preview", label: "5. Live CV Preview & Export", icon: FileText }
        ].map((step) => {
          const SIcon = step.icon;
          const isActive = activeStep === step.id;
          return (
            <button
              key={step.id}
              onClick={() => setActiveStep(step.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-medium whitespace-nowrap transition-all ${
                isActive
                  ? "bg-mw-orange text-white shadow-md shadow-mw-orange/20"
                  : "bg-white/5 hover:bg-white/10 text-white/70 hover:text-white"
              }`}
            >
              <SIcon className="w-4 h-4" />
              <span>{step.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Builder Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form Panel */}
        <div className={`space-y-6 ${activeStep === "preview" ? "lg:col-span-4" : "lg:col-span-7"}`}>
          
          {/* STEP 1: Personal Info & Summary */}
          {activeStep === "info" && (
            <div className="bg-[#090d16] rounded-2xl border border-white/10 p-6 md:p-8 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <h3 className="text-lg font-bold text-white">Candidate Identity & Target Role</h3>
                  <p className="text-xs text-white/50 mt-0.5">Basic contact information and target career focus</p>
                </div>
                <span className="text-xs font-mono text-mw-orange bg-mw-orange/10 px-2.5 py-1 rounded-md">Step 1 of 4</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">Full Name</label>
                  <input
                    type="text"
                    value={cv.fullName}
                    onChange={(e) => setCv({ ...cv, fullName: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-mw-orange"
                    placeholder="e.g. Chidera Eze"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">Current / Professional Title</label>
                  <input
                    type="text"
                    value={cv.professionalTitle}
                    onChange={(e) => setCv({ ...cv, professionalTitle: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-mw-orange"
                    placeholder="e.g. Senior Frontend Engineer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">Email Address</label>
                  <input
                    type="email"
                    value={cv.email}
                    onChange={(e) => setCv({ ...cv, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-mw-orange"
                    placeholder="e.g. name@example.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">Phone / WhatsApp</label>
                  <input
                    type="text"
                    value={cv.phone}
                    onChange={(e) => setCv({ ...cv, phone: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-mw-orange"
                    placeholder="e.g. +234 812 000 0000"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">Location (City, Country)</label>
                  <input
                    type="text"
                    value={cv.location}
                    onChange={(e) => setCv({ ...cv, location: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-mw-orange"
                    placeholder="e.g. Lagos, Nigeria"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">Years of Experience</label>
                  <select
                    value={cv.experienceYears}
                    onChange={(e) => setCv({ ...cv, experienceYears: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-mw-orange"
                  >
                    <option value="1-2 years" className="bg-[#090d16]">1 - 2 Years (Early Career)</option>
                    <option value="3-5 years" className="bg-[#090d16]">3 - 5 Years (Mid-Level)</option>
                    <option value="5+ years" className="bg-[#090d16]">5+ Years (Senior)</option>
                    <option value="8+ years" className="bg-[#090d16]">8+ Years (Lead / Director)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">LinkedIn Profile URL</label>
                  <input
                    type="text"
                    value={cv.linkedin}
                    onChange={(e) => setCv({ ...cv, linkedin: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-mw-orange"
                    placeholder="linkedin.com/in/yourhandle"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">Portfolio / GitHub / Link</label>
                  <input
                    type="text"
                    value={cv.portfolio}
                    onChange={(e) => setCv({ ...cv, portfolio: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-mw-orange"
                    placeholder="yourwebsite.com or github.com"
                  />
                </div>
              </div>

              {/* Target Role & AI Tone */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-mw-orange uppercase tracking-wider mb-1.5">
                      Target Role for AI Tailoring
                    </label>
                    <input
                      type="text"
                      value={cv.targetRole}
                      onChange={(e) => setCv({ ...cv, targetRole: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-mw-orange"
                      placeholder="e.g. Senior Project Manager (PMP)"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-mw-orange uppercase tracking-wider mb-1.5">
                      AI Generation Style / Tone
                    </label>
                    <select
                      value={aiTone}
                      onChange={(e) => setAiTone(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-mw-orange"
                    >
                      <option value="Executive & Metric-Heavy" className="bg-[#090d16]">Executive & Metric-Heavy</option>
                      <option value="Technical & Architecture-Oriented" className="bg-[#090d16]">Technical & Architecture-Oriented</option>
                      <option value="Client-Facing & Strategic Consultant" className="bg-[#090d16]">Client-Facing & Strategic Consultant</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Professional Summary */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <label className="text-xs font-semibold text-white/80 uppercase tracking-wider">
                    Executive Professional Summary
                  </label>
                  
                  <button
                    type="button"
                    onClick={handleGenerateSummary}
                    disabled={isGeneratingSummary}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-mw-orange to-amber-600 hover:from-mw-orange/90 hover:to-amber-500 text-white text-xs font-bold transition-all shadow-md shadow-mw-orange/20 disabled:opacity-50"
                  >
                    {isGeneratingSummary ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>AI Writing with Gemini...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>✨ AI Generate / Polish Summary</span>
                      </>
                    )}
                  </button>
                </div>

                <textarea
                  rows={4}
                  value={cv.summary}
                  onChange={(e) => setCv({ ...cv, summary: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-sm text-white leading-relaxed focus:outline-none focus:border-mw-orange"
                  placeholder="Enter or let Gemini craft your 3-sentence high-impact executive summary..."
                />
                <p className="text-[11px] text-white/40">
                  Tip: A high-impact summary states your title, primary value delivered, and industry specialization.
                </p>
              </div>

              <div className="flex justify-end pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setActiveStep("experience")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-mw-orange hover:bg-mw-orange/90 text-white text-sm font-semibold transition-all"
                >
                  <span>Continue to Work Experience</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Work Experience */}
          {activeStep === "experience" && (
            <div className="bg-[#090d16] rounded-2xl border border-white/10 p-6 md:p-8 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <h3 className="text-lg font-bold text-white">Work Experience & Key Impact</h3>
                  <p className="text-xs text-white/50 mt-0.5">Highlight your responsibilities and quantified accomplishments</p>
                </div>
                <button
                  type="button"
                  onClick={addExperience}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/10 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5 text-mw-orange" />
                  <span>Add Role</span>
                </button>
              </div>

              <div className="space-y-6">
                {cv.experiences.map((exp, index) => (
                  <div key={exp.id} className="p-5 rounded-xl bg-white/[0.02] border border-white/10 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-mw-orange">Experience #{index + 1}</span>
                      {cv.experiences.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeExperience(exp.id)}
                          className="text-red-400 hover:text-red-300 p-1 transition-colors"
                          title="Delete role"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-white/60 mb-1">Job Title / Role</label>
                        <input
                          type="text"
                          value={exp.role}
                          onChange={(e) => {
                            const val = e.target.value;
                            setCv(prev => ({
                              ...prev,
                              experiences: prev.experiences.map(item => item.id === exp.id ? { ...item, role: val } : item)
                            }));
                          }}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-white/60 mb-1">Employer / Company Name</label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => {
                            const val = e.target.value;
                            setCv(prev => ({
                              ...prev,
                              experiences: prev.experiences.map(item => item.id === exp.id ? { ...item, company: val } : item)
                            }));
                          }}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-white/60 mb-1">Start Year / Date</label>
                        <input
                          type="text"
                          value={exp.startDate}
                          onChange={(e) => {
                            const val = e.target.value;
                            setCv(prev => ({
                              ...prev,
                              experiences: prev.experiences.map(item => item.id === exp.id ? { ...item, startDate: val } : item)
                            }));
                          }}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                          placeholder="e.g. 2022"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-white/60 mb-1">End Year / Date</label>
                        <input
                          type="text"
                          value={exp.endDate}
                          onChange={(e) => {
                            const val = e.target.value;
                            setCv(prev => ({
                              ...prev,
                              experiences: prev.experiences.map(item => item.id === exp.id ? { ...item, endDate: val } : item)
                            }));
                          }}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                          placeholder="e.g. Present"
                        />
                      </div>
                    </div>

                    {/* Achievement Bullets */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold text-white/80">Achievement Bullets (One per line)</label>
                        <button
                          type="button"
                          onClick={() => handleEnhanceBullets(exp.id)}
                          disabled={isEnhancingBullets === exp.id}
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-mw-orange hover:text-mw-orange/80 transition-colors disabled:opacity-50"
                        >
                          {isEnhancingBullets === exp.id ? (
                            <>
                              <RefreshCw className="w-3 h-3 animate-spin" />
                              <span>AI Enhancing...</span>
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-3 h-3" />
                              <span>✨ AI Rewrite into STAR Metrics</span>
                            </>
                          )}
                        </button>
                      </div>

                      <textarea
                        rows={4}
                        value={exp.bullets.join("\n")}
                        onChange={(e) => {
                          const lines = e.target.value.split("\n");
                          setCv(prev => ({
                            ...prev,
                            experiences: prev.experiences.map(item => item.id === exp.id ? { ...item, bullets: lines } : item)
                          }));
                        }}
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs md:text-sm text-white font-mono leading-relaxed"
                        placeholder="• Architected mission-critical web application handling 50k DAU...&#10;• Reduced infrastructure spend by 25% through caching..."
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setActiveStep("info")}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 text-sm font-medium"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStep("education")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-mw-orange hover:bg-mw-orange/90 text-white text-sm font-semibold transition-all"
                >
                  <span>Continue to Education & Certifications</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Education & Certifications */}
          {activeStep === "education" && (
            <div className="bg-[#090d16] rounded-2xl border border-white/10 p-6 md:p-8 space-y-8">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <h3 className="text-lg font-bold text-white">Credentials & Professional Certifications</h3>
                  <p className="text-xs text-white/50 mt-0.5">Employers in the Mindware network actively filter by recognized certifications</p>
                </div>
                <span className="text-xs font-mono text-mw-orange bg-mw-orange/10 px-2.5 py-1 rounded-md">Step 3 of 4</span>
              </div>

              {/* Accredited Certifications Multi-select */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                      <Award className="w-4 h-4 text-mw-orange" />
                      <span>Select Your Accredited Certifications</span>
                    </h4>
                    <p className="text-xs text-white/50 mt-0.5">Click to toggle certifications you currently hold or are completing</p>
                  </div>
                  <span className="text-xs font-mono text-white/60">{cv.certifications.length} Selected</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {POPULAR_CERTIFICATIONS.map((cert) => {
                    const isSelected = cv.certifications.includes(cert);
                    return (
                      <button
                        key={cert}
                        type="button"
                        onClick={() => toggleCert(cert)}
                        className={`text-xs px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 ${
                          isSelected
                            ? "bg-mw-orange/20 border-mw-orange text-white font-semibold shadow-sm shadow-mw-orange/10"
                            : "bg-white/5 border-white/10 text-white/60 hover:text-white hover:border-white/20"
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 text-mw-orange" />}
                        <span>{cert}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Custom Certification Input */}
                <form onSubmit={addCustomCert} className="flex gap-2 pt-2">
                  <input
                    type="text"
                    value={customCert}
                    onChange={(e) => setCustomCert(e.target.value)}
                    placeholder="Add custom certification (e.g. Cisco CCNA, Scrum Master, ACCA)..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs md:text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-mw-orange"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors"
                  >
                    Add
                  </button>
                </form>
              </div>

              {/* Education History */}
              <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-blue-400" />
                    <span>Academic Degrees & Institutions</span>
                  </h4>
                  <button
                    type="button"
                    onClick={addEducation}
                    className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 font-medium"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Degree</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {cv.education.map((edu) => (
                    <div key={edu.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full mr-2">
                          <input
                            type="text"
                            value={edu.degree}
                            onChange={(e) => {
                              const val = e.target.value;
                              setCv(prev => ({
                                ...prev,
                                education: prev.education.map(ed => ed.id === edu.id ? { ...ed, degree: val } : ed)
                              }));
                            }}
                            placeholder="Degree (e.g. B.Sc. Mechanical Engineering)"
                            className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white"
                          />
                          <input
                            type="text"
                            value={edu.school}
                            onChange={(e) => {
                              const val = e.target.value;
                              setCv(prev => ({
                                ...prev,
                                education: prev.education.map(ed => ed.id === edu.id ? { ...ed, school: val } : ed)
                              }));
                            }}
                            placeholder="University / College"
                            className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white"
                          />
                          <input
                            type="text"
                            value={edu.year}
                            onChange={(e) => {
                              const val = e.target.value;
                              setCv(prev => ({
                                ...prev,
                                education: prev.education.map(ed => ed.id === edu.id ? { ...ed, year: val } : ed)
                              }));
                            }}
                            placeholder="Year (e.g. 2021)"
                            className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white"
                          />
                        </div>
                        {cv.education.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeEducation(edu.id)}
                            className="text-white/40 hover:text-red-400 p-1 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                      <input
                        type="text"
                        value={edu.details}
                        onChange={(e) => {
                          const val = e.target.value;
                          setCv(prev => ({
                            ...prev,
                            education: prev.education.map(ed => ed.id === edu.id ? { ...ed, details: val } : ed)
                          }));
                        }}
                        placeholder="Honours, key achievements, or coursework..."
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white/80"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setActiveStep("experience")}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 text-sm font-medium"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStep("skills")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-mw-orange hover:bg-mw-orange/90 text-white text-sm font-semibold transition-all"
                >
                  <span>Continue to Skills & ATS Keywords</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Skills & ATS Keywords */}
          {activeStep === "skills" && (
            <div className="bg-[#090d16] rounded-2xl border border-white/10 p-6 md:p-8 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <h3 className="text-lg font-bold text-white">Core Skills & ATS Keyword Optimizer</h3>
                  <p className="text-xs text-white/50 mt-0.5">Ensure your CV clears applicant tracking system (ATS) filters</p>
                </div>
                <span className="text-xs font-mono text-mw-orange bg-mw-orange/10 px-2.5 py-1 rounded-md">Step 4 of 4</span>
              </div>

              {/* Current Skills list */}
              <div className="space-y-3">
                <label className="text-xs font-semibold text-white/80 uppercase tracking-wider block">
                  Active Competencies & Tech Stack ({cv.skills.length})
                </label>
                
                <div className="flex flex-wrap gap-2">
                  {cv.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 text-white text-xs font-medium border border-white/10"
                    >
                      <span>{skill}</span>
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="text-white/40 hover:text-white transition-colors"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>

                <form onSubmit={addCustomSkill} className="flex gap-2 pt-2">
                  <input
                    type="text"
                    value={customSkill}
                    onChange={(e) => setCustomSkill(e.target.value)}
                    placeholder="Type skill & press Enter (e.g. Next.js, SEO Audits, PMP, Risk Analysis)..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs md:text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-mw-orange"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-mw-orange hover:bg-mw-orange/90 text-white text-xs font-semibold transition-colors"
                  >
                    Add Skill
                  </button>
                </form>
              </div>

              {/* Recommended ATS Keywords from AI */}
              {cv.atsKeywords && cv.atsKeywords.length > 0 && (
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-2">
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI-Recommended ATS Search Keywords</span>
                  </div>
                  <p className="text-xs text-white/70">
                    Recruiters searching for {cv.targetRole || "this role"} look for these exact terms in CVs. Click any term to add to your skills:
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {cv.atsKeywords.map((kw) => {
                      const alreadyHas = cv.skills.includes(kw);
                      return (
                        <button
                          key={kw}
                          type="button"
                          disabled={alreadyHas}
                          onClick={() => setCv(prev => ({ ...prev, skills: [...prev.skills, kw] }))}
                          className={`text-[11px] px-2.5 py-1 rounded-md transition-colors ${
                            alreadyHas
                              ? "bg-white/10 text-white/40 cursor-default"
                              : "bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30"
                          }`}
                        >
                          + {kw} {alreadyHas && "✓"}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setActiveStep("education")}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 text-sm font-medium"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStep("preview")}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-mw-orange hover:bg-mw-orange/90 text-white text-sm font-bold transition-all shadow-lg shadow-mw-orange/20"
                >
                  <FileText className="w-4 h-4" />
                  <span>Generate Final Professional CV</span>
                </button>
              </div>
            </div>
          )}

          {/* Quick Actions Panel when on Preview step */}
          {activeStep === "preview" && (
            <div className="bg-[#090d16] rounded-2xl border border-white/10 p-6 space-y-6">
              <div>
                <h3 className="text-base font-bold text-white">CV Styling & Actions</h3>
                <p className="text-xs text-white/50 mt-0.5">Customize format and export directly to employers</p>
              </div>

              {/* Template selector */}
              <div>
                <label className="text-xs font-semibold text-white/70 uppercase tracking-wider block mb-2">
                  Select Visual Layout
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "modern", label: "Executive Dark" },
                    { id: "executive", label: "Corporate White" },
                    { id: "minimal", label: "Clean Tech" }
                  ].map((tpl) => (
                    <button
                      key={tpl.id}
                      onClick={() => setSelectedTemplate(tpl.id as any)}
                      className={`text-xs py-2 px-2.5 rounded-lg border font-medium transition-all ${
                        selectedTemplate === tpl.id
                          ? "bg-mw-orange text-white border-mw-orange"
                          : "bg-white/5 text-white/60 border-white/10 hover:text-white"
                      }`}
                    >
                      {tpl.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Actions */}
              <div className="space-y-2.5 pt-2">
                <button
                  onClick={handlePrint}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-mw-orange hover:bg-mw-orange/90 text-white text-sm font-bold transition-all shadow-lg shadow-mw-orange/20"
                >
                  <Download className="w-4 h-4" />
                  <span>Download / Print as PDF</span>
                </button>

                <button
                  onClick={handleCopyText}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs md:text-sm font-medium border border-white/10 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-white/70" />
                      <span>Copy Structured Text</span>
                    </>
                  )}
                </button>

                {onApplyWithCV && (
                  <button
                    onClick={() => {
                      saveStoredCV(cv);
                      onApplyWithCV(cv);
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold transition-all shadow-lg shadow-emerald-600/20"
                  >
                    <Briefcase className="w-4 h-4" />
                    <span>Apply to Open Jobs with this CV</span>
                  </button>
                )}

                {onConnectTalent && (
                  <button
                    onClick={() => {
                      saveStoredCV(cv);
                      onConnectTalent(cv);
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 text-xs md:text-sm font-semibold transition-all"
                  >
                    <Award className="w-4 h-4 text-blue-400" />
                    <span>Publish to Mindware Employer Talent Pool</span>
                  </button>
                )}

                <button
                  onClick={() => setActiveStep("info")}
                  className="w-full py-2 text-xs text-white/50 hover:text-white transition-colors text-center"
                >
                  ← Edit CV Fields
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Live Preview Panel */}
        <div className={`space-y-4 ${activeStep === "preview" ? "lg:col-span-8" : "hidden lg:block lg:col-span-5"}`}>
          
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold text-white/70 uppercase tracking-wider">Live ATS Preview Sheet</span>
            </div>
            <span className="text-[11px] text-white/40">Standard A4 Format</span>
          </div>

          {/* Printable CV Canvas container */}
          <div 
            id="mindware-cv-document"
            className={`rounded-2xl transition-all shadow-2xl p-4 sm:p-8 md:p-10 border ${
              selectedTemplate === "executive"
                ? "bg-[#ffffff] text-[#111827] border-slate-300"
                : selectedTemplate === "minimal"
                ? "bg-[#050811] text-[#e2e8f0] border-white/10 font-mono"
                : "bg-[#0b101d] text-white border-white/10"
            }`}
          >
            {/* Header */}
            <div className={`pb-6 border-b ${selectedTemplate === "executive" ? "border-slate-200" : "border-white/10"}`}>
              <h1 className={`text-2xl sm:text-3xl font-display font-bold tracking-tight ${selectedTemplate === "executive" ? "text-slate-900" : "text-white"}`}>
                {cv.fullName || "Your Full Name"}
              </h1>
              <p className={`text-sm sm:text-base font-medium mt-1 ${selectedTemplate === "executive" ? "text-amber-700" : "text-mw-orange"}`}>
                {cv.professionalTitle || "Professional Title"}
              </p>

              <div className={`flex flex-wrap gap-x-4 gap-y-1 mt-3 text-xs ${selectedTemplate === "executive" ? "text-slate-600" : "text-white/60"}`}>
                <span>{cv.email}</span>
                <span>•</span>
                <span>{cv.phone}</span>
                <span>•</span>
                <span>{cv.location}</span>
                {cv.linkedin && (
                  <>
                    <span>•</span>
                    <span>{cv.linkedin}</span>
                  </>
                )}
                {cv.portfolio && (
                  <>
                    <span>•</span>
                    <span>{cv.portfolio}</span>
                  </>
                )}
              </div>
            </div>

            {/* Professional Summary */}
            {cv.summary && (
              <div className={`py-5 border-b ${selectedTemplate === "executive" ? "border-slate-200" : "border-white/10"}`}>
                <h2 className={`text-xs font-bold uppercase tracking-widest mb-2 ${selectedTemplate === "executive" ? "text-slate-900" : "text-mw-orange"}`}>
                  Executive Professional Summary
                </h2>
                <p className={`text-xs sm:text-sm leading-relaxed ${selectedTemplate === "executive" ? "text-slate-700" : "text-white/80"}`}>
                  {cv.summary}
                </p>
              </div>
            )}

            {/* Core Skills */}
            {cv.skills && cv.skills.length > 0 && (
              <div className={`py-5 border-b ${selectedTemplate === "executive" ? "border-slate-200" : "border-white/10"}`}>
                <h2 className={`text-xs font-bold uppercase tracking-widest mb-2.5 ${selectedTemplate === "executive" ? "text-slate-900" : "text-mw-orange"}`}>
                  Core Competencies & Technologies
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {cv.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`text-xs px-2.5 py-1 rounded-md font-medium ${
                        selectedTemplate === "executive"
                          ? "bg-slate-100 text-slate-800 border border-slate-200"
                          : "bg-white/10 text-white/90 border border-white/5"
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Professional Certifications */}
            {cv.certifications && cv.certifications.length > 0 && (
              <div className={`py-5 border-b ${selectedTemplate === "executive" ? "border-slate-200" : "border-white/10"}`}>
                <h2 className={`text-xs font-bold uppercase tracking-widest mb-2.5 ${selectedTemplate === "executive" ? "text-slate-900" : "text-mw-orange"}`}>
                  Accredited Professional Certifications
                </h2>
                <ul className="space-y-1.5">
                  {cv.certifications.map((c) => (
                    <li key={c} className={`text-xs sm:text-sm flex items-start gap-2 ${selectedTemplate === "executive" ? "text-slate-800" : "text-white/90"}`}>
                      <span className={selectedTemplate === "executive" ? "text-amber-700" : "text-mw-orange"}>✓</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Work Experience */}
            {cv.experiences && cv.experiences.length > 0 && (
              <div className={`py-5 border-b ${selectedTemplate === "executive" ? "border-slate-200" : "border-white/10"}`}>
                <h2 className={`text-xs font-bold uppercase tracking-widest mb-4 ${selectedTemplate === "executive" ? "text-slate-900" : "text-mw-orange"}`}>
                  Professional Work Experience
                </h2>
                
                <div className="space-y-5">
                  {cv.experiences.map((exp) => (
                    <div key={exp.id} className="space-y-1.5">
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                        <div className="font-bold text-sm sm:text-base">
                          {exp.role} <span className={`font-normal ${selectedTemplate === "executive" ? "text-slate-600" : "text-white/60"}`}>| {exp.company}</span>
                        </div>
                        <span className={`text-xs font-mono shrink-0 ${selectedTemplate === "executive" ? "text-slate-500" : "text-white/50"}`}>
                          {exp.startDate} - {exp.isCurrent ? "Present" : exp.endDate}
                        </span>
                      </div>

                      <ul className={`space-y-1 pt-1 ${selectedTemplate === "executive" ? "text-slate-700" : "text-white/80"}`}>
                        {exp.bullets.map((bullet, idx) => (
                          <li key={idx} className="text-xs sm:text-sm flex items-start gap-2 leading-relaxed">
                            <span className="text-mw-orange mt-1">•</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {cv.education && cv.education.length > 0 && (
              <div className="pt-5">
                <h2 className={`text-xs font-bold uppercase tracking-widest mb-3 ${selectedTemplate === "executive" ? "text-slate-900" : "text-mw-orange"}`}>
                  Education & Academic Qualifications
                </h2>
                
                <div className="space-y-3">
                  {cv.education.map((edu) => (
                    <div key={edu.id} className="text-xs sm:text-sm">
                      <div className="flex justify-between items-baseline">
                        <span className="font-bold">{edu.degree}</span>
                        <span className={`text-xs font-mono ${selectedTemplate === "executive" ? "text-slate-500" : "text-white/50"}`}>{edu.year}</span>
                      </div>
                      <p className={selectedTemplate === "executive" ? "text-slate-600" : "text-white/60"}>{edu.school}</p>
                      {edu.details && (
                        <p className={`text-[11px] mt-0.5 ${selectedTemplate === "executive" ? "text-slate-500" : "text-white/50"}`}>{edu.details}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
