import type { Metadata } from "next";
import { CartProvider } from "@/shared/context/cart-context";
import { AuthProvider } from "@/shared/context/auth-context";
import { Header } from "@/shared/ui/header";
import { Footer } from "@/shared/ui/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "FLORA | Цветочный магазин",
  description:
    "Свежие цветы для особых моментов. Доставка от 60 минут. Собираем аккуратные букеты с любовью к деталям.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="bg-neutral-50 text-neutral-800 selection:bg-rose-100 selection:text-rose-900 flex flex-col min-h-screen">
        <AuthProvider>
          <CartProvider>
            <Header />
            <div className="flex-grow">{children}</div>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
