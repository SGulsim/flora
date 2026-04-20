"use client";

import Link from "next/link";
import { useCart } from "@/shared/context/cart-context";
import { useAuth } from "@/shared/context/auth-context";
import { Iconify } from "./icon";

export function Header() {
  const { itemCount } = useCart();
  const { isLoggedIn } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <button
          className="lg:hidden p-2 -ml-2 text-neutral-500 hover:text-neutral-900 transition-colors"
          aria-label="Меню"
        >
          <Iconify icon="solar:hamburger-menu-linear" width={24} height={24} />
        </button>

        <Link
          href="/"
          className="text-xl font-semibold tracking-tighter text-neutral-900 uppercase"
        >
          FLORA
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          <Link
            href="/catalog"
            className="text-sm text-neutral-500 hover:text-neutral-900 font-medium transition-colors"
          >
            Каталог
          </Link>
          <Link
            href="/quiz"
            className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            Подобрать букет
          </Link>
          <Link
            href="/subscription"
            className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            Подписка
          </Link>
          <Link
            href="/about"
            className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            О нас
          </Link>
          <Link
            href="/support"
            className="text-sm text-rose-600 hover:text-rose-700 font-medium transition-colors inline-flex items-center gap-1.5"
          >
            <Iconify icon="solar:heart-linear" width={16} height={16} />
            Поддержать
          </Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/catalog"
            className="hidden sm:flex p-2 text-neutral-500 hover:text-neutral-900 transition-colors"
            aria-label="Поиск"
          >
            <Iconify icon="solar:magnifer-linear" width={22} height={22} />
          </Link>
          <Link
            href={isLoggedIn ? "/account" : "/login"}
            className="hidden sm:flex p-2 text-neutral-500 hover:text-neutral-900 transition-colors"
            aria-label={isLoggedIn ? "Личный кабинет" : "Войти"}
          >
            <Iconify icon="solar:user-circle-linear" width={22} height={22} />
          </Link>
          <Link
            href="/cart"
            className="relative p-2 text-neutral-900 transition-colors group"
            aria-label="Корзина"
          >
            <Iconify icon="solar:bag-3-linear" width={22} height={22} />
            {itemCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-neutral-900 text-white text-xs font-medium rounded-full flex items-center justify-center border-2 border-white">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
