import svgPaths from "./svg-kpjggey3by";
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

function Frame5() {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0">
      <IcRoundSearch />
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[25px] relative shrink-0 text-[20px] text-[rgba(0,0,0,0.7)] text-nowrap tracking-[-0.45px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Search here
      </p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="backdrop-blur-[15px] backdrop-filter bg-[rgba(0,0,0,0.1)] box-border content-stretch flex gap-[10px] h-[47px] items-center pl-[16px] pr-[23px] py-[17px] relative rounded-[17px] shrink-0 w-[257px]">
      <Frame5 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="absolute content-stretch flex gap-[14px] items-center justify-center left-[29px] top-[60px] w-[355px]">
      <IcRoundMenu />
      <Frame3 />
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

function Frame7() {
  return (
    <div className="absolute content-stretch flex items-center justify-between left-[39px] top-[140px] w-[324px]">
      <p className="font-['SF_Pro:Semibold',sans-serif] font-[590] leading-[25px] relative shrink-0 text-[20px] text-black text-nowrap tracking-[-0.45px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Notes
      </p>
      <MaterialSymbolsStarRounded />
    </div>
  );
}

function MaterialSymbolsInfoRounded() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="material-symbols:info-rounded">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="material-symbols:info-rounded">
          <path d={svgPaths.p992c5c0} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
      <p className="basis-0 font-['SF_Pro:Semibold',sans-serif] font-[590] grow leading-[22px] min-h-px min-w-px relative shrink-0 text-[17px] text-black tracking-[-0.43px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Where does it came from
      </p>
      <MaterialSymbolsInfoRounded />
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <Frame13 />
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[22px] relative shrink-0 text-[17px] text-black tracking-[-0.43px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>{`Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. `}</p>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-col gap-[5px] items-start relative shrink-0 w-[308px]">
      <Frame8 />
    </div>
  );
}

function IcBaselineDelete() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="ic:baseline-delete">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="ic:baseline-delete">
          <path d={svgPaths.p2eacd800} fill="var(--fill-0, #FF383C)" id="Vector" />
        </g>
      </svg>
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
    <div className="overflow-clip relative shrink-0 size-[22px]" data-name="si:ai-duotone">
      <Group />
    </div>
  );
}

function MaterialSymbolsStarRounded1() {
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

function MaterialSymbolsEdit() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="material-symbols:edit">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="material-symbols:edit">
          <path d={svgPaths.p2958d400} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[82px]">
      <SiAiDuotone />
      <MaterialSymbolsStarRounded1 />
      <MaterialSymbolsEdit />
    </div>
  );
}

function Frame11() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center justify-between px-[6px] py-0 relative w-full">
          <IcBaselineDelete />
          <Frame12 />
        </div>
      </div>
    </div>
  );
}

function Frame10() {
  return (
    <div className="absolute bg-[rgba(223,223,223,0.6)] box-border content-stretch flex flex-col gap-[10px] items-start left-1/2 px-[23px] py-[17px] rounded-[17px] top-[194px] translate-x-[-50%] w-[354px]">
      <Frame9 />
      <Frame11 />
    </div>
  );
}

function Frame1() {
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

function Frame4() {
  return (
    <div className="absolute backdrop-blur-[15px] backdrop-filter bg-[rgba(0,0,0,0.1)] box-border content-stretch flex flex-col gap-[10px] h-[154px] items-center justify-center left-[24px] px-[23px] py-[17px] rounded-[17px] top-[545px] w-[354px]">
      <Frame2 />
    </div>
  );
}

export default function ExpandedCard() {
  return (
    <div className="bg-[#ffff45] overflow-clip relative rounded-[14px] size-full" data-name="Expanded card">
      <Frame />
      <Frame6 />
      <Frame7 />
      <Frame10 />
      <Frame4 />
    </div>
  );
}