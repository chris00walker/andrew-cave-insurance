/**
 * Get the correct image path with basePath for GitHub Pages deployment
 * In development: /images/photo.jpg
 * In production: /andrew-cave-insurance/images/photo.jpg
 */
export function getImagePath(imagePath: string): string {
  // Remove leading slash if present
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  
  // In production (GitHub Pages), add the basePath
  if (process.env.NODE_ENV === 'production') {
    return `/andrew-cave-insurance/${cleanPath}`;
  }
  
  // In development, use the path as-is
  return `/${cleanPath}`;
}
