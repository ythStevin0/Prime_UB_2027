'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { LayoutDashboard, Users, ShieldAlert, Key } from 'lucide-react';

const MENU_ITEMS = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Registrations', href: '/admin/registrations', icon: Users },
  { name: 'Password Resets', href: '/admin/password-resets', icon: Key },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 hidden md:flex flex-col border-r border-white/10 bg-black/50 backdrop-blur-md">
      <div className="h-16 flex items-center px-6 border-b border-white/10">
        <ShieldAlert className="w-6 h-6 text-cyan-400 mr-2" />
        <span className="font-bold text-lg text-white tracking-wider">ADMIN PANEL</span>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
        {MENU_ITEMS.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
          
          return (
            <Link key={item.name} href={item.href}>
              <div
                className={`relative flex items-center px-4 py-3 rounded-lg transition-colors ${
                  isActive ? 'text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="admin-sidebar-active"
                    className="absolute inset-0 bg-cyan-500/20 border border-cyan-500/50 rounded-lg"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <item.icon className="w-5 h-5 mr-3 relative z-10" />
                <span className="font-medium relative z-10">{item.name}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
