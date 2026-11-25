import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Compass, Layers } from "lucide-react";
import { SEO } from "../components/SEO";
import { CONVERSION_CTAS } from "../data/companyStats";

export function NotFound() {
  return (
    <div className="min-h-screen bg-[#02040a] text-white pt-32 sm:pt-40 pb-24 flex items-center justify-center px-6">
      <SEO
        title="Page Not Found | Mindware Consulting Ltd"
        description="The requested page could not be found on Mindware Consulting Ltd. Explore our business growth solutions, construction sector expertise, or request a Business Growth Review."
        noindex
      />
      <div className="max-w-xl w-full text-center space-y-6 p-8 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/10">
        <div className="w-16 h-16 rounded-2xl bg-mw-orange/15 border border-mw-orange/30 text-mw-orange flex items-center justify-center mx-auto">
          <Compass className="w-8 h-8" />
        </div>
        <div className="space-y-3">
          <div className="text-xs font-mono uppercase tracking-widest text-mw-orange">
            404 · Page Not Available
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-white">
            We Could Not Find That Page
          </h1>
          <p className="text-sm sm:text-base text-white/65 leading-relaxed">
            The URL you requested may have moved during our corporate restructuring or is no longer active. Explore our current solutions below or request a Business Growth Review.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-left">
          <Link
            to="/solutions"
            className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 transition-colors flex items-center justify-between gap-2"
          >
            <div>
              <div className="text-xs font-bold text-white">Solutions</div>
              <div className="text-[11px] text-white/50">3 Enterprise Growth Pillars</div>
            </div>
            <Layers className="w-4 h-4 text-mw-orange shrink-0" />
          </Link>
          <Link
            to="/industries/construction-civil-engineering"
            className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 transition-colors flex items-center justify-between gap-2"
          >
            <div>
              <div className="text-xs font-bold text-white">Construction Flagship</div>
              <div className="text-[11px] text-white/50">Civil &amp; Engineering Growth</div>
            </div>
            <ArrowRight className="w-4 h-4 text-mw-orange shrink-0" />
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to={CONVERSION_CTAS.primaryPath}
            className="w-full sm:w-auto min-h-[46px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-mw-orange hover:bg-orange-500 text-white text-xs font-bold uppercase tracking-wider transition-colors"
          >
            <span>{CONVERSION_CTAS.primaryLabel}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/"
            className="w-full sm:w-auto min-h-[46px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
