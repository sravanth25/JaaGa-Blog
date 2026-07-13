import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Optimizes Cloudinary and ImageKit URLs dynamically for better performance and smaller size.
 * Uses f_auto/q_auto/w_X for Cloudinary and tr=w-X,q-Y,f-auto for ImageKit.
 */
export function getOptimizedImageUrl(url: string | undefined, width: number = 800, quality: number = 80): string {
  if (!url) return '';
  
  // Cloudinary optimization
  if (url.includes('res.cloudinary.com')) {
    if (url.includes('/upload/')) {
      return url.replace('/upload/', `/upload/f_auto,q_auto,w_${width},c_limit/`);
    }
  }
  
  // ImageKit optimization
  if (url.includes('ik.imagekit.io')) {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}tr=w-${width},q-${quality},f-auto`;
  }
  
  return url;
}
