// next.config.js
/** @type {import('next').NextConfig} */
export default {
  trailingSlash: true,
  reactStrictMode: true,
  // turbopack: {
  // },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  experimental: {
    externalDir: true,
  },
};