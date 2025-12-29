import { motion } from 'motion/react';
import svgPaths from '../imports/svg-kpjggey3by';
import { Note } from '../App';
import { X } from 'lucide-react';

interface ExpandedNoteCardProps {
  note: Note;
  onClose: () => void;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onEdit: (note: Note) => void;
  onSummarize: (note: Note) => void;
}

function MaterialSymbolsInfoRounded() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="material-symbols:info-rounded">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="material-symbols:info-rounded">
          <path d={svgPaths.p992c5c0} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function IcBaselineDelete() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="ic:baseline-delete">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="ic:baseline-delete">
          <path d={svgPaths.p2eacd800} fill="var(--fill-0, #FF383C)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function SiAiDuotone() {
  return (
    <div className="overflow-clip relative shrink-0 size-[22px]" data-name="si:ai-duotone">
      <div className="absolute inset-[7.384%]" data-name="Group">
        <div className="absolute inset-[-4%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 21">
            <g id="Group">
              <path d={svgPaths.p79ef200} fill="var(--fill-0, black)" fillOpacity="0.16" id="Vector" />
              <path d={svgPaths.p74118f0} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function MaterialSymbolsStarRounded({ isFilled }: { isFilled?: boolean }) {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="material-symbols:star-rounded">
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
    </div>
  );
}

function MaterialSymbolsEdit() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="material-symbols:edit">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="material-symbols:edit">
          <path d={svgPaths.p2958d400} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

const getTimeAgo = (date: Date) => {
  const hours = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60));
  if (hours < 1) return 'just now';
  if (hours < 24) return `${hours}hrs ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? 's' : ''} ago`;
};

export default function ExpandedNoteCard({ 
  note, 
  onClose, 
  onDelete, 
  onToggleFavorite,
  onEdit,
  onSummarize 
}: ExpandedNoteCardProps) {
  
  const handleInfoClick = () => {
    const createdDate = new Date(note.createdAt).toLocaleString();
    alert(`Note Information:\n\nCreated: ${createdDate}\nCategory: ${note.category || 'None'}\nCharacters: ${note.content.length}`);
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
        className="bg-[#ffff45] backdrop-blur-[15px] box-border content-stretch flex flex-col gap-[16px] px-[28px] py-[24px] rounded-[20px] w-full max-w-[354px] relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 hover:bg-black/15 rounded-full transition-colors z-10"
        >
          <X className="size-5 text-black/70" />
        </button>

        {/* Note Content */}
        <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full pr-8">
          <p className="font-['SF_Pro:Semibold',sans-serif] font-[590] leading-[26px] relative shrink-0 text-[20px] text-black tracking-[-0.5px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            {note.title}
          </p>
          <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[16px] text-black/80 tracking-[-0.4px] w-full max-h-[320px] overflow-y-auto pr-2" style={{ fontVariationSettings: "'wdth' 100" }}>
            {note.content}
          </p>
          <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[12px] text-neutral-600 tracking-[-0.08px] w-full mt-1" style={{ fontVariationSettings: "'wdth' 100" }}>
            Edited {getTimeAgo(note.createdAt)}
          </p>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-black/10"></div>

        {/* Action Buttons */}
        <div className="relative shrink-0 w-full">
          <div className="flex flex-row items-center justify-between size-full">
            {/* Left side buttons - Info and Delete */}
            <div className="content-stretch flex items-center justify-start relative shrink-0 gap-2">
              {/* Info Button */}
              <button
                onClick={handleInfoClick}
                className="hover:bg-black/10 p-2.5 rounded-xl transition-colors group"
                title="Note Information"
              >
                <MaterialSymbolsInfoRounded />
              </button>
              
              {/* Delete Button */}
              <button
                onClick={() => {
                  onDelete(note.id);
                  onClose();
                }}
                className="hover:bg-red-500/10 p-2.5 rounded-xl transition-colors group"
                title="Delete Note"
              >
                <IcBaselineDelete />
              </button>
            </div>
            
            {/* Right side buttons - AI, Favorite, Edit */}
            <div className="content-stretch flex items-center justify-end relative shrink-0 gap-2">
              {/* AI Summarize Button */}
              <button
                onClick={() => onSummarize(note)}
                className="hover:bg-black/10 p-2.5 rounded-xl transition-colors group"
                title="AI Summarize"
              >
                <SiAiDuotone />
              </button>
              
              {/* Favorite Toggle Button */}
              <button
                onClick={() => onToggleFavorite(note.id)}
                className="hover:bg-black/10 p-2.5 rounded-xl transition-colors group"
                title={note.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              >
                <MaterialSymbolsStarRounded isFilled={note.isFavorite} />
              </button>
              
              {/* Edit Button */}
              <button
                onClick={() => {
                  onEdit(note);
                  onClose();
                }}
                className="hover:bg-black/10 p-2.5 rounded-xl transition-colors group"
                title="Edit Note"
              >
                <MaterialSymbolsEdit />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}