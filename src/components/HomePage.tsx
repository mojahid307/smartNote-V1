import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import svgPaths from '../imports/svg-jfktsrkjrm';
import { Note, User } from '../App';
import { NoteCard } from './NoteCard';
import { NoteEditor } from './NoteEditor';
import SearchPage from './SearchPage';
import SideMenu from './SideMenu';
import ExpandedNoteCard from './ExpandedNoteCard';
import AISummaryModal from './AISummaryModal';
import imgEllipse1 from 'figma:asset/dc9d2a0a49bcf3eca91fafce4dc73b13bf81c01d.png';

interface HomePageProps {
  notes: Note[];
  user: User;
  onAddNote: (title: string, content: string, category?: string) => void;
  onDeleteNote: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onUpdateNote: (id: string, title: string, content: string, category?: string) => void;
  onUpdateUser: (user: User) => void;
  onShowAuthPage?: () => void;
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

function IcRoundMenu({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="relative shrink-0 size-[39px] cursor-pointer" data-name="ic:round-menu">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 39 39">
        <g id="ic:round-menu">
          <path d={svgPaths.p23f2e500} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </button>
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

function MaterialSymbolsStarRounded({ isFilled, onClick }: { isFilled?: boolean; onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="relative shrink-0 size-[24px] cursor-pointer" 
      data-name="material-symbols:star-rounded"
    >
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="material-symbols:star-rounded">
          <path 
            d={svgPaths.p1be2bcf0} 
            fill={isFilled ? "var(--fill-0, black)" : "none"}
            stroke="var(--fill-0, black)"
            strokeWidth={isFilled ? "0" : "1.5"}
            id="Vector" 
          />
        </g>
      </svg>
    </button>
  );
}

export default function HomePage({ notes, user, onAddNote, onDeleteNote, onToggleFavorite, onUpdateNote, onUpdateUser, onShowAuthPage }: HomePageProps) {
  const [showEditor, setShowEditor] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedNote, setExpandedNote] = useState<Note | null>(null);
  const [noteToEdit, setNoteToEdit] = useState<Note | null>(null);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [summaryNote, setSummaryNote] = useState<Note | null>(null);

  const handleAddNote = (title: string, content: string, category?: string) => {
    onAddNote(title, content, category);
    setShowEditor(false);
  };

  const handleUpdateNote = (title: string, content: string, category?: string) => {
    if (noteToEdit) {
      onUpdateNote(noteToEdit.id, title, content, category);
      setNoteToEdit(null);
    }
  };

  const handleSwipe = () => {
    if (currentIndex < notes.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleSummarize = (note: Note) => {
    setSummaryNote(note);
    setShowSummaryModal(true);
  };

  const handleEdit = (note: Note) => {
    setNoteToEdit(note);
    setExpandedNote(null);
  };

  // Filter notes based on favorites and category
  const filteredNotes = notes.filter(note => {
    if (showFavoritesOnly && !note.isFavorite) return false;
    if (selectedCategory && note.category !== selectedCategory) return false;
    return true;
  });

  if (showSearch) {
    return (
      <AnimatePresence>
        {showSearch && (
          <SearchPage
            notes={filteredNotes}
            onBack={() => setShowSearch(false)}
            onDeleteNote={onDeleteNote}
            onToggleFavorite={onToggleFavorite}
            onEdit={handleEdit}
            onSummarize={handleSummarize}
          />
        )}
      </AnimatePresence>
    );
  }

  return (
    <div className="bg-[#ffff45] overflow-clip relative size-full min-h-screen" data-name="Home Page">
      {/* Side Menu */}
      <SideMenu
        isOpen={showMenu}
        onClose={() => setShowMenu(false)}
        user={user}
        onUpdateUser={onUpdateUser}
        onSelectCategory={(category) => {
          setSelectedCategory(category);
          setShowMenu(false);
        }}
        onShowFavorites={(show) => {
          setShowFavoritesOnly(show);
          setShowMenu(false);
        }}
        notes={notes}
        onShowAuthPage={onShowAuthPage}
      />

      {/* Add Note Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowEditor(true)}
        className="absolute backdrop-blur-[10px] backdrop-filter bg-[rgba(110,110,33,0.1)] box-border content-stretch flex gap-[10px] items-center justify-center left-[calc(87.5%-6.25px)] p-[25px] rounded-[44px] size-[65px] top-[769px] translate-x-[-50%] cursor-pointer hover:bg-[rgba(110,110,33,0.2)] transition-colors z-20"
      >
        <IcBaselinePlus />
      </motion.button>

      {/* Top Bar */}
      <div className="absolute content-stretch flex gap-[14px] items-center justify-center left-[29px] top-[60px] w-[355px]">
        <IcRoundMenu onClick={() => setShowMenu(true)} />
        <button 
          onClick={() => setShowSearch(true)}
          className="backdrop-blur-[15px] backdrop-filter bg-[rgba(0,0,0,0.1)] box-border content-stretch flex gap-[10px] h-[47px] items-center pl-[16px] pr-[23px] py-[17px] relative rounded-[17px] shrink-0 w-[257px] cursor-pointer hover:bg-[rgba(0,0,0,0.15)] transition-colors"
        >
          <IcRoundSearch />
          <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[25px] relative shrink-0 text-[20px] text-[rgba(0,0,0,0.7)] text-nowrap tracking-[-0.45px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            Search here
          </p>
        </button>
        <div className="relative shrink-0 size-[31px] cursor-pointer" onClick={() => setShowMenu(true)}>
          {user.avatar ? (
            <img alt={user.name} className="block max-w-none size-full rounded-full" height="31" src={user.avatar} width="31" />
          ) : (
            <img alt={user.name} className="block max-w-none size-full" height="31" src={imgEllipse1} width="31" />
          )}
        </div>
      </div>

      {/* Notes Header */}
      <div className="absolute content-stretch flex items-center justify-between left-[39px] top-[140px] w-[324px]">
        <p className="font-['SF_Pro:Semibold',sans-serif] font-[590] leading-[25px] relative shrink-0 text-[20px] text-black text-nowrap tracking-[-0.45px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          {showFavoritesOnly ? 'Favorites' : selectedCategory ? selectedCategory : 'Notes'}
        </p>
        <MaterialSymbolsStarRounded 
          isFilled={showFavoritesOnly}
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
        />
      </div>

      {/* Notes List */}
      <div className="absolute left-[24px] top-[193px] w-[354px] space-y-[13px] max-h-[550px] overflow-y-auto pb-20">
        <AnimatePresence mode="popLayout">
          {filteredNotes.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center pt-10"
            >
              <p className="font-['SF_Pro:Regular',sans-serif] text-black/60" style={{ fontVariationSettings: "'wdth' 100" }}>
                {showFavoritesOnly ? 'No favorite notes yet' : 'No notes in this category'}
              </p>
            </motion.div>
          ) : (
            filteredNotes.slice(0, 5).map((note, index) => (
              <motion.div
                key={note.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <NoteCard
                  note={note}
                  index={index}
                  onDelete={onDeleteNote}
                  onSwipe={handleSwipe}
                  onToggleFavorite={onToggleFavorite}
                  showDeleteButton={false}
                  onClick={() => setExpandedNote(note)}
                />
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Expanded Note Modal */}
      {expandedNote && (
        <ExpandedNoteCard
          note={expandedNote}
          onClose={() => setExpandedNote(null)}
          onDelete={onDeleteNote}
          onToggleFavorite={onToggleFavorite}
          onEdit={handleEdit}
          onSummarize={handleSummarize}
        />
      )}

      {/* Note Editor Modal */}
      {showEditor && (
        <NoteEditor
          onSave={handleAddNote}
          onClose={() => setShowEditor(false)}
        />
      )}

      {/* Note Edit Modal */}
      {noteToEdit && (
        <NoteEditor
          noteToEdit={noteToEdit}
          onSave={handleUpdateNote}
          onClose={() => setNoteToEdit(null)}
        />
      )}

      {/* AI Summary Modal */}
      {showSummaryModal && summaryNote && (
        <AISummaryModal
          note={summaryNote}
          onClose={() => setShowSummaryModal(false)}
        />
      )}
    </div>
  );
}