"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/shared/context/auth-context";
import {
  getOccasions,
  addOccasion,
  removeOccasion,
  type Occasion,
} from "@/shared/lib/occasions-store";
import { Iconify } from "@/shared/ui/icon";

const OCCASION_TYPES = [
  { id: "birthday", label: "День рождения" },
  { id: "anniversary", label: "Годовщина" },
  { id: "other", label: "Другое" },
];

export default function AccountPage() {
  const router = useRouter();
  const { user, isLoggedIn, logout, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<"profile" | "orders" | "occasions">(
    "profile"
  );
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
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login");
      return;
    }
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone);
    }
  }, [isLoggedIn, user, router]);

  useEffect(() => {
    setOccasions(getOccasions());
  }, [activeTab, showAddOccasion]);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, email, phone });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleAddOccasion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOccasion.date || !newOccasion.recipientName) return;
    addOccasion(newOccasion);
    setOccasions(getOccasions());
    setShowAddOccasion(false);
    setNewOccasion({ date: "", type: "birthday", recipientName: "", reminderDays: 3 });
  };

  const handleRemoveOccasion = (id: string) => {
    removeOccasion(id);
    setOccasions(getOccasions());
  };

  if (!isLoggedIn) return null;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
      <h1 className="text-2xl font-medium tracking-tight text-neutral-900 mb-8">
        Личный кабинет
      </h1>
      <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
        <aside className="w-full md:w-56 flex-shrink-0 space-y-1">
          <button
            type="button"
            onClick={() => setActiveTab("profile")}
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
            onClick={() => setActiveTab("orders")}
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
            onClick={() => setActiveTab("occasions")}
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
            onClick={handleLogout}
            className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-neutral-50 transition-colors mt-4"
          >
            Выйти
          </button>
        </aside>

        <div className="flex-1 bg-white border border-neutral-100 rounded-[2rem] p-6 sm:p-8 shadow-sm">
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
                    onChange={(e) => setPhone(e.target.value)}
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
                  <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
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
        </div>
      </div>
    </main>
  );
}

function OrdersTab() {
  const [orders, setOrders] = useState<{ id: string; total: number; date: string; status: string }[]>([]);

  useEffect(() => {
    fetch("/api/orders")
      .then((r) => r.json())
      .then((data) => setOrders(data.orders ?? []))
      .catch(() => setOrders([]));
  }, []);

  return (
    <>
      <h2 className="text-lg font-medium tracking-tight text-neutral-900 mb-6">
        История заказов
      </h2>
      {orders.length === 0 ? (
        <p className="text-sm text-neutral-500">Пока заказов нет</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((o) => (
            <li
              key={o.id}
              className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl"
            >
              <div>
                <p className="font-medium text-neutral-900">#{o.id}</p>
                <p className="text-sm text-neutral-500">
                  {new Date(o.date).toLocaleDateString("ru-RU")} · {o.status}
                </p>
              </div>
              <span className="font-medium">{o.total.toLocaleString("ru-RU")} ₽</span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
