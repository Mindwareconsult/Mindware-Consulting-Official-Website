import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShieldCheck, 
  Award, 
  FileCheck, 
  ExternalLink, 
  X, 
  ZoomIn, 
  Building2, 
  CheckCircle,
  FileText,
  BadgeCheck,
  Scale,
  Calendar,
  Eye
} from "lucide-react";
import { MINDWARE_CERTIFICATIONS, CertificationItem } from "../../data/certificationsData";

type CategoryFilter = "all" | "statutory" | "professional";

export function AboutCertifications() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [activeCert, setActiveCert] = useState<CertificationItem | null>(null);

  const filteredCerts = MINDWARE_CERTIFICATIONS.filter(cert => {
    if (activeCategory === "all") return true;
    if (activeCategory === "statutory") {
      return ["cac-incorporation", "firs-tax-identification", "cac-memart"].includes(cert.id);
    }
    if (activeCategory === "professional") {
      return ["imc-accreditation", "wso-safety-accreditation", "cicrm-corporate-member", "niscn-consultancy-member"].includes(cert.id);
    }
    return true;
  });

  return (
    <section className="py-16 sm:py-24 bg-[#02050e] border-t border-white/5 relative overflow-hidden" id="accreditations">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-mw-orange/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        {/* Header Block */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Institutional Governance & Compliance</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight text-white mb-4">
            Official Accreditations &amp; <span className="text-gradient">Regulatory Standing</span>
          </h2>
          <p className="text-white/60 text-sm sm:text-base leading-relaxed">
            Mindware Consulting Ltd operates under rigorous statutory compliance chartered by the Corporate Affairs Commission (RC 1309926), active FIRS fiscal standing, and accredited memberships across recognized national and international management councils.
          </p>
        </div>

        {/* Category Filter Pills & Key Statutory Highlights Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 mb-8 border-b border-white/5">
          {/* Segmented Filter */}
          <div className="inline-flex p-1 bg-white/[0.03] border border-white/10 rounded-xl">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeCategory === "all"
                  ? "bg-mw-orange text-white shadow-md shadow-mw-orange/20"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              All Credentials ({MINDWARE_CERTIFICATIONS.length})
            </button>
            <button
              onClick={() => setActiveCategory("statutory")}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeCategory === "statutory"
                  ? "bg-mw-orange text-white shadow-md shadow-mw-orange/20"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              Statutory &amp; Corporate (3)
            </button>
            <button
              onClick={() => setActiveCategory("professional")}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeCategory === "professional"
                  ? "bg-mw-orange text-white shadow-md shadow-mw-orange/20"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              Professional Charters (4)
            </button>
          </div>

          {/* Quick Legal Reference Bar */}
          <div className="hidden lg:flex items-center gap-6 text-xs text-white/50">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>CAMA 1990 Registered</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span>FIRS TIN Verified</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              <span>UN ECOSOC Consultative Charter</span>
            </div>
          </div>
        </div>

        {/* Structured Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredCerts.map((cert) => (
            <div
              key={cert.id}
              className="group bg-[#060b17] rounded-2xl border border-white/10 hover:border-mw-orange/40 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-mw-orange/5"
            >
              {/* Card Header & Preview */}
              <div>
                {/* Document Thumbnail Container */}
                <div 
                  onClick={() => setActiveCert(cert)}
                  className="relative aspect-[4/3] bg-black/60 p-4 border-b border-white/5 flex items-center justify-center cursor-pointer overflow-hidden group/thumb"
                >
                  <img
                    src={cert.image}
                    alt={cert.title}
                    loading="lazy"
                    decoding="async"
                    className="max-h-full max-w-full object-contain rounded shadow-lg transition-transform duration-500 group-hover/thumb:scale-105"
                  />
                  {/* Subtle document gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060b17]/90 via-transparent to-transparent opacity-40 group-hover/thumb:opacity-20 transition-opacity" />
                  
                  {/* Hover Inspect Prompt */}
                  <div className="absolute inset-0 bg-mw-dark/60 backdrop-blur-[2px] opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 text-white text-xs font-semibold">
                    <span className="p-2 rounded-full bg-white/20 backdrop-blur-md">
                      <ZoomIn className="w-4 h-4" />
                    </span>
                    <span>Click to Inspect</span>
                  </div>

                  {/* Corner Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider uppercase bg-mw-dark/90 text-white border border-white/15 backdrop-blur-md shadow-md">
                      <BadgeCheck className="w-3 h-3 text-mw-orange" />
                      {cert.authorityShort}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 sm:p-6">
                  {/* Monospace Credential ID */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-xs font-bold text-mw-orange tracking-tight bg-mw-orange/10 px-2 py-0.5 rounded border border-mw-orange/20">
                      {cert.credentialId}
                    </span>
                    <span className="text-[11px] text-white/40 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {cert.date}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white mb-1.5 group-hover:text-mw-orange transition-colors line-clamp-1">
                    {cert.title}
                  </h3>

                  <p className="text-xs text-white/50 mb-4 line-clamp-1">
                    {cert.authority}
                  </p>

                  <p className="text-xs text-white/70 leading-relaxed mb-4 line-clamp-3">
                    {cert.summary}
                  </p>

                  {/* Operational Scope */}
                  {cert.officialScope && (
                    <div className="pt-3 border-t border-white/5 mb-2">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-white/40 mb-1">
                        Authorized Scope
                      </div>
                      <div className="text-xs text-white/80 font-medium">
                        {cert.officialScope}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="p-5 sm:p-6 pt-0 mt-auto">
                <button
                  type="button"
                  onClick={() => setActiveCert(cert)}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/[0.04] hover:bg-mw-orange hover:text-white text-white/80 border border-white/10 hover:border-mw-orange text-xs font-semibold transition-all group-hover:bg-white/[0.07]"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect Official Document</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Trust Assurance Summary */}
        <div className="mt-12 p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-white mb-0.5">
                Statutory Due Diligence &amp; Enterprise Procurement Ready
              </div>
              <p className="text-xs text-white/60">
                Official certificates of incorporation, tax clearance, and institutional memberships are available for corporate partner verification and tender documentation.
              </p>
            </div>
          </div>

          <a
            href="/contact?topic=compliance"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-mw-dark text-xs font-semibold transition-all border border-white/10"
          >
            <span>Request Compliance Packet</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Lightbox / Document Detail Inspection Modal */}
      <AnimatePresence>
        {activeCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-md">
            {/* Backdrop click dismiss */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveCert(null)}
              className="absolute inset-0"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-[#070d1c] border border-white/20 rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-mw-orange/10 border border-mw-orange/20 flex items-center justify-center text-mw-orange">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-white">
                      {activeCert.title}
                    </h4>
                    <p className="text-xs text-white/50">
                      {activeCert.authority} • <span className="font-mono text-mw-orange">{activeCert.credentialId}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={activeCert.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                    title="Open Full Image in New Tab"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => setActiveCert(null)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="overflow-y-auto flex-1 grid md:grid-cols-12 gap-0 divide-y md:divide-y-0 md:divide-x divide-white/10">
                {/* Document Display (7 cols) */}
                <div className="md:col-span-7 bg-black/60 p-6 sm:p-8 flex items-center justify-center">
                  <img
                    src={activeCert.image}
                    alt={activeCert.title}
                    className="max-h-[60vh] max-w-full object-contain rounded-lg shadow-2xl border border-white/10"
                  />
                </div>

                {/* Details Breakdown (5 cols) */}
                <div className="md:col-span-5 p-6 sm:p-8 space-y-6 flex flex-col justify-between bg-white/[0.01]">
                  <div className="space-y-5">
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-wider text-white/40 mb-1">
                        Issuing Regulatory Authority
                      </div>
                      <div className="text-sm font-semibold text-white">
                        {activeCert.authority}
                      </div>
                      <div className="text-xs text-white/50">
                        {activeCert.authorityShort}
                      </div>
                    </div>

                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-wider text-white/40 mb-1">
                        Credential / Registration Identifier
                      </div>
                      <div className="text-sm font-mono font-bold text-mw-orange">
                        {activeCert.credentialId}
                      </div>
                    </div>

                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-wider text-white/40 mb-1">
                        Date of Certification / Grant
                      </div>
                      <div className="text-xs font-medium text-white/80">
                        {activeCert.date}
                      </div>
                    </div>

                    {activeCert.governingLaw && (
                      <div>
                        <div className="text-[10px] font-mono uppercase tracking-wider text-white/40 mb-1">
                          Governing Legal Instrument
                        </div>
                        <div className="text-xs text-white/70 bg-white/5 p-2 rounded-lg border border-white/5">
                          {activeCert.governingLaw}
                        </div>
                      </div>
                    )}

                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-wider text-white/40 mb-1">
                        Institutional Scope &amp; Purpose
                      </div>
                      <p className="text-xs text-white/70 leading-relaxed">
                        {activeCert.summary}
                      </p>
                    </div>

                    {activeCert.officialScope && (
                      <div>
                        <div className="text-[10px] font-mono uppercase tracking-wider text-white/40 mb-1">
                          Certified Practice Domain
                        </div>
                        <div className="text-xs text-emerald-400 font-medium">
                          {activeCert.officialScope}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <a
                      href={activeCert.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-mw-orange text-white hover:bg-orange-500 font-semibold text-xs transition-colors shadow-lg shadow-mw-orange/20"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>View High-Resolution Original</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
