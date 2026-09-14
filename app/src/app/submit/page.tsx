"use client";

import { useState, useEffect, useRef, ChangeEvent, DragEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/frontend/components/Navbar";
import FooterSection from "@/frontend/components/sections/FooterSection";
import PixelBlast from "@/frontend/components/PixelBlast";
import { Upload, AlertTriangle, CheckCircle2, ChevronDown, File, X } from "lucide-react";
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
  const [registrationStatus, setRegistrationStatus] = useState<string | null>(null);
  const [registrationId, setRegistrationId] = useState<string | null>(null);
  const [checkingRegistration, setCheckingRegistration] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // File upload state
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelection(e.target.files[0]);
    }
  };

  const handleFileSelection = (selectedFile: File) => {
    // Check file size (25MB)
    if (selectedFile.size > 25 * 1024 * 1024) {
      alert("Ukuran file maksimal adalah 25MB.");
      return;
    }
    setFile(selectedFile);
  };
  
  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

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
          setRegistrationStatus(data.data?.status ?? null);
          setRegistrationId(data.data?.registrationId ?? null);
          setHasSubmitted(data.data?.hasSubmitted ?? false);
        } else {
          setIsRegistered(false);
          setRegistrationStatus(null);
          setRegistrationId(null);
          setHasSubmitted(false);
        }
      } catch {
        setIsRegistered(false);
        setRegistrationStatus(null);
        setRegistrationId(null);
        setHasSubmitted(false);
      } finally {
        setCheckingRegistration(false);
      }
    };

    checkRegistration();
  }, [selectedActivity]);

  const handleSubmitFile = async () => {
    if (!file || !registrationId) return;

    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('registrationId', registrationId);
      
      const activityTitle = allActivities.find(a => a.id === selectedActivity)?.title || 'Karya';
      formData.append('title', `Submission for ${activityTitle}`);

      const res = await fetch('/api/submissions', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setSubmissionSuccess(true);
      } else {
        const data = await res.json();
        alert(data.message || 'Gagal mengirimkan file.');
      }
    } catch {
      alert('Terjadi kesalahan sistem.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-0.5 w-16 md:w-24 bg-blue-500" />
              <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-[0.2em] text-blue-500">
                Submit Karya
              </h1>
              <div className="h-0.5 w-16 md:w-24 bg-[#333]" />
            </div>
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
                    className="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white pl-4 pr-10 py-3 outline-none transition-colors appearance-none cursor-pointer rounded-none"
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
                    <div className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-none">
                      <div className="w-5 h-5 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
                      <span className="text-gray-400 text-sm">Memeriksa status pendaftaran...</span>
                    </div>
                  ) : isRegistered ? (
                    <>
                      {registrationStatus === 'PENDING' && (
                        <div className="flex items-start gap-3 p-4 bg-amber-500/10 border border-amber-500/20 rounded-none">
                          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-amber-400 font-medium text-sm">Menunggu verifikasi admin</p>
                            <p className="text-gray-400 text-xs mt-1">
                              Pendaftaran Anda sedang ditinjau. Anda dapat mengirimkan karya setelah pendaftaran disetujui.
                            </p>
                          </div>
                        </div>
                      )}

                      {registrationStatus === 'REJECTED' && (
                        <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-none">
                          <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-red-400 font-medium text-sm">Pendaftaran ditolak</p>
                            <p className="text-gray-400 text-xs mt-1">
                              Mohon maaf, pendaftaran Anda tidak dapat disetujui. Silakan hubungi panitia untuk informasi lebih lanjut.
                            </p>
                          </div>
                        </div>
                      )}

                      {registrationStatus === 'APPROVED' && (
                        <>
                          <div className="flex items-start gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-none">
                            <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                            <div>
                              <p className="text-green-400 font-medium text-sm">Anda sudah terdaftar!</p>
                              <p className="text-gray-400 text-xs mt-1">
                                Anda dapat melanjutkan untuk mengirimkan karya Anda.
                              </p>
                            </div>
                          </div>

                          {/* Upload Area */}
                          {hasSubmitted ? (
                            <div className="mt-8 p-8 border border-blue-500/20 bg-blue-500/5 text-center relative overflow-hidden">
                              <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-500 to-cyan-400" />
                              <CheckCircle2 className="w-12 h-12 text-blue-400 mx-auto mb-4 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                              <h3 className="text-xl font-bold text-blue-400 mb-2 uppercase tracking-widest">Karya Telah Diterima</h3>
                              <p className="text-gray-400 mb-5 max-w-md mx-auto">
                                Anda telah berhasil mengirimkan karya untuk kompetisi ini.
                              </p>
                              <div className="inline-block px-4 py-3 bg-blue-500/10 border border-blue-500/30 text-sm text-blue-300 font-medium">
                                <AlertTriangle className="w-4 h-4 inline-block mr-2 -mt-0.5" />
                                Anda tidak dapat melakukan submit ulang pada kompetisi yang sama.
                              </div>
                            </div>
                          ) : submissionSuccess ? (
                            <div className="mt-8 p-8 border border-green-500/20 bg-green-500/5 text-center">
                              <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto mb-4" />
                              <h3 className="text-xl font-bold text-green-400 mb-2">Berhasil!</h3>
                              <p className="text-gray-400">Karya Anda telah berhasil dikirimkan dan sedang dalam proses review.</p>
                            </div>
                          ) : (
                            <div className="space-y-3 mt-6">
                              <label className="text-sm font-medium text-gray-400">2. Upload Karya Anda</label>
                            
                            <input 
                              type="file" 
                              ref={fileInputRef} 
                              onChange={handleFileChange}
                              className="hidden" 
                              accept=".pdf,.doc,.docx,.ppt,.pptx"
                            />
                            
                            <div 
                              className={`border-2 border-dashed ${isDragging ? 'border-cyan-400 bg-cyan-400/5' : 'border-white/10 hover:border-cyan-500/30'} rounded-none p-10 text-center transition-colors duration-300 cursor-pointer group`}
                              onDragOver={handleDragOver}
                              onDragLeave={handleDragLeave}
                              onDrop={handleDrop}
                              onClick={() => fileInputRef.current?.click()}
                            >
                              {!file ? (
                                <>
                                  <Upload className={`w-10 h-10 ${isDragging ? 'text-cyan-400' : 'text-gray-600 group-hover:text-cyan-400'} mx-auto mb-3 transition-colors`} />
                                  <p className="text-gray-400 text-sm">
                                    Drag & drop file di sini, atau <span className="text-cyan-400">klik untuk browse</span>
                                  </p>
                                  <p className="text-gray-600 text-xs mt-2">PDF, DOC, DOCX, PPT, PPTX (Max. 25MB)</p>
                                </>
                              ) : (
                                <div className="flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
                                  <div className="w-16 h-16 bg-blue-500/10 rounded-none border border-blue-500/20 flex items-center justify-center mb-3">
                                    <File className="w-8 h-8 text-blue-400" />
                                  </div>
                                  <p className="text-white font-medium text-sm max-w-62.5 truncate" title={file.name}>
                                    {file.name}
                                  </p>
                                  <p className="text-gray-500 text-xs mt-1">
                                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                                  </p>
                                  <button 
                                    onClick={removeFile}
                                    className="mt-4 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-red-400 hover:bg-red-400/10 border border-transparent hover:border-red-400/30 transition-all rounded-none flex items-center gap-2"
                                  >
                                    <X className="w-3 h-3" /> Hapus File
                                  </button>
                                </div>
                              )}
                            </div>

                            <div className="flex justify-end pt-4">
                               <button 
                                 onClick={handleSubmitFile}
                                 disabled={!file || isSubmitting}
                                 className={`px-8 py-3 rounded-none font-semibold text-[13px] tracking-wider uppercase transition-all duration-300 ${file && !isSubmitting ? 'bg-cyan-500 text-black hover:bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)]' : 'bg-[#0a0a0a] text-gray-600 border border-white/5 cursor-not-allowed'}`}
                               >
                                 {isSubmitting ? 'Mengirim...' : 'Submit File'}
                               </button>
                            </div>
                          </div>
                          )}
                        </>
                      )}
                    </>
                  ) : (
                    /* Not Registered — show warning */
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-5 bg-amber-500/10 border border-amber-500/20 rounded-none">
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
                        className="block w-full text-center py-3 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-medium rounded-none border border-amber-500/30 transition-colors"
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
