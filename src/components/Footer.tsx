import { Link } from "react-router-dom";
import { SERVICES } from "../data/content";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Linkedin, 
  Facebook, 
  Youtube, 
  Instagram, 
  Twitter, 
  ArrowRight,
  CheckCircle2,
  Layers
} from "lucide-react";
import React, { useState } from "react";

const PARENT_NAVIGATION = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Pricing Packages", path: "/pricing" },
  { name: "Portfolio & Works", path: "/portfolio" },
  { name: "Academy", path: "/training" },
  { name: "Service Areas (36 States & FCT)", path: "/service-areas" },
  { name: "Industries We Serve", path: "/industries" },
  { name: "Careers & Talent Hub", path: "/careers" },
  { name: "Insights & Research", path: "/insights" },
  { name: "Contact Us", path: "/contact" }
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-[#02040a] border-t border-white/10 pt-20 pb-12 relative overflow-hidden text-white">
      {/* Subtle background ambient light */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-mw-orange/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-16 border-b border-white/10">
          
          {/* Column 1: Brand Info & Newsletter (spans 4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="inline-block transition-opacity hover:opacity-85">
              <img 
                src="/footer-logo.png" 
                alt="Mindware Consulting Ltd" 
                className="h-8 md:h-9 w-auto object-contain" 
              />
            </Link>

            <p className="text-white/60 text-sm leading-relaxed max-w-sm">
              Your premier digital transformation and growth partner. We engineer high-converting digital platforms, technical SEO dominance, custom software systems, and certified professional training across Nigeria and globally.
            </p>

            {/* Newsletter Subscription Box */}
            <div className="pt-2">
              <div className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                Digital Insights Newsletter
              </div>
              <p className="text-xs text-white/40 mb-3">
                Subscribe for proprietary growth playbooks, SEO strategies, and tech industry updates.
              </p>

              <form onSubmit={handleSubscribe} className="relative max-w-md">
                <div className="relative flex items-center">
                  <Mail className="absolute left-3.5 w-4 h-4 text-white/40" />
                  <input
                    type="email"
                    name="newsletter-email"
                    aria-label="Email address for corporate newsletter"
                    placeholder="Enter corporate email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-10 pr-28 text-xs md:text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-mw-orange focus:ring-1 focus:ring-mw-orange transition-all"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 bg-white text-mw-dark font-bold text-xs px-4 rounded-full hover:bg-mw-orange hover:text-white transition-all shadow-sm"
                  >
                    {subscribed ? "Subscribed" : "Subscribe"}
                  </button>
                </div>
                {subscribed && (
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 mt-2 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Thank you for subscribing to Mindware Insights!</span>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Column 2: Parent Navigation (spans 3 cols) */}
          <div className="lg:col-span-3 lg:pl-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/50 mb-5 flex items-center gap-2">
              <span>Navigation</span>
              <span className="w-8 h-[1px] bg-white/10" />
            </h4>
            <ul className="space-y-3 text-sm">
              {PARENT_NAVIGATION.map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.path} 
                    className="text-white/70 hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all duration-200"
                  >
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Core Services (spans 2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/50 mb-5 flex items-center gap-2">
              <span>Services</span>
              <span className="w-8 h-[1px] bg-white/10" />
            </h4>
            <ul className="space-y-3 text-sm">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <Link 
                    to={`/services/${s.id}`} 
                    className="text-white/70 hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all duration-200 truncate max-w-full"
                  >
                    <span className="truncate">{s.title}</span>
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  to="/services"
                  className="text-xs font-semibold text-mw-orange hover:text-orange-400 inline-flex items-center gap-1 transition-colors"
                >
                  <span>All Capabilities</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Office (spans 3 cols) */}
          <div className="lg:col-span-3 lg:pl-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/50 mb-5 flex items-center gap-2">
              <span>Contact & Office</span>
              <span className="w-8 h-[1px] bg-white/10" />
            </h4>

            <div className="space-y-3.5 text-xs md:text-sm text-white/70">
              {/* Email */}
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-mw-orange shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] text-white/40 uppercase tracking-wider font-semibold">Corporate Email</div>
                  <a 
                    href="mailto:contact@mindwareconsult.com.ng" 
                    className="hover:text-white hover:underline transition-colors break-all"
                  >
                    contact@mindwareconsult.com.ng
                  </a>
                </div>
              </div>

              {/* Phone / WhatsApp */}
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] text-white/40 uppercase tracking-wider font-semibold">Direct Phone / WhatsApp</div>
                  <a 
                    href="https://wa.me/2348125082354" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-white hover:underline transition-colors"
                  >
                    +234 812 508 2354
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] text-white/40 uppercase tracking-wider font-semibold">Headquarters</div>
                  <p className="text-white/70 leading-snug">
                    Nigeria • Serving Pan-African & Global Clients
                  </p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] text-white/40 uppercase tracking-wider font-semibold">Office Hours</div>
                  <p className="text-white/70 leading-snug">
                    Monday – Saturday: 8:00 AM – 6:00 PM (WAT)
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Action Consultation Button */}
            <div className="pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white text-white hover:text-mw-dark border border-white/10 hover:border-white text-xs font-bold uppercase tracking-wider transition-all duration-300"
              >
                <span>Schedule Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>

        {/* Specialized Focus Industries Section */}
        <div className="pt-10 pb-6 border-t border-white/5 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>Specialized Commercial Industries We Empower</span>
            </span>
            <Link
              to="/industries"
              className="text-xs text-white/70 hover:text-white flex items-center gap-1 font-semibold transition-colors"
            >
              <span>View All 6 Focus Industry Solutions</span>
              <ArrowRight className="w-3 h-3 text-blue-400" />
            </Link>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-white/60">
            <Link to="/industries/oil-and-gas-marine" className="hover:text-mw-orange transition-colors">
              Oil & Gas, Offshore Marine & Energy
            </Link>
            <span>•</span>
            <Link to="/industries/construction-civil-engineering" className="hover:text-mw-orange transition-colors">
              Civil Engineering & Construction
            </Link>
            <span>•</span>
            <Link to="/industries/real-estate-property-development" className="hover:text-mw-orange transition-colors">
              Real Estate & Property Development
            </Link>
            <span>•</span>
            <Link to="/industries/automotive-car-dealerships" className="hover:text-mw-orange transition-colors">
              Automotive & Car Dealerships
            </Link>
            <span>•</span>
            <Link to="/industries/ecommerce-retail" className="hover:text-mw-orange transition-colors">
              E-Commerce & Online Retail
            </Link>
            <span>•</span>
            <Link to="/industries/interior-finishing-craftsmanship" className="hover:text-mw-orange transition-colors">
              Interior Finishing & Architectural Fit-Out
            </Link>
          </div>
        </div>

        {/* Nationwide Local SEO Coverage Section */}
        <div className="pt-10 pb-8 border-t border-white/5 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-mw-orange flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              <span>Nationwide Service Areas (36 States & FCT Abuja)</span>
            </span>
            <Link
              to="/service-areas"
              className="text-xs text-white/70 hover:text-white flex items-center gap-1 font-semibold transition-colors"
            >
              <span>View All 37 State Portals & Maps</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-xs text-white/50">
            <Link to="/service-areas/lagos" className="hover:text-white transition-colors">Lagos (Ikeja, VI, Lekki)</Link>
            <span>•</span>
            <Link to="/service-areas/abuja-fct" className="hover:text-white transition-colors">Abuja FCT (CBD, Maitama)</Link>
            <span>•</span>
            <Link to="/service-areas/rivers" className="hover:text-white transition-colors">Rivers (Port Harcourt)</Link>
            <span>•</span>
            <Link to="/service-areas/kano" className="hover:text-white transition-colors">Kano (Bompai, Dawanau)</Link>
            <span>•</span>
            <Link to="/service-areas/oyo" className="hover:text-white transition-colors">Oyo (Ibadan)</Link>
            <span>•</span>
            <Link to="/service-areas/ogun" className="hover:text-white transition-colors">Ogun (Abeokuta, Ota)</Link>
            <span>•</span>
            <Link to="/service-areas/anambra" className="hover:text-white transition-colors">Anambra (Onitsha, Nnewi)</Link>
            <span>•</span>
            <Link to="/service-areas/delta" className="hover:text-white transition-colors">Delta (Warri, Asaba)</Link>
            <span>•</span>
            <Link to="/service-areas/enugu" className="hover:text-white transition-colors">Enugu</Link>
            <span>•</span>
            <Link to="/service-areas/akwa-ibom" className="hover:text-white transition-colors">Akwa Ibom (Uyo, Eket)</Link>
            <span>•</span>
            <Link to="/service-areas/edo" className="hover:text-white transition-colors">Edo (Benin City)</Link>
            <span>•</span>
            <Link to="/service-areas/kaduna" className="hover:text-white transition-colors">Kaduna (Zaria)</Link>
            <span>•</span>
            <Link to="/service-areas/plateau" className="hover:text-white transition-colors">Plateau (Jos)</Link>
            <span>•</span>
            <Link to="/service-areas/abia" className="hover:text-white transition-colors">Abia (Aba, Umuahia)</Link>
            <span>•</span>
            <Link to="/service-areas/imo" className="hover:text-white transition-colors">Imo (Owerri)</Link>
            <span>•</span>
            <Link to="/service-areas/kwara" className="hover:text-white transition-colors">Kwara (Ilorin)</Link>
            <span>•</span>
            <Link to="/service-areas/benue" className="hover:text-white transition-colors">Benue (Makurdi)</Link>
            <span>•</span>
            <Link to="/service-areas/cross-river" className="hover:text-white transition-colors">Cross River (Calabar)</Link>
            <span>•</span>
            <Link to="/service-areas" className="text-mw-orange hover:underline font-bold">+ 19 More States</Link>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Socials, Legal */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-white/50 gap-6 md:gap-0">
          
          {/* Copyright */}
          <div className="text-center md:text-left">
            <p>© {new Date().getFullYear()} Mindware Consulting Ltd. All rights reserved.</p>
            <p className="text-[11px] text-white/30 mt-0.5">Enterprise Digital Strategy • Custom Engineering • Certified Workforce Academy</p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a 
              href="https://www.linkedin.com/company/100696775/admin/page-posts/published/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white hover:text-mw-dark text-white/70 flex items-center justify-center transition-all"
              aria-label="Mindware on LinkedIn"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>
            <a 
              href="https://web.facebook.com/mindwareconsultingltd/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white hover:text-mw-dark text-white/70 flex items-center justify-center transition-all"
              aria-label="Mindware on Facebook"
            >
              <Facebook className="w-3.5 h-3.5" />
            </a>
            <a 
              href="https://twitter.com/mindwareconsult" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white hover:text-mw-dark text-white/70 flex items-center justify-center transition-all"
              aria-label="Mindware on X (Twitter)"
            >
              <Twitter className="w-3.5 h-3.5" />
            </a>
            <a 
              href="https://www.instagram.com/chikeonyekachukwu" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white hover:text-mw-dark text-white/70 flex items-center justify-center transition-all"
              aria-label="Mindware on Instagram"
            >
              <Instagram className="w-3.5 h-3.5" />
            </a>
            <a 
              href="https://www.youtube.com/mindwareconsultingltd" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white hover:text-mw-dark text-white/70 flex items-center justify-center transition-all"
              aria-label="Mindware on YouTube"
            >
              <Youtube className="w-3.5 h-3.5" />
            </a>
            <a 
              href="https://www.google.com/search?q=Mindware+Consulting+Ltd&stick=H4sIAAAAAAAA_-NgU1I1qDA0MDFJtTS2MLBMNTNKSk6zMqhINEsysjAyMjFMS0lMtkg1X8Qq7puZl1KeWJSq4JyfV1yaU5KZl67gU5ICALWmAE9DAAAA&hl=en&mat=CdZoZHhpsRv_ElcBa0lj__MndSaQbJwWpEz2_Wq3R8Sa6fOrq35cYkYMqwd7H60xu_ap2_6N6qEUuzALZ1VcZfQYOgAv4xDo81WRFryNzigqmZnOjbHxOG8xXdfDQfyxwZw&authuser=0" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white hover:text-mw-dark text-white/70 flex items-center justify-center transition-all"
              aria-label="Mindware on Google Business"
            >
              <MapPin className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Legal / Policy Links */}
          <div className="flex items-center gap-5 text-white/40">
            <Link to="/contact" className="hover:text-white transition-colors">
              Client Support
            </Link>
            <span>•</span>
            <Link to="/pricing" className="hover:text-white transition-colors">
              Service Terms
            </Link>
          </div>

        </div>

      </div>
    </footer>
  );
}
