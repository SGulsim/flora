import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Iconify } from "@/shared/ui/icon";

const meta: Meta = {
  title: "UI/Dropdown",
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj;

type SortOption = "popular" | "price-asc" | "price-desc" | "newest";

const SORT_LABELS: Record<SortOption, string> = {
  popular: "По популярности",
  "price-asc": "Сначала дешевле",
  "price-desc": "Сначала дороже",
  newest: "Новинки",
};

function SortDropdownComponent() {
  const [sort, setSort] = useState<SortOption>("popular");
  const [open, setOpen] = useState(false);

  return (
    // padding снизу даёт место для открытого dropdown
    <div style={{ paddingBottom: 180 }}>
      {/* relative только на обёртке кнопки, не на всём контейнере */}
      <div className="relative inline-block">
        <button
          onClick={() => setOpen((v) => !v)}
          className="text-sm text-neutral-600 flex items-center gap-1.5 cursor-pointer hover:text-neutral-900 transition-colors"
        >
          {SORT_LABELS[sort]}
          <Iconify
            icon="solar:alt-arrow-down-linear"
            width={16}
            height={16}
            className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>

        {/* Dropdown всегда в DOM — анимируется через opacity + translateY */}
        <div
          className={`absolute right-0 top-full mt-1 py-2 bg-white rounded-xl border border-neutral-100 shadow-lg z-10 min-w-[190px] transition-all duration-200 origin-top ${
            open
              ? "opacity-100 scale-y-100 translate-y-0 pointer-events-auto"
              : "opacity-0 scale-y-95 -translate-y-1 pointer-events-none"
          }`}
        >
          {(Object.keys(SORT_LABELS) as SortOption[]).map((opt) => (
            <button
              key={opt}
              onClick={() => {
                setSort(opt);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm transition-colors cursor-pointer hover:bg-neutral-50 hover:text-neutral-900 ${
                sort === opt ? "text-neutral-900 font-medium" : "text-neutral-500"
              }`}
            >
              {SORT_LABELS[opt]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export const SortDropdown: Story = {
  render: () => <SortDropdownComponent />,
};
