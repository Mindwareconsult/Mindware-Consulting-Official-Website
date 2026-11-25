import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { 
  Plus, 
  Minus, 
  HelpCircle, 
  Search, 
  MessageSquare, 
  Phone, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  ShieldCheck,
  FileText
} from "lucide-react";
import { EASE } from "../lib/utils";
import { CONVERSION_CTAS } from "../data/companyStats";
import {
  trackPhoneClick,
  trackPrimaryCtaClick,
  trackWhatsAppClick,
} from "../lib/analytics";

export interface PricingFAQItem {
  id: string;
  category: "packages" | "payments" | "delivery" | "training" | "support";
  categoryLabel: string;
  question: string;
  answer: string;
  highlight?: string;
}

export const PRICING_FAQS: PricingFAQItem[] = [
  {
    id: "which-tier",
    category: "packages",
    categoryLabel: "BUILD · GROW · TRANSFORM",
    question: "How do I choose between BUILD, GROW, TRANSFORM packages and custom engagements?",
    answer: "Our packages follow your business growth stage: BUILD tiers (Starter Build ₦175,000 and Growth Engine ₦295,000) establish strong corporate websites, brand positioning, and inquiry capture. GROW tiers (Pro Automation ₦375,000 and Enterprise Suite ₦400,000) connect multi-channel visibility, SEO, and operational workflows. TRANSFORM tiers (₦475,000 and ₦595,000) add internal governance hubs, compliance documentation portals, and paid acquisition setup—while monthly retainers and custom software scopes are available whenever your requirements go beyond fixed tiers.",
    highlight: "Request a Business Growth Review to confirm the right fixed-scope, retainer, or custom engagement structure."
  },
  {
    id: "hidden-fees",
    category: "packages",
    categoryLabel: "Packages & Scope",
    question: "Are there any hidden setup charges within fixed-scope packages?",
    answer: "No. Fixed-scope packages clearly define all included deliverables upfront—covering initial domain registration, 12 months of managed cloud hosting, SSL setup, corporate emails, backups, and launch QA with formal invoicing.",
    highlight: "1 full year of domain registration and managed cloud hosting is included in every package."
  },
  {
    id: "payment-milestones",
    category: "payments",
    categoryLabel: "Payments & Invoicing",
    question: "What is your payment structure and corporate invoicing process?",
    answer: "Fixed-scope and custom projects generally commence with a 60% mobilization deposit, with the remaining 40% balance payable upon completion, quality assurance sign-off, and handover. Mindware Consulting Ltd (RC 1309926 · FIRS TIN 19660429-0001) issues formal corporate invoices and official receipts.",
    highlight: "Formal RC 1309926 corporate invoices issued with corporate bank transfer options."
  },
  {
    id: "turnaround-timeline",
    category: "delivery",
    categoryLabel: "Delivery & Setup",
    question: "How quickly will our digital platform or workflow system go live?",
    answer: "Typical delivery timelines run 2–4 weeks for BUILD platforms, 3–5 weeks for GROW automation and multi-channel systems, and 4–8 weeks for custom TRANSFORM portals or tailored software scopes.",
    highlight: "Milestone schedules are agreed upfront before engineering starts."
  },
  {
    id: "existing-domain-migration",
    category: "delivery",
    categoryLabel: "Delivery & Setup",
    question: "What if we already own a domain name, legacy website, or corporate email setup?",
    answer: "We handle zero-downtime migrations—upgrading legacy sites seamlessly without breaking existing corporate emails or search equity, and redirecting existing URLs cleanly into your upgraded structure.",
    highlight: "Safe legacy-to-modern website upgrades with email continuity preserved."
  },
  {
    id: "tier-upgrades",
    category: "packages",
    categoryLabel: "Packages & Scope",
    question: "Can we start with BUILD or GROW and transition to monthly retainers or TRANSFORM later?",
    answer: "Yes. Every Mindware build is modularly architected so businesses can launch foundational infrastructure quickly and add monthly SEO/visibility retainers, custom client portals, or consulting engagements as commercial volume expands.",
    highlight: "Modular scalability from foundational BUILD platforms into full TRANSFORM systems."
  },
  {
    id: "systems-governance",
    category: "training",
    categoryLabel: "Consulting & Systems",
    question: "How do the Operational Governance & Compliance Portals in TRANSFORM packages work?",
    answer: "TRANSFORM suites equip internal teams with structured operational workflow portals, documented SOP hubs, project tracking governance, and team onboarding sessions so adopted CRM and business systems actually stick inside daily operations.",
    highlight: "Focuses on corporate system adoption and organizational workflow readiness."
  },
  {
    id: "google-ads-roi",
    category: "packages",
    categoryLabel: "Acquisition & GROW",
    question: "What is included when we add Google Ads or ongoing SEO retainers?",
    answer: "Search and paid acquisition scopes include high-intent commercial keyword research, structured campaign setup, conversion event tracking, negative keyword filtering, and landing page alignment to connect buyer searches straight to consultation and WhatsApp inquiry channels.",
    highlight: "Available inside the Tier 6 Flagship or as an ongoing Monthly Growth Retainer."
  },
  {
    id: "post-launch-support",
    category: "support",
    categoryLabel: "Support & Ownership",
    question: "What ongoing technical maintenance and downtime protection do you provide?",
    answer: "Every package includes initial scheduled backups, security updates, and monthly check-ins. For continuous software updates, proactive monitoring, and priority support without downtime, organizations can remain on a flexible Monthly Maintenance & Growth Retainer.",
    highlight: "Proactive ongoing software updates and reliable technical support post-launch."
  },
  {
    id: "year-two-renewal",
    category: "support",
    categoryLabel: "Support & Ownership",
    question: "Do we retain full ownership of our domain, codebase, and business data?",
    answer: "Yes. You retain complete ownership of your domain name, corporate website assets, business email accounts, and customer data—with transparent standard annual hosting/domain renewals and zero lock-in.",
    highlight: "100% domain, asset, and client data ownership transferred to your company."
  }
];

export function PricingFAQ() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<string | null>("which-tier");

  const categories = [
    { id: "all", label: "All Questions" },
    { id: "packages", label: "BUILD · GROW · TRANSFORM" },
    { id: "payments", label: "Payments & Invoicing" },
    { id: "delivery", label: "Delivery & Setup" },
    { id: "training", label: "Consulting & Systems" },
    { id: "support", label: "Support & Ownership" },
  ];

  const filteredFaqs = useMemo(() => {
    return PRICING_FAQS.filter((faq) => {
      const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const matchesSearch = 
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query) ||
        faq.categoryLabel.toLowerCase().includes(query) ||
        (faq.highlight && faq.highlight.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Structured Data for SEO (JSON-LD FAQPage)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": PRICING_FAQS.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section className="py-24 lg:py-32 border-t border-white/5 bg-[#02040a] relative overflow-hidden" id="faq">
      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Background Glows */}
      <div className="absolute top-1/4 -right-48 w-96 h-96 bg-mw-orange/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-48 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-mw-orange text-xs font-bold uppercase tracking-widest mb-6">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions? We Have Answers</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 text-white leading-tight">
            Frequently Asked <span className="text-gradient">Questions.</span>
          </h2>

          <p className="text-lg md:text-xl text-white/60 font-light leading-relaxed">
            Everything you need to know about our BUILD, GROW, and TRANSFORM tiers, retainers, custom scopes, invoicing, and post-launch support.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="max-w-4xl mx-auto mb-12 space-y-6">
          {/* Instant Search Bar */}
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search pricing questions (e.g. retainers, payment terms, hosting, timeline)..."
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-14 pr-12 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-mw-orange focus:bg-white/[0.05] focus:ring-1 focus:ring-mw-orange transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-white/40 hover:text-white px-2 py-1 rounded bg-white/10"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all ${
                  activeCategory === cat.id
                    ? "bg-mw-orange text-white shadow-md shadow-mw-orange/20"
                    : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/5"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Grid: FAQ Accordion on Left, Conversion Help Box on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 max-w-6xl mx-auto items-start">
          
          {/* Main Accordion Column */}
          <div className="lg:col-span-8 space-y-4">
            {filteredFaqs.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-white/[0.02] border border-white/10">
                <p className="text-white/60 text-base mb-4">No questions found matching "{searchQuery}".</p>
                <button
                  onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}
                  className="text-mw-orange hover:text-orange-400 text-sm font-semibold underline"
                >
                  Reset search &amp; show all questions
                </button>
              </div>
            ) : (
              filteredFaqs.map((faq) => {
                const isOpen = openIndex === faq.id;
                return (
                  <motion.div
                    key={faq.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`rounded-2xl transition-all duration-300 overflow-hidden border ${
                      isOpen
                        ? "bg-white/[0.04] border-mw-orange/40 shadow-[0_4px_24px_rgba(249,115,22,0.06)]"
                        : "bg-white/[0.015] border-white/10 hover:border-white/20 hover:bg-white/[0.03]"
                    }`}
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : faq.id)}
                      className="w-full flex items-start justify-between p-6 sm:p-7 text-left gap-4"
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${faq.id}`}
                    >
                      <div className="space-y-1 pr-2">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-mw-orange font-semibold">
                          {faq.categoryLabel}
                        </span>
                        <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                          {faq.question}
                        </h3>
                      </div>
                      
                      <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-all duration-300 ${
                        isOpen 
                          ? "bg-mw-orange border-mw-orange text-white" 
                          : "border-white/20 text-white/60 group-hover:text-white"
                      }`}>
                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`faq-answer-${faq.id}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: EASE }}
                        >
                          <div className="px-6 sm:px-7 pb-6 pt-1 text-sm sm:text-base text-white/70 font-light leading-relaxed border-t border-white/5 space-y-4">
                            <p>{faq.answer}</p>
                            
                            {faq.highlight && (
                              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-mw-orange/10 border border-mw-orange/20 text-xs text-orange-200">
                                <Sparkles className="w-4 h-4 text-mw-orange shrink-0 mt-0.5" />
                                <span><strong className="font-semibold text-white">Key Takeaway:</strong> {faq.highlight}</span>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            )}
          </div>

          {/* Sticky Side Conversion Card */}
          <div className="lg:col-span-4 sticky top-32">
            <div className="rounded-3xl p-8 bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-mw-orange/10 rounded-full blur-2xl pointer-events-none" />

              <div className="w-12 h-12 rounded-2xl bg-mw-orange/20 border border-mw-orange/30 flex items-center justify-center mb-6 text-mw-orange">
                <MessageSquare className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-bold text-white mb-3">
                Have a Specific Requirement?
              </h3>

              <p className="text-sm text-white/60 leading-relaxed font-light mb-6">
                Our senior directors consult directly with construction firms and commercial enterprises to tailor packages to tender milestones and budget frameworks.
              </p>

              {/* Guarantees List */}
              <div className="space-y-3 mb-8 pb-6 border-b border-white/10">
                <div className="flex items-center gap-2.5 text-xs text-white/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Free 15-Minute Technical Consultation</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-white/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Written Proposal &amp; Milestone Scope</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-white/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Zero Lock-in, 100% Asset Ownership</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <a
                  href="https://wa.me/2348125082354?text=Hello%20Mindware%20Consulting%2C%20I%20have%20a%20question%20regarding%20your%20digital%20growth%20pricing%20packages."
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick("pricing-faq", "packages")}
                  className="w-full min-h-[44px] py-3.5 px-5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp Now</span>
                </a>

                <Link
                  to={CONVERSION_CTAS.primaryPath}
                  onClick={() => trackPrimaryCtaClick("pricing-faq", CONVERSION_CTAS.primaryPath)}
                  className="w-full min-h-[44px] py-3.5 px-5 rounded-full bg-white text-mw-dark hover:bg-mw-orange hover:text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 shadow-md active:scale-95"
                >
                  <span>{CONVERSION_CTAS.primaryLabel}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="tel:+2348125082354"
                  onClick={() => trackPhoneClick("pricing-faq")}
                  className="w-full min-h-[44px] py-2.5 px-4 text-center text-xs text-white/50 hover:text-white transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-mw-orange" />
                  <span>Or call +234 812 508 2354</span>
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
