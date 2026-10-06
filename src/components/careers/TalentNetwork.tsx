import React, { useState } from "react";
import { 
  Users, 
  Award, 
  Search, 
  Filter, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Send, 
  MapPin, 
  ShieldCheck, 
  Briefcase,
  Layers,
  Clock,
  UserCheck
} from "lucide-react";
import { TALENT_POOL_SAMPLE, TalentCandidate, POPULAR_CERTIFICATIONS } from "../../data/careersData";
import { ConnectEmployerModal } from "./ConnectEmployerModal";
import { CVData } from "./AICVBuilder";
import { getStoredCV } from "../../lib/cvStorage";

interface TalentNetworkProps {
  activeCV?: CVData | null;
  onNavigateToBuilder?: () => void;
}

export function TalentNetwork({ activeCV: propCV, onNavigateToBuilder }: TalentNetworkProps) {
  const activeCV = propCV || getStoredCV();
  const [candidates, setCandidates] = useState<TalentCandidate[]>(() => {
    if (activeCV) {
      const activeUserCandidate: TalentCandidate = {
        id: "cand-active-user",
        name: activeCV.fullName || "Candidate Profile",
        role: activeCV.targetRole || activeCV.professionalTitle,
        location: activeCV.location || "Nigeria",
        experienceYears: parseInt(activeCV.experienceYears) || 4,
        availability: "Immediate",
        bio: activeCV.summary || "Certified digital and technical specialist ready for high-growth enterprise opportunities.",
        certifications: activeCV.certifications.length > 0 ? activeCV.certifications : ["Verified Mindware Certified"],
        skills: activeCV.skills.slice(0, 6),
        education: activeCV.education[0]?.degree || "Accredited University",
        verified: true,
        openToRemote: true,
        matchScore: 99
      };
      return [activeUserCandidate, ...TALENT_POOL_SAMPLE];
    }
    return TALENT_POOL_SAMPLE;
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCert, setSelectedCert] = useState("All");
  const [selectedCandidateForConnect, setSelectedCandidateForConnect] = useState<TalentCandidate | null>(null);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [employerMandateOpen, setEmployerMandateOpen] = useState(false);

  // Filter candidates
  const filteredCandidates = candidates.filter((c) => {
    const matchesSearch = 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      c.certifications.some(cert => cert.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCert = 
      selectedCert === "All" ||
      c.certifications.some(cert => cert.toLowerCase().includes(selectedCert.toLowerCase()));

    return matchesSearch && matchesCert;
  });

  return (
    <div className="space-y-8">
      {/* Hero Header for Talent Network */}
      <div className="rounded-3xl p-6 md:p-8 bg-gradient-to-br from-[#0c1426] via-[#090d16] to-[#120a10] border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold mb-3">
              <Users className="w-3.5 h-3.5" />
              <span>Mindware Talent Exchange</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight">
              Connect With Employers Seeking Your Qualifications
            </h2>
            <p className="text-white/60 text-sm md:text-base mt-1.5 max-w-2xl leading-relaxed">
              We connect certified professionals (PMP®, HSE 1-3, Tech, Marketing, Data Analytics) with top Nigerian and global enterprise employers actively seeking their specific certifications.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setEmployerMandateOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs md:text-sm font-semibold border border-white/10 transition-colors"
            >
              For Employers: Post Hiring Mandate
            </button>
            <button
              onClick={onNavigateToBuilder}
              className="px-4 py-2.5 rounded-xl bg-mw-orange hover:bg-mw-orange/90 text-white text-xs md:text-sm font-bold transition-all shadow-lg shadow-mw-orange/20"
            >
              Create / Update CV First
            </button>
          </div>
        </div>
      </div>

      {/* Candidate Status / Qualification Match Card */}
      {activeCV && (
        <div className="rounded-2xl bg-gradient-to-r from-emerald-950/40 via-[#090d16] to-[#090d16] border border-emerald-500/30 p-5 md:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <UserCheck className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">{activeCV.fullName}</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold">
                  ACTIVE IN TALENT NETWORK
                </span>
              </div>
              <p className="text-xs text-white/60 mt-0.5">
                Target: {activeCV.targetRole || activeCV.professionalTitle} • {activeCV.certifications.length} Verified Certifications
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-stretch sm:self-auto justify-between sm:justify-end border-t sm:border-t-0 border-white/10 pt-3 sm:pt-0">
            <div className="text-left sm:text-right">
              <div className="text-[11px] text-white/40">Employer Qualification Match</div>
              <div className="text-base font-bold text-emerald-400 font-mono">98% High Alignment</div>
            </div>
            <button
              onClick={onNavigateToBuilder}
              className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-semibold"
            >
              Edit Profile
            </button>
          </div>
        </div>
      )}

      {/* Directory Filter Bar */}
      <div className="bg-[#090d16] rounded-2xl border border-white/10 p-5 md:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter candidates by skill, certification, role..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs md:text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-mw-orange"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <span className="text-xs text-white/50 whitespace-nowrap">Cert Filter:</span>
            {["All", "PMP®", "HSE", "AWS", "Google"].map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCert(c)}
                className={`text-xs px-3 py-1.5 rounded-lg border whitespace-nowrap transition-colors ${
                  selectedCert === c
                    ? "bg-mw-orange text-white border-mw-orange font-semibold"
                    : "bg-white/5 border-white/10 text-white/70 hover:text-white"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Candidate Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCandidates.map((candidate) => (
          <div
            key={candidate.id}
            className="rounded-3xl bg-[#090d16] border border-white/10 p-6 hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between space-y-4 relative group"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                      {candidate.name}
                    </h3>
                    {candidate.verified && (
                      <ShieldCheck className="w-4 h-4 text-blue-400" title="Mindware Verified Candidate" />
                    )}
                  </div>
                  <p className="text-xs md:text-sm text-mw-orange font-medium mt-0.5">
                    {candidate.role}
                  </p>
                </div>

                {candidate.matchScore && (
                  <div className="text-right shrink-0">
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded font-bold">
                      {candidate.matchScore}% Match
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-white/60">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-white/40" />
                  {candidate.location}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5 text-white/40" />
                  {candidate.experienceYears} Years Exp
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <Clock className="w-3.5 h-3.5" />
                  {candidate.availability}
                </span>
              </div>

              <p className="text-xs text-white/70 leading-relaxed line-clamp-3">
                {candidate.bio}
              </p>

              {/* Verified Certifications Badges */}
              <div className="space-y-1 pt-1">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-white/40 block">
                  Verified Qualifications & Certifications
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {candidate.certifications.map((cert) => (
                    <span
                      key={cert}
                      className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-300 text-[11px] font-semibold flex items-center gap-1"
                    >
                      <Award className="w-3 h-3 text-blue-400" />
                      <span>{cert}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-1 pt-1">
                {candidate.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 rounded bg-white/5 text-white/60 text-[11px]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
              <span className="text-xs text-white/40 font-mono truncate">
                {candidate.education}
              </span>

              <button
                onClick={() => setSelectedCandidateForConnect(candidate)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/20 shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Connect / Request Interview</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Connect Modal */}
      {selectedCandidateForConnect && (
        <ConnectEmployerModal
          candidate={selectedCandidateForConnect}
          onClose={() => setSelectedCandidateForConnect(null)}
        />
      )}

      {/* Employer Mandate Modal */}
      {employerMandateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#090d16] border border-white/15 rounded-3xl p-6 md:p-8 space-y-4">
            <h3 className="text-xl font-bold text-white">Post an Enterprise Hiring Mandate</h3>
            <p className="text-xs text-white/60">
              Need specialized talent with specific qualifications (PMP, HSE, Full-Stack, AI, SEO)? Mindware's executive search matches vetted professionals directly to your requisition.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you! A Mindware Executive Talent Consultant has received your mandate and will reach out within 2 hours.");
                setEmployerMandateOpen(false);
              }}
              className="space-y-3 pt-2"
            >
              <input
                type="text"
                required
                placeholder="Company / Institution Name"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs md:text-sm text-white"
              />
              <input
                type="email"
                required
                placeholder="Work Email"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs md:text-sm text-white"
              />
              <input
                type="text"
                required
                placeholder="Required Qualifications (e.g. PMP, HSE Level 3, 5+ yrs React)"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs md:text-sm text-white"
              />
              <textarea
                rows={3}
                placeholder="Briefly describe the role, compensation budget, and project timeframe..."
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs md:text-sm text-white"
              />

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEmployerMandateOpen(false)}
                  className="px-4 py-2 text-xs text-white/60 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-mw-orange text-white text-xs font-bold"
                >
                  Submit Requisition
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
