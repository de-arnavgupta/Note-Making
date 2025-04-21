import React, { createContext, useContext, useEffect, useState } from 'react';
import { Note } from '../types';
import { 
  getAllNotes, 
  saveNote, 
  deleteNote, 
  searchNotes, 
  getAllTags,
  exportNotes,
  importNotes
} from '../utils/storage';

interface NotesContextType {
  notes: Note[];
  loading: boolean;
  activeNote: Note | null;
  searchQuery: string;
  selectedTag: string | null;
  tags: string[];
  setSearchQuery: (query: string) => void;
  setSelectedTag: (tag: string | null) => void;
  createNote: () => void;
  updateNote: (id: string, updates: Partial<Omit<Note, 'id' | 'createdAt'>>) => void;
  removeNote: (id: string) => void;
  setActiveNote: (note: Note | null) => void;
  addTagToNote: (noteId: string, tag: string) => void;
  removeTagFromNote: (noteId: string, tag: string) => void;
  exportAllNotes: () => Promise<string>;
  importNotesFromJson: (jsonData: string) => Promise<number>;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeNote, setActiveNote] = useState<Note | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);

  // Load notes and tags on initial render
  useEffect(() => {
    const loadData = async () => {
      try {
        const [loadedNotes, loadedTags] = await Promise.all([
          getAllNotes(),
          getAllTags()
        ]);
        
        setNotes(loadedNotes.sort((a, b) => b.updatedAt - a.updatedAt));
        setTags(loadedTags);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Handle search and tag filtering
  useEffect(() => {
    const performSearch = async () => {
      try {
        const results = await searchNotes(searchQuery, selectedTag || undefined);
        setNotes(results.sort((a, b) => b.updatedAt - a.updatedAt));
      } catch (error) {
        console.error('Error during search:', error);
      }
    };

    performSearch();
  }, [searchQuery, selectedTag]);

  const createNote = async () => {
    const now = Date.now();
    const newNote: Note = {
      id: `note_${now}`,
      title: 'Untitled Note',
      content: '',
      tags: [],
      createdAt: now,
      updatedAt: now,
    };

    try {
      await saveNote(newNote);
      setNotes(prevNotes => [newNote, ...prevNotes]);
      setActiveNote(newNote);
    } catch (error) {
      console.error('Failed to create note:', error);
    }
  };

  const updateNote = async (id: string, updates: Partial<Omit<Note, 'id' | 'createdAt'>>) => {
    try {
      const noteToUpdate = notes.find(note => note.id === id);
      if (!noteToUpdate) return;

      const updatedNote: Note = {
        ...noteToUpdate,
        ...updates,
        updatedAt: Date.now(),
      };

      await saveNote(updatedNote);
      
      setNotes(prevNotes => 
        prevNotes.map(note => note.id === id ? updatedNote : note)
          .sort((a, b) => b.updatedAt - a.updatedAt)
      );
      
      if (activeNote && activeNote.id === id) {
        setActiveNote(updatedNote);
      }
      
      // Refresh tags list if tags were updated
      if (updates.tags) {
        const updatedTags = await getAllTags();
        setTags(updatedTags);
      }
    } catch (error) {
      console.error('Failed to update note:', error);
    }
  };

  const removeNote = async (id: string) => {
    try {
      await deleteNote(id);
      setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
      
      if (activeNote && activeNote.id === id) {
        setActiveNote(null);
      }
      
      // Refresh tags as some may no longer be used
      const updatedTags = await getAllTags();
      setTags(updatedTags);
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
  };
  
  const addTagToNote = async (noteId: string, tag: string) => {
    const note = notes.find(n => n.id === noteId);
    if (!note) return;
    
    if (!note.tags.includes(tag)) {
      const updatedTags = [...note.tags, tag];
      await updateNote(noteId, { tags: updatedTags });
    }
  };
  
  const removeTagFromNote = async (noteId: string, tag: string) => {
    const note = notes.find(n => n.id === noteId);
    if (!note) return;
    
    if (note.tags.includes(tag)) {
      const updatedTags = note.tags.filter(t => t !== tag);
      await updateNote(noteId, { tags: updatedTags });
    }
  };
  
  const exportAllNotes = async (): Promise<string> => {
    return await exportNotes();
  };
  
  const importNotesFromJson = async (jsonData: string): Promise<number> => {
    const count = await importNotes(jsonData);
    
    // Refresh notes list
    const loadedNotes = await getAllNotes();
    setNotes(loadedNotes.sort((a, b) => b.updatedAt - a.updatedAt));
    
    // Refresh tags list
    const updatedTags = await getAllTags();
    setTags(updatedTags);
    
    return count;
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        loading,
        activeNote,
        searchQuery,
        selectedTag,
        tags,
        setSearchQuery,
        setSelectedTag,
        createNote,
        updateNote,
        removeNote,
        setActiveNote,
        addTagToNote,
        removeTagFromNote,
        exportAllNotes,
        importNotesFromJson
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = (): NotesContextType => {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
};