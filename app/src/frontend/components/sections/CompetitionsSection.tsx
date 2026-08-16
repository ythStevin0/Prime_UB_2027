"use client";

import { motion } from "framer-motion";
import { Briefcase, Globe, FlaskConical } from "lucide-react";

const competitions = [
  {
    id: "comp-1",
    title: "Business Case",
    description: "Pecahkan studi kasus nyata dari industri energi dan presentasikan solusi strategis terbaikmu kepada panel ahli.",
    icon: <Briefcase className="w-16 h-16 md:w-24 md:h-24" />,
    color: "from-[#1e466b] to-blue-600",
    bentoClass: "md:col-span-2 md:row-span-2 min-h-100", // Large featured card
  },
  {
    id: "comp-2",
    title: "Geothermal Case Study",
    description: "Analisis potensi pengembangan energi panas bumi.",
    icon: <Globe className="w-12 h-12 md:w-16 md:h-16" />,
    color: "from-blue-600 to-[#67baf4]",
    bentoClass: "md:col-span-1 min-h-60", // Smaller top-right
  },
  {
    id: "comp-3",
    title: "Smart Innovation",
    description: "Rancang inovasi teknologi tepat guna yang berkelanjutan.",
    icon: <FlaskConical className="w-12 h-12 md:w-16 md:h-16" />,
    color: "from-[#67baf4] to-cyan-400",
    bentoClass: "md:col-span-1 min-h-60", // Smaller bottom-right
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6 },
  }),
};

export default function CompetitionsSection() {
  return (
    <section id="competitions" className="relative py-20 md:py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          custom={0}
        >
          <p className="text-sm md:text-base font-semibold uppercase tracking-[0.2em] mb-4 text-blue-400 drop-shadow-md">
            Our Competitions
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Discover Exciting <span className="text-gradient">Challenges</span>
          </h2>
          <p className="text-base md:text-lg max-w-3xl mx-auto text-gray-400">
            Unlock your potential and take on new challenges with our diverse range of competitions. Dive into exciting
            opportunities designed to inspire, test your skills, and pave the way for your future success!
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 md:gap-8">
          {competitions.map((comp, i) => (
            <motion.div
              key={comp.id}
              className={`group relative rounded-[2.5rem] overflow-hidden glass p-8 flex flex-col justify-end transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(30,70,107,0.4)] ${comp.bentoClass}`}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              custom={i + 1}
            >
              {/* Background Gradient Blob that expands on hover */}
              <div 
                className={`absolute inset-0 opacity-20 group-hover:opacity-50 transition-opacity duration-700 bg-linear-to-br ${comp.color}`}
              />
              
              {/* Abstract Shape Overlay (glass reflection) */}
              <div className="absolute top-[-30%] right-[-20%] w-[150%] h-[150%] bg-white/5 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700" />
              
              {/* Floating Icon */}
              <motion.div
                className="absolute top-10 right-10 text-white/40 group-hover:text-white transition-colors duration-500 drop-shadow-2xl"
                animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, delay: i * 0.3 }}
              >
                {comp.icon}
              </motion.div>

              {/* Content */}
              <div className="relative z-10 mt-auto">
                <h3 className={`${i === 0 ? "text-3xl md:text-5xl" : "text-2xl"} font-bold mb-3 text-white group-hover:text-blue-200 transition-colors`}>
                  {comp.title}
                </h3>
                <p className={`text-gray-300 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity ${i === 0 ? "text-lg max-w-md" : "text-sm"}`}>
                  {comp.description}
                </p>
                
                <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#67baf4]">Explore</span>
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#1e466b] group-hover:border group-hover:border-[#67baf4]/50 transition-all">
                    <svg className="w-5 h-5 text-white transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
