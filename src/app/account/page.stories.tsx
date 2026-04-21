import type { Meta, StoryObj } from "@storybook/react";
import AccountPage from "./page";
import { withLoggedInUser } from "@/__mocks__/story-utils";

const meta: Meta<typeof AccountPage> = {
  title: "Pages/Account",
  component: AccountPage,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [withLoggedInUser],
};

export default meta;
type Story = StoryObj<typeof AccountPage>;

export const ProfileTab: Story = {};
