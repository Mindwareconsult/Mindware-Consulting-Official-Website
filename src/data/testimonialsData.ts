export interface BaseTestimonial {
  id: string;
  name: string;
  role: string;
  organizationOrTrack: string;
  location: string;
  avatar: string;
  thumbnail: string;
  youtubeVideoId: string; // The 11-character YouTube video ID (e.g., "M7lc1UVf-VE")
  youtubeUrl: string; // Full YouTube video URL
  videoDuration: string;
  quote: string;
  highlightOutcome: string;
  metricLabel: string;
  metricValue: string;
  rating: number; // 1 to 5
  date: string;
  featured?: boolean;
}

export interface AgencyClientTestimonial extends BaseTestimonial {
  company: string;
  industry: string;
  serviceProvided: string;
  websiteUrl?: string;
  projectDuration: string;
}

export interface StudentGraduateTestimonial extends BaseTestimonial {
  courseEnrolled: string;
  academyTrack: "Professional & HSE Academy" | "Digital Skills Academy";
  certificationEarned: string;
  currentEmployer: string;
  careerImpact: string;
}

/**
 * DIGITAL AGENCY CLIENT TESTIMONIALS (COMPARTMENT 1)
 * Real corporate clients partnering with Mindware Consulting for Web, SEO, Custom Software & Digital Systems.
 * Note: Replace `youtubeVideoId` with your official YouTube video ID from your channel (e.g. youtube.com/watch?v=YOUR_ID)
 */
export const AGENCY_TESTIMONIALS: AgencyClientTestimonial[] = [
  {
    id: "vigox-engineering-video",
    name: "Engr. Victor (CEO)",
    role: "Chief Executive Officer & Founder",
    company: "Vigox Engineering Services Ltd",
    organizationOrTrack: "Vigox Engineering Services Ltd",
    industry: "Renewable Energy, Electrical Engineering & Security Systems",
    serviceProvided: "Corporate Website Design & Brand Positioning",
    location: "Abuja & Lagos, Nigeria",
    websiteUrl: "https://vigoxengineering.com.ng",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80",
    thumbnail: "https://i.ytimg.com/vi/y2D3Q4U4l0M/hqdefault.jpg",
    youtubeVideoId: "y2D3Q4U4l0M",
    youtubeUrl: "https://youtu.be/y2D3Q4U4l0M",
    videoDuration: "2:45",
    quote: "Mindware Consulting understood our engineering vision and translated our solar, electrical, and security infrastructure solutions into an authoritative digital platform that commands client trust across Nigeria.",
    highlightOutcome: "Positioned Vigox as a leading engineering partner in Abuja and Lagos, driving qualified commercial inquiries.",
    metricLabel: "Commercial Inquiries Growth",
    metricValue: "+280%",
    rating: 5,
    projectDuration: "4 Weeks",
    date: "September 2026",
    featured: true
  },
  {
    id: "priziangori-global-video",
    name: "Chief Peters",
    role: "Chief Executive Officer & Managing Director",
    company: "Priziangori Global Services Limited",
    organizationOrTrack: "Priziangori Global Services Limited",
    industry: "Oil & Gas Logistics, Aviation Fuel & Environmental Remediation",
    serviceProvided: "Corporate Website Design & SEO Strategy",
    location: "Port Harcourt & Lagos, Nigeria",
    websiteUrl: "https://priziangoriglobal.com.ng/",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80",
    thumbnail: "https://i.ytimg.com/vi/nF7ETjuBS-Y/hqdefault.jpg",
    youtubeVideoId: "nF7ETjuBS-Y",
    youtubeUrl: "https://youtu.be/nF7ETjuBS-Y",
    videoDuration: "3:10",
    quote: "Mindware Consulting unified our diverse industrial operations across oil & gas, aviation, and environmental servicing into an authoritative corporate digital identity that commands international trust.",
    highlightOutcome: "Unified four industrial divisions, elevated institutional credibility for federal tenders, and lifted B2B partnership requests by 65%.",
    metricLabel: "Industrial Inquiries Lift",
    metricValue: "+65%",
    rating: 5,
    projectDuration: "4 Weeks",
    date: "September 2026",
    featured: true
  },
  {
    id: "royalty-finishing-video",
    name: "Mr. Chinedu Eze",
    role: "Managing Director & CEO",
    company: "Royalty Speed Finishing Enterprises",
    organizationOrTrack: "Royalty Speed Finishing Enterprises",
    industry: "Terrazzo, Marble & Epoxy Flooring Craftsmanship",
    serviceProvided: "High-Performance Portfolio Website",
    location: "Lekki, Lagos, Nigeria",
    websiteUrl: "https://royaltyfinishing.com.ng/",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=250&q=80",
    thumbnail: "https://i.ytimg.com/vi/H_CRBJW18Fg/hqdefault.jpg",
    youtubeVideoId: "H_CRBJW18Fg",
    youtubeUrl: "https://youtube.com/shorts/H_CRBJW18Fg?feature=share",
    videoDuration: "0:58",
    quote: "Our previous site didn't show the premium sheen of our terrazzo and epoxy work. Mindware created a fast, mobile-friendly showcase that turns everyday social media traffic into paying estate renovation clients.",
    highlightOutcome: "Doubled direct WhatsApp consultation requests from prime estates in Ikoyi, Victoria Island, and Lekki.",
    metricLabel: "Customer Conversion",
    metricValue: "2.8x",
    rating: 5,
    projectDuration: "3 Weeks",
    date: "April 2026",
    featured: true
  },
  {
    id: "epifanio-global-video",
    name: "CEO, Epifanio Global Services",
    role: "Chief Executive Officer & Founder",
    company: "Epifanio Global Services",
    organizationOrTrack: "Epifanio Global Services",
    industry: "Global Consulting, Engineering & Technical Logistics",
    serviceProvided: "Corporate Web Design & Systems Integration",
    location: "Lagos & International, Nigeria",
    websiteUrl: "https://epifanioglobal.com.ng",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
    thumbnail: "https://i.ytimg.com/vi/Y9Fjlp3AfQQ/hqdefault.jpg",
    youtubeVideoId: "Y9Fjlp3AfQQ",
    youtubeUrl: "https://youtube.com/shorts/Y9Fjlp3AfQQ?feature=share",
    videoDuration: "0:52",
    quote: "Mindware Consulting transformed our commercial digital presence. Their attention to strategic structure, brand clarity, and responsive performance has amplified our corporate reach and client confidence across international markets.",
    highlightOutcome: "Streamlined corporate client acquisition and elevated brand authority across international logistics and technical consulting tenders.",
    metricLabel: "Client Inquiries Lift",
    metricValue: "+210%",
    rating: 5,
    projectDuration: "3 Weeks",
    date: "September 2026",
    featured: true
  },
  {
    id: "osines-group-video",
    name: "Engr. Osita Nwafor",
    role: "Managing Director & Chief Engineer",
    company: "OSINES GROUP",
    organizationOrTrack: "OSINES GROUP",
    industry: "Architecture, Building Construction & Luxury Real Estate",
    serviceProvided: "Website Design & SEO Strategy",
    location: "Awka, Anambra State, Nigeria",
    websiteUrl: "https://www.osinesgroup.com.ng/",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80",
    thumbnail: "/assets/OSINES GROUP Web Design and SEO Strategy.jpg",
    youtubeVideoId: "ScMzIvxBSi4", // Placeholder YouTube ID - easily swappable
    youtubeUrl: "https://www.youtube.com/watch?v=ScMzIvxBSi4",
    videoDuration: "3:42",
    quote: "Mindware Consulting didn't just build us a website; they structured our commercial credibility. We now receive qualified architectural and high-value construction inquiries directly from corporate decision-makers nationwide.",
    highlightOutcome: "Ranked #1 on Google for Architectural and Building Construction in Awka & South-East Nigeria within 90 days.",
    metricLabel: "Search & Inquiries Lift",
    metricValue: "+320%",
    rating: 5,
    projectDuration: "4 Weeks",
    date: "August 2026",
    featured: false
  },
  {
    id: "eclectic-seals-video",
    name: "Arch. David Okonkwo",
    role: "Principal Partner & Design Director",
    company: "Eclectic Seals Int'l",
    organizationOrTrack: "Eclectic Seals Int'l",
    industry: "Interior Architecture, Landscape & Turnkey Building",
    serviceProvided: "Web Design, Brand Identity & Structural SEO",
    location: "Abuja, FCT, Nigeria",
    websiteUrl: "https://eclecticseals.com.ng/",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80",
    thumbnail: "/assets/Eclectic Seals Website Design And SEO.jpg",
    youtubeVideoId: "L_LUpnjgPso",
    youtubeUrl: "https://www.youtube.com/watch?v=L_LUpnjgPso",
    videoDuration: "2:55",
    quote: "The precision and visual refinement Mindware brought to our digital presence is extraordinary. Our high-net-worth residential and commercial design clients constantly compliment the speed, beauty, and clarity of our platform.",
    highlightOutcome: "Multi-million Naira turnkey landscape contracts secured via organic Google discovery.",
    metricLabel: "Lead Quality Growth",
    metricValue: "+240%",
    rating: 5,
    projectDuration: "5 Weeks",
    date: "July 2026",
    featured: true
  },
  {
    id: "efudo-construction-video",
    name: "Chief Innocent Efudo",
    role: "Chairman & Founder",
    company: "Efudo General Construction Company",
    organizationOrTrack: "Efudo General Construction Company",
    industry: "Civil Engineering & Building Materials Manufacturing",
    serviceProvided: "Corporate Portal & Industrial Catalog",
    location: "Enugu & Lagos, Nigeria",
    websiteUrl: "https://efudoconstruction.com.ng/",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=250&q=80",
    thumbnail: "/assets/Efudo Website Design.jpg",
    youtubeVideoId: "kJQP7kiw5Fk",
    youtubeUrl: "https://www.youtube.com/watch?v=kJQP7kiw5Fk",
    videoDuration: "3:15",
    quote: "As manufacturers and civil contractors, we needed an online architecture that conveys institutional trust and massive scale. Mindware delivered on time, within budget, and with exceptional technical support.",
    highlightOutcome: "Centralized distributor inquiries and expanded manufacturing product distribution to 6 new states.",
    metricLabel: "B2B Distributor Growth",
    metricValue: "+180%",
    rating: 5,
    projectDuration: "4 Weeks",
    date: "June 2026",
    featured: false
  },
  {
    id: "infinite-downstream-video",
    name: "Mrs. Khadijah Aliyu",
    role: "Head of Corporate Communications",
    company: "Infinite Downstream Logistics Limited",
    organizationOrTrack: "Infinite Downstream Logistics Limited",
    industry: "Energy, Haulage & Downstream Logistics",
    serviceProvided: "Enterprise Web Infrastructure & Brand Security",
    location: "Port Harcourt & Lagos, Nigeria",
    websiteUrl: "https://infinitedownstreamlogistics.com.ng/",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80",
    thumbnail: "/assets/Infinite Downstream Website Design.jpg",
    youtubeVideoId: "9bZkp7q19f0",
    youtubeUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0",
    videoDuration: "2:30",
    quote: "In the oil and gas logistics space, safety, compliance, and reliability are paramount. Mindware built us a secure, enterprise-grade digital portal that passed all internal governance checks seamlessly.",
    highlightOutcome: "Achieved 100% compliance alignment for international energy audit and supplier verification.",
    metricLabel: "Stakeholder Trust Index",
    metricValue: "99.8%",
    rating: 5,
    projectDuration: "6 Weeks",
    date: "May 2026",
    featured: false
  },
  {
    id: "quanxi-limited-video",
    name: "Alhaji Bello Mohammed",
    role: "Director of Equipment Sales",
    company: "Quanxi Limited",
    organizationOrTrack: "Quanxi Limited",
    industry: "Agricultural Tractors & Road Construction Machinery",
    serviceProvided: "Machinery Sourcing Portal & SEO Strategy",
    location: "Kano & Abuja, Nigeria",
    websiteUrl: "https://quanxilimited.com.ng/",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=250&q=80",
    thumbnail: "/assets/Quanxi ltd.jpg",
    youtubeVideoId: "fJ9rUzIMcZQ",
    youtubeUrl: "https://www.youtube.com/watch?v=fJ9rUzIMcZQ",
    videoDuration: "3:05",
    quote: "Heavy agricultural tractors and excavators require high buyer confidence. The digital catalog and lead capture system Mindware designed for Quanxi generated verified bids from agricultural cooperatives in our first month.",
    highlightOutcome: "Generated commercial equipment procurement RFQs valued at over ₦150 Million.",
    metricLabel: "Equipment Sourcing Pipeline",
    metricValue: "₦150M+",
    rating: 5,
    projectDuration: "4 Weeks",
    date: "March 2026",
    featured: false
  }
];

/**
 * TRAINING ACADEMY STUDENT TESTIMONIALS (COMPARTMENT 2)
 * Graduates who transformed their careers through Mindware's certified courses in PMP®, HSE, Web Dev, & SEO.
 * Note: Replace `youtubeVideoId` with actual video ID from your YouTube channel.
 */
export const STUDENT_TESTIMONIALS: StudentGraduateTestimonial[] = [
  {
    id: "emeka-pmp-video",
    name: "Emeka Nwankwo, PMP®",
    role: "Senior Project Delivery Lead",
    currentEmployer: "Global Energy & Infrastructure Consortium",
    organizationOrTrack: "Professional & HSE Academy",
    academyTrack: "Professional & HSE Academy",
    courseEnrolled: "PMP® Exam Prep & Project Governance Mastery",
    certificationEarned: "Project Management Professional (PMP®)",
    careerImpact: "Promoted from Project Coordinator to Senior Project Lead with an 85% salary increment.",
    location: "Lagos, Nigeria",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
    thumbnail: "/src/assets/images/talent_matching_network_1790617842281.jpg",
    youtubeVideoId: "ScMzIvxBSi4", // Easily swappable placeholder YouTube ID
    youtubeUrl: "https://www.youtube.com/watch?v=ScMzIvxBSi4",
    videoDuration: "4:12",
    quote: "Mindware's PMP® faculty broke down complex PMBOK methodologies into practical, real-world African enterprise frameworks. I passed my exam on the very first attempt with Above Target ratings in all 3 domains!",
    highlightOutcome: "Passed PMP® on 1st Attempt (Above Target in Process, People, and Business Environment).",
    metricLabel: "First-Sitting Score",
    metricValue: "3x Above Target",
    rating: 5,
    date: "September 2026",
    featured: true
  },
  {
    id: "blessing-hse-video",
    name: "Blessing Okafor",
    role: "Occupational Health & Safety Compliance Officer",
    currentEmployer: "Offshore Marine Operations Services",
    organizationOrTrack: "Professional & HSE Academy",
    academyTrack: "Professional & HSE Academy",
    courseEnrolled: "HSE Levels 1, 2, 3 (General, Advanced, & Environmental Mgmt)",
    certificationEarned: "Certified HSE Specialist (Levels 1, 2 & 3)",
    careerImpact: "Secured employment in high-paying offshore maritime sector within 3 weeks of certification.",
    location: "Warri, Delta State, Nigeria",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=250&q=80",
    thumbnail: "/src/assets/images/careers_hero_workspace_1790617831121.jpg",
    youtubeVideoId: "L_LUpnjgPso",
    youtubeUrl: "https://www.youtube.com/watch?v=L_LUpnjgPso",
    videoDuration: "3:30",
    quote: "The practical hazard identification drills and environmental impact assessment training at Mindware Academy gave me the exact hands-on confidence I needed during offshore technical interviews. Highly recommended!",
    highlightOutcome: "Selected out of 120 applicants for the Chevron contractor HSE compliance opening.",
    metricLabel: "Hiring Turnaround",
    metricValue: "21 Days",
    rating: 5,
    date: "August 2026",
    featured: true
  },
  {
    id: "tunde-webdev-video",
    name: "Tunde Bakare",
    role: "Full-Stack Software Engineer",
    currentEmployer: "Remote FinTech Platform (UK / Nigeria)",
    organizationOrTrack: "Digital Skills Academy",
    academyTrack: "Digital Skills Academy",
    courseEnrolled: "Full-Stack Web Development (React, TypeScript & Node.js)",
    certificationEarned: "Certified Full-Stack Web Engineer",
    careerImpact: "Transitioned from non-tech retail banking into a remote software engineering position.",
    location: "Ibadan & Remote",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=250&q=80",
    thumbnail: "/src/assets/images/values_innovation_culture_1790617210723.jpg",
    youtubeVideoId: "kJQP7kiw5Fk",
    youtubeUrl: "https://www.youtube.com/watch?v=kJQP7kiw5Fk",
    videoDuration: "3:50",
    quote: "Mindware is not a generic tutorial academy. We built production-ready applications with clean code, testing, and modern deployment pipelines. The portfolio I built during the academy landed me my first remote tech job.",
    highlightOutcome: "Earns in foreign currency while working remotely from Nigeria.",
    metricLabel: "Income Acceleration",
    metricValue: "4.2x",
    rating: 5,
    date: "July 2026",
    featured: false
  },
  {
    id: "chiamaka-seo-video",
    name: "Chiamaka Eze",
    role: "Growth Marketer & Technical SEO Strategist",
    currentEmployer: "Venture-Backed E-Commerce Platform",
    organizationOrTrack: "Digital Skills Academy",
    academyTrack: "Digital Skills Academy",
    courseEnrolled: "Advanced SEO Dominance & Conversion Optimization",
    certificationEarned: "Certified Search Marketing Strategist",
    careerImpact: "Hired to lead organic customer acquisition across Nigerian and Ghanaian e-commerce operations.",
    location: "Enugu, Nigeria",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=250&q=80",
    thumbnail: "/src/assets/images/mission_hero_vision_1790617197716.jpg",
    youtubeVideoId: "9bZkp7q19f0",
    youtubeUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0",
    videoDuration: "2:40",
    quote: "Learning programmatic SEO, schema architecture, and technical site auditing at Mindware completely demystified Google rankings. My capstone project ranked on Page 1 within two months.",
    highlightOutcome: "Grew client organic visitor sessions by 400,000 monthly pageviews in under 6 months.",
    metricLabel: "Organic Traffic Lift",
    metricValue: "+400K/mo",
    rating: 5,
    date: "June 2026",
    featured: false
  },
  {
    id: "aisha-pmp-video",
    name: "Aisha Mohammed, PMP®",
    role: "Capital Infrastructure Project Manager",
    currentEmployer: "Urban Development & Construction Authority",
    organizationOrTrack: "Professional & HSE Academy",
    academyTrack: "Professional & HSE Academy",
    courseEnrolled: "PMP® Executive Intensive & Risk Frameworks",
    certificationEarned: "Project Management Professional (PMP®)",
    careerImpact: "Appointed to lead landmark state hospital modernization and municipal infrastructure.",
    location: "Kaduna & Abuja, Nigeria",
    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=250&q=80",
    thumbnail: "/src/assets/images/leadership_executive_team_1790617221909.jpg",
    youtubeVideoId: "C0DPdy98e4c",
    youtubeUrl: "https://www.youtube.com/watch?v=C0DPdy98e4c",
    videoDuration: "3:22",
    quote: "The personalized coaching and exam simulation mock tests at Mindware were 100% true to the actual PMI exam format. The confidence and strategic rigor I gained cannot be overstated.",
    highlightOutcome: "Directly oversees ₦2.5 Billion in capital civil development projects with zero schedule delays.",
    metricLabel: "Project Capital Under Mgmt",
    metricValue: "₦2.5B+",
    rating: 5,
    date: "May 2026",
    featured: false
  },
  {
    id: "kenneth-hse-video",
    name: "Kenneth Oladipo",
    role: "Lead HSE Auditor & Environmental Consultant",
    currentEmployer: "EcoSafe Environmental & Engineering Consultants",
    organizationOrTrack: "Professional & HSE Academy",
    academyTrack: "Professional & HSE Academy",
    courseEnrolled: "HSE Management Systems, OSHA Protocols & Risk Assessment",
    certificationEarned: "Certified HSE Level 1, 2 & 3 Auditor",
    careerImpact: "Established private consulting practice auditing industrial manufacturing plants and construction sites.",
    location: "Ikeja, Lagos, Nigeria",
    avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=250&q=80",
    thumbnail: "/src/assets/images/talent_matching_network_1790617842281.jpg",
    youtubeVideoId: "fJ9rUzIMcZQ",
    youtubeUrl: "https://www.youtube.com/watch?v=fJ9rUzIMcZQ",
    videoDuration: "3:02",
    quote: "Mindware's HSE certification is respected across the industrial sector in Nigeria. Employers and regulatory inspectors recognize the rigorous training standard immediately.",
    highlightOutcome: "Conducted over 35 statutory HSE audits with zero lost-time injury compliance records.",
    metricLabel: "Site Audits Completed",
    metricValue: "35+ Audits",
    rating: 5,
    date: "April 2026",
    featured: false
  }
];

export const OFFICIAL_YOUTUBE_CHANNEL = {
  name: "Mindware Consulting Ltd",
  handle: "@mindwareconsultingltd",
  url: "https://www.youtube.com/mindwareconsultingltd",
  description: "Subscribe for deep-dive client project breakdowns, student success spotlights, digital marketing masterclasses, and executive project management insights.",
  subscribersCount: "5.4K+",
  videoCount: "48+"
};
