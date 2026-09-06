"use client";

import { useState, useEffect } from "react";
import Navbar from "@/frontend/components/Navbar";
import FooterSection from "@/frontend/components/sections/FooterSection";
import PixelBlast from "@/frontend/components/PixelBlast";
import { User, Mail, Phone, MapPin, Building2, Users, Plus, Trash2, CheckCircle2, ChevronDown, Flag, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signIn } from "next-auth/react";

interface Competition {
  id: string;
  title: string;
  type: 'TEAM' | 'INDIVIDUAL';
}

export default function RegisterPage() {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [isLoadingComps, setIsLoadingComps] = useState(true);
  const { status } = useSession();

  const [formData, setFormData] = useState({
    competitionId: "",
    teamName: "",
    nama: "",
    email: "",
    password: "",
    whatsapp: "",
    domisili: "",
    instansi: "",
    anggota: [] as { name: string; email: string }[],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const res = await fetch('/api/competitions');
        if (res.ok) {
          const json = await res.json();
          setCompetitions(json.data);
        }
      } catch (err) {
        console.error("Failed to load competitions", err);
      } finally {
        setIsLoadingComps(false);
      }
    };
    fetchCompetitions();
  }, []);

  const handleAddAnggota = () => {
    setFormData((prev) => ({
      ...prev,
      anggota: [...prev.anggota, { name: "", email: "" }],
    }));
  };

  const handleRemoveAnggota = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      anggota: prev.anggota.filter((_, i) => i !== index),
    }));
  };

  const handleAnggotaChange = (index: number, field: 'name' | 'email', value: string) => {
    setFormData((prev) => {
      const newAnggota = [...prev.anggota];
      newAnggota[index] = { ...newAnggota[index], [field]: value };
      return { ...prev, anggota: newAnggota };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");
    
    try {
      // 1. Account Creation Logic (if not logged in)
      if (status !== 'authenticated') {
        if (!formData.password) {
          throw new Error("Password wajib diisi untuk pembuatan akun.");
        }
        
        const registerAccountRes = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.nama,
            email: formData.email,
            password: formData.password,
            phone: formData.whatsapp,
            institution: formData.instansi
          }),
        });
        
        const registerAccountData = await registerAccountRes.json();
        if (!registerAccountRes.ok) {
          throw new Error(registerAccountData.error?.message || "Gagal membuat akun.");
        }
        
        // Log them in
        const signInRes = await signIn('credentials', {
          redirect: false,
          email: formData.email,
          password: formData.password,
        });
        
        if (signInRes?.error) {
          throw new Error("Gagal login otomatis setelah pembuatan akun.");
        }
      }

      // 2. Competition Registration Logic
      const payload = {
        competitionId: formData.competitionId,
        teamName: formData.teamName,
        whatsapp: formData.whatsapp,
        domisili: formData.domisili,
        instansi: formData.instansi,
        members: [
          { name: formData.nama, email: formData.email, isLeader: true },
          ...formData.anggota.map(a => ({ name: a.name, email: a.email, isLeader: false }))
        ]
      };

      const res = await fetch('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error?.message || "Gagal melakukan pendaftaran kompetisi.");
      }

      setIsSuccess(true);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : String(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex-1 relative z-0 bg-[#050505] text-white min-h-screen">
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

      <div className="relative z-10 pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-mono tracking-tight text-white mb-4">
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">
                [ Daftar Sekarang ]
              </span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              {status === 'authenticated' 
                ? "Daftarkan diri atau tim Anda ke berbagai kompetisi bergengsi di PRIME UB 2027."
                : "Buat akun Anda dan daftarkan tim ke berbagai kompetisi bergengsi di PRIME UB 2027."
              }
            </p>
          </div>

          <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-500 via-cyan-400 to-purple-500" />
            
            {errorMsg && (
              <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm font-medium">
                {errorMsg}
              </div>
            )}

            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-10">
                
                {/* === PEMILIHAN KOMPETISI === */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-gray-400">Pilih Kompetisi/Acara</label>
                    <div className="relative">
                      <select 
                        required
                        value={formData.competitionId}
                        onChange={(e) => setFormData({...formData, competitionId: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white pl-4 pr-10 py-3 outline-none transition-colors appearance-none cursor-pointer"
                        disabled={isLoadingComps}
                      >
                        <option value="" disabled className="text-gray-900">
                          {isLoadingComps ? "Memuat..." : "Pilih kompetisi atau acara..."}
                        </option>
                        {competitions.map(c => (
                          <option key={c.id} value={c.id} className="text-gray-900">
                            {c.title} ({c.type})
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                    </div>
                  </div>

                  {competitions.find(c => c.id === formData.competitionId)?.type === 'TEAM' && (
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-gray-400">Nama Tim</label>
                      <div className="relative">
                        <Flag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input 
                          type="text" 
                          required
                          placeholder="Contoh: Maju Jaya"
                          value={formData.teamName}
                          onChange={(e) => setFormData({...formData, teamName: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white pl-11 pr-4 py-3 outline-none transition-colors"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* === KETUA KELOMPOK === */}
                <div>
                  <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                    <User className="w-5 h-5 text-blue-400" />
                    <h2 className="text-xl font-semibold text-white tracking-wide">Data Ketua Kelompok</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Nama Lengkap */}
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-gray-400">Nama Lengkap</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input 
                          type="text" 
                          required
                          placeholder="John Doe"
                          value={formData.nama}
                          onChange={(e) => setFormData({...formData, nama: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white pl-11 pr-4 py-3 outline-none transition-colors"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input 
                          type="email" 
                          required
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white pl-11 pr-4 py-3 outline-none transition-colors"
                        />
                      </div>
                    </div>

                    {/* Password */}
                    {status !== 'authenticated' && (
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Password Akun Baru</label>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                          <input
                            type="password"
                            required
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white pl-11 pr-4 py-3 outline-none transition-colors"
                            placeholder="Buat password akun Anda"
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Sudah punya akun? <a href="/login?callbackUrl=/register" className="text-cyan-400 hover:underline">Login disini</a>.
                        </p>
                      </div>
                    )}

                    {/* WhatsApp */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">Nomor WhatsApp</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input 
                          type="tel" 
                          required
                          placeholder="08123456789"
                          value={formData.whatsapp}
                          onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white pl-11 pr-4 py-3 outline-none transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* === DATA INSTANSI === */}
                <div>
                  <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4 pt-4">
                    <Building2 className="w-5 h-5 text-cyan-400" />
                    <h2 className="text-xl font-semibold text-white tracking-wide">Data Kelompok & Instansi</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Instansi */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">Nama Instansi (Sekolah/Kampus)</label>
                      <div className="relative">
                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input 
                          type="text" 
                          required
                          placeholder="Universitas Brawijaya"
                          value={formData.instansi}
                          onChange={(e) => setFormData({...formData, instansi: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white pl-11 pr-4 py-3 outline-none transition-colors"
                        />
                      </div>
                    </div>

                    {/* Domisili */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">Domisili (Kota/Kabupaten)</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input 
                          type="text" 
                          required
                          placeholder="Kota Malang"
                          value={formData.domisili}
                          onChange={(e) => setFormData({...formData, domisili: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white pl-11 pr-4 py-3 outline-none transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* === ANGGOTA KELOMPOK (ONLY FOR TEAM COMPETITIONS) === */}
                {competitions.find(c => c.id === formData.competitionId)?.type === 'TEAM' && (
                  <div>
                    <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4 pt-4">
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-purple-400" />
                        <h2 className="text-xl font-semibold text-white tracking-wide">Anggota Kelompok</h2>
                      </div>
                      <span className="text-xs text-gray-500">Opsional</span>
                    </div>

                    <div className="space-y-4">
                      <AnimatePresence>
                        {formData.anggota.map((member, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-4 items-end bg-white/5 p-4 rounded-xl border border-white/10"
                          >
                            <div className="space-y-2">
                              <label className="text-xs font-medium text-gray-400">Nama Anggota {index + 1}</label>
                              <input 
                                type="text" 
                                required
                                placeholder="Nama Lengkap"
                                value={member.name}
                                onChange={(e) => handleAnggotaChange(index, 'name', e.target.value)}
                                className="w-full bg-[#050505] border border-white/10 focus:border-purple-500/50 text-white px-4 py-2 outline-none transition-colors text-sm"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-xs font-medium text-gray-400">Email Anggota {index + 1}</label>
                              <input 
                                type="email" 
                                required
                                placeholder="Email Anggota"
                                value={member.email}
                                onChange={(e) => handleAnggotaChange(index, 'email', e.target.value)}
                                className="w-full bg-[#050505] border border-white/10 focus:border-purple-500/50 text-white px-4 py-2 outline-none transition-colors text-sm"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveAnggota(index)}
                              className="p-2 text-gray-500 hover:text-red-400 bg-[#050505] border border-white/10 rounded-lg transition-colors h-9.5 flex items-center justify-center w-full md:w-auto"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </motion.div>
                        ))}
                      </AnimatePresence>

                      <button
                        type="button"
                        onClick={handleAddAnggota}
                        className="flex items-center gap-2 text-sm font-medium text-fuchsia-400 hover:text-fuchsia-300 py-2 border-b border-transparent hover:border-fuchsia-400/50 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        Tambah Anggota
                      </button>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-6">
                  <div className="relative group p-0.5 overflow-hidden rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] transition-all duration-500">
                    {/* Default static border */}
                    <div className="absolute inset-0 bg-white/20 group-hover:opacity-0 transition-opacity duration-300" />
                    
                    {/* Rotating animated border on hover */}
                    <div className="absolute -inset-full opacity-0 group-hover:opacity-100 group-hover:animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_50%,#22d3ee_70%,#3b82f6_85%,#a855f7_100%)] transition-opacity duration-300" />
                    
                    {/* Inner button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="relative flex items-center justify-center gap-2 w-full bg-[#050505] text-white font-bold tracking-widest text-sm uppercase py-4 rounded-[10px] active:scale-[0.98] transition-transform duration-300 disabled:opacity-70 disabled:cursor-not-allowed z-10"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2 text-cyan-400">
                          <div className="w-5 h-5 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
                          Memproses...
                        </span>
                      ) : (
                        <span className="group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-cyan-400 group-hover:to-blue-400 transition-colors duration-300">
                          SUBMIT PENDAFTARAN
                        </span>
                      )}
                    </button>
                  </div>
                  <p className="text-center text-xs text-gray-500 mt-4">
                    Dengan mendaftar, Anda menyetujui syarat & ketentuan yang berlaku
                  </p>
                </div>
              </form>
            ) : (
              /* Success State */
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-6"
              >
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto border border-green-500/30">
                  <CheckCircle2 className="w-10 h-10 text-green-400" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold text-white">Pendaftaran Berhasil!</h2>
                  <p className="text-gray-400 max-w-md mx-auto">
                    Terima kasih telah mendaftar. Kami telah mengirimkan detail pendaftaran ke email Anda. Tim kami akan segera memverifikasi data Anda.
                  </p>
                </div>
                <div className="pt-8">
                  <button 
                    onClick={() => {
                      setFormData({
                        competitionId: "",
                        teamName: "",
                        nama: "",
                        email: "",
                        password: "",
                        whatsapp: "",
                        domisili: "",
                        instansi: "",
                        anggota: [],
                      });
                      setIsSuccess(false);
                    }}
                    className="px-8 py-3 bg-white/10 hover:bg-white/15 text-white font-medium rounded-lg transition-colors border border-white/20"
                  >
                    Daftar Kompetisi Lain
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <FooterSection />
    </main>
  );
}
