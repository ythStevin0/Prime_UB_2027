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


      {/* ======= CONTENT ======= */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* ---- LEFT COLUMN: Text Content ---- */}
          <div className="order-2 md:order-1">
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: "var(--status-success)" }}
              />
              <span className="text-sm font-medium" style={{ color: "var(--fg-secondary)" }}>
                Pendaftaran Dibuka
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
            >
              <span style={{ color: "var(--fg-primary)" }}>#</span>
              <span className="text-gradient">PRIME</span>
              <span style={{ color: "var(--fg-primary)" }}>UB</span>
              <span className="text-gradient">2027</span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              className="text-base md:text-lg max-w-lg mb-8 leading-relaxed"
              style={{ color: "var(--fg-secondary)" }}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={2}
            >
              PRIME UB 2027 sebagai wadah transformatif di mana inovasi riset, wawasan akademis,
              dan keahlian industri berpadu untuk membentuk solusi energi masa depan melalui
              kompetisi dan event berkelas nasional.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={3}
            >
              <button
                className="group flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                style={{
                  background: "var(--gradient-brand-vivid)",
                  boxShadow: "var(--shadow-glow-blue)",
                }}
              >
                Jelajahi Kompetisi
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold glass transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                style={{ color: "var(--fg-secondary)" }}
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
                  className="relative z-10 drop-shadow-2xl rounded-3xl"
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
