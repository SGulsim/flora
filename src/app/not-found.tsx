import Link from "next/link";

export default function NotFound() {
  return (
    <main className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
      <h1 className="text-6xl lg:text-8xl font-medium tracking-tighter text-neutral-200 mb-4">
        404
      </h1>
      <p className="text-lg font-medium text-neutral-900 mb-2">
        Страница не найдена
      </p>
      <p className="text-sm text-neutral-500 mb-8">
        Кажется, букет, который вы ищете, уже завял или его никогда не
        существовало.
      </p>
      <Link
        href="/catalog"
        className="inline-block px-6 py-3 bg-white border border-neutral-200 text-neutral-900 text-sm font-medium rounded-full hover:bg-neutral-50 transition-all shadow-sm"
      >
        Вернуться в каталог
      </Link>
    </main>
  );
}
