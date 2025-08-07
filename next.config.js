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
  // Manual basePath for GitHub Pages - assetPrefix requires trailing slash
  basePath: '/andrew-cave-insurance',
  assetPrefix: '/andrew-cave-insurance/',
}

module.exports = nextConfig
