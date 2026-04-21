"use client";

import Image from "next/image";
import Link from "next/link";
import type { Bouquet } from "@/shared/lib/mock-data";
import { useFavorites } from "@/shared/context/favorites-context";
import { Iconify } from "@/shared/ui/icon";

interface ProductCardProps {
  bouquet: Bouquet;
}

export function ProductCard({ bouquet }: ProductCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(bouquet.id);

  const handleFav = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(bouquet.id);
  };

  return (
    <Link
      href={`/catalog/${bouquet.slug}`}
      className="group cursor-pointer block"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-100 mb-4 border border-neutral-100">
        <Image
          src={bouquet.image}
          alt={bouquet.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {bouquet.isHit && (
          <div className="absolute top-3 left-3 px-2 py-1 bg-white/90 backdrop-blur text-xs font-medium uppercase tracking-wider text-neutral-900 rounded-lg">
            Хит
          </div>
        )}
        <button
          type="button"
          onClick={handleFav}
          aria-label={fav ? "Убрать из избранного" : "В избранное"}
          aria-pressed={fav}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all backdrop-blur ${
            fav
              ? "bg-rose-500 text-white hover:bg-rose-600"
              : "bg-white/90 text-neutral-700 hover:bg-white hover:text-rose-500"
          }`}
        >
          <Iconify
            icon={fav ? "solar:heart-bold" : "solar:heart-linear"}
            width={18}
            height={18}
          />
        </button>
      </div>
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-sm font-medium text-neutral-900 mb-1">
            {bouquet.name}
          </h3>
          <p className="text-xs text-neutral-500">
            {bouquet.composition
              .slice(0, 2)
              .map((c) => c.name)
              .join(", ")}
          </p>
        </div>
        <p className="text-sm font-medium text-neutral-900 whitespace-nowrap">
          {bouquet.price.toLocaleString("ru-RU")} ₽
        </p>
      </div>
    </Link>
  );
}
