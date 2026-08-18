"use client";

import { motion } from "framer-motion";

/**
 * FooterSection — Footer halaman utama Prime UB 2027.
 */

export default function FooterSection() {
  return (
    <footer className="relative py-12 px-6">
      {/* Separator */}
      <div className="max-w-6xl mx-auto mb-10">
        <div
          className="h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, var(--border-default) 50%, transparent 100%)",
          }}
        />
      </div>

      <motion.div
        className="max-w-6xl mx-auto text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Brand */}
        <h3 className="text-xl font-bold mb-2">
          <span className="text-gradient">PRIME</span>{" "}
          <span style={{ color: "var(--fg-primary)" }}>UB 2027</span>
        </h3>
        <p className="text-sm mb-6" style={{ color: "var(--fg-muted)" }}>
          Petroleum Research and Innovation to Magnify Engineers
        </p>

        {/* Social Links placeholder */}
        <div className="flex justify-center gap-4 mb-8">
          {["Instagram", "Twitter", "LinkedIn", "YouTube"].map((social) => (
            <a
              key={social}
              href="#"
              className="px-4 py-2 rounded-none glass text-xs font-medium transition-all duration-300 hover:scale-105"
              style={{ color: "var(--fg-secondary)" }}
            >
              {social}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-xs" style={{ color: "var(--fg-muted)" }}>
          © 2027 PRIME Universitas Brawijaya. All rights reserved.
        </p>
      </motion.div>
    </footer>
  );
}
