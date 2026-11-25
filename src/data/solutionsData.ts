export interface GrowthStage {
  step: string;
  title: string;
  tagline: string;
  description: string;
  outcomes: string[];
}

export interface PillarSubService {
  title: string;
  businessValue: string;
  link?: string;
}

export interface SolutionPillar {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  summary: string;
  growthStages: string[];
  outcomes: string[];
  deliverables: string[];
  subServices: PillarSubService[];
  mappedServices: {
    label: string;
    path: string;
  }[];
  recommendedPackage: {
    label: string;
    path: string;
  };
}

export const STRATEGIC_POSITIONING = {
  brandLine: "Mindware Consulting — Your Business Growth and Digital Transformation Partner",
  headline: "Build a Stronger Business. Transform the Way You Grow.",
  subheadline:
    "Mindware Consulting helps businesses strengthen their digital infrastructure, attract more customers, improve operations and unlock sustainable growth through strategic consulting, technology and digital marketing.",
  ctaLabel: "Request a Business Growth Review",
  ctaPath: "/contact?cta=business-growth-review"
};

export const EIGHT_BUSINESS_OUTCOMES = [
  "Build stronger digital infrastructure",
  "Improve online visibility and authority",
  "Acquire and convert more customers",
  "Improve core business operations",
  "Adopt technology and digital systems",
  "Strengthen commercial business development",
  "Improve project and operational management",
  "Achieve sustainable long-term business growth"
];

export const BUSINESS_CHALLENGES_SOLVED = [
  {
    problem: "Outdated Websites Losing Trust Before You Speak",
    detail: "Decision-makers, procurement panels, and high-value buyers evaluate your credibility online before scheduling a call.",
    fix: "We engineer modern corporate platforms built to pass executive scrutiny and turn visits into qualified enquiries."
  },
  {
    problem: "Low Search Visibility for High-Intent Commercial Terms",
    detail: "Competitors capture active buyers searching Google for contractors, developers, suppliers, and specialized B2B services.",
    fix: "We implement technical SEO, local geo-authority, and Google Business optimization to win top commercial search demand."
  },
  {
    problem: "Disconnected Marketing Without Lead Attribution",
    detail: "Ad spend and social activity fail to generate predictable commercial pipelines when landing journeys and tracking are broken.",
    fix: "We align campaigns, conversion UX, and analytics around qualified leads and measurable return on marketing investment."
  },
  {
    problem: "Manual Operations Slowing Project Execution",
    detail: "Spreadsheets, WhatsApp threads, and disconnected files create bottlenecks as organizations add clients, staff, or branches.",
    fix: "We build bespoke web/mobile portals, CRM pipelines, and automated workflows tailored to real operational realities."
  },
  {
    problem: "Tender & Institutional Pre-Qualification Gaps",
    detail: "Capable construction, energy, and engineering firms miss contract shortlists when statutory proof and project records are poorly presented.",
    fix: "We structure verifiable corporate documentation, equipment registers, and project portfolios for due-diligence confidence."
  },
  {
    problem: "Growth Outpacing Internal Management Structure",
    detail: "Expanding SMEs need stronger business development playbooks, SOPs, and technology adoption across their teams.",
    fix: "We provide management consulting, operational process design, and practical team enablement tied to commercial goals."
  }
];

export const GROWTH_FRAMEWORK: GrowthStage[] = [
  {
    step: "01",
    title: "ACQUIRE",
    tagline: "Attract high-intent buyers, tender evaluators, and enterprise decision-makers.",
    description:
      "We establish commanding search visibility, credible digital flagships, and targeted customer acquisition pipelines so your organization is found and shortlisted first.",
    outcomes: [
      "Technical SEO & local geo-authority dominance",
      "High-converting enterprise & B2B lead funnels",
      "Targeted paid search & social demand generation"
    ]
  },
  {
    step: "02",
    title: "GROW",
    tagline: "Convert market attention into commercial credibility and qualified revenue.",
    description:
      "We replace fragmented online touchpoints with authoritative websites, structured case proof, and frictionless enquiry channels that improve deal close rates.",
    outcomes: [
      "Tender & procurement due-diligence readiness",
      "Higher enquiry-to-contract conversion ratios",
      "Consistent brand equity across web & social channels"
    ]
  },
  {
    step: "03",
    title: "OPTIMIZE",
    tagline: "Streamline internal operations, software adoption, and project delivery.",
    description:
      "Sustainable revenue requires operational reliability. We deploy custom portals, CRM workflows, process improvements, and management advisory to eliminate bottlenecks.",
    outcomes: [
      "Custom web & mobile systems built around operations",
      "Workflow automation & centralized lead tracking",
      "Structured project & operational management governance"
    ]
  },
  {
    step: "04",
    title: "ACCELERATE",
    tagline: "Compound market share through systems, analytics, and business development.",
    description:
      "We connect attribution dashboards, conversion testing, business development playbooks, and leadership consulting so teams double down on profitable expansion.",
    outcomes: [
      "Clear campaign ROI & pipeline attribution tracking",
      "Multi-state & sector expansion frameworks",
      "Executive commercial & growth advisory"
    ]
  },
  {
    step: "05",
    title: "PROTECT",
    tagline: "Safeguard uptime, data integrity, compliance readiness, and long-term performance.",
    description:
      "Digital infrastructure is an appreciating business asset only when maintained. We deliver ongoing technical care, security hardening, and workforce enablement.",
    outcomes: [
      "Continuous uptime monitoring & SLA support retainers",
      "Security hygiene, backups & technical maintenance",
      "Corporate team enablement for sustained adoption"
    ]
  }
];

export const SOLUTIONS_PILLARS: SolutionPillar[] = [
  {
    id: "digital-transformation-technology",
    number: "01",
    title: "Digital Transformation & Technology",
    subtitle: "Resilient digital infrastructure, custom engineering, and operational software systems.",
    summary:
      "We replace fragmented legacy tools and static brochure sites with fast, secure digital infrastructure engineered to support commercial credibility, operational efficiency, and scalable systems adoption.",
    growthStages: ["BUILD", "OPTIMIZE", "PROTECT"],
    outcomes: [
      "Build stronger digital infrastructure that strengthens institutional and buyer confidence",
      "Adopt tailored web/mobile software, client portals, and automated workflows",
      "Eliminate recurring site downtime, slow mobile loading, and manual process bottlenecks"
    ],
    deliverables: [
      "Corporate Websites & Digital Showrooms",
      "Website Redesign & Conversion Optimization",
      "Custom Web & Mobile Application Development",
      "Business Workflow Digitization & Portals"
    ],
    subServices: [
      {
        title: "Corporate & Business Websites",
        businessValue: "Positions your company credibly before procurement officers, corporate partners, and enterprise buyers on first visit.",
        link: "/services/website-design"
      },
      {
        title: "Website Redesign & Conversion Optimization",
        businessValue: "Upgrades aging, slow, or poorly structured websites into fast digital assets engineered to capture qualified leads.",
        link: "/services/website-design"
      },
      {
        title: "Web & Mobile Application Development",
        businessValue: "Solves sector-specific workflow challenges with custom customer apps, service booking platforms, and operational tools.",
        link: "/services/app-development"
      },
      {
        title: "E-Commerce Systems",
        businessValue: "Enables automated product discovery, Paystack/Flutterwave checkout, and order tracking to capture online revenue 24/7.",
        link: "/pricing"
      },
      {
        title: "Business Automation & Workflow Digitization",
        businessValue: "Cuts manual administrative delays by digitizing intake requests, quotation routing, approvals, and client reporting.",
        link: "/services/app-development"
      },
      {
        title: "Cloud, Portal & Internal Systems Consulting",
        businessValue: "Centralizes company documents, vendor/client portals, and branch operations inside unified, dependable cloud environments.",
        link: "/services/app-development"
      },
      {
        title: "Technology Adoption & Digital Readiness",
        businessValue: "Guides leadership teams on selecting, integrating, and governing practical business software without costly missteps.",
        link: "/services/consultancy"
      }
    ],
    mappedServices: [
      { label: "Website Design & Architecture", path: "/services/website-design" },
      { label: "Custom App Development", path: "/services/app-development" }
    ],
    recommendedPackage: {
      label: "Compare BUILD & TRANSFORM Scopes",
      path: "/pricing"
    }
  },
  {
    id: "digital-marketing-customer-acquisition",
    number: "02",
    title: "Digital Marketing & Customer Acquisition",
    subtitle: "Search authority, conversion engineering, and measurable multi-channel demand generation.",
    summary:
      "We help businesses get discovered by active buyers, convert attention into commercial conversations, and track exact acquisition return across search and social channels.",
    growthStages: ["ACQUIRE", "GROW"],
    outcomes: [
      "Capture high-intent Google search traffic across Nigeria and target commercial regions",
      "Turn website visitors into WhatsApp consultations, RFQs, and booked sales calls",
      "Align brand positioning and paid campaigns directly with measurable pipeline outcomes"
    ],
    deliverables: [
      "Technical, On-Page & 36-State Local SEO",
      "Google Ads & Paid Search Acquisition",
      "Executive Social Media & Brand Positioning",
      "Conversion Optimization & ROI Attribution"
    ],
    subServices: [
      {
        title: "Search Engine Optimization (SEO)",
        businessValue: "Builds compounding organic visibility for high-value service and industry searches without paying for every click.",
        link: "/services/seo"
      },
      {
        title: "Local SEO & Google Business Profile Optimization",
        businessValue: "Captures regional commercial buyers searching Google Maps and city/state service terms across all 36 states and FCT Abuja.",
        link: "/service-areas"
      },
      {
        title: "Paid Search & Google Ads",
        businessValue: "Places your offer immediately in front of active buyers with structured keyword targeting and waste-reduction controls.",
        link: "/services/seo"
      },
      {
        title: "Social Media Management & Brand Positioning",
        businessValue: "Strengthens market authority and executive trust across LinkedIn, Instagram, Facebook, X, TikTok, and YouTube.",
        link: "/services/social-media-marketing"
      },
      {
        title: "Social Media Advertising & Lead Generation",
        businessValue: "Generates qualified B2B and consumer inquiries via targeted social funnels connected straight to your sales team.",
        link: "/services/social-media-marketing"
      },
      {
        title: "Content Strategy & Digital Authority Building",
        businessValue: "Educates buyers with authoritative case studies, project showcases, and executive articles that shorten sales cycles.",
        link: "/insights"
      },
      {
        title: "Conversion Rate Optimization",
        businessValue: "Extracts more leads and inquiries from existing traffic by refining page messaging, proof hierarchy, and CTA placement.",
        link: "/services/website-design"
      },
      {
        title: "Campaign Tracking, Analytics & ROI Reporting",
        businessValue: "Gives decision-makers transparent visibility into traffic sources, inquiry volume, and acquisition performance via GA4.",
        link: "/services/seo"
      }
    ],
    mappedServices: [
      { label: "Search Engine Optimization (SEO)", path: "/services/seo" },
      { label: "Social Media Marketing", path: "/services/social-media-marketing" },
      { label: "36 States & FCT Coverage", path: "/service-areas" }
    ],
    recommendedPackage: {
      label: "Explore GROW Retainers & Packages",
      path: "/pricing"
    }
  },
  {
    id: "business-growth-management-consulting",
    number: "03",
    title: "Business Growth & Management Consulting",
    subtitle: "Strategic roadmaps, business development systems, operational improvement, and team enablement.",
    summary:
      "Technology and marketing only compound when backed by sound commercial and operational discipline. We partner with founders and executives to strengthen sales systems, project execution, and organizational capability.",
    growthStages: ["GROW", "OPTIMIZE", "ACCELERATE"],
    outcomes: [
      "Strengthen business development processes, tender positioning, and sales follow-through",
      "Improve project and operational management governance across teams and deliverables",
      "Equip corporate teams to adopt new digital workflows and sustain long-term growth"
    ],
    deliverables: [
      "Digital Strategy & Transformation Roadmaps",
      "Business Development & Sales Pipeline Design",
      "Operational & Project Management Advisory",
      "B2B Corporate Workforce Enablement"
    ],
    subServices: [
      {
        title: "Digital Strategy & Transformation Roadmaps",
        businessValue: "Provides executive leadership with a prioritized, phased investment blueprint tied to revenue and efficiency goals.",
        link: "/services/consultancy"
      },
      {
        title: "Business Development Systems",
        businessValue: "Turns ad-hoc outreach into repeatable B2B prospecting, corporate credentialing, and commercial proposal workflows.",
        link: "/services/consultancy"
      },
      {
        title: "Sales & Lead Pipeline Optimization",
        businessValue: "Prevents inquiry leakage by integrating intake forms, WhatsApp routing, CRM stages, and structured follow-up SLAs.",
        link: "/services/consultancy"
      },
      {
        title: "Operational Process Improvement",
        businessValue: "Identifies hidden friction in client onboarding, handoffs, and internal reporting so teams deliver reliably at higher volume.",
        link: "/services/consultancy"
      },
      {
        title: "Project & Operations Management Advisory",
        businessValue: "Embeds milestone discipline, scope governance, and risk controls into client delivery and internal initiatives.",
        link: "/services/consultancy"
      },
      {
        title: "Management & Enterprise Growth Consulting",
        businessValue: "Supports directors navigating market expansion, competitive repositioning, and structural business scaling.",
        link: "/services/consultancy"
      },
      {
        title: "Corporate Capability Building & Workforce Enablement",
        businessValue: "Prepares B2B client teams to operate newly deployed platforms, digital marketing assets, and project workflows effectively.",
        link: "/services/training"
      },
      {
        title: "Commercial Advisory for Growing SMEs & Expanding Firms",
        businessValue: "Delivers practical, senior-level commercial guidance without the overhead of building a large internal consulting department.",
        link: "/contact"
      }
    ],
    mappedServices: [
      { label: "Enterprise Growth Consulting", path: "/services/consultancy" },
      { label: "B2B Workforce Enablement", path: "/services/training" }
    ],
    recommendedPackage: {
      label: "Request Executive Consulting Brief",
      path: "/contact?topic=Management%20consulting"
    }
  }
];
