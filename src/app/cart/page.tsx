"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/shared/context/cart-context";
import { ADDONS } from "@/shared/lib/mock-data";
import { Iconify } from "@/shared/ui/icon";
import { QuantityStepper } from "@/shared/ui/quantity-stepper";

export default function CartPage() {
  const { items, addons, removeItem, updateQuantity, addAddon, removeAddon, total, itemCount } = useCart();
  const freeDelivery = total >= 3000;

  if (items.length === 0) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-medium tracking-tight text-neutral-900 mb-4">
          Корзина пуста
        </h1>
        <p className="text-sm text-neutral-500 mb-8">
          Добавьте букеты из каталога
        </p>
        <Link
          href="/catalog"
          className="inline-block px-6 py-3 bg-neutral-900 text-white text-sm font-medium rounded-full hover:bg-neutral-800 transition-all"
        >
          В каталог
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
      <h1 className="text-2xl lg:text-3xl font-medium tracking-tight text-neutral-900 mb-8 lg:mb-12">
        Корзина
      </h1>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1 space-y-6">
          {items.map((item) => (
            <div
              key={item.bouquetId}
              className="flex gap-4 sm:gap-6 pb-6 border-b border-neutral-100"
            >
              <div className="w-24 sm:w-32 aspect-square rounded-2xl overflow-hidden bg-neutral-100 flex-shrink-0 relative">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="128px"
                />
              </div>
              <div className="flex flex-col flex-1 justify-between py-1">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-neutral-900 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-xs text-neutral-500">Стандартный размер</p>
                  </div>
                  <button
                    onClick={() => removeItem(item.bouquetId)}
                    className="text-neutral-400 hover:text-red-500 transition-colors"
                    aria-label="Удалить"
                  >
                    <Iconify
                      icon="solar:trash-bin-trash-linear"
                      width={20}
                      height={20}
                    />
                  </button>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <QuantityStepper
                    size="sm"
                    value={item.quantity}
                    onChange={(next) => updateQuantity(item.bouquetId, next)}
                  />
                  <span className="text-sm font-medium text-neutral-900 tracking-tight">
                    {(item.price * item.quantity).toLocaleString("ru-RU")} ₽
                  </span>
                </div>
              </div>
            </div>
          ))}

          <div className="pt-6">
            <h4 className="text-sm font-medium text-neutral-900 mb-4">
              Добавить к заказу
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {ADDONS.map((addon) => {
                const isAdded = addons.some((a) => a.id === addon.id);
                return (
                  <div
                    key={addon.id}
                    className={`border rounded-2xl p-3 flex flex-col items-center text-center group transition-colors ${
                      isAdded ? "border-neutral-300 bg-neutral-50" : "border-neutral-100 hover:border-neutral-200"
                    }`}
                  >
                    <div className="w-16 h-16 bg-neutral-50 rounded-full mb-3 flex items-center justify-center text-neutral-400 group-hover:text-rose-400 transition-colors">
                      <Iconify icon={addon.icon} width={28} height={28} />
                    </div>
                    <p className="text-xs font-medium text-neutral-900 mb-1">
                      {addon.name}
                    </p>
                    <p className="text-xs text-neutral-500 mb-3">
                      + {addon.price.toLocaleString("ru-RU")} ₽
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        isAdded
                          ? removeAddon(addon.id)
                          : addAddon({ id: addon.id, name: addon.name, price: addon.price })
                      }
                      className={`text-xs font-medium px-4 py-1.5 rounded-full w-full transition-colors ${
                        isAdded
                          ? "bg-neutral-900 text-white"
                          : "text-neutral-900 bg-neutral-100 group-hover:bg-neutral-900 group-hover:text-white"
                      }`}
                    >
                      {isAdded ? "Убрать" : "Добавить"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-80 xl:w-96 flex-shrink-0">
          <div className="bg-neutral-50 rounded-[2rem] p-6 lg:p-8 sticky top-24">
            <h3 className="text-lg font-medium tracking-tight text-neutral-900 mb-6">
              Итого
            </h3>
            <div className="space-y-4 text-sm mb-6">
              <div className="flex justify-between text-neutral-500">
                <span>Товары ({itemCount})</span>
                <span className="text-neutral-900">
                  {items.reduce((s, i) => s + i.price * i.quantity, 0).toLocaleString("ru-RU")} ₽
                </span>
              </div>
              {addons.length > 0 && addons.map((a) => (
                <div key={a.id} className="flex justify-between text-neutral-500">
                  <span>{a.name}</span>
                  <span className="text-neutral-900">{a.price.toLocaleString("ru-RU")} ₽</span>
                </div>
              ))}
              <div className="flex justify-between text-neutral-500">
                <span>Доставка</span>
                <span className="text-neutral-900">
                  {freeDelivery ? "Бесплатно" : "Уточняется при оформлении"}
                </span>
              </div>
            </div>
            <div className="pt-4 border-t border-neutral-200/60 flex justify-between items-center mb-8">
              <span className="font-medium text-neutral-900">К оплате</span>
              <span className="text-xl font-semibold tracking-tight text-neutral-900">
                {total.toLocaleString("ru-RU")} ₽
              </span>
            </div>
            <p className="text-xs text-neutral-500 mb-3 text-center">
              Оформление доступно после входа в аккаунт — заказ появится в истории.
            </p>
            <Link
              href="/checkout"
              className="block w-full py-3.5 bg-neutral-900 text-white text-sm font-medium rounded-full hover:bg-neutral-800 transition-all shadow-sm text-center"
            >
              Перейти к оформлению
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
