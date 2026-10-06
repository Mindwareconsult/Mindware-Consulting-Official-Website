import { ReactNode, useState, useEffect } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll } from "motion/react";
import { ArrowUp, Calendar } from "lucide-react";

export function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    window.scrollTo(0, 0);
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
    <div className="min-h-screen flex flex-col bg-mw-dark text-mw-light font-sans selection:bg-mw-orange selection:text-white relative">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-mw-orange origin-left z-[100]"
        style={{ scaleX: scrollYProgress }}
      />
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />

      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-50 flex flex-col items-end gap-3 sm:gap-4 pointer-events-none">
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              onClick={scrollToTop}
              className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-[#02040a]/80 border border-white/10 backdrop-blur-md text-white shadow-lg hover:bg-white/10 hover:-translate-y-1 transition-all active:scale-95 pointer-events-auto"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>
          )}
        </AnimatePresence>
        
        <Link
          to="/contact"
          className="group flex items-center justify-center gap-2.5 bg-mw-orange text-white p-3.5 sm:px-6 sm:py-3.5 rounded-full font-bold shadow-[0_4px_24px_rgba(249,115,22,0.4)] hover:bg-orange-500 hover:shadow-[0_4px_32px_rgba(249,115,22,0.6)] hover:-translate-y-1 transition-all active:scale-95 pointer-events-auto"
          aria-label="Book Consultation"
        >
          <Calendar className="w-5 h-5 transition-transform group-hover:scale-110 shrink-0" />
          <span className="hidden sm:inline">Book Consultation</span>
        </Link>
      </div>
    </div>
  );
}
