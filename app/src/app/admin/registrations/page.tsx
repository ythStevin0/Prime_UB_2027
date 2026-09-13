import React from 'react';
import { Search } from 'lucide-react';
import { AdminCard } from '../../../frontend/components/admin/AdminCard';
import { RegistrationActionRow } from '../../../frontend/components/admin/RegistrationActionRow';
import { registrationService } from '@backend/modules/registrations/services/registration.service';

export default async function AdminRegistrationsPage() {
  // Fetch registrations
  const result = await registrationService.getAdminRegistrations({}, 1, 100);

  // Since registrationService returns competitionId, we might want to map it to a competition name if we need, 
  // but let's just display what we have for now. The Admin can look up competitions.

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-mono font-bold text-cyan-400 tracking-tighter uppercase flex items-center gap-2">
          <span className="w-4 h-4 bg-cyan-500 animate-pulse" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }} />
          REGISTRATIONS
        </h1>
        <p className="text-gray-400 mt-1 font-mono text-sm tracking-wide">SYSTEM QUERY: PARTICIPANTS & TEAMS</p>
      </div>

      <AdminCard className="p-0! overflow-hidden">
        <div className="p-4 border-b border-cyan-900/50 flex gap-4 bg-cyan-950/20">
          <div className="relative flex-1 max-w-md group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-500/50 group-focus-within:text-cyan-400" />
            <input 
              type="text" 
              placeholder="QUERY> _" 
              className="w-full bg-[#050505] border border-cyan-900/50 pl-10 pr-4 py-2 text-cyan-400 font-mono text-sm placeholder-cyan-900/70 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all shadow-[inset_0_0_10px_rgba(6,182,212,0.05)]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/10 text-xs uppercase tracking-wider text-gray-400">
                <th className="px-6 py-4 font-mono font-medium tracking-widest text-cyan-500/70">Reg ID</th>
                <th className="px-6 py-4 font-mono font-medium tracking-widest text-cyan-500/70">User ID</th>
                <th className="px-6 py-4 font-mono font-medium tracking-widest text-cyan-500/70">Competition ID</th>
                <th className="px-6 py-4 font-mono font-medium tracking-widest text-cyan-500/70">Team Name</th>
                <th className="px-6 py-4 font-mono font-medium tracking-widest text-cyan-500/70">Instansi</th>
                <th className="px-6 py-4 font-mono font-medium tracking-widest text-cyan-500/70">WhatsApp</th>
                <th className="px-6 py-4 font-mono font-medium tracking-widest text-cyan-500/70">Status</th>
                <th className="px-6 py-4 font-mono font-medium tracking-widest text-cyan-500/70 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {result.data.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No registrations found.
                  </td>
                </tr>
              ) : (
                result.data.map((reg) => (
                  <tr key={reg.id} className="group hover:bg-cyan-950/20 transition-colors relative">
                    <td className="px-6 py-4 font-mono text-xs text-cyan-500/50 group-hover:text-cyan-400 transition-colors">
                      {reg.id.split('-')[0]}
                    </td>
                    <td className="px-6 py-4 text-sm text-white">
                      {reg.userId}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">
                      <span title={reg.competitionId}>{reg.competitionId.substring(0, 8)}...</span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-white">
                      {reg.teamName || <span className="text-gray-500 italic">Individual</span>}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {reg.instansi || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {reg.whatsapp || '-'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 text-[10px] font-mono tracking-widest uppercase border-l-2 ${
                        reg.status === 'PENDING' 
                          ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500 shadow-[inset_2px_0_5px_rgba(234,179,8,0.2)]' 
                          : reg.status === 'APPROVED'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500 shadow-[inset_2px_0_5px_rgba(16,185,129,0.2)]'
                            : 'bg-red-500/10 text-red-400 border-red-500 shadow-[inset_2px_0_5px_rgba(239,68,68,0.2)]'
                      }`}>
                        {reg.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <RegistrationActionRow registrationId={reg.id} currentStatus={reg.status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </AdminCard>
    </div>
  );
}
