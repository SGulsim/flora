import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "UI/StepIndicator",
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj;

function Step({ n, active }: { n: number; active: boolean }) {
  return (
    <span
      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
        active ? "bg-neutral-900 text-white" : "bg-neutral-100 text-neutral-400"
      }`}
    >
      {n}
    </span>
  );
}

const STEPS = [
  { n: 1, label: "Получатель и адрес" },
  { n: 2, label: "Дата и время" },
  { n: 3, label: "Бесплатная открытка" },
];

function MultiStepIndicator() {
  const [current, setCurrent] = useState(1);
  return (
    <div className="space-y-4" style={{ width: 340 }}>
      {STEPS.map((s) => (
        <button
          key={s.n}
          onClick={() => setCurrent(s.n)}
          className={`w-full flex items-center gap-3 p-4 rounded-2xl border transition-colors text-left cursor-pointer ${
            current === s.n ? "border-neutral-200 bg-white shadow-sm" : "border-transparent hover:bg-neutral-50"
          }`}
        >
          <Step n={s.n} active={current >= s.n} />
          <span className="text-sm font-medium text-neutral-900">{s.label}</span>
        </button>
      ))}
    </div>
  );
}

export const Single: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Step n={1} active />
      <span className="text-lg font-medium text-neutral-900">Получатель и адрес</span>
    </div>
  ),
};

export const MultiStep: Story = {
  render: () => <MultiStepIndicator />,
};
