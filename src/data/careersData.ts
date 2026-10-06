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
