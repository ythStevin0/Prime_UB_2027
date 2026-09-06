'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AdminCardProps {
  children: React.ReactNode;
  title?: string;
  action?: React.ReactNode;
  className?: string;
}

export function AdminCard({ children, title, action, className = '' }: AdminCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white/5 border border-white/10 rounded-xl backdrop-blur-md overflow-hidden ${className}`}
    >
      {(title || action) && (
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/20">
          {title && <h3 className="text-lg font-semibold text-white tracking-wide">{title}</h3>}
          {action && <div>{action}</div>}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </motion.div>
  );
}
