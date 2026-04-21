import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Iconify } from "@/shared/ui/icon";

const meta: Meta = {
  title: "UI/Rating",
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj;

function RatingBadge({ value, count }: { value: number; count: number }) {
  return (
    <div className="flex items-center gap-1 text-xs font-medium text-yellow-500 bg-yellow-50 px-2 py-1 rounded-md">
      <Iconify icon="solar:star-bold" width={14} height={14} />
      {value}
      <span className="text-neutral-400 font-normal ml-1">({count})</span>
    </div>
  );
}

export const Default: Story = {
  render: () => <RatingBadge value={4.9} count={12} />,
};

export const Perfect: Story = {
  render: () => <RatingBadge value={5.0} count={24} />,
};

export const InContext: Story = {
  name: "В контексте карточки",
  render: () => (
    <div className="flex items-center gap-4">
      <span className="text-2xl font-medium text-neutral-900 tracking-tight">
        4 500 ₽
      </span>
      <RatingBadge value={4.9} count={12} />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <RatingBadge value={5.0} count={24} />
      <RatingBadge value={4.9} count={12} />
      <RatingBadge value={4.5} count={6} />
      <RatingBadge value={4.0} count={3} />
    </div>
  ),
};
