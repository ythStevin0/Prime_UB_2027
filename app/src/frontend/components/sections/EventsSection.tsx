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
    step: "01",
    title: "Elevate Your Skills",
    description: "Our exclusive events designed to enhance your expertise in software tools while honing your competitive edge.",
    borderColor: "border-blue-500/50",
    textColor: "text-blue-500",
    tags: ["Excel", "PowerBI", "Software"],
    cx: 250, cy: 250
  },
  {
    id: "evt-2",
    step: "02",
    title: "Future of Energy",
    description: "A deep dive into sustainable energy transitions led by industry experts. Discover the green energy revolution.",
    borderColor: "border-cyan-500/50",
    textColor: "text-cyan-500",
    tags: ["Seminar", "Energy", "Sustainability"],
    cx: 750, cy: 450
  },
  {
    id: "evt-3",
    step: "03",
    title: "Connect & Grow",
    description: "Expand your professional network by meeting peers, mentors, and top executives from leading energy corporations.",
    borderColor: "border-indigo-500/50",
    textColor: "text-indigo-500",
    tags: ["Networking", "Mentorship", "Career"],
    cx: 1250, cy: 250
  },
  {
    id: "evt-4",
    step: "04",
    title: "Innovation Challenge",
    description: "Pitch your most innovative ideas to solve real-world energy problems and win seed funding to kickstart your project.",
    borderColor: "border-purple-500/50",
    textColor: "text-purple-500",
    tags: ["Pitching", "Seed Funding", "Competition"],
    cx: 1550, cy: 600
  },
  {
    id: "evt-5",
    step: "05",
    title: "Hackathon",
    description: "A 24-hour intense coding and prototyping session to build digital solutions for the energy sector.",
    borderColor: "border-fuchsia-500/50",
    textColor: "text-fuchsia-500",
    tags: ["Coding", "Prototype", "24-Hours"],
    cx: 1200, cy: 950
  },
  {
    id: "evt-6",
    step: "06",
    title: "Mentorship",
    description: "1-on-1 exclusive sessions with industry veterans guiding your career path and technical journey.",
    borderColor: "border-pink-500/50",
    textColor: "text-pink-500",
    tags: ["1-on-1", "Guidance", "Career"],
    cx: 750, cy: 750
  },
  {
    id: "evt-7",
    step: "07",
    title: "Grand Summit",
    description: "The culmination of Prime UB 2027. Celebrate achievements, hear from keynote speakers, and witness a new era.",
    borderColor: "border-rose-500/50",
    textColor: "text-rose-500",
    tags: ["Keynote", "Celebration", "Awarding"],
    cx: 250, cy: 950
  },
];

// SVG Paths connecting the centers of the events
const lines = [
  { id: "line-1", x1: 250, y1: 250, x2: 750, y2: 450 },
  { id: "line-2", x1: 750, y1: 450, x2: 1250, y2: 250 },
  { id: "line-3", x1: 1250, y1: 250, x2: 1550, y2: 600 },
  { id: "line-4", x1: 1550, y1: 600, x2: 1200, y2: 950 },
  { id: "line-5", x1: 1200, y1: 950, x2: 750, y2: 750 },
  { id: "line-6", x1: 750, y1: 750, x2: 250, y2: 950 },
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
    const getCameraX = (cx: number) => window.innerWidth / 2 - cx;
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
        className="absolute top-0 left-0 w-[1800px] h-300 z-10"
      >
        
        {/* SVG Lines Layer */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1800 1200">
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
             <div className="flex justify-between items-center mb-4">
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
