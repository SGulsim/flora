"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/shared/context/cart-context";
import { useAuth } from "@/shared/context/auth-context";
import { useFavorites } from "@/shared/context/favorites-context";
import { Iconify } from "./icon";

const NAV_LINKS = [
  { href: "/catalog", label: "Каталог" },
  { href: "/quiz", label: "Подобрать букет" },
  { href: "/subscription", label: "Подписка" },
  { href: "/about", label: "О нас" },
];

export function Header() {
  const { itemCount } = useCart();
  const { isLoggedIn } = useAuth();
  const { favoriteCount } = useFavorites();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          className="lg:hidden p-2 -ml-2 text-neutral-500 hover:text-neutral-900 transition-colors"
          aria-label="Открыть меню"
          aria-expanded={menuOpen}
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
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
            >
              {link.label}
            </Link>
          ))}
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
            href={isLoggedIn ? "/account" : "/login"}
            className="relative hidden sm:flex p-2 text-neutral-500 hover:text-rose-500 transition-colors"
            aria-label={isLoggedIn ? "Избранное" : "Войти и открыть избранное"}
            title="Избранное"
          >
            <Iconify icon="solar:heart-linear" width={22} height={22} />
            {favoriteCount > 0 && (
              <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 bg-rose-500 text-white text-[10px] font-medium rounded-full flex items-center justify-center border-2 border-white">
                {favoriteCount}
              </span>
            )}
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

      {menuOpen && (
        <div className="lg:hidden fixed inset-0 z-[60]">
          <button
            type="button"
            aria-label="Закрыть меню"
            onClick={() => setMenuOpen(false)}
            className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm"
          />
          <aside className="absolute left-0 top-0 bottom-0 w-[82%] max-w-sm bg-white shadow-xl flex flex-col">
            <div className="flex items-center justify-between h-16 px-5 border-b border-neutral-100">
              <span className="text-xl font-semibold tracking-tighter text-neutral-900 uppercase">
                FLORA
              </span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="p-2 -mr-2 text-neutral-500 hover:text-neutral-900"
                aria-label="Закрыть меню"
              >
                <Iconify icon="solar:close-circle-linear" width={24} height={24} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto py-4 px-3">
              <ul className="space-y-1">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="block px-3 py-3 rounded-xl text-base font-medium text-neutral-800 hover:bg-neutral-50 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href={isLoggedIn ? "/account" : "/login"}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-3 rounded-xl text-base font-medium text-neutral-800 hover:bg-neutral-50 transition-colors"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Iconify icon="solar:heart-linear" width={20} height={20} />
                      Избранное
                    </span>
                    {favoriteCount > 0 && (
                      <span className="min-w-[20px] h-5 px-1.5 bg-rose-500 text-white text-[11px] font-medium rounded-full flex items-center justify-center">
                        {favoriteCount}
                      </span>
                    )}
                  </Link>
                </li>
                <li>
                  <Link
                    href={isLoggedIn ? "/account" : "/login"}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-3 rounded-xl text-base font-medium text-neutral-800 hover:bg-neutral-50 transition-colors"
                  >
                    <Iconify icon="solar:user-circle-linear" width={20} height={20} />
                    {isLoggedIn ? "Личный кабинет" : "Войти"}
                  </Link>
                </li>
              </ul>

              <div className="mt-4 pt-4 border-t border-neutral-100">
                <Link
                  href="/support"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-3 rounded-xl text-base font-medium text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  <Iconify icon="solar:heart-linear" width={20} height={20} />
                  Поддержать авторов
                </Link>
              </div>
            </nav>

            <div className="p-4 border-t border-neutral-100">
              <Link
                href="/catalog"
                onClick={() => setMenuOpen(false)}
                className="block w-full text-center py-3 rounded-full bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-colors"
              >
                В каталог
              </Link>
            </div>
          </aside>
        </div>
      )}
    </header>
  );
}
