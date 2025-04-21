// import React from 'react';
import Header from './components/Header';
import NoteList from './components/NoteList';
import NoteEditor from './components/NoteEditor';
import OfflineIndicator from './components/OfflineIndicator';
import { SettingsProvider } from './contexts/SettingsContext';
import { NotesProvider } from './contexts/NotesContext';

function App() {
  return (
      <SettingsProvider>
        <NotesProvider>
          <div className="flex flex-col h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
            <Header />
            <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
              <div className="w-full md:w-80 border-r dark:border-gray-700 overflow-hidden">
                <NoteList />
              </div>
              <div className="flex-1 overflow-hidden">
                <NoteEditor />
              </div>
            </main>
            <OfflineIndicator />
          </div>
        </NotesProvider>
      </SettingsProvider>
  );
}

export default App;