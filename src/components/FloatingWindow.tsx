import React from 'react';
import { motion } from 'framer-motion';

interface FloatingWindowProps {
  title: string;
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function FloatingWindow({ title, children, delay = 0, className = '' }: FloatingWindowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`macos-window flex flex-col ${className}`}
    >
      {/* Title Bar */}
      <div className="flex items-center px-4 py-3 bg-white/40 border-b border-white/20">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]"></div>
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]"></div>
        </div>
        <div className="flex-1 text-center text-xs font-medium text-gray-700 select-none">
          {title}
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        {children}
      </div>
    </motion.div>
  );
}
