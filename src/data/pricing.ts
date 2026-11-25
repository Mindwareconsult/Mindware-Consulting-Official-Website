export type PricingLevel = "BUILD" | "GROW" | "TRANSFORM";

export interface EngagementModelDescriptor {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  bestFor: string;
  billingFormat: string;
}

export interface PricingTier {
  id: string;
  tierNumber: number;
  level: PricingLevel;
  engagementModel: "Fixed-Scope Package" | "Fixed-Scope + Retainer Ready" | "Custom / Advisory Suite";
  name: string;
  price: string;
  priceNumeric: number;
  badge?: string;
  isPopular?: boolean;
  isFlagship?: boolean;
  targetAudience: string;
  costSavings: string;
  ctaText: string;
  summaryFeatures: string[];
  highlights: {
    website: string;
    emails: number;
    socialMedia: string;
    seo: "Foundation" | "Growth & Local SEO";
    crm: "Core Inquiry Funnel" | "Integrated Workflow";
    management: boolean;
    automation: string;
    enablement: string;
  };
}

export const ENGAGEMENT_MODELS: EngagementModelDescriptor[] = [
  {
    id: "fixed-scope",
    title: "Fixed-Scope Packages",
    subtitle: "Transparent Turnkey Delivery",
    description:
      "Defined corporate builds and digital growth packages with clear deliverables, 1-year domain & hosting setup, and structured milestone schedules.",
    bestFor: "Corporate websites, legacy upgrades, and immediate credibility",
    billingFormat: "60% Mobilization / 40% Handover"
  },
  {
    id: "monthly-retainers",
    title: "Monthly Retainers",
    subtitle: "Compounding Visibility & Uptime",
    description:
      "Continuous post-launch SEO governance, Google Ads & paid social optimization, software updates, security monitoring, and downtime prevention.",
    bestFor: "Sustained lead acquisition & ongoing technical care",
    billingFormat: "Monthly or Quarterly Retainer"
  },
  {
    id: "custom-projects",
    title: "Custom Projects",
    subtitle: "Bespoke Systems & Portals",
    description:
      "Scoped custom business software, client/vendor portals, operational dashboards, and CRM/API integrations tailored to complex workflows.",
    bestFor: "Custom portals, software tools & workflow systems",
    billingFormat: "Scoped Milestone Proposal"
  },
  {
    id: "consulting-engagements",
    title: "Consulting Engagements",
    subtitle: "Advisory & Organizational Enablement",
    description:
      "Executive growth strategy, business development structuring, operational process mapping, and corporate systems onboarding workshops.",
    bestFor: "Digital transformation planning & B2B governance",
    billingFormat: "Advisory Sprint or Retainer"
  }
];

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "starter-build",
    tierNumber: 1,
    level: "BUILD",
    engagementModel: "Fixed-Scope Package",
    name: "Starter Build",
    price: "₦175,000",
    priceNumeric: 175000,
    badge: "BUILD · Foundation",
    targetAudience: "Designed for emerging businesses establishing a credible, search-ready corporate presence.",
    costSavings: "Bundles domain registration, initial cloud hosting, SSL security, and business email setup into one unified build.",
    ctaText: "Select Starter Build",
    highlights: {
      website: "5-page SEO-ready website",
      emails: 5,
      socialMedia: "2 Platforms",
      seo: "Foundation",
      crm: "Core Inquiry Funnel",
      management: false,
      automation: "Inquiry capture & WhatsApp link",
      enablement: "CMS & handover walkthrough"
    },
    summaryFeatures: [
      "1-Year Domain & Web Hosting Included",
      "5-Page Responsive SEO-Ready Website",
      "Core Inquiry Funnel & WhatsApp Routing",
      "Social Profile Alignment (2 Platforms)",
      "Google Business Profile & 5 Business Emails",
      "Foundation Schema.org & On-Page SEO",
      "Scheduled Backups & Security Hygiene",
      "Launch QA & Handover Documentation"
    ]
  },
  {
    id: "growth-engine",
    tierNumber: 2,
    level: "BUILD",
    engagementModel: "Fixed-Scope Package",
    name: "Growth Engine",
    price: "₦295,000",
    priceNumeric: 295000,
    badge: "BUILD · Flagship Web",
    targetAudience: "Built for established contractors and firms ready to present completed portfolios and capture structured RFQs.",
    costSavings: "Consolidates corporate website engineering, technical SEO schema, and structured lead onboarding under one team.",
    ctaText: "Select Growth Engine",
    highlights: {
      website: "Multi-page corporate platform",
      emails: 10,
      socialMedia: "3 Platforms",
      seo: "Growth & Local SEO",
      crm: "Integrated Workflow",
      management: true,
      automation: "CRM & BOQ/RFQ intake workflow",
      enablement: "Team content & inquiry walkthrough"
    },
    summaryFeatures: [
      "1-Year Domain & Web Hosting Included",
      "Multi-Page Corporate & Portfolio Platform",
      "Structured CRM & Client Intake Workflows",
      "Social Channel Alignment (3 Platforms)",
      "Google Business Profile & 10 Business Emails",
      "Project & Case Study Showcase Engine",
      "Local & Technical Schema.org SEO Setup",
      "Scheduled Backups & Performance Checks"
    ]
  },
  {
    id: "pro-automation",
    tierNumber: 3,
    level: "GROW",
    engagementModel: "Fixed-Scope + Retainer Ready",
    name: "Pro Automation",
    price: "₦375,000",
    priceNumeric: 375000,
    badge: "GROW · Workflow",
    targetAudience: "Tailored for growing organizations connecting inbound customer acquisition with project and billing workflows.",
    costSavings: "Streamlines repetitive manual quoting, client follow-up, and administrative billing coordination.",
    ctaText: "Select Pro Automation",
    highlights: {
      website: "Multi-page corporate platform",
      emails: 15,
      socialMedia: "4 Platforms (Campaign Setup)",
      seo: "Growth & Local SEO",
      crm: "Integrated Workflow",
      management: true,
      automation: "Sales, project & billing sync",
      enablement: "Workflow adoption session"
    },
    summaryFeatures: [
      "Everything in Growth Engine",
      "Sales Pipeline & Project Workflow Sync",
      "Social Channel Setup & Strategy (4 Platforms)",
      "Billing & Invoicing Workflow Integration",
      "15 Custom Corporate Business Emails",
      "Optional Ongoing Monthly Support Track",
      "Analytics Attribution & Monthly Reporting",
      "Cross-Department Inquiry Routing"
    ]
  },
  {
    id: "enterprise-suite",
    tierNumber: 4,
    level: "GROW",
    engagementModel: "Fixed-Scope + Retainer Ready",
    name: "Enterprise Suite",
    price: "₦400,000",
    priceNumeric: 400000,
    badge: "Most Popular · GROW",
    isPopular: true,
    targetAudience: "For established companies scaling multi-channel visibility, structured recruitment workflows, and dedicated account stewardship.",
    costSavings: "Unifies customer acquisition systems, recruitment intake workflows, and technical maintenance with one accountable partner.",
    ctaText: "Select Enterprise Suite",
    highlights: {
      website: "Multi-page corporate platform",
      emails: 20,
      socialMedia: "5 Platforms (Managed Track)",
      seo: "Growth & Local SEO",
      crm: "Integrated Workflow",
      management: true,
      automation: "HR intake, billing & CRM portals",
      enablement: "Dedicated Account Stewardship"
    },
    summaryFeatures: [
      "Everything in Pro Automation",
      "Internal Recruitment & Candidate Intake Workflow",
      "Dedicated Account Stewardship",
      "Multi-Channel Social Alignment (5 Platforms)",
      "20 Custom Corporate Business Emails",
      "Structured Pipeline & Tender Lead Tracking",
      "Project & Financial System Sync",
      "Ongoing Maintenance & Reporting"
    ]
  },
  {
    id: "operational-consulting-suite",
    tierNumber: 5,
    level: "TRANSFORM",
    engagementModel: "Custom / Advisory Suite",
    name: "Operational Transformation Suite",
    price: "₦475,000",
    priceNumeric: 475000,
    badge: "TRANSFORM · Systems",
    targetAudience: "Built for organizations modernizing internal project governance, team system adoption, and multi-team workflows.",
    costSavings: "Unifies custom operational portal modules, CRM infrastructure, and leadership system-adoption workshops in one scope.",
    ctaText: "Scope Operational Suite",
    highlights: {
      website: "Multi-page corporate platform",
      emails: 25,
      socialMedia: "5 Platforms (Managed Track)",
      seo: "Growth & Local SEO",
      crm: "Integrated Workflow",
      management: true,
      automation: "Custom operations & CRM systems",
      enablement: "Organizational systems & PM workflow onboarding"
    },
    summaryFeatures: [
      "Everything in Enterprise Suite",
      "Project Delivery & Governance Workflow Portal",
      "Leadership & Staff System Adoption Workshop",
      "25 Custom Corporate Business Emails",
      "Multi-Channel Social Alignment (5 Platforms)",
      "CRM, Billing & Candidate Workflow Automation",
      "Internal SOP & Team Documentation Hub",
      "Scheduled Maintenance & Priority Support"
    ]
  },
  {
    id: "enterprise-transformation-flagship",
    tierNumber: 6,
    level: "TRANSFORM",
    engagementModel: "Custom / Advisory Suite",
    name: "Enterprise Growth & Compliance Flagship",
    price: "₦595,000",
    priceNumeric: 595000,
    badge: "TRANSFORM · Flagship",
    isFlagship: true,
    targetAudience: "Full-spectrum digital infrastructure, Google Ads demand generation, operational systems, and compliance readiness governance.",
    costSavings: "Brings web architecture, paid search setup, internal compliance portals, and executive consulting under a single SLA.",
    ctaText: "Scope Enterprise Flagship",
    highlights: {
      website: "Multi-page corporate platform",
      emails: 30,
      socialMedia: "5 Platforms (Managed Track)",
      seo: "Growth & Local SEO",
      crm: "Integrated Workflow",
      management: true,
      automation: "End-to-end systems & Google Ads funnel",
      enablement: "Executive advisory + operational compliance portal"
    },
    summaryFeatures: [
      "Everything in Operational Transformation Suite",
      "Google Ads Demand Generation Campaign Setup",
      "Internal Operational Compliance & Safety Documentation Hub",
      "Executive Growth Advisory & Roadmap Session",
      "30 Custom Corporate Business Emails",
      "Dedicated Account & Transformation Lead",
      "Full-Funnel Conversion & Analytics Setup",
      "Priority Maintenance & Uptime Stewardship"
    ]
  }
];

export interface MatrixRow {
  feature: string;
  category: "Digital Infrastructure (BUILD)" | "Acquisition & Automation (GROW)" | "Systems & Governance (TRANSFORM)" | "Support & Continuity";
  tiers: (string | boolean)[];
  tooltip?: string;
}

export const COMPARISON_MATRIX: MatrixRow[] = [
  {
    feature: "1-Year Domain & Managed Hosting",
    category: "Digital Infrastructure (BUILD)",
    tiers: [true, true, true, true, true, true],
    tooltip: "Initial domain registration and managed cloud hosting for the first 12 months"
  },
  {
    feature: "SEO-Ready Responsive Website",
    category: "Digital Infrastructure (BUILD)",
    tiers: ["5 pages", "Multi-page", "Multi-page", "Multi-page", "Multi-page", "Multi-page"]
  },
  {
    feature: "Corporate Business Emails",
    category: "Digital Infrastructure (BUILD)",
    tiers: ["5", "10", "15", "20", "25", "30"]
  },
  {
    feature: "Technical & Local Schema SEO",
    category: "Digital Infrastructure (BUILD)",
    tiers: ["Foundation", "Growth + Local", "Growth + Local", "Growth + Local", "Growth + Local", "Growth + Local"]
  },
  {
    feature: "Multi-Device Responsive QA",
    category: "Digital Infrastructure (BUILD)",
    tiers: ["Standard", "Full Matrix", "Full Matrix", "Full Matrix", "Full Matrix", "Full Matrix"]
  },
  {
    feature: "Google Business Profile Alignment",
    category: "Acquisition & Automation (GROW)",
    tiers: [false, true, true, true, true, true]
  },
  {
    feature: "Social Channel Alignment",
    category: "Acquisition & Automation (GROW)",
    tiers: ["2 Platforms", "3 Platforms", "4 Platforms", "5 Platforms", "5 Platforms", "5 Platforms"]
  },
  {
    feature: "Social Content & Campaign Track",
    category: "Acquisition & Automation (GROW)",
    tiers: [false, false, false, true, true, true]
  },
  {
    feature: "Google Ads Setup & Funnel Link",
    category: "Acquisition & Automation (GROW)",
    tiers: [false, false, false, false, false, true],
    tooltip: "Structured search advertising setup linked directly to conversion landing pages"
  },
  {
    feature: "CRM & Lead Intake Automation",
    category: "Acquisition & Automation (GROW)",
    tiers: ["Core Funnel", "Integrated", "Integrated", "Integrated", "Integrated", "Integrated"]
  },
  {
    feature: "Project & Case Showcase Architecture",
    category: "Systems & Governance (TRANSFORM)",
    tiers: [false, true, true, true, true, true]
  },
  {
    feature: "Billing & Finance Workflow Integration",
    category: "Systems & Governance (TRANSFORM)",
    tiers: [false, false, true, true, true, true],
    tooltip: "Structured quoting, invoice workflow triggers, and client payment tracking"
  },
  {
    feature: "Internal Recruitment Workflow Portal",
    category: "Systems & Governance (TRANSFORM)",
    tiers: [false, false, false, true, true, true],
    tooltip: "Direct corporate candidate collection and review workflow"
  },
  {
    feature: "Organizational Systems & PM Governance Hub",
    category: "Systems & Governance (TRANSFORM)",
    tiers: [false, false, false, false, true, true],
    tooltip: "Internal client SOPs, delivery governance portal, and team adoption workshops"
  },
  {
    feature: "Operational Compliance & HSE Portal",
    category: "Systems & Governance (TRANSFORM)",
    tiers: [false, false, false, false, false, true],
    tooltip: "Dedicated internal documentation and readiness hub for corporate compliance operations"
  },
  {
    feature: "Scheduled Backups & Security Updates",
    category: "Support & Continuity",
    tiers: [true, true, true, true, true, true]
  },
  {
    feature: "Analytics & Monthly Review Reporting",
    category: "Support & Continuity",
    tiers: [true, true, true, true, true, true]
  },
  {
    feature: "Dedicated Account Stewardship",
    category: "Support & Continuity",
    tiers: [false, false, "Optional", true, true, true]
  }
];
