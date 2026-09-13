'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { LayoutDashboard, Users, ShieldAlert, Key } from 'lucide-react';

const MENU_ITEMS = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Registrations', href: '/admin/registrations', icon: Users },
  { name: 'Password Resets', href: '/admin/password-resets', icon: Key },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 hidden md:flex flex-col border-r border-cyan-900/50 bg-[#020617]/80 backdrop-blur-xl relative">
      <div className="h-16 flex items-center px-6 border-b border-cyan-900/50 bg-cyan-950/20">
        <ShieldAlert className="w-5 h-5 text-cyan-400 mr-2" />
        <span className="font-mono font-bold text-sm text-cyan-400 tracking-[0.2em]">[ SYS_ADMIN ]</span>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
        {MENU_ITEMS.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
          
          return (
            <Link key={item.name} href={item.href}>
              <div
                className={`relative flex items-center px-4 py-3 font-mono text-sm transition-all duration-300 border-l-2 group overflow-hidden ${
                  isActive 
                    ? 'text-cyan-400 border-cyan-400 bg-cyan-950/40 shadow-[inset_4px_0_10px_rgba(34,211,238,0.2)] pl-6' 
                    : 'text-gray-500 border-transparent hover:text-cyan-300 hover:bg-cyan-950/20 hover:border-cyan-700 hover:pl-6'
                }`}
              >
                {isActive && <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(90deg,transparent_0%,rgba(34,211,238,0.05)_50%,transparent_100%)] animate-[pulse_2s_ease-in-out_infinite]" />}
                <item.icon className={`w-4 h-4 mr-3 relative z-10 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                <span className="font-medium relative z-10 uppercase tracking-widest">{item.name}</span>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-cyan-900/50 bg-black/40">
        <div className="text-[10px] font-mono text-cyan-500/50 uppercase tracking-widest mb-1">System Status</div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
          <span className="text-xs font-mono text-emerald-400">ONLINE_</span>
        </div>
      </div>
    </aside>
  );
}
