import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  MapPin,
  Search,
  Building2,
  Compass,
  ArrowRight,
  CheckCircle2,
  Globe,
  Landmark,
  ShieldCheck,
  TrendingUp,
  Users,
  Award,
  ChevronRight,
  ExternalLink
} from "lucide-react";
import {
  SERVICE_AREAS,
  GEOPOLITICAL_ZONES,
  GeopoliticalZone,
  StateServiceArea
} from "../data/serviceAreasData";
import { SEO } from "../components/SEO";
import { FadeInSection } from "../components/FadeInSection";
import { cn, EASE } from "../lib/utils";

export function ServiceAreas() {
  const [selectedZone, setSelectedZone] = useState<GeopoliticalZone | "All">("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Filter service areas by zone & search
  const filteredAreas = useMemo(() => {
    return SERVICE_AREAS.filter((area) => {
      // Zone filter
      const matchesZone = selectedZone === "All" || area.zone === selectedZone;

      // Search filter
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesZone;

      const matchesName = area.name.toLowerCase().includes(query) || area.shortName.toLowerCase().includes(query);
      const matchesCapital = area.capital.toLowerCase().includes(query);
      const matchesHubs = area.commercialHubs.some((hub) => hub.toLowerCase().includes(query));
      const matchesLandmarks = area.landmarks.some((lm) => lm.name.toLowerCase().includes(query));
      const matchesIndustries = area.dominantIndustries.some((ind) => ind.toLowerCase().includes(query));

      return matchesZone && (matchesName || matchesCapital || matchesHubs || matchesLandmarks || matchesIndustries);
    });
  }, [selectedZone, searchQuery]);

  // Schema.org structured data for all areas
  const schemaStructuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Mindware Consulting Service Areas in Nigeria",
    "description": "Comprehensive list of Nigerian States and the Federal Capital Territory served by Mindware Consulting for Web Design, Local SEO, and Cloud Solutions.",
    "numberOfItems": SERVICE_AREAS.length,
    "itemListElement": SERVICE_AREAS.map((area, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": area.name,
      "url": `https://mindwareconsulting.com/service-areas/${area.slug}`,
      "item": {
        "@type": "AdministrativeArea",
        "name": area.name,
        "address": {
          "@type": "PostalAddress",
          "addressRegion": area.shortName,
          "addressCountry": "NG"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": area.coordinates.lat,
          "longitude": area.coordinates.lng
        }
      }
    }))
  };

  return (
    <div className="bg-[#02040a] min-h-screen text-white pt-28 pb-24">
      <SEO
        title="Service Areas Across Nigeria | 36 States & FCT Web Design & SEO – Mindware Consulting"
        description="Explore Mindware Consulting's localized SEO, web development, and digital services across all 36 States of Nigeria and Abuja FCT. Find your state and commercial hubs."
      />

      {/* Structured Data Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaStructuredData) }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-14 md:py-20 border-b border-white/5">
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-mw-orange/15 via-blue-600/10 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs md:text-sm text-white/50 mb-6 flex-wrap">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-semibold">Service Areas Across Nigeria</span>
          </div>

          <div className="max-w-4xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-mw-orange/10 border border-mw-orange/20 text-mw-orange text-xs font-semibold uppercase tracking-wider">
              <Compass className="w-4 h-4" />
              <span>Nationwide Presence • 36 States & Federal Capital Territory</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-white tracking-tight leading-[1.1]">
              Local SEO & Enterprise Web Engineering <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-mw-orange via-amber-300 to-emerald-400">
                Across All 36 States & FCT.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-white/70 max-w-3xl leading-relaxed">
              From the commercial tech corridors of <strong>Lagos</strong> and the federal procurement desks of <strong>Abuja</strong>, to the heavy oilfield yards of <strong>Port Harcourt</strong> and the merchant markets of <strong>Kano</strong> and <strong>Onitsha</strong> — Mindware Consulting delivers localized digital authority, high-converting websites, and Google search dominance tailored to each Nigerian territory.
            </p>

            {/* Quick Metrics Bar */}
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="text-2xl font-display font-bold text-mw-orange">37</div>
                <div className="text-xs text-white/60">Dedicated State Portals</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="text-2xl font-display font-bold text-white">774</div>
                <div className="text-xs text-white/60">LGAs Full Coverage</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="text-2xl font-display font-bold text-emerald-400">3 Hubs</div>
                <div className="text-xs text-white/60">Lagos, Abuja & Port Harcourt</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="text-2xl font-display font-bold text-blue-400">100%</div>
                <div className="text-xs text-white/60">Nationwide Remote Delivery</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Directory Section */}
      <section className="container mx-auto px-4 sm:px-6 md:px-12 py-8 sm:py-12 md:py-16 space-y-8 sm:space-y-10">
        {/* Search & Filter Bar */}
        <div className="p-4 sm:p-6 rounded-3xl bg-[#090d16] border border-white/10 space-y-6 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                placeholder="Search state, capital city, or commercial hub (e.g. Ikeja, Onitsha, Warri)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/40 text-sm focus:outline-none focus:border-mw-orange transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/40 hover:text-white px-2 py-1"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Results counter */}
            <div className="text-xs text-white/60 font-mono">
              Showing <span className="font-bold text-mw-orange">{filteredAreas.length}</span> of 37 Territories
            </div>
          </div>

          {/* Geopolitical Zone Switcher Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none touch-pan-x">
            {GEOPOLITICAL_ZONES.map((zone) => {
              const isSelected = selectedZone === zone.id;
              return (
                <button
                  key={zone.id}
                  onClick={() => setSelectedZone(zone.id)}
                  className={cn(
                    "px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5",
                    isSelected
                      ? "bg-mw-orange text-white shadow-lg shadow-mw-orange/20"
                      : "bg-white/5 text-white/60 hover:text-white border border-white/10 hover:border-white/20"
                  )}
                >
                  <span>{zone.label}</span>
                  <span
                    className={cn(
                      "text-[10px] px-1.5 py-0.2 rounded-full",
                      isSelected ? "bg-black/30 text-white" : "bg-white/10 text-white/50"
                    )}
                  >
                    {zone.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* State Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAreas.map((area, index) => (
            <motion.div
              key={area.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.03, ease: EASE }}
              className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent hover:border-mw-orange/50 hover:bg-white/[0.05] transition-all p-6 flex flex-col justify-between group shadow-lg"
            >
              <div className="space-y-4">
                {/* Header Badge & Capital */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-mw-orange px-2.5 py-0.5 rounded-full bg-mw-orange/10 border border-mw-orange/20">
                      {area.zone}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-2 group-hover:text-mw-orange transition-colors">
                      {area.name}
                    </h3>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs text-white/40 block">Capital</span>
                    <span className="text-xs font-bold text-white/90">{area.capital}</span>
                  </div>
                </div>

                {/* Tagline */}
                <p className="text-xs text-white/70 italic leading-relaxed">
                  "{area.tagline}"
                </p>

                {/* Commercial Hubs Preview */}
                <div className="space-y-1.5 pt-2 border-t border-white/5">
                  <div className="text-[11px] font-semibold text-white/40 uppercase tracking-wider flex items-center gap-1">
                    <Building2 className="w-3 h-3 text-mw-orange" />
                    <span>Commercial Hubs:</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {area.commercialHubs.slice(0, 3).map((hub) => (
                      <span
                        key={hub}
                        className="text-[11px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/80"
                      >
                        {hub}
                      </span>
                    ))}
                    {area.commercialHubs.length > 3 && (
                      <span className="text-[10px] text-white/40 self-center">
                        +{area.commercialHubs.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Dominant Industries */}
                <div className="space-y-1.5">
                  <div className="text-[11px] font-semibold text-white/40 uppercase tracking-wider flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-emerald-400" />
                    <span>Key Sectors:</span>
                  </div>
                  <p className="text-xs text-white/60 line-clamp-2">
                    {area.dominantIndustries.join(" • ")}
                  </p>
                </div>
              </div>

              {/* Card Footer Link */}
              <div className="pt-6 mt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-[11px] font-mono text-white/40">
                  {area.lgasCount} LGAs Covered
                </span>

                <Link
                  to={`/service-areas/${area.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-mw-orange group-hover:text-white group-hover:translate-x-1 transition-all"
                >
                  <span>Explore {area.shortName} Territory</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredAreas.length === 0 && (
          <div className="text-center py-16 p-8 rounded-3xl bg-white/[0.02] border border-white/10 max-w-xl mx-auto space-y-4">
            <Compass className="w-12 h-12 text-mw-orange mx-auto opacity-60" />
            <h3 className="text-lg font-bold text-white">No State Matches Your Query</h3>
            <p className="text-xs text-white/60">
              We provide digital services across all 36 States and the FCT. Try searching with a state name, capital, or commercial city.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedZone("All");
              }}
              className="px-4 py-2 rounded-full bg-mw-orange text-white text-xs font-bold"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* National Client Footprint Banner */}
        <FadeInSection className="rounded-3xl border border-white/10 bg-gradient-to-r from-blue-950/30 via-white/[0.02] to-mw-orange/10 p-8 md:p-12 space-y-8">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-mw-orange font-bold">
              VERIFIED NATIONWIDE IMPACT
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Trusted by Enterprises, Industrial Contractors & Exporters across Nigeria
            </h3>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              Mindware Consulting has deployed mission-critical corporate platforms, e-commerce engines, and search domination campaigns for clients operating from the coastal waters of Rivers and Bayelsa to the commercial plains of Kano and Kaduna.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-mw-orange">
                <MapPin className="w-3.5 h-3.5" />
                <span>Port Harcourt & Niger Delta</span>
              </div>
              <h4 className="text-sm font-bold text-white">Vigox Engineering Ltd</h4>
              <p className="text-xs text-white/70 italic">
                "Mindware built an industrial marine engineering portal that positioned us for multi-million naira offshore fabrication tenders."
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-400">
                <MapPin className="w-3.5 h-3.5" />
                <span>Lagos Megacity</span>
              </div>
              <h4 className="text-sm font-bold text-white">Royalty Speed Finishing</h4>
              <p className="text-xs text-white/70 italic">
                "Our web presence and local SEO ranked us as the premier architectural finishing contractor for developments in Ikoyi and Lekki."
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <MapPin className="w-3.5 h-3.5" />
                <span>Abuja FCT & Northern Hubs</span>
              </div>
              <h4 className="text-sm font-bold text-white">Quanxi Limited</h4>
              <p className="text-xs text-white/70 italic">
                "The corporate equipment portal Mindware engineered generated over ₦150M in commercial agricultural machinery bids in month one."
              </p>
            </div>
          </div>
        </FadeInSection>

        {/* Consultation Call to Action */}
        <FadeInSection className="rounded-3xl border border-white/10 bg-gradient-to-r from-mw-orange/15 via-[#090d16] to-purple-950/30 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="text-xs font-mono uppercase tracking-wider text-mw-orange font-bold">
              GET LOCAL DIGITAL DOMINANCE
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Ready to Win Market Share in Your State?
            </h3>
            <p className="text-sm text-white/70 leading-relaxed">
              Book a free strategy session with our Nigerian market specialists. We will analyze your local competitors, map high-intent local search queries, and structure a custom growth proposal.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-mw-orange hover:bg-mw-orange-hover text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-mw-orange/20"
            >
              <span>Schedule Strategy Call</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/2348125082354?text=Hello%20Mindware%20Consulting%2C%20I%20want%20to%20discuss%20web%20design%20and%20local%20SEO%20for%20my%20state."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider transition-colors"
            >
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </FadeInSection>
      </section>
    </div>
  );
}
