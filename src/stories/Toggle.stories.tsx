import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "UI/Toggle",
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj;

function Toggle({
  label,
  defaultOn = false,
}: {
  label?: string;
  defaultOn?: boolean;
}) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between gap-6">
      {label && <span className="text-sm font-medium text-neutral-900">{label}</span>}
      <button
        type="button"
        role="switch"
        aria-checked={on}
        onClick={() => setOn((v) => !v)}
        className="relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-neutral-900/20 cursor-pointer"
        style={{ backgroundColor: on ? "#171717" : "#e5e5e5" }}
      >
        <span
          className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200"
          style={{ transform: on ? "translateX(20px)" : "translateX(0)" }}
        />
      </button>
    </div>
  );
}

function ToggleWithCard() {
  const [on, setOn] = useState(true);
  return (
    <div className="w-80 bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-neutral-900">Бесплатная открытка</span>
        <button
          type="button"
          role="switch"
          aria-checked={on}
          onClick={() => setOn((v) => !v)}
          className="relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none cursor-pointer"
          style={{ backgroundColor: on ? "#171717" : "#e5e5e5" }}
        >
          <span
            className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200"
            style={{ transform: on ? "translateX(20px)" : "translateX(0)" }}
          />
        </button>
      </div>
      <textarea
        rows={2}
        placeholder="Текст послания..."
        disabled={!on}
        className="w-full px-4 py-3 text-sm bg-neutral-50 border border-transparent rounded-xl focus:bg-white focus:border-neutral-300 focus:outline-none resize-none transition-all disabled:opacity-50"
      />
    </div>
  );
}

export const Off: Story = {
  render: () => <Toggle label="Бесплатная открытка" defaultOn={false} />,
};

export const On: Story = {
  render: () => <Toggle label="Бесплатная открытка" defaultOn={true} />,
};

export const WithCardExample: Story = {
  render: () => <ToggleWithCard />,
};
