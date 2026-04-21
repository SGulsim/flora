import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "./header";
import { withCartItems } from "@/__mocks__/story-utils";

const meta: Meta<typeof Header> = {
  title: "UI/Header",
  component: Header,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Empty: Story = {};

export const WithItemsInCart: Story = {
  decorators: [withCartItems],
};
