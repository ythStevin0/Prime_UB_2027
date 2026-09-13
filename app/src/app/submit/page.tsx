"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/frontend/components/Navbar";
import FooterSection from "@/frontend/components/sections/FooterSection";
import PixelBlast from "@/frontend/components/PixelBlast";
import { Upload, AlertTriangle, CheckCircle2, ChevronDown, Info } from "lucide-react";
import { useSession } from "next-auth/react";
import { competitionsData } from "@/frontend/data/competitions";
import { eventsData } from "@/frontend/data/events";

// Build unified list
const allActivities = [
  ...competitionsData.map(c => ({ id: c.id, title: c.title, category: 'competition' })),
  ...eventsData.map(e => ({ id: e.id, title: `${e.title}${e.titleHighlight ? ' ' + e.titleHighlight : ''}`, category: 'event' })),
];

export default function SubmitPage() {
  const { status } = useSession();
  const router = useRouter();

  const [selectedActivity, setSelectedActivity] = useState("");
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null);
  const [checkingRegistration, setCheckingRegistration] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/submit');
    }
  }, [status, router]);

  // Check registration status when activity is selected
  useEffect(() => {
    if (!selectedActivity) {
      setTimeout(() => setIsRegistered(null), 0);
      return;
    }

    const checkRegistration = async () => {
      setCheckingRegistration(true);
      try {
        const res = await fetch(`/api/registrations/check?competitionId=${selectedActivity}`);
        if (res.ok) {
          const data = await res.json();
          setIsRegistered(data.data?.registered ?? false);
        } else {
          setIsRegistered(false);
        }
      } catch {
        setIsRegistered(false);
      } finally {
        setCheckingRegistration(false);
      }
    };

    checkRegistration();
  }, [selectedActivity]);

  if (status === 'loading' || status === 'unauthenticated') {
    return (
      <main className="flex-1 relative z-0 bg-[#050505] text-white min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
      </main>
    );
  }

  return (
    <main className="flex-1 relative z-0 bg-[#050505] text-white min-h-screen flex flex-col">
      <Navbar />

      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] left-[-10%] w-[50%] h-[50%] bg-blue-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-900/10 blur-[120px] rounded-full" />
        <div className="absolute inset-0 opacity-40">
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
            liquidWobbleSpeed={5}
            speed={1.65}
            edgeFade={0.25}
            transparent
          />
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center relative z-10 pt-32 pb-24 px-4">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold font-mono tracking-tight text-white mb-4">
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">
                [ Submit Karya ]
              </span>
            </h1>
            <p className="text-gray-400 max-w-xl mx-auto">
              Kirimkan karya terbaik Anda untuk kompetisi atau acara PRIME UB 2027.
            </p>
          </div>

          <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 p-6 md:p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-500 via-cyan-400 to-purple-500" />

            <div className="space-y-8">
              {/* Step 1: Pilih Kompetisi/Acara */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-400">1. Pilih Kompetisi/Acara yang ingin Anda submit</label>
                <div className="relative">
                  <select
                    value={selectedActivity}
                    onChange={(e) => setSelectedActivity(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white pl-4 pr-10 py-3 outline-none transition-colors appearance-none cursor-pointer rounded-xl"
                  >
                    <option value="" className="text-gray-900">
                      Pilih kompetisi atau acara...
                    </option>
                    <optgroup label="── Competitions ──" className="text-gray-900">
                      {allActivities.filter(a => a.category === 'competition').map(c => (
                        <option key={c.id} value={c.id} className="text-gray-900">
                          {c.title}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="── Events ──" className="text-gray-900">
                      {allActivities.filter(a => a.category === 'event').map(e => (
                        <option key={e.id} value={e.id} className="text-gray-900">
                          {e.title}
                        </option>
                      ))}
                    </optgroup>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>

              {/* Step 2: Registration Status */}
              {selectedActivity && (
                <div className="space-y-4">
                  {checkingRegistration ? (
                    <div className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-xl">
                      <div className="w-5 h-5 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
                      <span className="text-gray-400 text-sm">Memeriksa status pendaftaran...</span>
                    </div>
                  ) : isRegistered ? (
                    <>
                      {/* Registered — show success and upload area */}
                      <div className="flex items-start gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                        <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-green-400 font-medium text-sm">Anda sudah terdaftar!</p>
                          <p className="text-gray-400 text-xs mt-1">
                            Anda dapat melanjutkan untuk mengirimkan karya Anda.
                          </p>
                        </div>
                      </div>

                      {/* Upload Area (Placeholder) */}
                      <div className="space-y-3">
                        <label className="text-sm font-medium text-gray-400">2. Upload Karya Anda</label>
                        <div className="border-2 border-dashed border-white/10 hover:border-cyan-500/30 rounded-xl p-10 text-center transition-colors duration-300 cursor-pointer group">
                          <Upload className="w-10 h-10 text-gray-600 group-hover:text-cyan-400 mx-auto mb-3 transition-colors" />
                          <p className="text-gray-400 text-sm">
                            Drag & drop file di sini, atau <span className="text-cyan-400">klik untuk browse</span>
                          </p>
                          <p className="text-gray-600 text-xs mt-2">PDF, DOC, DOCX, PPT, PPTX (Max. 25MB)</p>
                        </div>

                        <div className="flex items-start gap-2 p-3 bg-blue-500/5 border border-blue-500/10 rounded-lg">
                          <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                          <p className="text-xs text-gray-400">
                            Fitur upload karya akan segera tersedia. Saat ini Anda dapat mengirimkan karya melalui email panitia.
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    /* Not Registered — show warning */
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-5 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                        <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-amber-400 font-semibold text-sm">Anda belum terdaftar!</p>
                          <p className="text-gray-400 text-sm mt-1">
                            Anda belum terdaftar pada kompetisi/acara ini. Silakan daftar terlebih dahulu sebelum mengirimkan karya.
                          </p>
                        </div>
                      </div>
                      
                      <Link
                        href="/register"
                        className="block w-full text-center py-3 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-medium rounded-xl border border-amber-500/30 transition-colors"
                      >
                        Daftar Sekarang →
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <FooterSection />
    </main>
  );
}
