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
  // Manual basePath for GitHub Pages
  basePath: process.env.NODE_ENV === 'production' ? '/andrew-cave-insurance' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/andrew-cave-insurance/' : '',
}

module.exports = nextConfig
