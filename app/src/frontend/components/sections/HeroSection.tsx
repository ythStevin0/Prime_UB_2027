"use client";

import { ArrowRight, Download } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

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
      {/* ======= GEOMETRIC DECORATIONS (left side) ======= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Big circle outline — kiri atas */}
        <div
          className="absolute -left-20 top-10 w-64 h-64 md:w-80 md:h-80 rounded-full border-2 opacity-10"
          style={{ borderColor: "var(--color-light-blue)" }}
        />
        {/* Small circle outline — kiri tengah */}
        <div
          className="absolute left-32 top-24 w-8 h-8 rounded-full border-2 opacity-20"
          style={{ borderColor: "var(--color-light-blue)" }}
        />
        {/* Triangle */}
        <motion.div
          className="absolute left-28 top-16 opacity-15"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div
            className="w-0 h-0"
            style={{
              borderLeft: "14px solid transparent",
              borderRight: "14px solid transparent",
              borderBottom: "24px solid var(--color-light-blue)",
            }}
          />
        </motion.div>
        {/* Circle ring — bawah kiri */}
        <div
          className="absolute -left-8 bottom-32 w-40 h-40 md:w-56 md:h-56 rounded-full border-2 opacity-8"
          style={{ borderColor: "var(--color-bold-blue)" }}
        />
        {/* Small dot cluster */}
        <div
          className="absolute left-48 bottom-40 w-3 h-3 rounded-full opacity-20"
          style={{ background: "var(--color-light-blue)" }}
        />
        <div
          className="absolute left-56 bottom-44 w-2 h-2 rounded-full opacity-15"
          style={{ background: "var(--color-light-blue)" }}
        />
      </div>

      {/* ======= CURVED WHITE/LIGHT AREA (right side — behind logo) ======= */}
      <div className="absolute inset-0 pointer-events-none">
        {/* SVG Curve divider */}
        <svg
          className="absolute right-0 top-0 h-full w-[55%] md:w-[48%] hidden md:block"
          viewBox="0 0 600 900"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M180 0 C80 200, 120 400, 60 600 C30 750, 100 850, 180 900 L600 900 L600 0 Z"
            fill="rgba(250,250,250,0.04)"
          />
          <path
            d="M180 0 C80 200, 120 400, 60 600 C30 750, 100 850, 180 900"
            stroke="rgba(103,186,244,0.1)"
            strokeWidth="1"
          />
        </svg>
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

            {/* Stats */}
            <motion.div
              className="flex gap-10 mt-12"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={4}
            >
              {[
                { value: "7", label: "Kompetisi" },
                { value: "5", label: "Event" },
                { value: "1000+", label: "Peserta" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl md:text-3xl font-bold text-gradient-brand">
                    {stat.value}
                  </div>
                  <div className="text-xs mt-1" style={{ color: "var(--fg-muted)" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
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
              {/* Glow behind logo */}
              <div
                className="absolute inset-0 blur-[80px] opacity-20 rounded-full scale-110"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,140,50,0.4) 0%, rgba(139,92,246,0.2) 50%, transparent 70%)",
                }}
              />
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
