import React, { useState } from 'react';
import svgPaths from "../imports/svg-2g0z7wzze2";
import { motion } from 'motion/react';
import { supabase } from '../utils/supabase/client';
import { toast } from 'sonner@2.0.3';
import { Loader2 } from 'lucide-react';

interface SignupPageProps {
  onNavigateToLogin: () => void;
  onContinueAsGuest: () => void;
  onSignupSuccess: () => void;
}

function Group() {
  return (
    <div className="absolute inset-[8.33%_10.07%_8.34%_8.33%]" data-name="Group">
      <div className="absolute inset-[-0.27%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 246.479 251.655">
          <g id="Group">
            <path d={svgPaths.p1274f800} id="Vector" stroke="var(--stroke-0, black)" strokeWidth="1.34328" />
            <path d={svgPaths.p21e73500} id="Vector_2" opacity="0.5" stroke="var(--stroke-0, black)" strokeWidth="1.34328" />
            <path d={svgPaths.p1930a4c0} id="Vector_3" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="1.34328" />
            <path d={svgPaths.p1fa85940} id="Vector_4" opacity="0.5" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="1.34328" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function SolarNotesLineDuotone() {
  return (
    <div className="overflow-clip relative size-[300.399px]" data-name="solar:notes-line-duotone">
      <Group />
    </div>
  );
}

export function SignupPage({ onNavigateToLogin, onContinueAsGuest, onSignupSuccess }: SignupPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Account created!");
        onSignupSuccess();
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during sign up");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm"
    >
        <div className="bg-white overflow-clip relative rounded-[12.537px] w-[360px] h-[640px] shadow-2xl scale-90 sm:scale-100" data-name="signup">
            <p className="absolute font-['SF_Pro_Display',sans-serif] font-bold leading-[30.448px] left-[50%] -translate-x-1/2 text-[25.075px] text-black text-nowrap top-[102.09px] tracking-[0.3403px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                Create account
            </p>
            
            <div className="absolute flex items-center justify-center left-[-39.4px] size-[304.162px] top-[585.67px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
                <div className="flex-none rotate-[359.278deg]">
                <SolarNotesLineDuotone />
                </div>
            </div>
            
            <p className="absolute font-['SF_Pro_Text',sans-serif] font-normal leading-[14.328px] left-[50%] -translate-x-1/2 text-[10.746px] text-[rgba(60,60,67,0.6)] text-nowrap top-[138.81px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                Sign up to get started
            </p>

            <form onSubmit={handleSignup}>
                {/* Full Name Input */}
                <div className="absolute bg-[rgba(0,0,0,0.05)] content-stretch flex h-[35.821px] items-center left-[41.19px] px-[22.388px] py-[8.955px] rounded-[3.582px] top-[180.9px] w-[277.612px]">
                    <input 
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Full Name"
                        className="w-full bg-transparent border-none outline-none font-['SF_Pro_Text',sans-serif] font-normal text-[13.433px] text-black placeholder:text-[rgba(0,0,0,0.3)] tracking-[-0.206px]"
                        required
                    />
                </div>

                {/* Email Input */}
                <div className="absolute bg-[rgba(0,0,0,0.05)] content-stretch flex h-[35.821px] items-center left-[41.19px] px-[22.388px] py-[8.955px] rounded-[3.582px] top-[245.37px] w-[277.612px]">
                    <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full bg-transparent border-none outline-none font-['SF_Pro_Text',sans-serif] font-normal text-[13.433px] text-black placeholder:text-[rgba(0,0,0,0.3)] tracking-[-0.206px]"
                        required
                    />
                </div>

                {/* Password Input */}
                <div className="absolute bg-[rgba(0,0,0,0.05)] content-stretch flex h-[35.821px] items-center left-[41.19px] px-[22.388px] py-[8.955px] rounded-[3.582px] top-[309.85px] w-[277.612px]">
                    <input 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full bg-transparent border-none outline-none font-['SF_Pro_Text',sans-serif] font-normal text-[13.433px] text-black placeholder:text-[rgba(0,0,0,0.3)] tracking-[-0.206px]"
                        required
                    />
                </div>

                {/* Create Account Button */}
                <button 
                    type="submit"
                    disabled={isLoading}
                    className="absolute bg-[#1a1a1a] content-stretch flex h-[35.821px] items-center justify-center left-[41.19px] px-[22.388px] py-[8.955px] rounded-[3.582px] top-[373.43px] w-[277.612px] hover:bg-black transition-colors disabled:opacity-70"
                >
                    {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin text-[#ffff45]" />
                    ) : (
                        <p className="font-['SF_Pro_Text',sans-serif] font-normal leading-[17.91px] relative shrink-0 text-[#ffff45] text-[13.433px] text-nowrap tracking-[-0.206px]">
                            Create Account
                        </p>
                    )}
                </button>
            </form>

            <p className="absolute font-['SF_Pro_Text',sans-serif] font-normal leading-[16.119px] left-[50%] -translate-x-[calc(50%+25px)] text-[11.642px] text-black text-nowrap top-[424.48px] tracking-[-0.0716px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                Already have an account?
            </p>

            {/* Sign In Button */}
            <button 
                onClick={onNavigateToLogin}
                className="absolute content-stretch flex h-[35.821px] items-center justify-center left-[50%] -translate-x-1/2 px-[22.388px] py-[8.955px] rounded-[3.582px] top-[455.82px] group"
            >
                <div aria-hidden="true" className="absolute border-[0.672px] border-black border-solid inset-0 pointer-events-none rounded-[3.582px] group-hover:bg-black/5 transition-colors" />
                <p className="font-['SF_Pro_Text',sans-serif] font-normal leading-[17.91px] relative shrink-0 text-[13.433px] text-black text-nowrap tracking-[-0.206px]">
                    Sign In
                </p>
            </button>

            <p className="absolute font-['SF_Pro_Text',sans-serif] font-normal leading-[16.119px] left-[50%] -translate-x-1/2 text-[11.642px] text-black text-nowrap top-[506.87px] tracking-[-0.0716px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                or
            </p>

            {/* Guest Button */}
            <button 
                onClick={onContinueAsGuest}
                className="absolute bg-[#1a1a1a] content-stretch flex flex-col h-[35.821px] items-center justify-center left-[50%] -translate-x-1/2 px-[22.388px] py-[8.955px] rounded-[3.582px] top-[538.21px] hover:bg-black transition-colors"
            >
                <p className="font-['SF_Pro_Text',sans-serif] font-normal leading-[17.91px] relative shrink-0 text-[#ffff45] text-[13.433px] text-nowrap tracking-[-0.206px]">
                    Continue as a guest
                </p>
            </button>
        </div>
    </motion.div>
  );
}
