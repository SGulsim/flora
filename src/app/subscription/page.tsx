import Link from "next/link";
import { SUBSCRIPTION_PLANS } from "@/shared/lib/mock-data";
import { Iconify } from "@/shared/ui/icon";

export default function SubscriptionPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24 text-center">
      <span className="text-xs font-medium text-rose-500 tracking-widest uppercase mb-3 block">
        Новинка
      </span>
      <h1 className="text-3xl lg:text-4xl font-medium tracking-tight text-neutral-900 mb-4">
        Цветочная подписка
      </h1>
      <p className="text-sm lg:text-base text-neutral-500 mb-12 max-w-lg mx-auto">
        Свежие авторские букеты у вас дома регулярно. Выберите удобный формат,
        остальное мы берем на себя.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
        {SUBSCRIPTION_PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`p-8 rounded-[2rem] bg-white relative ${
              plan.popular
                ? "border-2 border-neutral-900"
                : "border border-neutral-200 hover:border-neutral-300 transition-colors"
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-8 -translate-y-1/2 bg-neutral-900 text-white text-[10px] font-medium uppercase tracking-wider px-3 py-1 rounded-full">
                Популярно
              </div>
            )}
            <h3 className="text-xl font-medium text-neutral-900 mb-2">
              {plan.name}
            </h3>
            <p className="text-xs text-neutral-500 mb-6 h-8">{plan.description}</p>
            <div className="text-2xl font-semibold tracking-tight text-neutral-900 mb-6">
              от {plan.price.toLocaleString("ru-RU")} ₽{" "}
              <span className="text-sm font-normal text-neutral-400">/ раз</span>
            </div>
            <ul className="space-y-3 mb-8 text-sm text-neutral-600">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <Iconify
                    icon="solar:check-circle-linear"
                    width={18}
                    height={18}
                    className="text-neutral-900 flex-shrink-0"
                  />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="/checkout"
              className={`block w-full py-3 text-sm font-medium rounded-full text-center transition-all ${
                plan.popular
                  ? "bg-neutral-900 text-white hover:bg-neutral-800"
                  : "bg-neutral-50 text-neutral-900 hover:bg-neutral-100"
              }`}
            >
              {plan.popular ? "Оформить" : "Выбрать"}
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
