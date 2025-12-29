import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Folder, Info, LogOut, UserPlus } from 'lucide-react';
import { User } from '../App';
import { Note } from '../App';
import { supabase } from '../utils/supabase/client';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onUpdateUser: (user: User) => void;
  onSelectCategory: (category: string | null) => void;
  onShowFavorites: (show: boolean) => void;
  notes: Note[];
  onShowAuthPage?: () => void;
}

export default function SideMenu({ 
  isOpen, 
  onClose, 
  user, 
  onUpdateUser,
  onSelectCategory,
  onShowFavorites,
  notes,
  onShowAuthPage
}: SideMenuProps) {
  
  const categories = Array.from(new Set(notes.map(note => note.category).filter(Boolean))) as string[];
  const favoriteCount = notes.filter(note => note.isFavorite).length;

  const handleSwitchToGuest = () => {
    const guestUser = {
      name: 'Guest',
      email: 'guest@smartkeeper.com',
      isGuest: true,
    };
    localStorage.setItem('smartkeeper_currentUser', JSON.stringify(guestUser));
    onUpdateUser(guestUser);
    onClose();
  };

  const handleSignUp = () => {
    onClose(); // Close menu first
    // Open auth modal for signup
    if (onShowAuthPage) {
      onShowAuthPage();
    }
  };

  const handleLogout = async () => {
    // Sign out from Supabase if authenticated
    await supabase.auth.signOut();
    
    // The auth state change listener in App.tsx will handle switching to guest mode
    onClose();
  };

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
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          />

          {/* Side Menu */}
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed left-0 top-0 bottom-0 w-[280px] bg-[#ffff45] shadow-2xl z-50 overflow-y-auto"
          >
            {/* Header */}
            <div className="p-6 border-b border-black/10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-['SF_Pro:Semibold',sans-serif] font-[590] text-[22px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                  Menu
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-black/10 rounded-full transition-colors"
                >
                  <X className="size-5" />
                </button>
              </div>

              {/* User Profile */}
              <div className="flex items-center gap-3 p-3 bg-black/5 rounded-lg">
                <div className="size-12 bg-black/10 rounded-full flex items-center justify-center">
                  <UserPlus className="size-6" />
                </div>
                <div className="flex-1">
                  <p className="font-['SF_Pro:Semibold',sans-serif] font-[590] text-[15px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                    {user.name}
                  </p>
                  <p className="font-['SF_Pro:Regular',sans-serif] text-[13px] text-black/60" style={{ fontVariationSettings: "'wdth' 100" }}>
                    {user.email}
                  </p>
                  {user.isGuest && (
                    <span className="inline-block mt-1 px-2 py-0.5 bg-black/10 rounded text-[11px] font-['SF_Pro:Regular',sans-serif]" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Guest Account
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-4">
              {/* Favorites */}
              <button
                onClick={() => {
                  onShowFavorites(true);
                  onClose();
                }}
                className="w-full flex items-center gap-3 p-3 hover:bg-black/10 rounded-lg transition-colors"
              >
                <Heart className="size-5" />
                <span className="flex-1 text-left font-['SF_Pro:Regular',sans-serif] text-[16px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                  Favorites
                </span>
                <span className="font-['SF_Pro:Regular',sans-serif] text-[14px] text-black/60" style={{ fontVariationSettings: "'wdth' 100" }}>
                  {favoriteCount}
                </span>
              </button>

              {/* All Notes */}
              <button
                onClick={() => {
                  onSelectCategory(null);
                  onShowFavorites(false);
                  onClose();
                }}
                className="w-full flex items-center gap-3 p-3 hover:bg-black/10 rounded-lg transition-colors"
              >
                <Folder className="size-5" />
                <span className="flex-1 text-left font-['SF_Pro:Regular',sans-serif] text-[16px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                  All Notes
                </span>
                <span className="font-['SF_Pro:Regular',sans-serif] text-[14px] text-black/60" style={{ fontVariationSettings: "'wdth' 100" }}>
                  {notes.length}
                </span>
              </button>

              {/* Categories */}
              {categories.length > 0 && (
                <div className="mt-4">
                  <p className="px-3 py-2 text-[13px] font-['SF_Pro:Semibold',sans-serif] text-black/60" style={{ fontVariationSettings: "'wdth' 100" }}>
                    CATEGORIES
                  </p>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        onSelectCategory(category);
                        onShowFavorites(false);
                        onClose();
                      }}
                      className="w-full flex items-center gap-3 p-3 hover:bg-black/10 rounded-lg transition-colors"
                    >
                      <Folder className="size-5" />
                      <span className="flex-1 text-left font-['SF_Pro:Regular',sans-serif] text-[16px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                        {category}
                      </span>
                      <span className="font-['SF_Pro:Regular',sans-serif] text-[14px] text-black/60" style={{ fontVariationSettings: "'wdth' 100" }}>
                        {notes.filter(n => n.category === category).length}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* About */}
              <button
                onClick={() => {
                  alert('SmartKeeper v1.0\nA smart note-taking app with swipe gestures and AI features.');
                }}
                className="w-full flex items-center gap-3 p-3 hover:bg-black/10 rounded-lg transition-colors mt-4"
              >
                <Info className="size-5" />
                <span className="flex-1 text-left font-['SF_Pro:Regular',sans-serif] text-[16px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                  About
                </span>
              </button>
            </div>

            {/* Account Actions */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-black/10 bg-[#ffff45]">
              {user.isGuest ? (
                <button
                  onClick={handleSignUp}
                  className="w-full flex items-center justify-center gap-2 p-3 bg-black text-[#ffff45] hover:bg-black/90 rounded-lg transition-colors"
                >
                  <UserPlus className="size-5" />
                  <span className="font-['SF_Pro:Semibold',sans-serif] text-[16px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                    Create Account
                  </span>
                </button>
              ) : (
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 p-3 bg-black/10 hover:bg-black/20 rounded-lg transition-colors"
                >
                  <LogOut className="size-5" />
                  <span className="font-['SF_Pro:Regular',sans-serif] text-[16px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                    Logout
                  </span>
                </button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}