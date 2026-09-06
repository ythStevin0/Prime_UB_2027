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
        <h1 className="text-3xl font-bold text-white tracking-tight">Registrations</h1>
        <p className="text-gray-400 mt-1">Review and approve participants or teams.</p>
      </div>

      <AdminCard className="p-0! overflow-hidden">
        <div className="p-4 border-b border-white/10 flex gap-4 bg-white/5">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search by team or user ID..." 
              className="w-full bg-black/40 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/10 text-xs uppercase tracking-wider text-gray-400">
                <th className="px-6 py-4 font-semibold">Reg ID</th>
                <th className="px-6 py-4 font-semibold">User ID</th>
                <th className="px-6 py-4 font-semibold">Competition ID</th>
                <th className="px-6 py-4 font-semibold">Team Name</th>
                <th className="px-6 py-4 font-semibold">Instansi</th>
                <th className="px-6 py-4 font-semibold">WhatsApp</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
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
                  <tr key={reg.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4 text-sm text-gray-400">
                      <span title={reg.id}>{reg.id.substring(0, 8)}...</span>
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
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                        reg.status === 'APPROVED' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                        reg.status === 'REJECTED' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                        'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
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
