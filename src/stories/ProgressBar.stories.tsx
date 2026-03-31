import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "UI/ProgressBar",
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj;

const TOTAL = 4;

function QuizProgressBar() {
  const [step, setStep] = useState(0);
  return (
    <div className="text-center">
      <span className="text-xs font-medium text-neutral-500 tracking-widest uppercase mb-3 block">
        Шаг {step + 1} из {TOTAL}
      </span>
      <div className="w-full h-1 bg-neutral-100 rounded-full mb-6 overflow-hidden">
        <div
          className="h-full bg-neutral-900 rounded-full transition-all duration-300"
          style={{ width: `${((step + 1) / TOTAL) * 100}%` }}
        />
      </div>
      <div className="flex gap-2 justify-center">
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          className="px-4 py-2 text-sm border border-neutral-200 rounded-full text-neutral-600 hover:border-neutral-300 disabled:opacity-40 cursor-pointer disabled:cursor-default"
          disabled={step === 0}
        >
          ← Назад
        </button>
        <button
          onClick={() => setStep((s) => Math.min(TOTAL - 1, s + 1))}
          className="px-4 py-2 text-sm bg-neutral-900 text-white rounded-full hover:bg-neutral-800 disabled:opacity-40 cursor-pointer disabled:cursor-default"
          disabled={step === TOTAL - 1}
        >
          Далее →
        </button>
      </div>
    </div>
  );
}

export const QuizProgress: Story = {
  name: "Прогресс квиза (интерактивный)",
  render: () => <QuizProgressBar />,
};

export const Step1: Story = {
  render: () => (
    <div className="w-full h-1 bg-neutral-100 rounded-full overflow-hidden">
      <div className="h-full bg-neutral-900 rounded-full" style={{ width: "25%" }} />
    </div>
  ),
};

export const Step2: Story = {
  render: () => (
    <div className="w-full h-1 bg-neutral-100 rounded-full overflow-hidden">
      <div className="h-full bg-neutral-900 rounded-full" style={{ width: "50%" }} />
    </div>
  ),
};

export const Step4Complete: Story = {
  render: () => (
    <div className="w-full h-1 bg-neutral-100 rounded-full overflow-hidden">
      <div className="h-full bg-neutral-900 rounded-full" style={{ width: "100%" }} />
    </div>
  ),
};
