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
    <header className="h-16 border-b border-white/10 bg-[#0a0a0a] flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex items-center md:hidden">
        <span className="font-semibold text-lg text-gray-200">Admin Panel</span>
      </div>
      
      <div className="hidden md:block">
        <h2 className="text-gray-400 font-medium text-sm">
          Dashboard Overview
        </h2>
      </div>

      <div className="flex items-center gap-6">
        {/* User Profile Section */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
            <User className="w-5 h-5 text-blue-400" />
          </div>
          <div className="flex flex-col text-right md:text-left">
            <span className="text-sm font-semibold text-gray-200">
              {user.name || 'Admin User'}
            </span>
            <span className="text-xs text-gray-500">
              {user.email || 'No email provided'}
            </span>
          </div>
        </div>
        
        {/* Divider */}
        <div className="h-8 w-px bg-white/10 hidden md:block"></div>

        {/* Logout Button */}
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
          title="Logout"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden md:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
