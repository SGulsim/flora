"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAuth } from "@/shared/context/auth-context";

interface FavoritesContextType {
  favoriteIds: string[];
  favoriteCount: number;
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  clearFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | null>(null);

const LEGACY_KEY = "flora:favorites";
const GUEST_KEY = "flora:favorites:guest";

function storageKeyForUser(userId: string | null | undefined): string {
  if (userId) return `flora:favorites:${userId}`;
  return GUEST_KEY;
}

function readFavoritesFromKey(key: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      if (key === GUEST_KEY) {
        const legacy = window.localStorage.getItem(LEGACY_KEY);
        if (!legacy) return [];
        const parsed = JSON.parse(legacy);
        if (!Array.isArray(parsed)) return [];
        const ids = parsed.filter((x): x is string => typeof x === "string");
        window.localStorage.setItem(GUEST_KEY, JSON.stringify(ids));
        window.localStorage.removeItem(LEGACY_KEY);
        return ids;
      }
      return [];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((x): x is string => typeof x === "string");
  } catch {
    return [];
  }
}

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  const userId = user?.id ?? null;

  useEffect(() => {
    const key = storageKeyForUser(userId);
    setFavoriteIds(readFavoritesFromKey(key));
    setHydrated(true);
  }, [userId]);

  useEffect(() => {
    if (!hydrated || !userId) return;
    try {
      const guest = readFavoritesFromKey(GUEST_KEY);
      if (guest.length === 0) return;
      const userKey = storageKeyForUser(userId);
      const existing = readFavoritesFromKey(userKey);
      const merged = [...new Set([...existing, ...guest])];
      window.localStorage.setItem(userKey, JSON.stringify(merged));
      window.localStorage.removeItem(GUEST_KEY);
      setFavoriteIds(merged);
    } catch {
      // ignore
    }
  }, [userId, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    const key = storageKeyForUser(userId);
    try {
      window.localStorage.setItem(key, JSON.stringify(favoriteIds));
    } catch {
      // ignore quota / privacy-mode errors
    }
  }, [favoriteIds, hydrated, userId]);

  const isFavorite = useCallback(
    (id: string) => favoriteIds.includes(id),
    [favoriteIds]
  );

  const addFavorite = useCallback((id: string) => {
    setFavoriteIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const removeFavorite = useCallback((id: string) => {
    setFavoriteIds((prev) => prev.filter((x) => x !== id));
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  const clearFavorites = useCallback(() => {
    setFavoriteIds([]);
  }, []);

  const value = useMemo<FavoritesContextType>(
    () => ({
      favoriteIds,
      favoriteCount: favoriteIds.length,
      isFavorite,
      toggleFavorite,
      addFavorite,
      removeFavorite,
      clearFavorites,
    }),
    [favoriteIds, isFavorite, toggleFavorite, addFavorite, removeFavorite, clearFavorites]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}
