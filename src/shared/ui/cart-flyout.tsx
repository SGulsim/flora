"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/shared/context/cart-context";
import { Iconify } from "./icon";

export function CartFlyout() {
  const { items, total, itemCount, isFlyoutOpen, closeFlyout, removeItem, updateQuantity } = useCart();

  useEffect(() => {
    if (!isFlyoutOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeFlyout(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isFlyoutOpen, closeFlyout]);

  useEffect(() => {
    document.body.style.overflow = isFlyoutOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isFlyoutOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[150] bg-neutral-900/40 backdrop-blur-sm transition-opacity duration-300 ${
          isFlyoutOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeFlyout}
        aria-hidden="true"
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Корзина"
        className={`fixed top-0 right-0 bottom-0 z-[160] w-full max-w-sm bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)] ${
          isFlyoutOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-medium text-neutral-900">Корзина</h2>
            {itemCount > 0 && (
              <span className="text-xs text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded-full">
                {itemCount}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={closeFlyout}
            className="p-2 text-neutral-400 hover:text-neutral-700 transition-colors rounded-lg hover:bg-neutral-50"
          >
            <Iconify icon="solar:close-square-linear" width={20} height={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <div className="text-5xl">🛒</div>
              <div>
                <p className="text-sm font-medium text-neutral-700 mb-1">Корзина пуста</p>
                <p className="text-xs text-neutral-400">Добавьте букет из каталога</p>
              </div>
              <Link
                href="/catalog"
                onClick={closeFlyout}
                className="px-5 py-2.5 bg-neutral-900 text-white text-sm font-medium rounded-full hover:bg-neutral-800 transition-all"
              >
                В каталог
              </Link>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.bouquetId} className="flex gap-3">
                  <div className="relative w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden bg-neutral-100">
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-neutral-900 truncate mb-1">{item.name}</p>
                    <p className="text-xs text-neutral-500 mb-2">{item.price.toLocaleString("ru-RU")} ₽</p>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.bouquetId, item.quantity - 1)}
                        className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-600 hover:bg-neutral-200 transition-colors text-sm font-medium"
                      >
                        −
                      </button>
                      <span className="text-xs font-medium text-neutral-900 w-5 text-center">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.bouquetId, item.quantity + 1)}
                        className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-600 hover:bg-neutral-200 transition-colors text-sm font-medium"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button
                      type="button"
                      onClick={() => removeItem(item.bouquetId)}
                      className="text-neutral-300 hover:text-red-400 transition-colors"
                    >
                      <Iconify icon="solar:trash-bin-trash-linear" width={16} height={16} />
                    </button>
                    <p className="text-sm font-medium text-neutral-900">
                      {(item.price * item.quantity).toLocaleString("ru-RU")} ₽
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-4 sm:px-6 py-4 sm:py-5 border-t border-neutral-100 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-neutral-500">Итого</span>
              <span className="text-lg font-semibold tracking-tight text-neutral-900">
                {total.toLocaleString("ru-RU")} ₽
              </span>
            </div>
            <Link
              href="/checkout"
              onClick={closeFlyout}
              className="block w-full py-3.5 bg-neutral-900 text-white text-sm font-medium rounded-full text-center hover:bg-neutral-800 transition-all"
            >
              Оформить заказ
            </Link>
            <Link
              href="/cart"
              onClick={closeFlyout}
              className="block w-full py-2.5 text-sm font-medium text-neutral-600 text-center hover:text-neutral-900 transition-colors"
            >
              Открыть корзину
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
