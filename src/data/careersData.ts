export interface JobPost {
  id: string;
  title: string;
  department: "Engineering" | "Marketing & SEO" | "Project Management" | "Design & UX" | "Health & Safety" | "Data & Analytics" | "Consulting & HR";
  location: string;
  type: "Full-time" | "Contract" | "Remote" | "Hybrid";
  experienceLevel: "Junior" | "Mid-Level" | "Senior" | "Lead / Manager";
  salary: string;
  postedDate: string;
  deadline: string;
  urgency: "Immediate" | "Actively Hiring" | "Featured";
  employer: {
    name: string;
    type: "Mindware Consulting Direct" | "Mindware Client Partner";
    logoInitials: string;
    verified: boolean;
  };
  summary: string;
  responsibilities: string[];
  requiredQualifications: string[];
  preferredCertifications: string[];
  skills: string[];
  benefits: string[];
}

export interface TalentCandidate {
  id: string;
  name: string;
  role: string;
  location: string;
  experienceYears: number;
  availability: "Immediate" | "2 Weeks Notice" | "1 Month Notice";
  bio: string;
  certifications: string[];
  skills: string[];
  education: string;
  verified: boolean;
  openToRemote: boolean;
  matchScore?: number;
}

export const JOB_POSTINGS: JobPost[] = [
  {
    id: "mw-fullstack-dev",
    title: "Senior Full-Stack Web Engineer (React, Node.js & TypeScript)",
    department: "Engineering",
    location: "Lagos, Nigeria (Hybrid / Remote Option)",
    type: "Full-time",
    experienceLevel: "Senior",
    salary: "₦1,200,000 - ₦1,800,000 / month",
    postedDate: "2 days ago",
    deadline: "Open until filled",
    urgency: "Immediate",
    employer: {
      name: "Mindware Consulting Ltd",
      type: "Mindware Consulting Direct",
      logoInitials: "MW",
      verified: true
    },
    summary: "Lead the architecture and delivery of mission-critical corporate web applications, client portals, and bespoke SaaS platforms for high-growth enterprises in Nigeria and abroad.",
    responsibilities: [
      "Architect and build responsive, accessible, high-performance web applications using React 19, TypeScript, Tailwind CSS, and Node.js microservices.",
      "Collaborate closely with UI/UX designers and client stakeholders to turn complex business requirements into sleek digital products.",
      "Conduct rigorous code reviews, establish CI/CD deployment pipelines, and optimize Lighthouse performance scores to 95+.",
      "Mentor mid-level engineers and conduct technical capability assessments across client projects."
    ],
    requiredQualifications: [
      "B.Sc. or equivalent practical experience in Computer Science, Software Engineering, or related technical discipline.",
      "4+ years of production experience in full-stack JavaScript/TypeScript engineering.",
      "Deep proficiency in modern frontend frameworks (React, Next.js, Vite), state management, and modern CSS/Tailwind.",
      "Strong API design principles (REST, GraphQL, WebSocket) and database systems (PostgreSQL, MongoDB, Supabase)."
    ],
    preferredCertifications: [
      "AWS Certified Solutions Architect or Developer Associate",
      "Meta Certified Front-End Developer",
      "Scrum Alliance / Agile Certified Professional"
    ],
    skills: ["React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS", "REST APIs", "Docker", "Git"],
    benefits: [
      "Competitive executive compensation + performance bonus",
      "Comprehensive HMO medical insurance for employee & family",
      "Annual training budget for international certifications",
      "Hybrid flexible work arrangement + work-from-home stipend"
    ]
  },
  {
    id: "mw-seo-growth-lead",
    title: "Digital Marketing & SEO Lead Strategist",
    department: "Marketing & SEO",
    location: "Lagos / Remote (Nigeria)",
    type: "Full-time",
    experienceLevel: "Senior",
    salary: "₦750,000 - ₦1,100,000 / month",
    postedDate: "3 days ago",
    deadline: "Nov 15, 2026",
    urgency: "Actively Hiring",
    employer: {
      name: "Mindware Consulting Ltd",
      type: "Mindware Consulting Direct",
      logoInitials: "MW",
      verified: true
    },
    summary: "Drive high-converting organic acquisition strategies, technical SEO audits, and multi-channel paid marketing campaigns for Mindware's premium corporate clients.",
    responsibilities: [
      "Execute comprehensive technical SEO audits, schema markups, and local keyword dominance strategies across 20+ client properties.",
      "Design and manage high-ROI Google Ads (Search, Display) and Meta advertising campaigns with continuous A/B split testing.",
      "Formulate content marketing architectures and lead quarterly reporting presentations for enterprise C-suite executives.",
      "Analyze analytics pipelines with Google Analytics 4, Search Console, Semrush, and custom Looker Studio dashboards."
    ],
    requiredQualifications: [
      "3+ years of verifiable experience driving organic growth and paid performance marketing for B2B or B2C brands.",
      "Proven track record of ranking commercial websites in Google Top 3 positions in competitive industries.",
      "Expert command of SEO tooling: Ahrefs, Semrush, Screaming Frog, SurferSEO, and GA4."
    ],
    preferredCertifications: [
      "Google Analytics 4 (GA4) Certification",
      "Google Ads Search & Measurement Certified",
      "HubSpot Inbound Marketing & Content Marketing Certification"
    ],
    skills: ["Technical SEO", "Google Ads", "Meta Ads", "GA4", "Content Strategy", "Ahrefs", "Conversion Rate Optimization"],
    benefits: [
      "Quarterly performance bonus tied to client ROI milestones",
      "Full HMO healthcare coverage",
      "Sponsored attendance at global marketing summits",
      "MacBook Pro + home workstation setup allowance"
    ]
  },
  {
    id: "client-pmp-project-manager",
    title: "Enterprise IT Project Manager (PMP® Certified)",
    department: "Project Management",
    location: "Port Harcourt / Lagos (Hybrid)",
    type: "Full-time",
    experienceLevel: "Lead / Manager",
    salary: "₦1,400,000 - ₦2,000,000 / month",
    postedDate: "Just now",
    deadline: "Dec 01, 2026",
    urgency: "Immediate",
    employer: {
      name: "Temamost & Watech Infrastructure Consortium",
      type: "Mindware Client Partner",
      logoInitials: "TW",
      verified: true
    },
    summary: "Oversee multi-billion naira civil and digital infrastructure transformation projects adhering to PMI PMBOK standards and strict stakeholder governance.",
    responsibilities: [
      "Lead cross-functional project teams through initiation, planning, execution, monitoring, and closing phases.",
      "Manage project schedules, critical path methodologies, risk registers, and procurement contracts with international suppliers.",
      "Act as primary liaison between executive directors, site engineers, technology vendors, and regulatory bodies.",
      "Ensure compliance with Nigerian and international engineering codes and environmental safety protocols."
    ],
    requiredQualifications: [
      "B.Sc. / B.Eng. in Project Management, Civil Engineering, Computer Science, or Business Administration.",
      "5+ years of demonstrable project management experience leading complex multi-disciplinary programs.",
      "Mastery of MS Project, Primavera P6, Jira, and enterprise ERP systems."
    ],
    preferredCertifications: [
      "Project Management Professional (PMP®) by PMI (Required)",
      "PRINCE2® Practitioner Certification",
      "Agile Certified Practitioner (PMI-ACP)"
    ],
    skills: ["PMP Standards", "Risk Management", "Budget Control", "Stakeholder Engagement", "Contract Management", "Jira"],
    benefits: [
      "Executive level compensation package",
      "Official vehicle + driver provision or transport allowance",
      "International conference sponsorship",
      "Annual profit sharing bonus"
    ]
  },
  {
    id: "mw-uiux-brand-designer",
    title: "Lead UI/UX & Brand Identity Designer",
    department: "Design & UX",
    location: "Lagos / Remote Option",
    type: "Full-time",
    experienceLevel: "Senior",
    salary: "₦800,000 - ₦1,200,000 / month",
    postedDate: "4 days ago",
    deadline: "Nov 30, 2026",
    urgency: "Featured",
    employer: {
      name: "Mindware Consulting Ltd",
      type: "Mindware Consulting Direct",
      logoInitials: "MW",
      verified: true
    },
    summary: "Craft distinctive, world-class digital visual identities, interactive design systems, and intuitive SaaS UI/UX for corporate clients.",
    responsibilities: [
      "Develop comprehensive design systems in Figma including tokenized typography, color palettes, interactive components, and micro-animations.",
      "Conduct user research, journey mapping, wireframing, and usability testing sessions with real target customers.",
      "Collaborate seamlessly with frontend engineers to guarantee pixel-perfect design-to-code execution.",
      "Design striking corporate collateral, investor pitch decks, and brand guideline books."
    ],
    requiredQualifications: [
      "3+ years of professional product and brand identity design experience with an outstanding portfolio.",
      "Deep expertise in Figma, Adobe Creative Cloud, Framer, and modern prototyping tools.",
      "Strong grasp of design psychology, typography, grid systems, and conversion-focused UI design."
    ],
    preferredCertifications: [
      "Google UX Design Professional Certificate",
      "Nielsen Norman Group (NN/g) UX Certification",
      "Interaction Design Foundation (IxDF) Specialist"
    ],
    skills: ["Figma", "Design Systems", "User Research", "Wireframing", "Brand Identity", "Prototyping", "Motion Design"],
    benefits: [
      "High-spec Apple M-series workstation provided",
      "Creative freedom on international and national projects",
      "HMO healthcare & wellness package",
      "Paid annual creative sabbatical"
    ]
  },
  {
    id: "client-hse-specialist",
    title: "HSE & Regulatory Compliance Specialist (Levels 1, 2, 3)",
    department: "Health & Safety",
    location: "Abuja / Port Harcourt, Nigeria",
    type: "Contract",
    experienceLevel: "Mid-Level",
    salary: "₦900,000 - ₦1,350,000 / month",
    postedDate: "5 days ago",
    deadline: "Nov 20, 2026",
    urgency: "Actively Hiring",
    employer: {
      name: "Priziangori Global Services Limited",
      type: "Mindware Client Partner",
      logoInitials: "PG",
      verified: true
    },
    summary: "Ensure world-class occupational health, safety, and environmental stewardship across oil & gas, aviation, and civil construction facilities.",
    responsibilities: [
      "Conduct continuous Job Hazard Analyses (JHA), safety audits, and risk assessment inspections across operational operational plants.",
      "Facilitate mandatory toolbox talks, emergency preparedness simulations, and workforce safety compliance briefings.",
      "Investigate near-misses and incidents, delivering root-cause analysis reports with preventive corrective actions.",
      "Liaise with federal and state regulatory authorities (DPR, Federal Ministry of Environment, NIMASA, NESREA)."
    ],
    requiredQualifications: [
      "B.Sc. in Environmental Science, Industrial Safety, Engineering, or Occupational Health.",
      "3+ years active field experience in HSE management within engineering, oil & gas, or manufacturing environments.",
      "Demonstrated knowledge of ISO 45001, ISO 14001, and Nigerian statutory safety legislation."
    ],
    preferredCertifications: [
      "National Examination Board in Occupational Safety and Health (NEBOSH) IGC",
      "HSE Competence Levels 1, 2, and 3 (ISPON / British Safety Council)",
      "First Aid & CPR Certified Responder"
    ],
    skills: ["Hazard Analysis (JHA)", "Safety Auditing", "ISO 45001", "Incident Investigation", "Emergency Response", "Regulatory Filing"],
    benefits: [
      "Comprehensive field hazard allowance",
      "Full offshore/site medical insurance and evacuation cover",
      "Continuous professional training & re-certification sponsorships",
      "Performance project bonuses"
    ]
  },
  {
    id: "client-bi-data-analyst",
    title: "Commercial Data Analyst & BI Specialist",
    department: "Data & Analytics",
    location: "Remote (Nigeria / West Africa)",
    type: "Full-time",
    experienceLevel: "Mid-Level",
    salary: "₦850,000 - ₦1,300,000 / month",
    postedDate: "1 week ago",
    deadline: "Dec 10, 2026",
    urgency: "Featured",
    employer: {
      name: "Harmostructs & Quanxi Commercial Network",
      type: "Mindware Client Partner",
      logoInitials: "HQ",
      verified: true
    },
    summary: "Transform complex operational and market data into high-impact interactive dashboards, automated forecasting models, and executive insights.",
    responsibilities: [
      "Build, optimize, and maintain automated Power BI and Tableau dashboards connecting to SQL databases and cloud ERPs.",
      "Write advanced SQL queries, stored procedures, and data transformation scripts for revenue and inventory metrics.",
      "Conduct exploratory cohort analyses, churn forecasts, and customer lifetime value (LTV) models.",
      "Present actionable commercial findings directly to Managing Directors and department heads."
    ],
    requiredQualifications: [
      "B.Sc. in Statistics, Mathematics, Computer Science, Economics, or related quantitative field.",
      "2-4 years of experience delivering commercial business intelligence in fast-paced corporate environments.",
      "Advanced proficiency in SQL, Power BI (DAX, Power Query), and Excel modeling."
    ],
    preferredCertifications: [
      "Microsoft Certified: Power BI Data Analyst Associate (PL-300)",
      "Google Data Analytics Professional Certificate",
      "Tableau Desktop Specialist"
    ],
    skills: ["Power BI", "SQL", "DAX", "Data Modeling", "Python / Pandas", "Tableau", "Commercial Acumen"],
    benefits: [
      "100% remote working flexibility with internet allowance",
      "Health & dental insurance coverage",
      "Access to global data science learning libraries",
      "Year-end performance bonus"
    ]
  }
];

export const TALENT_POOL_SAMPLE: TalentCandidate[] = [
  {
    id: "cand-1",
    name: "Emeka Chibuike",
    role: "Senior Full-Stack & Cloud Engineer",
    location: "Lagos, Nigeria",
    experienceYears: 6,
    availability: "Immediate",
    bio: "Full-stack engineer with 6 years experience building high-throughput web applications, microservices, and fin-tech integrations across Nigeria and the UK.",
    certifications: ["AWS Certified Solutions Architect", "Meta Certified Front-End Engineer", "Scrum Master (CSM)"],
    skills: ["React", "TypeScript", "Node.js", "Docker", "PostgreSQL", "Next.js", "Redis"],
    education: "B.Sc. Computer Science, University of Lagos",
    verified: true,
    openToRemote: true,
    matchScore: 98
  },
  {
    id: "cand-2",
    name: "Amina Yusuf, PMP®",
    role: "Senior IT Project Manager & Scrum Master",
    location: "Abuja, Nigeria",
    experienceYears: 7,
    availability: "2 Weeks Notice",
    bio: "PMP-certified project lead with a track record of delivering ₦500M+ enterprise digital transformation programs on schedule and 15% under budget.",
    certifications: ["PMP® Certified (PMI)", "PRINCE2® Practitioner", "PMI-ACP (Agile)"],
    skills: ["PMP Framework", "Jira", "Risk Registers", "Earned Value Analysis", "Stakeholder Governance", "Budgeting"],
    education: "M.Sc. Technology Management, Ahmadu Bello University",
    verified: true,
    openToRemote: true,
    matchScore: 95
  },
  {
    id: "cand-3",
    name: "David O. Adeleke",
    role: "HSE Compliance Lead & Risk Assessor",
    location: "Port Harcourt, Nigeria",
    experienceYears: 5,
    availability: "Immediate",
    bio: "ISPON and NEBOSH certified safety engineer with 5 years experience across oil & gas offshore rigs and heavy civil construction projects.",
    certifications: ["NEBOSH International General Certificate", "HSE Levels 1, 2, 3 (ISPON)", "ISO 45001 Lead Auditor"],
    skills: ["Job Hazard Analysis", "Safety Auditing", "ISO 45001", "Toolbox Training", "Emergency Protocols"],
    education: "B.Eng. Mechanical Engineering, University of Port Harcourt",
    verified: true,
    openToRemote: false,
    matchScore: 92
  },
  {
    id: "cand-4",
    name: "Blessing N. Okafor",
    role: "Growth Marketer & Technical SEO Specialist",
    location: "Enugu / Remote, Nigeria",
    experienceYears: 4,
    availability: "Immediate",
    bio: "SEO strategist who has scaled organic search traffic by 340% for multi-client portfolios and handled ₦20M+ in paid ad spend.",
    certifications: ["Google Analytics 4 Certified", "Google Ads Search Certified", "HubSpot Content Marketing"],
    skills: ["Technical SEO", "Google Ads", "GA4", "Ahrefs", "Conversion Optimization", "Copywriting"],
    education: "B.A. Mass Communication, University of Nigeria, Nsukka",
    verified: true,
    openToRemote: true,
    matchScore: 96
  }
];

export const POPULAR_CERTIFICATIONS = [
  "Project Management Professional (PMP®)",
  "HSE Level 1, 2, 3 (Health, Safety & Environment)",
  "NEBOSH International General Certificate",
  "Google UX Design Professional Certificate",
  "Google Analytics 4 (GA4) Certification",
  "AWS Certified Solutions Architect",
  "Meta Certified Front-End Developer",
  "Microsoft Certified: Power BI Data Analyst (PL-300)",
  "PRINCE2® Practitioner",
  "Human Resource Management (HRM / CIPM)",
  "Certified ScrumMaster (CSM)",
  "Digital Marketing Institute (DMI) Certified"
];

// ============================================================================
// MINDWARE CONSULTING LTD — INTERNAL CORPORATE RECRUITMENT DATA
// Exclusive internal roles within Mindware Consulting Ltd across 8 core
// practice disciplines and 5 engagement structures.
// ============================================================================

export type InternalDiscipline =
  | "Website design & development"
  | "SEO & digital marketing"
  | "Social media & content strategy"
  | "Software & application development"
  | "Business development & sales"
  | "Client acquisition & account management"
  | "Project management & consulting"
  | "Administration & operations";

export type InternalEngagementType =
  | "Full-time"
  | "Part-time"
  | "Contract"
  | "Internship"
  | "Project-based";

export interface DisciplineDescriptor {
  name: InternalDiscipline;
  shortLabel: string;
  focus: string;
  pillar: string;
}

export interface InternalJobVacancy {
  id: string;
  code: string;
  title: string;
  discipline: InternalDiscipline;
  engagementType: InternalEngagementType;
  workModel: "Hybrid (Lagos)" | "Remote (Nigeria)" | "On-Site (Lagos HQ)" | "Hybrid (Abuja / Lagos)";
  location: string;
  experienceLevel: "Entry / Graduate" | "Mid-Level (2-4 yrs)" | "Senior (4+ yrs)" | "Lead / Principal";
  compensationRange: string;
  postedDate: string;
  status: "Open" | "Urgent";
  reportsTo: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  competencies: string[];
}

export interface CulturePillar {
  title: string;
  description: string;
  metric: string;
}

export interface SelectionStep {
  step: string;
  title: string;
  timeline: string;
  description: string;
}

export const INTERNAL_DISCIPLINES: DisciplineDescriptor[] = [
  {
    name: "Website design & development",
    shortLabel: "Web Architecture & UX",
    focus: "High-converting enterprise corporate platforms, conversion architectures, and responsive frontend engineering.",
    pillar: "Digital Transformation & Technology"
  },
  {
    name: "SEO & digital marketing",
    shortLabel: "Search & Demand Gen",
    focus: "Technical SEO, local visibility dominance, Google Ads acquisition funnels, and analytics attribution.",
    pillar: "Digital Marketing & Customer Acquisition"
  },
  {
    name: "Social media & content strategy",
    shortLabel: "Brand Authority & Content",
    focus: "B2B executive positioning, multi-channel editorial systems, thought leadership, and visual storytelling.",
    pillar: "Digital Marketing & Customer Acquisition"
  },
  {
    name: "Software & application development",
    shortLabel: "Custom Systems & Apps",
    focus: "Full-stack business platforms, client portals, CRM workflows, API integrations, and scalable cloud systems.",
    pillar: "Digital Transformation & Technology"
  },
  {
    name: "Business development & sales",
    shortLabel: "Enterprise Origination",
    focus: "Consultative pipeline creation, commercial proposals, sector partnerships, and strategic revenue expansion.",
    pillar: "Business Growth & Management Consulting"
  },
  {
    name: "Client acquisition & account management",
    shortLabel: "Client Success & Retention",
    focus: "Onboarding governance, QBR execution, stakeholder alignment, and multi-quarter account expansion.",
    pillar: "Business Growth & Management Consulting"
  },
  {
    name: "Project management & consulting",
    shortLabel: "Delivery & Transformation",
    focus: "End-to-end digital transformation governance, SLA execution, process optimization, and advisory sprints.",
    pillar: "Business Growth & Management Consulting"
  },
  {
    name: "Administration & operations",
    shortLabel: "Corporate Operations",
    focus: "Internal workflow efficiency, finance/compliance coordination, executive scheduling, and quality governance.",
    pillar: "Corporate Backbone"
  }
];

export const INTERNAL_ENGAGEMENT_TYPES: {
  type: InternalEngagementType;
  description: string;
}[] = [
  {
    type: "Full-time",
    description: "Core permanent consulting, engineering, and commercial roles with HMO & performance bonuses."
  },
  {
    type: "Part-time",
    description: "Structured weekly retainer hours for specialist advisors, strategists, and editorial leads."
  },
  {
    type: "Contract",
    description: "Fixed-term 3–12 month engagements aligned with multi-phase enterprise transformation programs."
  },
  {
    type: "Internship",
    description: "Structured 6-month mentored fellowships for high-potential graduates across engineering & growth."
  },
  {
    type: "Project-based",
    description: "Milestone-driven specialist engagements for targeted audits, builds, or sector deliverables."
  }
];

export const WORK_CULTURE_PILLARS: CulturePillar[] = [
  {
    title: "Commercial Ownership Over Busywork",
    description: "Every website, campaign, and advisory framework we ship is measured by tangible business impact—lead velocity, operational speed, and client revenue protection.",
    metric: "Outcome-Driven KPIs"
  },
  {
    title: "Craft Rigor Across Construction & Enterprise",
    description: "We serve demanding real-economy sectors—civil engineering, energy, real estate, and automotive—where clarity, reliability, and engineering precision matter.",
    metric: "Multi-Sector B2B Portfolio"
  },
  {
    title: "Multidisciplinary Pods, Zero Silos",
    description: "Strategists, full-stack developers, SEO specialists, and project managers collaborate side by side under Mindware's Acquire → Grow → Optimize → Accelerate → Protect model.",
    metric: "Cross-Practice Delivery"
  },
  {
    title: "Structured Continuous Mastery",
    description: "Annual certification support across cloud architecture, PMI standards, analytics, and modern engineering—helping internal practitioners advance steadily.",
    metric: "Dedicated L&D Support"
  }
];

export const RECRUITMENT_STEPS: SelectionStep[] = [
  {
    step: "01",
    title: "Targeted Application Review",
    timeline: "2–4 Business Days",
    description: "Our hiring leads directly review your portfolio, track record, and alignment with Mindware's internal delivery standards—no automated keyword black boxes."
  },
  {
    step: "02",
    title: "Capability & Culture Conversation",
    timeline: "30-Minute Video Call",
    description: "A structured dialogue with the Practice Lead covering your problem-solving approach, communication clarity, and career ambitions within Mindware."
  },
  {
    step: "03",
    title: "Practical Case or Technical Dialogue",
    timeline: "60-Minute Working Session",
    description: "Walk through a realistic client transformation scenario—whether auditing a construction firm's web funnel, scoping an app architecture, or structuring a B2B growth pitch."
  },
  {
    step: "04",
    title: "Executive Offer & Onboarding",
    timeline: "Within 5 Days of Final Stage",
    description: "Clear engagement terms, compensation structure, 90-day onboarding roadmap, and integration into Mindware Consulting's delivery pods."
  }
];

export const INTERNAL_VACANCIES: InternalJobVacancy[] = [
  {
    id: "mw-int-web-arch",
    code: "MW-WEB-01",
    title: "Senior Corporate Web Designer & Frontend Engineer",
    discipline: "Website design & development",
    engagementType: "Full-time",
    workModel: "Hybrid (Lagos)",
    location: "Lagos HQ / Hybrid",
    experienceLevel: "Senior (4+ yrs)",
    compensationRange: "Competitive Executive Package + Bonus",
    postedDate: "Active Opening",
    status: "Urgent",
    reportsTo: "Head of Digital Transformation & Technology",
    summary: "Lead the visual architecture and responsive frontend implementation of flagship corporate websites for construction, real estate, energy, and automotive enterprises.",
    responsibilities: [
      "Design and engineer responsive, high-trust corporate digital platforms in React, TypeScript, and Tailwind CSS.",
      "Translate industrial and corporate brand identities into structured UX journeys that improve buyer confidence and RFQ conversions.",
      "Establish reusable component systems, Core Web Vitals optimization benchmarks (90+ scores), and technical SEO cleanliness.",
      "Collaborate directly with Mindware project consultants during client discovery and executive design sign-offs."
    ],
    requirements: [
      "4+ years shipping production corporate websites or B2B web applications with measurable conversion outcomes.",
      "Strong command of React, TypeScript, Tailwind CSS, semantic HTML5, and modern motion choreography.",
      "Demonstrable portfolio of high-craft enterprise or industrial websites across mobile and desktop viewports."
    ],
    competencies: ["React & TypeScript", "Conversion UX", "Tailwind CSS", "Core Web Vitals", "Responsive Architecture"]
  },
  {
    id: "mw-int-seo-strategist",
    code: "MW-SEO-02",
    title: "Technical SEO & Performance Acquisition Specialist",
    discipline: "SEO & digital marketing",
    engagementType: "Full-time",
    workModel: "Remote (Nigeria)",
    location: "Lagos / Abuja / Remote (Nigeria)",
    experienceLevel: "Mid-Level (2-4 yrs)",
    compensationRange: "Base Retainer + Performance Incentives",
    postedDate: "Active Opening",
    status: "Open",
    reportsTo: "Growth Practice Lead",
    summary: "Own organic search visibility, schema architecture, Google Business Profile optimization, and paid search customer acquisition across Mindware's active client portfolio.",
    responsibilities: [
      "Conduct technical SEO audits (crawl architecture, structured data JSON-LD, internal linking, Core Web Vitals) for Mindware and client properties.",
      "Build and manage Google Search & Meta lead generation campaigns targeting commercial B2B decision-makers.",
      "Produce clear monthly attribution dashboards linking organic rankings and ad spend directly to qualified client leads.",
      "Partner with web engineers on launch checklists to prevent indexation or ranking loss during website upgrades."
    ],
    requirements: [
      "3+ years of documented B2B/corporate SEO and Google Ads campaign management experience.",
      "Proficiency with Google Search Console, GA4, Semrush/Ahrefs, Screaming Frog, and Schema.org markup.",
      "Proven ability to rank competitive Nigerian and international service keywords."
    ],
    competencies: ["Technical SEO", "GA4 & Search Console", "Google Ads", "Schema Markup", "CRO Analytics"]
  },
  {
    id: "mw-int-soft-eng",
    code: "MW-ENG-03",
    title: "Full-Stack Software & Application Developer",
    discipline: "Software & application development",
    engagementType: "Contract",
    workModel: "Remote (Nigeria)",
    location: "Remote / Hybrid Lagos",
    experienceLevel: "Senior (4+ yrs)",
    compensationRange: "Contract Retainer (6–12 Months Renewable)",
    postedDate: "Active Opening",
    status: "Open",
    reportsTo: "Principal Solutions Architect",
    summary: "Architect bespoke client portals, internal workflow automation tools, CRM integrations, and operational web applications under Mindware's Digital Transformation pillar.",
    responsibilities: [
      "Design and implement full-stack TypeScript/Node.js applications, REST APIs, and relational/document database schemas.",
      "Integrate third-party enterprise APIs, payment gateways, notification systems, and analytics pipelines.",
      "Maintain strict security-by-default engineering standards, role-based access control, and automated deployment readiness.",
      "Document system architecture clearly for client technical teams during handover and capability transfer."
    ],
    requirements: [
      "4+ years building production Node.js/TypeScript backend services paired with modern React/Next.js frontends.",
      "Solid experience with PostgreSQL or Cloud Firestore, authentication flows, and cloud deployment.",
      "Strong debugging discipline and clean modular code practices."
    ],
    competencies: ["Node.js & Express", "TypeScript", "PostgreSQL / Cloud DB", "API Architecture", "Security Hygiene"]
  },
  {
    id: "mw-int-content-lead",
    code: "MW-CNT-04",
    title: "B2B Social Media & Executive Content Strategist",
    discipline: "Social media & content strategy",
    engagementType: "Part-time",
    workModel: "Remote (Nigeria)",
    location: "Remote (Nigeria)",
    experienceLevel: "Mid-Level (2-4 yrs)",
    compensationRange: "Monthly Part-Time Retainer",
    postedDate: "Active Opening",
    status: "Open",
    reportsTo: "Head of Digital Marketing & Customer Acquisition",
    summary: "Craft authoritative LinkedIn narratives, case study breakdowns, and sector thought-leadership content for Mindware Consulting Ltd and selected corporate clients.",
    responsibilities: [
      "Develop monthly editorial calendars across LinkedIn, Instagram, X, and YouTube tailored to C-suite and procurement buyers.",
      "Interview project leads to turn completed digital builds and transformation sprints into persuasive executive case studies.",
      "Coordinate short-form video scripts and visual carousels aligned strictly with enterprise brand positioning.",
      "Track audience engagement quality, follower growth across key sectors, and content-driven consultation inquiries."
    ],
    requirements: [
      "2+ years writing persuasive B2B copy, LinkedIn thought leadership, or corporate brand communications.",
      "Sharp editorial judgment—able to communicate technical and strategic concepts without hype or clichés.",
      "Familiarity with B2B industries such as construction, real estate, automotive, or professional services."
    ],
    competencies: ["B2B Copywriting", "LinkedIn Strategy", "Editorial Planning", "Case Study Storytelling", "Brand Voice"]
  },
  {
    id: "mw-int-bizdev",
    code: "MW-BIZ-05",
    title: "Corporate Business Development & Growth Executive",
    discipline: "Business development & sales",
    engagementType: "Full-time",
    workModel: "Hybrid (Lagos)",
    location: "Lagos (Victoria Island / Ikeja Corridor)",
    experienceLevel: "Mid-Level (2-4 yrs)",
    compensationRange: "Base Salary + Uncapped Deal Commission",
    postedDate: "Active Opening",
    status: "Urgent",
    reportsTo: "Managing Partner",
    summary: "Originate consultative enterprise partnerships across construction, civil engineering, real estate, energy, and commercial services in Nigeria and West Africa.",
    responsibilities: [
      "Identify, qualify, and engage directors and managing partners who need stronger digital infrastructure, customer acquisition, or operational systems.",
      "Lead discovery conversations alongside Mindware technical consultants to diagnose commercial bottlenecks.",
      "Author tailored growth proposals, scope commercial engagements, and shepherd enterprise deals from initial briefing to signed mandate.",
      "Represent Mindware Consulting Ltd cleanly at industry roundtables, trade expos, and partner briefings."
    ],
    requirements: [
      "3+ years closing B2B consulting, technology, SaaS, or corporate service mandates in Nigeria.",
      "Confident executive presence and structured CRM pipeline management discipline.",
      "Ability to articulate commercial ROI of websites, SEO, software systems, and management consulting."
    ],
    competencies: ["Consultative Selling", "Enterprise Proposals", "Pipeline Governance", "B2B Networking", "Commercial Negotiation"]
  },
  {
    id: "mw-int-acct-mgr",
    code: "MW-ACM-06",
    title: "Client Acquisition & Key Account Manager",
    discipline: "Client acquisition & account management",
    engagementType: "Full-time",
    workModel: "Hybrid (Lagos)",
    location: "Lagos HQ / Hybrid",
    experienceLevel: "Mid-Level (2-4 yrs)",
    compensationRange: "Competitive Salary + Retention Bonus",
    postedDate: "Active Opening",
    status: "Open",
    reportsTo: "Director of Client Growth",
    summary: "Steward Mindware's multi-quarter corporate retainers, ensuring seamless client onboarding, high satisfaction scores, and strategic account expansion.",
    responsibilities: [
      "Serve as primary commercial point of contact for retained corporate accounts across the ACQUIRE → GROW → OPTIMIZE → ACCELERATE → PROTECT lifecycle.",
      "Run structured Monthly and Quarterly Business Reviews (QBRs) highlighting lead outcomes, digital uptime, and roadmap priorities.",
      "Identify natural cross-practice opportunities—expanding web clients into SEO, CRM automation, or operational consulting.",
      "Safeguard renewal velocity and referral advocacy across Mindware's executive client network."
    ],
    requirements: [
      "3+ years managing B2B client accounts in a digital consultancy, agency, or technology firm.",
      "Exceptional verbal communication, executive presentation skills, and calm conflict resolution.",
      "Data fluency to interpret traffic, conversion, and project milestone metrics."
    ],
    competencies: ["Account Retention", "QBR Leadership", "Client Onboarding", "Cross-Sell Strategy", "Stakeholder Trust"]
  },
  {
    id: "mw-int-pm-consult",
    code: "MW-PMC-07",
    title: "Project Manager & Digital Transformation Consultant",
    discipline: "Project management & consulting",
    engagementType: "Project-based",
    workModel: "Hybrid (Abuja / Lagos)",
    location: "Lagos / Abuja (Project Deployment)",
    experienceLevel: "Senior (4+ yrs)",
    compensationRange: "Milestone / Project Engagement Fee",
    postedDate: "Active Opening",
    status: "Open",
    reportsTo: "Head of Advisory & Delivery",
    summary: "Direct end-to-end execution of client digital transformation initiatives, SOP modernization mandates, and multi-disciplinary web/software rollouts.",
    responsibilities: [
      "Translate signed client scopes into disciplined work breakdown structures (WBS), sprint schedules, risk registers, and acceptance criteria.",
      "Facilitate executive workshops with client leadership teams to map operational bottlenecks and technology adoption plans.",
      "Coordinate Mindware designers, developers, and marketers to hit 100% on-time milestone delivery.",
      "Embed governance documentation and post-launch team enablement for smooth organizational adoption."
    ],
    requirements: [
      "4+ years managing digital transformation, ERP/CRM adoption, or complex technology delivery projects.",
      "PMP®, PRINCE2®, or Agile delivery certification strongly preferred.",
      "Structured documentation mastery and experience advising Nigerian SME or enterprise executives."
    ],
    competencies: ["PMP / Agile Delivery", "Process Mapping", "Risk Governance", "Executive Facilitation", "SLA Control"]
  },
  {
    id: "mw-int-ops-intern",
    code: "MW-OPS-08",
    title: "Corporate Operations & Administration Associate / Fellow",
    discipline: "Administration & operations",
    engagementType: "Internship",
    workModel: "On-Site (Lagos HQ)",
    location: "Lagos HQ",
    experienceLevel: "Entry / Graduate",
    compensationRange: "Monthly Stipend + Full-Time Conversion Path",
    postedDate: "Active Opening",
    status: "Open",
    reportsTo: "Operations & Administration Lead",
    summary: "Support Mindware's internal corporate operations, invoicing schedules, vendor coordination, contract administration, and executive office efficiency.",
    responsibilities: [
      "Maintain organized client contract records, compliance documentation (CAC/RC filings, NDA logs), and project billing trackers.",
      "Coordinate internal team scheduling, client discovery call logistics, and onboarding checklists.",
      "Assist with procurement, office operations, and monthly management reporting packs.",
      "Standardize internal knowledge-base SOPs to keep Mindware's back-office running smoothly."
    ],
    requirements: [
      "B.Sc. / HND in Business Administration, Economics, Management, or related discipline (NYSC completed or exempted preferred).",
      "Strong spreadsheet literacy (Excel / Google Sheets), meticulous attention to detail, and professional written English.",
      "High integrity, discretion with corporate records, and proactive ownership."
    ],
    competencies: ["Corporate Admin", "Spreadsheet Reporting", "Contract Hygiene", "Scheduling", "Internal SOPs"]
  }
];

