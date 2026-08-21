"use client";

import React from "react";
import { motion } from "framer-motion";

export type TimelineEvent = {
  date: string;
  title: string;
  description?: string;
};

interface TimelineSectionProps {
  timeline: TimelineEvent[];
  title?: string;
}

export default function TimelineSection({ timeline, title = "Event" }: TimelineSectionProps) {
  if (!timeline || timeline.length === 0) return null;

  return (
    <section className="relative py-24 bg-[#050505] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            {title} <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">Timeline</span>
          </h2>
        </div>

        <div className="relative">
          {/* Center Vertical Line (Desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/10 -translate-x-1/2" />
          
          {/* Mobile Vertical Line */}
          <div className="md:hidden absolute left-4 top-0 bottom-0 w-0.5 bg-white/10" />

          {timeline.map((item, i) => {
            const isLeft = i % 2 === 0;
            
            return (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`mb-20 md:mb-32 flex w-full relative items-start ${isLeft ? 'md:flex-row-reverse' : 'md:flex-row'} flex-row`}
              >
                
                {/* Empty Space for Desktop Alternate */}
                <div className="hidden md:block w-1/2" />
                
                {/* Mobile Dot */}
                <div className="md:hidden absolute left-4 top-6 w-4 h-4 rounded-full bg-cyan-500 shadow-[0_0_10px_#22d3ee] -translate-x-1/2 z-10" />

                {/* Desktop Dot */}
                <div className="hidden md:block absolute left-1/2 top-6 w-4 h-4 rounded-full bg-cyan-500 shadow-[0_0_10px_#22d3ee] -translate-x-1/2 z-10" />

                {/* Content Side */}
                <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isLeft ? 'md:pr-12' : 'md:pl-12'} relative flex flex-col`}>
                  
                  {/* Horizontal Line Desktop */}
                  <div className={`hidden md:block absolute top-6 h-0.5 bg-white/10 w-full z-0 ${isLeft ? 'right-0' : 'left-0'}`} />

                  {/* Box */}
                  <div className={`relative z-10 bg-[#0a0a0a] border border-white/20 px-6 py-4 rounded-2xl shadow-[0_0_15px_rgba(34,211,238,0.05)] w-fit ${isLeft ? 'md:self-start' : 'md:self-end'} self-start backdrop-blur-md`}>
                     <p className="text-white font-medium whitespace-nowrap text-lg">{item.date}</p>
                  </div>

                  {/* Text */}
                  <div className={`mt-6 w-full text-left ${isLeft ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                    <p className="text-gray-300 text-xl tracking-wide uppercase font-semibold mb-2">{item.title}</p>
                    {item.description && (
                      <p className="text-gray-400 text-sm md:text-base leading-relaxed">{item.description}</p>
                    )}
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
