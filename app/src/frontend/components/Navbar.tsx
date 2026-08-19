"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { competitionsData } from "../data/competitions";
import { eventsData } from "../data/events";
import { ChevronDown } from "lucide-react";
import StaggeredMenu from "./StaggeredMenu";

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
        <div className="hidden md:flex flex-1 items-center justify-center gap-6 lg:gap-8">
          <Link href="/" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Home</Link>
          <Link href="/#about-competitions" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">About</Link>
          
          {/* Competitions Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 text-sm font-medium text-gray-300 hover:text-white transition-colors py-4">
              Competitions <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 bg-[#0a0a0a]/95 backdrop-blur-md border border-white/10 shadow-2xl flex flex-col py-2 rounded-none">
              {competitionsData.map((comp) => (
                <Link 
                  key={comp.id} 
                  href={`/competitions/${comp.slug}`}
                  className="px-5 py-2.5 text-sm text-gray-400 hover:text-cyan-400 hover:bg-white/5 transition-colors border-l-2 border-transparent hover:border-cyan-400"
                >
                  {comp.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Events Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 text-sm font-medium text-gray-300 hover:text-white transition-colors py-4">
              Events <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 bg-[#0a0a0a]/95 backdrop-blur-md border border-white/10 shadow-2xl flex flex-col py-2 rounded-none">
              {eventsData.map((evt) => (
                <Link 
                  key={evt.id} 
                  href={`/events/${evt.slug}`}
                  className="px-5 py-2.5 text-sm text-gray-400 hover:text-blue-400 hover:bg-white/5 transition-colors border-l-2 border-transparent hover:border-blue-400"
                >
                  {evt.title} {evt.titleHighlight}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="hidden md:flex">
          <button
            className="px-5 py-2.5 rounded-none font-semibold text-sm text-white transition-all duration-300 hover:scale-105"
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
          <StaggeredMenu
            isFixed={true}
            position="right"
            items={[
              { label: 'Home', ariaLabel: 'Home', link: '/' },
              { label: 'About', ariaLabel: 'About', link: '/#about-competitions' },
              { label: 'Competitions', ariaLabel: 'Competitions', link: '/#about-competitions' },
              { label: 'Events', ariaLabel: 'Events', link: '/#main-events' }
            ]}
            socialItems={[
              { label: 'Instagram', link: 'https://instagram.com/primeub' },
              { label: 'LinkedIn', link: 'https://linkedin.com/company/primeub' }
            ]}
            displaySocials
            displayItemNumbering={true}
            menuButtonColor="#e9e9ef"
            openMenuButtonColor="#fff"
            changeMenuColorOnOpen={true}
            colors={['#0a0a0a', '#1e466b', '#22d3ee']}
            logoUrl=""
            accentColor="#22d3ee"
          />
        </div>
      </div>
    </nav>
  );
}
