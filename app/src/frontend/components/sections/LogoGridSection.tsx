"use client";

import { motion } from "framer-motion";

/**
 * LogoGridSection — Section reusable untuk menampilkan logo partner/sponsor.
 * Mendukung 2 variant: 
 * 1. "grid": Kotak bento glassmorphism dengan efek glow 3D (untuk Organized By).
 * 2. "marquee": Infinite scrolling logo untuk Media Partner & Sponsor.
 */

interface LogoItem {
  name: string;
  logo?: string;
}

interface LogoGridSectionProps {
  id: string;
  title: string;
  items: LogoItem[];
  columns?: 3 | 4 | 5 | 6; 
  variant?: "grid" | "marquee";
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function LogoGridSection({
  id,
  title,
  items,
  columns = 4,
  variant = "grid",
}: LogoGridSectionProps) {
  const gridCols: Record<number, string> = {
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-4",
    5: "grid-cols-2 md:grid-cols-5",
    6: "grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
  };

  // Duplikasi item untuk efek infinite marquee yang mulus
  const marqueeItems = [...items, ...items, ...items, ...items];

  const renderLogo = (item: LogoItem, i: number, isMarquee: boolean) => (
    <div
      key={`${item.name}-${i}`}
      className={`group flex flex-col items-center justify-center gap-3 transition-transform duration-300 ${
        isMarquee ? "w-32 md:w-48 shrink-0 grayscale hover:grayscale-0" : "w-full hover:scale-105"
      }`}
    >
      {item.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.logo}
          alt={item.name}
          className={`${
            isMarquee ? "h-10 md:h-16" : "h-14 md:h-20"
          } w-auto object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-300`}
          style={{ filter: isMarquee ? "" : "brightness(0) invert(1)" }}
        />
      ) : (
        <div
          className={`${
            isMarquee ? "w-12 h-12 md:w-16 md:h-16 text-lg md:text-xl" : "w-16 h-16 md:w-20 md:h-20 text-xl md:text-2xl"
          } rounded-full flex items-center justify-center font-bold opacity-60 group-hover:opacity-100 transition-opacity duration-300`}
          style={{
            background: "rgba(30, 70, 107, 0.2)",
            border: "1px solid rgba(103, 186, 244, 0.15)",
            color: "var(--color-light-blue)",
          }}
        >
          {item.name.charAt(0)}
        </div>
      )}
      {!item.logo && (
        <span
          className="text-xs md:text-sm font-medium text-center opacity-60 group-hover:opacity-100 transition-opacity duration-300"
          style={{ color: "var(--fg-secondary)" }}
        >
          {item.name}
        </span>
      )}
    </div>
  );

  return (
    <section id={id} className="relative py-12 md:py-16 px-6 overflow-hidden">
      <div className={`${variant === "grid" ? "max-w-5xl" : "max-w-full"} mx-auto`}>
        
        {/* Header dengan garis di kiri & kanan */}
        <motion.div
          className="flex items-center justify-center gap-4 md:gap-8 mb-10 max-w-5xl mx-auto"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="h-px flex-1 max-w-25 md:max-w-37.5" style={{ background: "rgba(255,255,255,0.2)" }} />
          <h2 className="text-sm md:text-base font-bold tracking-[0.2em] uppercase whitespace-nowrap text-blue-400 drop-shadow-md">
            {title}
          </h2>
          <div className="h-px flex-1 max-w-25 md:max-w-37.5" style={{ background: "rgba(255,255,255,0.2)" }} />
        </motion.div>

        {variant === "grid" ? (
          /* Bento Box Style for Organized By */
          <motion.div
            className="relative glass rounded-none py-8 md:py-12 px-8 md:px-16 shadow-2xl border border-white/10 overflow-hidden group"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {/* Ambient Glow */}
            <div className="absolute inset-0 bg-linear-to-br from-[#1e466b]/10 to-[#67baf4]/10 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className={`relative z-10 grid ${gridCols[columns]} gap-8 md:gap-12 items-center justify-items-center`}>
              {items.map((item, i) => renderLogo(item, i, false))}
            </div>
          </motion.div>
        ) : (
          /* Infinite Marquee for Sponsors/Partners */
          <motion.div 
            className="relative w-full flex items-center overflow-hidden py-8"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {/* Gradient Mask on left and right for smooth fade out */}
            <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-linear-to-r from-black to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-linear-to-l from-black to-transparent z-10" />

            <div className="flex w-fit animate-marquee">
              <motion.div
                className="flex items-center gap-8 md:gap-16 pr-8 md:pr-16"
                animate={{ x: [0, -1035] }}
                transition={{
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 20,
                  ease: "linear",
                }}
              >
                {marqueeItems.map((item, i) => renderLogo(item, i, true))}
              </motion.div>
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
}
