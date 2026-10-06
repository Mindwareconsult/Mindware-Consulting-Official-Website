import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  Flame,
  Building2,
  Landmark,
  Car,
  ShoppingBag,
  Palette,
  Search,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Zap,
  Sparkles,
  ChevronRight,
  ExternalLink,
  Layers,
  MessageSquare
} from "lucide-react";
import {
  INDUSTRIES,
  INDUSTRY_CATEGORIES,
  IndustryData
} from "../data/industriesData";
import { SEO } from "../components/SEO";
import { FadeInSection } from "../components/FadeInSection";
import { cn, EASE } from "../lib/utils";

// Map icon string to Lucide icon component
function getIndustryIcon(iconName: string) {
  switch (iconName) {
    case "Flame":
      return Flame;
    case "Building2":
      return Building2;
    case "Landmark":
      return Landmark;
    case "Car":
      return Car;
    case "ShoppingBag":
      return ShoppingBag;
    case "Palette":
      return Palette;
    default:
      return Layers;
  }
}

export function Industries() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredIndustries = useMemo(() => {
    return INDUSTRIES.filter((ind) => {
      const matchesCategory = selectedCategory === "All" || ind.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const matchesName = ind.name.toLowerCase().includes(query) || ind.shortName.toLowerCase().includes(query);
      const matchesTagline = ind.tagline.toLowerCase().includes(query);
      const matchesOverview = ind.overview.toLowerCase().includes(query);
      const matchesFeatures = ind.features.some((f) => f.title.toLowerCase().includes(query) || f.description.toLowerCase().includes(query));

      return matchesCategory && (matchesName || matchesTagline || matchesOverview || matchesFeatures);
    });
  }, [selectedCategory, searchQuery]);

  // Schema.org structured data
  const schemaStructuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Industries Served by Mindware Consulting Ltd",
    "description": "Specialized web engineering, local SEO, and digital business solutions for key commercial sectors in Nigeria.",
    "numberOfItems": INDUSTRIES.length,
    "itemListElement": INDUSTRIES.map((ind, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": ind.name,
      "url": `https://mindwareconsulting.com/industries/${ind.slug}`,
      "description": ind.metaDescription
    }))
  };

  return (
    <div className="bg-[#02040a] min-h-screen text-white pt-28 pb-24">
      <SEO
        title="Industries We Serve | Enterprise Digital Solutions & B2B Web Engineering – Mindware"
        description="Explore Mindware Consulting's specialized web design, B2B SEO, and digital platforms engineered for Oil & Gas, Construction, Real Estate, Automotive, E-Commerce, and Luxury Finishing in Nigeria."
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

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs md:text-sm text-white/50 mb-6 flex-wrap">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-semibold">Industries We Serve</span>
          </div>

          <div className="max-w-4xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-mw-orange/10 border border-mw-orange/20 text-mw-orange text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Industry-Specific Digital Excellence • Nigeria & West Africa</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-white tracking-tight leading-[1.1]">
              Specialized Web Engineering for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-mw-orange via-amber-300 to-emerald-400">
                Nigeria's Core Commercial Industries.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-white/70 max-w-3xl leading-relaxed">
              Generic web agencies use generic WordPress templates that fail technical audits and procurement screenings. Mindware engineers custom web platforms, compliance architectures, and digital sales engines tailored to the strict operational, legal, and financial realities of your exact sector.
            </p>

            {/* Quick Metrics Bar */}
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="text-2xl font-display font-bold text-mw-orange">6 Sectors</div>
                <div className="text-xs text-white/60">High-Margin Focus Lineup</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="text-2xl font-display font-bold text-white">₦2.5B+</div>
                <div className="text-xs text-white/60">Client Pipeline Enabled</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="text-2xl font-display font-bold text-emerald-400">+45%</div>
                <div className="text-xs text-white/60">Avg. Tender / Deal Win Lift</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="text-2xl font-display font-bold text-blue-400">100%</div>
                <div className="text-xs text-white/60">Mobile-First Security & Speed</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Directory & Filters */}
      <section className="container mx-auto px-6 md:px-12 py-12 md:py-16 space-y-10">
        {/* Search & Category Filter Bar */}
        <div className="p-6 rounded-3xl bg-[#090d16] border border-white/10 space-y-6 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                placeholder="Search industry or capabilities (e.g. NipeX, Tokunbo, Off-plan, Paystack)..."
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
              Showing <span className="font-bold text-mw-orange">{filteredIndustries.length}</span> of {INDUSTRIES.length} Specialized Industries
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {INDUSTRY_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={cn(
                    "px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all",
                    isSelected
                      ? "bg-mw-orange text-white shadow-lg shadow-mw-orange/20"
                      : "bg-white/5 text-white/60 hover:text-white border border-white/10 hover:border-white/20"
                  )}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Industry Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredIndustries.map((ind, index) => {
            const IconComponent = getIndustryIcon(ind.iconName);
            return (
              <motion.div
                key={ind.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.08, ease: EASE }}
                className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent hover:border-mw-orange/50 hover:bg-white/[0.05] transition-all p-7 flex flex-col justify-between group shadow-xl"
              >
                <div className="space-y-4">
                  {/* Category & Icon */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-mw-orange/10 border border-mw-orange/20 flex items-center justify-center text-mw-orange group-hover:bg-mw-orange group-hover:text-white transition-colors">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-mw-orange px-2.5 py-0.5 rounded-full bg-mw-orange/10 border border-mw-orange/20">
                      {ind.category}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-mw-orange transition-colors">
                      {ind.name}
                    </h3>
                    <p className="text-xs text-white/70 italic mt-1 leading-relaxed">
                      "{ind.tagline}"
                    </p>
                  </div>

                  {/* Overview snippet */}
                  <p className="text-xs text-white/60 line-clamp-3 leading-relaxed">
                    {ind.overview}
                  </p>

                  {/* Core Deliverable Tags */}
                  <div className="pt-3 border-t border-white/5 space-y-2">
                    <div className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">
                      Specialized Architecture Modules:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {ind.features.map((f) => (
                        <span
                          key={f.title}
                          className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/80"
                        >
                          {f.tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Verified Client Badge */}
                  <div className="pt-2 text-[11px] text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Proven in Portfolio: {ind.caseStudy.companyName}</span>
                  </div>
                </div>

                {/* Card Footer Link */}
                <div className="pt-6 mt-4 border-t border-white/5 flex items-center justify-between">
                  <div className="text-[11px] font-mono text-white/50">
                    Est. Turnaround: {ind.typicalTimeline}
                  </div>

                  <Link
                    to={`/industries/${ind.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-mw-orange group-hover:text-white group-hover:translate-x-1 transition-all"
                  >
                    <span>Explore Solutions</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Why Industry Engineering Matters: Problem vs Solution */}
        <FadeInSection className="rounded-3xl border border-white/10 bg-gradient-to-r from-blue-950/20 via-[#090d16] to-mw-orange/10 p-8 md:p-12 space-y-8 shadow-2xl">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-mw-orange font-bold">
              THE MINDWARE DIFFERENCE
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Why Generic Websites Fail Nigeria's Commercial Due Diligence
            </h3>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              When an international oil company, federal procurement board, or diaspora property investor evaluates your business, standard templates immediately trigger red flags.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Generic Agencies */}
            <div className="p-6 rounded-2xl bg-red-950/20 border border-red-500/20 space-y-3">
              <div className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-2">
                <span>✕ Typical Web Agencies in Nigeria</span>
              </div>
              <ul className="space-y-2 text-xs text-white/70 leading-relaxed">
                <li>• Use cookie-cutter foreign templates with zero understanding of Nigerian tender rules.</li>
                <li>• No NipeX pre-qualification, COREN engineering, or statutory compliance structure.</li>
                <li>• Sluggish mobile loading speeds that cause over 60% of smartphone visitors to bounce.</li>
                <li>• Basic contact forms with no automated WhatsApp routing or lead qualification.</li>
              </ul>
            </div>

            {/* Mindware Solution */}
            <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 space-y-3">
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                <span>✓ Mindware Industry-Engineered Architecture</span>
              </div>
              <ul className="space-y-2 text-xs text-white/80 leading-relaxed">
                <li>• Tailored modules (NipeX compliance, 3D site plans, VIN vehicle filters, sub-second checkout).</li>
                <li>• Embedded trust centers (CAC certificates, HSE metrics, verified title deeds, Carfax reports).</li>
                <li>• Sub-1.5 second loading speeds on Nigerian 3G/4G networks with edge CDN optimization.</li>
                <li>• Automated WhatsApp lead routing with instant customer dispatch and CRM integration.</li>
              </ul>
            </div>
          </div>
        </FadeInSection>

        {/* Executive Consultation Call to Action */}
        <FadeInSection className="rounded-3xl border border-white/10 bg-gradient-to-r from-mw-orange/15 via-[#090d16] to-purple-950/30 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="text-xs font-mono uppercase tracking-wider text-mw-orange font-bold">
              INDUSTRY-SPECIFIC DIGITAL CONSULTING
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Need a Custom Platform Engineered for Your Sector?
            </h3>
            <p className="text-sm text-white/70 leading-relaxed">
              Book a strategy briefing with our enterprise consultants. We analyze your sector's regulatory standards, competitor landscape, and high-value tender requirements to structure a custom platform proposal.
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
              href="https://wa.me/2348125082354?text=Hello%20Mindware%20Consulting%2C%20I%20want%20to%20discuss%20a%20digital%20platform%20for%20my%20industry%20sector."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </FadeInSection>
      </section>
    </div>
  );
}
