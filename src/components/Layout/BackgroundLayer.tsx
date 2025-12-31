import React from 'react';
import svgPaths from '../../imports/svg-g7aqyafhff';

function Layer() {
  return (
    <div className="h-[352.052px] relative w-[658.583px]">
      <svg className="block w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 658.583 352.052">
        <g clipPath="url(#clip0_7_247_bg)">
          <path d={svgPaths.p23f86700} fill="#B4D1FF" />
          <path d={svgPaths.p1f4ec200} fill="#B4D1FF" />
          <path d={svgPaths.p2df81c70} fill="#B4D1FF" />
          <path d={svgPaths.p3ed06800} fill="#B4D1FF" />
          <path d={svgPaths.p3cb72700} fill="#B4D1FF" />
          <path d={svgPaths.p7ae0b00} fill="#B4D1FF" />
          <path d={svgPaths.p224e6600} fill="#B4D1FF" />
          <path d={svgPaths.p256fadf2} fill="#B4D1FF" />
          <path d={svgPaths.pb7f2d00} fill="#B4D1FF" />
          <path d={svgPaths.p13d28480} fill="#B4D1FF" />
          <path d={svgPaths.p38a67000} fill="#B4D1FF" />
          <path d={svgPaths.p24158980} fill="#B4D1FF" />
          <path d={svgPaths.p3390ff80} fill="#B4D1FF" />
          <path d={svgPaths.pc666e00} fill="#B4D1FF" />
        </g>
        <defs>
          <clipPath id="clip0_7_247_bg">
            <rect fill="white" height="352.052" width="658.583" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

export function BackgroundLayer() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute left-[5.35px] top-[105.76px] opacity-60 sm:opacity-100">
         <div className="absolute flex h-[658.944px] items-center justify-center left-[5.35px] top-[105.76px] w-[357.267px]" style={{ transform: 'rotate(89.546deg) scaleY(-1) skewX(0.516deg)' }}>
            <Layer />
         </div>
      </div>
      {/* Additional blur overlay from Figma */}
      <div className="absolute backdrop-blur-[5px] bg-[rgba(254,254,254,0.8)] inset-0 w-full h-full" />
    </div>
  );
}
