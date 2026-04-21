import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "UI/Checkbox",
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj;

// Полностью React-контролируемый чекбокс — не зависит от CSS-классов .custom-checkbox
function CheckboxItem({
  label,
  defaultChecked = false,
}: {
  label: string;
  defaultChecked?: boolean;
}) {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <label className="flex items-center gap-3 cursor-pointer group" onClick={() => setChecked((v) => !v)}>
      <div
        className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${
          checked
            ? "bg-neutral-900 border-neutral-900"
            : "bg-white border-neutral-300 group-hover:border-neutral-500"
        }`}
      >
        {/* Чекмарк — виден только когда checked */}
        <svg
          className={`w-3 h-3 text-white transition-all duration-150 ${
            checked ? "opacity-100 scale-100" : "opacity-0 scale-50"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={3}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <span
        className={`text-sm transition-colors select-none ${
          checked ? "text-neutral-900" : "text-neutral-600 group-hover:text-neutral-900"
        }`}
      >
        {label}
      </span>
    </label>
  );
}

export const Unchecked: Story = {
  render: () => <CheckboxItem label="Я получатель" />,
};

export const Checked: Story = {
  render: () => <CheckboxItem label="Я получатель" defaultChecked />,
};

export const Group: Story = {
  render: () => (
    <div className="space-y-3">
      <CheckboxItem label="День рождения" defaultChecked />
      <CheckboxItem label="Свидание" defaultChecked />
      <CheckboxItem label="Свадьба" />
      <CheckboxItem label="Без повода" />
    </div>
  ),
};
