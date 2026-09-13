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
      className={`relative bg-cyan-950/10 border border-cyan-900/30 backdrop-blur-md overflow-hidden group ${className}`}
      style={{ clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))' }}
    >
      {/* Animated corner accent */}
      <div className="absolute top-0 right-0 w-4 h-4 bg-cyan-500/20 group-hover:bg-cyan-400 transition-colors" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }} />
      <div className="absolute bottom-0 left-0 w-4 h-4 bg-cyan-500/20 group-hover:bg-cyan-400 transition-colors" style={{ clipPath: 'polygon(0 100%, 100% 100%, 0 0)' }} />

      {(title || action) && (
        <div className="px-6 py-4 border-b border-cyan-900/50 flex items-center justify-between bg-cyan-950/40 relative">
          {title && (
            <div className="flex items-center gap-3">
              <div className="w-2 h-4 bg-cyan-500 animate-pulse" />
              <h3 className="text-sm font-mono font-bold text-cyan-400 uppercase tracking-widest">{title}</h3>
            </div>
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
