import { env } from '../config/env';

const base = () => env.backendUrl?.replace(/\/+$/, '') || '';

async function http(path, options) {
  const url = `${base()}${path}`;
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

// PUBLIC_INTERFACE
export const apiClient = {
  async list() {
    if (!env.features.USE_API || !env.backendUrl) return [];
    return http('/api/notes', { method: 'GET' });
  },
  async create(note) {
    if (!env.features.USE_API || !env.backendUrl) return note;
    return http('/api/notes', { method: 'POST', body: JSON.stringify(note) });
  },
  async update(id, patch) {
    if (!env.features.USE_API || !env.backendUrl) return { id, ...patch };
    return http(`/api/notes/${id}`, { method: 'PATCH', body: JSON.stringify(patch) });
  },
  async remove(id) {
    if (!env.features.USE_API || !env.backendUrl) return true;
    await http(`/api/notes/${id}`, { method: 'DELETE' });
    return true;
  }
};
