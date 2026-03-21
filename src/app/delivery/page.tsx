import Link from "next/link";

export default function DeliveryPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <h1 className="text-3xl font-medium tracking-tight text-neutral-900 mb-8">
        Доставка и оплата
      </h1>
      <div className="space-y-8 text-neutral-600">
        <section>
          <h2 className="text-lg font-medium text-neutral-900 mb-4">Доставка</h2>
          <ul className="space-y-2 text-sm leading-relaxed">
            <li>• Доставка от 60 минут после сборки букета</li>
            <li>• Бесплатная доставка при заказе от 3 000 ₽</li>
            <li>• Выбор временного слота: утро, день, вечер</li>
            <li>• Возможность срочной доставки</li>
          </ul>
        </section>
        <section>
          <h2 className="text-lg font-medium text-neutral-900 mb-4">Оплата</h2>
          <ul className="space-y-2 text-sm leading-relaxed">
            <li>• Банковская карта онлайн</li>
            <li>• Система быстрых платежей (СБП)</li>
            <li>• Наличными курьеру</li>
          </ul>
        </section>
      </div>
      <Link
        href="/catalog"
        className="inline-block mt-8 px-6 py-3 bg-neutral-900 text-white text-sm font-medium rounded-full hover:bg-neutral-800 transition-all"
      >
        В каталог
      </Link>
    </main>
  );
}
