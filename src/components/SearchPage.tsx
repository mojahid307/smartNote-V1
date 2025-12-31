import React, { useState, useMemo } from 'react';
import svgPaths from "../imports/svg-352wqnypjc";
import { motion } from 'motion/react';
import { AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

function Layer() {
  return (
    <div className="h-[347.303px] relative w-[649.699px]" data-name="Layer_1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 649.699 347.303">
        <g clipPath="url(#clip0_11_883)" id="Layer_1">
          <path d={svgPaths.paab9280} fill="var(--fill-0, #B4D1FF)" id="Vector" />
          <path d={svgPaths.p22504570} fill="var(--fill-0, #B4D1FF)" id="Vector_2" />
          <path d={svgPaths.pc19ca80} fill="var(--fill-0, #B4D1FF)" id="Vector_3" />
          <path d={svgPaths.pa54ca10} fill="var(--fill-0, #B4D1FF)" id="Vector_4" />
          <path d={svgPaths.p1f0168f0} fill="var(--fill-0, #B4D1FF)" id="Vector_5" />
          <path d={svgPaths.p3fb6d200} fill="var(--fill-0, #B4D1FF)" id="Vector_6" />
          <path d={svgPaths.p15f30980} fill="var(--fill-0, #B4D1FF)" id="Vector_7" />
          <path d={svgPaths.p2bf6d3f0} fill="var(--fill-0, #B4D1FF)" id="Vector_8" />
          <path d={svgPaths.p3cc232f0} fill="var(--fill-0, #B4D1FF)" id="Vector_9" />
          <path d={svgPaths.p174dc100} fill="var(--fill-0, #B4D1FF)" id="Vector_10" />
          <path d={svgPaths.p1b72cb00} fill="var(--fill-0, #B4D1FF)" id="Vector_11" />
          <path d={svgPaths.p2c7a8070} fill="var(--fill-0, #B4D1FF)" id="Vector_12" />
          <path d={svgPaths.p22255c0} fill="var(--fill-0, #B4D1FF)" id="Vector_13" />
          <path d={svgPaths.p1d816780} fill="var(--fill-0, #B4D1FF)" id="Vector_14" />
        </g>
        <defs>
          <clipPath id="clip0_11_883">
            <rect fill="white" height="347.303" width="649.699" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-[5.28px] top-[109.95px]">
      <div className="absolute flex h-[650.055px] items-center justify-center left-[5.28px] top-[109.95px] w-[352.448px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[89.546deg] scale-y-[-100%] skew-x-[0.516deg]">
          <Layer />
        </div>
      </div>
    </div>
  );
}

function IcRoundSearch() {
  return (
    <div className="h-[20.822px] relative shrink-0 w-[20.813px]" data-name="ic:round-search">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.8128 20.8219">
        <g id="ic:round-search">
          <path d={svgPaths.p16709b00} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function BxsChevronUp() {
  return (
    <div className="relative size-[21.672px]" data-name="bxs:chevron-up">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.6716 21.6716">
        <g id="bxs:chevron-up">
          <path d={svgPaths.p1a5e6780} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function BxsChevronDown() {
  return (
    <div className="mr-[-1.806px] relative shrink-0 size-[21.672px]" data-name="bxs:chevron-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.6716 21.6716">
        <g id="bxs:chevron-down">
          <path d={svgPaths.p1f49e680} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

interface Note {
    id: string;
    title: string;
    content: string;
    date: string;
    isPinned?: boolean;
}

interface SearchPageProps {
    notes: Note[];
    onClose: () => void;
    onNavigate: (note: Note) => void;
}

// Types for filtering and sorting
type FilterOption = 'All' | 'Today' | 'Week' | 'Month';
type SortOption = 'Date' | 'Alphabetical' | 'Relevance';

// Helper to check if a timestamp falls within a range
const isWithin = (timestamp: number, range: 'today' | 'week' | 'month') => {
    const date = new Date(timestamp);
    const now = new Date();
    
    // Normalize to start of day
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const oneDay = 24 * 60 * 60 * 1000;
    
    if (range === 'today') {
        return date.getTime() >= startOfToday;
    }
    if (range === 'week') {
        return date.getTime() >= startOfToday - (oneDay * 7);
    }
    if (range === 'month') {
        return date.getTime() >= startOfToday - (oneDay * 30);
    }
    return true;
};

export function SearchPage({ notes, onClose, onNavigate }: SearchPageProps) {
    const [query, setQuery] = useState('');
    const [filterBy, setFilterBy] = useState<FilterOption>('All');
    const [sortBy, setSortBy] = useState<SortOption>('Date');
    
    // Dropdown visibility states
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isSortOpen, setIsSortOpen] = useState(false);

    // Derived state for filtered and sorted notes
    const filteredNotes = useMemo(() => {
        let result = notes;

        // 1. Filter by Query
        if (query.trim()) {
            const lowerQuery = query.toLowerCase();
            result = result.filter(note => 
                note.title.toLowerCase().includes(lowerQuery) || 
                note.content.toLowerCase().includes(lowerQuery)
            );
        }

        // 2. Filter by Date (Today, Week, Month)
        if (filterBy !== 'All') {
            result = result.filter(note => {
                // Parse ID as timestamp (fallback to old date if parsing fails or ID is small)
                const timestamp = parseInt(note.id);
                if (isNaN(timestamp) || timestamp < 1000000000000) return false; // Assume small IDs are old/dummy data
                return isWithin(timestamp, filterBy.toLowerCase() as any);
            });
        }

        // 3. Sort
        result = [...result].sort((a, b) => {
            if (sortBy === 'Alphabetical') {
                return a.title.localeCompare(b.title);
            }
            if (sortBy === 'Relevance') {
                // Simple relevance: exact title match > title contains > content contains
                const q = query.toLowerCase();
                const aTitleMatch = a.title.toLowerCase().includes(q);
                const bTitleMatch = b.title.toLowerCase().includes(q);
                if (aTitleMatch && !bTitleMatch) return -1;
                if (!aTitleMatch && bTitleMatch) return 1;
                return 0;
            }
            // Default: Date (Newest first)
            // Use ID if timestamp, otherwise string comparison
            const timeA = parseInt(a.id) || 0;
            const timeB = parseInt(b.id) || 0;
            return timeB - timeA;
        });
        
        return result;
    }, [notes, query, filterBy, sortBy]);

    const highlightText = (text: string, highlight: string) => {
        if (!highlight.trim()) {
            return <span>{text}</span>;
        }
        const regex = new RegExp(`(${highlight})`, 'gi');
        const parts = text.split(regex);
        return (
            <span>
                {parts.map((part, i) => 
                    regex.test(part) ? <span key={i} className="text-[#08f]">{part}</span> : part
                )}
            </span>
        );
    };

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 bg-white overflow-hidden flex flex-col font-sans"
        >
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <Group />
                <div className="absolute backdrop-blur-[4.966px] backdrop-filter bg-[rgba(254,254,254,0.8)] h-full w-full opacity-90" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full h-full flex flex-col px-6 pt-8">
                
                {/* Back Button */}
                <button 
                    onClick={onClose}
                    className="flex items-center self-start gap-2 py-2 mb-4 hover:opacity-70 transition-opacity"
                >
                    <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center">
                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 18L9 12L15 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                         </svg>
                    </div>
                    <span className="font-['SF_Pro:Medium',sans-serif] text-[15.351px] text-[#404040]">
                        Back to notes
                    </span>
                </button>

                {/* Search Input */}
                <div className="w-full mb-6">
                    <div className="backdrop-blur-[13.545px] backdrop-filter bg-[rgba(0,0,0,0.05)] h-[50px] rounded-[15.351px] flex items-center px-5 gap-3">
                         <input 
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search notes..."
                            className="bg-transparent border-none outline-none text-[18px] text-black/80 placeholder:text-black/40 w-full h-full font-['SF_Pro:Regular',sans-serif]"
                            autoFocus
                         />
                         <IcRoundSearch />
                    </div>
                </div>

                {/* Filters Row */}
                <div className="flex items-center justify-between mb-6 px-1 relative z-20">
                    
                    {/* Filter Dropdown */}
                    <div className="relative">
                        <button 
                            onClick={() => { setIsFilterOpen(!isFilterOpen); setIsSortOpen(false); }}
                            className="flex items-center gap-1 hover:opacity-70"
                        >
                            <span className="font-['SF_Pro:Regular',sans-serif] text-[15.351px] text-black">
                                {filterBy === 'All' ? 'Filter' : filterBy}
                            </span>
                            <div className={isFilterOpen ? "rotate-0" : "rotate-180"}>
                                <BxsChevronUp />
                            </div>
                        </button>
                        
                        <AnimatePresence>
                            {isFilterOpen && (
                                <motion.div 
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="absolute left-0 top-8 w-40 bg-white/90 backdrop-blur-xl rounded-xl shadow-lg border border-white/20 p-1 flex flex-col gap-1 z-30"
                                >
                                    {(['All', 'Today', 'Week', 'Month'] as FilterOption[]).map((option) => (
                                        <button
                                            key={option}
                                            onClick={() => { setFilterBy(option); setIsFilterOpen(false); }}
                                            className="flex items-center justify-between px-3 py-2 text-sm text-left hover:bg-black/5 rounded-lg transition-colors"
                                        >
                                            <span className={filterBy === option ? "font-semibold text-black" : "text-black/80"}>{option}</span>
                                            {filterBy === option && <Check size={14} className="text-black" />}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Sort Dropdown */}
                    <div className="relative">
                        <button 
                            onClick={() => { setIsSortOpen(!isSortOpen); setIsFilterOpen(false); }}
                            className="flex items-center gap-2 hover:opacity-70"
                        >
                            <span className="font-['SF_Pro:Regular',sans-serif] text-[15.351px] text-black">Sort by</span>
                            <div className="flex items-center gap-1">
                                <span className="font-['SF_Pro:Regular',sans-serif] text-[15.351px] text-black font-semibold">
                                    {sortBy}
                                </span>
                                <div className={isSortOpen ? "rotate-180" : "rotate-0"}>
                                    <BxsChevronDown />
                                </div>
                            </div>
                        </button>

                        <AnimatePresence>
                            {isSortOpen && (
                                <motion.div 
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="absolute right-0 top-8 w-40 bg-white/90 backdrop-blur-xl rounded-xl shadow-lg border border-white/20 p-1 flex flex-col gap-1 z-30"
                                >
                                    {(['Date', 'Alphabetical', 'Relevance'] as SortOption[]).map((option) => (
                                        <button
                                            key={option}
                                            onClick={() => { setSortBy(option); setIsSortOpen(false); }}
                                            className="flex items-center justify-between px-3 py-2 text-sm text-left hover:bg-black/5 rounded-lg transition-colors"
                                        >
                                            <span className={sortBy === option ? "font-semibold text-black" : "text-black/80"}>{option}</span>
                                            {sortBy === option && <Check size={14} className="text-black" />}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                </div>

                {/* Results List */}
                <div className="flex-1 overflow-y-auto pb-10 space-y-4 pr-1 z-10" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {filteredNotes.length > 0 ? (
                        filteredNotes.map((note) => (
                            <motion.div
                                key={note.id}
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                onClick={() => onNavigate(note)}
                                className="w-full backdrop-blur-[13.545px] backdrop-filter bg-[rgba(0,0,0,0.05)] rounded-[15.351px] p-5 cursor-pointer active:scale-[0.98] transition-transform"
                            >
                                <div className="flex flex-col gap-1.5">
                                    <h3 className="font-['SF_Pro:Semibold',sans-serif] text-[15.351px] text-black font-semibold line-clamp-1">
                                        {highlightText(note.title, query)}
                                    </h3>
                                    <p className="font-['SF_Pro:Regular',sans-serif] text-[15.351px] text-black/80 line-clamp-2 leading-snug">
                                        {highlightText(note.content, query)}
                                    </p>
                                    <p className="font-['SF_Pro:Regular',sans-serif] text-[11.739px] text-[#404040] mt-1">
                                        {note.date}
                                    </p>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center pt-20 opacity-50">
                            <p className="text-lg">No results found</p>
                        </div>
                    )}
                </div>

            </div>
        </motion.div>
    );
}
