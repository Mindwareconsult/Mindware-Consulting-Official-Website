import React, { useState, useEffect, useRef } from "react";
import { 
  ShieldCheck, 
  Award, 
  ExternalLink, 
  Pause, 
  Play, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  ZoomIn, 
  Building2, 
  FileCheck2, 
  Lock,
  Maximize2
} from "lucide-react";
import { MINDWARE_CERTIFICATIONS, CertificationItem } from "../../data/certificationsData";

export function CertificationsSection() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedCert, setSelectedCert] = useState<CertificationItem | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-scroll loop using requestAnimationFrame for butter-smooth control
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let lastTimestamp = performance.now();
    const scrollSpeed = 0.55; // pixels per frame at 60fps (gentle, slow scroll)

    const step = (now: number) => {
      const delta = now - lastTimestamp;
      lastTimestamp = now;

      // Only scroll if playing and not hovered
      if (isPlaying && !isHovered && container) {
        // Adjust for framerate variability
        const stepAmount = scrollSpeed * (delta / 16.67);
        container.scrollLeft += stepAmount;

        // Infinite loop wrap-around: check if scrolled past first half of duplicated content
        const maxScroll = container.scrollWidth / 2;
        if (container.scrollLeft >= maxScroll) {
          container.scrollLeft -= maxScroll;
        }
      }

      animationFrameRef.current = requestAnimationFrame(step);
    };

    animationFrameRef.current = requestAnimationFrame(step);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, isHovered]);

  const handleManualScroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollDistance = 380;
    container.scrollBy({
      left: direction === "left" ? -scrollDistance : scrollDistance,
      behavior: "smooth"
    });
  };

  const handleCertClick = (cert: CertificationItem) => {
    setSelectedCert(cert);
    setIsZoomed(false);
  };

  const handleNextModal = () => {
    if (!selectedCert) return;
    const currentIndex = MINDWARE_CERTIFICATIONS.findIndex(c => c.id === selectedCert.id);
    const nextIndex = (currentIndex + 1) % MINDWARE_CERTIFICATIONS.length;
    setSelectedCert(MINDWARE_CERTIFICATIONS[nextIndex]);
    setIsZoomed(false);
  };

  const handlePrevModal = () => {
    if (!selectedCert) return;
    const currentIndex = MINDWARE_CERTIFICATIONS.findIndex(c => c.id === selectedCert.id);
    const prevIndex = (currentIndex - 1 + MINDWARE_CERTIFICATIONS.length) % MINDWARE_CERTIFICATIONS.length;
    setSelectedCert(MINDWARE_CERTIFICATIONS[prevIndex]);
    setIsZoomed(false);
  };

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedCert) return;
      if (e.key === "Escape") setSelectedCert(null);
      if (e.key === "ArrowRight") handleNextModal();
      if (e.key === "ArrowLeft") handlePrevModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedCert]);

  // Prevent background scroll when modal open
  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedCert]);

  // Duplicate list once to create a seamless infinite marquee
  const displayCerts = [...MINDWARE_CERTIFICATIONS, ...MINDWARE_CERTIFICATIONS];

  return (
    <section 
      className="py-20 md:py-32 bg-[#02050e] relative overflow-hidden border-t border-b border-white/5 select-none"
      aria-label="Mindware Corporate Certifications and Accreditations"
    >
      {/* Background radial gradients for prestigious depth */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />
      
      {/* Subtle architectural grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "32px 32px"
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2.5 mb-4 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold tracking-wider uppercase">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Institutional Governance & Accreditations</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white leading-[1.1]">
              Officially Certified. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">
                Audited & Legally Charter Bound.
              </span>
            </h2>
            
            <p className="mt-4 text-base sm:text-lg text-white/60 font-light leading-relaxed max-w-2xl">
              Mindware Consulting Ltd operates under the legal charter of the Corporate Affairs Commission (RC: 1309926), certified by premier management, educational, and international safety councils.
            </p>
          </div>

          {/* Interactive Playback & Navigation Controls */}
          <div className="flex items-center gap-3 self-start lg:self-end">
            <div className="flex items-center gap-2 bg-white/[0.04] border border-white/10 rounded-full px-3 py-1.5 text-xs text-white/70">
              <span className={`w-2 h-2 rounded-full ${isPlaying && !isHovered ? "bg-emerald-400 animate-pulse" : "bg-amber-400"}`} />
              <span className="text-[11px] font-mono tracking-tight">
                {isHovered ? "Hovered • Paused" : isPlaying ? "Slow Auto-Scroll" : "Scroll Paused"}
              </span>
            </div>

            {/* Play/Pause Button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-400/50 text-white flex items-center justify-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              title={isPlaying ? "Pause automatic scrolling" : "Resume automatic scrolling"}
              aria-label={isPlaying ? "Pause scrolling" : "Resume scrolling"}
            >
              {isPlaying ? <Pause className="w-4 h-4 text-amber-300" /> : <Play className="w-4 h-4 text-emerald-400 ml-0.5" />}
            </button>

            {/* Previous Frame */}
            <button
              onClick={() => handleManualScroll("left")}
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 text-white/80 hover:text-white flex items-center justify-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              title="Scroll left"
              aria-label="Scroll certificates left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Next Frame */}
            <button
              onClick={() => handleManualScroll("right")}
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 text-white/80 hover:text-white flex items-center justify-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              title="Scroll right"
              aria-label="Scroll certificates right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Infinite Horizontal Frames Showcase */}
      <div 
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Edge Gradient Fades for cinematic gallery feeling */}
        <div className="absolute inset-y-0 left-0 w-12 sm:w-24 md:w-48 bg-gradient-to-r from-[#02050e] via-[#02050e]/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-12 sm:w-24 md:w-48 bg-gradient-to-l from-[#02050e] via-[#02050e]/80 to-transparent z-20 pointer-events-none" />

        {/* Scrollable Row */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 sm:gap-8 px-6 sm:px-12 py-6 overflow-x-auto scrollbar-none scroll-smooth cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {displayCerts.map((cert, index) => {
            const isLandscape = cert.aspectRatio === "landscape";
            
            return (
              <div
                key={`${cert.id}-${index}`}
                onClick={() => handleCertClick(cert)}
                className="group shrink-0 relative flex flex-col cursor-pointer transition-all duration-500 hover:-translate-y-2 focus-visible:outline-none"
                style={{
                  width: isLandscape ? "380px" : "310px"
                }}
              >
                {/* Real-life Framed Certificate Canvas */}
                <div className="relative rounded-xl p-3 sm:p-3.5 bg-gradient-to-b from-[#24201c] via-[#141416] to-[#0a0a0c] border border-amber-500/25 shadow-2xl shadow-black/90 group-hover:border-amber-400/60 group-hover:shadow-amber-500/10 transition-all duration-300">
                  
                  {/* Outer Bevel Shadow */}
                  <div className="relative rounded-lg p-2.5 sm:p-3 bg-[#0d0f14] ring-1 ring-white/10 overflow-hidden">
                    
                    {/* Inner Gold Inlay Fillet */}
                    <div className="relative rounded border border-amber-400/20 bg-[#f9f8f4] overflow-hidden shadow-inner flex items-center justify-center">
                      
                      {/* Certificate Document Thumbnail */}
                      <div className="relative w-full overflow-hidden bg-white aspect-[1/1.414] max-h-[360px]">
                        <img 
                          src={cert.image} 
                          alt={cert.title}
                          className="w-full h-full object-contain object-top transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                        
                        {/* Glass Reflection Highlight */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 pointer-events-none opacity-60 group-hover:opacity-20 transition-opacity" />

                        {/* Hover Overlay Button */}
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 p-4 text-center">
                          <span className="w-10 h-10 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                            <Maximize2 className="w-5 h-5" />
                          </span>
                          <span className="text-xs font-semibold text-white drop-shadow">Click to inspect official credential</span>
                        </div>
                      </div>

                    </div>

                  </div>

                  {/* Corner Rivet Details (Museum Frame Hardware) */}
                  <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-amber-400/40 border border-black/40" />
                  <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-amber-400/40 border border-black/40" />
                  <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-amber-400/40 border border-black/40" />
                  <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-amber-400/40 border border-black/40" />
                </div>

                {/* Museum Engraved Plaque / Caption beneath Frame */}
                <div className="mt-3.5 px-2">
                  <div className="flex items-center justify-between text-[11px] text-amber-400/90 font-mono font-medium mb-1">
                    <span className="truncate pr-2">{cert.authorityShort}</span>
                    <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/70 text-[10px] shrink-0 font-mono">
                      {cert.credentialId}
                    </span>
                  </div>

                  <h3 className="text-sm font-semibold text-white/95 group-hover:text-amber-300 transition-colors line-clamp-1">
                    {cert.title}
                  </h3>
                  
                  <p className="text-[11px] text-white/50 line-clamp-2 mt-1 leading-snug">
                    {cert.summary}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Trust Ticker / Institutional Summary Bar */}
      <div className="container mx-auto px-4 sm:px-6 md:px-12 mt-12 sm:mt-16 relative z-10">
        <div className="p-4 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Full Regulatory & Fiscal Compliance</p>
              <p className="text-xs text-white/40">Verified with Corporate Affairs Commission, FIRS, and National Professional Councils</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-white/50">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              RC: 1309926
            </span>
            <span>•</span>
            <span className="text-white/70">TIN: 19660429-0001</span>
            <span>•</span>
            <span className="text-white/70">CAMA 1990 Registered</span>
          </div>
        </div>
      </div>

      {/* High-Definition Inspection Lightbox Modal */}
      {selectedCert && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedCert(null)}
        >
          <div 
            className="relative w-full max-w-5xl max-h-[92vh] bg-[#0c1017] border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white/80 hover:text-white border border-white/20 flex items-center justify-center transition-colors"
              aria-label="Close certificate inspector"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left/Main Column: High-Res Document Preview */}
            <div className="flex-1 bg-[#05070a] relative flex items-center justify-center p-4 sm:p-6 overflow-auto max-h-[55vh] md:max-h-[85vh]">
              <div className="relative group max-h-full">
                <img 
                  src={selectedCert.image} 
                  alt={selectedCert.title} 
                  className={`max-h-[50vh] md:max-h-[75vh] w-auto object-contain rounded shadow-2xl border border-white/10 transition-transform duration-300 ${isZoomed ? "scale-125 cursor-zoom-out" : "cursor-zoom-in"}`}
                  onClick={() => setIsZoomed(!isZoomed)}
                />
                
                {/* Zoom prompt badge */}
                <button 
                  onClick={() => setIsZoomed(!isZoomed)}
                  className="absolute bottom-3 right-3 bg-black/70 hover:bg-black text-white/80 hover:text-white px-3 py-1.5 rounded-md text-xs font-mono border border-white/20 flex items-center gap-1.5 transition-colors backdrop-blur-sm"
                >
                  <ZoomIn className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isZoomed ? "Zoom 100%" : "Zoom 125%"}</span>
                </button>
              </div>

              {/* Prev / Next Modal Arrows */}
              <button
                onClick={handlePrevModal}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white/80 hover:text-white border border-white/20 flex items-center justify-center transition-colors"
                title="Previous certificate (Left arrow)"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleNextModal}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white/80 hover:text-white border border-white/20 flex items-center justify-center transition-colors"
                title="Next certificate (Right arrow)"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Right Column: Verified Credential Dossier */}
            <div className="w-full md:w-96 p-6 sm:p-8 bg-[#0c1017] border-t md:border-t-0 md:border-l border-white/10 flex flex-col justify-between overflow-y-auto">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] font-mono tracking-wider uppercase text-emerald-400 font-semibold">
                    Verified Credential
                  </span>
                </div>

                <div className="text-xs font-mono text-amber-400 font-medium mb-1">
                  {selectedCert.authority}
                </div>

                <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-4 leading-snug">
                  {selectedCert.title}
                </h3>

                <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed mb-6">
                  {selectedCert.summary}
                </p>

                {/* Metadata Grid */}
                <div className="space-y-3.5 text-xs border-t border-b border-white/10 py-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-white/40">Credential / Ref:</span>
                    <span className="font-mono text-white/90 font-semibold">{selectedCert.credentialId}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-white/40">Charter / Issuing Date:</span>
                    <span className="text-white/90">{selectedCert.date}</span>
                  </div>

                  {selectedCert.governingLaw && (
                    <div className="flex justify-between items-start gap-3">
                      <span className="text-white/40 shrink-0">Governing Law:</span>
                      <span className="text-right text-white/80">{selectedCert.governingLaw}</span>
                    </div>
                  )}

                  {selectedCert.officialScope && (
                    <div className="flex justify-between items-start gap-3">
                      <span className="text-white/40 shrink-0">Authorized Scope:</span>
                      <span className="text-right text-amber-300/90">{selectedCert.officialScope}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <a
                  href={selectedCert.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Full Resolution</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
