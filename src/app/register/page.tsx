"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/shared/context/auth-context";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const cleanEmail = email.trim().toLowerCase();
    if (!name.trim()) {
      setError("Введите имя");
      return;
    }
    if (!cleanEmail) {
      setError("Введите email");
      return;
    }
    if (password.length < 6) {
      setError("Пароль должен быть не короче 6 символов");
      return;
    }
    setLoading(true);
    const res = await register({ name: name.trim(), email: cleanEmail, password });
    setLoading(false);
    if (!res.ok) {
      setError(res.error ?? "Не удалось зарегистрироваться");
      return;
    }
    router.push("/account");
  };

  return (
    <main className="max-w-md mx-auto px-4 py-16">
      <h1 className="text-2xl font-medium tracking-tight text-neutral-900 mb-2">
        Регистрация
      </h1>
      <p className="text-sm text-neutral-500 mb-8">
        Создайте аккаунт, чтобы сохранять заказы и подборки.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs text-neutral-500 mb-1.5 ml-1">Имя</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Анна"
            className="w-full px-4 py-3 text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:border-neutral-300 focus:outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-xs text-neutral-500 mb-1.5 ml-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@mail.ru"
            className="w-full px-4 py-3 text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:border-neutral-300 focus:outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-xs text-neutral-500 mb-1.5 ml-1">Пароль</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="минимум 6 символов"
            className="w-full px-4 py-3 text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:border-neutral-300 focus:outline-none transition-all"
          />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 bg-neutral-900 text-white text-sm font-medium rounded-full hover:bg-neutral-800 transition-all disabled:opacity-60"
        >
          {loading ? "Создаём аккаунт..." : "Зарегистрироваться"}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-neutral-500">
        Уже есть аккаунт?{" "}
        <Link href="/login" className="text-neutral-900 underline">
          Войти
        </Link>
      </p>
    </main>
  );
}
