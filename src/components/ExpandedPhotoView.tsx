import React from 'react';
import { motion } from 'motion/react';
import { 
    ArrowLeft, 
    Share2, 
    MoreVertical, 
    Trash2, 
    Download,
    Maximize2
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface ExpandedPhotoViewProps {
  photo: string; // URL
  onClose: () => void;
  onDelete?: (url: string) => void;
}

export function ExpandedPhotoView({ photo, onClose, onDelete }: ExpandedPhotoViewProps) {
  const handleDelete = () => {
    if (onDelete) {
        onDelete(photo);
        onClose();
    }
  };

  const handleDownload = async () => {
    try {
        const response = await fetch(photo);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `photo-note-${Date.now()}.jpg`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    } catch (e) {
        console.error("Download failed", e);
        // Fallback for some environments (like figma asset or protected urls)
        window.open(photo, '_blank');
    }
  };

  return (
    <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black overflow-hidden flex flex-col"
    >
        {/* Header (Overlay) */}
        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 pt-14 pb-4 bg-gradient-to-b from-black/60 to-transparent">
            <button 
                onClick={onClose} 
                className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors flex items-center gap-1 text-white"
            >
                <ArrowLeft size={24} />
                <span className="font-medium text-[17px]">Back</span>
            </button>
            
            <div className="flex items-center gap-1">
                <button className="p-2 hover:bg-white/10 rounded-full transition-colors text-white" title="Share">
                    <Share2 size={20} />
                </button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="p-2 hover:bg-white/10 rounded-full transition-colors text-white outline-none">
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
                            <span>Delete Photo</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>

        {/* Main Image */}
        <div className="flex-1 flex items-center justify-center p-0 relative w-full h-full">
            <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full h-full flex items-center justify-center"
            >
                <ImageWithFallback 
                    src={photo} 
                    alt="Expanded Note" 
                    className="max-w-full max-h-full object-contain"
                />
            </motion.div>
        </div>

        {/* Bottom Bar (Optional info) */}
        <div className="absolute bottom-0 left-0 right-0 z-20 p-8 bg-gradient-to-t from-black/60 to-transparent flex justify-center pb-12">
            <div className="flex gap-6 text-white/80">
                <button 
                    onClick={handleDownload}
                    className="flex flex-col items-center gap-2 text-xs hover:text-white transition-colors"
                >
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/10">
                        <Download size={20} />
                    </div>
                    <span>Save</span>
                </button>
                <button className="flex flex-col items-center gap-2 text-xs hover:text-white transition-colors">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/10">
                        <Maximize2 size={20} />
                    </div>
                    <span>Zoom</span>
                </button>
            </div>
        </div>
    </motion.div>
  );
}
