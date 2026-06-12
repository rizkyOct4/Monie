import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    proxyClientMaxBodySize: "50mb", // contoh 50MB
  },
  cacheComponents: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
