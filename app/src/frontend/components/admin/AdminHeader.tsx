'use client';

import React from 'react';
import { LogOut, User } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { motion } from 'framer-motion';

interface AdminHeaderProps {
  user: {
    name?: string | null;
    email?: string | null;
  };
}

export function AdminHeader({ user }: AdminHeaderProps) {
  return (
    <header className="h-16 border-b border-white/10 bg-black/50 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex items-center md:hidden">
        <span className="font-bold text-lg text-white tracking-wider">ADMIN PANEL</span>
      </div>
      
      <div className="hidden md:block">
        <h2 className="text-gray-400 text-sm font-medium">PRIME UB 2027 Admin Console</h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">
          <User className="w-4 h-4 text-cyan-400" />
          <span className="text-sm font-medium text-gray-200">
            {user.name || user.email || 'Admin User'}
          </span>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => signOut({ callbackUrl: '/' })}
          className="flex items-center justify-center p-2 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 transition-colors"
          title="Logout"
        >
          <LogOut className="w-5 h-5" />
        </motion.button>
      </div>
    </header>
  );
}
