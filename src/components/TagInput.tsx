import React, { useState, useEffect, useRef } from 'react';

interface TagInputProps {
  existingTags: string[];
  onAddTag: (tag: string) => void;
  onCancel: () => void;
}

const TagInput: React.FC<TagInputProps> = ({ existingTags, onAddTag, onCancel }) => {
  const [input, setInput] = useState('');
  const [filteredTags, setFilteredTags] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  useEffect(() => {
    if (input) {
      const filtered = existingTags.filter(
        tag => tag.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredTags(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setFilteredTags([]);
      setShowSuggestions(false);
    }
  }, [input, existingTags]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (input.trim()) {
        onAddTag(input.trim());
      }
    } else if (e.key === 'Escape') {
      onCancel();
    }
  };
  
  const handleSuggestionClick = (tag: string) => {
    onAddTag(tag);
  };
  
  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Add a tag..."
        className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 w-24 text-xs py-1 px-2 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      
      {showSuggestions && (
        <div className="absolute top-full left-0 mt-1 w-40 bg-white dark:bg-gray-700 rounded-md shadow-lg z-10 max-h-32 overflow-y-auto">
          {filteredTags.map(tag => (
            <div
              key={tag}
              onClick={() => handleSuggestionClick(tag)}
              className="px-3 py-1 text-xs text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
            >
              {tag}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagInput;