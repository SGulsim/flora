import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Iconify } from "@/shared/ui/icon";

const meta: Meta = {
  title: "UI/QuantityStepper",
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj;

// Named components — гарантируют правильную работу React-хуков
function SmallStepper() {
  const [qty, setQty] = useState(1);
  return (
    <div className="flex items-center border border-neutral-200 rounded-full bg-white h-9 px-1">
      <button
        onClick={() => setQty((q) => Math.max(1, q - 1))}
        className="w-7 h-7 flex items-center justify-center text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
      >
        <Iconify icon="solar:minus-linear" width={14} height={14} />
      </button>
      <span className="w-6 text-center text-xs font-medium text-neutral-900 select-none">
        {qty}
      </span>
      <button
        onClick={() => setQty((q) => q + 1)}
        className="w-7 h-7 flex items-center justify-center text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
      >
        <Iconify icon="solar:add-linear" width={14} height={14} />
      </button>
    </div>
  );
}

function LargeStepper() {
  const [qty, setQty] = useState(1);
  return (
    <div className="flex items-center border border-neutral-200 rounded-full bg-white h-12 px-2">
      <button
        onClick={() => setQty((q) => Math.max(1, q - 1))}
        className="w-8 h-8 flex items-center justify-center text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
      >
        <Iconify icon="solar:minus-linear" width={20} height={20} />
      </button>
      <span className="w-8 text-center text-sm font-medium text-neutral-900 select-none min-w-[2rem]">
        {qty}
      </span>
      <button
        onClick={() => setQty((q) => q + 1)}
        className="w-8 h-8 flex items-center justify-center text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
      >
        <Iconify icon="solar:add-linear" width={20} height={20} />
      </button>
    </div>
  );
}

function StepperWithCart() {
  const [qty, setQty] = useState(1);
  return (
    <div className="flex items-center gap-4" style={{ width: 320 }}>
      <div className="flex items-center border border-neutral-200 rounded-full bg-white h-12 px-2">
        <button
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="w-8 h-8 flex items-center justify-center text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
        >
          <Iconify icon="solar:minus-linear" width={20} height={20} />
        </button>
        <span className="w-8 text-center text-sm font-medium text-neutral-900 select-none">
          {qty}
        </span>
        <button
          onClick={() => setQty((q) => q + 1)}
          className="w-8 h-8 flex items-center justify-center text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
        >
          <Iconify icon="solar:add-linear" width={20} height={20} />
        </button>
      </div>
      <button className="flex-1 h-12 bg-neutral-900 text-white text-sm font-medium rounded-full hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 cursor-pointer">
        В корзину <Iconify icon="solar:bag-3-linear" width={18} height={18} />
      </button>
    </div>
  );
}

export const Small: Story = {
  name: "Small (корзина)",
  render: () => <SmallStepper />,
};

export const Large: Story = {
  name: "Large (карточка товара)",
  render: () => <LargeStepper />,
};

export const WithAddToCart: Story = {
  name: "С кнопкой «В корзину»",
  render: () => <StepperWithCart />,
};
