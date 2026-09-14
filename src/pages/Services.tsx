import { motion } from "motion/react";
import { SERVICES } from "../data/content";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn, EASE } from "../lib/utils";
import { FadeInSection } from "../components/FadeInSection";
import { SEO } from "../components/SEO";

export function Services() {
  return (
    <div className="bg-mw-dark">
      <SEO title="Our Services | Mindware Consulting" description="Explore the digital growth services we offer." />
      {/* Hero */}
      <FadeInSection className="pt-40 pb-24 border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-mw-orange/5 to-transparent blur-3xl mix-blend-screen" />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter mb-6 md:mb-8 leading-tight">
              Technology That <br />
              Works For <span className="text-gradient">People.</span>
            </h1>
            <p className="text-xl text-white/60 max-w-2xl leading-relaxed">
              We design the digital systems businesses need to become visible, credible and easier to buy from. Explore our core capabilities.
            </p>
          </motion.div>
        </div>
      </FadeInSection>

      {/* Services List */}
      <FadeInSection className="py-24">
        <h2 className="sr-only">Our Core Capabilities</h2>
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16 lg:gap-y-24">
            {SERVICES.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: (i % 2) * 0.1, ease: EASE }}
                  className="group relative"
                >
                  <div className="mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-mw-orange/20 transition-colors duration-500 border border-white/10 group-hover:border-mw-orange/30 group-hover:scale-105">
                      <Icon className="w-8 h-8 text-white group-hover:text-mw-orange transition-colors" />
                    </div>
                    <h3 className="text-3xl font-bold mb-4 tracking-tight">{service.title}</h3>
                    <p className="text-xl font-medium text-mw-orange mb-4">{service.tagline}</p>
                    <p className="text-white/60 leading-relaxed mb-8 max-w-md">
                      {service.description}
                    </p>
                    <ul className="space-y-3 mb-8">
                      {service.features.map(feature => (
                        <li key={feature} className="flex items-center gap-3 text-sm text-white/80">
                          <div className="w-1.5 h-1.5 rounded-full bg-mw-orange" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    to={`/services/${service.id}`}
                    className="inline-flex items-center gap-2 text-sm font-medium border border-white/20 rounded-full px-6 py-2.5 hover:bg-white hover:text-mw-dark transition-all group-hover:border-transparent"
                  >
                    View Capability <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </FadeInSection>
    </div>
  );
}
