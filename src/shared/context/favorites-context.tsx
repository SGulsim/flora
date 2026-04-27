"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
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

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  useEffect(() => {
    if (!user) {
      setFavoriteIds([]);
      return;
    }
    fetch("/api/favorites")
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data.ids)) setFavoriteIds(data.ids); })
      .catch(() => {});
  }, [user?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const addFavorite = useCallback((id: string) => {
    setFavoriteIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
    if (user) {
      fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bouquetId: id }),
      }).catch(() => {});
    }
  }, [user]);

  const removeFavorite = useCallback((id: string) => {
    setFavoriteIds((prev) => prev.filter((x) => x !== id));
    if (user) {
      fetch(`/api/favorites/${id}`, { method: "DELETE" }).catch(() => {});
    }
  }, [user]);

  const toggleFavorite = useCallback((id: string) => {
    setFavoriteIds((prev) => {
      if (prev.includes(id)) {
        if (user) fetch(`/api/favorites/${id}`, { method: "DELETE" }).catch(() => {});
        return prev.filter((x) => x !== id);
      } else {
        if (user) {
          fetch("/api/favorites", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ bouquetId: id }),
          }).catch(() => {});
        }
        return [...prev, id];
      }
    });
  }, [user]);

  const clearFavorites = useCallback(() => setFavoriteIds([]), []);
  const isFavorite = useCallback((id: string) => favoriteIds.includes(id), [favoriteIds]);

  const value = useMemo<FavoritesContextType>(() => ({
    favoriteIds,
    favoriteCount: favoriteIds.length,
    isFavorite,
    toggleFavorite,
    addFavorite,
    removeFavorite,
    clearFavorites,
  }), [favoriteIds, isFavorite, toggleFavorite, addFavorite, removeFavorite, clearFavorites]);

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}
