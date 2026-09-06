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
        <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard Overview</h1>
        <p className="text-gray-400 mt-1">Welcome back. Here is what&apos;s happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <AdminCard key={i} className="flex items-center p-6 gap-4">
            <div className={`p-4 rounded-xl ${stat.bg}`}>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-400">{stat.name}</p>
              <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
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
            <a href="/admin/registrations" className="flex items-center justify-center p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors text-sm font-medium text-white">
              Review Registrations
            </a>
            <a href="/admin/password-resets" className="flex items-center justify-center p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors text-sm font-medium text-white">
              Password Resets
            </a>
          </div>
        </AdminCard>
      </div>
    </div>
  );
}
