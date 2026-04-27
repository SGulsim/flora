const KEY = "flora:recently-viewed";
const MAX = 6;

export function addRecentlyViewed(slug: string): void {
  if (typeof window === "undefined") return;
  try {
    const list = getRecentlyViewed().filter((s) => s !== slug);
    const updated = [slug, ...list].slice(0, MAX);
    localStorage.setItem(KEY, JSON.stringify(updated));
  } catch { /* ignore */ }
}

export function getRecentlyViewed(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((s): s is string => typeof s === "string") : [];
  } catch {
    return [];
  }
}
