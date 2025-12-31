import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
    X, 
    Check, 
    Undo, 
    Trash2, 
    Eraser, 
    PenTool,
    Palette
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface DrawNoteViewProps {
    initialImage?: string;
    onClose: () => void;
    onSave: (imageData: string) => void;
}

export function DrawNoteView({ initialImage, onClose, onSave }: DrawNoteViewProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [color, setColor] = useState('#000000');
    const [brushSize, setBrushSize] = useState(3);
    const [tool, setTool] = useState<'pen' | 'eraser'>('pen');
    const [history, setHistory] = useState<string[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size to window size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Fill white background
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Load initial image if exists
        if (initialImage) {
            const img = new Image();
            img.src = initialImage;
            img.onload = () => {
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                saveState(); // Save initial state
            };
        } else {
            saveState(); // Save blank state
        }
        
        // Handle resizing
        const handleResize = () => {
            // Note: Resizing clears canvas, in a real app we'd redraw the history
            // For this simple version we'll just keep the current size or warn
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const saveState = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            setHistory(prev => [...prev, canvas.toDataURL()]);
        }
    };

    const handleUndo = () => {
        if (history.length <= 1) return; // Keep at least one state (initial)
        
        const newHistory = [...history];
        newHistory.pop(); // Remove current state
        const previousState = newHistory[newHistory.length - 1];
        
        setHistory(newHistory);
        
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (canvas && ctx && previousState) {
            const img = new Image();
            img.src = previousState;
            img.onload = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0);
            };
        }
    };

    const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;

        setIsDrawing(true);
        
        const { clientX, clientY } = 'touches' in e ? e.touches[0] : e;
        const rect = canvas.getBoundingClientRect();
        
        ctx.beginPath();
        ctx.moveTo(clientX - rect.left, clientY - rect.top);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = tool === 'eraser' ? '#FFFFFF' : color;
        ctx.lineWidth = brushSize * (tool === 'eraser' ? 5 : 1);
    };

    const draw = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDrawing) return;
        
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;

        const { clientX, clientY } = 'touches' in e ? e.touches[0] : e;
        const rect = canvas.getBoundingClientRect();

        ctx.lineTo(clientX - rect.left, clientY - rect.top);
        ctx.stroke();
    };

    const stopDrawing = () => {
        if (isDrawing) {
            setIsDrawing(false);
            const canvas = canvasRef.current;
            const ctx = canvas?.getContext('2d');
            ctx?.closePath();
            saveState();
        }
    };

    const handleSave = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            onSave(canvas.toDataURL());
        }
    };

    const handleClear = () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (canvas && ctx) {
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            saveState();
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-[60] bg-white flex flex-col"
        >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white">
                <button 
                    onClick={onClose}
                    className="p-2 hover:bg-black/5 rounded-full transition-colors"
                >
                    <X size={24} />
                </button>
                <div className="font-semibold">Quick Drawing</div>
                <button 
                    onClick={handleSave}
                    className="p-2 hover:bg-black/5 rounded-full transition-colors text-blue-600"
                >
                    <Check size={24} />
                </button>
            </div>

            {/* Canvas Area */}
            <div className="flex-1 relative bg-gray-50 overflow-hidden touch-none">
                <canvas
                    ref={canvasRef}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                    className="absolute inset-0 cursor-crosshair"
                />
            </div>

            {/* Toolbar */}
            <div className="bg-white border-t border-gray-100 p-4 safe-area-bottom">
                <div className="flex flex-col gap-4 max-w-md mx-auto">
                    
                    {/* Top Row: Tools & Actions */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                             <button 
                                onClick={() => setTool('pen')}
                                className={`p-3 rounded-xl transition-all ${tool === 'pen' ? 'bg-black text-white shadow-md' : 'bg-gray-100 text-black/60 hover:bg-gray-200'}`}
                            >
                                <PenTool size={20} />
                            </button>
                            <button 
                                onClick={() => setTool('eraser')}
                                className={`p-3 rounded-xl transition-all ${tool === 'eraser' ? 'bg-black text-white shadow-md' : 'bg-gray-100 text-black/60 hover:bg-gray-200'}`}
                            >
                                <Eraser size={20} />
                            </button>
                        </div>

                        <div className="flex items-center gap-2">
                             <button 
                                onClick={handleUndo}
                                disabled={history.length <= 1}
                                className="p-3 rounded-xl bg-gray-100 text-black/60 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                <Undo size={20} />
                            </button>
                            <button 
                                onClick={handleClear}
                                className="p-3 rounded-xl bg-red-50 text-red-500 hover:bg-red-100"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Bottom Row: Colors & Size */}
                    {tool === 'pen' && (
                        <div className="flex items-center justify-between">
                            {/* Colors */}
                            <div className="flex items-center gap-3">
                                {['#000000', '#FF3B30', '#007AFF', '#34C759', '#FF9500'].map((c) => (
                                    <button
                                        key={c}
                                        onClick={() => setColor(c)}
                                        className={`w-8 h-8 rounded-full border-2 transition-transform ${color === c ? 'scale-110 border-black/20' : 'scale-100 border-transparent'}`}
                                        style={{ backgroundColor: c }}
                                    />
                                ))}
                            </div>
                            
                            {/* Brush Size Slider */}
                            <div className="flex items-center gap-2 w-24">
                                <div className={`w-1.5 h-1.5 rounded-full bg-black/80`} />
                                <input 
                                    type="range" 
                                    min="1" 
                                    max="15" 
                                    value={brushSize} 
                                    onChange={(e) => setBrushSize(parseInt(e.target.value))}
                                    className="flex-1 h-1 bg-gray-200 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black"
                                />
                                <div className={`w-4 h-4 rounded-full bg-black/80`} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
