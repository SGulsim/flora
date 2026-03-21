import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <h1 className="text-3xl font-medium tracking-tight text-neutral-900 mb-8">
        О нас
      </h1>
      <div className="prose prose-neutral max-w-none">
        <p className="text-neutral-600 leading-relaxed mb-6">
          FLORA — цветочный магазин, который доставляет свежие букеты с любовью к
          деталям. Мы собираем каждую композицию вручную, выбирая только
          качественные цветы и минималистичную упаковку.
        </p>
        <p className="text-neutral-600 leading-relaxed mb-6">
          Доставка по городу от 60 минут. Бесплатная доставка при заказе от 3000 ₽.
        </p>
      </div>
      <Link
        href="/catalog"
        className="inline-block mt-8 px-6 py-3 bg-neutral-900 text-white text-sm font-medium rounded-full hover:bg-neutral-800 transition-all"
      >
        Смотреть каталог
      </Link>
    </main>
  );
}
