import { get, set, del, entries, createStore } from 'idb-keyval';
import { Note, AppSettings } from '../types';

// Create separate stores for different data types
const NOTES_STORE = createStore('offline-notes', 'notes');
const SETTINGS_STORE = createStore('offline-notes', 'settings');
const TAGS_STORE = createStore('offline-notes', 'tags');

// Notes operations
export const saveNote = async (note: Note): Promise<void> => {
  try {
    // Add tags to the tags store if they don't exist
    if (note.tags && note.tags.length > 0) {
      const existingTags = await getAllTags();
      const newTags = note.tags.filter(tag => !existingTags.includes(tag));
      
      if (newTags.length > 0) {
        await Promise.all(newTags.map(tag => set(tag, tag, TAGS_STORE)));
      }
    }
    
    await set(note.id, note, NOTES_STORE);
  } catch (error) {
    console.error('Error saving note:', error);
    throw error;
  }
};

export const getNote = async (id: string): Promise<Note | undefined> => {
  try {
    return await get(id, NOTES_STORE);
  } catch (error) {
    console.error('Error getting note:', error);
    throw error;
  }
};

export const deleteNote = async (id: string): Promise<void> => {
  try {
    await del(id, NOTES_STORE);
  } catch (error) {
    console.error('Error deleting note:', error);
    throw error;
  }
};

export const getAllNotes = async (): Promise<Note[]> => {
  try {
    const items = await entries(NOTES_STORE);
    return items.map(([_, note]) => note as Note);
  } catch (error) {
    console.error('Error getting all notes:', error);
    throw error;
  }
};

export const searchNotes = async (query: string, tagFilter?: string): Promise<Note[]> => {
  try {
    const notes = await getAllNotes();
    if (!query.trim() && !tagFilter) return notes;
    
    let filtered = notes;
    
    // Filter by query if provided
    if (query.trim()) {
      const lowerQuery = query.toLowerCase();
      filtered = filtered.filter(
        note => 
          note.title.toLowerCase().includes(lowerQuery) || 
          note.content.toLowerCase().includes(lowerQuery)
      );
    }
    
    // Filter by tag if provided
    if (tagFilter) {
      filtered = filtered.filter(
        note => note.tags.includes(tagFilter)
      );
    }
    
    return filtered;
  } catch (error) {
    console.error('Error searching notes:', error);
    throw error;
  }
};

// Settings operations
export const saveSettings = async (settings: AppSettings): Promise<void> => {
  try {
    await set('app-settings', settings, SETTINGS_STORE);
  } catch (error) {
    console.error('Error saving settings:', error);
    throw error;
  }
};

export const getSettings = async (): Promise<AppSettings | undefined> => {
  try {
    return await get('app-settings', SETTINGS_STORE);
  } catch (error) {
    console.error('Error getting settings:', error);
    throw error;
  }
};

// Tags operations
export const getAllTags = async (): Promise<string[]> => {
  try {
    const items = await entries(TAGS_STORE);
    return items.map(([_, tag]) => tag as string);
  } catch (error) {
    console.error('Error getting all tags:', error);
    throw error;
  }
};

export const deleteTag = async (tag: string): Promise<void> => {
  try {
    await del(tag, TAGS_STORE);
  } catch (error) {
    console.error('Error deleting tag:', error);
    throw error;
  }
};

// Import/Export
export const exportNotes = async (): Promise<string> => {
  try {
    const notes = await getAllNotes();
    return JSON.stringify(notes);
  } catch (error) {
    console.error('Error exporting notes:', error);
    throw error;
  }
};

export const importNotes = async (jsonData: string): Promise<number> => {
  try {
    const notes = JSON.parse(jsonData) as Note[];
    await Promise.all(notes.map(note => saveNote(note)));
    return notes.length;
  } catch (error) {
    console.error('Error importing notes:', error);
    throw error;
  }
};