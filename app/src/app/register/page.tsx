"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/frontend/components/Navbar";
import FooterSection from "@/frontend/components/sections/FooterSection";
import PixelBlast from "@/frontend/components/PixelBlast";
import { User, Mail, Phone, MapPin, Building2, Users, Plus, Trash2, CheckCircle2, ChevronDown, Flag, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import { competitionsData } from "@/frontend/data/competitions";
import { eventsData } from "@/frontend/data/events";

// Build unified list of competitions + events for the dropdown
const allActivities = [
  ...competitionsData.map(c => ({ id: c.id, title: c.title, type: 'TEAM' as const, category: 'competition' })),
  ...eventsData.map(e => ({ id: e.id, title: `${e.title}${e.titleHighlight ? ' ' + e.titleHighlight : ''}`, type: 'INDIVIDUAL' as const, category: 'event' })),
];

export default function RegisterPage() {
  const { status } = useSession();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/register');
    }
  }, [status, router]);

  const [formData, setFormData] = useState({
    competitionId: "",
    teamName: "",
    nama: "",
    email: "",
    whatsapp: "",
    domisili: "",
    instansi: "",
    anggota: [] as { name: string; email: string }[],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const selectedActivity = allActivities.find(a => a.id === formData.competitionId);

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

  // Show nothing while checking auth
  if (status === 'loading' || status === 'unauthenticated') {
    return (
      <main className="flex-1 relative z-0 bg-[#050505] text-white min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
      </main>
    );
  }

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
              Daftarkan diri atau tim Anda ke berbagai kompetisi dan acara bergengsi di PRIME UB 2027.
            </p>
          </div>

          <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 p-6 md:p-10 shadow-2xl relative overflow-hidden">
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
                      >
                        <option value="" disabled className="text-gray-900">
                          Pilih kompetisi atau acara...
                        </option>
                        <optgroup label="── Competitions ──" className="text-gray-900">
                          {allActivities.filter(a => a.category === 'competition').map(c => (
                            <option key={c.id} value={c.id} className="text-gray-900">
                              {c.title} ({c.type})
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

                  {selectedActivity?.type === 'TEAM' && (
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
                      <p className="text-xs text-amber-400/80 flex items-center gap-1.5 mt-1">
                        <Info className="w-3.5 h-3.5 shrink-0" />
                        Gunakan email aktif untuk menerima informasi terkait pendaftaran via Gmail.
                      </p>
                    </div>

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
                {selectedActivity?.type === 'TEAM' && (
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
                    <div className="absolute inset-0 bg-white/20 group-hover:opacity-0 transition-opacity duration-300" />
                    <div className="absolute -inset-full opacity-0 group-hover:opacity-100 group-hover:animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_50%,#22d3ee_70%,#3b82f6_85%,#a855f7_100%)] transition-opacity duration-300" />
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
