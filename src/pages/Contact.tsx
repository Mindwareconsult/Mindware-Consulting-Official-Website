import { motion } from "motion/react";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import React, { useState } from "react";
import { SERVICES } from "../data/content";
import { EASE } from "../lib/utils";
import { FadeInSection } from "../components/FadeInSection";

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <div className="bg-mw-dark">
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
              Let's Build Your Next <br />
              <span className="text-gradient">Digital Advantage.</span>
            </h1>
            <p className="text-xl text-white/60 max-w-2xl leading-relaxed">
              Tell us what you're building. Not sure what you need? We'll help you figure it out.
            </p>
          </motion.div>
        </div>
      </FadeInSection>

      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 0.8, ease: EASE }}
        className="py-24"
      >
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
            
            {/* Contact Form */}
            <div>
              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/5 border border-white/10 rounded-3xl p-12 text-center"
                >
                  <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold mb-4">Request Received</h3>
                  <p className="text-white/60 mb-8">
                    Thank you for reaching out. A digital growth strategist will be in touch with you shortly.
                  </p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="text-mw-orange font-medium hover:text-orange-400 transition-colors"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="fullName" className="text-sm font-medium text-white/80">Full Name</label>
                      <input id="fullName" name="fullName" required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-mw-orange focus:bg-white/10 transition-colors" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="businessName" className="text-sm font-medium text-white/80">Business Name</label>
                      <input id="businessName" name="businessName" type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-mw-orange focus:bg-white/10 transition-colors" placeholder="Company Ltd" />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="emailAddress" className="text-sm font-medium text-white/80">Email Address</label>
                      <input id="emailAddress" name="emailAddress" required type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-mw-orange focus:bg-white/10 transition-colors" placeholder="john@example.com" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phoneNumber" className="text-sm font-medium text-white/80">Phone / WhatsApp</label>
                      <input id="phoneNumber" name="phoneNumber" type="tel" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-mw-orange focus:bg-white/10 transition-colors" placeholder="+234..." />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="serviceNeeded" className="text-sm font-medium text-white/80">Service Needed</label>
                    <select id="serviceNeeded" name="serviceNeeded" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-mw-orange focus:bg-white/10 transition-colors appearance-none text-white/80" defaultValue="">
                      <option value="" disabled>Select a service...</option>
                      {SERVICES.map(s => (
                        <option key={s.id} value={s.id} className="bg-mw-dark">{s.title}</option>
                      ))}
                      <option value="other" className="bg-mw-dark">Not sure yet / Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="projectDesc" className="text-sm font-medium text-white/80">Project Description</label>
                    <textarea id="projectDesc" name="projectDesc" required rows={5} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-mw-orange focus:bg-white/10 transition-colors resize-none" placeholder="Tell us about your goals..." />
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-white text-mw-dark px-8 py-5 rounded-full font-bold uppercase tracking-widest text-[10px] transition-transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-[0_0_30px_-10px_rgba(255,255,255,0.3)]"
                  >
                    {isSubmitting ? "SENDING..." : "SEND PROJECT ENQUIRY"}
                    {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="lg:pl-12">
              <h3 className="text-3xl font-bold mb-8">Direct Contact</h3>
              
              <div className="space-y-8 mb-12">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-mw-orange" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">Email Us</h4>
                    <a href="mailto:contact@mindwareconsult.com.ng" className="text-white/60 hover:text-white transition-colors">contact@mindwareconsult.com.ng</a>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-mw-orange" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">Call / WhatsApp</h4>
                    <a href="https://wa.me/2348125082354" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">+234 812 508 2354</a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-mw-orange" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">Location</h4>
                    <p className="text-white/60">Nigeria</p>
                  </div>
                </div>
              </div>

              <div className="bg-mw-orange/10 border border-mw-orange/20 rounded-3xl p-8">
                <h4 className="text-xl font-bold mb-4 text-mw-orange">Need a quick response?</h4>
                <p className="text-white/80 mb-6">
                  Message us directly on WhatsApp for faster communication regarding your project.
                </p>
                <a
                  href="https://wa.me/2348125082354"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-mw-orange text-white px-6 py-3 rounded-full font-medium transition-transform hover:scale-105 active:scale-95"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>

          </div>
        </div>
      </motion.section>
    </div>
  );
}
