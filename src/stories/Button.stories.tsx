import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Iconify } from "@/shared/ui/icon";

const meta: Meta = {
  title: "UI/Button",
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj;

export const Primary: Story = {
  render: () => (
    <button className="px-6 py-3 bg-neutral-900 text-white text-sm font-medium rounded-full hover:bg-neutral-800 transition-all">
      Смотреть каталог
    </button>
  ),
};

export const Secondary: Story = {
  render: () => (
    <button className="px-6 py-3 bg-white border border-neutral-200 text-neutral-900 text-sm font-medium rounded-full hover:bg-neutral-50 transition-all">
      Подобрать по поводу
    </button>
  ),
};

export const Ghost: Story = {
  render: () => (
    <button className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
      Весь каталог →
    </button>
  ),
};

export const Danger: Story = {
  render: () => (
    <button className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors">
      Выйти
    </button>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <button className="flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white text-sm font-medium rounded-full hover:bg-neutral-800 transition-all">
      В корзину
      <Iconify icon="solar:bag-3-linear" width={18} height={18} />
    </button>
  ),
};

export const SmallPill: Story = {
  render: () => (
    <button className="px-4 py-2 text-sm font-medium rounded-xl bg-neutral-900 text-white hover:bg-neutral-800 transition-colors">
      Сегодня
    </button>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-start">
      <button className="px-6 py-3 bg-neutral-900 text-white text-sm font-medium rounded-full hover:bg-neutral-800 transition-all">
        Primary
      </button>
      <button className="px-6 py-3 bg-white border border-neutral-200 text-neutral-900 text-sm font-medium rounded-full hover:bg-neutral-50 transition-all">
        Secondary
      </button>
      <button className="px-6 py-3 bg-neutral-50 text-neutral-900 text-sm font-medium rounded-full hover:bg-neutral-100 transition-all">
        Tertiary
      </button>
      <button className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
        Ghost
      </button>
      <button className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors">
        Danger
      </button>
    </div>
  ),
};
