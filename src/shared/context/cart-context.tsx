"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { useAuth } from "@/shared/context/auth-context";
import { useToast } from "@/shared/ui/toast";

export interface CartItem {
  bouquetId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface CartAddon {
  id: string;
  name: string;
  price: number;
}

interface CartContextType {
  items: CartItem[];
  addons: CartAddon[];
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (bouquetId: string) => void;
  updateQuantity: (bouquetId: string, quantity: number) => void;
  addAddon: (addon: CartAddon) => void;
  removeAddon: (addonId: string) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
  isFlyoutOpen: boolean;
  openFlyout: () => void;
  closeFlyout: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [items, setItems] = useState<CartItem[]>([]);
  const [addons, setAddons] = useState<CartAddon[]>([]);
  const [synced, setSynced] = useState(false);
  const [isFlyoutOpen, setIsFlyoutOpen] = useState(false);
  const openFlyout = useCallback(() => setIsFlyoutOpen(true), []);
  const closeFlyout = useCallback(() => setIsFlyoutOpen(false), []);

  // Load cart from DB when user logs in
  useEffect(() => {
    if (!user) {
      setItems([]);
      setSynced(false);
      return;
    }
    fetch("/api/cart")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data.items)) {
          setItems(data.items.map((i: CartItem & { price: number }) => ({
            bouquetId: i.bouquetId,
            name: i.name,
            price: i.price,
            image: i.image,
            quantity: i.quantity,
          })));
        }
        setSynced(true);
      })
      .catch(() => setSynced(true));
  }, [user?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const addItem = useCallback((item: Omit<CartItem, "quantity">, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.bouquetId === item.bouquetId);
      if (existing) {
        return prev.map((i) =>
          i.bouquetId === item.bouquetId ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { ...item, quantity }];
    });
    setIsFlyoutOpen(true);
    addToast(`«${item.name}» добавлен в корзину`, "success");
    if (user) {
      fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...item, quantity }),
      }).catch(() => {});
    }
  }, [user, addToast]);

  const removeItem = useCallback((bouquetId: string) => {
    setItems((prev) => prev.filter((i) => i.bouquetId !== bouquetId));
    if (user) {
      fetch(`/api/cart/${bouquetId}`, { method: "DELETE" }).catch(() => {});
    }
  }, [user]);

  const updateQuantity = useCallback((bouquetId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.bouquetId !== bouquetId));
      if (user) fetch(`/api/cart/${bouquetId}`, { method: "DELETE" }).catch(() => {});
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.bouquetId === bouquetId ? { ...i, quantity } : i))
    );
    if (user) {
      fetch(`/api/cart/${bouquetId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity }),
      }).catch(() => {});
    }
  }, [user]);

  const addAddon = useCallback((addon: CartAddon) => {
    setAddons((prev) => (prev.some((a) => a.id === addon.id) ? prev : [...prev, addon]));
  }, []);

  const removeAddon = useCallback((addonId: string) => {
    setAddons((prev) => prev.filter((a) => a.id !== addonId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setAddons([]);
    if (user) fetch("/api/cart", { method: "DELETE" }).catch(() => {});
  }, [user]);

  const total =
    items.reduce((s, i) => s + i.price * i.quantity, 0) +
    addons.reduce((s, a) => s + a.price, 0);
  const itemCount = items.reduce((s, i) => s + i.quantity, 0);

  // Suppress unused var warning
  void synced;

  return (
    <CartContext.Provider value={{ items, addons, addItem, removeItem, updateQuantity, addAddon, removeAddon, clearCart, total, itemCount, isFlyoutOpen, openFlyout, closeFlyout }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
