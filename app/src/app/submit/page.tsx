"use client";

import { useState } from "react";
import Navbar from "@/frontend/components/Navbar";
import FooterSection from "@/frontend/components/sections/FooterSection";
import PixelBlast from "@/frontend/components/PixelBlast";
import { User, Mail, Link as LinkIcon, MessageSquare, ChevronDown, CheckCircle2, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { competitionsData } from "@/frontend/data/competitions";
import { eventsData } from "@/frontend/data/events";

export default function SubmitPage() {
  const [formData, setFormData] = useState({
    namaTim: "",
    email: "",
    kegiatan: "",
    tahapSubmit: "",
    linkStorage: "",
    catatan: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Mock API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      console.log("Submission success:", formData);
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
            Submit <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">Karya.</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Kirimkan berkas, paper, atau materi kompetisi tim Anda. Pastikan akses tautan penyimpanan awan (Google Drive) telah dibuka untuk publik.
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
            <h2 className="text-3xl font-bold mb-4">Submit Karya Berhasil!</h2>
            <p className="text-gray-400 mb-8">
              Terima kasih. Kami telah menerima kiriman karya tim Anda. Tim verifikator kami akan segera melakukan pengecekan.
            </p>
            <button 
              onClick={() => {
                setIsSuccess(false);
                setFormData({
                  namaTim: "", email: "", kegiatan: "", tahapSubmit: "", linkStorage: "", catatan: ""
                });
              }}
              className="bg-cyan-600 hover:bg-cyan-500 text-white font-medium py-3 px-8 transition-colors border border-transparent hover:border-white/20"
            >
              Submit Ulang / File Lain
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
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500/50 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500/50 pointer-events-none" />

            <div className="space-y-8">
              
              {/* === IDENTITAS TIM === */}
              <div>
                <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                  <User className="w-5 h-5 text-blue-400" />
                  <h2 className="text-xl font-semibold text-white tracking-wide">Identitas Tim</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Nama Tim */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Nama Tim</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input 
                        type="text" 
                        required
                        placeholder="Nama Tim Anda"
                        value={formData.namaTim}
                        onChange={(e) => setFormData({...formData, namaTim: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 focus:border-cyan-500/50 text-white pl-11 pr-4 py-3 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Email Ketua Tim</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input 
                        type="email" 
                        required
                        placeholder="email@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 focus:border-cyan-500/50 text-white pl-11 pr-4 py-3 outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* === DETAIL KARYA === */}
              <div>
                <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4 pt-4">
                  <FileText className="w-5 h-5 text-cyan-400" />
                  <h2 className="text-xl font-semibold text-white tracking-wide">Detail Karya & Lomba</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Kegiatan */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Kategori Kompetisi/Event</label>
                    <div className="relative">
                      <select 
                        required
                        value={formData.kegiatan}
                        onChange={(e) => setFormData({...formData, kegiatan: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 focus:border-cyan-500/50 text-white px-4 py-3 outline-none transition-colors appearance-none cursor-pointer"
                      >
                        <option value="" disabled className="bg-[#0c0c0c] text-gray-500">Pilih kompetisi...</option>
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

                  {/* Tahap Submit */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Tahap Submit</label>
                    <div className="relative">
                      <select 
                        required
                        value={formData.tahapSubmit}
                        onChange={(e) => setFormData({...formData, tahapSubmit: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 focus:border-cyan-500/50 text-white px-4 py-3 outline-none transition-colors appearance-none cursor-pointer"
                      >
                        <option value="" disabled className="bg-[#0c0c0c] text-gray-500">Pilih tahap...</option>
                        <option value="Abstrak" className="bg-[#0c0c0c] text-white">Abstrak</option>
                        <option value="Proposal" className="bg-[#0c0c0c] text-white">Proposal</option>
                        <option value="Full Paper" className="bg-[#0c0c0c] text-white">Full Paper</option>
                        <option value="Pitch Deck" className="bg-[#0c0c0c] text-white">Pitch Deck</option>
                        <option value="Poster" className="bg-[#0c0c0c] text-white">Poster</option>
                        <option value="Video" className="bg-[#0c0c0c] text-white">Video</option>
                        <option value="Lainnya" className="bg-[#0c0c0c] text-white">Lainnya...</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Link Storage */}
                <div className="space-y-2 mt-6">
                  <label className="text-sm font-medium text-gray-400">Tautan Berkas (G-Drive / Cloud Storage)</label>
                  <div className="relative">
                    <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input 
                      type="url" 
                      required
                      placeholder="https://drive.google.com/..."
                      value={formData.linkStorage}
                      onChange={(e) => setFormData({...formData, linkStorage: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 focus:border-cyan-500/50 text-white pl-11 pr-4 py-3 outline-none transition-colors"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Pastikan hak akses tautan tidak dibatasi (Anyone with the link can view).</p>
                </div>
                
                {/* Catatan Tambahan */}
                <div className="space-y-2 mt-6">
                  <label className="text-sm font-medium text-gray-400">Catatan Tambahan (Opsional)</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-gray-500" />
                    <textarea 
                      rows={4}
                      placeholder="Tambahkan pesan atau keterangan tambahan jika diperlukan..."
                      value={formData.catatan}
                      onChange={(e) => setFormData({...formData, catatan: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 focus:border-cyan-500/50 text-white pl-11 pr-4 py-3 outline-none transition-colors resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* === SUBMIT BUTTON === */}
              <div className="pt-8 border-t border-white/5 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-12 transition-all border border-transparent hover:border-white/20 shadow-[0_0_20px_rgba(34,211,238,0.3)] w-full md:w-auto flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Memproses...
                    </>
                  ) : (
                    "Kirim Karya"
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
