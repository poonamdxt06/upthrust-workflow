import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com', // yahan apni image domain dalni hai
        pathname: '/**',
      },
      // agar aur domains hain, yahan add karo
    ],
  },
};

export default nextConfig;
