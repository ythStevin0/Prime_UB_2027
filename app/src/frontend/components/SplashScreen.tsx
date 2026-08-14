"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Transition } from "framer-motion";

/**
 * SplashScreen — Loading screen animasi PRIME
 *
 * Menggunakan Framer Motion. 
 * Animasi layout disetup menggunakan ease/spring lembut (bounce: 0)
 * agar huruf terlihat seperti mengalir menyatu dengan mulus.
 */

const words = [
  { text: "Petroleum", isAcronym: true },
  { text: "Research", isAcronym: true },
  { text: "and", isAcronym: false },
  { text: "Innovation", isAcronym: true },
  { text: "to", isAcronym: false },
  { text: "Magnify", isAcronym: true },
  { text: "Engineers", isAcronym: true },
];

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [phase, setPhase] = useState<
    "appear" | "highlight" | "hide-others" | "merge" | "subtitle" | "fadeout"
  >("appear");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("highlight"), 1200);
    // Hilangkan huruf sisa dengan cepat
    const t2 = setTimeout(() => setPhase("hide-others"), 2300);
    // Setelah sisa huruf hilang, langsung mulai merge
    const t3 = setTimeout(() => setPhase("merge"), 2500);
    const t4 = setTimeout(() => setPhase("subtitle"), 3600);
    const t5 = setTimeout(() => setPhase("fadeout"), 4800);
    const t6 = setTimeout(() => onFinish(), 5600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  }, [onFinish]);

  const showAll = phase === "appear" || phase === "highlight";
  const isHighlighted = phase !== "appear";
  const isMerged = phase === "merge" || phase === "subtitle" || phase === "fadeout";
  const showSubtitle = phase === "subtitle" || phase === "fadeout";

  // Konfigurasi transisi yang sangat mulus (tidak mantul, flowing)
  const smoothLayoutTransition: Transition = {
    layout: { type: "spring", bounce: 0, duration: 1.2 },
  };

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center z-9999"
      style={{ background: "var(--color-jet-black)" }}
      animate={{ opacity: phase === "fadeout" ? 0 : 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background Glow */}
      <motion.div
        className="absolute w-75 h-75 md:w-150 md:h-150 rounded-full blur-[100px] md:blur-[120px] pointer-events-none"
        style={{ background: "var(--color-bold-blue)" }}
        animate={{ opacity: isMerged ? 0.3 : 0.1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />

      {/* 
        Parent container dengan layout. 
        Menggunakan animate untuk 'gap' agar Framer Motion bisa melakukan interpolasi jaraknya secara mulus.
      */}
      <motion.div 
        className="relative z-10 flex flex-wrap items-center justify-center max-w-6xl px-6"
        layout
        animate={{
          gap: isMerged ? "0.05em" : "0.35em",
        }}
        transition={smoothLayoutTransition}
      >
        <AnimatePresence mode="popLayout">
          {words.map((word, wordIdx) => {
            if (!showAll && !word.isAcronym) return null;

            return (
              <motion.div
                key={word.text}
                className="flex"
                layout
                transition={smoothLayoutTransition}
              >
                <AnimatePresence mode="popLayout">
                  {word.text.split("").map((char, charIdx) => {
                    const isFirstChar = charIdx === 0;
                    const keepChar = word.isAcronym && isFirstChar;

                    // Unmount huruf lain saat fase hide-others
                    if (!showAll && !keepChar) return null;

                    return (
                      <motion.span
                        key={`${word.text}-${charIdx}`}
                        layout
                        initial={{ opacity: 0, y: 15 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          color:
                            isHighlighted && keepChar
                              ? "var(--color-soft-white)"
                              : "var(--color-bold-blue)",
                          textShadow:
                            isHighlighted && keepChar
                              ? "0 0 30px rgba(103,186,244,0.6)"
                              : "none",
                          fontSize: isMerged 
                              ? "clamp(4.5rem, 14vw, 9.5rem)" 
                              : "clamp(1.5rem, 4vw, 3rem)",
                          letterSpacing: isMerged ? "0.02em" : "normal",
                        }}
                        exit={{ 
                          opacity: 0, 
                          scale: 0.5, 
                          filter: "blur(8px)",
                          // Exit lebih cepat supaya tidak menahan layout yang mau merging
                          transition: { duration: 0.2, ease: "easeOut" }
                        }}
                        transition={{
                          ...smoothLayoutTransition,
                          opacity: {
                            duration: 0.4,
                            delay: phase === "appear" ? wordIdx * 0.1 + charIdx * 0.02 : 0,
                          },
                          color: { duration: 0.6 },
                        }}
                        style={{
                          fontFamily: "var(--font-heading)",
                          fontWeight: isHighlighted && keepChar ? 900 : 700,
                        }}
                      >
                        {char}
                      </motion.span>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {showSubtitle && (
          <motion.div
            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mt-2 text-sm md:text-lg tracking-[0.4em] uppercase z-10 text-center"
            style={{ color: "var(--color-light-blue)", fontWeight: 600 }}
          >
            Universitas Brawijaya 2027
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
