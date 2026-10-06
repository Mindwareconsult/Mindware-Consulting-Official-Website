export interface TrainingGalleryItem {
  id: string;
  title: string;
  category: "all" | "digital-skills" | "hse-safety" | "pmp-executive" | "certifications";
  categoryLabel: string;
  date: string;
  location: string;
  image: string;
  description: string;
  attendeesCount: string;
  leadInstructor: string;
  highlightTags: string[];
}

export const TRAINING_GALLERY_CATEGORIES = [
  { id: "all", label: "All Live Sessions" },
  { id: "digital-skills", label: "Digital Skills & Web Labs" },
  { id: "hse-safety", label: "HSE Safety Drills & PPE" },
  { id: "pmp-executive", label: "PMP® Executive Classes" },
  { id: "certifications", label: "Graduations & Awards" }
];

export const TRAINING_GALLERY_ITEMS: TrainingGalleryItem[] = [
  {
    id: "web-dev-lab-live",
    title: "Full-Stack Web Development & UI/UX Live Coding Lab",
    category: "digital-skills",
    categoryLabel: "Digital Skills Lab",
    date: "September 2026",
    location: "Mindware Tech Innovation Hub, Ikeja, Lagos",
    image: "/src/assets/images/training_web_lab_1790960908174.jpg",
    description: "Hands-on studio session where students code production-ready responsive applications with React, TypeScript, and modern WordPress workflows under active engineering supervision.",
    attendeesCount: "26 Trainees",
    leadInstructor: "Senior Full-Stack Consultant",
    highlightTags: ["React & Node.js", "Live Project Build", "Mobile Responsive"]
  },
  {
    id: "hse-safety-inspection-drill",
    title: "HSE Levels 1, 2 & 3 Practical Hazard Inspection & PPE Safety Drill",
    category: "hse-safety",
    categoryLabel: "HSE Safety Workshop",
    date: "August 2026",
    location: "Industrial Safety Yard, Port Harcourt & Lagos",
    image: "/src/assets/images/training_hse_drill_1790960918179.jpg",
    description: "Outdoor practical workshop covering statutory hazard identification, OSHA guidelines, emergency response protocols, and PPE deployment for offshore and construction compliance.",
    attendeesCount: "32 Safety Trainees",
    leadInstructor: "Certified Lead HSE Auditor & OSHA Specialist",
    highlightTags: ["PPE Inspection", "OSHA Standard", "Hazard Control"]
  },
  {
    id: "pmp-executive-governance-masterclass",
    title: "Executive PMP® Exam Prep & Capital Project Governance Masterclass",
    category: "pmp-executive",
    categoryLabel: "Executive PMP® Seminar",
    date: "August 2026",
    location: "Corporate Boardroom, Victoria Island, Lagos",
    image: "/src/assets/images/training_pmp_session_1790960928930.jpg",
    description: "Senior engineers, delivery managers, and operations directors working through real-world PMBOK 7th Edition case studies, risk governance matrices, and agile project delivery.",
    attendeesCount: "18 Corporate Executives",
    leadInstructor: "PMP® Accredited Faculty Director",
    highlightTags: ["PMBOK 7th Edition", "Agile Frameworks", "Executive Cohort"]
  },
  {
    id: "academy-graduation-ceremony-2026",
    title: "Mindware Academy Annual Cohort Graduation & Award Ceremony",
    category: "certifications",
    categoryLabel: "Certifications & Awards",
    date: "July 2026",
    location: "Civic Centre Auditorium, Victoria Island, Lagos",
    image: "/src/assets/images/training_graduation_ceremony_1790960939072.jpg",
    description: "Celebrating certified graduates across both Digital Skills and Professional HSE tracks as they receive their accredited diplomas and connect with enterprise hiring partners.",
    attendeesCount: "54 Certified Graduates",
    leadInstructor: "Dean of Academy & Executive Team",
    highlightTags: ["Accredited Diplomas", "Career Placements", "Alumni Network"]
  },
  {
    id: "data-analytics-dashboard-sprint",
    title: "Python Data Analytics & PowerBI Executive Dashboard Sprint",
    category: "digital-skills",
    categoryLabel: "Digital Skills Lab",
    date: "July 2026",
    location: "Mindware Digital Lab, Lekki Phase 1, Lagos",
    image: "/src/assets/images/talent_matching_network_1790617842281.jpg",
    description: "Intensive weekend workshop where business analysts and data scientists structure SQL queries, automate financial datasets, and publish real-time PowerBI dashboards.",
    attendeesCount: "22 Analysts",
    leadInstructor: "Lead BI Data Consultant",
    highlightTags: ["PowerBI & SQL", "Data Pipeline", "Financial Modeling"]
  },
  {
    id: "hse-environmental-audit-fieldwork",
    title: "Advanced Environmental Remediation & Field Risk Assessment Simulation",
    category: "hse-safety",
    categoryLabel: "HSE Safety Workshop",
    date: "June 2026",
    location: "Environmental Field Testing Station, Delta State",
    image: "/src/assets/images/values_innovation_culture_1790617210723.jpg",
    description: "Simulated environmental incident response, soil testing documentation, and statutory regulatory filing compliance workshop for oil & gas environmental officers.",
    attendeesCount: "28 Compliance Officers",
    leadInstructor: "Environmental Impact Assessment Expert",
    highlightTags: ["Environmental Risk", "Regulatory Filing", "Field Testing"]
  },
  {
    id: "tech-talent-showcase-demo-day",
    title: "Academy Tech Talent Demo Day & Corporate Employer Match",
    category: "certifications",
    categoryLabel: "Certifications & Awards",
    date: "May 2026",
    location: "The Continental Hotel, Victoria Island, Lagos",
    image: "/src/assets/images/careers_hero_workspace_1790617831121.jpg",
    description: "Graduating web developers, SEO specialists, and software engineers pitch their capstone client projects directly to visiting recruiters and engineering hiring managers.",
    attendeesCount: "40 Candidates & 15 Employers",
    leadInstructor: "Talent Hub Director",
    highlightTags: ["Employer Match", "Live Project Pitch", "Immediate Hires"]
  },
  {
    id: "pmp-risk-simulation-workshop",
    title: "Capital Infrastructure Risk Management & Earned Value (EVM) Workshop",
    category: "pmp-executive",
    categoryLabel: "Executive PMP® Seminar",
    date: "April 2026",
    location: "Federal Capital Territory Training Suite, Abuja",
    image: "/src/assets/images/leadership_executive_team_1790617221909.jpg",
    description: "Interactive simulation for federal contractors and infrastructure delivery directors calculating cost variances, critical path method (CPM), and contractual risk mitigations.",
    attendeesCount: "16 Delivery Directors",
    leadInstructor: "Senior Project Controls Consultant",
    highlightTags: ["EVM Calculation", "Federal Tenders", "Critical Path"]
  }
];
