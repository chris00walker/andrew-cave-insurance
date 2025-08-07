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
  // GitHub Pages serves from a subdirectory, so we need to set the base path
  basePath: process.env.NODE_ENV === 'production' ? '/andrew-cave-insurance' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/andrew-cave-insurance/' : '',
}

module.exports = nextConfig
