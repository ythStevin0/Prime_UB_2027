import React from 'react';
import { redirect } from 'next/navigation';
import { auth } from '@backend/lib/auth';
import { User, Mail, Shield, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import LogoutButton from '../../frontend/components/LogoutButton';
import Navbar from '../../frontend/components/Navbar';
import FooterSection from '../../frontend/components/sections/FooterSection';

export default async function ProfilePage() {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-cyan-500/30 flex flex-col relative overflow-hidden">
      <Navbar />
      
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-[20%] left-[10%] w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-cyan-600/10 rounded-full blur-[100px]" />
      </div>
      
      <div className="flex-1 flex items-center justify-center p-6 mt-20 relative z-10">
        <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-none p-8 backdrop-blur-md relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-6">
              <div className="w-24 h-24 bg-blue-500/10 border-2 border-blue-500/30 rounded-none flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.15)] relative">
                <div className="absolute inset-0 bg-blue-400/20 rounded-none animate-pulse blur-xl" />
                <User className="w-12 h-12 text-blue-400 relative z-10" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-center text-gray-100 mb-1">Profil Anda</h1>
            <p className="text-center text-gray-400 text-sm mb-8">Informasi akun terdaftar</p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4 p-4 bg-black/40 rounded-none border border-white/5 hover:border-white/10 transition-colors">
                <User className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-xs text-gray-500 font-medium">Nama Lengkap</p>
                  <p className="text-sm text-gray-200 font-semibold">{session.user.name || 'Tidak ada nama'}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-black/40 rounded-none border border-white/5 hover:border-white/10 transition-colors">
                <Mail className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-xs text-gray-500 font-medium">Email</p>
                  <p className="text-sm text-gray-200 font-semibold">{session.user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-black/40 rounded-none border border-white/5 hover:border-white/10 transition-colors">
                <Shield className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-xs text-gray-500 font-medium">Peran / Role</p>
                  <p className="text-sm text-cyan-400 font-semibold uppercase tracking-wider">{session.user.role === 'ADMIN' ? 'Administrator' : 'Peserta'}</p>
                </div>
              </div>
            </div>

            <LogoutButton />
            
            <div className="mt-8 text-center">
              <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Kembali ke Beranda
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10">
        <FooterSection />
      </div>
    </main>
  );
}
