import { COMPANY_INFO } from "./companyStats";

export interface GrowthSeason2026Offer {
  id: string;
  number: string;
  name: string;
  priceRange: string;
  audience: string;
  summary: string;
  focusAreas: string[];
  whatsappMessage: string;
  isFeatured?: boolean;
}

export interface CampaignPortfolioEntry {
  id: string;
  client: string;
  sector: string;
  serviceDelivered: string;
  liveUrl: string;
  image?: string;
  summary: string;
  isRedesignComparison?: boolean;
  beforeUrl?: string;
  beforeImage?: string;
  afterImage?: string;
  companionPlatform?: {
    name: string;
    liveUrl: string;
    role: string;
  };
}

export interface SeoVisibilityFoundation {
  id: string;
  stepCode: string;
  title: string;
  description: string;
}

export interface CampaignFaqItem {
  id: string;
  question: string;
  answer: string;
}

export const CAMPAIGN_2026_CONSTANTS = {
  campaignCode: "business-growth-season-2026",
  title: "Mindware Business Growth Season 2026",
  canonicalPath: "/business-growth-season-2026/",
  canonicalUrl: "https://mindwareconsult.com.ng/business-growth-season-2026/",
  deadline: "December 31, 2026",
  primaryHeadline: "DON'T ENTER 2027 WITH THE SAME BUSINESS PROBLEMS.",
  subheadline:
    "Get the digital presence, visibility, customer acquisition systems and business growth support your company needs to compete, attract better customers and grow in 2027.",
  supportingCopy:
    "Your business deserves more than another year of inconsistent enquiries, poor online visibility and missed opportunities. Mindware helps businesses build stronger digital foundations, attract customers and establish systems for sustainable growth.",
  primaryCtaLabel: "PREPARE MY BUSINESS FOR 2027",
  secondaryCtaLabel: "SPEAK WITH A MINDWARE GROWTH CONSULTANT",
  primaryWhatsappMessage:
    "Hello Mindware Consulting, I saw your Business Growth Season 2026 campaign and I'm interested in preparing my business for 2027. I'd like to know more about your growth solutions.",
  seoTitle: "Mindware Business Growth Season 2026 | Prepare Your Business for 2027",
  seoDescription:
    "Don't enter 2027 with the same business problems. Get the digital presence, visibility, customer acquisition systems and business growth support your company needs.",
  ogImage: "https://mindwareconsult.com.ng/og/business-growth-season-2026.jpg",
  ogImageAlt:
    "Mindware Business Growth Season 2026 — Corporate Growth Strategy & Digital Infrastructure",
} as const;

export function buildCampaignWhatsAppHref(message: string): string {
  return `${COMPANY_INFO.whatsappUrl}?text=${encodeURIComponent(message)}`;
}

export const READINESS_PAIN_POINTS = [
  {
    number: "01",
    title: "Prospective customers cannot easily find your business online",
    description:
      "Buyers searching on Google or verifying suppliers before making contact encounter broken profiles, incomplete listings, or stronger competitors.",
  },
  {
    number: "02",
    title: "A poor or outdated website that does not inspire trust",
    description:
      "Slow loading speeds, awkward mobile formatting, and dated design cause decision-makers and corporate clients to question credibility before ever speaking with you.",
  },
  {
    number: "03",
    title: "Inconsistent client enquiries and weak customer acquisition systems",
    description:
      "Relying only on word-of-mouth or occasional referrals leaves revenue unpredictable from month to month without a dependable inbound enquiry channel.",
  },
  {
    number: "04",
    title: "Lack of a structured digital marketing strategy",
    description:
      "Posting sporadically on social media or boosting posts without targeting, tracking, or conversion architecture wastes time and budget without measurable pipeline.",
  },
  {
    number: "05",
    title: "Poor business positioning and unclear digital identity",
    description:
      "When prospects cannot quickly understand what you do, who you serve, and why they should trust you over cheaper alternatives, conversations stall on price.",
  },
  {
    number: "06",
    title: "Difficulty converting enquiries into paying customers",
    description:
      "Weak service breakdowns, missing enquiry pathways, slow follow-up, and disjointed WhatsApp or email handling cause warm leads to go cold.",
  },
  {
    number: "07",
    title: "Lack of internal systems and processes for sustainable growth",
    description:
      "Informal workflows, disconnected tools, and founder-dependent operations make scaling beyond current capacity stressful and hard to sustain into 2027.",
  },
] as const;

export const CAMPAIGN_2026_OFFERS: GrowthSeason2026Offer[] = [
  {
    id: "digital-business-foundation",
    number: "01",
    name: "Digital Business Foundation",
    priceRange: "₦150,000–₦400,000+",
    audience: "SMEs & established companies replacing outdated websites or informal footprints",
    summary:
      "Establish a modern, mobile-responsive corporate website, professional brand presentation, business email setup, and direct enquiry capture built to inspire immediate client confidence.",
    focusAreas: [
      "Responsive corporate website design or complete site upgrade",
      "Clear service architecture and structured WhatsApp / RFQ enquiry capture",
      "Foundational on-page SEO and technical setup for search readiness",
      "Corporate email and domain / hosting alignment scoped during review",
    ],
    whatsappMessage:
      "Hello Mindware Consulting, I saw your Business Growth Season 2026 campaign and I'm interested in Digital Business Foundation (₦150,000–₦400,000+). Please share how we can scope this for my business.",
  },
  {
    id: "visibility-growth-accelerator",
    number: "02",
    name: "Visibility & Growth Accelerator",
    priceRange: "₦50,000–₦250,000+",
    audience: "Businesses needing stronger Google search presence, local visibility & consistent enquiries",
    summary:
      "Position your business where high-intent customers are actively searching through Google Business Profile optimization, search engine optimization, and structured acquisition support.",
    focusAreas: [
      "Technical, local, and Schema.org SEO alignment",
      "Google Business Profile setup and local search optimization",
      "Conversion-focused landing architecture and campaign setup guidance",
      "Structured lead routing into WhatsApp and business enquiry channels",
    ],
    whatsappMessage:
      "Hello Mindware Consulting, I saw your Business Growth Season 2026 campaign and I'm interested in Visibility & Growth Accelerator (₦50,000–₦250,000+). I'd like to discuss improving our visibility and enquiries.",
  },
  {
    id: "construction-business-growth",
    number: "03",
    name: "Construction Business Growth",
    priceRange: "₦200,000–₦450,000+",
    audience: "Civil engineering, building construction, MEP & specialist contractors",
    summary:
      "Upgrade how institutional developers, private property owners, and tender teams verify your engineering track record, completed projects, and service scope online.",
    focusAreas: [
      "Construction-focused corporate platform and project showcase layout",
      "Clear presentation of engineering capabilities, safety & sector focus",
      "Direct tender, BOQ/RFQ, and WhatsApp consultation pathways",
      "Construction-aligned SEO metadata for regional & commercial discovery",
    ],
    isFeatured: true,
    whatsappMessage:
      "Hello Mindware Consulting, I saw your Business Growth Season 2026 campaign and I'm interested in Construction Business Growth (₦200,000–₦450,000+). We'd like to strengthen our construction company's digital presence.",
  },
  {
    id: "construction-business-pro",
    number: "04",
    name: "Construction Business Pro",
    priceRange: "₦450,000+",
    audience: "Established construction & engineering firms seeking deeper commercial positioning & systems",
    summary:
      "A comprehensive growth and digital transformation scope for larger contractors requiring multi-layered service/project portals, stronger search positioning, and structured acquisition workflows.",
    focusAreas: [
      "Expanded corporate architecture, project case galleries & capability framing",
      "Multi-service SEO strategy and Google Business Profile alignment",
      "Structured client & procurement enquiry workflows",
      "Strategic advisory and custom portal scope confirmed during review",
    ],
    isFeatured: true,
    whatsappMessage:
      "Hello Mindware Consulting, I saw your Business Growth Season 2026 campaign and I'm interested in Construction Business Pro (₦450,000+). Please share next steps for a scoped proposal.",
  },
  {
    id: "business-growth-advisory",
    number: "05",
    name: "Business Growth Advisory",
    priceRange: "₦50,000–₦350,000+",
    audience: "Business owners & directors fixing positioning, sales conversion & growth systems",
    summary:
      "Practical business development and management consulting to diagnose growth bottlenecks, sharpen commercial positioning, and align workflows for stronger conversion.",
    focusAreas: [
      "Commercial positioning & buyer-journey diagnostic review",
      "Customer acquisition and enquiry-to-sale conversion alignment",
      "Operational workflow clarity and digital system adoption recommendations",
      "Actionable growth roadmap grounded in your market realities",
    ],
    whatsappMessage:
      "Hello Mindware Consulting, I saw your Business Growth Season 2026 campaign and I'm interested in Business Growth Advisory (₦50,000–₦350,000+). I'd like to speak with a consultant.",
  },
  {
    id: "business-launch",
    number: "06",
    name: "Business Launch",
    priceRange: "₦100,000–₦350,000+",
    audience: "New businesses & startups building a credible market-ready presence from day one",
    summary:
      "Launch into the market with clear service messaging, a fast mobile-responsive business website, official contact channels, and foundational online visibility.",
    focusAreas: [
      "Clean startup website structured around your core offer and target buyers",
      "Brand presentation clarity and mobile-first user experience",
      "WhatsApp, enquiry form, and corporate email configuration",
      "Foundational search indexing and scalable structure for 2027 growth",
    ],
    whatsappMessage:
      "Hello Mindware Consulting, I saw your Business Growth Season 2026 campaign and I'm interested in Business Launch (₦100,000–₦350,000+) for our business.",
  },
];

export const SCOPE_TRANSPARENCY_NOTE =
  "Indicative campaign pricing ranges depend on final project scope, number of pages or custom features, SEO depth, campaign channels, or advisory requirements. Final investment and timelines are confirmed in writing after your Business Growth Review — with no hidden charges or unapproved claims.";

export const CAMPAIGN_PORTFOLIO_ENTRIES: CampaignPortfolioEntry[] = [
  {
    id: "temamost-redesign",
    client: "Temamost Nigeria Limited",
    sector: "Civil Engineering & Construction · Port Harcourt",
    serviceDelivered: "Complete Website Redesign & Multi-Device Transformation",
    liveUrl: "https://www.constructionstemamost.com/",
    beforeUrl: "https://temamost.com/",
    beforeImage: "/assets/Temamost Website Design compressed.jpg",
    afterImage: "/assets/Temamost Website Upgrade Showcase.jpg",
    isRedesignComparison: true,
    summary:
      "Re-engineered Temamost's legacy web presence (temamost.com) into a modern, responsive civil construction platform (constructionstemamost.com) aligned with its navy, red, and white corporate identity and direct quote workflows.",
  },
  {
    id: "harmostructs-engineering",
    client: "Harmostructs Engineering",
    sector: "Civil & Structural Engineering",
    serviceDelivered: "Website Design & SEO",
    liveUrl: "https://harmostructsengineering.com.ng/",
    image: "/assets/harmostructs ltd.jpg",
    summary:
      "Corporate platform engineered to present multidisciplinary structural engineering, civil works, and turnkey project delivery clearly to private and institutional clients.",
  },
  {
    id: "eclectic-seals",
    client: "Eclectic Seals",
    sector: "Interior Architecture, Building & Landscape · Abuja",
    serviceDelivered: "Website Design & SEO",
    liveUrl: "https://eclecticseals.com.ng/",
    image: "/assets/Eclectic Seals Website Design And SEO.jpg",
    summary:
      "Refined digital showcase presenting luxury interior design, building construction, and landscape projects with search-ready architecture.",
  },
  {
    id: "watech-concrete",
    client: "Watech Concrete Solutions",
    sector: "Construction & Ready-Mix Concrete · Lagos",
    serviceDelivered: "Corporate Website Design",
    liveUrl: "https://watechconcretesolutions.com/",
    image: "/assets/Watech Website Design.jpg",
    summary:
      "Fast-loading commercial platform presenting ready-mix concrete production, structural supply standards, and direct client enquiry routing.",
  },
  {
    id: "juptree-ecosystem",
    client: "Juptree Automobile & Juptree China Direct",
    sector: "Automotive Dealership & Direct Sourcing Ecosystem",
    serviceDelivered: "Multi-Platform Automotive Digital Solution",
    liveUrl: "https://juptreeautomobile.com/",
    image: "/assets/Juptree Automobiles Responsive Showcase.jpg",
    summary:
      "Built together as a cohesive multi-platform automotive business solution—combining the Juptree Automobile dealership portal with the Juptree China Direct vehicle procurement platform.",
    companionPlatform: {
      name: "Juptree China Direct",
      liveUrl: "https://www.juptreechinadirect.com.ng/",
      role: "Direct Vehicle Sourcing & Importation Portal",
    },
  },
  {
    id: "solugans-construction",
    client: "Solugans Construction",
    sector: "Civil Engineering, Architecture & Building · Awka",
    serviceDelivered: "Website Design & SEO",
    liveUrl: "https://www.solugansconstruction.com.ng/",
    image: "/assets/Solugans Construction Digital Showcase.jpg",
    summary:
      "Authoritative engineering and building platform structured around residential estates, commercial builds, BOQ consultation pathways, and regional search visibility.",
  },
  {
    id: "osines-group",
    client: "Osines Group",
    sector: "Architecture & Building Construction · Awka",
    serviceDelivered: "Website Design & SEO Strategy",
    liveUrl: "https://www.osinesgroup.com.ng/",
    image: "/assets/OSINES GROUP Web Design and SEO Strategy.jpg",
    summary:
      "Corporate digital presence presenting architectural design, luxury residential developments, and commercial construction services.",
  },
  {
    id: "spes-platform",
    client: "SPES",
    sector: "Corporate & Commercial Services",
    serviceDelivered: "Corporate Web Platform",
    liveUrl: "https://spes.com.ng/",
    summary:
      "Structured corporate website built for clear service presentation, mobile responsiveness, and direct customer contact at spes.com.ng.",
  },
  {
    id: "princeway-electrical",
    client: "Princeway Electrical Construction",
    sector: "Electrical Engineering & Construction",
    serviceDelivered: "Corporate Web Platform",
    liveUrl: "https://www.princewayelectricalconstruction.com.ng/",
    summary:
      "Dedicated digital presence highlighting electrical construction capabilities, technical trust, and client enquiry pathways at princewayelectricalconstruction.com.ng.",
  },
];

export const SEO_VISIBILITY_FOUNDATIONS: SeoVisibilityFoundation[] = [
  {
    id: "technical-seo",
    stepCode: "01 · TECHNICAL & ON-PAGE SEO",
    title: "Search-Ready Site Architecture",
    description:
      "Clean semantic HTML structure, fast mobile loading, crawlable service hierarchy, and clear title/meta alignment across core pages.",
  },
  {
    id: "gbp-alignment",
    stepCode: "02 · GOOGLE BUSINESS PROFILE",
    title: "Local Profile Completeness & Trust",
    description:
      "Structured Google Business Profile categories, verified service locations, official contact channels, and consistent company details.",
  },
  {
    id: "schema-metadata",
    stepCode: "03 · STRUCTURED DATA",
    title: "Schema.org & Service Markup",
    description:
      "JSON-LD organization, local service, and FAQ metadata helping search engines accurately interpret your services and coverage areas.",
  },
  {
    id: "conversion-routing",
    stepCode: "04 · ENQUIRY CONVERSION",
    title: "Direct WhatsApp & Brief Capture",
    description:
      "Dedicated service pathways designed so prospects finding your business on Google can call, message on WhatsApp, or submit a brief.",
  },
];

export const WHY_MINDWARE_PILLARS = [
  {
    number: "01",
    title: "Practical Business Development Experience",
    description:
      "Operating since January 2016 (CAC RC 1309926), we focus on commercial traction—helping real businesses look credible, communicate clearly, and generate steady client enquiries.",
  },
  {
    number: "02",
    title: "Website Design & Technical SEO Craft",
    description:
      "Every site is engineered for speed, multi-device responsiveness, structured Schema.org SEO, and frictionless enquiry conversion rather than generic brochure templates.",
  },
  {
    number: "03",
    title: "Digital Marketing & Customer Acquisition",
    description:
      "We align search visibility, Google Business Profile optimization, paid demand pathways, and WhatsApp/CRM handoff so prospective buyers reach the right person fast.",
  },
  {
    number: "04",
    title: "Business Development & Management Consulting",
    description:
      "Accredited with IMC-Nigeria alongside CICRM, NISCN, and WSO, Mindware bridges digital technology with positioning, operational workflows, and management accountability.",
  },
  {
    number: "05",
    title: "Deep Construction Business Consulting Experience",
    description:
      "With live flagship platforms delivered for Nigerian civil, structural, electrical, and concrete firms, we understand tender verification, BOQ enquiries, and contractor credibility.",
  },
  {
    number: "06",
    title: "Founder-Led Strategic Oversight",
    description:
      "Every campaign engagement benefits from senior review and strategic direction led directly by Founder & Managing Director Chike Onyekachukwu.",
  },
] as const;

export const CAMPAIGN_INCLUDED_FOUNDATIONS = [
  {
    title: "Structured 2027 Readiness Review",
    description:
      "Every campaign enquiry includes an initial diagnostic review of your current website, search visibility, and enquiry flow before you commit to a scoped proposal.",
  },
  {
    title: "Written Scope & Full Asset Ownership",
    description:
      "Clients receive clear milestone documentation, formal RC 1309926 corporate invoicing, and 100% ownership of their domain, website assets, and business data.",
  },
  {
    title: "Domain, Hosting & SSL Alignment on Eligible Builds",
    description:
      "Standard corporate build scopes include initial domain/hosting setup, SSL security configuration, and WhatsApp/enquiry integration confirmed in your proposal.",
  },
] as const;

export const CAMPAIGN_2026_FAQS: CampaignFaqItem[] = [
  {
    id: "who-can-benefit",
    question: "Who can benefit from Mindware Business Growth Season 2026?",
    answer:
      "Nigerian SMEs, startups, corporate service businesses, business owners, and construction or engineering companies looking to improve their website, Google visibility, customer acquisition systems, and operational readiness ahead of 2027.",
  },
  {
    id: "startups-or-established",
    question: "Is this campaign for startups or established businesses?",
    answer:
      "Both. Startups and newly registered companies can start cleanly with Business Launch (₦100,000–₦350,000+) or Digital Business Foundation (₦150,000–₦400,000+), while established companies and contractors typically choose Visibility & Growth Accelerator, Construction Business Growth, Construction Business Pro, or Business Growth Advisory.",
  },
  {
    id: "single-service",
    question: "Can I choose only one service instead of a full bundle?",
    answer:
      "Yes. You can engage Mindware for a specific single priority—such as a website redesign, SEO and Google Business Profile optimization, or a targeted Business Growth Advisory engagement—without paying for services your business does not need.",
  },
  {
    id: "final-pricing",
    question: "How is final pricing determined within each range?",
    answer:
      "The published campaign ranges reflect typical starting scopes. After reviewing your business needs, site complexity, number of pages or custom features, SEO/marketing scope, or advisory requirements, we issue a clear written proposal stating the exact investment before work begins.",
  },
  {
    id: "instalments",
    question: "Are instalment payments accepted?",
    answer:
      "Yes. Standard fixed-scope and custom project engagements generally start with a 60% mobilization deposit, with the remaining 40% balance payable upon completion, quality assurance, and handover. Milestone structures for larger engagements are confirmed in your written proposal.",
  },
  {
    id: "consultation-process",
    question: "What happens during the consultation?",
    answer:
      "A Mindware Growth Consultant reviews your current digital presence, online visibility, positioning, and enquiry workflow, discusses your 2027 commercial priorities, and recommends the most suitable package or scoped roadmap.",
  },
  {
    id: "how-to-start",
    question: "How do I get started before December 31, 2026?",
    answer:
      "Complete the enquiry and qualification form on this page with your business details and goals, or click Speak With a Mindware Growth Consultant to connect directly on WhatsApp.",
  },
];

export const BUSINESS_NEED_OPTIONS = [
  "New Website or Corporate Website Redesign",
  "SEO & Google Search / Maps Visibility",
  "Digital Marketing & Customer Acquisition Systems",
  "Construction Company Credibility & Tender Positioning",
  "Business Growth Advisory & Positioning",
  "Internal Workflows, Portals or Business Systems",
  "New Business Digital Launch",
] as const;

export const CAMPAIGN_EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export interface GrowthSeasonFormValidationInput {
  fullName: string;
  email: string;
  phone: string;
  businessLocation: string;
  selectedNeeds: string[];
  additionalInfo: string;
}

export type GrowthSeasonFormValidationResult =
  | { valid: true }
  | {
      valid: false;
      field: "fullName" | "email" | "phone" | "businessLocation" | "selectedNeeds";
      error: string;
    };

export function validateGrowthSeasonFormInput(
  input: GrowthSeasonFormValidationInput
): GrowthSeasonFormValidationResult {
  if (input.fullName.trim().length < 2) {
    return {
      valid: false,
      field: "fullName",
      error: "Please enter your full name.",
    };
  }

  const trimmedEmail = input.email.trim();
  if (!trimmedEmail) {
    return {
      valid: false,
      field: "email",
      error: "Please enter your email address.",
    };
  }
  if (!CAMPAIGN_EMAIL_REGEX.test(trimmedEmail)) {
    return {
      valid: false,
      field: "email",
      error: "Please enter a valid email address (for example, name@company.com).",
    };
  }

  if (input.phone.trim().length < 6) {
    return {
      valid: false,
      field: "phone",
      error: "Please enter a valid WhatsApp or phone number.",
    };
  }

  if (input.businessLocation.trim().length < 2) {
    return {
      valid: false,
      field: "businessLocation",
      error: "Please enter your business city or state.",
    };
  }

  if (
    input.selectedNeeds.length === 0 &&
    input.additionalInfo.trim().length < 5
  ) {
    return {
      valid: false,
      field: "selectedNeeds",
      error:
        "Please select at least one area your business needs help with or describe your goals.",
    };
  }

  return { valid: true };
}
