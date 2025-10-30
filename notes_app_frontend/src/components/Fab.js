import React from 'react';
import '../theme.css';

// PUBLIC_INTERFACE
export default function Fab({ onClick, ariaLabel = 'Create' }) {
  return (
    <button className="fab" onClick={onClick} aria-label={ariaLabel} title="Add note">
      +
    </button>
  );
}
