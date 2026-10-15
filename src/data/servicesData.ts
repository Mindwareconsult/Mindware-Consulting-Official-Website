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
      "Mobile-first, lightning-fast responsive architecture with Core Web Vitals optimization (90+ score).",
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
          "Blazing fast sub-second load times that keep bounce rates under 25%"
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
          "Database query indexing and Core Web Vitals 90+ speed compliance"
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
        deliverables: ["Core Web Vitals 90+ Audit", "DNS & Domain Switchover", "CMS Staff Training Video", "30-Day Post-Launch Warranty"]
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
      { label: "Average Speed Score", value: "95+", subtext: "Google PageSpeed Insights" },
      { label: "Client Conversion Lift", value: "+85%", subtext: "Average increase in inbound leads" },
      { label: "Uptime Reliability", value: "99.9%", subtext: "Guaranteed enterprise SLA" },
      { label: "Projects Completed", value: "150+", subtext: "Across Nigeria & West Africa" }
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
    relatedCaseStudyIds: ["juptree-automobile", "harmostructs-engineering", "quanxi-limited", "osines-group", "priziangori-global", "crescon-projects"],
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
      { label: "Organic Growth Avg", value: "300%", subtext: "Over 6-12 month campaigns" },
      { label: "Page 1 Keywords", value: "85%+", subtext: "Target commercial queries" },
      { label: "Inbound Lead Quality", value: "+140%", subtext: "High-intent buyer traffic" },
      { label: "Client Retainers", value: "95%", subtext: "Annual renewal satisfaction" }
    ],
    idealFor: [
      "B2B service providers and construction companies wanting to rank for commercial contract keywords.",
      "Firms tired of burning marketing budgets on paid ads with diminishing returns.",
      "Enterprises looking to dominate regional markets in Lagos, Abuja, Port Harcourt, and nationwide.",
      "Companies launching new products or services needing immediate search authority."
    ],
    deliverablesSummary: [
      "Complete technical SEO remediation resolving 100% of critical crawl and indexing errors",
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
    relatedCaseStudyIds: ["crescon-projects", "harmostructs-engineering", "priziangori-global", "osines-group", "bcale-associates"],
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
      { label: "Average ROAS", value: "4.5x+", subtext: "Return on advertising spend" },
      { label: "Cost Per Lead", value: "-45%", subtext: "Reduction via A/B optimization" },
      { label: "Lead Response Time", value: "< 5 min", subtext: "Via WhatsApp automation" },
      { label: "Monthly Impressions", value: "2M+", subtext: "Generated across client accounts" }
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
        question: "How much should our business budget for paid social media advertising?",
        answer: "We recommend starting with an ad spend budget of ₦150,000 to ₦500,000+ per month depending on your industry and revenue goals. Our team manages your budget strictly to minimize Cost-Per-Lead and maximize return on investment."
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
      { label: "App Store Approval", value: "100%", subtext: "First-time submission pass" },
      { label: "API Response Time", value: "< 120ms", subtext: "Optimized server queries" },
      { label: "Concurrent Users", value: "100k+", subtext: "Scalable cloud architecture" },
      { label: "Code Coverage", value: "90%+", subtext: "Automated test validation" }
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
    shortName: "Training & Workforce",
    menuDescription: "Digital Skills Academy & Professional Certifications (PMP®, HRM, CRM, HSE 1-3)",
    badge: "WORKFORCE ACCELERATOR",
    heroHeadline: "Divided Into 2 Specialized Tracks:",
    heroHighlight: "Digital Skills & Professional Certifications.",
    executiveSummary: "Mindware Consulting Academy is divided into two distinct, high-impact learning sub-pages: Digital Skills Training (for creators, developers, and marketers) and Professional Development & Employability Certifications (for engineers, corporate managers, and safety compliance leaders). We bridge the gap between academic theory and practical commercial capability.",
    whyChooseUs: [
      "Structured into two specialized sub-pages: Digital Skills Track & Professional Development Track.",
      "Led exclusively by active agency consultants, senior software engineers, and certified project leaders.",
      "100% hands-on project capstones—students build commercial-grade portfolios, not just theoretical essays.",
      "Accredited certifications aligned with international standards: PMI® PMBOK, OSHA/ISO HSE, and CIPM.",
      "Flexible learning options: In-person classrooms, live interactive virtual sessions, and custom corporate retreats."
    ],
    pillars: [
      {
        title: "Sub-Page 1: Digital Skills Academy",
        description: "Practical bootcamps designed to equip students and professionals with high-income tech and creative capabilities.",
        points: [
          "Web Design & WordPress: Modern UI/UX in Figma, Elementor Pro, e-commerce, and speed optimization",
          "Social Media Marketing: Meta & LinkedIn paid ads, audience targeting, ROAS, and conversion funnels",
          "Video Editing & Content Production: Adobe Premiere Pro, CapCut Desktop, color grading, and short-form storytelling",
          "Data Analytics & Business Intelligence: Advanced Excel, SQL database queries, Power BI dashboards, and Python",
          "Search Engine Optimization (SEO): Keyword intent, technical site audits, on-page optimization, and local ranking",
          "Full-Stack Web & Mobile App Development: React, TypeScript, Node.js APIs, MongoDB, and Flutter mobile apps"
        ]
      },
      {
        title: "Sub-Page 2: Professional Development & HSE Certifications",
        description: "Executive programs designed for managers, site supervisors, HR professionals, and engineers.",
        points: [
          "Project Management Professional (PMP®): PMBOK 7th Ed, Agile/Scrum, WBS, EVM, risk registers, and 35 PDUs",
          "Strategic Human Resources Management (HRM): Nigerian Labour Act, PENCOM, NSITF, talent acquisition, and KPIs",
          "Customer Relationship Management (CRM): HubSpot, Salesforce, pipeline automation, WhatsApp Business, and CLV",
          "Health, Safety & Environment (HSE Levels 1, 2, 3): General Safety, Risk Assessment, PTW, and ISO 45001/14001 audits",
          "Executive Employability & Leadership: Boardroom presentation, emotional intelligence (EQ), and proposal writing"
        ]
      },
      {
        title: "Corporate Workforce Training & In-House Retreats",
        description: "Customized workforce upskilling programs tailored to the unique operational objectives of your company.",
        points: [
          "Bespoke curriculum design aligned with your industry's exact operational workflows",
          "Corporate group discount packages (10% to 25% savings for cohorts of 3+ staff)",
          "On-site delivery at your corporate offices or off-site executive retreats",
          "Pre-training skill diagnostics and post-training impact assessments"
        ]
      },
      {
        title: "Career Placement Support & Mentorship",
        description: "Helping graduates translate their newly acquired skills into promotions, lucrative contracts, and new jobs.",
        points: [
          "1-on-1 personalized CV audit and LinkedIn profile optimization for inbound recruiters",
          "Mock technical interviews and executive salary negotiation coaching",
          "Direct referrals to our network of corporate clients and tech agency partners",
          "Lifetime access to Mindware alumni community and ongoing masterclasses"
        ]
      }
    ],
    process: [
      {
        phase: "Step 01",
        title: "Track Selection & Admissions Consultation",
        duration: "Pre-Enrollment",
        description: "Our academic advisors help you evaluate your career background and select either the Digital Skills Track or the Professional Development Track.",
        deliverables: ["Curriculum Syllabus Pack", "Hardware/Software Checklist", "Flexible Installment Payment Plan", "Cohort Welcome Kit"]
      },
      {
        phase: "Step 02",
        title: "Live Interactive Lectures & Practical Labs",
        duration: "Weeks 1 - 6",
        description: "Engage in live weekend or evening classes led by senior consultants. Every module is reinforced with real-world lab exercises.",
        deliverables: ["Class Recordings & Slide Decks", "Lab Assignments & Code Repositories", "Instructor Mentorship Hours", "Peer Collaborative Projects"]
      },
      {
        phase: "Step 03",
        title: "Capstone Project & Certification Defense",
        duration: "Weeks 7 - 8",
        description: "Students build and defend a comprehensive commercial capstone project (live website, safety audit report, PMP project plan, or BI dashboard).",
        deliverables: ["Commercial Capstone Portfolio", "Faculty Code/Report Review", "Official Credential Verification", "Graduation Ceremony"]
      },
      {
        phase: "Step 04",
        title: "Alumni Network & Career Acceleration",
        duration: "Post-Graduation",
        description: "Join our active alumni network, access ongoing job opportunities, and attend quarterly industry masterclasses.",
        deliverables: ["Accredited Certificate of Competence", "LinkedIn Digital Badge", "Alumni Community Access", "Job Board Referrals"]
      }
    ],
    technologies: [
      "Figma",
      "WordPress",
      "Power BI",
      "SQL & Python",
      "Adobe Premiere",
      "Jira & MS Project",
      "HubSpot CRM",
      "OSHA / ISO Safety Standards"
    ],
    metrics: [
      { label: "Graduates Trained", value: "500+", subtext: "Across digital & professional tracks" },
      { label: "Hands-on Practical", value: "100%", subtext: "Real-world project capstones" },
      { label: "Corporate Partners", value: "40+", subtext: "Companies trusting our training" },
      { label: "Employment Lift", value: "78%", subtext: "Career advancement within 6 months" }
    ],
    idealFor: [
      "Aspiring tech professionals, creators, and freelancers looking to master Web Design, SEO, Video, or Coding.",
      "Project managers, engineers, and site supervisors needing recognized PMP® and HSE Levels 1, 2, 3 certifications.",
      "Corporate HR directors and executives seeking customized in-house training for their teams.",
      "Graduates seeking job-ready employability skills to stand out in competitive multinational interviews."
    ],
    deliverablesSummary: [
      "Two dedicated sub-pages: Digital Skills Track & Professional Development Track",
      "Hands-on project-based curriculum ensuring you graduate with a live commercial portfolio",
      "Accredited Mindware Consulting Certificate of Competence with online verification badge",
      "Direct mentorship from senior consultants actively working on enterprise projects",
      "Comprehensive study materials, lecture recordings, and lifetime alumni network access"
    ],
    faqs: [
      {
        question: "How do I choose between the Digital Skills page and the Professional Development page?",
        answer: "If you want to master technical craft like building websites, editing videos, running paid ads, analyzing data, or developing software, choose the Digital Skills Track (/training/digital-skills). If you are looking for corporate leadership credentials like PMP® Project Management, Human Resources (HRM), CRM systems, or Health Safety & Environment (HSE Levels 1, 2, 3), choose the Professional Development Track (/training/professional-development)."
      },
      {
        question: "Are the classes held online or physically?",
        answer: "We offer flexible options including physical classes at our training facility, live interactive virtual sessions on Zoom/Google Meet, and hybrid weekend schedules tailored for busy working professionals."
      },
      {
        question: "Can these training programs be customized for our company's employees?",
        answer: "Yes, we routinely deliver customized corporate training for engineering firms, oil & gas contractors, banks, and SMEs with bespoke syllabi, industry-specific case studies, and corporate invoicing."
      },
      {
        question: "Are flexible installment payment plans available?",
        answer: "Yes, we provide flexible installment payment options allowing students to spread tuition across the duration of their training program."
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
      { label: "Operational Cost Cut", value: "35%+", subtext: "Average savings via automation" },
      { label: "Software ROI", value: "3x - 5x", subtext: "Over 12-month transformation" },
      { label: "Advisory Hours", value: "1,000+", subtext: "Delivered to enterprise executives" },
      { label: "Client Retention", value: "98%", subtext: "Long-term retainer relationships" }
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
