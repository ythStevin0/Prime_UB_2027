'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, Mail } from 'lucide-react';
import Link from 'next/link';
import Navbar from "@/frontend/components/Navbar";
import FooterSection from "@/frontend/components/sections/FooterSection";
import PixelBlast from "@/frontend/components/PixelBlast";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/admin';
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError('Email atau password salah');
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch {
      setError('Terjadi kesalahan yang tidak terduga');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex-1 relative z-0 bg-[#050505] text-white min-h-screen flex flex-col">
      <Navbar />

      {/* Background styling */}
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
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold font-mono tracking-tight text-white mb-3">
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">
                [ Login ]
              </span>
            </h1>
            <p className="text-gray-400 text-sm">
              Masuk ke akun PRIME UB 2027 Anda
            </p>
          </div>

          <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-500 via-cyan-400 to-purple-500" />
            
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Email</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full bg-white/5 border border-white/10 py-3 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-hidden focus:border-cyan-500/50 focus:bg-cyan-950/10 transition-all duration-300"
                    placeholder="contoh@email.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-400">Password</label>
                  <Link 
                    href="/forgot-password" 
                    className="text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    Lupa password?
                  </Link>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
                  <input
                    type="password"
                    name="password"
                    required
                    className="w-full bg-white/5 border border-white/10 py-3 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-hidden focus:border-cyan-500/50 focus:bg-cyan-950/10 transition-all duration-300"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="pt-4">
                <div className="relative group p-0.5 overflow-hidden shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] transition-all duration-500">
                  {/* Default static border */}
                  <div className="absolute inset-0 bg-white/20 group-hover:opacity-0 transition-opacity duration-300" />
                  
                  {/* Rotating animated border on hover */}
                  <div className="absolute -inset-full opacity-0 group-hover:opacity-100 group-hover:animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_50%,#22d3ee_70%,#3b82f6_85%,#a855f7_100%)] transition-opacity duration-300" />
                  
                  {/* Inner button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="relative flex items-center justify-center gap-2 w-full bg-[#050505] text-white font-bold tracking-widest text-sm uppercase py-4 active:scale-[0.98] transition-transform duration-300 disabled:opacity-70 disabled:cursor-not-allowed z-10"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2 text-cyan-400">
                        <div className="w-5 h-5 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
                        Memproses...
                      </span>
                    ) : (
                      <span className="group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-cyan-400 group-hover:to-blue-400 transition-colors duration-300">
                        MASUK
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-8 text-center text-sm text-gray-500">
              Belum punya akun?{' '}
              <Link 
                href="/signup" 
                className="text-white hover:text-cyan-400 font-medium transition-colors"
              >
                Buat akun baru
              </Link>
            </div>
          </div>
        </div>
      </div>

      <FooterSection />
    </main>
  );
}
