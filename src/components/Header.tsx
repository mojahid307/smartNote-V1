import React from 'react';
import svgPaths from '../imports/svg-g7aqyafhff';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onSearchClick?: () => void;
  onMenuClick?: () => void;
}

export function Header({ searchTerm, onSearchChange, onSearchClick, onMenuClick }: HeaderProps) {
  return (
    <div className="w-full flex items-center justify-between px-5 pt-8 pb-4 relative z-20">
      {/* Menu Icon */}
      <button 
        onClick={onMenuClick}
        className="w-[35px] h-[35px] hover:opacity-70 transition-opacity"
      >
        <svg viewBox="0 0 35 35" className="w-full h-full" fill="none">
          <path d={svgPaths.p37ae6080} fill="black" />
        </svg>
      </button>

      {/* Search Bar */}
      <div className="flex-1 mx-4 max-w-md">
        <div 
            onClick={onSearchClick}
            className="relative h-[41px] bg-black/5 backdrop-blur-xl rounded-[15.5px] flex items-center px-4 cursor-pointer"
        >
          <div className="w-4 h-4 mr-2 shrink-0">
            <svg viewBox="0 0 15.6 15.6" className="w-full h-full" fill="none">
              <path d={svgPaths.p2540fc00} fill="black" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search here"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            // If onSearchClick is provided, we want to prevent typing here and open the modal instead
            readOnly={!!onSearchClick}
            className={`bg-transparent border-none outline-none text-[15.5px] text-[#616161] w-full placeholder:text-[#616161] font-normal ${onSearchClick ? 'cursor-pointer pointer-events-none' : ''}`}
            style={{ fontFamily: 'sans-serif' }}
          />
        </div>
      </div>

      {/* Profile Avatar */}
      <div className="w-[28px] h-[29px] relative">
        <ImageWithFallback
          src="figma:asset/62b3c4d75055aae6c139ff2536e1fc4730bb50eb.png"
          alt="Profile"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}
