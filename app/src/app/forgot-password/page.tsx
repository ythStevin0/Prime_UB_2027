"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, KeyRound, CheckCircle2 } from "lucide-react";
import PixelBlast from "@/frontend/components/PixelBlast";

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
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] flex flex-col justify-center items-center relative overflow-hidden text-white px-4">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] left-[-10%] w-[50%] h-[50%] bg-blue-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-900/10 blur-[120px] rounded-full" />
        <div className="absolute inset-0 opacity-20">
          <PixelBlast
            variant="square"
            pixelSize={4}
            color="#22d3ee"
            patternScale={2}
            patternDensity={1.2}
            pixelSizeJitter={0.5}
            enableRipples
            rippleSpeed={0.5}
          />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-blue-500/10 flex items-center justify-center rounded-full mb-4">
            <KeyRound className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Lupa Password?</h1>
          <p className="text-gray-400">
            Masukkan email yang terdaftar. Kami akan menghubungi Anda untuk instruksi pengaturan ulang.
          </p>
        </div>

        <div className="glass bg-[#0c0c0c]/80 border border-white/10 p-8 shadow-2xl relative">
          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-blue-500/50" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-blue-500/50" />

          {success ? (
            <div className="text-center py-6">
              <CheckCircle2 className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Permintaan Berhasil!</h2>
              <p className="text-gray-400 text-sm mb-6">
                Permintaan reset password telah kami terima. Admin kami akan memprosesnya dan menghubungi Anda segera.
              </p>
              <Link href="/login" className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors flex items-center justify-center gap-2">
                <ArrowLeft className="w-4 h-4" /> Kembali ke Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-400">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white pl-11 pr-4 py-3 outline-none transition-colors"
                    placeholder="nama@email.com"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-medium py-3 px-4 transition-colors flex items-center justify-center"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  "Kirim Permintaan Reset"
                )}
              </button>

              <div className="text-center pt-2">
                <Link href="/login" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Kembali ke halaman Login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
