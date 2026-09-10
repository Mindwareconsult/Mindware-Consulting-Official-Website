import { Link } from "react-router-dom";
import { NAVIGATION, SERVICES } from "../data/content";
import { ArrowRight, Mail } from "lucide-react";
import { useState } from "react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-[#02040a] border-t border-white/5 pt-24 pb-12">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="flex items-center group transition-opacity hover:opacity-80">
              <img src="/footer-logo.png" alt="Mindware Consulting Corporate" className="h-8 w-auto object-contain" />
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Your digital growth partner. We build digital experiences that grow businesses in Nigeria and globally.
            </p>
            
            <div className="pt-4">
              <h4 className="text-white font-medium mb-4 text-sm uppercase tracking-widest">Digital Insights</h4>
              <p className="text-white/60 text-sm mb-4 max-w-xs">
                Get our latest strategies on digital acquisition and branding delivered to your inbox.
              </p>
              <form onSubmit={handleSubscribe} className="relative max-w-sm">
                <div className="relative flex items-center">
                  <Mail className="absolute left-4 w-4 h-4 text-white/40" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-11 pr-32 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-mw-orange focus:ring-1 focus:ring-mw-orange transition-all"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 bottom-1.5 bg-white text-mw-dark font-medium text-sm px-4 rounded-full hover:bg-mw-orange hover:text-white transition-colors flex items-center gap-2"
                  >
                    {subscribed ? "Added" : "Subscribe"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="lg:col-span-2 lg:col-start-7">
            <h4 className="text-white font-medium mb-6">Services</h4>
            <ul className="space-y-4 text-sm text-white/60">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <Link to={`/services/${s.id}`} className="hover:text-white transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-white font-medium mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-white/60">
              {NAVIGATION.slice(1).map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-white font-medium mb-6">Contact</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li>
                <a href="mailto:hello@mindwareconsult.com.ng" className="hover:text-white transition-colors">
                  hello@mindwareconsult.com.ng
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Chat on WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 text-sm text-white/40">
          <p>© {new Date().getFullYear()} Mindware Consulting Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
