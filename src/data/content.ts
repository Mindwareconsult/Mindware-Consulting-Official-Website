import { ReactNode } from "react";
import { 
    MonitorSmartphone, 
    Search, 
    Share2, 
    Smartphone, 
    GraduationCap, 
    Lightbulb,
    BarChart3,
    Users,
    Globe2,
    Zap
} from "lucide-react";

export const SERVICES = [
    {
        id: "website-design",
        title: "Website Design",
        tagline: "Websites designed to turn attention into opportunity.",
        description: "We build high-performance business websites, landing pages, and web applications that establish credibility and convert visitors.",
        icon: MonitorSmartphone,
        features: ["Responsive Design", "Conversion Optimization", "SEO-ready Architecture", "Custom Web Applications"]
    },
    {
        id: "seo",
        title: "Search Engine Optimization",
        tagline: "Get discovered when your customers are searching.",
        description: "Increase your organic visibility on Google, outrank competitors, and capture high-intent traffic.",
        icon: Search,
        features: ["Technical SEO", "On-page Optimization", "Local SEO", "Content Strategy"]
    },
    {
        id: "social-media-marketing",
        title: "Social Media Marketing",
        tagline: "Turn attention into relationships, trust and customers.",
        description: "Strategic social presence that builds your brand identity and engages your target audience.",
        icon: Share2,
        features: ["Social Strategy", "Content Creation", "Community Management", "Paid Campaigns"]
    },
    {
        id: "app-development",
        title: "App Development",
        tagline: "Turn your business idea into a useful digital product.",
        description: "Custom mobile and web applications designed to solve real business problems and scale with your growth.",
        icon: Smartphone,
        features: ["Web Applications", "Mobile Apps", "Dashboards & Portals", "API Integrations"]
    },
    {
        id: "training",
        title: "Training",
        tagline: "Learn digital skills you can actually use.",
        description: "Practical, career-focused training programs in web design, digital marketing, and modern technologies.",
        icon: GraduationCap,
        features: ["Web Design & WordPress", "Digital Marketing", "AI Tools", "Data Analysis"]
    },
    {
        id: "consultancy",
        title: "Consultancy",
        tagline: "Turn digital complexity into a clear growth strategy.",
        description: "Expert guidance on digital transformation, marketing strategy, and business growth systems.",
        icon: Lightbulb,
        features: ["Digital Strategy", "Business Development", "Technology Consulting", "Growth Strategy"]
    }
];

export const PORTFOLIO = [
    {
        id: "temamost-construction",
        title: "Construction Company Website",
        client: "Temamost Nigeria Ltd",
        industry: "Construction & Engineering",
        service: "Website Design",
        image: "/assets/Temamost Website Design compressed.jpg",
        challenge: "Needed a professional digital presence to showcase their engineering projects and attract high-value contracts in Port Harcourt.",
        result: "Designed and built a responsive, portfolio-driven website establishing strong digital authority.",
        link: "https://www.constructionstemamost.com/",
        projectMetrics: { growth: 45, duration: 4 }
    },
    {
        id: "watech-integrated",
        title: "Construction & Engineering Portal",
        client: "Watech Nigeria Ltd",
        industry: "Construction & Concrete Solutions",
        service: "Website Design",
        image: "/assets/Watech Website Design.jpg",
        challenge: "Needed a powerful digital platform to showcase their top-tier concrete solutions and large-scale construction projects in Lagos.",
        result: "Designed and developed an immersive, fast-loading corporate website to attract high-value infrastructure contracts.",
        link: "https://watechconcretesolutions.com/",
        projectMetrics: { growth: 60, duration: 3 }
    },
    {
        id: "cosmozel-construction",
        title: "Civil Engineering Digital Identity",
        client: "Cosmozel Nigeria Limited",
        industry: "Civil Engineering & Construction",
        service: "Website Design",
        image: "/assets/Csmozel website design.jpg",
        challenge: "Required a trusted online platform to highlight their civil engineering capabilities and showcase past successful projects.",
        result: "Delivered a modern, professional website that transformed their ideas into a compelling digital reality, boosting industry trust.",
        link: "https://cosmozelconstructions.com.ng/",
        projectMetrics: { growth: 35, duration: 5 }
    },
    {
        id: "efudo-construction",
        title: "Construction & Manufacturing Platform",
        client: "Efudo General Construction Company",
        industry: "Construction & Manufacturing",
        service: "Website Design",
        image: "/assets/Efudo Website Design.jpg",
        challenge: "Needed a comprehensive online presence to highlight their dual expertise in general construction and premium building product manufacturing across Nigeria.",
        result: "Created an engaging and robust corporate website that effectively showcases their wide array of services and nationwide impact.",
        link: "https://efudoconstruction.com.ng/",
        projectMetrics: { growth: 80, duration: 4 }
    },
    {
        id: "infinite-downstream",
        title: "Energy & Logistics Platform",
        client: "Infinite Downstream Logistics Limited",
        industry: "Logistics & Energy",
        service: "Website Design",
        image: "/assets/Infinite Downstream Website Design.jpg",
        challenge: "Required a professional digital footprint to communicate their core mission of moving energy forward safely and efficiently.",
        result: "Developed a modern, secure, and highly reliable corporate website that solidifies their brand authority in the downstream sector.",
        link: "https://infinitedownstreamlogistics.com.ng/",
        projectMetrics: { growth: 50, duration: 6 }
    },
    {
        id: "royalty-finishing",
        title: "Premium Flooring & Finishing Portal",
        client: "Royalty Speed Finishing Enterprises",
        industry: "Interior & Finishing",
        service: "Website Design",
        image: "/assets/Royalty Website Design.jpg",
        challenge: "Needed an elegant digital showcase for their superior terrazzo, marble, and epoxy flooring solutions in Lagos.",
        result: "Created a visually stunning and highly engaging portfolio website that effectively highlights their premium finishing craftsmanship.",
        link: "https://royaltyfinishing.com.ng/",
        projectMetrics: { growth: 70, duration: 3 }
    }
];

export const METRICS = [
    { label: "Successful Projects", value: "150+" },
    { label: "Client ROI Avg", value: "300%" },
    { label: "Years Experience", value: "5+" },
    { label: "Professionals Trained", value: "500+" }
];

export const NAVIGATION = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Training", path: "/training" },
    { name: "Insights", path: "/insights" },
    { name: "Contact", path: "/contact" }
];
