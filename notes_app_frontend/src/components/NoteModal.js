import React, { useEffect, useRef, useState } from 'react';
import '../theme.css';

// PUBLIC_INTERFACE
export default function NoteModal({ initial, onCancel, onSave }) {
  const [title, setTitle] = useState(initial?.title || '');
  const [content, setContent] = useState(initial?.content || '');
  const titleRef = useRef(null);

  useEffect(() => {
    // Focus first field
    titleRef.current?.focus();
    function onKey(e) {
      if (e.key === 'Escape') onCancel?.();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onCancel]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave?.({ title: title.trim(), content: content.trim() });
  };

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="note-modal-title">
      <div className="modal">
        <div className="modal-header">
          <div className="modal-title" id="note-modal-title">
            {initial ? 'Edit note' : 'New note'}
          </div>
          <button className="icon-btn" onClick={onCancel} aria-label="Close modal">✖️</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div>
              <label htmlFor="note-title" className="visually-hidden">Title</label>
              <input
                id="note-title"
                ref={titleRef}
                className="input"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="note-content" className="visually-hidden">Content</label>
              <textarea
                id="note-content"
                className="textarea"
                placeholder="Write your note..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-actions">
            <button type="button" className="btn" onClick={onCancel}>Cancel</button>
            <button type="submit" className="btn btn-primary">
              {initial ? 'Save changes' : 'Create note'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
