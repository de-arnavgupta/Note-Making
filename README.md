# Offline-First PWA Note Taker

A lightweight, elegant React Progressive Web App for taking notes entirely offline. Notes are stored in your browser's IndexedDB and the app shell is cached via a service worker, allowing you to create, read, update, and delete notes even without an internet connection. No server required!

## 📝 Features

- **Offline-First Architecture**
  - Complete app shell (HTML/CSS/JS) precached by service worker
  - Notes securely stored in IndexedDB using `idb-keyval`
  - Full CRUD functionality when offline
  
- **Responsive Design & Theming**
  - Toggle between light & dark modes
  - Material Design-inspired UI components
  - Custom theme support via CSS variables
  
- **Smart Editing**
  - Automatic saving on blur or timed intervals
  - Real-time search/filtering by title or content
  
- **Data Management**
  - Export all notes as JSON backup
  - Import JSON backups to restore your notes

## 🚀 Tech Stack

- **React** (via Create React App)
- **Service Worker** (Workbox integration)
- **IndexedDB** (using `idb-keyval` library)
- **Web App Manifest** (for PWA installation)
- **CSS Variables** for theming

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/de-arnavgupta/Note-Making
   cd pwa-notes
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm start
   # or
   yarn start
   ```
   The app will be available at `http://localhost:3000` with the service worker active.

## 🔧 Usage

- **Create a note**: Click the ➕ button or "Create your first note" prompt
- **Edit a note**: Select from the sidebar—changes save automatically
- **Delete a note**: Click the trash icon in the editor toolbar
- **Search notes**: Type in the search bar to filter by content
- **Change theme**: Toggle the sun/moon icon in the header
- **Backup data**: Use the download icon to export all notes as JSON
- **Restore data**: Click the upload icon to import a JSON backup

## 📴 Testing Offline Functionality

1. **Build the production bundle**:
   ```bash
   npm run build
   ```

2. **Test locally** (optional):
   ```bash
   npm install -g serve
   serve -s build
   ```

3. **Simulate offline mode**:
   - Open DevTools → Application → Service Workers
   - Check "Offline" and refresh the page
   - Verify that the app loads and notes remain accessible/editable

## ☁️ Deployment on Vercel

This app is optimized for deployment on Vercel:

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Deploy to Vercel**:
   ```bash
   vercel
   ```

3. **For production deployment**:
   ```bash
   vercel --prod
   ```

4. **Alternative: GitHub Integration**
   - Push your code to GitHub
   - Import the repository on Vercel's dashboard
   - Vercel will automatically build and deploy your app
   - Enable auto-deployment for future pushes

5. **Verify PWA functionality**:
   - Test the deployed app in offline mode
   - Ensure the service worker is registered (check DevTools → Application)
   - Confirm that the app is installable (look for the install prompt).
