"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { SUBSCRIPTION_PLANS } from "@/shared/lib/mock-data";
import { formatPhone, isValidPhone } from "@/shared/lib/phone";
import { useAuth } from "@/shared/context/auth-context";

function SubscriptionCheckoutInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isLoggedIn, authHydrated } = useAuth();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [startDate, setStartDate] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [authRedirect, setAuthRedirect] = useState(false);

  const planId = searchParams.get("plan");
  const plan = useMemo(
    () => SUBSCRIPTION_PLANS.find((p) => p.id === planId),
    [planId]
  );

  useEffect(() => {
    if (!authHydrated || !plan) return;
    if (!isLoggedIn) {
      setAuthRedirect(true);
      const returnTo = `/subscription/checkout?plan=${encodeURIComponent(plan.id)}`;
      router.replace(`/login?returnTo=${encodeURIComponent(returnTo)}`);
    }
  }, [authHydrated, plan, isLoggedIn, router]);

  useEffect(() => {
    if (user) {
      if (user.name) setName(user.name);
      if (user.phone) setPhone(user.phone);
    }
  }, [user]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!plan) {
      setError("Тариф не найден");
      return;
    }
    if (!user?.id) {
      setError("Войдите в аккаунт, чтобы оформить подписку.");
      return;
    }
    if (!name.trim()) {
      setError("Введите имя");
      return;
    }
    if (!isValidPhone(phone)) {
      setError("Введите корректный номер: +7 (999) 000-00-00");
      return;
    }
    if (!startDate) {
      setError("Выберите дату первой доставки");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/subscriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: plan.id,
          planName: plan.name,
          price: plan.price,
          name: name.trim(),
          phone,
          startDate,
          comment: comment.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      router.push(`/subscription/success?id=${data.subscription.id}`);
    } catch {
      setError("Не удалось сохранить подписку. Попробуйте ещё раз.");
      setLoading(false);
    }
  };

  if (!authHydrated) {
    return (
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <p className="text-sm text-neutral-500">Загрузка…</p>
      </main>
    );
  }

  if (!plan) {
    return (
      <main className="max-w-xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-medium tracking-tight text-neutral-900 mb-3">
          Тариф не выбран
        </h1>
        <p className="text-sm text-neutral-500 mb-6">
          Вернитесь на страницу подписки и выберите подходящий план.
        </p>
        <Link
          href="/subscription"
          className="inline-flex px-6 py-3 rounded-full bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-all"
        >
          К тарифам
        </Link>
      </main>
    );
  }

  if (!isLoggedIn || authRedirect) {
    return (
      <main className="max-w-xl mx-auto px-4 py-16 text-center">
        <p className="text-sm text-neutral-500 mb-2">
          Войдите в аккаунт, чтобы оформить подписку — заявка сохранится в личном кабинете.
        </p>
        <p className="text-xs text-neutral-400">Перенаправляем…</p>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      <h1 className="text-2xl lg:text-3xl font-medium tracking-tight text-neutral-900 mb-3">
        Оформление подписки
      </h1>
      <p className="text-sm text-neutral-500 mb-8">
        Тариф: <span className="text-neutral-900 font-medium">{plan.name}</span> · от{" "}
        {plan.price.toLocaleString("ru-RU")} ₽ / раз
      </p>

      <form
        onSubmit={onSubmit}
        className="bg-white border border-neutral-100 rounded-2xl sm:rounded-[2rem] p-4 sm:p-6 lg:p-8 shadow-sm space-y-4"
      >
        <div>
          <label className="block text-xs text-neutral-500 mb-1.5 ml-1">Имя получателя</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Анна"
            className="w-full px-4 py-3 text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:border-neutral-300 focus:outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-xs text-neutral-500 mb-1.5 ml-1">Телефон</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(formatPhone(e.target.value))}
            placeholder="+7 (999) 000-00-00"
            className="w-full px-4 py-3 text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:border-neutral-300 focus:outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-xs text-neutral-500 mb-1.5 ml-1">Первая доставка</label>
          <input
            type="date"
            value={startDate}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-4 py-3 text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:border-neutral-300 focus:outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-xs text-neutral-500 mb-1.5 ml-1">
            Пожелания (необязательно)
          </label>
          <textarea
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value.slice(0, 300))}
            placeholder="Любимые оттенки, время доставки и т.д."
            className="w-full px-4 py-3 text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:border-neutral-300 focus:outline-none resize-none transition-all"
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="pt-3 flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-all disabled:opacity-60"
          >
            {loading ? "Оформляем..." : "Оформить подписку"}
          </button>
          <Link
            href="/subscription"
            className="w-full sm:w-auto px-6 py-3 rounded-full border border-neutral-200 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-all text-center"
          >
            Назад к тарифам
          </Link>
        </div>
      </form>
    </main>
  );
}

export default function SubscriptionCheckoutPage() {
  return (
    <Suspense
      fallback={
        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <p className="text-sm text-neutral-500">Загружаем форму подписки…</p>
        </main>
      }
    >
      <SubscriptionCheckoutInner />
    </Suspense>
  );
}
