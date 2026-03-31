import type { Meta, StoryObj } from "@storybook/react";
import ProductPage from "./page";

// useParams mock returns { slug: "utrennij-tuman" } by default

const meta: Meta<typeof ProductPage> = {
  title: "Pages/ProductDetail",
  component: ProductPage,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof ProductPage>;

export const Default: Story = {};
