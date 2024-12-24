import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enables source maps in production
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**" // Matches all paths under the hostname
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
        pathname: "/**" // Matches all paths under the hostname
      }
    ]
  }
};

export default nextConfig;
