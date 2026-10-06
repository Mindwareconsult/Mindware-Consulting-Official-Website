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
  // 1. OIL & GAS, OFFSHORE MARINE & ENERGY SERVICES
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
    marketPotential: "Nigeria's energy upstream and midstream operations involve over $15B in annual procurement, where contractor pre-qualification heavily inspects digital transparency, safety track records, and equipment readiness.",
    iconName: "Flame",
    metrics: [
      { label: "Tender Win Rate Lift", value: "+45%", description: "Higher qualification rate on institutional IOC and NipeX bids" },
      { label: "Average Contract Value", value: "₦150M+", description: "Typical commercial tender size for our energy sector clients" },
      { label: "Technical Audit Pass Rate", value: "100%", description: "Full alignment with statutory safety, QA/QC, and local content guidelines" },
      { label: "RFQ Inquiries Generated", value: "3.4x", description: "Increase in organic search commercial procurement inquiries" }
    ],
    challenges: [
      {
        title: "Rigid IOC Pre-Qualification Barriers",
        problem: "Procurement directors at IOCs immediately disqualify engineering contractors whose websites lack documented QA/QC policies, NUPRC permits, and organized technical capability statements.",
        solution: "We build dedicated Tender Compliance Hubs with secure, downloadable technical capability dossiers, audited certification manifests, and client testimonial verifications."
      },
      {
        title: "Invisible Marine Assets & Fleet Catalogs",
        problem: "Marine vessel owners (tugboats, barges, crew boats) lose lucrative charter contracts because charterers cannot view real-time fleet technical specifications, bollard pull ratings, or dynamic positioning classes online.",
        solution: "We develop interactive Vessel Fleet Catalogs with detailed marine specification sheets, Class certification badges, and direct charter availability inquiry engines."
      },
      {
        title: "Statutory HSE Verification Deficits",
        problem: "Energy operators are legally liable for safety. Contractors without clear HSE incident-free milestones (LTI metrics) and OSHA compliance documentation are filtered out at the desktop screening stage.",
        solution: "We integrate verified HSE Compliance Dashboards displaying cumulative Lost Time Injury (LTI) free man-hours, environmental policies, and workforce certification badges."
      }
    ],
    features: [
      {
        title: "NipeX & IOC Tender Compliance Architecture",
        description: "Bespoke digital architecture structured to mirror the exact pre-qualification criteria of NipeX, Shell, ExxonMobil, and TotalEnergies vendor registration portals.",
        benefit: "Accelerates contractor onboarding and eliminates desktop audit rejections.",
        tag: "Tender Ready"
      },
      {
        title: "Marine Vessel & Heavy Asset Fleet Showcase",
        description: "High-definition technical catalog featuring vessel dimensions, deck space, engine ratings, bunkering capacities, and downloadable marine specification sheets.",
        benefit: "Enables procurement executives to inspect and charter offshore assets in minutes.",
        tag: "Asset Discovery"
      },
      {
        title: "Cumulative HSE & Safety Milestone Dashboard",
        description: "Live interactive display of safety milestones, ISO 9001/14001/45001 certifications, statutory NUPRC permits, and emergency response protocols.",
        benefit: "Proves absolute commitment to zero-incident offshore and yard execution.",
        tag: "Safety Proof"
      },
      {
        title: "Offshore Technical Procurement RFQ Engine",
        description: "Encrypted, structured Request For Quotation (RFQ) portal where clients can upload engineering drawings, valve specs, or pipeline requirements for instant engineering review.",
        benefit: "Captures institutional RFQs with full technical parameters.",
        tag: "B2B Lead Flow"
      }
    ],
    caseStudy: {
      clientName: "Engr. Victor O.",
      companyName: "Vigox Engineering Ltd (Port Harcourt)",
      serviceProvided: "Marine Engineering Corporate Portal & IOC Tender Strategy",
      resultQuote: "Mindware built a world-class portal that positioned Vigox for multi-million naira offshore fabrication tenders in the Niger Delta, directly contributing to our qualification with IOC operators.",
      metrics: "₦350M+ in competitive tender bids qualified within 6 months of platform launch",
      link: "/case-studies"
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
        question: "Do you integrate HSE Level 1, 2, and 3 certification pathways for our workforce?",
        answer: "Yes. Through our certified Mindware Academy division, we integrate workforce safety upskilling pathways directly into your corporate profile, demonstrating to clients that your engineers and technicians hold valid, accredited safety tickets."
      }
    ],
    startingPrice: "₦1,850,000",
    typicalTimeline: "3 to 5 Weeks"
  },

  // 2. CIVIL ENGINEERING, CONSTRUCTION & INFRASTRUCTURE
  {
    id: "construction-civil-engineering",
    slug: "construction-civil-engineering",
    name: "Civil Engineering, Construction & Infrastructure",
    shortName: "Construction / Civil Engineering",
    tagline: "Verifiable Project Portfolios, BPP Federal Tender Compliance & Heavy Plant Capacity",
    category: "Energy & Infrastructure",
    metaTitle: "Web Design & B2B SEO for Construction & Civil Engineering Firms | Mindware",
    metaDescription: "Partner with Mindware to build prestigious civil engineering websites, federal contractor portals, and construction company SEO. Trusted by contractors across Nigeria.",
    heroHeadline: "Authoritative Web Platforms for Civil Contractors, Infrastructure Developers & EPC Builders.",
    heroSubheadline: "Transform your engineering credentials into compelling digital proof that wins multi-billion naira federal tenders, state infrastructure concessions, and private mega-developments.",
    overview: "Civil engineering and general construction in Nigeria is an intensely competitive industry where reputation, plant machinery ownership, and past project delivery determine who gets shortlisted. From federal road networks and bridges in Abuja to deep drainage, piling, and industrial estates in Lagos and Port Harcourt, Mindware engineers high-performance web platforms that showcase heavy plant equipment, completed projects, and engineering leadership.",
    marketPotential: "Nigeria's infrastructure deficit drives hundreds of billions of Naira in annual federal and state budgetary allocations, where Bureau of Public Procurement (BPP) qualification demands verifiable digital track records.",
    iconName: "Building2",
    metrics: [
      { label: "BPP Tender Qualification", value: "+60%", description: "Streamlined audit readiness for Federal Executive Council & BPP bids" },
      { label: "Project Portfolio Views", value: "5.2x", description: "Increase in time spent by government and commercial project directors" },
      { label: "Heavy Plant Sourcing", value: "+38%", description: "Growth in commercial plant hire and structural fabrication inquiries" },
      { label: "Load Speed on Mobile", value: "<1.4s", description: "Optimized for site engineers and executives on mobile networks" }
    ],
    challenges: [
      {
        title: "Disorganized Project Documentation",
        problem: "Contractors have completed landmark multi-million naira roads, bridges, and commercial towers, but have no high-definition photographic proof, drone footage, or structured engineering specifications online.",
        solution: "We curate Interactive Project Showcase Portfolios with before/after progress galleries, structural data (concrete cubic meters, road kilometers, piling depths), and client sign-off verifications."
      },
      {
        title: "Unproven Plant & Equipment Capacity",
        problem: "Tender evaluation committees need to confirm whether a contractor actually owns earthmovers, asphalt plants, excavators, and cranes, or will rely on unreliable third-party leasing.",
        solution: "We build dedicated Heavy Equipment & Plant Registers featuring equipment serial manifests, workshop maintenance protocols, and physical yard addresses."
      },
      {
        title: "Bureau of Public Procurement (BPP) Scrutiny",
        problem: "Federal ministries (Works, Housing, Aviation) reject bids from companies that appear transient, unregistered, or lacking corporate governance transparency.",
        solution: "We engineer institutional Corporate Governance & Compliance Centers highlighting CAC registration, COREN and NSE engineering licenses, PENCOM, ITF, and NSITF clearances."
      }
    ],
    features: [
      {
        title: "Interactive Mega-Project Case Study Engine",
        description: "Filterable portfolio categorized by sector (Roads & Bridges, High-Rise Residential, Industrial Warehouses, Marine Dredging) with technical data sheets and drone footage integration.",
        benefit: "Positions your firm as a proven delivery heavyweight in specific engineering disciplines.",
        tag: "Project Proof"
      },
      {
        title: "Heavy Equipment & Plant Asset Register",
        description: "A comprehensive digital inventory of your excavators, bulldozers, asphalt pavers, piling rigs, and batching plants with deployment status and yard locations.",
        benefit: "Demonstrates immediate mobilization readiness to tender boards.",
        tag: "Asset Readiness"
      },
      {
        title: "COREN & NSE Engineering Faculty Showcase",
        description: "Dedicated leadership directory showcasing registered COREN engineers, structural consultants, and project directors with their career achievements and certifications.",
        benefit: "Builds immense technical trust with institutional project sponsors.",
        tag: "Technical Team"
      },
      {
        title: "Bidding & Subcontractor Due Diligence Portal",
        description: "Structured vendor pre-qualification and joint-venture portal for international EPC firms seeking capable indigenous Nigerian construction partners.",
        benefit: "Attracts lucrative Tier-1 consortium partnerships.",
        tag: "JV Partnerships"
      }
    ],
    caseStudy: {
      clientName: "Engr. Nnamdi E.",
      companyName: "Cosmozel Construction Ltd (Lagos & Port Harcourt)",
      serviceProvided: "Civil Engineering Corporate Portal & Commercial Contractor SEO",
      resultQuote: "Mindware delivered a modern, professional website that transformed our ideas into a compelling digital reality, boosting industry trust and helping us win major corporate development tenders.",
      metrics: "35% increase in verified commercial project inquiries in the first quarter",
      link: "/case-studies"
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
    startingPrice: "₦1,650,000",
    typicalTimeline: "3 to 4 Weeks"
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
    marketPotential: "The Nigerian residential and commercial real estate market represents over $50B in asset valuation, with off-plan developments in Lagos, Abuja, and Port Harcourt attracting billions in diaspora remittances annually.",
    iconName: "Landmark",
    metrics: [
      { label: "Diaspora Conversion Lift", value: "+320%", description: "Increase in verified property subscriptions from overseas buyers" },
      { label: "Average Property Deal Size", value: "₦45M–₦350M", description: "Typical residential unit value sold through our developer funnels" },
      { label: "Lead Response Time", value: "<2 Mins", description: "Automated instant routing of buyer inquiries to senior sales closers" },
      { label: "Organic Search Dominance", value: "Top 3", description: "Page 1 Google ranking for high-intent property investment keywords" }
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
        problem: "Developers spend millions on Facebook, Instagram, and Google Ads, but lose 80% of leads because forms are clunky or customer service replies hours too late.",
        solution: "We deploy Automated Fast-Track Funnels with instant WhatsApp dispatch, automated installment plan calculators, and automated booking for physical and virtual Zoom site inspections."
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
      clientName: "Arc. Osita N.",
      companyName: "OSINES GROUP (Awka & Lagos)",
      serviceProvided: "Luxury Architectural & Real Estate Development Platform",
      resultQuote: "Mindware engineered an elite, SEO-optimized web platform and digital strategy that elevated our brand authority, showcased landmark developments, and drove qualified construction client inquiries across Nigeria.",
      metrics: "85% increase in high-net-worth residential inquiries within 4 months",
      link: "/case-studies"
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
    startingPrice: "₦1,950,000",
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
    marketPotential: "Over 500,000 vehicles are imported and transacted annually in Nigeria, where digital dealerships that provide verified paperwork and inventory search outsell traditional street-lot dealers 4 to 1.",
    iconName: "Car",
    metrics: [
      { label: "Showroom Visit Rate", value: "+210%", description: "Increase in scheduled test drives and lot walk-ins from online leads" },
      { label: "Inventory Turnover Speed", value: "18 Days", description: "Average time to sell a vehicle through our digital dealership funnels" },
      { label: "Customs Duty Trust Score", value: "100%", description: "Zero-doubt documentation verification badges that eliminate buyer fear" },
      { label: "Mobile Filter Speed", value: "<0.8s", description: "Instant inventory search across make, model, year, and price" }
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
      clientName: "Chief Emeka K.",
      companyName: "Apex Prestige Motors (Lagos & Abuja)",
      serviceProvided: "Luxury Automotive Digital Showroom & Inventory Management",
      resultQuote: "Mindware's digital showroom transformed our dealership. Clients now research our inventory online, verify the Customs documentation before arriving, and close purchases twice as fast.",
      metrics: "Average vehicle days-on-lot reduced from 42 days to 16 days",
      link: "/contact"
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
    startingPrice: "₦1,750,000",
    typicalTimeline: "3 to 4 Weeks"
  },

  // 5. E-COMMERCE & MULTI-VENDOR ONLINE RETAIL
  {
    id: "ecommerce-retail",
    slug: "ecommerce-retail",
    name: "E-Commerce & Multi-Vendor Online Retail",
    shortName: "E-Commerce / Retail",
    tagline: "Sub-Second Checkout, Automated Interstate Logistics & Zero-Drop Payment Gateways",
    category: "Commerce & Automotive",
    metaTitle: "E-Commerce Web Design & Multi-Vendor Development in Nigeria | Mindware",
    metaDescription: "Sell products nationwide. Mindware builds ultra-fast e-commerce stores, Paystack/Flutterwave integrations, and automated interstate delivery shipping in Nigeria.",
    heroHeadline: "Scalable E-Commerce Engines Engineered for Fast Checkout & Nationwide Delivery.",
    heroSubheadline: "Stop losing sales to slow loading pages and broken payments. Build an enterprise online store with sub-second speeds, multi-currency checkout, and automated shipping to all 36 States.",
    overview: "Digital commerce in Nigeria is moving beyond basic social media DMs into dedicated, high-converting branded e-commerce ecosystems. Whether you are a direct-to-consumer fashion brand in Lekki, an electronics distributor in Alaba, or a wholesale merchant in Onitsha, Mindware builds bulletproof e-commerce platforms engineered for mobile devices, fluctuating network speeds, and Nigerian payment realities.",
    marketPotential: "Nigeria's e-commerce market is projected to surpass $12B by 2027, with consumers increasingly expecting seamless mobile checkouts, immediate debit card/bank transfer confirmations, and real-time package tracking.",
    iconName: "ShoppingBag",
    metrics: [
      { label: "Checkout Conversion Lift", value: "+38%", description: "Increase in completed purchases due to friction-free payment flows" },
      { label: "Mobile Page Load Speed", value: "0.9s", description: "Ultra-fast headless architecture optimized for 3G/4G networks" },
      { label: "Cart Abandonment Drop", value: "-42%", description: "Reduction in lost sales via automated WhatsApp recovery triggers" },
      { label: "Nationwide Coverage", value: "36 States", description: "Real-time delivery cost calculations across all Nigerian LGAs" }
    ],
    challenges: [
      {
        title: "High Checkout Abandonment & Payment Friction",
        problem: "Shoppers abandon over 70% of carts because checkout forms require too many steps, or payment gateways fail when processing Nigerian debit cards.",
        solution: "We implement 1-Page Express Checkouts with instant Paystack, Flutterwave, Monnify, Apple Pay, and direct bank transfer options with zero payment drop-offs."
      },
      {
        title: "Interstate Shipping & Dispatch Chaos",
        problem: "Sellers struggle to compute delivery fees accurately for different states (Lagos vs Abuja vs Kano vs Port Harcourt), leading to customer disputes or margin erosion.",
        solution: "We integrate Automated Multi-State Logistics Calculators that compute exact shipping fees by state, city, and package weight with instant courier dispatch notifications."
      },
      {
        title: "Sluggish Mobile Performance on Clunky Themes",
        problem: "Most e-commerce stores use bloated generic themes that take 6+ seconds to load on mobile phones, causing over 50% of visitors to bounce before seeing a product.",
        solution: "We build modern, headless, lightweight React e-commerce engines that load catalog images and checkout pages in under one second on standard smartphone connections."
      }
    ],
    features: [
      {
        title: "Sub-Second Mobile Commerce Architecture",
        description: "Built with cutting-edge responsive web engineering and edge CDN caching, ensuring instant product page rendering and zero lag on mobile devices.",
        benefit: "Maximizes impulse buying and keeps bounce rates below 20%.",
        tag: "Lightning Speed"
      },
      {
        title: "Unified Local & Multi-Currency Payment Engine",
        description: "Native integration for Nigerian Naira (Paystack, Flutterwave, USSD, OPay, Bank Transfer) and international foreign exchange currencies (Stripe, USD, GBP, EUR).",
        benefit: "Allows you to capture payments seamlessly from both local and diaspora shoppers.",
        tag: "Payment Gateway"
      },
      {
        title: "Automated 36-State Courier Shipping Matrix",
        description: "Dynamic shipping rates computed for doorstep delivery across all 36 States + FCT, with automated dispatch tracking SMS alerts sent to customers.",
        benefit: "Eliminates shipping fee disputes and automates delivery logistics.",
        tag: "Nationwide Delivery"
      },
      {
        title: "Automated WhatsApp Abandoned Cart Recovery",
        description: "Triggers an automatic, friendly WhatsApp message with a direct 1-click checkout link to shoppers who add items to cart but do not complete payment.",
        benefit: "Recovers 15% to 25% of previously lost e-commerce revenue on autopilot.",
        tag: "Revenue Recovery"
      }
    ],
    caseStudy: {
      clientName: "Mrs. Folashade A.",
      companyName: "Zina Luxe Retail (Lagos & Nationwide)",
      serviceProvided: "High-Volume Direct-to-Consumer E-Commerce Platform",
      resultQuote: "Mindware's e-commerce architecture took our brand nationwide. Our mobile conversion rate doubled immediately, and our automated WhatsApp abandoned cart reminders recover over ₦2M every month.",
      metrics: "3.8x increase in monthly online revenue with automated order fulfillment",
      link: "/contact"
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
    startingPrice: "₦1,550,000",
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
    marketPotential: "Commercial office remodeling and luxury residential interior finishing in Nigeria is an estimated ₦180B annual market, driven by corporate headquarter relocations and premium estate upgrades.",
    iconName: "Palette",
    metrics: [
      { label: "Commercial Fit-Out Leads", value: "4.1x", description: "Increase in corporate office fit-out RFQs from facility directors" },
      { label: "Average Project Value", value: "₦18M–₦95M", description: "Typical commercial interior finishing contract size" },
      { label: "Material Spec Verification", value: "100%", description: "Clear client verification of epoxy, marble, acoustic, and timber standards" },
      { label: "Visual Engagement Time", value: "4.8 Mins", description: "Average user session duration on interactive before/after transformation showcases" }
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
      clientName: "Mr. Femi R.",
      companyName: "Royalty Speed Finishing Enterprises (Lagos)",
      serviceProvided: "Architectural Flooring & Luxury Finishing Corporate Portal",
      resultQuote: "Our web presence and local SEO engineered by Mindware ranked us as the preferred architectural finishing contractor for real estate developers and luxury homeowners in Ikoyi and Lekki.",
      metrics: "Generated over ₦85M in premium terrazzo and epoxy finishing contracts within 9 months",
      link: "/case-studies"
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
    startingPrice: "₦1,650,000",
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
