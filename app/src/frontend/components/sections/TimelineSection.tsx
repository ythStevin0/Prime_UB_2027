"use client";

import { motion } from "framer-motion";

const timelineData = [
  {
    id: 1,
    title: "Class Visit & Campus Visit",
    date: "SEPTEMBER - NOVEMBER 2025",
    align: "left", // The solid box is on the left
  },
  {
    id: 2,
    title: "IPExcel",
    date: "NOVEMBER 2025",
    align: "right", // The solid box is on the right
  },
  {
    id: 3,
    title: "Saving Street Child",
    date: "NOVEMBER 2025",
    align: "left",
  },
  {
    id: 4,
    title: "Grand Final PRIME UB",
    date: "DECEMBER 2025",
    align: "right",
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6 },
  }),
};

export default function TimelineSection() {
  return (
    <section id="timeline" className="relative py-20 md:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          custom={0}
        >
          <p className="text-sm md:text-base font-semibold uppercase tracking-[0.2em] mb-4 text-blue-400">
            Timeline
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Explore Detailed <span className="text-blue-400">Journey</span>
          </h2>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-blue-500/50 -translate-x-1/2" />

          <div className="flex flex-col gap-12 md:gap-8">
            {timelineData.map((item, i) => (
              <motion.div
                key={item.id}
                className="relative flex items-center w-full"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                custom={i + 1}
              >
                {/* Center Dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-white rounded-full border-4 border-blue-500 -translate-x-1/2 z-10 shadow-[0_0_15px_rgba(59,130,246,0.6)]" />

                <div className="flex flex-col md:flex-row w-full ml-10 md:ml-0 items-start md:items-center justify-between">
                  
                  {/* Left Column (Desktop) */}
                  <div className={`w-full md:w-1/2 md:pr-12 flex ${item.align === 'left' ? 'md:justify-end' : 'md:justify-end'} mb-4 md:mb-0`}>
                    {item.align === 'left' ? (
                      /* Solid Box on Left */
                      <div className="relative w-full md:w-[90%] bg-linear-to-r from-[#1e466b]/90 to-[#67baf4]/80 p-6 rounded-2xl md:rounded-l-full md:rounded-r-xl shadow-lg border border-white/20 hover:scale-105 transition-transform">
                         {/* Triangle pointer */}
                         <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-[#67baf4]/80" />
                         <h3 className="text-lg md:text-xl font-bold text-white text-center md:text-left">{item.title}</h3>
                      </div>
                    ) : (
                      /* Outline Box on Left */
                      <div className="w-full md:w-[90%] border border-white/20 p-4 rounded-full flex items-center justify-center bg-white/5">
                        <span className="text-sm font-semibold text-gray-300 tracking-wider">{item.date}</span>
                      </div>
                    )}
                  </div>

                  {/* Right Column (Desktop) */}
                  <div className={`w-full md:w-1/2 md:pl-12 flex ${item.align === 'right' ? 'md:justify-start' : 'md:justify-start'}`}>
                    {item.align === 'right' ? (
                      /* Solid Box on Right */
                      <div className="relative w-full md:w-[90%] bg-linear-to-r from-[#1e466b]/90 to-[#67baf4]/80 p-6 rounded-2xl md:rounded-r-full md:rounded-l-xl shadow-lg border border-white/20 hover:scale-105 transition-transform">
                         {/* Triangle pointer */}
                         <div className="hidden md:block absolute -left-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-[#1e466b]/90" />
                         <h3 className="text-lg md:text-xl font-bold text-white text-center md:text-left">{item.title}</h3>
                      </div>
                    ) : (
                      /* Outline Box on Right */
                      <div className="w-full md:w-[90%] border border-white/20 p-4 rounded-full flex items-center justify-center bg-white/5">
                        <span className="text-sm font-semibold text-gray-300 tracking-wider">{item.date}</span>
                      </div>
                    )}
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
