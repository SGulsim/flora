import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import NextImage from "@/__mocks__/next-image";

const meta: Meta = {
  title: "UI/ImageSelector",
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj;

const IMAGES = [
  "https://images.unsplash.com/photo-1591886960571-74d43a9d4166?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1562690868-60bbe7293e94?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=600&auto=format&fit=crop",
];

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState(0);
    return (
      <div className="space-y-4" style={{ width: 360 }}>
        <div className="aspect-[4/5] rounded-[2rem] overflow-hidden bg-neutral-100 border border-neutral-100 relative">
          <NextImage
            src={IMAGES[selected]}
            alt="Букет"
            fill
            className="object-cover"
          />
        </div>
        <div className="grid grid-cols-4 gap-4">
          {IMAGES.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`aspect-square rounded-xl overflow-hidden bg-neutral-100 cursor-pointer transition-all ${
                selected === i
                  ? "border-2 border-neutral-900"
                  : "border border-transparent hover:border-neutral-200 opacity-60 hover:opacity-100"
              }`}
            >
              <NextImage
                src={img}
                alt=""
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    );
  },
};
