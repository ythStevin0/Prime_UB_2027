'use client';

import React from 'react';


interface AdminCardProps {
  children: React.ReactNode;
  title?: string;
  action?: React.ReactNode;
  className?: string;
}

export function AdminCard({ children, title, action, className = '' }: AdminCardProps) {
  return (
    <div 
      className={`bg-white/5 border border-white/10 rounded-none overflow-hidden ${className}`}
    >

      {(title || action) && (
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
          {title && (
            <h3 className="font-semibold text-lg text-white">{title}</h3>
          )}
          {action && <div>{action}</div>}
        </div>
      )}
      <div className="p-6 relative z-10">
        {children}
      </div>
      
      {/* Scanline hover effect */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(34,211,238,0.1)_50%,transparent_100%)] h-[150%] top-[-150%] group-hover:animate-[scan_2s_linear_infinite] pointer-events-none z-0" />
    </div>
  );
}
