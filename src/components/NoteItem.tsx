import React from 'react';
import { Note } from '../types';
import { useNotes } from '../contexts/NotesContext';
import { Tag } from 'lucide-react';

interface NoteItemProps {
  note: Note;
}

const NoteItem: React.FC<NoteItemProps> = ({ note }) => {
  const { activeNote, setActiveNote } = useNotes();
  
  const isActive = activeNote?.id === note.id;
  const formattedDate = new Date(note.updatedAt).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  // Get the first line as title or fallback to 'Untitled'
  const displayTitle = note.title || 'Untitled Note';
  
  // Get a content preview (first 60 chars)
  const contentPreview = note.content 
    ? note.content.substring(0, 60) + (note.content.length > 60 ? '...' : '')
    : 'No content';

  return (
    <div 
      className={`p-3 rounded-md cursor-pointer transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 
        ${isActive ? 'bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-600 dark:border-blue-400' : ''}`}
      onClick={() => setActiveNote(note)}
    >
      <div className="flex justify-between items-start">
        <h3 className="font-medium text-gray-900 dark:text-gray-100 line-clamp-1">{displayTitle}</h3>
        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{formattedDate}</span>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mt-1">{contentPreview}</p>
      
      {note.tags.length > 0 && (
        <div className="flex items-center mt-2 gap-1 flex-wrap">
          <Tag className="w-3 h-3 text-gray-500 dark:text-gray-400" />
          {note.tags.map(tag => (
            <span 
              key={tag} 
              className="text-xs px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default NoteItem;