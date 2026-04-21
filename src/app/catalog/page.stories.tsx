import type { Meta, StoryObj } from "@storybook/react";
import CatalogPage from "./page";

const meta: Meta<typeof CatalogPage> = {
  title: "Pages/Catalog",
  component: CatalogPage,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof CatalogPage>;

export const Default: Story = {};
