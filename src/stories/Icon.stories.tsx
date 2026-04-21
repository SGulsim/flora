import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Iconify } from "@/shared/ui/icon";

const meta: Meta = {
  title: "UI/Icon",
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj;

const ICONS_USED = [
  { icon: "solar:hamburger-menu-linear", label: "Меню" },
  { icon: "solar:magnifer-linear", label: "Поиск" },
  { icon: "solar:user-circle-linear", label: "Пользователь" },
  { icon: "solar:bag-3-linear", label: "Корзина" },
  { icon: "solar:minus-linear", label: "Минус" },
  { icon: "solar:add-linear", label: "Плюс" },
  { icon: "solar:trash-bin-trash-linear", label: "Удалить" },
  { icon: "solar:star-bold", label: "Звезда" },
  { icon: "solar:check-circle-linear", label: "Галочка" },
  { icon: "solar:alt-arrow-down-linear", label: "Стрелка вниз" },
  { icon: "solar:routing-2-linear", label: "Доставка" },
  { icon: "solar:gift-linear", label: "Подарок" },
  { icon: "solar:hearts-linear", label: "Сердце" },
  { icon: "solar:users-group-two-rounded-linear", label: "Группа" },
  { icon: "solar:cup-star-linear", label: "Кубок" },
  { icon: "solar:letter-linear", label: "Письмо" },
];

export const AllIcons: Story = {
  name: "Все иконки проекта",
  render: () => (
    <div className="grid grid-cols-4 gap-6">
      {ICONS_USED.map(({ icon, label }) => (
        <div key={icon} className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 bg-neutral-50 rounded-xl flex items-center justify-center">
            <Iconify icon={icon} width={22} height={22} />
          </div>
          <span className="text-[10px] text-neutral-400 text-center">{label}</span>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-6">
      {[14, 18, 22, 28, 36].map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <Iconify icon="solar:bag-3-linear" width={size} height={size} />
          <span className="text-[10px] text-neutral-400">{size}px</span>
        </div>
      ))}
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Iconify icon="solar:star-bold" width={24} height={24} className="text-yellow-500" />
      <Iconify icon="solar:routing-2-linear" width={24} height={24} className="text-rose-500" />
      <Iconify icon="solar:check-circle-linear" width={24} height={24} className="text-green-600" />
      <Iconify icon="solar:trash-bin-trash-linear" width={24} height={24} className="text-red-500" />
      <Iconify icon="solar:bag-3-linear" width={24} height={24} className="text-neutral-900" />
      <Iconify icon="solar:bag-3-linear" width={24} height={24} className="text-neutral-400" />
    </div>
  ),
};
