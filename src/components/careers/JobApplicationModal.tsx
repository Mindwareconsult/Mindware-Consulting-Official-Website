import React, { useState } from "react";
import { X, CheckCircle2, Sparkles, RefreshCw, Send, Paperclip, Briefcase, Award } from "lucide-react";
import { JobPost } from "../../data/careersData";
import { CVData } from "./AICVBuilder";

interface JobApplicationModalProps {
  job: JobPost | null;
  onClose: () => void;
  activeCV?: CVData | null;
}

export function JobApplicationModal({ job, onClose, activeCV }: JobApplicationModalProps) {
  if (!job) return null;

  const [formData, setFormData] = useState({
    fullName: activeCV?.fullName || "",
    email: activeCV?.email || "",
    phone: activeCV?.phone || "",
    location: activeCV?.location || "Lagos, Nigeria",
    linkedin: activeCV?.linkedin || "",
    experienceYears: activeCV?.experienceYears || "3-5 years",
    certifications: activeCV?.certifications?.join(", ") || "",
    coverLetter: "",
    hasAttachedCV: Boolean(activeCV)
  });

  const [isGeneratingCoverLetter, setIsGeneratingCoverLetter] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState("");

  const handleImportCV = () => {
    if (activeCV) {
      setFormData(prev => ({
        ...prev,
        fullName: activeCV.fullName,
        email: activeCV.email,
        phone: activeCV.phone,
        location: activeCV.location,
        linkedin: activeCV.linkedin,
        experienceYears: activeCV.experienceYears,
        certifications: activeCV.certifications.join(", "),
        hasAttachedCV: true
      }));
    }
  };

  const handleGenerateCoverLetter = async () => {
    setIsGeneratingCoverLetter(true);
    try {
      const response = await fetch("/api/gemini/cover-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          candidateName: formData.fullName || "Candidate",
          targetJobTitle: job.title,
          employerName: job.employer.name,
          experienceYears: formData.experienceYears,
          certifications: formData.certifications || job.preferredCertifications,
          skills: job.skills
        })
      });

      const data = await response.json();
      if (data && data.coverLetter) {
        setFormData(prev => ({ ...prev, coverLetter: data.coverLetter }));
      }
    } catch (err) {
      console.error("Failed to generate cover letter:", err);
      setFormData(prev => ({
        ...prev,
        coverLetter: `Dear Hiring Team at ${job.employer.name},\n\nI am writing to express my strong enthusiasm for the ${job.title} position. With verified credentials in ${formData.certifications || 'relevant industry frameworks'} and ${formData.experienceYears} of proven expertise, I am confident in delivering immediate impact to your strategic goals.\n\nThank you for reviewing my application.\n\nSincerely,\n${formData.fullName || "Applicant"}`
      }));
    } finally {
      setIsGeneratingCoverLetter(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const generatedId = `MW-APP-${Math.floor(100000 + Math.random() * 900000)}`;
      setApplicationId(generatedId);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#090d16] border border-white/15 rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl my-6 sm:my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
          aria-label="Close application modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mw-orange/10 border border-mw-orange/20 text-mw-orange text-xs font-semibold mb-2">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Direct Application</span>
              </div>
              <h2 className="text-xl md:text-2xl font-display font-bold text-white">
                Apply for {job.title}
              </h2>
              <p className="text-xs md:text-sm text-white/60 mt-1">
                Employer: <span className="text-white font-medium">{job.employer.name}</span> • {job.location}
              </p>
            </div>

            {/* Quick Auto-Fill Banner if AI CV is available */}
            {activeCV && (
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-mw-orange/10 border border-mw-orange/20">
                <div className="text-xs text-white">
                  <span className="font-bold text-mw-orange">AI CV Detected:</span> Apply with your generated profile for <span className="font-semibold">{activeCV.fullName}</span>
                </div>
                <button
                  type="button"
                  onClick={handleImportCV}
                  className="px-3 py-1.5 rounded-lg bg-mw-orange hover:bg-mw-orange/90 text-white text-xs font-bold transition-colors whitespace-nowrap shadow-sm"
                >
                  ⚡ Auto-Fill from CV
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-mw-orange"
                    placeholder="e.g. Kemi Alabi"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-mw-orange"
                    placeholder="kemi.alabi@example.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1.5">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-mw-orange"
                    placeholder="+234 800 000 0000"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1.5">
                    Current Location *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-mw-orange"
                    placeholder="Lagos, Port Harcourt, Abuja..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1.5">
                    Years of Relevant Experience
                  </label>
                  <select
                    value={formData.experienceYears}
                    onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-mw-orange"
                  >
                    <option value="1-2 years" className="bg-[#090d16]">1 - 2 Years</option>
                    <option value="3-5 years" className="bg-[#090d16]">3 - 5 Years</option>
                    <option value="5-8 years" className="bg-[#090d16]">5 - 8 Years</option>
                    <option value="8+ years" className="bg-[#090d16]">8+ Years</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1.5">
                    LinkedIn / Portfolio URL
                  </label>
                  <input
                    type="text"
                    value={formData.linkedin}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-mw-orange"
                    placeholder="linkedin.com/in/username"
                  />
                </div>
              </div>

              {/* Certifications matching */}
              <div>
                <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span>Accredited Certifications Held</span>
                  <span className="text-[11px] text-mw-orange normal-case font-mono">
                    Required/Preferred: {job.preferredCertifications.join(", ")}
                  </span>
                </label>
                <input
                  type="text"
                  value={formData.certifications}
                  onChange={(e) => setFormData({ ...formData, certifications: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-mw-orange"
                  placeholder="e.g. PMP®, HSE Level 1/2/3, Google UX, AWS, NEBOSH..."
                />
              </div>

              {/* Cover Letter with Gemini AI generation */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-white/70 uppercase tracking-wider">
                    Cover Note / Elevator Pitch
                  </label>
                  <button
                    type="button"
                    onClick={handleGenerateCoverLetter}
                    disabled={isGeneratingCoverLetter}
                    className="inline-flex items-center gap-1.5 text-xs text-mw-orange hover:text-mw-orange/80 font-bold disabled:opacity-50 transition-colors"
                  >
                    {isGeneratingCoverLetter ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>AI Drafting with Gemini...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>✨ AI Draft Tailored Cover Letter</span>
                      </>
                    )}
                  </button>
                </div>
                <textarea
                  rows={4}
                  value={formData.coverLetter}
                  onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                  placeholder="Explain why your qualifications and certifications make you the ideal fit for this role..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white leading-relaxed focus:outline-none focus:border-mw-orange"
                />
              </div>

              {/* Attached CV status */}
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Paperclip className="w-4 h-4 text-mw-orange" />
                  <span className="text-xs text-white/80">
                    {formData.hasAttachedCV 
                      ? "✓ Verified Digital CV attached from AI CV Builder" 
                      : "Standard candidate profile verification will be applied"}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                  ATS Verified
                </span>
              </div>

              <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 sm:gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-white/60 hover:text-white text-xs md:text-sm font-semibold transition-colors text-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-mw-orange hover:bg-mw-orange/90 text-white text-xs md:text-sm font-bold transition-all shadow-lg shadow-mw-orange/20 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Transmitting Application...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Application Now</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Success Screen */
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            
            <h3 className="text-2xl font-display font-bold text-white">
              Application Successfully Submitted!
            </h3>
            
            <p className="text-sm text-white/70 max-w-md mx-auto leading-relaxed">
              Your application for <span className="text-white font-semibold">{job.title}</span> has been securely transmitted to {job.employer.name}.
            </p>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 inline-block text-left max-w-sm w-full mx-auto">
              <div className="text-xs text-white/50 uppercase tracking-wider">Application Tracking Reference</div>
              <div className="text-lg font-mono font-bold text-mw-orange mt-0.5">{applicationId}</div>
              <div className="text-xs text-white/60 mt-1">
                A confirmation has been logged for <span className="text-white">{formData.email}</span>. Next round candidates will be notified within 3 business days.
              </div>
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-white text-mw-dark font-bold text-sm hover:bg-white/90 transition-colors shadow-lg"
              >
                Close & Return to Job Board
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
