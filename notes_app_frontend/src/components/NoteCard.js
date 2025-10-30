import React from 'react';
import '../theme.css';
import { formatDate } from '../utils/dates';

// PUBLIC_INTERFACE
export default function NoteCard({ note, onEdit, onDelete }) {
  const { title, content, updatedAt } = note;

  return (
    <article className="note-card" aria-label={`Note ${title || 'untitled'}`}>
      <header>
        <h3 className="note-title">{title || 'Untitled'}</h3>
      </header>
      <div className="note-content">
        {content || <span style={{ color: '#9CA3AF' }}>No content</span>}
      </div>
      <footer className="note-footer">
        <span title={`Last updated ${new Date(updatedAt).toISOString()}`}>
          {formatDate(updatedAt)}
        </span>
        <span>
          <button className="icon-btn" onClick={onEdit} aria-label="Edit note" title="Edit">
            ✏️
          </button>
          <button className="icon-btn danger" onClick={onDelete} aria-label="Delete note" title="Delete">
            🗑️
          </button>
        </span>
      </footer>
    </article>
  );
}
