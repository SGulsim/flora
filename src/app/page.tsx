import Link from "next/link";
import Image from "next/image";
import { Iconify } from "@/shared/ui/icon";
import { ProductCard } from "@/features/catalog/product-card";
import { BOUQUETS } from "@/shared/lib/mock-data";

export default function HomePage() {
  const featuredBouquets = BOUQUETS.slice(0, 9);

  return (
    <main>
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
              упаковки, только свежесть и эстетика в каждом стебле.
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

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-medium tracking-tight text-neutral-900">
            Популярные букеты
          </h2>
          <Link
            href="/catalog"
            className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            Весь каталог →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredBouquets.map((bouquet) => (
            <ProductCard key={bouquet.id} bouquet={bouquet} />
          ))}
        </div>
      </section>
    </main>
  );
}
