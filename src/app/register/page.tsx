"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/shared/context/auth-context";
import { formatPhone, isValidPhone } from "@/shared/lib/phone";

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const returnTo = searchParams.get("returnTo");
  const safeReturn =
    returnTo && returnTo.startsWith("/") && !returnTo.startsWith("//")
      ? returnTo
      : "/account";

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value));
  };

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
    if (phone && !isValidPhone(phone)) {
      setError("Введите корректный номер телефона");
      return;
    }
    if (password.length < 6) {
      setError("Пароль должен быть не короче 6 символов");
      return;
    }
    setLoading(true);
    const res = await register({ name: name.trim(), email: cleanEmail, password, phone });
    setLoading(false);
    if (!res.ok) {
      setError(res.error ?? "Не удалось зарегистрироваться");
      return;
    }
    router.push(safeReturn);
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
          <label className="block text-xs text-neutral-500 mb-1.5 ml-1">
            Телефон <span className="text-neutral-400">(необязательно)</span>
          </label>
          <input
            type="tel"
            value={phone}
            onChange={handlePhoneChange}
            placeholder="+7 (999) 000-00-00"
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
        <Link
          href={
            returnTo
              ? `/login?returnTo=${encodeURIComponent(returnTo)}`
              : "/login"
          }
          className="text-neutral-900 underline"
        >
          Войти
        </Link>
      </p>
    </main>
  );
}

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <main className="max-w-md mx-auto px-4 py-16">
          <p className="text-sm text-neutral-500">Загрузка…</p>
        </main>
      }
    >
      <RegisterForm />
    </Suspense>
  );
}
