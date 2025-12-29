import svgPaths from "./svg-t0hcrv8pvq";

function Frame() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0.1)] box-border content-stretch flex gap-[10px] h-[40px] items-center left-1/2 px-[25px] py-[10px] rounded-[4px] top-[207px] translate-x-[-50%] w-[310px]">
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[15px] text-[rgba(0,0,0,0.3)] text-nowrap tracking-[-0.23px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Email
      </p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0.1)] box-border content-stretch flex gap-[10px] h-[40px] items-center left-1/2 px-[25px] py-[10px] rounded-[4px] top-[291px] translate-x-[-50%] w-[310px]">
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[15px] text-[rgba(0,0,0,0.3)] text-nowrap tracking-[-0.23px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Password
      </p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0.8)] box-border content-stretch flex gap-[10px] h-[40px] items-center justify-center left-[calc(50%+0.5px)] px-[30px] py-[10px] rounded-[4px] top-[381px] translate-x-[-50%]">
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#ffff45] text-[15px] text-nowrap tracking-[-0.23px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Sign in
      </p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0.8)] box-border content-stretch flex flex-col gap-[10px] h-[40px] items-center justify-center left-[calc(50%+0.5px)] px-[25px] py-[10px] rounded-[4px] top-[569px] translate-x-[-50%]">
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#ffff45] text-[15px] text-nowrap tracking-[-0.23px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Continue as a guest
      </p>
    </div>
  );
}

function Group() {
  return (
    <div className="relative size-full" data-name="Group">
      <div className="absolute inset-[-0.27%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 276 282">
          <g id="Group">
            <path d={svgPaths.pbf6700} id="Vector" stroke="var(--stroke-0, black)" strokeWidth="1.5" />
            <path d={svgPaths.p3aa1f340} id="Vector_2" opacity="0.5" stroke="var(--stroke-0, black)" strokeWidth="1.5" />
            <path d={svgPaths.p36220980} id="Vector_3" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="1.5" />
            <path d={svgPaths.p4fa9960} id="Vector_4" opacity="0.5" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="absolute box-border content-stretch flex gap-[10px] h-[40px] items-center justify-center left-1/2 px-[25px] py-[10px] rounded-[4px] top-[475px] translate-x-[-50%]">
      <div aria-hidden="true" className="absolute border-[0.75px] border-black border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[15px] text-black text-nowrap tracking-[-0.23px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Create an account
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="bg-[#ffff45] overflow-clip relative rounded-[14px] size-full" data-name="loginPage">
      <p className="absolute font-['SF_Pro:Bold',sans-serif] font-bold leading-[34px] left-[calc(50%-96px)] text-[28px] text-black text-nowrap top-[114px] tracking-[0.38px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Welcome Back
      </p>
      <p className="absolute font-['SF_Pro:Regular',sans-serif] font-normal leading-[16px] left-[calc(50%-53px)] text-[12px] text-[rgba(60,60,67,0.6)] text-nowrap top-[155px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Sign in to continue
      </p>
      <Frame />
      <Frame1 />
      <Frame3 />
      <Frame2 />
      <p className="absolute font-['SF_Pro:Regular',sans-serif] font-normal leading-[18px] left-[calc(50%-71px)] text-[13px] text-black text-nowrap top-[439px] tracking-[-0.08px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Don’t have an account?
      </p>
      <p className="absolute font-['SF_Pro:Regular',sans-serif] font-normal leading-[16px] left-[calc(50%+47px)] text-[12px] text-[rgba(0,0,0,0.7)] text-nowrap top-[336px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Forget Password?
      </p>
      <p className="absolute font-['SF_Pro:Regular',sans-serif] font-normal leading-[18px] left-[calc(50%-7px)] text-[13px] text-black text-nowrap top-[533px] tracking-[-0.08px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        or
      </p>
      <div className="absolute flex inset-[77%_-4.79%_-9.38%_35.82%] items-center justify-center">
        <div className="flex-none h-[279.515px] rotate-[180.722deg] scale-y-[-100%] w-[273.735px]">
          <Group />
        </div>
      </div>
      <Frame4 />
    </div>
  );
}