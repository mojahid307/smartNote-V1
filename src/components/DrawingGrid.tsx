import React from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface DrawingGridProps {
  drawings: string[];
  onDrawingClick: (drawing: string) => void;
}

export function DrawingGrid({ drawings, onDrawingClick }: DrawingGridProps) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide px-1">
      {drawings.map((src, index) => (
        <motion.div 
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-[140px] h-[140px] shrink-0 relative rounded-[16px] overflow-hidden cursor-pointer active:scale-95 transition-transform border border-black/5 bg-white shadow-sm hover:shadow-md"
            onClick={() => onDrawingClick(src)}
        >
          <div className="absolute inset-0 p-2">
            <ImageWithFallback 
                src={src} 
                alt={`Drawing ${index}`} 
                className="w-full h-full object-contain pointer-events-none"
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
