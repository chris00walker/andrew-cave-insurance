/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable React strict mode for better compatibility with some libraries
  reactStrictMode: false,
  // Enable static HTML export for Netlify
  distDir: 'out',
}

module.exports = nextConfig;
