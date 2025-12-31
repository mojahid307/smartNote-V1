import React from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'motion/react';
import { Trash2, Archive } from 'lucide-react';
import svgPaths from '../imports/svg-g7aqyafhff';

export interface NoteCardProps {
  id?: string;
  title: string;
  content: string;
  date: string;
  isPinned?: boolean;
  onClick?: () => void;
  onDelete?: (id: string) => void;
  onArchive?: (id: string) => void;
}

export function NoteCard({ id, title, content, date, isPinned, onClick, onDelete, onArchive }: NoteCardProps) {
  const x = useMotionValue(0);
  const deleteOpacity = useTransform(x, [50, 100], [0, 1]);
  const archiveOpacity = useTransform(x, [-50, -100], [0, 1]);
  
  // Background color interpolation: Left (Archive/Green) <-> Center (Transparent) <-> Right (Delete/Red)
  const bg = useTransform(
    x, 
    [-150, -80, 0, 80, 150], 
    ["rgba(16, 185, 129, 1)", "rgba(16, 185, 129, 1)", "rgba(255, 255, 255, 0)", "rgba(239, 68, 68, 1)", "rgba(239, 68, 68, 1)"]
  );

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 100) {
      // Swipe Right -> Delete
      if (onDelete && id) onDelete(id);
    } else if (info.offset.x < -100) {
      // Swipe Left -> Archive
      if (onArchive && id) onArchive(id);
    }
  };

  return (
    <div className="relative w-full mb-4 group select-none">
      {/* Background Actions Layer */}
      <motion.div 
        style={{ backgroundColor: bg }}
        className="absolute inset-0 rounded-[15px] flex items-center justify-between px-6 z-0"
      >
        {/* Left Side (revealed when swiping right) - Delete */}
        <motion.div style={{ opacity: deleteOpacity }} className="flex items-center text-white font-medium">
          <Trash2 size={20} className="mr-2" />
          Delete
        </motion.div>
        
        {/* Right Side (revealed when swiping left) - Archive */}
        <motion.div style={{ opacity: archiveOpacity }} className="flex items-center text-white font-medium ml-auto">
          Archive
          <Archive size={20} className="ml-2" />
        </motion.div>
      </motion.div>

      {/* Draggable Card */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.7}
        onDragEnd={handleDragEnd}
        style={{ x }}
        whileTap={{ scale: 0.98 }}
        className="relative z-10 w-full backdrop-blur-[13px] bg-[#f2f2f2] rounded-[15px] p-5 border border-white/20 cursor-grab active:cursor-grabbing shadow-sm"
        onClick={onClick}
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-[15.5px] leading-5 text-black tracking-tight flex-1 mr-2 pointer-events-none">
              {title}
            </h3>
            {isPinned && (
              <div className="w-[20px] h-[20px] shrink-0 opacity-80 pointer-events-none">
                <svg viewBox="0 0 20 20" className="w-full h-full" fill="none">
                  <path d={svgPaths.pe0f5380} fill="black" />
                </svg>
              </div>
            )}
          </div>
          
          <p className="font-normal text-[15.5px] leading-5 text-black tracking-tight line-clamp-3 pointer-events-none">
            {content}
          </p>

          <p className="text-[12px] text-[#404040] font-normal mt-1 pointer-events-none">
            {date}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
