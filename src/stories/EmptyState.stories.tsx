import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "UI/EmptyState",
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj;

export const CartEmpty: Story = {
  name: "Корзина пуста",
  render: () => (
    <div className="py-16 text-center" style={{ width: 400 }}>
      <h1 className="text-2xl font-medium tracking-tight text-neutral-900 mb-4">
        Корзина пуста
      </h1>
      <p className="text-sm text-neutral-500 mb-8">Добавьте букеты из каталога</p>
      <button className="inline-block px-6 py-3 bg-neutral-900 text-white text-sm font-medium rounded-full hover:bg-neutral-800 transition-all">
        В каталог
      </button>
    </div>
  ),
};

export const OrdersEmpty: Story = {
  name: "Нет заказов",
  render: () => (
    <p className="text-sm text-neutral-500">Пока заказов нет</p>
  ),
};

export const OccasionsEmpty: Story = {
  name: "Нет поводов",
  render: () => (
    <p className="text-sm text-neutral-500">Пока нет сохранённых поводов</p>
  ),
};

export const CatalogNoResults: Story = {
  name: "Каталог — нет результатов",
  render: () => (
    <div className="text-center py-16 text-neutral-500" style={{ width: 500 }}>
      По вашему запросу ничего не найдено. Попробуйте изменить фильтры.
    </div>
  ),
};
