import type { Meta, StoryObj } from "@storybook/react";
import HomePage from "./page";

const meta: Meta<typeof HomePage> = {
  title: "Pages/Home",
  component: HomePage,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof HomePage>;

export const Default: Story = {};
