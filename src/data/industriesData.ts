export interface IndustryChallenge {
  title: string;
  problem: string;
  solution: string;
}

export interface IndustryFeature {
  title: string;
  description: string;
  benefit: string;
  tag: string;
}

export interface IndustryFaq {
  question: string;
  answer: string;
}

export interface IndustryData {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  isFlagship?: boolean;
  category: "Energy & Infrastructure" | "Built Environment & Finishing" | "Commerce & Automotive";
  metaTitle: string;
  metaDescription: string;
  heroHeadline: string;
  heroSubheadline: string;
  overview: string;
  marketPotential: string;
  iconName: string; // Lucide icon identifier
  metrics: {
    label: string;
    value: string;
    description: string;
  }[];
  challenges: IndustryChallenge[];
  features: IndustryFeature[];
  caseStudy: {
    clientName: string;
    companyName: string;
    serviceProvided: string;
    resultQuote: string;
    metrics: string;
    link?: string;
  };
  keyServiceAreas: {
    name: string;
    slug: string;
    reason: string;
  }[];
  faqs: IndustryFaq[];
  startingPrice: string;
  typicalTimeline: string;
}

export const INDUSTRY_CATEGORIES = [
  { id: "All", label: "All 6 Focus Industries" },
  { id: "Energy & Infrastructure", label: "Energy & Infrastructure" },
  { id: "Built Environment & Finishing", label: "Built Environment & Finishing" },
  { id: "Commerce & Automotive", label: "Commerce & Automotive" }
];

export const INDUSTRIES: IndustryData[] = [
  // 1. CIVIL ENGINEERING, CONSTRUCTION & INFRASTRUCTURE (FLAGSHIP SPECIALIZATION)
  {
    id: "construction-civil-engineering",
    slug: "construction-civil-engineering",
    name: "Civil Engineering, Construction & Infrastructure",
    shortName: "Construction / Civil Engineering",
    tagline: "Verifiable Project Portfolios, BPP Federal Tender Compliance & Heavy Plant Capacity",
    isFlagship: true,
    category: "Energy & Infrastructure",
    metaTitle: "Web Design & B2B SEO for Construction & Civil Engineering Firms | Mindware",
    metaDescription: "Partner with Mindware to build prestigious civil engineering websites, federal contractor portals, and construction company SEO. Trusted by contractors across Nigeria.",
    heroHeadline: "Authoritative Web Platforms for Civil Contractors, Infrastructure Developers & EPC Builders.",
    heroSubheadline: "Present your engineering credentials, completed infrastructure works, heavy equipment capacity, and governance standards clearly for corporate, private, and institutional decision-makers.",
    overview: "Civil engineering and general construction is an intensely competitive sector where technical credibility, documented project execution, equipment readiness, and procurement trust determine who gets shortlisted. From road networks and drainage systems to commercial developments and residential estates, Mindware builds structured digital platforms, visibility engines, and inquiry workflows that turn construction firms into clear, verifiable industry contenders.",
    marketPotential: "Construction and civil engineering represents Mindware's flagship sector specialization—backed by extensive live deliveries for Nigerian civil contractors, concrete producers, and architectural engineering firms.",
    iconName: "Building2",
    metrics: [
      { label: "Flagship Focus", value: "Construction", description: "Mindware's primary industry specialization across Nigeria" },
      { label: "Tender & Governance", value: "BPP / COREN", description: "Clear presentation of CAC, COREN, NSE & statutory compliance" },
      { label: "Asset Presentation", value: "Project & Plant", description: "Structured galleries of completed sites & heavy equipment capacity" },
      { label: "Typical Turnaround", value: "3 to 4 Weeks", description: "Milestone-governed corporate delivery & launch timeline" }
    ],
    challenges: [
      {
        title: "Outdated Websites Failing to Reflect Capability",
        problem: "Many established engineering contractors have outdated, slow, or broken websites that immediately undersell decades of real-world field execution to serious project sponsors.",
        solution: "We redesign and modernize legacy contractor websites into responsive, authoritative platforms aligned across desktop, tablet, and smartphone viewing."
      },
      {
        title: "Poor Online Visibility for Construction Searches",
        problem: "Decision-makers searching Google for civil contractors, piling specialists, or building engineers in Lagos, Abuja, Port Harcourt, or Awka rarely discover capable local firms.",
        solution: "We deploy technical SEO, ConstructionBusiness Schema.org markup, and location-targeted architecture so procurement teams find your firm organically."
      },
      {
        title: "Difficulty Attracting High-Value Clients",
        problem: "Relying purely on word-of-mouth limits growth when competing for corporate developments, institutional facilities, private estates, and diaspora-funded builds.",
        solution: "We architect persuasive B2B commercial positioning tailored specifically to corporate facility directors, private developers, and institutional buyers."
      },
      {
        title: "Weak Presentation of Completed Projects & Capacity",
        problem: "Contractors execute landmark roads, bridges, plazas, and concrete works yet display little structured technical proof of completed scopes or plant machinery capacity.",
        solution: "We build categorized Project Showcase Engines alongside Heavy Equipment & Plant Asset Registers detailing technical specifications and execution breadth."
      },
      {
        title: "Poor Digital Lead-Capture & Follow-Up Processes",
        problem: "Even when prospects visit a contractor's website, generic contact pages drop high-intent tender invitations, BOQ requests, and RFQ inquiries without structured follow-up.",
        solution: "We integrate structured Request-for-Quotation (RFQ) and BOQ intake funnels with instant WhatsApp routing and CRM lead-tracking notifications."
      },
      {
        title: "Inconsistent Branding & Lack of Credibility",
        problem: "Fragmented visual identity and missing corporate documentation create doubt during Bureau of Public Procurement (BPP) screenings and commercial due diligence.",
        solution: "We establish cohesive corporate branding paired with transparent Governance & Accreditation hubs highlighting CAC registration, COREN/NSE credentials, and HSE readiness."
      },
      {
        title: "Disconnected Internal Workflow & Technology Tools",
        problem: "Site updates, client reporting, vendor onboarding, and sales follow-ups sit across disconnected spreadsheets, emails, and messaging threads that slow down management.",
        solution: "We introduce streamlined project reporting workflows, CRM customer tracking, and custom operational portals that connect site operations with business development."
      }
    ],
    features: [
      {
        title: "Interactive Mega-Project Case Study Engine",
        description: "Filterable portfolio categorized by sector (Roads & Bridges, High-Rise Residential, Industrial Warehouses, Marine Dredging) with technical data sheets and project documentation.",
        benefit: "Positions your firm as a proven delivery heavyweight in specific engineering disciplines.",
        tag: "Project Proof"
      },
      {
        title: "Heavy Equipment & Plant Asset Register",
        description: "A comprehensive digital inventory showcasing excavators, bulldozers, asphalt pavers, piling rigs, and batching plants with yard readiness summaries.",
        benefit: "Demonstrates mobilization capacity clearly to project sponsors.",
        tag: "Asset Readiness"
      },
      {
        title: "COREN & NSE Engineering Faculty Showcase",
        description: "Dedicated leadership directory showcasing registered COREN engineers, structural consultants, and project directors with their qualifications and governance roles.",
        benefit: "Builds technical trust with institutional and corporate project sponsors.",
        tag: "Technical Team"
      },
      {
        title: "Bidding & Subcontractor Due Diligence Portal",
        description: "Structured vendor pre-qualification and Request for Quotation (RFQ) portal enabling joint-venture partners and private developers to submit tenders smoothly.",
        benefit: "Turns passive visitors into qualified procurement conversations.",
        tag: "Tender Pipeline"
      }
    ],
    caseStudy: {
      clientName: "Bldr. Cosmas Emeka Onuh (Chief Executive Officer)",
      companyName: "Cosmozel Nigeria Limited — Verified Google Review",
      serviceProvided: "Civil Engineering Corporate Platform & Ongoing Technical Maintenance",
      resultQuote: "Mindware Consulting Limited has been our trusted web design and maintenance partner for quite some time now. They did an excellent job designing our company website — professional, responsive, and exactly suited to our brand image. Since launch, they’ve continued to maintain the site diligently, updating software and ensuring smooth performance without any downtime.",
      metrics: "Verified Google Review (31 October 2025) · Long-Term Maintenance Partner",
      link: "/portfolio/case-studies/cosmozel-construction"
    },
    keyServiceAreas: [
      { name: "Abuja (FCT)", slug: "abuja-fct", reason: "Seat of the Federal Ministry of Works, BPP tenders, and national infrastructure concessions" },
      { name: "Lagos (Ikeja & Lekki)", slug: "lagos", reason: "Hub for commercial skyscrapers, industrial free zones, and deep-sea port infrastructure" },
      { name: "Rivers (Port Harcourt)", slug: "rivers", reason: "Heavy industrial foundation engineering, shore protection, and marine EPC contracts" },
      { name: "Ogun (Sagamu & Ota)", slug: "ogun", reason: "Industrial manufacturing corridor, warehouse logistics parks, and factory construction" }
    ],
    faqs: [
      {
        question: "Can you help our construction company take professional site photos and drone videos?",
        answer: "Yes. Mindware coordinates high-resolution drone site videography and architectural photography across Lagos, Abuja, Port Harcourt, and major Nigerian construction sites to ensure your portfolio looks world-class."
      },
      {
        question: "Does the website design comply with federal BPP and state procurement guidelines?",
        answer: "Yes. We configure dedicated statutory compliance sections clearly displaying your company registration details, COREN certifications, tax clearances, and corporate social responsibility (CSR) initiatives."
      },
      {
        question: "Can we manage and update our ongoing project milestones without hiring a developer?",
        answer: "Absolutely. We engineer an intuitive content management interface where your project engineers or site managers can upload progress photos, milestone updates, and completion percentages in seconds."
      }
    ],
    startingPrice: "From ₦295,000 (or Custom Scope)",
    typicalTimeline: "3 to 4 Weeks"
  },

  // 2. OIL & GAS, OFFSHORE MARINE & ENERGY SERVICES
  {
    id: "oil-and-gas-marine",
    slug: "oil-and-gas-marine",
    name: "Oil & Gas, Offshore Marine & Energy Services",
    shortName: "Oil & Gas / Marine",
    tagline: "Tender-Ready Portals, NipeX Qualification & Offshore Safety Architecture",
    category: "Energy & Infrastructure",
    metaTitle: "Web Design, NipeX Tender Portals & SEO for Oil & Gas Firms | Mindware Consulting",
    metaDescription: "Partner with Nigeria's premier digital agency for energy and marine contractors. We engineer NipeX-ready corporate portals, HSE compliance displays, and B2B oilfield SEO.",
    heroHeadline: "Digital Authority Engineered for Oilfield Contractors, Marine Operators & IOC Tenders.",
    heroSubheadline: "Position your engineering firm to pass stringent NipeX, DPR/NUPRC, and International Oil Company (IOC) technical due diligence with institutional-grade web platforms.",
    overview: "In the Nigerian oil, gas, and maritime sector (spanning Port Harcourt, Lagos, Warri, and offshore terminals), multimillion-dollar procurement contracts are decided by technical credibility, statutory HSE metrics, and verifiable equipment capacities. Mindware builds digital assets that prove your execution capability to Shell, TotalEnergies, Chevron, NLNG, and marginal field operators.",
    marketPotential: "Nigeria's upstream, midstream, and marine services procurement requires strict desktop pre-qualification, clear safety documentation, and verifiable asset capacity before shortlist approval.",
    iconName: "Flame",
    metrics: [
      { label: "Tender Alignment", value: "NipeX / IOC", description: "Structured QA/QC, local content & statutory compliance hubs" },
      { label: "Fleet Presentation", value: "Asset Catalogs", description: "Organized technical specs for vessels, yards & field gear" },
      { label: "Safety Authority", value: "HSE Clarity", description: "Prominent display of occupational & environmental policies" },
      { label: "Delivery Window", value: "3 to 5 Weeks", description: "Scoped deployment tailored to energy procurement timelines" }
    ],
    challenges: [
      {
        title: "Rigid IOC Pre-Qualification Barriers",
        problem: "Procurement directors at IOCs immediately disqualify engineering contractors whose websites lack documented QA/QC policies, NUPRC permits, and organized technical capability statements.",
        solution: "We build dedicated Tender Compliance Hubs with secure, downloadable technical capability dossiers, audited certification manifests, and client testimonial verifications."
      },
      {
        title: "Invisible Marine Assets & Fleet Catalogs",
        problem: "Marine vessel owners (tugboats, barges, crew boats) lose lucrative charter contracts because charterers cannot view fleet technical specifications, bollard pull ratings, or dynamic positioning classes online.",
        solution: "We develop interactive Vessel Fleet Catalogs with detailed marine specification sheets, Class certification badges, and direct charter inquiry workflows."
      },
      {
        title: "Statutory HSE Verification Deficits",
        problem: "Energy operators require visible commitment to safety. Contractors without clear HSE frameworks and compliance documentation are filtered out during initial desktop screening.",
        solution: "We integrate structured HSE Compliance Dashboards displaying safety governance, environmental policies, and operational readiness profiles."
      }
    ],
    features: [
      {
        title: "NipeX & IOC Tender Compliance Architecture",
        description: "Bespoke digital architecture structured to mirror the exact pre-qualification criteria of NipeX, Shell, ExxonMobil, and TotalEnergies vendor registration reviews.",
        benefit: "Accelerates contractor onboarding and eliminates desktop audit friction.",
        tag: "Tender Ready"
      },
      {
        title: "Marine Vessel & Heavy Asset Fleet Showcase",
        description: "High-definition technical catalog featuring vessel dimensions, deck space, engine ratings, bunkering capacities, and downloadable marine specification sheets.",
        benefit: "Enables procurement executives to inspect and enquire on offshore assets quickly.",
        tag: "Asset Discovery"
      },
      {
        title: "HSE & Safety Governance Showcase",
        description: "Structured interactive display of safety commitments, ISO standards, statutory NUPRC permits, and emergency response protocols.",
        benefit: "Reinforces commitment to zero-incident offshore and yard execution.",
        tag: "Safety Proof"
      },
      {
        title: "Offshore Technical Procurement RFQ Engine",
        description: "Structured Request For Quotation (RFQ) portal where clients can submit engineering specs or project briefs for prompt commercial review.",
        benefit: "Captures institutional RFQs with clean technical context.",
        tag: "B2B Lead Flow"
      }
    ],
    caseStudy: {
      clientName: "Chief Peters (CEO & Managing Director)",
      companyName: "Priziangori Global Services Limited — Portfolio Case Study",
      serviceProvided: "Multi-Sector Oil & Gas, Aviation Fuel & Environmental Corporate Portal",
      resultQuote: "Mindware Consulting unified our diverse industrial operations across oil & gas, aviation, and environmental servicing into an authoritative corporate digital identity that commands international trust.",
      metrics: "Unified 4 Industrial Divisions · Enterprise SEO & Compliance Portal",
      link: "/portfolio/case-studies/priziangori-global"
    },
    keyServiceAreas: [
      { name: "Rivers (Port Harcourt)", slug: "rivers", reason: "Nigeria's oilfield engineering capital and primary offshore logistics base" },
      { name: "Delta (Warri & Effurun)", slug: "delta", reason: "Major fabrication yards, pipeline engineering, and marine barging hub" },
      { name: "Lagos (VI & Lekki)", slug: "lagos", reason: "Corporate headquarters of IOCs, upstream financiers, and energy traders" },
      { name: "Bayelsa (Yenagoa & Brass)", slug: "bayelsa", reason: "Birthplace of crude production and multi-billion-dollar gas monetization corridor" }
    ],
    faqs: [
      {
        question: "How does a website help an oil and gas contractor win IOC contracts in Nigeria?",
        answer: "When procurement managers at Shell, TotalEnergies, or NLNG review tender bids, their technical due diligence teams inspect your website to verify equipment ownership, safety track record, executive credentials, and physical yard locations. A generic or non-existent website creates immediate suspicion; a Mindware tender-ready portal establishes undeniable operational authority."
      },
      {
        question: "Can our website showcase sensitive project data without breaching NDA agreements?",
        answer: "Yes. We implement sanitized project case studies that highlight engineering achievements, tonnages, and methodologies while redacting proprietary client coordinates or confidential commercial terms. We can also build password-protected, encrypted investor/partner data rooms."
      },
      {
        question: "Do you support corporate HSE compliance and workforce readiness documentation?",
        answer: "Yes. Through our corporate consulting and organizational capability engagements, we help you structure HSE compliance documentation, workforce readiness credentials, and statutory safety profiles directly into your vendor portal."
      }
    ],
    startingPrice: "From ₦400,000 (or Custom Scope)",
    typicalTimeline: "3 to 5 Weeks"
  },

  // 3. REAL ESTATE & PROPERTY DEVELOPMENT
  {
    id: "real-estate-property-development",
    slug: "real-estate-property-development",
    name: "Real Estate & Property Development",
    shortName: "Real Estate / Property Development",
    tagline: "Diaspora Investor Trust, Interactive Estate Maps & High-Conversion Property Funnels",
    category: "Built Environment & Finishing",
    metaTitle: "Web Design & Lead Generation for Real Estate Developers | Mindware Consulting",
    metaDescription: "Sell properties faster to local and diaspora buyers. Mindware engineers luxury real estate websites, off-plan estate portals, and automated property sales funnels in Nigeria.",
    heroHeadline: "Convert Local & Diaspora Property Buyers into Verified Off-Plan Investors.",
    heroSubheadline: "Overcome buyer skepticism with verified land title badges, 3D interactive estate plans, mortgage payment calculators, and automated WhatsApp sales funnels.",
    overview: "The Nigerian real estate market is powered by rapid urbanization and massive capital inflows from the Nigerian diaspora (UK, US, Canada, UAE). However, developers face a severe trust deficit due to land disputes and scam concerns. Mindware designs prestigious digital property portals that establish unassailable legal transparency, showcase breathtaking architectural walkthroughs, and capture high-intent buyers who are ready to subscribe.",
    marketPotential: "Urbanization across Lagos, Abuja, and Port Harcourt alongside strong diaspora investor demand creates high returns for developers who combine verified land titles with transparent digital inspection journeys.",
    iconName: "Landmark",
    metrics: [
      { label: "Buyer Due Diligence", value: "Legal Proof", description: "Clear C of O, survey & title verification documentation centers" },
      { label: "Masterplan Display", value: "Interactive", description: "Structured site plans & property unit status navigation" },
      { label: "Diaspora Funnel", value: "Multi-Market", description: "Responsive buyer & WhatsApp inspection scheduling flows" },
      { label: "Delivery Window", value: "3 to 4 Weeks", description: "Scoped turnaround for developer & estate portals" }
    ],
    challenges: [
      {
        title: "Diaspora Buyer Skepticism",
        problem: "Diaspora Nigerians want to invest in properties in Lagos, Abuja, or Ibadan, but are terrified of phantom projects, fraudulent family intermediaries, and unverified titles.",
        solution: "We build dedicated Title & Legal Verification Centers on the website, featuring downloadable Governor’s Consent/C of O gazette numbers, video construction timelines, and independent lawyer verification badges."
      },
      {
        title: "Cluttered, Slow Property Listings",
        problem: "Most developer websites are bloated with slow-loading image galleries, confusing navigation, and no clear way to inspect estate site layouts or unit floor plans.",
        solution: "We develop Interactive 3D Estate Masterplans where buyers can click specific plots or luxury duplex units to inspect dimensions, pricing, and live availability (Sold / Reserved / Available)."
      },
      {
        title: "High Ad Spend with Low Lead Closing",
        problem: "Developers invest heavily in Facebook, Instagram, and Google Ads, yet lose serious prospects when inquiry forms are clunky or sales follow-up lags.",
        solution: "We deploy Automated Fast-Track Funnels with instant WhatsApp dispatch, installment schedule overviews, and structured booking for physical and virtual site inspections."
      }
    ],
    features: [
      {
        title: "Interactive Estate Site Plan & Unit Availability Map",
        description: "An intuitive interactive vector map where prospective investors can view estate master plans, click individual plots or duplexes, check prices, and reserve online.",
        benefit: "Creates commercial urgency and accelerates off-plan subscriptions.",
        tag: "Interactive Layout"
      },
      {
        title: "Diaspora Investor Due Diligence & Legal Center",
        description: "Transparent legal repository showcasing land survey numbers, approved building plans, C of O verification details, and video construction milestone logs.",
        benefit: "Eliminates buyer hesitation and builds supreme diaspora trust.",
        tag: "Trust Center"
      },
      {
        title: "Dynamic Installment & Mortgage Calculator",
        description: "Allows buyers to simulate initial deposits (e.g. 20% down) and calculate monthly repayment spreads across 6, 12, 18, or 24 months with instant payment schedules.",
        benefit: "Enables buyers to self-qualify their purchasing power instantly.",
        tag: "Financing Tool"
      },
      {
        title: "VIP Virtual Video Site Tour & Inspection Scheduler",
        description: "Direct integration for booking scheduled physical site inspections in Lagos/Abuja or live 1-on-1 WhatsApp/Zoom guided walkthroughs with senior sales reps.",
        benefit: "Turns online window shoppers into qualified, scheduled buyers.",
        tag: "Inspection Desk"
      }
    ],
    caseStudy: {
      clientName: "Engr. O. Osita (Managing Director)",
      companyName: "OSINES GROUP (Awka & Lagos) — Portfolio Case Study",
      serviceProvided: "Luxury Architectural & Real Estate Development Platform",
      resultQuote: "Mindware Consulting delivered beyond our expectations. Our new digital platform perfectly conveys the precision and elegance of Osines Group's construction standards.",
      metrics: "Live Portfolio Platform · Multi-Device Architectural Showcase",
      link: "/portfolio/case-studies/osines-group"
    },
    keyServiceAreas: [
      { name: "Lagos (Ikoyi, Lekki & Epe)", slug: "lagos", reason: "Nigeria's prime real estate capital, off-plan luxury duplexes, and commercial land banking" },
      { name: "Abuja (Maitama, Guzape & Jabi)", slug: "abuja-fct", reason: "High-value political, diplomatic, and executive residential property hub" },
      { name: "Oyo (Ibadan - Alalubosa & Ring Road)", slug: "oyo", reason: "Rapidly booming satellite market with major diaspora retirement estate investments" },
      { name: "Rivers (Port Harcourt GRA)", slug: "rivers", reason: "Executive residential developments for energy sector directors and expatriates" }
    ],
    faqs: [
      {
        question: "Can our website allow buyers to pay initial reservation deposits online?",
        answer: "Yes. We integrate secure Paystack, Flutterwave, and international Stripe payment gateways, enabling buyers to pay non-refundable reservation fees or complete full property installment payments using debit cards, USSD, or direct bank transfers with instant automated digital receipts."
      },
      {
        question: "How do you help our properties rank on Google for diaspora buyers in the UK and USA?",
        answer: "We engineer international SEO strategies targeting high-intent queries like 'luxury 4 bedroom duplex in Lekki Phase 1', 'buy land in Epe with Governor's Consent', and 'property developer in Abuja with installment plans', ensuring your projects appear on Page 1 when diaspora investors search."
      },
      {
        question: "Can we showcase multiple estate locations on a single interactive portal?",
        answer: "Yes. We build scalable multi-estate architectures where you can showcase projects across Lagos, Abuja, Ibadan, and Port Harcourt, each with its own independent pricing, site plan, construction progress timeline, and sales team."
      }
    ],
    startingPrice: "From ₦375,000 (or Custom Scope)",
    typicalTimeline: "3 to 4 Weeks"
  },

  // 4. AUTOMOTIVE & CAR DEALERSHIPS
  {
    id: "automotive-car-dealerships",
    slug: "automotive-car-dealerships",
    name: "Automotive & Car Dealerships",
    shortName: "Automotive / Dealerships",
    tagline: "Digital Showrooms, VIN Inspection Transparency & Smart Inventory Filtering",
    category: "Commerce & Automotive",
    metaTitle: "Web Design & Digital Showrooms for Car Dealerships in Nigeria | Mindware",
    metaDescription: "Upgrade your auto dealership. Mindware builds high-converting digital car showrooms, inventory filters, VIN verification, and auto financing calculators in Nigeria.",
    heroHeadline: "Convert Vehicle Shoppers into Showroom Buyers with a High-Speed Digital Inventory.",
    heroSubheadline: "Move beyond messy Instagram DMs and generic marketplaces. Build an authoritative, branded digital dealership with verified customs duty badges and trade-in valuation engines.",
    overview: "The Nigerian automotive market (anchored in Berger, Ikeja, Lekki, Abuja Central Business District, and Nnewi) processes billions of Naira in brand-new, foreign-used (Tokunbo), and certified pre-owned vehicles. Modern car buyers demand complete transparency: clean Carfax/AutoCheck reports, authentic Nigerian Customs duty documentation, 360° photo walkthroughs, and clear financing terms before they visit your physical lot.",
    marketPotential: "Nigerian vehicle buyers across Abuja, Lagos, Kano, and Anambra increasingly evaluate dealers online before booking lot visits, rewarding dealerships with verified documentation and searchable inventory.",
    iconName: "Car",
    metrics: [
      { label: "Inventory Status", value: "Live Sync", description: "Clear Available, Reserved & Sold dealership catalog control" },
      { label: "Buyer Assurance", value: "VIN & Duty", description: "Transparent inspection & Customs clearance trust displays" },
      { label: "Lead Conversion", value: "WhatsApp Desk", description: "1-click vehicle inquiry & test-drive booking funnels" },
      { label: "Delivery Window", value: "3 to 4 Weeks", description: "Scoped turnaround for custom automotive showroom builds" }
    ],
    challenges: [
      {
        title: "Stock Miscommunication & Outdated Listings",
        problem: "Dealers post cars on social media, but when interested buyers call days later, the vehicle is already sold, leading to customer frustration and lost trust.",
        solution: "We build Centralized Inventory Management Systems with real-time status switches (Available / Reserved / Sold) synchronized across your website and sales team."
      },
      {
        title: "Customs Duty & Mileage Fraud Fears",
        problem: "Nigerian car buyers are terrified of rolled-back odometers, flooded salvage titles from the US, or fake Customs papers that get vehicles impounded.",
        solution: "We integrate VIN Verification Badges, verified Customs Duty status tags, and high-definition 360° interior and engine bay inspection galleries."
      },
      {
        title: "Uncaptured Trade-In & Financing Customers",
        problem: "Many buyers want to trade in their current car or pay in monthly installments, but leave because the dealer has no structured online trade-in evaluation tool.",
        solution: "We implement an Automated Trade-In Valuation Calculator and Auto Loan Repayment Simulator that pre-qualifies buyers before they visit your lot."
      }
    ],
    features: [
      {
        title: "Multi-Facet Vehicle Search & Filter Engine",
        description: "Lightning-fast smart filter allowing buyers to search by Make (Toyota, Mercedes, Lexus, Honda), Model, Year, Transmission, Fuel Type, Mileage, Price Range, and Condition.",
        benefit: "Allows serious buyers to find their exact dream car in seconds.",
        tag: "Smart Inventory"
      },
      {
        title: "Verified Documentation & VIN Inspection Center",
        description: "Embeds verified Carfax / AutoCheck report previews, genuine Customs duty clearance badges, and certified mechanic inspection checklists on every car page.",
        benefit: "Eliminates buyer skepticism and commands premium vehicle pricing.",
        tag: "Verified Trust"
      },
      {
        title: "Instant Car Trade-In Valuation System",
        description: "A simple 3-step form where car owners submit their vehicle's make, year, mileage, and photos to receive an estimated trade-in valuation toward a new purchase.",
        benefit: "Unlocks an endless pipeline of pre-owned trade-in inventory.",
        tag: "Trade-In Engine"
      },
      {
        title: "Test Drive & Video Walkthrough Booking Desk",
        description: "Direct calendar integration allowing buyers to schedule a VIP physical test drive or request a personalized WhatsApp video walkaround of the vehicle's engine and interior.",
        benefit: "Connects high-intent buyers directly to showroom sales reps.",
        tag: "Test Drive Booking"
      }
    ],
    caseStudy: {
      clientName: "Juptree Automobiles Showroom Team",
      companyName: "Juptree Automobiles (Abuja) — Portfolio Case Study",
      serviceProvided: "Luxury Automotive Digital Showroom & Inventory Architecture",
      resultQuote: "Multi-device responsive showroom featuring categorized SUV, Sedan, Bus & Truck inventory filters and instant WhatsApp buyer inspection funnels.",
      metrics: "Live Dealership Platform · Multi-Category Inventory Search",
      link: "/portfolio/case-studies/juptree-automobile"
    },
    keyServiceAreas: [
      { name: "Lagos (Berger, Ikeja & Lekki)", slug: "lagos", reason: "The primary automotive clearing port and largest retail car market in West Africa" },
      { name: "Abuja (CBD & Garki)", slug: "abuja-fct", reason: "Hub for luxury armored SUVs, corporate fleet orders, and government vehicle tenders" },
      { name: "Kano (Commercial Axis)", slug: "kano", reason: "Major Northern distribution center for commercial haulage trucks and durable utility vehicles" },
      { name: "Anambra (Nnewi & Onitsha)", slug: "anambra", reason: "The automotive components and commercial transport capital of Eastern Nigeria" }
    ],
    faqs: [
      {
        question: "Can our sales staff add new car arrivals from their mobile phones?",
        answer: "Yes. We engineer a streamlined mobile dashboard where your lot manager can photograph a new arrival, enter the price and mileage, upload photos, and publish the listing in under two minutes."
      },
      {
        question: "Can we automatically share vehicle listings to WhatsApp and Instagram?",
        answer: "Yes. Every car listing includes 1-click WhatsApp sharing with pre-formatted vehicle specs, photos, and direct quotation links, making it effortless to send inventory to prospective buyers."
      },
      {
        question: "Do you integrate auto loan and financing calculator tools?",
        answer: "Yes. We build custom financing calculators where buyers can enter their monthly budget and down payment to see estimated monthly repayments, helping your dealership capture corporate salary earners."
      }
    ],
    startingPrice: "From ₦375,000 (or Custom Scope)",
    typicalTimeline: "3 to 4 Weeks"
  },

  // 5. E-COMMERCE & MULTI-VENDOR ONLINE RETAIL
  {
    id: "ecommerce-retail",
    slug: "ecommerce-retail",
    name: "E-Commerce & Multi-Vendor Online Retail",
    shortName: "E-Commerce / Retail",
    tagline: "Streamlined Checkout, Automated Interstate Logistics & Reliable Payment Gateways",
    category: "Commerce & Automotive",
    metaTitle: "E-Commerce Web Design & Multi-Vendor Development in Nigeria | Mindware",
    metaDescription: "Sell products nationwide. Mindware builds ultra-fast e-commerce stores, Paystack/Flutterwave integrations, and automated interstate delivery shipping in Nigeria.",
    heroHeadline: "Scalable E-Commerce Engines Engineered for Fast Checkout & Nationwide Delivery.",
    heroSubheadline: "Stop losing sales to slow loading pages and broken payments. Build an enterprise online store with sub-second speeds, multi-currency checkout, and automated shipping to all 36 States.",
    overview: "Digital commerce in Nigeria is moving beyond basic social media DMs into dedicated, high-converting branded e-commerce ecosystems. Whether you are a direct-to-consumer fashion brand in Lekki, an electronics distributor in Alaba, or a wholesale merchant in Onitsha, Mindware builds bulletproof e-commerce platforms engineered for mobile devices, fluctuating network speeds, and Nigerian payment realities.",
    marketPotential: "Nigeria's online retail economy continues expanding rapidly as consumers demand fast mobile checkout, reliable bank/card payment confirmations, and structured nationwide delivery tracking.",
    iconName: "ShoppingBag",
    metrics: [
      { label: "Checkout Flow", value: "1-Page UX", description: "Streamlined mobile cart & direct payment gateway support" },
      { label: "National Reach", value: "36 States", description: "Structured interstate & LGA shipping fee calculators" },
      { label: "Payment Methods", value: "Multi-Currency", description: "Paystack, Flutterwave, bank transfer & international cards" },
      { label: "Delivery Window", value: "3 to 4 Weeks", description: "Scoped turnaround for scalable online retail builds" }
    ],
    challenges: [
      {
        title: "High Checkout Abandonment & Payment Friction",
        problem: "Shoppers frequently abandon carts when checkout forms demand unnecessary steps or payment gateways fail to confirm Nigerian bank transfers and cards smoothly.",
        solution: "We implement 1-Page Express Checkouts with reliable Paystack, Flutterwave, Monnify, and direct bank transfer options designed for minimal payment friction."
      },
      {
        title: "Interstate Shipping & Dispatch Chaos",
        problem: "Sellers struggle to compute delivery fees accurately for different states (Lagos vs Abuja vs Kano vs Port Harcourt), leading to customer disputes or margin erosion.",
        solution: "We integrate Automated Multi-State Logistics Calculators that compute shipping fees by state, city, and package weight with automated order status alerts."
      },
      {
        title: "Sluggish Mobile Performance on Clunky Themes",
        problem: "Many online stores run bloated generic themes that load slowly over Nigerian mobile networks, causing smartphone visitors to leave before browsing products.",
        solution: "We build modern, lightweight React and headless e-commerce engines tuned for fast catalog browsing and checkout on standard mobile connections."
      }
    ],
    features: [
      {
        title: "Fast Mobile Commerce Architecture",
        description: "Built with modern responsive web engineering and edge asset caching to keep catalog browsing and product pages crisp on mobile connections.",
        benefit: "Reduces mobile friction and supports higher checkout completion.",
        tag: "Mobile Speed"
      },
      {
        title: "Unified Local & Multi-Currency Payment Engine",
        description: "Native integration for Nigerian Naira (Paystack, Flutterwave, USSD, OPay, Bank Transfer) and international foreign exchange currencies (Stripe, USD, GBP, EUR).",
        benefit: "Allows you to capture payments seamlessly from both local and diaspora shoppers.",
        tag: "Payment Gateway"
      },
      {
        title: "Automated 36-State Courier Shipping Matrix",
        description: "Dynamic shipping rates computed for doorstep delivery across all 36 States + FCT, with automated dispatch tracking updates sent to customers.",
        benefit: "Eliminates shipping fee disputes and clarifies delivery expectations.",
        tag: "Nationwide Delivery"
      },
      {
        title: "Automated WhatsApp Cart Follow-Up",
        description: "Supports timely, opt-in WhatsApp follow-up workflows connecting undecided shoppers with product answers and direct checkout assistance.",
        benefit: "Recovers high-intent online buyers before purchase intent fades.",
        tag: "Lead Recovery"
      }
    ],
    caseStudy: {
      clientName: "Mindware Digital Commerce Practice",
      companyName: "E-Commerce & Multi-Channel Retail Architecture",
      serviceProvided: "High-Conversion Online Retail & Payment Infrastructure",
      resultQuote: "We engineer mobile-first storefronts built around Paystack/Flutterwave checkouts, clean catalog search, automated order updates, and WhatsApp buyer assistance across Nigeria.",
      metrics: "Custom Headless Retail · Local & Multi-Currency Payment Ready",
      link: "/contact?topic=digital-transformation"
    },
    keyServiceAreas: [
      { name: "Lagos (Lekki, Ikeja & Alaba)", slug: "lagos", reason: "Nigeria's commercial e-commerce capital with the highest density of online shoppers and dispatch networks" },
      { name: "Abuja (CBD, Wuse & Maitama)", slug: "abuja-fct", reason: "High disposable income market with massive demand for luxury fashion, electronics, and lifestyle goods" },
      { name: "Rivers (Port Harcourt)", slug: "rivers", reason: "Fast-growing consumer retail market demanding reliable doorstep interstate delivery" },
      { name: "Kano (Commercial Hub)", slug: "kano", reason: "Wholesale commodity, textile, and FMCG trading hub expanding into B2B digital commerce" }
    ],
    faqs: [
      {
        question: "Can our store accept payments from customers in the UK and USA?",
        answer: "Yes. We configure multi-currency checkouts allowing diaspora shoppers to pay with their international Visa, Mastercard, or Apple Pay in USD, GBP, or EUR, with funds deposited directly into your Nigerian domiciliary or corporate account."
      },
      {
        question: "Can we integrate automated inventory sync with our physical retail store?",
        answer: "Yes. We integrate POS (Point of Sale) inventory synchronization so that whenever an item is sold in your physical boutique or warehouse, the online stock count updates automatically to prevent double-selling."
      },
      {
        question: "How do automated WhatsApp abandoned cart reminders work?",
        answer: "When a customer adds products to their cart and fills in their phone number but drops off before paying, our system automatically sends a personalized WhatsApp reminder with their exact cart items and a secure 1-click link to finish their purchase."
      }
    ],
    startingPrice: "From ₦375,000 (or Custom Scope)",
    typicalTimeline: "3 to 4 Weeks"
  },

  // 6. INTERIOR FINISHING & ARCHITECTURAL CRAFTSMANSHIP
  {
    id: "interior-finishing-craftsmanship",
    slug: "interior-finishing-craftsmanship",
    name: "Interior Finishing & Architectural Craftsmanship",
    shortName: "Interior Finishing / Fit-Out",
    tagline: "Before/After Remodeling Showcases, Commercial Fit-Out Portals & Material Specifications",
    category: "Built Environment & Finishing",
    metaTitle: "Web Design for Interior Designers, Remodeling & Finishing Contractors | Mindware",
    metaDescription: "Showcase your fit-out craftsmanship. Mindware builds luxury interior design websites, remodeling before/after showcases, and quote estimation portals in Nigeria.",
    heroHeadline: "Transform Premium Finishing Craftsmanship into Elite Corporate & Residential Contracts.",
    heroSubheadline: "Move beyond casual Instagram posts. Build a prestigious architectural finishing portal featuring interactive before/after transformation sliders and corporate fit-out quotation engines.",
    overview: "High-end interior finishing, commercial office fit-outs, luxury epoxy/terrazzo flooring, acoustic ceilings, and architectural remodeling demand visual perfection and meticulous craftsmanship. High-net-worth homeowners, corporate facility managers, and commercial developers in Ikoyi, Maitama, and Port Harcourt do not award multimillion-naira fit-out projects via casual DMs; they demand proof of material durability, precision craftsmanship, and turnkey project delivery.",
    marketPotential: "Corporate office remodeling and luxury residential finishing projects across Lagos, Abuja, and Port Harcourt demand verifiable portfolios and detailed material specifications before facility managers award contracts.",
    iconName: "Palette",
    metrics: [
      { label: "Visual Proof", value: "Before / After", description: "Interactive remodeling sliders & high-resolution project galleries" },
      { label: "Technical Spec", value: "Finish Library", description: "Detailed terrazzo, epoxy, marble & acoustic ceiling standards" },
      { label: "Commercial Intake", value: "Fit-Out RFQ", description: "Structured square-meter estimation & corporate quote funnels" },
      { label: "Delivery Window", value: "3 to 4 Weeks", description: "Scoped turnaround for luxury finishing portals" }
    ],
    challenges: [
      {
        title: "Instagram-Only Credibility Ceiling",
        problem: "Finishing contractors rely on social media photos where low-cost competitors steal their images, while corporate clients and developers refuse to award institutional contracts on Instagram.",
        solution: "We build an Authoritative Architectural Finishing Portal featuring verified project case studies, client testimonials, and technical material specification sheets."
      },
      {
        title: "Invisible Project Transformations",
        problem: "Clients struggle to visualize what a finishing contractor can do when taking over an uncompleted gray-shell building or a rundown corporate office.",
        solution: "We implement Interactive Before-and-After Image Comparison Sliders that allow prospective clients to drag back and forth to see jaw-dropping architectural transformations."
      },
      {
        title: "Vague Pricing & Lengthy Quote Friction",
        problem: "Clients want a ballpark idea of costs per square meter for epoxy, terrazzo, acoustic ceilings, or partitions, but leave when they encounter slow quote processes.",
        solution: "We deploy an Interactive Fit-Out Cost & Square-Meter Estimator that allows clients to enter room dimensions and finish preferences for instant initial estimates."
      }
    ],
    features: [
      {
        title: "Interactive Before & After Remodeling Sliders",
        description: "Engaging interactive image comparison sliders showing the exact raw gray-structure site vs. the final luxury architectural fit-out delivered by your team.",
        benefit: "Demonstrates undeniable craftsmanship and execution excellence.",
        tag: "Transformation Proof"
      },
      {
        title: "Material Specifications & Finish Quality Library",
        description: "Detailed catalog highlighting technical material grades: anti-microbial epoxy flooring, Italian porcelain tiles, acoustic ceiling decibel ratings, and tempered glass partitions.",
        benefit: "Validates premium pricing to corporate facility directors and luxury clients.",
        tag: "Material Specs"
      },
      {
        title: "Commercial Office Fit-Out Quotation Engine",
        description: "Structured B2B inquiry form allowing corporate clients to specify square meterage, office layout, ceiling height, and delivery deadlines for fast quotation turnaround.",
        benefit: "Filters out low-budget inquiries and captures serious enterprise contracts.",
        tag: "B2B Quoting"
      },
      {
        title: "Architectural 3D Render & VR Walkthrough Showcase",
        description: "Seamless integration for showcasing 3D architectural renders alongside physical project completions, proving your ability to deliver exact design visions.",
        benefit: "Commands immense respect from architectural firms and interior consultants.",
        tag: "3D Visuals"
      }
    ],
    caseStudy: {
      clientName: "Royalty Speed Finishing Enterprises",
      companyName: "Royalty Speed Finishing Enterprises (Lagos) — Portfolio Case Study",
      serviceProvided: "Architectural Flooring & Luxury Finishing Corporate Portal",
      resultQuote: "Bespoke portfolio showcasing terrazzo, Italian marble, and industrial epoxy flooring installations with square-meter quote intake for commercial and residential builders.",
      metrics: "Live Portfolio Showcase · Commercial & Residential Fit-Out Portal",
      link: "/portfolio/case-studies/royalty-finishing"
    },
    keyServiceAreas: [
      { name: "Lagos (Ikoyi, Victoria Island & Lekki)", slug: "lagos", reason: "Nigeria's luxury residential finishing and corporate headquarters fit-out epicenter" },
      { name: "Abuja (Maitama, Asokoro & Wuse 2)", slug: "abuja-fct", reason: "High-budget diplomatic mansions, federal agency executive suites, and luxury penthouses" },
      { name: "Rivers (Port Harcourt Old GRA)", slug: "rivers", reason: "Energy executive residences, corporate branch offices, and boutique commercial upgrades" },
      { name: "Edo (Benin City Commercial Core)", slug: "edo", reason: "Rapidly expanding modern hospitality and residential architectural remodeling hub" }
    ],
    faqs: [
      {
        question: "Can our website showcase our material catalogs like terrazzo chips, epoxy colors, and acoustic panels?",
        answer: "Yes. We design high-resolution digital material swatch books where clients can view color palettes, texture finishes, slip-resistance ratings, and durability warranties."
      },
      {
        question: "How do before-and-after sliders help close luxury remodeling clients?",
        answer: "Visual proof is the single most persuasive sales tool in interior remodeling. When clients can drag a slider to see a drab, dusty concrete space transform into a gleaming, marble-finish penthouse suite, their buying decision is made."
      },
      {
        question: "Can you help our interior finishing company rank on Google for corporate office fit-out terms?",
        answer: "Yes. We optimize your website for high-intent B2B search terms like 'commercial office fit out contractor in Victoria Island', 'epoxy industrial flooring Lagos', and 'luxury interior remodeling in Abuja'."
      }
    ],
    startingPrice: "From ₦295,000 (or Custom Scope)",
    typicalTimeline: "3 to 4 Weeks"
  }
];

export function getIndustryBySlug(slug: string): IndustryData | undefined {
  const normalized = slug.toLowerCase().trim();
  const directMatch = INDUSTRIES.find((ind) => ind.slug === normalized || ind.id === normalized);
  if (directMatch) return directMatch;

  // Aliases
  if (normalized === "oil-and-gas" || normalized === "marine" || normalized === "energy" || normalized === "oilfield") {
    return INDUSTRIES.find((i) => i.id === "oil-and-gas-marine");
  }
  if (normalized === "construction" || normalized === "civil-engineering" || normalized === "infrastructure") {
    return INDUSTRIES.find((i) => i.id === "construction-civil-engineering");
  }
  if (normalized === "real-estate" || normalized === "property" || normalized === "property-development") {
    return INDUSTRIES.find((i) => i.id === "real-estate-property-development");
  }
  if (normalized === "automotive" || normalized === "car-dealerships" || normalized === "dealerships" || normalized === "cars") {
    return INDUSTRIES.find((i) => i.id === "automotive-car-dealerships");
  }
  if (normalized === "ecommerce" || normalized === "e-commerce" || normalized === "retail" || normalized === "online-store") {
    return INDUSTRIES.find((i) => i.id === "ecommerce-retail");
  }
  if (normalized === "interior-finishing" || normalized === "interior-design" || normalized === "fit-out" || normalized === "remodeling") {
    return INDUSTRIES.find((i) => i.id === "interior-finishing-craftsmanship");
  }

  return undefined;
}

export function getRelatedIndustries(currentId: string): IndustryData[] {
  return INDUSTRIES.filter((ind) => ind.id !== currentId).slice(0, 3);
}
