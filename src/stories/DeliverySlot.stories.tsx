import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "UI/DeliverySlot",
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj;

const SLOTS = [
  { id: "soon", label: "Ближайшее", time: "от 60 мин" },
  { id: "morning", label: "Утро", time: "9:00 – 12:00" },
  { id: "day", label: "День", time: "12:00 – 18:00" },
  { id: "evening", label: "Вечер", time: "18:00 – 22:00" },
];

const DATE_TABS = [
  { id: "today", label: "Сегодня" },
  { id: "tomorrow", label: "Завтра" },
  { id: "pick", label: "Выбрать дату" },
];

function TimeSlotsOnly() {
  const [selected, setSelected] = useState("soon");
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
      {SLOTS.map((slot) => (
        <button
          key={slot.id}
          onClick={() => setSelected(slot.id)}
          className={`px-3 py-2 text-xs font-medium rounded-xl text-center transition-colors cursor-pointer ${
            selected === slot.id
              ? "border-2 border-neutral-900 text-neutral-900"
              : "border border-neutral-200 text-neutral-600 hover:border-neutral-300"
          }`}
        >
          {slot.label}
          <br />
          <span className={selected === slot.id ? "text-neutral-500" : "text-neutral-400"}>
            {slot.time}
          </span>
        </button>
      ))}
    </div>
  );
}

function DateAndTimeSelector() {
  const [date, setDate] = useState("today");
  const [slot, setSlot] = useState("soon");
  return (
    <div className="space-y-4" style={{ width: 400 }}>
      <div className="flex flex-wrap gap-2">
        {DATE_TABS.map((d) => (
          <button
            key={d.id}
            onClick={() => setDate(d.id)}
            className={`px-4 py-2 text-sm font-medium rounded-xl transition-colors cursor-pointer ${
              date === d.id
                ? "bg-neutral-900 text-white"
                : "bg-neutral-50 text-neutral-600 hover:bg-neutral-100"
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-2">
        {SLOTS.map((s) => (
          <button
            key={s.id}
            onClick={() => setSlot(s.id)}
            className={`px-3 py-2 text-xs font-medium rounded-xl text-center transition-colors cursor-pointer ${
              slot === s.id
                ? "border-2 border-neutral-900 text-neutral-900"
                : "border border-neutral-200 text-neutral-600 hover:border-neutral-300"
            }`}
          >
            {s.label}
            <br />
            <span className={slot === s.id ? "text-neutral-500" : "text-neutral-400"}>{s.time}</span>
          </button>
        ))}
      </div>
      <p className="text-xs text-neutral-400">
        Выбрано: {DATE_TABS.find((d) => d.id === date)?.label},{" "}
        {SLOTS.find((s) => s.id === slot)?.label}
      </p>
    </div>
  );
}

export const TimeSlots: Story = {
  render: () => <TimeSlotsOnly />,
};

export const DateAndTime: Story = {
  render: () => <DateAndTimeSelector />,
};
