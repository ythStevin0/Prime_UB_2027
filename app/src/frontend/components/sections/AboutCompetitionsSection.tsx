"use client";

import { motion } from "framer-motion";
import { ArrowRight, Target, Lightbulb } from "lucide-react";
import Link from "next/link";
import { competitionsData } from "../../data/competitions";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6 },
  }),
};

export default function AboutCompetitionsSection() {
  return (
    <section id="about-competitions" className="relative py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-[#050505] overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-blue-900/5 via-[#050505] to-[#050505] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        
        {/* === LEFT SIDE: COMPETITIONS === */}
        <div className="flex flex-col justify-center">
          
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            custom={0}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="h-0.5 w-12 bg-blue-500" />
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-500">
                Our Competitions
              </p>
              <div className="h-0.5 w-12 bg-[#333]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
              Challenge Yourself.
            </h2>
            <p className="text-gray-400 max-w-md">
              Unlock your potential and take on new challenges. Choose your arena and prove your expertise to the world.
            </p>
          </motion.div>

          {/* Competitions Grid (Matching Reference) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {competitionsData.map((comp, i) => (
              <Link href={`/competitions/${comp.slug}`} key={comp.id}>
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                custom={i + 1}
                className="group h-full p-5 border border-white/5 bg-white/5 rounded-none hover:bg-white/10 hover:border-blue-500/30 transition-all duration-300 cursor-pointer"
              >
                <p className="text-[10px] font-bold uppercase tracking-wider text-blue-400 mb-2">
                  {comp.label}
                </p>
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-200 transition-colors">
                  {comp.title}
                </h3>
                <p className="text-xs text-gray-400 line-clamp-2">
                  {comp.shortDesc}
                </p>
              </motion.div>
              </Link>
            ))}
          </div>

          <motion.div 
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={7}
            className="mt-8 flex gap-4 text-sm font-mono text-gray-500"
          >
            <span className="border border-white/10 px-3 py-1 bg-[#0a0a0a]">Technical</span>
            <span className="border border-white/10 px-3 py-1 bg-[#0a0a0a]">Business</span>
            <span className="border border-white/10 px-3 py-1 bg-[#0a0a0a]">Innovation</span>
          </motion.div>

        </div>

        {/* === RIGHT SIDE: ABOUT PRIME UB === */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full min-h-150 border border-white/10 bg-[#0a0a0a] rounded-none overflow-hidden group flex flex-col mt-8 lg:mt-0"
        >
          {/* Glassmorphism Abstract Background (Sebagai ganti gambar daun) */}
          <div className="absolute inset-0 z-0 pointer-events-none">
             <div className="absolute top-[-10%] right-[-10%] w-[70%] h-[50%] bg-blue-600/20 blur-[100px] rounded-full" />
             <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-cyan-600/10 blur-[100px] rounded-full" />
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay" />
          </div>

          {/* Siku-siku dekoratif */}
          <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-blue-500/50 z-20 pointer-events-none" />
          <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-blue-500/50 z-20 pointer-events-none" />

          {/* Konten About */}
          <div className="relative z-10 p-8 md:p-12 flex flex-col h-full">
            
            <div className="mb-auto">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-500 mb-4">
                What Is PRIME?
              </p>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                Empowering The Next <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-300">
                  Energy Leaders.
                </span>
              </h3>
              
              <div className="space-y-6 text-gray-300 text-sm md:text-base leading-relaxed">
                <p>
                  <strong className="text-blue-400">PRIME</strong> (Petroleum Research and Innovation to Magnify Engineers) adalah acara tahunan terbesar yang diselenggarakan oleh mahasiswa Teknik Perminyakan Universitas Brawijaya. 
                </p>
                <p>
                  Kami menghadirkan kompetisi, seminar, dan event yang mempertemukan talenta muda dari seluruh Indonesia untuk memecahkan tantangan nyata di sektor energi global.
                </p>
              </div>
            </div>

            {/* Visi & Misi Ringkas */}
            <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 gap-6">
              <div>
                <Target className="w-6 h-6 text-blue-400 mb-3" />
                <h4 className="text-white font-bold mb-1">Vision</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Menjadi wadah pengembangan kompetensi dan inovasi terdepan.
                </p>
              </div>
              <div>
                <Lightbulb className="w-6 h-6 text-cyan-400 mb-3" />
                <h4 className="text-white font-bold mb-1">Innovation</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Memperkenalkan teknologi & riset terbaru di bidang energi.
                </p>
              </div>
            </div>

            {/* Tombol dekoratif di pojok kanan bawah */}
            <div className="absolute bottom-0 right-0">
               <div className="bg-[#050505] border-t border-l border-white/10 px-6 py-3 text-sm font-bold text-blue-400 flex items-center gap-2 hover:bg-white/5 transition-colors cursor-pointer">
                 Learn More <ArrowRight className="w-4 h-4" />
               </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
