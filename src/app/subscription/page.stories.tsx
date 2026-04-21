import type { Meta, StoryObj } from "@storybook/react";
import SubscriptionPage from "./page";

const meta: Meta<typeof SubscriptionPage> = {
  title: "Pages/Subscription",
  component: SubscriptionPage,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof SubscriptionPage>;

export const Default: Story = {};
