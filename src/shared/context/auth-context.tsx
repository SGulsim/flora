"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { useToast } from "@/shared/ui/toast";

interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  authHydrated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (payload: { name: string; email: string; password: string; phone?: string }) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [authHydrated, setAuthHydrated] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => { if (data?.user) setUser(data.user); })
      .catch(() => {})
      .finally(() => setAuthHydrated(true));
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok || !data.user) return false;
    setUser(data.user);
    addToast(`С возвращением, ${data.user.name.split(" ")[0]}! 👋`, "success");
    return true;
  }, [addToast]);

  const register = useCallback(async ({
    name, email, password, phone,
  }: { name: string; email: string; password: string; phone?: string }): Promise<{ ok: boolean; error?: string }> => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, phone }),
    });
    const data = await res.json();
    if (!res.ok) return { ok: false, error: data.error };
    setUser(data.user);
    addToast(`Добро пожаловать, ${data.user.name.split(" ")[0]}! 🌸`, "success");
    return { ok: true };
  }, [addToast]);

  const logout = useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
  }, []);

  const updateProfile = useCallback(async (data: Partial<User>) => {
    const res = await fetch("/api/auth/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (res.ok && json.user) setUser(json.user);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, authHydrated, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
