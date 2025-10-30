import { useCallback, useEffect, useState } from 'react';
import { generateId } from '../utils/id';
import { nowISO } from '../utils/dates';
import { localStorageClient } from '../storage/localStorageClient';
import { apiClient } from '../storage/apiClient';
import { env } from '../config/env';

const STORAGE_KEY = 'notes.v1';

// PUBLIC_INTERFACE
export default function useNotes() {
  const [notes, setNotes] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const cached = localStorageClient.get(STORAGE_KEY);
    if (Array.isArray(cached)) {
      setNotes(cached);
    }
  }, []);

  // Persist to localStorage whenever notes change
  useEffect(() => {
    localStorageClient.set(STORAGE_KEY, notes);
  }, [notes]);

  const shouldUseApi = env.features.USE_API && env.backendUrl;

  const syncWithApi = useCallback(async () => {
    if (!shouldUseApi) return;
    try {
      const remote = await apiClient.list();
      if (Array.isArray(remote)) {
        setNotes(remote);
        localStorageClient.set(STORAGE_KEY, remote);
      }
    } catch {
      // Silently ignore API failures; LocalStorage remains source of truth.
    }
  }, [shouldUseApi]);

  useEffect(() => {
    syncWithApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldUseApi]);

  const createNote = useCallback(async ({ title, content }) => {
    const note = {
      id: generateId(),
      title: title || '',
      content: content || '',
      createdAt: nowISO(),
      updatedAt: nowISO(),
    };
    setNotes(prev => [note, ...prev]);
    if (shouldUseApi) {
      try { await apiClient.create(note); } catch { /* ignore */ }
    }
    return note;
  }, [shouldUseApi]);

  const updateNote = useCallback(async (id, patch) => {
    setNotes(prev =>
      prev.map(n => (n.id === id ? { ...n, ...patch, updatedAt: nowISO() } : n))
    );
    if (shouldUseApi) {
      try { await apiClient.update(id, patch); } catch { /* ignore */ }
    }
  }, [shouldUseApi]);

  const deleteNote = useCallback(async (id) => {
    setNotes(prev => prev.filter(n => n.id !== id));
    if (shouldUseApi) {
      try { await apiClient.remove(id); } catch { /* ignore */ }
    }
  }, [shouldUseApi]);

  return { notes, createNote, updateNote, deleteNote };
}
