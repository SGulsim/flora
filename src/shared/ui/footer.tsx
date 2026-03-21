import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-white border-t border-neutral-100 pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="text-xl font-semibold tracking-tighter text-neutral-900 mb-4 inline-block uppercase"
            >
              FLORA
            </Link>
            <p className="text-xs text-neutral-500 mb-6 max-w-xs leading-relaxed">
              Доставляем эмоции и свежие цветы каждый день. Создано с любовью к
              минимализму.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-medium uppercase tracking-wider text-neutral-900 mb-4">
              Магазин
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/catalog"
                  className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
                >
                  Каталог
                </Link>
              </li>
              <li>
                <Link
                  href="/subscription"
                  className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
                >
                  Подписка
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-medium uppercase tracking-wider text-neutral-900 mb-4">
              Покупателям
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/delivery"
                  className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
                >
                  Доставка и оплата
                </Link>
              </li>
              <li>
                <Link
                  href="/account"
                  className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
                >
                  Личный кабинет
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-neutral-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-neutral-400">
            © {new Date().getFullYear()} Flora. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}
