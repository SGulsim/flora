"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function SubscriptionSuccessInner() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  return (
    <main className="max-w-2xl mx-auto px-4 py-16 text-center">
      <h1 className="text-3xl font-medium tracking-tight text-neutral-900 mb-4">
        Подписка оформлена
      </h1>
      <p className="text-sm text-neutral-500 mb-8">
        Спасибо! Мы сохранили заявку и свяжемся с вами для подтверждения деталей.
      </p>
      {id && (
        <p className="text-xs text-neutral-400 mb-8">
          Номер заявки: <span className="text-neutral-600">{id}</span>
        </p>
      )}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          href="/account"
          className="px-6 py-3 rounded-full bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-all"
        >
          В личный кабинет
        </Link>
        <Link
          href="/catalog"
          className="px-6 py-3 rounded-full border border-neutral-200 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-all"
        >
          В каталог
        </Link>
      </div>
    </main>
  );
}

export default function SubscriptionSuccessPage() {
  return (
    <Suspense
      fallback={<main className="max-w-2xl mx-auto px-4 py-16 text-center" />}
    >
      <SubscriptionSuccessInner />
    </Suspense>
  );
}
