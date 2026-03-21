const STORAGE_KEY = "flora_occasions";

export interface Occasion {
  id: string;
  date: string;
  type: string;
  recipientName: string;
  reminderDays: number;
}

export function getOccasions(): Occasion[] {
  if (typeof window === "undefined") return [];
  try {
    const s = localStorage.getItem(STORAGE_KEY);
    return s ? JSON.parse(s) : [];
  } catch {
    return [];
  }
}

export function saveOccasions(occasions: Occasion[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(occasions));
}

export function addOccasion(occasion: Omit<Occasion, "id">): Occasion {
  const list = getOccasions();
  const id = `occ_${Date.now()}`;
  const newOcc: Occasion = { ...occasion, id };
  saveOccasions([...list, newOcc]);
  return newOcc;
}

export function removeOccasion(id: string) {
  saveOccasions(getOccasions().filter((o) => o.id !== id));
}
