"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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

const FAVORITES_PATH = "/account?tab=favorites";
const FAVORITES_LOGIN = `/login?returnTo=${encodeURIComponent(FAVORITES_PATH)}`;

export function Header() {
  const { itemCount } = useCart();
  const { isLoggedIn } = useAuth();
  const { favoriteCount } = useFavorites();
  const [menuOpen, setMenuOpen] = useState(false);
  const openMenuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);

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

  useEffect(() => {
    if (!menuOpen) return;
    const id = window.setTimeout(() => {
      const el = mobileNavRef.current?.querySelector<HTMLElement>(
        "a[href], button[type='button']"
      );
      el?.focus();
    }, 0);
    return () => window.clearTimeout(id);
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
    window.setTimeout(() => openMenuButtonRef.current?.focus({ preventScroll: true }), 0);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <button
          ref={openMenuButtonRef}
          type="button"
          onClick={() => setMenuOpen(true)}
          className="lg:hidden p-2 -ml-2 text-neutral-500 hover:text-neutral-900 transition-colors"
          aria-label="Открыть меню"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          <Iconify icon="solar:hamburger-menu-linear" width={24} height={24} />
        </button>

        <Link
          href="/"
          className="text-xl font-semibold tracking-tighter text-neutral-900 uppercase"
        >
          FLORA
        </Link>

        <nav className="hidden lg:flex items-center gap-8" aria-label="Основное меню">
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
            Поддержать авторов
          </Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href={isLoggedIn ? FAVORITES_PATH : FAVORITES_LOGIN}
            className="relative hidden sm:flex p-2 text-neutral-500 hover:text-rose-500 transition-colors"
            aria-label={isLoggedIn ? "Избранное" : "Войти и открыть избранное"}
            title="Избранное"
          >
            <Iconify icon="solar:heart-linear" width={22} height={22} />
            {favoriteCount > 0 && (
              <span className="absolute top-1 right-1 min-w-[18px] h-4 px-1 bg-rose-500 text-white text-xs font-medium rounded-full flex items-center justify-center border-2 border-white">
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
        <>
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Закрыть меню"
            onClick={closeMenu}
            className="lg:hidden fixed inset-0 z-[60] bg-neutral-900/50 backdrop-blur-sm"
          />

          {/* Drawer panel — fixed independently so height = 100dvh reliably */}
          <aside
            ref={mobileNavRef}
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-nav-title"
            className="lg:hidden fixed left-0 top-0 z-[61] w-[85%] max-w-xs bg-white shadow-2xl flex flex-col"
            style={{ height: "100dvh" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between h-14 px-5 border-b border-neutral-100 flex-shrink-0">
              <span
                id="mobile-nav-title"
                className="text-lg font-semibold tracking-tighter text-neutral-900 uppercase"
              >
                FLORA
              </span>
              <button
                type="button"
                onClick={closeMenu}
                className="w-9 h-9 flex items-center justify-center rounded-xl text-neutral-400 hover:text-neutral-900 hover:bg-neutral-50 transition-colors"
                aria-label="Закрыть меню"
              >
                <Iconify icon="solar:close-square-linear" width={20} height={20} />
              </button>
            </div>

            {/* Nav links — scrollable middle section */}
            <nav className="flex-1 overflow-y-auto px-3 py-3" aria-label="Мобильное меню">
              <ul className="space-y-0.5">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-neutral-800 hover:bg-neutral-50 active:bg-neutral-100 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-2 pt-2 border-t border-neutral-100 space-y-0.5">
                <Link
                  href={isLoggedIn ? FAVORITES_PATH : FAVORITES_LOGIN}
                  onClick={closeMenu}
                  className="flex items-center justify-between px-3 py-3 rounded-xl text-sm font-medium text-neutral-800 hover:bg-neutral-50 active:bg-neutral-100 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <Iconify icon="solar:heart-linear" width={18} height={18} />
                    Избранное
                  </span>
                  {favoriteCount > 0 && (
                    <span className="min-w-[20px] h-5 px-1.5 bg-rose-500 text-white text-xs font-medium rounded-full flex items-center justify-center">
                      {favoriteCount}
                    </span>
                  )}
                </Link>
                <Link
                  href={isLoggedIn ? "/account" : "/login"}
                  onClick={closeMenu}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-neutral-800 hover:bg-neutral-50 active:bg-neutral-100 transition-colors"
                >
                  <Iconify icon="solar:user-circle-linear" width={18} height={18} />
                  {isLoggedIn ? "Личный кабинет" : "Войти"}
                </Link>
              </div>

              <div className="mt-2 pt-2 border-t border-neutral-100">
                <Link
                  href="/support"
                  onClick={closeMenu}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-rose-600 hover:bg-rose-50 active:bg-rose-100 transition-colors"
                >
                  <Iconify icon="solar:heart-linear" width={18} height={18} />
                  Поддержать авторов
                </Link>
              </div>
            </nav>

            {/* Footer CTA */}
            <div className="flex-shrink-0 p-4 border-t border-neutral-100 pb-safe">
              <Link
                href="/cart"
                onClick={closeMenu}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 active:bg-neutral-700 transition-colors"
              >
                <Iconify icon="solar:bag-3-linear" width={16} height={16} />
                Корзина
                {itemCount > 0 && (
                  <span className="bg-white text-neutral-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>
            </div>
          </aside>
        </>
      )}
    </header>
  );
}
