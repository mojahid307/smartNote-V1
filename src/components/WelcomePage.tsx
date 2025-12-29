import { motion } from 'motion/react';
import { useState } from 'react';
import svgPaths from '../imports/svg-ynvwq4g7sn';
import AuthPage from './AuthPage';
import { User } from '../App';

interface WelcomePageProps {
  onStart: (user: User) => void;
}

function Time() {
  return (
    <div className="basis-0 box-border content-stretch flex gap-[10px] grow h-[22px] items-center justify-center min-h-px min-w-px pb-0 pt-[2px] px-0 relative shrink-0" data-name="Time">
      <p className="font-['SF_Pro:Semibold',sans-serif] font-[590] leading-[22px] relative shrink-0 text-[17px] text-black text-center text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        9:41
      </p>
    </div>
  );
}

function Battery() {
  return (
    <div className="h-[13px] relative shrink-0 w-[27.328px]" data-name="Battery">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 13">
        <g id="Battery">
          <rect height="12" id="Border" opacity="0.35" rx="3.8" stroke="var(--stroke-0, black)" width="24" x="0.5" y="0.5" />
          <path d={svgPaths.p3bbd9700} fill="var(--fill-0, black)" id="Cap" opacity="0.4" />
          <rect fill="var(--fill-0, black)" height="9" id="Capacity" rx="2.5" width="21" x="2" y="2" />
        </g>
      </svg>
    </div>
  );
}

function Levels() {
  return (
    <div className="basis-0 box-border content-stretch flex gap-[7px] grow h-[22px] items-center justify-center min-h-px min-w-px pb-0 pt-px px-0 relative shrink-0" data-name="Levels">
      <div className="h-[12.226px] relative shrink-0 w-[19.2px]" data-name="Cellular Connection">
        <div className="absolute inset-0" style={{ "--fill-0": "rgba(0, 0, 0, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 13">
            <path clipRule="evenodd" d={svgPaths.p1e09e400} fill="var(--fill-0, black)" fillRule="evenodd" id="Cellular Connection" />
          </svg>
        </div>
      </div>
      <div className="h-[12.328px] relative shrink-0 w-[17.142px]" data-name="Wifi">
        <div className="absolute inset-0" style={{ "--fill-0": "rgba(0, 0, 0, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 13">
            <path clipRule="evenodd" d={svgPaths.p18b35300} fill="var(--fill-0, black)" fillRule="evenodd" id="Wifi" />
          </svg>
        </div>
      </div>
      <Battery />
    </div>
  );
}

function ArcticonsNotes() {
  return (
    <div className="absolute left-[273px] size-[187px] top-[299px]" data-name="arcticons:notes-2">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 187 187">
        <g id="arcticons:notes-2">
          <path d={svgPaths.p3e7ef300} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-[8.33%_10.06%_8.34%_8.33%]" data-name="Group">
      <div className="absolute inset-[-0.36%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 208 212">
          <g id="Group">
            <path d={svgPaths.p1d23ab00} id="Vector" stroke="var(--stroke-0, black)" strokeWidth="1.5" />
            <path d={svgPaths.p383c95a0} id="Vector_2" opacity="0.5" stroke="var(--stroke-0, black)" strokeWidth="1.5" />
            <path d={svgPaths.p30aa150} id="Vector_3" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="1.5" />
            <path d={svgPaths.p371d5500} id="Vector_4" opacity="0.5" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function SolarNotesLineDuotone() {
  return (
    <div className="absolute left-[-45px] overflow-clip size-[252px] top-[545px]" data-name="solar:notes-line-duotone">
      <Group />
    </div>
  );
}

function IcBaselinePlus() {
  return (
    <div className="relative shrink-0 size-[50px]" data-name="ic:baseline-plus">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 50 50">
        <g id="ic:baseline-plus">
          <g filter="url(#filter0_d_1_92)" id="Vector">
            <path d={svgPaths.p2328a380} fill="var(--fill-0, black)" />
          </g>
        </g>
        <defs>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="37.1667" id="filter0_d_1_92" width="37.1667" x="6.41667" y="7.4125">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feOffset dy="1" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
            <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_92" />
            <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_92" mode="normal" result="shape" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}

export default function WelcomePage({ onStart }: WelcomePageProps) {
  const [showAuth, setShowAuth] = useState(false);

  if (showAuth) {
    return <AuthPage onAuth={onStart} />;
  }

  return (
    <div className="bg-[#ffff45] overflow-clip relative size-full min-h-screen" data-name="Welcome Page">
      <div className="absolute inset-[51.92%_19.03%_32.8%_40.67%]">
        <div className="absolute inset-[-0.37%_-0.31%_-0.37%_-0.04%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 163 135">
            <path d={svgPaths.p18d2ea80} id="Vector 1" stroke="var(--stroke-0, black)" />
          </svg>
        </div>
      </div>
      {/* Status bar removed */}
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="absolute font-['SF_Pro:Bold',sans-serif] font-bold leading-[59px] left-[calc(50%-133px)] text-[43px] text-black text-nowrap top-[195px] tracking-[0.6594px] whitespace-pre" 
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        SmartKeeper
      </motion.p>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="absolute font-['SF_Pro:Bold',sans-serif] font-bold leading-[28px] left-[calc(50%-138px)] text-[22px] text-black text-nowrap top-[254px] tracking-[-0.26px] whitespace-pre" 
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        Handel Your Notes Smartly
      </motion.p>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
      >
        <ArcticonsNotes />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8 }}
      >
        <SolarNotesLineDuotone />
      </motion.div>
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ delay: 1 }}
        onClick={() => setShowAuth(true)}
        className="absolute backdrop-blur-[10px] backdrop-filter bg-[rgba(110,110,33,0.1)] box-border content-stretch flex gap-[10px] items-center justify-center left-1/2 p-[25px] rounded-[44px] size-[82px] top-[533px] translate-x-[-50%] cursor-pointer hover:bg-[rgba(110,110,33,0.2)] transition-colors"
      >
        <IcBaselinePlus />
      </motion.button>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="absolute font-['SF_Pro:Regular',sans-serif] font-normal leading-[25px] left-[calc(50%-56px)] text-[20px] text-black text-nowrap top-[751px] tracking-[-0.45px] whitespace-pre pointer-events-none" 
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        Start Writing
      </motion.p>
      <div className="absolute h-[127px] left-[218.5px] top-[622.5px] w-[27.206px]">
        <div className="absolute inset-[-0.64%_-1.84%_-0.39%_-1.78%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29 129">
            <path d={svgPaths.p158c0200} id="Vector 2" stroke="var(--stroke-0, black)" />
          </svg>
        </div>
      </div>
    </div>
  );
}