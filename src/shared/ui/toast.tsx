"use client";

import React, { createContext, useCallback, useContext, useRef, useState } from "react";
import { Iconify } from "./icon";

type ToastVariant = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  variant: ToastVariant;
  exiting?: boolean;
}

interface ToastContextType {
  addToast: (message: string, variant?: ToastVariant) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

const ICONS: Record<ToastVariant, string> = {
  success: "solar:check-circle-bold",
  error:   "solar:close-circle-bold",
  info:    "solar:info-circle-bold",
};

const COLORS: Record<ToastVariant, string> = {
  success: "text-green-600",
  error:   "text-red-500",
  info:    "text-neutral-500",
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.map((t) => t.id === id ? { ...t, exiting: true } : t));
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 200);
  }, []);

  const addToast = useCallback((message: string, variant: ToastVariant = "info") => {
    const id = `t_${Date.now()}_${Math.random()}`;
    setToasts((prev) => [...prev.slice(-4), { id, message, variant }]);
    const timer = setTimeout(() => dismiss(id), 3200);
    timers.current.set(id, timer);
  }, [dismiss]);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div
        aria-live="polite"
        className="fixed bottom-6 right-4 sm:right-6 z-[200] flex flex-col gap-2 items-end pointer-events-none"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-center gap-3 pl-4 pr-3 py-3 bg-white border border-neutral-200 rounded-2xl shadow-lg max-w-xs text-sm ${
              t.exiting ? "toast-exit" : "toast-enter"
            }`}
          >
            <Iconify icon={ICONS[t.variant]} width={18} height={18} className={`flex-shrink-0 ${COLORS[t.variant]}`} />
            <span className="text-neutral-800 flex-1">{t.message}</span>
            <button
              type="button"
              onClick={() => dismiss(t.id)}
              className="text-neutral-400 hover:text-neutral-700 transition-colors flex-shrink-0 ml-1"
            >
              <Iconify icon="solar:close-square-linear" width={16} height={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
