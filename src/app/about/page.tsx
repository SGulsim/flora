import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">

      {/* Hero */}
      <div className="mb-14">
        <h1 className="text-3xl font-medium tracking-tight text-neutral-900 mb-4">
          О нас
        </h1>
        <p className="text-neutral-600 leading-relaxed mb-3">
          FLORA — цветочный магазин, который доставляет свежие букеты с любовью
          к деталям. Каждую композицию мы собираем вручную, выбирая только
          качественные цветы и минималистичную упаковку.
        </p>
        <p className="text-neutral-600 leading-relaxed">
          Доставка по городу от 60 минут · Бесплатно при заказе от 3 000 ₽.
        </p>
      </div>

      {/* Creators */}
      <div className="bg-neutral-50 rounded-2xl sm:rounded-3xl p-5 sm:p-8 mb-10">
        <div className="mb-8">
          <h2 className="text-xl font-medium tracking-tight text-neutral-900 mb-1">
            Создатели проекта
          </h2>
          <p className="text-sm text-neutral-400">
            Свяжитесь с нами — отсканируйте QR‑код или напишите в Telegram
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 sm:gap-8">
          {/* Гульсим */}
          <div className="flex flex-col items-center">
            <div className="bg-white rounded-2xl p-4 shadow-sm mb-3 w-full flex items-center justify-center">
              <Image
                src="/qr-gsaralieva.png"
                alt="QR @GSARALIEVA"
                width={160}
                height={160}
                className="rounded-xl"
              />
            </div>
            <p className="text-sm font-medium text-neutral-900">Саралиева Гульсим</p>
            <p className="text-xs text-neutral-400 mt-0.5">@GSARALIEVA</p>
          </div>

          {/* Дарья */}
          <div className="flex flex-col items-center">
            <div className="bg-white rounded-2xl p-4 shadow-sm mb-3 w-full flex items-center justify-center">
              <Image
                src="/qr-ezik-lovik.png"
                alt="QR @EZIK_LOVIK"
                width={160}
                height={160}
                className="rounded-xl"
              />
            </div>
            <p className="text-sm font-medium text-neutral-900">Горбунова Дарья</p>
            <p className="text-xs text-neutral-400 mt-0.5">@EZIK_LOVIK</p>
          </div>
        </div>
      </div>

      <Link
        href="/catalog"
        className="inline-block px-6 py-3 bg-neutral-900 text-white text-sm font-medium rounded-full hover:bg-neutral-800 transition-all"
      >
        Смотреть каталог
      </Link>
    </main>
  );
}
