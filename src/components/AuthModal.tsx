import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User } from '../App';
import { X, Mail, Lock, User as UserIcon } from 'lucide-react';

interface AuthModalProps {
  onClose: () => void;
  onAuth: (user: User) => void;
  initialMode?: 'login' | 'signup';
}

export default function AuthModal({ onClose, onAuth, initialMode = 'signup' }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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

    // Get existing users from localStorage
    const usersData = localStorage.getItem('smartkeeper_users');
    const users = usersData ? JSON.parse(usersData) : [];

    if (mode === 'login') {
      // Find user
      const user = users.find((u: any) => u.email === email && u.password === password);
      if (user) {
        const authenticatedUser: User = {
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          isGuest: false,
        };
        localStorage.setItem('smartkeeper_currentUser', JSON.stringify(authenticatedUser));
        localStorage.setItem('smartkeeper_hasVisited', 'true');
        onAuth(authenticatedUser);
      } else {
        setError('Invalid email or password');
      }
    } else {
      // Check if user already exists
      const existingUser = users.find((u: any) => u.email === email);
      if (existingUser) {
        setError('An account with this email already exists');
        return;
      }

      // Create new user
      const newUser = {
        name: name.trim(),
        email: email.trim(),
        password: password,
        avatar: undefined,
      };
      users.push(newUser);
      localStorage.setItem('smartkeeper_users', JSON.stringify(users));

      const authenticatedUser: User = {
        name: newUser.name,
        email: newUser.email,
        avatar: newUser.avatar,
        isGuest: false,
      };
      localStorage.setItem('smartkeeper_currentUser', JSON.stringify(authenticatedUser));
      localStorage.setItem('smartkeeper_hasVisited', 'true');
      onAuth(authenticatedUser);
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: 'spring', damping: 25 }}
        className="bg-[#ffff45] backdrop-blur-[15px] box-border content-stretch flex flex-col gap-[20px] px-[32px] py-[28px] rounded-[20px] w-full max-w-[380px] relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 hover:bg-black/15 rounded-full transition-colors z-10"
        >
          <X className="size-5 text-black/70" />
        </button>

        {/* Header */}
        <div className="pr-8">
          <h2 className="font-['SF_Pro:Semibold',sans-serif] font-[590] leading-[28px] text-[22px] text-black tracking-[-0.5px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[20px] text-[15px] text-black/60 tracking-[-0.24px] mt-1" style={{ fontVariationSettings: "'wdth' 100" }}>
            {mode === 'login' ? 'Sign in to continue' : 'Sign up to get started'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <UserIcon className="size-5 text-black/40" />
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="w-full bg-black/10 backdrop-blur-[15px] pl-12 pr-4 py-3 rounded-xl font-['SF_Pro:Regular',sans-serif] font-normal text-[16px] text-black tracking-[-0.32px] outline-none placeholder:text-black/40 focus:bg-black/15 transition-colors"
                style={{ fontVariationSettings: "'wdth' 100" }}
              />
            </div>
          )}

          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <Mail className="size-5 text-black/40" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full bg-black/10 backdrop-blur-[15px] pl-12 pr-4 py-3 rounded-xl font-['SF_Pro:Regular',sans-serif] font-normal text-[16px] text-black tracking-[-0.32px] outline-none placeholder:text-black/40 focus:bg-black/15 transition-colors"
              style={{ fontVariationSettings: "'wdth' 100" }}
            />
          </div>

          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <Lock className="size-5 text-black/40" />
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-black/10 backdrop-blur-[15px] pl-12 pr-4 py-3 rounded-xl font-['SF_Pro:Regular',sans-serif] font-normal text-[16px] text-black tracking-[-0.32px] outline-none placeholder:text-black/40 focus:bg-black/15 transition-colors"
              style={{ fontVariationSettings: "'wdth' 100" }}
            />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-['SF_Pro:Regular',sans-serif] font-normal text-[14px] text-red-600 tracking-[-0.24px]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              {error}
            </motion.p>
          )}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-black/20 hover:bg-black/25 backdrop-blur-[15px] py-3 rounded-xl font-['SF_Pro:Semibold',sans-serif] font-[590] text-[16px] text-black tracking-[-0.32px] transition-colors"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </motion.button>
        </form>

        {/* Toggle Mode */}
        <div className="text-center">
          <button
            onClick={() => {
              setMode(mode === 'login' ? 'signup' : 'login');
              setError('');
            }}
            className="font-['SF_Pro:Regular',sans-serif] font-normal text-[15px] text-black/70 tracking-[-0.24px] hover:text-black transition-colors"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            {mode === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-[1px] bg-black/10"></div>
          <p className="font-['SF_Pro:Regular',sans-serif] font-normal text-[13px] text-black/50 tracking-[-0.08px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            or
          </p>
          <div className="flex-1 h-[1px] bg-black/10"></div>
        </div>

        {/* Guest Continue */}
        <motion.button
          onClick={handleGuestContinue}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-black/10 hover:bg-black/15 backdrop-blur-[15px] py-3 rounded-xl font-['SF_Pro:Medium',sans-serif] font-[510] text-[16px] text-black/70 tracking-[-0.32px] transition-colors"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          Continue as Guest
        </motion.button>
      </motion.div>
    </motion.div>
  );
}