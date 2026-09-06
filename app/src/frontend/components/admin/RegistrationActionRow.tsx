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
        className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 disabled:opacity-30 disabled:hover:bg-emerald-500/10 transition-colors"
        title="Approve"
      >
        <Check className="w-4 h-4" />
      </button>
      <button 
        onClick={() => updateStatus('REJECTED')}
        disabled={currentStatus === 'REJECTED'}
        className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 disabled:opacity-30 disabled:hover:bg-red-500/10 transition-colors"
        title="Reject"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
