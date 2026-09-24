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
    categoryLabel: "Packages & Scope",
    question: "Which digital package is the right fit for my construction or engineering company?",
    answer: "Our packages match distinct organizational stages: Tier 1 (Starter Build, ₦175,000) is tailored for new startups needing an instant professional web presence and corporate emails. Tier 2 (Growth Engine, ₦295,000) is built for growing subcontractors and builders ready for client project showcases and CRM onboarding. Tiers 3 & 4 (Pro Automation & Enterprise Suite, ₦375,000–₦400,000) provide full workflow automation, bookkeeping integrations, and HR recruitment portals. Tiers 5 & 6 (₦475,000–₦595,000) are all-in-one institutional suites that include internal Project Management and HSE Safety Training Portals with corporate certifications.",
    highlight: "Not sure? Book a 15-min discovery call and our team will evaluate your operational needs free of charge."
  },
  {
    id: "hidden-fees",
    category: "packages",
    categoryLabel: "Packages & Scope",
    question: "Are there any hidden costs, setup charges, or surprise monthly fees?",
    answer: "No. Every package is a 100% transparent, done-for-you turnkey solution. What you see is exactly what you pay. Every single package includes your official domain name registration (.com or .com.ng), high-speed cloud web hosting, SSL certificate, professional business emails, weekly backups, and monthly performance reports for an entire 12-month cycle at zero extra cost.",
    highlight: "1 full year of domain registration and premium cloud web hosting is included in every package."
  },
  {
    id: "payment-milestones",
    category: "payments",
    categoryLabel: "Payments & Invoicing",
    question: "What is your payment structure and invoicing process?",
    answer: "We support flexible corporate payment terms. Projects commence with a 60% mobilization deposit, with the remaining 40% balance payable only upon project completion, quality assurance sign-off, and deployment. We issue formal Corporate Invoices and official receipts registered under Mindware Consulting Ltd (RC 1309926) for your company's accounting records.",
    highlight: "Official corporate invoices issued with corporate bank transfer options."
  },
  {
    id: "turnaround-timeline",
    category: "delivery",
    categoryLabel: "Delivery & Setup",
    question: "How quickly will our website and digital systems be completed and live?",
    answer: "Our delivery timelines are strictly managed to keep your projects on schedule: Tier 1 & 2 packages launch within 7 to 14 business days. Tier 3 & 4 (Pro Automation and Enterprise Suite) deploy within 14 to 21 business days. Tier 5 & 6 suites (including custom L&D and HSE portals) deploy in 3 to 4 weeks, including complete testing, data migration, and team onboarding sessions.",
    highlight: "Express delivery sprints are also available for urgent tender and pre-qualification deadlines."
  },
  {
    id: "existing-domain-migration",
    category: "delivery",
    categoryLabel: "Delivery & Setup",
    question: "What if we already have an existing domain name, website, or business emails?",
    answer: "We can easily connect your existing domain or migrate your digital presence seamlessly with zero downtime. If you already own your domain and hosting, our engineering team can allocate that budget toward custom CRM workflows, extra pages, or custom portal features.",
    highlight: "Zero downtime migration with full transfer assistance from our engineering team."
  },
  {
    id: "tier-upgrades",
    category: "packages",
    categoryLabel: "Packages & Scope",
    question: "Can we start with a lower tier and upgrade later as our company expands?",
    answer: "Absolutely. All Mindware digital solutions are engineered with modular scalability. If you begin with Tier 1 or Tier 2 today, you can upgrade to Tier 3, 4, or 6 at any point within 6 months simply by paying the price difference. Your initial investment is 100% protected and credited toward your upgrade.",
    highlight: "100% credit rollover when upgrading your tier within 6 months."
  },
  {
    id: "hse-pmp-training",
    category: "training",
    categoryLabel: "Training & Compliance",
    question: "How do the Project Management and HSE Training Portals work, and are certificates recognized?",
    answer: "Tiers 5 and 6 come pre-loaded with an internal corporate Learning & Development portal. Your site engineers, project managers, and field staff can log in, take structured modules, and complete compliance assessments. Certificates are issued with verifiable credentials that demonstrate regulatory safety readiness (HSE) and standard project management competence for corporate pre-qualifications and bids.",
    highlight: "Saves companies an estimated ₦180,000 to ₦350,000+ per employee in external training fees."
  },
  {
    id: "google-ads-roi",
    category: "packages",
    categoryLabel: "Packages & Scope",
    question: "What is included in the Tier 6 Paid Ads Campaign (Google Ads)?",
    answer: "The Tier 6 Google Ads package includes in-depth construction and B2B keyword research, high-converting ad copy creation, negative keyword filtering, conversion tracking setup, and 30 days of active campaign management. It connects directly to your high-conversion landing page to capture inbound commercial and residential client inquiries.",
    highlight: "Targeted to reach procurement leads, property developers, and corporate project owners."
  },
  {
    id: "post-launch-support",
    category: "support",
    categoryLabel: "Support & Ownership",
    question: "What ongoing support, maintenance, and backups do we receive?",
    answer: "Every package includes automated weekly cloud backups, routine WordPress/framework security updates, SSL monitoring, and monthly performance analytics. For Tiers 4, 5, and 6, you also receive a Dedicated Account Manager reachable via direct WhatsApp and telephone for priority assistance.",
    highlight: "Dedicated Account Manager included on Tiers 4, 5, and 6."
  },
  {
    id: "year-two-renewal",
    category: "support",
    categoryLabel: "Support & Ownership",
    question: "What happens after the first year? Do we own our website and data?",
    answer: "You retain 100% complete ownership of your domain, website codebase, corporate emails, CRM data, and portal content. After year one, you simply renew domain registration and cloud hosting at standard, transparent market rates (with zero markup or lock-in), or you are free to self-host wherever you prefer.",
    highlight: "100% intellectual property and asset ownership transferred directly to your company."
  }
];

export function PricingFAQ() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<string | null>("which-tier");

  const categories = [
    { id: "all", label: "All Questions" },
    { id: "packages", label: "Packages & Scope" },
    { id: "payments", label: "Payments & Invoicing" },
    { id: "delivery", label: "Delivery & Setup" },
    { id: "training", label: "Training & Compliance" },
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
            Everything you need to know about our 6 done-for-you digital growth packages, payment milestones, delivery process, and ROI guarantees.
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
              placeholder="Search pricing questions (e.g. payment terms, hosting, timeline, HSE training)..."
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
                  className="w-full py-3.5 px-5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp Now</span>
                </a>

                <Link
                  to="/contact"
                  className="w-full py-3.5 px-5 rounded-full bg-white text-mw-dark hover:bg-mw-orange hover:text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 shadow-md active:scale-95"
                >
                  <span>Request Custom Proposal</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="tel:+2348125082354"
                  className="w-full py-2.5 px-4 text-center text-xs text-white/50 hover:text-white transition-colors flex items-center justify-center gap-2"
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
