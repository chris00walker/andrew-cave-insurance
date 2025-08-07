/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Remove base path for GitHub Pages - use root domain
  basePath: '',
  assetPrefix: '',
}

module.exports = nextConfig
