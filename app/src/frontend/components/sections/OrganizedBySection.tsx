"use client";

import { motion } from "framer-motion";
import PixelBlast from "@/frontend/components/PixelBlast";

interface OrganizedBySectionProps {
  items: { name: string }[];
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function OrganizedBySection({ items }: OrganizedBySectionProps) {
  return (
    <section className="relative py-24 bg-[#050505] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <PixelBlast
          variant="square"
          pixelSize={4}
          color="#1e466b"
          patternScale={2}
          patternDensity={1.2}
          pixelSizeJitter={0.5}
        />
        {/* Fades on the edges to blend with the rest of the page */}
        <div className="absolute inset-0 bg-linear-to-b from-[#050505] via-transparent to-[#050505]" />
        <div className="absolute inset-0 bg-linear-to-r from-[#050505] via-transparent to-[#050505]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Title */}
        <motion.div
          className="flex items-center justify-center gap-6 md:gap-12 mb-10"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="h-[1px] flex-1 max-w-[120px] md:max-w-[200px] bg-gray-800" />
          <h2 className="text-sm md:text-base font-bold tracking-[0.25em] uppercase text-[#3b82f6]">
            ORGANIZED BY
          </h2>
          <div className="h-[1px] flex-1 max-w-[120px] md:max-w-[200px] bg-gray-800" />
        </motion.div>

        {/* Card Container */}
        <motion.div
          className="bg-[#10131c] border border-white/5 py-16 px-8 max-w-5xl mx-auto"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="flex flex-col md:flex-row justify-center items-center gap-16 md:gap-32">
            {items.map((item) => (
              <div key={item.name} className="flex flex-col items-center gap-5">
                <div className="w-[84px] h-[84px] rounded-full bg-[#161c28] border border-white/5 flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                  <span className="text-2xl font-bold text-[#67baf4]">
                    {item.name.charAt(0)}
                  </span>
                </div>
                <span className="text-[13px] md:text-sm text-gray-400 font-medium tracking-wide">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
