import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Compass,
  Sparkles,
  ShieldCheck,
  Users,
  Target,
  GraduationCap,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Eye,
  Rocket,
  Award,
  ChevronRight,
  Layers,
  HeartHandshake
} from "lucide-react";
import {
  MISSION_STATEMENT,
  VISION_STATEMENT,
  CORE_VALUES,
  GROWTH_PHILOSOPHY
} from "../data/aboutData";
import { SEO } from "../components/SEO";
import { EASE } from "../lib/utils";
import { AboutSubNav } from "../components/about/AboutSubNav";

const ICONS_MAP = {
  Compass,
  Sparkles,
  ShieldCheck,
  Users,
  Target,
  GraduationCap
};

export function MissionVisionValues() {
  const [activePhilosophyTab, setActivePhilosophyTab] = useState(0);
  const [selectedValueId, setSelectedValueId] = useState<string>(CORE_VALUES[0].id);

  const selectedValue = CORE_VALUES.find((v) => v.id === selectedValueId) || CORE_VALUES[0];
  const SelectedIcon = ICONS_MAP[selectedValue.iconName];

  return (
    <div className="bg-mw-dark min-h-screen text-white">
      <SEO
        title="Mission, Vision & Core Values | Mindware Consulting"
        description="Discover the core mission, long-term vision, foundational values, and growth philosophy driving Mindware Consulting Ltd across Nigeria and Africa."
      />

      {/* Top Breadcrumb & Back Bar */}
      <section className="pt-28 sm:pt-32 pb-4 sm:pb-6 border-b border-white/5 bg-[#03060f]">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs md:text-sm text-white/50 flex-wrap">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/30" />
            <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/30" />
            <span className="text-mw-orange font-medium">Mission, Vision & Values</span>
          </nav>

          <Link
            to="/about"
            className="inline-flex items-center gap-2 text-xs font-semibold text-white/70 hover:text-white bg-white/5 hover:bg-white/10 px-3.5 py-1.5 rounded-full border border-white/10 transition-all hover:-translate-x-0.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to About Overview</span>
          </Link>
        </div>
      </section>

      {/* Sticky About Sub-Navigation */}
      <AboutSubNav activeTab="mission" />

      {/* Hero Section */}
      <section className="pt-10 sm:pt-16 pb-14 sm:pb-20 md:py-24 relative overflow-hidden border-b border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-mw-orange/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mw-orange/10 border border-mw-orange/20 text-mw-orange text-xs font-semibold uppercase tracking-wider mb-4 sm:mb-6">
              <Compass className="w-3.5 h-3.5" />
              <span>Sub-Page 1 · Corporate Creed & Philosophy</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-display tracking-tight leading-[1.15] sm:leading-[1.1] mb-4 sm:mb-6">
              Our Mission, Vision <br className="hidden sm:inline" />
              & <span className="text-gradient">Core Philosophy.</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-3xl leading-relaxed mb-6 sm:mb-8">
              At Mindware Consulting Ltd, our foundational architecture is built on strategic clarity, world-class digital craft, and measurable commercial value. Here is the compass that guides every partnership, technology deployment, and workforce training program we lead.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-4 text-xs sm:text-sm text-white/60">
              <div className="flex items-center gap-2 bg-white/5 px-3 py-2 sm:py-1.5 rounded-lg border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Empowering 100+ Enterprise Brands</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 px-3 py-2 sm:py-1.5 rounded-lg border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-mw-orange shrink-0" />
                <span>African Talent Sovereignty</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 px-3 py-2 sm:py-1.5 rounded-lg border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>PMI & ISO Compliant Governance</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cinematic Studio Image Showcase */}
      <section className="py-8 sm:py-12 bg-[#02040a] border-b border-white/5">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 aspect-[16/10] sm:aspect-[16/8] md:aspect-[21/9] bg-white/5">
            <img
              src="/src/assets/images/mission_hero_vision_1790617197716.jpg"
              alt="Mindware Consulting strategic technology laboratory and consultants collaborating"
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] via-black/40 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 md:bottom-10 md:left-10 md:right-10 flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4">
              <div className="max-w-xl">
                <div className="text-xs uppercase tracking-widest text-mw-orange font-bold mb-1">Corporate Purpose</div>
                <h3 className="text-base sm:text-xl md:text-2xl font-bold text-white leading-snug">
                  "Technology without cognitive strategy is noise. Strategy without modern technology is theory."
                </h3>
              </div>
              <div className="text-xs text-white/60 shrink-0 font-mono">
                Mindware Consulting Operating Principle
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: The Mission */}
      <section className="py-12 sm:py-20 md:py-28 border-b border-white/5 relative">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mw-orange/10 border border-mw-orange/20 text-mw-orange text-xs font-semibold uppercase tracking-wider mb-3 sm:mb-4">
                <Target className="w-3.5 h-3.5" />
                <span>Our Mission</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4 sm:mb-6">
                Why Mindware Exists.
              </h2>
              <div className="space-y-4 text-base sm:text-lg text-white/70 leading-relaxed">
                <p className="text-white font-medium text-lg sm:text-xl leading-relaxed">
                  "{MISSION_STATEMENT.headline}"
                </p>
                <p className="text-sm sm:text-base">
                  {MISSION_STATEMENT.extended}
                </p>
              </div>

              <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/10 flex items-center gap-4">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-mw-orange/10 border border-mw-orange/20 flex items-center justify-center text-mw-orange shrink-0">
                  <Rocket className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Commercial Velocity Guarantee</div>
                  <div className="text-xs text-white/50">Every client deliverable is tied directly to pipeline growth and brand authority.</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                {MISSION_STATEMENT.pillars.map((pillar, idx) => (
                  <motion.div
                    key={pillar.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.6, ease: EASE }}
                    className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-mw-orange/30 transition-all duration-300 group"
                  >
                    <div className="text-xs font-mono text-mw-orange font-bold mb-2 sm:mb-3">
                      Pillar 0{idx + 1}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-mw-orange transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: The Vision */}
      <section className="py-12 sm:py-20 md:py-28 bg-[#02040a] border-b border-white/5 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
              <Eye className="w-3.5 h-3.5" />
              <span>Our Vision</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight mb-4 sm:mb-6">
              Where We Are Building Toward.
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/70 leading-relaxed">
              "{VISION_STATEMENT.headline}"
            </p>
            <p className="text-xs sm:text-sm md:text-base text-white/50 mt-4 max-w-2xl mx-auto">
              {VISION_STATEMENT.extended}
            </p>
          </div>

          {/* 3 Horizons Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 relative">
            {VISION_STATEMENT.horizons.map((h, i) => (
              <motion.div
                key={h.period}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/10 hover:border-blue-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-mono font-semibold text-blue-400 mb-2 sm:mb-3 uppercase tracking-wider">
                    {h.period}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">
                    {h.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                    {h.focus}
                  </p>
                </div>
                <div className="mt-6 sm:mt-8 pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-white/40">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  <span>Strategic Milestone Horizon 0{i + 1}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Core Values in Detail */}
      <section className="py-12 sm:py-20 md:py-28 border-b border-white/5">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-16">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3 sm:mb-4">
                <Award className="w-3.5 h-3.5" />
                <span>Our 6 Core Values</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight">
                Principles That Govern Our Work.
              </h2>
            </div>
            <p className="text-white/60 max-w-md text-xs sm:text-sm md:text-base">
              These are not slogans on a wall. They are concrete decision-making heuristics our engineers, consultants, and instructors adhere to daily.
            </p>
          </div>

          {/* Mobile Quick Value Tabs */}
          <div className="lg:hidden mb-4 overflow-x-auto pb-2 scrollbar-none touch-pan-x flex items-center gap-2">
            {CORE_VALUES.map((val) => {
              const VIcon = ICONS_MAP[val.iconName];
              const isSelected = selectedValueId === val.id;
              return (
                <button
                  key={`mobile-${val.id}`}
                  onClick={() => setSelectedValueId(val.id)}
                  className={`shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-semibold transition-all ${
                    isSelected
                      ? "bg-mw-orange text-white border-mw-orange shadow-md shadow-mw-orange/20"
                      : "bg-white/[0.03] text-white/70 border-white/10 hover:bg-white/[0.08]"
                  }`}
                >
                  <VIcon className="w-3.5 h-3.5 shrink-0" />
                  <span>{val.title}</span>
                </button>
              );
            })}
          </div>

          {/* Interactive Core Value Selector on Desktop + Grid */}
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Left list selector (desktop) */}
            <div className="hidden lg:block lg:col-span-5 space-y-2">
              {CORE_VALUES.map((val) => {
                const VIcon = ICONS_MAP[val.iconName];
                const isSelected = selectedValueId === val.id;
                return (
                  <button
                    key={val.id}
                    onClick={() => setSelectedValueId(val.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between group ${
                      isSelected
                        ? "bg-white/[0.08] border-mw-orange/50 shadow-lg shadow-mw-orange/5"
                        : "bg-white/[0.01] border-white/5 hover:bg-white/[0.04] hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          isSelected ? "bg-mw-orange text-white" : "bg-white/5 text-white/60 group-hover:text-white"
                        }`}
                      >
                        <VIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-mono text-white/40">{val.number}</div>
                        <div className="font-bold text-white text-base group-hover:text-mw-orange transition-colors">
                          {val.title}
                        </div>
                      </div>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        isSelected ? "text-mw-orange translate-x-1" : "text-white/20"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Right deep dive display card */}
            <div className="w-full lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedValue.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-[#090d16] border border-white/10 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-mw-orange/5 rounded-full blur-3xl pointer-events-none" />

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-mw-orange/10 border border-mw-orange/20 flex items-center justify-center text-mw-orange shrink-0">
                        <SelectedIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <div>
                        <span className="text-xs font-mono text-mw-orange font-bold">VALUE {selectedValue.number}</span>
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{selectedValue.title}</h3>
                      </div>
                    </div>
                    <span className="self-start sm:self-auto text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 font-mono">
                      {selectedValue.tagline}
                    </span>
                  </div>

                  <div className="space-y-4 sm:space-y-6">
                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-white/40 font-mono mb-2">Philosophical Foundation</h4>
                      <p className="text-sm sm:text-base md:text-lg text-white/80 leading-relaxed">
                        {selectedValue.description}
                      </p>
                    </div>

                    <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/5">
                      <h4 className="text-xs uppercase tracking-wider text-mw-orange font-mono mb-2 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        How This Manifests In Real Client Work:
                      </h4>
                      <p className="text-xs sm:text-sm md:text-base text-white/70 leading-relaxed">
                        {selectedValue.inAction}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: The Growth Philosophy Triad */}
      <section className="py-12 sm:py-20 md:py-28 bg-[#02040a] border-b border-white/5 relative">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <div className="max-w-3xl mb-8 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-4">
              <Layers className="w-3.5 h-3.5" />
              <span>Core Methodology</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight mb-4 sm:mb-6">
              The "Mind + Technology + Growth" Philosophy.
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-white/70 leading-relaxed">
              True digital success requires a synthesis of three core disciplines. We reject isolated marketing without engineering, and engineering without commercial strategy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
            {GROWTH_PHILOSOPHY.triad.map((pillar, idx) => (
              <div
                key={pillar.title}
                className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-mono text-mw-orange font-bold mb-2 uppercase">
                    Stage 0{idx + 1}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                    {pillar.title}
                  </h3>
                  <div className="text-xs text-white/40 mb-3 sm:mb-4 font-mono">{pillar.subtitle}</div>
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-4 sm:mb-6">
                    {pillar.desc}
                  </p>

                  <div className="space-y-2 pt-4 border-t border-white/5">
                    {pillar.points.map((pt) => (
                      <div key={pt} className="flex items-center gap-2 text-xs text-white/60">
                        <CheckCircle2 className="w-3.5 h-3.5 text-mw-orange shrink-0" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: The Client Partnership Pledge */}
      <section className="py-12 sm:py-20 md:py-24 border-b border-white/5">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <div className="p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-mw-orange/10 via-transparent to-blue-500/10 border border-white/10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 text-mw-orange text-xs font-bold uppercase tracking-wider mb-3 sm:mb-4">
                <HeartHandshake className="w-4 h-4" />
                <span>Our Partnership Pledge</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-4xl font-bold text-white mb-4 sm:mb-6 leading-snug">
                We measure our worth by the enduring success of our clients.
              </h3>
              <p className="text-white/70 text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8">
                Whether you are an established industrial corporation modernizing your digital presence, or an aspiring professional mastering high-income digital skills, we commit to absolute excellence, radical transparency, and measurable outcomes from day one.
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <Link
                  to="/about/leadership"
                  className="inline-flex items-center justify-center gap-2 bg-white text-mw-dark px-6 py-3.5 rounded-full font-semibold text-xs sm:text-sm hover:bg-mw-orange hover:text-white transition-all shadow-lg text-center"
                >
                  <span>Meet Our Leadership Team</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white px-6 py-3.5 rounded-full font-semibold text-xs sm:text-sm border border-white/10 transition-all text-center"
                >
                  <span>Initiate Discovery Call</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Sub-Page Navigation Deck */}
      <section className="py-10 sm:py-16 bg-[#03060f]">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 p-4 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 shrink-0">
                <Users className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <div className="text-xs text-white/40 uppercase tracking-wider font-mono">Next Sub-Page</div>
                <div className="text-base sm:text-lg font-bold text-white">Sub-Page 2: Leadership & Management</div>
              </div>
            </div>

            <Link
              to="/about/leadership"
              className="inline-flex items-center justify-between sm:justify-start w-full sm:w-auto gap-2 text-mw-orange hover:text-white font-semibold text-xs sm:text-sm transition-colors group pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5"
            >
              <span>Explore Executive Profiles & Governance</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
