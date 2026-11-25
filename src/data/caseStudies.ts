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
  objectives: string[];
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
  "solugans-construction": {
    tagline: "Civil Engineering, Architectural Design & Turnkey Construction Flagship in Awka, Nigeria",
    executiveSummary:
      "Solugans & Associates Engineering Ltd (RC 1207219), a registered civil and structural engineering, architectural design, and turnkey building construction firm based in Awka, Anambra State, engaged Mindware Consulting to build a structured digital flagship that reflects its completed commercial, residential, and institutional track record.",
    challenge:
      "Despite extensive multi-storey commercial plaza, residential, and structural steel frame experience, Solugans & Associates lacked a dedicated digital platform to present verified capabilities, COREN-registered engineering leadership, and structured tender consultation workflows to commercial developers and diaspora investors.",
    challengeDetails: [
      "No centralized mobile-friendly portfolio exhibiting completed residential, commercial, and structural works across southeastern Nigeria",
      "Difficulty distinguishing COREN-registered engineering competence from informal contractors online",
      "Limited search engine coverage for regional construction queries across Awka and Anambra State",
      "High friction for prospective clients attempting to submit drawings, BOQ inquiries, or consultation briefs"
    ],
    objectives: [
      "Establish a credible corporate platform reflecting COREN-registered civil and structural engineering standards",
      "Organize multi-disciplinary construction works into navigable category showcases for institutional and diaspora buyers",
      "Deploy direct BOQ quotation intake and structured WhatsApp consultation pathways",
      "Implement technical SEO and ProfessionalService schema targeting Awka, Anambra State, and southeastern Nigeria"
    ],
    solution:
      "Mindware Consulting designed and engineered a fast, mobile-first corporate flagship featuring categorized project galleries, engineering accreditation visibility, interactive quotation intake workflows, and structured regional SEO schema.",
    strategySteps: [
      {
        title: "Architectural & Engineering Brand Positioning",
        description:
          "Established an authoritative visual hierarchy combining clear project photography with structured civil engineering and architectural discipline breakdowns."
      },
      {
        title: "Categorized Built-Environment Portfolio",
        description:
          "Organized construction capabilities across commercial plazas, residential buildings, substructure/deep foundation works, and steel frameworks."
      },
      {
        title: "BOQ & Direct Consultation Pathways",
        description:
          "Implemented structured Request for Quotation (RFQ), Bill of Quantities consultation workflows, and direct WhatsApp project routing."
      },
      {
        title: "Technical & Regional Search Foundations",
        description:
          "Configured ProfessionalService JSON-LD structured data, geographic metadata for Awka, and indexed service landing pages."
      }
    ],
    keyDeliverables: [
      "Custom Engineering & Construction Web Platform",
      "Categorized Commercial & Residential Project Showcase",
      "Direct WhatsApp & BOQ Consultation Intake Workflows",
      "Construction & Engineering Schema.org SEO Setup",
      "Mobile-First Responsive Experience",
      "Engineering Accreditation & Compliance Presentation"
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite", "Schema.org ProfessionalService", "Google Search Console"],
    result:
      "Delivered a production corporate flagship within 4 weeks that equips Solugans & Associates with structured regional search readiness, clear capability proof, and low-friction commercial and diaspora consultation pathways.",
    metrics: [
      { label: "Delivered Platform", value: "Live Site", subtext: "Verified production deployment" },
      { label: "Regional SEO Scope", value: "Awka & East", subtext: "Schema & regional keywords" },
      { label: "Lead Capture", value: "BOQ + Chat", subtext: "Structured intake & WhatsApp" },
      { label: "Delivery Timeline", value: "4 Weeks", subtext: "From discovery to launch" }
    ],
    projectDuration: "4 Weeks"
  },
  "juptree-automobile": {
    tagline: "Automotive Dealership Showcase & Responsive Buyer Inventory Architecture in Abuja",
    executiveSummary:
      "Juptree Automobiles, an automotive dealership operating in Abuja, partnered with Mindware Consulting to design and deploy a transparent, responsive digital showroom presenting brand-new and foreign-used vehicles alongside instant WhatsApp inspection and test-drive booking flows.",
    challenge:
      "Automotive buyers and corporate fleet managers in Abuja routinely require verified vehicle listings, transparent specifications, and fast mobile access before visiting a physical lot. Juptree Automobiles needed an authoritative digital platform to build immediate buyer confidence and convert online inquiries.",
    challengeDetails: [
      "Lack of an organized digital inventory catalog allowing buyers to filter SUVs, sedans, buses, and utility trucks online",
      "Widespread buyer skepticism around vehicle authenticity, condition transparency, and dealership credibility",
      "Absence of structured search engine architecture targeting high-intent Abuja dealership queries",
      "Slow manual communication when prospective buyers requested vehicle pricing, walkarounds, or inspections"
    ],
    objectives: [
      "Create a fast, mobile-first automotive showroom that projects trust and dealership professionalism",
      "Structure vehicle categories with clear specs, pricing presentation, and condition visibility",
      "Enable one-click WhatsApp vehicle reservations and inspection scheduling directly from listing views",
      "Configure AutoDealer Schema.org markup and local Abuja automotive SEO foundations"
    ],
    solution:
      "Mindware Consulting built an elite responsive dealership platform pairing categorized vehicle browsing with streamlined inspection request flows and localized Abuja automotive search architecture.",
    strategySteps: [
      {
        title: "Showroom Brand Presentation",
        description:
          "Crafted a high-contrast visual layout highlighting showroom standards, transparent inventory photography, and buyer assurance."
      },
      {
        title: "Categorized Multi-Device Vehicle Catalog",
        description:
          "Engineered fast vehicle filtering across SUVs, sedans, commercial buses, and utility trucks usable seamlessly on mobile devices."
      },
      {
        title: "Contextual WhatsApp Inspection Funnels",
        description:
          "Embedded pre-filled WhatsApp inquiry actions directly on vehicle cards so serious buyers connect with dealership advisors in one tap."
      },
      {
        title: "Abuja Automotive Search Optimization",
        description:
          "Configured AutoDealer structured data, localized metadata, and image optimization for smooth mobile browsing."
      }
    ],
    keyDeliverables: [
      "Responsive Automotive Dealership Web Platform",
      "Categorized Vehicle Inventory Showcase",
      "1-Click WhatsApp Inquiry & Test-Drive Funnels",
      "AutoDealer & LocalBusiness Schema.org Setup",
      "Mobile-First Responsive Design",
      "Optimized Vehicle Media Pipeline"
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite", "Schema.org AutoDealer", "Google Search Console"],
    result:
      "Launched a verified digital dealership flagship within 4 weeks that streamlines buyer inspection scheduling via WhatsApp and establishes searchable authority for Juptree Automobiles in Abuja.",
    metrics: [
      { label: "Platform Architecture", value: "Mobile-First", subtext: "Responsive showroom catalog" },
      { label: "Conversion Flow", value: "1-Tap RFQ", subtext: "Pre-filled WhatsApp inquiries" },
      { label: "SEO Schema", value: "AutoDealer", subtext: "Abuja dealership indexing" },
      { label: "Delivery Timeline", value: "4 Weeks", subtext: "Design to production launch" }
    ],
    projectDuration: "4 Weeks"
  },
  "osines-group": {
    tagline: "Architectural Design & Building Construction Authority in Anambra & Nigeria",
    executiveSummary:
      "Osines Construction Company Ltd (OSINES GROUP) engaged Mindware Consulting to engineer a modern digital flagship highlighting architectural design, luxury residential developments, and turnkey commercial construction across Awka and wider Nigeria.",
    challenge:
      "Prospective property developers and corporate project sponsors needed clear visibility into OSINES GROUP's architectural workmanship and engineering track record alongside straightforward channels to initiate design-and-build consultations.",
    challengeDetails: [
      "Lack of a unified digital showcase presenting residential and commercial construction projects to investors",
      "Limited search engine visibility for regional architectural design and building construction queries",
      "Fragmented inquiry pathways delaying early-stage project consultations",
      "Need to differentiate certified engineering delivery in a trust-sensitive construction market"
    ],
    objectives: [
      "Present architectural concepts and completed builds in a high-trust corporate showcase",
      "Structure regional search optimization covering Awka, Anambra State, and national projects",
      "Reduce friction between initial prospect discovery and direct consultation booking",
      "Ensure dependable mobile usability for local and diaspora real estate clients"
    ],
    solution:
      "Mindware Consulting engineered an authoritative web platform combining high-clarity architectural showcases, structured regional SEO, and direct WhatsApp and consultation intake pathways.",
    strategySteps: [
      {
        title: "Brand Authority & Visual Presentation",
        description:
          "Curated architectural renderings and construction project imagery paired with structured service positioning."
      },
      {
        title: "Responsive Frontend Engineering",
        description:
          "Built on clean React and TypeScript architecture for consistent cross-device browsing and reliable performance."
      },
      {
        title: "Commercial & Regional SEO Setup",
        description:
          "Implemented localized Schema.org metadata covering architectural planning and turnkey construction services."
      },
      {
        title: "Direct Consultation Routing",
        description:
          "Integrated immediate WhatsApp and project consultation forms to capture prospective builds cleanly."
      }
    ],
    keyDeliverables: [
      "Corporate Construction Web Platform",
      "Architectural & Project Showcase Galleries",
      "Mobile-First Responsive Interface",
      "Technical & Local SEO Schema Suite",
      "Direct WhatsApp & Consultation Funnels"
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Schema.org", "Vite", "Google Search Console"],
    result:
      "Deployed a unified digital headquarters in 4 weeks giving OSINES GROUP a clean, searchable platform to showcase construction capability and convert prospective residential and commercial inquiries.",
    metrics: [
      { label: "Delivered Platform", value: "Live Site", subtext: "Production corporate build" },
      { label: "Search Foundation", value: "Technical SEO", subtext: "Schema & localized metadata" },
      { label: "Lead Capture", value: "Direct CTA", subtext: "Consultation & WhatsApp" },
      { label: "Delivery Timeline", value: "4 Weeks", subtext: "End-to-end delivery" }
    ],
    projectDuration: "4 Weeks"
  },
  "quanxi-limited": {
    tagline: "Agricultural & Road Construction Machinery Sourcing Portal Across Nigeria",
    executiveSummary:
      "Quanxi Limited, a commercial supplier of heavy road construction machinery and agricultural tractors/implements, partnered with Mindware Consulting to build a structured B2B equipment portal facilitating procurement inquiries.",
    challenge:
      "Contractors and agribusiness buyers sourcing high-value machinery require transparent model specifications and clear quotation pathways rather than generic brochure websites.",
    challengeDetails: [
      "Diverse heavy equipment and agricultural machinery lines needing structured categorization",
      "Lack of streamlined digital Request for Quote (RFQ) channels for corporate and public tenders",
      "Low discoverability for model-specific tractor and road machinery search queries",
      "Need to communicate equipment durability and regional procurement readiness"
    ],
    objectives: [
      "Categorize tractors, agricultural implements, and road construction equipment cleanly",
      "Enable direct contextual quotation inquiries directly from equipment categories",
      "Structure technical SEO metadata around industrial and agricultural machinery procurement",
      "Deliver reliable browsing performance across mobile and desktop procurement teams"
    ],
    solution:
      "Mindware Consulting built a structured industrial equipment portal with intuitive machinery segmentation, contextual RFQ workflows, and technical B2B search optimization.",
    strategySteps: [
      {
        title: "Industrial Catalog Architecture",
        description:
          "Organized complex machinery inventories into distinct lines covering tractors, implements, and road construction machinery."
      },
      {
        title: "Contextual Quote Request Flows",
        description:
          "Connected equipment categories directly to structured quotation forms and direct sales routing."
      },
      {
        title: "B2B Machinery SEO Structuring",
        description:
          "Applied descriptive equipment metadata and semantic markup for agricultural and civil procurement searches."
      },
      {
        title: "Network-Conscious Optimization",
        description:
          "Optimized image weights and clean UI hierarchy for dependable viewing across regional mobile networks."
      }
    ],
    keyDeliverables: [
      "Heavy Equipment & Machinery Web Portal",
      "Categorized Catalog & Specifications",
      "B2B RFQ Inquiry System",
      "Industrial SEO Markup",
      "Multi-Device Responsive Experience"
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Semantic HTML5", "Schema.org"],
    result:
      "Delivered a structured digital machinery portal within 4 weeks that clearly presents Quanxi Limited's equipment range and accelerates commercial quotation intake.",
    metrics: [
      { label: "Catalog Structure", value: "Multi-Line", subtext: "Agri & road equipment specs" },
      { label: "Procurement Flow", value: "Direct RFQ", subtext: "Contextual quote intake" },
      { label: "Search Readiness", value: "B2B SEO", subtext: "Indexed equipment pages" },
      { label: "Delivery Timeline", value: "4 Weeks", subtext: "Turnkey execution" }
    ],
    projectDuration: "4 Weeks"
  },
  "harmostructs-engineering": {
    tagline: "Civil, Structural & Agricultural Engineering Capability Showcase",
    executiveSummary:
      "Harmostructs Engineering Company Limited partnered with Mindware Consulting to build a clear, authoritative corporate platform presenting multidisciplinary expertise across structural engineering, civil works, and building construction in Nigeria.",
    challenge:
      "Harmostructs needed an accessible corporate website where institutional developers, private clients, and tender reviewers could verify their multidisciplinary engineering scope online.",
    challengeDetails: [
      "Multidisciplinary engineering services spanning civil, structural, and agro-infrastructure lacked unified digital presentation",
      "Institutional and corporate procurement teams needed an online reference point for capabilities and project history",
      "Absence of structured search indexing for certified structural and civil engineering terms",
      "Lack of direct digital bidding and consultation channels"
    ],
    objectives: [
      "Establish an authoritative digital footprint matching Harmostructs' engineering rigor",
      "Map end-to-end engineering capabilities clearly from feasibility to execution",
      "Create structured consultation and project inquiry intake",
      "Implement semantic Schema.org markup and Google Search Console indexing"
    ],
    solution:
      "Mindware Consulting built a high-clarity engineering flagship highlighting technical scope, delivery methodology, visual galleries, and direct consultation pathways.",
    strategySteps: [
      {
        title: "Engineering Capability Architecture",
        description:
          "Mapped the full engineering lifecycle clearly for commercial developers and infrastructure stakeholders."
      },
      {
        title: "Clean Visual Portfolio Galleries",
        description:
          "Designed responsive project showcases highlighting civil and structural execution."
      },
      {
        title: "Technical SEO & Search Console Alignment",
        description:
          "Structured service metadata and schema targeting civil and structural consultancy queries."
      }
    ],
    keyDeliverables: [
      "Corporate Engineering Web Platform",
      "Responsive Project Gallery",
      "Technical Scope & Methodology Breakdown",
      "Search Console & Schema Setup",
      "Direct Consultation Intake System"
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite", "Schema.org", "Google Search Console"],
    result:
      "Delivered a production corporate engineering flagship in 4 weeks, providing institutional buyers with transparent capability verification and direct tender communication.",
    metrics: [
      { label: "Delivered Platform", value: "Live Site", subtext: "Production engineering portal" },
      { label: "Capability Scope", value: "Multi-Sector", subtext: "Civil, structural & agro works" },
      { label: "Search Indexing", value: "Schema + GSC", subtext: "Structured service indexing" },
      { label: "Delivery Timeline", value: "4 Weeks", subtext: "Concept to deployment" }
    ],
    projectDuration: "4 Weeks"
  },
  "crescon-projects": {
    tagline: "Turnkey Building Construction & Civil Engineering Flagship in Lagos",
    executiveSummary:
      "Crescon Projects Ltd commissioned Mindware Consulting to build an authoritative corporate website presenting architectural design, structural engineering, and turnkey building construction services across Lagos.",
    challenge:
      "In Lagos's competitive construction environment, differentiating legitimate engineering rigor and transparent milestone delivery—especially for diaspora project sponsors—requires authoritative online presentation.",
    challengeDetails: [
      "High market noise in residential and commercial construction across Lagos",
      "Need to communicate transparent process rigor to local and diaspora investors",
      "Absence of structured digital project showcases and direct consultation routing"
    ],
    objectives: [
      "Articulate Crescon's end-to-end architectural and construction delivery methodology clearly",
      "Build credibility with Lagos commercial buyers and international diaspora sponsors",
      "Implement localized Lagos construction SEO and responsive UI performance"
    ],
    solution:
      "Mindware Consulting developed a disciplined corporate construction website foregrounding execution methodology, structural competence, and low-friction inquiry workflows.",
    strategySteps: [
      {
        title: "Process & Trust Architecture",
        description:
          "Presented step-by-step construction stages and quality governance clearly for remote and local clients."
      },
      {
        title: "Lagos Construction SEO Structure",
        description:
          "Configured technical metadata targeting commercial building contractors and civil engineering searches in Lagos."
      },
      {
        title: "Conversion-Focused Project Galleries",
        description:
          "Structured project highlights paired with direct consultation triggers."
      }
    ],
    keyDeliverables: [
      "Corporate Construction Platform",
      "Project Portfolio Showcase",
      "Direct Client Consultation Funnel",
      "Local Lagos SEO Architecture"
    ],
    technologies: ["React", "Tailwind CSS", "TypeScript", "Vite", "Local SEO Suite"],
    result:
      "Completed and launched in 5 weeks, giving Crescon Projects Ltd a high-trust digital headquarters built to support Lagos corporate bids and diaspora residential inquiries.",
    metrics: [
      { label: "Target Market", value: "Lagos & Diaspora", subtext: "Corporate & residential builds" },
      { label: "Process Clarity", value: "Structured UI", subtext: "Step-by-step delivery view" },
      { label: "Delivery Timeline", value: "5 Weeks", subtext: "Full corporate rollout" }
    ],
    projectDuration: "5 Weeks"
  },
  "bcale-associates": {
    tagline: "NIOB & CORBON Certified Architectural & Building Construction Portal",
    executiveSummary:
      "Bcale Associates partnered with Mindware Consulting to craft a credible digital platform showcasing NIOB and CORBON certified architectural planning, building construction, and project management across Nigeria.",
    challenge:
      "Bcale's formal NIOB (Nigerian Institute of Building) and CORBON accreditations represent vital regulatory assurance, yet needed clear digital presentation to command immediate confidence among institutional property developers.",
    challengeDetails: [
      "Regulatory credentials (NIOB, CORBON) lacked prominent online presentation",
      "Architectural planning and executed construction works needed a unified digital portfolio",
      "Need for streamlined project estimation and discovery booking"
    ],
    objectives: [
      "Foreground NIOB and CORBON professional standing cleanly for due diligence reviewers",
      "Exhibit planning-to-execution project capabilities in a clean visual system",
      "Optimize site structure for commercial building and architectural consultancy search"
    ],
    solution:
      "Mindware Consulting designed and launched an SEO-ready corporate website centering certified professional standing, portfolio clarity, and direct project inquiry routing.",
    strategySteps: [
      {
        title: "Regulatory & Accreditation Positioning",
        description:
          "Integrated professional building body credentials cleanly into corporate trust architecture."
      },
      {
        title: "Architectural & Construction Portfolio",
        description:
          "Organized executed projects alongside architectural planning capabilities."
      },
      {
        title: "Search Visibility Structuring",
        description:
          "Configured technical SEO metadata targeting certified building contractors and development advisory."
      }
    ],
    keyDeliverables: [
      "Architectural & Construction Web Platform",
      "Regulatory Credential Presentation",
      "Commercial Inquiry & Consultation Funnel",
      "Technical SEO Infrastructure"
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Semantic Web"],
    result:
      "Launched in 4 weeks as a clear, authoritative digital platform enabling institutional and residential clients to verify Bcale Associates' credentials and initiate consultations smoothly.",
    metrics: [
      { label: "Trust Positioning", value: "NIOB / CORBON", subtext: "Regulatory credential display" },
      { label: "Search Readiness", value: "Technical SEO", subtext: "Indexed service pages" },
      { label: "Delivery Timeline", value: "4 Weeks", subtext: "Concept to production" }
    ],
    projectDuration: "4 Weeks"
  },
  "priziangori-global": {
    tagline: "Multi-Sector Industrial Portal: Oil & Gas, Aviation Fuel & Environmental Services",
    executiveSummary:
      "Priziangori Global Services Limited engaged Mindware Consulting to unify its integrated operations across Oil & Gas support, Aviation Fueling, Environmental remediation, and Hospitality into one authoritative corporate platform.",
    challenge:
      "Communicating diverse technical capabilities across strictly regulated industrial and energy verticals without diluting domain clarity or HSE seriousness.",
    challengeDetails: [
      "Complex multi-sector operations requiring clean architectural division for enterprise visitors",
      "High institutional requirements around HSE stewardship and operational safety",
      "Need for clear partnership and tender communication channels"
    ],
    objectives: [
      "Separate four distinct operational verticals into clear, accessible corporate hubs",
      "Present HSE compliance and safety accountability prominently for joint-venture due diligence",
      "Implement enterprise SEO metadata across industrial service divisions"
    ],
    solution:
      "Mindware Consulting built a structured corporate industrial website featuring clean vertical segmentation, compliance messaging, and direct tender inquiry routing.",
    strategySteps: [
      {
        title: "Multi-Sector Information Architecture",
        description:
          "Designed dedicated sector hubs for Oil & Gas Logistics, Aviation Fueling, Environmental Remediation, and Hospitality."
      },
      {
        title: "HSE & Compliance Positioning",
        description:
          "Featured regulatory readiness and operational safety standards across service views."
      },
      {
        title: "Industrial Search Optimization",
        description:
          "Structured service metadata around energy logistics and corporate environmental servicing."
      }
    ],
    keyDeliverables: [
      "Multi-Sector Corporate Industrial Portal",
      "HSE & Compliance Presentation",
      "Tender & Partnership Intake Channels",
      "Technical SEO Infrastructure"
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite", "Schema.org"],
    result:
      "Unified Priziangori Global Services Limited's four industrial verticals within a 4-week deployment, providing procurement teams and international partners a cohesive corporate reference point.",
    metrics: [
      { label: "Architecture", value: "4 Divisions", subtext: "Oil & Gas, Aviation, Env., Hospitality" },
      { label: "Compliance Focus", value: "HSE Highlighted", subtext: "Enterprise procurement ready" },
      { label: "Delivery Timeline", value: "4 Weeks", subtext: "On-schedule launch" }
    ],
    projectDuration: "4 Weeks"
  },
  "eclectic-seals": {
    tagline: "Luxury Interior, Building & Landscape Architecture Portal in Abuja",
    executiveSummary:
      "Eclectic Seals Int'l engaged Mindware Consulting to build a refined digital showcase presenting luxury interior design, bespoke building works, and landscape architecture in Abuja.",
    challenge:
      "High-net-worth property owners and luxury developers expect digital presentation that matches the bespoke finish quality of physical architectural work—without sluggish heavy image loads.",
    challengeDetails: [
      "Need for refined visual polish showcasing interior and landscape craftsmanship",
      "Balancing high-resolution architectural photography with dependable mobile loading",
      "Capturing local Abuja searches for luxury interior and landscape execution"
    ],
    objectives: [
      "Design an editorial, minimalist interface highlighting bespoke project imagery",
      "Optimize visual assets so media-rich galleries remain responsive on mobile networks",
      "Configure local Abuja SEO targeting luxury residential and commercial districts"
    ],
    solution:
      "Mindware Consulting engineered an understated luxury portfolio website pairing responsive media optimization with VIP consultation intake and Abuja-focused search optimization.",
    strategySteps: [
      {
        title: "Editorial Luxury Interface Design",
        description:
          "Applied balanced typography and clean gallery framing to foreground architectural craftsmanship."
      },
      {
        title: "Responsive Asset Optimization",
        description:
          "Configured lightweight responsive media pipelines for crisp display without layout lag."
      },
      {
        title: "Abuja District SEO",
        description:
          "Structured localized metadata covering premier Abuja residential and commercial service areas."
      }
    ],
    keyDeliverables: [
      "Luxury Interior & Landscape Web Portal",
      "Optimized High-Resolution Media Showcase",
      "Direct VIP Consultation Flow",
      "Local Abuja SEO Structure"
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Motion", "Responsive Media Pipeline"],
    result:
      "Delivered in 5 weeks as an authoritative digital showcase equipping Eclectic Seals Int'l with clean mobile responsiveness and Abuja search readiness.",
    metrics: [
      { label: "Visual System", value: "Editorial UI", subtext: "High-clarity gallery framing" },
      { label: "Regional Focus", value: "Abuja FCT", subtext: "Localized luxury search setup" },
      { label: "Delivery Timeline", value: "5 Weeks", subtext: "Design to production" }
    ],
    projectDuration: "5 Weeks"
  },
  "royalty-finishing": {
    tagline: "Artisan Flooring, Terrazzo & Epoxy Finishing Showcase in Lagos",
    executiveSummary:
      "Royalty Speed Finishing Enterprises partnered with Mindware Consulting to present terrazzo, marble, and commercial epoxy flooring solutions in a clear, visually engaging portfolio website in Lagos.",
    challenge:
      "Specialty surface finishing relies on visible texture quality, durability specifications, and prompt measurement quoting for commercial builders and facility owners.",
    challengeDetails: [
      "Demonstrating surface texture craftsmanship across terrazzo, marble, and metallic epoxy finishes",
      "Explaining floor maintenance and lifespan value to commercial facility managers",
      "Streamlining measurement and project quotation inquiries in Lagos"
    ],
    objectives: [
      "Showcase distinct flooring surface types through structured high-clarity photography",
      "Make material differences easy to compare for builders and property owners",
      "Capture regional searches for terrazzo and epoxy flooring specialists in Lagos"
    ],
    solution:
      "Mindware Consulting created a visually focused finishing portfolio featuring clean surface galleries, service comparisons, and direct measurement request routing.",
    strategySteps: [
      {
        title: "Surface Detail Galleries",
        description:
          "Highlighted aggregate terrazzo, polished stone, and industrial epoxy coating applications clearly."
      },
      {
        title: "Measurement Quote Intake",
        description:
          "Streamlined consultation requests so builders can share square-meter requirements rapidly."
      },
      {
        title: "Lagos Flooring SEO",
        description:
          "Targeted searches for terrazzo installation, industrial epoxy flooring, and marble finishing in Lagos."
      }
    ],
    keyDeliverables: [
      "Flooring & Finishing Portfolio Website",
      "Material & Finish Comparison Structure",
      "Measurement Consultation Form",
      "Local Flooring SEO Setup"
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Responsive Design"],
    result:
      "Completed in 3 weeks, providing Royalty Speed Finishing Enterprises a polished commercial showroom online to engage Lagos contractors and property owners.",
    metrics: [
      { label: "Showcase Scope", value: "3 Surfaces", subtext: "Terrazzo, marble & epoxy" },
      { label: "Regional SEO", value: "Lagos Focus", subtext: "Commercial flooring terms" },
      { label: "Delivery Timeline", value: "3 Weeks", subtext: "Agile turnaround" }
    ],
    projectDuration: "3 Weeks"
  },
  "infinite-downstream": {
    tagline: "Downstream Energy & Logistics Corporate Presence in Nigeria",
    executiveSummary:
      "Infinite Downstream Logistics Limited partnered with Mindware Consulting to build a dependable corporate portal communicating operational safety, distribution capability, and corporate reliability in Nigeria's downstream energy sector.",
    challenge:
      "Energy distribution partners and institutional procurement teams demand clear corporate presentation demonstrating safety discipline, fleet readiness, and logistical reliability.",
    challengeDetails: [
      "Communicating safety compliance and transit accountability clearly to corporate stakeholders",
      "Projecting institutional credibility required for energy distribution partnerships",
      "Ensuring reliable cross-device access for busy operations and procurement reviewers"
    ],
    objectives: [
      "Present downstream energy distribution capabilities cleanly and authoritatively",
      "Highlight safety, operational standards, and fleet logistics without visual clutter",
      "Deploy a secure, responsive corporate website within an enterprise-aligned structure"
    ],
    solution:
      "Mindware Consulting engineered a calm, authoritative downstream corporate website outlining safety credentials, distribution routes, and partner contact points.",
    strategySteps: [
      {
        title: "Safety & Governance Presentation",
        description:
          "Structured operational compliance and safety commitments clearly across corporate service views."
      },
      {
        title: "Logistics Network Overview",
        description:
          "Outlined distribution reach and operational dispatch discipline across key commercial hubs."
      }
    ],
    keyDeliverables: [
      "Corporate Downstream Web Portal",
      "Fleet & Distribution Capabilities Page",
      "Enterprise Partner Contact Routing",
      "Responsive Mobile Architecture"
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    result:
      "Rolled out in 6 weeks, giving Infinite Downstream Logistics Limited a credible, secure digital home aligned with institutional energy sector expectations.",
    metrics: [
      { label: "Positioning", value: "Energy B2B", subtext: "Safety & fleet governance" },
      { label: "Architecture", value: "Responsive", subtext: "Cross-device corporate UI" },
      { label: "Delivery Timeline", value: "6 Weeks", subtext: "Full strategic rollout" }
    ],
    projectDuration: "6 Weeks"
  },
  "efudo-construction": {
    tagline: "General Construction & Building Materials Manufacturing Platform",
    executiveSummary:
      "Efudo General Construction Company engaged Mindware Consulting to unify its dual capabilities—general civil construction contracting and building materials manufacturing—into a clear nationwide corporate platform.",
    challenge:
      "Businesses combining site contracting with component manufacturing often confuse visitors unless both buyer tracks are separated clearly online.",
    challengeDetails: [
      "Dual buyer audiences: infrastructure construction clients vs. wholesale building material buyers",
      "No centralized online presentation of factory manufacturing capacity and nationwide project delivery",
      "Reliance on word-of-mouth referrals without searchable digital product collateral"
    ],
    objectives: [
      "Establish separate, intuitive pathways for general contracting and manufactured building products",
      "Highlight manufacturing quality control and delivery capability across Nigeria",
      "Create direct quotation forms tailored to both contractors and commercial developers"
    ],
    solution:
      "Mindware Consulting designed a dual-channel corporate website that guides construction buyers and materials wholesalers quickly to relevant specifications and quote forms.",
    strategySteps: [
      {
        title: "Dual-Channel User Journeys",
        description:
          "Created clear structural separation between general civil construction contracting and building product supply."
      },
      {
        title: "Manufacturing Capacity Presentation",
        description:
          "Highlighted factory production standards and distribution across Nigeria."
      },
      {
        title: "Contractor & Supply SEO",
        description:
          "Structured metadata targeting construction contracting and manufactured building supplies."
      }
    ],
    keyDeliverables: [
      "Dual-Channel Corporate Web Platform",
      "Manufactured Products Directory",
      "Contractor & Wholesale Quote Intake",
      "National Search Optimization Structure"
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Semantic Markup"],
    result:
      "Delivered in 4 weeks, uniting Efudo General Construction Company's contracting and manufacturing operations under one searchable corporate platform.",
    metrics: [
      { label: "Business Model", value: "Dual-Channel", subtext: "Contracting + Manufacturing" },
      { label: "Lead Capture", value: "Segmented RFQ", subtext: "Tailored quote routing" },
      { label: "Delivery Timeline", value: "4 Weeks", subtext: "Rapid turnaround" }
    ],
    projectDuration: "4 Weeks"
  },
  "cosmozel-construction": {
    tagline: "Civil Engineering Digital Identity & Long-Term Technical Maintenance Partnership",
    executiveSummary:
      "Cosmozel Nigeria Limited partnered with Mindware Consulting to design a professional, responsive corporate website tailored to its civil engineering brand image, backed by an ongoing technical maintenance partnership ensuring continuous software updates and zero-downtime reliability.",
    challenge:
      "Cosmozel Nigeria Limited needed a trustworthy digital platform to reflect its civil engineering brand image online—and dependable ongoing software maintenance so the corporate site stays fast, current, and operational without downtime.",
    challengeDetails: [
      "Need for a credible civil engineering corporate site suited to corporate and tender stakeholders",
      "Requirement for clean responsiveness across executive desktops and mobile devices",
      "Need for dependable post-launch technical support, software updates, and uptime continuity"
    ],
    objectives: [
      "Design a professional, responsive corporate website aligned with Cosmozel's brand image",
      "Establish reliable ongoing software updates and proactive site maintenance",
      "Maintain smooth performance without operational downtime post-launch"
    ],
    solution:
      "Mindware Consulting designed and deployed a responsive corporate web platform for Cosmozel Nigeria Limited and continues to provide dedicated software maintenance, performance monitoring, and dependable technical support.",
    strategySteps: [
      {
        title: "Brand-Aligned Corporate Architecture",
        description:
          "Designed an authoritative civil engineering layout communicating organizational credibility and project readiness."
      },
      {
        title: "Responsive Engineering Delivery",
        description:
          "Implemented responsive layouts calibrated across mobile, tablet, and desktop screens."
      },
      {
        title: "Ongoing Maintenance & Uptime Stewardship",
        description:
          "Established continuous software update hygiene, monitoring, and dependable post-launch technical support."
      }
    ],
    keyDeliverables: [
      "Responsive Civil Engineering Website",
      "Brand-Aligned Corporate Showcase",
      "Ongoing Software Maintenance & Updates",
      "Downtime Prevention & Dependable Technical Support"
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Managed Hosting & Maintenance SLA"],
    result:
      "Delivered a responsive corporate website tailored to Cosmozel Nigeria Limited's brand image, backed by uninterrupted post-launch maintenance and a verified 5-star Google Client Review from CEO Bldr. Cosmas Emeka Onuh.",
    metrics: [
      { label: "Verified Google Rating", value: "5.0 / 5.0", subtext: "Bldr. Cosmas Emeka Onuh (CEO)" },
      { label: "Uptime Track Record", value: "Zero Downtime", subtext: "Ongoing technical maintenance" },
      { label: "Delivery Scope", value: "Design + SLA", subtext: "Build & continuous updates" },
      { label: "Initial Launch", value: "5 Weeks", subtext: "Design to production launch" }
    ],
    projectDuration: "5 Weeks",
    testimonial: {
      quote:
        "Mindware Consulting Limited has been our trusted web design and maintenance partner for quite some time now. They did an excellent job designing our company website — professional, responsive, and exactly suited to our brand image. Since launch, they’ve continued to maintain the site diligently, updating software and ensuring smooth performance without any downtime.\n\nWe’re impressed with their dedication, reliability, and attention to detail. I strongly recommend Mindware Consulting Limited to any business looking for quality web design and dependable technical support.",
      author: "Bldr. Cosmas Emeka Onuh",
      role: "Chief Executive Officer · Verified Google Review (31 October 2025)"
    }
  },
  "watech-integrated": {
    tagline: "Concrete Solutions & Construction Capabilities Portal in Lagos",
    executiveSummary:
      "Watech Nigeria Ltd commissioned Mindware Consulting to build a clear, fast-loading digital platform showcasing ready-mix concrete capabilities, structural quality standards, and commercial project delivery in Lagos.",
    challenge:
      "Commercial builders and civil contractors selecting concrete partners require clear visibility into technical capability, batching readiness, and rapid dispatch contact points.",
    challengeDetails: [
      "Need to project technical competence in ready-mix concrete and infrastructure solutions",
      "Connecting Lagos commercial builders quickly with batching and project inquiry contacts",
      "Standing out clearly in a crowded Lagos construction materials market"
    ],
    objectives: [
      "Present concrete solutions and construction capabilities in a structured, modern layout",
      "Provide direct inquiry pathways for commercial concrete supply and infrastructure contracts",
      "Implement localized Lagos SEO metadata for high-intent concrete queries"
    ],
    solution:
      "Mindware Consulting designed and built an immersive, responsive concrete and engineering web portal focused on technical clarity and direct contractor contact.",
    strategySteps: [
      {
        title: "Technical Credibility Presentation",
        description:
          "Structured concrete solutions, quality assurance standards, and engineering support cleanly."
      },
      {
        title: "Contractor Inquiry Routing",
        description:
          "Integrated streamlined contact links connecting commercial buyers directly with supply teams."
      },
      {
        title: "Lagos Industrial Search Readiness",
        description:
          "Configured technical metadata covering ready-mix concrete and construction solutions in Lagos."
      }
    ],
    keyDeliverables: [
      "Concrete Solutions Web Portal",
      "Contractor Inquiry Funnels",
      "Quality & Service Presentation",
      "Local Lagos Industrial SEO"
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite", "Local SEO"],
    result:
      "Completed in 3 weeks, giving Watech Nigeria Ltd a high-clarity corporate web platform supporting infrastructure and ready-mix client acquisition in Lagos.",
    metrics: [
      { label: "Market Focus", value: "Lagos B2B", subtext: "Contractors & concrete supply" },
      { label: "Platform Type", value: "Fast SPA", subtext: "Responsive corporate showcase" },
      { label: "Delivery Timeline", value: "3 Weeks", subtext: "Agile turnaround" }
    ],
    projectDuration: "3 Weeks"
  },
  "temamost-construction": {
    tagline: "Before & After Website Upgrade: Multi-Device Digital Transformation for Port Harcourt's Civil Engineering Firm",
    executiveSummary:
      "Temamost Nigeria Ltd, a Port Harcourt-based civil engineering, coastal terrain infrastructure, and turnkey building construction company established in 2017, partnered with Mindware Consulting to upgrade an outdated legacy site into a modern, responsive multi-device digital flagship reflecting its signature navy, red, and white corporate identity.",
    challenge:
      "In Port Harcourt and Nigeria's coastal infrastructure market, institutional developers expect modern digital verification of technical capability. Temamost's legacy website suffered from an outdated non-responsive layout on mobile devices, slow uncompressed assets, weak visual hierarchy, and limited discoverability for commercial construction inquiries.",
    challengeDetails: [
      "Legacy Outdated Layout (Before): A rigid, non-responsive website that degraded poorly on smartphones and tablets used by project directors and site managers",
      "Underrepresented Portfolio: Multi-disciplinary civil engineering, piling, and coastal reclamation capabilities lacked clean structured visual presentation",
      "Friction in Lead Capture: Missing direct WhatsApp inquiry links and structured Request for Quotation (RFQ) pathways",
      "Limited Regional Search Footprint: Lack of structured construction schema targeting Port Harcourt and Rivers State commercial searches"
    ],
    objectives: [
      "Execute a complete Before-and-After website redesign preserving Temamost's navy, red, and white corporate identity",
      "Ensure responsive usability across desktop, laptop, tablet, smartphone, and compact viewports",
      "Implement structured RFQ, tender inquiry, and pre-filled WhatsApp consultation channels",
      "Deploy ConstructionBusiness Schema.org markup targeting Port Harcourt and Rivers State"
    ],
    solution:
      "Mindware Consulting re-architected Temamost's web presence from the ground up—applying responsive grid engineering, standardized navy/red/white visual design tokens, structured civil project galleries, and streamlined tender conversion workflows.",
    strategySteps: [
      {
        title: "Before & After Structural Overhaul",
        description:
          "Audited legacy usability bottlenecks and rebuilt the site around commercial tender evaluation—highlighting civil construction, coastal engineering, piling, and industrial infrastructure."
      },
      {
        title: "Multi-Device Responsive Presentation",
        description:
          "Calibrated adaptive layouts across desktop monitors, laptops, tablets, smartphones, and wearable screen widths."
      },
      {
        title: "Navy, Red & White Corporate Visual System",
        description:
          "Standardized Temamost's corporate palette paired with crisp architectural visual framing and project imagery."
      },
      {
        title: "RFQ, WhatsApp & Tender Lead Funnels",
        description:
          "Integrated direct WhatsApp engineering prompts and structured quotation request workflows."
      },
      {
        title: "Port Harcourt & Rivers State Schema SEO",
        description:
          "Configured ConstructionBusiness and LocalBusiness JSON-LD metadata aligned with Port Harcourt commercial operations."
      }
    ],
    keyDeliverables: [
      "Complete Legacy Website Upgrade & Modernization",
      "Multi-Device Responsive Layout Matrix",
      "Navy, Red & White Visual Design System",
      "Civil, Coastal & Building Project Showcase",
      "Direct WhatsApp & Structured RFQ Funnels",
      "ConstructionBusiness Schema.org SEO Engine"
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite", "Schema.org ConstructionBusiness", "Google Search Console"],
    result:
      "Delivered a complete Before-and-After digital transformation within 4 weeks—replacing a legacy non-responsive website with a cohesive multi-device platform ready for Port Harcourt institutional tenders and direct RFQ intake.",
    metrics: [
      { label: "Upgrade Scope", value: "Before → After", subtext: "Full legacy modernization" },
      { label: "Device Coverage", value: "Multi-Device", subtext: "Desktop, tablet, mobile & watch" },
      { label: "Brand Identity", value: "Navy / Red", subtext: "Cohesive corporate system" },
      { label: "Delivery Timeline", value: "4 Weeks", subtext: "Audit to live deployment" }
    ],
    projectDuration: "4 Weeks"
  }
};

function generateDefaultCaseStudy(project: typeof PORTFOLIO[0]): CaseStudyDetail {
  const durationNum = project.projectMetrics?.duration || 4;

  return {
    id: project.id,
    title: project.title,
    client: project.client,
    industry: project.industry,
    service: project.service,
    image: project.image,
    link: project.link,
    tagline: `${project.title} · Strategic Digital Delivery for ${project.client}`,
    executiveSummary: `Mindware Consulting engineered a modern corporate web platform for ${project.client}, aligning technical architecture, responsive usability, and search foundations with commercial growth goals in ${project.industry}.`,
    challenge: project.challenge,
    challengeDetails: [
      `Need for an authoritative corporate platform accurately representing ${project.client}'s market positioning in ${project.industry}`,
      "Overcoming friction in how prospective clients review capabilities and initiate project inquiries",
      `Strengthening foundational search visibility across high-intent ${project.industry} queries`,
      "Ensuring reliable cross-device experience for executives and procurement stakeholders"
    ],
    objectives: [
      `Establish clear digital credibility tailored to buyers in ${project.industry}`,
      "Organize service and capability offerings for rapid executive review",
      "Embed low-friction consultation and inquiry pathways",
      "Implement technical SEO and Schema.org structured metadata"
    ],
    solution: project.result,
    strategySteps: [
      {
        title: "Strategic Discovery & Positioning",
        description: `Analyzed ${project.client}'s core offerings, buyer decision criteria, and positioning within ${project.industry}.`
      },
      {
        title: "Responsive UI/UX Engineering",
        description: "Built a clean, fast digital interface structured for clear service comprehension across desktop and mobile."
      },
      {
        title: "Technical SEO Foundations",
        description: "Implemented Schema.org markup, semantic headings, and clean indexing structure."
      },
      {
        title: "Streamlined Consultation Funnels",
        description: "Integrated direct contact and WhatsApp consultation actions to turn visitor intent into commercial conversations."
      }
    ],
    keyDeliverables: [
      "Custom Corporate Web Platform",
      "Service & Capability Showcase",
      "Technical SEO & Schema Setup",
      "Mobile-First Responsive UI",
      "Direct Consultation & Inquiry Funnels"
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite", "Schema.org"],
    result: project.result,
    metrics: [
      { label: "Delivered Scope", value: project.service, subtext: "Production deployment" },
      { label: "Primary Sector", value: project.industry, subtext: "Targeted positioning" },
      { label: "Search Readiness", value: "Schema SEO", subtext: "Clean semantic structure" },
      { label: "Delivery Timeline", value: `${durationNum} Weeks`, subtext: "Discovery to launch" }
    ],
    projectDuration: `${durationNum} Weeks`
  };
}

export function getCaseStudyById(id: string): CaseStudyDetail | null {
  const portfolioItem = PORTFOLIO.find((p) => p.id === id);
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
    challengeDetails: bespoke.challengeDetails || defaults.challengeDetails,
    objectives: bespoke.objectives || defaults.objectives,
    result: bespoke.result || portfolioItem.result,
    metrics: bespoke.metrics || defaults.metrics,
    strategySteps: bespoke.strategySteps || defaults.strategySteps,
    keyDeliverables: bespoke.keyDeliverables || defaults.keyDeliverables,
    technologies: bespoke.technologies || defaults.technologies,
    projectDuration: bespoke.projectDuration || defaults.projectDuration,
    tagline: bespoke.tagline || defaults.tagline,
    executiveSummary: bespoke.executiveSummary || defaults.executiveSummary,
    testimonial: bespoke.testimonial
  };
}

export function getAllCaseStudies(): CaseStudyDetail[] {
  return PORTFOLIO.map((project) => getCaseStudyById(project.id)!).filter(Boolean);
}
