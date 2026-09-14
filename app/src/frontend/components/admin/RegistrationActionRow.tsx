'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { Check, X, Loader2, Eye } from 'lucide-react';

interface RegistrationMember {
  id: string;
  name: string;
  email: string;
  isLeader: boolean;
  studentIdCardUrl?: string;
  proofOfEnrollmentUrl?: string;
}

interface RegistrationData {
  id: string;
  status: string;
  competitionId: string;
  teamName?: string;
  instansi?: string;
  whatsapp?: string;
  domisili?: string;
  createdAt?: string | Date;
  members?: RegistrationMember[];
}

interface RegistrationActionRowProps {
  registration: RegistrationData;
}

export function RegistrationActionRow({ registration }: RegistrationActionRowProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const registrationId = registration.id;
  const currentStatus = registration.status;

  async function updateStatus(status: 'APPROVED' | 'REJECTED') {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/registrations/${registrationId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) {
        throw new Error('Failed to update status');
      }

      router.refresh(); // Refresh RSC
    } catch (err) {
      console.error(err);
      alert('Failed to update registration status');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-end p-2">
        <Loader2 className="w-5 h-5 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className="flex justify-end gap-2">
      <button 
        onClick={() => updateStatus('APPROVED')}
        disabled={currentStatus === 'APPROVED'}
        className="p-2 bg-emerald-950/30 text-emerald-500 hover:bg-emerald-900/50 disabled:opacity-30 disabled:hover:bg-emerald-950/30 border border-emerald-900/50 hover:border-emerald-500 hover:text-emerald-400 transition-all relative group overflow-hidden"
        title="Approve"
      >
        <div className="absolute inset-0 border border-emerald-400/0 group-hover:border-emerald-400/50 scale-150 group-hover:scale-100 transition-all duration-300" style={{ clipPath: 'polygon(0 0, 4px 0, 4px 100%, 0 100%)' }} />
        <div className="absolute inset-0 border border-emerald-400/0 group-hover:border-emerald-400/50 scale-150 group-hover:scale-100 transition-all duration-300" style={{ clipPath: 'polygon(calc(100% - 4px) 0, 100% 0, 100% 100%, calc(100% - 4px) 100%)' }} />
        <Check className="w-4 h-4 relative z-10 group-hover:scale-110 transition-transform" />
      </button>
      <button 
        onClick={() => updateStatus('REJECTED')}
        disabled={currentStatus === 'REJECTED'}
        className="p-2 bg-red-950/30 text-red-500 hover:bg-red-900/50 disabled:opacity-30 disabled:hover:bg-red-950/30 border border-red-900/50 hover:border-red-500 hover:text-red-400 transition-all relative group overflow-hidden"
        title="Reject"
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAiLz4KPHBhdGggZD0iTTAgMEw0IDRaTTAgNEw0IDBaIiBzdHJva2U9IiNmZjAwMDAiIHN0cm9rZS1vcGFjaXR5PSIwLjMiIHN0cm9rZS13aWR0aD0iMSIvPgo8L3N2Zz4=')] opacity-0 group-hover:opacity-100 transition-opacity" />
        <X className="w-4 h-4 relative z-10 group-hover:scale-110 group-hover:rotate-90 transition-transform duration-300" />
      </button>
      <button 
        onClick={() => setIsModalOpen(true)}
        className="p-2 bg-blue-950/30 text-blue-500 hover:bg-blue-900/50 border border-blue-900/50 hover:border-blue-500 hover:text-blue-400 transition-all relative group overflow-hidden"
        title="View Details"
      >
        <Eye className="w-4 h-4 relative z-10 group-hover:scale-110 transition-transform" />
      </button>

      {isModalOpen && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#0a0a0a] border border-cyan-900/50 p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto text-left relative shadow-2xl rounded-sm">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h2 className="text-xl font-mono font-bold text-cyan-400 mb-6 uppercase border-b border-white/10 pb-4">
              Registration Details
            </h2>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 font-mono mb-1">REG ID</p>
                  <p className="text-sm text-gray-300 break-all">{registration.id}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-mono mb-1">COMPETITION / EVENT</p>
                  <p className="text-sm text-gray-300">{registration.competitionId}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-mono mb-1">TEAM NAME</p>
                  <p className="text-sm text-gray-300">{registration.teamName || 'Individual'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-mono mb-1">INSTANSI</p>
                  <p className="text-sm text-gray-300">{registration.instansi || '-'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-mono mb-1">WHATSAPP</p>
                  <p className="text-sm text-gray-300">{registration.whatsapp || '-'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-mono mb-1">DOMISILI</p>
                  <p className="text-sm text-gray-300">{registration.domisili || '-'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-mono mb-1">REGISTRATION DATE</p>
                  <p className="text-sm text-gray-300">
                    {registration.createdAt 
                      ? new Date(registration.createdAt).toLocaleDateString('id-ID', { 
                          day: 'numeric', month: 'long', year: 'numeric', 
                          hour: '2-digit', minute: '2-digit' 
                        })
                      : '-'}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-500 font-mono mb-3 uppercase tracking-wider border-b border-white/5 pb-2">Team Members</p>
                {registration.members && registration.members.length > 0 ? (
                  <div className="space-y-3">
                    {registration.members.map((member) => (
                      <div key={member.id} className="p-3 bg-white/5 border border-white/5 rounded-md flex justify-between items-start">
                        <div>
                          <p className="text-sm font-medium text-white flex items-center gap-2">
                            {member.name} 
                            {member.isLeader && <span className="px-1.5 py-0.5 bg-cyan-500/20 text-cyan-400 text-[10px] rounded uppercase font-mono">Leader</span>}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">{member.email}</p>
                        </div>
                        <div className="text-right flex flex-col gap-1">
                          {member.studentIdCardUrl && (
                            <a href={member.studentIdCardUrl} target="_blank" rel="noreferrer" className="text-xs text-cyan-500 hover:text-cyan-400 underline">View KTM/KTS</a>
                          )}
                          {member.proofOfEnrollmentUrl && (
                            <a href={member.proofOfEnrollmentUrl} target="_blank" rel="noreferrer" className="text-xs text-cyan-500 hover:text-cyan-400 underline">View Bukti Aktif</a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 italic">No members found.</p>
                )}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
