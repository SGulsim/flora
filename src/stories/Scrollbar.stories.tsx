import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "UI/Scrollbar",
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj;

const ITEMS = Array.from({ length: 20 }, (_, i) => `Пункт списка ${i + 1}`);

export const VerticalScroll: Story = {
  name: "Вертикальный скроллбар",
  render: () => (
    <div
      className="overflow-y-auto border border-neutral-100 rounded-2xl"
      style={{ height: 240, width: 300 }}
    >
      <div className="p-4 space-y-3">
        {ITEMS.map((item) => (
          <div
            key={item}
            className="px-4 py-2.5 bg-neutral-50 rounded-xl text-sm text-neutral-700"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  ),
};

export const HorizontalScroll: Story = {
  name: "Горизонтальный скроллбар",
  render: () => (
    <div
      className="overflow-x-auto border border-neutral-100 rounded-2xl"
      style={{ width: 300 }}
    >
      <div className="flex gap-3 p-4" style={{ width: 900 }}>
        {ITEMS.slice(0, 10).map((item) => (
          <div
            key={item}
            className="flex-shrink-0 px-4 py-3 bg-neutral-50 rounded-xl text-sm text-neutral-700 w-32 text-center"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  ),
};

export const InModal: Story = {
  name: "Скроллбар в модальном окне",
  render: () => (
    <div className="bg-white rounded-2xl shadow-lg border border-neutral-100 p-6" style={{ width: 360 }}>
      <h3 className="text-lg font-medium text-neutral-900 mb-4">Список букетов</h3>
      <div className="overflow-y-auto space-y-2 pr-1" style={{ maxHeight: 200 }}>
        {ITEMS.map((item) => (
          <div key={item} className="flex items-center justify-between py-2 border-b border-neutral-50 last:border-0">
            <span className="text-sm text-neutral-700">{item}</span>
            <span className="text-sm font-medium text-neutral-900">4 500 ₽</span>
          </div>
        ))}
      </div>
    </div>
  ),
};
