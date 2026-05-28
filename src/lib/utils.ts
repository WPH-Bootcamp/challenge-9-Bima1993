import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { TMDB_IMAGE_BASE_URL } from '@/lib/constants';

// Utility function for merging Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImageUrl(path: string | null, size: string = 'original'): string {
  if (!path) {
    return '/placeholder-poster.svg';
  }

  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
}

export function formatDate(date: string): string {
  if (!date) {
    return 'Unknown date';
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));
}

export function formatRuntime(minutes: number | null): string {
  if (!minutes) {
    return 'Unknown runtime';
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) {
    return `${remainingMinutes}m`;
  }

  return `${hours}h ${remainingMinutes}m`;
}

export function formatRating(rating: number): string {
  return rating.toFixed(1);
}
