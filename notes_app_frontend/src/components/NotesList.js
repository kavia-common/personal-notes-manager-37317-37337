import React from 'react';
import '../theme.css';
import NoteCard from './NoteCard';

// PUBLIC_INTERFACE
export default function NotesList({ notes, onEdit, onDelete }) {
  if (!notes || notes.length === 0) {
    return (
      <div className="empty" role="status" aria-live="polite">
        <h3>No notes yet</h3>
        <p>Click the + button to create your first note.</p>
      </div>
    );
  }

  return (
    <section className="notes-grid" aria-label="Notes list">
      {notes.map(note => (
        <NoteCard
          key={note.id}
          note={note}
          onEdit={() => onEdit?.(note)}
          onDelete={() => onDelete?.(note.id)}
        />
      ))}
    </section>
  );
}
