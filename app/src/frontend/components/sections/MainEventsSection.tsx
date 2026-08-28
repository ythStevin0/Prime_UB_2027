"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { ArrowRight, Hexagon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { MouseEvent } from "react";
import { eventsData, type EventData } from "@/frontend/data/events";

// Komponen Card dengan Tema Tech/Energy (Sharp Edges, Neon Glow, Cyberpunk-ish)
function EventCard({ evt, index }: { evt: EventData; index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // Map warna statis agar tidak di-purge oleh Tailwind JIT
  const themeColorMap: Record<string, string> = {
    'evt-primexplore': 'bg-blue-500',
    'evt-ipse': 'bg-cyan-500',
    'evt-roadshow': 'bg-purple-500',
    'pioneers-zenith': 'bg-pink-500',
  };
  const themeColor = themeColorMap[evt.slug] || 'bg-cyan-500';

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut", delay: index * 0.1 }}
      className={`relative flex flex-col ${
        evt.reverse ? "lg:flex-row-reverse" : "lg:flex-row"
      } items-center group w-full mb-16 lg:mb-24`}
    >
      {/* ================= IMAGE SECTION ================= */}
      <div className={`relative w-full lg:w-[60%] h-87.5 lg:h-120 rounded-none overflow-hidden border border-white/10 group-hover:border-white/30 transition-colors duration-500 z-10`}>
        
        {/* Tech Grid Overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay z-10 pointer-events-none" />
        
        {/* Glow Effects */}
        <div className={`absolute top-0 left-0 w-full h-full bg-linear-to-br ${evt.theme.glow} to-transparent blur-[80px] opacity-40 z-0`} />
        
        {/* Gambar */}
        <div className="absolute inset-0 z-0">
          <Image
            src={evt.image}
            alt={evt.title}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-105 filter grayscale-20 group-hover:grayscale-0"
          />
        </div>

        {/* Overlay gradient elegan untuk blending */}
        <div className={`absolute inset-0 bg-linear-to-t lg:bg-linear-to-r from-[#050505] via-black/40 to-transparent z-10 ${evt.reverse ? 'lg:bg-linear-to-l' : 'lg:bg-linear-to-r'}`} />
        
        {/* Cyber Corner Brackets (Only on exposed corners) */}
        <div className={`absolute top-4 ${evt.reverse ? 'right-4 border-r-2' : 'left-4 border-l-2'} border-t-2 w-12 h-12 ${evt.theme.corner} z-20 pointer-events-none transition-all duration-500 group-hover:w-16 group-hover:h-16`} />
        <div className={`absolute bottom-4 ${evt.reverse ? 'right-4 border-r-2' : 'left-4 border-l-2'} border-b-2 w-12 h-12 ${evt.theme.corner} z-20 pointer-events-none transition-all duration-500 group-hover:w-16 group-hover:h-16`} />
        
        {/* Tech Badge */}
        <div className={`absolute top-6 right-6 z-20 bg-black/60 backdrop-blur-md border border-white/10 px-4 py-1.5 transform translate-x-4 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 flex items-center gap-2`}>
          <div className={`w-1.5 h-1.5 rounded-full ${themeColor} animate-pulse`} />
          <span className="text-[10px] font-bold tracking-[0.2em] text-white uppercase">
            {evt.category}
          </span>
        </div>
      </div>

      {/* ================= CONTENT SECTION (OVERLAPPING) ================= */}
      <div 
        onMouseMove={handleMouseMove}
        className={`relative z-20 w-[92%] sm:w-[85%] lg:w-[48%] -mt-16 lg:mt-0 ${
          evt.reverse ? "lg:-mr-16" : "lg:-ml-16"
        }`}
      >
        <div className="relative p-8 md:p-12 bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-500 group-hover:border-white/20 overflow-hidden">
          
          {/* Spotlight Effect (Tech Scanner look) */}
          <motion.div
            className="pointer-events-none absolute -inset-px z-0 opacity-0 transition duration-300 group-hover:opacity-100"
            style={{
              background: useMotionTemplate`
                radial-gradient(
                  400px circle at ${mouseX}px ${mouseY}px,
                  rgba(255,255,255,0.05),
                  transparent 80%
                )
              `,
            }}
          />

          <div className="relative z-10 flex flex-col items-start">
            {/* Subtitle with Tech Icon */}
            <div className="flex items-center gap-3 mb-4">
              <Hexagon className={`w-4 h-4 ${evt.theme.text}`} />
              <p className="text-xs font-bold tracking-[0.25em] text-gray-400 uppercase">
                {evt.subtitle}
              </p>
            </div>
            
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-5 tracking-tight leading-[1.1]">
              {evt.title}{" "}
              <span className={`${evt.theme.text} drop-shadow-md`}>
                {evt.titleHighlight}
              </span>
            </h3>
            
            <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-8 line-clamp-3 relative">
              {evt.longDesc}
              {/* Decorative line left of text */}
              <span className={`absolute -left-4 top-1 bottom-1 w-0.5 bg-linear-to-b ${evt.theme.glow} to-transparent opacity-50`} />
            </p>
            
            {/* Premium Cyber Button */}
            <Link 
              href={`/events/${evt.slug}`} 
              className={`relative flex items-center gap-3 py-3.5 px-8 bg-black overflow-hidden group/btn border border-white/10 transition-all duration-500 hover:border-transparent rounded-sm`}
            >
              {/* Solid Background Fill Sweep */}
              <div className={`absolute inset-0 w-0 ${themeColor} transition-all duration-500 ease-out group-hover/btn:w-full z-0`} />
              
              {/* Glowing Aura on Hover */}
              <div className={`absolute inset-0 ${themeColor} blur-2xl opacity-0 transition-opacity duration-500 group-hover/btn:opacity-60 z-0 pointer-events-none`} />
              
              {/* Siku-siku */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/30 z-10 transition-colors duration-300 group-hover/btn:border-white" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/30 z-10 transition-colors duration-300 group-hover/btn:border-white" />

              <span className="relative z-10 tracking-[0.2em] uppercase text-xs md:text-sm font-bold text-gray-300 group-hover/btn:text-white transition-colors duration-300 drop-shadow-md">
                {evt.buttonText}
              </span>
              
              {/* Sliding Arrow Icon */}
              <div className="relative z-10 w-4 h-4 overflow-hidden flex items-center justify-center">
                 <ArrowRight className="absolute w-4 h-4 text-gray-300 transition-all duration-300 ease-out group-hover/btn:translate-x-full group-hover/btn:opacity-0" />
                 <ArrowRight className="absolute w-4 h-4 text-white transform -translate-x-full opacity-0 transition-all duration-300 ease-out group-hover/btn:translate-x-0 group-hover/btn:opacity-100" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function MainEventsSection() {
  return (
    <section id="main-events" className="relative py-24 bg-[#050505] overflow-hidden">
      {/* Background Tech Details */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col gap-12">
        
        {/* Section Header */}
        <div className="text-center flex flex-col items-center mb-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-3"
          >
            <div className="w-8 h-px bg-cyan-500/40" />
            <p className="text-cyan-400 font-bold tracking-[0.25em] text-xs uppercase">
              Explore Our Programs
            </p>
            <div className="w-8 h-px bg-cyan-500/40" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-white tracking-tight"
          >
            Our Main <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">Events.</span>
          </motion.h2>
        </div>

        {/* Events List */}
        <div className="flex flex-col w-full">
          {eventsData.map((evt, index) => (
            <EventCard key={evt.id} evt={evt} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}
