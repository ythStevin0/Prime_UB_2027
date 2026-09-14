"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, KeyRound, CheckCircle2 } from "lucide-react";
import PixelBlast from "@/frontend/components/PixelBlast";
import Navbar from "@/frontend/components/Navbar";
import FooterSection from "@/frontend/components/sections/FooterSection";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || "Terjadi kesalahan.");
      }
      
      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };


  return (
    <main className="min-h-screen bg-[#050505] flex flex-col relative overflow-hidden text-white">
      <Navbar />
      
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] left-[-10%] w-[50%] h-[50%] bg-blue-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-900/10 blur-[120px] rounded-full" />
        <div className="absolute inset-0 opacity-20">
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
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-blue-500/10 flex items-center justify-center rounded-none mb-4">
              <KeyRound className="w-8 h-8 text-blue-400" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Lupa Password?</h1>
            <p className="text-gray-400">
              Masukkan email yang terdaftar. Kami akan menghubungi Anda untuk instruksi pengaturan ulang.
            </p>
          </div>

          <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-none p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-500 via-cyan-400 to-purple-500" />

            {success ? (
              <div className="text-center py-6">
                <CheckCircle2 className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">Permintaan Berhasil!</h2>
                <p className="text-gray-400 text-sm mb-6">
                  Permintaan reset password telah kami terima. Admin kami akan memprosesnya dan menghubungi Anda segera.
                </p>
                <Link href="/" className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors flex items-center justify-center gap-2">
                  <ArrowLeft className="w-4 h-4" /> Kembali ke Beranda
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-none">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-400">Email Address</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-none py-3 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-hidden focus:border-cyan-500/50 focus:bg-cyan-950/10 transition-all duration-300"
                      placeholder="nama@email.com"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <div className="relative group p-0.5 overflow-hidden rounded-none shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] transition-all duration-500">
                    <div className="absolute inset-0 bg-white/20 group-hover:opacity-0 transition-opacity duration-300" />
                    <div className="absolute -inset-full opacity-0 group-hover:opacity-100 group-hover:animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_50%,#22d3ee_70%,#3b82f6_85%,#a855f7_100%)] transition-opacity duration-300" />
                    <button
                      type="submit"
                      disabled={loading}
                      className="relative flex items-center justify-center gap-2 w-full bg-[#050505] text-white font-bold tracking-widest text-sm uppercase py-4 rounded-none active:scale-[0.98] transition-transform duration-300 disabled:opacity-70 disabled:cursor-not-allowed z-10"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2 text-cyan-400">
                          <div className="w-5 h-5 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
                          Memproses...
                        </span>
                      ) : (
                        <span className="group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-cyan-400 group-hover:to-blue-400 transition-colors duration-300">
                          KIRIM PERMINTAAN RESET
                        </span>
                      )}
                    </button>
                  </div>
                </div>

                <div className="text-center pt-2">
                  <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
                    Kembali ke halaman utama
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      <FooterSection />
    </main>
  );
}
