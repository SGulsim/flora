import type { Meta, StoryObj } from "@storybook/react";
import CheckoutPage from "./page";
import { withCartItems } from "@/__mocks__/story-utils";

const meta: Meta<typeof CheckoutPage> = {
  title: "Pages/Checkout",
  component: CheckoutPage,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [withCartItems],
};

export default meta;
type Story = StoryObj<typeof CheckoutPage>;

export const Default: Story = {};
