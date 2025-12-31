import React from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'motion/react';

interface PhotoGridProps {
  photos: string[];
  onPhotoClick: (photo: string) => void;
}

export function PhotoGrid({ photos, onPhotoClick }: PhotoGridProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {photos.map((src, index) => (
        <motion.div 
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-[137px] h-[91px] shrink-0 relative rounded-[9px] overflow-hidden cursor-pointer active:scale-95 transition-transform"
            onClick={() => onPhotoClick(src)}
        >
          <ImageWithFallback 
            src={src} 
            alt={`Note ${index}`} 
            className="w-full h-full object-cover pointer-events-none"
          />
        </motion.div>
      ))}
    </div>
  );
}
