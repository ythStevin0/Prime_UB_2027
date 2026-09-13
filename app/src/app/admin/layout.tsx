import React from 'react';
import { redirect } from 'next/navigation';
import { auth } from '@backend/lib/auth';
import { AdminSidebar } from '../../frontend/components/admin/AdminSidebar';
import { AdminHeader } from '../../frontend/components/admin/AdminHeader';
import PixelBlast from '../../frontend/components/PixelBlast';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Protect Admin Route at the layout level
  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/admin');
  }
  
  if (session.user.role !== 'ADMIN') {
    redirect('/');
  }

  return (
    <div className="flex h-screen w-full bg-[#030712] text-gray-200 overflow-hidden font-sans relative">
      {/* Sci-Fi Ambient Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <PixelBlast
          variant="square"
          pixelSize={4}
          color="#0ea5e9"
          patternScale={2}
          patternDensity={0.8}
          speed={0.8}
          transparent
        />
      </div>
      {/* Sharp grid background for admin */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#22d3ee_1px,transparent_1px),linear-gradient(to_bottom,#22d3ee_1px,transparent_1px)] bg-[length:40px_40px]" />
      </div>

      {/* Sci-Fi HUD Frame */}
      <div className="fixed inset-3 z-50 pointer-events-none border border-cyan-900/30 opacity-70">
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-500" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-500" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-500" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-500" />
      </div>

      <div className="flex flex-1 relative z-10 w-full overflow-hidden animate-[pulse_0.5s_ease-out_1]">
        <AdminSidebar />
        
        <div className="flex flex-col flex-1 relative z-10 w-full overflow-hidden bg-black/40 backdrop-blur-md border-l border-cyan-900/50">
        <AdminHeader user={session.user} />
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
      </div>
    </div>
  );
}
