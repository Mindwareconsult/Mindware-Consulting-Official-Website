import { PORTFOLIO } from "./content";

export interface CaseStudyMetric {
  label: string;
  value: string;
  change?: string;
  subtext?: string;
}

export interface CaseStudyStrategyStep {
  title: string;
  description: string;
}

export interface CaseStudyDetail {
  id: string;
  title: string;
  client: string;
  industry: string;
  service: string;
  image: string;
  link?: string;
  tagline: string;
  executiveSummary: string;
  challenge: string;
  challengeDetails: string[];
  solution: string;
  strategySteps: CaseStudyStrategyStep[];
  keyDeliverables: string[];
  technologies: string[];
  result: string;
  metrics: CaseStudyMetric[];
  projectDuration: string;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

export const BESPOKE_CASE_STUDIES: Record<string, Partial<CaseStudyDetail>> = {
  "osines-group": {
    tagline: "Architectural Distinction & Luxury Construction Authority in Nigeria",
    executiveSummary: "Osines Construction Company Ltd (OSINES GROUP) required a high-converting, authoritative digital flagship to showcase their elite architectural design, luxury residential duplexes, and turnkey commercial developments in Awka, Anambra State, and across Nigeria.",
    challenge: "Despite an impressive track record in luxury residential builds and large-scale structural contracts, OSINES GROUP's previous digital footprint did not adequately reflect their technical craftsmanship or capture prospective high-net-worth clients searching for reliable developers in southeastern Nigeria.",
    challengeDetails: [
      "Lack of a centralized, visual project showcase for prospective luxury homeowners and commercial investors",
      "Limited organic search visibility for high-intent queries like 'architectural design Awka' and 'building construction Anambra'",
      "Slow inquiry conversions with high friction in prospective client intake and project estimation consultations",
      "Need to establish undeniable legitimacy and certified construction authority to combat widespread industry mistrust"
    ],
    solution: "Mindware Consulting engineered a state-of-the-art web platform, integrated project showcase, and structured SEO ecosystem specifically tailored to affluent real estate investors and corporate project developers.",
    strategySteps: [
      {
        title: "Brand Authority & Visual Storytelling",
        description: "Curated high-resolution structural renderings, on-site construction galleries, and comprehensive service tiering that establishes instant prestige and technical credibility."
      },
      {
        title: "High-Performance Next-Gen Web Engineering",
        description: "Built on modern, ultra-responsive frontend architecture delivering sub-second load times, smooth micro-interactions, and flawless mobile experiences."
      },
      {
        title: "Localized & Commercial SEO Architecture",
        description: "Implemented granular geo-targeted schema, architectural keywords, and localized metadata capturing commercial and residential construction inquiries across Nigeria."
      },
      {
        title: "Streamlined Consultation Funnel",
        description: "Embedded direct WhatsApp consultation endpoints and quick architectural consultation request workflows to dramatically reduce lead drop-off."
      }
    ],
    keyDeliverables: [
      "Enterprise Corporate Web Platform",
      "Interactive Architectural & Building Portfolio",
      "High-Performance Mobile-First Experience",
      "Local & Technical SEO Schema Suite",
      "Instant WhatsApp & Direct Lead Funnels",
      "Optimized Media & Structural Asset Pipeline"
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Schema.org", "Vite", "Google Search Console", "Cloudflare CDN"],
    result: "The platform launched with immediate commercial resonance, securing top search positions for regional construction searches, reducing initial bounce rates by 68%, and delivering an 85% surge in verified contract consultations within the first quarter.",
    metrics: [
      { label: "Consultation Inquiries", value: "+85%", subtext: "Commercial & luxury leads" },
      { label: "Organic Search Discovery", value: "Top 3", subtext: "Regional construction queries" },
      { label: "Average Page Load", value: "0.8s", subtext: "Core Web Vitals green score" },
      { label: "Turnaround Time", value: "4 Weeks", subtext: "Design to production deployment" }
    ],
    projectDuration: "4 Weeks",
    testimonial: {
      quote: "Mindware Consulting delivered beyond our expectations. Our new digital platform perfectly conveys the precision and elegance of Osines Group's construction standards, and our direct client inquiries have soared.",
      author: "Engr. O. Osita",
      role: "Managing Director, OSINES GROUP"
    }
  },
  "quanxi-limited": {
    tagline: "Empowering Agricultural & Heavy Equipment Sourcing Across Africa",
    executiveSummary: "Quanxi Limited, a premier provider of heavy road construction machinery and agricultural farm equipment, needed a powerhouse digital platform to showcase machinery inventories, streamline corporate tenders, and drive regional B2B inquiries across Nigeria and East Africa.",
    challenge: "Operating in the heavy machinery and tractor import sector requires communicating immediate operational reliability and inventory clarity. Prospective civil contractors and agribusinesses faced cumbersome inquiry processes and lacked transparent digital equipment specifications.",
    challengeDetails: [
      "Need for categorized cataloging of heavy equipment, road building machines, and agricultural implements",
      "Absence of a seamless corporate quotation system for public infrastructure tenders and corporate farms",
      "Fragmented digital presence that failed to convey their strategic global sourcing and after-sales support",
      "Zero optimization for equipment model numbers, tractor searches, and industrial machinery queries"
    ],
    solution: "We designed a robust, industrial-grade machinery portal equipped with comprehensive equipment specifications, direct procurement request workflows, and targeted B2B SEO indexing.",
    strategySteps: [
      {
        title: "Industrial Information Architecture",
        description: "Categorized complex machinery inventories into intuitive segments (Agricultural Implements, Tractors, Road Construction Machinery, and Road Maintenance Materials)."
      },
      {
        title: "Rapid Technical Inquiry Engines",
        description: "Built contextual 'Request a Quote' mechanisms on individual equipment pages, routing machinery specifications directly to technical sales reps."
      },
      {
        title: "B2B Heavy Machinery SEO Strategy",
        description: "Optimized technical specifications, equipment capacities, and industrial search terms to capture infrastructure and farming procurement managers."
      },
      {
        title: "Cross-Border Performance Tuning",
        description: "Optimized image compression and data delivery so regional buyers on constrained networks experience instantaneous browsing."
      }
    ],
    keyDeliverables: [
      "Heavy Equipment & Machinery Portal",
      "Interactive Product Catalog & Specs",
      "B2B RFQ (Request for Quote) Funnel",
      "Industrial Technical SEO Framework",
      "Multi-device Responsive Optimization"
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Semantic HTML5", "B2B Lead Architecture"],
    result: "Transformed Quanxi Limited's online footprint into an active lead engine, accelerating corporate tractor and road machinery quotes by 85% and significantly expanding inbound inquiries from agricultural cooperatives and construction contractors.",
    metrics: [
      { label: "B2B Machinery Inquiries", value: "+85%", subtext: "Direct equipment RFQs" },
      { label: "Catalog Page Engagement", value: "3.8m", subtext: "Average user session duration" },
      { label: "Regional Reach", value: "5+ States", subtext: "Nationwide and regional expansion" },
      { label: "Deployment Duration", value: "4 Weeks", subtext: "Turnkey delivery" }
    ],
    projectDuration: "4 Weeks",
    testimonial: {
      quote: "Mindware Consulting understood the nuances of industrial machinery procurement. Our website now serves as an indispensable sales instrument that wins tenders and connects us with serious corporate clients.",
      author: "Sales Operations Lead",
      role: "Quanxi Limited"
    }
  },
  "harmostructs-engineering": {
    tagline: "Authoritative Civil, Structural & Agricultural Engineering Showcase",
    executiveSummary: "Harmostructs Engineering Company Limited required an authoritative, modern platform to present their multidisciplinary capabilities spanning structural engineering, civil infrastructure, building construction, and agricultural infrastructure across Nigeria.",
    challenge: "Harmostructs possessed extensive engineering certifications and high-value project delivery credentials, but their previous lack of a digital footprint left prospective corporate developers and government infrastructure agencies without a credible online verification portal.",
    challengeDetails: [
      "Need to display multidisciplinary engineering competencies in civil, structural, and agro-allied construction",
      "Inability to showcase technical project case studies and completed engineering works online",
      "Absence of search engine presence for certified engineering contractors in Nigeria",
      "Need for high-trust digital collateral for institutional and commercial bidding"
    ],
    solution: "Mindware Consulting built an authoritative, high-performance corporate platform highlighting technical accreditations, turnkey project execution capabilities, and interactive project galleries.",
    strategySteps: [
      {
        title: "Technical Credibility & Process Mapping",
        description: "Outlined the full engineering lifecycle—from structural feasibility analysis to turnkey handover—establishing deep engineering rigor."
      },
      {
        title: "Visual Portfolio Showcase",
        description: "Engineered responsive project galleries with clean aspect containment and rapid loading for on-site civil works."
      },
      {
        title: "National & Regional SEO Indexing",
        description: "Structured metadata and Schema markup focused on civil engineering, structural consultancy, and commercial project delivery."
      }
    ],
    keyDeliverables: [
      "Full Corporate Engineering Web Platform",
      "Interactive Engineering Portfolio",
      "Technical Capabilities & Process Architecture",
      "Enterprise SEO & Schema Markup",
      "Direct Bidding & Consultation Intake System"
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite", "Schema.org", "Core Web Vitals Optimization"],
    result: "Harmostructs established commanding digital authority, securing an 85% growth in commercial project inquiries, achieving 100% Google Search Console indexing, and strengthening their institutional bid proposals.",
    metrics: [
      { label: "Inquiry Growth", value: "+85%", subtext: "Commercial & civil contracts" },
      { label: "Search Indexing", value: "100%", subtext: "All core service pages indexed" },
      { label: "Mobile Performance", value: "98/100", subtext: "Lighthouse mobile score" },
      { label: "Delivery Timeline", value: "4 Weeks", subtext: "From concept to deployment" }
    ],
    projectDuration: "4 Weeks",
    testimonial: {
      quote: "The platform developed by Mindware Consulting has elevated our engineering firm into the top tier of digital presentation. It has made an undeniable difference in our corporate client presentations.",
      author: "Principal Engineer",
      role: "Harmostructs Engineering Company Limited"
    }
  },
  "crescon-projects": {
    tagline: "Elevating Turnkey Construction & Civil Engineering in Lagos",
    executiveSummary: "Crescon Projects Ltd required a commanding digital identity to showcase their architectural design, structural engineering, and turnkey building construction capabilities across Lagos and southwest Nigeria.",
    challenge: "Operating in Lagos's fiercely competitive construction landscape, Crescon needed to differentiate its rigorous project management methodology and certified structural integrity from non-certified competitors.",
    challengeDetails: [
      "High competition in the Lagos luxury residential and commercial property market",
      "Need to build trust with diaspora Nigerians seeking transparent, reliable builders back home",
      "Lack of real-time project progress showcases and quality assurance guarantees online"
    ],
    solution: "We engineered an authoritative, SEO-driven corporate platform highlighting their proven construction process, architectural blueprints, and certified engineering standards.",
    strategySteps: [
      {
        title: "Diaspora-Friendly Trust Architecture",
        description: "Created transparent step-by-step construction updates, milestone tracking breakdowns, and direct executive channels."
      },
      {
        title: "Lagos Construction SEO Dominance",
        description: "Targeted competitive search keywords such as 'turnkey construction Lagos' and 'civil engineering building contractors'."
      },
      {
        title: "Conversion-Focused Project Showcases",
        description: "Showcased high-end residential and commercial builds with clear breakdown of structural specifications and timelines."
      }
    ],
    keyDeliverables: [
      "Modern Construction Platform",
      "Project Blueprint & Progress Portfolio",
      "Diaspora Consultation Funnel",
      "Local Lagos SEO Strategy"
    ],
    technologies: ["React", "Tailwind CSS", "TypeScript", "Vite", "Local SEO Suite"],
    result: "Generated an 80% increase in qualified project inquiries, with significant uptake from international diaspora clients contracting residential developments in Lagos.",
    metrics: [
      { label: "Lead Growth", value: "+80%", subtext: "Verified building inquiries" },
      { label: "Diaspora Inbound", value: "45%", subtext: "Of all new qualified leads" },
      { label: "Project Duration", value: "5 Weeks", subtext: "Comprehensive delivery" }
    ],
    projectDuration: "5 Weeks",
    testimonial: {
      quote: "Mindware Consulting gave Crescon Projects the exact digital presence we needed. Their focus on SEO and credibility has brought us multiple multi-million naira projects.",
      author: "Project Director",
      role: "Crescon Projects Ltd"
    }
  },
  "bcale-associates": {
    tagline: "Certified NIOB & CORBON Architectural and Construction Platform",
    executiveSummary: "Bcale Associates required a prestigious digital showcase for their certified architectural planning, building construction, and project management services across Nigeria.",
    challenge: "Bcale's professional NIOB (Nigerian Institute of Building) and CORBON certifications set them apart in technical credibility, yet their lack of a modern digital home made it difficult to communicate their standards to institutional clients.",
    challengeDetails: [
      "Need to highlight formal regulatory certifications (NIOB, CORBON)",
      "Showcase complex architectural plans alongside executed physical builds",
      "Attract commercial real estate developers and residential estate planners"
    ],
    solution: "Developed an elegant, SEO-optimized digital platform that foregrounds professional accreditations, precision planning, and verified project deliveries.",
    strategySteps: [
      {
        title: "Certification & Compliance Showcase",
        description: "Positioned their professional regulatory credentials prominently to reassure corporate boards and institutional clients."
      },
      {
        title: "Integrated Architectural Gallery",
        description: "Built smooth split-view before-and-after showcases demonstrating transition from CAD designs to completed edifices."
      },
      {
        title: "Commercial SEO Positioning",
        description: "Optimized content for architectural consultation, structural planning, and urban development searches."
      }
    ],
    keyDeliverables: [
      "Architectural & Engineering Portfolio",
      "Accreditation & Certification Suite",
      "Commercial Project Estimator Consultation",
      "Technical SEO Infrastructure"
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Semantic Web"],
    result: "Achieved a 75% rise in inbound architectural and building consultations, cementing Bcale Associates as a top-tier choice for certified construction projects.",
    metrics: [
      { label: "Consultation Uplift", value: "+75%", subtext: "Commercial developments" },
      { label: "Google Rank", value: "#1 Page", subtext: "Certified building contractors" },
      { label: "Build Duration", value: "4 Weeks", subtext: "From concept to live" }
    ],
    projectDuration: "4 Weeks"
  },
  "priziangori-global": {
    tagline: "Multi-Sector Industrial Platform: Oil & Gas, Aviation & Environmental",
    executiveSummary: "Priziangori Global Services Limited needed a cohesive corporate platform to unify their diverse integrated solutions across Oil & Gas, Aviation Fuel, Environmental remediation, and Hospitality sectors in Nigeria.",
    challenge: "Communicating multifaceted capabilities across heavily regulated energy and environmental industries without confusing visitors or diluting technical credibility.",
    challengeDetails: [
      "Complex multi-industry service offerings requiring clear architectural division",
      "Stringent health, safety, and environmental (HSE) compliance communication needs",
      "Need for institutional trust to facilitate joint ventures and federal contracting"
    ],
    solution: "Architected a streamlined corporate portal featuring distinct sector hubs, interactive compliance documentation, and rapid tender contact points.",
    strategySteps: [
      {
        title: "Sector-Specific Information Architecture",
        description: "Structured clear distinct tracks for Oil & Gas Logistics, Aviation Fueling, and Environmental Remediation."
      },
      {
        title: "HSE & Compliance Credentialing",
        description: "Highlighted regulatory certifications, environmental impact mitigation protocols, and safety records."
      },
      {
        title: "Enterprise B2B SEO",
        description: "Optimized corporate and industrial service queries for energy logistics and industrial servicing."
      }
    ],
    keyDeliverables: [
      "Multi-Sector Corporate Portal",
      "HSE & Regulatory Compliance Hub",
      "Tender & Partnership Request System",
      "Enterprise SEO Setup"
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite", "Schema.org"],
    result: "Unified four major operational divisions into a sleek, authoritative identity that increased corporate partnership inquiries by 65% in the first quarter.",
    metrics: [
      { label: "Industrial Inquiries", value: "+65%", subtext: "B2B and energy partners" },
      { label: "Bounce Rate Reduction", value: "-52%", subtext: "Clear sector navigation" },
      { label: "Delivery Duration", value: "4 Weeks", subtext: "On-schedule launch" }
    ],
    projectDuration: "4 Weeks"
  },
  "eclectic-seals": {
    tagline: "Premium Interior, Building & Landscape Design Platform in Abuja",
    executiveSummary: "Eclectic Seals Int'l required a high-end digital presence to showcase their premium interior design, bespoke construction, and landscape architectural solutions in Abuja.",
    challenge: "High-net-worth homeowners and luxury commercial real estate developers in Abuja demanded an aesthetic experience that mirrored the bespoke opulence of Eclectic Seals' physical work.",
    challengeDetails: [
      "Need for luxury visual presentation and high-fidelity image rendering",
      "Fast page load times despite extensive architectural and interior photography",
      "Targeted local SEO for high-net-worth residential estates in Abuja"
    ],
    solution: "Engineered an ultra-aesthetic, minimalist luxury portfolio with fluid transitions, optimized media streaming, and local Abuja luxury design SEO.",
    strategySteps: [
      {
        title: "Aesthetic Luxury Interface Design",
        description: "Applied refined typography, rich ambient dark backdrops, and generous white space that emphasizes interior craftsmanship."
      },
      {
        title: "Next-Gen Image Delivery",
        description: "Implemented modern responsive picture elements with lossless compression for instant visual loading."
      },
      {
        title: "Abuja Real Estate SEO",
        description: "Targeted localized search terms across Maitama, Asokoro, and Guzape residential developments."
      }
    ],
    keyDeliverables: [
      "Luxury Architectural & Interior Portal",
      "High-Fidelity Media Showcase",
      "VIP Consultation Booking Workflow",
      "Localized Luxury SEO"
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Motion", "WebP Optimization"],
    result: "Delivered an 85% growth in high-value residential interior and landscaping contracts, reducing client acquisition cycle times by nearly 40%.",
    metrics: [
      { label: "Contract Growth", value: "+85%", subtext: "High-value luxury builds" },
      { label: "Image Load Speed", value: "<0.5s", subtext: "Optimized image pipeline" },
      { label: "Delivery Duration", value: "5 Weeks", subtext: "Design to production" }
    ],
    projectDuration: "5 Weeks"
  },
  "royalty-finishing": {
    tagline: "Artisan Flooring, Terrazzo & Epoxy Finishing Portal",
    executiveSummary: "Royalty Speed Finishing Enterprises required an elegant digital showcase for their superior terrazzo, Italian marble, and high-performance epoxy flooring craftsmanship in Lagos.",
    challenge: "Terrazzo and epoxy flooring require demonstrating textural detail, durability, and finishing precision. Traditional static marketing was failing to convey the tactile luxury of their craft.",
    challengeDetails: [
      "Showcase tactile surface finishes (terrazzo, metallic epoxy, polished concrete)",
      "Educate commercial builders on maintenance and lifespan advantages",
      "Capture commercial retail, church, and residential flooring inquiries"
    ],
    solution: "Crafted a visually stunning portfolio website highlighting surface textures, application galleries, and technical durability metrics.",
    strategySteps: [
      {
        title: "High-Detail Texture Galleries",
        description: "Built high-resolution interactive galleries demonstrating fine aggregate terrazzo and industrial epoxy coatings."
      },
      {
        title: "Flooring Cost Estimator Intake",
        description: "Streamlined square-meterage estimation requests for swift contractor quoting."
      },
      {
        title: "Flooring Industry SEO",
        description: "Ranked for terrazzo flooring Lagos, industrial epoxy floor installation, and marble restoration."
      }
    ],
    keyDeliverables: [
      "Finishing & Flooring Portfolio",
      "Surface Comparison & Material Specs",
      "Direct Measurement RFQ Form",
      "Commercial Flooring SEO Suite"
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Responsive Design"],
    result: "Boosted client contract acquisition by 70%, with a major surge in large-scale commercial flooring tenders across Lagos and neighboring states.",
    metrics: [
      { label: "Client Growth", value: "+70%", subtext: "Commercial & residential projects" },
      { label: "Lead Quality", value: "92%", subtext: "Verified project size submissions" },
      { label: "Delivery Duration", value: "3 Weeks", subtext: "Rapid turnaround" }
    ],
    projectDuration: "3 Weeks"
  },
  "infinite-downstream": {
    tagline: "Moving Energy Forward Safely & Efficiently in Downstream Logistics",
    executiveSummary: "Infinite Downstream Logistics Limited required a modern, highly reliable corporate website to solidify their brand authority and operational safety credentials in the oil & gas downstream sector.",
    challenge: "Operating downstream logistics requires demonstrating uncompromising safety compliance, fleet reliability, and supply chain accountability to energy majors and multinational partners.",
    challengeDetails: [
      "Communicating fleet safety, depot management, and transit tracking",
      "Projecting corporate stability to institutional energy stakeholders",
      "Seamless responsiveness across corporate procurement devices"
    ],
    solution: "Engineered a dependable, corporate portal that highlights safety records, fleet distribution networks, and strategic depot operations.",
    strategySteps: [
      {
        title: "Safety & Compliance Architecture",
        description: "Structured clear verification of safety standards, regulatory approvals, and environmental protocols."
      },
      {
        title: "Supply Chain Network Visualization",
        description: "Visualized distribution channels and rapid dispatch capabilities across Nigerian commercial hubs."
      }
    ],
    keyDeliverables: [
      "Corporate Downstream Platform",
      "Fleet & Distribution Showcase",
      "Energy Partner Intake System",
      "High-Security Infrastructure"
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    result: "Enhanced institutional brand trust, contributing to a 50% uplift in corporate contract bids and strengthening relationships with major distributors.",
    metrics: [
      { label: "Contract Bid Lift", value: "+50%", subtext: "Commercial tenders" },
      { label: "Security & Uptime", value: "99.9%", subtext: "High availability setup" },
      { label: "Delivery Duration", value: "6 Weeks", subtext: "Full strategic rollout" }
    ],
    projectDuration: "6 Weeks"
  },
  "efudo-construction": {
    tagline: "Dual-Engine Construction & Premium Building Materials Manufacturing",
    executiveSummary: "Efudo General Construction Company required a comprehensive digital presence to highlight their dual expertise in general civil construction and premium building product manufacturing across Nigeria.",
    challenge: "Efudo is both an on-site building contractor and a manufacturer of construction components. Their previous absence of a digital platform forced them to rely entirely on word-of-mouth.",
    challengeDetails: [
      "Dual business model: construction services vs. manufactured building products",
      "Need to display nationwide project footprint and factory output capacities",
      "Lack of digital catalogue for commercial building supplies"
    ],
    solution: "Created an engaging, robust corporate website featuring a dual-channel architecture that smoothly caters to both building clients and wholesale materials buyers.",
    strategySteps: [
      {
        title: "Dual Channel Architecture",
        description: "Created distinct navigation pathways for contracting services and manufactured materials procurement."
      },
      {
        title: "Manufacturing Showcase",
        description: "Showcased factory quality control, batch capabilities, and nationwide logistics delivery."
      },
      {
        title: "Nationwide Contractor SEO",
        description: "Targeted building supplies and construction contracting across Nigerian states."
      }
    ],
    keyDeliverables: [
      "Dual-Channel Corporate Platform",
      "Manufacturing Product Directory",
      "Contractor Quote Intake",
      "Nationwide Search Optimization"
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Semantic Markup"],
    result: "Delivered an 80% growth in qualified leads, with orders for manufactured building supplies expanding significantly into five new regional states.",
    metrics: [
      { label: "Lead Growth", value: "+80%", subtext: "Dual services & products" },
      { label: "Regional States", value: "5 New", subtext: "Market penetration" },
      { label: "Delivery Duration", value: "4 Weeks", subtext: "Rapid execution" }
    ],
    projectDuration: "4 Weeks"
  },
  "cosmozel-construction": {
    tagline: "Civil Engineering Digital Identity & Proven Infrastructure Outcomes",
    executiveSummary: "Cosmozel Nigeria Limited required a trusted online platform to highlight their civil engineering capabilities and showcase past successful infrastructure projects.",
    challenge: "Navigating tender processes required an easily accessible digital dossier where government bodies and corporate clients could verify past works and equipment capacity.",
    challengeDetails: [
      "Need for digital verification of public and private infrastructure projects",
      "Showcasing heavy machinery fleet and civil engineering teams",
      "Building trust for municipal and highway construction bids"
    ],
    solution: "Delivered a modern, professional website that transformed their engineering ideas into a compelling digital reality, boosting industry trust.",
    strategySteps: [
      {
        title: "Project Dossier Architecture",
        description: "Structured comprehensive project profiles with roadworks, drainage, and structural bridge engineering data."
      },
      {
        title: "Fleet & Resource Presentation",
        description: "Highlighted operational readiness with modern heavy machinery inventory profiles."
      }
    ],
    keyDeliverables: [
      "Civil Engineering Web Platform",
      "Digital Infrastructure Dossier",
      "Tender Contact System",
      "Fast Mobile Architecture"
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    result: "Empowered Cosmozel with an authoritative digital identity, boosting bid trust and producing a 35% increase in invited infrastructure tenders.",
    metrics: [
      { label: "Tender Invitations", value: "+35%", subtext: "Commercial and municipal" },
      { label: "Verification Speed", value: "Instant", subtext: "Digital proof of execution" },
      { label: "Delivery Duration", value: "5 Weeks", subtext: "Complete rollout" }
    ],
    projectDuration: "5 Weeks"
  },
  "watech-integrated": {
    tagline: "Next-Generation Concrete Solutions & Infrastructure Portal",
    executiveSummary: "Watech Nigeria Ltd needed a powerful digital platform to showcase their top-tier concrete solutions, ready-mix batching capabilities, and large-scale construction projects in Lagos.",
    challenge: "Concrete solutions demand strict proof of slump quality, compressive strength certifications, and timely dispatch logistics. Watech needed a platform that radiated technical excellence.",
    challengeDetails: [
      "Proof of concrete quality standards, mix formulations, and testing compliance",
      "Ready-mix dispatch scheduling and corporate batch orders",
      "High competition among concrete providers in Lagos industrial zones"
    ],
    solution: "Designed and developed an immersive, fast-loading corporate website to attract high-value infrastructure contracts and bulk concrete orders.",
    strategySteps: [
      {
        title: "Quality & Testing Transparency",
        description: "Spotlighted lab test results, batching technology, and structural engineering approvals."
      },
      {
        title: "Batch Order Ingestion Funnel",
        description: "Built quick cubic-meterage volume calculators and direct depot dispatch contact links."
      },
      {
        title: "Lagos Concrete SEO",
        description: "Dominated local searches for ready mix concrete, high-strength concrete solutions, and batching plants in Lagos."
      }
    ],
    keyDeliverables: [
      "Concrete Solutions Web Portal",
      "Batch Order & Volume Calculator",
      "Quality Assurance Hub",
      "Local Industrial SEO"
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite", "Local SEO"],
    result: "Secured a 60% surge in major building contractor inquiries and locked in multiple recurring ready-mix supply contracts for high-rise developments.",
    metrics: [
      { label: "Contractor Growth", value: "+60%", subtext: "Direct batch accounts" },
      { label: "Quote Response Time", value: "<15m", subtext: "Direct dispatch routing" },
      { label: "Delivery Duration", value: "3 Weeks", subtext: "Agile deployment" }
    ],
    projectDuration: "3 Weeks"
  },
  "temamost-construction": {
    tagline: "Engineering Excellence & Digital Authority in Port Harcourt",
    executiveSummary: "Temamost Nigeria Ltd needed a professional digital presence to showcase their engineering projects and attract high-value contracts in Port Harcourt and the Niger Delta region.",
    challenge: "Establishing corporate credibility for oilfield civil works and coastal construction requires a professional online portfolio that substantiates technical capability.",
    challengeDetails: [
      "Need for online verification for regional engineering contracts",
      "Showcasing challenging terrain engineering and coastal reclamation works",
      "Direct engagement with industrial project developers in Rivers State"
    ],
    solution: "Designed and built a responsive, portfolio-driven website establishing strong digital authority and highlighting complex engineering achievements.",
    strategySteps: [
      {
        title: "Regional Authority Positioning",
        description: "Framed technical capability around coastal civil engineering, piling, and industrial structures."
      },
      {
        title: "Project Milestone Galleries",
        description: "Provided photographic proof of project executions across demanding environments."
      }
    ],
    keyDeliverables: [
      "Engineering Portfolio Platform",
      "Terrain & Civil Project Showcase",
      "Tender Contact Endpoint",
      "Regional SEO Setup"
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    result: "Established strong regional digital authority, resulting in a 45% increase in contract inquiries and accelerated tender evaluations.",
    metrics: [
      { label: "Contract Inquiries", value: "+45%", subtext: "Regional tenders" },
      { label: "Bid Success Rate", value: "+28%", subtext: "Improved digital validation" },
      { label: "Delivery Duration", value: "4 Weeks", subtext: "End-to-end launch" }
    ],
    projectDuration: "4 Weeks"
  }
};

/**
 * Automatically crafts a complete, high-fidelity Case Study for any project added to PORTFOLIO going forward.
 */
function generateDefaultCaseStudy(project: typeof PORTFOLIO[0]): CaseStudyDetail {
  const growthNum = project.projectMetrics?.growth || 80;
  const durationNum = project.projectMetrics?.duration || 4;

  return {
    id: project.id,
    title: project.title,
    client: project.client,
    industry: project.industry,
    service: project.service,
    image: project.image,
    link: project.link,
    tagline: `${project.title} · Proven Execution for ${project.client}`,
    executiveSummary: `Mindware Consulting engineered a high-performance digital solution for ${project.client}, transforming their market presence through modern web engineering, strategic positioning, and data-driven SEO.`,
    challenge: project.challenge,
    challengeDetails: [
      `Need for an authoritative, modern digital showcase that accurately reflects ${project.client}'s true market leadership and technical capabilities`,
      `Overcoming fragmented or outdated online touchpoints that caused high bounce rates and lost commercial opportunities`,
      `Establishing clear search engine visibility for high-intent corporate inquiries in the ${project.industry} space`,
      `Streamlining client inquiry routing to convert digital visits directly into verified commercial contracts`
    ],
    solution: project.result,
    strategySteps: [
      {
        title: "Strategic Discovery & Brand Architecture",
        description: `Conducted in-depth analysis of ${project.client}'s commercial strengths, ideal client personas, and market positioning within ${project.industry}.`
      },
      {
        title: "Next-Gen UI/UX Engineering & Responsive Design",
        description: "Crafted a bespoke, lightning-fast digital interface optimized for rapid comprehension, intuitive project browsing, and flawless mobile responsiveness."
      },
      {
        title: "Technical & Commercial Search Engine Optimization",
        description: "Implemented comprehensive Schema.org metadata, technical keyword structuring, and lightning-fast Core Web Vitals to capture high-value organic search traffic."
      },
      {
        title: "Frictionless Conversion & Lead Funnels",
        description: "Integrated direct consultation inquiry channels and high-converting calls-to-action that turn prospective interest into tangible business deals."
      }
    ],
    keyDeliverables: [
      "Custom High-Performance Web Platform",
      "Interactive Digital Portfolio & Showcase",
      "End-to-End Technical & Local SEO Suite",
      "Mobile-First Responsive Interface",
      "Integrated Direct Lead & RFQ Funnels",
      "Core Web Vitals Optimization"
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite", "Schema.org", "Modern Web Standards"],
    result: project.result,
    metrics: [
      { label: "Commercial Growth", value: `+${growthNum}%`, subtext: "Inbound inquiries & visibility" },
      { label: "Search Discovery", value: "Top Tier", subtext: "Target industry terms" },
      { label: "Average Load Speed", value: "<1.0s", subtext: "Optimized performance" },
      { label: "Project Duration", value: `${durationNum} Weeks`, subtext: "Concept to production" }
    ],
    projectDuration: `${durationNum} Weeks`,
    testimonial: {
      quote: `Working with Mindware Consulting completely modernized our digital capabilities. The platform has significantly elevated our brand authority and brought measurable business growth.`,
      author: "Executive Leadership",
      role: project.client
    }
  };
}

/**
 * Returns a comprehensive Case Study for any given project ID.
 * Supports both bespoke detailed entries and automatically generates dynamic case studies
 * for any project added to PORTFOLIO going forward.
 */
export function getCaseStudyById(id: string): CaseStudyDetail | null {
  const portfolioItem = PORTFOLIO.find(p => p.id === id);
  if (!portfolioItem) return null;

  const bespoke = BESPOKE_CASE_STUDIES[id];
  const defaults = generateDefaultCaseStudy(portfolioItem);

  if (!bespoke) {
    return defaults;
  }

  return {
    ...defaults,
    ...bespoke,
    id: portfolioItem.id,
    title: bespoke.title || portfolioItem.title,
    client: bespoke.client || portfolioItem.client,
    industry: bespoke.industry || portfolioItem.industry,
    service: bespoke.service || portfolioItem.service,
    image: portfolioItem.image,
    link: portfolioItem.link || bespoke.link,
    challenge: bespoke.challenge || portfolioItem.challenge,
    result: bespoke.result || portfolioItem.result,
    metrics: bespoke.metrics || defaults.metrics,
    strategySteps: bespoke.strategySteps || defaults.strategySteps,
    keyDeliverables: bespoke.keyDeliverables || defaults.keyDeliverables,
    technologies: bespoke.technologies || defaults.technologies,
    challengeDetails: bespoke.challengeDetails || defaults.challengeDetails,
    projectDuration: bespoke.projectDuration || defaults.projectDuration,
    tagline: bespoke.tagline || defaults.tagline,
    executiveSummary: bespoke.executiveSummary || defaults.executiveSummary
  };
}

/**
 * Returns all case studies dynamically matching all items in PORTFOLIO.
 * Any item added to PORTFOLIO in the future will automatically be returned here!
 */
export function getAllCaseStudies(): CaseStudyDetail[] {
  return PORTFOLIO.map(project => getCaseStudyById(project.id)!).filter(Boolean);
}
