import React from 'react';
import { motion } from 'motion/react';
import { AnimatePresence } from 'framer-motion';
import { 
  User, 
  Star, 
  Archive, 
  FileText, 
  Briefcase, 
  UserCircle, 
  Info, 
  LogOut,
  LogIn,
  X
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  user?: {
    email?: string;
    imageUrl?: string;
  } | null;
  activeView: 'all' | 'favorites' | 'archive';
  onNavigate: (view: 'all' | 'favorites' | 'archive') => void;
  onSignIn?: () => void;
  onSignOut?: () => void;
}

export function SideMenu({ 
  isOpen, 
  onClose, 
  user, 
  activeView, 
  onNavigate,
  onSignIn,
  onSignOut 
}: SideMenuProps) {
  
  const menuItems = [
    { id: 'all', label: 'All Notes', icon: FileText, view: 'all' },
    { id: 'favorites', label: 'Favorites', icon: Star, view: 'favorites' },
    { id: 'archive', label: 'Archive', icon: Archive, view: 'archive' },
  ];

  const categories = [
    { id: 'personal', label: 'Personal', icon: UserCircle },
    { id: 'work', label: 'Work', icon: Briefcase },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 bottom-0 w-[280px] bg-white z-50 shadow-2xl flex flex-col font-sans"
          >
            {/* Close Button (Mobile convenience, though clicking outside works) */}
            <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-black/5 rounded-full"
            >
                <X size={20} className="text-black/50" />
            </button>

            {/* Profile Section */}
            <div className="p-6 pt-12 border-b border-black/5">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-lg mb-3">
                  {user?.imageUrl ? (
                    <ImageWithFallback 
                        src={user.imageUrl} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <User size={32} className="text-gray-400" />
                    </div>
                  )}
                </div>
                <h3 className="font-['SF_Pro:Semibold',sans-serif] text-lg text-black">
                  {user?.email || 'Guest Account'}
                </h3>
                <p className="text-sm text-gray-500">
                  {user ? 'Pro Plan' : 'Local Storage Only'}
                </p>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8">
              
              {/* Main Navigation */}
              <div className="space-y-1">
                <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Menu
                </p>
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                        onNavigate(item.view as any);
                        onClose();
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                      activeView === item.view 
                        ? 'bg-black text-white shadow-md' 
                        : 'text-gray-600 hover:bg-black/5'
                    }`}
                  >
                    <item.icon size={18} className={activeView === item.view ? 'text-white' : 'text-gray-500'} />
                    <span className="font-medium text-[15px]">{item.label}</span>
                  </button>
                ))}
              </div>

              {/* Categories */}
              <div className="space-y-1">
                <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Categories
                </p>
                {categories.map((item) => (
                  <button
                    key={item.id}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-black/5 transition-colors"
                  >
                    <item.icon size={18} className="text-gray-500" />
                    <span className="font-medium text-[15px]">{item.label}</span>
                  </button>
                ))}
              </div>

              {/* Other */}
              <div className="space-y-1">
                 <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-black/5 transition-colors">
                    <Info size={18} className="text-gray-500" />
                    <span className="font-medium text-[15px]">About App</span>
                 </button>
              </div>

            </div>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-black/5">
              {user ? (
                <button 
                    onClick={onSignOut}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors font-medium"
                >
                  <LogOut size={18} />
                  Sign Out
                </button>
              ) : (
                <button 
                    onClick={onSignIn}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-black text-white hover:bg-gray-800 transition-colors font-medium shadow-lg"
                >
                  <LogIn size={18} />
                  Sign In
                </button>
              )}
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
