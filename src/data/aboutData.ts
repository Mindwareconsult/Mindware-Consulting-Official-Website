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

export interface AdvisoryMember {
  name: string;
  title: string;
  organization: string;
  focusArea: string;
}

export interface GovernancePillar {
  number: string;
  title: string;
  description: string;
  metric: string;
}

export const MISSION_STATEMENT = {
  headline: "Empowering Ambitious Enterprises with Transformative Digital Infrastructure and Scalable Growth Engines.",
  extended:
    "Mindware Consulting Ltd exists to bridge the gap between visionary business strategy and flawless technical execution. We engineer high-converting digital ecosystems, deploy enterprise-grade software and search visibility, and equip modern workforces with world-class digital and managerial skills across Nigeria, West Africa, and global markets.",
  pillars: [
    {
      title: "Strategic Clarity over Tactical Noise",
      desc: "We diagnose root commercial hurdles before writing a single line of code or designing a single ad campaign."
    },
    {
      title: "World-Class Engineering & Creative Craft",
      desc: "Delivering performant, secure, and visually distinctive web architectures that outpace global benchmarks."
    },
    {
      title: "Economic Impact & Measurable ROI",
      desc: "Every project is evaluated on concrete commercial milestones—pipeline generated, conversions, and operational velocity."
    },
    {
      title: "African Talent & Skill Sovereignty",
      desc: "Upskilling professionals and enterprise teams through PMI-aligned project governance, digital skills, and certified HSE standards."
    }
  ]
};

export const VISION_STATEMENT = {
  headline: "To be Africa's Most Trusted Catalyst for Enterprise Digital Modernization and High-Performance Workforce Talent.",
  extended:
    "We envision a continent where every forward-thinking corporation, SME, and institution harnesses modern web technologies, automated operations, and skilled human capital to compete, lead, and win on the global stage.",
  horizons: [
    {
      period: "Horizon 1 · Present – 2026",
      title: "Regional Authority & Full-Stack Synergy",
      focus: "Consolidating our position as Nigeria's premier growth consulting firm for industrial, energy, and corporate digital modernization."
    },
    {
      period: "Horizon 2 · 2026 – 2028",
      title: "Pan-African Scale & Automated Cloud Ecosystems",
      focus: "Expanding cross-border consulting, enterprise ERP integrations, and multi-hub training cohorts across Anglophone West Africa."
    },
    {
      period: "Horizon 3 · 2028 – 2030+",
      title: "Global Technology & Workforce Export",
      focus: "Positioning African digital engineers, certified project managers, and growth marketers into high-value global corporate supply chains."
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
      "We never begin with assumptions or generic templates. We interrogate business models, user behaviors, and revenue drivers so every digital artifact serves a validated strategic purpose.",
    inAction: "Conducting deep technical audits and stakeholder interviews before recommending any tech stack or marketing spend.",
    iconName: "Compass"
  },
  {
    id: "uncompromising-craft",
    number: "02",
    title: "Uncompromising Craft",
    tagline: "World-class execution standards",
    description:
      "Good enough is our baseline failure state. From responsive typography and sub-second load times to robust API design and brand aesthetics, we uphold obsessive attention to detail.",
    inAction: "Rigorous 3-stage QA, 95+ Google Lighthouse scores, and semantic code architectures on every deployment.",
    iconName: "Sparkles"
  },
  {
    id: "integrity-transparency",
    number: "03",
    title: "Radical Transparency",
    tagline: "Open books, honest timelines",
    description:
      "We believe high-trust partnerships yield the highest commercial returns. We share real metrics, communicate roadblocks proactively, and never pad hours or inflate projections.",
    inAction: "Live client dashboards, weekly sprint demos, transparent scope documentation, and zero hidden licensing fees.",
    iconName: "ShieldCheck"
  },
  {
    id: "collaborative-ownership",
    number: "04",
    title: "Extreme Ownership",
    tagline: "Your commercial goals are our personal mandate",
    description:
      "We do not behave like detached vendors who check out after handoff. We adopt our clients' balance sheets and reputation as if they were our own.",
    inAction: "Continuous post-launch optimization, proactively monitoring uptime, search ranks, and campaign ROAS without being prompted.",
    iconName: "Users"
  },
  {
    id: "measurable-impact",
    number: "05",
    title: "Measurable Impact",
    tagline: "Data as the ultimate arbiter",
    description:
      "Vanity metrics have no place in enterprise consulting. We measure success strictly by revenue qualified leads, pipeline acceleration, customer acquisition costs, and system efficiency.",
    inAction: "Building full attribution models and reporting pipeline velocity and conversion lift on every client engagement.",
    iconName: "Target"
  },
  {
    id: "continuous-growth",
    number: "06",
    title: "Continuous Growth & Mastery",
    tagline: "Investing deeply in human intellect",
    description:
      "Technology evolves exponentially; stagnation is fatal. We relentlessly study emerging frameworks, share knowledge openly, and train the next generation of digital leaders.",
    inAction: "Hosting the Mindware Training Academy, funding team certifications, and publishing real-world technical case studies.",
    iconName: "GraduationCap"
  }
];

export const GROWTH_PHILOSOPHY = {
  triad: [
    {
      title: "Mind (Cognitive Strategy)",
      subtitle: "The Intelligence Layer",
      desc: "Deep commercial diagnosis, user journey mapping, and value proposition crystallization. Knowing exactly what to build and why.",
      points: ["Market & competitor audits", "Commercial positioning strategy", "Conversion architecture", "Data attribution blueprints"]
    },
    {
      title: "Technology (Digital Architecture)",
      subtitle: "The Execution Layer",
      desc: "Robust modern web engineering, speed optimization, CMS scalability, security hardening, and seamless API integrations.",
      points: ["Sub-second web performance", "Enterprise headless CMS", "Cloud infrastructure & SSL", "Mobile-first responsive UI"]
    },
    {
      title: "Growth (Commercial Velocity)",
      subtitle: "The Scaling Layer",
      desc: "High-intent organic search domination, paid media performance, continuous A/B experimentation, and workforce capability building.",
      points: ["Technical SEO & localized search", "Paid media ROAS optimization", "Workforce upskilling & certifications", "Lifecycle retention automation"]
    }
  ]
};

export const LEADERSHIP_TEAM: LeadershipMember[] = [
  {
    id: "chike-onyekachukwu",
    name: "Chike Onyekachukwu",
    role: "Founder, Managing Director & CEO",
    division: "Executive Leadership & Strategy",
    bio: "Chike is the visionary founder and Chief Executive Officer of Mindware Consulting Ltd. With extensive experience spanning digital transformation, software product strategy, search engine optimization, and enterprise consulting, Chike has spearheaded high-impact digital initiatives for leading Nigerian conglomerates, energy operators, and high-growth SMEs. He holds an unwavering conviction that Nigerian enterprises can dominate global benchmarks through strategic design, robust technology, and rigorous workforce capability.",
    quote: "Our mission is simple yet uncompromising: to dismantle the friction between African businesses and global digital excellence. We do not just build websites; we build the revenue engines and human talent that power the future of commerce.",
    image: "/mindware-ceo.png",
    credentials: [
      "Founder & MD, Mindware Consulting Ltd",
      "Executive Technology Strategist",
      "Enterprise SEO & Digital Growth Architect",
      "Lead Advisor on Corporate Digital Modernization"
    ],
    responsibilities: [
      "Corporate strategy, long-term vision & shareholder governance",
      "Major enterprise client advisory & strategic architecture",
      "Curriculum direction for Mindware Academy programs",
      "Fostering strategic technology partnerships & Pan-African expansion"
    ],
    linkedin: "https://linkedin.com"
  },
  {
    id: "anthony-adeleke",
    name: "Engr. Anthony Adeleke",
    role: "Chief Technology Officer (CTO)",
    division: "Engineering & Digital Infrastructure",
    bio: "Anthony oversees technology infrastructure, systems architecture, and engineering standards across all Mindware client builds. A seasoned full-stack systems engineer with over a decade of experience designing scalable web applications, cloud hosting clusters, and enterprise API integrations, Anthony guarantees sub-second performance, airtight cybersecurity, and high-availability uptime.",
    image: "/assets/aistudio/hero_marketing_studio.jpg",
    credentials: [
      "B.Eng Computer Engineering",
      "AWS Certified Solutions Architect",
      "Certified Ethical Hacker (CEH)",
      "10+ Years Enterprise Full-Stack Engineering"
    ],
    responsibilities: [
      "Engineering architecture & code review standards",
      "Cloud hosting security, CDN, and high-availability DevOps",
      "API integrations & custom CRM/ERP workflow automations",
      "Technical mentorship for digital academy engineering tracks"
    ]
  },
  {
    id: "sarah-nnamdi-okafor",
    name: "Sarah Nnamdi-Okafor",
    role: "Director of Digital Growth & Performance Marketing",
    division: "Growth, SEO & Paid Acquisition",
    bio: "Sarah leads Mindware's performance marketing practice, overseeing organic search engine optimization, paid customer acquisition across Meta and Google Ads, and conversion rate optimization (CRO). Her data-rigorous methodologies have propelled dozens of B2B and consumer brands to top Google rankings and multi-fold increases in qualified pipeline.",
    image: "/assets/images/values_innovation_culture_1790617210723.jpg",
    credentials: [
      "B.Sc Mass Communication",
      "Google Ads & Analytics Certified Professional",
      "Meta Certified Media Buying Specialist",
      "Former Senior Growth Strategist at Regional Agency"
    ],
    responsibilities: [
      "Organic SEO strategy & technical search indexing",
      "Multi-channel paid media budget allocation & ROAS optimization",
      "Audience intelligence, persona research & creative messaging",
      "Lead generation funnel analytics & revenue attribution"
    ]
  },
  {
    id: "dr-emeka-balogun",
    name: "Dr. Emeka Balogun, PMP®",
    role: "Head of Training Academy & Workforce Development",
    division: "Mindware Academy & Corporate Upskilling",
    bio: "Dr. Balogun leads Mindware Training Academy's corporate and professional certifications division. A certified Project Management Professional (PMP®) and certified HR and HSE director, he oversees curriculum alignment with PMI® PMBOK standards, OSHA/ISO compliance, and modern practical skills that prepare graduates for immediate employability.",
    image: "/assets/images/leadership_executive_team_1790617221909.jpg",
    credentials: [
      "Project Management Professional (PMP® - PMI)",
      "Chartered Member, CIPM (Human Resources)",
      "NEBOSH & OSHA Certified HSE Lead Instructor",
      "12+ Years Corporate Workforce Development"
    ],
    responsibilities: [
      "PMP, HRM, and HSE curriculum design & examination governance",
      "Corporate workforce upskilling partnerships with enterprise clients",
      "Instructor certification & training delivery quality control",
      "Student career placement & employability mentorship"
    ]
  },
  {
    id: "folake-adele-williams",
    name: "Folake Adele-Williams",
    role: "Director of Operations & Client Success",
    division: "Operations & Governance",
    bio: "Folake manages client delivery workflows, resource scheduling, and operational governance at Mindware. With a rigorous background in agile project management and client relations, she ensures every engagement is delivered strictly on scope, on budget, and to exemplary quality benchmarks.",
    image: "/assets/images/mission_hero_vision_1790617197716.jpg",
    credentials: [
      "Certified Scrum Master (CSM)",
      "Prince2 Practitioner",
      "B.Sc Business Administration",
      "8+ Years Client Relationship Management"
    ],
    responsibilities: [
      "Sprint planning & cross-functional project delivery",
      "Client onboarding, SLA monitoring & satisfaction tracking",
      "Vendor management & resource procurement",
      "Quality assurance audits and operational standard operating procedures"
    ]
  }
];

export const ADVISORY_BOARD: AdvisoryMember[] = [
  {
    name: "Chief Olabisi Craig, FNSE",
    title: "Senior Enterprise Strategy Advisor",
    organization: "Former Executive Director, Multinational Energy Group",
    focusArea: "Industrial Sector Strategy & Enterprise Corporate Governance"
  },
  {
    name: "Barr. Ifeoma Maduka, LL.M",
    title: "Legal & Corporate Compliance Counsel",
    organization: "Managing Partner, Maduka & Associates",
    focusArea: "Intellectual Property, NDPR Data Privacy & Digital Contracts"
  },
  {
    name: "Tunde Alabi, FCA",
    title: "Financial & Capital Allocation Advisor",
    organization: "Principal, Apex Financial Advisory",
    focusArea: "Corporate Finance, Venture Growth & Strategic Capital Planning"
  }
];

export const GOVERNANCE_FRAMEWORK: GovernancePillar[] = [
  {
    number: "01",
    title: "Agile Sprint Methodology",
    description: "Every development and consulting initiative is divided into tight, two-week sprint cycles with weekly client demos and measurable milestones.",
    metric: "98.4% On-Time Delivery"
  },
  {
    number: "02",
    title: "Data Protection & NDPR Compliance",
    description: "Strict adherence to the Nigeria Data Protection Act (NDPA) and global GDPR standards. Client proprietary data and source code are safeguarded by enterprise encryption.",
    metric: "100% Security Audited"
  },
  {
    number: "03",
    title: "Continuous Quality & Performance Audits",
    description: "Automated regression testing, cross-browser compatibility checks, and mobile performance benchmarks precede any public release.",
    metric: "Sub-1.2s Load Standard"
  },
  {
    number: "04",
    title: "Social Impact & Talent Empowerment",
    description: "We allocate a fixed percentage of academy capacity to subsidized scholarships for underprivileged youth seeking high-income digital tech skills.",
    metric: "40+ Annual Scholarships"
  }
];
