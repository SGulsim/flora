"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

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
}

const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = "flora:cart";

type PersistedCart = {
  items: CartItem[];
  addons: CartAddon[];
};

function readCart(): PersistedCart {
  if (typeof window === "undefined") return { items: [], addons: [] };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { items: [], addons: [] };
    const parsed = JSON.parse(raw) as PersistedCart;
    return {
      items: Array.isArray(parsed?.items) ? parsed.items : [],
      addons: Array.isArray(parsed?.addons) ? parsed.addons : [],
    };
  } catch {
    return { items: [], addons: [] };
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [addons, setAddons] = useState<CartAddon[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const data = readCart();
    setItems(data.items);
    setAddons(data.addons);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ items, addons })
      );
    } catch {
      // ignore quota errors
    }
  }, [items, addons, hydrated]);

  const addItem = useCallback((item: Omit<CartItem, "quantity">, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.bouquetId === item.bouquetId);
      const newQty = existing ? existing.quantity + quantity : quantity;
      if (existing) {
        return prev.map((i) =>
          i.bouquetId === item.bouquetId ? { ...i, quantity: newQty } : i
        );
      }
      return [...prev, { ...item, quantity }];
    });
  }, []);

  const addAddon = useCallback((addon: CartAddon) => {
    setAddons((prev) => (prev.some((a) => a.id === addon.id) ? prev : [...prev, addon]));
  }, []);

  const removeAddon = useCallback((addonId: string) => {
    setAddons((prev) => prev.filter((a) => a.id !== addonId));
  }, []);

  const removeItem = useCallback((bouquetId: string) => {
    setItems((prev) => prev.filter((i) => i.bouquetId !== bouquetId));
  }, []);

  const updateQuantity = useCallback((bouquetId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.bouquetId !== bouquetId));
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.bouquetId === bouquetId ? { ...i, quantity } : i
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setAddons([]);
  }, []);

  const itemsTotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const addonsTotal = addons.reduce((sum, a) => sum + a.price, 0);
  const total = itemsTotal + addonsTotal;
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addons,
        addItem,
        removeItem,
        updateQuantity,
        addAddon,
        removeAddon,
        clearCart,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
