import { motion, useScroll, useTransform, AnimatePresence, useInView, useMotionValueEvent } from "motion/react";
import { ArrowRight, ArrowUpRight, BarChart3, Globe2, Lightbulb, ChevronLeft, ChevronRight, Quote, Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { SERVICES, PORTFOLIO } from "../data/content";
import { cn, EASE } from "../lib/utils";
import { useRef, useState, useEffect } from "react";
import { FadeInSection } from "../components/FadeInSection";
import { SEO } from "../components/SEO";
import { MetricChart } from "../components/MetricChart";

function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <FadeInSection ref={containerRef} className="relative min-h-[100vh] flex items-center pt-24 overflow-hidden bg-mw-dark">
      {/* Background Effect */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-mw-orange/10 via-mw-dark to-mw-dark" />
      </motion.div>

      <div className="container relative z-10 mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE }}
          className="max-w-6xl flex flex-col md:flex-row md:items-end justify-between gap-12"
        >
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 mb-10">
               <div className="w-1.5 h-1.5 rounded-full bg-mw-orange animate-pulse" />
               <span className="text-sm font-bold tracking-[0.2em] uppercase text-white/60">Premium Digital Growth Partner</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[7rem] font-bold font-sans tracking-tight mb-8 leading-[1.05] md:leading-[1] text-white">
              We Build Digital <br className="hidden md:block" />
              <span className="text-mw-orange inline-block">Experiences</span> That <br className="hidden md:block" />
              Grow Businesses.
            </h1>
            
            <p className="text-xl md:text-2xl text-white/60 max-w-2xl leading-relaxed font-normal">
              Mindware Consulting helps businesses build stronger digital presence, attract the right audience, and turn online interactions into sustainable growth.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 flex-shrink-0 md:pb-4">
            <Link
              to="/pricing"
              className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white text-mw-dark hover:bg-mw-orange hover:text-white px-8 py-5 rounded-full font-bold text-sm md:text-base transition-all hover:scale-105 active:scale-95 shadow-xl"
            >
              <span>Explore Packages</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 text-white border border-white/10 px-8 py-5 rounded-full font-bold text-sm md:text-base transition-all hover:scale-105 active:scale-95"
            >
              <span>Book Consultation</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </FadeInSection>
  );
}

function AnimatedCounter({ end, duration = 2, suffix = "", prefix = "" }: { end: number, duration?: number, suffix?: string, prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  useEffect(() => {
    if (isInView) {
      let startTimestamp: number;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        
        // easeOutQuad easing
        const easeOutProgress = 1 - (1 - progress) * (1 - progress);
        
        setCount(Math.floor(easeOutProgress * end));
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{count}{suffix}
    </span>
  );
}

function GrowthMetrics() {
  const metrics = [
    { label: "Projects Completed", value: 150, suffix: "+", prefix: "" },
    { label: "ROI Delivered", value: 300, suffix: "%", prefix: "Up to " },
    { label: "Global Clients", value: 50, suffix: "+", prefix: "" },
    { label: "Years Experience", value: 10, suffix: "+", prefix: "" },
  ];

  return (
    <FadeInSection className="py-32 bg-[#02040a] border-t border-white/5 relative z-10 overflow-hidden">
      <h2 className="sr-only">Our Growth Metrics</h2>
      <div className="absolute inset-0 bg-gradient-to-b from-mw-orange/5 to-transparent mix-blend-screen pointer-events-none" />
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-16 md:gap-8 divide-x divide-white/5">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
              className={cn("flex flex-col items-center md:items-start text-center md:text-left", i !== 0 && "pl-0 md:pl-8 lg:pl-12")}
            >
              <div className="text-5xl md:text-6xl lg:text-7xl font-sans font-bold tracking-tight text-white mb-4 drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]">
                <AnimatedCounter end={metric.value} suffix={metric.suffix} prefix={metric.prefix} />
              </div>
              <p className="text-white/50 font-medium uppercase tracking-[0.2em] text-[10px] md:text-xs">
                {metric.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </FadeInSection>
  );
}

function TrustedBy() {
  const partnerLogos = [
    "/logos/quanxi.jpg",
    "/logos/harmostructs.jpg",
    "/logos/bcale.jpg",
    "/logos/C1.jpg",
    "/logos/C2.jpg",
    "/logos/C3.jpg",
    "/logos/C5.jpg",
    "/logos/C8.jpg",
    "/logos/crescon.png",
    "/logos/crystal-link.jpg",
    "/logos/egenibo.png",
    "/logos/frank-view.jpeg",
    "/logos/klogo.jpg",
    "/logos/logo-5.jpeg",
    "/logos/logo.jpg",
    "/logos/MH2.jpg",
    "/logos/MH3.jpg",
    "/logos/MH4.jpg",
    "/logos/MH5.jpg",
    "/logos/MH8.jpg",
    "/logos/p2.png",
    "/logos/whatsapp-logo.jpeg"
  ];

  return (
    <FadeInSection className="py-24 bg-[#02040a] relative overflow-hidden border-t border-white/5">
      <h2 className="sr-only">Our Partners</h2>
      <div className="container mx-auto px-6 md:px-12 mb-12 relative z-20">
        <p className="text-center text-white/40 text-[10px] uppercase tracking-[0.3em] font-semibold">
          Trusted by innovative companies worldwide
        </p>
      </div>
      
      <div className="relative flex overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-24 md:w-64 bg-gradient-to-r from-[#02040a] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-64 bg-gradient-to-l from-[#02040a] to-transparent z-10 pointer-events-none" />
        
        <motion.div
          className="flex items-center gap-10 md:gap-16 min-w-max pr-10 md:pr-16"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 50, ease: "linear", repeat: Infinity }}
        >
          {[...partnerLogos, ...partnerLogos].map((logo, i) => (
            <div key={i} className="flex items-center justify-center shrink-0">
              <img 
                src={logo} 
                alt="Client logo" 
                className="h-20 md:h-24 w-auto object-contain opacity-80 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500 rounded-md"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </FadeInSection>
  );
}

function SelfSelection() {
  const options = [
    { id: "01", label: "I Need A Website", desc: "High-performance digital platforms.", path: "/services/website-design" },
    { id: "02", label: "I Need More Customers", desc: "SEO & Growth marketing.", path: "/services/seo" },
    { id: "03", label: "I Need A Digital Strategy", desc: "Consulting & transformation.", path: "/services/consultancy" },
  ];

  return (
    <FadeInSection className="py-32 lg:py-48 bg-mw-dark relative z-10 border-t border-white/5 overflow-hidden">
      {/* Editorial background element */}
      <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-mw-orange/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-12 gap-20">
           <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="inline-flex items-center gap-3 mb-8">
                 <div className="w-1.5 h-1.5 rounded-full bg-mw-orange" />
                 <span className="text-[10px] font-sans tracking-[0.2em] uppercase font-bold text-white/50">Your Objective</span>
              </div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-sans font-bold mb-8 tracking-tight leading-[1.1]">What can we <br/>help you achieve?</h2>
              <p className="text-xl text-white/50 max-w-md font-light leading-relaxed">Select your primary business objective to discover how our integrated approach can accelerate your growth.</p>
           </div>
           
           <div className="lg:col-span-7 flex flex-col gap-6">
              {options.map((opt, i) => (
                <motion.div
                  key={opt.label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-20%" }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
                >
                  <Link 
                    to={opt.path}
                    className="group relative flex items-center justify-between p-8 md:p-12 border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/20 transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mw-orange rounded-2xl overflow-hidden"
                  >
                    <div className="absolute -left-6 -top-10 text-[8rem] md:text-[12rem] font-sans font-bold text-white/[0.02] group-hover:text-white/[0.04] transition-colors duration-500 pointer-events-none select-none leading-none">
                      {opt.id}
                    </div>
                    
                    <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-12 w-full">
                       <div className="flex-1">
                          <h3 className="text-3xl md:text-4xl font-sans font-bold tracking-tight mb-3 group-hover:text-mw-orange transition-colors text-white/90">{opt.label}</h3>
                          <p className="text-lg text-white/50 group-hover:text-white/70 transition-colors font-light">{opt.desc}</p>
                       </div>
                    </div>
                    
                    <div className="relative z-10 w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-mw-orange group-hover:border-mw-orange transition-all duration-500 shrink-0">
                       <ArrowRight className="w-6 h-6 text-white/50 group-hover:text-white group-hover:-rotate-45 transition-all duration-500" />
                    </div>
                  </Link>
                </motion.div>
              ))}
           </div>
        </div>
      </div>
    </FadeInSection>
  );
}

function Ecosystem() {
  const elements = [
    { name: "Website", deg: 0, color: "bg-blue-500" },
    { name: "SEO", deg: 51, color: "bg-green-500" },
    { name: "Social", deg: 102, color: "bg-pink-500" },
    { name: "Apps", deg: 153, color: "bg-purple-500" },
    { name: "Strategy", deg: 204, color: "bg-yellow-500" },
    { name: "Leads", deg: 255, color: "bg-red-500" },
    { name: "Analytics", deg: 306, color: "bg-cyan-500" },
  ];

  return (
    <FadeInSection className="py-32 lg:py-48 relative overflow-hidden bg-[#02040A]">
      <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
        <div className="max-w-4xl mx-auto mb-32">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-8 tracking-tight">One Business.<br/>One Connected System.</h2>
          <p className="text-xl md:text-2xl text-white/50 font-light max-w-2xl mx-auto">
            Mindware does not operate disconnected services. We build intelligent, connected digital growth systems where strategy, technology, and marketing work in unison.
          </p>
        </div>

        <div className="relative h-[400px] md:h-[600px] flex items-center justify-center max-w-5xl mx-auto overflow-hidden md:overflow-visible">
           {/* Radar Rings */}
           <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none scale-[0.5] md:scale-100">
              <div className="w-[300px] h-[300px] border border-white/40 rounded-full absolute" />
              <div className="w-[500px] h-[500px] border border-white/20 rounded-full absolute border-dashed" />
              <div className="w-[700px] h-[700px] border border-white/10 rounded-full absolute" />
           </div>

           <div className="relative flex items-center justify-center scale-[0.5] md:scale-100 w-full h-full">
             {/* Center Node */}
             <motion.div 
               animate={{ boxShadow: ["0 0 40px -10px rgba(249,115,22,0.3)", "0 0 80px 10px rgba(249,115,22,0.6)", "0 0 40px -10px rgba(249,115,22,0.3)"] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="relative z-20 w-40 h-40 rounded-full bg-mw-dark border border-mw-orange/50 flex flex-col items-center justify-center text-center shadow-2xl"
             >
                <div className="absolute inset-2 rounded-full bg-gradient-to-br from-mw-orange to-orange-700 flex items-center justify-center">
                   <span className="font-sans font-bold text-xl leading-tight text-white tracking-wide">YOUR<br/>BUSINESS</span>
                </div>
             </motion.div>
  
             {/* Orbiting Elements */}
             {elements.map((el, i) => {
               const radius = 250;
               const rad = (el.deg * Math.PI) / 180;
               const x = Math.cos(rad) * radius;
               const y = Math.sin(rad) * radius;
  
               return (
                 <motion.div
                   key={el.name}
                   initial={{ opacity: 0, scale: 0 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   viewport={{ once: true, margin: "-20%" }}
                   transition={{ duration: 1, delay: i * 0.1, type: "spring", stiffness: 40 }}
                   className="absolute z-10 flex flex-col items-center gap-3 cursor-default"
                   style={{ x, y }}
                 >
                   <div className="relative">
                     <div className={cn("w-4 h-4 rounded-full relative z-10", el.color)} />
                     <div className={cn("w-4 h-4 rounded-full absolute inset-0 animate-ping opacity-50", el.color)} />
                   </div>
                   <span className="text-sm font-bold tracking-wider uppercase text-white/70 bg-mw-dark/80 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">{el.name}</span>
                 </motion.div>
               );
             })}
           </div>
        </div>
      </div>
    </FadeInSection>
  );
}

function ServicesOverview() {
  return (
    <FadeInSection className="py-32 lg:py-48 bg-mw-dark border-t border-white/5 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/[0.02] via-mw-dark to-mw-dark pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 mb-8">
               <div className="w-1.5 h-1.5 rounded-full bg-mw-orange" />
               <span className="text-[10px] font-sans tracking-[0.2em] uppercase font-bold text-white/50">Core Expertise</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-sans font-bold mb-8 tracking-tight leading-tight">Digital Systems<br />Engineered for Growth.</h2>
            <p className="text-2xl text-white/50 font-light leading-relaxed">
              We design the digital infrastructure businesses need to become visible, credible, and fundamentally easier to buy from.
            </p>
          </div>
          <Link to="/services" className="group inline-flex items-center gap-4 text-mw-orange font-medium hover:text-orange-400 transition-colors pb-4 border-b border-mw-orange/30 hover:border-mw-orange/80 shrink-0">
            <span className="uppercase tracking-[0.2em] text-xs font-bold">View all capabilities</span> 
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            // Define span logic for asymmetric grid
            let colSpan = "md:col-span-4";
            if (i === 0) colSpan = "md:col-span-8";
            else if (i === 1) colSpan = "md:col-span-4";
            else if (i === 5) colSpan = "md:col-span-12 lg:col-span-8 lg:col-start-3"; 

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
                className={cn(
                  "group relative p-10 lg:p-14 rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-white/[0.04] to-transparent flex flex-col h-full overflow-hidden hover:border-mw-orange/50 transition-all duration-700",
                  colSpan
                )}
              >
                <div className="absolute inset-0 bg-mw-orange/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="absolute top-0 right-0 p-10 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0">
                  <ArrowUpRight className="w-10 h-10 text-mw-orange/80" />
                </div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-10 group-hover:bg-mw-orange/10 group-hover:border-mw-orange/30 transition-all duration-500">
                     <Icon className="w-7 h-7 text-mw-orange group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  
                  <h3 className={cn("font-sans font-bold tracking-tight mb-4", i === 0 ? "text-4xl lg:text-5xl" : "text-3xl lg:text-4xl")}>
                    {service.title}
                  </h3>
                  
                  <p className="text-white/50 mb-12 flex-grow text-lg font-light leading-relaxed max-w-xl group-hover:text-white/70 transition-colors">
                    {service.tagline}
                  </p>
                </div>
                
                <Link
                  to={`/services/${service.id}`}
                  className="relative z-10 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] hover:text-mw-orange transition-colors mt-auto w-max text-white/50 group-hover:text-white"
                >
                  Explore <div className="w-8 h-[1px] bg-current" />
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </FadeInSection>
  );
}

function LatestWork() {
  const featuredIds = ["quanxi-limited", "harmostructs-engineering", "eclectic-seals", "crescon-projects", "bcale-associates"];
  const featured = featuredIds
    .map(id => PORTFOLIO.find(p => p.id === id))
    .filter((p): p is typeof PORTFOLIO[0] => Boolean(p));

  const projectsToDisplay = featured.length >= 4 ? featured : PORTFOLIO.slice(0, 4);

  return (
    <FadeInSection className="py-32 lg:py-48 bg-[#02040a] border-t border-white/5 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-mw-orange/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-mw-orange animate-pulse" />
              <span className="text-[10px] font-sans tracking-[0.2em] uppercase font-bold text-white/50">Our Latest Work</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-sans font-bold mb-6 tracking-tight leading-tight text-white">
              Selected Projects.<br />Proven Outcomes.
            </h2>
            <p className="text-xl md:text-2xl text-white/50 font-light leading-relaxed">
              Explore high-performance digital platforms, architectural portals, and SEO-driven systems we have engineered for forward-thinking brands.
            </p>
          </div>

          <Link
            to="/portfolio"
            aria-label="View all projects in portfolio"
            className="group hidden sm:inline-flex items-center gap-3 text-mw-orange font-medium hover:text-orange-400 transition-colors pb-4 border-b border-mw-orange/30 hover:border-mw-orange/80 shrink-0"
          >
            <span className="uppercase tracking-[0.2em] text-xs font-bold">View all projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Featured Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-20">
          {projectsToDisplay.map((project, i) => {
            const ContentWrapper = project.link ? "a" : "div";
            const wrapperProps = project.link
              ? { href: project.link, target: "_blank", rel: "noopener noreferrer", "aria-label": `Visit live website for ${project.title}` }
              : {};

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: (i % 2) * 0.1, ease: EASE }}
                className="group cursor-pointer rounded-[2rem] border border-white/5 bg-white/[0.015] hover:bg-white/[0.035] hover:border-white/20 p-6 md:p-8 transition-all duration-500 flex flex-col justify-between"
              >
                <ContentWrapper {...wrapperProps} className="block">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-white/5 flex items-center justify-center p-3">
                    <img
                      src={project.image}
                      alt={`Portfolio preview showing ${project.title} designed for ${project.client}`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-mw-dark/20 group-hover:bg-transparent transition-colors duration-500" />
                    <div className="absolute top-5 right-5 w-12 h-12 bg-white text-mw-dark rounded-full flex items-center justify-center opacity-0 -translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-xl">
                      <ArrowUpRight className="w-5 h-5" aria-hidden="true" />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-semibold text-mw-orange mb-3">
                    <span>{project.industry}</span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span className="text-white/60">{project.service}</span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white group-hover:text-mw-orange transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-white/60 text-base md:text-lg leading-relaxed mb-8 font-light">
                    {project.challenge}
                  </p>

                  {project.projectMetrics && (
                    <div className="pt-6 border-t border-white/10 flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-4">
                        <MetricChart value={project.projectMetrics.growth} />
                        <div>
                          <div className="text-xs font-medium text-white/50 uppercase tracking-wider">Growth</div>
                          <div className="text-lg font-bold text-mw-orange">+{project.projectMetrics.growth}%</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-medium text-white/50 uppercase tracking-wider">Duration</div>
                        <div className="text-lg font-bold text-white">{project.projectMetrics.duration} Weeks</div>
                      </div>
                    </div>
                  )}
                </ContentWrapper>
              </motion.article>
            );
          })}
        </div>

        {/* Action Button to see more projects */}
        <div className="flex flex-col items-center justify-center text-center pt-4">
          <Link
            to="/portfolio"
            aria-label="See more projects on the portfolio page"
            className="group inline-flex items-center justify-center gap-3 bg-white text-mw-dark hover:bg-mw-orange hover:text-white px-10 py-5 rounded-full font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl shadow-black/50"
          >
            <span>See More Projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </Link>
          <p className="text-sm text-white/40 mt-4 font-light">
            Explore our complete collection of case studies and industry solutions.
          </p>
        </div>
      </div>
    </FadeInSection>
  );
}

function GrowthSystem() {
  const steps = [
    { title: "DISCOVER", desc: "Understand the business, audience, and market context." },
    { title: "STRATEGIZE", desc: "Create the digital growth roadmap and define KPIs." },
    { title: "BUILD", desc: "Engineer the website, platform, and digital assets." },
    { title: "ATTRACT", desc: "Deploy SEO and marketing to capture high-intent traffic." },
    { title: "CONVERT", desc: "Optimize UX to turn attention into qualified leads." },
    { title: "SCALE", desc: "Leverage data, AI, and iteration for compound growth." },
  ];

  return (
    <FadeInSection className="py-32 lg:py-48 bg-white text-mw-dark relative">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
           {/* Sticky Header Side */}
           <div className="lg:col-span-5">
              <div className="sticky top-40">
                 <div className="inline-flex items-center gap-3 mb-8">
                   <div className="w-1.5 h-1.5 rounded-full bg-mw-orange" />
                   <span className="text-[10px] font-sans tracking-[0.2em] uppercase font-bold text-black/40">The Framework</span>
                 </div>
                 <h2 className="text-5xl md:text-6xl lg:text-7xl font-sans font-bold mb-8 tracking-tight leading-[1.05]">The Mindware<br/>Growth System.</h2>
                 <p className="text-xl md:text-2xl text-black/50 font-light leading-relaxed max-w-md">
                    A systematic, battle-tested framework turning digital complexity into measurable, continuous growth.
                 </p>
              </div>
           </div>

           {/* Scrolling Steps Side */}
           <div className="lg:col-span-7 flex flex-col gap-12 lg:gap-24 pt-12 lg:pt-0">
             {steps.map((step, i) => (
               <motion.div 
                 key={step.title}
                 initial={{ opacity: 0, y: 40 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: "-20%" }}
                 transition={{ duration: 0.8, ease: EASE }}
                 className="relative group border-l-[3px] border-black/5 pl-10 md:pl-16 py-4 hover:border-mw-orange transition-colors duration-700"
               >
                 <div className="absolute top-0 -left-[3px] w-[3px] h-0 bg-mw-orange group-hover:h-full transition-all duration-1000 ease-out" />
                 
                 <div className="text-7xl md:text-9xl font-sans font-bold text-black/[0.03] absolute -top-8 -left-4 md:-top-12 md:-left-8 -z-10 group-hover:text-mw-orange/5 transition-colors duration-700 select-none">
                    0{i + 1}
                 </div>
                 
                 <h3 className="text-3xl md:text-5xl font-sans font-bold mb-4 tracking-tight group-hover:text-mw-orange transition-colors duration-500">{step.title}</h3>
                 <p className="text-xl md:text-2xl text-black/50 font-light leading-relaxed max-w-lg">{step.desc}</p>
               </motion.div>
             ))}
           </div>
        </div>

      </div>
    </FadeInSection>
  );
}

const FAQS = [
  {
    question: "How long does a typical website project take?",
    answer: "Our standard engagement for a premium, custom-architected website ranges from 6 to 10 weeks. This includes deep-dive strategy sessions, high-fidelity design iterations, full-stack development, and rigorous performance testing."
  },
  {
    question: "Do you offer ongoing support and maintenance?",
    answer: "Yes. We believe digital products are living assets. We offer comprehensive Growth & Maintenance retainers that cover security updates, performance optimization, content updates, and ongoing strategic consulting."
  },
  {
    question: "What platforms do you build on?",
    answer: "We are technology-agnostic but highly opinionated. We typically build custom solutions using React, Next.js, and Node.js for maximum performance, or leverage robust enterprise CMS platforms depending on your team's specific content management needs."
  },
  {
    question: "How do you measure the success of a project?",
    answer: "Success is defined during our initial strategy phase. We move beyond vanity metrics to focus on tangible business outcomes: increased conversion rates, lower customer acquisition costs, improved lead quality, and measurable revenue growth."
  }
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <FadeInSection className="py-32 lg:py-48 bg-[#02040a] relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.8, ease: EASE }}
              className="sticky top-32"
            >
              <div className="inline-flex items-center gap-3 mb-8">
                 <div className="w-1.5 h-1.5 rounded-full bg-mw-orange" />
                 <span className="text-[10px] font-sans tracking-[0.2em] uppercase font-bold text-white/40">Knowledge Base</span>
              </div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-sans font-bold tracking-tight text-white mb-6">
                Common<br/>Questions.
              </h2>
              <p className="text-xl text-white/50 font-light mb-12 max-w-md">
                Everything you need to know about partnering with Mindware to elevate your digital presence.
              </p>
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 text-mw-orange font-medium hover:text-orange-400 transition-colors pb-4 border-b border-mw-orange/30 hover:border-mw-orange/80 shrink-0"
              >
                <span className="uppercase tracking-[0.2em] text-xs font-bold">Have a different question?</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
          
          <div className="lg:col-span-7 flex flex-col gap-4">
            {FAQS.map((faq, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: EASE }}
                key={index}
                className="group border border-white/5 rounded-2xl bg-white/[0.02] overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                  className="w-full flex items-center justify-between p-6 md:p-10 text-left transition-colors hover:bg-white/[0.04]"
                >
                  <span className="text-xl md:text-2xl font-sans font-bold pr-8">{faq.question}</span>
                  <div className={cn(
                    "w-10 h-10 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300",
                    openIndex === index 
                      ? "border-mw-orange bg-mw-orange text-white rotate-45" 
                      : "border-white/10 text-white/40 group-hover:border-white/30 group-hover:text-white"
                  )}>
                    <Plus className="w-5 h-5" />
                  </div>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                    >
                      <div className="px-6 md:px-10 pb-10 text-lg text-white/50 font-light leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </FadeInSection>
  );
}

const TESTIMONIALS = [
  {
    id: 1,
    quote: "Mindware didn't just build our platform; they re-architected our entire digital acquisition engine. The ROI was visible within weeks.",
    author: "Sarah Jenkins",
    role: "CMO, TechFlow Solutions",
  },
  {
    id: 2,
    quote: "Their grasp of both brand aesthetics and technical performance is unmatched. They elevate everything they touch.",
    author: "Marcus Adebayo",
    role: "Founder, Zenith Retail",
  },
  {
    id: 3,
    quote: "A rare combination of strategic foresight and flawless execution. They are true partners in our growth journey.",
    author: "Elena Rodriguez",
    role: "VP Digital, OmniCorp",
  }
];

function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const paginate = (newDirection: number) => {
    setCurrentIndex((prev) => (prev + newDirection + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <FadeInSection className="py-32 bg-mw-dark relative overflow-hidden border-t border-white/5">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-mw-orange/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4">
              Trusted by Ambitious Brands
            </h2>
            <p className="text-xl text-white/60 max-w-2xl font-light">
              Don't just take our word for it. Here's what our partners say about the Mindware experience.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            className="flex items-center gap-4"
          >
            <button
              onClick={() => paginate(-1)}
              aria-label="Previous testimonial"
              className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 transition-all active:scale-95"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => paginate(1)}
              aria-label="Next testimonial"
              className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 transition-all active:scale-95"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        </div>

        <div className="relative min-h-[300px] md:min-h-[250px]">
          <Quote className="absolute -top-10 -left-6 md:-top-16 md:-left-12 w-24 h-24 md:w-40 md:h-40 text-white/5 z-0" />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="relative z-10 w-full"
            >
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-snug md:leading-tight text-white mb-10 max-w-5xl">
                "{TESTIMONIALS[currentIndex].quote}"
              </h3>
              
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-mw-orange/20 to-orange-600/20 border border-mw-orange/30 flex items-center justify-center text-mw-orange font-bold text-xl shadow-lg shadow-mw-orange/10">
                  {TESTIMONIALS[currentIndex].author.charAt(0)}
                </div>
                <div>
                  <div className="text-white font-bold text-lg">{TESTIMONIALS[currentIndex].author}</div>
                  <div className="text-white/60">{TESTIMONIALS[currentIndex].role}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Pagination Dots */}
        <div className="flex items-center gap-3 mt-12 md:mt-16" role="tablist">
          {TESTIMONIALS.map((_, index) => (
            <button
              key={index}
              role="tab"
              aria-selected={index === currentIndex}
              aria-label={`Go to testimonial ${index + 1}`}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-all duration-500 ease-out",
                index === currentIndex ? "bg-mw-orange w-10 shadow-[0_0_12px_rgba(249,115,22,0.5)]" : "bg-white/20 hover:bg-white/40"
              )}
            />
          ))}
        </div>
      </div>
    </FadeInSection>
  );
}

function CTASection() {
  return (
    <FadeInSection className="py-32 lg:py-48 relative overflow-hidden bg-mw-orange">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80')] mix-blend-multiply opacity-10 bg-cover bg-center" />
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-5xl mx-auto text-center text-mw-dark flex flex-col items-center">
          <div className="inline-flex items-center gap-3 mb-10">
             <div className="w-1.5 h-1.5 rounded-full bg-mw-dark" />
             <span className="text-[10px] font-sans tracking-[0.2em] uppercase font-bold text-mw-dark/60">Let's Talk</span>
          </div>
          <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-sans font-bold mb-8 md:mb-10 tracking-tight leading-tight md:leading-[0.9]">
            Your next customer is already online.
          </h2>
          <p className="text-xl md:text-2xl opacity-70 max-w-2xl mx-auto mb-16 font-medium tracking-tight">
            Let's build the digital experience that helps them find you, trust you, and choose you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              to="/contact"
              className="w-full sm:w-auto bg-mw-dark text-white px-12 py-6 rounded-full font-bold text-[10px] tracking-widest uppercase transition-transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
            >
              Start Your Project
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/message/xyz" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-white/20 hover:bg-white text-mw-dark px-12 py-6 rounded-full font-bold text-[10px] tracking-widest uppercase transition-all hover:scale-105 active:scale-95 backdrop-blur-sm"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </FadeInSection>
  );
}

export function Home() {
  return (
    <div className="bg-mw-dark">
      <SEO title="Mindware Consulting | Digital Growth Lab" description="Mindware Consulting empowers businesses with strategy and technology." />
      <Hero />
      <GrowthMetrics />
      <TrustedBy />
      <SelfSelection />
      <Ecosystem />
      <ServicesOverview />
      <LatestWork />
      <GrowthSystem />
      <FAQ />
      <Testimonials />
      <CTASection />
    </div>
  );
}

