"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// 7 Events matching the nodes
const events = [
  {
    id: "evt-1",
    step: "14 Nov '26 - 27 Mar '27",
    title: "All Competition",
    description: "PPC, PetroSmart, BCC, and GCC provide competitive platforms for participants to demonstrate their academic, analytical, and problem-solving capabilities.",
    borderColor: "border-cyan-500/50",
    textColor: "text-cyan-500",
    tags: ["PPC", "PetroSmart", "BCC", "GCC"],
    cx: 300, cy: 200
  },
  {
    id: "evt-2",
    step: "22 Nov '26",
    title: "Roadshow",
    description: "Promotional event serving as the first touch point of contact for introducing PRIME 2027 to students from various universities across Indonesia.",
    borderColor: "border-blue-500/50",
    textColor: "text-blue-500",
    tags: ["Promotion", "Interactive", "Recruitment"],
    cx: 800, cy: 400
  },
  {
    id: "evt-3",
    step: "21 Mar '27",
    title: "IPSE",
    description: "An offline seminar and exhibition designed as a collaborative platform to bridge insights from the energy industry with the development of students’ competencies.",
    borderColor: "border-indigo-500/50",
    textColor: "text-indigo-500",
    tags: ["Seminar", "Exhibition", "Knowledge-Sharing"],
    cx: 1300, cy: 600
  },
  {
    id: "evt-4",
    step: "22 Mar '27",
    title: "PRIMExplore",
    description: "An activity designed to provide participants with direct learning experiences in the energy industry. With the theme ‘Energy Industry Immersion’.",
    borderColor: "border-purple-500/50",
    textColor: "text-purple-500",
    tags: ["Company Visit", "Immersion", "Industry"],
    cx: 900, cy: 850
  },
  {
    id: "evt-5",
    step: "27 Mar '27",
    title: "Pioneers' Zenith",
    description: "The grand finale of PRIME 2027, integrating the Awarding Ceremony, Networking Gala Dinner, and Closing Ceremony into a single event.",
    borderColor: "border-pink-500/50",
    textColor: "text-pink-500",
    tags: ["Awarding", "Gala Dinner", "Closing"],
    cx: 400, cy: 1050
  }
];

// SVG Paths connecting the centers of the events
const lines = [
  { id: "line-1", x1: 300, y1: 200, x2: 800, y2: 400 },
  { id: "line-2", x1: 800, y1: 400, x2: 1300, y2: 600 },
  { id: "line-3", x1: 1300, y1: 600, x2: 900, y2: 850 },
  { id: "line-4", x1: 900, y1: 850, x2: 400, y2: 1050 },
];

export default function EventsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const lineRefs = useRef<(SVGPathElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (!sectionRef.current || !containerRef.current) return;

    // Center cards on their absolute coordinates
    gsap.set(cardRefs.current, { xPercent: -50, yPercent: -50 });
    
    // Hide all cards except the first one initially
    gsap.set(cardRefs.current.slice(1), { opacity: 0, scale: 0.8 });

    // Set SVG lines to be initially hidden via strokeDashoffset
    lineRefs.current.forEach((line) => {
      if (!line) return;
      const length = line.getTotalLength();
      gsap.set(line, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });
    });

    // Helper to calculate camera offsets dynamically
    const getCameraX = (cx: number) => {
      const isMobile = window.innerWidth < 768;
      // Di desktop: berada di tengah. 
      // Di mobile: berada di samping (kiri). Karena kartu w-[320px] (center di 160px), offset 180 memberi margin 20px dari kiri.
      return (isMobile ? 180 : window.innerWidth / 2) - cx;
    };
    const getCameraY = (cy: number) => window.innerHeight / 2 - cy;

    // Initialize camera position (centered on the first event)
    gsap.set(containerRef.current, {
      x: () => getCameraX(events[0].cx),
      y: () => getCameraY(events[0].cy),
    });

    // Create master timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=6000", // Extra long scroll for smooth camera panning
        scrub: 1,
        pin: true,
        invalidateOnRefresh: true, // Recalculate camera positions on resize
      }
    });

    // Iterate through lines to create the sequence
    lines.forEach((_, i) => {
      const nextBox = events[i + 1];
      const segmentLabel = `segment${i}`;

      // 1. Pan the camera to the NEXT box
      tl.to(containerRef.current, {
        x: () => getCameraX(nextBox.cx),
        y: () => getCameraY(nextBox.cy),
        duration: 1,
        ease: "power2.inOut",
      }, segmentLabel);

      // 2. Draw the line simultaneously with the camera pan
      tl.to(lineRefs.current[i], {
        strokeDashoffset: 0,
        duration: 1,
        ease: "none"
      }, segmentLabel);

      // 3. Pop in the next card right at the end of the camera pan
      tl.to(cardRefs.current[i + 1], {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "back.out(1.5)"
      }, `${segmentLabel}+=0.8`);
    });

  }, { scope: sectionRef });

  return (
    <section id="events" className="relative bg-[#050505]">
      {/* Title Section (Normal Scroll) */}
      <div className="pt-24 pb-12 px-6 md:px-24">
         <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] mb-2 text-gray-400">
            Timeline Map
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Journey of <span className="text-gradient">PRIME</span>
          </h2>
        </motion.div>
      </div>

      {/* Pinned Map Animation Area */}
      <div ref={sectionRef} className="relative h-screen overflow-hidden">
        
        {/* Background radial glow that stays fixed relative to the screen */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-blue-900/10 via-[#050505] to-[#050505] pointer-events-none z-0" />
        
        {/* 
          The Map Container (Virtual Canvas)
          We make it larger than the screen so elements don't get cut off while panning. 
        */}
      <div 
        ref={containerRef}
        className="absolute top-0 left-0 w-[1800px] h-[1600px] z-10"
      >
        
        {/* SVG Lines Layer */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1800 1600">
          <defs>
            <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
            <marker 
              id="arrowhead" 
              markerWidth="8" 
              markerHeight="6" 
              refX="4" 
              refY="3" 
              orient="auto"
            >
              <polygon points="0 0, 8 3, 0 6" fill="#8b5cf6" />
            </marker>
          </defs>
          
          {/* Draw all paths */}
          {lines.map((l, i) => (
            <path
              key={l.id}
              ref={(el) => { lineRefs.current[i] = el; }}
              d={`M ${l.x1} ${l.y1} L ${l.x2} ${l.y2}`}
              fill="none"
              stroke="url(#line-gradient)"
              strokeWidth="4"
              strokeLinecap="round"
              markerEnd="url(#arrowhead)"
              style={{ filter: "drop-shadow(0 0 8px rgba(139, 92, 246, 0.6))" }}
            />
          ))}
        </svg>

        {/* HTML Nodes Layer */}
        {events.map((evt, index) => (
          <div 
            key={evt.id}
            ref={(el) => { cardRefs.current[index] = el; }}
            className={`absolute w-[320px] p-6 rounded-none border ${evt.borderColor} bg-[#0a0a0a]/90 backdrop-blur-md shadow-2xl z-20 hover:border-blue-400 transition-colors duration-300`}
            style={{ left: evt.cx, top: evt.cy }}
          >
             <div className="flex flex-col xl:flex-row xl:justify-between items-start xl:items-center mb-4 gap-2">
               <h3 className="text-xl font-bold text-white tracking-wide">
                 {evt.title}
               </h3>
               <span className={`text-sm font-mono font-bold ${evt.textColor}`}>
                 {evt.step}
               </span>
             </div>
             
             <p className="text-gray-400 text-sm leading-relaxed mb-6">
               {evt.description}
             </p>
             
             <div className="flex flex-wrap gap-2 mt-auto">
               {evt.tags.map(tag => (
                 <span 
                   key={tag} 
                   className="px-3 py-1 bg-white/5 border border-white/10 rounded-none text-xs font-mono text-gray-300"
                 >
                   {tag}
                 </span>
               ))}
             </div>
          </div>
        ))}

      </div>
      </div>
    </section>
  );
}
