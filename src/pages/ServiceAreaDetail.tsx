import React, { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  MapPin,
  Building2,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  Compass,
  Phone,
  MessageSquare,
  HelpCircle,
  Globe,
  Award,
  Layers,
  ChevronDown,
  Sparkles,
  ExternalLink
} from "lucide-react";
import {
  getStateBySlug,
  getNeighboringStates,
  SERVICE_AREAS,
  StateServiceArea
} from "../data/serviceAreasData";
import { LocalMapEmbed } from "../components/service-areas/LocalMapEmbed";
import { SEO } from "../components/SEO";
import { FadeInSection } from "../components/FadeInSection";
import { cn, EASE } from "../lib/utils";

export function ServiceAreaDetail() {
  const { stateSlug } = useParams<{ stateSlug: string }>();
  const stateData = stateSlug ? getStateBySlug(stateSlug) : undefined;

  // State for interactive FAQs
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // State for interactive consultation form
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formCompany, setFormCompany] = useState("");
  const [formService, setFormService] = useState("Web Design & SEO");

  // If state not found, redirect to parent service areas directory
  if (!stateData) {
    return (
      <div className="bg-[#02040a] min-h-screen text-white pt-36 pb-24 text-center px-6">
        <div className="max-w-xl mx-auto space-y-5">
          <Compass className="w-16 h-16 text-mw-orange mx-auto opacity-70" />
          <h1 className="text-3xl font-bold font-display text-white">State Territory Not Found</h1>
          <p className="text-sm text-white/60">
            We provide local SEO and web development across all 36 States of Nigeria and the FCT. Browse our national directory to select your territory.
          </p>
          <div className="pt-4">
            <Link
              to="/service-areas"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-mw-orange text-white font-bold text-xs uppercase tracking-wider"
            >
              <span>Explore All 37 Service Areas</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const neighboringStates = getNeighboringStates(stateData);

  // Schema.org LocalBusiness + FAQPage JSON-LD
  const schemaStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `https://mindwareconsulting.com/service-areas/${stateData.slug}#localbusiness`,
        "name": `Mindware Consulting Ltd - ${stateData.name}`,
        "description": stateData.metaDescription,
        "url": `https://mindwareconsulting.com/service-areas/${stateData.slug}`,
        "telephone": "+2348125082354",
        "email": "mindwareconsultingltd@gmail.com",
        "priceRange": "₦₦₦",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": stateData.capital,
          "addressRegion": stateData.shortName,
          "addressCountry": "NG"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": stateData.coordinates.lat,
          "longitude": stateData.coordinates.lng
        },
        "areaServed": [
          {
            "@type": "AdministrativeArea",
            "name": stateData.name
          },
          ...stateData.commercialHubs.map((hub) => ({
            "@type": "City",
            "name": hub
          }))
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": `Digital Services in ${stateData.name}`,
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": `Custom Web Design & Development in ${stateData.shortName}`
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": `Local SEO & Google Search Domination in ${stateData.shortName}`
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": `Corporate IT, PMP® & HSE Training in ${stateData.shortName}`
              }
            }
          ]
        }
      },
      {
        "@type": "FAQPage",
        "@id": `https://mindwareconsulting.com/service-areas/${stateData.slug}#faq`,
        "mainEntity": stateData.localFaqs.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      }
    ]
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="bg-[#02040a] min-h-screen text-white pt-28 pb-24">
      <SEO
        title={stateData.metaTitle}
        description={stateData.metaDescription}
      />

      {/* Structured Data Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaStructuredData) }}
      />

      {/* Hero Header */}
      <section className="relative overflow-hidden py-14 md:py-20 border-b border-white/5">
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-mw-orange/15 via-blue-600/10 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs md:text-sm text-white/50 mb-6 flex-wrap">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/service-areas" className="hover:text-white transition-colors">Service Areas</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-semibold">{stateData.name}</span>
          </div>

          <div className="max-w-4xl space-y-6">
            {/* Unboxed Editorial Metadata Kicker */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-white/60 font-medium">
              <span className="text-mw-orange font-semibold flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-mw-orange inline shrink-0" />
                {stateData.name} Local Authority
              </span>
              <span aria-hidden="true" className="text-white/20">·</span>
              <span>{stateData.zone} Zone</span>
              <span aria-hidden="true" className="text-white/20">·</span>
              <span className="font-mono tabular-nums">{stateData.lgasCount} LGAs Covered</span>
              <span aria-hidden="true" className="text-white/20">·</span>
              <span className="text-emerald-400 font-medium">{stateData.officeType}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white tracking-tight leading-[1.08] [text-wrap:balance]">
              Web Design, Local SEO & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-mw-orange via-amber-300 to-emerald-400">
                Digital Dominance in {stateData.shortName}.
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-3xl leading-relaxed font-normal">
              Mindware Consulting engineers high-converting corporate websites, local Google search domination, and enterprise cloud software for businesses, contractors, and institutions across <strong>{stateData.capital}</strong>, <strong>{stateData.commercialHubs.slice(0, 3).join(", ")}</strong>, and all {stateData.lgasCount} Local Government Areas in {stateData.name}.
            </p>

            {/* Quick Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <a
                href="#local-consultation"
                className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-full bg-mw-orange hover:bg-mw-orange-hover text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-mw-orange/20 active:scale-[0.98] text-center"
              >
                <span>Request {stateData.shortName} Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={`https://wa.me/2348125082354?text=Hello%20Mindware%20Consulting%2C%20I%20am%20interested%20in%20web%20design%20and%20local%20SEO%20for%20my%20business%20in%20${encodeURIComponent(
                  stateData.name
                )}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider transition-all active:scale-[0.98] text-center"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Dedicated Desk</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="container mx-auto px-6 md:px-12 py-12 md:py-16 space-y-16">
        {/* Section 1: Interactive Map & Landmark Navigator */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-mw-orange font-bold">
                GEOGRAPHIC REACH & LANDMARKS
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                Navigating {stateData.name} Commercial Centers
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-white/60 max-w-md">
              Click on any landmark below to update the interactive map and review specific economic zoning across {stateData.shortName}.
            </p>
          </div>

          <LocalMapEmbed stateData={stateData} />
        </section>

        {/* Section 2: Local Economic Context & Industry Drivers */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Economic Landscape</span>
              </div>

              <h3 className="text-2xl font-bold text-white leading-snug">
                Powering Commercial Growth Across {stateData.shortName}
              </h3>

              <p className="text-sm text-white/70 leading-relaxed">
                {stateData.economicOverview}
              </p>

              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="text-xs uppercase tracking-wider text-white/50 font-semibold">
                  Dominant Commercial Sectors in {stateData.shortName}:
                </div>
                <div className="space-y-2">
                  {stateData.dominantIndustries.map((ind) => (
                    <div key={ind} className="flex items-center gap-2.5 text-xs text-white/90">
                      <CheckCircle2 className="w-4 h-4 text-mw-orange shrink-0" />
                      <span>{ind}</span>
                    </div>
                  ))}
                </div>
              </div>

              {stateData.officeAddress && (
                <div className="pt-4 border-t border-white/10 text-xs text-white/60 flex items-start gap-2">
                  <Building2 className="w-4 h-4 text-mw-orange shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Official Facility Address:</span>
                    <span>{stateData.officeAddress}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Featured Client Quote (if available) */}
            {stateData.featuredClient && (
              <div className="p-7 rounded-3xl border border-mw-orange/20 bg-gradient-to-br from-mw-orange/10 to-transparent space-y-3">
                <div className="text-xs font-mono font-bold text-mw-orange uppercase tracking-wider">
                  Verified Local Client Outcome
                </div>
                <p className="text-sm text-white/90 italic leading-relaxed">
                  "{stateData.featuredClient.quote}"
                </p>
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white block">{stateData.featuredClient.name}</span>
                    <span className="text-white/60">{stateData.featuredClient.company}</span>
                  </div>
                  <span className="text-emerald-400 font-mono font-bold">Verified Result</span>
                </div>
              </div>
            )}
          </div>

          {/* Section 3: Tailored Local Services Highlights */}
          <div className="lg:col-span-7 space-y-6">
            <div className="mb-2">
              <span className="text-xs font-mono uppercase tracking-wider text-mw-orange font-bold">
                TAILORED SOLUTIONS
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                How Mindware Serves {stateData.shortName} Businesses
              </h3>
            </div>

            <div className="space-y-4">
              {stateData.localServicesHighlights.map((service, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-3xl border border-white/10 bg-white/[0.02] hover:border-mw-orange/40 hover:bg-white/[0.04] transition-all space-y-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h4 className="text-lg font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-mw-orange" />
                      <span>{service.title}</span>
                    </h4>
                    <span className="text-[11px] font-mono text-mw-orange font-medium">
                      Local Advantage
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="pt-2 border-t border-white/5 text-xs text-emerald-400 font-medium flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Commercial Benefit: {service.benefit}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Hubs Coverage List */}
            <div className="p-6 rounded-3xl border border-white/10 bg-[#090d16] space-y-3">
              <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Compass className="w-4 h-4 text-mw-orange" />
                <span>Full LGA & Territorial Coverage Across {stateData.name}:</span>
              </div>
              <p className="text-xs text-white/60 leading-relaxed">
                We provide on-site technical consultations, project handovers, and 24/7 cloud support across all {stateData.lgasCount} LGAs including {stateData.commercialHubs.join(", ")}, with dedicated account managers and rapid response times.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Local FAQs */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-mw-orange font-bold">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Questions About Digital Services in {stateData.shortName}
            </h3>
            <p className="text-xs sm:text-sm text-white/60">
              Clear answers regarding pricing in Naira, local delivery, and Google ranking timelines in {stateData.shortName}.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {stateData.localFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
                  >
                    <span className="text-sm sm:text-base font-bold text-white flex items-center gap-2.5">
                      <HelpCircle className="w-4 h-4 text-mw-orange shrink-0" />
                      <span>{faq.question}</span>
                    </span>
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 text-white/50 shrink-0 transition-transform duration-200",
                        isOpen && "rotate-180 text-mw-orange"
                      )}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-white/70 leading-relaxed border-t border-white/5">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 5: Interactive Local Consultation Form */}
        <section id="local-consultation" className="scroll-mt-32">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#090d16] via-[#0d1627] to-[#1a0e0a] p-5 sm:p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-4">
                <span className="text-xs font-mono uppercase tracking-wider text-mw-orange font-bold">
                  LOCAL STRATEGY DESK
                </span>
                <h3 className="text-2xl sm:text-4xl font-display font-bold text-white leading-tight">
                  Schedule a Free Digital Strategy Consultation for {stateData.name}
                </h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  Speak directly with our regional business technology consultants. We will audit your current Google search presence in {stateData.shortName}, analyze your competitors, and provide an actionable growth blueprint.
                </p>

                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2 text-xs text-white/80">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Complimentary Local SEO & Competitor Keyword Audit</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/80">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Transparent Naira Pricing with Zero Hidden Foreign Exchange Fees</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/80">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Direct WhatsApp & On-Site Consultation Availability</span>
                  </div>
                </div>
              </div>

              {/* Form Column */}
              <div className="lg:col-span-6">
                <div className="p-4 sm:p-6 md:p-8 rounded-2xl bg-black/60 border border-white/15 backdrop-blur-xl">
                  {formSubmitted ? (
                    <div className="text-center py-8 space-y-4 animate-fade-in">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <h4 className="text-xl font-bold text-white">Consultation Request Received!</h4>
                      <p className="text-xs text-white/70 max-w-sm mx-auto">
                        Thank you, {formName}. Our regional consulting lead for <strong>{stateData.name}</strong> will contact your team via phone and email within 2 hours.
                      </p>
                      <button
                        onClick={() => setFormSubmitted(false)}
                        className="text-xs text-mw-orange hover:underline font-semibold"
                      >
                        Submit another request
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      <div className="text-sm font-bold text-white mb-2">
                        Get Your Free {stateData.shortName} Growth Proposal
                      </div>

                      <div>
                        <label className="block text-xs text-white/70 mb-1.5 font-medium">Your Full Name</label>
                        <input
                          type="text"
                          required
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          placeholder="e.g. Adebayo Johnson"
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white text-base placeholder-white/40 focus:outline-none focus:border-mw-orange focus:ring-1 focus:ring-mw-orange/30 transition-all"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-white/70 mb-1.5 font-medium">Phone / WhatsApp</label>
                          <input
                            type="tel"
                            required
                            value={formPhone}
                            onChange={(e) => setFormPhone(e.target.value)}
                            placeholder="0801 234 5678"
                            className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white text-base placeholder-white/40 focus:outline-none focus:border-mw-orange focus:ring-1 focus:ring-mw-orange/30 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-white/70 mb-1.5 font-medium">Company / Business</label>
                          <input
                            type="text"
                            required
                            value={formCompany}
                            onChange={(e) => setFormCompany(e.target.value)}
                            placeholder="e.g. Apex Industrial Ltd"
                            className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white text-base placeholder-white/40 focus:outline-none focus:border-mw-orange focus:ring-1 focus:ring-mw-orange/30 transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs text-white/70 mb-1.5 font-medium">Primary Service Needed</label>
                        <select
                          value={formService}
                          onChange={(e) => setFormService(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-[#090d16] border border-white/15 text-white text-base focus:outline-none focus:border-mw-orange focus:ring-1 focus:ring-mw-orange/30 transition-all"
                        >
                          <option value="Web Design & SEO">Web Design & Local SEO</option>
                          <option value="E-Commerce & Online Store">E-Commerce & Payment Integration</option>
                          <option value="Corporate Portal & Software">Custom Corporate Web Application</option>
                          <option value="PMP / HSE Corporate Training">PMP® & HSE Professional Training</option>
                          <option value="Full Digital Transformation">Complete Digital Transformation</option>
                        </select>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3.5 px-6 rounded-xl bg-mw-orange hover:bg-mw-orange-hover text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-mw-orange/20 mt-2 hover:scale-[1.01] active:scale-[0.99]"
                      >
                        Request {stateData.shortName} Consultation
                      </button>

                      <div className="text-[11px] text-white/40 text-center">
                        Prefer an instant call? Phone: <a href="tel:+2348125082354" className="text-white/70 hover:text-white underline">+234 812 508 2354</a>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Neighboring States in Geopolitical Zone (SEO Link Cluster) */}
        {neighboringStates.length > 0 && (
          <section className="space-y-6 pt-4 border-t border-white/10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-mw-orange font-bold">
                  REGIONAL INTERNAL LINKING
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  Explore Other States in the {stateData.zone} Zone
                </h3>
              </div>

              <Link
                to="/service-areas"
                className="text-xs font-bold text-white/70 hover:text-white flex items-center gap-1.5"
              >
                <span>View All 36 States + FCT</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {neighboringStates.map((neighbor) => (
                <Link
                  key={neighbor.id}
                  to={`/service-areas/${neighbor.slug}`}
                  className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-mw-orange/50 hover:bg-white/[0.05] transition-all space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white group-hover:text-mw-orange transition-colors">
                      {neighbor.name}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-white/40 group-hover:text-mw-orange group-hover:translate-x-1 transition-all" />
                  </div>
                  <div className="text-[11px] text-white/50">Capital: {neighbor.capital}</div>
                  <div className="text-[10px] text-white/40 truncate">
                    Hubs: {neighbor.commercialHubs.slice(0, 2).join(", ")}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
