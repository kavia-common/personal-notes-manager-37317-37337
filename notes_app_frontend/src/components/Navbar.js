import React from 'react';
import '../theme.css';

// PUBLIC_INTERFACE
export default function Navbar({ brand = 'Notes', query, onQueryChange }) {
  /** This top navigation bar shows brand at left and search field at right. */
  return (
    <nav className="navbar" aria-label="Top navigation">
      <div className="navbar-inner container">
        <div className="brand" aria-label="Brand">
          <span className="brand-dot" aria-hidden="true" />
          <span>{brand}</span>
        </div>
        <div className="search">
          <span className="icon" aria-hidden="true">🔎</span>
          <label htmlFor="search" className="visually-hidden">Search notes</label>
          <input
            id="search"
            type="text"
            placeholder="Search notes..."
            value={query}
            onChange={(e) => onQueryChange?.(e.target.value)}
            aria-label="Search notes"
          />
        </div>
      </div>
    </nav>
  );
}
