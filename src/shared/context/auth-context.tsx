"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
}

interface StoredAccount extends User {
  password: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  /** true после чтения сессии из localStorage на клиенте */
  authHydrated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (payload: { name: string; email: string; password: string }) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const STORAGE_KEY = "flora_user";
const ACCOUNTS_STORAGE_KEY = "flora_accounts";

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [authHydrated, setAuthHydrated] = useState(false);

  const readAccounts = (): StoredAccount[] => {
    try {
      const raw = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw) as StoredAccount[];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  const writeAccounts = (accounts: StoredAccount[]) => {
    localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));
  };

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const u = JSON.parse(stored);
        setUser(u);
        setUserCookie(u.id);
      }
    } catch {
      setUser(null);
    } finally {
      setAuthHydrated(true);
    }
  }, []);

  const setUserCookie = (userId: string | null) => {
    if (typeof document === "undefined") return;
    if (userId) {
      document.cookie = `flora_user_id=${userId}; path=/; max-age=31536000`;
    } else {
      document.cookie = "flora_user_id=; path=/; max-age=0";
    }
  };

  const persistUser = useCallback((u: User | null) => {
    setUser(u);
    if (u) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
      setUserCookie(u.id);
    } else {
      localStorage.removeItem(STORAGE_KEY);
      setUserCookie(null);
    }
  }, []);

  const login = useCallback(
    async (email: string, password: string): Promise<boolean> => {
      const normalizedEmail = email.trim().toLowerCase();
      const accounts = readAccounts();
      const acc = accounts.find((a) => a.email.toLowerCase() === normalizedEmail);
      if (!acc || acc.password !== password) return false;
      const u: User = {
        id: acc.id,
        email: acc.email,
        name: acc.name,
        phone: acc.phone,
      };
      persistUser(u);
      return true;
    },
    [persistUser]
  );

  const register = useCallback(
    async ({
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    }): Promise<{ ok: boolean; error?: string }> => {
      const normalizedEmail = email.trim().toLowerCase();
      const accounts = readAccounts();
      const exists = accounts.some((a) => a.email.toLowerCase() === normalizedEmail);
      if (exists) return { ok: false, error: "Пользователь с таким email уже существует" };

      const account: StoredAccount = {
        id: crypto.randomUUID(),
        name: name.trim() || normalizedEmail.split("@")[0] || "Пользователь",
        email: normalizedEmail,
        phone: "+7 (999) 000-00-00",
        password,
      };
      writeAccounts([...accounts, account]);
      persistUser({
        id: account.id,
        name: account.name,
        email: account.email,
        phone: account.phone,
      });
      return { ok: true };
    },
    [persistUser]
  );

  const logout = useCallback(() => {
    persistUser(null);
  }, [persistUser]);

  const updateProfile = useCallback(
    (data: Partial<User>) => {
      if (!user) return;
      const nextUser = { ...user, ...data };
      persistUser(nextUser);
      const accounts = readAccounts();
      const updated = accounts.map((a) =>
        a.id === nextUser.id
          ? { ...a, name: nextUser.name, email: nextUser.email, phone: nextUser.phone }
          : a
      );
      writeAccounts(updated);
    },
    [user, persistUser]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        authHydrated,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
