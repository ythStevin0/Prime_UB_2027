'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { LayoutDashboard, Users, ShieldAlert, Key, ChevronLeft, ChevronRight, Inbox } from 'lucide-react';

const MENU_ITEMS = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Registrations', href: '/admin/registrations', icon: Users },
  { name: 'Submissions', href: '/admin/submissions', icon: Inbox },
  { name: 'Password Resets', href: '/admin/password-resets', icon: Key },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  return (
    <aside 
      className={`shrink-0 hidden md:flex flex-col border-r border-white/10 bg-[#0a0a0a] relative transition-[width] duration-300 ease-in-out ${isCollapsed ? 'w-20' : 'w-64'}`}
    >
      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)} 
        className="absolute -right-3.5 top-5 bg-[#0a0a0a] border border-white/20 p-1 rounded-none text-gray-400 hover:text-white z-50 transition-colors"
      >
        {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>

      <div className="h-16 flex items-center border-b border-white/10 overflow-hidden shrink-0">
        <div className="w-20 flex justify-center shrink-0">
          <ShieldAlert className="w-6 h-6 text-gray-300" />
        </div>
        <span className={`font-semibold text-sm text-gray-200 whitespace-nowrap transition-all duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
          Admin Panel
        </span>
      </div>
      
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-6 space-y-2">
        {MENU_ITEMS.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
          
          return (
            <Link key={item.name} href={item.href}>
              <div
                className={`relative flex items-center h-12 transition-colors duration-200 rounded-none mx-3 ${
                  isActive 
                    ? 'text-white bg-white/10' 
                    : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                }`}
                title={isCollapsed ? item.name : undefined}
              >
                <div className="w-14 flex justify-center shrink-0">
                  <item.icon className="w-5 h-5" />
                </div>
                <span className={`font-medium whitespace-nowrap transition-all duration-300 overflow-hidden ${isCollapsed ? 'w-0 opacity-0' : 'w-36 opacity-100'}`}>
                  {item.name}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="h-16 border-t border-white/10 flex items-center overflow-hidden shrink-0">
        <div className="w-20 flex justify-center shrink-0">
           <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]" title="System Online" />
        </div>
        <div className={`flex flex-col whitespace-nowrap transition-all duration-300 overflow-hidden ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'}`}>
          <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-0.5">Status</span>
          <span className="text-xs text-emerald-400 font-medium">Online</span>
        </div>
      </div>
    </aside>
  );
}
