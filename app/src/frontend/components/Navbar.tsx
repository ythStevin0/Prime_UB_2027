"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { competitionsData } from "../data/competitions";
import { eventsData } from "../data/events";
import { ChevronDown, User } from "lucide-react";
import StaggeredMenu from "./StaggeredMenu";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { data: session, status } = useSession();

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
        <Link href="/" className="flex items-center gap-3">
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
            PRIME <span className="text-blue-400">2027</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-1 items-center justify-center gap-6 lg:gap-8">
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
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 bg-[#0a0a0a]/95 backdrop-blur-md border border-white/10 shadow-2xl flex flex-col py-3 rounded-none">
              
              {/* Industry Exposure */}
              <div className="px-5 py-2 text-xs font-bold text-blue-400 uppercase tracking-wider">
                Industry Exposure
              </div>
              {eventsData.filter(e => e.category === "Industry Exposure").map((evt) => (
                <Link 
                  key={evt.id} 
                  href={`/events/${evt.slug}`}
                  className="px-5 py-2.5 text-sm text-gray-400 hover:text-blue-400 hover:bg-white/5 transition-colors border-l-2 border-transparent hover:border-blue-400 flex flex-col"
                >
                  <span>{evt.title}</span>
                  {evt.titleHighlight && <span className="text-xs text-gray-500">{evt.titleHighlight}</span>}
                </Link>
              ))}

              <div className="my-2 border-t border-white/10" />

              {/* Networking & Engagement */}
              <div className="px-5 py-2 text-xs font-bold text-blue-400 uppercase tracking-wider">
                Networking & Engagement
              </div>
              {eventsData.filter(e => e.category === "Networking & Engagement").map((evt) => (
                <Link 
                  key={evt.id} 
                  href={`/events/${evt.slug}`}
                  className="px-5 py-2.5 text-sm text-gray-400 hover:text-blue-400 hover:bg-white/5 transition-colors border-l-2 border-transparent hover:border-blue-400 flex flex-col"
                >
                  <span>{evt.title}</span>
                  {evt.titleHighlight && <span className="text-xs text-gray-500">{evt.titleHighlight}</span>}
                </Link>
              ))}

            </div>
          </div>
          
          <Link href="/#events" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Timeline</Link>
          <Link href="/merchandise" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Merchandise</Link>
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex gap-2 items-center">
          
          {status === "authenticated" ? (
            <>
              {/* Submit Karya */}
              <Link
                href="/submit"
                className="relative flex items-center justify-center px-4 h-9.5 font-semibold text-[13px] text-blue-400 hover:text-white transition-all duration-300 tracking-wider uppercase active:scale-95 group"
              >
                <div className="absolute top-0 left-0 w-2 h-2 group-hover:w-[80%] group-hover:h-[80%] border-t-2 border-l-2 border-blue-500/40 group-hover:border-blue-400 transition-all duration-300" />
                <span className="relative z-10">Submit Karya</span>
                <div className="absolute bottom-0 right-0 w-2 h-2 group-hover:w-[80%] group-hover:h-[80%] border-b-2 border-r-2 border-blue-500/40 group-hover:border-blue-400 transition-all duration-300" />
              </Link>

              {/* Daftar Sekarang */}
              <Link
                href="/register"
                className="relative flex items-center justify-center px-4 h-9.5 font-semibold text-[13px] text-blue-400 hover:text-white transition-all duration-300 tracking-wider uppercase active:scale-95 group"
              >
                <div className="absolute top-0 right-0 w-2 h-2 group-hover:w-[80%] group-hover:h-[80%] border-t-2 border-r-2 border-blue-500/40 group-hover:border-blue-400 transition-all duration-300" />
                <span className="relative z-10">Daftar Sekarang</span>
                <div className="absolute bottom-0 left-0 w-2 h-2 group-hover:w-[80%] group-hover:h-[80%] border-b-2 border-l-2 border-blue-500/40 group-hover:border-blue-400 transition-all duration-300" />
              </Link>
              
              <div className="h-4 w-px bg-white/10 hidden md:block"></div>

              {/* User Profile Link */}
              <Link 
                href="/profile" 
                title={`Profil Anda (${session?.user?.email || 'User'})`}
                className="hidden md:flex items-center justify-center w-10 h-10 rounded-none hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-300 group"
              >
                <div className="w-8 h-8 rounded-none bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <User className="w-4 h-4 text-blue-400 group-hover:text-blue-300 transition-colors" />
                </div>
              </Link>
            </>
          ) : (
            <>
              {/* Log In Button */}
              <Link
                href="/login"
                className="relative flex items-center justify-center px-4 h-9.5 font-semibold text-[13px] text-blue-400 hover:text-white transition-all duration-300 tracking-wider uppercase active:scale-95 group"
              >
                <div className="absolute top-0 left-0 w-2 h-2 group-hover:w-[80%] group-hover:h-[80%] border-t-2 border-l-2 border-blue-500/40 group-hover:border-blue-400 transition-all duration-300" />
                <span className="relative z-10">Log In</span>
                <div className="absolute bottom-0 right-0 w-2 h-2 group-hover:w-[80%] group-hover:h-[80%] border-b-2 border-r-2 border-blue-500/40 group-hover:border-blue-400 transition-all duration-300" />
              </Link>

              {/* Sign In Button */}
              <Link
                href="/signup"
                className="relative flex items-center justify-center px-4 h-9.5 font-semibold text-[13px] text-blue-400 hover:text-white transition-all duration-300 tracking-wider uppercase active:scale-95 group"
              >
                <div className="absolute top-0 right-0 w-2 h-2 group-hover:w-[80%] group-hover:h-[80%] border-t-2 border-r-2 border-blue-500/40 group-hover:border-blue-400 transition-all duration-300" />
                <span className="relative z-10">Sign In</span>
                <div className="absolute bottom-0 left-0 w-2 h-2 group-hover:w-[80%] group-hover:h-[80%] border-b-2 border-l-2 border-blue-500/40 group-hover:border-blue-400 transition-all duration-300" />
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button (Hamburger) */}
        <div className="md:hidden flex items-center">
          <StaggeredMenu
            isFixed={true}
            position="right"
            brandLogoSrc="/PRIME_logo.png"
            brandName={<>PRIME <span className="text-blue-400">2027</span></>}
            items={[
              { label: 'About', ariaLabel: 'About', link: '/#about-competitions' },
              { 
                label: 'Competitions', 
                ariaLabel: 'Competitions', 
                link: '#',
                subItems: competitionsData.map(c => ({ label: c.title, link: `/competitions/${c.slug}` }))
              },
              { 
                label: 'Events', 
                ariaLabel: 'Events', 
                link: '#',
                subItems: [
                  { label: 'Industry Exposure', link: '#', isHeader: true },
                  ...eventsData.filter(e => e.category === "Industry Exposure").map(e => ({ label: `${e.title} ${e.titleHighlight}`, link: `/events/${e.slug}` })),
                  { label: 'Networking & Engagement', link: '#', isHeader: true },
                  ...eventsData.filter(e => e.category === "Networking & Engagement").map(e => ({ label: `${e.title} ${e.titleHighlight}`, link: `/events/${e.slug}` }))
                ]
              },
              { label: 'Timeline', ariaLabel: 'Timeline', link: '/#events' },
              { label: 'Merchandise', ariaLabel: 'Merchandise', link: '/merchandise' }
            ]}
            actionButtons={
              status === 'authenticated' 
                ? [
                    { label: 'Submit Karya', link: '/submit', primary: false },
                    { label: 'Daftar Sekarang', link: '/register', primary: true },
                    { label: 'Profile', link: '/profile', primary: false }
                  ]
                : [
                    { label: 'Log In', link: '/login', primary: false },
                    { label: 'Sign In', link: '/signup', primary: true }
                  ]
            }
            socialItems={[
              { label: 'Instagram', link: 'https://www.instagram.com/prime.ub/' },
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
