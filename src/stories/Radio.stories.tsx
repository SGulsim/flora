import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "UI/Radio",
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 300 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj;

const PAYMENT_OPTIONS = [
  { id: "card", label: "Банковская карта" },
  { id: "sbp", label: "Система быстрых платежей" },
  { id: "cash", label: "Наличными курьеру" },
];

function PaymentRadioGroup() {
  const [selected, setSelected] = useState("card");
  return (
    <div className="space-y-3">
      {PAYMENT_OPTIONS.map((opt) => (
        <label
          key={opt.id}
          className="flex items-center gap-3 p-3 border border-neutral-200 rounded-xl cursor-pointer group"
          onClick={() => setSelected(opt.id)}
        >
          <div className="w-4 h-4 rounded-full border border-neutral-300 flex items-center justify-center transition-colors flex-shrink-0">
            <div
              className={`w-2 h-2 rounded-full transform transition-all ${
                selected === opt.id
                  ? "bg-neutral-900 scale-100"
                  : "bg-transparent scale-50"
              }`}
            />
          </div>
          <span className="text-sm font-medium text-neutral-900 flex-1">
            {opt.label}
          </span>
        </label>
      ))}
    </div>
  );
}

export const Default: Story = {
  render: () => <PaymentRadioGroup />,
};

export const SingleSelected: Story = {
  render: () => (
    <label className="flex items-center gap-3 p-3 border border-neutral-200 rounded-xl cursor-pointer group">
      <div className="w-4 h-4 rounded-full border border-neutral-300 flex items-center justify-center transition-colors">
        <div className="w-2 h-2 rounded-full bg-neutral-900 scale-100 transform transition-all" />
      </div>
      <span className="text-sm font-medium text-neutral-900">Банковская карта</span>
    </label>
  ),
};
