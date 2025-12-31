import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import svgPaths from '../imports/svg-5hcwgli0hm';
import svgPathsPin from '../imports/svg-g7aqyafhff'; // Import existing pin SVG path
import { imgFrame } from '../imports/svg-77sym';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Bold, Italic, Underline, Image as ImageIcon, Mic, Sparkles, ArrowLeft, Loader2, StopCircle } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { supabase } from '../utils/supabase/client';
import { toast } from 'sonner@2.0.3';

const SERVER_URL = `https://${projectId}.supabase.co/functions/v1/make-server-a9941a55`;

// Use the asset from the import
const imgEllipse1 = "figma:asset/dc9d2a0a49bcf3eca91fafce4dc73b13bf81c01d.png";

interface EditNoteViewProps {
  note: {
    id: string;
    title: string;
    content: string;
    date?: string;
    isPinned?: boolean;
  };
  onClose: () => void;
  onSave: (id: string, title: string, content: string) => void;
  onPin?: (id: string, isPinned: boolean) => void;
}

function Layer() {
  return (
    <div className="h-[384.617px] relative w-[719.502px]" data-name="Layer_1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 719.502 384.617">
        <g clipPath="url(#clip0_3_117)" id="Layer_1">
          <path d={svgPaths.pe31b6c0} fill="#B4D1FF" id="Vector" />
          <path d={svgPaths.p7f5dd00} fill="#B4D1FF" id="Vector_2" />
          <path d={svgPaths.p1a04e100} fill="#B4D1FF" id="Vector_3" />
          <path d={svgPaths.p1273db00} fill="#B4D1FF" id="Vector_4" />
          <path d={svgPaths.p16389880} fill="#B4D1FF" id="Vector_5" />
          <path d={svgPaths.p2debb200} fill="#B4D1FF" id="Vector_6" />
          <path d={svgPaths.p42b2230} fill="#B4D1FF" id="Vector_7" />
          <path d={svgPaths.p19bc7480} fill="#B4D1FF" id="Vector_8" />
          <path d={svgPaths.p33cec380} fill="#B4D1FF" id="Vector_9" />
          <path d={svgPaths.p2e087600} fill="#B4D1FF" id="Vector_10" />
          <path d={svgPaths.p35ff6a00} fill="#B4D1FF" id="Vector_11" />
          <path d={svgPaths.pa470600} fill="#B4D1FF" id="Vector_12" />
          <path d={svgPaths.p3115f880} fill="#B4D1FF" id="Vector_13" />
          <path d={svgPaths.p18d4e5f0} fill="#B4D1FF" id="Vector_14" />
        </g>
        <defs>
          <clipPath id="clip0_3_117">
            <rect fill="white" height="384.617" width="719.502" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-[5.84px] top-[146.13px]">
      <div className="absolute flex h-[719.896px] items-center justify-center left-[5.84px] top-[146.13px] w-[390.314px]" style={{ "--transform-inner-width": "300", "--transform-inner-height": "150" } as React.CSSProperties}>
        <div className="flex-none rotate-[89.546deg] scale-y-[-100%] skew-x-[0.516deg]">
          <Layer />
        </div>
      </div>
    </div>
  );
}

function IcRoundMenu() {
  return (
    <div className="absolute left-[22.5px] size-[39px] top-[64px] cursor-pointer hover:opacity-70" data-name="ic:round-menu">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 39 39">
        <g id="ic:round-menu">
          <path d={svgPaths.p23f2e500} fill="black" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Materials1() {
  return (
    <div className="h-[8px] overflow-clip relative w-[29px]" data-name="_Materials">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute bg-[rgba(153,153,153,0.97)] inset-0" />
        <div className="absolute backdrop-blur-[25px] backdrop-filter bg-[#5c5c5c] inset-0 mix-blend-color-dodge" />
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute h-[8px] left-[10.5px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-0.5px_0px] mask-size-[29px_8px] top-0 w-[29px]" data-name="Frame" style={{ maskImage: `url('${imgFrame}')`, WebkitMaskImage: `url('${imgFrame}')` }}>
      <div className="absolute flex h-[8px] items-center justify-center left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[29px]">
        <div className="flex-none scale-y-[-100%]">
          <Materials1 />
        </div>
      </div>
    </div>
  );
}

function Tail() {
  return (
    <div className="absolute h-[10px] left-[calc(50%+0.5px)] top-[40px] translate-x-[-50%] w-[50px]" data-name="Tail">
      <Frame />
    </div>
  );
}

function Materials() {
  return <div className="absolute inset-0 overflow-clip bg-white/90 backdrop-blur-md" data-name="_Materials" />;
}

function Actions() {
  return (
    <div className="absolute h-[40px] left-0 overflow-clip right-0 rounded-[8px] top-0" data-name="Actions">
      <Materials />
    </div>
  );
}

function Background() {
  return (
    <div className="absolute inset-0 shadow-[0px_3px_31px_0px_rgba(0,0,0,0.25)] rounded-[8px]" data-name="Background">
      <Actions />
      <Tail />
    </div>
  );
}

function CompactMenu({ onFormat }: { onFormat: (cmd: string) => void }) {
  return (
    <div className="absolute content-stretch flex flex-col items-center justify-end left-[32px] top-[114px] w-[177px] z-50" data-name="Compact Menu">
      <Background />
      <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[8px] shrink-0 w-full h-[40px]" data-name="Actions">
        <div className="flex items-center justify-around w-full px-2">
            <button onClick={() => onFormat('bold')} className="p-1 hover:bg-black/10 rounded">
                <Bold size={16} className="text-black" />
            </button>
            <button onClick={() => onFormat('italic')} className="p-1 hover:bg-black/10 rounded">
                <Italic size={16} className="text-black" />
            </button>
            <button onClick={() => onFormat('underline')} className="p-1 hover:bg-black/10 rounded">
                <Underline size={16} className="text-black" />
            </button>
        </div>
      </div>
    </div>
  );
}

function SiAiDuotone() {
  return (
    <div className="overflow-clip relative shrink-0 size-[22px]" data-name="si:ai-duotone">
      <div className="absolute inset-[7.38%]">
        <div className="absolute inset-[-4%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.251 20.251">
            <g id="Group">
                <path d={svgPaths.p79ef200} fill="black" fillOpacity="0.16" id="Vector" />
                <path d={svgPaths.p74118f0} id="Vector_2" stroke="#FFFF45" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" />
            </g>
            </svg>
        </div>
      </div>
    </div>
  );
}

export function EditNoteView({ note, onClose, onSave, onPin }: EditNoteViewProps) {
    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);
    const [isPinned, setIsPinned] = useState(note.isPinned || false);
    const [showFormatting, setShowFormatting] = useState(false);
    const [isEnhancing, setIsEnhancing] = useState(false);
    const [isSummarizing, setIsSummarizing] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [isUploadingVoice, setIsUploadingVoice] = useState(false);
    
    const contentRef = useRef<HTMLDivElement>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);

    // Update state when contentEditable changes
    const handleContentChange = () => {
        if (contentRef.current) {
            setContent(contentRef.current.innerHTML);
        }
    };

    const handleFormat = (command: string) => {
        document.execCommand(command, false);
        // Ensure focus remains
        if (contentRef.current) {
            contentRef.current.focus();
        }
    };

    const handleSave = () => {
        onSave(note.id, title, contentRef.current ? contentRef.current.innerText : content);
        onClose();
    };

    const handlePin = () => {
        const newPinnedState = !isPinned;
        setIsPinned(newPinnedState);
        if (onPin) {
            onPin(note.id, newPinnedState);
        }
    };

    const handleEnhance = async () => {
        if (!contentRef.current?.innerText.trim()) {
            toast.error("Please enter some text to enhance");
            return;
        }

        setIsEnhancing(true);
        try {
            const response = await fetch(`${SERVER_URL}/ai/enhance`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${publicAnonKey}`
                },
                body: JSON.stringify({ text: contentRef.current.innerText })
            });

            if (!response.ok) throw new Error('Failed to enhance text');

            const data = await response.json();
            if (data.enhancedText) {
                // Preserve HTML structure if possible, but for now we replace with text
                // Ideally we'd want a more sophisticated rich text editor
                if (contentRef.current) {
                    contentRef.current.innerText = data.enhancedText;
                    setContent(data.enhancedText);
                }
                toast.success("Text enhanced!");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to enhance text");
        } finally {
            setIsEnhancing(false);
        }
    };

    const handleUploadVoice = async (audioBlob: Blob) => {
        setIsUploadingVoice(true);
        try {
            const { data: { session } } = await supabase.auth.getSession();
            
            if (session?.user) {
                // Verified: Upload to Server
                const formData = new FormData();
                formData.append('file', audioBlob, 'voice-note.webm');

                const response = await fetch(`${SERVER_URL}/upload/voice`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${session.access_token}`
                    },
                    body: formData
                });

                if (!response.ok) throw new Error('Upload failed');

                const data = await response.json();
                if (data.url) {
                    const audioHtml = `<br/><div class="my-4 p-2 bg-gray-100 rounded-lg"><audio controls src="${data.url}" class="w-full"></audio></div><br/>`;
                    insertHtml(audioHtml);
                    toast.success("Voice note added!");
                }
            } else {
                // Guest: Convert to Base64 (Data URL)
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64data = reader.result as string;
                    const audioHtml = `<br/><div class="my-4 p-2 bg-gray-100 rounded-lg"><audio controls src="${base64data}" class="w-full"></audio></div><br/>`;
                    insertHtml(audioHtml);
                    toast.success("Voice note added (Local)");
                };
                reader.readAsDataURL(audioBlob);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to upload voice note");
        } finally {
            setIsUploadingVoice(false);
        }
    };

    const insertHtml = (html: string) => {
        if (contentRef.current) {
            contentRef.current.focus();
            const success = document.execCommand('insertHTML', false, html);
            if (!success) {
                contentRef.current.innerHTML += html;
            }
            setContent(contentRef.current.innerHTML);
        } else {
             setContent(prev => prev + html);
        }
    };

    const handleStartRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = async () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                await handleUploadVoice(audioBlob);
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorder.start();
            setIsRecording(true);
            toast.info("Recording started...");
        } catch (error) {
            console.error("Error accessing microphone:", error);
            toast.error("Could not access microphone");
        }
    };

    const handleStopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    const toggleRecording = () => {
        if (isRecording) {
            handleStopRecording();
        } else {
            handleStartRecording();
        }
    };

    const handleSummary = async () => {
        if (!contentRef.current?.innerText.trim()) {
            toast.error("Please enter some text to summarize");
            return;
        }

        setIsSummarizing(true);
        try {
            const response = await fetch(`${SERVER_URL}/ai/summary`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${publicAnonKey}`
                },
                body: JSON.stringify({ text: contentRef.current.innerText })
            });

            if (!response.ok) throw new Error('Failed to summarize text');

            const data = await response.json();
            if (data.summary) {
                toast(
                    <div className="flex flex-col gap-2">
                        <p className="font-bold">Summary</p>
                        <p className="text-sm">{data.summary}</p>
                    </div>,
                    { duration: 5000 }
                );
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to summarize text");
        } finally {
            setIsSummarizing(false);
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed inset-0 z-50 bg-white overflow-hidden flex flex-col"
            data-name="Eidting page"
        >
            {/* Background Layers */}
            <div className="absolute inset-0 pointer-events-none">
                <Group1 />
                <div className="absolute backdrop-blur-[5.5px] backdrop-filter bg-[rgba(254,254,254,0.8)] h-full w-full opacity-90" />
            </div>

            {/* Header */}
            <div className="relative z-10 w-full flex items-center justify-between px-6 pt-16 pb-4">
                 <button onClick={onClose} className="hover:opacity-70 p-2 -ml-2 rounded-full hover:bg-black/5 transition-colors">
                    <ArrowLeft size={24} />
                 </button>
                 <p className="font-['SF_Pro:Semibold',sans-serif] font-[590] text-[20px] text-black tracking-[-0.45px]">
                    Edit
                 </p>
                 <div className="w-[31px] h-[31px] rounded-full overflow-hidden border border-black/10">
                    <ImageWithFallback src={imgEllipse1} alt="Profile" className="w-full h-full object-cover" />
                 </div>
            </div>

            {/* Main Content Card */}
            <div className="relative z-10 flex-1 px-6 pt-6 pb-24 overflow-y-auto">
                 <div className="bg-[rgba(223,223,223,0.6)] backdrop-blur-sm rounded-[17px] p-6 min-h-[500px] flex flex-col gap-6">
                    {/* Title and Top Actions Container */}
                    <div className="flex items-center justify-between gap-4">
                        {/* Title Input */}
                        <input 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="bg-transparent border-none outline-none font-['SF_Pro:Semibold',sans-serif] font-[590] text-[17px] text-black tracking-[-0.43px] flex-1 placeholder:text-black/50"
                            placeholder="Title"
                        />
                        
                        {/* Top Right Actions */}
                        <div className="flex items-center gap-3 shrink-0">
                            {/* AI Summarize Button */}
                            <button 
                                onClick={handleSummary}
                                disabled={isSummarizing}
                                className="flex items-center justify-center p-2 rounded-full hover:bg-black/5 transition-colors disabled:opacity-50"
                                title="AI Summarize"
                            >
                                {isSummarizing ? (
                                    <Loader2 size={20} className="text-black/70 animate-spin" />
                                ) : (
                                    <Sparkles size={20} className="text-black/70" />
                                )}
                            </button>

                            {/* Pin Button */}
                            <button 
                                onClick={handlePin}
                                className={`flex items-center justify-center p-2 rounded-full hover:bg-black/5 transition-colors ${isPinned ? 'bg-black/5' : ''}`}
                                title={isPinned ? "Unpin Note" : "Pin Note"}
                            >
                                <div className="w-[20px] h-[20px]">
                                    <svg viewBox="0 0 20 20" className="w-full h-full" fill="none">
                                        <path 
                                            d={svgPathsPin.pe0f5380} 
                                            fill="black" 
                                            fillOpacity={isPinned ? 1 : 0.3} 
                                            stroke="black"
                                            strokeWidth={isPinned ? 0 : 1}
                                        />
                                    </svg>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Content Editor */}
                    <div className="relative flex-1">
                        <div 
                            ref={contentRef}
                            contentEditable
                            onInput={handleContentChange}
                            onFocus={() => setShowFormatting(true)}
                            onBlur={() => setTimeout(() => setShowFormatting(false), 200)} // Delay to allow button clicks
                            className="bg-transparent border-none outline-none font-['SF_Pro:Regular',sans-serif] font-normal text-[17px] text-black tracking-[-0.43px] w-full min-h-[300px] whitespace-pre-wrap focus:ring-0"
                            dangerouslySetInnerHTML={{ __html: note.content }} // Initial content
                            style={{ lineHeight: '22px' }}
                        />
                        
                        {/* Formatting Menu - Show when focused */}
                        {showFormatting && (
                            <div className="absolute -top-16 left-0 animate-in fade-in zoom-in duration-200">
                                <CompactMenu onFormat={handleFormat} />
                            </div>
                        )}
                    </div>
                 
                    {/* Bottom Toolbar inside the card */}
                    <div className="w-full flex items-center justify-between pt-4 border-t border-black/5">
                        {/* Enhance Button */}
                        <button 
                            onClick={handleEnhance}
                            disabled={isEnhancing}
                            className="bg-[#33331e] flex items-center gap-2 px-3 py-1.5 rounded-[15px] hover:bg-[#44442e] transition-colors disabled:opacity-70"
                        >
                            <SiAiDuotone />
                            <span className="font-['SF_Pro:Regular',sans-serif] text-[#ffff45] text-[16px]">
                                {isEnhancing ? "Enhancing..." : "Enhance"}
                            </span>
                        </button>

                        <div className="flex items-center gap-4">
                            <button className="hover:opacity-70 transition-opacity" title="Add Image">
                                <ImageIcon size={20} color="#33331E" />
                            </button>
                            <button 
                                onClick={toggleRecording}
                                disabled={isUploadingVoice}
                                className={`hover:opacity-70 transition-all rounded-full p-1 ${isRecording ? 'bg-red-100 ring-2 ring-red-500 animate-pulse' : ''}`}
                                title={isRecording ? "Stop Recording" : "Voice Note"}
                            >
                                {isUploadingVoice ? (
                                    <Loader2 size={20} className="animate-spin text-[#33331E]" />
                                ) : isRecording ? (
                                    <StopCircle size={20} className="text-red-600" />
                                ) : (
                                    <Mic size={20} color="#33331E" />
                                )}
                            </button>
                        </div>

                        <button 
                            onClick={handleSave}
                            className="font-['SF_Pro:Regular',sans-serif] text-[#ff383c] text-[16px] hover:text-[#d32f2f] transition-colors"
                        >
                            Close
                        </button>
                    </div>
                 </div>
            </div>

        </motion.div>
    );
}
