import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Iconify } from "@/shared/ui/icon";

const meta: Meta = {
  title: "UI/AddonCard",
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj;

const ADDONS = [
  { id: "card", name: "Открытка", price: 0, icon: "solar:letter-linear" },
  { id: "balloon", name: "Шарик", price: 150, icon: "solar:star-circle-linear" },
  { id: "candy", name: "Конфеты", price: 300, icon: "solar:gift-linear" },
];

function AddonCardItem({
  addon,
}: {
  addon: { id: string; name: string; price: number; icon: string };
}) {
  const [added, setAdded] = useState(false);
  return (
    <div
      className={`border rounded-2xl p-3 flex flex-col items-center text-center group transition-colors ${
        added ? "border-neutral-300 bg-neutral-50" : "border-neutral-100 hover:border-neutral-200"
      }`}
    >
      <div className="w-16 h-16 bg-neutral-50 rounded-full mb-3 flex items-center justify-center text-neutral-400 group-hover:text-rose-400 transition-colors">
        <Iconify icon={addon.icon} width={28} height={28} />
      </div>
      <p className="text-xs font-medium text-neutral-900 mb-1">{addon.name}</p>
      <p className="text-xs text-neutral-500 mb-3">
        {addon.price === 0 ? "Бесплатно" : `+ ${addon.price.toLocaleString("ru-RU")} ₽`}
      </p>
      <button
        type="button"
        onClick={() => setAdded((v) => !v)}
        className={`text-xs font-medium px-4 py-1.5 rounded-full w-full transition-colors ${
          added
            ? "bg-neutral-900 text-white"
            : "text-neutral-900 bg-neutral-100 group-hover:bg-neutral-900 group-hover:text-white"
        }`}
      >
        {added ? "Убрать" : "Добавить"}
      </button>
    </div>
  );
}

export const Single: Story = {
  render: () => (
    <div style={{ width: 140 }}>
      <AddonCardItem addon={ADDONS[0]} />
    </div>
  ),
};

export const Grid: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4" style={{ width: 460 }}>
      {ADDONS.map((addon) => (
        <AddonCardItem key={addon.id} addon={addon} />
      ))}
    </div>
  ),
};
