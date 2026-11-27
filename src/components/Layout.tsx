import { ReactNode, useState, useEffect } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { GrowthSeasonHeader } from "./campaigns/GrowthSeasonHeader";
import { GrowthSeasonFooter } from "./campaigns/GrowthSeasonFooter";
import { useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll } from "motion/react";
import { ArrowUp, Calendar, MessageSquare, Phone } from "lucide-react";
import { COMPANY_INFO, CONVERSION_CTAS } from "../data/companyStats";
import {
  trackPageView,
  trackPhoneClick,
  trackPrimaryCtaClick,
  trackWhatsAppClick,
} from "../lib/analytics";

export function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { scrollYProgress } = useScroll();
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";
  const isCampaign2026Page = normalizedPath === "/business-growth-season-2026";

  useEffect(() => {
    window.scrollTo(0, 0);
    const frameId = requestAnimationFrame(() => {
      trackPageView(pathname, document.title);
    });
    return () => cancelAnimationFrame(frameId);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 600);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`min-h-screen flex flex-col bg-mw-dark text-mw-light font-sans selection:bg-mw-orange selection:text-white relative ${
        isCampaign2026Page ? "" : "pb-[68px] sm:pb-0"
      }`}
    >
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-mw-orange origin-left z-[100]"
        style={{ scaleX: scrollYProgress }}
      />
      {isCampaign2026Page ? <GrowthSeasonHeader /> : <Navbar />}
      <main className="flex-grow">{children}</main>
      {isCampaign2026Page ? <GrowthSeasonFooter /> : <Footer />}

      {/* Desktop & Tablet Floating Conversion Action */}
      <div
        className={`hidden sm:flex fixed right-6 md:right-8 z-50 flex-col items-end gap-3 pointer-events-none ${
          isCampaign2026Page
            ? "bottom-[88px] md:bottom-[96px]"
            : "bottom-6 md:bottom-8"
        }`}
      >
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              onClick={scrollToTop}
              className="w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-[#02040a]/85 border border-white/10 backdrop-blur-md text-white shadow-lg hover:bg-white/10 hover:-translate-y-1 transition-all active:scale-95 pointer-events-auto"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4 md:w-5 md:h-5" />
            </motion.button>
          )}
        </AnimatePresence>

        {!isCampaign2026Page && (
          <Link
            to={CONVERSION_CTAS.primaryPath}
            onClick={() =>
              trackPrimaryCtaClick("floating-desktop", CONVERSION_CTAS.primaryPath)
            }
            className="group flex items-center justify-center gap-2.5 bg-mw-orange text-white px-5 py-3.5 rounded-full font-bold text-xs md:text-sm shadow-[0_4px_24px_rgba(249,115,22,0.4)] hover:bg-orange-500 hover:shadow-[0_4px_32px_rgba(249,115,22,0.6)] hover:-translate-y-1 transition-all active:scale-95 pointer-events-auto"
            aria-label={CONVERSION_CTAS.primaryLabel}
          >
            <Calendar className="w-4 h-4 transition-transform group-hover:scale-110 shrink-0" />
            <span>{CONVERSION_CTAS.primaryLabel}</span>
          </Link>
        )}
      </div>

      {/* Compact Sticky Mobile Quick-Action Conversion Bar (hidden on campaign page to avoid competing with campaign WhatsApp CTA) */}
      {!isCampaign2026Page && (
        <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#02040a]/95 backdrop-blur-xl border-t border-white/10 px-3 py-2 flex items-center gap-2 shadow-[0_-8px_24px_rgba(0,0,0,0.65)]">
          <Link
            to={CONVERSION_CTAS.primaryPath}
            onClick={() =>
              trackPrimaryCtaClick("mobile-sticky-bar", CONVERSION_CTAS.primaryPath)
            }
            className="flex-1 min-h-[44px] inline-flex items-center justify-center gap-1.5 bg-mw-orange hover:bg-orange-500 text-white font-bold text-xs px-3 rounded-xl shadow-md active:scale-95 transition-all"
          >
            <Calendar className="w-4 h-4 shrink-0" />
            <span className="truncate">{CONVERSION_CTAS.primaryLabel}</span>
          </Link>

          <a
            href={`${COMPANY_INFO.whatsappUrl}?text=${encodeURIComponent(
              "Hello Mindware Consulting, I would like to discuss a Business Growth Review."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick("mobile-sticky-bar")}
            aria-label="WhatsApp Mindware Consulting"
            className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center gap-1.5 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30 font-semibold text-xs px-3 rounded-xl active:scale-95 transition-all shrink-0"
          >
            <MessageSquare className="w-4 h-4 shrink-0" />
            <span className="sr-only">WhatsApp</span>
          </a>

          <a
            href={`tel:${COMPANY_INFO.phoneTel}`}
            onClick={() => trackPhoneClick("mobile-sticky-bar")}
            aria-label={`Call ${COMPANY_INFO.phoneDisplay}`}
            className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center bg-white/10 border border-white/15 text-white hover:bg-white/20 rounded-xl active:scale-95 transition-all shrink-0"
          >
            <Phone className="w-4 h-4 shrink-0" />
          </a>
        </div>
      )}
    </div>
  );
}

