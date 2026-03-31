import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Iconify } from "@/shared/ui/icon";

const meta: Meta = {
  title: "UI/Badge",
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj;

export const Hit: Story = {
  name: "«Хит» на карточке товара",
  render: () => (
    <div className="relative w-40 h-20 bg-neutral-100 rounded-2xl overflow-hidden">
      <div className="absolute top-3 left-3 px-2 py-1 bg-white/90 backdrop-blur text-xs font-medium uppercase tracking-wider text-neutral-900 rounded-lg">
        Хит
      </div>
    </div>
  ),
};

export const Popular: Story = {
  name: "«Популярно» на подписке",
  render: () => (
    <div className="relative w-60 h-16 bg-white border-2 border-neutral-900 rounded-2xl mt-4">
      <div className="absolute top-0 right-8 -translate-y-1/2 bg-neutral-900 text-white text-[10px] font-medium uppercase tracking-wider px-3 py-1 rounded-full">
        Популярно
      </div>
    </div>
  ),
};

export const CartCount: Story = {
  name: "Счётчик корзины",
  render: () => (
    <div className="flex items-center gap-6">
      <div className="relative p-2">
        <Iconify icon="solar:bag-3-linear" width={22} height={22} />
        <span className="absolute top-1 right-1 w-4 h-4 bg-neutral-900 text-white text-xs font-medium rounded-full flex items-center justify-center border-2 border-white">
          3
        </span>
      </div>
      <div className="relative p-2">
        <Iconify icon="solar:bag-3-linear" width={22} height={22} />
        <span className="absolute top-1 right-1 w-4 h-4 bg-neutral-900 text-white text-xs font-medium rounded-full flex items-center justify-center border-2 border-white">
          12
        </span>
      </div>
    </div>
  ),
};

export const NewChip: Story = {
  name: "Чип «Новинка»",
  render: () => (
    <span className="text-xs font-medium text-rose-500 tracking-widest uppercase block">
      Новинка
    </span>
  ),
};

export const DeliveryChip: Story = {
  name: "Чип доставки",
  render: () => (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-50 text-rose-600 text-xs font-medium">
      <Iconify icon="solar:routing-2-linear" width={14} height={14} />
      Доставка от 60 минут
    </div>
  ),
};

export const AllBadges: Story = {
  render: () => (
    <div className="flex flex-col gap-6 items-start">
      <div className="px-2 py-1 bg-white border border-neutral-200 text-xs font-medium uppercase tracking-wider text-neutral-900 rounded-lg shadow-sm">
        Хит
      </div>
      <div className="bg-neutral-900 text-white text-[10px] font-medium uppercase tracking-wider px-3 py-1 rounded-full">
        Популярно
      </div>
      <span className="text-xs font-medium text-rose-500 tracking-widest uppercase">Новинка</span>
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-50 text-rose-600 text-xs font-medium">
        <Iconify icon="solar:routing-2-linear" width={14} height={14} />
        Доставка от 60 минут
      </div>
      <div className="flex items-center gap-1 text-xs font-medium text-yellow-500 bg-yellow-50 px-2 py-1 rounded-md">
        <Iconify icon="solar:star-bold" width={14} height={14} />
        4.9
        <span className="text-neutral-400 font-normal ml-1">(12)</span>
      </div>
    </div>
  ),
};
