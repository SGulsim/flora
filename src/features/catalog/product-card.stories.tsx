import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ProductCard } from "./product-card";
import type { Bouquet } from "@/shared/lib/mock-data";
import { BOUQUETS } from "@/shared/lib/mock-data";

const meta: Meta<typeof ProductCard> = {
  title: "Catalog/ProductCard",
  component: ProductCard,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div style={{ width: 280 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProductCard>;

export const Default: Story = {
  args: { bouquet: BOUQUETS[0] },
};

export const Hit: Story = {
  args: { bouquet: { ...BOUQUETS[0], isHit: true } },
};

export const LowPrice: Story = {
  args: { bouquet: BOUQUETS[1] },
};

export const HighPrice: Story = {
  args: {
    bouquet: {
      ...BOUQUETS[2],
      price: 12500,
      name: "Роскошный пион",
      isHit: true,
    },
  },
};

export const Grid: Story = {
  decorators: [
    () => (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 280px)",
          gap: 24,
        }}
      >
        {BOUQUETS.map((b) => (
          <ProductCard key={b.id} bouquet={b} />
        ))}
      </div>
    ),
  ],
};
