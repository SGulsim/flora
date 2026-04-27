"use client";

import { Suspense, useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { BOUQUETS } from "@/shared/lib/mock-data";
import { CatalogFilters } from "@/features/catalog/catalog-filters";
import { ProductCard } from "@/features/catalog/product-card";
import { Iconify } from "@/shared/ui/icon";
import { RecentlyViewedStrip } from "@/features/catalog/recently-viewed-strip";

type SortOption = "popular" | "price-asc" | "price-desc" | "newest";

function CatalogPageInner() {
  const searchParams = useSearchParams();
  const [occasionFilter, setOccasionFilter] = useState<string[]>([]);
  const [priceMin, setPriceMin] = useState(1000);
  const [priceMax, setPriceMax] = useState(15000);
  const [sort, setSort] = useState<SortOption>("popular");
  const [sortOpen, setSortOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    const occasion = searchParams.get("occasion");
    const budget = searchParams.get("budget");
    const sortParam = searchParams.get("sort");

    if (occasion) setOccasionFilter([occasion]);

    switch (budget) {
      case "low":
        setPriceMin(0);
        setPriceMax(3000);
        break;
      case "mid":
        setPriceMin(3000);
        setPriceMax(5000);
        break;
      case "high":
        setPriceMin(5000);
        setPriceMax(10000);
        break;
      case "premium":
        setPriceMin(10000);
        setPriceMax(50000);
        break;
      default:
        break;
    }

    if (
      sortParam === "popular" ||
      sortParam === "price-asc" ||
      sortParam === "price-desc" ||
      sortParam === "newest"
    ) {
      setSort(sortParam);
    }
  }, [searchParams]);

  const handleOccasionChange = (id: string, checked: boolean) => {
    setOccasionFilter((prev) =>
      checked ? [...prev, id] : prev.filter((o) => o !== id)
    );
  };

  const filterProps = {
    occasionFilter,
    onOccasionChange: handleOccasionChange,
    priceMin,
    priceMax,
    onPriceChange: (min: number, max: number) => {
      setPriceMin(min);
      setPriceMax(max);
    },
  };

  const filteredBouquets = useMemo(() => {
    let result = BOUQUETS.filter((b) => {
      if (occasionFilter.length > 0) {
        const hasOccasion = b.occasion.some((o) => occasionFilter.includes(o));
        if (!hasOccasion) return false;
      }
      if (b.price < priceMin || b.price > priceMax) return false;
      return true;
    });

    switch (sort) {
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result = [...result].reverse();
        break;
      default:
        result = [...result].sort(
          (a, b) => Number(Boolean(b.isHit)) - Number(Boolean(a.isHit))
        );
    }
    return result;
  }, [occasionFilter, priceMin, priceMax, sort]);

  const sortLabels: Record<SortOption, string> = {
    popular: "По популярности",
    "price-asc": "Сначала дешевле",
    "price-desc": "Сначала дороже",
    newest: "Новинки",
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        <div className="lg:hidden flex items-center justify-between gap-3 mb-2">
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-neutral-200 bg-white text-sm font-medium text-neutral-900 shadow-sm hover:bg-neutral-50 transition-colors"
          >
            <Iconify icon="solar:filter-linear" width={18} height={18} />
            Фильтры
          </button>
        </div>

        <div className="hidden lg:block w-full lg:w-64 flex-shrink-0">
          <CatalogFilters {...filterProps} />
        </div>

        {mobileFiltersOpen && (
          <div className="lg:hidden fixed inset-0 z-50">
            <button
              type="button"
              aria-label="Закрыть фильтры"
              className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm"
              onClick={() => setMobileFiltersOpen(false)}
            />
            <aside
              role="dialog"
              aria-modal="true"
              aria-labelledby="mobile-filters-title"
              className="absolute left-0 top-0 bottom-0 w-[88%] max-w-sm bg-white shadow-xl overflow-y-auto p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <h2
                  id="mobile-filters-title"
                  className="text-lg font-medium text-neutral-900"
                >
                  Фильтры
                </h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-2 text-neutral-500 hover:text-neutral-900"
                  aria-label="Закрыть"
                >
                  <Iconify icon="solar:close-circle-linear" width={24} height={24} />
                </button>
              </div>
              <CatalogFilters {...filterProps} />
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="mt-6 w-full py-3 rounded-full bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800"
              >
                Показать результаты
              </button>
            </aside>
          </div>
        )}

        <div className="flex-1">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-medium tracking-tight text-neutral-900">
              Каталог
            </h2>
            <div className="relative">
              <button
                type="button"
                onClick={() => setSortOpen(!sortOpen)}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-neutral-200 bg-white text-sm font-medium text-neutral-800 hover:bg-neutral-50 transition-colors"
              >
                {sortLabels[sort]}{" "}
                <Iconify
                  icon="solar:alt-arrow-down-linear"
                  width={16}
                  height={16}
                  className={sortOpen ? "rotate-180" : ""}
                />
              </button>
              {sortOpen && (
                <div className="absolute right-0 top-full mt-1 py-2 bg-white rounded-xl border border-neutral-100 shadow-lg z-10 min-w-[200px]">
                  {(Object.keys(sortLabels) as SortOption[]).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setSort(opt);
                        setSortOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                    >
                      {sortLabels[opt]}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBouquets.map((bouquet) => (
              <ProductCard key={bouquet.id} bouquet={bouquet} />
            ))}
            {filteredBouquets.length === 0 && (
              <div className="col-span-full text-center py-16 text-neutral-500">
                По вашему запросу ничего не найдено. Попробуйте изменить фильтры.
              </div>
            )}
          </div>
        </div>
      </div>
      <RecentlyViewedStrip />
    </main>
  );
}

export default function CatalogPage() {
  return (
    <Suspense
      fallback={
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="text-sm text-neutral-500">Загрузка каталога…</p>
        </main>
      }
    >
      <CatalogPageInner />
    </Suspense>
  );
}
