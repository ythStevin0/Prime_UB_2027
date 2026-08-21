import { notFound } from "next/navigation";
import { eventsData } from "@/frontend/data/events";
import Navbar from "@/frontend/components/Navbar";
import FooterSection from "@/frontend/components/sections/FooterSection";
import PixelBlast from "@/frontend/components/PixelBlast";
import TimelineSection from "@/frontend/components/sections/TimelineSection";

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const evt = eventsData.find((e) => e.slug === slug);

  if (!evt) {
    notFound();
  }

  return (
    <main className="flex-1 relative z-0 bg-[#050505] text-white">
      <Navbar />

      {/* === HERO SECTION === */}
      <section className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden pt-24">
        {/* Pixel Blast Background */}
        <div className="absolute inset-0 z-0 pointer-events-auto opacity-50">
          <PixelBlast
            variant="square"
            pixelSize={4}
            color="#1e466b"
            patternScale={2}
            patternDensity={1.4}
            pixelSizeJitter={0.4}
            enableRipples
            rippleSpeed={0.4}
            rippleThickness={0.12}
            rippleIntensityScale={1.5}
            liquid={false}
            liquidStrength={0.12}
            liquidRadius={1.2}
          />
        </div>
        
        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="mb-8 p-6 glass rounded-none border border-white/10 shadow-[0_0_40px_rgba(34,211,238,0.2)]">
            {evt.icon}
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            {evt.title} <span className={evt.theme.text}>{evt.titleHighlight}</span>
          </h1>
          
          <div className="flex items-center gap-4 text-gray-400">
            <div className="h-px w-12 bg-blue-500/50" />
            <p className="text-lg md:text-xl font-medium tracking-wide uppercase">
              {evt.subtitle}
            </p>
            <div className="h-px w-12 bg-blue-500/50" />
          </div>
        </div>
      </section>

      {/* === ABOUT SECTION === */}
      <section id="about" className="py-24 px-6 md:px-24 max-w-5xl mx-auto border-t border-white/5">
        <h2 className="text-3xl font-bold mb-8 text-blue-400">About the Event</h2>
        <div className="p-8 glass border border-white/10 rounded-none">
          <p className="text-lg text-gray-300 leading-relaxed">
            {evt.longDesc}
          </p>
        </div>
      </section>

      {/* === TIMELINE SECTION === */}
      <TimelineSection timeline={evt.timeline} title={evt.title} />

      {/* === MAPS SECTION === */}
      <section className="py-24 px-6 md:px-24 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-emerald-400 mb-4">Location</h2>
          <p className="text-gray-400">Tempat pelaksanaan {evt.title} {evt.titleHighlight}.</p>
        </div>
        
        <div className="w-full h-125 rounded-none overflow-hidden border border-white/10 glass p-2">
          <iframe 
            src={evt.mapEmbedUrl} 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="filter grayscale contrast-125 opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
          />
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
