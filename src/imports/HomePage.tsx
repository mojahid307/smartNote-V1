import svgPaths from "./svg-oxgn2iu7ra";

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
    <div className="absolute backdrop-blur-[10px] backdrop-filter bg-[rgba(110,110,33,0.1)] box-border content-stretch flex gap-[10px] items-center justify-center left-[calc(50%+114px)] p-[25px] rounded-[44px] size-[82px] top-[744px] translate-x-[-50%]">
      <IcBaselinePlus />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-[10.935%]" data-name="Group">
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
    <div className="absolute left-[254px] overflow-clip size-[24px] top-0" data-name="si:ai-duotone">
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
    <div className="content-stretch flex flex-col gap-[9px] items-center justify-center relative shrink-0 w-[278px]">
      <Frame1 />
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[13px] text-neutral-700 tracking-[-0.08px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Edited 2hrs ago
      </p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="absolute backdrop-blur-[15px] backdrop-filter bg-[rgba(0,0,0,0.1)] box-border content-stretch flex flex-col gap-[10px] h-[154px] items-center justify-center left-[39px] px-[23px] py-[17px] rounded-[17px] top-[143px] w-[324px]">
      <Frame2 />
    </div>
  );
}

function Frame6() {
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

function Frame7() {
  return (
    <div className="content-stretch flex flex-col gap-[9px] items-center justify-center relative shrink-0 w-[278px]">
      <Frame6 />
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[13px] text-neutral-700 tracking-[-0.08px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Edited 2hrs ago
      </p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="absolute backdrop-blur-[15px] backdrop-filter bg-[rgba(0,0,0,0.1)] box-border content-stretch flex flex-col gap-[10px] h-[154px] items-center justify-center left-[39px] px-[23px] py-[17px] rounded-[17px] top-[325px] w-[324px]">
      <Frame7 />
    </div>
  );
}

function Frame8() {
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

function Frame9() {
  return (
    <div className="content-stretch flex flex-col gap-[9px] items-center justify-center relative shrink-0 w-[278px]">
      <Frame8 />
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[13px] text-neutral-700 tracking-[-0.08px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Edited 2hrs ago
      </p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="absolute backdrop-blur-[15px] backdrop-filter bg-[rgba(0,0,0,0.1)] box-border content-stretch flex flex-col gap-[10px] h-[154px] items-center justify-center left-[39px] px-[23px] py-[17px] rounded-[17px] top-[507px] w-[324px]">
      <Frame9 />
    </div>
  );
}

function IcRoundSearch() {
  return (
    <div className="absolute left-[339px] size-[24px] top-[91px]" data-name="ic:round-search">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="ic:round-search">
          <path d={svgPaths.pce0d300} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="bg-[#ffff45] overflow-clip relative rounded-[40px] size-full" data-name="Home Page">
      <div className="absolute box-border content-stretch flex gap-[154px] items-center justify-center left-0 pb-[19px] pt-[21px] px-[16px] top-0 w-[402px]" data-name="Status bar - iPhone">
        <Time />
        <Levels />
      </div>
      <Frame />
      <p className="absolute font-['SF_Pro:Semibold',sans-serif] font-[590] leading-[25px] left-[calc(50%-162px)] text-[20px] text-black text-nowrap top-[90px] tracking-[-0.45px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Notes
      </p>
      <Frame3 />
      <Frame4 />
      <Frame5 />
      <IcRoundSearch />
    </div>
  );
}