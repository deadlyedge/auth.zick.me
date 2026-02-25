import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["clerk.zick.me"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "clerk.zick.me",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
