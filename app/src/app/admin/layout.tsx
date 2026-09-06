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
    <div className="flex h-screen w-full bg-[#0a0a0a] text-gray-200 overflow-hidden font-sans">
      {/* Background ambient glow specific to admin */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-600/20 rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px]" />
      </div>

      <AdminSidebar />
      
      <div className="flex flex-col flex-1 relative z-10 w-full overflow-hidden">
        <AdminHeader user={session.user} />
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
