"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/shared/context/auth-context";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const returnTo = searchParams.get("returnTo");
  const safeReturn =
    returnTo && returnTo.startsWith("/") && !returnTo.startsWith("//")
      ? returnTo
      : "/account";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      setError("Введите email");
      return;
    }
    if (!password) {
      setError("Введите пароль");
      return;
    }
    const ok = await login(cleanEmail, password);
    if (ok) router.push(safeReturn);
    else setError("Неверный email или пароль");
  };

  return (
    <main className="max-w-md mx-auto px-4 py-16">
      <h1 className="text-2xl font-medium tracking-tight text-neutral-900 mb-2">
        Вход
      </h1>
      <p className="text-sm text-neutral-500 mb-8">Войдите в ваш аккаунт</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs text-neutral-500 mb-1.5 ml-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@mail.ru"
            className="w-full px-4 py-3 text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:border-neutral-300 focus:outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-xs text-neutral-500 mb-1.5 ml-1">
            Пароль
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-4 py-3 text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:border-neutral-300 focus:outline-none transition-all"
          />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full py-3.5 bg-neutral-900 text-white text-sm font-medium rounded-full hover:bg-neutral-800 transition-all"
        >
          Войти
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-neutral-500">
        Нет аккаунта?{" "}
        <Link
          href={
            returnTo
              ? `/register?returnTo=${encodeURIComponent(returnTo)}`
              : "/register"
          }
          className="text-neutral-900 underline"
        >
          Зарегистрироваться
        </Link>
      </p>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <main className="max-w-md mx-auto px-4 py-16">
          <p className="text-sm text-neutral-500">Загрузка…</p>
        </main>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
