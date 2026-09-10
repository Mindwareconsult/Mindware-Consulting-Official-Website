import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { ArrowRight, ArrowUpRight, BarChart3, Globe2, Lightbulb, ChevronLeft, ChevronRight, Quote, Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { SERVICES } from "../data/content";
import { cn, EASE } from "../lib/utils";
import { useRef, useState } from "react";

function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-[100vh] flex items-center pt-24 overflow-hidden bg-mw-dark">
      {/* Cinematic Background Elements */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-mw-orange/20 rounded-full blur-[120px] mix-blend-screen opacity-60 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[150px] mix-blend-screen opacity-50" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </motion.div>

      <div className="container relative z-10 mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE }}
          className="max-w-6xl"
        >
          <div className="inline-flex items-center gap-3 mb-8">
             <div className="w-2 h-2 rounded-full bg-mw-orange animate-pulse" />
             <span className="text-sm font-display tracking-widest uppercase text-white/60 font-semibold">Premium Digital Growth Partner</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[7.5rem] font-bold tracking-tighter mb-8 leading-[1.1] md:leading-[0.95] text-white">
            We Build Digital <br className="hidden md:block" />
            <span className="text-mw-orange">Experiences</span> That <br className="hidden md:block" />
            Grow Businesses.
          </h1>
          
          <p className="text-lg md:text-2xl text-white/60 mb-10 md:mb-12 max-w-2xl leading-relaxed font-light">
            Mindware Consulting helps businesses build stronger digital presence, attract the right audience, and turn online attention into measurable growth.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Link
              to="/contact"
              className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white text-mw-dark px-10 py-5 rounded-full font-medium transition-all hover:scale-105 active:scale-95 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
            >
              Start Your Project
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/services"
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 rounded-full font-medium text-white border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all"
            >
              Explore Our Services
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SelfSelection() {
  const navigate = useNavigate();
  const options = [
    { id: "01", label: "I Need A Website", desc: "High-performance digital platforms.", path: "/services/website-design" },
    { id: "02", label: "I Need More Customers", desc: "SEO & Growth marketing.", path: "/services/seo" },
    { id: "03", label: "I Need A Digital Strategy", desc: "Consulting & transformation.", path: "/services/consultancy" },
  ];

  return (
    <section className="py-32 lg:py-48 bg-mw-dark relative z-10 border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-16">
           <div className="lg:col-span-5">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">What can we <br/>help you achieve?</h2>
              <p className="text-xl text-white/50 max-w-md font-light">Select your primary business objective to discover how our integrated approach can accelerate your growth.</p>
           </div>
           
           <div className="lg:col-span-7 flex flex-col">
              {options.map((opt, i) => (
                <motion.div
                  key={opt.label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
                >
                  <Link 
                    to={opt.path}
                    className="group relative flex items-center justify-between py-10 border-b border-white/10 hover:border-mw-orange transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mw-orange focus-visible:ring-offset-8 focus-visible:ring-offset-mw-dark rounded-xl"
                  >
                    <div className="flex items-center gap-8 md:gap-16">
                       <span className="text-2xl md:text-3xl font-display text-white/20 font-bold group-hover:text-mw-orange transition-colors">{opt.id}</span>
                       <div>
                          <h3 className="text-2xl md:text-4xl font-bold tracking-tight mb-2 group-hover:text-white transition-colors text-white/90">{opt.label}</h3>
                          <p className="text-white/50 group-hover:text-white/80 transition-colors">{opt.desc}</p>
                       </div>
                    </div>
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-mw-orange group-hover:text-white transition-all duration-300 group-hover:scale-110 shrink-0">
                       <ArrowRight className="w-6 h-6 text-white/50 group-hover:text-white transition-colors" />
                    </div>
                  </Link>
                </motion.div>
              ))}
           </div>
        </div>
      </div>
    </section>
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
    <section className="py-32 lg:py-48 relative overflow-hidden bg-[#02040A]">
      <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
        <div className="max-w-4xl mx-auto mb-32">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-8 tracking-tighter">One Business.<br/>One Connected System.</h2>
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
                   <span className="font-display font-bold text-xl leading-tight text-white tracking-wide">YOUR<br/>BUSINESS</span>
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
                   viewport={{ once: true, margin: "-100px" }}
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
    </section>
  );
}

function ServicesOverview() {
  return (
    <section className="py-32 lg:py-48 bg-mw-dark border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24">
          <div className="max-w-3xl">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tighter">Capabilities</h2>
            <p className="text-2xl text-white/50 font-light">
              We design the digital systems businesses need to become visible, credible, and fundamentally easier to buy from.
            </p>
          </div>
          <Link to="/services" className="inline-flex items-center gap-3 text-mw-orange font-medium hover:text-orange-400 transition-colors pb-2">
            <span className="uppercase tracking-widest text-sm">View all capabilities</span> 
            <ArrowRight className="w-5 h-5" />
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
                  "group relative p-10 lg:p-12 rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent flex flex-col h-full overflow-hidden hover:border-mw-orange/50 transition-colors duration-500",
                  colSpan
                )}
              >
                <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0">
                  <ArrowUpRight className="w-8 h-8 text-mw-orange" />
                </div>
                
                <Icon className="w-10 h-10 text-mw-orange mb-8 group-hover:scale-110 transition-transform duration-500 origin-left" />
                
                <h3 className={cn("font-bold tracking-tight mb-4", i === 0 ? "text-4xl lg:text-5xl" : "text-3xl lg:text-4xl")}>
                  {service.title}
                </h3>
                
                <p className="text-white/60 mb-10 flex-grow text-lg font-light leading-relaxed max-w-xl">
                  {service.tagline}
                </p>
                
                <Link
                  to={`/services/${service.id}`}
                  className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest hover:text-mw-orange transition-colors mt-auto w-max"
                >
                  Explore <div className="w-8 h-[1px] bg-current" />
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
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
    <section className="py-32 lg:py-48 bg-white text-mw-dark relative">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
           {/* Sticky Header Side */}
           <div className="lg:col-span-5">
              <div className="sticky top-40">
                 <div className="inline-flex items-center gap-3 mb-6">
                   <div className="w-2 h-2 rounded-full bg-mw-orange" />
                   <span className="text-sm font-display tracking-widest uppercase font-bold text-black/40">The Framework</span>
                 </div>
                 <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tighter leading-[1.1]">The Mindware<br/>Growth System.</h2>
                 <p className="text-2xl text-black/60 font-light leading-relaxed max-w-md">
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
                 className="relative group border-l-2 border-black/10 pl-10 py-4 hover:border-mw-orange transition-colors duration-500"
               >
                 <div className="absolute top-0 -left-[3px] w-[4px] h-0 bg-mw-orange group-hover:h-full transition-all duration-700 ease-out" />
                 
                 <div className="text-6xl md:text-8xl font-display font-bold text-black/5 absolute -top-4 -left-2 md:-top-8 md:-left-12 -z-10 group-hover:text-mw-orange/10 transition-colors duration-500">
                    0{i + 1}
                 </div>
                 
                 <h3 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">{step.title}</h3>
                 <p className="text-xl text-black/60 font-light leading-relaxed max-w-lg">{step.desc}</p>
               </motion.div>
             ))}
           </div>
        </div>

      </div>
    </section>
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
    <section className="py-32 bg-[#02040a] relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: EASE }}
              className="sticky top-32"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-6">
                Common Questions
              </h2>
              <p className="text-xl text-white/60 font-light mb-8 max-w-md">
                Everything you need to know about partnering with Mindware to elevate your digital presence.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-mw-orange font-medium hover:text-orange-400 transition-colors"
              >
                Have a different question? Let's talk <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
          
          <div className="lg:col-span-7 flex flex-col gap-4">
            {FAQS.map((faq, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: EASE }}
                key={index}
                className="group border border-white/10 rounded-2xl bg-white/5 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left transition-colors hover:bg-white/[0.02]"
                >
                  <span className="text-xl md:text-2xl font-medium pr-8">{faq.question}</span>
                  <div className={cn(
                    "w-10 h-10 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300",
                    openIndex === index 
                      ? "border-mw-orange bg-mw-orange text-white rotate-45" 
                      : "border-white/20 text-white/60 group-hover:border-white/40 group-hover:text-white"
                  )}>
                    <Plus className="w-5 h-5" />
                  </div>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                    >
                      <div className="px-6 md:px-8 pb-8 text-lg text-white/60 font-light leading-relaxed">
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
    </section>
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
    <section className="py-32 bg-mw-dark relative overflow-hidden border-t border-white/5">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-mw-orange/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-4">
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
              className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 transition-all active:scale-95"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => paginate(1)}
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
        <div className="flex items-center gap-3 mt-12 md:mt-16">
          {TESTIMONIALS.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-all duration-500 ease-out",
                index === currentIndex ? "bg-mw-orange w-10 shadow-[0_0_12px_rgba(249,115,22,0.5)]" : "bg-white/20 hover:bg-white/40"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-32 lg:py-48 relative overflow-hidden bg-mw-orange">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80')] mix-blend-multiply opacity-20 bg-cover bg-center" />
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-5xl mx-auto text-center text-mw-dark">
          <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] font-bold mb-8 md:mb-10 tracking-tighter leading-tight md:leading-[0.9]">
            Your next customer is already online.
          </h2>
          <p className="text-2xl md:text-3xl opacity-80 max-w-3xl mx-auto mb-16 font-medium tracking-tight">
            Let's build the digital experience that helps them find you, trust you, and choose you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              to="/contact"
              className="w-full sm:w-auto bg-mw-dark text-white px-12 py-6 rounded-full font-bold text-lg transition-transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
            >
              Start Your Project
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="https://wa.me/message/xyz" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-white/20 hover:bg-white text-mw-dark px-12 py-6 rounded-full font-bold text-lg transition-all hover:scale-105 active:scale-95 backdrop-blur-sm"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Home() {
  return (
    <div className="bg-mw-dark">
      <Hero />
      <SelfSelection />
      <Ecosystem />
      <ServicesOverview />
      <GrowthSystem />
      <FAQ />
      <Testimonials />
      <CTASection />
    </div>
  );
}

