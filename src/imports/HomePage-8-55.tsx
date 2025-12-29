import svgPaths from "./svg-jfktsrkjrm";
import imgEllipse1 from "figma:asset/dc9d2a0a49bcf3eca91fafce4dc73b13bf81c01d.png";

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

function Frame() {
  return (
    <div className="absolute backdrop-blur-[10px] backdrop-filter bg-[rgba(110,110,33,0.1)] box-border content-stretch flex gap-[10px] items-center justify-center left-[calc(87.5%-6.25px)] p-[25px] rounded-[44px] size-[65px] top-[769px] translate-x-[-50%]">
      <IcBaselinePlus />
    </div>
  );
}

function Group() {
  return (
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
  );
}

function SiAiDuotone() {
  return (
    <div className="absolute left-[302px] overflow-clip size-[22px] top-0" data-name="si:ai-duotone">
      <Group />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[5px] items-center justify-center relative shrink-0 w-full">
      <p className="font-['SF_Pro:Semibold',sans-serif] font-[590] leading-[22px] min-w-full relative shrink-0 text-[17px] text-black tracking-[-0.43px] w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Meeting with Marketing
      </p>
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal h-[66px] leading-[22px] relative shrink-0 text-[17px] text-black tracking-[-0.43px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Discussed Q3 campaign goals and key performance indicators. The main takeway...
      </p>
      <SiAiDuotone />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col gap-[9px] items-center justify-center relative shrink-0 w-full">
      <Frame1 />
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[13px] text-neutral-700 tracking-[-0.08px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Edited 2hrs ago
      </p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="absolute backdrop-blur-[15px] backdrop-filter bg-[rgba(0,0,0,0.1)] box-border content-stretch flex flex-col gap-[10px] h-[154px] items-center justify-center left-[24px] px-[23px] py-[17px] rounded-[17px] top-[193px] w-[354px]">
      <Frame2 />
    </div>
  );
}

function Group1() {
  return (
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
  );
}

function SiAiDuotone1() {
  return (
    <div className="absolute left-[302px] overflow-clip size-[22px] top-0" data-name="si:ai-duotone">
      <Group1 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col gap-[5px] items-center justify-center relative shrink-0 w-full">
      <p className="font-['SF_Pro:Semibold',sans-serif] font-[590] leading-[22px] min-w-full relative shrink-0 text-[17px] text-black tracking-[-0.43px] w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Meeting with Marketing
      </p>
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal h-[66px] leading-[22px] relative shrink-0 text-[17px] text-black tracking-[-0.43px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Discussed Q3 campaign goals and key performance indicators. The main takeway...
      </p>
      <SiAiDuotone1 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col gap-[9px] items-center justify-center relative shrink-0 w-full">
      <Frame4 />
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[13px] text-neutral-700 tracking-[-0.08px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Edited 2hrs ago
      </p>
    </div>
  );
}

function Frame7() {
  return (
    <div className="absolute backdrop-blur-[15px] backdrop-filter bg-[rgba(0,0,0,0.1)] box-border content-stretch flex flex-col gap-[10px] h-[154px] items-center justify-center left-[24px] px-[23px] py-[17px] rounded-[17px] top-[360px] w-[354px]">
      <Frame5 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-col gap-[5px] items-center justify-center leading-[22px] relative shrink-0 text-[17px] text-black tracking-[-0.43px] w-full">
      <p className="font-['SF_Pro:Semibold',sans-serif] font-[590] relative shrink-0 w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Meeting with Marketing
      </p>
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal h-[66px] relative shrink-0 w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Discussed Q3 campaign goals and key performance indicators. The main takeway...
      </p>
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex flex-col gap-[9px] items-center justify-center relative shrink-0 w-full">
      <Frame9 />
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[13px] text-neutral-700 tracking-[-0.08px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Edited 2hrs ago
      </p>
    </div>
  );
}

function Frame8() {
  return (
    <div className="absolute backdrop-blur-[15px] backdrop-filter bg-[rgba(0,0,0,0.1)] box-border content-stretch flex flex-col gap-[10px] h-[154px] items-center justify-center left-[24px] px-[23px] py-[17px] rounded-[17px] top-[527px] w-[354px]">
      <Frame10 />
    </div>
  );
}

function IcRoundMenu() {
  return (
    <div className="relative shrink-0 size-[39px]" data-name="ic:round-menu">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 39 39">
        <g id="ic:round-menu">
          <path d={svgPaths.p23f2e500} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function IcRoundSearch() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="ic:round-search">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="ic:round-search">
          <path d={svgPaths.pce0d300} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0">
      <IcRoundSearch />
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[25px] relative shrink-0 text-[20px] text-[rgba(0,0,0,0.7)] text-nowrap tracking-[-0.45px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Search here
      </p>
    </div>
  );
}

function Frame6() {
  return (
    <div className="backdrop-blur-[15px] backdrop-filter bg-[rgba(0,0,0,0.1)] box-border content-stretch flex gap-[10px] h-[47px] items-center pl-[16px] pr-[23px] py-[17px] relative rounded-[17px] shrink-0 w-[257px]">
      <Frame11 />
    </div>
  );
}

function Frame12() {
  return (
    <div className="absolute content-stretch flex gap-[14px] items-center justify-center left-[29px] top-[60px] w-[355px]">
      <IcRoundMenu />
      <Frame6 />
      <div className="relative shrink-0 size-[31px]">
        <img alt="" className="block max-w-none size-full" height="31" src={imgEllipse1} width="31" />
      </div>
    </div>
  );
}

function MaterialSymbolsStarRounded() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="material-symbols:star-rounded">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="material-symbols:star-rounded">
          <path d={svgPaths.p1be2bcf0} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame13() {
  return (
    <div className="absolute content-stretch flex items-center justify-between left-[39px] top-[140px] w-[324px]">
      <p className="font-['SF_Pro:Semibold',sans-serif] font-[590] leading-[25px] relative shrink-0 text-[20px] text-black text-nowrap tracking-[-0.45px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Notes
      </p>
      <MaterialSymbolsStarRounded />
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="bg-[#ffff45] overflow-clip relative rounded-[14px] size-full" data-name="Home Page">
      <Frame />
      <Frame3 />
      <Frame7 />
      <Frame8 />
      <Frame12 />
      <Frame13 />
    </div>
  );
}