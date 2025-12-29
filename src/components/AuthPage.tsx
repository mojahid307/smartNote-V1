import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User } from '../App';
import svgPaths from '../imports/svg-ieliru48uq';
import { supabase } from '../utils/supabase/client';

interface AuthPageProps {
  onAuth: (user: User) => void;
}

function Group() {
  return (
    <div className="absolute inset-[8.33%_10.06%_8.34%_8.33%]" data-name="Group">
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

function SolarNotesLineDuotone() {
  return (
    <div className="overflow-clip relative size-[335.446px]" data-name="solar:notes-line-duotone">
      <Group />
    </div>
  );
}

export default function AuthPage({ onAuth }: AuthPageProps) {
  const [mode, setMode] = useState<'login' | 'signup'>('signup');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError('');

    // Validation
    if (mode === 'signup' && !name.trim()) {
      setError('Please enter your name');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (mode === 'login') {
      // Login with Supabase
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (data?.user) {
        const authenticatedUser: User = {
          name: data.user.email.split('@')[0], // Use email as name for simplicity
          email: data.user.email,
          avatar: data.user.avatar_url,
          isGuest: false,
        };
        localStorage.setItem('smartkeeper_currentUser', JSON.stringify(authenticatedUser));
        localStorage.setItem('smartkeeper_hasVisited', 'true');
        onAuth(authenticatedUser);
      } else {
        setError(loginError?.message || 'Invalid email or password');
      }
    } else {
      // Signup with Supabase
      const { data, error: signupError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name.trim(),
          },
        },
      });
      if (data?.user) {
        const authenticatedUser: User = {
          name: name.trim(),
          email: data.user.email,
          avatar: data.user.avatar_url,
          isGuest: false,
        };
        localStorage.setItem('smartkeeper_currentUser', JSON.stringify(authenticatedUser));
        localStorage.setItem('smartkeeper_hasVisited', 'true');
        onAuth(authenticatedUser);
      } else {
        setError(signupError?.message || 'An account with this email already exists');
      }
    }
  };

  const handleGuestContinue = () => {
    const guestUser: User = {
      name: 'Guest',
      email: 'guest@smartkeeper.com',
      isGuest: true,
    };
    localStorage.setItem('smartkeeper_currentUser', JSON.stringify(guestUser));
    localStorage.setItem('smartkeeper_hasVisited', 'true');
    onAuth(guestUser);
  };

  return (
    <div className="bg-[#ffff45] overflow-clip relative size-full min-h-screen" data-name="authPage">
      <AnimatePresence mode="wait">
        {mode === 'signup' ? (
          <motion.div
            key="signup"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ type: 'spring', damping: 25 }}
            className="absolute inset-0"
          >
            <p className="absolute font-['SF_Pro:Bold',sans-serif] font-bold leading-[34px] left-[calc(50%-101px)] text-[28px] text-black text-nowrap top-[114px] tracking-[0.38px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
              Create account
            </p>
            <div className="absolute flex h-[calc(1px*((var(--transform-inner-width)*0.01260489970445633)+(var(--transform-inner-height)*0.9999205470085144)))] items-center justify-center left-[-44px] top-[654px] w-[calc(1px*((var(--transform-inner-height)*0.01260489970445633)+(var(--transform-inner-width)*0.9999205470085144)))]" style={{ "--transform-inner-width": "335.4375", "--transform-inner-height": "335.4375" } as React.CSSProperties}>
              <div className="flex-none rotate-[359.278deg]">
                <SolarNotesLineDuotone />
              </div>
            </div>
            <p className="absolute font-['SF_Pro:Regular',sans-serif] font-normal leading-[16px] left-[calc(50%-62px)] text-[12px] text-[rgba(60,60,67,0.6)] text-nowrap top-[155px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
              Sign up to get started
            </p>
            
            {/* Full Name Input */}
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="absolute bg-[rgba(0,0,0,0.1)] box-border h-[40px] left-[46px] px-[25px] py-[10px] rounded-[4px] top-[202px] w-[310px] font-['SF_Pro:Regular',sans-serif] font-normal leading-[20px] text-[15px] text-black tracking-[-0.23px] outline-none placeholder:text-[rgba(0,0,0,0.3)] focus:bg-[rgba(0,0,0,0.15)] transition-colors"
              style={{ fontVariationSettings: "'wdth' 100" }}
            />

            {/* Email Input */}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="absolute bg-[rgba(0,0,0,0.1)] box-border h-[40px] left-[46px] px-[25px] py-[10px] rounded-[4px] top-[274px] w-[310px] font-['SF_Pro:Regular',sans-serif] font-normal leading-[20px] text-[15px] text-black tracking-[-0.23px] outline-none placeholder:text-[rgba(0,0,0,0.3)] focus:bg-[rgba(0,0,0,0.15)] transition-colors"
              style={{ fontVariationSettings: "'wdth' 100" }}
            />

            {/* Password Input */}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="absolute bg-[rgba(0,0,0,0.1)] box-border h-[40px] left-[46px] px-[25px] py-[10px] rounded-[4px] top-[346px] w-[310px] font-['SF_Pro:Regular',sans-serif] font-normal leading-[20px] text-[15px] text-black tracking-[-0.23px] outline-none placeholder:text-[rgba(0,0,0,0.3)] focus:bg-[rgba(0,0,0,0.15)] transition-colors"
              style={{ fontVariationSettings: "'wdth' 100" }}
            />

            {/* Error Message */}
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute left-[46px] top-[393px] font-['SF_Pro:Regular',sans-serif] font-normal text-[13px] text-red-600 tracking-[-0.24px]"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                {error}
              </motion.p>
            )}

            {/* Create Account Button */}
            <button
              onClick={() => handleSubmit()}
              className="absolute bg-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.9)] box-border content-stretch flex gap-[10px] h-[40px] items-center justify-center left-[46px] px-[25px] py-[10px] rounded-[4px] top-[417px] w-[310px] cursor-pointer transition-colors"
            >
              <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#ffff45] text-[15px] text-nowrap tracking-[-0.23px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
                Create Account
              </p>
            </button>

            <p className="absolute font-['SF_Pro:Regular',sans-serif] font-normal leading-[18px] left-[calc(50%-78px)] text-[13px] text-black text-nowrap top-[474px] tracking-[-0.08px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
              Already have an account?
            </p>

            {/* Sign In Button */}
            <button
              onClick={() => setMode('login')}
              className="absolute box-border content-stretch flex gap-[10px] h-[40px] items-center justify-center left-[calc(50%-0.5px)] px-[25px] py-[10px] rounded-[4px] top-[509px] translate-x-[-50%] cursor-pointer hover:bg-[rgba(0,0,0,0.05)] transition-colors"
            >
              <div aria-hidden="true" className="absolute border-[0.75px] border-black border-solid inset-0 pointer-events-none rounded-[4px]" />
              <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[15px] text-black text-nowrap tracking-[-0.23px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
                Sign In
              </p>
            </button>

            <p className="absolute font-['SF_Pro:Regular',sans-serif] font-normal leading-[18px] left-[calc(50%-7px)] text-[13px] text-black text-nowrap top-[566px] tracking-[-0.08px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
              or
            </p>

            {/* Continue as Guest */}
            <button
              onClick={handleGuestContinue}
              className="absolute bg-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.9)] box-border content-stretch flex flex-col gap-[10px] h-[40px] items-center justify-center left-[calc(50%+0.5px)] px-[25px] py-[10px] rounded-[4px] top-[601px] translate-x-[-50%] cursor-pointer transition-colors"
            >
              <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#ffff45] text-[15px] text-nowrap tracking-[-0.23px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
                Continue as a guest
              </p>
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="login"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ type: 'spring', damping: 25 }}
            className="absolute inset-0"
          >
            <p className="absolute font-['SF_Pro:Bold',sans-serif] font-bold leading-[34px] left-[calc(50%-96px)] text-[28px] text-black text-nowrap top-[114px] tracking-[0.38px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
              Welcome Back
            </p>
            <p className="absolute font-['SF_Pro:Regular',sans-serif] font-normal leading-[16px] left-[calc(50%-53px)] text-[12px] text-[rgba(60,60,67,0.6)] text-nowrap top-[155px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
              Sign in to continue
            </p>
            
            {/* Email Input */}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="absolute bg-[rgba(0,0,0,0.1)] box-border h-[40px] left-1/2 px-[25px] py-[10px] rounded-[4px] top-[207px] translate-x-[-50%] w-[310px] font-['SF_Pro:Regular',sans-serif] font-normal leading-[20px] text-[15px] text-black tracking-[-0.23px] outline-none placeholder:text-[rgba(0,0,0,0.3)] focus:bg-[rgba(0,0,0,0.15)] transition-colors"
              style={{ fontVariationSettings: "'wdth' 100" }}
            />

            {/* Password Input */}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="absolute bg-[rgba(0,0,0,0.1)] box-border h-[40px] left-1/2 px-[25px] py-[10px] rounded-[4px] top-[291px] translate-x-[-50%] w-[310px] font-['SF_Pro:Regular',sans-serif] font-normal leading-[20px] text-[15px] text-black tracking-[-0.23px] outline-none placeholder:text-[rgba(0,0,0,0.3)] focus:bg-[rgba(0,0,0,0.15)] transition-colors"
              style={{ fontVariationSettings: "'wdth' 100" }}
            />

            <p className="absolute font-['SF_Pro:Regular',sans-serif] font-normal leading-[16px] left-[calc(50%+47px)] text-[12px] text-[rgba(0,0,0,0.7)] text-nowrap top-[336px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
              Forget Password?
            </p>

            {/* Error Message */}
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute left-1/2 -translate-x-1/2 top-[358px] font-['SF_Pro:Regular',sans-serif] font-normal text-[13px] text-red-600 tracking-[-0.24px]"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                {error}
              </motion.p>
            )}

            {/* Sign in Button */}
            <button
              onClick={() => handleSubmit()}
              className="absolute bg-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.9)] box-border content-stretch flex gap-[10px] h-[40px] items-center justify-center left-[calc(50%+0.5px)] px-[30px] py-[10px] rounded-[4px] top-[381px] translate-x-[-50%] cursor-pointer transition-colors"
            >
              <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#ffff45] text-[15px] text-nowrap tracking-[-0.23px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
                Sign in
              </p>
            </button>

            <p className="absolute font-['SF_Pro:Regular',sans-serif] font-normal leading-[18px] left-[calc(50%-71px)] text-[13px] text-black text-nowrap top-[439px] tracking-[-0.08px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
              Don't have an account?
            </p>

            {/* Create an account Button */}
            <button
              onClick={() => setMode('signup')}
              className="absolute box-border content-stretch flex gap-[10px] h-[40px] items-center justify-center left-1/2 px-[25px] py-[10px] rounded-[4px] top-[475px] translate-x-[-50%] cursor-pointer hover:bg-[rgba(0,0,0,0.05)] transition-colors"
            >
              <div aria-hidden="true" className="absolute border-[0.75px] border-black border-solid inset-0 pointer-events-none rounded-[4px]" />
              <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[15px] text-black text-nowrap tracking-[-0.23px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
                Create an account
              </p>
            </button>

            <p className="absolute font-['SF_Pro:Regular',sans-serif] font-normal leading-[18px] left-[calc(50%-7px)] text-[13px] text-black text-nowrap top-[533px] tracking-[-0.08px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
              or
            </p>

            {/* Continue as Guest */}
            <button
              onClick={handleGuestContinue}
              className="absolute bg-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.9)] box-border content-stretch flex flex-col gap-[10px] h-[40px] items-center justify-center left-[calc(50%+0.5px)] px-[25px] py-[10px] rounded-[4px] top-[569px] translate-x-[-50%] cursor-pointer transition-colors"
            >
              <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#ffff45] text-[15px] text-nowrap tracking-[-0.23px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
                Continue as a guest
              </p>
            </button>

            <div className="absolute flex inset-[77%_-4.79%_-9.38%_35.82%] items-center justify-center">
              <div className="flex-none h-[279.515px] rotate-[180.722deg] scale-y-[-100%] w-[273.735px]">
                <Group />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}