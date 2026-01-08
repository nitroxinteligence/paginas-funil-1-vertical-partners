import type { NextConfig } from "next";

const lpFunilOrigin = process.env.LP_FUNIL_ORIGIN;

const nextConfig: NextConfig = {
  async rewrites() {
    if (!lpFunilOrigin) {
      return [];
    }
    return [
      {
        source: "/lp-funil",
        destination: `${lpFunilOrigin}/lp-funil`,
      },
      {
        source: "/lp-funil/:path*",
        destination: `${lpFunilOrigin}/lp-funil/:path*`,
      },
    ];
  },
};

export default nextConfig;
