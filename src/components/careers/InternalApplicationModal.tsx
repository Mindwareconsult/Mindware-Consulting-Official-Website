import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  CheckCircle2,
  Send,
  Briefcase,
  User,
  Mail,
  Phone,
  MapPin,
  Link2,
  Upload,
  ShieldCheck,
  Sparkles,
  ArrowRight
} from "lucide-react";
import {
  InternalJobVacancy,
  InternalDiscipline,
  InternalEngagementType,
  INTERNAL_DISCIPLINES,
  INTERNAL_ENGAGEMENT_TYPES
} from "../../data/careersData";

interface InternalApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  vacancy: InternalJobVacancy | null;
  mode: "vacancy" | "general";
}

export function InternalApplicationModal({
  isOpen,
  onClose,
  vacancy,
  mode
}: InternalApplicationModalProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [discipline, setDiscipline] = useState<InternalDiscipline>(
    vacancy?.discipline || "Website design & development"
  );
  const [engagementType, setEngagementType] = useState<InternalEngagementType>(
    vacancy?.engagementType || "Full-time"
  );
  const [experienceYears, setExperienceYears] = useState("3-5 years");
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [cvFileName, setCvFileName] = useState("");
  const [motivation, setMotivation] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (vacancy) {
      setDiscipline(vacancy.discipline);
      setEngagementType(vacancy.engagementType);
    }
    setSubmittedRef(null);
    setErrorMsg(null);
    setIsSubmitting(false);
  }, [vacancy, mode, isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const allowedExt = /\.(pdf|doc|docx)$/i;
    const maxBytes = 5 * 1024 * 1024;
    if (!allowedExt.test(file.name)) {
      setErrorMsg("Unsupported CV format. Please select a PDF, DOC, or DOCX document.");
      setCvFileName("");
      e.target.value = "";
      return;
    }
    if (file.size > maxBytes) {
      setErrorMsg("Selected CV file exceeds the 5 MB limit. Please choose a smaller file.");
      setCvFileName("");
      e.target.value = "";
      return;
    }
    setErrorMsg(null);
    setCvFileName(`${file.name} (${Math.max(1, Math.round(file.size / 1024))} KB)`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!fullName.trim() || !email.trim() || !phone.trim() || !motivation.trim()) {
      setErrorMsg("Please complete your full name, email address, phone/WhatsApp number, and suitability summary.");
      return;
    }

    setErrorMsg(null);
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/careers/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _hp: honeypot,
          mode,
          vacancyCode: vacancy?.code || "",
          vacancyTitle: vacancy?.title || "",
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          location: location.trim(),
          discipline,
          engagementType,
          experienceYears,
          portfolioUrl: portfolioUrl.trim(),
          cvFileName,
          motivation: motivation.trim(),
        }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data?.success) {
        throw new Error(
          data?.error || "Unable to record your application right now. Please email your CV directly to contact@mindwareconsult.com.ng."
        );
      }

      setSubmittedRef(data.referenceId || "MW-EOI-CONFIRMED");
    } catch (err: any) {
      setSubmittedRef(null);
      setErrorMsg(
        err?.message || "Network error submitting application. Please send your CV directly to contact@mindwareconsult.com.ng."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setSubmittedRef(null);
    setErrorMsg(null);
    setIsSubmitting(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="internal-apply-heading"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          className="relative w-full max-w-2xl bg-[#070b18] border border-white/15 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-white/10 flex items-start justify-between gap-4 bg-[#0b1124]">
            <div>
              <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-mw-orange mb-1">
                <Briefcase className="w-3.5 h-3.5" />
                <span>
                  {mode === "vacancy" && vacancy
                    ? `Internal Vacancy · ${vacancy.code}`
                    : "General Expression of Interest · Mindware Consulting Ltd"}
                </span>
              </div>
              <h2 id="internal-apply-heading" className="text-lg sm:text-xl font-display font-bold text-white">
                {mode === "vacancy" && vacancy
                  ? `Apply: ${vacancy.title}`
                  : "Submit Your Specialist Profile to Mindware"}
              </h2>
            </div>
            <button
              type="button"
              onClick={resetAndClose}
              className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close application modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto space-y-5">
            {submittedRef ? (
              <div className="py-6 text-center space-y-5">
                <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </div>
                <div className="space-y-2 max-w-md mx-auto">
                  <div className="text-xs font-mono uppercase tracking-wider text-emerald-400">
                    Reference ID: {submittedRef}
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white">
                    Application Logged for Review
                  </h3>
                  <p className="text-sm text-white/70 leading-relaxed">
                    Thank you, <span className="text-white font-medium">{fullName}</span>. Your{" "}
                    {mode === "vacancy" && vacancy ? `application for ${vacancy.title}` : "Expression of Interest"}{" "}
                    under <span className="text-mw-orange">{discipline}</span> ({engagementType}) has been prepared for our internal hiring team.
                  </p>
                </div>

                <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 text-left text-xs text-white/70 space-y-2 max-w-lg mx-auto">
                  <div className="font-semibold text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-mw-orange shrink-0" />
                    <span>Direct Follow-Up Option</span>
                  </div>
                  <p className="leading-relaxed">
                    To attach your PDF CV directly or follow up immediately with Mindware HR, send your file referencing{" "}
                    <strong className="text-white">{submittedRef}</strong> to{" "}
                    <a
                      href={`mailto:contact@mindwareconsult.com.ng?subject=${encodeURIComponent(
                        `[${submittedRef}] ${mode === "vacancy" && vacancy ? vacancy.title : `Expression of Interest - ${discipline}`}`
                      )}`}
                      className="text-mw-orange underline"
                    >
                      contact@mindwareconsult.com.ng
                    </a>
                    .
                  </p>
                </div>

                <button
                  type="button"
                  onClick={resetAndClose}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-mw-orange hover:bg-amber-600 text-white text-sm font-semibold transition-colors"
                >
                  <span>Return to Mindware Careers</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="website_url_confirm"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="sr-only"
                />
                {errorMsg && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-white/75 mb-1.5">
                      Full Name <span className="text-mw-orange">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Chinedu Okafor"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-mw-orange"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-white/75 mb-1.5">
                      Email Address <span className="text-mw-orange">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@domain.com"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-mw-orange"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-white/75 mb-1.5">
                      Phone / WhatsApp Number <span className="text-mw-orange">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+234 800 000 0000"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-mw-orange"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-white/75 mb-1.5">
                      Current City / State
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Lagos / Abuja / Remote"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-mw-orange"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-white/75 mb-1.5">
                      Practice Discipline <span className="text-mw-orange">*</span>
                    </label>
                    <select
                      value={discipline}
                      onChange={(e) => setDiscipline(e.target.value as InternalDiscipline)}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#0d1428] border border-white/10 text-sm text-white focus:outline-none focus:border-mw-orange"
                    >
                      {INTERNAL_DISCIPLINES.map((d) => (
                        <option key={d.name} value={d.name}>
                          {d.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-white/75 mb-1.5">
                      Preferred Engagement Model <span className="text-mw-orange">*</span>
                    </label>
                    <select
                      value={engagementType}
                      onChange={(e) => setEngagementType(e.target.value as InternalEngagementType)}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#0d1428] border border-white/10 text-sm text-white focus:outline-none focus:border-mw-orange"
                    >
                      {INTERNAL_ENGAGEMENT_TYPES.map((e) => (
                        <option key={e.type} value={e.type}>
                          {e.type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-white/75 mb-1.5">
                      Years of Relevant Experience
                    </label>
                    <select
                      value={experienceYears}
                      onChange={(e) => setExperienceYears(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#0d1428] border border-white/10 text-sm text-white focus:outline-none focus:border-mw-orange"
                    >
                      <option value="0-1 year (Graduate / Fellow)">0-1 year (Graduate / Fellow)</option>
                      <option value="1-2 years">1-2 years</option>
                      <option value="3-5 years">3-5 years</option>
                      <option value="5-8 years">5-8 years</option>
                      <option value="8+ years (Principal / Lead)">8+ years (Principal / Lead)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-white/75 mb-1.5">
                      LinkedIn / Portfolio / GitHub URL
                    </label>
                    <div className="relative">
                      <Link2 className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="url"
                        value={portfolioUrl}
                        onChange={(e) => setPortfolioUrl(e.target.value)}
                        placeholder="https://linkedin.com/in/..."
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-mw-orange"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/75 mb-1.5">
                    Attach CV / Resume (PDF or DOCX)
                  </label>
                  <label className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-dashed border-white/20 hover:border-mw-orange/50 cursor-pointer transition-colors">
                    <div className="flex items-center gap-3 text-xs text-white/70">
                      <Upload className="w-4 h-4 text-mw-orange shrink-0" />
                      <span>{cvFileName || "Select PDF or DOCX resume file (optional if portfolio linked)"}</span>
                    </div>
                    <span className="text-[11px] font-semibold text-mw-orange shrink-0">Browse</span>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/75 mb-1.5">
                    Why Mindware & Relevant Outcomes Achieved <span className="text-mw-orange">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={motivation}
                    onChange={(e) => setMotivation(e.target.value)}
                    placeholder="Briefly highlight measurable projects, campaigns, systems, or business growth outcomes you have delivered..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-mw-orange resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-white/10">
                  <div className="flex items-center gap-2 text-[11px] text-white/55">
                    <Sparkles className="w-3.5 h-3.5 text-mw-orange shrink-0" />
                    <span>Confidentially processed solely for internal Mindware Consulting Ltd recruitment assessment.</span>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-mw-orange hover:bg-amber-600 text-white text-sm font-semibold transition-colors shadow-lg shadow-mw-orange/20 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? "Submitting..." : "Submit Application"}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
