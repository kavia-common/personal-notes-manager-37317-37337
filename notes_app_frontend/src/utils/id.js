const rand = () => Math.random().toString(36).slice(2);

// PUBLIC_INTERFACE
export function generateId() {
  /** Generate a short, reasonably unique id */
  return `${Date.now().toString(36)}-${rand()}${rand()}`.slice(0, 24);
}
