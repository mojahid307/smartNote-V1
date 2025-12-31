import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
    Edit2, 
    Share2, 
    MoreVertical, 
    ArrowLeft, 
    Volume2, 
    VolumeX,
    Copy, 
    Trash2, 
    Archive, 
    Clock, 
    Calendar 
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import svgPaths from '../imports/svg-5hcwgli0hm';
import { imgFrame } from '../imports/svg-77sym';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";

const imgEllipse1 = "figma:asset/dc9d2a0a49bcf3eca91fafce4dc73b13bf81c01d.png";

interface ExpandedNoteViewProps {
  note: {
    id: string;
    title: string;
    content: string;
    date?: string;
    isPinned?: boolean;
  };
  onClose: () => void;
  onEdit: () => void;
  onDelete?: (id: string) => void;
  onArchive?: (id: string) => void;
}

// Background Components
function Layer() {
  return (
    <div className="h-[384.617px] relative w-[719.502px]" data-name="Layer_1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 719.502 384.617">
        <g clipPath="url(#clip0_exp_117)" id="Layer_1">
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
          <clipPath id="clip0_exp_117">
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

export function ExpandedNoteView({ note, onClose, onEdit, onDelete, onArchive }: ExpandedNoteViewProps) {
    const [isSpeaking, setIsSpeaking] = useState(false);

    const content = note.content || '';
    const plainTextContent = content.replace(/<[^>]*>/g, ' ');
    const wordCount = plainTextContent.split(/\s+/).filter(w => w.length > 0).length;
    const readTime = Math.ceil(wordCount / 200); // approx 200 words per minute

    const handleSpeak = () => {
        if (isSpeaking) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        } else {
            const utterance = new SpeechSynthesisUtterance(`${note.title}. ${plainTextContent}`);
            utterance.onend = () => setIsSpeaking(false);
            window.speechSynthesis.speak(utterance);
            setIsSpeaking(true);
        }
    };

    const handleCopy = () => {
        const text = `${note.title}\n\n${plainTextContent}`;
        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard");
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: note.title,
                    text: plainTextContent,
                });
            } catch (err) {
                console.log('Error sharing', err);
            }
        } else {
            handleCopy();
            toast.info("Link copied (Sharing not supported)");
        }
    };

    const handleDelete = () => {
        if (onDelete) {
            onDelete(note.id);
            // onClose is handled by parent state update usually, but just in case
        }
    };

    const handleArchive = () => {
        if (onArchive) {
            onArchive(note.id);
        }
    };

    // Stop speaking when unmounting
    React.useEffect(() => {
        return () => {
            window.speechSynthesis.cancel();
        };
    }, []);

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
                     <button 
                        onClick={handleSpeak}
                        className={`p-2 rounded-full transition-all ${isSpeaking ? 'bg-[#33331e] text-[#ffff45]' : 'hover:bg-black/5 text-black/70'}`} 
                        title="Read Aloud"
                    >
                        {isSpeaking ? <VolumeX size={20} /> : <Volume2 size={20} />}
                     </button>
                     
                     <button 
                        onClick={handleShare}
                        className="p-2 hover:bg-black/5 rounded-full transition-colors text-black/70" 
                        title="Share"
                    >
                        <Share2 size={20} />
                    </button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="p-2 hover:bg-black/5 rounded-full transition-colors text-black/70 outline-none">
                                <MoreVertical size={20} />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 bg-white/90 backdrop-blur-xl border-white/20">
                            <DropdownMenuItem onClick={handleCopy}>
                                <Copy className="mr-2 h-4 w-4" />
                                <span>Copy Text</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleArchive}>
                                <Archive className="mr-2 h-4 w-4" />
                                <span>Archive</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleDelete} className="text-red-600 focus:text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Delete</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                 </div>
            </div>

            {/* Scrollable Content */}
            <div className="relative z-10 flex-1 overflow-y-auto">
                 <div className="max-w-3xl mx-auto px-6 py-8">
                    {/* Hero Section */}
                    <div className="mb-8 space-y-4">
                        <motion.h1 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="font-['SF_Pro_Display',sans-serif] font-bold text-[32px] leading-tight text-black tracking-tight"
                        >
                            {note.title}
                        </motion.h1>

                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-wrap items-center gap-4 text-sm text-black/50 font-medium"
                        >
                            <div className="flex items-center gap-1.5 bg-black/5 px-3 py-1.5 rounded-full">
                                <Calendar size={14} />
                                <span>{note.date || "Just now"}</span>
                            </div>
                            <div className="flex items-center gap-1.5 bg-black/5 px-3 py-1.5 rounded-full">
                                <Clock size={14} />
                                <span>{readTime} min read</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Content */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="prose prose-lg prose-gray max-w-none"
                    >
                        <div 
                            className="font-['SF_Pro_Text',sans-serif] text-[18px] leading-[1.6] text-[#1a1a1a] whitespace-pre-wrap"
                            dangerouslySetInnerHTML={{ __html: content }} 
                        />
                    </motion.div>
                 </div>
            </div>

            {/* Floating Action Button for Edit */}
            <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.4 }}
                className="absolute bottom-8 right-6 z-20"
            >
                <button 
                    onClick={onEdit}
                    className="flex items-center gap-2 bg-[#1a1a1a] text-white pl-5 pr-6 py-4 rounded-[20px] shadow-lg hover:bg-black hover:scale-105 transition-all active:scale-95 group"
                >
                    <Edit2 size={20} className="group-hover:-translate-y-0.5 transition-transform" />
                    <span className="font-semibold text-[17px]">Edit Note</span>
                </button>
            </motion.div>

        </motion.div>
    );
}
