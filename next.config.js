/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  distDir: 'out',
  exclude: [
    '**/*.test.js', 
    '**/*.spec.js',
    '**/tools/**',
  ],
  images: {
    unoptimized: true
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      }
    }
  }
}

module.exports = nextConfig
