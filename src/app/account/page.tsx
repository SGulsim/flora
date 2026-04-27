"use client";

import { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/shared/context/auth-context";
import { useFavorites } from "@/shared/context/favorites-context";
import { BOUQUETS, OCCASIONS } from "@/shared/lib/mock-data";
import { formatPhone } from "@/shared/lib/phone";

type Occasion = {
  id: string;
  date: string;
  type: string;
  recipientName: string;
  reminderDays: number;
};
import { ProductCard } from "@/features/catalog/product-card";
import { Iconify } from "@/shared/ui/icon";
import { OrderRowSkeleton } from "@/shared/ui/skeleton";

const OCCASION_TYPES = [
  ...OCCASIONS.map((o) => ({ id: o.id, label: o.label })),
  { id: "anniversary", label: "Годовщина" },
  { id: "other", label: "Другое" },
];

type SavedQuizSelection = {
  savedAt: string;
  answers: {
    occasion: string;
    budget: string;
    color: string[];
    size: string;
  };
  bouquetIds: string[];
};

type TabId = "profile" | "orders" | "occasions" | "subscriptions" | "favorites" | "collections";

function parseTab(tab: string | null): TabId {
  if (
    tab === "orders" ||
    tab === "occasions" ||
    tab === "subscriptions" ||
    tab === "favorites" ||
    tab === "collections"
  ) {
    return tab;
  }
  return "profile";
}

function AccountPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isLoggedIn, authHydrated, logout, updateProfile } = useAuth();
  const { favoriteIds } = useFavorites();
  const [activeTab, setActiveTab] = useState<TabId>("profile");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [occasions, setOccasions] = useState<Occasion[]>([]);
  const [showAddOccasion, setShowAddOccasion] = useState(false);
  const [newOccasion, setNewOccasion] = useState({
    date: "",
    type: "birthday",
    recipientName: "",
    reminderDays: 3,
  });
  const [quizCollections, setQuizCollections] = useState<SavedQuizSelection[]>([]);
  const [subscriptions, setSubscriptions] = useState<{ id: string; planName: string; price: number; startDate: string; name: string; comment: string }[]>([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!authHydrated) return;
    if (!isLoggedIn) {
      router.replace("/login?returnTo=/account");
      return;
    }
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone);
    }
  }, [authHydrated, isLoggedIn, user, router]);

  useEffect(() => {
    const tab = parseTab(searchParams.get("tab"));
    setActiveTab(tab);
  }, [searchParams]);

  const setTab = (tab: TabId) => {
    setActiveTab(tab);
    const params = new URLSearchParams(searchParams.toString());
    if (tab === "profile") params.delete("tab");
    else params.set("tab", tab);
    const q = params.toString();
    router.replace(q ? `/account?${q}` : "/account", { scroll: false });
  };

  // Load occasions from API
  useEffect(() => {
    if (!isLoggedIn) return;
    fetch("/api/occasions")
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data.occasions)) setOccasions(data.occasions); })
      .catch(() => {});
  }, [activeTab, showAddOccasion, isLoggedIn]);

  // Load quiz collections from API
  useEffect(() => {
    if (!isLoggedIn) return;
    fetch("/api/quiz-collections")
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data.collections)) setQuizCollections(data.collections.map((c: { savedAt: string; answers: SavedQuizSelection["answers"]; bouquetIds: string[] }) => ({ savedAt: c.savedAt, answers: c.answers, bouquetIds: c.bouquetIds }))); })
      .catch(() => {});
  }, [activeTab, isLoggedIn]);

  // Load subscriptions from API
  useEffect(() => {
    if (!isLoggedIn) return;
    fetch("/api/subscriptions")
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data.subscriptions)) setSubscriptions(data.subscriptions); })
      .catch(() => {});
  }, [activeTab, isLoggedIn]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({ name, email, phone });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleAddOccasion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOccasion.date || !newOccasion.recipientName) return;
    await fetch("/api/occasions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newOccasion),
    });
    const data = await fetch("/api/occasions").then((r) => r.json());
    if (Array.isArray(data.occasions)) setOccasions(data.occasions);
    setShowAddOccasion(false);
    setNewOccasion({ date: "", type: "birthday", recipientName: "", reminderDays: 3 });
  };

  const handleRemoveOccasion = async (id: string) => {
    await fetch(`/api/occasions/${id}`, { method: "DELETE" });
    setOccasions((prev) => prev.filter((o) => o.id !== id));
  };

  const getOccasionLabel = (occasionId: string) => {
    const map: Record<string, string> = {
      birthday: "День рождения",
      date: "Свидание",
      wedding: "Свадьба",
      "no-reason": "Без повода",
    };
    return map[occasionId] ?? occasionId;
  };

  const getBudgetLabel = (budgetId: string) => {
    const map: Record<string, string> = {
      low: "до 3 000 ₽",
      mid: "3 000 – 5 000 ₽",
      high: "5 000 – 10 000 ₽",
      premium: "от 10 000 ₽",
    };
    return map[budgetId] ?? budgetId;
  };

  const getSizeLabel = (sizeId: string) => {
    const map: Record<string, string> = {
      compact: "Компактный",
      medium: "Средний",
      luxury: "Роскошный",
      surprise: "Сюрприз",
    };
    return map[sizeId] ?? sizeId;
  };

  if (!authHydrated || !isLoggedIn) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <p className="text-sm text-neutral-500">Проверяем аккаунт…</p>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
      <h1 className="text-2xl font-medium tracking-tight text-neutral-900 mb-8">
        Личный кабинет
      </h1>
      {/* Mobile: horizontal scrollable tabs */}
      <div className="md:hidden -mx-4 px-4 mb-6 overflow-x-auto">
        <div className="flex gap-2 min-w-max pb-1">
          {(
            [
              { id: "profile", label: "Профиль" },
              { id: "orders", label: "Заказы" },
              { id: "occasions", label: "Поводы" },
              { id: "subscriptions", label: "Подписки" },
              { id: "collections", label: `Подборки${quizCollections.length > 0 ? ` (${quizCollections.length})` : ""}` },
              { id: "favorites", label: `Избранное${favoriteIds.length > 0 ? ` (${favoriteIds.length})` : ""}` },
            ] as { id: TabId; label: string }[]
          ).map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === t.id
                  ? "bg-neutral-900 text-white"
                  : "bg-white border border-neutral-200 text-neutral-600"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 lg:gap-12">
        <aside className="hidden md:block w-56 flex-shrink-0 space-y-1">
          <button
            type="button"
            onClick={() => setTab("profile")}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              activeTab === "profile"
                ? "bg-neutral-100 text-neutral-900"
                : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900"
            }`}
          >
            Профиль
          </button>
          <button
            type="button"
            onClick={() => setTab("orders")}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              activeTab === "orders"
                ? "bg-neutral-100 text-neutral-900"
                : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900"
            }`}
          >
            История заказов
          </button>
          <button
            type="button"
            onClick={() => setTab("occasions")}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              activeTab === "occasions"
                ? "bg-neutral-100 text-neutral-900"
                : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900"
            }`}
          >
            Мои поводы
          </button>
          <button
            type="button"
            onClick={() => setTab("subscriptions")}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              activeTab === "subscriptions"
                ? "bg-neutral-100 text-neutral-900"
                : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900"
            }`}
          >
            Подписки
          </button>
          <button
            type="button"
            onClick={() => setTab("collections")}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-between ${
              activeTab === "collections"
                ? "bg-neutral-100 text-neutral-900"
                : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900"
            }`}
          >
            <span>Подборки</span>
            {quizCollections.length > 0 && (
              <span className="text-xs font-medium text-neutral-400">
                {quizCollections.length}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setTab("favorites")}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-between ${
              activeTab === "favorites"
                ? "bg-neutral-100 text-neutral-900"
                : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900"
            }`}
          >
            <span>Избранное</span>
            {favoriteIds.length > 0 && (
              <span className="text-xs font-medium text-neutral-400">
                {favoriteIds.length}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-neutral-50 transition-colors mt-4"
          >
            Выйти
          </button>
        </aside>

        <div className="flex-1 bg-white border border-neutral-100 rounded-2xl sm:rounded-[2rem] p-4 sm:p-6 lg:p-8 shadow-sm min-w-0">
          {activeTab === "profile" && (
            <>
              <h2 className="text-lg font-medium tracking-tight text-neutral-900 mb-6">
                Личные данные
              </h2>
              <form onSubmit={handleSaveProfile} className="max-w-md space-y-4">
                <div>
                  <label className="block text-xs text-neutral-500 mb-1.5 ml-1">
                    Имя
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:border-neutral-300 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-500 mb-1.5 ml-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:border-neutral-300 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-500 mb-1.5 ml-1">
                    Телефон
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(formatPhone(e.target.value))}
                    placeholder="+7 (999) 000-00-00"
                    className="w-full px-4 py-3 text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:border-neutral-300 focus:outline-none transition-all"
                  />
                </div>
                <div className="pt-4 flex items-center gap-3">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-neutral-900 text-white text-sm font-medium rounded-full hover:bg-neutral-800 transition-all"
                  >
                    Сохранить изменения
                  </button>
                  {saved && (
                    <span className="text-sm text-green-600">Сохранено</span>
                  )}
                </div>
              </form>

            </>
          )}
          {activeTab === "orders" && (
            <OrdersTab />
          )}
          {activeTab === "occasions" && (
            <>
              <h2 className="text-lg font-medium tracking-tight text-neutral-900 mb-6">
                Мои поводы
              </h2>
              <p className="text-sm text-neutral-500 mb-6">
                Календарь важных дат — дни рождения, годовщины. Мы напомним вам
                заранее и предложим заказать букет.
              </p>
              <button
                type="button"
                onClick={() => setShowAddOccasion(true)}
                className="mb-6 px-6 py-2.5 bg-neutral-900 text-white text-sm font-medium rounded-full hover:bg-neutral-800 transition-all"
              >
                Добавить повод
              </button>

              {occasions.length === 0 ? (
                <p className="text-sm text-neutral-500">Пока нет сохранённых поводов</p>
              ) : (
                <ul className="space-y-4">
                  {occasions.map((occ) => (
                    <li
                      key={occ.id}
                      className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl"
                    >
                      <div>
                        <p className="font-medium text-neutral-900">
                          {OCCASION_TYPES.find((t) => t.id === occ.type)?.label ?? occ.type}
                          {occ.recipientName && ` — ${occ.recipientName}`}
                        </p>
                        <p className="text-sm text-neutral-500">
                          {new Date(occ.date).toLocaleDateString("ru-RU", {
                            day: "numeric",
                            month: "long",
                          })}{" "}
                          · напоминание за {occ.reminderDays} дн.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveOccasion(occ.id)}
                        className="text-neutral-400 hover:text-red-500"
                      >
                        <Iconify icon="solar:trash-bin-trash-linear" width={20} height={20} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {showAddOccasion && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-2xl p-5 mx-4 max-w-md w-full max-h-[90vh] overflow-y-auto">
                    <h3 className="text-lg font-medium mb-4">Добавить повод</h3>
                    <form onSubmit={handleAddOccasion} className="space-y-4">
                      <div>
                        <label className="block text-xs text-neutral-500 mb-1.5">
                          Дата
                        </label>
                        <input
                          type="date"
                          required
                          value={newOccasion.date}
                          onChange={(e) =>
                            setNewOccasion((o) => ({ ...o, date: e.target.value }))
                          }
                          className="w-full px-4 py-3 text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-neutral-300"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-neutral-500 mb-1.5">
                          Повод
                        </label>
                        <select
                          value={newOccasion.type}
                          onChange={(e) =>
                            setNewOccasion((o) => ({ ...o, type: e.target.value }))
                          }
                          className="w-full px-4 py-3 text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-neutral-300"
                        >
                          {OCCASION_TYPES.map((t) => (
                            <option key={t.id} value={t.id}>
                              {t.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs text-neutral-500 mb-1.5">
                          Имя получателя
                        </label>
                        <input
                          type="text"
                          required
                          value={newOccasion.recipientName}
                          onChange={(e) =>
                            setNewOccasion((o) => ({ ...o, recipientName: e.target.value }))
                          }
                          placeholder="Мама"
                          className="w-full px-4 py-3 text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-neutral-300"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-neutral-500 mb-1.5">
                          Напоминать за (дней)
                        </label>
                        <select
                          value={newOccasion.reminderDays}
                          onChange={(e) =>
                            setNewOccasion((o) => ({
                              ...o,
                              reminderDays: Number(e.target.value),
                            }))
                          }
                          className="w-full px-4 py-3 text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-neutral-300"
                        >
                          <option value={1}>1 день</option>
                          <option value={2}>2 дня</option>
                          <option value={3}>3 дня</option>
                          <option value={7}>7 дней</option>
                        </select>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <button
                          type="submit"
                          className="flex-1 py-2.5 bg-neutral-900 text-white text-sm font-medium rounded-full hover:bg-neutral-800"
                        >
                          Добавить
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowAddOccasion(false)}
                          className="flex-1 py-2.5 border border-neutral-200 text-neutral-700 text-sm font-medium rounded-full hover:bg-neutral-50"
                        >
                          Отмена
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </>
          )}
          {activeTab === "collections" && (
            <>
              <h2 className="text-lg font-medium tracking-tight text-neutral-900 mb-6">
                Мои подборки
              </h2>
              {quizCollections.length === 0 ? (
                <div>
                  <p className="text-sm text-neutral-500 mb-5">
                    Пока нет сохранённых подборок. Пройдите квиз и нажмите «Сохранить подборку».
                  </p>
                  <Link
                    href="/quiz"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-all"
                  >
                    Пройти квиз
                    <Iconify icon="solar:arrow-right-linear" width={16} height={16} />
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {[...quizCollections].reverse().map((sel, idx) => (
                    <div key={idx} className="rounded-2xl border border-neutral-100 bg-neutral-50 p-4 sm:p-5">
                      <p className="text-xs text-neutral-400 mb-2">
                        Сохранено: {new Date(sel.savedAt).toLocaleString("ru-RU")}
                      </p>
                      <p className="text-sm text-neutral-600 mb-3">
                        Повод: {getOccasionLabel(sel.answers.occasion)} · Бюджет:{" "}
                        {getBudgetLabel(sel.answers.budget)} · Формат:{" "}
                        {getSizeLabel(sel.answers.size)}
                      </p>
                      <p className="text-sm text-neutral-500 mb-4">
                        В подборке:{" "}
                        {sel.bouquetIds
                          .slice(0, 3)
                          .map((id) => BOUQUETS.find((b) => b.id === id)?.name)
                          .filter(Boolean)
                          .join(", ")}
                        {sel.bouquetIds.length > 3 ? " и другие" : ""}.
                      </p>
                      <Link
                        href={`/quiz/results?occasion=${encodeURIComponent(sel.answers.occasion)}&budget=${encodeURIComponent(sel.answers.budget)}&size=${encodeURIComponent(sel.answers.size)}&color=${encodeURIComponent(sel.answers.color.join(","))}`}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-all"
                      >
                        Открыть подборку
                        <Iconify icon="solar:arrow-right-linear" width={16} height={16} />
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
          {activeTab === "favorites" && (
            <>
              <h2 className="text-lg font-medium tracking-tight text-neutral-900 mb-6">
                Избранное
              </h2>
              {favoriteIds.length === 0 ? (
                <div>
                  <p className="text-sm text-neutral-500 mb-5">
                    Пока пусто. Отмечайте понравившиеся букеты сердечком — они
                    появятся здесь.
                  </p>
                  <Link
                    href="/catalog"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-all"
                  >
                    Смотреть каталог
                    <Iconify icon="solar:arrow-right-linear" width={16} height={16} />
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favoriteIds
                    .map((id) => BOUQUETS.find((b) => b.id === id))
                    .filter((b): b is NonNullable<typeof b> => Boolean(b))
                    .map((bouquet) => (
                      <ProductCard key={bouquet.id} bouquet={bouquet} />
                    ))}
                </div>
              )}
            </>
          )}
          {activeTab === "subscriptions" && (
            <>
              <h2 className="text-lg font-medium tracking-tight text-neutral-900 mb-6">
                Мои подписки
              </h2>
              {subscriptions.length === 0 ? (
                <div>
                  <p className="text-sm text-neutral-500 mb-5">
                    Пока нет оформленных подписок.
                  </p>
                  <Link
                    href="/subscription"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-all"
                  >
                    Оформить подписку
                    <Iconify icon="solar:arrow-right-linear" width={16} height={16} />
                  </Link>
                </div>
              ) : (
                <ul className="space-y-4">
                  {subscriptions.map((sub) => (
                    <li
                      key={sub.id}
                      className="p-4 sm:p-5 bg-neutral-50 rounded-2xl border border-neutral-100"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                        <p className="font-medium text-neutral-900">{sub.planName}</p>
                        <span className="text-sm text-neutral-900">
                          от {sub.price.toLocaleString("ru-RU")} ₽ / раз
                        </span>
                      </div>
                      <p className="text-sm text-neutral-500">
                        Старт:{" "}
                        {new Date(sub.startDate).toLocaleDateString("ru-RU", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}{" "}
                        · получатель: {sub.name}
                      </p>
                      {sub.comment && (
                        <p className="text-sm text-neutral-500 mt-2">
                          Комментарий: {sub.comment}
                        </p>
                      )}
                      <p className="text-xs text-neutral-400 mt-3">Заявка #{sub.id}</p>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}

function getDisplayStatus(dateStr: string): { label: string; color: string } {
  const created = new Date(dateStr);
  const minutesAgo = (Date.now() - created.getTime()) / 60000;
  if (minutesAgo < 5) return { label: "Принят", color: "text-blue-600 bg-blue-50" };
  if (minutesAgo < 30) return { label: "Подтверждён", color: "text-purple-600 bg-purple-50" };
  if (minutesAgo < 90) return { label: "Собирается", color: "text-amber-600 bg-amber-50" };
  if (minutesAgo < 180) return { label: "В доставке", color: "text-orange-600 bg-orange-50" };
  return { label: "Доставлен", color: "text-green-600 bg-green-50" };
}

function OrdersTab() {
  const [orders, setOrders] = useState<
    { id: string; total: number; date: string; status: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetch("/api/orders")
      .then(async (r) => {
        if (!r.ok) throw new Error("bad_status");
        return r.json();
      })
      .then((data) => {
        if (!cancelled) {
          setOrders(Array.isArray(data.orders) ? data.orders : []);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError("Не удалось загрузить заказы. Проверьте подключение к серверу.");
          setOrders([]);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <h2 className="text-lg font-medium tracking-tight text-neutral-900 mb-6">
        История заказов
      </h2>
      {loading && (
        <div className="space-y-3">
          {[1,2,3].map(i => <OrderRowSkeleton key={i} />)}
        </div>
      )}
      {!loading && error && (
        <div className="rounded-xl border border-red-100 bg-red-50/80 p-4 text-sm text-red-700">
          {error}
          <button
            type="button"
            className="mt-3 block text-sm font-medium underline"
            onClick={() => window.location.reload()}
          >
            Обновить страницу
          </button>
        </div>
      )}
      {!loading && !error && orders.length === 0 && (
        <p className="text-sm text-neutral-500">Пока заказов нет</p>
      )}
      {!loading && !error && orders.length > 0 && (
        <ul className="space-y-4">
          {orders.map((o) => {
            const status = getDisplayStatus(o.date);
            return (
              <li
                key={o.id}
                className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl"
              >
                <div>
                  <p className="font-medium text-neutral-900">#{o.id.slice(0, 8)}</p>
                  <p className="text-sm text-neutral-500">
                    {new Date(o.date).toLocaleDateString("ru-RU")}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${status.color}`}>
                    {status.label}
                  </span>
                  <span className="font-medium text-neutral-900">
                    {o.total.toLocaleString("ru-RU")} ₽
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

export default function AccountPage() {
  return (
    <Suspense
      fallback={
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <p className="text-sm text-neutral-500">Загрузка личного кабинета…</p>
        </main>
      }
    >
      <AccountPageInner />
    </Suspense>
  );
}
