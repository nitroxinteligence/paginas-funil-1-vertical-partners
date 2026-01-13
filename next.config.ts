import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/lp-funil/api/:path*",
        destination: "/api/:path*",
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/lp-funil/index.html",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
