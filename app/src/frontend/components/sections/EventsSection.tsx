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
    cx: 400, cy: 250
  },
  {
    id: "evt-2",
    step: "22 Nov '26",
    title: "Roadshow",
    description: "Promotional event serving as the first touch point of contact for introducing PRIME 2027 to students from various universities across Indonesia.",
    borderColor: "border-blue-500/50",
    textColor: "text-blue-500",
    tags: ["Promotion", "Interactive", "Recruitment"],
    cx: 1100, cy: 250
  },
  {
    id: "evt-3",
    step: "21 Mar '27",
    title: "IPSE",
    description: "An offline seminar and exhibition designed as a collaborative platform to bridge insights from the energy industry with the development of students’ competencies.",
    borderColor: "border-indigo-500/50",
    textColor: "text-indigo-500",
    tags: ["Seminar", "Exhibition", "Knowledge-Sharing"],
    cx: 400, cy: 700
  },
  {
    id: "evt-4",
    step: "22 Mar '27",
    title: "PRIMExplore",
    description: "An activity designed to provide participants with direct learning experiences in the energy industry. With the theme ‘Energy Industry Immersion’.",
    borderColor: "border-purple-500/50",
    textColor: "text-purple-500",
    tags: ["Company Visit", "Immersion", "Industry"],
    cx: 1100, cy: 700
  },
  {
    id: "evt-5",
    step: "27 Mar '27",
    title: "Pioneers' Zenith",
    description: "The grand finale of PRIME 2027, integrating the Awarding Ceremony, Networking Gala Dinner, and Closing Ceremony into a single event.",
    borderColor: "border-pink-500/50",
    textColor: "text-pink-500",
    tags: ["Awarding", "Gala Dinner", "Closing"],
    cx: 400, cy: 1150
  }
];

// SVG Paths connecting the edges of the events
const lines = [
  // Box 1 (Right Edge) to Box 2 (Left Edge)
  { id: "line-1", x1: 560, y1: 250, x2: 920, y2: 250.1 },
  // Box 2 (Bottom-Left Corner) to Box 3 (Top-Right Corner)
  { id: "line-2", x1: 940, y1: 340, x2: 576, y2: 599 },
  // Box 3 (Right Edge) to Box 4 (Left Edge)
  { id: "line-3", x1: 560, y1: 700, x2: 920, y2: 700.1 },
  // Box 4 (Bottom-Left Corner) to Box 5 (Top-Right Corner)
  { id: "line-4", x1: 940, y1: 790, x2: 576, y2: 1049 },
];

const arrowheads = [
  { id: "arrow-1", x: 920, y: 250, rotate: 0 },
  { id: "arrow-2", x: 576, y: 599, rotate: 144.6 },
  { id: "arrow-3", x: 920, y: 700, rotate: 0 },
  { id: "arrow-4", x: 576, y: 1049, rotate: 144.6 },
];

function DesktopEventsMap() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const lineRefs = useRef<(SVGPathElement | null)[]>([]);
  const arrowRefs = useRef<(SVGGElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const boxOutlineRefs = useRef<(SVGRectElement | null)[]>([]);
  const boxContentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (!sectionRef.current || !containerRef.current) return;

    // Center cards on their absolute coordinates
    gsap.set(cardRefs.current, { xPercent: -50, yPercent: -50 });
    
    // Set up box outlines
    boxOutlineRefs.current.forEach((rect, i) => {
      if (!rect) return;
      gsap.set(rect, { strokeDasharray: 100, strokeDashoffset: i === 0 ? 0 : 100 });
    });

    // Hide box contents for all EXCEPT the first one
    gsap.set(boxContentRefs.current.slice(1), { opacity: 0, scale: 0.95 });

    // Hide all arrowheads initially
    gsap.set(arrowRefs.current, { opacity: 0 });

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
      return (isMobile ? 190 : window.innerWidth / 2) - cx;
    };
    const getCameraY = (cy: number) => {
      const isMobile = window.innerWidth < 768;
      return (isMobile ? 250 : window.innerHeight / 2) - cy;
    };

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

      // 3. Fade in the arrowhead when the line finishes
      tl.to(arrowRefs.current[i], {
        opacity: 1,
        duration: 0.2,
      }, `${segmentLabel}+=1.0`);

      // 4. Draw the box outline
      tl.to(boxOutlineRefs.current[i + 1], {
        strokeDashoffset: 0,
        duration: 0.6,
        ease: "power2.inOut"
      }, `${segmentLabel}+=1.0`);

      // 5. Pop in the box content
      tl.to(boxContentRefs.current[i + 1], {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "back.out(1.5)"
      }, `${segmentLabel}+=1.6`);
    });

  }, { scope: sectionRef });

  return (
    <div ref={sectionRef} className="hidden md:block relative h-screen overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-blue-900/10 via-[#050505] to-[#050505] pointer-events-none z-0" />
      
      <div 
        ref={containerRef}
        className="absolute top-0 left-0 w-[1800px] h-[1600px] z-10"
      >
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1800 1600" overflow="visible">
          <defs>
            <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
          
          {lines.map((l, i) => (
            <path
              key={l.id}
              ref={(el) => { lineRefs.current[i] = el; }}
              d={`M ${l.x1} ${l.y1} L ${l.x2} ${l.y2}`}
              fill="none"
              stroke="url(#line-gradient)"
              strokeWidth="4"
              strokeLinecap="round"
              style={{ filter: "drop-shadow(0 0 8px rgba(139, 92, 246, 0.6))" }}
            />
          ))}

          {arrowheads.map((arrow, i) => (
            <g
              key={arrow.id}
              ref={(el) => { arrowRefs.current[i] = el; }}
              transform={`translate(${arrow.x}, ${arrow.y}) rotate(${arrow.rotate})`}
              style={{ filter: "drop-shadow(0 0 8px rgba(139, 92, 246, 0.6))" }}
            >
              <polygon points="0,-6 12,0 0,6" fill="#ec4899" />
            </g>
          ))}
        </svg>

        {events.map((evt, index) => (
          <div 
            key={evt.id}
            ref={(el) => { cardRefs.current[index] = el; }}
            className={`absolute w-[320px] z-20 group`}
            style={{ left: evt.cx, top: evt.cy }}
          >
            {/* Outline SVG */}
            <svg className={`absolute -inset-0.5 w-[calc(100%+4px)] h-[calc(100%+4px)] pointer-events-none z-0 ${evt.textColor}`} xmlns="http://www.w3.org/2000/svg">
              <rect
                ref={(el) => { boxOutlineRefs.current[index] = el; }}
                x="2" y="2" width="calc(100% - 4px)" height="calc(100% - 4px)"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                pathLength="100"
                style={{ filter: "drop-shadow(0 0 6px currentColor)" }}
              />
            </svg>

            {/* Box Content */}
            <div 
              ref={(el) => { boxContentRefs.current[index] = el; }}
              className={`relative z-10 w-full h-full p-6 bg-[#0a0a0a]/95 backdrop-blur-md shadow-2xl ${evt.textColor}`}
            >
              {/* Cyberpunk Corners */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-current opacity-80" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-current opacity-80" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-current opacity-80" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-current opacity-80" />
              
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
          </div>
        ))}
      </div>
    </div>
  );
}

function MobileEventsMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    if (!containerRef.current) return;
    const elements = gsap.utils.toArray('.mobile-anim-item', containerRef.current) as HTMLElement[];
    
    elements.forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power2.out"
      });
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="block md:hidden w-full flex-col items-center pb-24 px-6 relative z-10">
      {events.map((evt, idx) => (
        <div key={evt.id} className="w-full flex flex-col items-center">
          
          <div className={`mobile-anim-item w-full p-6 border ${evt.borderColor} bg-[#0a0a0a]/90 backdrop-blur-md shadow-2xl z-20`}>
             <div className="flex flex-col mb-4 gap-2">
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

          {/* Arrow pointing down to next box */}
          {idx < events.length - 1 && (
            <div className="mobile-anim-item w-1 h-24 my-4 relative">
               <div className="absolute inset-0 w-1 bg-linear-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full" />
               <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-8 border-t-pink-500" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function EventsSection() {
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

      <DesktopEventsMap />
      <MobileEventsMap />
    </section>
  );
}
