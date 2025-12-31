import svgPaths from "./svg-5hcwgli0hm";
import imgEllipse1 from "figma:asset/dc9d2a0a49bcf3eca91fafce4dc73b13bf81c01d.png";
import { imgFrame } from "./svg-77sym";

function Layer() {
  return (
    <div className="h-[384.617px] relative w-[719.502px]" data-name="Layer_1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 719.502 384.617">
        <g clipPath="url(#clip0_3_117)" id="Layer_1">
          <path d={svgPaths.pe31b6c0} fill="var(--fill-0, #B4D1FF)" id="Vector" />
          <path d={svgPaths.p7f5dd00} fill="var(--fill-0, #B4D1FF)" id="Vector_2" />
          <path d={svgPaths.p1a04e100} fill="var(--fill-0, #B4D1FF)" id="Vector_3" />
          <path d={svgPaths.p1273db00} fill="var(--fill-0, #B4D1FF)" id="Vector_4" />
          <path d={svgPaths.p16389880} fill="var(--fill-0, #B4D1FF)" id="Vector_5" />
          <path d={svgPaths.p2debb200} fill="var(--fill-0, #B4D1FF)" id="Vector_6" />
          <path d={svgPaths.p42b2230} fill="var(--fill-0, #B4D1FF)" id="Vector_7" />
          <path d={svgPaths.p19bc7480} fill="var(--fill-0, #B4D1FF)" id="Vector_8" />
          <path d={svgPaths.p33cec380} fill="var(--fill-0, #B4D1FF)" id="Vector_9" />
          <path d={svgPaths.p2e087600} fill="var(--fill-0, #B4D1FF)" id="Vector_10" />
          <path d={svgPaths.p35ff6a00} fill="var(--fill-0, #B4D1FF)" id="Vector_11" />
          <path d={svgPaths.pa470600} fill="var(--fill-0, #B4D1FF)" id="Vector_12" />
          <path d={svgPaths.p3115f880} fill="var(--fill-0, #B4D1FF)" id="Vector_13" />
          <path d={svgPaths.p18d4e5f0} fill="var(--fill-0, #B4D1FF)" id="Vector_14" />
        </g>
        <defs>
          <clipPath id="clip0_3_117">
            <rect fill="white" height="384.617" width="719.502" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-[5.84px] top-[146.13px]">
      <div className="absolute flex h-[719.896px] items-center justify-center left-[5.84px] top-[146.13px] w-[390.314px]" style={{ "--transform-inner-width": "300", "--transform-inner-height": "150" } as React.CSSProperties}>
        <div className="flex-none rotate-[89.546deg] scale-y-[-100%] skew-x-[0.516deg]">
          <Layer />
        </div>
      </div>
    </div>
  );
}

function IcRoundMenu() {
  return (
    <div className="absolute left-[22.5px] size-[39px] top-[64px]" data-name="ic:round-menu">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 39 39">
        <g id="ic:round-menu">
          <path d={svgPaths.p23f2e500} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
      <p className="basis-0 font-['SF_Pro:Semibold',sans-serif] font-[590] grow leading-[22px] min-h-px min-w-px relative shrink-0 text-[17px] text-black tracking-[-0.43px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Where does it came from
      </p>
    </div>
  );
}

function TextSelection() {
  return <div className="absolute bg-[rgba(80,156,254,0.2)] h-[24px] left-[54px] mix-blend-screen top-[178px] w-[97px]" data-name="Text Selection" />;
}

function Materials() {
  return <div className="absolute inset-0 overflow-clip" data-name="_Materials" />;
}

function Actions() {
  return (
    <div className="absolute h-[40px] left-0 overflow-clip right-0 rounded-[8px] top-0" data-name="Actions">
      <Materials />
    </div>
  );
}

function Materials1() {
  return (
    <div className="h-[8px] overflow-clip relative w-[29px]" data-name="_Materials">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute bg-[rgba(153,153,153,0.97)] inset-0" />
        <div className="absolute backdrop-blur-[25px] backdrop-filter bg-[#5c5c5c] inset-0 mix-blend-color-dodge" />
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute h-[8px] left-[10.5px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-0.5px_0px] mask-size-[29px_8px] top-0 w-[29px]" data-name="Frame" style={{ maskImage: `url('${imgFrame}')` }}>
      <div className="absolute flex h-[8px] items-center justify-center left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[29px]">
        <div className="flex-none scale-y-[-100%]">
          <Materials1 />
        </div>
      </div>
    </div>
  );
}

function Tail() {
  return (
    <div className="absolute h-[10px] left-[calc(50%+0.5px)] top-[40px] translate-x-[-50%] w-[50px]" data-name="Tail">
      <Frame />
    </div>
  );
}

function Background() {
  return (
    <div className="absolute inset-0 shadow-[0px_3px_31px_0px_rgba(0,0,0,0.25)]" data-name="Background">
      <Actions />
      <Tail />
    </div>
  );
}

function Action() {
  return (
    <div className="basis-0 grow h-[40px] min-h-px min-w-px relative shrink-0" data-name="Action 1">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center pl-[8px] pr-0 py-0 size-full" />
      </div>
    </div>
  );
}

function Action1() {
  return (
    <div className="basis-0 grow h-[40px] min-h-px min-w-px relative shrink-0" data-name="Action 2">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[8px] py-0 size-full" />
      </div>
    </div>
  );
}

function Actions1() {
  return (
    <div className="content-stretch flex items-start justify-center overflow-clip relative rounded-[8px] shrink-0 w-full" data-name="Actions">
      <Action />
      <Action1 />
    </div>
  );
}

function CompactMenu() {
  return (
    <div className="absolute content-stretch flex flex-col items-center justify-end left-[32px] top-[114px] w-[177px]" data-name="Compact Menu">
      <Background />
      <Actions1 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <Frame6 />
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[22px] min-w-full relative shrink-0 text-[17px] text-black tracking-[-0.43px] w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>{`Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, `}</p>
      <TextSelection />
      <CompactMenu />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame1 />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-[7.38%]" data-name="Group">
      <div className="absolute inset-[-4%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.251 20.251">
          <g id="Group">
            <path d={svgPaths.p79ef200} fill="var(--fill-0, black)" fillOpacity="0.16" id="Vector" />
            <path d={svgPaths.p74118f0} id="Vector_2" stroke="var(--stroke-0, #FFFF45)" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" />
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

function Frame5() {
  return (
    <div className="bg-[#33331e] content-stretch flex items-center justify-between px-[9px] py-[4px] relative rounded-[15px] shrink-0 w-[110px]">
      <SiAiDuotone />
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[21px] relative shrink-0 text-[#ffff45] text-[16px] text-nowrap tracking-[-0.31px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Enhance
      </p>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[168px]">
      <Frame5 />
      <div className="relative shrink-0 size-[18px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
          <path d={svgPaths.p2959c00} fill="var(--fill-0, #33331E)" id="Vector" />
        </svg>
      </div>
      <div className="h-[19px] relative shrink-0 w-[14px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 19">
          <path d={svgPaths.pd5401c0} fill="var(--fill-0, #33331E)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pl-0 pr-[6px] py-0 relative w-full">
          <Frame7 />
          <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[21px] relative shrink-0 text-[#ff383c] text-[16px] text-nowrap tracking-[-0.31px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            Close
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="absolute bg-[rgba(223,223,223,0.6)] content-stretch flex flex-col gap-[50px] items-start left-[24px] px-[23px] py-[17px] right-[24px] rounded-[17px] top-[136px]">
      <Frame2 />
      <Frame4 />
    </div>
  );
}

export default function EidtingPage() {
  return (
    <div className="bg-white overflow-clip relative rounded-[14px] size-full" data-name="Eidting page">
      <Group1 />
      <div className="absolute backdrop-blur-[5.5px] backdrop-filter bg-[rgba(254,254,254,0.8)] h-[874px] left-0 top-0 w-[402px]" />
      <IcRoundMenu />
      <div className="absolute right-[24.5px] size-[31px] top-[68px]">
        <img alt="" className="block max-w-none size-full" height="31" src={imgEllipse1} width="31" />
      </div>
      <p className="absolute font-['SF_Pro:Semibold',sans-serif] font-[590] leading-[25px] left-[calc(50%-19px)] text-[20px] text-black text-nowrap top-[71px] tracking-[-0.45px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Edit
      </p>
      <Frame3 />
    </div>
  );
}