import type { NextConfig } from "next";
const { MoniconPlugin } = require("@monicon/webpack")

const nextConfig: NextConfig = {
  images: {
    domains: ['api.meditechx.ca'],
    // or use remotePatterns for more control (recommended in Next.js 13+)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.meditechx.ca',
        port: '',
        pathname: '/media/media/images/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.meditechx.ca/api/:path*/', // فقط در destination اسلش اضافه کن
      },
    ];
  },
  webpack: (config) => {
    config.plugins.push(
      new MoniconPlugin({
        icons: [
          "icon:logo",
          "icon:mtx"
        ],
        // Load all icons from the listed collections
        collections: [
          {
            name: "icon",
            path: "./public/icons",
            type: "svg"
          }
        ],
      })
    );

    return config;
  },
};

export default nextConfig;
