import React from 'react';

interface BottomBarProps {
  onAddNote: () => void;
  onAddVoice: () => void;
  onAddPhoto: () => void;
  isRecording?: boolean;
}

export function BottomBar({ onAddNote, onAddVoice, onAddPhoto, onAddDrawing, isRecording }: BottomBarProps & { onAddDrawing: () => void }) {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        {/* Main Pill Shape */}
        <div className="relative w-[280px] h-[65px] bg-[#1A1A12] rounded-[32.5px] shadow-2xl flex items-center justify-between px-6 border border-[#2A2A20]">
            
            {/* 1. Left: Gallery Button */}
            <button 
                onClick={onAddPhoto}
                className="w-10 h-10 flex items-center justify-center active:scale-90 transition-transform"
                aria-label="Add Photo"
            >
                {/* Icon: Gallery */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="3" width="18" height="18" rx="4" fill="#FFFF45" fillOpacity="0.1" stroke="#FFFF45" strokeWidth="2"/>
                    <path d="M21 15L16 10L5 21" stroke="#FFFF45" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="8.5" cy="8.5" r="1.5" fill="#FFFF45"/>
                </svg>
            </button>

            {/* 2. Left-Center: Draw Button */}
            <button 
                onClick={onAddDrawing}
                className="w-10 h-10 flex items-center justify-center active:scale-90 transition-transform"
                aria-label="Add Drawing"
            >
                {/* Icon: Pen */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path d="M12 19l7-7 3 3-7 7-3-3z" stroke="#FFFF45" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                   <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" stroke="#FFFF45" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                   <path d="M2 2l7.586 7.586" stroke="#FFFF45" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                   <circle cx="11" cy="11" r="2" fill="#FFFF45" fillOpacity="0.1"/>
                </svg>
            </button>

            {/* 3. Center: Add Note Button (Now slightly offset or centered) */}
            <button 
                onClick={onAddNote}
                className="w-[52px] h-[52px] rounded-full bg-[#2E2E1E] flex items-center justify-center active:scale-95 transition-transform"
                aria-label="Create Note"
            >
                {/* Icon: Big Plus */}
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 4V20" stroke="#FFFF45" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M4 12H20" stroke="#FFFF45" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>

            {/* 4. Right: Mic Button */}
            <button 
                onClick={onAddVoice}
                className={`w-10 h-10 flex items-center justify-center active:scale-90 transition-transform ${isRecording ? 'animate-pulse' : ''}`}
                aria-label="Record Voice"
            >
                {/* Icon: Microphone */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={isRecording ? "#FF4545" : "#FFFF45"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                    <line x1="12" y1="19" x2="12" y2="23"/>
                    <line x1="8" y1="23" x2="16" y2="23"/>
                </svg>
            </button>

        </div>
    </div>
  );
}