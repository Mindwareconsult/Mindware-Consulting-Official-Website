import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowUpRight, GraduationCap, Clock, Calendar } from "lucide-react";
import { EASE } from "../lib/utils";

export function Training() {
  const programs = [
    {
      id: "web-design",
      title: "Web Design & WordPress",
      description: "Learn to build professional, responsive websites for businesses. Master UX principles, WordPress, and essential web technologies.",
      duration: "8 Weeks",
      level: "Beginner to Intermediate",
      category: "Design & Tech"
    },
    {
      id: "digital-marketing",
      title: "Digital Marketing & SEO",
      description: "Master the art of attracting and converting audiences online. Covers SEO, Social Media, Paid Ads, and Analytics.",
      duration: "10 Weeks",
      level: "All Levels",
      category: "Marketing"
    },
    {
      id: "ai-tools",
      title: "AI Tools for Business",
      description: "Practical application of AI tools to accelerate workflows, generate content, and improve business efficiency.",
      duration: "4 Weeks",
      level: "Beginner",
      category: "Innovation"
    }
  ];

  return (
    <div className="bg-mw-dark">
      {/* Hero */}
      <section className="pt-40 pb-24 border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-mw-orange/5 to-transparent blur-3xl mix-blend-screen" />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/10">
              <GraduationCap className="w-8 h-8 text-mw-orange" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter mb-6 md:mb-8 leading-tight">
              Learn digital skills <br />
              you can <span className="text-gradient">actually use.</span>
            </h1>
            <p className="text-xl text-white/60 max-w-2xl leading-relaxed">
              Practical, career-focused training programs designed to equip you with the skills needed in the modern digital economy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, i) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative p-8 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all flex flex-col h-full"
              >
                <div className="mb-6 inline-flex px-3 py-1 rounded-full bg-white/10 text-xs font-medium text-white/80">
                  {program.category}
                </div>
                <h2 className="text-2xl font-bold mb-4">{program.title}</h2>
                <p className="text-white/60 mb-8 flex-grow">{program.description}</p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-sm text-white/80">
                    <Clock className="w-4 h-4 text-mw-orange" />
                    <span>{program.duration}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-white/80">
                    <Calendar className="w-4 h-4 text-mw-orange" />
                    <span>{program.level}</span>
                  </div>
                </div>

                <Link
                  to="/contact" // Should go to specific training detail later
                  className="inline-flex items-center justify-between w-full p-4 rounded-xl border border-white/10 group-hover:border-mw-orange/50 transition-colors"
                >
                  <span className="font-medium">Join Next Cohort</span>
                  <ArrowUpRight className="w-5 h-5 text-mw-orange" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Prop */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: EASE }}
        className="py-32 bg-white/5"
      >
        <div className="container mx-auto px-6 md:px-12 text-center max-w-4xl">
          <h2 className="text-4xl font-bold mb-8">Not just theory. Real-world application.</h2>
          <p className="text-xl text-white/60 mb-12">
            Our training programs are led by active industry professionals. You won't just learn concepts; you'll build real projects, use industry-standard tools, and graduate ready to execute.
          </p>
          <Link
            to="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-mw-orange text-white px-8 py-4 rounded-full font-medium transition-transform hover:scale-105 active:scale-95"
          >
            Enquire About Corporate Training
          </Link>
        </div>
      </motion.section>
    </div>
  );
}
