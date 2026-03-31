import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "UI/Input",
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <div>
      <label className="block text-xs text-neutral-500 mb-1.5 ml-1">Имя</label>
      <input
        type="text"
        placeholder="Иван"
        className="w-full px-4 py-3 text-sm bg-neutral-50 border border-transparent rounded-xl focus:bg-white focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900/5 transition-all"
      />
    </div>
  ),
};

export const WithError: Story = {
  render: () => {
    const [value, setValue] = useState("");
    const error = value.length > 0 && !value.includes("@");
    return (
      <div>
        <label className="block text-xs text-neutral-500 mb-1.5 ml-1">Телефон</label>
        <input
          type="tel"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="+7 (999) 000-00-00"
          className={`w-full px-4 py-3 text-sm bg-neutral-50 border rounded-xl focus:bg-white focus:outline-none transition-all ${
            error ? "border-red-300 focus:border-red-300" : "border-transparent focus:border-neutral-300"
          }`}
        />
        {error && <p className="text-xs text-red-500 mt-1 ml-1">Введите корректный номер</p>}
      </div>
    );
  },
};

export const Password: Story = {
  render: () => (
    <div>
      <label className="block text-xs text-neutral-500 mb-1.5 ml-1">Пароль</label>
      <input
        type="password"
        placeholder="••••••••"
        className="w-full px-4 py-3 text-sm bg-neutral-50 border border-transparent rounded-xl focus:bg-white focus:border-neutral-300 focus:outline-none transition-all"
      />
    </div>
  ),
};

export const Textarea: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <div>
        <label className="block text-xs text-neutral-500 mb-1.5 ml-1">
          Текст открытки{" "}
          <span className="text-neutral-400">({value.length}/200)</span>
        </label>
        <textarea
          rows={3}
          placeholder="Текст послания..."
          value={value}
          onChange={(e) => setValue(e.target.value.slice(0, 200))}
          className="w-full px-4 py-3 text-sm bg-neutral-50 border border-transparent rounded-xl focus:bg-white focus:border-neutral-300 focus:outline-none resize-none transition-all"
        />
      </div>
    );
  },
};

export const TextareaDisabled: Story = {
  render: () => (
    <div>
      <label className="block text-xs text-neutral-500 mb-1.5 ml-1">Текст открытки (выключено)</label>
      <textarea
        rows={3}
        placeholder="Текст послания..."
        disabled
        className="w-full px-4 py-3 text-sm bg-neutral-50 border border-transparent rounded-xl focus:bg-white focus:border-neutral-300 focus:outline-none resize-none transition-all disabled:opacity-50"
      />
    </div>
  ),
};

export const AllInputs: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <label className="block text-xs text-neutral-500 mb-1.5 ml-1">Имя</label>
        <input type="text" placeholder="Иван" className="w-full px-4 py-3 text-sm bg-neutral-50 border border-transparent rounded-xl focus:bg-white focus:border-neutral-300 focus:outline-none transition-all" />
      </div>
      <div>
        <label className="block text-xs text-neutral-500 mb-1.5 ml-1">Email</label>
        <input type="email" placeholder="example@mail.ru" className="w-full px-4 py-3 text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:border-neutral-300 focus:outline-none transition-all" />
      </div>
      <div>
        <label className="block text-xs text-neutral-500 mb-1.5 ml-1">Телефон (ошибка)</label>
        <input type="tel" defaultValue="123" className="w-full px-4 py-3 text-sm bg-neutral-50 border border-red-300 rounded-xl focus:bg-white focus:outline-none transition-all" />
        <p className="text-xs text-red-500 mt-1 ml-1">Введите корректный номер</p>
      </div>
      <div>
        <label className="block text-xs text-neutral-500 mb-1.5 ml-1">Сообщение</label>
        <textarea rows={2} placeholder="Текст послания..." className="w-full px-4 py-3 text-sm bg-neutral-50 border border-transparent rounded-xl focus:bg-white focus:border-neutral-300 focus:outline-none resize-none transition-all" />
      </div>
    </div>
  ),
};
