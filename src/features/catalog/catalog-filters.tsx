"use client";

import { OCCASIONS } from "@/shared/lib/mock-data";

interface CatalogFiltersProps {
  occasionFilter: string[];
  onOccasionChange: (id: string, checked: boolean) => void;
  priceMin: number;
  priceMax: number;
  onPriceChange: (min: number, max: number) => void;
}

export function CatalogFilters({
  occasionFilter,
  onOccasionChange,
  priceMin,
  priceMax,
  onPriceChange,
}: CatalogFiltersProps) {
  return (
    <aside className="w-full lg:w-64 flex-shrink-0">
      <div className="sticky top-24">
        <h3 className="text-lg font-medium tracking-tight text-neutral-900 mb-6">
          Фильтры
        </h3>
        <div className="space-y-8">
          <div>
            <p className="text-sm font-medium text-neutral-900 mb-4">Повод</p>
            <div className="space-y-3">
              {OCCASIONS.map((occ) => (
                <label
                  key={occ.id}
                  className="flex items-center gap-3 cursor-pointer group custom-checkbox"
                >
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={occasionFilter.includes(occ.id)}
                    onChange={(e) =>
                      onOccasionChange(occ.id, e.target.checked)
                    }
                  />
                  <div className="w-5 h-5 rounded border border-neutral-300 bg-white flex items-center justify-center transition-colors group-hover:border-neutral-400">
                    <svg
                      className="w-3.5 h-3.5 text-white opacity-0 transition-opacity"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-sm text-neutral-600 group-hover:text-neutral-900 transition-colors">
                    {occ.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-neutral-900 mb-4">Цена, ₽</p>
            <input
              type="range"
              min={1000}
              max={15000}
              value={priceMax}
              className="mb-4"
              onChange={(e) =>
                onPriceChange(priceMin, Number(e.target.value))
              }
            />
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={priceMin.toLocaleString("ru-RU")}
                className="w-full px-3 py-2 text-xs text-neutral-700 bg-white border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-300 text-center"
                onChange={(e) => {
                  const v = Number(e.target.value.replace(/\s/g, ""));
                  if (!isNaN(v)) onPriceChange(v, priceMax);
                }}
              />
              <span className="text-neutral-400 text-xs">-</span>
              <input
                type="text"
                value={priceMax.toLocaleString("ru-RU")}
                className="w-full px-3 py-2 text-xs text-neutral-700 bg-white border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-300 text-center"
                onChange={(e) => {
                  const v = Number(e.target.value.replace(/\s/g, ""));
                  if (!isNaN(v)) onPriceChange(priceMin, v);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
