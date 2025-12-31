import React, { useState, useEffect } from 'react';
import { BackgroundLayer } from './components/Layout/BackgroundLayer';
import { Header } from './components/Header';
import { Section } from './components/Section';
import { NoteCard } from './components/NoteCard';
import { VoiceNoteItem } from './components/VoiceNoteItem';
import { PhotoGrid } from './components/PhotoGrid';
import { DrawingGrid } from './components/DrawingGrid';
import { BottomBar } from './components/BottomBar';
import { EditNoteView } from './components/EditNoteView';
import { ExpandedNoteView } from './components/ExpandedNoteView';
import { ExpandedVoiceView } from './components/ExpandedVoiceView';
import { ExpandedPhotoView } from './components/ExpandedPhotoView';
import { DrawNoteView } from './components/DrawNoteView';
import { ExpandedDrawView } from './components/ExpandedDrawView';
import { SearchPage } from './components/SearchPage';
import { SideMenu } from './components/SideMenu';
import { LoginPage } from './components/LoginPage';
import { SignupPage } from './components/SignupPage';
import { Toaster, toast } from 'sonner@2.0.3';
import { AnimatePresence } from 'framer-motion';
import { projectId, publicAnonKey } from './utils/supabase/info';
import { supabase } from './utils/supabase/client';

// Types
interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
  isPinned: boolean;
  isArchived?: boolean;
}

interface VoiceNote {
  id: string;
  title: string;
  date?: string;
}

const SERVER_URL = `https://${projectId}.supabase.co/functions/v1/make-server-a9941a55`;

export default function App() {
  // State
  const [searchTerm, setSearchTerm] = useState('');
  const [isVoiceOpen, setIsVoiceOpen] = useState(true);
  const [isNotesOpen, setIsNotesOpen] = useState(true);
  const [isPhotoOpen, setIsPhotoOpen] = useState(true);
  const [isDrawingSectionOpen, setIsDrawingSectionOpen] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Navigation State
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [selectedVoiceNote, setSelectedVoiceNote] = useState<VoiceNote | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [selectedDrawing, setSelectedDrawing] = useState<string | null>(null);
  const [isDrawMode, setIsDrawMode] = useState(false);
  const [drawingToEdit, setDrawingToEdit] = useState<string | undefined>(undefined);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // Auth State
  const [user, setUser] = useState<any>(null);
  const [authView, setAuthView] = useState<'none' | 'login' | 'signup'>('none');

  // Menu & View State
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeView, setActiveView] = useState<'all' | 'favorites' | 'archive'>('all');

  const [textNotes, setTextNotes] = useState<Note[]>([]);
  const [voiceNotes, setVoiceNotes] = useState<VoiceNote[]>([]);
  const [photos, setPhotos] = useState<string[]>([]);
  const [drawings, setDrawings] = useState<string[]>([]);

  // Fetch Data
  useEffect(() => {
    // Auth Check
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      
      // Determine initial view based on auth
      if (!session?.user) {
         // Check if previously continued as guest
         const isGuest = localStorage.getItem('isGuest') === 'true';
         if (!isGuest) {
             setAuthView('login');
         } else {
             setAuthView('none');
         }
      } else {
         setAuthView('none');
      }

      setIsLoading(true);
      try {
        if (session?.user) {
            // Verified: Fetch from Cloud
            const response = await fetch(`${SERVER_URL}/data`, {
              headers: { 
                  'Authorization': `Bearer ${session.access_token}` 
              }
            });
            if (response.ok) {
              const data = await response.json();
              if (data.textNotes) {
                const uniqueTextNotes = Array.from(new Map(data.textNotes.map((item: Note) => [item.id, item])).values()) as Note[];
                setTextNotes(uniqueTextNotes);
              }
              if (data.voiceNotes) {
                 const uniqueVoiceNotes = Array.from(new Map(data.voiceNotes.map((item: VoiceNote) => [item.id, item])).values()) as VoiceNote[];
                 setVoiceNotes(uniqueVoiceNotes);
              }
              if (data.photoNotes) {
                 const uniquePhotos = Array.from(new Set(data.photoNotes)) as string[];
                 setPhotos(uniquePhotos);
              }
              // Drawings are local-only for now or not returned by backend
              setDrawings([]);
            }
        } else {
            // Guest: Fetch from LocalStorage
            const localText = localStorage.getItem('guest_text_notes');
            const localVoice = localStorage.getItem('guest_voice_notes');
            const localPhoto = localStorage.getItem('guest_photo_notes');
            const localDrawings = localStorage.getItem('guest_drawings');
            
            if (localText) setTextNotes(JSON.parse(localText));
            if (localVoice) setVoiceNotes(JSON.parse(localVoice));
            if (localPhoto) setPhotos(JSON.parse(localPhoto));
            if (localDrawings) setDrawings(JSON.parse(localDrawings));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user || null);
      if (session?.user) {
        setAuthView('none');
        localStorage.removeItem('isGuest'); 
        // Reload data for new user
        setIsLoading(true);
        try {
            const response = await fetch(`${SERVER_URL}/data`, {
              headers: { 'Authorization': `Bearer ${session.access_token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setTextNotes(data.textNotes || []);
                setVoiceNotes(data.voiceNotes || []);
                setPhotos(data.photoNotes || []);
            }
        } catch(e) { console.error(e); }
        setIsLoading(false);
      } else {
          // If signed out, maybe go to login?
          // setAuthView('login');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Sync to LocalStorage for Guests
  useEffect(() => {
      if (!user && !isLoading) {
          localStorage.setItem('guest_text_notes', JSON.stringify(textNotes));
      }
  }, [textNotes, user, isLoading]);

  useEffect(() => {
      if (!user && !isLoading) {
          localStorage.setItem('guest_voice_notes', JSON.stringify(voiceNotes));
      }
  }, [voiceNotes, user, isLoading]);

  useEffect(() => {
      if (!user && !isLoading) {
          localStorage.setItem('guest_photo_notes', JSON.stringify(photos));
      }
  }, [photos, user, isLoading]);

  useEffect(() => {
      if (!user && !isLoading) {
          localStorage.setItem('guest_drawings', JSON.stringify(drawings));
      }
  }, [drawings, user, isLoading]);

  // Actions
  const handleAddNote = async () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'New Note',
      content: 'This is a new note created just now.',
      date: 'Just now',
      isPinned: false,
      isArchived: false
    };
    
    setTextNotes([newNote, ...textNotes]);
    setEditingNote(newNote);
    
    if (user) {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                await fetch(`${SERVER_URL}/notes/text`, {
                    method: 'POST',
                    headers: { 
                    'Authorization': `Bearer ${session.access_token}`,
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newNote)
                });
                toast.success('Note saved to cloud');
            }
        } catch (error) {
            console.error('Error saving note:', error);
            toast.error('Failed to save note');
        }
    } else {
        toast.success('Note saved locally');
    }
  };

  const handleUpdateNote = async (id: string, title: string, content: string) => {
    const updatedNotes = textNotes.map(n => 
        n.id === id ? { ...n, title, content, date: 'Edited just now' } : n
    );
    setTextNotes(updatedNotes);
    
    if (selectedNote?.id === id) {
        setSelectedNote({ ...selectedNote, title, content, date: 'Edited just now' });
    }
    
    if (user) {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                await fetch(`${SERVER_URL}/notes/text/${id}`, {
                    method: 'PUT',
                    headers: { 
                        'Authorization': `Bearer ${session.access_token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ title, content, date: 'Edited just now' })
                });
                toast.success('Note updated');
            }
        } catch (e) {
            console.error("Failed to update note", e);
        }
    }
  };

  const handlePinNote = async (id: string, isPinned: boolean) => {
    const updatedNotes = textNotes.map(n => 
        n.id === id ? { ...n, isPinned } : n
    );
    setTextNotes(updatedNotes);
    
    if (selectedNote?.id === id) {
        setSelectedNote({ ...selectedNote, isPinned });
    }
    if (editingNote?.id === id) {
        setEditingNote({ ...editingNote, isPinned });
    }
    
    toast(isPinned ? 'Note pinned' : 'Note unpinned');

    if (user) {
        try {
             const { data: { session } } = await supabase.auth.getSession();
             if (session) {
                await fetch(`${SERVER_URL}/notes/text/${id}`, {
                    method: 'PUT',
                    headers: { 
                    'Authorization': `Bearer ${session.access_token}`,
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ isPinned })
                });
             }
        } catch (e) {
            console.error("Failed to update pin status", e);
        }
    }
  };

  const handleDeleteNote = async (id: string) => {
    setTextNotes(textNotes.filter(n => n.id !== id));
    if (selectedNote?.id === id) setSelectedNote(null);
    if (editingNote?.id === id) setEditingNote(null);
    toast('Note deleted');

    if (user) {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                await fetch(`${SERVER_URL}/notes/text/${id}`, {
                method: 'DELETE',
                headers: { 
                    'Authorization': `Bearer ${session.access_token}`,
                    'Content-Type': 'application/json'
                }
                });
            }
          } catch (error) {
             console.error('Error deleting note:', error);
          }
    }
  };

  const handleArchiveNote = async (id: string) => {
      const updatedNotes = textNotes.map(n => 
          n.id === id ? { ...n, isArchived: true } : n
      );
      setTextNotes(updatedNotes);
      toast('Note archived');

      if (user) {
          try {
             const { data: { session } } = await supabase.auth.getSession();
             if (session) {
                await fetch(`${SERVER_URL}/notes/text/${id}`, {
                    method: 'PUT',
                    headers: { 
                    'Authorization': `Bearer ${session.access_token}`,
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ isArchived: true })
                });
             }
          } catch (e) {
              console.error("Failed to archive note", e);
          }
      }
  };

  const handleAddVoice = async () => {
    if (isRecording) {
      setIsRecording(false);
      const newVoice: VoiceNote = {
        id: Date.now().toString(),
        title: `Audio Note ${voiceNotes.length + 1}`,
        date: new Date().toLocaleDateString()
      };
      
      setVoiceNotes([newVoice, ...voiceNotes]);
      toast.success('Voice note saved');

      if (user) {
          try {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                await fetch(`${SERVER_URL}/notes/voice`, {
                method: 'POST',
                headers: { 
                    'Authorization': `Bearer ${session.access_token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newVoice)
                });
            }
          } catch (error) {
             console.error('Error saving voice note:', error);
          }
      }

    } else {
      setIsRecording(true);
      toast.info('Recording... Tap again to stop');
    }
  };

  const handleAddPhoto = async () => {
    const newPhoto = 'https://images.unsplash.com/photo-1617634667039-8e4cb277ab46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYW5kc2NhcGUlMjBuYXR1cmV8ZW58MXx8fHwxNzY3MDM1NTU3fDA&ixlib=rb-4.1.0&q=80&w=1080';
    setPhotos([newPhoto, ...photos]);
    toast.success('Photo added');

    if (user) {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                await fetch(`${SERVER_URL}/notes/photo`, {
                method: 'POST',
                headers: { 
                    'Authorization': `Bearer ${session.access_token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ url: newPhoto })
                });
            }
          } catch (error) {
             console.error('Error saving photo:', error);
          }
    }
  };

  const handleAddDrawing = () => {
    setDrawingToEdit(undefined);
    setIsDrawMode(true);
  };

  const handleSaveDrawing = async (imageData: string) => {
    setIsDrawMode(false);

    if (drawingToEdit) {
        // Replace existing drawing
        const newDrawings = drawings.map(d => d === drawingToEdit ? imageData : d);
        setDrawings(newDrawings);
    } else {
        setDrawings([imageData, ...drawings]);
    }
    
    toast.success('Drawing saved');

    if (user) {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                await fetch(`${SERVER_URL}/notes/drawing`, {
                method: 'POST',
                headers: { 
                    'Authorization': `Bearer ${session.access_token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ image: imageData })
                });
            }
          } catch (error) {
             console.error('Error saving drawing:', error);
          }
    }
  };

  const handleDeleteVoice = async (id: string) => {
    setVoiceNotes(voiceNotes.filter(n => n.id !== id));
    if (selectedVoiceNote?.id === id) setSelectedVoiceNote(null);
    toast('Voice note deleted');

    if (user) {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                await fetch(`${SERVER_URL}/notes/voice/${id}`, {
                method: 'DELETE',
                headers: { 
                    'Authorization': `Bearer ${session.access_token}`,
                    'Content-Type': 'application/json'
                }
                });
            }
          } catch (error) {
             console.error('Error deleting voice note:', error);
          }
    }
  };

  const handleDeletePhoto = async (url: string) => {
    setPhotos(photos.filter(p => p !== url));
    if (selectedPhoto === url) setSelectedPhoto(null);
    toast('Photo deleted');
  };

  const handleDeleteDrawing = async (url: string) => {
    setDrawings(drawings.filter(d => d !== url));
    if (selectedDrawing === url) setSelectedDrawing(null);
    toast('Drawing deleted');
    // Logic for server delete would go here
  };

  // Filter
  const filteredTextNotes = textNotes
    .filter(n => {
        const matchesSearch = (n.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) || (n.content?.toLowerCase() || '').includes(searchTerm.toLowerCase());
        
        if (activeView === 'archive') {
            return matchesSearch && n.isArchived;
        } else if (activeView === 'favorites') {
            return matchesSearch && !n.isArchived && n.isPinned;
        } else {
            return matchesSearch && !n.isArchived;
        }
    })
    .sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return 0; 
    });

  const filteredVoiceNotes = voiceNotes.filter(n => (n.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()));

  const getSectionTitle = () => {
    switch (activeView) {
        case 'favorites': return 'Favorites';
        case 'archive': return 'Archived Notes';
        default: return 'Notes';
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-white font-sans">
      <BackgroundLayer />
      
      <div className="relative z-10 w-full h-full flex flex-col">
        {/* Header */}
        <Header 
            searchTerm={searchTerm} 
            onSearchChange={setSearchTerm} 
            onSearchClick={() => setIsSearchOpen(true)}
            onMenuClick={() => setIsMenuOpen(true)}
        />
        
        <div className="flex-1 overflow-y-auto pb-32 px-5" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className="max-w-2xl mx-auto flex flex-col items-center">
            
            {/* Text Notes */}
            <Section 
                title={getSectionTitle()} 
                type="star" 
                isOpen={isNotesOpen}
                onToggle={() => setIsNotesOpen(!isNotesOpen)}
            >
              <div className="w-full">
                {isLoading ? (
                    <div className="w-full h-24 bg-black/5 rounded-lg animate-pulse" />
                ) : (
                    <>
                        {filteredTextNotes.map((note, index) => (
                        <NoteCard 
                            key={note.id || `text-note-${index}`} 
                            {...note} 
                            onClick={() => setSelectedNote(note)}
                            onDelete={handleDeleteNote}
                            onArchive={handleArchiveNote}
                        />
                        ))}
                        {filteredTextNotes.length === 0 && (
                            <p className="text-gray-500 text-sm text-center py-4">
                                {activeView === 'archive' 
                                    ? "No archived notes" 
                                    : activeView === 'favorites' 
                                        ? "No favorite notes" 
                                        : "No notes yet"}
                            </p>
                        )}
                    </>
                )}
              </div>
            </Section>

            {/* Voice, Drawing, Photo Notes (Only in All View) */}
            {activeView === 'all' && (
                <>
                    <Section 
                        title="Voice Notes" 
                        type="chevron" 
                        isOpen={isVoiceOpen} 
                        onToggle={() => setIsVoiceOpen(!isVoiceOpen)}
                    >
                    <div className="w-full">
                        {filteredVoiceNotes.map((note, index) => (
                            <VoiceNoteItem 
                                key={note.id || `voice-note-${index}`} 
                                id={note.id} 
                                title={note.title}
                                onClick={() => setSelectedVoiceNote(note)}
                                onDelete={(id) => handleDeleteVoice(id)}
                            />
                        ))}
                        {filteredVoiceNotes.length === 0 && !isLoading && (
                            <p className="text-gray-500 text-sm text-center py-4">No voice notes yet</p>
                        )}
                    </div>
                    </Section>

                    <Section 
                        title="Quick Drawings" 
                        type="chevron" 
                        isOpen={isDrawingSectionOpen}
                        onToggle={() => setIsDrawingSectionOpen(!isDrawingSectionOpen)}
                    >
                    <div className="w-full flex justify-center">
                        {drawings.length > 0 ? (
                            <DrawingGrid 
                                drawings={drawings} 
                                onDrawingClick={setSelectedDrawing}
                            />
                        ) : (
                            !isLoading && <p className="text-gray-500 text-sm text-center py-4">No drawings yet</p>
                        )}
                    </div>
                    </Section>

                    <Section 
                        title="Photo Notes" 
                        type="chevron" 
                        isOpen={isPhotoOpen}
                        onToggle={() => setIsPhotoOpen(!isPhotoOpen)}
                    >
                    <div className="w-full flex justify-center">
                        {photos.length > 0 ? (
                            <PhotoGrid 
                                photos={photos} 
                                onPhotoClick={setSelectedPhoto}
                            />
                        ) : (
                            !isLoading && <p className="text-gray-500 text-sm text-center py-4">No photos added yet</p>
                        )}
                    </div>
                    </Section>
                </>
            )}

          </div>
        </div>

        <BottomBar 
            onAddNote={handleAddNote}
            onAddVoice={handleAddVoice}
            onAddPhoto={handleAddPhoto}
            onAddDrawing={handleAddDrawing}
            isRecording={isRecording}
        />
      </div>

      <SideMenu 
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        user={user ? { email: user.email } : null}
        activeView={activeView}
        onNavigate={setActiveView}
        onSignIn={() => {
            setIsMenuOpen(false);
            setAuthView('login');
        }}
        onSignOut={async () => {
            await supabase.auth.signOut();
            setIsMenuOpen(false);
            toast.success("Signed out");
        }}
      />

      {/* Expanded Views / Modals */}
      <AnimatePresence>
        {authView === 'login' && (
            <LoginPage 
                onNavigateToSignup={() => setAuthView('signup')}
                onContinueAsGuest={() => {
                    localStorage.setItem('isGuest', 'true');
                    setAuthView('none');
                }}
                onLoginSuccess={() => setAuthView('none')}
            />
        )}
        {authView === 'signup' && (
            <SignupPage 
                onNavigateToLogin={() => setAuthView('login')}
                onContinueAsGuest={() => {
                    localStorage.setItem('isGuest', 'true');
                    setAuthView('none');
                }}
                onSignupSuccess={() => setAuthView('none')}
            />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSearchOpen && (
            <SearchPage 
                notes={textNotes.filter(n => !n.isArchived)} 
                onClose={() => setIsSearchOpen(false)}
                onNavigate={(note) => {
                    setSelectedNote(note);
                    setIsSearchOpen(false);
                }}
            />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedNote && !editingNote && (
            <ExpandedNoteView 
                note={selectedNote} 
                onClose={() => setSelectedNote(null)} 
                onEdit={() => setEditingNote(selectedNote)}
                onDelete={handleDeleteNote}
                onArchive={handleArchiveNote}
            />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {editingNote && (
            <EditNoteView 
                note={editingNote} 
                onClose={() => setEditingNote(null)} 
                onSave={handleUpdateNote}
                onPin={handlePinNote}
            />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedVoiceNote && (
            <ExpandedVoiceView 
                note={selectedVoiceNote} 
                onClose={() => setSelectedVoiceNote(null)} 
                onDelete={handleDeleteVoice}
            />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedPhoto && (
            <ExpandedPhotoView 
                photo={selectedPhoto} 
                onClose={() => setSelectedPhoto(null)} 
                onDelete={handleDeletePhoto}
            />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedDrawing && (
            <ExpandedDrawView
                image={selectedDrawing}
                onClose={() => setSelectedDrawing(null)}
                onEdit={() => {
                    setDrawingToEdit(selectedDrawing);
                    setSelectedDrawing(null);
                    setIsDrawMode(true);
                }}
                onDelete={() => handleDeleteDrawing(selectedDrawing)}
            />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isDrawMode && (
            <DrawNoteView
                initialImage={drawingToEdit}
                onClose={() => setIsDrawMode(false)}
                onSave={handleSaveDrawing}
            />
        )}
      </AnimatePresence>

      <Toaster position="top-center" />
    </div>
  );
}
