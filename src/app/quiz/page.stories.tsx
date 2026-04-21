import type { Meta, StoryObj } from "@storybook/react";
import QuizPage from "./page";

const meta: Meta<typeof QuizPage> = {
  title: "Pages/Quiz",
  component: QuizPage,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof QuizPage>;

export const Step1Occasion: Story = {};
