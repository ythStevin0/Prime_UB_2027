'use client';

import React from 'react';
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/' })}
      className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-semibold rounded-none border border-red-500/20 transition-all hover:shadow-[0_0_15px_rgba(239,68,68,0.2)]"
    >
      <LogOut className="w-5 h-5" />
      <span>Keluar dari Akun</span>
    </button>
  );
}
