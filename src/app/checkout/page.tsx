"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/shared/context/cart-context";
import { useAuth } from "@/shared/context/auth-context";
import { formatPhone, isValidPhone } from "@/shared/lib/phone";
import { CheckoutSteps } from "@/shared/ui/checkout-steps";

function getSmartDeliveryHint(): string {
  const h = new Date().getHours();
  if (h < 12) return "Доступна доставка сегодня от 60 мин";
  if (h < 17) return "Доставим сегодня до 22:00";
  return "Сегодня вечером или завтра утром";
}

const RUSSIAN_CITIES = [
  "Москва", "Санкт-Петербург", "Новосибирск", "Екатеринбург", "Казань",
  "Нижний Новгород", "Челябинск", "Самара", "Омск", "Ростов-на-Дону",
  "Уфа", "Красноярск", "Воронеж", "Пермь", "Волгоград",
  "Краснодар", "Саратов", "Тюмень", "Тольятти", "Ижевск",
  "Барнаул", "Ульяновск", "Иркутск", "Хабаровск", "Ярославль",
  "Владивосток", "Махачкала", "Томск", "Оренбург", "Кемерово",
  "Новокузнецк", "Рязань", "Астрахань", "Набережные Челны", "Пенза",
  "Киров", "Липецк", "Тула", "Чебоксары", "Калининград",
  "Балашиха", "Курск", "Ставрополь", "Сочи", "Тверь",
  "Магнитогорск", "Брянск", "Иваново", "Белгород", "Владимир",
];

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

const MONTH_NAMES = [
  "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",
];
const DAY_NAMES = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

function MiniCalendar({ selected, onSelect }: { selected: Date | null; onSelect: (d: Date) => void }) {
  const [viewDate, setViewDate] = useState(() => new Date());
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDayOfWeek = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = [];
  for (let i = 0; i < firstDayOfWeek; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));

  return (
    <div className="mt-4 bg-neutral-50 rounded-2xl p-4 border border-neutral-100">
      <div className="flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={() => setViewDate(new Date(year, month - 1, 1))}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-neutral-200 transition-colors text-neutral-600"
        >
          ‹
        </button>
        <span className="text-sm font-medium text-neutral-900">
          {MONTH_NAMES[month]} {year}
        </span>
        <button
          type="button"
          onClick={() => setViewDate(new Date(year, month + 1, 1))}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-neutral-200 transition-colors text-neutral-600"
        >
          ›
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-1">
        {DAY_NAMES.map((d) => (
          <div key={d} className="text-center text-xs text-neutral-400 py-1 font-medium">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (!day) return <div key={`e${i}`} />;
          const isPast = day < today;
          const isSelected =
            selected &&
            selected.getFullYear() === day.getFullYear() &&
            selected.getMonth() === day.getMonth() &&
            selected.getDate() === day.getDate();
          const isToday = day.getTime() === today.getTime();
          return (
            <button
              key={i}
              type="button"
              disabled={isPast}
              onClick={() => onSelect(day)}
              className={[
                "h-8 w-full text-xs rounded-lg flex items-center justify-center transition-colors",
                isPast ? "text-neutral-300 cursor-default" : "cursor-pointer",
                isSelected ? "bg-neutral-900 text-white font-medium" : "",
                isToday && !isSelected ? "border border-neutral-900 text-neutral-900 font-medium" : "",
                !isPast && !isSelected && !isToday ? "hover:bg-neutral-200 text-neutral-700" : "",
              ].join(" ")}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function renderMarkdown(text: string) {
  if (!text) return null;
  const lines = text.split("\n");
  return lines.map((line, i) => {
    const parts = line.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
    return (
      <span key={i}>
        {parts.map((part, j) => {
          if (part.startsWith("**") && part.endsWith("**"))
            return <strong key={j}>{part.slice(2, -2)}</strong>;
          if (part.startsWith("*") && part.endsWith("*"))
            return <em key={j}>{part.slice(1, -1)}</em>;
          return part;
        })}
        {i < lines.length - 1 && <br />}
      </span>
    );
  });
}

export default function CheckoutPage() {
  const router = useRouter();
  const { isLoggedIn, authHydrated, user } = useAuth();
  const { items, total } = useCart();
  const [redirecting, setRedirecting] = useState(false);

  // Delivery
  const [deliveryDate, setDeliveryDate] = useState<"today" | "tomorrow" | "pick">("today");
  const [deliverySlot, setDeliverySlot] = useState("soon");
  const [pickedDate, setPickedDate] = useState<Date | null>(null);

  // Card
  const [cardEnabled, setCardEnabled] = useState(true);
  const [cardText, setCardText] = useState("");

  // Payment
  const [payment, setPayment] = useState("card");

  // Recipient
  const [isSelf, setIsSelf] = useState(true);
  const [recipientName, setRecipientName] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [phoneError, setPhoneError] = useState("");

  // Address
  const [addressValue, setAddressValue] = useState("");
  const [apartment, setApartment] = useState("");
  const [entrance, setEntrance] = useState("");
  const [citySuggestions, setCitySuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const addressRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Validation errors
  const [errors, setErrors] = useState<{ address?: string; name?: string }>({});

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

  // Autofill from profile when "Я получатель"
  useEffect(() => {
    if (isSelf && user) {
      setRecipientName(user.name || "");
      setPhoneValue(user.phone || "");
    } else if (!isSelf) {
      setRecipientName("");
      setPhoneValue("");
    }
  }, [isSelf, user]);

  // City autocomplete
  const handleAddressChange = (value: string) => {
    setAddressValue(value);
    setErrors((e) => ({ ...e, address: undefined }));
    const lower = value.toLowerCase().trim();
    if (lower.length < 2) {
      setCitySuggestions([]);
      setShowSuggestions(false);
      return;
    }
    const matches = RUSSIAN_CITIES.filter(
      (city) =>
        city.toLowerCase().startsWith(lower) ||
        city.toLowerCase().includes(lower)
    ).slice(0, 6);
    setCitySuggestions(matches);
    setShowSuggestions(matches.length > 0);
  };

  const selectCity = (city: string) => {
    setAddressValue(city + ", ");
    setCitySuggestions([]);
    setShowSuggestions(false);
    addressRef.current?.focus();
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(e.target as Node) &&
        addressRef.current &&
        !addressRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneValue(formatPhone(e.target.value));
    setPhoneError("");
  };

  const applyCardTemplate = (text: string) => {
    setCardText(text.slice(0, 200));
  };

  const handleSubmit = async () => {
    const newErrors: typeof errors = {};
    if (!addressValue.trim()) newErrors.address = "Укажите адрес доставки";
    if (!recipientName.trim()) newErrors.name = "Укажите имя получателя";
    if (!phoneValue.trim()) {
      setPhoneError("Введите номер телефона");
      return;
    }
    if (!isValidPhone(phoneValue)) {
      setPhoneError("Введите корректный номер: +7 (999) 000-00-00");
      return;
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
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
      <CheckoutSteps current={1} />
      <h1 className="text-2xl font-medium tracking-tight text-neutral-900 mb-2">
        Оформление заказа
      </h1>
      <p className="text-sm text-neutral-500 mb-8">
        Доставка, открытка и оплата — на одном экране.
      </p>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1 space-y-8">

          {/* Recipient & Address */}
          <section className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-[2rem] border border-neutral-100 shadow-sm">
            <h2 className="text-lg font-medium tracking-tight text-neutral-900 mb-6">
              Получатель и адрес
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* Address autocomplete */}
              <div className="sm:col-span-2 relative">
                <label className="block text-xs text-neutral-500 mb-1.5 ml-1">
                  Город и улица <span className="text-rose-500">*</span>
                </label>
                <input
                  ref={addressRef}
                  type="text"
                  value={addressValue}
                  onChange={(e) => handleAddressChange(e.target.value)}
                  onFocus={() => citySuggestions.length > 0 && setShowSuggestions(true)}
                  placeholder="Москва, ул. Тверская..."
                  autoComplete="off"
                  className={`w-full px-4 py-3 text-sm bg-neutral-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-neutral-900/5 transition-all ${
                    errors.address ? "border-red-300" : "border-transparent focus:border-neutral-300"
                  }`}
                />
                {errors.address && (
                  <p className="text-xs text-red-500 mt-1 ml-1">{errors.address}</p>
                )}
                {showSuggestions && citySuggestions.length > 0 && (
                  <div
                    ref={suggestionsRef}
                    className="absolute z-20 top-full left-0 right-0 mt-1 bg-white border border-neutral-200 rounded-xl shadow-lg overflow-hidden"
                  >
                    {citySuggestions.map((city) => (
                      <button
                        key={city}
                        type="button"
                        onMouseDown={() => selectCity(city)}
                        className="w-full text-left px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs text-neutral-500 mb-1.5 ml-1">
                  Квартира / Офис
                </label>
                <input
                  type="text"
                  value={apartment}
                  onChange={(e) => setApartment(e.target.value)}
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
                  value={entrance}
                  onChange={(e) => setEntrance(e.target.value)}
                  placeholder="3"
                  className="w-full px-4 py-3 text-sm bg-neutral-50 border border-transparent rounded-xl focus:bg-white focus:border-neutral-300 focus:outline-none transition-all"
                />
              </div>

              {/* "Я получатель" checkbox */}
              <div className="sm:col-span-2 mt-2 border-t border-neutral-100 pt-6">
                <label className="flex items-center gap-3 cursor-pointer group custom-checkbox mb-4 w-fit">
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={isSelf}
                    onChange={(e) => setIsSelf(e.target.checked)}
                  />
                  <div className="w-5 h-5 rounded border border-neutral-300 bg-white flex items-center justify-center transition-colors">
                    <svg
                      className="w-3.5 h-3.5 text-white opacity-0 transition-opacity"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm text-neutral-900">Я получатель</span>
                </label>
              </div>

              <div>
                <label className="block text-xs text-neutral-500 mb-1.5 ml-1">
                  Имя <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => {
                    setRecipientName(e.target.value);
                    setErrors((er) => ({ ...er, name: undefined }));
                  }}
                  placeholder="Иван"
                  className={`w-full px-4 py-3 text-sm bg-neutral-50 border rounded-xl focus:bg-white focus:border-neutral-300 focus:outline-none transition-all ${
                    errors.name ? "border-red-300" : "border-transparent"
                  }`}
                />
                {errors.name && (
                  <p className="text-xs text-red-500 mt-1 ml-1">{errors.name}</p>
                )}
              </div>
              <div>
                <label className="block text-xs text-neutral-500 mb-1.5 ml-1">
                  Телефон <span className="text-rose-500">*</span>
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

          {/* Delivery Date */}
          <section className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-[2rem] border border-neutral-100 shadow-sm">
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

            {deliveryDate === "pick" && (
              <>
                <MiniCalendar
                  selected={pickedDate}
                  onSelect={(d) => setPickedDate(d)}
                />
                {pickedDate && (
                  <p className="mt-2 text-xs text-neutral-500 ml-1">
                    Выбрано:{" "}
                    {pickedDate.toLocaleDateString("ru-RU", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                )}
              </>
            )}

            <p className="text-xs text-green-600 flex items-center gap-1.5 mt-2 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
              {getSmartDeliveryHint()}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
              {DELIVERY_SLOTS.map((slot) => (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => setDeliverySlot(slot.id)}
                  className={`px-3 py-2.5 text-xs font-medium rounded-xl text-center transition-colors ${
                    deliverySlot === slot.id
                      ? "border-2 border-neutral-900 text-neutral-900"
                      : "border border-neutral-200 text-neutral-600 hover:border-neutral-300"
                  }`}
                >
                  {slot.label}
                  <br />
                  <span className={deliverySlot === slot.id ? "text-neutral-500" : "text-neutral-400"}>
                    {slot.time}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* Card */}
          <section className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-[2rem] border border-neutral-100 shadow-sm">
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

            {cardEnabled && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-neutral-500 mb-1.5 ml-1">Текст послания</p>
                  <textarea
                    rows={4}
                    placeholder={"Текст послания (до 200 символов)...\n\nПоддерживается **жирный** и *курсив*"}
                    value={cardText}
                    onChange={(e) => setCardText(e.target.value.slice(0, 200))}
                    className="w-full px-4 py-3 text-sm bg-neutral-50 border border-transparent rounded-xl focus:bg-white focus:border-neutral-300 focus:outline-none resize-none transition-all font-mono"
                  />
                  <p className="text-xs text-neutral-400 mt-1 ml-1 text-right">
                    {cardText.length}/200
                  </p>
                  <div className="mt-3">
                    <p className="text-xs text-neutral-500 mb-2">Шаблоны</p>
                    <div className="flex flex-wrap gap-2">
                      {CARD_TEMPLATES.map((template) => (
                        <button
                          key={template}
                          type="button"
                          onClick={() => applyCardTemplate(template)}
                          className="px-3 py-1.5 text-xs rounded-full bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-colors"
                        >
                          {template.length > 24 ? `${template.slice(0, 24)}…` : template}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-neutral-500 mb-1.5 ml-1">Превью открытки</p>
                  <div className="h-full min-h-[120px] rounded-xl border border-neutral-100 bg-neutral-50 p-4">
                    <div className="text-sm text-neutral-700 leading-relaxed">
                      {cardText.trim() ? (
                        renderMarkdown(cardText)
                      ) : (
                        <span className="text-neutral-400">Ваше послание появится здесь</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {!cardEnabled && (
              <p className="text-sm text-neutral-400">Открытка отключена</p>
            )}
          </section>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-80 flex-shrink-0">
          <div className="bg-white rounded-2xl sm:rounded-[2rem] p-4 sm:p-6 lg:p-8 border border-neutral-100 shadow-sm lg:sticky lg:top-20">
            <h3 className="font-medium tracking-tight text-neutral-900 mb-4">Оплата</h3>
            <div className="space-y-3 mb-6">
              {[
                { id: "card", label: "Банковская карта" },
                { id: "sbp", label: "СБП (Система быстрых платежей)" },
              ].map((opt) => (
                <label
                  key={opt.id}
                  className="flex items-center gap-3 p-3 border border-neutral-200 rounded-xl cursor-pointer group custom-radio"
                >
                  <input
                    type="radio"
                    name="payment"
                    className="hidden"
                    checked={payment === opt.id}
                    onChange={() => setPayment(opt.id)}
                  />
                  <div className="w-4 h-4 rounded-full border border-neutral-300 flex items-center justify-center transition-colors">
                    <div
                      className={`w-2 h-2 rounded-full transform scale-50 transition-all ${
                        payment === opt.id ? "bg-neutral-900 scale-100" : "bg-transparent"
                      }`}
                    />
                  </div>
                  <span className="text-sm font-medium text-neutral-900 flex-1">{opt.label}</span>
                </label>
              ))}
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
              className="w-full py-3.5 bg-neutral-900 text-white text-sm font-medium rounded-full hover:bg-neutral-800 transition-all shadow-sm mb-3 cursor-pointer"
            >
              Оплатить
            </button>
            <p className="text-xs text-neutral-400 text-center leading-relaxed">
              * — обязательные поля
            </p>
            <p className="text-xs text-neutral-500 text-center leading-relaxed mt-1 px-2">
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
