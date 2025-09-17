/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
  images: {
    unoptimized: true,
    // For static exports, we need to specify the path for the loader
    loader: 'custom',
    loaderFile: './src/lib/image-loader.js',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable React strict mode for better compatibility with some libraries
  reactStrictMode: false,
  // Enable static HTML export for Netlify
  distDir: 'out',
  // Handle 404s in client-side routing for SPA behavior
  exportPathMap: async function() {
    return {
      '/': { page: '/' },
      '/blog': { page: '/blog' },
      // Add other static pages here
    };
  },
}

// Create a custom image loader for static exports
const fs = require('fs');
if (!fs.existsSync('./src/lib')) {
  fs.mkdirSync('./src/lib', { recursive: true });
}

// Create a custom image loader for static exports
fs.writeFileSync(
  './src/lib/image-loader.js',
  '// Custom image loader for static exports\n' +
  'module.exports = function({ src, width, quality }) {\n' +
  '  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";\n' +
  '  return basePath + src;\n' +
  '};'
);

module.exports = nextConfig;
