import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import svgPaths from "../imports/svg-lpg7o7kyah";
import { Note } from "../App";
import { NoteCard } from "./NoteCard";
import ExpandedNoteCard from "./ExpandedNoteCard";
import { ChevronLeft } from "lucide-react";

interface SearchPageProps {
  notes: Note[];
  onBack: () => void;
  onDeleteNote: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onEdit: (note: Note) => void;
  onSummarize: (note: Note) => void;
}

function Time() {
  return (
    <div
      className="basis-0 box-border content-stretch flex gap-[10px] grow h-[22px] items-center justify-center min-h-px min-w-px pb-0 pt-[2px] px-0 relative shrink-0"
      data-name="Time"
    >
      <p
        className="font-['SF_Pro:Semibold',sans-serif] font-[590] leading-[22px] relative shrink-0 text-[17px] text-black text-center text-nowrap whitespace-pre"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        9:41
      </p>
    </div>
  );
}

function Battery() {
  return (
    <div
      className="h-[13px] relative shrink-0 w-[27.328px]"
      data-name="Battery"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 28 13"
      >
        <g id="Battery">
          <rect
            height="12"
            id="Border"
            opacity="0.35"
            rx="3.8"
            stroke="var(--stroke-0, black)"
            width="24"
            x="0.5"
            y="0.5"
          />
          <path
            d={svgPaths.p3bbd9700}
            fill="var(--fill-0, black)"
            id="Cap"
            opacity="0.4"
          />
          <rect
            fill="var(--fill-0, black)"
            height="9"
            id="Capacity"
            rx="2.5"
            width="21"
            x="2"
            y="2"
          />
        </g>
      </svg>
    </div>
  );
}

function Levels() {
  return (
    <div
      className="basis-0 box-border content-stretch flex gap-[7px] grow h-[22px] items-center justify-center min-h-px min-w-px pb-0 pt-px px-0 relative shrink-0"
      data-name="Levels"
    >
      <div
        className="h-[12.226px] relative shrink-0 w-[19.2px]"
        data-name="Cellular Connection"
      >
        <div
          className="absolute inset-0"
          style={
            {
              "--fill-0": "rgba(0, 0, 0, 1)",
            } as React.CSSProperties
          }
        >
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 20 13"
          >
            <path
              clipRule="evenodd"
              d={svgPaths.p1e09e400}
              fill="var(--fill-0, black)"
              fillRule="evenodd"
              id="Cellular Connection"
            />
          </svg>
        </div>
      </div>
      <div
        className="h-[12.328px] relative shrink-0 w-[17.142px]"
        data-name="Wifi"
      >
        <div
          className="absolute inset-0"
          style={
            {
              "--fill-0": "rgba(0, 0, 0, 1)",
            } as React.CSSProperties
          }
        >
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 18 13"
          >
            <path
              clipRule="evenodd"
              d={svgPaths.p18b35300}
              fill="var(--fill-0, black)"
              fillRule="evenodd"
              id="Wifi"
            />
          </svg>
        </div>
      </div>
      <Battery />
    </div>
  );
}

function IcRoundSearch() {
  return (
    <div className="size-[24px]" data-name="ic:round-search">
      {/* Icon removed */}
    </div>
  );
}

type SortOption = "date" | "alphabetical" | "relevance";
type FilterOption = "all" | "today" | "week" | "month";

export default function SearchPage({
  notes,
  onBack,
  onDeleteNote,
  onToggleFavorite,
  onEdit,
  onSummarize,
}: SearchPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("date");
  const [filterBy, setFilterBy] = useState<FilterOption>("all");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [expandedNote, setExpandedNote] = useState<Note | null>(
    null,
  );

  // Filter notes based on search query and filters
  const filteredNotes = notes.filter((note) => {
    // Search in title and content
    const matchesSearch =
      searchQuery === "" ||
      note.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      note.content
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    // Filter by date
    const now = Date.now();
    const noteTime = note.createdAt.getTime();
    const hoursDiff = (now - noteTime) / (1000 * 60 * 60);

    switch (filterBy) {
      case "today":
        return hoursDiff <= 24;
      case "week":
        return hoursDiff <= 168;
      case "month":
        return hoursDiff <= 720;
      default:
        return true;
    }
  });

  // Sort notes
  const sortedNotes = [...filteredNotes].sort((a, b) => {
    switch (sortBy) {
      case "date":
        return b.createdAt.getTime() - a.createdAt.getTime();
      case "alphabetical":
        return a.title.localeCompare(b.title);
      case "relevance":
        // Simple relevance: prioritize matches in title over content
        const aInTitle = a.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const bInTitle = b.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        if (aInTitle && !bInTitle) return -1;
        if (!aInTitle && bInTitle) return 1;
        return b.createdAt.getTime() - a.createdAt.getTime();
      default:
        return 0;
    }
  });

  const highlightText = (text: string, query: string) => {
    if (!query) return text;

    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <span key={i} className="text-[#0088ff]">
              {part}
            </span>
          ) : (
            <span key={i}>{part}</span>
          ),
        )}
      </>
    );
  };

  return (
    <div
      className="bg-[#ffff45] overflow-clip relative size-full min-h-screen"
      data-name="Search"
    >
      {/* Status bar removed */}

      {/* Back Button */}
      <button
        onClick={onBack}
        className="absolute box-border content-stretch flex font-['SF_Pro:Medium',sans-serif] font-[510] h-[36px] items-center gap-1 justify-center leading-[0] left-[39px] px-[8px] py-0 rounded-[100px] text-[17px] text-center text-neutral-700 text-nowrap top-[85px] hover:bg-black/5 transition-colors"
      >
        <ChevronLeft className="size-5" />
        <span style={{ fontVariationSettings: "'wdth' 100" }}>
          Back to notes
        </span>
      </button>

      {/* Search Input */}
      <div className="absolute backdrop-blur-[15px] backdrop-filter bg-[rgba(0,0,0,0.1)] box-border content-stretch flex items-center gap-[10px] h-[47px] left-[39px] px-[23px] py-[17px] rounded-[17px] top-[144px] w-[324px]">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search notes..."
          className="flex-1 bg-transparent font-['SF_Pro:Regular',sans-serif] font-normal leading-[25px] text-[20px] text-black tracking-[-0.45px] outline-none placeholder:text-[rgba(0,0,0,0.5)]"
          style={{ fontVariationSettings: "'wdth' 100" }}
        />
        <IcRoundSearch />
      </div>

      {/* Filter and Sort Controls */}
      <div className="absolute content-stretch flex items-center justify-between left-[39px] top-[203px] w-[324px]">
        {/* Filter Button */}
        <div className="relative">
          <button
            onClick={() => {
              setShowFilterMenu(!showFilterMenu);
              setShowSortMenu(false);
            }}
            className="box-border content-stretch flex items-center justify-center px-2 py-1 rounded-lg hover:bg-black/5 transition-colors"
          >
            <p
              className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[22px] text-[17px] text-black text-center tracking-[-0.43px]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Filter
            </p>
            <svg
              className="size-[24px] ml-1"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 24 24"
            >
              <path
                d={
                  showFilterMenu
                    ? svgPaths.p2ad7500
                    : svgPaths.p15365e00
                }
                fill="black"
              />
            </svg>
          </button>

          {/* Filter Menu */}
          <AnimatePresence>
            {showFilterMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full mt-2 left-0 backdrop-blur-[15px] backdrop-filter bg-[rgba(0,0,0,0.15)] rounded-lg shadow-lg overflow-hidden z-10"
              >
                {(
                  [
                    "all",
                    "today",
                    "week",
                    "month",
                  ] as FilterOption[]
                ).map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setFilterBy(option);
                      setShowFilterMenu(false);
                    }}
                    className={`block w-full px-4 py-2 text-left font-['SF_Pro:Regular',sans-serif] hover:bg-black/10 transition-colors ${
                      filterBy === option ? "bg-black/10" : ""
                    }`}
                    style={{
                      fontVariationSettings: "'wdth' 100",
                    }}
                  >
                    {option.charAt(0).toUpperCase() +
                      option.slice(1)}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sort Button */}
        <div className="relative">
          <button
            onClick={() => {
              setShowSortMenu(!showSortMenu);
              setShowFilterMenu(false);
            }}
            className="content-stretch flex items-center justify-center px-2 py-1 rounded-lg hover:bg-black/5 transition-colors"
          >
            <p
              className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[22px] text-[17px] text-black text-center tracking-[-0.43px] mr-2"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Sort by
            </p>
            <p
              className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[22px] text-[17px] text-black text-center tracking-[-0.43px] mr-1"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
            </p>
            <svg
              className="size-[24px]"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 24 24"
            >
              <path
                d={
                  showSortMenu
                    ? svgPaths.p2ad7500
                    : svgPaths.p15365e00
                }
                fill="black"
              />
            </svg>
          </button>

          {/* Sort Menu */}
          <AnimatePresence>
            {showSortMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full mt-2 right-0 backdrop-blur-[15px] backdrop-filter bg-[rgba(0,0,0,0.15)] rounded-lg shadow-lg overflow-hidden z-10"
              >
                {(
                  [
                    "date",
                    "alphabetical",
                    "relevance",
                  ] as SortOption[]
                ).map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSortBy(option);
                      setShowSortMenu(false);
                    }}
                    className={`block w-full px-4 py-2 text-left font-['SF_Pro:Regular',sans-serif] hover:bg-black/10 transition-colors whitespace-nowrap ${
                      sortBy === option ? "bg-black/10" : ""
                    }`}
                    style={{
                      fontVariationSettings: "'wdth' 100",
                    }}
                  >
                    {option.charAt(0).toUpperCase() +
                      option.slice(1)}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Results */}
      <div className="absolute left-[39px] top-[256px] w-[324px] space-y-[18px] max-h-[480px] overflow-y-auto pb-20">
        <AnimatePresence mode="popLayout">
          {sortedNotes.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center pt-10"
            >
              <p
                className="font-['SF_Pro:Regular',sans-serif] text-black/60"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                {searchQuery
                  ? "No notes found"
                  : "Start typing to search"}
              </p>
            </motion.div>
          ) : (
            sortedNotes.map((note) => (
              <motion.div
                key={note.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              >
                <div
                  className="backdrop-blur-[15px] backdrop-filter bg-[rgba(0,0,0,0.1)] box-border content-stretch flex flex-col gap-[10px] px-[23px] py-[17px] rounded-[17px] w-[324px] cursor-pointer hover:bg-[rgba(0,0,0,0.15)] transition-colors"
                  onClick={() => setExpandedNote(note)}
                >
                  <div className="content-stretch flex flex-col gap-[9px] items-center justify-center relative shrink-0 w-[278px]">
                    <div className="content-stretch flex flex-col gap-[5px] items-center justify-center relative shrink-0 w-full">
                      <p
                        className="font-['SF_Pro:Semibold',sans-serif] font-[590] leading-[22px] relative shrink-0 text-[17px] text-black tracking-[-0.43px] w-full"
                        style={{
                          fontVariationSettings: "'wdth' 100",
                        }}
                      >
                        {highlightText(note.title, searchQuery)}
                      </p>
                      <p
                        className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[22px] relative shrink-0 text-[17px] text-black tracking-[-0.43px] w-full line-clamp-2"
                        style={{
                          fontVariationSettings: "'wdth' 100",
                        }}
                      >
                        {highlightText(
                          note.content.substring(0, 50) + "...",
                          searchQuery,
                        )}
                      </p>
                    </div>
                    <p
                      className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[13px] text-neutral-700 tracking-[-0.08px] w-full"
                      style={{
                        fontVariationSettings: "'wdth' 100",
                      }}
                    >
                      Edited{" "}
                      {Math.floor(
                        (Date.now() -
                          note.createdAt.getTime()) /
                          (1000 * 60 * 60),
                      )}
                      hrs ago
                    </p>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Expanded Note Modal */}
      <AnimatePresence>
        {expandedNote && (
          <ExpandedNoteCard
            note={expandedNote}
            onClose={() => setExpandedNote(null)}
            onDelete={(id) => {
              onDeleteNote(id);
              setExpandedNote(null);
            }}
            onToggleFavorite={onToggleFavorite}
            onEdit={(note) => {
              onEdit(note);
              setExpandedNote(null);
            }}
            onSummarize={onSummarize}
          />
        )}
      </AnimatePresence>
    </div>
  );
}