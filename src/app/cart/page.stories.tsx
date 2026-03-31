import type { Meta, StoryObj } from "@storybook/react";
import CartPage from "./page";
import { withCartItems } from "@/__mocks__/story-utils";

const meta: Meta<typeof CartPage> = {
  title: "Pages/Cart",
  component: CartPage,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof CartPage>;

export const Empty: Story = {};

export const WithItems: Story = {
  decorators: [withCartItems],
};
