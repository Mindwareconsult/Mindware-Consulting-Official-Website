import { Link, useLocation } from "react-router-dom";
import { NAVIGATION } from "../data/content";
import { cn } from "../lib/utils";
import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const isScrolled = scrolled && !mobileMenuOpen;

  return (
    <>
      <header
        className={cn(
          "fixed left-0 right-0 z-50 transition-all duration-500 flex justify-center pointer-events-none",
          isScrolled ? "top-4 px-4" : "top-0 px-0"
        )}
      >
        <div
          className={cn(
            "w-full transition-all duration-500 pointer-events-auto",
            isScrolled
              ? "max-w-5xl rounded-2xl bg-[#02040a]/70 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
              : "bg-transparent border-b border-transparent"
          )}
        >
          <div
            className={cn(
              "flex items-center justify-between transition-all duration-500 mx-auto",
              isScrolled ? "px-6 py-3" : "container px-6 md:px-12 py-6"
            )}
          >
            <Link to="/" className="relative z-50 flex items-center group transition-opacity hover:opacity-80">
              <img src="/logo.png" alt="Mindware Consulting" className="h-8 md:h-9 w-auto object-contain" />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAVIGATION.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "text-sm font-medium tracking-wide transition-colors hover:text-white relative",
                    location.pathname === item.path
                      ? "text-white after:absolute after:-bottom-1.5 after:left-0 after:right-0 after:h-[2px] after:bg-mw-orange after:rounded-full"
                      : "text-white/60"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-4">
              <Link
                to="/contact"
                className="group flex items-center gap-2 bg-white text-mw-dark px-6 py-2.5 rounded-full text-sm font-medium transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-white/10"
              >
                Get Started
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              className="lg:hidden relative z-50 p-2 text-white/80 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mw-orange rounded-md"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(16px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#02040a]/95 flex flex-col pt-32 px-6 pb-6"
          >
            <nav className="flex flex-col gap-6 text-2xl font-display font-medium">
              {NAVIGATION.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "transition-colors flex items-center justify-between group py-2 border-b border-white/5",
                    location.pathname === item.path
                      ? "text-mw-orange"
                      : "text-white hover:text-white/80"
                  )}
                >
                  {item.name}
                  <ArrowRight className={cn(
                    "w-5 h-5 transition-transform opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0",
                    location.pathname === item.path ? "opacity-100 translate-x-0" : ""
                  )} />
                </Link>
              ))}
            </nav>
            <div className="mt-auto pb-8">
              <Link
                to="/contact"
                className="flex items-center justify-center gap-2 bg-mw-orange text-white w-full py-4 rounded-xl text-lg font-bold shadow-lg shadow-mw-orange/20"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
