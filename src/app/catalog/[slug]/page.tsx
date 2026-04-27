"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BOUQUETS, OCCASIONS } from "@/shared/lib/mock-data";
import { useCart } from "@/shared/context/cart-context";
import { useFavorites } from "@/shared/context/favorites-context";
import { Iconify } from "@/shared/ui/icon";
import { QuantityStepper } from "@/shared/ui/quantity-stepper";
import { addRecentlyViewed } from "@/shared/lib/recently-viewed";
import { RecentlyViewedStrip } from "@/features/catalog/recently-viewed-strip";

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const bouquet = BOUQUETS.find((b) => b.slug === slug);
  const { addItem } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);
  const [viewersCount] = useState(() => Math.floor(Math.random() * 6 + 2));
  const addToCartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (slug) addRecentlyViewed(slug);
  }, [slug]);

  useEffect(() => {
    const el = addToCartRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setStickyVisible(!entry.isIntersecting),
      { threshold: 0, rootMargin: "-80px 0px 0px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [bouquet]);

  if (!bouquet) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-medium tracking-tight text-neutral-900 mb-3">
          Букет не найден
        </h1>
        <p className="text-sm text-neutral-500 mb-8">
          Такого товара нет в каталоге. Выберите другой букет.
        </p>
        <Link
          href="/catalog"
          className="inline-flex px-6 py-3 rounded-full bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-all"
        >
          В каталог
        </Link>
      </main>
    );
  }

  const fav = isFavorite(bouquet.id);

  const images = bouquet.images ?? [bouquet.image];

  const primaryOccasion = bouquet.occasion[0];
  const occasionLabel = OCCASIONS.find((o) => o.id === primaryOccasion)?.label ?? "Авторские";

  const handleAddToCart = () => {
    addItem(
      {
        bouquetId: bouquet.id,
        name: bouquet.name,
        price: bouquet.price,
        image: bouquet.image,
      },
      quantity
    );
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-24">
        <div className="space-y-4">
          <div className="aspect-[4/5] rounded-[2rem] overflow-hidden bg-neutral-100 border border-neutral-100 relative">
            <Image
              src={images[selectedImage]}
              alt={bouquet.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-2 sm:gap-4">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`aspect-square rounded-xl overflow-hidden bg-neutral-100 cursor-pointer transition-all ${
                    selectedImage === i
                      ? "border-2 border-neutral-900"
                      : "border border-transparent hover:border-neutral-200 opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt=""
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <nav className="flex text-xs text-neutral-400 mb-6 gap-2 flex-wrap">
            <Link
              href="/catalog"
              className="hover:text-neutral-900 transition-colors"
            >
              Каталог
            </Link>
            <span>/</span>
            <Link
              href={`/catalog?occasion=${primaryOccasion}`}
              className="hover:text-neutral-900 transition-colors"
            >
              {occasionLabel}
            </Link>
            <span>/</span>
            <span className="text-neutral-900">{bouquet.name}</span>
          </nav>

          <h1 className="text-3xl lg:text-4xl font-medium tracking-tight text-neutral-900 mb-2">
            {bouquet.name}
          </h1>
          <div className="flex items-center gap-4 mb-8">
            <span className="text-2xl font-medium text-neutral-900 tracking-tight">
              {bouquet.price.toLocaleString("ru-RU")} ₽
            </span>
            <div className="flex items-center gap-1 text-xs font-medium text-yellow-500 bg-yellow-50 px-2 py-1 rounded-md">
              <Iconify icon="solar:star-bold" width={14} height={14} />
              {bouquet.rating}{" "}
              <span className="text-neutral-400 font-normal ml-1">
                ({bouquet.reviewsCount})
              </span>
            </div>
          </div>

          {/* Social proof */}
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center gap-1.5 text-xs text-neutral-500">
              <span className="relative flex w-2 h-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              {viewersCount} человек смотрят сейчас
            </span>
            {bouquet.stock !== undefined && bouquet.stock <= 5 && (
              <span className="text-xs font-medium px-2 py-0.5 bg-amber-50 text-amber-700 rounded-full">
                Осталось {bouquet.stock} шт
              </span>
            )}
          </div>

          <p className="text-sm text-neutral-500 leading-relaxed mb-8">
            {bouquet.description}
          </p>

          <div ref={addToCartRef} className="flex items-center gap-4 mb-8">
            <QuantityStepper value={quantity} onChange={setQuantity} />
            <button
              type="button"
              onClick={handleAddToCart}
              className={`flex-1 h-12 text-sm font-medium rounded-full transition-all shadow-sm flex items-center justify-center gap-2 ${
                addedToCart
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-neutral-900 text-white hover:bg-neutral-800"
              }`}
            >
              {addedToCart ? (
                <>
                  Добавлено <Iconify icon="solar:check-circle-bold" width={18} height={18} />
                </>
              ) : (
                <>
                  В корзину <Iconify icon="solar:bag-3-linear" width={18} height={18} />
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => toggleFavorite(bouquet.id)}
              aria-label={fav ? "Убрать из избранного" : "В избранное"}
              aria-pressed={fav}
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${
                fav
                  ? "bg-rose-500 border-rose-500 text-white hover:bg-rose-600 hover:border-rose-600"
                  : "bg-white border-neutral-200 text-neutral-500 hover:text-rose-500 hover:border-rose-300"
              }`}
            >
              <Iconify
                icon={fav ? "solar:heart-bold" : "solar:heart-linear"}
                width={20}
                height={20}
              />
            </button>
          </div>

          <div className="border-t border-neutral-100 divide-y divide-neutral-100">
            <details className="group py-4" open>
              <summary className="flex justify-between items-center font-medium text-sm cursor-pointer list-none text-neutral-900">
                Состав
                <span className="transition group-open:rotate-180">
                  <Iconify icon="solar:alt-arrow-down-linear" width={16} height={16} />
                </span>
              </summary>
              <div className="text-sm text-neutral-500 mt-4 space-y-2">
                {bouquet.composition.map((item) => (
                  <div
                    key={item.name}
                    className="flex justify-between items-center"
                  >
                    <span>{item.name}</span>
                    <span
                      className="text-neutral-400 border-b border-dotted border-neutral-200 flex-grow mx-2"
                      style={{ minHeight: 1 }}
                    />
                    <span>{item.count}</span>
                  </div>
                ))}
              </div>
            </details>
            <details className="group py-4">
              <summary className="flex justify-between items-center font-medium text-sm cursor-pointer list-none text-neutral-900">
                Доставка и оплата
                <span className="transition group-open:rotate-180">
                  <Iconify icon="solar:alt-arrow-down-linear" width={16} height={16} />
                </span>
              </summary>
              <div className="text-sm text-neutral-500 mt-4 leading-relaxed">
                Бесплатная доставка по городу от 3000 ₽. Время доставки от 60
                минут после сборки. Оплата картой, СБП или наличными курьеру.
              </div>
            </details>
          </div>
        </div>
      </div>
      {/* Recently viewed */}
      <RecentlyViewedStrip exclude={slug} />

      {/* Sticky mobile CTA */}
      <div
        className={`sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur border-t border-neutral-100 px-4 py-3 pb-safe transition-transform duration-300 ${
          stickyVisible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-neutral-900 truncate">{bouquet.name}</p>
            <p className="text-xs text-neutral-500">{bouquet.price.toLocaleString("ru-RU")} ₽</p>
          </div>
          <button
            type="button"
            onClick={handleAddToCart}
            className={`px-5 py-2.5 text-sm font-medium rounded-full transition-all flex-shrink-0 ${
              addedToCart
                ? "bg-green-600 text-white"
                : "bg-neutral-900 text-white hover:bg-neutral-800"
            }`}
          >
            {addedToCart ? "Добавлено ✓" : "В корзину"}
          </button>
        </div>
      </div>
    </main>
  );
}
