const pad = (n) => String(n).padStart(2, '0');

// PUBLIC_INTERFACE
export function nowISO() {
  return new Date().toISOString();
}

// PUBLIC_INTERFACE
export function formatDate(input) {
  try {
    const d = new Date(input);
    if (Number.isNaN(d.getTime())) return String(input || '');
    const y = d.getFullYear();
    const m = pad(d.getMonth() + 1);
    const da = pad(d.getDate());
    const hh = pad(d.getHours());
    const mm = pad(d.getMinutes());
    return `${y}-${m}-${da} ${hh}:${mm}`;
  } catch {
    return String(input || '');
  }
}
