import React from 'react';
import { redirect } from 'next/navigation';
import { auth } from '@backend/lib/auth';
import { AdminSidebar } from '../../frontend/components/admin/AdminSidebar';
import { AdminHeader } from '../../frontend/components/admin/AdminHeader';

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
      {/* Clean Dark Background */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[#050505]" />

      <div className="flex flex-1 relative z-10 w-full overflow-hidden animate-[pulse_0.5s_ease-out_1]">
        <AdminSidebar />
        
        <div className="flex flex-col flex-1 relative z-10 w-full overflow-hidden bg-[#0a0a0a]">
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
