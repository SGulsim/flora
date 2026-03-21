"use client";

import { useState, useMemo } from "react";
import { BOUQUETS } from "@/shared/lib/mock-data";
import { CatalogFilters } from "@/features/catalog/catalog-filters";
import { ProductCard } from "@/features/catalog/product-card";
import { Iconify } from "@/shared/ui/icon";

type SortOption = "popular" | "price-asc" | "price-desc" | "newest";

export default function CatalogPage() {
  const [occasionFilter, setOccasionFilter] = useState<string[]>([]);
  const [priceMin, setPriceMin] = useState(1000);
  const [priceMax, setPriceMax] = useState(15000);
  const [sort, setSort] = useState<SortOption>("popular");
  const [sortOpen, setSortOpen] = useState(false);

  const handleOccasionChange = (id: string, checked: boolean) => {
    setOccasionFilter((prev) =>
      checked ? [...prev, id] : prev.filter((o) => o !== id)
    );
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
        result = [...result].sort((a) => (a.isHit ? -1 : 1));
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
        <CatalogFilters
          occasionFilter={occasionFilter}
          onOccasionChange={handleOccasionChange}
          priceMin={priceMin}
          priceMax={priceMax}
          onPriceChange={(min, max) => {
            setPriceMin(min);
            setPriceMax(max);
          }}
        />

        <div className="flex-1">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-medium tracking-tight text-neutral-900">
              Каталог
            </h2>
            <div className="relative">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="text-sm text-neutral-600 flex items-center gap-1"
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
                <div className="absolute right-0 top-full mt-1 py-2 bg-white rounded-xl border border-neutral-100 shadow-lg z-10 min-w-[180px]">
                  {(Object.keys(sortLabels) as SortOption[]).map((opt) => (
                    <button
                      key={opt}
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
    </main>
  );
}
