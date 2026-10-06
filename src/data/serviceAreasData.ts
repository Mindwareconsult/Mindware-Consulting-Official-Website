export type GeopoliticalZone =
  | "South West"
  | "South South"
  | "South East"
  | "North Central"
  | "North West"
  | "North East";

export interface StateLandmark {
  name: string;
  category: "Commercial" | "Industrial" | "Government" | "Transport" | "Tech Hub";
  description: string;
  query: string;
}

export interface StateServiceArea {
  id: string; // e.g. "lagos"
  slug: string; // e.g. "lagos"
  name: string; // "Lagos State"
  shortName: string; // "Lagos"
  capital: string; // "Ikeja"
  zone: GeopoliticalZone;
  lgasCount: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  officeType: "HQ & Innovation Hub" | "Regional Executive Center" | "Branch Office" | "Digital Client Operations & Field Support";
  officeAddress?: string;
  commercialHubs: string[];
  landmarks: StateLandmark[];
  dominantIndustries: string[];
  tagline: string;
  metaTitle: string;
  metaDescription: string;
  economicOverview: string;
  localServicesHighlights: {
    title: string;
    description: string;
    benefit: string;
  }[];
  localFaqs: {
    question: string;
    answer: string;
  }[];
  featuredClient?: {
    name: string;
    company: string;
    service: string;
    quote: string;
  };
}

export const GEOPOLITICAL_ZONES: { id: GeopoliticalZone | "All"; label: string; count: number }[] = [
  { id: "All", label: "All 36 States & FCT", count: 37 },
  { id: "South West", label: "South West", count: 6 },
  { id: "South South", label: "South South", count: 6 },
  { id: "South East", label: "South East", count: 5 },
  { id: "North Central", label: "North Central (inc. FCT)", count: 7 },
  { id: "North West", label: "North West", count: 7 },
  { id: "North East", label: "North East", count: 6 }
];

export const SERVICE_AREAS: StateServiceArea[] = [
  // 1. LAGOS
  {
    id: "lagos",
    slug: "lagos",
    name: "Lagos State",
    shortName: "Lagos",
    capital: "Ikeja",
    zone: "South West",
    lgasCount: 20,
    coordinates: { lat: 6.5244, lng: 3.3792 },
    officeType: "HQ & Innovation Hub",
    officeAddress: "Plot 12, Commercial Avenue, Ikeja & Victoria Island, Lagos, Nigeria",
    commercialHubs: ["Ikeja", "Victoria Island", "Lekki Phase 1", "Yaba Tech Cluster", "Marina & Broad Street", "Alaba International", "Apapa Port City"],
    landmarks: [
      { name: "Computer Village Ikeja", category: "Tech Hub", description: "West Africa's largest technology retail and ICT hardware hub.", query: "Computer Village, Ikeja, Lagos" },
      { name: "Eko Atlantic Financial District", category: "Commercial", description: "Billion-dollar premier coastal business city and commercial center.", query: "Eko Atlantic City, Lagos" },
      { name: "Lekki Free Trade Zone", category: "Industrial", description: "Strategic industrial zone hosting modern deep-sea ports and manufacturing facilities.", query: "Lekki Free Zone, Lagos" },
      { name: "Murtala Muhammed International Airport", category: "Transport", description: "Nigeria's busiest international air gateway connecting global commerce.", query: "Murtala Muhammed International Airport, Lagos" }
    ],
    dominantIndustries: ["FinTech & Financial Services", "Telecommunications & Cloud", "Commercial Real Estate", "Maritime & Port Logistics", "Creative Media & E-Commerce"],
    tagline: "Commercial Megacity & Africa's Leading Technology Capital",
    metaTitle: "Web Design, Local SEO & Enterprise IT Services in Lagos State | Mindware Consulting",
    metaDescription: "Dominate search rankings in Lagos. Mindware builds custom websites, SEO strategies, and cloud portals for businesses in Ikeja, Victoria Island, Lekki, and Yaba.",
    economicOverview: "Lagos is the commercial nerve center of Nigeria and the fifth largest economy in Africa. Enterprises here compete fiercely for digital visibility, demanding ultra-fast, mobile-first websites and conversion-focused search engine optimization.",
    localServicesHighlights: [
      { title: "High-Converting Corporate Portals", description: "Bespoke corporate websites engineered for multinational conglomerates and venture-backed startups.", benefit: "Built for speed, security, and institutional tender requirements." },
      { title: "Dominant Lagos Local SEO", description: "Hyper-targeted ranking campaigns targeting 'Ikeja', 'Victoria Island', 'Lekki', and 'Lagos' keywords.", benefit: "Capture high-intent commercial buyers searching Google daily." },
      { title: "In-Person Executive Training Hub", description: "Physical weekend masterclasses in PMP® project governance and certified HSE compliance.", benefit: "Accredited certifications delivered at our Lagos training suites." }
    ],
    localFaqs: [
      { question: "Can Mindware meet our corporate team physically in Ikeja or Victoria Island?", answer: "Yes. Mindware Consulting maintains executive consultation suites in Lagos and frequently conducts on-site strategy workshops for enterprise clients across Ikeja, VI, Lekki, and Yaba." },
      { question: "How quickly can you rank our business on Google search in Lagos?", answer: "Our technical SEO architecture delivers initial Page 1 indexing within 4 to 8 weeks for local business terms, scaling to competitive commercial terms through continuous programmatic optimization." },
      { question: "Do you offer web design for international export and foreign exchange payments?", answer: "Yes. We integrate multi-currency payment gateways (Paystack, Flutterwave, Stripe) and configure localized international SEO for Lagos businesses exporting services globally." }
    ],
    featuredClient: {
      name: "Royalty Speed Finishing",
      company: "Royalty Speed Finishing Services Ltd",
      service: "Corporate Web Design & Commercial Contractor SEO",
      quote: "Mindware's Lagos SEO implementation positioned us as the preferred architectural finishing contractor for real estate developers across Ikoyi and Lekki."
    }
  },

  // 2. FCT ABUJA
  {
    id: "abuja-fct",
    slug: "abuja-fct",
    name: "Federal Capital Territory (Abuja)",
    shortName: "Abuja (FCT)",
    capital: "Abuja (CBD)",
    zone: "North Central",
    lgasCount: 6,
    coordinates: { lat: 9.0765, lng: 7.3986 },
    officeType: "Regional Executive Center",
    officeAddress: "Constitution Avenue, Central Business District, Abuja, Nigeria",
    commercialHubs: ["Central Business District (CBD)", "Maitama", "Wuse 2", "Garki II", "Jabi Lake Business Zone", "Gwarinpa", "Asokoro"],
    landmarks: [
      { name: "Aso Rock & Presidential Villa", category: "Government", description: "The seat of the Federal Government of Nigeria and symbol of national governance.", query: "Aso Rock, Abuja" },
      { name: "NNPC Towers CBD", category: "Commercial", description: "Headquarters of the state oil corporation and focal point of energy procurement.", query: "NNPC Towers, Abuja" },
      { name: "Nnamdi Azikiwe International Airport", category: "Transport", description: "Federal capital transport hub connecting diplomatic and commercial missions.", query: "Nnamdi Azikiwe International Airport, Abuja" },
      { name: "Jabi Lake Commercial District", category: "Commercial", description: "Thriving hospitality, retail, and corporate entertainment waterfront.", query: "Jabi Lake Mall, Abuja" }
    ],
    dominantIndustries: ["Federal Government Procurement & Tenders", "Diplomatic & NGO Missions", "Civil Engineering & Construction", "Hospitality & Corporate Events", "Defense & Security Contracting"],
    tagline: "Seat of Government, Federal Contracting & Diplomatic Gateway",
    metaTitle: "Web Design, Tender Portals & SEO Services in Abuja FCT | Mindware Consulting",
    metaDescription: "Partner with Abuja's premier web design and digital agency. We build tender-ready federal contractor portals, corporate websites, and SEO in Maitama, Wuse & CBD.",
    economicOverview: "Abuja is home to federal ministries, departments, foreign embassies, and the country's highest concentration of civil engineering and public procurement contractors. Websites here require institutional credibility, stringent security, and tender-ready compliance.",
    localServicesHighlights: [
      { title: "Federal Tender & Bidding Portals", description: "Government contractor portals compliant with Bureau of Public Procurement (BPP) and ITF guidelines.", benefit: "Win federal tenders with audit-ready documentation and institutional digital credibility." },
      { title: "Abuja Enterprise SEO", description: "Dominate Google searches for corporate consulting, construction, and hospitality in the FCT.", benefit: "Capture foreign mission RFPs and federal procurement bids." },
      { title: "Executive PMP® & HSE Certification", description: "Executive weekend training for senior civil servants, military leadership, and project directors.", benefit: "Nationally and internationally accredited certifications." }
    ],
    localFaqs: [
      { question: "Do you design websites compliant with Federal Government contractor pre-qualification?", answer: "Yes. Our Abuja web solutions include statutory compliance layouts, corporate registration displays, HSE credentials, and secure downloadable technical capability statements." },
      { question: "Where in Abuja can we schedule an in-person briefing?", answer: "Our consulting directors meet corporate and government contractor clients across the Central Business District (CBD), Maitama, and Wuse 2." },
      { question: "Can you provide continuous security audits and hosting for Abuja-based organizations?", answer: "Yes. We deploy military-grade SSL certificates, daily encrypted cloud backups, and DDoS mitigation specifically configured for public-sector and corporate entities." }
    ],
    featuredClient: {
      name: "Alhaji Bello Mohammed",
      company: "Quanxi Limited (Abuja & Kano)",
      service: "Heavy Equipment Procurement Web Portal & SEO",
      quote: "Mindware's corporate portal gave Quanxi the institutional credibility required to win federal agricultural machinery sourcing tenders in Abuja."
    }
  },

  // 3. RIVERS STATE (PORT HARCOURT)
  {
    id: "rivers",
    slug: "rivers",
    name: "Rivers State",
    shortName: "Rivers (Port Harcourt)",
    capital: "Port Harcourt",
    zone: "South South",
    lgasCount: 23,
    coordinates: { lat: 4.8156, lng: 7.0498 },
    officeType: "Regional Executive Center",
    officeAddress: "Trans-Amadi Industrial Layout & Old GRA, Port Harcourt, Rivers State",
    commercialHubs: ["Trans-Amadi Industrial Layout", "Port Harcourt Old GRA", "Oil Mill Commercial Area", "Onne Free Zone Port", "Bonny Island Terminal", "Rumuokoro Logistics Hub"],
    landmarks: [
      { name: "Trans-Amadi Industrial Layout", category: "Industrial", description: "Premier industrial estate housing multinational oilfield equipment and engineering yards.", query: "Trans Amadi Industrial Layout, Port Harcourt" },
      { name: "Port Harcourt Refining Company", category: "Industrial", description: "Major energy hub anchoring refining, petrochemicals, and downstream distribution.", query: "Port Harcourt Refinery, Rivers State" },
      { name: "Onne Deep Oil & Gas Port", category: "Transport", description: "Dedicated oil and gas logistics port managing maritime freight and heavy marine assets.", query: "Onne Free Zone, Port Harcourt" },
      { name: "Port Harcourt International Airport Omagwa", category: "Transport", description: "Crucial aviation hub serving the petroleum and maritime sectors of the Niger Delta.", query: "Port Harcourt International Airport, Rivers State" }
    ],
    dominantIndustries: ["Offshore Oilfield & Marine Engineering", "Energy & Petrochemicals", "Maritime Logistics & Dredging", "Industrial Safety & Environmental Compliance", "Heavy Equipment Procurement"],
    tagline: "Oil & Gas Industrial Capital & Niger Delta Maritime Epicenter",
    metaTitle: "Web Design, Offshore Marine SEO & HSE in Port Harcourt Rivers | Mindware",
    metaDescription: "Port Harcourt's trusted digital agency for oilfield, marine, and engineering firms. Tender-ready web design, SEO, and HSE Level 1-3 training in Trans-Amadi & GRA.",
    economicOverview: "Rivers State is the petroleum heart of West Africa. Businesses operating here cater to IOCs, marginal field operators, and major EPC contractors, demanding strict statutory HSE compliance, NipeX qualification visibility, and industrial-grade web architecture.",
    localServicesHighlights: [
      { title: "NipeX & IOC Tender-Ready Websites", description: "Specialized oilfield service web platforms built to meet international oil company pre-qualification standards.", benefit: "Showcase equipment manifests, QA/QC certifications, and safety records." },
      { title: "Niger Delta Marine & Energy SEO", description: "Targeted organic search optimization for marine charters, pipeline integrity, and valve procurement.", benefit: "Generate high-value commercial RFQs from energy operators." },
      { title: "Port Harcourt HSE Training Hub", description: "Physical classroom training and safety drills in accredited HSE Levels 1, 2, and 3.", benefit: "Fast-track corporate safety compliance and offshore employment tickets." }
    ],
    localFaqs: [
      { question: "Have you built websites for Port Harcourt oilfield service companies?", answer: "Yes. Mindware has designed corporate web platforms for premier engineering firms like Vigox Engineering Ltd and Priziangori Global Services in Port Harcourt." },
      { question: "Do you offer practical HSE training classes in Port Harcourt?", answer: "Yes. Our certified safety faculties conduct live hazard identification drills, PPE workshops, and statutory audit preparation across Rivers State." },
      { question: "How does local SEO help engineering contractors in Trans-Amadi?", answer: "When procurement managers at Shell, Chevron, or TotalEnergies search for specialized vendors in Port Harcourt, our local SEO ensures your firm appears at the top of Google search results." }
    ],
    featuredClient: {
      name: "Engr. Victor O.",
      company: "Vigox Engineering Ltd (Port Harcourt)",
      service: "Marine Engineering Corporate Portal & SEO",
      quote: "Mindware built a world-class portal that positioned Vigox for multi-million naira offshore fabrication tenders in the Niger Delta."
    }
  },

  // 4. KANO
  {
    id: "kano",
    slug: "kano",
    name: "Kano State",
    shortName: "Kano",
    capital: "Kano",
    zone: "North West",
    lgasCount: 44,
    coordinates: { lat: 12.0022, lng: 8.592 },
    officeType: "Digital Client Operations & Field Support",
    commercialHubs: ["Kano Municipal", "Bompai Industrial Estate", "Dawanau International Grain Market", "Sabon Gari Market", "Challawa Industrial Zone"],
    landmarks: [
      { name: "Dawanau International Grain Market", category: "Commercial", description: "The largest agricultural food market in Sub-Saharan Africa.", query: "Dawanau Market, Kano" },
      { name: "Bompai Industrial Area", category: "Industrial", description: "Pioneering manufacturing district housing textile, agro-allied, and plastics factories.", query: "Bompai, Kano" },
      { name: "Mallam Aminu Kano International Airport", category: "Transport", description: "Historic aviation gateway serving trans-Saharan trade routes.", query: "Aminu Kano International Airport, Kano" }
    ],
    dominantIndustries: ["Agro-Processing & Grain Export", "Wholesale & Cross-Border Commerce", "Textile & Leather Manufacturing", "Commercial Logistics", "Solar Energy & Irrigation"],
    tagline: "Commercial Epicenter of Northern Nigeria & Trans-Saharan Trade",
    metaTitle: "Web Design, Agro-Export E-Commerce & SEO in Kano | Mindware Consulting",
    metaDescription: "Expand your Kano enterprise across West Africa. Mindware creates multilingual e-commerce portals, agro-commodity websites, and local SEO in Bompai & Kano City.",
    economicOverview: "Kano is the historic trading crossroads of Northern Nigeria and the Sahel. Commercial merchants and agro-processors here need digital catalogs, verified export portals, and search optimization to capture regional and international buyers.",
    localServicesHighlights: [
      { title: "Agro-Commodity Sourcing Portals", description: "Multilingual trade portals showcasing sesame seeds, grains, leather, and ginger exports.", benefit: "Connect directly with European, Asian, and Middle Eastern bulk buyers." },
      { title: "B2B Wholesale Digital Catalogs", description: "Streamlined online catalogs for Bompai and Challawa manufacturers.", benefit: "Automate supply orders from distributors across Northern Nigeria and Niger Republic." },
      { title: "Northern Region SEO Optimization", description: "Local Google ranking tailored for commercial buyers in Kano, Kaduna, Katsina, and Abuja.", benefit: "Generate qualified wholesale orders." }
    ],
    localFaqs: [
      { question: "Can you create multi-lingual websites in English and Hausa?", answer: "Yes. Mindware develops multilingual platforms supporting English, Hausa, Arabic, and French for seamless cross-border regional trade." },
      { question: "How can a Kano agricultural exporter benefit from your SEO services?", answer: "We optimize your product pages for international commodity terms, allowing global buyers to find your verified company directly without costly middlemen." }
    ]
  },

  // 5. OYO (IBADAN)
  {
    id: "oyo",
    slug: "oyo",
    name: "Oyo State",
    shortName: "Oyo (Ibadan)",
    capital: "Ibadan",
    zone: "South West",
    lgasCount: 33,
    coordinates: { lat: 7.3775, lng: 3.947 },
    officeType: "Branch Office",
    commercialHubs: ["Dugbe Central Business District", "Bodija", "Ring Road Commercial Corridor", "Iwo Road Transit Hub", "Oluyole Industrial Estate", "Ogbomoso"],
    landmarks: [
      { name: "Cocoa House Dugbe", category: "Commercial", description: "Historic 26-storey skyscraper, the first modern high-rise in tropical Africa.", query: "Cocoa House, Ibadan" },
      { name: "University of Ibadan Tech Precinct", category: "Tech Hub", description: "Nigeria's premier university fostering engineering talent and research.", query: "University of Ibadan, Oyo State" },
      { name: "Oluyole Industrial Estate", category: "Industrial", description: "Manufacturing hub housing FMCG, plastics, and pharmaceutical packaging plants.", query: "Oluyole Industrial Estate, Ibadan" }
    ],
    dominantIndustries: ["Agro-Allied & Poultry Production", "FMCG Manufacturing & Distribution", "Higher Education & Academic Research", "Logistics & Dry Ports", "Emerging Tech Startups"],
    tagline: "Industrial Heritage, Academic Excellence & Emerging Tech Corridor",
    metaTitle: "Web Design, Local SEO & Digital Growth in Ibadan Oyo State | Mindware",
    metaDescription: "Accelerate your Ibadan business. Mindware delivers responsive web design, local SEO, and digital marketing in Dugbe, Bodija, Ring Road, and Oluyole.",
    economicOverview: "Ibadan is the largest metropolitan city by geographical area in West Africa and a rapidly expanding hub for technology, FMCG, and modern agro-enterprise along the Lagos-Ibadan railway corridor.",
    localServicesHighlights: [
      { title: "Ibadan Local Business SEO", description: "Dominate Google search results for Ibadan clinics, schools, law firms, and manufacturing brands.", benefit: "Drive walk-in customers and telephone bookings." },
      { title: "Agro-Enterprise Web Portals", description: "Websites built for poultry hatcheries, commercial farms, and processing facilities.", benefit: "Attract nationwide distributor networks." },
      { title: "E-Commerce & Retail Websites", description: "Modern online shops with integrated Paystack checkout and doorstep delivery tracking.", benefit: "Expand retail reach across Oyo and neighboring states." }
    ],
    localFaqs: [
      { question: "How does the Lagos-Ibadan corridor benefit our digital growth?", answer: "With rapid industrial decentralization from Lagos, an optimized website positions your Ibadan firm to capture corporate contracts and logistics opportunities at lower operational costs." }
    ]
  },

  // 6. OGUN (ABEOKUTA & SAGAMU)
  {
    id: "ogun",
    slug: "ogun",
    name: "Ogun State",
    shortName: "Ogun",
    capital: "Abeokuta",
    zone: "South West",
    lgasCount: 20,
    coordinates: { lat: 7.1475, lng: 3.3619 },
    officeType: "Digital Client Operations & Field Support",
    commercialHubs: ["Ota Industrial Corridor", "Sagamu Interchange", "Abeokuta CBD", "Ibafo & Mowe", "Agbara Industrial Estate", "Ijebu-Ode"],
    landmarks: [
      { name: "Agbara Industrial Estate", category: "Industrial", description: "Nigeria's densest manufacturing enclave with over 50 multinational factories.", query: "Agbara Industrial Estate, Ogun State" },
      { name: "Olumo Rock Abeokuta", category: "Commercial", description: "Historic cultural monument and major tourism destination.", query: "Olumo Rock, Abeokuta" },
      { name: "Sagamu Logistics Interchange", category: "Transport", description: "Critical intersection connecting Western, Eastern, and Northern Nigerian trade corridors.", query: "Sagamu Interchange, Ogun State" }
    ],
    dominantIndustries: ["Industrial Manufacturing & FMCG", "Building Materials & Cement Production", "Logistics & Warehousing", "Commercial Agriculture", "Real Estate Satellite Developments"],
    tagline: "Manufacturing Capital of Nigeria & Gateway to Industrial Expansion",
    metaTitle: "Web Design & B2B Industrial SEO in Ogun State (Ota, Sagamu, Agbara) | Mindware",
    metaDescription: "B2B web design and industrial SEO in Ogun State. Serving manufacturing plants, logistics hubs, and businesses in Ota, Sagamu, Agbara, and Abeokuta.",
    economicOverview: "Ogun State hosts the highest concentration of factories in Nigeria. Manufacturers and industrial suppliers here need robust corporate portals to interface with national distribution networks and institutional buyers.",
    localServicesHighlights: [
      { title: "Industrial & Factory Corporate Websites", description: "Portals for manufacturers, chemical processors, and cement distributors.", benefit: "Showcase manufacturing capacity, ISO certifications, and supply catalogs." },
      { title: "Supply Chain & Logistics SEO", description: "Rank for warehousing, heavy transport, and raw material sourcing in Ogun and Lagos.", benefit: "Capture commercial supply contracts." }
    ],
    localFaqs: [
      { question: "Do you service manufacturing plants in Agbara and Ota?", answer: "Yes. We work extensively with industrial manufacturing plants and B2B suppliers across Agbara, Ota, and Sagamu." }
    ]
  },

  // 7. ANAMBRA (ONITSHA & NNEWI)
  {
    id: "anambra",
    slug: "anambra",
    name: "Anambra State",
    shortName: "Anambra",
    capital: "Awka",
    zone: "South East",
    lgasCount: 21,
    coordinates: { lat: 6.2209, lng: 7.0722 },
    officeType: "Branch Office",
    commercialHubs: ["Onitsha Main Market", "Nnewi Industrial Hub", "Awka Capital Territory", "Ekwulobia", "Ogbaru Maritime Axis"],
    landmarks: [
      { name: "Onitsha Main Market & River Niger Bridge", category: "Commercial", description: "Commercial powerhouse of West Africa and primary goods distribution gateway.", query: "River Niger Bridge, Onitsha" },
      { name: "Nnewi Automotive Industrial Zone", category: "Industrial", description: "The 'Detroit of Africa', premier automotive parts and industrial manufacturing hub.", query: "Nnewi, Anambra State" },
      { name: "Anambra International Cargo Airport Umueri", category: "Transport", description: "Modern cargo airport accelerating international import/export commerce.", query: "Anambra International Cargo Airport, Umueri" }
    ],
    dominantIndustries: ["Automotive Parts Manufacturing", "Wholesale Import & Export Distribution", "Plastics & Household Manufacturing", "Commercial Banking & Microfinance", "Pharmaceutical Distribution"],
    tagline: "Commercial Powerhouse of the East & Automotive Innovation Capital",
    metaTitle: "Web Design, E-Commerce & SEO in Onitsha, Nnewi & Awka Anambra | Mindware",
    metaDescription: "Expand your trade across Nigeria. Mindware delivers high-speed e-commerce, wholesale catalogs, and local SEO for businesses in Onitsha, Nnewi, and Awka.",
    economicOverview: "Anambra is an entrepreneurial titan. From the vast mercantile corridors of Onitsha to the engineering plants of Nnewi, Anambra businesses require digital sales channels that match their commercial ambitions.",
    localServicesHighlights: [
      { title: "Automotive & Industrial Parts E-Commerce", description: "Online inventory catalogs and trade platforms for Nnewi manufacturers and spare parts dealers.", benefit: "Sell spare parts and industrial goods to buyers nationwide." },
      { title: "Wholesale Trade Portals for Onitsha", description: "Bulk ordering portals with automated invoice generation and transport logistics tracking.", benefit: "Reduce cash friction and streamline nationwide supply orders." }
    ],
    localFaqs: [
      { question: "Can our Onitsha market shop sell goods to buyers in Abuja and Lagos with your platform?", answer: "Yes. We integrate secure online payment systems and direct courier tracking so customers anywhere in Nigeria can order directly from your Onitsha store." }
    ]
  },

  // 8. ENUGU
  {
    id: "enugu",
    slug: "enugu",
    name: "Enugu State",
    shortName: "Enugu",
    capital: "Enugu",
    zone: "South East",
    lgasCount: 17,
    coordinates: { lat: 6.4584, lng: 7.5464 },
    officeType: "Regional Executive Center",
    commercialHubs: ["Ogbete Main Market", "Independence Layout", "New Haven", "Emene Industrial Area", "Nsukka University City"],
    landmarks: [
      { name: "Akanu Ibiam International Airport", category: "Transport", description: "International aviation gateway connecting the South East directly to global destinations.", query: "Akanu Ibiam International Airport, Enugu" },
      { name: "Emene Industrial Layout", category: "Industrial", description: "Strategic industrial zone hosting beverage manufacturing and steel processing.", query: "Emene, Enugu" },
      { name: "Coal City Heritage Center", category: "Commercial", description: "Historic administration center and modern administrative hub.", query: "Independence Layout, Enugu" }
    ],
    dominantIndustries: ["Tech Startups & Creative Media", "Hospitality & Tourism", "Agro-Enterprise & Cashew Export", "Healthcare & Medical Services", "Real Estate Development"],
    tagline: "Historical Capital of Eastern Nigeria & Rising Regional Tech Hub",
    metaTitle: "Web Design, Local SEO & Tech Talent Training in Enugu State | Mindware",
    metaDescription: "Build your digital footprint in the Coal City. Mindware provides premium web development, SEO, and IT corporate training in Independence Layout and New Haven.",
    economicOverview: "Enugu is rapidly reinventing itself as the tech and creative heart of Eastern Nigeria, boasting top universities, peaceful living conditions, and an active startup ecosystem.",
    localServicesHighlights: [
      { title: "Enugu Tech Startup & SME Websites", description: "Modern, high-speed web apps and corporate websites for emerging businesses.", benefit: "Attract angel investors and regional clients." },
      { title: "Hospitality & Hotel Booking Engines", description: "Direct booking engines with zero commission fees for Enugu luxury hotels and resorts.", benefit: "Maximize direct occupancy and guest revenue." }
    ],
    localFaqs: [
      { question: "Do you offer digital training programs in Enugu?", answer: "Yes. Mindware's Academy offers virtual and hybrid cohorts in Web Development, Technical SEO, and PMP® certification for professionals across Enugu." }
    ]
  },

  // 9. DELTA (WARRI & ASABA)
  {
    id: "delta",
    slug: "delta",
    name: "Delta State",
    shortName: "Delta (Warri & Asaba)",
    capital: "Asaba",
    zone: "South South",
    lgasCount: 25,
    coordinates: { lat: 5.6797, lng: 5.9189 },
    officeType: "Branch Office",
    commercialHubs: ["Warri Commercial City", "Asaba Capital Territory", "Effurun Industrial Hub", "Sapele Port Axis", "Ughelli Oil Corridor", "Agbor"],
    landmarks: [
      { name: "Warri Commercial Port", category: "Transport", description: "Historic deep-water port serving Niger Delta maritime and offshore supply vessels.", query: "Warri Port, Delta State" },
      { name: "Asaba International Airport", category: "Transport", description: "Fast-growing aviation hub serving commercial travel across the River Niger.", query: "Asaba International Airport, Delta State" },
      { name: "Delta Steel Complex Aladja", category: "Industrial", description: "Pioneering steel manufacturing and fabrication center.", query: "Delta Steel Company, Aladja" }
    ],
    dominantIndustries: ["Oil & Gas Well Services", "Maritime Transport & Barging", "Steel & Heavy Fabrication", "Film Production & Creative Media", "Commercial Agriculture & Aquaculture"],
    tagline: "Energy Frontier, Maritime Trade & Entertainment Crossroad",
    metaTitle: "Web Design, Oilfield SEO & HSE Safety Training in Warri & Asaba Delta | Mindware",
    metaDescription: "Delta State's premier web agency for energy, marine, and commercial firms. SEO, tender websites, and HSE training in Warri, Effurun, and Asaba.",
    economicOverview: "Delta State bridges heavy offshore oil and gas engineering in Warri with governance, Nollywood film production, and commercial expansion in the capital, Asaba.",
    localServicesHighlights: [
      { title: "Marine & Dredging Contractor Portals", description: "Showcase vessel fleets, safety milestones, and NipeX audit readiness.", benefit: "Position for lucrative offshore charter contracts." },
      { title: "Accredited HSE Levels 1, 2, 3 in Warri", description: "Practical safety certifications for engineers, safety marshals, and offshore technicians.", benefit: "Qualify for international offshore employment." }
    ],
    localFaqs: [
      { question: "Can your HSE training help our Warri-based personnel pass IOC audits?", answer: "Yes. Our HSE curriculum complies with OSHA and Nigerian regulatory frameworks, trusted by Chevron and Shell contractor personnel." }
    ]
  },

  // 10. AKWA IBOM (UYO)
  {
    id: "akwa-ibom",
    slug: "akwa-ibom",
    name: "Akwa Ibom State",
    shortName: "Akwa Ibom",
    capital: "Uyo",
    zone: "South South",
    lgasCount: 31,
    coordinates: { lat: 5.0377, lng: 7.9128 },
    officeType: "Branch Office",
    commercialHubs: ["Uyo Capital City", "Eket Oilfield Axis", "Ikot Ekpene Commercial Hub", "Oron Maritime Terminal", "Ibeno Offshore Coastal Zone"],
    landmarks: [
      { name: "Ibom Deep Sea Port Project", category: "Industrial", description: "Flagship maritime deep port positioned to become a regional transshipment hub.", query: "Ibom Deep Seaport, Akwa Ibom" },
      { name: "Victor Attah International Airport", category: "Transport", description: "Equipped with state-of-the-art MRO aviation facilities.", query: "Victor Attah International Airport, Uyo" },
      { name: "Ibom Icon Hotel & Golf Resort", category: "Commercial", description: "World-class hospitality destination hosting international conferences.", query: "Ibom Icon Hotel, Uyo" }
    ],
    dominantIndustries: ["Crude Petroleum & Offshore Drilling", "Aviation & Maintenance (MRO)", "Luxury Hospitality & Eco-Tourism", "High-Tech Smart Governance", "Commercial Agriculture & Palm Oil"],
    tagline: "Infrastructure Benchmark, Offshore Oil Giant & Tech Forward State",
    metaTitle: "Web Design, Local SEO & Enterprise IT in Uyo Akwa Ibom | Mindware",
    metaDescription: "Award-winning web development and SEO services in Uyo and Eket. Powering Akwa Ibom's oilfield, aviation, and hospitality enterprises.",
    economicOverview: "Akwa Ibom leads Nigeria in modern road infrastructure, industrial development, and petroleum output. Businesses here require sleek, institutional digital platforms to match the state's modern aesthetic.",
    localServicesHighlights: [
      { title: "Uyo Corporate & Tourism Portals", description: "Stunning digital interfaces for hospitality, architecture, and professional services.", benefit: "Project executive prestige to national and foreign investors." },
      { title: "Offshore Petroleum SEO", description: "Connect oilfield engineering companies in Eket and Uyo with IOC procurement teams.", benefit: "Generate high-value technical tenders." }
    ],
    localFaqs: [
      { question: "Do you design websites for hospitality and conference centers in Uyo?", answer: "Yes. We build responsive hotel portals with direct room booking, banquet scheduling, and event management." }
    ]
  },

  // 11. KADUNA
  {
    id: "kaduna",
    slug: "kaduna",
    name: "Kaduna State",
    shortName: "Kaduna",
    capital: "Kaduna",
    zone: "North West",
    lgasCount: 23,
    coordinates: { lat: 10.5105, lng: 7.4165 },
    officeType: "Digital Client Operations & Field Support",
    commercialHubs: ["Kaduna Central Business District", "Kakuri Industrial Area", "Zaria Academic City", "Kafanchan Transit Hub"],
    landmarks: [
      { name: "Kaduna Refining and Petrochemical Company", category: "Industrial", description: "Strategic inland refining and petrochemical processing plant.", query: "Kaduna Refinery, Kaduna" },
      { name: "Ahmadu Bello University Zaria", category: "Tech Hub", description: "One of the largest universities in Sub-Saharan Africa, pioneering engineering and science.", query: "Ahmadu Bello University, Zaria" },
      { name: "Kaduna Inland Dry Port", category: "Transport", description: "Nigeria's first operational inland dry port for hinterland cargo clearance.", query: "Kaduna Inland Dry Port" }
    ],
    dominantIndustries: ["Petrochemicals & Textiles", "Dry Port Logistics & Freight", "Defense Institutions & Security", "Commercial Agriculture & Ginger Export", "Higher Education"],
    tagline: "Industrial Heartland of the North & Historic Administrative Center",
    metaTitle: "Web Design, Local SEO & Dry Port Logistics IT in Kaduna | Mindware",
    metaDescription: "Professional web development and SEO in Kaduna and Zaria. Helping manufacturing, logistics, and agribusinesses dominate Google search.",
    economicOverview: "Kaduna is the administrative backbone of Northern Nigeria, hosting major defense academies, inland dry ports, and extensive agro-allied processing hubs.",
    localServicesHighlights: [
      { title: "Dry Port Freight & Logistics Portals", description: "Digital freight tracking, customs documentation portals, and cargo booking platforms.", benefit: "Accelerate inland cargo turnaround." },
      { title: "Kaduna Corporate SEO", description: "Local optimization for businesses in Kaduna CBD, Kakuri, and Zaria.", benefit: "Attract corporate and public sector procurement bids." }
    ],
    localFaqs: [
      { question: "Can you build websites for ginger and agricultural export firms in Kaduna?", answer: "Yes. We develop certified export websites with laboratory test certificate verification and bulk quotation request tools." }
    ]
  },

  // 12. EDO (BENIN CITY)
  {
    id: "edo",
    slug: "edo",
    name: "Edo State",
    shortName: "Edo (Benin City)",
    capital: "Benin City",
    zone: "South South",
    lgasCount: 18,
    coordinates: { lat: 6.335, lng: 5.6037 },
    officeType: "Digital Client Operations & Field Support",
    commercialHubs: ["Benin City Commercial Core", "Uselu", "Ikpoba Hill", "Auchi Commercial Center", "Ehor Agricultural Axis"],
    landmarks: [
      { name: "Benin City Historic Ring Road & King's Square", category: "Commercial", description: "The cultural and geographic epicenter of Benin City.", query: "King's Square, Benin City" },
      { name: "Benin City Airport", category: "Transport", description: "Key domestic aviation gateway connecting Edo to Lagos and Abuja.", query: "Benin Airport, Edo State" },
      { name: "Edo Production Center", category: "Industrial", description: "Multi-purpose light manufacturing and MSME technology hub.", query: "Edo Production Center, Benin City" }
    ],
    dominantIndustries: ["Agro-Allied (Oil Palm & Rubber)", "Edo Innovates Tech Hubs", "Commercial Real Estate", "Creative Arts & Cultural Heritage", "Interstate Transport & Logistics"],
    tagline: "Cradle of Culture, Agro-Industrial Pioneer & Tech Talent Corridor",
    metaTitle: "Web Design, SEO & E-Commerce in Benin City Edo State | Mindware",
    metaDescription: "Grow your Edo business online. Mindware creates responsive web platforms, digital marketing, and local SEO for businesses in Benin City and Auchi.",
    economicOverview: "Edo State is an agricultural powerhouse (oil palm, rubber, cassava) with a booming digital tech initiative, positioned strategically at the crossroads of Southern and Northern transport arteries.",
    localServicesHighlights: [
      { title: "Agro-Processing & Plantation Portals", description: "Websites for oil palm estates, rubber exporters, and processing mills.", benefit: "Showcase sustainable production credentials to institutional buyers." },
      { title: "Benin City Local Business SEO", description: "Rank your business at the top of Google for local searches in Benin City.", benefit: "Increase walk-in customers and telephone inquiries." }
    ],
    localFaqs: [
      { question: "Do you support businesses in the Edo Innovates ecosystem?", answer: "Yes. We partner with tech startups, scale-ups, and commercial brands across Edo State." }
    ]
  },

  // 13. KWARA (ILORIN)
  {
    id: "kwara",
    slug: "kwara",
    name: "Kwara State",
    shortName: "Kwara",
    capital: "Ilorin",
    zone: "North Central",
    lgasCount: 16,
    coordinates: { lat: 8.4966, lng: 4.5421 },
    officeType: "Digital Client Operations & Field Support",
    commercialHubs: ["Ilorin City Center", "Taiwo Road Commercial Belt", "Challenge Commercial Zone", "Offa Trading Center", "Jebba Industrial Axis"],
    landmarks: [
      { name: "Ilorin International Airport", category: "Transport", description: "Designated cargo and passenger gateway in North Central Nigeria.", query: "Ilorin International Airport, Kwara State" },
      { name: "University of Ilorin Complex", category: "Tech Hub", description: "Major academic community driving research and technical talent.", query: "University of Ilorin, Kwara State" },
      { name: "Jebba Paper Mill & Hydro Corridor", category: "Industrial", description: "Historic industrial manufacturing zone on the River Niger.", query: "Jebba, Kwara State" }
    ],
    dominantIndustries: ["Commercial Agriculture & Cashew Processing", "Sugar Production & Refining", "Aviation & Cargo Logistics", "Education & Research", "SME Trade"],
    tagline: "State of Harmony & Gateway between North and South",
    metaTitle: "Web Design, Agro-Business SEO & IT in Ilorin Kwara State | Mindware",
    metaDescription: "Professional website design and local SEO in Ilorin and Offa. Elevate your Kwara commercial enterprise with Mindware Consulting.",
    economicOverview: "Kwara State combines agricultural fertility with strategic geographic positioning between Northern and South-Western Nigerian consumer markets.",
    localServicesHighlights: [
      { title: "Agro-Processing Brand Portals", description: "Web design tailored for commercial cashew, rice, and sugar processors.", benefit: "Attract institutional contracts and distributors." },
      { title: "Ilorin Local SEO & Google Business Profile", description: "Optimize local search visibility across Ilorin, Offa, and Omu-Aran.", benefit: "Dominate local search traffic." }
    ],
    localFaqs: [
      { question: "How can local SEO help businesses in Ilorin?", answer: "Local SEO guarantees that when residents and visiting business travelers search for services in Ilorin, your company appears directly in Google Maps and the top 3 search results." }
    ]
  },

  // 14. PLATEAU (JOS)
  {
    id: "plateau",
    slug: "plateau",
    name: "Plateau State",
    shortName: "Plateau",
    capital: "Jos",
    zone: "North Central",
    lgasCount: 17,
    coordinates: { lat: 9.8965, lng: 8.8583 },
    officeType: "Digital Client Operations & Field Support",
    commercialHubs: ["Jos City Center", "Terminus Commercial District", "Bukuru Industrial Hub", "Rayfield Business Enclave", "Mangu Agro Axis"],
    landmarks: [
      { name: "Rayfield Business Corridor", category: "Commercial", description: "Upscale corporate, diplomatic, and executive zone in Jos.", query: "Rayfield, Jos" },
      { name: "Yakubu Gowon Airport Heipang", category: "Transport", description: "Key air transport facility serving Plateau State.", query: "Yakubu Gowon Airport, Jos" },
      { name: "National Institute for Policy and Strategic Studies (NIPSS)", category: "Government", description: "Nigeria's apex policy think tank in Kuru.", query: "NIPSS Kuru, Plateau State" }
    ],
    dominantIndustries: ["Solid Mineral Mining & Tin Processing", "Temperate Horticultural Farming (Potatoes, Apples, Strawberries)", "Tourism & Hospitality", "Public Policy & Strategic Research", "Emerging Tech Hubs"],
    tagline: "Home of Peace & Tourism, Mining Frontier & Agro-Haven",
    metaTitle: "Web Design, Mining & Agro-Tourism SEO in Jos Plateau State | Mindware",
    metaDescription: "Build a standout digital presence in Jos. Mindware provides website design, mining directory SEO, and agro-commerce platforms across Plateau State.",
    economicOverview: "Plateau State's temperate climate and rich mineral deposits make it a unique hub for mining companies, high-value horticulture, and eco-tourism retreats.",
    localServicesHighlights: [
      { title: "Mining & Solid Mineral Compliance Websites", description: "Corporate portals showcasing mining concessions, environmental rehabilitation, and mineral grades.", benefit: "Satisfy ministry licensing audits and global mineral buyers." },
      { title: "Jos Eco-Tourism & Hospitality SEO", description: "Digital booking platforms for Plateau resorts, wildlife parks, and guest lodges.", benefit: "Attract vacationers and corporate retreat planners." }
    ],
    localFaqs: [
      { question: "Can you build websites for solid mineral export firms in Jos?", answer: "Yes. We design compliant websites with mineral assay reports, laboratory certifications, and international quotation tools." }
    ]
  },

  // 15. IMO (OWERRI)
  {
    id: "imo",
    slug: "imo",
    name: "Imo State",
    shortName: "Imo",
    capital: "Owerri",
    zone: "South East",
    lgasCount: 27,
    coordinates: { lat: 5.4891, lng: 7.0176 },
    officeType: "Digital Client Operations & Field Support",
    commercialHubs: ["Owerri Urban Commercial Center", "Aladinma", "World Bank Housing Estate Corridor", "Orlu Commercial Hub", "Okigwe Trading Center"],
    landmarks: [
      { name: "Sam Mbakwe International Cargo Airport", category: "Transport", description: "Pioneering state-built cargo and commercial passenger airport.", query: "Sam Mbakwe Cargo Airport, Owerri" },
      { name: "Owerri Hospitality Corridor", category: "Commercial", description: "Renowned entertainment and luxury hotel capital of the South East.", query: "New Owerri, Imo State" },
      { name: "Federal University of Technology Owerri (FUTO)", category: "Tech Hub", description: "Premier engineering technology institution graduating high-caliber software developers.", query: "FUTO, Owerri" }
    ],
    dominantIndustries: ["Hospitality, Nightlife & Tourism", "Oil & Gas Upstream E&P (Ohaji/Egbema)", "Engineering & ICT Services", "Real Estate & Urban Development", "SME Retail Commerce"],
    tagline: "Hospitality Capital of Eastern Nigeria & Emerging Energy Frontier",
    metaTitle: "Web Design, Hotel Booking Engines & SEO in Owerri Imo State | Mindware",
    metaDescription: "Grow your Owerri business online. Mindware designs luxury hotel booking websites, oilfield support portals, and local SEO in Owerri and Orlu.",
    economicOverview: "Owerri is celebrated as the hospitality capital of the South East, while also hosting productive petroleum fields in Ohaji/Egbema and top technical universities.",
    localServicesHighlights: [
      { title: "Luxury Hotel & Event Center Websites", description: "Direct booking engines with automated SMS and WhatsApp confirmation for Owerri hotels.", benefit: "Eliminate high OTA commission fees." },
      { title: "Owerri Local Business SEO", description: "Top ranking for local Owerri services, private hospitals, schools, and real estate developers.", benefit: "Capture affluent local and diaspora customers." }
    ],
    localFaqs: [
      { question: "How do you help Owerri hotels increase direct bookings?", answer: "We implement mobile-first hotel websites with instant room booking, zero commissions, Paystack card processing, and targeted local Google Ads." }
    ]
  },

  // 16. ABIA (ABA & UMUAHIA)
  {
    id: "abia",
    slug: "abia",
    name: "Abia State",
    shortName: "Abia (Aba & Umuahia)",
    capital: "Umuahia",
    zone: "South East",
    lgasCount: 17,
    coordinates: { lat: 5.532, lng: 7.486 },
    officeType: "Digital Client Operations & Field Support",
    commercialHubs: ["Aba Commercial & Industrial Megahub", "Ariaria International Market", "Umuahia Capital Hub", "Osisioma Industrial Belt", "Obohia Road Footwear Hub"],
    landmarks: [
      { name: "Ariaria International Market", category: "Commercial", description: "Renowned 'China of Africa', manufacturing center for leather, shoes, and textiles.", query: "Ariaria International Market, Aba" },
      { name: "Geometric Power Plant Osisioma", category: "Industrial", description: "Nigeria's first integrated independent power transmission and distribution ring.", query: "Geometric Power, Aba" },
      { name: "Umuahia National War Museum", category: "Commercial", description: "National historic institution and cultural heritage center.", query: "National War Museum, Umuahia" }
    ],
    dominantIndustries: ["Footwear & Leathergoods Manufacturing", "Garment & Fashion Fabrication", "Light Engineering & Metallurgy", "Commerce & Commodity Trading", "Independent Power & Industrial Parks"],
    tagline: "SME Capital of Africa & Industrial Fabrication Powerhouse",
    metaTitle: "E-Commerce, Manufacturing Web Design & SEO in Aba & Umuahia Abia | Mindware",
    metaDescription: "Take 'Made-in-Aba' products to the world. Mindware designs high-conversion e-commerce stores, wholesale catalogs, and B2B SEO in Aba and Umuahia.",
    economicOverview: "With dedicated 24/7 power from the Geometric power project, Aba's legendary shoemakers, garment manufacturers, and fabricators are scaling aggressively into domestic and international retail markets.",
    localServicesHighlights: [
      { title: "'Made in Aba' Global E-Commerce Portals", description: "Sell leather shoes, bags, and custom apparel to buyers in Lagos, the UK, and North America.", benefit: "Expand beyond cash markets into global foreign currency sales." },
      { title: "B2B Wholesale Ordering Systems", description: "Automate bulk manufacturing orders and custom production schedules for fashion brands.", benefit: "Secure contracted commercial production runs." }
    ],
    localFaqs: [
      { question: "Can you help Aba manufacturers accept payments from overseas buyers in dollars or pounds?", answer: "Yes. We integrate Stripe, Paystack, and international payment processors to enable seamless card and bank payments from international clients." }
    ]
  },

  // 17. BENUE (MAKURDI)
  {
    id: "benue",
    slug: "benue",
    name: "Benue State",
    shortName: "Benue",
    capital: "Makurdi",
    zone: "North Central",
    lgasCount: 23,
    coordinates: { lat: 7.7322, lng: 8.5214 },
    officeType: "Digital Client Operations & Field Support",
    commercialHubs: ["Makurdi Riverport Axis", "Wurukum Commercial Hub", "Gboko Industrial Corridor", "Otukpo Commercial Hub", "Katsina-Ala"],
    landmarks: [
      { name: "River Benue Bridge Makurdi", category: "Transport", description: "Strategic bridge connecting Southern, Eastern, and Northern transport networks.", query: "River Benue Bridge, Makurdi" },
      { name: "Dangote Cement Plant Gboko", category: "Industrial", description: "Major industrial cement production facility anchoring regional manufacturing.", query: "Dangote Cement Gboko, Benue State" },
      { name: "Makurdi River Beach & Port", category: "Commercial", description: "Vibrant riverbank commercial trade center for freshwater fish and crops.", query: "Makurdi, Benue State" }
    ],
    dominantIndustries: ["Commercial Agriculture (Yams, Cassava, Soya Beans, Citrus)", "Food Processing & Milling", "Cement & Building Materials", "River Transport & Logistics", "Education"],
    tagline: "Food Basket of the Nation & Agro-Industrial Granary",
    metaTitle: "Web Design, Agro-Processing SEO & Digital Portals in Makurdi Benue | Mindware",
    metaDescription: "Empower your Benue agribusiness. Mindware delivers e-commerce web design, bulk commodity trade platforms, and SEO in Makurdi, Gboko, and Otukpo.",
    economicOverview: "Benue is Nigeria's agricultural powerhouse, leading the nation in yam, soya bean, fruit, and grain production, with accelerating investments in agro-allied processing and packaging.",
    localServicesHighlights: [
      { title: "Agro-Commodity Exchange & Auction Portals", description: "Online platforms for bulk agricultural off-takers and food packaging processors.", benefit: "Eliminate supply-chain middlemen and sell at true market value." },
      { title: "Makurdi Business SEO", description: "Ensure your commercial enterprise ranks #1 in local Google searches across Benue.", benefit: "Attract institutional purchasing contracts." }
    ],
    localFaqs: [
      { question: "How does a website help a yam or soybean farming cooperative in Benue?", answer: "A verified digital portal connects cooperatives directly with food processing multinationals in Lagos and export aggregators, securing seasonal off-take agreements." }
    ]
  },

  // 18. CROSS RIVER (CALABAR)
  {
    id: "cross-river",
    slug: "cross-river",
    name: "Cross River State",
    shortName: "Cross River",
    capital: "Calabar",
    zone: "South South",
    lgasCount: 18,
    coordinates: { lat: 4.9757, lng: 8.3417 },
    officeType: "Digital Client Operations & Field Support",
    commercialHubs: ["Calabar Municipal", "Calabar Free Trade Zone (CFTZ)", "Ikom Cross-Border Axis", "Ogoja Agricultural Hub", "Akamkpa Mining Belt"],
    landmarks: [
      { name: "Calabar Free Trade Zone & Seaport", category: "Industrial", description: "Pioneering export processing zone hosting manufacturing and petroleum tank farms.", query: "Calabar Free Trade Zone" },
      { name: "Margaret Ekpo International Airport", category: "Transport", description: "Aviation facility serving tourism, trade, and regional business.", query: "Margaret Ekpo Airport, Calabar" },
      { name: "Tinapa Business Resort & Studio", category: "Commercial", description: "Dedicated international trade, duty-free retail, and film production facility.", query: "Tinapa Business Resort, Calabar" }
    ],
    dominantIndustries: ["Eco-Tourism & Carnivals", "Free Trade Zone Manufacturing", "Maritime Shipping & Tank Farms", "Cocoa & Oil Palm Agriculture", "Solid Mineral Mining (Granite & Limestone)"],
    tagline: "The People's Paradise, Maritime Gateway & Tourism Icon",
    metaTitle: "Web Design, Tourism SEO & Free Trade Zone Portals in Calabar | Mindware",
    metaDescription: "Premium web development and SEO in Calabar and Ikom. Supporting Cross River's tourism, free zone, maritime, and cocoa export industries.",
    economicOverview: "Cross River State is celebrated for pristine environmental conservation, world-famous December carnival tourism, duty-free manufacturing, and direct maritime access to Central Africa.",
    localServicesHighlights: [
      { title: "Tourism & Hospitality Experience Portals", description: "Event ticketing and luxury booking platforms for Calabar carnival visitors and resorts.", benefit: "Monetize seasonal tourist surges effortlessly." },
      { title: "Free Trade Zone Logistics Portals", description: "Compliance web systems for importers and manufacturers operating in the Calabar FTZ.", benefit: "Smooth international trade documentation." }
    ],
    localFaqs: [
      { question: "Do you build event ticketing websites for festivals in Calabar?", answer: "Yes. We build high-traffic ticketing websites with instant QR code ticket delivery and automated scanning." }
    ]
  },

  // 19. BORNO (MAIDUGURI)
  {
    id: "borno",
    slug: "borno",
    name: "Borno State",
    shortName: "Borno",
    capital: "Maiduguri",
    zone: "North East",
    lgasCount: 27,
    coordinates: { lat: 11.8311, lng: 13.151 },
    officeType: "Digital Client Operations & Field Support",
    commercialHubs: ["Monday Market Maiduguri", "Baga Road Fish Market", "Post Office Commercial District", "Biu Commercial Hub"],
    landmarks: [
      { name: "Maiduguri International Airport", category: "Transport", description: "Strategic aviation gateway serving humanitarian, commercial, and government flights.", query: "Maiduguri International Airport" },
      { name: "University of Maiduguri & Teaching Hospital", category: "Tech Hub", description: "Major academic and medical research complex in the Lake Chad basin.", query: "University of Maiduguri" },
      { name: "Maiduguri Monday Market", category: "Commercial", description: "Vibrant trans-border trading center for commodities, dried fish, and textiles.", query: "Monday Market, Maiduguri" }
    ],
    dominantIndustries: ["Humanitarian & NGO Procurement", "Lake Chad Basin Agriculture & Fisheries", "Cross-Border Trade with Chad, Niger & Cameroon", "Gum Arabic & Cattle Trading", "Infrastructure Reconstruction"],
    tagline: "Home of Peace & Trade Gateway to the Lake Chad Basin",
    metaTitle: "Web Design, NGO Procurement Systems & SEO in Maiduguri Borno | Mindware",
    metaDescription: "Professional web development and NGO-compliant contractor portals in Maiduguri. Empowering Borno reconstruction and trans-border commerce.",
    economicOverview: "Maiduguri is the historic center of the Lake Chad basin, actively undergoing massive infrastructure rehabilitation and cross-border commercial renewal with Chad, Cameroon, and Niger.",
    localServicesHighlights: [
      { title: "NGO & Donor Procurement Vendor Portals", description: "Compliance websites designed for contractors bidding on UN, USAID, and Federal tenders.", benefit: "Pass strict vendor due diligence and compliance audits." },
      { title: "Agricultural Commodity Sourcing Portals", description: "Digital showcases for gum arabic, dried fish, and sesame exporters.", benefit: "Connect with verified national off-takers." }
    ],
    localFaqs: [
      { question: "Can you build websites that satisfy international NGO vendor verification?", answer: "Yes. We incorporate complete anti-fraud protections, audited company documentation displays, and whistleblowing frameworks." }
    ]
  },

  // 20. ONDO (AKURE)
  {
    id: "ondo",
    slug: "ondo",
    name: "Ondo State",
    shortName: "Ondo",
    capital: "Akure",
    zone: "South West",
    lgasCount: 18,
    coordinates: { lat: 7.2571, lng: 5.2058 },
    officeType: "Digital Client Operations & Field Support",
    commercialHubs: ["Akure Commercial Core", "Ondo City", "Ore Logistics Junction", "Owo Heritage Center", "Ikare Akoko", "Ilaje Coastal Petroleum Belt"],
    landmarks: [
      { name: "Akure Airport", category: "Transport", description: "Domestic air gateway supporting business and agricultural transport.", query: "Akure Airport, Ondo State" },
      { name: "Ore Commercial Crossroads", category: "Transport", description: "Bustling transit and wholesale goods hub connecting Western and Eastern Nigeria.", query: "Ore, Ondo State" },
      { name: "Federal University of Technology Akure (FUTA)", category: "Tech Hub", description: "Renowned technical institution driving software and engineering innovation.", query: "FUTA, Akure" }
    ],
    dominantIndustries: ["Cocoa Export & Agro-Processing", "Bitumen & Solid Mineral Exploration", "Offshore Crude Oil (Ilaje)", "Higher Education & Software Talent", "Timber & Rubber Manufacturing"],
    tagline: "Sunshine State, Cocoa Capital & Deep Natural Resource Hub",
    metaTitle: "Web Design, Cocoa Export SEO & IT Services in Akure Ondo State | Mindware",
    metaDescription: "Expand your Ondo business. Mindware delivers web development, cocoa export portals, and local SEO in Akure, Ondo City, and Ore.",
    economicOverview: "Ondo State produces over 40% of Nigeria's cocoa and holds the world's second-largest bitumen deposit, alongside rich offshore oil concessions in Ilaje.",
    localServicesHighlights: [
      { title: "Cocoa & Commodity Traceability Portals", description: "Websites showing farm-to-shipment tracking compliant with European Union Deforestation Regulations (EUDR).", benefit: "Ensure seamless export clearance to European ports." },
      { title: "Akure Local Business SEO", description: "Rank your professional firm, hospital, or school on Page 1 of Google in Akure.", benefit: "Attract local clients and regional contracts." }
    ],
    localFaqs: [
      { question: "Do you design websites compliant with EU deforestation export rules for cocoa?", answer: "Yes. We build digital traceability modules that allow buyers to verify batch origins and regulatory documentation online." }
    ]
  },

  // 21. OSUN (OSOGBO)
  {
    id: "osun",
    slug: "osun",
    name: "Osun State",
    shortName: "Osun",
    capital: "Osogbo",
    zone: "South West",
    lgasCount: 30,
    coordinates: { lat: 7.7827, lng: 4.5418 },
    officeType: "Digital Client Operations & Field Support",
    commercialHubs: ["Osogbo Urban Core", "Ile-Ife Historic Academic Hub", "Ilesa Gold & Brewery Belt", "Ede", "Ikirun"],
    landmarks: [
      { name: "Obafemi Awolowo University (OAU) Ile-Ife", category: "Tech Hub", description: "Legendary university producing top Nigerian software engineers and entrepreneurs.", query: "Obafemi Awolowo University, Ile-Ife" },
      { name: "Osun-Osogbo Sacred Grove", category: "Commercial", description: "UNESCO World Heritage site attracting international cultural tourists annually.", query: "Osun Osogbo Sacred Grove" },
      { name: "Ilesa Mining & Commercial Belt", category: "Industrial", description: "Rich gold mining and beverage manufacturing district.", query: "Ilesa, Osun State" }
    ],
    dominantIndustries: ["Artisanal & Commercial Gold Mining", "Cultural Tourism & UNESCO Heritage", "Higher Education & Tech Talent", "Commercial Cocoa & Palm Farming", "Retail SME Commerce"],
    tagline: "State of the Living Spring, Cultural Fountain & Gold Mining Hub",
    metaTitle: "Web Design, Tourism SEO & Mining Portals in Osogbo & Ile-Ife Osun | Mindware",
    metaDescription: "Professional web development and SEO in Osogbo, Ile-Ife, and Ilesa. Boost your business with Mindware Consulting's expert digital solutions.",
    economicOverview: "Osun State blends rich Yoruba cultural history with the prestigious academic talent of OAU Ile-Ife and burgeoning gold mining operations in Ilesa.",
    localServicesHighlights: [
      { title: "E-Commerce for Crafts & Cultural Fashion", description: "Sell authentic Osun adire textiles and art to international diaspora buyers.", benefit: "Accept multi-currency payments securely." },
      { title: "Osun Local SEO & Business Visibility", description: "Google Maps and local search optimization for businesses across Osogbo and Ile-Ife.", benefit: "Drive foot-traffic and customer calls." }
    ],
    localFaqs: [
      { question: "Can you build websites for fashion brands selling adire textiles internationally?", answer: "Yes. We set up international e-commerce platforms with worldwide DHL/FedEx shipping calculators and currency converters." }
    ]
  },

  // 22. SOKOTO
  {
    id: "sokoto",
    slug: "sokoto",
    name: "Sokoto State",
    shortName: "Sokoto",
    capital: "Sokoto",
    zone: "North West",
    lgasCount: 23,
    coordinates: { lat: 13.0059, lng: 5.2476 },
    officeType: "Digital Client Operations & Field Support",
    commercialHubs: ["Sokoto Central Commercial Zone", "Old Market", "Gwiwa", "Tambuwal Agro Hub", "Illela Border Corridor"],
    landmarks: [
      { name: "Sultan's Palace Sokoto", category: "Government", description: "Spiritual headquarters of the Nigerian Muslim community and historic heritage site.", query: "Sultan Palace, Sokoto" },
      { name: "Sadiq Abubakar III International Airport", category: "Transport", description: "Aviation hub facilitating regional travel and annual Hajj pilgrimages.", query: "Sultan Saddik Abubakar Airport, Sokoto" },
      { name: "BUA Cement Complex Kalambaina", category: "Industrial", description: "Ultra-modern mega cement production facility exporting across West Africa.", query: "BUA Cement, Sokoto" }
    ],
    dominantIndustries: ["Cement & Limestone Manufacturing", "Leather Tannery & Livestock Trade", "Garlic & Onion Agro-Export", "Solar Power Generation", "Cross-Border Trade with Niger Republic"],
    tagline: "Seat of the Caliphate, Cement Giant & Clean Energy Pioneer",
    metaTitle: "Web Design, Cement B2B SEO & Agro-Trade in Sokoto State | Mindware",
    metaDescription: "Transform your Sokoto business online. Mindware provides website design, export catalogs, and SEO in Sokoto and Illela.",
    economicOverview: "Sokoto is home to BUA Cement, massive limestone and gypsum reserves, world-famous Sokoto red goat leather, and vital trans-border trade routes into Niger.",
    localServicesHighlights: [
      { title: "Agro-Export & Leather Catalogs", description: "Showcase Sokoto leather, garlic, and onions to international off-takers.", benefit: "Direct commercial export deals." },
      { title: "Sokoto Local SEO & Maps Visibility", description: "Help corporate suppliers and logistics firms in Sokoto dominate local searches.", benefit: "Generate qualified B2B inquiries." }
    ],
    localFaqs: [
      { question: "Do you design multilingual websites for businesses in Sokoto?", answer: "Yes. We create bilingual English and Hausa websites tailored for trade across Northern Nigeria and the Sahel." }
    ]
  },

  // 23. KATSINA
  {
    id: "katsina",
    slug: "katsina",
    name: "Katsina State",
    shortName: "Katsina",
    capital: "Katsina",
    zone: "North West",
    lgasCount: 34,
    coordinates: { lat: 12.9855, lng: 7.6171 },
    officeType: "Digital Client Operations & Field Support",
    commercialHubs: ["Katsina City Central Market", "Funtua Agricultural Industrial Axis", "Daura Commercial Center", "Jibia Border Free Zone"],
    landmarks: [
      { name: "Katsina Ancient City Gates & Gobarau Minaret", category: "Commercial", description: "Historic 300-year-old architectural monument and learning landmark.", query: "Gobarau Minaret, Katsina" },
      { name: "Funtua Cotton & Textile Ginnery", category: "Industrial", description: "Historic heart of Nigerian cotton production and textile processing.", query: "Funtua, Katsina State" },
      { name: "Umaru Musa Yar'Adua Airport", category: "Transport", description: "Modern airport supporting regional executive and commercial travel.", query: "Katsina Airport" }
    ],
    dominantIndustries: ["Cotton Ginning & Textiles", "Grains & Groundnut Agriculture", "Border Trade with Niger Republic", "Renewable Solar Energy", "Ceramics & Solid Minerals"],
    tagline: "Home of Hospitality, Historic Learning & Cotton Belt Capital",
    metaTitle: "Web Design, Agro-Industrial SEO & Trade Portals in Katsina | Mindware",
    metaDescription: "Grow your enterprise in Katsina and Funtua. Mindware delivers responsive web design, export platforms, and local SEO across Katsina State.",
    economicOverview: "Katsina is a major agricultural production hub (cotton, groundnuts, grains) and a key cross-border trade gateway through Jibia into Maradi, Niger.",
    localServicesHighlights: [
      { title: "Textile & Cotton Ginnery Websites", description: "Web platforms for cotton ginners and garment manufacturers.", benefit: "Attract commercial textile buyers." },
      { title: "Katsina SEO & Google Business Presence", description: "Rank your enterprise for procurement and trade queries in Katsina.", benefit: "Capture regional distribution orders." }
    ],
    localFaqs: [
      { question: "How can a web portal help agricultural suppliers in Funtua?", answer: "A corporate web portal proves your production volume, quality certifications, and delivery capacity to multinational food and garment brands." }
    ]
  },

  // 24. BAUCHI
  {
    id: "bauchi",
    slug: "bauchi",
    name: "Bauchi State",
    shortName: "Bauchi",
    capital: "Bauchi",
    zone: "North East",
    lgasCount: 20,
    coordinates: { lat: 10.3158, lng: 9.8442 },
    officeType: "Digital Client Operations & Field Support",
    commercialHubs: ["Bauchi City Center", "Wunti Market", "Azare Commercial Hub", "Misau", "Jama'are River Basin"],
    landmarks: [
      { name: "Yankari National Park & Wikki Warm Springs", category: "Commercial", description: "Nigeria's premier wildlife eco-tourism resort and international safari destination.", query: "Yankari National Park, Bauchi" },
      { name: "Sir Abubakar Tafawa Balewa International Airport", category: "Transport", description: "Modern airport supporting regional tourism and commercial access.", query: "Bauchi Airport" },
      { name: "Tomb of Sir Abubakar Tafawa Balewa", category: "Government", description: "National monument honoring Nigeria's first Prime Minister.", query: "Tafawa Balewa Tomb, Bauchi" }
    ],
    dominantIndustries: ["Eco-Tourism & Safari Hospitality", "Livestock & Meat Processing", "Grains & Sesame Seed Agriculture", "Solid Minerals & Kaolin Mining", "Commercial Banking"],
    tagline: "Pearl of Tourism, Wildlife Sanctuary & Agro-Commerce Hub",
    metaTitle: "Web Design, Safari Tourism SEO & Agribusiness IT in Bauchi | Mindware",
    metaDescription: "Elevate your Bauchi business online. Mindware provides custom web development, tourism booking portals, and SEO in Bauchi and Azare.",
    economicOverview: "Bauchi State is Nigeria's tourism crown jewel with Yankari National Park, supported by rich agricultural production and key transit corridors connecting to the North East.",
    localServicesHighlights: [
      { title: "Safari & Tourism Booking Systems", description: "Direct reservation systems for eco-lodges, tours, and car hire in Bauchi.", benefit: "Drive international and domestic visitor revenue." },
      { title: "Bauchi Agribusiness SEO", description: "Rank your grain and livestock business on Google search.", benefit: "Connect with bulk off-takers across Nigeria." }
    ],
    localFaqs: [
      { question: "Can you build an online booking system for tour operators in Bauchi?", answer: "Yes. We build complete tour packages, payment processing, and itinerary booking modules." }
    ]
  },

  // 25. GOMBE
  {
    id: "gombe",
    slug: "gombe",
    name: "Gombe State",
    shortName: "Gombe",
    capital: "Gombe",
    zone: "North East",
    lgasCount: 11,
    coordinates: { lat: 10.2897, lng: 11.1673 },
    officeType: "Digital Client Operations & Field Support",
    commercialHubs: ["Gombe Main Market", "Commercial Area", "Dadinkowa Dam Axis", "Bajoga Industrial Hub", "Billiri Agro Corridor"],
    landmarks: [
      { name: "Dadinkowa Multipurpose Dam & Hydro Plant", category: "Industrial", description: "Major hydropower and irrigation facility driving regional electricity and farming.", query: "Dadinkowa Dam, Gombe" },
      { name: "Gombe Lawanti International Airport", category: "Transport", description: "Modern aviation facility connecting the commercial hub of the North East.", query: "Gombe Airport" },
      { name: "Ashaka Cement Factory", category: "Industrial", description: "Heavy industrial manufacturing plant producing cement for the entire North East.", query: "Ashaka Cement, Gombe" }
    ],
    dominantIndustries: ["Cement Manufacturing (Ashaka)", "Commercial Agriculture & Cotton Ginneries", "Hydroelectric Energy Generation", "Cross-Regional Wholesale Trading", "Livestock & Grains"],
    tagline: "Jewel in the Savannah & Top State for Ease of Doing Business in the North",
    metaTitle: "Web Design, Industrial SEO & E-Commerce in Gombe State | Mindware",
    metaDescription: "Scale your Gombe enterprise. Mindware provides modern website design, manufacturing SEO, and digital marketing in Gombe and Bajoga.",
    economicOverview: "Consistently ranked as one of the best states for ease of doing business in Northern Nigeria, Gombe is a peaceful commercial magnet attracting investors in cement, power, and agriculture.",
    localServicesHighlights: [
      { title: "Gombe Commercial SME Portals", description: "Clean, fast-loading business websites showcasing corporate credibility.", benefit: "Win regional commercial contracts." },
      { title: "Gombe Local SEO Optimization", description: "Target local buyers in Gombe, Bauchi, and Adamawa searching on Google.", benefit: "Expand your regional customer base." }
    ],
    localFaqs: [
      { question: "Why is Gombe considered a prime location for digital business in the North East?", answer: "Gombe's central location, peaceful business climate, and reliable Dadinkowa power make it the natural logistics and trade distribution center for the North East." }
    ]
  },

  // 26. JIGAWA (DUTSE)
  {
    id: "jigawa",
    slug: "jigawa",
    name: "Jigawa State",
    shortName: "Jigawa",
    capital: "Dutse",
    zone: "North West",
    lgasCount: 27,
    coordinates: { lat: 11.7562, lng: 9.339 },
    officeType: "Digital Client Operations & Field Support",
    commercialHubs: ["Dutse Capital Hub", "Hadejia Riverine Trade Hub", "Kazaure ICT & Agro Belt", "Gumel Cross-Border Axis", "Maigatari International Border Market"],
    landmarks: [
      { name: "Maigatari International Cattle Market", category: "Commercial", description: "One of Africa's largest international livestock markets trading with the Sahel.", query: "Maigatari, Jigawa" },
      { name: "Dutse International Airport", category: "Transport", description: "Modern cargo and passenger aviation facility built for agricultural exports.", query: "Dutse International Airport" },
      { name: "Hadejia-Nguru Wetlands", category: "Commercial", description: "Internationally recognized wetland ecosystem supporting massive rice and fish farming.", query: "Hadejia, Jigawa" }
    ],
    dominantIndustries: ["Commercial Rice & Sesame Production", "Livestock Trading & Leather", "Sugar Cane & Ethanol", "Inland Fisheries (Hadejia)", "Solar Power Installations"],
    tagline: "The New World, Sesame Capital & Pioneer in E-Governance",
    metaTitle: "Web Design, Sesame Export SEO & Agribusiness IT in Jigawa (Dutse, Hadejia) | Mindware",
    metaDescription: "Professional web development and agricultural export SEO in Jigawa State. Supporting farmers, exporters, and businesses in Dutse, Hadejia, and Kazaure.",
    economicOverview: "Jigawa is Nigeria's largest producer of sesame seeds and a pioneer in public sector digital transformation, with vast potential in commercial rice milling and solar energy.",
    localServicesHighlights: [
      { title: "Sesame & Grain Export Portals", description: "Websites showing commodity specifications, moisture levels, and export packaging.", benefit: "Sell directly to international commodity trading houses." },
      { title: "Dutse Local Business Websites", description: "Modern web design for corporate contractors and service providers.", benefit: "Build credibility for government and donor contracts." }
    ],
    localFaqs: [
      { question: "Can a Jigawa sesame farming cooperative sell directly to international buyers with your website?", answer: "Yes. Our export portals provide international buyers with lab test verification, origin details, and direct quotation tools." }
    ]
  },

  // 27. ADAMAWA (YOLA)
  {
    id: "adamawa",
    slug: "adamawa",
    name: "Adamawa State",
    shortName: "Adamawa",
    capital: "Yola",
    zone: "North East",
    lgasCount: 21,
    coordinates: { lat: 9.3265, lng: 12.4404 },
    officeType: "Digital Client Operations & Field Support",
    commercialHubs: ["Yola-Jimeta Commercial Core", "Mubi International Border Market", "Numan Agro-Industrial Hub", "Ganye Cocoa & Agro Belt"],
    landmarks: [
      { name: "American University of Nigeria (AUN) Yola", category: "Tech Hub", description: "Africa's first development university, pioneering technology and social entrepreneurship.", query: "American University of Nigeria, Yola" },
      { name: "Mubi International Border Market", category: "Commercial", description: "Vibrant international goods and livestock hub trading directly into Cameroon.", query: "Mubi, Adamawa" },
      { name: "Yola Airport", category: "Transport", description: "Key domestic aviation gateway connecting Adamawa to Abuja and Lagos.", query: "Yola Airport" }
    ],
    dominantIndustries: ["Livestock & Cattle Ranching", "Sugar Refining & Savannah Sugar", "Cross-Border Trade with Cameroon", "Higher Education & Tech Innovation", "Grains & Cotton Farming"],
    tagline: "Land of Beauty, Sunshine & Trans-Border Commercial Crossroads",
    metaTitle: "Web Design, Local SEO & Cross-Border E-Commerce in Yola Adamawa | Mindware",
    metaDescription: "Power your Adamawa business online. Mindware provides website design, export platforms, and local SEO in Yola, Jimeta, and Mubi.",
    economicOverview: "Adamawa combines the academic excellence of AUN in Yola with the high-velocity cross-border trading market of Mubi into Cameroon and Central Africa.",
    localServicesHighlights: [
      { title: "Yola Corporate & NGO Vendor Websites", description: "Professional digital presence built to pass international institutional checks.", benefit: "Win development tenders in Adamawa and the North East." },
      { title: "Mubi Cross-Border Trade Catalogs", description: "Bilingual French and English catalogs for regional trade into Cameroon.", benefit: "Broaden regional customer reach." }
    ],
    localFaqs: [
      { question: "Can you build bilingual websites in English and French for trade with Cameroon?", answer: "Yes. We create bilingual platforms designed specifically for Adamawa traders serving Cameroon and Chad." }
    ]
  },

  // 28. TARABA (JALINGO)
  {
    id: "taraba",
    slug: "taraba",
    name: "Taraba State",
    shortName: "Taraba",
    capital: "Jalingo",
    zone: "North East",
    lgasCount: 16,
    coordinates: { lat: 8.8937, lng: 11.3596 },
    officeType: "Digital Client Operations & Field Support",
    commercialHubs: ["Jalingo City Center", "Wukari Historic Trading Hub", "Gembu Mambilla Highland Plateau", "Bali Timber & Agro Zone", "Ibi Riverport"],
    landmarks: [
      { name: "Mambilla Plateau & Highland Tea Estates", category: "Commercial", description: "Highest elevated plateau in Nigeria, producing famous highland tea and coffee.", query: "Mambilla Plateau, Taraba" },
      { name: "Danbaba Danfulani Suntai Airport Jalingo", category: "Transport", description: "Aviation facility connecting Taraba State directly to the federal capital.", query: "Jalingo Airport" },
      { name: "Mambilla Hydroelectric Power Project Site", category: "Industrial", description: "Site of the landmark national renewable hydropower project.", query: "Mambilla, Taraba" }
    ],
    dominantIndustries: ["Highland Tea & Coffee Cultivation", "Commercial Timber & Forestry", "Cattle Ranching & Dairy", "River Fishery & Rice Farming", "Hydroelectric Energy & Mining"],
    tagline: "Nature's Gift to the Nation, Mambilla Highlands & Agro Wealth",
    metaTitle: "Web Design, Agro-Export & SEO in Jalingo Taraba State | Mindware",
    metaDescription: "Elevate your Taraba enterprise. Mindware builds custom websites, tea & timber export portals, and SEO across Jalingo and Gembu.",
    economicOverview: "Taraba is blessed with unique microclimates from the river valleys of the Benue to the cool temperate heights of the Mambilla Plateau, offering immense agro-export potential.",
    localServicesHighlights: [
      { title: "Mambilla Tea & Agro-Export Portals", description: "Showcase certified organic tea, coffee, and timber to global buyers.", benefit: "Direct export relationships and higher profit margins." },
      { title: "Jalingo Business SEO", description: "Local Google ranking for healthcare, hotels, and contractors in Taraba.", benefit: "Capture local and state government procurement." }
    ],
    localFaqs: [
      { question: "Can you create e-commerce websites for specialty agricultural products like Mambilla Highland Tea?", answer: "Yes. We design premium brand websites with worldwide shipping integration for specialty tea and coffee." }
    ]
  },

  // 29. NIGER (MINNA)
  {
    id: "niger",
    slug: "niger",
    name: "Niger State",
    shortName: "Niger",
    capital: "Minna",
    zone: "North Central",
    lgasCount: 25,
    coordinates: { lat: 9.6177, lng: 6.5569 },
    officeType: "Digital Client Operations & Field Support",
    commercialHubs: ["Minna City Center", "Suleja Abuja-Fringe Megahub", "Bida Brass & Glass Center", "Kontagora Agro Zone", "Mokwa Grain Belt"],
    landmarks: [
      { name: "Kainji & Jebba Hydroelectric Power Dams", category: "Industrial", description: "Pioneering national hydroelectric plants powering millions of Nigerian households.", query: "Kainji Dam, Niger State" },
      { name: "Zuma Rock Suleja", category: "Commercial", description: "Iconic natural monolith and geographic gateway between Niger State and Abuja FCT.", query: "Zuma Rock, Niger State" },
      { name: "Federal University of Technology Minna (FUTMINNA)", category: "Tech Hub", description: "Leading engineering and technology university fostering ICT talent.", query: "FUTMINNA, Minna" }
    ],
    dominantIndustries: ["Hydroelectric Energy Generation", "Rice Milling & Grain Agriculture", "Solid Minerals & Gold Mining", "Abuja Satellite Real Estate & Commerce", "Shea Butter & Agro Processing"],
    tagline: "The Power State, Rice Milling Giant & Geographic Titan",
    metaTitle: "Web Design, Energy & Agribusiness SEO in Minna & Suleja Niger State | Mindware",
    metaDescription: "Professional web development and local SEO in Minna and Suleja. Powering Niger State's energy, rice processing, and commercial enterprises.",
    economicOverview: "The largest state by landmass in Nigeria, Niger State powers the nation with three major hydroelectric dams (Kainji, Jebba, Shiroro) while serving as a bustling commercial satellite to Abuja via Suleja.",
    localServicesHighlights: [
      { title: "Rice Mill & Agribusiness Websites", description: "Web platforms for modern commercial rice millers and grain aggregators.", benefit: "Attract nationwide distributor networks." },
      { title: "Suleja & Minna Business SEO", description: "Rank your business in Suleja and Minna to capture overflow commercial demand from Abuja.", benefit: "High-volume customer leads." }
    ],
    localFaqs: [
      { question: "How does a Suleja business benefit from localized SEO targeting Abuja?", answer: "Thousands of residents commute between Suleja and Abuja daily. Local SEO ensures your business ranks for both Niger State and FCT commercial searches." }
    ]
  },

  // 30. NASARAWA (LAFIA)
  {
    id: "nasarawa",
    slug: "nasarawa",
    name: "Nasarawa State",
    shortName: "Nasarawa",
    capital: "Lafia",
    zone: "North Central",
    lgasCount: 13,
    coordinates: { lat: 8.4938, lng: 8.5153 },
    officeType: "Digital Client Operations & Field Support",
    commercialHubs: ["Karu Urban Expansion Corridor", "Lafia Capital City", "Keffi University City", "Akwanga Transit Hub", "Doma Dam Agriculture Belt"],
    landmarks: [
      { name: "Farin Ruwa Waterfalls", category: "Commercial", description: "One of the highest and most spectacular natural waterfalls in Africa.", query: "Farin Ruwa, Nasarawa" },
      { name: "Karu Urban Commercial Belt", category: "Commercial", description: "High-density residential and commercial satellite hub bordering Abuja.", query: "Karu, Nasarawa State" },
      { name: "Nasarawa Technology Village Karishi", category: "Tech Hub", description: "Master-planned residential technology and innovation park.", query: "Nasarawa State" }
    ],
    dominantIndustries: ["Solid Mineral Mining (Lithium, Marble, Tantalite)", "Abuja Satellite Real Estate", "Sesame & Yam Agriculture", "Higher Education (Nasarawa State University Keffi)", "Commercial Poultry"],
    tagline: "Home of Solid Minerals, Lithium Frontier & Gateway to the Capital",
    metaTitle: "Web Design, Mining SEO & Real Estate Websites in Karu & Lafia Nasarawa | Mindware",
    metaDescription: "Grow your business in Nasarawa State. Mindware designs websites, mining compliance portals, and real estate platforms in Karu, Keffi, and Lafia.",
    economicOverview: "Nasarawa is experiencing a massive economic boom driven by world-class lithium discoveries, rapid urban spillover from Abuja into Karu/Mararaba, and expanding mining investments.",
    localServicesHighlights: [
      { title: "Lithium & Solid Minerals Mining Portals", description: "Web portals showcasing geological surveys, mining concessions, and export compliance.", benefit: "Attract international mining investment." },
      { title: "Karu Real Estate Developer Portals", description: "Property listing platforms with interactive floor plans and virtual tours.", benefit: "Sell housing developments to Abuja professionals." }
    ],
    localFaqs: [
      { question: "Can you build websites for real estate developers in Karu and Mararaba?", answer: "Yes. We develop complete property showcase websites with virtual tours, mortgage calculators, and direct WhatsApp sales chat." }
    ]
  },

  // 31. KOGI (LOKOJA)
  {
    id: "kogi",
    slug: "kogi",
    name: "Kogi State",
    shortName: "Kogi",
    capital: "Lokoja",
    zone: "North Central",
    lgasCount: 21,
    coordinates: { lat: 7.8023, lng: 6.743 },
    officeType: "Digital Client Operations & Field Support",
    commercialHubs: ["Lokoja Confluence City", "Obajana Cement Industrial Corridor", "Ajaokuta Steel City", "Okene Commercial Core", "Anyigba University Town"],
    landmarks: [
      { name: "Confluence of Rivers Niger & Benue", category: "Commercial", description: "Historic confluence where Nigeria's two greatest rivers merge at Lokoja.", query: "Confluence of Niger and Benue, Lokoja" },
      { name: "Dangote Cement Factory Obajana", category: "Industrial", description: "One of the largest cement manufacturing plants on earth.", query: "Dangote Cement Obajana, Kogi State" },
      { name: "Ajaokuta Steel Complex", category: "Industrial", description: "Pioneering integrated steel production complex designed for national industrialization.", query: "Ajaokuta Steel Company, Kogi State" }
    ],
    dominantIndustries: ["Cement Manufacturing (Obajana)", "Steel Production & Metallurgy (Ajaokuta)", "Inland Waterways Logistics", "Cashew Export & Oil Palm", "Solid Minerals (Iron Ore, Coal, Dolomite)"],
    tagline: "The Confluence State, Industrial Giant & Cement Capital",
    metaTitle: "Web Design, Heavy Industrial SEO & Logistics IT in Lokoja Kogi State | Mindware",
    metaDescription: "Professional web development and B2B industrial SEO in Lokoja, Obajana, and Ajaokuta. Helping Kogi enterprises expand nationally.",
    economicOverview: "Kogi is the meeting point of Nigeria's geography, hosting Africa's largest cement plant in Obajana, the Ajaokuta steel complex, and the scenic confluence of the Niger and Benue rivers.",
    localServicesHighlights: [
      { title: "B2B Heavy Industry & Supply Portals", description: "Web design built for contractors, transport haulers, and parts suppliers in Obajana and Ajaokuta.", benefit: "Secure industrial subcontracts." },
      { title: "Lokoja Local SEO & Trade Visibility", description: "Dominate Google search results for logistics, hospitality, and trading across Kogi.", benefit: "Capture transit and regional commercial traffic." }
    ],
    localFaqs: [
      { question: "How does a website help transport haulers and contractors servicing Obajana?", answer: "Large industrial corporations require verified digital profiles, fleet capacities, and safety compliance records before issuing haulage contracts." }
    ]
  },

  // 32. KEBBI (BIRNIN KEBBI)
  {
    id: "kebbi",
    slug: "kebbi",
    name: "Kebbi State",
    shortName: "Kebbi",
    capital: "Birnin Kebbi",
    zone: "North West",
    lgasCount: 21,
    coordinates: { lat: 12.4539, lng: 4.1975 },
    officeType: "Digital Client Operations & Field Support",
    commercialHubs: ["Birnin Kebbi City Center", "Argungu Heritage & Fishery Hub", "Yauri Riverport", "Zuru Agro Belt", "Kamba Border Trade Axis"],
    landmarks: [
      { name: "Argungu Fishing Festival Arena", category: "Commercial", description: "World-renowned international fishing festival arena attracting global spectators.", query: "Argungu, Kebbi State" },
      { name: "Sir Ahmadu Bello International Airport Birnin Kebbi", category: "Transport", description: "Modern airport supporting regional executive travel and agricultural exports.", query: "Birnin Kebbi Airport" },
      { name: "WACOT Rice Mill Argungu", category: "Industrial", description: "One of the largest integrated rice mills in Africa producing premium packaged rice.", query: "WACOT Rice, Argungu" }
    ],
    dominantIndustries: ["Commercial Rice Farming & Milling (Lake Rice)", "Inland Fishery & Aquaculture", "Cross-Border Trade with Benin Republic & Niger", "Livestock & Grains", "Solar Irrigation Agriculture"],
    tagline: "Land of Equity, Rice Revolution Capital & Argungu Heritage",
    metaTitle: "Web Design, Rice Milling SEO & Agro-Trade in Birnin Kebbi | Mindware",
    metaDescription: "Scale your Kebbi enterprise. Mindware provides website design, rice mill e-commerce, and export SEO across Birnin Kebbi and Argungu.",
    economicOverview: "Kebbi State sparked Nigeria's modern rice revolution with millions of metric tons harvested along the Rima river basin, supported by large-scale milling and border trade through Kamba.",
    localServicesHighlights: [
      { title: "Rice Milling Brand & Distribution Portals", description: "Consumer-facing and wholesale portals for packaged rice brands.", benefit: "Build brand loyalty and recruit nationwide distributors." },
      { title: "Kebbi Agribusiness SEO", description: "Rank your agricultural enterprise for grain, fish, and livestock search queries.", benefit: "Direct commercial wholesale sales." }
    ],
    localFaqs: [
      { question: "Can you help Kebbi rice millers build brand presence in Lagos and Abuja?", answer: "Yes. We create consumer-facing websites with store locators and direct bulk ordering tools." }
    ]
  },

  // 33. ZAMFARA (GUSAU)
  {
    id: "zamfara",
    slug: "zamfara",
    name: "Zamfara State",
    shortName: "Zamfara",
    capital: "Gusau",
    zone: "North West",
    lgasCount: 14,
    coordinates: { lat: 12.1628, lng: 6.6614 },
    officeType: "Digital Client Operations & Field Support",
    commercialHubs: ["Gusau Central Commercial Core", "Tsafe Commercial Corridor", "Kaura Namoda Railway Terminal", "Talata Mafara Irrigation Zone"],
    landmarks: [
      { name: "Bakolori Dam & Irrigation Scheme", category: "Industrial", description: "Major agricultural dam providing irrigation for thousands of hectares of crops.", query: "Bakolori Dam, Zamfara" },
      { name: "Gusau Central Railway Terminal", category: "Transport", description: "Historic rail logistics point connecting agricultural produce to the coast.", query: "Gusau, Zamfara State" },
      { name: "Gusau Central Market", category: "Commercial", description: "Primary trading hub for grains, gold, and livestock.", query: "Gusau Market, Zamfara" }
    ],
    dominantIndustries: ["Commercial & Artisanal Gold Mining", "Grains & Soya Bean Agriculture", "Cotton Production", "Livestock Trading", "Irrigation Farming"],
    tagline: "Farming is Our Pride, Gold Mineral Wealth & Agricultural Resilience",
    metaTitle: "Web Design, Mining SEO & Agricultural IT in Gusau Zamfara State | Mindware",
    metaDescription: "Modern web development and SEO in Gusau. Helping Zamfara mining and farming enterprises connect with buyers across Nigeria.",
    economicOverview: "Zamfara State possesses substantial untapped gold and mineral reserves alongside fertile floodplains irrigated by the Bakolori Dam.",
    localServicesHighlights: [
      { title: "Mining Exploration Compliance Portals", description: "Websites showing mineral concessions, environmental mitigation, and corporate governance.", benefit: "Attract institutional mining partnerships." },
      { title: "Gusau Business SEO", description: "Local optimization for commercial suppliers and merchants in Gusau.", benefit: "Capture business inquiries." }
    ],
    localFaqs: [
      { question: "How can digital marketing benefit mining companies in Zamfara?", answer: "A credible corporate website with verified licensing documentation builds international investor confidence and facilitates regulatory compliance." }
    ]
  },

  // 34. YOBE (DAMATURU)
  {
    id: "yobe",
    slug: "yobe",
    name: "Yobe State",
    shortName: "Yobe",
    capital: "Damaturu",
    zone: "North East",
    lgasCount: 17,
    coordinates: { lat: 11.747, lng: 11.9608 },
    officeType: "Digital Client Operations & Field Support",
    commercialHubs: ["Potiskum Cattle & Haulage Megahub", "Damaturu Capital Core", "Gashua River Agriculture Zone", "Geidam Sahel Border Market", "Nguru Wetland Axis"],
    landmarks: [
      { name: "Potiskum Livestock & Haulage Hub", category: "Transport", description: "Largest cattle and trailer haulage transit hub in West Africa.", query: "Potiskum, Yobe State" },
      { name: "Damaturu Cargo Airport", category: "Transport", description: "Modern cargo airport designed to export livestock and agricultural commodities.", query: "Damaturu Cargo Airport" },
      { name: "Bula Tura Oases & Sand Dunes", category: "Commercial", description: "Stunning desert tourist oasis along the Niger border.", query: "Nguru, Yobe State" }
    ],
    dominantIndustries: ["Livestock & Cattle Trading (Potiskum)", "Trailer Haulage & Freight Transport", "Gum Arabic & Sesame Production", "Potash & Gypsum Mining", "Humanitarian Reconstruction"],
    tagline: "Pride of the Sahel, Transport Haulage Capital & Agricultural Frontier",
    metaTitle: "Web Design, Haulage Logistics & Agribusiness SEO in Yobe (Potiskum, Damaturu) | Mindware",
    metaDescription: "Professional website design and logistics SEO in Yobe State. Powering transport, livestock, and trading businesses in Potiskum and Damaturu.",
    economicOverview: "Potiskum in Yobe State operates the largest cattle market and heavy-duty truck haulage fleet in West Africa, making it a critical artery for national meat and food distribution.",
    localServicesHighlights: [
      { title: "Haulage Fleet & Transport Portals", description: "Digital booking and logistics tracking for trucking companies in Potiskum.", benefit: "Secure contracted freight orders from national FMCG brands." },
      { title: "Gum Arabic & Agro-Export Portals", description: "Certified export platforms showcasing Yobe's grade-A gum arabic and sesame.", benefit: "Direct international export contracts." }
    ],
    localFaqs: [
      { question: "Can you build fleet management and freight booking websites for haulage companies in Potiskum?", answer: "Yes. We create specialized transport portals with shipment tracking, fleet catalogs, and driver verification." }
    ]
  },

  // 35. EKITI (ADO-EKITI)
  {
    id: "ekiti",
    slug: "ekiti",
    name: "Ekiti State",
    shortName: "Ekiti",
    capital: "Ado-Ekiti",
    zone: "South West",
    lgasCount: 16,
    coordinates: { lat: 7.6211, lng: 5.2215 },
    officeType: "Digital Client Operations & Field Support",
    commercialHubs: ["Ado-Ekiti Commercial Center", "Ikole Agricultural Belt", "Ikogosi Tourism Enclave", "Oye-Ekiti University Town", "Ijero Mining Corridor"],
    landmarks: [
      { name: "Ikogosi Warm and Cold Springs", category: "Commercial", description: "Global geological wonder where warm and cold springs flow side by side.", query: "Ikogosi Warm Springs, Ekiti" },
      { name: "Ekiti Knowledge Zone", category: "Tech Hub", description: "Special economic zone dedicated to software, innovation, and business process outsourcing.", query: "Ado Ekiti, Ekiti State" },
      { name: "Afe Babalola University Ado-Ekiti (ABUAD)", category: "Tech Hub", description: "Pioneering private university with a world-class multisystem teaching hospital.", query: "ABUAD, Ado Ekiti" }
    ],
    dominantIndustries: ["Knowledge Economy & Software Talent", "Eco-Tourism & Warm Springs Resort", "Cocoa, Yam & Cassava Agriculture", "Higher Education & Specialized Healthcare", "Solid Minerals (Columbite, Granite)"],
    tagline: "Land of Honour, Fountain of Knowledge & Emerging Tech Zone",
    metaTitle: "Web Design, Local SEO & Knowledge Economy IT in Ado-Ekiti | Mindware",
    metaDescription: "Accelerate your Ekiti business. Mindware provides modern website design, hospital portals, and local SEO in Ado-Ekiti and Ikogosi.",
    economicOverview: "Renowned as the academic intellectual heart of Nigeria, Ekiti is actively building the Ekiti Knowledge Zone to anchor knowledge-process outsourcing, software development, and specialized healthcare.",
    localServicesHighlights: [
      { title: "Healthcare & Clinic Web Portals", description: "Patient booking systems and digital portals for private clinics and medical providers.", benefit: "Streamline patient scheduling." },
      { title: "Ekiti Local SEO & Educational Portals", description: "Search engine optimization for schools, universities, and tech startups in Ado-Ekiti.", benefit: "Boost student enrollment and visibility." }
    ],
    localFaqs: [
      { question: "How does Mindware support tech startups in the Ekiti Knowledge Zone?", answer: "We provide full-stack web engineering, UI/UX design, cloud architecture, and corporate training for startups in Ekiti." }
    ]
  },

  // 36. EBONYI (ABAKALIKI)
  {
    id: "ebonyi",
    slug: "ebonyi",
    name: "Ebonyi State",
    shortName: "Ebonyi",
    capital: "Abakaliki",
    zone: "South East",
    lgasCount: 13,
    coordinates: { lat: 6.3249, lng: 8.1137 },
    officeType: "Digital Client Operations & Field Support",
    commercialHubs: ["Abakaliki Rice Mill Industrial Hub", "International Market Abakaliki", "Afikpo Commercial Center", "Ishielu Mining Corridor", "Onueke"],
    landmarks: [
      { name: "Abakaliki Rice Mill Complex", category: "Industrial", description: "One of the largest indigenous rice milling industrial centers in West Africa.", query: "Abakaliki Rice Mill, Ebonyi" },
      { name: "Chuba Okadigbo International Airport Onueke", category: "Transport", description: "Modern airport infrastructure built to accelerate regional trade and export.", query: "Ebonyi International Airport" },
      { name: "Margaret Umahi International Market", category: "Commercial", description: "Ultra-modern regional commercial trading hub in Abakaliki.", query: "International Market, Abakaliki" }
    ],
    dominantIndustries: ["Rice Cultivation & Commercial Milling (Abakaliki Rice)", "Solid Mineral Mining (Lead, Zinc, Limestone)", "Civil Infrastructure Construction", "Cassava & Yam Farming", "Salt Lake Processing"],
    tagline: "Salt of the Nation, Rice Milling Giant & Infrastructure Model",
    metaTitle: "Web Design, Rice Milling E-Commerce & SEO in Abakaliki Ebonyi State | Mindware",
    metaDescription: "Professional web development and agribusiness SEO in Abakaliki. Promoting Abakaliki rice, lead-zinc mining, and commerce across Ebonyi State.",
    economicOverview: "Ebonyi State is synonymous with premium Nigerian parboiled rice and extensive lead-zinc and limestone deposits, complemented by modern civil infrastructure in Abakaliki.",
    localServicesHighlights: [
      { title: "Abakaliki Rice E-Commerce & Supply Portals", description: "Direct-to-consumer and wholesale portals for packaged Ebonyi rice brands.", benefit: "Sell packaged rice directly to consumers in Lagos, Abuja, and Port Harcourt." },
      { title: "Mining & Quarrying Compliance Websites", description: "Showcase lead, zinc, and granite quarry output to construction and export firms.", benefit: "Win supply contracts." }
    ],
    localFaqs: [
      { question: "Can a rice mill brand in Abakaliki sell products online with home delivery in Lagos?", answer: "Yes. We integrate e-commerce payment checkouts with interstate logistics partners for door-to-door delivery." }
    ]
  },

  // 37. BAYELSA (YENAGOA)
  {
    id: "bayelsa",
    slug: "bayelsa",
    name: "Bayelsa State",
    shortName: "Bayelsa",
    capital: "Yenagoa",
    zone: "South South",
    lgasCount: 8,
    coordinates: { lat: 4.9267, lng: 6.2676 },
    officeType: "Digital Client Operations & Field Support",
    commercialHubs: ["Yenagoa Capital City", "Brass Island Crude Oil Terminal", "Oloibiri Historical Oil Axis", "Amassoma University Town", "Sagbama"],
    landmarks: [
      { name: "Oloibiri Oil Well No. 1", category: "Industrial", description: "Historic site where commercial crude oil was first discovered in Nigeria in 1956.", query: "Oloibiri Oilfield, Bayelsa" },
      { name: "Bayelsa International Airport", category: "Transport", description: "Strategic passenger and offshore logistics air gateway in Yenagoa.", query: "Bayelsa International Airport" },
      { name: "Brass Fertilizer & Petrochemical Complex Site", category: "Industrial", description: "Multi-billion-dollar coastal gas monetization and petrochemical plant on Brass Island.", query: "Brass Island, Bayelsa" }
    ],
    dominantIndustries: ["Upstream Crude Oil & Natural Gas", "Offshore Marine Transport & Barging", "Aquaculture & Deep-Sea Fishing", "Petrochemicals & Gas Monetization", "Public Sector & Infrastructure"],
    tagline: "Glory of All Lands, Cradle of Nigerian Petroleum & Marine Frontier",
    metaTitle: "Web Design, Offshore Marine SEO & HSE in Yenagoa Bayelsa State | Mindware",
    metaDescription: "Empower your Bayelsa business. Mindware delivers tender-ready web design, maritime SEO, and HSE compliance training in Yenagoa and Brass.",
    economicOverview: "The birthplace of Nigeria's oil industry in Oloibiri, Bayelsa is encircled by vast mangrove waterways, rich offshore oil concessions, and multi-billion-dollar gas monetization projects.",
    localServicesHighlights: [
      { title: "Offshore Marine & Barging Websites", description: "Showcase tugboats, fuel barges, and safety records to offshore oil operators.", benefit: "Pass NTSA and NipeX qualification." },
      { title: "Yenagoa Corporate SEO", description: "Local Google ranking for engineering contractors and hospitality in Yenagoa.", benefit: "Win state and IOC corporate subcontracts." }
    ],
    localFaqs: [
      { question: "Do you design websites for marine charter and boat operators in Bayelsa?", answer: "Yes. We build marine fleet websites with vessel technical specifications, safety credentials, and charter booking forms." }
    ]
  }
];

export function getStateBySlug(slug: string): StateServiceArea | undefined {
  const normalized = slug.toLowerCase().trim();
  // Direct match
  const found = SERVICE_AREAS.find((s) => s.slug === normalized || s.id === normalized);
  if (found) return found;

  // Handle common aliases
  if (normalized === "abuja" || normalized === "fct" || normalized === "abuja-capital") {
    return SERVICE_AREAS.find((s) => s.id === "abuja-fct");
  }
  if (normalized === "port-harcourt" || normalized === "ph" || normalized === "portharcourt") {
    return SERVICE_AREAS.find((s) => s.id === "rivers");
  }
  if (normalized === "ibadan") {
    return SERVICE_AREAS.find((s) => s.id === "oyo");
  }
  if (normalized === "warri" || normalized === "asaba") {
    return SERVICE_AREAS.find((s) => s.id === "delta");
  }
  if (normalized === "onitsha" || normalized === "nnewi" || normalized === "awka") {
    return SERVICE_AREAS.find((s) => s.id === "anambra");
  }
  if (normalized === "aba" || normalized === "umuahia") {
    return SERVICE_AREAS.find((s) => s.id === "abia");
  }
  if (normalized === "uyo" || normalized === "eket") {
    return SERVICE_AREAS.find((s) => s.id === "akwa-ibom");
  }
  if (normalized === "calabar") {
    return SERVICE_AREAS.find((s) => s.id === "cross-river");
  }
  if (normalized === "benin" || normalized === "benin-city") {
    return SERVICE_AREAS.find((s) => s.id === "edo");
  }
  if (normalized === "ilorin") {
    return SERVICE_AREAS.find((s) => s.id === "kwara");
  }
  if (normalized === "jos") {
    return SERVICE_AREAS.find((s) => s.id === "plateau");
  }
  if (normalized === "owerri") {
    return SERVICE_AREAS.find((s) => s.id === "imo");
  }
  if (normalized === "makurdi") {
    return SERVICE_AREAS.find((s) => s.id === "benue");
  }
  if (normalized === "maiduguri") {
    return SERVICE_AREAS.find((s) => s.id === "borno");
  }
  if (normalized === "akure") {
    return SERVICE_AREAS.find((s) => s.id === "ondo");
  }
  if (normalized === "osogbo") {
    return SERVICE_AREAS.find((s) => s.id === "osun");
  }
  if (normalized === "abeokuta") {
    return SERVICE_AREAS.find((s) => s.id === "ogun");
  }
  if (normalized === "yenagoa") {
    return SERVICE_AREAS.find((s) => s.id === "bayelsa");
  }
  if (normalized === "abakaliki") {
    return SERVICE_AREAS.find((s) => s.id === "ebonyi");
  }
  if (normalized === "ado-ekiti") {
    return SERVICE_AREAS.find((s) => s.id === "ekiti");
  }
  if (normalized === "birnin-kebbi") {
    return SERVICE_AREAS.find((s) => s.id === "kebbi");
  }
  if (normalized === "dutse") {
    return SERVICE_AREAS.find((s) => s.id === "jigawa");
  }
  if (normalized === "yola") {
    return SERVICE_AREAS.find((s) => s.id === "adamawa");
  }
  if (normalized === "jalingo") {
    return SERVICE_AREAS.find((s) => s.id === "taraba");
  }
  if (normalized === "damaturu" || normalized === "potiskum") {
    return SERVICE_AREAS.find((s) => s.id === "yobe");
  }
  if (normalized === "gusau") {
    return SERVICE_AREAS.find((s) => s.id === "zamfara");
  }

  return undefined;
}

export function getNeighboringStates(currentState: StateServiceArea): StateServiceArea[] {
  // Return other states in the same geopolitical zone
  return SERVICE_AREAS.filter((s) => s.id !== currentState.id && s.zone === currentState.zone).slice(0, 4);
}
