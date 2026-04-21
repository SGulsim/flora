import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "UI/TabNav",
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj;

const ACCOUNT_TABS = [
  { id: "profile", label: "Профиль" },
  { id: "orders", label: "История заказов" },
  { id: "occasions", label: "Мои поводы" },
];

function VerticalTabNav() {
  const [active, setActive] = useState("profile");
  return (
    <div className="flex gap-8" style={{ width: 480 }}>
      <aside className="w-56 flex-shrink-0 space-y-1">
        {ACCOUNT_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
              active === tab.id
                ? "bg-neutral-100 text-neutral-900"
                : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
        <button className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-neutral-50 transition-colors mt-4 cursor-pointer">
          Выйти
        </button>
      </aside>
      <div className="flex-1 bg-white border border-neutral-100 rounded-2xl p-6 shadow-sm">
        <p className="text-sm text-neutral-500">
          Активная вкладка: <strong className="text-neutral-900">{ACCOUNT_TABS.find(t => t.id === active)?.label}</strong>
        </p>
      </div>
    </div>
  );
}

function HorizontalTabNav() {
  const [active, setActive] = useState("profile");
  return (
    <div className="flex gap-1 border-b border-neutral-100 pb-0" style={{ width: 400 }}>
      {ACCOUNT_TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActive(tab.id)}
          className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px cursor-pointer ${
            active === tab.id
              ? "border-neutral-900 text-neutral-900"
              : "border-transparent text-neutral-500 hover:text-neutral-900"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export const Vertical: Story = {
  name: "Вертикальная (Аккаунт)",
  render: () => <VerticalTabNav />,
};

export const Horizontal: Story = {
  name: "Горизонтальная",
  render: () => <HorizontalTabNav />,
};
