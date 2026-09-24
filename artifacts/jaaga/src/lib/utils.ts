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

/**
 * Converts a post ID (which might be a small sequential number or epoch-seconds) 
 * into a valid Date object representing either 2025 or 2026.
 */
export function getPostDate(postId: number, title?: string, slug?: string): Date {
  const date = new Date(postId);
  if (date.getFullYear() >= 2000) {
    return date;
  }
  
  const titleLower = (title || "").toLowerCase();
  const slugLower = (slug || "").toLowerCase();
  const has2026 = titleLower.includes("2026") || slugLower.includes("2026");
  const has2025 = titleLower.includes("2025") || slugLower.includes("2025");
  
  if (has2026) {
    return new Date(2026, 0, 15);
  }
  if (has2025) {
    return new Date(2025, 0, 15);
  }
  
  // Map recent small IDs or seconds-based epochs to 2026, others to 2025
  if (postId >= 34 || postId > 1000000) {
    return new Date(2026, 0, 15);
  }
  
  return new Date(2025, 0, 15);
}
