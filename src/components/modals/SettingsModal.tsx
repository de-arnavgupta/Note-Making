import React from 'react';
import { X } from 'lucide-react';
import { useSettings } from '../../contexts/SettingsContext';

interface SettingsModalProps {
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
  const { settings, updateSettings } = useSettings();
  
  const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateSettings({ sortBy: e.target.value as 'updatedAt' | 'createdAt' | 'title' });
  };
  
  const handleSortDirectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateSettings({ sortDirection: e.target.value as 'asc' | 'desc' });
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 animate-fadeIn">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md overflow-hidden">
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 p-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Settings</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
        
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Sort Notes By
            </label>
            <select
              value={settings.sortBy}
              onChange={handleSortByChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="updatedAt">Last Updated</option>
              <option value="createdAt">Date Created</option>
              <option value="title">Title</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Sort Direction
            </label>
            <select
              value={settings.sortDirection}
              onChange={handleSortDirectionChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </select>
          </div>
          
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">About</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Offline Notes v0.2.0<br />
              A PWA note-taking application that works offline.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;