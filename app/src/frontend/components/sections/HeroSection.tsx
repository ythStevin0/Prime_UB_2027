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
            <div className="flex flex-col text-center md:text-left items-center md:items-start">
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
            <div className="flex flex-col gap-6 md:max-w-sm md:ml-auto text-center md:text-right items-center md:items-end md:mt-6">
              {/* Bold statement */}
              <motion.p
                className="text-lg md:text-xl font-bold text-white leading-snug"
                style={{ textShadow: "0 2px 15px rgba(0,0,0,1), 0 0 5px rgba(0,0,0,0.8)" }}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={2}
              >
                Inovasi riset dan keahlian industri untuk <span className="text-orange-400">solusi</span> <span className="text-purple-400">energi</span> <span className="text-rose-400">masa depan.</span>
              </motion.p>

              {/* Description */}
              <motion.p
                className="text-sm md:text-base leading-[1.7] text-gray-300"
                style={{ textShadow: "0 2px 10px rgba(0,0,0,1), 0 0 4px rgba(0,0,0,0.8)" }}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={3}
              >
                <span className="font-semibold text-white">PRIME UB 2027</span> sebagai wadah transformatif di mana <span className="text-orange-400">inovasi riset</span>, <span className="text-purple-400">wawasan akademis</span>, dan <span className="text-rose-400">keahlian industri</span> berpadu untuk membentuk solusi energi masa depan melalui kompetisi nasional.
              </motion.p>

              {/* CTA */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={4}
              >
                <div className="relative group p-0.5 overflow-hidden rounded-none shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-all duration-500">
                  {/* Default static border */}
                  <div className="absolute inset-0 bg-white/20 group-hover:opacity-0 transition-opacity duration-300" />
                  
                  {/* Rotating animated border on hover */}
                  <div className="absolute -inset-full opacity-0 group-hover:opacity-100 group-hover:animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_50%,#f97316_70%,#a855f7_85%,#e11d48_100%)] transition-opacity duration-300" />
                  
                  {/* Inner button (covers the center, leaving only the border visible) */}
                  <a
                    href="/invitation.pdf"
                    className="relative flex items-center justify-center gap-2.5 px-6 py-3 bg-black text-white cursor-pointer active:scale-95 transition-transform duration-300 w-full h-full"
                  >
                    <Download className="w-4 h-4 transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110 drop-shadow-md text-gray-300 group-hover:text-white" />
                    <span className="tracking-[0.15em] uppercase drop-shadow-md font-bold text-xs">Download Invitation</span>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>

          {/* ---- ORGANIZED BY (Below split content) ---- */}
          <motion.div
            className="flex justify-center gap-8 md:gap-16 items-center mt-10 md:mt-12 pt-6 border-t border-white/5"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={5}
          >
            {[
              { name: "Universitas Brawijaya", src: "/logo_ub.png" },
              { name: "SPE UB SC", src: "/LOGO_SPE_UB_SC.png" },
            ].map((item) => (
              <div
                key={item.name}
                className="flex items-center gap-3 group cursor-pointer"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center transition-all duration-500 group-hover:scale-110 relative">
                  <div className="absolute inset-0 bg-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md rounded-full" />
                  <Image 
                    src={item.src} 
                    alt={item.name} 
                    fill 
                    className="object-contain drop-shadow-[0_0_5px_rgba(255,255,255,0.1)] transition-transform duration-300 relative z-10" 
                  />
                </div>
                <span className="text-xs md:text-sm font-medium text-gray-500 hidden sm:inline transition-all duration-300 group-hover:text-gray-200 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
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
