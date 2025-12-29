import { useState, useEffect } from 'react';
import WelcomePage from './components/WelcomePage';
import HomePage from './components/HomePage';
import AuthPage from './components/AuthPage';
import { supabase } from './utils/supabase/client';

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  isFavorite?: boolean;
  category?: string;
}

export interface User {
  name: string;
  email: string;
  avatar?: string;
  isGuest: boolean;
}

export default function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [showAuthPage, setShowAuthPage] = useState(false);
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      title: 'Meeting with Marketing',
      content: 'Discussed Q3 campaign goals and key performance indicators. The main takeway...',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isFavorite: false,
      category: 'Work',
    },
    {
      id: '2',
      title: 'Project Ideas',
      content: 'Build a weather app, Create a recipe finder, Design a portfolio website, Learn TypeScript',
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
      isFavorite: true,
      category: 'Personal',
    },
    {
      id: '3',
      title: 'Shopping List',
      content: 'Milk, Eggs, Bread, Coffee, Fresh vegetables, Chicken, Rice, Fruits',
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
      isFavorite: false,
      category: 'Personal',
    },
  ]);

  // Check Supabase session on mount
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        // User is logged in with Supabase
        const authenticatedUser: User = {
          name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
          email: session.user.email || '',
          avatar: session.user.user_metadata?.avatar_url,
          isGuest: false,
        };
        setUser(authenticatedUser);
        localStorage.setItem('smartkeeper_currentUser', JSON.stringify(authenticatedUser));
        localStorage.setItem('smartkeeper_hasVisited', 'true');
        setShowWelcome(false);
        
        // Load notes from Supabase
        await loadNotesFromSupabase(session.user.id);
      } else {
        // Check localStorage for guest or previous sessions
        const hasVisited = localStorage.getItem('smartkeeper_hasVisited');
        const currentUser = localStorage.getItem('smartkeeper_currentUser');
        
        if (hasVisited === 'true' && currentUser) {
          try {
            const userData = JSON.parse(currentUser);
            setUser(userData);
            setShowWelcome(false);
            
            // Load notes from localStorage for guest users
            if (userData.isGuest) {
              const savedNotes = localStorage.getItem('smartkeeper_notes');
              if (savedNotes) {
                const parsedNotes = JSON.parse(savedNotes);
                const notesWithDates = parsedNotes.map((note: any) => ({
                  ...note,
                  createdAt: new Date(note.createdAt),
                }));
                setNotes(notesWithDates);
              }
            }
          } catch (error) {
            console.error('Error parsing user data:', error);
            localStorage.removeItem('smartkeeper_hasVisited');
            localStorage.removeItem('smartkeeper_currentUser');
          }
        }
      }
    };

    checkSession();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        const authenticatedUser: User = {
          name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
          email: session.user.email || '',
          avatar: session.user.user_metadata?.avatar_url,
          isGuest: false,
        };
        setUser(authenticatedUser);
        localStorage.setItem('smartkeeper_currentUser', JSON.stringify(authenticatedUser));
        
        // Load notes from Supabase
        await loadNotesFromSupabase(session.user.id);
      } else if (event === 'SIGNED_OUT') {
        // Switch to guest mode on sign out
        const guestUser: User = {
          name: 'Guest',
          email: 'guest@smartkeeper.com',
          isGuest: true,
        };
        setUser(guestUser);
        localStorage.setItem('smartkeeper_currentUser', JSON.stringify(guestUser));
        
        // Load guest notes from localStorage
        const savedNotes = localStorage.getItem('smartkeeper_notes');
        if (savedNotes) {
          const parsedNotes = JSON.parse(savedNotes);
          const notesWithDates = parsedNotes.map((note: any) => ({
            ...note,
            createdAt: new Date(note.createdAt),
          }));
          setNotes(notesWithDates);
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loadNotesFromSupabase = async (userId: string) => {
    try {
      const response = await fetch(
        `https://${await import('./utils/supabase/info').then(m => m.projectId)}.supabase.co/functions/v1/make-server-57cdb9fb/notes/${userId}`,
        {
          headers: {
            'Authorization': `Bearer ${await import('./utils/supabase/info').then(m => m.publicAnonKey)}`,
          },
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        if (data.notes) {
          const notesWithDates = data.notes.map((note: any) => ({
            ...note,
            createdAt: new Date(note.createdAt),
          }));
          setNotes(notesWithDates);
        }
      }
    } catch (error) {
      console.error('Error loading notes from Supabase:', error);
    }
  };

  const saveNotesToSupabase = async (updatedNotes: Note[]) => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session?.user) {
      try {
        await fetch(
          `https://${await import('./utils/supabase/info').then(m => m.projectId)}.supabase.co/functions/v1/make-server-57cdb9fb/notes`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${await import('./utils/supabase/info').then(m => m.publicAnonKey)}`,
            },
            body: JSON.stringify({ 
              userId: session.user.id,
              notes: updatedNotes,
            }),
          }
        );
      } catch (error) {
        console.error('Error saving notes to Supabase:', error);
      }
    }
  };

  // Save notes whenever they change
  useEffect(() => {
    if (user) {
      if (user.isGuest) {
        // Save to localStorage for guest users
        localStorage.setItem('smartkeeper_notes', JSON.stringify(notes));
      } else {
        // Save to Supabase for authenticated users
        saveNotesToSupabase(notes);
      }
    }
  }, [notes, user]);

  const handleStartWriting = (authenticatedUser: User) => {
    setUser(authenticatedUser);
    setShowWelcome(false);
  };

  const handleAddNote = (title: string, content: string, category?: string) => {
    const newNote: Note = {
      id: Date.now().toString(),
      title,
      content,
      createdAt: new Date(),
      isFavorite: false,
      category: category || 'Personal',
    };
    setNotes((prev) => [newNote, ...prev]);
  };

  const handleDeleteNote = (noteId: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== noteId));
  };

  const handleToggleFavorite = (noteId: string) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === noteId ? { ...note, isFavorite: !note.isFavorite } : note
      )
    );
  };

  const handleUpdateNote = (noteId: string, title: string, content: string, category?: string) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === noteId 
          ? { ...note, title, content, category: category || note.category, createdAt: new Date() } 
          : note
      )
    );
  };

  const handleShowAuthPage = () => {
    setShowAuthPage(true);
  };

  const handleAuthSuccess = (authenticatedUser: User) => {
    setUser(authenticatedUser);
    setShowAuthPage(false);
  };

  if (showWelcome) {
    return <WelcomePage onStart={handleStartWriting} />;
  }

  // If no user (shouldn't happen, but safety check)
  if (!user) {
    return <WelcomePage onStart={handleStartWriting} />;
  }

  return (
    <>
      <HomePage
        notes={notes}
        user={user}
        onAddNote={handleAddNote}
        onDeleteNote={handleDeleteNote}
        onToggleFavorite={handleToggleFavorite}
        onUpdateNote={handleUpdateNote}
        onUpdateUser={setUser}
        onShowAuthPage={handleShowAuthPage}
      />
      
      {/* Auth Page for guest users to create account */}
      {showAuthPage && (
        <div className="fixed inset-0 z-50">
          <AuthPage onAuth={handleAuthSuccess} />
        </div>
      )}
    </>
  );
}