import Image from "next/image";
import Link from "next/link";
import { Iconify } from "@/shared/ui/icon";

export const metadata = {
  title: "Поддержать авторов — Flora",
  description:
    "Если вам нравится проект Flora, вы можете поддержать авторов донатом по QR-коду.",
};

const STEPS = [
  {
    icon: "solar:scan-linear",
    title: "Откройте камеру или банковское приложение",
    text: "Большинство банков умеют считывать QR-коды прямо из камеры или раздела «Оплата по QR».",
  },
  {
    icon: "solar:card-linear",
    title: "Отсканируйте QR-код",
    text: "Приложение автоматически распознает получателя — Горбунову Дарью Евгеньевну.",
  },
  {
    icon: "solar:heart-linear",
    title: "Укажите любую сумму",
    text: "Любая поддержка важна — она помогает развивать Flora и радовать вас новыми букетами.",
  },
];

export default function SupportPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-50 text-rose-600 text-xs font-medium mb-5">
          <Iconify icon="solar:heart-linear" width={14} height={14} />
          Поддержать авторов
        </div>
        <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-neutral-900 mb-4">
          Спасибо, что вы с нами
        </h1>
        <p className="text-neutral-500 text-base leading-relaxed max-w-xl mx-auto">
          Flora — студенческий проект, который мы делаем с душой. Если он вам
          нравится, вы можете отправить нам любой донат по QR-коду ниже — это
          очень поможет.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-10 items-start">
        <div className="mx-auto lg:mx-0">
          <div className="rounded-3xl bg-neutral-900 p-6 sm:p-8 shadow-sm">
            <p className="text-xs uppercase tracking-widest text-neutral-400 mb-4 text-center">
              QR-код для перевода
            </p>
            <div className="rounded-2xl bg-white p-4 w-full max-w-[280px] mx-auto">
              <Image
                src="/donate-qr.png?v=2"
                alt="QR-код для поддержки авторов"
                width={480}
                height={480}
                className="w-full h-auto"
                priority
                unoptimized
              />
            </div>
            <div className="mt-5 text-center">
              <p className="text-sm font-medium text-white">
                Горбунова Дарья Евгеньевна
              </p>
              <p className="text-xs text-neutral-400 mt-1">
                Перевод через Т-Банк
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-medium tracking-tight text-neutral-900 mb-5">
            Как поддержать
          </h2>
          <ol className="space-y-4">
            {STEPS.map((step, idx) => (
              <li
                key={step.title}
                className="flex items-start gap-4 rounded-2xl border border-neutral-100 bg-white p-4 sm:p-5"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-neutral-50 flex items-center justify-center text-neutral-700">
                  <Iconify icon={step.icon} width={20} height={20} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-neutral-900 mb-1">
                    {idx + 1}. {step.title}
                  </p>
                  <p className="text-sm text-neutral-500 leading-relaxed">
                    {step.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-8 rounded-2xl bg-neutral-50 border border-neutral-100 p-5">
            <p className="text-sm text-neutral-700 leading-relaxed">
              <span className="font-medium text-neutral-900">Важно.</span> Донат
              — абсолютно добровольный. Он никак не влияет на заказы и подписки:
              их можно оформлять бесплатно в демо-режиме.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-all"
            >
              Смотреть каталог
              <Iconify icon="solar:arrow-right-linear" width={16} height={16} />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-neutral-200 text-neutral-700 text-sm font-medium hover:bg-neutral-50 transition-all"
            >
              На главную
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
