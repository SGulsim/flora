"use client";

import Image from "next/image";
import Link from "next/link";
import type { Bouquet } from "@/shared/lib/mock-data";

interface ProductCardProps {
  bouquet: Bouquet;
}

export function ProductCard({ bouquet }: ProductCardProps) {
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
