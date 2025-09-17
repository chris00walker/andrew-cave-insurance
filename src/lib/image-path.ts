 /**
 * Get the correct image path for Netlify deployment
 * For Netlify, we don't need a basePath since it serves from root
 */
export function getImagePath(imagePath: string): string {
  // Remove leading slash if present
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  
  // Always return the path with leading slash for proper resolution
  return `/${cleanPath}`;
}
