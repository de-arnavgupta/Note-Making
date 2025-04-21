import React, { useState } from 'react';
import { Moon, Sun, Search, X, Settings, Download, Upload } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';
import { useNotes } from '../contexts/NotesContext';
import SettingsModal from './modals/SettingsModal';
import { exportNotesToFile, importNotesFromFile } from '../utils/importExport';

const Header: React.FC = () => {
  const { settings, toggleTheme } = useSettings();
  const { searchQuery, setSearchQuery, exportAllNotes, importNotesFromJson } = useNotes();
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleExport = async () => {
    try {
      const notesJson = await exportAllNotes();
      exportNotesToFile(notesJson);
    } catch (error) {
      console.error('Failed to export notes:', error);
      alert('Failed to export notes. Please try again.');
    }
  };

  const handleImport = async () => {
    try {
      const jsonData = await importNotesFromFile();
      if (jsonData) {
        const count = await importNotesFromJson(jsonData);
        alert(`Successfully imported ${count} notes.`);
      }
    } catch (error) {
      console.error('Failed to import notes:', error);
      alert('Failed to import notes. Please check the file format and try again.');
    }
  };

  return (
    <header className="border-b dark:border-gray-700 py-3 px-4 flex items-center justify-between bg-white dark:bg-gray-900 transition-colors">
      <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">Offline Notes</h1>
      
      <div className="flex-1 max-w-md mx-4 relative">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
          <input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-2 pl-10 pr-8 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <button
          onClick={handleExport}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Export notes"
          title="Export notes"
        >
          <Download className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
        
        <button
          onClick={handleImport}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Import notes"
          title="Import notes"
        >
          <Upload className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
        
        <button
          onClick={() => setSettingsOpen(true)}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Settings"
          title="Settings"
        >
          <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
        
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label={settings.theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {settings.theme === 'dark' ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-gray-700" />
          )}
        </button>
      </div>
      
      {settingsOpen && <SettingsModal onClose={() => setSettingsOpen(false)} />}
    </header>
  );
};

export default Header;