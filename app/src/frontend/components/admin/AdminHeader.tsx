'use client';

import React from 'react';
import { LogOut, User } from 'lucide-react';
import { signOut } from 'next-auth/react';


interface AdminHeaderProps {
  user: {
    name?: string | null;
    email?: string | null;
  };
}

export function AdminHeader({ user }: AdminHeaderProps) {
  return (
    <header className="h-16 border-b border-cyan-900/50 bg-[#020617]/80 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex items-center md:hidden">
        <span className="font-mono font-bold text-lg text-cyan-400 tracking-wider">[ SYS_ADMIN ]</span>
      </div>
      
      <div className="hidden md:block">
        <h2 className="text-cyan-500/70 font-mono text-xs uppercase tracking-widest flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)] animate-pulse" />
          Terminal Access
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 bg-cyan-950/30 px-4 py-2 border border-cyan-900/50 shadow-[inset_0_0_10px_rgba(6,182,212,0.1)]">
          <User className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-mono font-bold text-cyan-400 tracking-widest uppercase">
            {user.name || user.email || 'CLEARANCE: ADMIN'}
          </span>
        </div>
        
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="flex items-center justify-center p-2 relative group overflow-hidden bg-red-950/20 text-red-500 border border-red-900/50 transition-all hover:border-red-500 hover:text-red-400 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)]"
          title="Logout"
        >
          <div className="absolute inset-0 w-full h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,rgba(239,68,68,0.1)_2px,rgba(239,68,68,0.1)_4px)] opacity-0 group-hover:opacity-100 transition-opacity" />
          <LogOut className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform" />
        </button>
      </div>
    </header>
  );
}
