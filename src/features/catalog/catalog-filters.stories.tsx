import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { CatalogFilters } from "./catalog-filters";

const meta: Meta<typeof CatalogFilters> = {
  title: "Catalog/CatalogFilters",
  component: CatalogFilters,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 280 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CatalogFilters>;

export const Interactive: Story = {
  render: () => {
    const [occasionFilter, setOccasionFilter] = useState<string[]>([]);
    const [priceMin, setPriceMin] = useState(1000);
    const [priceMax, setPriceMax] = useState(15000);

    return (
      <div>
        <CatalogFilters
          occasionFilter={occasionFilter}
          onOccasionChange={(id, checked) =>
            setOccasionFilter((prev) =>
              checked ? [...prev, id] : prev.filter((o) => o !== id)
            )
          }
          priceMin={priceMin}
          priceMax={priceMax}
          onPriceChange={(min, max) => {
            setPriceMin(min);
            setPriceMax(max);
          }}
        />
        <div className="mt-6 p-3 bg-neutral-50 rounded-xl text-xs text-neutral-500">
          <p>Поводы: {occasionFilter.length > 0 ? occasionFilter.join(", ") : "все"}</p>
          <p>Цена: {priceMin.toLocaleString("ru-RU")} – {priceMax.toLocaleString("ru-RU")} ₽</p>
        </div>
      </div>
    );
  },
};

export const WithPreselected: Story = {
  render: () => {
    const [occasionFilter, setOccasionFilter] = useState<string[]>(["birthday", "date"]);
    const [priceMin, setPriceMin] = useState(2000);
    const [priceMax, setPriceMax] = useState(8000);

    return (
      <CatalogFilters
        occasionFilter={occasionFilter}
        onOccasionChange={(id, checked) =>
          setOccasionFilter((prev) =>
            checked ? [...prev, id] : prev.filter((o) => o !== id)
          )
        }
        priceMin={priceMin}
        priceMax={priceMax}
        onPriceChange={(min, max) => {
          setPriceMin(min);
          setPriceMax(max);
        }}
      />
    );
  },
};
