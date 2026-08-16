"use client";

import { motion } from "framer-motion";
import { Target, Users, Lightbulb } from "lucide-react";

/**
 * AboutSection — Penjelasan tentang PRIME UB 2027.
 */

const highlights = [
  {
    icon: Target,
    title: "Visi",
    description:
      "Menjadi wadah pengembangan kompetensi dan inovasi terdepan bagi mahasiswa teknik perminyakan di Indonesia.",
  },
  {
    icon: Users,
    title: "Misi",
    description:
      "Menyelenggarakan kompetisi dan event berkualitas yang mendorong kolaborasi, kreativitas, dan prestasi akademik.",
  },
  {
    icon: Lightbulb,
    title: "Inovasi",
    description:
      "Memperkenalkan teknologi dan riset terbaru di bidang energi melalui seminar, workshop, dan kompetisi ilmiah.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          custom={0}
        >
          <p
            className="text-sm uppercase tracking-[0.3em] mb-3 font-semibold"
            style={{ color: "var(--color-light-blue)" }}
          >
            Tentang Kami
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Apa itu <span className="text-gradient">PRIME</span> UB?
          </h2>
          <p
            className="text-lg max-w-3xl mx-auto leading-relaxed"
            style={{ color: "var(--fg-secondary)" }}
          >
            <strong style={{ color: "var(--color-light-blue)" }}>PRIME</strong> (Petroleum
            Research and Innovation to Magnify Engineers) adalah acara tahunan terbesar yang
            diselenggarakan oleh mahasiswa Teknik Perminyakan Universitas Brawijaya. Kami
            menghadirkan kompetisi, seminar, dan event yang mempertemukan talenta muda dari
            seluruh Indonesia.
          </p>
        </motion.div>

        {/* Highlight Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              className="group relative p-8 rounded-2xl glass transition-all duration-300 hover:scale-[1.02]"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              custom={i + 1}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(30,70,107,0.2), transparent 70%)",
                }}
              />
              <div className="relative z-10">
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                  style={{
                    background: "rgba(30,70,107,0.15)",
                    border: "1px solid rgba(103,186,244,0.2)",
                  }}
                >
                  <item.icon className="w-7 h-7" style={{ color: "var(--color-light-blue)" }} />
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ color: "var(--fg-primary)" }}>
                  {item.title}
                </h3>
                <p className="leading-relaxed" style={{ color: "var(--fg-secondary)" }}>
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
