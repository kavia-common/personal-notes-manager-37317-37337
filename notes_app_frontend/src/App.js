import React, { useMemo, useState } from 'react';
import './theme.css';
import './App.css';
import Navbar from './components/Navbar';
import NotesList from './components/NotesList';
import Fab from './components/Fab';
import NoteModal from './components/NoteModal';
import useNotes from './hooks/useNotes';

// PUBLIC_INTERFACE
function App() {
  /** App-level UI state */
  const [query, setQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  /** Notes hook (LocalStorage-first, optional API) */
  const {
    notes,
    createNote,
    updateNote,
    deleteNote
  } = useNotes();

  /** Filtered notes by query (title or content) */
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return notes;
    return notes.filter(n =>
      n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)
    );
  }, [notes, query]);

  const openCreate = () => { setEditingNote(null); setModalOpen(true); };
  const openEdit = (note) => { setEditingNote(note); setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); setEditingNote(null); };

  const handleSave = async (payload) => {
    if (editingNote) {
      await updateNote(editingNote.id, payload);
    } else {
      await createNote(payload);
    }
    closeModal();
  };

  const handleDelete = async (id) => {
    await deleteNote(id);
  };

  return (
    <div className="main">
      <Navbar brand="Personal Notes" query={query} onQueryChange={setQuery} />
      <div className="container" role="main" aria-label="Notes area">
        <NotesList
          notes={filtered}
          onEdit={openEdit}
          onDelete={handleDelete}
        />
      </div>

      <Fab ariaLabel="Add note" onClick={openCreate} />

      {modalOpen && (
        <NoteModal
          initial={editingNote}
          onCancel={closeModal}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default App;
