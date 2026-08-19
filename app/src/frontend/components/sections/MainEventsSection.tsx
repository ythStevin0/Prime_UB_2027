"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { eventsData } from "@/frontend/data/events";

export default function MainEventsSection() {
  return (
    <section id="main-events" className="relative py-20 bg-[#050505] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col gap-16 md:gap-24">
        
        {/* Section Header */}
        <div className="text-center mb-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Our Main <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">Events.</span>
          </h2>
        </div>

        {/* Events List */}
        <div className="flex flex-col gap-16 md:gap-24">
          {eventsData.map((evt) => (
            <motion.div 
              key={evt.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className={`flex flex-col ${evt.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-stretch rounded-none overflow-hidden bg-[#0a0a0a] border border-white/10 shadow-2xl relative group`}
            >
              {/* Siku-siku dekoratif */}
              <div className={`absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 ${evt.theme.corner} z-20 pointer-events-none transition-all duration-500 group-hover:w-12 group-hover:h-12`} />
              <div className={`absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 ${evt.theme.corner} z-20 pointer-events-none transition-all duration-500 group-hover:w-12 group-hover:h-12`} />
              {/* Image Side */}
              <div className="w-full lg:w-1/2 relative min-h-75 lg:min-h-112.5">
                <img 
                  src={evt.image} 
                  alt={evt.title + " " + evt.titleHighlight} 
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              {/* Content Side (Card) */}
              <div className="w-full lg:w-1/2 p-8 md:p-16 flex flex-col justify-center relative">
                
                {/* Background decorative glow & pattern */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay pointer-events-none" />
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 ${evt.theme.glow} blur-[100px] rounded-full pointer-events-none`} />

                <div className="relative z-10">
                  <p className="text-sm font-bold tracking-[0.2em] text-gray-400 mb-3 uppercase">
                    {evt.subtitle}
                  </p>
                  
                  <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                    {evt.title} <span className={evt.theme.text}>{evt.titleHighlight}</span>
                  </h3>
                  
                  <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-10">
                    {evt.shortDesc}
                  </p>
                  
                  <Link href={`/events/${evt.slug}`} className={`${evt.theme.bgBtn} text-white font-semibold py-3 px-8 rounded-none transition-all hover:pl-10 flex items-center gap-2 w-max border border-transparent hover:border-white/20 shadow-[0_0_15px_rgba(0,0,0,0.5)]`}>
                    {evt.buttonText} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
