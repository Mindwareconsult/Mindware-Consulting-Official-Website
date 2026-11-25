export interface CoreValue {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  inAction: string;
  iconName: "Compass" | "Sparkles" | "ShieldCheck" | "Users" | "Target" | "GraduationCap";
}

export interface LeadershipMember {
  id: string;
  name: string;
  role: string;
  division: string;
  bio: string;
  quote?: string;
  image: string;
  credentials: string[];
  responsibilities: string[];
  linkedin?: string;
}

export interface PracticeDivision {
  id: string;
  title: string;
  pillar: string;
  summary: string;
  capabilities: string[];
}

export interface GovernancePillar {
  number: string;
  title: string;
  description: string;
  metric: string;
}

export const MISSION_STATEMENT = {
  headline: "Helping Businesses Build Stronger Digital Infrastructure, Attract More Customers, and Unlock Sustainable Growth.",
  extended:
    "Mindware Consulting Ltd exists to bridge the gap between commercial strategy, technology engineering, and operational execution. We partner with ambitious organizations across Nigeria and beyond to modernize core digital platforms, acquire qualified B2B demand, optimize internal systems, and govern sustainable growth.",
  pillars: [
    {
      title: "Strategic Clarity over Tactical Noise",
      desc: "We diagnose commercial bottlenecks across visibility, conversion, and operations before recommending technology or marketing spend."
    },
    {
      title: "High-Trust Engineering & Craft",
      desc: "Delivering responsive, secure, and search-ready web platforms, portals, and business software built around real buyer journeys."
    },
    {
      title: "Accountable Business Outcomes",
      desc: "Every engagement focuses on practical commercial indicators—qualified inquiries, client trust, tender readiness, and operational velocity."
    },
    {
      title: "Integrated ACQUIRE → PROTECT Execution",
      desc: "Connecting digital systems, customer acquisition, and management consulting within one accountable corporate partner."
    }
  ]
};

export const VISION_STATEMENT = {
  headline: "To be the Preferred Business Growth and Digital Transformation Partner for Ambitious Enterprises Across Africa.",
  extended:
    "We envision a commercial landscape where civil engineering firms, real estate developers, energy operators, and high-growth SMEs leverage unified digital infrastructure, disciplined customer acquisition, and structured operational systems to compete with confidence.",
  horizons: [
    {
      period: "Phase 01 · Digital Foundations",
      title: "Infrastructure, Credibility & Search Presence",
      focus: "Replacing outdated digital footprints with modern corporate platforms, Schema SEO, and clear sector authority."
    },
    {
      period: "Phase 02 · Operational Integration",
      title: "CRM, Workflow Automation & Custom Systems",
      focus: "Connecting inquiry capture directly to structured internal workflows, client portals, and management visibility."
    },
    {
      period: "Phase 03 · Sustained Market Leadership",
      title: "Compounding Acquisition & Governance",
      focus: "Protecting uptime, market visibility, and strategic continuity as partner organizations scale across regions."
    }
  ]
};

export const CORE_VALUES: CoreValue[] = [
  {
    id: "strategic-clarity",
    number: "01",
    title: "Strategic Clarity",
    tagline: "Purpose preceding execution",
    description:
      "We never start with generic templates. We interrogate your commercial model, buyer journey, and operational bottlenecks so every platform or campaign serves a clear business objective.",
    inAction: "Structured consultation discovery, technical site audits, and sector competitor reviews prior to build initiation.",
    iconName: "Compass"
  },
  {
    id: "uncompromising-craft",
    number: "02",
    title: "Uncompromising Craft",
    tagline: "High execution standards",
    description:
      "From responsive multi-device layouts and clear typography to structured Schema.org SEO and clean backend integrations, we sweat details that directly affect buyer confidence.",
    inAction: "Multi-device responsiveness verification, semantic markup, and thorough pre-launch QA across devices.",
    iconName: "Sparkles"
  },
  {
    id: "integrity-transparency",
    number: "03",
    title: "Radical Transparency",
    tagline: "Open scope, honest timelines",
    description:
      "High-trust B2B partnerships rely on realistic expectations. We communicate project progress clearly, deliver formal corporate invoices under RC 1309926, and avoid inflated promises.",
    inAction: "Clear 60%/40% milestone structures, written scope definitions, and honest reporting.",
    iconName: "ShieldCheck"
  },
  {
    id: "collaborative-ownership",
    number: "04",
    title: "Extreme Ownership",
    tagline: "Reliable post-launch stewardship",
    description:
      "We do not disappear after launch. Clients count on Mindware for proactive updates, security hygiene, uptime monitoring, and continuous advisory support.",
    inAction: "Long-term software maintenance, reliable technical support, and uninterrupted site operations.",
    iconName: "Users"
  },
  {
    id: "measurable-impact",
    number: "05",
    title: "Commercial Relevance",
    tagline: "Grounded in real business value",
    description:
      "Vanity metrics do not build durable companies. We align architecture, SEO, and advisory around qualified inquiries, corporate tender readiness, and smoother workflows.",
    inAction: "Designing direct RFQ, BOQ, and WhatsApp intake pathways matched to how Nigerian B2B buyers buy.",
    iconName: "Target"
  },
  {
    id: "continuous-growth",
    number: "06",
    title: "Continuous Capability",
    tagline: "Evolving alongside modern systems",
    description:
      "Digital infrastructure, search algorithms, and software standards evolve constantly. We continually refine our engineering stack and management advisory playbooks.",
    inAction: "Adopting modern React/TypeScript architectures, structured CRM workflows, and B2B consulting frameworks.",
    iconName: "GraduationCap"
  }
];

export const GROWTH_PHILOSOPHY = {
  triad: [
    {
      title: "Mind (Strategic Advisory)",
      subtitle: "The Diagnosis & Positioning Layer",
      desc: "Commercial clarity, buyer journey architecture, and management consulting grounded in real sector dynamics.",
      points: [
        "Commercial positioning & value proposition clarity",
        "Customer & tender buyer journey mapping",
        "Management & operational workflow consulting",
        "Structured growth roadmaps"
      ]
    },
    {
      title: "Technology (Digital Infrastructure)",
      subtitle: "The Engineering & Systems Layer",
      desc: "Modern corporate websites, custom business software, client portals, CRM workflows, and reliable maintenance.",
      points: [
        "Responsive multi-device web platforms",
        "Custom portals & business applications",
        "Ongoing software updates & downtime prevention",
        "Clean semantic markup & security hygiene"
      ]
    },
    {
      title: "Growth (Customer Acquisition)",
      subtitle: "The Visibility & Pipeline Layer",
      desc: "Search engine optimization, targeted digital advertising, and conversion architecture built to turn attention into inquiries.",
      points: [
        "Technical & local Schema.org SEO",
        "Google Ads & B2B social demand generation",
        "Direct RFQ, BOQ & WhatsApp conversion funnels",
        "Ongoing analytics & iterative refinement"
      ]
    }
  ]
};

export const LEADERSHIP_TEAM: LeadershipMember[] = [
  {
    id: "chike-onyekachukwu",
    name: "Chike Onyekachukwu",
    role: "Founder, Managing Director & Chief Executive Officer",
    division: "Executive Leadership & Strategy",
    bio: "Chike Onyekachukwu is the Founder, Managing Director, and CEO of Mindware Consulting Ltd (incorporated RC 1309926, January 2016). He leads strategic direction, client advisory, and multi-disciplinary digital transformation engagements for businesses operating across civil engineering, construction, real estate, oil & gas, automotive, and commercial services.",
    quote:
      "Businesses do not just need a website or isolated marketing campaign—they need integrated digital infrastructure, clear positioning, and dependable execution systems that convert market trust into sustainable growth.",
    image: "/mindware-ceo.png",
    credentials: [
      "Founder & Managing Director, Mindware Consulting Ltd (RC 1309926)",
      "Leading the practice since incorporation in January 2016",
      "Executive Advisor on Digital Transformation & Business Growth",
      "Direct Oversight of Construction, Energy & Enterprise Client Mandates"
    ],
    responsibilities: [
      "Corporate governance, statutory compliance, and executive leadership",
      "Strategic growth consulting and client transformation architecture",
      "Oversight of the ACQUIRE → GROW → OPTIMIZE → ACCELERATE → PROTECT framework",
      "Long-term partner advisory across flagship commercial engagements"
    ]
  }
];

export const PRACTICE_DIVISIONS: PracticeDivision[] = [
  {
    id: "digital-transformation",
    title: "Digital Transformation & Technology Practice",
    pillar: "Pillar 01",
    summary:
      "Architects corporate websites, responsive upgrades, custom business software, client portals, and reliable ongoing maintenance SLAs.",
    capabilities: [
      "Corporate Web Platforms & Legacy Upgrades",
      "Custom Business Software & Workflow Portals",
      "UI/UX Systems & Multi-Device Engineering",
      "Ongoing Maintenance, Updates & Uptime Protection"
    ]
  },
  {
    id: "customer-acquisition",
    title: "Digital Marketing & Customer Acquisition Practice",
    pillar: "Pillar 02",
    summary:
      "Drives qualified buyer visibility across Google Search, Maps, social platforms, and structured RFQ/WhatsApp lead funnels.",
    capabilities: [
      "Technical & Local Schema.org SEO",
      "Google Ads & B2B Demand Generation",
      "Executive Social Media Positioning",
      "Conversion Architecture & Inquiry Routing"
    ]
  },
  {
    id: "management-consulting",
    title: "Business Growth & Management Consulting Practice",
    pillar: "Pillar 03",
    summary:
      "Supports leadership teams with business development structure, operational improvement, project governance, and digital system adoption.",
    capabilities: [
      "Business Growth Strategy & Commercial Structuring",
      "Operational Workflow & Process Optimization",
      "Project Governance & Compliance Readiness",
      "Enterprise Team Enablement on Adopted Systems"
    ]
  }
];

export const GOVERNANCE_FRAMEWORK: GovernancePillar[] = [
  {
    number: "01",
    title: "Structured Milestone Delivery",
    description:
      "Every build and consulting mandate is managed across defined discovery, design, engineering, and handover phases with transparent 60%/40% milestone accountability.",
    metric: "Written Scope Control"
  },
  {
    number: "02",
    title: "Statutory & Tax Accountability",
    description:
      "Registered with the Corporate Affairs Commission (RC 1309926) and Federal Inland Revenue Service (TIN 19660429-0001) to support formal corporate contracting and invoicing.",
    metric: "CAC & FIRS Verified"
  },
  {
    number: "03",
    title: "Cross-Device Quality Verification",
    description:
      "Every web platform undergoes structured responsiveness checks across desktop, tablet, and smartphone screens alongside metadata and inquiry path testing before launch.",
    metric: "Pre-Launch QA Audit"
  },
  {
    number: "04",
    title: "Proactive Post-Launch Maintenance",
    description:
      "Ongoing software updates, SSL hygiene, and rapid technical support ensure client digital assets stay dependable without disruption or downtime.",
    metric: "Zero-Downtime Focus"
  }
];
