import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Iconify } from "@/shared/ui/icon";

const meta: Meta = {
  title: "UI/Accordion",
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 420 }} className="border-t border-neutral-100">
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj;

// React-контролируемый аккордеон с плавной анимацией через grid-template-rows
function AccordionItem({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-neutral-100">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex justify-between items-center py-4 font-medium text-sm text-neutral-900 cursor-pointer"
      >
        {title}
        <Iconify
          icon="solar:alt-arrow-down-linear"
          width={16}
          height={16}
          className={`flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* grid-template-rows: 0fr → 1fr анимирует высоту без знания реального значения */}
      <div
        style={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "grid-template-rows 0.3s ease",
        }}
      >
        <div className="overflow-hidden">
          <div className="pb-4">{children}</div>
        </div>
      </div>
    </div>
  );
}

const composition = [
  { name: "Роза пионовидная", count: "5 шт" },
  { name: "Эвкалипт", count: "3 шт" },
  { name: "Упаковка крафт", count: "1 шт" },
];

export const CompositionOpen: Story = {
  name: "Состав (открыт)",
  render: () => (
    <AccordionItem title="Состав" defaultOpen>
      <div className="text-sm text-neutral-500 space-y-2">
        {composition.map((item) => (
          <div key={item.name} className="flex justify-between items-center">
            <span>{item.name}</span>
            <span
              className="text-neutral-400 border-b border-dotted border-neutral-200 flex-grow mx-2"
              style={{ minHeight: 1 }}
            />
            <span>{item.count}</span>
          </div>
        ))}
      </div>
    </AccordionItem>
  ),
};

export const DeliveryClosed: Story = {
  name: "Доставка и оплата (закрыт)",
  render: () => (
    <AccordionItem title="Доставка и оплата">
      <p className="text-sm text-neutral-500 leading-relaxed">
        Бесплатная доставка по городу от 3 000 ₽. Время доставки от 60 минут
        после сборки. Оплата картой, СБП или наличными курьеру.
      </p>
    </AccordionItem>
  ),
};

export const Both: Story = {
  name: "Оба аккордеона",
  render: () => (
    <>
      <AccordionItem title="Состав" defaultOpen>
        <div className="text-sm text-neutral-500 space-y-2">
          {composition.map((item) => (
            <div key={item.name} className="flex justify-between items-center">
              <span>{item.name}</span>
              <span
                className="text-neutral-400 border-b border-dotted border-neutral-200 flex-grow mx-2"
                style={{ minHeight: 1 }}
              />
              <span>{item.count}</span>
            </div>
          ))}
        </div>
      </AccordionItem>
      <AccordionItem title="Доставка и оплата">
        <p className="text-sm text-neutral-500 leading-relaxed">
          Бесплатная доставка по городу от 3 000 ₽. Время доставки от 60 минут
          после сборки. Оплата картой, СБП или наличными курьеру.
        </p>
      </AccordionItem>
      <AccordionItem title="Уход за букетом">
        <p className="text-sm text-neutral-500 leading-relaxed">
          Меняйте воду каждые 2 дня, срезайте стебли под углом, держите вдали
          от прямых солнечных лучей и батарей.
        </p>
      </AccordionItem>
    </>
  ),
};
