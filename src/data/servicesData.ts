export interface ServicePillar {
  title: string;
  description: string;
  points: string[];
}

export interface ServicePhase {
  phase: string;
  title: string;
  duration: string;
  description: string;
  deliverables: string[];
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceDetailedInfo {
  id: string;
  shortName: string;
  menuDescription: string;
  badge: string;
  heroHeadline: string;
  heroHighlight: string;
  executiveSummary: string;
  whyChooseUs: string[];
  pillars: ServicePillar[];
  process: ServicePhase[];
  technologies: string[];
  metrics: {
    label: string;
    value: string;
    subtext: string;
  }[];
  idealFor: string[];
  deliverablesSummary: string[];
  faqs: ServiceFAQ[];
  relatedCaseStudyIds: string[];
  pricingPackageAnchor?: string;
}

export const SERVICES_DETAILED: Record<string, ServiceDetailedInfo> = {
  "website-design": {
    id: "website-design",
    shortName: "Website Design",
    menuDescription: "High-performance business websites, CMS portals & CRO landing pages",
    badge: "CORE CAPABILITY",
    heroHeadline: "Websites Engineered to Convert",
    heroHighlight: "Visitors Into Loyal Clients.",
    executiveSummary: "Your website is your company's primary digital asset. At Mindware Consulting, we don't just build aesthetically appealing websites; we engineer high-performance, conversion-optimized digital engines designed to establish instant corporate authority, rank on search engines, and drive measurable revenue growth.",
    whyChooseUs: [
      "Custom, bespoke designs tailored to your corporate brand—no generic, sluggish templates.",
      "Mobile-first, fast responsive architecture engineered around Core Web Vitals best practices.",
      "Seamless integrations with Paystack, Flutterwave, Stripe, WhatsApp Business, and HubSpot/Zoho CRMs.",
      "Airtight cybersecurity hardening with SSL certificates, brute-force protection, and automated cloud backups.",
      "Full CMS training and handover so your internal team can manage content with zero code knowledge."
    ],
    pillars: [
      {
        title: "Bespoke Corporate & E-Commerce Web Platforms",
        description: "Tailored web experiences designed from the ground up to reflect your brand's unique value proposition and corporate prestige.",
        points: [
          "Interactive Figma UI/UX prototyping and user journey mapping",
          "Custom WordPress CMS, WooCommerce, and modern headless architectures",
          "Automated lead capture funnels with email and WhatsApp instant notifications",
          "Multi-currency payment gateways and invoice generation systems"
        ]
      },
      {
        title: "High-Converting Landing Pages & Lead Funnels",
        description: "Laser-focused landing pages built with behavioral psychology and conversion rate optimization (CRO) principles to maximize ROI on marketing spend.",
        points: [
          "Irresistible value propositions with strategic call-to-action (CTA) hierarchies",
          "A/B split testing readiness and heatmapping integration",
          "Zero-distraction checkout flows and dynamic inquiry forms",
          "Clean, fast-loading responsive layouts designed to reduce mobile bounce rates"
        ]
      },
      {
        title: "Enterprise Web Portals & Content Management",
        description: "Secure, role-based corporate portals for client onboarding, project documentation, resource downloads, and staff self-service.",
        points: [
          "Protected client login areas and document vaults",
          "Dynamic portfolio showcases, project filters, and interactive case study decks",
          "Automated database management and scheduled cloud backups",
          "Multilingual and multi-regional site architectures"
        ]
      },
      {
        title: "Speed, Security & Technical Architecture",
        description: "Enterprise-grade infrastructure ensuring your digital assets remain online, lightning-fast, and impenetrable to cyber threats.",
        points: [
          "Cloudflare Enterprise CDN integration and global asset caching",
          "Advanced Web Application Firewall (WAF) and DDoS mitigation",
          "Image compression and WebP/AVIF modern format conversion",
          "Database query indexing and Core Web Vitals speed optimization"
        ]
      }
    ],
    process: [
      {
        phase: "Phase 01",
        title: "Discovery, Strategy & User Journey Mapping",
        duration: "Week 1",
        description: "We audit your existing brand assets, study your competitors, define target user personas, and create an information architecture blueprint.",
        deliverables: ["Project Discovery Brief", "Sitemap Architecture", "Low-Fidelity Wireframes", "Tech Stack Blueprint"]
      },
      {
        phase: "Phase 02",
        title: "High-Fidelity UI/UX & Interactive Prototyping",
        duration: "Weeks 2 - 3",
        description: "Our design team crafts bespoke, pixel-perfect layouts in Figma. You get to interact with dynamic clickable prototypes before a single line of code is written.",
        deliverables: ["Figma Interactive Prototype", "Typography & Color System", "Mobile Responsive Views", "Client Approval Sign-Off"]
      },
      {
        phase: "Phase 03",
        title: "Full-Stack Development & CMS Integration",
        duration: "Weeks 3 - 5",
        description: "Our engineers translate approved designs into clean, modular, standards-compliant code with dynamic CMS controls and API connections.",
        deliverables: ["Staging Server Environment", "CMS Admin Dashboard", "Payment & CRM Integrations", "Security & SSL Setup"]
      },
      {
        phase: "Phase 04",
        title: "QA Testing, Speed Audits & Go-Live",
        duration: "Week 6",
        description: "Rigorous cross-browser, mobile responsiveness, accessibility, and speed testing. We deploy to production with zero downtime.",
        deliverables: ["Core Web Vitals Audit", "DNS & Domain Switchover", "CMS Staff Training Video", "Post-Launch Technical Handover"]
      }
    ],
    technologies: [
      "WordPress",
      "Elementor Pro",
      "Figma",
      "Tailwind CSS",
      "React / TypeScript",
      "PHP & MySQL",
      "WooCommerce",
      "Paystack & Flutterwave",
      "Cloudflare CDN"
    ],
    metrics: [
      { label: "Speed Focus", value: "Core Web Vitals", subtext: "Lightweight mobile-first architecture" },
      { label: "Published Builds", value: "15 Live Sites", subtext: "Verified portfolio across industries" },
      { label: "Sector Specialization", value: "6 Core Verticals", subtext: "Construction, energy, retail & B2B" },
      { label: "Operating Track Record", value: "Since 2016", subtext: "Mindware Consulting Ltd (RC 1309926)" }
    ],
    idealFor: [
      "Construction, engineering, and infrastructure firms needing a prestigious commercial portfolio.",
      "Corporate institutions and professional service firms requiring brand trust and credibility.",
      "Growing B2B organizations looking to automate client inquiry pipelines and proposals.",
      "E-commerce brands needing fast, secure online checkout and local/international payments."
    ],
    deliverablesSummary: [
      "100% custom responsive website optimized for desktop, tablet, and mobile devices",
      "Intuitive CMS administrative dashboard with full ownership and no monthly platform lock-ins",
      "Integrated lead capture forms with CRM and WhatsApp instant notification triggers",
      "Full On-Page technical SEO setup with schema markup and Google Search Console indexing",
      "Comprehensive video walkthrough and 30-day dedicated post-launch technical warranty"
    ],
    faqs: [
      {
        question: "How long does a custom website design project take to complete?",
        answer: "Most standard corporate website projects are completed within 3 to 5 weeks from initial discovery to final deployment. More complex e-commerce portals or custom web applications may take 6 to 8 weeks depending on custom feature requirements."
      },
      {
        question: "Do I have complete ownership of my website and files after launch?",
        answer: "Yes, 100%. Unlike proprietary site builders that lock you into monthly subscriptions, you retain complete, unencumbered ownership of all domain names, hosting accounts, source code, visual design files, and databases."
      },
      {
        question: "Will my team be able to update content, images, and blog posts easily?",
        answer: "Absolutely. We build with user-friendly CMS dashboards (WordPress or custom headless CMS) that allow non-technical staff to easily edit text, publish articles, update team rosters, and upload project photos without touching code."
      },
      {
        question: "Does your web design include Search Engine Optimization (SEO)?",
        answer: "Yes, every website built by Mindware Consulting includes comprehensive foundational technical SEO: semantic HTML5 structures, optimized heading hierarchies (H1-H4), meta tags, XML sitemaps, robots.txt, and fast loading speeds."
      }
    ],
    relatedCaseStudyIds: ["temamost-construction", "solugans-construction", "juptree-automobile", "harmostructs-engineering", "quanxi-limited", "osines-group", "priziangori-global", "crescon-projects"],
    pricingPackageAnchor: "packages"
  },

  "seo": {
    id: "seo",
    shortName: "Search Engine Optimization",
    menuDescription: "Rank on Google Page 1, conquer competitors & scale organic search traffic",
    badge: "REVENUE ACCELERATOR",
    heroHeadline: "Dominate Google Page 1 & Capture",
    heroHighlight: "High-Intent Commercial Buyers.",
    executiveSummary: "Paid advertising stops delivering the second your ad spend pauses. Search Engine Optimization (SEO) builds a permanent, compounding corporate asset that positions your business at the exact moment decision-makers are searching for your solutions. We turn Google into your highest-performing business development channel.",
    whyChooseUs: [
      "Rigorous data-driven keyword intent mapping focusing on revenue and contracts, not vanity clicks.",
      "White-hat, Google-compliant digital PR and authority backlink acquisition from recognized publishers.",
      "Deep technical audits correcting crawl budget wastage, slow TTFB, schema gaps, and rendering bugs.",
      "Dominant Local SEO strategies securing prime placement in the coveted Google Maps 3-Pack.",
      "Transparent monthly executive reporting tracking keyword rankings, organic traffic, and lead attribution."
    ],
    pillars: [
      {
        title: "Technical SEO & Site Architecture Audit",
        description: "Eliminating invisible technical roadblocks that prevent search engine crawlers from indexing and ranking your pages.",
        points: [
          "Core Web Vitals, Largest Contentful Paint (LCP), and Cumulative Layout Shift (CLS) remediation",
          "Crawl budget optimization, XML sitemaps, canonical tags, and robots.txt directives",
          "Advanced Schema.org structured data (JSON-LD) for rich snippets and brand knowledge graphs",
          "Mobile usability audits and HTTP/HTTPS security protocol validation"
        ]
      },
      {
        title: "Commercial Keyword Research & Intent Mapping",
        description: "Targeting high-value transactional search queries where corporate buyers and procurement leads actively seek vendors.",
        points: [
          "Competitor keyword gap analysis identifying untapped search opportunities",
          "Buyer intent clustering: Informational, Navigational, Commercial, and Transactional",
          "Search volume vs. keyword difficulty analysis tailored to Nigerian and global markets",
          "Long-tail keyword targeting that delivers higher conversion rates and immediate leads"
        ]
      },
      {
        title: "On-Page SEO & Semantic Content Strategy",
        description: "Optimizing content to satisfy modern search engine algorithms, entity recognition, and semantic search models.",
        points: [
          "Strategic optimization of title tags, meta descriptions, H1-H4 headings, and URL slugs",
          "Topical authority clusters and pillar-page internal linking architecture",
          "Image SEO with descriptive alt text, modern formats, and dimension attributes",
          "Conversion-focused copywriting that turns organic readers into qualified sales inquiries"
        ]
      },
      {
        title: "Local SEO & Authority Backlink Building",
        description: "Establishing localized prominence and building authoritative digital PR footprints that outrank local and regional competitors.",
        points: [
          "Google Business Profile (GBP) complete optimization and weekly geo-tagged updates",
          "Local citation building across top Nigerian and international business directories",
          "High-domain contextual backlink acquisition through editorial outreach and digital PR",
          "Review generation strategies that enhance social proof and click-through rates (CTR)"
        ]
      }
    ],
    process: [
      {
        phase: "Month 01",
        title: "Comprehensive Technical Audit & Keyword Strategy",
        duration: "Weeks 1 - 4",
        description: "Full crawl analysis with Screaming Frog and Ahrefs. We identify technical bottlenecks, conduct competitor gap research, and map out the target keyword master list.",
        deliverables: ["Full Technical Audit Report", "Master Keyword Strategy", "Quick-Win Fixes Implementation", "Google Search Console & GA4 Setup"]
      },
      {
        phase: "Month 02",
        title: "On-Page Remediation & Content Architecture",
        duration: "Weeks 5 - 8",
        description: "We optimize all core service pages, implement Schema.org structured data, refine page titles and meta descriptions, and launch topical authority content clusters.",
        deliverables: ["Core Pages On-Page Optimization", "JSON-LD Schema Integration", "Topical Content Editorial Plan", "Internal Linking Restructure"]
      },
      {
        phase: "Month 03",
        title: "Local SEO & Authority Link Building",
        duration: "Weeks 9 - 12",
        description: "Supercharging local map rankings through Google Business Profile optimization, local citations, and acquiring authoritative white-hat editorial backlinks.",
        deliverables: ["Google Business Profile Optimization", "Local Citation Submissions", "High-DA Backlink Outreach", "Initial Ranking Gains Report"]
      },
      {
        phase: "Ongoing",
        title: "Continuous Optimization, Monitoring & Scaling",
        duration: "Monthly Retainer",
        description: "Continuous algorithm adaptation, competitor defense, keyword expansion, and monthly executive Looker Studio dashboard reporting.",
        deliverables: ["Monthly Keyword Ranking Reports", "Organic Lead Attribution Tracking", "Quarterly Strategy Refinement", "Ongoing Backlink Monitoring"]
      }
    ],
    technologies: [
      "Ahrefs",
      "Semrush",
      "Google Search Console",
      "Google Analytics 4",
      "Screaming Frog SEO Spider",
      "Google Business Profile",
      "Looker Studio",
      "Schema.org (JSON-LD)"
    ],
    metrics: [
      { label: "SEO Discipline", value: "Technical + Local", subtext: "Schema.org, crawl hygiene & GBP setup" },
      { label: "Geographic Reach", value: "36 States & FCT", subtext: "Regional & national commercial search" },
      { label: "Keyword Focus", value: "Buyer Intent", subtext: "Commercial & tender search visibility" },
      { label: "Corporate Standing", value: "Since 2016", subtext: "Incorporated partner (RC 1309926)" }
    ],
    idealFor: [
      "B2B service providers and construction companies wanting to rank for commercial contract keywords.",
      "Firms tired of burning marketing budgets on paid ads with diminishing returns.",
      "Enterprises looking to dominate regional markets in Lagos, Abuja, Port Harcourt, and nationwide.",
      "Companies launching new products or services needing immediate search authority."
    ],
    deliverablesSummary: [
      "Comprehensive technical SEO remediation resolving crawl and indexing barriers",
      "Targeted on-page optimization for all high-value core service and solution landing pages",
      "Google Business Profile setup and local citation building to dominate the Google Maps 3-Pack",
      "Authoritative white-hat backlink acquisition strategy that strengthens domain rating safely",
      "Live interactive Looker Studio dashboard providing 24/7 visibility into rankings and conversions"
    ],
    faqs: [
      {
        question: "How long does it take to see tangible ranking improvements from SEO?",
        answer: "While technical fixes and local SEO enhancements often yield measurable visibility jumps within 30 to 45 days, significant organic traffic growth and competitive Page 1 rankings typically mature within 3 to 6 months of disciplined execution."
      },
      {
        question: "How do you choose the right keywords for our business?",
        answer: "We focus on commercial and transactional search intent rather than vanity search volume. We identify the exact terms that corporate procurement managers, homeowners, and business directors use when ready to buy or request proposals."
      },
      {
        question: "Do you use safe, white-hat SEO techniques?",
        answer: "Exclusively. We adhere strictly to Google Webmaster Guidelines. We do not use spammy PBNs or automated link farms that risk search engine penalties. Our strategies focus on technical excellence, stellar content, and genuine digital PR."
      },
      {
        question: "Can SEO help our business win local clients in specific cities?",
        answer: "Yes! Our Local SEO service optimizes your Google Business Profile, geo-targeted content, and local citations so your business appears prominently in the Google Maps 3-Pack when local customers search in your target metropolitan areas."
      }
    ],
    relatedCaseStudyIds: ["solugans-construction", "crescon-projects", "harmostructs-engineering", "priziangori-global", "osines-group", "bcale-associates"],
    pricingPackageAnchor: "packages"
  },

  "social-media-marketing": {
    id: "social-media-marketing",
    shortName: "Social Media Marketing",
    menuDescription: "Paid Meta & LinkedIn performance ads, creative storytelling & brand authority",
    badge: "DEMAND GENERATION",
    heroHeadline: "Turn Social Media Attention Into",
    heroHighlight: "High-Intent Paying Clients.",
    executiveSummary: "Social media for business is not about posting random quotes or counting vanity likes. At Mindware Consulting, we architect performance-driven social media growth engines across Meta (Facebook & Instagram), LinkedIn, and TikTok that position your leadership, generate qualified commercial leads, and deliver measurable return on ad spend (ROAS).",
    whyChooseUs: [
      "Precision B2B targeting on LinkedIn and demographic/behavioral retargeting on Meta platforms.",
      "Conversion tracking configured with Meta Pixel and Conversions API (CAPI) for airtight attribution.",
      "High-production visual creatives: short-form video reels, educational carousels, and corporate photography.",
      "A/B split testing of ad copy, visual hooks, and audience segments to systematically lower Cost-Per-Lead (CPL).",
      "End-to-end community management, lead qualification, and instant CRM/WhatsApp routing."
    ],
    pillars: [
      {
        title: "Paid Meta & LinkedIn Performance Advertising",
        description: "Deploying high-converting ad campaigns engineered to generate immediate, qualified sales inquiries.",
        points: [
          "Meta Conversions API (CAPI) and Google Tag Manager server-side event tracking",
          "B2B LinkedIn Campaign Manager: Job title, industry, and company size account targeting",
          "Custom Audiences and Lookalike Audiences built from your existing customer databases",
          "Lead-generation ad funnels with instant lead form pre-fill and CRM sync"
        ]
      },
      {
        title: "Short-Form Video Production & Creative Strategy",
        description: "Capturing attention in the first 3 seconds with high-retention video reels, TikToks, and visual assets.",
        points: [
          "Professional scriptwriting with tested storytelling frameworks (Hook-Story-Offer)",
          "Motion graphics, dynamic subtitles, brand color palettes, and cinematic pacing",
          "Educational carousels establishing industry expertise and thought leadership",
          "Client testimonial video packaging and project milestone celebrations"
        ]
      },
      {
        title: "Executive Personal Branding & B2B Thought Leadership",
        description: "Transforming your founders and C-suite executives into recognized industry voices on LinkedIn.",
        points: [
          "Complete LinkedIn profile optimization for executive leadership and partners",
          "Ghostwriting high-engagement thought leadership articles and industry commentaries",
          "Strategic connection networking with corporate decision-makers and procurement directors",
          "Speaking engagement amplification and corporate award positioning"
        ]
      },
      {
        title: "Community Engagement & Rapid Lead Qualification",
        description: "Ensuring zero prospective leads slip through the cracks with rapid response protocols.",
        points: [
          "Automated direct message (DM) funnels that qualify inbound inquiries 24/7",
          "Click-to-WhatsApp direct routing for immediate sales conversations",
          "Comment moderation, brand sentiment protection, and customer service escalation",
          "Monthly engagement analytics and community sentiment reporting"
        ]
      }
    ],
    process: [
      {
        phase: "Step 01",
        title: "Audience Profiling & Creative Strategy",
        duration: "Week 1",
        description: "We map out your target buyer personas, examine competitor ad libraries, and design a monthly editorial calendar complete with creative angles.",
        deliverables: ["Social Media Growth Playbook", "Content Calendar", "Creative Visual Guidelines", "Tracking Pixel Setup"]
      },
      {
        phase: "Step 02",
        title: "Asset Production & Copywriting",
        duration: "Weeks 2 - 3",
        description: "Our creative team produces short-form video reels, high-resolution graphic carousels, and conversion-focused ad copy variants.",
        deliverables: ["15-20 Creative Assets Monthly", "Ad Copy A/B Split Variants", "Hook Scripts & Captions", "Lead Magnet Packaging"]
      },
      {
        phase: "Step 03",
        title: "Campaign Launch & Funnel Optimization",
        duration: "Weeks 3 - 4",
        description: "We configure audience targeting, deploy ad sets with controlled budgets, and monitor Cost-Per-Lead (CPL) and Return on Ad Spend (ROAS).",
        deliverables: ["Live Meta & LinkedIn Ad Campaigns", "Automated Lead Routing to CRM/WhatsApp", "Budget Optimization", "Weekly Optimization Logs"]
      },
      {
        phase: "Step 04",
        title: "Attribution, Retargeting & Monthly Scale",
        duration: "Ongoing",
        description: "We retarget warm website visitors, re-engage previous leads, and scale winning ad creatives for maximum corporate pipeline growth.",
        deliverables: ["Monthly Executive Looker Studio Dashboard", "CPL & ROAS Performance Review", "Next-Month Strategy Refinements"]
      }
    ],
    technologies: [
      "Meta Ads Manager",
      "LinkedIn Campaign Manager",
      "TikTok Ads",
      "Meta Pixel & Conversions API",
      "Adobe Premiere Pro & CapCut",
      "Canva Pro",
      "Metricool / Buffer",
      "WhatsApp Business API"
    ],
    metrics: [
      { label: "Channel Mix", value: "Meta & LinkedIn", subtext: "B2B and high-intent commercial targeting" },
      { label: "Lead Capture", value: "WhatsApp & CRM", subtext: "Direct routing to sales teams" },
      { label: "Attribution", value: "Pixel & GA4", subtext: "Structured enquiry event tracking" },
      { label: "Executive Content", value: "Brand Authority", subtext: "Positioning & campaign creative" }
    ],
    idealFor: [
      "Companies wanting a consistent, predictable stream of qualified customer inquiries every week.",
      "Founders and executives who want to establish authoritative thought leadership on LinkedIn.",
      "Brands with high-ticket services needing strategic multi-touchpoint retargeting funnels.",
      "Businesses launching major new products, developments, or service expansions."
    ],
    deliverablesSummary: [
      "Comprehensive monthly content calendar with 16-20 high-quality graphic posts and reels",
      "Full ad campaign management across Meta and LinkedIn with continuous budget optimization",
      "Custom tracking setup ensuring every naira of ad spend is attributed to real business inquiries",
      "Automated WhatsApp and email lead notification system for rapid sales follow-up",
      "Monthly transparent performance reports detailing impressions, leads generated, and ROAS"
    ],
    faqs: [
      {
        question: "How should our business budget for paid social media advertising?",
        answer: "Direct advertising budgets depend on your industry, geography, and sales targets, and are paid directly to ad platforms (Meta, LinkedIn, or Google). During your Business Growth Review, we recommend an appropriate monthly media budget aligned with your commercial objectives."
      },
      {
        question: "Do you create all the graphics, videos, and copywriting in-house?",
        answer: "Yes, our team handles the entire creative lifecycle: scripting, video editing, graphic design, copywriting, hashtag research, scheduling, and community moderation."
      },
      {
        question: "How quickly can we expect to start receiving leads from social ads?",
        answer: "Unlike organic SEO which takes months, paid campaigns often generate incoming inquiries within 48 to 72 hours of going live, especially with direct WhatsApp and lead form integrations."
      },
      {
        question: "Will our team get to review and approve posts before they are published?",
        answer: "Always. We provide content calendars and visual drafts at least 7 to 10 days in advance so your team has ample time to review, suggest edits, and give final approval."
      }
    ],
    relatedCaseStudyIds: ["crescon-projects", "harmostructs-engineering", "osines-group", "infinite-downstream"],
    pricingPackageAnchor: "packages"
  },

  "app-development": {
    id: "app-development",
    shortName: "App Development",
    menuDescription: "Custom web applications, native iOS & Android mobile apps, portals & APIs",
    badge: "SOFTWARE ENGINEERING",
    heroHeadline: "Scalable Web & Mobile Apps",
    heroHighlight: "Built for Enterprise Growth.",
    executiveSummary: "Off-the-shelf software often limits your business processes. Mindware Consulting architects custom web applications, cross-platform mobile apps, and enterprise management portals built with modern cloud architectures, clean code standards, and robust security protocols that scale as your business expands.",
    whyChooseUs: [
      "Full-stack engineering capabilities across React, Next.js, Node.js, TypeScript, PostgreSQL, and Flutter.",
      "Cross-platform mobile apps for iOS and Android built from a unified, efficient codebase.",
      "Strict security protocols including JWT authentication, data encryption at rest and in transit, and RBAC.",
      "Modular microservices and RESTful / GraphQL API architectures for seamless third-party connectivity.",
      "Comprehensive technical documentation, automated CI/CD deployment pipelines, and SLA maintenance."
    ],
    pillars: [
      {
        title: "Custom Web Applications & SaaS Platforms",
        description: "Developing robust, multi-tenant cloud software tailored to solve complex operational challenges.",
        points: [
          "Modern frontend architectures using React, Next.js, and Tailwind CSS",
          "Secure backend microservices using Node.js, Express, and Python",
          "Relational and NoSQL database modeling (PostgreSQL, MySQL, MongoDB)",
          "Subscription billing engines, automated invoicing, and role-based permissions (RBAC)"
        ]
      },
      {
        title: "Cross-Platform Mobile Apps (iOS & Android)",
        description: "Delivering intuitive, lightning-fast native mobile experiences from a single Flutter or React Native codebase.",
        points: [
          "Native device hardware integration (Camera, GPS, Biometrics, Push Notifications)",
          "Offline-first local caching and seamless cloud synchronization",
          "Smooth 60fps animations and platform-compliant UI/UX components",
          "Full App Store and Google Play Store submission and approval management"
        ]
      },
      {
        title: "Enterprise Dashboards & Operations Portals",
        description: "Transforming fragmented business workflows into unified, data-driven administrative control rooms.",
        points: [
          "Interactive real-time data visualizations, KPI charts, and executive reporting",
          "Staff shift scheduling, inventory tracking, and procurement approval chains",
          "Client self-service portals with ticket support and automated status tracking",
          "Multi-factor authentication (MFA) and audit trail logging for regulatory compliance"
        ]
      },
      {
        title: "API Engineering & Systems Integration",
        description: "Connecting your applications with critical third-party services and legacy corporate databases.",
        points: [
          "Payment gateway integrations: Paystack, Flutterwave, Stripe, and PayPal",
          "ERP, Accounting, and CRM synchronization (QuickBooks, Zoho, HubSpot, SAP)",
          "SMS, Email, and WhatsApp Business API automated webhook integrations",
          "Comprehensive Swagger / Postman API documentation for developer handoff"
        ]
      }
    ],
    process: [
      {
        phase: "Sprint 01",
        title: "Product Scoping & Architecture Design",
        duration: "Weeks 1 - 2",
        description: "We translate your business requirements into a formal Product Requirements Document (PRD), entity relationship diagrams (ERD), and technical architecture blueprints.",
        deliverables: ["Product Requirements Document", "Database ERD & Schema Design", "Interactive Wireframes", "Technology Architecture Plan"]
      },
      {
        phase: "Sprint 02",
        title: "Core Backend & Database Development",
        duration: "Weeks 3 - 5",
        description: "Engineers build out the database models, RESTful API endpoints, authentication flows, and security protocols in staging environments.",
        deliverables: ["API Microservices", "Authentication & Security Rules", "Database Migrations", "Automated Unit Tests"]
      },
      {
        phase: "Sprint 03",
        title: "Frontend Engineering & Mobile Build",
        duration: "Weeks 6 - 8",
        description: "Building responsive web interfaces and mobile app screens, integrating APIs, and testing state management across devices.",
        deliverables: ["Web Application Frontend", "Mobile App iOS/Android Builds", "Real-Time Dashboard Views", "API Integration Staging"]
      },
      {
        phase: "Sprint 04",
        title: "Security Audits, Load Testing & Cloud Deployment",
        duration: "Weeks 9 - 10",
        description: "Vulnerability scanning, stress testing under simulated concurrent users, App Store submission, and automated production deployment.",
        deliverables: ["Penetration Testing Audit", "App Store & Play Store Approval", "Production Cloud Deployment", "Codebase & Doc Handover"]
      }
    ],
    technologies: [
      "React & TypeScript",
      "Next.js",
      "Flutter & Dart",
      "Node.js & Express",
      "PostgreSQL",
      "MongoDB",
      "Docker & Kubernetes",
      "AWS / Cloud Hosting",
      "Git & CI/CD Pipelines"
    ],
    metrics: [
      { label: "Delivery Platforms", value: "Web & Mobile", subtext: "React, TypeScript & Flutter builds" },
      { label: "Integrations", value: "API & Payment", subtext: "Paystack, Flutterwave, CRM & ERP links" },
      { label: "IP Ownership", value: "100% Client IP", subtext: "Full codebase & repository handover" },
      { label: "Governance", value: "Milestone QA", subtext: "Structured sprints & launch verification" }
    ],
    idealFor: [
      "Organizations outgrowing generic software and needing custom internal workflow systems.",
      "Tech startups and innovators looking to build an MVP or commercial SaaS product.",
      "Enterprises needing mobile apps to engage customers, dispatch field staff, or take orders.",
      "Firms requiring seamless API integrations between disjointed accounting, CRM, and operational databases."
    ],
    deliverablesSummary: [
      "Complete, production-ready web application or cross-platform mobile app (iOS & Android)",
      "Full ownership of unencumbered intellectual property (IP), source code, and repositories",
      "Secured cloud infrastructure configuration with automated CI/CD deployment pipelines",
      "Comprehensive API documentation and developer onboarding manuals",
      "60-day post-launch technical warranty with bug fixes and server monitoring"
    ],
    faqs: [
      {
        question: "Should we build a native mobile app or a progressive web application (PWA)?",
        answer: "We analyze your audience and functional requirements to advise you. If you need deep hardware access (push notifications, camera, offline mode, app store presence), a cross-platform Flutter/React Native mobile app is ideal. If budget and instant web access are priorities, a responsive web app or PWA is often the faster, most cost-effective path."
      },
      {
        question: "Who owns the code and intellectual property (IP) after the project is done?",
        answer: "You own 100% of the code, intellectual property, repositories, and assets upon project completion. We hand over the complete GitHub repository and deployment access."
      },
      {
        question: "How do you ensure our application is secure against hacks and data leaks?",
        answer: "We implement industry-standard security practices: HTTPS/TLS encryption, JWT authentication with secure cookies, SQL injection prevention, cross-site scripting (XSS) filters, rate limiting, and regular dependency vulnerability audits."
      },
      {
        question: "Do you handle the App Store and Google Play submission process?",
        answer: "Yes, we handle the entire app store publishing pipeline: generating production certificates, preparing screenshots, writing metadata, managing privacy policies, and addressing any reviewer guidelines until approval."
      }
    ],
    relatedCaseStudyIds: ["crescon-projects", "quanxi-limited", "harmostructs-engineering"],
    pricingPackageAnchor: "packages"
  },

  "training": {
    id: "training",
    shortName: "Capability Enablement",
    menuDescription: "Corporate workforce enablement, system onboarding, and B2B operational workshops",
    badge: "B2B WORKFORCE ENABLEMENT",
    heroHeadline: "Organizational Capability &",
    heroHighlight: "Corporate Workforce Enablement.",
    executiveSummary: "Digital transformation only delivers lasting ROI when teams adopt the new platforms, CRM workflows, search systems, and operational standards. Mindware delivers tailored organizational consulting and in-house workforce enablement workshops exclusively for corporate partners—aligning engineering, commercial, project management, and leadership teams around measurable business execution.",
    whyChooseUs: [
      "Delivered exclusively as customized B2B organizational engagements aligned with your company's active systems.",
      "Led directly by senior digital strategists, engineers, and project governance consultants.",
      "Practical operational playbooks built around your company's live CRM, web platform, and internal SOPs.",
      "Project governance, operational management, and statutory HSE readiness workshops for enterprise teams.",
      "Flexible executive briefing formats: on-site at your corporate offices or structured virtual team cohorts."
    ],
    pillars: [
      {
        title: "Digital Systems & Technology Adoption Workshops",
        description: "Hands-on operational onboarding so your internal staff confidently manage and extract value from newly deployed digital infrastructure.",
        points: [
          "Website & CMS governance workflows for internal communications and marketing teams",
          "CRM adoption, WhatsApp lead routing, and structured pipeline management for sales teams",
          "Analytics & reporting fluency: interpreting conversion metrics, search traffic, and campaign attribution",
          "Cyber-hygiene and NDPA data-handling protocols for enterprise staff"
        ]
      },
      {
        title: "Project & Operational Management Alignment",
        description: "Organizational workshops designed for project directors, site managers, and operational leads executing multi-stakeholder mandates.",
        points: [
          "Project delivery governance, risk tracking, and milestone accountability frameworks",
          "Commercial bid coordination and digital capability dossier management for tender teams",
          "Operational workflow mapping and cross-departmental SLA optimization",
          "Workplace HSE readiness briefings and statutory compliance documentation for field teams"
        ]
      },
      {
        title: "Commercial Growth & Business Development Enablement",
        description: "Equipping internal business development and client acquisition teams with repeatable digital prospecting playbooks.",
        points: [
          "B2B LinkedIn authority, executive account targeting, and inbound lead qualification",
          "Structured proposal workflows and high-conversion digital discovery frameworks",
          "Customer retention, lifecycle follow-up, and account expansion workflows",
          "Pre-engagement diagnostics and post-rollout adoption scorecards"
        ]
      },
      {
        title: "Leadership & Change Management Advisory",
        description: "Executive alignment sessions ensuring C-suite and middle management sponsor digital transformation without operational friction.",
        points: [
          "Executive KPI dashboards and quarterly digital performance governance reviews",
          "Change-management communication plans during software or ERP transitions",
          "Departmental handover protocols and internal capability documentation",
          "Retained advisory support for scaling internal teams sustainably"
        ]
      }
    ],
    process: [
      {
        phase: "Step 01",
        title: "Organizational Capability Diagnostic",
        duration: "Week 1",
        description: "We audit existing workflows, software utilization, and team skill gaps across operations, marketing, and management.",
        deliverables: ["Capability Gap Assessment", "Departmental Alignment Plan", "Customized Workshop Agenda", "System Access Checklist"]
      },
      {
        phase: "Step 02",
        title: "Bespoke Playbook & Curriculum Design",
        duration: "Week 2",
        description: "We build practical training modules around your live digital assets, CRM pipelines, and sector compliance benchmarks.",
        deliverables: ["Company-Specific SOP Playbooks", "Practical Lab Exercises", "Governance Templates", "Role-Based Guides"]
      },
      {
        phase: "Step 03",
        title: "On-Site or Virtual Team Workshops",
        duration: "Weeks 3 - 4",
        description: "Our senior consultants facilitate interactive sessions with your departments to embed new operational habits.",
        deliverables: ["Live Facilitated Sessions", "Recorded Reference Walkthroughs", "Hands-On System Drills", "Q&A Advisory"]
      },
      {
        phase: "Step 04",
        title: "Adoption Audit & Ongoing Support",
        duration: "Post-Rollout",
        description: "We track real workflow usage and provide follow-up coaching to ensure lasting organizational capability.",
        deliverables: ["30-Day Adoption Review", "Executive Readiness Summary", "Refinement Recommendations", "Retained Support Access"]
      }
    ],
    technologies: [
      "Enterprise CMS",
      "HubSpot & CRM Workflows",
      "Power BI & Analytics",
      "Jira & Project Governance",
      "NDPA Compliance",
      "ISO / HSE Frameworks"
    ],
    metrics: [
      { label: "Engagement Scope", value: "B2B Only", subtext: "Delivered strictly for corporate teams" },
      { label: "Practical Relevance", value: "Workflow-Matched", subtext: "Built around your live business tools" },
      { label: "Core Focus", value: "System Adoption", subtext: "CMS, CRM, analytics & governance alignment" },
      { label: "Corporate Standing", value: "Since 2016", subtext: "Mindware Consulting Ltd (RC 1309926)" }
    ],
    idealFor: [
      "Enterprises launching new websites, portals, CRM pipelines, or custom software systems that require rapid internal staff adoption.",
      "Construction, engineering, real estate, and energy firms aligning project and business development teams around modern processes.",
      "Executive leadership teams seeking structured change management and operational governance workshops.",
      "Organizations requiring bespoke corporate workforce capability building as part of broader digital transformation."
    ],
    deliverablesSummary: [
      "Tailored organizational capability assessment mapped to your business outcomes",
      "Custom internal operational SOPs, system walkthroughs, and playbooks",
      "On-site or virtual executive and departmental enablement workshops",
      "30-day post-rollout adoption review and continuous consulting access"
    ],
    faqs: [
      {
        question: "Is this for individual students or corporate organizations?",
        answer: "Corporate Capability & Workforce Enablement on this website is delivered strictly for businesses and organizations as part of our consulting practice. Individual and consumer-focused training programs are separated into the dedicated Mindware Academy platform."
      },
      {
        question: "Can workshops be tailored around our company's exact software and workflows?",
        answer: "Yes. Every corporate enablement engagement is customized around your actual systems—whether that includes your website, CRM, project delivery tools, or commercial outreach process."
      },
      {
        question: "Do you deliver corporate workshops on-site at our offices?",
        answer: "Yes. We conduct on-site executive and departmental sessions across Lagos, Abuja, Port Harcourt, and client hubs nationwide, as well as live virtual sessions for distributed teams."
      },
      {
        question: "Can workforce enablement be bundled with a digital transformation retainer?",
        answer: "Yes. Most enterprise partners include organizational enablement inside their Digital Transformation & Management Consulting retainer so every new system achieves full team adoption."
      }
    ],
    relatedCaseStudyIds: ["harmostructs-engineering", "quanxi-limited", "osines-group"],
    pricingPackageAnchor: "packages"
  },

  "consultancy": {
    id: "consultancy",
    shortName: "Digital Consulting",
    menuDescription: "Digital transformation roadmaps, tech architecture & growth strategy advisory",
    badge: "STRATEGIC ADVISORY",
    heroHeadline: "Turn Digital Complexity Into a",
    heroHighlight: "Clear, Profitable Growth Strategy.",
    executiveSummary: "Modern technology evolves rapidly, making it easy for organizations to waste capital on misaligned software, disconnected tools, and fragmented marketing campaigns. Mindware Consulting provides executive-level digital advisory, technology auditing, and strategic transformation roadmaps that align your digital investments directly with corporate revenue and operational efficiency.",
    whyChooseUs: [
      "Vendor-neutral, objective technology evaluations prioritizing your commercial ROI, not vendor commissions.",
      "Deep cross-disciplinary expertise spanning software engineering, search growth, workflow automation, and safety.",
      "Actionable transformation roadmaps with clear phase milestones, resource budgets, and KPI scorecards.",
      "Fractional CTO and executive advisory services that guide boardrooms through complex digital decisions.",
      "Hands-on change management ensuring smooth staff adoption of new software systems."
    ],
    pillars: [
      {
        title: "Enterprise Digital Transformation Audits",
        description: "Conducting an exhaustive diagnostic of your company's existing digital operations, tools, and workflows.",
        points: [
          "Legacy software architecture assessment and cloud migration feasibility studies",
          "Data pipeline evaluation: identifying data silos between sales, operations, and finance",
          "Workflow bottleneck discovery and automated efficiency recommendations",
          "Cybersecurity hygiene and regulatory compliance risk assessment"
        ]
      },
      {
        title: "Technology Stack Selection & Vendor Due Diligence",
        description: "Guiding organizations in choosing the right software platforms without costly vendor lock-in.",
        points: [
          "RFP (Request for Proposal) drafting, vendor scoring, and contract negotiation support",
          "ERP, CRM, and accounting system selection (SAP, Microsoft Dynamics, HubSpot, Zoho)",
          "Cloud infrastructure cost optimization (reducing AWS, Google Cloud, and software seat costs)",
          "Custom build vs. off-the-shelf software build-or-buy financial models"
        ]
      },
      {
        title: "Go-To-Market (GTM) & Commercial Growth Strategy",
        description: "Architecting modern customer acquisition systems that reduce Customer Acquisition Cost (CAC) and scale revenue.",
        points: [
          "Omnichannel customer acquisition funnel modeling (Organic Search + Paid Ads + B2B Outreach)",
          "Pricing strategy, tier structuring, and Customer Lifetime Value (CLV) optimization",
          "Sales pipeline acceleration and CRM automation workflows",
          "Market entry strategy for regional expansion into new African and international territories"
        ]
      },
      {
        title: "Fractional CTO & Executive Board Advisory",
        description: "Providing high-level technology leadership to executive directors and C-suite leaders on a flexible basis.",
        points: [
          "Monthly strategic board advisory sessions and digital progress reporting",
          "Technical due diligence for mergers, acquisitions, and investment funding",
          "IT governance, data privacy policies (NDPR / GDPR), and disaster recovery planning",
          "Hiring and vetting senior in-house software and marketing personnel"
        ]
      }
    ],
    process: [
      {
        phase: "Stage 01",
        title: "Operational Diagnostic & Stakeholder Interviews",
        duration: "Weeks 1 - 2",
        description: "We interview key department heads, audit current software licenses, review operational bottlenecks, and analyze customer acquisition costs.",
        deliverables: ["Operational Diagnostic Report", "Technology Inventory Audit", "Stakeholder Gap Analysis", "Executive Findings Briefing"]
      },
      {
        phase: "Stage 02",
        title: "Strategic Blueprint & Architecture Roadmap",
        duration: "Weeks 3 - 4",
        description: "We craft a formal, prioritized digital transformation roadmap outlining recommended software adoptions, budget estimates, and ROI projections.",
        deliverables: ["Digital Transformation Blueprint", "Phased 12-Month Implementation Roadmap", "Vendor Evaluation Matrix", "Resource & Budget Allocation Plan"]
      },
      {
        phase: "Stage 03",
        title: "Implementation Oversight & Vendor Coordination",
        duration: "Months 2 - 4",
        description: "We act as your owner's representative, overseeing software implementation vendors, managing sprints, and ensuring technical specifications are met.",
        deliverables: ["Vendor SLA Enforcement", "Data Migration Supervision", "User Acceptance Testing (UAT)", "Staff Change Management Workshops"]
      },
      {
        phase: "Stage 04",
        title: "KPI Tracking & Ongoing Strategic Advisory",
        duration: "Ongoing Retainer",
        description: "Monthly executive reviews to measure ROI, track operational KPIs, and continuously adapt your technology strategy to market changes.",
        deliverables: ["Monthly Executive KPI Dashboard", "Quarterly Board Strategy Reviews", "Fractional CTO On-Demand Advisory"]
      }
    ],
    technologies: [
      "Enterprise Architecture Frameworks",
      "HubSpot & Salesforce",
      "Microsoft Dynamics & Zoho",
      "AWS & Cloud Computing",
      "Looker Studio & Power BI",
      "Process Mapping (BPMN)",
      "NDPR & Data Compliance"
    ],
    metrics: [
      { label: "Growth Methodology", value: "ACQUIRE → PROTECT", subtext: "Structured 5-stage operating framework" },
      { label: "Advisory Stance", value: "Vendor-Neutral", subtext: "Objective guidance tied to business ROI" },
      { label: "Decision Level", value: "Board & Ops", subtext: "Executive alignment & workflow governance" },
      { label: "Track Record", value: "Since 2016", subtext: "RC 1309926 · Nationwide & diaspora" }
    ],
    idealFor: [
      "Established traditional businesses needing to digitize operations, sales, and client management.",
      "CEOs and boards of directors seeking unbiased technology leadership without hiring a full-time CTO.",
      "Organizations planning major enterprise software adoptions (ERP, CRM) that cannot afford failure.",
      "Growing companies wanting to eliminate manual spreadsheets and automate repetitive workflows."
    ],
    deliverablesSummary: [
      "Comprehensive Digital Transformation Audit identifying operational inefficiencies and software waste",
      "Actionable 12-month prioritized strategic roadmap with clear budgets, milestones, and ROI projections",
      "Vendor-neutral software evaluation matrix to ensure your company selects the right platforms",
      "Staff change management workshops and user acceptance testing protocols for smooth adoption",
      "Direct fractional CTO advisory access for your executive leadership team"
    ],
    faqs: [
      {
        question: "What is the difference between hiring a digital consultant versus an IT vendor?",
        answer: "An IT vendor typically sells you a specific product or service they specialize in (like a single piece of software). As independent consultants, Mindware Consulting acts as your strategic partner—evaluating your entire business objectively, choosing the best solutions, and ensuring vendors deliver on time and budget."
      },
      {
        question: "How do you charge for consulting services?",
        answer: "We offer flexible engagement structures: project-based consulting for specific audits and transformation roadmaps, or monthly fractional CTO retainers for ongoing strategic advisory and board guidance."
      },
      {
        question: "How do you ensure our employees actually adopt new software systems?",
        answer: "Technology projects fail when people aren't onboarded properly. Our advisory includes hands-on change management: executive alignment, phased rollouts, intuitive documentation, and staff training workshops to ensure high adoption and enthusiasm."
      },
      {
        question: "Can you help our company vet and hire technical staff?",
        answer: "Yes, we routinely assist corporate clients in drafting technical job descriptions, screening developer and marketer candidates, conducting rigorous technical interviews, and evaluating candidate portfolios."
      }
    ],
    relatedCaseStudyIds: ["crescon-projects", "harmostructs-engineering", "priziangori-global", "quanxi-limited"],
    pricingPackageAnchor: "packages"
  }
};
