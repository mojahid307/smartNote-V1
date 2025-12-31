import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
    ArrowLeft, 
    Share2, 
    MoreVertical, 
    Play, 
    Pause, 
    FastForward, 
    Rewind, 
    Trash2,
    Clock,
    Mic
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import svgPaths from '../imports/svg-5hcwgli0hm';

// Reusing the background from ExpandedNoteView for consistency
function Layer() {
  return (
    <div className="h-[384.617px] relative w-[719.502px]" data-name="Layer_1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 719.502 384.617">
        <g clipPath="url(#clip0_voice_117)" id="Layer_1">
          <path d={svgPaths.pe31b6c0} fill="#B4D1FF" id="Vector" />
          <path d={svgPaths.p7f5dd00} fill="#B4D1FF" id="Vector_2" />
          <path d={svgPaths.p1a04e100} fill="#B4D1FF" id="Vector_3" />
          <path d={svgPaths.p1273db00} fill="#B4D1FF" id="Vector_4" />
          <path d={svgPaths.p16389880} fill="#B4D1FF" id="Vector_5" />
          <path d={svgPaths.p2debb200} fill="#B4D1FF" id="Vector_6" />
          <path d={svgPaths.p42b2230} fill="#B4D1FF" id="Vector_7" />
          <path d={svgPaths.p19bc7480} fill="#B4D1FF" id="Vector_8" />
          <path d={svgPaths.p33cec380} fill="#B4D1FF" id="Vector_9" />
          <path d={svgPaths.p2e087600} fill="#B4D1FF" id="Vector_10" />
          <path d={svgPaths.p35ff6a00} fill="#B4D1FF" id="Vector_11" />
          <path d={svgPaths.pa470600} fill="#B4D1FF" id="Vector_12" />
          <path d={svgPaths.p3115f880} fill="#B4D1FF" id="Vector_13" />
          <path d={svgPaths.p18d4e5f0} fill="#B4D1FF" id="Vector_14" />
        </g>
        <defs>
          <clipPath id="clip0_voice_117">
            <rect fill="white" height="384.617" width="719.502" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-[5.84px] top-[146.13px]">
      <div className="absolute flex h-[719.896px] items-center justify-center left-[5.84px] top-[146.13px] w-[390.314px]" style={{ "--transform-inner-width": "300", "--transform-inner-height": "150" } as React.CSSProperties}>
        <div className="flex-none rotate-[89.546deg] scale-y-[-100%] skew-x-[0.516deg]">
          <Layer />
        </div>
      </div>
    </div>
  );
}

interface ExpandedVoiceViewProps {
  note: {
    id: string;
    title: string;
    date?: string;
  };
  onClose: () => void;
  onDelete?: (id: string) => void;
}

export function ExpandedVoiceView({ note, onClose, onDelete }: ExpandedVoiceViewProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  
  // Fake progress simulation
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleDelete = () => {
    if (onDelete) {
        onDelete(note.id);
        onClose();
    }
  };

  return (
    <motion.div 
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 10 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="fixed inset-0 z-50 bg-[#F2F2F2] overflow-hidden flex flex-col"
    >
        {/* Background Layers */}
        <div className="absolute inset-0 pointer-events-none">
            <Group1 />
            <div className="absolute backdrop-blur-[10px] bg-white/80 h-full w-full" />
        </div>

        {/* Header */}
        <div className="relative z-10 w-full flex items-center justify-between px-4 pt-14 pb-4 bg-white/50 backdrop-blur-md border-b border-white/20 shadow-sm">
            <button 
                onClick={onClose} 
                className="p-2 -ml-2 hover:bg-black/5 rounded-full transition-colors flex items-center gap-1 text-black/80"
            >
                <ArrowLeft size={24} />
                <span className="font-medium text-[17px]">Back</span>
            </button>
            
            <div className="flex items-center gap-1">
                <button className="p-2 hover:bg-black/5 rounded-full transition-colors text-black/70" title="Share">
                    <Share2 size={20} />
                </button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="p-2 hover:bg-black/5 rounded-full transition-colors text-black/70 outline-none">
                            <MoreVertical size={20} />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white/90 backdrop-blur-xl border-white/20">
                        <DropdownMenuItem onClick={handleDelete} className="text-red-600 focus:text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete Voice Note</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 space-y-12">
            {/* Title & Info */}
            <div className="text-center space-y-2">
                <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-20 h-20 bg-black/5 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                    <Mic size={40} className="text-black/40" />
                </motion.div>
                <h1 className="font-['SF_Pro_Display',sans-serif] font-bold text-[28px] text-black">
                    {note.title}
                </h1>
                <div className="flex items-center justify-center gap-2 text-black/50 text-sm">
                    <Clock size={14} />
                    <span>{note.date || "Just now"}</span>
                    <span>•</span>
                    <span>0:45</span>
                </div>
            </div>

            {/* Visualizer (Fake) */}
            <div className="w-full max-w-sm h-32 flex items-center justify-center gap-1">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{ 
                            height: isPlaying ? [10, Math.random() * 60 + 20, 10] : 10,
                            opacity: isPlaying ? 1 : 0.5
                        }}
                        transition={{ 
                            repeat: Infinity, 
                            duration: 0.5, 
                            delay: i * 0.05 
                        }}
                        className="w-2 bg-black rounded-full"
                    />
                ))}
            </div>

            {/* Controls */}
            <div className="w-full max-w-sm space-y-6">
                {/* Progress Bar */}
                <div className="w-full h-1.5 bg-black/10 rounded-full overflow-hidden">
                    <motion.div 
                        className="h-full bg-black" 
                        style={{ width: `${progress}%` }}
                    />
                </div>
                
                <div className="flex items-center justify-between px-8">
                    <button className="p-3 text-black/60 hover:text-black transition-colors">
                        <Rewind size={28} />
                    </button>
                    <button 
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-20 h-20 bg-[#1a1a1a] rounded-full flex items-center justify-center text-white shadow-xl hover:scale-105 active:scale-95 transition-all"
                    >
                        {isPlaying ? <Pause size={32} fill="white" /> : <Play size={32} fill="white" className="ml-1" />}
                    </button>
                    <button className="p-3 text-black/60 hover:text-black transition-colors">
                        <FastForward size={28} />
                    </button>
                </div>
            </div>
        </div>

        {/* Transcript Section (Placeholder) */}
        <div className="relative z-10 w-full bg-white/60 backdrop-blur-md rounded-t-[30px] p-8 min-h-[200px] shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
            <h3 className="font-semibold text-lg mb-4 text-black/80">Transcript</h3>
            <div className="space-y-2">
                <div className="h-4 bg-black/5 rounded w-3/4" />
                <div className="h-4 bg-black/5 rounded w-full" />
                <div className="h-4 bg-black/5 rounded w-5/6" />
                <div className="h-4 bg-black/5 rounded w-2/3" />
            </div>
            <div className="mt-4 flex justify-center">
                 <span className="text-xs font-medium text-black/40 bg-black/5 px-3 py-1 rounded-full">
                    Transcript generated automatically
                 </span>
            </div>
        </div>
    </motion.div>
  );
}
