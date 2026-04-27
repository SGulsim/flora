export type SavedSubscription = {
  id: string;
  userId: string;
  planId: string;
  planName: string;
  price: number;
  name: string;
  phone: string;
  startDate: string;
  comment: string;
  status: "active";
  createdAt: string;
};

const LEGACY_KEY = "flora_subscriptions";

function keyForUser(userId: string) {
  return `flora:subscriptions:${userId}`;
}

export function readSubscriptions(userId: string): SavedSubscription[] {
  if (typeof window === "undefined") return [];
  try {
    const k = keyForUser(userId);
    let raw = window.localStorage.getItem(k);
    if (!raw) {
      const legacyRaw = window.localStorage.getItem(LEGACY_KEY);
      if (legacyRaw) {
        const arr = JSON.parse(legacyRaw) as Array<
          SavedSubscription & { userId?: string }
        >;
        if (Array.isArray(arr) && arr.length > 0) {
          const upgraded: SavedSubscription[] = arr.map((s) => ({
            ...s,
            userId: s.userId ?? userId,
          }));
          window.localStorage.setItem(k, JSON.stringify(upgraded));
          window.localStorage.removeItem(LEGACY_KEY);
          return upgraded.filter((s) => s.userId === userId);
        }
      }
      return [];
    }
    const parsed = JSON.parse(raw) as SavedSubscription[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((s) => s.userId === userId);
  } catch {
    return [];
  }
}

export function appendSubscription(sub: SavedSubscription): void {
  const prev = readSubscriptions(sub.userId);
  window.localStorage.setItem(
    keyForUser(sub.userId),
    JSON.stringify([sub, ...prev])
  );
}
