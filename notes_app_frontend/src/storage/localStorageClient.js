const safeParse = (str, fallback) => {
  try {
    return JSON.parse(str);
  } catch {
    return fallback;
  }
};

// PUBLIC_INTERFACE
export const localStorageClient = {
  /** Get a JSON value from localStorage by key */
  get(key, defaultValue = []) {
    if (typeof window === 'undefined') return defaultValue;
    const raw = window.localStorage.getItem(key);
    if (raw == null) return defaultValue;
    return safeParse(raw, defaultValue);
  },
  /** Set a JSON value to localStorage */
  set(key, value) {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore quota or serialization errors
    }
  },
  /** Remove a key from localStorage */
  remove(key) {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.removeItem(key);
    } catch {
      // ignore
    }
  }
};
