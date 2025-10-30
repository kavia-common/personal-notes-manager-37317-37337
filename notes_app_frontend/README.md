# Personal Notes Manager Frontend

This React application provides a clean, modern interface for creating, viewing, editing, and deleting personal notes. It follows an Ocean Professional theme with blue and amber accents, subtle gradients, rounded corners, and smooth transitions.

## Quick Start

Run the app locally in development mode:

- Install dependencies:
  - npm install
- Start the development server:
  - npm start
- Open http://localhost:3000 in your browser.

To run tests, use:
- npm test

To build for production, use:
- npm run build

## Environment Variables and Feature Flags

The app reads configuration from environment variables prefixed with REACT_APP_. These are typically set in a .env file or via the shell when starting the app.

- REACT_APP_API_BASE: Optional base URL for the backend API. If REACT_APP_BACKEND_URL is not provided, this value is used as the backend base.
- REACT_APP_BACKEND_URL: Preferred base URL for API calls. This is what the API client uses to construct requests.
- REACT_APP_FRONTEND_URL: Optional public URL where the frontend is hosted.
- REACT_APP_WS_URL: Optional WebSocket URL (not used currently).
- REACT_APP_NODE_ENV: Optional runtime node env override. Defaults to process.env.NODE_ENV or development.
- REACT_APP_PORT, REACT_APP_TRUST_PROXY, REACT_APP_LOG_LEVEL, REACT_APP_HEALTHCHECK_PATH: Not used by the frontend runtime logic, but may be present for deployment environments.
- REACT_APP_ENABLE_SOURCE_MAPS, REACT_APP_NEXT_TELEMETRY_DISABLED: Optional build-time toggles, not used by the app code.
- REACT_APP_EXPERIMENTS_ENABLED: Reserved for future use.
- REACT_APP_FEATURE_FLAGS: Comma- or space-separated list of feature flags. The current code reads the presence of the token USE_API to enable API mode.

Notes on feature flags expected by the product brief:
- notes_use_api and notes_enable_archive are recognized as part of the requested documentation, but the current codebase checks for USE_API only. To enable API mode with the current code, include USE_API in REACT_APP_FEATURE_FLAGS, for example:
  - REACT_APP_FEATURE_FLAGS=USE_API
- The archive feature is not implemented in this codebase; notes_enable_archive has no effect.

How flags are parsed:
- In src/config/env.js, env.features.USE_API is true if:
  - REACT_APP_FEATURE_FLAGS contains the substring USE_API (case-insensitive is not applied; use uppercase), or
  - REACT_APP_USE_API is set to a truthy value (1, true, yes, on).

Backend URL resolution:
- apiBase: process.env.REACT_APP_API_BASE || ''
- backendUrl: process.env.REACT_APP_BACKEND_URL || process.env.REACT_APP_API_BASE || ''
- The API client uses backendUrl as the base (src/storage/apiClient.js).

## Storage Strategy

The application is LocalStorage-first with an optional API sync:
- On initial load, notes are read from window.localStorage under the key notes.v1.
- Any changes to the notes state are persisted back to localStorage.
- If API mode is enabled (USE_API flag is set and a backend URL is configured), the app:
  - Fetches notes from the backend and replaces the local list once on mount/flag change.
  - Mirrors create, update, and delete operations to the backend, while keeping the UI responsive using optimistic updates.
- If the API is unavailable or returns an error, the app silently continues to function with localStorage as the source of truth.

Relevant code:
- src/hooks/useNotes.js for state, persistence, and optional API sync.
- src/storage/localStorageClient.js for guarded JSON storage helpers.
- src/storage/apiClient.js for HTTP methods that respect the feature flag and backend URL.

## Data Model

A Note object has the following shape:

- id: string (generated client-side using a timestamp + random segments)
- title: string
- content: string
- createdAt: ISO 8601 string
- updatedAt: ISO 8601 string

Create and update operations will trim title and content, and update updatedAt automatically.

References:
- ID generation: src/utils/id.js (generateId)
- Date utilities: src/utils/dates.js (nowISO, formatDate)
- Usage: src/hooks/useNotes.js and UI components

## Component Overview

The UI is composed of small, focused components styled with the Ocean Professional theme defined in src/theme.css.

- Navbar (src/components/Navbar.js): Displays the brand on the left and a search field on the right. The search input filters notes by title or content in real time. It stays sticky at the top.
- NotesList (src/components/NotesList.js): Renders an accessible grid of notes or an empty state if none exist.
- NoteCard (src/components/NoteCard.js): Shows a single note with title, content preview, last update time, and actions for edit and delete.
- NoteModal (src/components/NoteModal.js): Modal dialog used for creating and editing notes. It focuses the title field on open and supports Escape to close.
- Fab (src/components/Fab.js): Floating action button in the bottom-right corner for creating a new note.

The main application (src/App.js) wires these components together, manages the search query and modal state, and integrates with the useNotes hook.

## Enabling API Mode

To use a backend API instead of purely local storage, you must enable API mode and provide a backend base URL:

1) Choose a backend base URL:
- REACT_APP_BACKEND_URL=https://your-api.example.com
- If REACT_APP_BACKEND_URL is not set, the app will fall back to REACT_APP_API_BASE.

2) Enable the USE_API feature flag:
- REACT_APP_FEATURE_FLAGS=USE_API
- Alternatively, you can set REACT_APP_USE_API=true.

3) Start the app:
- npm start

When enabled, the app will:
- Load notes from GET {BACKEND}/api/notes
- Create notes via POST {BACKEND}/api/notes
- Update notes via PATCH {BACKEND}/api/notes/:id
- Delete notes via DELETE {BACKEND}/api/notes/:id

If the backend is unreachable, the UI remains functional using localStorage.

## Theme

The application follows the Ocean Professional theme:
- Primary: #2563EB (Ocean Blue)
- Secondary: #F59E0B (Amber)
- Background: #f9fafb
- Surface: #ffffff
- Text: #111827
- Subtle gradient, soft shadows, and rounded corners for a modern feel

Styles live in src/theme.css, which is imported by components and App.js. The app-level container applies a subtle gradient background in src/App.css.

## Scripts

Common scripts for development and production:

- npm start: Start the development server.
- npm test: Run tests in watch mode.
- npm run build: Create a production build in the build directory.
