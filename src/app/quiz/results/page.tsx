"use client";

import { useMemo, Suspense, useState, useCallback } from "react";
import { useAuth } from "@/shared/context/auth-context";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/features/catalog/product-card";
import {
  matchBouquets,
  parseQuizSearchParams,
} from "@/features/quiz/match-bouquets";
import { Iconify } from "@/shared/ui/icon";

function QuizResultsContent() {
  const searchParams = useSearchParams();
  const { isLoggedIn } = useAuth();
  const [saved, setSaved] = useState(false);
  const answers = useMemo(
    () => parseQuizSearchParams(searchParams),
    [searchParams]
  );

  const bouquets = useMemo(
    () => (answers ? matchBouquets(answers) : []),
    [answers]
  );
  const catalogQuery = useMemo(() => {
    if (!answers) return "/catalog";
    const q = new URLSearchParams({
      occasion: answers.occasion,
      budget: answers.budget,
      sort: "popular",
    });
    return `/catalog?${q.toString()}`;
  }, [answers]);

  const handleSaveSelection = useCallback(async () => {
    if (!answers) return;
    if (isLoggedIn) {
      await fetch("/api/quiz-collections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers, bouquetIds: bouquets.map((b) => b.id) }),
      }).catch(() => {});
    }
    setSaved(true);
  }, [answers, bouquets, isLoggedIn]);

  if (!answers) {
    return (
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center">
        <p className="text-neutral-500 mb-6">
          Не хватает данных подбора. Пройдите квиз ещё раз.
        </p>
        <Link
          href="/quiz"
          className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white text-sm font-medium rounded-full hover:bg-neutral-800 transition-all"
        >
          <Iconify icon="solar:arrow-left-linear" width={18} height={18} />
          К квизу
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <div className="max-w-2xl mb-10 lg:mb-14">
        <span className="text-xs font-medium text-rose-500 tracking-widest uppercase mb-3 block">
          Готово
        </span>
        <h1 className="text-3xl lg:text-4xl font-medium tracking-tight text-neutral-900 mb-4">
          Ваш персональный подбор
        </h1>
        <p className="text-sm text-neutral-500 leading-relaxed">
          Мы отобрали букеты с учётом повода, бюджета, оттенков и формата. Нажмите
          на карточку, чтобы открыть состав и добавить в корзину.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {bouquets.map((bouquet) => (
          <ProductCard key={bouquet.id} bouquet={bouquet} />
        ))}
        {bouquets.length === 0 && (
          <div className="col-span-full rounded-2xl border border-neutral-100 bg-neutral-50 p-8 text-center">
            <p className="text-sm text-neutral-600 mb-4">
              По этим параметрам пока нет идеального совпадения. Измените ответы в
              квизе или откройте полный каталог.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/quiz"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-neutral-200 text-sm font-medium text-neutral-800 hover:bg-white transition-all"
              >
                <Iconify icon="solar:arrow-left-linear" width={16} height={16} />
                Изменить ответы
              </Link>
              <Link
                href="/catalog"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-all"
              >
                В каталог
                <Iconify icon="solar:arrow-right-linear" width={16} height={16} />
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center border-t border-neutral-100 pt-10">
        <button
          type="button"
          onClick={handleSaveSelection}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-all"
        >
          {saved ? "Подборка сохранена" : "Сохранить подборку"}
          <Iconify
            icon={saved ? "solar:check-circle-linear" : "solar:bookmark-linear"}
            width={16}
            height={16}
          />
        </button>
        <Link
          href={catalogQuery}
          className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors inline-flex items-center gap-2"
        >
          Смотреть весь каталог с фильтрами
          <Iconify icon="solar:arrow-right-linear" width={16} height={16} />
        </Link>
        <Link
          href="/quiz"
          className="text-sm text-neutral-400 hover:text-neutral-700 transition-colors"
        >
          Пройти квиз заново
        </Link>
      </div>
    </main>
  );
}

export default function QuizResultsPage() {
  return (
    <Suspense
      fallback={
        <main className="max-w-7xl mx-auto px-4 py-24 text-center text-neutral-400 text-sm">
          Загрузка…
        </main>
      }
    >
      <QuizResultsContent />
    </Suspense>
  );
}
