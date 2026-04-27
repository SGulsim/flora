import Link from "next/link";
import Image from "next/image";
import { Iconify } from "@/shared/ui/icon";
import { ProductCard } from "@/features/catalog/product-card";
import { FadeIn } from "@/shared/ui/fade-in";
import { BOUQUETS } from "@/shared/lib/mock-data";

const BENEFITS = [
  { icon: "solar:delivery-bold", label: "Доставка от 60 мин", sub: "по городу" },
  { icon: "solar:flower-bold", label: "Авторские букеты", sub: "каждый уникален" },
  { icon: "solar:letter-bold", label: "Открытка в подарок", sub: "к каждому заказу" },
  { icon: "solar:leaf-bold", label: "Эко-упаковка", sub: "без лишнего пластика" },
];

const REVIEWS = [
  {
    name: "Анна К.",
    text: "Заказывала на день рождения подруги. Букет был точно как на фото — нежный и аккуратный. Доставили вовремя, открытку написали красиво.",
    rating: 5,
    date: "15 апреля",
  },
  {
    name: "Михаил С.",
    text: "Беру цветы по подписке уже третий месяц. Каждый раз разные, всегда свежие. Жена в восторге!",
    rating: 5,
    date: "8 апреля",
  },
  {
    name: "Дарья Т.",
    text: "Очень удобный квиз — помог подобрать что-то для свадьбы. Атмосферный магазин, команда молодцы.",
    rating: 5,
    date: "2 апреля",
  },
];

export default function HomePage() {
  const featuredBouquets = BOUQUETS.filter((b) => b.isHit).slice(0, 6);
  const moreBouquets = BOUQUETS.filter((b) => !b.isHit).slice(0, 3);
  const allFeatured = [...featuredBouquets, ...moreBouquets].slice(0, 9);

  return (
    <main>
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-24 lg:pb-32 flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          <div className="flex-1 w-full text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-50 text-rose-600 text-xs font-medium mb-6">
              <Iconify icon="solar:routing-2-linear" width={14} height={14} />
              Доставка от 60 минут
            </div>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-medium tracking-tight text-neutral-900 mb-6 leading-[1.1]">
              Свежие цветы <br className="hidden lg:block" /> для особых моментов
            </h1>
            <p className="text-sm lg:text-base text-neutral-500 mb-8 max-w-lg mx-auto lg:mx-0">
              Собираем аккуратные букеты с любовью к деталям. Без лишней
              упаковки — только свежесть и эстетика в каждом стебле.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Link
                href="/catalog"
                className="w-full sm:w-auto px-6 py-3 bg-neutral-900 text-white text-sm font-medium rounded-full hover:bg-neutral-800 transition-all text-center"
              >
                Смотреть каталог
              </Link>
              <Link
                href="/quiz"
                className="w-full sm:w-auto px-6 py-3 bg-white border border-neutral-200 text-neutral-900 text-sm font-medium rounded-full hover:bg-neutral-50 transition-all text-center"
              >
                Подобрать по поводу
              </Link>
            </div>
          </div>
          <div className="flex-1 w-full relative">
            <div className="absolute inset-0 bg-rose-50/50 rounded-[2rem] transform rotate-3 scale-105 z-0" />
            <div className="relative z-10 aspect-[4/5] lg:aspect-square overflow-hidden rounded-[2rem] bg-neutral-50 border border-neutral-100/50">
              <Image
                src="/bouquets/hero.jpg"
                alt="Букет из розовых пионов"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Benefits strip ───────────────────────────────────── */}
      <section className="border-y border-neutral-100 bg-neutral-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-0 lg:divide-x divide-neutral-200">
            {BENEFITS.map((b, i) => (
              <FadeIn key={b.label} delay={i * 80} className="flex items-center gap-2 sm:gap-3 lg:px-8 first:pl-0 last:pr-0">
                <div className="w-9 h-9 rounded-xl bg-white border border-neutral-100 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Iconify icon={b.icon} width={18} height={18} className="text-neutral-700" />
                </div>
                <div>
                  <p className="text-xs font-medium text-neutral-900">{b.label}</p>
                  <p className="text-xs text-neutral-400">{b.sub}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Product grid ─────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <FadeIn className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-medium tracking-tight text-neutral-900">
            Популярные букеты
          </h2>
          <Link
            href="/catalog"
            className="text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors inline-flex items-center gap-1.5"
          >
            Весь каталог
            <Iconify icon="solar:arrow-right-linear" width={16} height={16} />
          </Link>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allFeatured.map((bouquet, i) => (
            <FadeIn key={bouquet.id} delay={i * 60}>
              <ProductCard bouquet={bouquet} />
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ─── Subscription CTA ─────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24">
        <FadeIn>
          <div className="relative overflow-hidden rounded-2xl sm:rounded-[2rem] bg-neutral-900 px-5 py-8 sm:px-8 sm:py-12 lg:px-14 lg:py-14">
            {/* Decorative blobs */}
            <div className="pointer-events-none absolute -top-20 -right-20 w-72 h-72 rounded-full bg-rose-500/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-violet-500/10 blur-3xl" />

            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="max-w-lg">
                <span className="inline-block text-xs font-medium text-rose-400 uppercase tracking-widest mb-4">
                  Подписка на цветы
                </span>
                <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-white mb-3 leading-snug">
                  Цветы каждый месяц — <br className="hidden sm:block" />без усилий
                </h2>
                <p className="text-neutral-400 text-sm leading-relaxed mb-4">
                  Свежие авторские букеты к вам домой по расписанию. Мы сами выберем
                  лучшее к сезону. Подписку можно отменить в любой момент.
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-neutral-500">
                  {["От 2 990 ₽/мес", "Бесплатная доставка", "Отмена в 1 клик"].map((f) => (
                    <span key={f} className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-rose-400 inline-block" />
                      {f}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col xs:flex-row sm:flex-row gap-2 sm:gap-3 flex-shrink-0 w-full sm:w-auto">
                <Link
                  href="/subscription"
                  className="px-6 py-3 bg-white text-neutral-900 rounded-full text-sm font-medium hover:bg-neutral-100 transition-all text-center"
                >
                  Выбрать тариф
                </Link>
                <Link
                  href="/subscription"
                  className="px-6 py-3 border border-white/20 text-white rounded-full text-sm font-medium hover:bg-white/10 transition-all text-center"
                >
                  Подробнее
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ─── Testimonials ─────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 lg:pb-28">
        <FadeIn className="mb-10">
          <h2 className="text-2xl font-medium tracking-tight text-neutral-900">
            Отзывы покупателей
          </h2>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {REVIEWS.map((r, i) => (
            <FadeIn key={r.name} delay={i * 100}>
              <div className="bg-white border border-neutral-100 rounded-2xl p-6 hover:shadow-sm transition-shadow h-full flex flex-col">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <Iconify key={j} icon="solar:star-bold" width={14} height={14} className="text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-neutral-600 leading-relaxed flex-1 mb-4">
                  &ldquo;{r.text}&rdquo;
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-neutral-900">{r.name}</span>
                  <span className="text-xs text-neutral-400">{r.date}</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
    </main>
  );
}
