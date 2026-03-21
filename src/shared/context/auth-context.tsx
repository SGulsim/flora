"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const STORAGE_KEY = "flora_user";

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

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
    async (email: string, _password: string): Promise<boolean> => {
      const u: User = {
        id: "1",
        email,
        name: email.split("@")[0] || "Пользователь",
        phone: "+7 (999) 000-00-00",
      };
      persistUser(u);
      return true;
    },
    [persistUser]
  );

  const logout = useCallback(() => {
    persistUser(null);
  }, [persistUser]);

  const updateProfile = useCallback(
    (data: Partial<User>) => {
      if (user) persistUser({ ...user, ...data });
    },
    [user, persistUser]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
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
