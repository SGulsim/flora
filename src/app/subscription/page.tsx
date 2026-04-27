import Link from "next/link";
import { SUBSCRIPTION_PLANS } from "@/shared/lib/mock-data";
import { Iconify } from "@/shared/ui/icon";

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Выберите тариф",
    text: "Раз в месяц или два — как вам комфортно.",
  },
  {
    step: "02",
    title: "Укажите адрес",
    text: "Доставим прямо домой или в офис в удобное время.",
  },
  {
    step: "03",
    title: "Получайте цветы",
    text: "Каждый раз — свежий авторский букет, собранный специально для вас.",
  },
];

export default function SubscriptionPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
      <div className="text-center mb-16">
        <span className="text-xs font-medium text-rose-500 tracking-widest uppercase mb-3 block">
          Цветочная подписка
        </span>
        <h1 className="text-3xl lg:text-4xl font-medium tracking-tight text-neutral-900 mb-4">
          Цветы каждый месяц — без усилий
        </h1>
        <p className="text-sm lg:text-base text-neutral-500 max-w-lg mx-auto leading-relaxed">
          Свежие авторские букеты к вам домой по расписанию. Забудьте про «не успел» —
          просто оформите подписку и получайте цветы, когда хочется.
        </p>
      </div>

      {/* Plan cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-20">
        {SUBSCRIPTION_PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`p-5 sm:p-7 lg:p-8 rounded-2xl sm:rounded-[2rem] bg-white relative flex flex-col ${
              plan.popular
                ? "border-2 border-neutral-900 shadow-lg"
                : "border border-neutral-200"
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-8 -translate-y-1/2 bg-neutral-900 text-white text-xs font-medium uppercase tracking-wider px-3 py-1 rounded-full">
                Популярно
              </div>
            )}
            <div className="mb-6">
              <h3 className="text-xl font-medium text-neutral-900 mb-1">{plan.name}</h3>
              <p className="text-xs text-rose-500 font-medium mb-3">{plan.tagline}</p>
              <p className="text-xs text-neutral-500 leading-relaxed">{plan.description}</p>
            </div>

            <div className="mb-6">
              <span className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900">
                {plan.price.toLocaleString("ru-RU")} ₽
              </span>
              <span className="text-sm font-normal text-neutral-400 ml-1">
                {plan.priceNote}
              </span>
              <p className="text-xs text-neutral-400 mt-1">
                ≈ {Math.round(plan.price / plan.deliveries).toLocaleString("ru-RU")} ₽ за букет
              </p>
            </div>

            <ul className="space-y-3 mb-8 text-sm text-neutral-600 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <Iconify
                    icon="solar:check-circle-bold"
                    width={18}
                    height={18}
                    className="text-neutral-900 flex-shrink-0"
                  />
                  {f}
                </li>
              ))}
            </ul>

            <Link
              href={`/subscription/checkout?plan=${plan.id}`}
              className={`block w-full py-3 text-sm font-medium rounded-full text-center transition-all ${
                plan.popular
                  ? "bg-neutral-900 text-white hover:bg-neutral-800"
                  : "bg-neutral-50 text-neutral-900 hover:bg-neutral-100 border border-neutral-200"
              }`}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>

      {/* How it works */}
      <div className="mb-20">
        <h2 className="text-2xl font-medium tracking-tight text-neutral-900 text-center mb-10">
          Как это работает
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {HOW_IT_WORKS.map((step) => (
            <div key={step.step} className="text-center">
              <div className="text-4xl font-light text-neutral-200 mb-3">{step.step}</div>
              <h3 className="text-base font-medium text-neutral-900 mb-2">{step.title}</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">{step.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-neutral-50 rounded-2xl sm:rounded-3xl p-5 sm:p-7 lg:p-8">
        <h2 className="text-xl font-medium tracking-tight text-neutral-900 mb-6">
          Частые вопросы
        </h2>
        <div className="space-y-4">
          {[
            {
              q: "Можно ли отменить подписку?",
              a: "Да, в любой момент — без штрафов и объяснений.",
            },
            {
              q: "Я могу выбрать состав букета?",
              a: "Мы подбираем лучшее по сезону. Если у вас есть предпочтения — укажите при оформлении.",
            },
            {
              q: "Когда будет первая доставка?",
              a: "В течение 1–3 рабочих дней после оформления подписки.",
            },
          ].map((faq) => (
            <details key={faq.q} className="group">
              <summary className="flex justify-between items-center text-sm font-medium text-neutral-900 py-3 border-b border-neutral-200 cursor-pointer list-none">
                {faq.q}
                <span className="transition-transform group-open:rotate-180 flex-shrink-0 ml-4">
                  <Iconify icon="solar:alt-arrow-down-linear" width={16} height={16} />
                </span>
              </summary>
              <p className="text-sm text-neutral-500 pt-3 pb-1 leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </main>
  );
}
