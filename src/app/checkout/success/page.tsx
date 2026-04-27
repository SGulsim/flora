"use client";

import { useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/shared/context/cart-context";
import { Iconify } from "@/shared/ui/icon";
import { CheckoutSteps } from "@/shared/ui/checkout-steps";
import { Confetti } from "@/shared/ui/confetti";

function SuccessContent() {
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const orderId = searchParams.get("orderId") ?? `FL-${Math.floor(1000 + Math.random() * 9000)}`;

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <main className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <Confetti />
      <CheckoutSteps current={3} />
      <div className="w-20 h-20 rounded-full bg-green-50 text-green-500 flex items-center justify-center mx-auto mb-6">
        <Iconify icon="solar:check-read-linear" width={40} height={40} />
      </div>
      <h1 className="text-2xl font-medium tracking-tight text-neutral-900 mb-2">
        Заказ успешно оформлен!
      </h1>
      <p className="text-sm text-neutral-500 mb-8">
        Номер вашего заказа:{" "}
        <span className="font-medium text-neutral-900">#{String(orderId).replace(/^FL-/, "")}</span>
      </p>
      <div className="bg-white border border-neutral-100 rounded-2xl p-6 mb-8 text-left text-sm space-y-3 shadow-sm">
        <div className="flex justify-between">
          <span className="text-neutral-500">Статус</span>
          <span className="font-medium text-neutral-900">В обработке</span>
        </div>
        <div className="flex justify-between">
          <span className="text-neutral-500">Доставка</span>
          <span className="font-medium text-neutral-900">
            Сегодня, 14:00 - 15:00
          </span>
        </div>
      </div>
      <div className="flex gap-4 justify-center">
        <Link
          href="/"
          className="px-6 py-2.5 bg-neutral-900 text-white text-sm font-medium rounded-full hover:bg-neutral-800 transition-all"
        >
          На главную
        </Link>
        <Link
          href="/catalog"
          className="px-6 py-2.5 bg-white border border-neutral-200 text-neutral-900 text-sm font-medium rounded-full hover:bg-neutral-50 transition-all"
        >
          В каталог
        </Link>
      </div>
    </main>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center">Загрузка...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
