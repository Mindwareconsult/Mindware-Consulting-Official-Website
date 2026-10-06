export interface TrainingProgram {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: "digital-skills" | "professional-development";
  duration: string;
  cohort: string;
  format: "Online & Physical" | "Virtual Live Classroom" | "Hybrid / Weekend" | "Executive Cohort";
  level: "Beginner to Intermediate" | "Intermediate to Advanced" | "All Levels" | "Executive / Professional";
  certification: string;
  tools: string[];
  modules: {
    title: string;
    topics: string[];
  }[];
  careerOutcomes: string[];
  keyHighlights: string[];
  badge?: string;
}

export const DIGITAL_SKILLS_PROGRAMS: TrainingProgram[] = [
  {
    id: "web-design",
    title: "Web Design & Modern CMS Development",
    subtitle: "Build responsive, high-converting corporate websites and web portals.",
    description: "Master modern responsive web design principles, UI frameworks, WordPress development, Elementor, WooCommerce, and hosting infrastructure. Learn to build commercial-grade websites for businesses and clients from scratch.",
    category: "digital-skills",
    duration: "8 Weeks",
    cohort: "Next Cohort Starts: 1st Saturday of Next Month",
    format: "Online & Physical",
    level: "Beginner to Intermediate",
    certification: "Mindware Certified Web Design Professional",
    badge: "Most Popular",
    tools: ["WordPress", "Elementor Pro", "HTML5 & CSS3", "Figma", "WooCommerce", "cPanel & DNS", "Speed Optimization"],
    modules: [
      {
        title: "Module 1: Foundations of UI/UX & Responsive Web Layouts",
        topics: [
          "Understanding website architecture, user journeys, and wireframing in Figma",
          "Color theory, typography hierarchy, and mobile-first responsive design",
          "Domain registration, DNS management, and cloud web hosting setup"
        ]
      },
      {
        title: "Module 2: Advanced WordPress & Visual Site Building",
        topics: [
          "WordPress CMS installation, database setup, and core configuration",
          "Custom page building with Elementor Pro and dynamic templates",
          "Header, footer, navigation mega-menus, and responsive testing across devices"
        ]
      },
      {
        title: "Module 3: E-Commerce, Forms, & Business Integrations",
        topics: [
          "WooCommerce setup: product catalogs, payment gateways (Paystack, Flutterwave, Stripe)",
          "Lead capture forms, CRM integrations, and automated client notifications",
          "Live chat widgets, WhatsApp click-to-chat, and Google Maps integration"
        ]
      },
      {
        title: "Module 4: Security, Speed Optimization & Client Delivery",
        topics: [
          "SSL certificates, automated backups, and anti-malware security hardening",
          "Core Web Vitals optimization, asset minification, and CDN configuration",
          "Client handoff protocols, staging environments, and freelancing business models"
        ]
      }
    ],
    careerOutcomes: [
      "Freelance Web Designer / Consultant",
      "In-House Corporate Web Administrator",
      "WordPress Developer & CMS Specialist",
      "Digital Agency Web Strategist"
    ],
    keyHighlights: [
      "Build and launch 3 live client-ready websites during the course",
      "Free domain and hosting for your personal portfolio during training",
      "Mentorship from senior engineers at Mindware Consulting"
    ]
  },
  {
    id: "social-media-marketing",
    title: "Social Media Marketing & Paid Performance Ads",
    subtitle: "Grow brands, generate high-intent leads, and master paid ad acquisition.",
    description: "Develop data-driven social media growth strategies across Meta (Facebook & Instagram), LinkedIn, TikTok, and X. Master paid ads management, audience targeting, conversion tracking, sales funnels, and brand storytelling.",
    category: "digital-skills",
    duration: "6 Weeks",
    cohort: "Bi-monthly Enrollment Available",
    format: "Online & Physical",
    level: "All Levels",
    certification: "Certified Social Media & Performance Marketing Strategist",
    badge: "High Demand",
    tools: ["Meta Ads Manager", "LinkedIn Campaign Manager", "TikTok Ads", "Canva & CapCut", "Google Analytics 4", "Buffer / Metricool"],
    modules: [
      {
        title: "Module 1: Social Media Strategy & Brand Identity",
        topics: [
          "Defining target personas, brand voice, and content pillars",
          "Platform algorithms: Instagram, LinkedIn, TikTok, and YouTube Shorts",
          "Developing an editorial content calendar and social workflow"
        ]
      },
      {
        title: "Module 2: Content Creation & Viral Video Storytelling",
        topics: [
          "Visual content creation using Canva Pro and mobile design best practices",
          "Short-form video scripting, hooks, and engagement psychology",
          "Community management, crisis handling, and reputation management"
        ]
      },
      {
        title: "Module 3: Meta & LinkedIn Paid Advertising Mastery",
        topics: [
          "Meta Pixel and Conversions API setup for airtight tracking",
          "Audience segmentation: Custom Audiences, Lookalikes, and B2B LinkedIn targeting",
          "High-converting ad creatives, copy frameworks (AIDA, PAS), and A/B split testing"
        ]
      },
      {
        title: "Module 4: Campaign Analytics, ROAS & Client Reporting",
        topics: [
          "Tracking CAC (Customer Acquisition Cost), ROAS, and conversion metrics",
          "Building automated client performance dashboards in Looker Studio",
          "Pricing social media management and ad management retainer contracts"
        ]
      }
    ],
    careerOutcomes: [
      "Social Media Marketing Manager",
      "Paid Ads & Performance Specialist",
      "Content Creator & Community Lead",
      "Growth Marketing Consultant"
    ],
    keyHighlights: [
      "Run live ad campaigns with real budgets and analyze actual ROI",
      "Master B2B executive brand positioning on LinkedIn",
      "Ready-to-use client onboarding contracts and pitch decks"
    ]
  },
  {
    id: "video-editing",
    title: "Video Editing & Creative Content Production",
    subtitle: "Craft cinematic brand stories, viral shorts, and high-impact corporate videos.",
    description: "Learn professional video editing and post-production techniques using industry-standard software. Master pacing, color grading, sound design, motion graphics, and short-form storytelling for YouTube, TikTok, Reels, and corporate commercials.",
    category: "digital-skills",
    duration: "8 Weeks",
    cohort: "Next Cohort: 15th of Every Month",
    format: "Online & Physical",
    level: "Beginner to Intermediate",
    certification: "Mindware Certified Video Editing & Post-Production Specialist",
    badge: "Creative Track",
    tools: ["Adobe Premiere Pro", "CapCut Desktop", "Adobe After Effects", "Audition", "DaVinci Resolve", "Envato Elements"],
    modules: [
      {
        title: "Module 1: The Art of Visual Storytelling & Pre-Production",
        topics: [
          "Storyboarding, scene blocking, shot composition, and camera angles",
          "Video codecs, resolutions, frame rates, and workspace setup",
          "Asset management, project organization, and ingest workflows"
        ]
      },
      {
        title: "Module 2: Non-Linear Editing Fundamentals & Pacing",
        topics: [
          "Timeline mastery: J-cuts, L-cuts, match cuts, and dynamic transitions",
          "Editing for attention retention: creating captivating 3-second hooks",
          "Multi-camera editing for interviews, podcasts, and corporate events"
        ]
      },
      {
        title: "Module 3: Motion Graphics, Kinetic Typography & Visual Effects",
        topics: [
          "Lower thirds, title cards, and animated call-to-actions in Premiere & After Effects",
          "Green screen keying, masking, tracking, and picture-in-picture layouts",
          "Dynamic zoom-ins, sound effects syncing, and background textures"
        ]
      },
      {
        title: "Module 4: Color Grading, Audio Mastering & Export Optimization",
        topics: [
          "Color correction and cinematic LUT grading using Lumetri Color",
          "Audio restoration, voiceover equalization, noise reduction, and licensing",
          "Render presets for YouTube 4K, Instagram Reels, TikTok, and TV broadcasts"
        ]
      }
    ],
    careerOutcomes: [
      "Professional Video Editor",
      "Short-Form Content Creator / Reels Specialist",
      "Corporate Media Producer",
      "YouTube Video Strategist & Editor"
    ],
    keyHighlights: [
      "Complete 5 commercial-grade portfolio video edits",
      "Access to premium sound effect libraries and stock footage resources",
      "Direct feedback from creative directors on every project assignment"
    ]
  },
  {
    id: "data-analytics",
    title: "Data Analytics & Business Intelligence",
    subtitle: "Transform raw organizational data into actionable executive insights.",
    description: "Gain hands-on mastery in data analysis, data cleaning, statistical modeling, database querying, and dashboard visualization. Learn to query databases with SQL, automate workflows with Python, and build interactive dashboards with Power BI and Advanced Excel.",
    category: "digital-skills",
    duration: "10 Weeks",
    cohort: "Weekend Cohort: Saturdays & Sundays",
    format: "Virtual Live Classroom",
    level: "Intermediate to Advanced",
    certification: "Certified Data & Business Intelligence Analyst",
    badge: "Top Career ROI",
    tools: ["Microsoft Excel (Advanced)", "Power BI", "SQL (PostgreSQL / MySQL)", "Python (Pandas, NumPy)", "Looker Studio", "DAX"],
    modules: [
      {
        title: "Module 1: Advanced Excel for Business Analytics",
        topics: [
          "Power Query for automated ETL (Extract, Transform, Load) pipelines",
          "Complex formulas: XLOOKUP, INDEX/MATCH, Dynamic Arrays, and nested logic",
          "Pivot Tables, Slicers, interactive KPI reporting, and scenario modeling"
        ]
      },
      {
        title: "Module 2: Relational Databases & SQL for Data Analysis",
        topics: [
          "Database architecture, tables, primary/foreign keys, and data normalization",
          "Writing SQL queries: SELECT, WHERE, GROUP BY, HAVING, and ORDER BY",
          "Joining complex datasets: INNER, LEFT, RIGHT, FULL OUTER joins, and subqueries",
          "Window functions, CTEs (Common Table Expressions), and performance tuning"
        ]
      },
      {
        title: "Module 3: Business Intelligence & Interactive Power BI Dashboards",
        topics: [
          "Data modeling, star schema design, and cardinality relationships",
          "Writing custom DAX measures, time intelligence calculations, and KPIs",
          "Designing executive dashboards with drill-throughs, tooltips, and mobile views",
          "Publishing to Power BI Service, automated dataset refreshes, and role security"
        ]
      },
      {
        title: "Module 4: Python for Data Analysis & Capstone Business Case",
        topics: [
          "Python fundamentals for data handling with Pandas and NumPy libraries",
          "Exploratory Data Analysis (EDA) and detecting business trends & outliers",
          "End-to-end capstone: Analyzing real sales, financial, and operational datasets"
        ]
      }
    ],
    careerOutcomes: [
      "Data Analyst / BI Analyst",
      "Business Intelligence Specialist",
      "Operations & Reporting Analyst",
      "Financial / Marketing Data Analyst"
    ],
    keyHighlights: [
      "Analyze actual Nigerian and global enterprise business datasets",
      "Build a GitHub & Power BI portfolio showcasing 4 enterprise dashboards",
      "Interview prep with real-world SQL technical screening questions"
    ]
  },
  {
    id: "seo-strategy",
    title: "Search Engine Optimization (SEO) & Organic Growth",
    subtitle: "Rank on Page 1 of Google, attract qualified buyers, and dominate organic search.",
    description: "Learn how to turn Google into a consistent client generation engine. Master keyword research, technical SEO audits, on-page optimization, content strategy, link acquisition, and local SEO to outrank competitors.",
    category: "digital-skills",
    duration: "6 Weeks",
    cohort: "Enrollment Open Monthly",
    format: "Online & Physical",
    level: "All Levels",
    certification: "Certified SEO & Organic Search Strategist",
    badge: "Revenue Driver",
    tools: ["Google Search Console", "Google Analytics 4", "Ahrefs / Semrush", "Screaming Frog", "Yoast / RankMath", "Google Business Profile"],
    modules: [
      {
        title: "Module 1: Search Engine Architecture & High-Intent Keyword Research",
        topics: [
          "How search engines crawl, index, and rank web pages (Google Core algorithms)",
          "Intent-driven keyword research: identifying commercial and transactional keywords",
          "Competitor keyword gap analysis and search volume evaluation"
        ]
      },
      {
        title: "Module 2: On-Page SEO & Content Strategy",
        topics: [
          "Optimizing title tags, meta descriptions, header structures (H1-H4), and URL slugs",
          "Content optimization for topical authority, semantic search, and search intent",
          "Internal linking architecture, anchor text distribution, and image SEO"
        ]
      },
      {
        title: "Module 3: Technical SEO & Core Web Vitals",
        topics: [
          "Site audits with Screaming Frog: fixing 404s, redirects, canonical tags, and duplicate content",
          "XML sitemaps, robots.txt directives, and crawl budget optimization",
          "Schema.org structured data (JSON-LD) for rich snippets and local business cards"
        ]
      },
      {
        title: "Module 4: Local SEO, Backlink Acquisition & Performance Measurement",
        topics: [
          "Google Business Profile optimization to dominate the Google Maps 3-pack",
          "White-hat link building: digital PR, guest editorial, and broken link reclamation",
          "Tracking rankings, organic conversions, and ROI using GA4 and Google Search Console"
        ]
      }
    ],
    careerOutcomes: [
      "SEO Specialist / Consultant",
      "Organic Growth Strategist",
      "Content Marketing Lead",
      "Digital Marketing Director"
    ],
    keyHighlights: [
      "Perform a live technical SEO audit on an active corporate website",
      "Implement real structured data that gets indexed by search engines",
      "Learn client retention frameworks for monthly SEO retainers"
    ]
  },
  {
    id: "app-development",
    title: "Web & Mobile App Development (Full-Stack)",
    subtitle: "Build scalable web applications and cross-platform mobile apps.",
    description: "Learn to build modern, production-grade applications. Master modern JavaScript/TypeScript, React for dynamic web frontends, Node.js/Express for backend APIs, databases, and Flutter or React Native for iOS & Android mobile apps.",
    category: "digital-skills",
    duration: "12 Weeks",
    cohort: "Quarterly Cohort - Intensive Program",
    format: "Hybrid / Weekend",
    level: "Intermediate to Advanced",
    certification: "Mindware Certified Full-Stack Software Developer",
    badge: "Intensive Tech Track",
    tools: ["React & TypeScript", "Node.js & Express", "Tailwind CSS", "Flutter / Dart", "PostgreSQL / MongoDB", "Git & GitHub", "Vercel / Cloud Deployments"],
    modules: [
      {
        title: "Module 1: Modern Frontend Engineering with React & TypeScript",
        topics: [
          "Modern ES6+, TypeScript typings, component lifecycle, and state management",
          "Building modern responsive UIs with Tailwind CSS and Framer Motion",
          "Routing, form validation, client-side caching, and API consumption"
        ]
      },
      {
        title: "Module 2: Backend API Architecture & Database Engineering",
        topics: [
          "RESTful API design with Node.js and Express",
          "Relational databases (PostgreSQL) vs Document databases (MongoDB)",
          "Authentication & security: JWT tokens, password hashing, and role-based access control (RBAC)"
        ]
      },
      {
        title: "Module 3: Mobile App Development (Cross-Platform iOS & Android)",
        topics: [
          "Building native cross-platform mobile applications using Flutter / React Native",
          "Mobile navigation, camera/location device APIs, and push notifications",
          "State management for mobile apps and offline caching"
        ]
      },
      {
        title: "Module 4: DevOps, Cloud Deployment & Capstone Product Launch",
        topics: [
          "Version control with Git/GitHub, pull requests, and CI/CD pipelines",
          "Deploying backends and frontends to modern cloud providers (Vercel, AWS, Render)",
          "Building and launching an end-to-end SaaS application as your capstone project"
        ]
      }
    ],
    careerOutcomes: [
      "Full-Stack Web Developer",
      "Frontend React Engineer",
      "Mobile App Developer (iOS & Android)",
      "Software Consultant / Tech Lead"
    ],
    keyHighlights: [
      "Ship a production-grade web application and mobile app to your GitHub portfolio",
      "Code reviews conducted by Mindware's senior lead software engineers",
      "Guidance on landing international remote developer contracts"
    ]
  }
];

export const PROFESSIONAL_DEVELOPMENT_PROGRAMS: TrainingProgram[] = [
  {
    id: "pmp-project-management",
    title: "Project Management Professional (PMP® & Agile/Scrum)",
    subtitle: "Lead complex corporate initiatives, deliver on time and budget, and prepare for global certifications.",
    description: "A comprehensive project management accelerator aligned with the PMI® Project Management Body of Knowledge (PMBOK® 7th Edition) and Agile Practice Guides. Gain practical mastery of project initiation, scope management, budgeting, risk mitigation, stakeholder communication, and Agile/Scrum sprint cycles.",
    category: "professional-development",
    duration: "8 Weeks",
    cohort: "Executive Weekend Cohort (Saturdays)",
    format: "Executive Cohort",
    level: "Executive / Professional",
    certification: "Mindware Professional Project Management Certificate (Aligned with PMI® PMP® & CAPM® standards)",
    badge: "Executive Favorite",
    tools: ["Microsoft Project", "Jira & Confluence", "Asana / Trello", "Risk Registers", "Earned Value Management (EVM) Templates", "Gantt Charts"],
    modules: [
      {
        title: "Module 1: Foundations of Strategic Project Governance",
        topics: [
          "Strategic project alignment, business cases, project charters, and governance frameworks",
          "Project life cycles: Predictive (Waterfall), Adaptive (Agile), and Hybrid methodologies",
          "Identifying and analyzing internal and external stakeholders, creating communication plans"
        ]
      },
      {
        title: "Module 2: Scope, Schedule & Cost Baseline Management",
        topics: [
          "Work Breakdown Structure (WBS) creation and scope verification",
          "Critical Path Method (CPM), schedule network diagrams, and milestone tracking",
          "Cost estimation, budgeting, and Earned Value Management (EVM: CPI, SPI, EAC)"
        ]
      },
      {
        title: "Module 3: Risk Management, Quality Assurance & Procurement",
        topics: [
          "Qualitative and quantitative risk analysis, risk matrix, and response planning",
          "Quality control vs quality assurance metrics and continuous improvement",
          "Contract types (Fixed-price, Cost-reimbursable, T&M), vendor selection, and negotiation"
        ]
      },
      {
        title: "Module 4: Agile/Scrum Frameworks & PMI Examination Preparation",
        topics: [
          "Scrum ceremonies: Sprint Planning, Daily Standups, Sprint Review, and Retrospectives",
          "User stories, story point estimation, backlog grooming, and burn-down charts",
          "Full mock PMP exam questions, scenario analysis, and test-taking strategies"
        ]
      }
    ],
    careerOutcomes: [
      "Project Manager / Senior Project Lead",
      "Agile Project Manager / Scrum Master",
      "Program Manager / PMO Director",
      "Operations & Implementation Manager"
    ],
    keyHighlights: [
      "Fulfills 35 Contact Hours / PDUs required for PMI PMP® examination eligibility",
      "Hands-on case studies based on Nigerian infrastructure, construction, and tech projects",
      "Complete library of customizable corporate project templates (Charters, WBS, Risk Logs)"
    ]
  },
  {
    id: "hrm-human-resources",
    title: "Strategic Human Resources Management (HRM)",
    subtitle: "Build high-performing corporate cultures, master labor law, and drive modern talent operations.",
    description: "Equip yourself with the strategic competencies needed to manage 21st-century human capital. Covering talent acquisition, performance appraisal systems, Nigerian labor laws and statutory compliance, compensation & benefits, employee engagement, and modern HR analytics.",
    category: "professional-development",
    duration: "6 Weeks",
    cohort: "Evening & Weekend Cohorts Available",
    format: "Online & Physical",
    level: "All Levels",
    certification: "Certified Strategic Human Resources Management Professional",
    badge: "Essential Corporate Skill",
    tools: ["HRIS Systems (BambooHR / Zoho People)", "Applicant Tracking Systems (ATS)", "HR Analytics Dashboards", "Job Evaluation Matrices", "Performance Management KPI Scorecards"],
    modules: [
      {
        title: "Module 1: Strategic Talent Acquisition & Employer Branding",
        topics: [
          "Workforce planning, competency mapping, and crafting targeted job descriptions",
          "Modern sourcing strategies, LinkedIn Recruiter, and structured behavioral interviews",
          "Onboarding frameworks that accelerate employee time-to-productivity"
        ]
      },
      {
        title: "Module 2: Performance Management & KPI Design",
        topics: [
          "Designing OKRs (Objectives & Key Results) and SMART KPI performance scorecards",
          "Continuous feedback culture, 360-degree appraisals, and managing underperformance",
          "Employee development pathways and high-potential succession planning"
        ]
      },
      {
        title: "Module 3: Nigerian Labor Law, Statutory Compliance & Employee Relations",
        topics: [
          "The Nigerian Labour Act, Trade Dispute Act, and Industrial Court precedents",
          "Statutory obligations: PAYE, Pension Reform Act (PENCOM), NSITF, ITF, and NHF",
          "Disciplinary procedures, conflict resolution, grievance handling, and legal termination"
        ]
      },
      {
        title: "Module 4: Compensation, Benefits & HR Analytics",
        topics: [
          "Salary benchmarking, grading structures, and total rewards strategy",
          "Calculating critical HR metrics: Cost-per-hire, turnover rate, eNPS, and retention ROI",
          "Building executive HR dashboards in Excel and Power BI for leadership decision-making"
        ]
      }
    ],
    careerOutcomes: [
      "Human Resources Officer / HR Generalist",
      "Talent Acquisition & Recruitment Lead",
      "HR Business Partner (HRBP)",
      "People Operations & Culture Manager"
    ],
    keyHighlights: [
      "Draft compliant employment contracts, staff handbooks, and disciplinary memos",
      "Practical mastery of Nigerian statutory remittances (PENCOM, NSITF, ITF)",
      "Coached by certified Senior HR executives with multinational experience"
    ]
  },
  {
    id: "crm-customer-relationship-management",
    title: "Customer Relationship Management (CRM) & Client Retention",
    subtitle: "Master enterprise CRM software, sales pipeline automation, and exceptional customer experience.",
    description: "Transform customer touchpoints into sustained revenue and loyalty. Learn how to implement and optimize CRM platforms like HubSpot and Salesforce, map customer journeys, automate sales pipelines, deliver proactive customer support, and maximize Customer Lifetime Value (CLV).",
    category: "professional-development",
    duration: "4 Weeks",
    cohort: "Next Cohort: Every First Saturday",
    format: "Online & Physical",
    level: "All Levels",
    certification: "Certified Customer Relationship & Client Success Professional",
    badge: "Direct Revenue Impact",
    tools: ["HubSpot CRM", "Salesforce Essentials", "Zoho CRM", "Zendesk", "WhatsApp Business API", "NPS & CSAT Survey Tools"],
    modules: [
      {
        title: "Module 1: Principles of Customer Experience (CX) & Relationship Dynamics",
        topics: [
          "The psychology of modern consumers: expectations, trust, and retention drivers",
          "Mapping the complete Customer Journey: Awareness, Acquisition, Retention, and Advocacy",
          "Establishing customer service standards, SLAs, and omnichannel communication"
        ]
      },
      {
        title: "Module 2: CRM Setup, Lead Management & Pipeline Automation",
        topics: [
          "Configuring contacts, company records, deal stages, and custom properties in HubSpot/Zoho",
          "Lead scoring, routing rules, automated email sequences, and task triggers",
          "Integrating CRM with website forms, WhatsApp Business, and social lead ads"
        ]
      },
      {
        title: "Module 3: Customer Success, Churn Prevention & Upselling",
        topics: [
          "Customer onboarding protocols and proactive account management",
          "Identifying churn warning indicators and implementing win-back campaigns",
          "Cross-selling, upselling, and optimizing Customer Lifetime Value (CLV)"
        ]
      },
      {
        title: "Module 4: Service Desk Operations & CRM Analytics",
        topics: [
          "Ticket management, resolution time tracking, and escalation matrices",
          "Measuring satisfaction: Net Promoter Score (NPS), CSAT, and Customer Effort Score (CES)",
          "Building pipeline forecasting and sales velocity dashboards for executive leadership"
        ]
      }
    ],
    careerOutcomes: [
      "CRM Administrator / CRM Specialist",
      "Customer Success Manager (CSM)",
      "Client Relationship Lead / Account Executive",
      "Customer Service & Operations Supervisor"
    ],
    keyHighlights: [
      "Build a fully automated sales and service pipeline inside HubSpot CRM",
      "Learn WhatsApp Business automation for rapid response times",
      "Hands-on case studies on B2B client management and corporate retention"
    ]
  },
  {
    id: "hse-levels-123",
    title: "Health, Safety & Environment (HSE Levels 1, 2, & 3)",
    subtitle: "Complete occupational safety certification for construction, oil & gas, manufacturing, and corporate facilities.",
    description: "An industry-accredited program covering HSE Level 1 (Award in Health & Safety), Level 2 (Risk Assessment & Hazard Control), and Level 3 (HSE Management System & Audit). Essential qualification for professionals in engineering, oil & gas, construction, logistics, and corporate administration.",
    category: "professional-development",
    duration: "6 Weeks (Comprehensive Levels 1, 2, & 3)",
    cohort: "Intensive Weekend Program (Saturdays)",
    format: "Online & Physical",
    level: "All Levels",
    certification: "Accredited Health, Safety & Environment (HSE Levels 1, 2, & 3) Certification",
    badge: "Industry Mandatory",
    tools: ["Job Safety Analysis (JSA)", "Permit to Work (PTW) Systems", "Hazard Identification (HAZID)", "Risk Assessment Matrices", "OSHA & ISO 45001 Frameworks", "Incident Investigation Reports"],
    modules: [
      {
        title: "HSE Level 1: General Safety & Environmental Awareness",
        topics: [
          "Introduction to occupational health, safety principles, and environmental stewardship",
          "Workplace ergonomics, manual handling, office safety, and slips/trips/falls prevention",
          "Basic fire chemistry, classification of fires, and practical fire extinguisher usage",
          "Personal Protective Equipment (PPE) standards, selection, inspection, and maintenance"
        ]
      },
      {
        title: "HSE Level 2: Hazard Identification, Risk Assessment & Operational Safety",
        topics: [
          "Hazard Identification (HAZID) and Risk Assessment Methodology (5-step process)",
          "Hierarchy of Controls: Elimination, Substitution, Engineering, Administration, and PPE",
          "Permit to Work (PTW) systems: Hot work, Confined space, Working at heights, and Lockout/Tagout (LOTO)",
          "First Aid principles, CPR, emergency response coordination, and casualty evacuation"
        ]
      },
      {
        title: "HSE Level 3: HSE Management Systems (HSE-MS) & Incident Investigation",
        topics: [
          "Implementing ISO 45001 (Occupational Health & Safety) & ISO 14001 (Environmental Management)",
          "Incident investigation techniques: Root Cause Analysis (5-Whys, Fishbone diagrams)",
          "Environmental pollution control: Waste management, chemical spill containment, and EIA basics",
          "Conducting workplace HSE audits, compliance inspections, safety meetings, and reporting"
        ]
      },
      {
        title: "Practical Assessment & Certification Defense",
        topics: [
          "Conducting a live workplace hazard audit and submitting a professional Risk Assessment report",
          "Drafting an emergency response and evacuation plan for a commercial facility",
          "Comprehensive theoretical and practical certification examination"
        ]
      }
    ],
    careerOutcomes: [
      "HSE Officer / Safety Inspector",
      "Environmental Compliance Specialist",
      "Site Safety Supervisor (Construction & Engineering)",
      "Corporate Safety & Facility Manager"
    ],
    keyHighlights: [
      "Covers all three recognized tiers: HSE Level 1, Level 2, and Level 3 in one comprehensive track",
      "Essential credential recognized across Construction, Oil & Gas, Telecoms, and Maritime industries",
      "Practical drills in fire safety, risk assessment, and incident report preparation"
    ]
  },
  {
    id: "workplace-employability-leadership",
    title: "Executive Employability, Business Communication & Leadership",
    subtitle: "Accelerate your career trajectory with elite workplace communication, emotional intelligence, and leadership.",
    description: "Designed for ambitious graduates and mid-level managers looking to stand out in multinational and competitive corporate environments. Covers executive boardroom presentation, persuasive business writing, emotional intelligence (EQ), critical thinking, negotiation, and corporate workplace ethics.",
    category: "professional-development",
    duration: "4 Weeks",
    cohort: "Monthly Weekend Cohort",
    format: "Virtual Live Classroom",
    level: "All Levels",
    certification: "Certified Professional in Corporate Employability & Leadership Excellence",
    badge: "Career Accelerator",
    tools: ["Executive Presentation Decks", "Business Proposal Templates", "Negotiation Frameworks", "Emotional Intelligence (EQ) Inventories", "Virtual Collaboration Tools"],
    modules: [
      {
        title: "Module 1: Executive Business Communication & Presentation",
        topics: [
          "Structuring persuasive corporate presentations and executive storytelling",
          "Writing crisp professional memos, client emails, and business proposals",
          "Public speaking confidence, body language, and mastering Q&A under pressure"
        ]
      },
      {
        title: "Module 2: Emotional Intelligence (EQ) & Interpersonal Influence",
        topics: [
          "Self-awareness, self-regulation, and managing workplace stress and burnout",
          "Navigating corporate politics with integrity and emotional agility",
          "Active listening, cross-functional collaboration, and constructive conflict resolution"
        ]
      },
      {
        title: "Module 3: Strategic Problem Solving & Critical Decision Making",
        topics: [
          "Root cause analysis frameworks and structured data-driven decision making",
          "Prioritization matrices (Eisenhower matrix) and executive time management",
          "Negotiation strategies: finding win-win outcomes with clients and stakeholders"
        ]
      },
      {
        title: "Module 4: Career Positioning, CV Optimization & Interview Mastery",
        topics: [
          "ATS-optimized CV and executive bio writing that captures recruiter attention",
          "LinkedIn profile optimization for inbound recruiter headhunting",
          "Mastering competency-based behavioral interviews (STAR method) and salary negotiation"
        ]
      }
    ],
    careerOutcomes: [
      "Management Trainee / Corporate Associate",
      "Operations Team Lead / Unit Manager",
      "Executive Assistant / Chief of Staff",
      "Client-Facing Consultant"
    ],
    keyHighlights: [
      "1-on-1 personalized CV audit and LinkedIn profile review with an executive recruiter",
      "Mock video interview simulation with detailed constructive feedback",
      "Professional networking opportunities with alumni across major corporate sectors"
    ]
  }
];

export const TRAINING_TESTIMONIALS = [
  {
    quote: "The Web Design and SEO program at Mindware Consulting transformed how I work. Within 3 weeks of graduating, I landed two international corporate clients for custom website builds. The hands-on project approach makes all the difference.",
    author: "Emmanuel N.",
    role: "Freelance Web Designer & Agency Founder",
    program: "Web Design & Modern CMS",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
  },
  {
    quote: "Taking the HSE Levels 1, 2, and 3 certification through Mindware Consulting was the catalyst that secured my position as a Safety Officer on a major construction project. The instructors are active industry practitioners.",
    author: "Grace O.",
    role: "HSE Specialist",
    program: "HSE Levels 1, 2, & 3",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
  },
  {
    quote: "The PMP and Agile training gave our engineering team a shared vocabulary and disciplined execution framework. We cut project delivery delays by over 40% in the following quarter.",
    author: "Engr. David K.",
    role: "Senior Engineering Project Lead",
    program: "Project Management Professional (PMP®)",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
  }
];

export const TRAINING_FAQS = [
  {
    question: "Are Mindware training programs held physically or online?",
    answer: "We offer flexible learning options including physical classes at our training facility, live interactive virtual classrooms via Zoom/Google Meet, and hybrid weekend schedules tailored for working professionals."
  },
  {
    question: "Do I receive a recognized certificate upon completion?",
    answer: "Yes. Every graduate who satisfies attendance and successfully completes all capstone assignments receives an accredited Mindware Consulting Certificate of Competence, along with verification credentials for their LinkedIn profile and CV."
  },
  {
    question: "Can these training programs be customized for corporate organizations?",
    answer: "Absolutely. We routinely deliver customized in-house and retreat training for corporate teams, engineering firms, government agencies, and SMEs with bespoke syllabi, industry-specific case studies, and post-training impact assessments."
  },
  {
    question: "What is the payment arrangement? Are installment options available?",
    answer: "Yes, we provide flexible installment payment plans allowing students to spread tuition across the duration of the program. Corporate group discounts of 10% to 20% are also available for registrations of 3 or more participants."
  }
];
