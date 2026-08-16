"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Globe, FlaskConical, ArrowRight, Wrench, FileText, Droplets } from "lucide-react";

const competitions = [
  {
    id: "comp-1",
    title: "Business Case",
    description: "Pecahkan studi kasus nyata dari industri energi dan presentasikan solusi strategis terbaikmu kepada panel ahli.",
    longDescription: "Tantang dirimu untuk menganalisis dan memecahkan permasalahan kompleks di dunia industri energi saat ini. Business Case competition dirancang untuk menguji kemampuan analitis, pemecahan masalah, dan komunikasi strategis peserta dalam menghadapi tantangan transisi energi global.",
    icon: <Briefcase className="w-12 h-12 md:w-16 md:h-16" />,
    color: "from-[#1e466b] to-blue-600",
  },
  {
    id: "comp-2",
    title: "Geothermal Case Study",
    description: "Analisis potensi pengembangan energi panas bumi.",
    longDescription: "Dalam kompetisi ini, peserta akan diberikan data lapangan panas bumi nyata dan diminta untuk melakukan analisis komprehensif mulai dari eksplorasi, estimasi cadangan, hingga strategi pengembangan yang optimal secara ekonomi dan ramah lingkungan.",
    icon: <Globe className="w-12 h-12 md:w-16 md:h-16" />,
    color: "from-blue-600 to-[#67baf4]",
  },
  {
    id: "comp-3",
    title: "Smart Innovation",
    description: "Rancang inovasi teknologi tepat guna yang berkelanjutan.",
    longDescription: "Bawa ide paling cemerlangmu untuk menciptakan teknologi dan inovasi berkelanjutan yang mampu meningkatkan efisiensi energi, mengurangi emisi karbon, atau memajukan energi terbarukan di Indonesia.",
    icon: <FlaskConical className="w-12 h-12 md:w-16 md:h-16" />,
    color: "from-[#67baf4] to-cyan-400",
  },
  {
    id: "comp-4",
    title: "Oil Rig Design",
    description: "Rancang model miniatur anjungan lepas pantai dengan efisiensi tinggi.",
    longDescription: "Buktikan keahlian teknis timmu dengan mendesain dan membuat maket Oil Rig (anjungan lepas pantai) yang tangguh. Penilaian meliputi efisiensi beban, orisinalitas desain, serta penerapan standar keselamatan K3 dalam merancang anjungan pengeboran lepas pantai.",
    icon: <Wrench className="w-12 h-12 md:w-16 md:h-16" />,
    color: "from-cyan-400 to-teal-500",
  },
  {
    id: "comp-5",
    title: "Paper & Poster",
    description: "Tuangkan gagasan inovatifmu melalui karya tulis ilmiah dan desain poster.",
    longDescription: "Wadah bagi para mahasiswa kritis untuk menyampaikan penelitian, ide orisinal, atau studi literatur mengenai inovasi teknologi di sektor energi. Publikasikan penemuanmu melalui presentasi paper dan poster visual yang menarik kepada para pakar industri.",
    icon: <FileText className="w-12 h-12 md:w-16 md:h-16" />,
    color: "from-teal-500 to-emerald-400",
  },
  {
    id: "comp-6",
    title: "Mud Design",
    description: "Ciptakan formulasi lumpur pemboran terbaik untuk kondisi sumur spesifik.",
    longDescription: "Kompetisi teknis yang menantang peserta untuk membuat racikan lumpur pemboran (drilling fluid) yang paling optimal. Uji rheologi, densitas, dan filtrasi lumpur ciptaanmu langsung di laboratorium untuk membuktikan efektivitasnya dalam simulasi sumur minyak.",
    icon: <Droplets className="w-12 h-12 md:w-16 md:h-16" />,
    color: "from-emerald-400 to-blue-400",
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
  const [activeIndex, setActiveIndex] = useState(0);
  const activeComp = competitions[activeIndex];

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
            Unlock your potential and take on new tantangan dengan kompetisi kami.
            Pilih salah satu kompetisi di sebelah kanan untuk melihat detail selengkapnya!
          </p>
        </motion.div>

        {/* Layout Split: Kiri (Detail) & Kanan (List) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 min-h-[500px]">
          
          {/* --- LEFT SIDE: Active Details --- */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeComp.id}
                initial={{ opacity: 0, x: -30, filter: "blur(10px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: 30, filter: "blur(10px)" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className={`relative rounded-[2.5rem] overflow-hidden glass p-10 md:p-14 border border-white/10 flex flex-col h-full`}
              >
                {/* Background Gradient Blob */}
                <div 
                  className={`absolute inset-0 opacity-20 bg-linear-to-br ${activeComp.color}`}
                />
                
                {/* Abstract Shape Overlay */}
                <div className="absolute top-[-30%] right-[-20%] w-[100%] h-[150%] bg-white/5 rounded-full blur-3xl pointer-events-none" />
                
                <div className="relative z-10 text-white/40 mb-8 drop-shadow-2xl">
                  {activeComp.icon}
                </div>

                <div className="relative z-10 mt-auto">
                  <h3 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
                    {activeComp.title}
                  </h3>
                  <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-10">
                    {activeComp.longDescription}
                  </p>
                  
                  <button className="flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-white transition-all hover:scale-105 active:scale-95 bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/30">
                    Daftar Sekarang
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* --- RIGHT SIDE: List of Competitions --- */}
          <div className="lg:col-span-5 flex flex-col gap-4 justify-center">
            {competitions.map((comp, i) => {
              const isActive = i === activeIndex;
              return (
                <motion.button
                  key={comp.id}
                  onClick={() => setActiveIndex(i)}
                  className={`group relative w-full text-left p-6 rounded-3xl transition-all duration-300 border ${
                    isActive 
                      ? "glass border-blue-400/50 shadow-[0_10px_30px_rgba(30,70,107,0.3)]" 
                      : "bg-white/5 border-transparent hover:bg-white/10"
                  }`}
                  whileHover={{ x: isActive ? 0 : 8 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Highlight bar for active item */}
                  {isActive && (
                    <motion.div 
                      layoutId="activeIndicator"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-12 bg-blue-400 rounded-r-full"
                    />
                  )}
                  
                  <div className="flex items-center gap-5">
                    <div className={`p-3 rounded-2xl transition-colors duration-300 ${isActive ? 'bg-blue-500/20 text-blue-300' : 'bg-white/5 text-gray-400 group-hover:text-gray-200'}`}>
                      {comp.icon}
                    </div>
                    <div>
                      <h4 className={`text-xl font-bold mb-1 transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>
                        {comp.title}
                      </h4>
                      <p className={`text-sm line-clamp-1 transition-colors duration-300 ${isActive ? 'text-blue-200' : 'text-gray-500 group-hover:text-gray-400'}`}>
                        {comp.description}
                      </p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
