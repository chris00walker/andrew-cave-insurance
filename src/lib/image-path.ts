 /**
 * Get the correct image path with basePath for different deployments
 * In development: /images/photo.jpg
 * In production: Uses NEXT_PUBLIC_BASE_PATH if set, otherwise /images/photo.jpg
 */
export function getImagePath(imagePath: string): string {
  // Remove leading slash if present
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  
  // Get base path from environment variable or use empty string
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  
  // Remove trailing slash from basePath if present
  const normalizedBasePath = basePath.endsWith('/') ? basePath.slice(0, -1) : basePath;
  
  // In production, use the basePath if it exists
  if (process.env.NODE_ENV === 'production' && basePath) {
    return `${normalizedBasePath}/${cleanPath}`.replace(/\/\//g, '/');
  }
  
  // In development or when no basePath is set, use the path as-is
  return `/${cleanPath}`;
}
