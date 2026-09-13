"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/frontend/components/Navbar";
import FooterSection from "@/frontend/components/sections/FooterSection";
import PixelBlast from "@/frontend/components/PixelBlast";
import { User, Mail, Phone, Building2, Lock, Info, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useSession, signIn } from "next-auth/react";

export default function SignUpPage() {
  const { status } = useSession();
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [status, router]);

  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    password: "",
    confirmPassword: "",
    whatsapp: "",
    instansi: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("Password dan konfirmasi password tidak cocok.");
      setIsSubmitting(false);
      return;
    }

    if (formData.password.length < 8) {
      setErrorMsg("Password minimal 8 karakter.");
      setIsSubmitting(false);
      return;
    }
    
    try {
      const res = await fetch('/api/identity/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.nama,
          email: formData.email,
          password: formData.password,
          phone: formData.whatsapp,
          institution: formData.instansi,
        }),
      });
      
      const data = await res.json();
      if (!res.ok) {
        // Handle Zod validation issues if present
        if (data.error?.issues && Array.isArray(data.error.issues) && data.error.issues.length > 0) {
          throw new Error(data.error.issues[0].message);
        }
        throw new Error(data.error?.message || data.message || "Gagal membuat akun.");
      }
      
      // Auto login
      const signInRes = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });
      
      if (signInRes?.error) {
        throw new Error("Akun berhasil dibuat, tetapi gagal login otomatis. Silakan login manual.");
      }

      setIsSuccess(true);
      // Redirect to home after short delay
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : String(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === 'loading' || status === 'authenticated') {
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
        <div className="w-full max-w-lg">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold font-mono tracking-tight text-white mb-3">
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">
                [ Sign In ]
              </span>
            </h1>
            <p className="text-gray-400 text-sm">
              Buat akun PRIME UB 2027 Anda untuk mendaftar kompetisi dan event
            </p>
          </div>

          <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-500 via-cyan-400 to-purple-500" />
            
            {errorMsg && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium text-center">
                {errorMsg}
              </div>
            )}

            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Nama */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Nama Lengkap</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
                    <input
                      type="text"
                      required
                      value={formData.nama}
                      onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 py-3 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-hidden focus:border-cyan-500/50 focus:bg-cyan-950/10 transition-all duration-300"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Email</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 py-3 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-hidden focus:border-cyan-500/50 focus:bg-cyan-950/10 transition-all duration-300"
                      placeholder="contoh@gmail.com"
                    />
                  </div>
                  <p className="text-xs text-amber-400/80 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 shrink-0" />
                    Gunakan email aktif untuk menerima informasi terkait pendaftaran via Gmail.
                  </p>
                </div>

                {/* Password */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Password</label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
                      <input
                        type="password"
                        required
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 py-3 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-hidden focus:border-cyan-500/50 focus:bg-cyan-950/10 transition-all duration-300"
                        placeholder="Min. 8 karakter"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Konfirmasi Password</label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
                      <input
                        type="password"
                        required
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 py-3 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-hidden focus:border-cyan-500/50 focus:bg-cyan-950/10 transition-all duration-300"
                        placeholder="Ulangi password"
                      />
                    </div>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Nomor WhatsApp</label>
                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
                    <input
                      type="tel"
                      required
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 py-3 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-hidden focus:border-cyan-500/50 focus:bg-cyan-950/10 transition-all duration-300"
                      placeholder="08123456789"
                    />
                  </div>
                </div>

                {/* Instansi */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Instansi (Sekolah/Kampus)</label>
                  <div className="relative group">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
                    <input
                      type="text"
                      value={formData.instansi}
                      onChange={(e) => setFormData({ ...formData, instansi: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 py-3 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-hidden focus:border-cyan-500/50 focus:bg-cyan-950/10 transition-all duration-300"
                      placeholder="Universitas Brawijaya (opsional)"
                    />
                  </div>
                </div>

                {/* Submit */}
                <div className="pt-4">
                  <div className="relative group p-0.5 overflow-hidden shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] transition-all duration-500">
                    <div className="absolute inset-0 bg-white/20 group-hover:opacity-0 transition-opacity duration-300" />
                    <div className="absolute -inset-full opacity-0 group-hover:opacity-100 group-hover:animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_50%,#22d3ee_70%,#3b82f6_85%,#a855f7_100%)] transition-opacity duration-300" />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="relative flex items-center justify-center gap-2 w-full bg-[#050505] text-white font-bold tracking-widest text-sm uppercase py-4 active:scale-[0.98] transition-transform duration-300 disabled:opacity-70 disabled:cursor-not-allowed z-10"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2 text-cyan-400">
                          <div className="w-5 h-5 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
                          Memproses...
                        </span>
                      ) : (
                        <span className="group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-cyan-400 group-hover:to-blue-400 transition-colors duration-300">
                          BUAT AKUN
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10 text-center space-y-4"
              >
                <div className="w-16 h-16 bg-green-500/20 flex items-center justify-center mx-auto border border-green-500/30">
                  <CheckCircle2 className="w-8 h-8 text-green-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">Akun Berhasil Dibuat!</h2>
                <p className="text-gray-400 text-sm">Anda akan diarahkan ke halaman utama...</p>
              </motion.div>
            )}

            <div className="mt-8 text-center text-sm text-gray-500">
              Sudah punya akun?{' '}
              <Link 
                href="/login" 
                className="text-white hover:text-cyan-400 font-medium transition-colors"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>

      <FooterSection />
    </main>
  );
}
