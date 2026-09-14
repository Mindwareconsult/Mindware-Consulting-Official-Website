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
        image: "/assets/Temamost Website Design.png",
        challenge: "Needed a professional digital presence to showcase their engineering projects and attract high-value contracts in Port Harcourt.",
        result: "Designed and built a responsive, portfolio-driven website establishing strong digital authority.",
        link: "https://www.constructionstemamost.com/"
    },
    {
        id: "ecommerce-growth",
        title: "Retail eCommerce Scaling",
        client: "RetailBrand",
        industry: "Retail",
        service: "Website Design & SEO",
        image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=800",
        challenge: "Stagnant online sales despite high offline brand awareness.",
        result: "200% increase in organic traffic and 150% boost in online sales YoY."
    },
    {
        id: "corporate-rebrand",
        title: "Real Estate Digital Presence",
        client: "Prime Properties",
        industry: "Real Estate",
        service: "Website Design",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800",
        challenge: "Outdated website failing to attract high-net-worth investors.",
        result: "Generated 50+ qualified enterprise leads in the first quarter."
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
