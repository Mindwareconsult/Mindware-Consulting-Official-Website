import React, { useState } from "react";
import { 
  Search, 
  MapPin, 
  Briefcase, 
  Calendar, 
  CheckCircle, 
  ArrowRight, 
  Building2, 
  SlidersHorizontal,
  Sparkles,
  ExternalLink,
  ChevronDown,
  ShieldCheck,
  Award
} from "lucide-react";
import { JOB_POSTINGS, JobPost } from "../../data/careersData";
import { JobApplicationModal } from "./JobApplicationModal";
import { CVData } from "./AICVBuilder";
import { getStoredCV } from "../../lib/cvStorage";

interface JobBoardProps {
  activeCV?: CVData | null;
  onNavigateToBuilder?: () => void;
}

export function JobBoard({ activeCV: propCV, onNavigateToBuilder }: JobBoardProps) {
  const activeCV = propCV || getStoredCV();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState<string>("All");
  const [selectedLocation, setSelectedLocation] = useState<string>("All");
  const [selectedCertFilter, setSelectedCertFilter] = useState<string>("All");
  const [activeJobForApplication, setActiveJobForApplication] = useState<JobPost | null>(null);
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);

  const departments = [
    "All",
    "Engineering",
    "Marketing & SEO",
    "Project Management",
    "Design & UX",
    "Health & Safety",
    "Data & Analytics"
  ];

  const locations = ["All", "Lagos", "Port Harcourt", "Abuja", "Remote"];

  const certifications = [
    "All",
    "PMP®",
    "HSE",
    "AWS",
    "Google UX / Ads",
    "Power BI"
  ];

  const filteredJobs = JOB_POSTINGS.filter((job) => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      job.preferredCertifications.some(c => c.toLowerCase().includes(searchQuery.toLowerCase())) ||
      job.summary.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDept = selectedDept === "All" || job.department === selectedDept;

    const matchesLocation = 
      selectedLocation === "All" || 
      job.location.toLowerCase().includes(selectedLocation.toLowerCase());

    const matchesCert = 
      selectedCertFilter === "All" ||
      job.preferredCertifications.some(c => c.toLowerCase().includes(selectedCertFilter.toLowerCase())) ||
      job.requiredQualifications.some(q => q.toLowerCase().includes(selectedCertFilter.toLowerCase()));

    return matchesSearch && matchesDept && matchesLocation && matchesCert;
  });

  return (
    <div className="space-y-8">
      {/* Search & Filter Header */}
      <div className="bg-[#090d16] rounded-3xl border border-white/10 p-6 md:p-8 space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <h2 className="text-xl md:text-2xl font-display font-bold text-white tracking-tight flex items-center gap-2">
              <Building2 className="w-5 h-5 text-mw-orange" />
              <span>Current Openings & Partner Roles</span>
            </h2>
            <p className="text-xs md:text-sm text-white/60 mt-1">
              Showing verified vacancies across Mindware Consulting and accredited corporate enterprise partners.
            </p>
          </div>

          {activeCV && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>1-Click Apply Ready (CV Built)</span>
            </div>
          )}
        </div>

        {/* Search input */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-6 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by job title, skill (e.g. React, SEO, Power BI) or certification (PMP, HSE)..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-11 pr-4 text-base sm:text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-mw-orange focus:ring-1 focus:ring-mw-orange"
            />
          </div>

          <div className="md:col-span-3">
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-base sm:text-sm text-white focus:outline-none focus:border-mw-orange"
            >
              {departments.map(dept => (
                <option key={dept} value={dept} className="bg-[#090d16]">
                  {dept === "All" ? "All Departments" : dept}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-3">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-base sm:text-sm text-white focus:outline-none focus:border-mw-orange"
            >
              {locations.map(loc => (
                <option key={loc} value={loc} className="bg-[#090d16]">
                  {loc === "All" ? "All Locations" : loc}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Certification Filter Chips */}
        <div className="flex overflow-x-auto pb-1 scrollbar-none sm:flex-wrap items-center gap-2 pt-1 text-xs flex-nowrap sm:flex-wrap">
          <span className="text-white/50 flex items-center gap-1 mr-1 whitespace-nowrap shrink-0">
            <Award className="w-3.5 h-3.5 text-mw-orange" />
            Filter by Certification:
          </span>
          {certifications.map(cert => (
            <button
              key={cert}
              onClick={() => setSelectedCertFilter(cert)}
              className={`px-3 py-1 rounded-lg border transition-all whitespace-nowrap shrink-0 ${
                selectedCertFilter === cert
                  ? "bg-mw-orange text-white border-mw-orange font-semibold shadow-sm shadow-mw-orange/20"
                  : "bg-white/5 border-white/10 text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              {cert}
            </button>
          ))}
          {selectedCertFilter !== "All" && (
            <button
              onClick={() => setSelectedCertFilter("All")}
              className="text-[11px] text-white/40 hover:text-white underline ml-2 whitespace-nowrap shrink-0"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Job Listing Cards */}
      <div className="space-y-4">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => {
            const isExpanded = expandedJobId === job.id;
            return (
              <div
                key={job.id}
                className="group rounded-3xl bg-[#090d16] border border-white/10 p-6 md:p-8 hover:border-mw-orange/40 transition-all duration-300 relative overflow-hidden"
              >
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    
                    {/* Badge Row */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-mw-orange/10 border border-mw-orange/20 text-mw-orange text-[11px] font-semibold">
                        {job.department}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white/80 text-[11px] font-medium">
                        {job.type}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-medium">
                        {job.urgency}
                      </span>
                      <span className="text-[11px] text-white/40 ml-1">
                        Posted {job.postedDate}
                      </span>
                    </div>

                    {/* Job Title */}
                    <h3 className="text-xl md:text-2xl font-display font-bold text-white group-hover:text-mw-orange transition-colors">
                      {job.title}
                    </h3>

                    {/* Employer and Location Info */}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-white/60">
                      <div className="flex items-center gap-1.5 text-white/90 font-medium">
                        <Building2 className="w-3.5 h-3.5 text-mw-orange" />
                        <span>{job.employer.name}</span>
                        {job.employer.verified && (
                          <ShieldCheck className="w-3.5 h-3.5 text-blue-400" title="Verified Employer" />
                        )}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-white/40" />
                        <span>{job.location}</span>
                      </div>
                      <div className="font-mono text-emerald-400 font-semibold">
                        {job.salary}
                      </div>
                    </div>

                    <p className="text-xs md:text-sm text-white/70 line-clamp-2 leading-relaxed pt-1">
                      {job.summary}
                    </p>

                    {/* Key skills & preferred certs tags */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-2">
                      {job.preferredCertifications.map(cert => (
                        <span
                          key={cert}
                          className="px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px] font-semibold flex items-center gap-1"
                        >
                          <Award className="w-3 h-3" />
                          <span>{cert}</span>
                        </span>
                      ))}
                      {job.skills.slice(0, 4).map(skill => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded-md bg-white/5 text-white/60 text-[11px]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-row lg:flex-col items-center lg:items-end gap-2.5 w-full lg:w-auto shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-white/5">
                    <button
                      onClick={() => setActiveJobForApplication(job)}
                      className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-mw-orange hover:bg-mw-orange/90 text-white text-xs md:text-sm font-bold transition-all shadow-lg shadow-mw-orange/20 whitespace-nowrap"
                    >
                      <span>Apply Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setExpandedJobId(isExpanded ? null : job.id)}
                      className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-xs font-semibold border border-white/10 transition-colors flex items-center gap-1.5"
                    >
                      <span>{isExpanded ? "Hide Details" : "View Full Details"}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                    </button>
                  </div>
                </div>

                {/* Expanded Details Section */}
                {isExpanded && (
                  <div className="mt-6 pt-6 border-t border-white/10 space-y-6 animate-in fade-in duration-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Responsibilities */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-mw-orange">
                          Key Role Responsibilities
                        </h4>
                        <ul className="space-y-2 text-xs md:text-sm text-white/80">
                          {job.responsibilities.map((resp, idx) => (
                            <li key={idx} className="flex items-start gap-2 leading-relaxed">
                              <span className="text-mw-orange font-bold mt-0.5">•</span>
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Required Qualifications & Preferred Certifications */}
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400">
                            Required Qualifications
                          </h4>
                          <ul className="space-y-2 text-xs md:text-sm text-white/80">
                            {job.requiredQualifications.map((qual, idx) => (
                              <li key={idx} className="flex items-start gap-2 leading-relaxed">
                                <span className="text-blue-400 font-bold mt-0.5">✓</span>
                                <span>{qual}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-2">
                          <h5 className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                            <Award className="w-3.5 h-3.5" />
                            <span>Preferred Industry Certifications</span>
                          </h5>
                          <ul className="space-y-1 text-xs text-white/90">
                            {job.preferredCertifications.map((c, i) => (
                              <li key={i} className="flex items-center gap-1.5 font-medium">
                                <span className="text-amber-400">•</span>
                                <span>{c}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                    </div>

                    {/* Benefits Row */}
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-white/60 mb-2">
                        Compensation, Benefits & Growth
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {job.benefits.map((b, idx) => (
                          <div key={idx} className="text-xs text-white/80 flex items-center gap-2">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>{b}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                      <button
                        onClick={() => setActiveJobForApplication(job)}
                        className="px-6 py-2.5 rounded-xl bg-mw-orange hover:bg-mw-orange/90 text-white text-xs md:text-sm font-bold transition-all shadow-lg shadow-mw-orange/20"
                      >
                        Apply for this Role Now
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-16 bg-[#090d16] rounded-3xl border border-white/10 p-8 space-y-4">
            <Building2 className="w-12 h-12 text-white/20 mx-auto" />
            <h3 className="text-lg font-bold text-white">No Matching Roles Found</h3>
            <p className="text-xs md:text-sm text-white/60 max-w-md mx-auto">
              We couldn't find openings matching your filter criteria. Try clearing search filters or join the Mindware Employer Talent Pool to be contacted when a matching role opens.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedDept("All");
                setSelectedLocation("All");
                setSelectedCertFilter("All");
              }}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>

      {/* Application Modal */}
      {activeJobForApplication && (
        <JobApplicationModal
          job={activeJobForApplication}
          onClose={() => setActiveJobForApplication(null)}
          activeCV={activeCV}
        />
      )}
    </div>
  );
}
