import React from "react";
import type { Preview, Decorator } from "@storybook/react";
import { AuthProvider } from "@/shared/context/auth-context";
import { CartProvider } from "@/shared/context/cart-context";
import "../src/app/globals.css";

const withProviders: Decorator = (Story) => (
  <AuthProvider>
    <CartProvider>
      <Story />
    </CartProvider>
  </AuthProvider>
);

const preview: Preview = {
  decorators: [withProviders],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
