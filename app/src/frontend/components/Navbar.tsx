import { useState, useEffect } from "react";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3 bg-black/50 backdrop-blur-md border-b border-white/10 shadow-lg" : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <div className="flex items-center gap-3 cursor-pointer">
          <Image
            src="/PRIME_logo.png"
            alt="PRIME UB Logo"
            width={40}
            height={40}
            className="rounded-full"
            style={{
              objectFit: "contain",
            }}
          />
          <span className="font-bold text-lg tracking-wider text-white">
            PRIME<span className="text-blue-400">UB</span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-1 items-center justify-center gap-8">
          <a href="#" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Beranda</a>
          <a href="#about" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Tentang</a>
          <a href="#organized-by" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Penyelenggara</a>
          <a href="#media-partner" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Media Partner</a>
        </div>

        {/* CTA Button */}
        <div className="hidden md:flex">
          <button
            className="px-5 py-2.5 rounded-xl font-semibold text-sm text-white transition-all duration-300 hover:scale-105"
            style={{
              background: "var(--gradient-brand-vivid)",
              boxShadow: "var(--shadow-glow-blue)",
            }}
          >
            Daftar Sekarang
          </button>
        </div>

        {/* Mobile Menu Button (Hamburger) */}
        <div className="md:hidden flex items-center">
          <button className="text-gray-300 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
