import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    // Optimize for multi-tenant subdomain routing
  },
  devIndicators: {
    autoOrigin: false,
  },
  allowedOrigins: ["lvh.me", "*.lvh.me", "localhost"],
};

export default nextConfig;
