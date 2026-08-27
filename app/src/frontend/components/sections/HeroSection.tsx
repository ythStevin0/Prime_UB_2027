"use client";

import { Download } from "lucide-react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import PixelBlast from "@frontend/components/PixelBlast";

/**
 * HeroSection — Full-screen immersive hero.
 * Logo besar di tengah, judul di kiri bawah, deskripsi di kanan bawah.
 * Referensi: Layout Brand Designer (teks bawah split left-right).
 */

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1, ease: "easeOut" } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.18, duration: 0.8, ease: "easeOut" },
  }),
};

export default function HeroSection() {
  return (
    <section className="relative h-screen max-h-screen flex flex-col overflow-hidden">
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

      {/* Gradient fade to next section */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-linear-to-t from-[#050505] to-transparent z-0 pointer-events-none" />

      {/* ======= CENTERED LOGO (Visual Focus) ======= */}
      {/* ======= CENTERED LOGO (Visual Focus) ======= */}
      <div className="flex-1 flex items-center justify-center relative z-10 pt-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/PRIME_logo.png"
              alt="PRIME UB 2027 Logo"
              width={360}
              height={360}
              className="drop-shadow-[0_0_60px_rgba(30,70,107,0.35)]"
              style={{
                maxWidth: "min(360px, 50vw)",
                height: "auto",
                objectFit: "contain",
              }}
              priority
            />
          </motion.div>
        </motion.div>
      </div>

      {/* ======= BOTTOM CONTENT — Split Left/Right ======= */}
      <div className="relative z-20 w-full pb-6 md:pb-10 mt-4 md:-mt-36">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* ---- LEFT: Title ---- */}
            <div>
              {/* Badge */}
              <motion.div
                className="flex items-center gap-3 mb-4"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0}
              >
                <div className="w-1 h-3 bg-cyan-400" />
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-cyan-400 drop-shadow-md">
                  PENDAFTARAN DIBUKA
                </span>
              </motion.div>

              {/* Heading */}
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95] flex flex-col drop-shadow-lg"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={1}
              >
                <span className="text-white">Welcome to</span>
                <span className="text-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.4)]">
                  PRIME UB
                </span>
                <span className="text-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.4)]">
                  2027!
                </span>
              </motion.h1>
            </div>

            {/* ---- RIGHT: Description + CTA ---- */}
            <div className="flex flex-col gap-4 md:max-w-sm md:ml-auto">
              {/* Bold statement */}
              <motion.p
                className="text-lg md:text-xl font-bold text-white leading-snug"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={2}
              >
                Inovasi riset dan keahlian industri untuk solusi energi masa depan.
              </motion.p>

              {/* Description */}
              <motion.p
                className="text-sm md:text-base leading-[1.7] text-gray-200 drop-shadow-md"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={3}
              >
                PRIME UB 2027 sebagai wadah transformatif di mana inovasi riset, wawasan akademis, dan keahlian industri berpadu untuk membentuk solusi energi masa depan melalui kompetisi nasional.
              </motion.p>

              {/* CTA */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={4}
              >
                <button
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-none text-sm font-semibold transition-all duration-300 hover:bg-white/5 active:scale-95 cursor-pointer border border-[#333] text-white hover:border-gray-400"
                >
                  <Download className="w-4 h-4" />
                  Download Invitation
                </button>
              </motion.div>
            </div>
          </div>

          {/* ---- ORGANIZED BY (Below split content) ---- */}
          <motion.div
            className="flex justify-center gap-8 md:gap-20 items-center mt-6 md:mt-8 pt-4 border-t border-white/5"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={5}
          >
            {[
              { name: "Teknik Perminyakan UB", id: "T" },
              { name: "HMTM FT UB", id: "H" },
              { name: "BEM FT UB", id: "B" },
            ].map((item) => (
              <div
                key={item.name}
                className="flex items-center gap-3 opacity-50 hover:opacity-100 transition-opacity duration-300"
              >
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#161c28] border border-white/10 flex items-center justify-center">
                  <span className="text-xs md:text-sm font-bold text-blue-400">
                    {item.id}
                  </span>
                </div>
                <span className="text-xs md:text-sm font-medium text-gray-400 hidden sm:inline">
                  {item.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
