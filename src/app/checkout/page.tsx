"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/shared/context/cart-context";
import { useAuth } from "@/shared/context/auth-context";
import { formatPhone, isValidPhone } from "@/shared/lib/phone";

const DELIVERY_SLOTS = [
  { id: "soon", label: "Ближайшее", time: "от 60 мин" },
  { id: "morning", label: "Утро", time: "9:00 - 12:00" },
  { id: "day", label: "День", time: "12:00 - 18:00" },
  { id: "evening", label: "Вечер", time: "18:00 - 22:00" },
];

const CARD_TEMPLATES = [
  "С днем рождения! Пусть каждый день будет наполнен радостью и теплом.",
  "Спасибо за все, что ты делаешь. Этот букет — с любовью.",
  "Прости меня. Очень ценю тебя и наши отношения.",
  "Ты делаешь мой мир ярче. Обнимаю!",
];

export default function CheckoutPage() {
  const router = useRouter();
  const { isLoggedIn, authHydrated } = useAuth();
  const { items, total } = useCart();
  const [redirecting, setRedirecting] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState("today");
  const [deliverySlot, setDeliverySlot] = useState("soon");
  const [cardEnabled, setCardEnabled] = useState(true);
  const [cardText, setCardText] = useState("");
  const [payment, setPayment] = useState("card");
  const [phoneValue, setPhoneValue] = useState("");
  const [phoneError, setPhoneError] = useState("");

  useEffect(() => {
    if (!authHydrated) return;
    if (!isLoggedIn) {
      setRedirecting(true);
      router.replace("/login?returnTo=/checkout");
    }
  }, [authHydrated, isLoggedIn, router]);

  useEffect(() => {
    if (!authHydrated || !isLoggedIn) return;
    if (items.length === 0) {
      setRedirecting(true);
      router.replace("/cart");
    }
  }, [authHydrated, isLoggedIn, items.length, router]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setPhoneValue(formatted);
    setPhoneError("");
  };

  const applyCardTemplate = (text: string) => {
    setCardText(text.slice(0, 200));
  };

  const handleSubmit = async () => {
    if (!phoneValue.trim()) {
      setPhoneError("Введите номер телефона");
      return;
    }
    if (!isValidPhone(phoneValue)) {
      setPhoneError("Введите корректный номер: +7 (999) 000-00-00");
      return;
    }
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ bouquetId: i.bouquetId, quantity: i.quantity })),
          total,
          cardText: cardEnabled ? cardText : null,
        }),
      });
      const data = await res.json();
      if (data.orderId) {
        router.push(`/checkout/success?orderId=${data.orderId}`);
      } else {
        router.push("/checkout/success");
      }
    } catch {
      router.push("/checkout/success");
    }
  };

  if (!authHydrated) {
    return (
      <main className="max-w-lg mx-auto px-4 py-16 text-center">
        <p className="text-sm text-neutral-500">Загрузка…</p>
      </main>
    );
  }

  if (!isLoggedIn || redirecting) {
    return (
      <main className="max-w-lg mx-auto px-4 py-16 text-center">
        <p className="text-sm text-neutral-500 mb-4">
          Для оформления заказа войдите в аккаунт — так заказ сохранится в истории.
        </p>
        <p className="text-xs text-neutral-400">Перенаправляем…</p>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="max-w-lg mx-auto px-4 py-16 text-center">
        <p className="text-sm text-neutral-500 mb-4">Корзина пуста.</p>
        <p className="text-xs text-neutral-400">Перенаправляем в каталог…</p>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
      <h1 className="text-2xl font-medium tracking-tight text-neutral-900 mb-2">
        Оформление заказа
      </h1>
      <p className="text-sm text-neutral-500 mb-8">
        Доставка, открытка и оплата — на одном экране.
      </p>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1 space-y-8">
          <section className="bg-white p-6 sm:p-8 rounded-[2rem] border border-neutral-100 shadow-sm">
            <h2 className="text-lg font-medium tracking-tight text-neutral-900 mb-6">
              Получатель и адрес
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs text-neutral-500 mb-1.5 ml-1">
                  Город и улица
                </label>
                <input
                  type="text"
                  placeholder="Москва, ул. Тверская..."
                  className="w-full px-4 py-3 text-sm bg-neutral-50 border border-transparent rounded-xl focus:bg-white focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900/5 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs text-neutral-500 mb-1.5 ml-1">
                  Квартира / Офис
                </label>
                <input
                  type="text"
                  placeholder="142"
                  className="w-full px-4 py-3 text-sm bg-neutral-50 border border-transparent rounded-xl focus:bg-white focus:border-neutral-300 focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs text-neutral-500 mb-1.5 ml-1">
                  Подъезд
                </label>
                <input
                  type="text"
                  placeholder="3"
                  className="w-full px-4 py-3 text-sm bg-neutral-50 border border-transparent rounded-xl focus:bg-white focus:border-neutral-300 focus:outline-none transition-all"
                />
              </div>
              <div className="sm:col-span-2 mt-2 border-t border-neutral-100 pt-6">
                <label className="flex items-center gap-3 cursor-pointer group custom-checkbox mb-4">
                  <input type="checkbox" className="hidden" defaultChecked />
                  <div className="w-4 h-4 rounded border border-neutral-300 bg-white flex items-center justify-center transition-colors">
                    <svg
                      className="w-2.5 h-2.5 text-white opacity-0 transform scale-50 transition-all"
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
                  <span className="text-sm text-neutral-900">Я получатель</span>
                </label>
              </div>
              <div>
                <label className="block text-xs text-neutral-500 mb-1.5 ml-1">
                  Имя
                </label>
                <input
                  type="text"
                  placeholder="Иван"
                  className="w-full px-4 py-3 text-sm bg-neutral-50 border border-transparent rounded-xl focus:bg-white focus:border-neutral-300 focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs text-neutral-500 mb-1.5 ml-1">
                  Телефон
                </label>
                <input
                  type="tel"
                  value={phoneValue}
                  onChange={handlePhoneChange}
                  placeholder="+7 (999) 000-00-00"
                  className={`w-full px-4 py-3 text-sm bg-neutral-50 border rounded-xl focus:bg-white focus:outline-none transition-all ${
                    phoneError ? "border-red-300" : "border-transparent focus:border-neutral-300"
                  }`}
                />
                {phoneError && (
                  <p className="text-xs text-red-500 mt-1 ml-1">{phoneError}</p>
                )}
              </div>
            </div>
          </section>

          <section className="bg-white p-6 sm:p-8 rounded-[2rem] border border-neutral-100 shadow-sm">
            <h2 className="text-lg font-medium tracking-tight text-neutral-900 mb-6">
              Дата и время
            </h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {(["today", "tomorrow", "pick"] as const).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDeliveryDate(d)}
                  className={`px-4 py-2 text-sm font-medium rounded-xl transition-colors ${
                    deliveryDate === d
                      ? "bg-neutral-900 text-white"
                      : "bg-neutral-50 text-neutral-600 hover:bg-neutral-100"
                  }`}
                >
                  {d === "today" ? "Сегодня" : d === "tomorrow" ? "Завтра" : "Выбрать дату"}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {DELIVERY_SLOTS.map((slot) => (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => setDeliverySlot(slot.id)}
                  className={`px-3 py-2 text-xs font-medium rounded-xl text-center transition-colors ${
                    deliverySlot === slot.id
                      ? "border-2 border-neutral-900 text-neutral-900"
                      : "border border-neutral-200 text-neutral-600 hover:border-neutral-300"
                  }`}
                >
                  {slot.label}
                  <br />
                  <span
                    className={
                      deliverySlot === slot.id ? "text-neutral-500" : "text-neutral-400"
                    }
                  >
                    {slot.time}
                  </span>
                </button>
              ))}
            </div>
          </section>

          <section className="bg-white p-6 sm:p-8 rounded-[2rem] border border-neutral-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium tracking-tight text-neutral-900">
                Бесплатная открытка
              </h2>
              <button
                type="button"
                role="switch"
                aria-checked={cardEnabled}
                onClick={() => setCardEnabled((v) => !v)}
                className="relative w-11 h-6 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-900/20"
                style={{ backgroundColor: cardEnabled ? "#171717" : "#e5e5e5" }}
              >
                <span
                  className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200"
                  style={{ transform: cardEnabled ? "translateX(20px)" : "translateX(0)" }}
                />
              </button>
            </div>
            <textarea
              rows={3}
              placeholder="Текст послания (до 200 символов)..."
              value={cardText}
              onChange={(e) => setCardText(e.target.value.slice(0, 200))}
              disabled={!cardEnabled}
              className="w-full px-4 py-3 text-sm bg-neutral-50 border border-transparent rounded-xl focus:bg-white focus:border-neutral-300 focus:outline-none resize-none transition-all disabled:opacity-50"
            />
            <div className="mt-4">
              <p className="text-xs text-neutral-500 mb-2">Быстрые шаблоны</p>
              <div className="flex flex-wrap gap-2">
                {CARD_TEMPLATES.map((template) => (
                  <button
                    key={template}
                    type="button"
                    disabled={!cardEnabled}
                    onClick={() => applyCardTemplate(template)}
                    className="px-3 py-1.5 text-xs rounded-full bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-colors disabled:opacity-50"
                  >
                    {template.length > 24 ? `${template.slice(0, 24)}...` : template}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-4 rounded-xl border border-neutral-100 bg-neutral-50 p-4">
              <p className="text-xs text-neutral-500 mb-2">Превью открытки</p>
              <p className="text-sm text-neutral-700 leading-relaxed min-h-[44px]">
                {cardEnabled
                  ? cardText.trim() || "Ваше послание появится здесь"
                  : "Открытка отключена"}
              </p>
            </div>
          </section>
        </div>

        <div className="w-full lg:w-80 flex-shrink-0">
          <div className="bg-white rounded-[2rem] p-6 lg:p-8 border border-neutral-100 shadow-sm sticky top-24">
            <h3 className="font-medium tracking-tight text-neutral-900 mb-4">
              Оплата
            </h3>
            <div className="space-y-3 mb-6">
              <label className="flex items-center gap-3 p-3 border border-neutral-200 rounded-xl cursor-pointer group custom-radio">
                <input
                  type="radio"
                  name="payment"
                  className="hidden"
                  checked={payment === "card"}
                  onChange={() => setPayment("card")}
                />
                <div className="w-4 h-4 rounded-full border border-neutral-300 flex items-center justify-center transition-colors">
                  <div
                    className={`w-2 h-2 rounded-full transform scale-50 transition-all ${
                      payment === "card" ? "bg-neutral-900 scale-100" : "bg-transparent"
                    }`}
                  />
                </div>
                <span className="text-sm font-medium text-neutral-900 flex-1">
                  Банковская карта
                </span>
              </label>
              <label className="flex items-center gap-3 p-3 border border-neutral-200 rounded-xl cursor-pointer group custom-radio">
                <input
                  type="radio"
                  name="payment"
                  className="hidden"
                  checked={payment === "sbp"}
                  onChange={() => setPayment("sbp")}
                />
                <div className="w-4 h-4 rounded-full border border-neutral-300 flex items-center justify-center transition-colors">
                  <div
                    className={`w-2 h-2 rounded-full transform scale-50 transition-all ${
                      payment === "sbp" ? "bg-neutral-900 scale-100" : "bg-transparent"
                    }`}
                  />
                </div>
                <span className="text-sm font-medium text-neutral-900 flex-1">
                  СБП (Система быстрых платежей)
                </span>
              </label>
            </div>

            <div className="border-t border-neutral-100 pt-4 mb-6">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-neutral-500">Итого</span>
                <span className="text-xl font-semibold tracking-tight text-neutral-900">
                  {total.toLocaleString("ru-RU")} ₽
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              className="w-full py-3.5 bg-neutral-900 text-white text-sm font-medium rounded-full hover:bg-neutral-800 transition-all shadow-sm mb-3"
            >
              Оплатить
            </button>
            <p className="text-xs text-neutral-500 text-center leading-relaxed px-2">
              Нажимая кнопку, вы соглашаетесь с{" "}
              <Link href="/about" className="underline hover:text-neutral-800">
                условиями оферты
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
