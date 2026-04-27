"use client";

import { useEffect, useState } from "react";
import { getRecentlyViewed } from "@/shared/lib/recently-viewed";
import { BOUQUETS } from "@/shared/lib/mock-data";
import { ProductCard } from "./product-card";

interface RecentlyViewedStripProps {
  exclude?: string;
}

export function RecentlyViewedStrip({ exclude }: RecentlyViewedStripProps) {
  const [slugs, setSlugs] = useState<string[]>([]);

  useEffect(() => {
    const list = getRecentlyViewed().filter((s) => s !== exclude);
    setSlugs(list);
  }, [exclude]);

  const bouquets = slugs
    .map((s) => BOUQUETS.find((b) => b.slug === s))
    .filter((b): b is NonNullable<typeof b> => Boolean(b))
    .slice(0, 6);

  if (bouquets.length < 2) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-neutral-100">
      <h2 className="text-lg font-medium tracking-tight text-neutral-900 mb-6">
        Недавно просмотренные
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {bouquets.map((b) => (
          <ProductCard key={b.id} bouquet={b} />
        ))}
      </div>
    </section>
  );
}
