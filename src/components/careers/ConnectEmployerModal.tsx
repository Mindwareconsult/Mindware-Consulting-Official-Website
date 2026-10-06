import React, { useState } from "react";
import { X, CheckCircle2, Send, Building2, Award, Mail, Phone, RefreshCw } from "lucide-react";
import { TalentCandidate } from "../../data/careersData";

interface ConnectEmployerModalProps {
  candidate: TalentCandidate | null;
  onClose: () => void;
}

export function ConnectEmployerModal({ candidate, onClose }: ConnectEmployerModalProps) {
  if (!candidate) return null;

  const [companyName, setCompanyName] = useState("");
  const [recruiterName, setRecruiterName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [roleTitle, setRoleTitle] = useState(candidate.role);
  const [message, setMessage] = useState(
    `Hello ${candidate.name},\n\nWe came across your verified credentials in ${candidate.certifications.join(", ")} via the Mindware Talent Network and are very impressed by your background. We are actively hiring for a ${candidate.role} and would like to invite you for an exploratory conversation.`
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSent(true);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#090d16] border border-white/15 rounded-3xl p-6 md:p-8 shadow-2xl my-8">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!sent ? (
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold mb-2">
                <Building2 className="w-3.5 h-3.5" />
                <span>Employer Direct Outreach</span>
              </div>
              <h2 className="text-xl md:text-2xl font-display font-bold text-white">
                Connect with {candidate.name}
              </h2>
              <p className="text-xs md:text-sm text-white/60 mt-1">
                Candidate Specialization: <span className="text-white font-medium">{candidate.role}</span> • {candidate.location}
              </p>
            </div>

            {/* Candidate Credentials highlight */}
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
              <div className="text-xs text-white/60 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-mw-orange" />
                <span>Verified Candidate Credentials</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {candidate.certifications.map(c => (
                  <span key={c} className="text-[11px] px-2 py-0.5 rounded bg-mw-orange/20 text-mw-orange font-semibold">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1">
                    Your Company / Enterprise *
                  </label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Zenith Tech & Infrastructure"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs md:text-sm text-white focus:outline-none focus:border-mw-orange"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1">
                    Hiring Manager / Recruiter Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={recruiterName}
                    onChange={(e) => setRecruiterName(e.target.value)}
                    placeholder="e.g. Dr. Ngozi Okafor"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs md:text-sm text-white focus:outline-none focus:border-mw-orange"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="recruitment@company.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs md:text-sm text-white focus:outline-none focus:border-mw-orange"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1">
                    Position You're Hiring For *
                  </label>
                  <input
                    type="text"
                    required
                    value={roleTitle}
                    onChange={(e) => setRoleTitle(e.target.value)}
                    placeholder="e.g. Senior Project Manager"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs md:text-sm text-white focus:outline-none focus:border-mw-orange"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1">
                  Message / Interview Invitation
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs md:text-sm text-white leading-relaxed focus:outline-none focus:border-mw-orange"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-white/60 hover:text-white text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-mw-orange hover:bg-mw-orange/90 text-white text-xs md:text-sm font-bold transition-all shadow-lg shadow-mw-orange/20"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Sending Connection...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Interview Invitation</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            
            <h3 className="text-xl md:text-2xl font-display font-bold text-white">
              Invitation Dispatched!
            </h3>
            
            <p className="text-xs md:text-sm text-white/70 max-w-sm mx-auto leading-relaxed">
              Your connection request has been routed directly to <span className="text-white font-semibold">{candidate.name}</span>. Their response will be forwarded to <span className="text-white font-semibold">{email}</span>.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 rounded-xl bg-white text-mw-dark font-bold text-xs hover:bg-white/90 transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
