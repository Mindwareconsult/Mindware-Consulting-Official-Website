import { useParams, Link, Navigate } from "react-router-dom";
import { SERVICES } from "../data/content";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { EASE } from "../lib/utils";
import { FadeInSection } from "../components/FadeInSection";
import { SEO } from "../components/SEO";

export function ServiceDetail() {
  const { id } = useParams();
  const service = SERVICES.find(s => s.id === id);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const Icon = service.icon;

  return (
    <div className="bg-mw-dark">
      <SEO title={`${service.title} | Mindware Consulting`} description={service.tagline} />
      {/* Hero */}
      <FadeInSection className="pt-40 pb-24 border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-mw-orange/5 rounded-full blur-[100px] mix-blend-screen pointer-events-none" />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/10">
              <Icon className="w-8 h-8 text-mw-orange" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter mb-6 md:mb-8 leading-tight">
              {service.title}
            </h1>
            <p className="text-2xl font-medium text-mw-orange mb-6">
              {service.tagline}
            </p>
            <p className="text-xl text-white/60 max-w-2xl leading-relaxed mb-12">
              {service.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
               <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-white text-mw-dark px-8 py-4 rounded-full font-medium transition-transform hover:scale-105 active:scale-95"
              >
                Discuss Your Project <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </FadeInSection>

      {/* Details Section */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 0.8, ease: EASE }}
        className="py-24"
      >
        <div className="container mx-auto px-6 md:px-12">
           <div className="grid md:grid-cols-2 gap-12 md:gap-16">
              <div>
                 <h2 className="text-3xl font-bold mb-8">What this includes</h2>
                 <ul className="space-y-6">
                   {service.features.map(feature => (
                     <li key={feature} className="flex gap-4">
                       <CheckCircle2 className="w-6 h-6 text-mw-orange shrink-0" />
                       <div>
                         <h3 className="font-semibold text-lg mb-2">{feature}</h3>
                         <p className="text-white/60 text-sm">Strategic implementation of {feature.toLowerCase()} to ensure measurable growth and strong return on investment.</p>
                       </div>
                     </li>
                   ))}
                 </ul>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-3xl p-10 flex flex-col justify-center relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-12 opacity-5">
                    <Icon className="w-64 h-64" />
                 </div>
                 <div className="relative z-10">
                   <h3 className="text-2xl font-bold mb-4">Ready to elevate your {service.title.toLowerCase()}?</h3>
                   <p className="text-white/60 mb-8">
                     Let's turn your digital complexity into a clear, measurable growth strategy.
                   </p>
                   <Link
                      to="/contact"
                      className="inline-flex justify-center w-full sm:w-auto items-center gap-2 bg-mw-orange text-white px-8 py-4 rounded-full font-medium transition-transform hover:scale-105 active:scale-95"
                    >
                      Get Started Today
                    </Link>
                 </div>
              </div>
           </div>
        </div>
      </motion.section>
    </div>
  );
}
