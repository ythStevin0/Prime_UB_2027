"use client";

import { useState } from "react";
import Navbar from "@/frontend/components/Navbar";
import FooterSection from "@/frontend/components/sections/FooterSection";
import PixelBlast from "@/frontend/components/PixelBlast";
import { User, Mail, Phone, MapPin, Building2, Users, Plus, Trash2, CheckCircle2, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { competitionsData } from "@/frontend/data/competitions";
import { eventsData } from "@/frontend/data/events";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    kegiatan: "",
    nama: "",
    email: "",
    whatsapp: "",
    domisili: "",
    instansi: "",
    anggota: [] as string[],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleAddAnggota = () => {
    setFormData((prev) => ({
      ...prev,
      anggota: [...prev.anggota, ""],
    }));
  };

  const handleRemoveAnggota = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      anggota: prev.anggota.filter((_, i) => i !== index),
    }));
  };

  const handleAnggotaChange = (index: number, value: string) => {
    setFormData((prev) => {
      const newAnggota = [...prev.anggota];
      newAnggota[index] = value;
      return { ...prev, anggota: newAnggota };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Mock API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      console.log("Form submitted:", formData);
    }, 2000);
  };

  return (
    <main className="flex-1 relative z-0 bg-[#050505] text-white min-h-screen">
      <Navbar />

      {/* Background styling */}
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

      <div className="relative z-10 max-w-4xl mx-auto pt-32 pb-24 px-6 md:px-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Daftar <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">Sekarang.</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Bergabunglah dalam revolusi energi masa depan. Daftarkan tim Anda untuk berpartisipasi dalam PRIME UB 2027.
          </p>
        </div>

        {isSuccess ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass bg-[#0c0c0c]/80 border border-cyan-500/30 p-12 text-center shadow-[0_0_40px_rgba(34,211,238,0.15)]"
          >
            <div className="mx-auto w-20 h-20 bg-cyan-500/10 flex items-center justify-center rounded-full mb-6">
              <CheckCircle2 className="w-10 h-10 text-cyan-400" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Pendaftaran Berhasil!</h2>
            <p className="text-gray-400 mb-8">
              Terima kasih telah mendaftar. Kami telah menerima data tim Anda dan akan segera menghubungi Anda melalui Email atau WhatsApp.
            </p>
            <button 
              onClick={() => {
                setIsSuccess(false);
                setFormData({
                  kegiatan: "", nama: "", email: "", whatsapp: "", domisili: "", instansi: "", anggota: []
                });
              }}
              className="bg-cyan-600 hover:bg-cyan-500 text-white font-medium py-3 px-8 transition-colors border border-transparent hover:border-white/20"
            >
              Daftar Tim Lain
            </button>
          </motion.div>
        ) : (
          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="glass bg-[#0c0c0c]/80 border border-white/10 p-8 md:p-12 shadow-2xl relative"
          >
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-500/50 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-500/50 pointer-events-none" />

            <div className="space-y-8">
              
              {/* === KEGIATAN === */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Kegiatan yang akan diikuti</label>
                <div className="relative">
                  <select 
                    required
                    value={formData.kegiatan}
                    onChange={(e) => setFormData({...formData, kegiatan: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white px-4 py-3 outline-none transition-colors appearance-none cursor-pointer"
                  >
                    <option value="" disabled className="bg-[#0c0c0c] text-gray-500">Pilih kompetisi atau acara...</option>
                    <optgroup label="Competitions" className="bg-[#0c0c0c] text-blue-400">
                      {competitionsData.map(c => (
                        <option key={c.id} value={c.title} className="text-white">{c.title}</option>
                      ))}
                    </optgroup>
                    <optgroup label="Events" className="bg-[#0c0c0c] text-cyan-400">
                      {eventsData.map(e => (
                        <option key={e.id} value={`${e.title} ${e.titleHighlight}`} className="text-white">{e.title} {e.titleHighlight}</option>
                      ))}
                    </optgroup>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>

              {/* === KETUA KELOMPOK === */}
              <div>
                <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                  <User className="w-5 h-5 text-blue-400" />
                  <h2 className="text-xl font-semibold text-white tracking-wide">Data Ketua Kelompok</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Nama Lengkap */}
                  <div className="space-y-2">
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
                        className="w-full bg-white/5 border border-white/10 focus:border-cyan-500/50 text-white pl-11 pr-4 py-3 outline-none transition-colors"
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
                        className="w-full bg-white/5 border border-white/10 focus:border-cyan-500/50 text-white pl-11 pr-4 py-3 outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* === ANGGOTA KELOMPOK === */}
              <div>
                <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4 pt-4">
                  <Users className="w-5 h-5 text-fuchsia-400" />
                  <h2 className="text-xl font-semibold text-white tracking-wide">Anggota Kelompok</h2>
                </div>
                
                <div className="space-y-4">
                  <AnimatePresence>
                    {formData.anggota.map((member, index) => (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        key={index}
                        className="flex gap-4 items-start"
                      >
                        <div className="flex-1 space-y-2">
                          <label className="text-sm font-medium text-gray-400">Nama Anggota {index + 1}</label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input 
                              type="text" 
                              required
                              placeholder={`Nama lengkap anggota ${index + 1}`}
                              value={member}
                              onChange={(e) => handleAnggotaChange(index, e.target.value)}
                              className="w-full bg-white/5 border border-white/10 focus:border-fuchsia-500/50 text-white pl-11 pr-4 py-3 outline-none transition-colors"
                            />
                          </div>
                        </div>
                        <button 
                          type="button"
                          onClick={() => handleRemoveAnggota(index)}
                          className="mt-7 p-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-colors"
                          title="Hapus Anggota"
                        >
                          <Trash2 className="w-5 h-5" />
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

              {/* === SUBMIT BUTTON === */}
              <div className="pt-8 border-t border-white/5 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-12 transition-all border border-transparent hover:border-white/20 shadow-[0_0_20px_rgba(37,99,235,0.3)] w-full md:w-auto flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Memproses...
                    </>
                  ) : (
                    "Kirim Pendaftaran"
                  )}
                </button>
              </div>

            </div>
          </motion.form>
        )}
      </div>

      <FooterSection />
    </main>
  );
}
