import React from 'react';
import { Users, CheckCircle, Clock } from 'lucide-react';
import { AdminCard } from '../../frontend/components/admin/AdminCard';
import { db } from '@backend/lib/db';
import { registrations, passwordResetRequests } from '@backend/lib/db/schema';
import { sql } from 'drizzle-orm';

export default async function AdminDashboardPage() {
  // Fetch real metrics from DB
  const [totalRegs] = await db.select({ count: sql<number>`count(*)` }).from(registrations);
  const [pendingRegs] = await db.select({ count: sql<number>`count(*)` }).from(registrations).where(sql`${registrations.status} = 'PENDING'`);
  const [approvedRegs] = await db.select({ count: sql<number>`count(*)` }).from(registrations).where(sql`${registrations.status} = 'APPROVED'`);
  const [pendingResets] = await db.select({ count: sql<number>`count(*)` }).from(passwordResetRequests).where(sql`${passwordResetRequests.status} = 'PENDING'`);

  const stats = [
    { name: 'Total Registrations', value: totalRegs.count || 0, icon: Users, color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
    { name: 'Pending Approvals', value: pendingRegs.count || 0, icon: Clock, color: 'text-amber-400', bg: 'bg-amber-400/10' },
    { name: 'Approved Teams', value: approvedRegs.count || 0, icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    { name: 'Pending Password Resets', value: pendingResets.count || 0, icon: Clock, color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 
          className="text-4xl font-mono font-bold text-cyan-400 tracking-widest uppercase flex items-center gap-3"
          style={{ textShadow: '2px 0px 0px rgba(220, 38, 38, 0.6), -2px 0px 0px rgba(6, 182, 212, 0.6)' }}
        >
          <span className="w-5 h-5 bg-cyan-500" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }} />
          Dashboard Overview
        </h1>
        <p 
          className="text-gray-400 mt-2 font-mono text-sm tracking-widest uppercase"
          style={{ textShadow: '1px 0px 0px rgba(220, 38, 38, 0.5), -1px 0px 0px rgba(6, 182, 212, 0.5)' }}
        >
          SYSTEM INITIALIZED. AWAITING COMMAND.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <AdminCard key={i} className="flex items-center p-6 gap-4">
            <div className={`p-4 border ${stat.bg.replace('/10', '/20')} border-${stat.color.split('-')[1]}-500/30`}>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
            <div>
              <p className="text-xs font-mono font-medium text-gray-400 tracking-widest uppercase">{stat.name}</p>
              <p className="text-4xl font-mono font-bold text-white mt-1 tracking-tight">{String(stat.value).padStart(2, '0')}</p>
            </div>
          </AdminCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AdminCard title="Recent Activity">
          <div className="text-center py-10 text-gray-500">
            <p>Activity logs will appear here.</p>
          </div>
        </AdminCard>
        
        <AdminCard title="Quick Actions">
          <div className="grid grid-cols-2 gap-4">
            <a href="/admin/registrations" className="relative group flex items-center justify-center p-4 bg-cyan-950/20 hover:bg-cyan-900/40 border border-cyan-900/50 transition-colors text-sm font-mono font-medium text-cyan-400 tracking-widest uppercase overflow-hidden">
              <span className="group-hover:-translate-x-2 transition-transform">[</span>
              <span className="mx-2 relative z-10">Review Regs</span>
              <span className="group-hover:translate-x-2 transition-transform">]</span>
              <div className="absolute top-0 left-0 w-full h-0.5 bg-cyan-400 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </a>
            <a href="/admin/password-resets" className="relative group flex items-center justify-center p-4 bg-cyan-950/20 hover:bg-cyan-900/40 border border-cyan-900/50 transition-colors text-sm font-mono font-medium text-cyan-400 tracking-widest uppercase overflow-hidden">
              <span className="group-hover:-translate-x-2 transition-transform">[</span>
              <span className="mx-2 relative z-10">Reset PWD</span>
              <span className="group-hover:translate-x-2 transition-transform">]</span>
              <div className="absolute top-0 left-0 w-full h-0.5 bg-cyan-400 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </a>
          </div>
        </AdminCard>
      </div>
    </div>
  );
}
