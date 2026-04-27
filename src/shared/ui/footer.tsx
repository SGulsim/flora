import Link from "next/link";
import Image from "next/image";

const LINKS = [
  { href: "/catalog", label: "Каталог" },
  { href: "/subscription", label: "Подписка" },
  { href: "/about", label: "О нас" },
  { href: "/delivery", label: "Доставка" },
  { href: "/support", label: "Поддержать" },
];

export function Footer() {
  return (
    <footer className="border-t border-neutral-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Left: logo + nav */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 justify-center sm:justify-start">
            <Link href="/" className="text-sm font-semibold tracking-tighter uppercase text-neutral-900">
              FLORA
            </Link>
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-xs text-neutral-400 hover:text-neutral-900 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Right: creators + copyright */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Image src="/qr-gsaralieva.png" alt="@GSARALIEVA" width={28} height={28} className="rounded-md opacity-70 hover:opacity-100 transition-opacity" />
              <Image src="/qr-ezik-lovik.png" alt="@EZIK_LOVIK" width={28} height={28} className="rounded-md opacity-70 hover:opacity-100 transition-opacity" />
            </div>
            <p className="text-xs text-neutral-400">
              © {new Date().getFullYear()} Саралиева & Горбунова
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
