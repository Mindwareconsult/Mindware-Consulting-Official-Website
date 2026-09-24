import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { 
  Check, 
  Minus, 
  ArrowRight, 
  Sparkles, 
  Info, 
  SlidersHorizontal,
  CheckCircle2,
  ChevronDown,
  Layers,
  Search
} from "lucide-react";
import { PRICING_TIERS, COMPARISON_MATRIX, MatrixRow } from "../data/pricing";

export function PricingComparisonTable() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [highlightDifferences, setHighlightDifferences] = useState<boolean>(false);
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [hoveredCol, setHoveredCol] = useState<number | null>(null);

  const categories = [
    { id: "all", label: "All Deliverables" },
    { id: "Web & Digital Presence", label: "Web & Digital" },
    { id: "Operations & Automation", label: "Operations & Automation" },
    { id: "Workforce & Compliance", label: "Workforce & Safety" },
    { id: "Support & Governance", label: "Support & Management" },
  ];

  // Grouped rows
  const groupedMatrix = useMemo(() => {
    // Filter by category and search
    const filtered = COMPARISON_MATRIX.filter((row) => {
      const matchesCategory = selectedCategory === "all" || row.category === selectedCategory;
      const query = searchFilter.trim().toLowerCase();
      const matchesSearch = !query || 
        row.feature.toLowerCase().includes(query) || 
        (row.tooltip && row.tooltip.toLowerCase().includes(query)) ||
        row.category.toLowerCase().includes(query);

      // Check if highlights differences: at least one tier is different from the others
      if (highlightDifferences) {
        const firstVal = JSON.stringify(row.tiers[0]);
        const hasDiff = row.tiers.some((val) => JSON.stringify(val) !== firstVal);
        if (!hasDiff) return false;
      }

      return matchesCategory && matchesSearch;
    });

    // Group by category in consistent order
    const groups: { category: string; rows: MatrixRow[] }[] = [];
    const categoryOrder = [
      "Web & Digital Presence",
      "Operations & Automation",
      "Workforce & Compliance",
      "Support & Governance"
    ];

    categoryOrder.forEach((cat) => {
      const rows = filtered.filter((r) => r.category === cat);
      if (rows.length > 0) {
        groups.push({ category: cat, rows });
      }
    });

    return groups;
  }, [selectedCategory, highlightDifferences, searchFilter]);

  return (
    <section className="py-24 border-t border-white/5 bg-[#02040a] relative overflow-hidden" id="comparison">
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-mw-orange/5 via-blue-500/5 to-transparent blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-mw-orange text-xs font-bold uppercase tracking-widest mb-6">
            <Layers className="w-3.5 h-3.5" />
            <span>Comprehensive Plan Breakdown</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 text-white leading-tight">
            Compare All Plans &amp; <span className="text-gradient">Features.</span>
          </h2>

          <p className="text-lg md:text-xl text-white/60 font-light leading-relaxed">
            See exactly how each of our 6 tiers scales in scope, infrastructure, automated workflows, and corporate workforce certifications.
          </p>
        </div>

        {/* Interactive Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 p-4 rounded-2xl bg-white/[0.02] border border-white/10">
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                  selectedCategory === cat.id
                    ? "bg-mw-orange text-white shadow-md shadow-mw-orange/20"
                    : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/5"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Quick Controls: Search & Highlight Differences */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <div className="relative flex-grow sm:flex-grow-0 sm:w-56">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Filter deliverables..."
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-mw-orange transition-colors"
              />
            </div>

            <button
              onClick={() => setHighlightDifferences(!highlightDifferences)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors shrink-0 ${
                highlightDifferences
                  ? "bg-mw-orange/15 border-mw-orange text-mw-orange"
                  : "bg-white/5 border-white/10 text-white/70 hover:text-white hover:bg-white/10"
              }`}
              title="Toggle to view only features that vary between packages"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Differences Only</span>
            </button>
          </div>
        </div>

        {/* Mobile Horizontal Scroll Hint */}
        <div className="lg:hidden flex items-center justify-between text-xs text-white/50 mb-3 px-2">
          <span>← Swipe horizontally to view all 6 packages →</span>
          <span className="font-mono text-mw-orange">6 Tiers</span>
        </div>

        {/* Responsive Table Wrapper */}
        <div className="rounded-3xl border border-white/10 bg-[#040814]/90 backdrop-blur-md overflow-hidden shadow-2xl relative">
          
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
            <table className="w-full text-left border-collapse min-w-[1020px]">
              
              {/* Header Row: Tier Info & Sticky Column */}
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.03]">
                  
                  {/* Sticky First Column for Deliverables */}
                  <th 
                    scope="col"
                    className="sticky left-0 z-30 py-6 px-6 bg-[#040814] w-[260px] min-w-[260px] border-r border-white/10 shadow-[4px_0_16px_rgba(0,0,0,0.4)]"
                  >
                    <div className="text-xs uppercase font-bold tracking-widest text-white/50 mb-1">
                      Deliverables Matrix
                    </div>
                    <div className="text-base font-bold text-white">
                      All 18 Specifications
                    </div>
                    <div className="text-xs text-white/40 font-light mt-1">
                      1-yr hosting &amp; domain in all plans
                    </div>
                  </th>

                  {/* 6 Plan Columns */}
                  {PRICING_TIERS.map((tier, idx) => {
                    const isPopular = tier.isPopular;
                    const isFlagship = tier.isFlagship;
                    const isHovered = hoveredCol === idx;

                    return (
                      <th
                        key={tier.id}
                        scope="col"
                        onMouseEnter={() => setHoveredCol(idx)}
                        onMouseLeave={() => setHoveredCol(null)}
                        className={`py-6 px-4 text-center align-top min-w-[130px] transition-colors relative ${
                          isPopular 
                            ? "bg-mw-orange/[0.08]" 
                            : isFlagship
                            ? "bg-amber-500/[0.05]"
                            : isHovered
                            ? "bg-white/[0.02]"
                            : ""
                        }`}
                      >
                        {/* Popular Badge */}
                        {isPopular && (
                          <div className="absolute -top-px left-1/2 -translate-x-1/2 bg-mw-orange text-white text-[9px] font-extrabold uppercase tracking-widest px-3 py-0.5 rounded-b-md shadow-md shadow-mw-orange/30">
                            Most Popular
                          </div>
                        )}
                        {isFlagship && (
                          <div className="absolute -top-px left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[9px] font-extrabold uppercase tracking-widest px-3 py-0.5 rounded-b-md shadow-md">
                            Flagship Suite
                          </div>
                        )}

                        <div className="pt-2">
                          <span className="block text-[11px] font-mono uppercase tracking-widest text-white/40 mb-1">
                            Tier {tier.tierNumber}
                          </span>
                          <span className="block text-sm font-bold text-white leading-tight min-h-[38px] flex items-center justify-center">
                            {tier.name}
                          </span>
                          <span className="block text-lg font-extrabold text-white mt-2">
                            {tier.price}
                          </span>

                          <div className="mt-4">
                            <Link
                              to={`/contact?package=${encodeURIComponent(tier.name)}&tier=${tier.id}`}
                              className={`w-full py-2 px-3 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all inline-flex items-center justify-center gap-1.5 ${
                                isPopular
                                  ? "bg-mw-orange hover:bg-orange-500 text-white shadow-md shadow-mw-orange/20"
                                  : isFlagship
                                  ? "bg-white hover:bg-amber-400 text-mw-dark shadow-md"
                                  : "bg-white/10 hover:bg-white hover:text-mw-dark text-white border border-white/10"
                              }`}
                            >
                              <span>Choose Plan</span>
                              <ArrowRight className="w-3 h-3" />
                            </Link>
                          </div>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>

              {/* Table Body Grouped by Category */}
              <tbody>
                {groupedMatrix.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-white/50 text-sm">
                      No deliverables match your search criteria.
                    </td>
                  </tr>
                ) : (
                  groupedMatrix.map((group) => (
                    <tr key={group.category} className="contents">
                      
                      {/* Category Header Row */}
                      <tr className="bg-white/[0.04] border-t border-b border-white/10">
                        <td 
                          colSpan={7}
                          className="sticky left-0 py-3 px-6 text-xs font-bold uppercase tracking-widest text-mw-orange bg-[#050b1b] z-20"
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-mw-orange" />
                            <span>{group.category}</span>
                            <span className="text-[10px] text-white/40 font-mono font-normal">
                              ({group.rows.length} {group.rows.length === 1 ? "item" : "items"})
                            </span>
                          </div>
                        </td>
                      </tr>

                      {/* Deliverables Rows */}
                      {group.rows.map((row, rIdx) => (
                        <tr
                          key={`${group.category}-${rIdx}`}
                          className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group"
                        >
                          {/* Sticky Feature Name Cell */}
                          <td 
                            scope="row"
                            className="sticky left-0 z-20 py-4 px-6 bg-[#040814] group-hover:bg-[#060c1d] border-r border-white/10 shadow-[4px_0_16px_rgba(0,0,0,0.35)] transition-colors"
                          >
                            <div className="text-sm font-medium text-white/90">
                              {row.feature}
                            </div>
                            {row.tooltip && (
                              <p className="text-[11px] text-white/40 font-light mt-0.5 leading-snug">
                                {row.tooltip}
                              </p>
                            )}
                          </td>

                          {/* 6 Tier Value Cells */}
                          {row.tiers.map((val, tIdx) => {
                            const isPopular = PRICING_TIERS[tIdx]?.isPopular;
                            const isFlagship = PRICING_TIERS[tIdx]?.isFlagship;
                            const isHovered = hoveredCol === tIdx;

                            return (
                              <td
                                key={tIdx}
                                onMouseEnter={() => setHoveredCol(tIdx)}
                                onMouseLeave={() => setHoveredCol(null)}
                                className={`py-4 px-3 text-center align-middle transition-colors ${
                                  isPopular
                                    ? "bg-mw-orange/[0.04]"
                                    : isFlagship
                                    ? "bg-amber-500/[0.03]"
                                    : isHovered
                                    ? "bg-white/[0.025]"
                                    : ""
                                }`}
                              >
                                {typeof val === "boolean" ? (
                                  val ? (
                                    <span 
                                      className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                                      title="Included in package"
                                    >
                                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                                    </span>
                                  ) : (
                                    <span 
                                      className="inline-flex items-center justify-center w-6 h-6 text-white/20"
                                      title="Not included in this tier"
                                    >
                                      <Minus className="w-4 h-4" />
                                    </span>
                                  )
                                ) : (
                                  <span className={`inline-block font-medium text-xs px-2.5 py-1 rounded-lg border leading-tight ${
                                    val === "Advanced" || val === "Full Enterprise Automations" || val.includes("PMP")
                                      ? "bg-white/10 text-white border-white/20 font-semibold"
                                      : "bg-white/[0.03] text-white/80 border-white/10"
                                  }`}>
                                    {val}
                                  </span>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}

                    </tr>
                  ))
                )}
              </tbody>

              {/* Bottom Footer Row with CTAs */}
              <tfoot>
                <tr className="border-t border-white/10 bg-white/[0.02]">
                  <td className="sticky left-0 z-20 py-6 px-6 bg-[#040814] border-r border-white/10 shadow-[4px_0_16px_rgba(0,0,0,0.4)]">
                    <span className="text-xs uppercase font-bold tracking-widest text-white/50 block mb-1">
                      Ready to Proceed?
                    </span>
                    <span className="text-sm font-bold text-white">
                      Book Your Consultation
                    </span>
                  </td>

                  {PRICING_TIERS.map((tier, idx) => {
                    const isPopular = tier.isPopular;
                    const isFlagship = tier.isFlagship;
                    const isHovered = hoveredCol === idx;

                    return (
                      <td
                        key={tier.id}
                        onMouseEnter={() => setHoveredCol(idx)}
                        onMouseLeave={() => setHoveredCol(null)}
                        className={`py-6 px-3 text-center align-middle ${
                          isPopular 
                            ? "bg-mw-orange/[0.08]" 
                            : isFlagship 
                            ? "bg-amber-500/[0.05]" 
                            : isHovered 
                            ? "bg-white/[0.02]" 
                            : ""
                        }`}
                      >
                        <div className="space-y-2">
                          <span className="block text-sm font-bold text-white">
                            {tier.price}
                          </span>
                          <Link
                            to={`/contact?package=${encodeURIComponent(tier.name)}&tier=${tier.id}`}
                            className={`w-full py-2 px-3 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all inline-flex items-center justify-center gap-1.5 ${
                              isPopular
                                ? "bg-mw-orange hover:bg-orange-500 text-white shadow-md shadow-mw-orange/20"
                                : isFlagship
                                ? "bg-white hover:bg-amber-400 text-mw-dark shadow-md"
                                : "bg-white/10 hover:bg-white hover:text-mw-dark text-white border border-white/10"
                            }`}
                          >
                            <span>Select</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              </tfoot>

            </table>
          </div>

        </div>

        {/* Footnote Notice */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50 px-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Need a custom combination of features? Our team builds bespoke commercial solutions.</span>
          </div>
          <Link 
            to="/contact" 
            className="text-mw-orange hover:text-orange-400 font-semibold underline underline-offset-4"
          >
            Request Custom Corporate Scope →
          </Link>
        </div>

      </div>
    </section>
  );
}
