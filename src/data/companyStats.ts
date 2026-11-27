export const COMPANY_INFO = {
  name: "Mindware Consulting Ltd",
  shortName: "Mindware Consulting",
  rcNumber: "1309926",
  tin: "19660429-0001",
  foundedYear: 2016,
  mdName: "Chike Onyekachukwu",
  phoneDisplay: "+234 812 508 2354",
  phoneTel: "+2348125082354",
  whatsappNumber: "2348125082354",
  whatsappUrl: "https://wa.me/2348125082354",
  email: "contact@mindwareconsult.com.ng",
  websiteUrl: "https://mindwareconsult.com.ng",
  coverage: "36 States & FCT Abuja",
  locationSummary: "Lagos & Remote Nationwide across Nigeria",
} as const;

export interface CompanyMetricItem {
  value: string;
  label: string;
  note: string;
}

/**
 * Single source of truth for verified, non-fabricated Mindware company statistics.
 * Derived directly from CAC registration (2016), published case studies/portfolio (15),
 * active commercial sector tracks (6), and verified official credentials (7).
 */
export const APPROVED_COMPANY_METRICS: CompanyMetricItem[] = [
  {
    value: "10+ Years",
    label: "Operating Since 2016 (RC 1309926)",
    note: "Incorporated Nigerian business growth and technology partner.",
  },
  {
    value: "15 Builds",
    label: "Published Live Portfolio Projects",
    note: "Verified live client websites, portals, and digital systems.",
  },
  {
    value: "6 Sectors",
    label: "Core Industry Verticals",
    note: "Led by Construction & Civil Engineering alongside five commercial sectors.",
  },
  {
    value: "7 Verified",
    label: "Official Corporate Credentials",
    note: "CAC, FIRS, EFCC SCUML, NITDA/Tech, and Google ecosystem registrations.",
  },
];

export const CONVERSION_CTAS = {
  primaryLabel: "Request a Business Growth Review",
  primaryShortLabel: "Growth Review",
  primaryPath: "/contact?cta=business-growth-review",
  secondaryConsultation: "Book a Consultation",
  secondaryProject: "Discuss Your Project",
  secondarySolutions: "Explore Our Solutions",
  secondaryProposal: "Request a Proposal",
  secondaryAdvisor: "Talk to a Growth Consultant",
} as const;

export type CanonicalEnquiryCategory =
  | "digital-transformation"
  | "marketing-customer-acquisition"
  | "business-growth-consulting"
  | "construction-business-growth"
  | "campaign-growth-season"
  | "other-organization";

export interface EnquiryCategoryOption {
  id: CanonicalEnquiryCategory;
  label: string;
  shortLabel: string;
  description: string;
  defaultPath: string;
}

export const ENQUIRY_CATEGORIES: EnquiryCategoryOption[] = [
  {
    id: "digital-transformation",
    label: "Digital Transformation & Technology",
    shortLabel: "Digital Transformation",
    description:
      "Corporate websites, web platforms, internal operational portals, CRM/ERP integration, and workflow automation.",
    defaultPath: "/solutions",
  },
  {
    id: "marketing-customer-acquisition",
    label: "Digital Marketing & Customer Acquisition",
    shortLabel: "Marketing & Acquisition",
    description:
      "Commercial SEO, paid search & LinkedIn/Meta campaigns, conversion landing architecture, and lead generation.",
    defaultPath: "/solutions",
  },
  {
    id: "business-growth-consulting",
    label: "Business Growth & Management Consulting",
    shortLabel: "Growth Consulting",
    description:
      "Growth strategy, business development structuring, tender readiness, SOP alignment, and operational advisory.",
    defaultPath: "/solutions",
  },
  {
    id: "construction-business-growth",
    label: "Construction Business Growth",
    shortLabel: "Construction Sector",
    description:
      "Flagship digital authority, project showcases, procurement pre-qualification portals, and bid-ready brand credibility.",
    defaultPath: "/industries/construction-civil-engineering",
  },
  {
    id: "campaign-growth-season",
    label: "Mindware Business Growth Season 2026",
    shortLabel: "Growth Season 2026",
    description:
      "Structured 2026 advisory review across Foundation, Visibility, Construction, Advisory, or Launch tracks.",
    defaultPath: "/business-growth-season-2026/",
  },
  {
    id: "other-organization",
    label: "Other Growing Organizations & Institutions",
    shortLabel: "Other Organization",
    description:
      "Professional services, healthcare, education, manufacturing, logistics, NGOs, and multi-branch Nigerian enterprises.",
    defaultPath: "/contact?category=other-organization&cta=business-growth-review",
  },
];

export const ENQUIRY_CATEGORY_IDS: readonly CanonicalEnquiryCategory[] =
  ENQUIRY_CATEGORIES.map((c) => c.id);

export const INDUSTRY_SECTOR_OPTIONS = [
  "Construction & Civil Engineering",
  "Real Estate & Property Development",
  "Oil, Gas, Marine & Energy",
  "Automotive & Mobility",
  "E-commerce & Retail",
  "Interior Finishing & Allied Trades",
  "Other Growing Organization / Institution",
] as const;
