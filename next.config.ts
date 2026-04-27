import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** dev: снять предупреждения Playwright / e2e при заходе с 127.0.0.1 */
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  images: {
    /** SVG и внешние URL без сбоев оптимизатора в dev / при блокировках CDN */
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
