import { motion } from 'motion/react';
import { Note } from '../App';
import { X, Copy, Check } from 'lucide-react';
import svgPaths from '../imports/svg-jfktsrkjrm';
import { useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface AISummaryModalProps {
  note: Note;
  onClose: () => void;
}

function SiAiDuotone() {
  return (
    <div className="overflow-clip relative shrink-0 size-[28px]" data-name="si:ai-duotone">
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

// Mock AI summarization function
const generateSummary = (note: Note): string => {
  const content = note.content.toLowerCase();
  const sentences = note.content.split(/[.!?]+/).filter(s => s.trim().length > 0);
  
  // Extract key points (simple mock algorithm)
  const keyPoints: string[] = [];
  
  // Take first sentence as introduction
  if (sentences.length > 0) {
    keyPoints.push(sentences[0].trim());
  }
  
  // Find sentences with important keywords
  const keywords = ['important', 'key', 'main', 'critical', 'note', 'remember', 'goal', 'deadline'];
  const importantSentences = sentences.filter(s => 
    keywords.some(keyword => s.toLowerCase().includes(keyword))
  );
  
  if (importantSentences.length > 0) {
    keyPoints.push(...importantSentences.slice(0, 2));
  } else if (sentences.length > 2) {
    // If no keywords found, take middle sentence
    keyPoints.push(sentences[Math.floor(sentences.length / 2)].trim());
  }
  
  // Add last sentence as conclusion if there are enough sentences
  if (sentences.length > 3 && keyPoints.length < 3) {
    keyPoints.push(sentences[sentences.length - 1].trim());
  }
  
  // Format as bullet points
  const summary = keyPoints.length > 0 
    ? keyPoints.map(point => `• ${point.trim()}`).join('\n\n')
    : `• ${note.content.substring(0, 150)}...`;
    
  return summary;
};

export default function AISummaryModal({ note, onClose }: AISummaryModalProps) {
  const [summary, setSummary] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(true);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // Call Gemini API to generate summary
    const generateAISummary = async () => {
      try {
        setIsGenerating(true);
        setError('');
        
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-57cdb9fb/summarize`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${publicAnonKey}`,
            },
            body: JSON.stringify({
              title: note.title,
              content: note.content,
            }),
          }
        );
        
        const data = await response.json();
        
        if (!response.ok) {
          console.error('Gemini API error response:', data);
          throw new Error(data.details || data.error || 'Failed to generate summary');
        }
        
        setSummary(data.summary);
      } catch (err) {
        console.error('Error generating AI summary:', err);
        const errorMessage = err instanceof Error ? err.message : 'Failed to generate summary';
        setError(errorMessage);
        // Fallback to local summary generation
        const fallbackSummary = generateSummary(note);
        setSummary(fallbackSummary);
      } finally {
        setIsGenerating(false);
      }
    };

    generateAISummary();
  }, [note]);

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
        className="bg-[#ffff45] backdrop-blur-[15px] box-border content-stretch flex flex-col gap-[20px] px-[28px] py-[24px] rounded-[20px] w-full max-w-[380px] relative shadow-2xl"
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
        <div className="flex items-center gap-3 pr-8">
          <SiAiDuotone />
          <div>
            <h2 className="font-['SF_Pro:Semibold',sans-serif] font-[590] leading-[24px] text-[18px] text-black tracking-[-0.45px]" style={{ fontVariationSettings: "'wdth' 100" }}>
              AI Summary
            </h2>
            <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[18px] text-[13px] text-black/60 tracking-[-0.08px]" style={{ fontVariationSettings: "'wdth' 100" }}>
              {note.title}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-black/10"></div>

        {/* Summary Content */}
        <div className="relative min-h-[120px] max-h-[400px] overflow-y-auto">
          {isGenerating ? (
            <div className="flex flex-col items-center justify-center py-12 gap-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <SiAiDuotone />
              </motion.div>
              <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[20px] text-[15px] text-black/60 tracking-[-0.24px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                Generating summary...
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[22px] text-[15px] text-black tracking-[-0.24px] whitespace-pre-line" style={{ fontVariationSettings: "'wdth' 100" }}>
                {summary}
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        {!isGenerating && (
          <>
            <div className="w-full h-[1px] bg-black/10"></div>
            
            <div className="flex items-center justify-between">
              <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[18px] text-[12px] text-black/50 tracking-[-0.08px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                AI-generated summary
              </p>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 bg-black/10 hover:bg-black/15 rounded-lg transition-colors"
              >
                {copied ? (
                  <Check className="size-4 text-green-600" />
                ) : (
                  <Copy className="size-4 text-black/70" />
                )}
                <span className="font-['SF_Pro:Medium',sans-serif] font-[510] leading-[18px] text-[14px] text-black tracking-[-0.08px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                  {copied ? 'Copied!' : 'Copy'}
                </span>
              </button>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}