import svgPaths from "./svg-lpg7o7kyah";

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

function Frame3() {
  return (
    <div className="absolute backdrop-blur-[15px] backdrop-filter bg-[rgba(0,0,0,0.1)] box-border content-stretch flex flex-col gap-[10px] h-[47px] items-start justify-center left-[39px] px-[23px] py-[17px] rounded-[17px] top-[144px] w-[324px]">
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[25px] relative shrink-0 text-[20px] text-[rgba(0,0,0,0.7)] text-nowrap tracking-[-0.45px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Marketing
      </p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[5px] items-center justify-center leading-[22px] relative shrink-0 text-[17px] text-black tracking-[-0.43px] w-full">
      <p className="font-['SF_Pro:Semibold',sans-serif] font-[590] relative shrink-0 w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <span>{`Meeting with `}</span>
        <span className="text-[#0088ff]">Marketing</span>
      </p>
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal relative shrink-0 w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Discussed Q3 campaign goals and...
      </p>
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

function Frame4() {
  return (
    <div className="absolute backdrop-blur-[15px] backdrop-filter bg-[rgba(0,0,0,0.1)] box-border content-stretch flex flex-col gap-[10px] items-center justify-center left-[39px] px-[23px] py-[17px] rounded-[17px] top-[256px] w-[324px]">
      <Frame2 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col gap-[5px] items-center justify-center leading-[22px] relative shrink-0 text-[17px] text-black tracking-[-0.43px] w-full">
      <p className="font-['SF_Pro:Semibold',sans-serif] font-[590] relative shrink-0 w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <span>{`Meeting with `}</span>
        <span className="text-[#0088ff]">Marketing</span>
      </p>
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal relative shrink-0 w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Discussed Q3 campaign goals and...
      </p>
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex flex-col gap-[9px] items-center justify-center relative shrink-0 w-[278px]">
      <Frame5 />
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[13px] text-neutral-700 tracking-[-0.08px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Edited 3hrs ago
      </p>
    </div>
  );
}

function Frame10() {
  return (
    <div className="absolute backdrop-blur-[15px] backdrop-filter bg-[rgba(0,0,0,0.1)] box-border content-stretch flex flex-col gap-[10px] items-center justify-center left-[39px] px-[23px] py-[17px] rounded-[17px] top-[382px] w-[324px]">
      <Frame12 />
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex flex-col gap-[5px] items-center justify-center leading-[22px] relative shrink-0 text-[17px] text-black tracking-[-0.43px] w-full">
      <p className="font-['SF_Pro:Semibold',sans-serif] font-[590] relative shrink-0 w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <span>{`Meeting with `}</span>
        <span className="text-[#0088ff]">Marketing</span>
      </p>
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal relative shrink-0 w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Discussed Q3 campaign goals and...
      </p>
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex flex-col gap-[9px] items-center justify-center relative shrink-0 w-[278px]">
      <Frame13 />
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[13px] text-neutral-700 tracking-[-0.08px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Edited 5hrs ago
      </p>
    </div>
  );
}

function Frame11() {
  return (
    <div className="absolute backdrop-blur-[15px] backdrop-filter bg-[rgba(0,0,0,0.1)] box-border content-stretch flex flex-col gap-[10px] items-center justify-center left-[39px] px-[23px] py-[17px] rounded-[17px] top-[508px] w-[324px]">
      <Frame14 />
    </div>
  );
}

function IcRoundSearch() {
  return (
    <div className="absolute left-[328px] size-[24px] top-[156px]" data-name="ic:round-search">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="ic:round-search">
          <path d={svgPaths.pce0d300} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function BxsChevronUp() {
  return (
    <div className="relative size-[24px]" data-name="bxs:chevron-up">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="bxs:chevron-up">
          <path d={svgPaths.p2ad7500} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame7() {
  return (
    <div className="box-border content-stretch flex items-center justify-center pl-0 pr-[2px] py-0 relative shrink-0">
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[22px] mr-[-2px] relative shrink-0 text-[17px] text-black text-center text-nowrap tracking-[-0.43px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Filter
      </p>
      <div className="flex items-center justify-center mr-[-2px] relative shrink-0">
        <div className="flex-none rotate-[180deg]">
          <BxsChevronUp />
        </div>
      </div>
    </div>
  );
}

function BxsChevronDown() {
  return (
    <div className="mr-[-2px] relative shrink-0 size-[24px]" data-name="bxs:chevron-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="bxs:chevron-down">
          <path d={svgPaths.p15365e00} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame6() {
  return (
    <div className="box-border content-stretch flex items-center justify-center pl-0 pr-[2px] py-0 relative shrink-0">
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[22px] mr-[-2px] relative shrink-0 text-[17px] text-black text-center text-nowrap tracking-[-0.43px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Date
      </p>
      <BxsChevronDown />
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex gap-[13px] items-center justify-center relative shrink-0">
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[22px] relative shrink-0 text-[17px] text-black text-center text-nowrap tracking-[-0.43px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Short by
      </p>
      <Frame6 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="absolute content-stretch flex items-center justify-between left-[calc(50%+6px)] top-[203px] translate-x-[-50%] w-[290px]">
      <Frame7 />
      <Frame8 />
    </div>
  );
}

export default function Search() {
  return (
    <div className="bg-[#ffff45] overflow-clip relative rounded-[40px] size-full" data-name="Search">
      <div className="absolute box-border content-stretch flex gap-[154px] items-center justify-center left-0 pb-[19px] pt-[21px] px-[16px] top-0 w-[402px]" data-name="Status bar - iPhone">
        <Time />
        <Levels />
      </div>
      <Frame />
      <Frame3 />
      <Frame4 />
      <Frame10 />
      <Frame11 />
      <IcRoundSearch />
      <Frame9 />
      <div className="absolute box-border content-stretch flex font-['SF_Pro:Medium',sans-serif] font-[510] h-[36px] items-center justify-center leading-[0] left-[39px] min-w-[36px] px-[8px] py-0 rounded-[100px] text-[17px] text-center text-neutral-700 text-nowrap top-[85px]" data-name="Text">
        <div className="flex flex-col justify-center relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
          <p className="leading-[normal] text-nowrap whitespace-pre">􀯶</p>
        </div>
        <div className="flex flex-col justify-center relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
          <p className="leading-[normal] text-nowrap whitespace-pre">Back to notes</p>
        </div>
      </div>
    </div>
  );
}