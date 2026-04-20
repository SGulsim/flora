import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
