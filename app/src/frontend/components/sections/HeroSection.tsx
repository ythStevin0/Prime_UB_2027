"use client";

import { ArrowRight, Download } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import PixelBlast from "@frontend/components/PixelBlast";

/**
 * HeroSection — Split-layout hero seperti referensi IPFEST.
 * Kiri: Teks + dekorasi geometris di atas background gelap.
 * Kanan: Logo PRIME di atas area kurva terang.
 */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7 },
  }),
};

const fadeIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { delay: 0.3, duration: 0.8 },
  },
};

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* ======= PIXEL BLAST BACKGROUND ======= */}
      <div className="absolute inset-0 z-0 pointer-events-auto opacity-70">
        <PixelBlast
          variant="square"
          pixelSize={4}
          color="#1e466b"
          patternScale={2}
          patternDensity={1.4}
          pixelSizeJitter={0.4}
          enableRipples
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          liquid={false}
          liquidStrength={0.12}
          liquidRadius={1.2}
          liquidWobbleSpeed={5}
          speed={1.65}
          edgeFade={0.25}
          transparent
        />
      </div>

      {/* Gradient fade to next section to avoid sharp cutoff */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-linear-to-t from-[#050505] to-transparent z-0 pointer-events-none" />

      {/* ======= ORGANIZED BY (Bottom of Hero) ======= */}
      <div className="absolute bottom-0 left-0 w-full z-20 pb-6 md:pb-8 pt-24 bg-linear-to-t from-[#050505] to-transparent">
        <motion.div 
          className="max-w-7xl mx-auto px-6 md:px-12 flex justify-center gap-12 md:gap-32 items-center"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          {[
            { name: "Teknik Perminyakan UB", id: "T" },
            { name: "HMTM FT UB", id: "H" },
            { name: "BEM FT UB", id: "B" }
          ].map((item) => (
            <div key={item.name} className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity duration-300">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#161c28] border border-white/10 flex items-center justify-center">
                <span className="text-sm md:text-base font-bold text-blue-400">{item.id}</span>
              </div>
              <span className="text-xs md:text-sm font-medium text-gray-400">{item.name}</span>
            </div>
          ))}
        </motion.div>
      </div>


      {/* ======= CONTENT ======= */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* ---- LEFT COLUMN: Text Content ---- */}
          <div className="order-2 md:order-1">
            {/* Badge */}
            <motion.div
              className="flex items-center gap-3 mb-6"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
            >
              <div className="w-1 h-3 bg-cyan-400" />
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">
                PENDAFTARAN DIBUKA
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-5 leading-[1.1] flex flex-col gap-1"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
            >
              <span className="text-white">Welcome to</span>
              <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                PRIME UB 2027!
              </span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              className="text-sm md:text-base max-w-lg mb-8 leading-relaxed text-gray-300"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={2}
            >
              PRIME UB 2027 sebagai <span className="font-semibold text-yellow-400">wadah transformatif</span> di mana <span className="font-semibold text-cyan-400">inovasi riset</span>, wawasan akademis, dan <span className="font-semibold text-yellow-400">keahlian industri</span> berpadu untuk membentuk <span className="font-semibold text-cyan-400">solusi energi masa depan</span> melalui kompetisi nasional.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={3}
            >
              <button
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-none text-sm font-semibold transition-all duration-300 hover:bg-white/5 active:scale-95 cursor-pointer border border-[#333] text-white hover:border-gray-400"
              >
                <Download className="w-4 h-4" />
                Download Invitation
              </button>
            </motion.div>
          </div>

          {/* ---- RIGHT COLUMN: Logo ---- */}
          <motion.div
            className="order-1 md:order-2 flex items-center justify-center"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="relative">

              {/* Logo */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src="/PRIME_logo.png"
                  alt="PRIME UB 2027 Logo"
                  width={420}
                  height={420}
                  className="relative z-10 drop-shadow-2xl rounded-none"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    objectFit: "contain",
                  }}
                  priority
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
