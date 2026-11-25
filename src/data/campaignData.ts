import { CanonicalEnquiryCategory } from "./companyStats";

export interface GrowthSeasonTrack {
  id: string;
  title: string;
  badge: string;
  enquiryCategory: CanonicalEnquiryCategory;
  targetBusinessProfile: string;
  problemSolved: string;
  frameworkFocus: string[];
  advisoryScopeNote: string;
  deliverableHighlights: string[];
  recommendedStartingNote: string;
  ctaText: string;
}

export const CAMPAIGN_OVERVIEW = {
  campaignCode: "business-growth-season-2026",
  title: "Mindware Business Growth Season 2026",
  subtitle: "Executive Digital Transformation & Commercial Growth Tracks",
  headline:
    "Strengthen Your Digital Foundation, Expand Customer Acquisition & Scale Business Operations.",
  intro:
    "Mindware Business Growth Season 2026 is a structured advisory initiative helping Nigerian executives, contractors, real estate developers, and ambitious enterprises align technology, customer acquisition, and operational execution under the ACQUIRE → GROW → OPTIMIZE → ACCELERATE → PROTECT framework.",
  scopeDisclosure:
    "All campaign tracks begin with a structured Business Growth Review. Final project scope, deliverables, and investment are confirmed formally in a written proposal tailored to your organization — with no hidden terms or unapproved promotional claims.",
};

export const GROWTH_SEASON_TRACKS: GrowthSeasonTrack[] = [
  {
    id: "digital-business-foundation",
    title: "Digital Business Foundation",
    badge: "Track 01 · Infrastructure & Trust",
    enquiryCategory: "digital-transformation",
    targetBusinessProfile:
      "Established Nigerian SMEs, corporate firms, and multi-unit organizations outgrowing informal websites or manual workflows.",
    problemSolved:
      "Slow or outdated online presence, fragmented corporate identity, lack of structured enquiry capture, and disconnected business tools.",
    frameworkFocus: ["ACQUIRE", "OPTIMIZE", "PROTECT"],
    advisoryScopeNote:
      "Scoped against our approved BUILD / GROW / TRANSFORM infrastructure tiers or custom enterprise architecture.",
    deliverableHighlights: [
      "Corporate digital presence & authority messaging audit",
      "Fast, mobile-first conversion architecture & enquiry routing",
      "Corporate email, analytics, and operational CRM readiness",
      "Security hardening, SSL compliance, and technical governance",
    ],
    recommendedStartingNote:
      "Eligible organizations may scope from standard BUILD / GROW packages (from ₦175,000) or request a bespoke transformation proposal.",
    ctaText: "Review Foundation Track",
  },
  {
    id: "visibility-growth-accelerator",
    title: "Visibility & Growth Accelerator",
    badge: "Track 02 · Pipeline & Demand",
    enquiryCategory: "marketing-customer-acquisition",
    targetBusinessProfile:
      "Commercial brands, B2B service firms, automotive dealers, and e-commerce operators needing qualified sales conversations.",
    problemSolved:
      "Low search visibility, inconsistent lead flow, wasted advertising budgets, and unmeasured marketing ROI.",
    frameworkFocus: ["ACQUIRE", "GROW", "ACCELERATE"],
    advisoryScopeNote:
      "Combines technical SEO, commercial landing pages, and conversion-tracked Meta, Google, and LinkedIn acquisition campaigns.",
    deliverableHighlights: [
      "Commercial keyword & competitor search-intent mapping",
      "Conversion-focused landing pages built for high-intent buyers",
      "Structured Google, Meta, and LinkedIn campaign architecture",
      "Lead qualification and WhatsApp/CRM handoff workflow",
    ],
    recommendedStartingNote:
      "Direct advertising spend is paid transparently to ad platforms and scoped alongside Mindware strategy management during review.",
    ctaText: "Review Visibility Track",
  },
  {
    id: "construction-business-growth",
    title: "Construction Business Growth",
    badge: "Track 03 · Flagship Sector Track",
    enquiryCategory: "construction-business-growth",
    targetBusinessProfile:
      "Civil engineering contractors, EPC firms, building contractors, structural consultants, and interior finishing companies.",
    problemSolved:
      "Weak digital proof during high-value tender evaluations, invisible project track records, and lost private-client RFPs.",
    frameworkFocus: ["ACQUIRE", "GROW", "OPTIMIZE", "PROTECT"],
    advisoryScopeNote:
      "Built on Mindware's proven flagship construction methodology demonstrated with Temamost, Solugans & Associates, and Cosmozel.",
    deliverableHighlights: [
      "Bid-ready company profile & verifiable project case study vault",
      "Capability statement & procurement pre-qualification architecture",
      "Commercial lead capture for private developers and institutional RFPs",
      "HSE, equipment, and engineering certification showcase",
    ],
    recommendedStartingNote:
      "Recommended for contractors preparing for institutional pre-qualification, private estates, or corporate facility bids.",
    ctaText: "Review Construction Track",
  },
  {
    id: "business-growth-development-advisory",
    title: "Business Growth & Development Advisory",
    badge: "Track 04 · Executive Strategy",
    enquiryCategory: "business-growth-consulting",
    targetBusinessProfile:
      "Managing directors, founders, and executive leadership teams preparing for expansion, restructuring, or digital system adoption.",
    problemSolved:
      "Revenue plateaus, unstandardized operational SOPs, founder bottlenecks, and misaligned sales and delivery workflows.",
    frameworkFocus: ["GROW", "OPTIMIZE", "ACCELERATE"],
    advisoryScopeNote:
      "Direct senior consultancy led by Mindware advisory leadership without bloated retainer overhead.",
    deliverableHighlights: [
      "Diagnostic review of commercial positioning & revenue bottlenecks",
      "Business development structuring & enterprise sales playbooks",
      "Digital tool & workflow adoption roadmap for internal teams",
      "B2B corporate systems training tailored to staff roles",
    ],
    recommendedStartingNote:
      "Includes initial executive Business Growth Review and a prioritized 90-day implementation roadmap upon engagement.",
    ctaText: "Review Advisory Track",
  },
  {
    id: "business-launch-digital-starter",
    title: "Business Launch & Digital Starter",
    badge: "Track 05 · New Ventures",
    enquiryCategory: "digital-transformation",
    targetBusinessProfile:
      "Newly incorporated Nigerian businesses (CAC-registered), spin-off ventures, and specialist practices launching into the market.",
    problemSolved:
      "Launching without credible digital positioning, clear service structure, or reliable channels for early customer acquisition.",
    frameworkFocus: ["ACQUIRE", "PROTECT"],
    advisoryScopeNote:
      "Aligns directly with Mindware's transparent BUILD and GROW foundation packages so new ventures launch cleanly and credibly.",
    deliverableHighlights: [
      "Credible corporate identity alignment & clear value proposition",
      "Mobile-responsive business website built for speed and trust",
      "Official business email, WhatsApp lead routing & Google visibility basics",
      "Clear roadmap to scale into GROW and TRANSFORM capabilities",
    ],
    recommendedStartingNote:
      "Starter websites begin at approved BUILD package tiers (₦175,000–₦295,000), confirmed during your review.",
    ctaText: "Review Launch Track",
  },
];
