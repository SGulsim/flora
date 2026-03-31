import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";
import path from "path";
import tailwindPostcss from "@tailwindcss/postcss";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "../src"),
          "next/image": path.resolve(__dirname, "../src/__mocks__/next-image.tsx"),
          "next/link": path.resolve(__dirname, "../src/__mocks__/next-link.tsx"),
          "next/navigation": path.resolve(__dirname, "../src/__mocks__/next-navigation.tsx"),
        },
      },
      css: {
        postcss: {
          plugins: [tailwindPostcss],
        },
      },
    });
  },
};

export default config;
