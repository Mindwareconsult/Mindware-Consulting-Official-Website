export interface PricingTier {
  id: string;
  tierNumber: number;
  name: string;
  price: string;
  priceNumeric: number;
  badge?: string;
  isPopular?: boolean;
  isFlagship?: boolean;
  targetAudience: string;
  summaryFeatures: string[];
  costSavings: string;
  ctaText: string;
  highlights: {
    website: string;
    emails: number;
    socialMedia: string;
    seo: "Basic" | "Advanced";
    crm: "Basic" | "Advanced";
    management: boolean;
    automation: string;
    training: string;
  };
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "starter-build",
    tierNumber: 1,
    name: "Starter Build",
    price: "₦175,000",
    priceNumeric: 175000,
    targetAudience: "Perfect for startups and small businesses getting online for the first time.",
    costSavings: "No need to pay separately for website hosting or basic digital setup.",
    ctaText: "Launch Starter Build",
    highlights: {
      website: "5-page SEO-ready website",
      emails: 5,
      socialMedia: "2 Platforms",
      seo: "Basic",
      crm: "Basic",
      management: false,
      automation: "Basic onboarding",
      training: "None",
    },
    summaryFeatures: [
      "1-Year Domain & Web Hosting Included",
      "5-Page SEO-Ready Website",
      "Basic CRM for Customer Onboarding",
      "Social Media Setup (2 Platforms)",
      "Google Business Profile & 5 Business Emails",
      "Mobile Responsive & Basic SEO",
      "Weekly Backups & Updates",
      "Monthly Performance Reporting",
    ],
  },
  {
    id: "growth-engine",
    tierNumber: 2,
    name: "Growth Engine",
    price: "₦295,000",
    priceNumeric: 295000,
    targetAudience: "For growing companies ready to attract more clients and automate basic operations.",
    costSavings: "Reduce manual client onboarding tasks, saving admin labor costs.",
    ctaText: "Power Up with Growth Engine",
    highlights: {
      website: "Multi-page SEO-ready website",
      emails: 10,
      socialMedia: "3 Platforms",
      seo: "Advanced",
      crm: "Advanced",
      management: true,
      automation: "Advanced CRM & Onboarding",
      training: "None",
    },
    summaryFeatures: [
      "1-Year Domain & Web Hosting Included",
      "Multi-Page SEO-Ready Website",
      "Advanced CRM & Onboarding Automation",
      "Social Media Setup (3 Platforms)",
      "Google Business Profile & 10 Business Emails",
      "Project Management Integration",
      "Advanced SEO Optimization & Mobile Responsive",
      "Weekly Backups & Monthly Reports",
    ],
  },
  {
    id: "pro-automation",
    tierNumber: 3,
    name: "Pro Automation",
    price: "₦375,000",
    priceNumeric: 375000,
    badge: "High Efficiency",
    targetAudience: "Designed for companies needing full automation for efficiency and better client experience.",
    costSavings: "Eliminate the need for separate bookkeeping staff and tools (avg. ₦150,000–₦180,000/month).",
    ctaText: "Automate with Pro Suite",
    highlights: {
      website: "Multi-page SEO-ready website",
      emails: 15,
      socialMedia: "4 Platforms (Management)",
      seo: "Advanced",
      crm: "Advanced",
      management: true,
      automation: "Sales, Projects & Bookkeeping",
      training: "None",
    },
    summaryFeatures: [
      "Everything in Growth Engine",
      "Workflow Automation for Projects and Sales",
      "Social Media Management (4 Platforms)",
      "Bookkeeping & Finance Automation Tools",
      "15 Custom Business Emails",
      "Dedicated Account Manager (Optional)",
      "Weekly Backups & Monthly Performance Reporting",
      "Multi-Department Workflow Sync",
    ],
  },
  {
    id: "enterprise-suite",
    tierNumber: 4,
    name: "Enterprise Suite",
    price: "₦400,000",
    priceNumeric: 400000,
    badge: "Most Popular",
    isPopular: true,
    targetAudience: "For larger firms ready for advanced digital operations and lead generation.",
    costSavings: "Automated HR reduces hiring costs; paid ads generate leads cheaper than traditional marketing.",
    ctaText: "Scale with Enterprise Suite",
    highlights: {
      website: "Multi-page SEO-ready website",
      emails: 20,
      socialMedia: "5 Platforms (Management)",
      seo: "Advanced",
      crm: "Advanced",
      management: true,
      automation: "HR Portal, Bookkeeping & CRM",
      training: "None",
    },
    summaryFeatures: [
      "Everything in Pro Automation",
      "HR Recruitment Portal Automation",
      "Dedicated Account Manager Included",
      "Social Media Management Across 5 Platforms",
      "20 Custom Business Emails",
      "Automated Candidate Pipeline & Screening",
      "Project & Financial System Integration",
      "Weekly Backups & Monthly Reports",
    ],
  },
  {
    id: "ld-suite",
    tierNumber: 5,
    name: "L&D Suite",
    price: "₦475,000",
    priceNumeric: 475000,
    badge: "Workforce Upskilling",
    targetAudience: "Ideal for companies focused on workforce upskilling and digital transformation.",
    costSavings: "Avoid paying for external Project Management training courses (avg. ₦180,000–₦350,000 per employee).",
    ctaText: "Empower with L&D Suite",
    highlights: {
      website: "Multi-page SEO-ready website",
      emails: 25,
      socialMedia: "5 Platforms (Management)",
      seo: "Advanced",
      crm: "Advanced",
      management: true,
      automation: "Full Enterprise Automations",
      training: "Project Management Portal + Certs",
    },
    summaryFeatures: [
      "Everything in Enterprise Suite",
      "Project Management Training Portal + Certificates",
      "Dedicated Learning & Development Manager",
      "25 Custom Business Emails",
      "Social Media Management (5 Platforms)",
      "HR Recruitment & Bookkeeping Automations",
      "Corporate Team Skill Tracking & Badges",
      "Weekly Backups & Monthly Reports",
    ],
  },
  {
    id: "complete-safety-growth",
    tierNumber: 6,
    name: "Complete Safety & Growth",
    price: "₦595,000",
    priceNumeric: 595000,
    badge: "Ultimate Flagship",
    isFlagship: true,
    targetAudience: "The ultimate package combining digital operations, training, and safety compliance.",
    costSavings: "No separate cost for HSE certifications (avg. ₦350,000+ per employee) & compliance programs.",
    ctaText: "Deploy Complete Safety & Growth",
    highlights: {
      website: "Multi-page SEO-ready website",
      emails: 30,
      socialMedia: "5 Platforms (Management)",
      seo: "Advanced",
      crm: "Advanced",
      management: true,
      automation: "End-to-End Enterprise Automation",
      training: "PMP & HSE Portals + Certifications",
    },
    summaryFeatures: [
      "Everything in L&D Suite",
      "Paid Ads Campaign (Google Ads Setup & Management)",
      "HSE Training Portal + Certificates for Workplace Safety",
      "Full Workforce Development Support",
      "30 Custom Business Emails",
      "Dedicated Account & L&D Manager",
      "High-Conversion Inbound Lead Generation",
      "Complete Regulatory Compliance Readiness",
    ],
  },
];

export interface MatrixRow {
  feature: string;
  category: "Web & Digital Presence" | "Operations & Automation" | "Workforce & Compliance" | "Support & Governance";
  tiers: (string | boolean)[];
  tooltip?: string;
}

export const COMPARISON_MATRIX: MatrixRow[] = [
  // Web & Digital Presence
  {
    feature: "1-Year Domain & Hosting",
    category: "Web & Digital Presence",
    tiers: [true, true, true, true, true, true],
    tooltip: "Included registration and reliable cloud web hosting for 12 months",
  },
  {
    feature: "SEO-Ready Website",
    category: "Web & Digital Presence",
    tiers: ["5 pages", "Multi-page", "Multi-page", "Multi-page", "Multi-page", "Multi-page"],
  },
  {
    feature: "Business Emails",
    category: "Web & Digital Presence",
    tiers: ["5", "10", "15", "20", "25", "30"],
  },
  {
    feature: "SEO Optimization",
    category: "Web & Digital Presence",
    tiers: ["Basic", "Advanced", "Advanced", "Advanced", "Advanced", "Advanced"],
  },
  {
    feature: "Mobile Responsive",
    category: "Web & Digital Presence",
    tiers: ["Basic", "Advanced", "Advanced", "Advanced", "Advanced", "Advanced"],
  },
  {
    feature: "Google Business Profile Setup",
    category: "Web & Digital Presence",
    tiers: [false, true, true, true, true, true],
  },
  {
    feature: "Social Media Setup",
    category: "Web & Digital Presence",
    tiers: ["2 Platforms", "3 Platforms", "4 Platforms", "5 Platforms", "5 Platforms", "5 Platforms"],
  },
  {
    feature: "Social Media Management",
    category: "Web & Digital Presence",
    tiers: [false, false, false, true, true, true],
  },
  {
    feature: "Paid Ads Campaign (Google Ads)",
    category: "Web & Digital Presence",
    tiers: [false, false, false, false, false, true],
    tooltip: "Targeted lead generation campaigns configured and launched on Google Search & Display",
  },

  // Operations & Automation
  {
    feature: "CRM & Onboarding Automation",
    category: "Operations & Automation",
    tiers: ["Basic", "Advanced", "Advanced", "Advanced", "Advanced", "Advanced"],
  },
  {
    feature: "Project Management Integration",
    category: "Operations & Automation",
    tiers: [false, true, true, true, true, true],
  },
  {
    feature: "Bookkeeping & Finance Automation",
    category: "Operations & Automation",
    tiers: [false, false, true, true, true, true],
    tooltip: "Automated billing, expense tracking, invoice generation, and financial pipeline",
  },
  {
    feature: "HR Recruitment Portal Automation",
    category: "Operations & Automation",
    tiers: [false, false, false, true, true, true],
    tooltip: "Candidate application collection, stage tracking, and onboarding pipelines",
  },

  // Workforce & Compliance
  {
    feature: "Project Management Training + Certification",
    category: "Workforce & Compliance",
    tiers: [false, false, false, false, true, true],
    tooltip: "Structured corporate curriculum, assessments, and recognized certificates",
  },
  {
    feature: "HSE Training Portal + Certification",
    category: "Workforce & Compliance",
    tiers: [false, false, false, false, false, true],
    tooltip: "Workplace Health, Safety & Environment compliance training portal and employee certifications",
  },

  // Support & Governance
  {
    feature: "Weekly Backups & Updates",
    category: "Support & Governance",
    tiers: [true, true, true, true, true, true],
  },
  {
    feature: "Monthly Performance Reporting",
    category: "Support & Governance",
    tiers: [true, true, true, true, true, true],
  },
  {
    feature: "Dedicated Account Manager",
    category: "Support & Governance",
    tiers: [false, false, "Optional", true, true, true],
  },
];
