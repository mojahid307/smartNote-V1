import React from 'react';
import { motion } from 'motion/react';
import { AnimatePresence } from 'framer-motion';
import svgPaths from '../imports/svg-g7aqyafhff';

interface SectionProps {
  title: string;
  type: 'star' | 'chevron';
  isOpen?: boolean;
  onToggle?: () => void;
  children: React.ReactNode;
}

export function Section({ title, type, isOpen = true, onToggle, children }: SectionProps) {
  return (
    <div className="w-full mb-6">
      <div 
        className="flex items-center justify-between mb-4 cursor-pointer select-none"
        onClick={onToggle}
      >
        <h2 className="font-semibold text-[18px] text-black tracking-tight">
          {title}
        </h2>
        <div className="shrink-0">
            {type === 'star' ? (
                 <motion.div 
                    animate={{ rotate: isOpen ? 0 : -90 }}
                    transition={{ duration: 0.2 }}
                    className="w-[15px] h-[9px]"
                >
                    <svg viewBox="0 0 15 9" className="w-full h-full" fill="none">
                        <path d={svgPaths.p16235100} fill="black" />
                    </svg>
                 </motion.div>
            ) : (
                <motion.div 
                    animate={{ rotate: isOpen ? 0 : -90 }}
                    transition={{ duration: 0.2 }}
                    className="w-[15px] h-[9px]"
                >
                    <svg viewBox="0 0 15 9" className="w-full h-full" fill="none">
                        <path d={svgPaths.p16235100} fill="black" />
                    </svg>
                </motion.div>
            )}
        </div>
      </div>
      
      <AnimatePresence initial={false}>
        {isOpen && (
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
            >
                {children}
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
