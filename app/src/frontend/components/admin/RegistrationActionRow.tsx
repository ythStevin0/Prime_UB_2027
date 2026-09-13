'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, X, Loader2 } from 'lucide-react';

interface RegistrationActionRowProps {
  registrationId: string;
  currentStatus: string;
}

export function RegistrationActionRow({ registrationId, currentStatus }: RegistrationActionRowProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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
    </div>
  );
}
