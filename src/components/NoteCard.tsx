import { motion, useMotionValue, useTransform, PanInfo } from 'motion/react';
import { Note } from '../App';
import svgPaths from '../imports/svg-jfktsrkjrm';
import { Trash2 } from 'lucide-react';

interface NoteCardProps {
  note: Note;
  index: number;
  onDelete: (id: string) => void;
  onSwipe: () => void;
  onToggleFavorite?: (id: string) => void;
  showDeleteButton?: boolean;
  onClick?: () => void;
}

function SiAiDuotone() {
  return (
    <div className="absolute right-[23px] overflow-clip size-[22px] top-0" data-name="si:ai-duotone">
      <div className="absolute inset-[7.384%]" data-name="Group">
        <div className="absolute inset-[-4%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 21">
            <g id="Group">
              <path d={svgPaths.p79ef200} fill="var(--fill-0, black)" fillOpacity="0.16" id="Vector" />
              <path d={svgPaths.p74118f0} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

export function NoteCard({ note, index, onDelete, onSwipe, onToggleFavorite, showDeleteButton = false, onClick }: NoteCardProps) {
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-200, 0, 200], [0.5, 1, 0.5]);
  const rotate = useTransform(x, [-200, 0, 200], [-10, 0, 10]);

  // Always call these hooks for trash icon animation
  const trashOpacity = useTransform(x, [-150, -50, 0, 50, 150], [1, 1, 0, 1, 1]);
  const trashScale = useTransform(x, [-150, -50, 0, 50, 150], [1.2, 1, 0.8, 1, 1.2]);

  const getTimeAgo = (date: Date) => {
    const hours = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60));
    if (hours < 1) return 'Edited just now';
    return `Edited ${hours}hrs ago`;
  };

  const handleDragEnd = (_: any, info: PanInfo) => {
    const threshold = 150;
    
    if (Math.abs(info.offset.x) > threshold) {
      onDelete(note.id);
      onSwipe();
    }
  };

  const handleClick = () => {
    if (onClick && !showDeleteButton) {
      onClick();
    }
  };
  
  return (
    <div className="relative w-[354px] h-[154px]">
      {/* Trash Icon Behind Card - Revealed during swipe */}
      {!showDeleteButton && (
        <motion.div
          style={{ 
            opacity: trashOpacity,
            scale: trashScale
          }}
          className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-[80px] h-[80px] pointer-events-none"
        >
          <div className="bg-red-500 rounded-full p-4 shadow-lg">
            <Trash2 className="size-8 text-white" />
          </div>
        </motion.div>
      )}

      <motion.div
        drag={!showDeleteButton ? "x" : false}
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        style={{ x, rotate }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
        }}
        className="relative backdrop-blur-[15px] backdrop-filter bg-[rgba(0,0,0,0.1)] box-border content-stretch flex flex-col gap-[10px] h-[154px] items-center justify-center px-[23px] py-[17px] rounded-[17px] w-[354px] cursor-grab active:cursor-grabbing touch-none z-10"
        onClick={handleClick}
      >
        <div className="content-stretch flex flex-col gap-[9px] items-center justify-center relative shrink-0 w-full">
          <div className="content-stretch flex flex-col gap-[5px] items-center justify-center relative shrink-0 w-full">
            <p className="font-['SF_Pro:Semibold',sans-serif] font-[590] leading-[22px] min-w-full relative shrink-0 text-[17px] text-black tracking-[-0.43px] w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
              {note.title}
            </p>
            <p className="font-['SF_Pro:Regular',sans-serif] font-normal h-[66px] leading-[22px] relative shrink-0 text-[17px] text-black tracking-[-0.43px] w-full overflow-hidden" style={{ fontVariationSettings: "'wdth' 100" }}>
              {note.content}
            </p>
            <SiAiDuotone />
          </div>
          <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[13px] text-neutral-700 tracking-[-0.08px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
            {getTimeAgo(note.createdAt)}
          </p>
        </div>
      </motion.div>
      
      {/* Delete Button Below Card */}
      {showDeleteButton && (
        <motion.button
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => onDelete(note.id)}
          className="mt-3 mx-auto flex items-center gap-2 px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
        >
          <Trash2 className="size-4" />
          <span className="font-['SF_Pro:Regular',sans-serif]" style={{ fontVariationSettings: "'wdth' 100" }}>Delete Note</span>
        </motion.button>
      )}
    </div>
  );
}