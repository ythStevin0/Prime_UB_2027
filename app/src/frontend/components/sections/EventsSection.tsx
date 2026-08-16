"use client";

import { motion } from "framer-motion";

const events = [
  {
    id: "evt-1",
    tag: "IPTRAINING",
    title: "Elevate Your Skills",
    description: "Our exclusive events designed to enhance your expertise in Excel and software tools while honing your competitive edge. Unlock new opportunities and take your skills to the next level.",
    image: "https://images.unsplash.com/photo-1515169067868-5387ec356723?q=80&w=800&auto=format&fit=crop", 
    color: "from-blue-900 to-[#1e466b]"
  },
  {
    id: "evt-2",
    tag: "WORKSHOP",
    title: "Future of Energy",
    description: "A deep dive into sustainable energy transitions led by industry experts. Engage in interactive sessions and discover what it takes to lead the green energy revolution.",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=800&auto=format&fit=crop",
    color: "from-[#1e466b] to-[#4a89bc]"
  },
  {
    id: "evt-3",
    tag: "NETWORKING",
    title: "Connect & Grow",
    description: "Expand your professional network by meeting peers, mentors, and top executives from leading energy corporations in a casual yet professional setting.",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop",
    color: "from-blue-900 to-[#1e466b]" // Disamakan dengan gaya card di atasnya
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6 },
  }),
};

export default function EventsSection() {
  return (
    <section id="events" className="relative py-20 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <motion.div
          className="text-center mb-24"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          custom={0}
        >
          <p className="text-sm md:text-base font-semibold uppercase tracking-[0.2em] mb-4 text-blue-400 drop-shadow-md">
            Our Events
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ignite Your Enthusiasm Through <br className="hidden md:block" /> Engaging <span className="text-gradient">Events</span>
          </h2>
          <p className="text-base md:text-lg max-w-3xl mx-auto text-gray-400">
            Join us on a series of dynamic events designed to inspire, connect, and empower you. Don&apos;t miss the chance to
            engage with leaders, learn new skills, and expand your knowledges!
          </p>
        </motion.div>

        {/* Sticky Stacking Cards Container */}
        <div className="relative pb-32">
          {events.map((evt, i) => (
            <div 
              key={evt.id} 
              className="sticky top-0 h-[100vh] flex items-center justify-center w-full"
              style={{ zIndex: i + 10 }}
            >
              <motion.div
                className="flex flex-col md:flex-row w-full rounded-4xl overflow-hidden shadow-2xl border border-white/10 h-[75vh] md:h-[65vh] bg-black"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                custom={i + 1}
              >
                {/* Image Side */}
                <div className="w-full h-1/2 md:w-1/2 md:h-full relative overflow-hidden shrink-0 bg-black">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={evt.image} 
                    alt={evt.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/60 md:bg-linear-to-r md:from-black/60 md:to-transparent" />
                </div>

                {/* Content Side with Gradient */}
                <div className={`w-full flex-1 md:w-1/2 md:h-full p-6 md:p-12 lg:p-16 flex flex-col justify-center bg-linear-to-br ${evt.color} backdrop-blur-md`}>
                  <span className="text-sm font-bold tracking-widest text-blue-200 uppercase mb-3">
                    {evt.tag}
                  </span>
                  <h3 className="text-3xl md:text-5xl font-bold mb-6 text-white drop-shadow-md">
                    {evt.title}
                  </h3>
                  <p className="text-white/80 leading-relaxed mb-8 text-sm md:text-lg">
                    {evt.description}
                  </p>
                  <div>
                    <button className="px-8 py-4 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-black/30 hover:bg-black/50 border border-white/20">
                      Learn More
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
