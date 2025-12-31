import React, { useState } from 'react';
import svgPaths from '../imports/svg-g7aqyafhff';
import { motion } from 'motion/react';

interface VoiceNoteItemProps {
  id: string;
  title: string;
  onClick: () => void;
  onDelete: (id: string) => void;
}

export function VoiceNoteItem({ id, title, onClick, onDelete }: VoiceNoteItemProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="relative w-full h-[50px] mb-3 group cursor-pointer"
      onClick={onClick}
    >
      <div className="absolute inset-0 border-[0.9px] border-black rounded-[13px] pointer-events-none opacity-20" />
      <div className="absolute inset-0 flex items-center justify-between px-3">
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-[22px] h-[22px] shrink-0 flex items-center justify-center hover:scale-110 transition-transform"
        >
             {/* Play Icon - reusing the same path but maybe I should find a pause icon if playing. 
                 For simplicity, I'll stick to Play or maybe simple CSS rects for pause. 
             */}
             {isPlaying ? (
                <div className="flex gap-1 h-3 items-center justify-center">
                    <div className="w-1 h-full bg-[#33331E] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}/>
                    <div className="w-1 h-full bg-[#33331E] rounded-full animate-bounce" style={{ animationDelay: '100ms' }}/>
                    <div className="w-1 h-full bg-[#33331E] rounded-full animate-bounce" style={{ animationDelay: '200ms' }}/>
                </div>
             ) : (
                <svg viewBox="0 0 22 22" className="w-full h-full" fill="none">
                    <path d={svgPaths.p13eabc00} fill="#33331E" />
                </svg>
             )}
        </button>

        <span className="flex-1 text-center font-normal text-[14.5px] text-black">
          {title}
        </span>

        <button 
            onClick={() => onDelete(id)}
            className="w-[20px] h-[20px] shrink-0 flex items-center justify-center hover:bg-black/10 rounded-full transition-colors"
        >
            <svg viewBox="0 0 20 20" className="w-full h-full" fill="none">
                 <path d={svgPaths.p2f0fed00} fill="#939393" />
            </svg>
        </button>
      </div>
    </motion.div>
  );
}
