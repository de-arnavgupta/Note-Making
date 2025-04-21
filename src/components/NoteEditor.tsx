import React, { useEffect, useRef, useState } from 'react';
import { useNotes } from '../contexts/NotesContext';
import { Trash2, Tag, Plus } from 'lucide-react';
import TagInput from './TagInput';

const NoteEditor: React.FC = () => {
  const { activeNote, updateNote, removeNote, tags } = useNotes();
  const [showTagInput, setShowTagInput] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);

  // Focus on title when a new note is selected
  useEffect(() => {
    if (activeNote && titleRef.current) {
      titleRef.current.focus();
    }
  }, [activeNote?.id]);

  if (!activeNote) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-gray-500 dark:text-gray-400">
        <p className="text-center text-lg">Select a note to view or edit</p>
        <p className="text-center text-sm mt-2">or create a new one</p>
      </div>
    );
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateNote(activeNote.id, { title: e.target.value });
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateNote(activeNote.id, { content: e.target.value });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      removeNote(activeNote.id);
    }
  };

  const handleAddTag = (tag: string) => {
    if (tag && !activeNote.tags.includes(tag)) {
      updateNote(activeNote.id, { 
        tags: [...activeNote.tags, tag]
      });
    }
    setShowTagInput(false);
  };

  const handleRemoveTag = (tag: string) => {
    updateNote(activeNote.id, {
      tags: activeNote.tags.filter(t => t !== tag)
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center border-b dark:border-gray-700 p-4">
        <input
          ref={titleRef}
          type="text"
          value={activeNote.title}
          onChange={handleTitleChange}
          placeholder="Untitled Note"
          className="text-xl font-semibold bg-transparent border-none outline-none w-full text-gray-900 dark:text-gray-100 placeholder-gray-400"
        />
        <button
          onClick={handleDelete}
          className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Delete note"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
      
      {/* Tags section */}
      <div className="flex flex-wrap items-center gap-2 px-4 py-2 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <div className="flex items-center">
          <Tag className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" />
          <span className="text-sm text-gray-500 dark:text-gray-400">Tags:</span>
        </div>
        
        {activeNote.tags.map(tag => (
          <div 
            key={tag}
            className="flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs"
          >
            <span>{tag}</span>
            <button 
              onClick={() => handleRemoveTag(tag)}
              className="hover:text-red-500 transition-colors"
            >
              &times;
            </button>
          </div>
        ))}
        
        {showTagInput ? (
          <TagInput
            existingTags={tags}
            onAddTag={handleAddTag}
            onCancel={() => setShowTagInput(false)}
          />
        ) : (
          <button
            onClick={() => setShowTagInput(true)}
            className="flex items-center gap-1 px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            <Plus className="w-3 h-3" />
            <span>Add Tag</span>
          </button>
        )}
      </div>
      
      <textarea
        value={activeNote.content}
        onChange={handleContentChange}
        placeholder="Start typing..."
        className="flex-1 p-4 resize-none bg-transparent outline-none text-gray-800 dark:text-gray-200"
      />
      
      <div className="p-2 text-xs text-gray-500 dark:text-gray-400 text-right border-t dark:border-gray-700">
        Last updated: {new Date(activeNote.updatedAt).toLocaleString()}
      </div>
    </div>
  );
};

export default NoteEditor;