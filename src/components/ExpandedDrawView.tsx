import React from 'react';
import { motion } from 'motion/react';
import { 
    ArrowLeft, 
    Share2, 
    MoreVertical, 
    Trash2, 
    Download,
    Edit2
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface ExpandedDrawViewProps {
  image: string; // Base64 or URL
  onClose: () => void;
  onEdit: () => void;
  onDelete?: () => void;
}

export function ExpandedDrawView({ image, onClose, onEdit, onDelete }: ExpandedDrawViewProps) {
  const handleDelete = () => {
    if (onDelete) {
        onDelete();
        onClose();
    }
  };

  const handleDownload = () => {
    try {
        const a = document.createElement('a');
        a.href = image;
        a.download = `drawing-note-${Date.now()}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    } catch (e) {
        console.error("Download failed", e);
    }
  };

  return (
    <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-[#F2F2F2] overflow-hidden flex flex-col"
    >
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 pt-14 pb-4 bg-white/50 backdrop-blur-md border-b border-white/20">
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
                        <DropdownMenuItem onClick={handleDownload}>
                            <Download className="mr-2 h-4 w-4" />
                            <span>Download</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleDelete} className="text-red-600 focus:text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete Drawing</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>

        {/* Main Image */}
        <div className="flex-1 flex items-center justify-center p-6 bg-white">
            <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full h-full flex items-center justify-center shadow-sm rounded-lg overflow-hidden border border-black/5"
            >
                <ImageWithFallback 
                    src={image} 
                    alt="Drawing Note" 
                    className="max-w-full max-h-full object-contain"
                />
            </motion.div>
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
                <span className="font-semibold text-[17px]">Edit Drawing</span>
            </button>
        </motion.div>

    </motion.div>
  );
}
