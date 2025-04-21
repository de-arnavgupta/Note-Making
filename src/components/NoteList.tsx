import React, { useState } from 'react';
import { useNotes } from '../contexts/NotesContext';
import { PlusCircle, SearchX, Tag as TagIcon, ChevronDown, ChevronRight } from 'lucide-react';
import NoteItem from './NoteItem';

const NoteList: React.FC = () => {
  const { 
    notes, 
    loading, 
    createNote, 
    searchQuery, 
    tags, 
    selectedTag, 
    setSelectedTag 
  } = useNotes();
  const [showTags, setShowTags] = useState(true);

  if (loading) {
    return (
      <div className="flex flex-col h-full items-center justify-center p-4">
        <div className="animate-pulse w-full max-w-md">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="bg-gray-200 dark:bg-gray-700 h-20 rounded-md mb-2"></div>
          ))}
        </div>
      </div>
    );
  }

  const handleTagClick = (tag: string) => {
    setSelectedTag(selectedTag === tag ? null : tag);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
        <h2 className="text-lg font-semibold">Notes</h2>
        <button
          onClick={createNote}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Create new note"
        >
          <PlusCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </button>
      </div>

      {/* Tags section */}
      {tags.length > 0 && (
        <div className="border-b dark:border-gray-700">
          <div 
            className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => setShowTags(!showTags)}
          >
            <div className="flex items-center">
              <TagIcon className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Tags</span>
            </div>
            {showTags ? (
              <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            )}
          </div>
          
          {showTags && (
            <div className="px-4 py-2 space-y-1 bg-gray-50 dark:bg-gray-800">
              {tags.map(tag => (
                <div
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={`
                    text-sm px-2 py-1 rounded-md cursor-pointer flex items-center
                    ${selectedTag === tag 
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}
                  `}
                >
                  <span className="truncate">{tag}</span>
                  {selectedTag === tag && (
                    <span className="ml-auto text-xs">&times;</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-2">
        {notes.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400 p-4">
            {searchQuery || selectedTag ? (
              <>
                <SearchX className="w-16 h-16 mb-2" />
                <p className="text-center">
                  {searchQuery && selectedTag 
                    ? `No notes found matching "${searchQuery}" with tag "${selectedTag}"`
                    : searchQuery 
                      ? `No notes found matching "${searchQuery}"`
                      : `No notes found with tag "${selectedTag}"`
                  }
                </p>
              </>
            ) : (
              <>
                <p className="text-center mb-4">No notes yet</p>
                <button
                  onClick={createNote}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Create your first note
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            {notes.map((note) => (
              <NoteItem key={note.id} note={note} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteList;