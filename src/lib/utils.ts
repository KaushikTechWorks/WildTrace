import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

export function getConservationStatusColor(status: string): string {
  const statusColors: Record<string, string> = {
    'EX': 'bg-black text-white',           // Extinct
    'EW': 'bg-gray-800 text-white',       // Extinct in Wild
    'CR': 'bg-red-600 text-white',        // Critically Endangered
    'EN': 'bg-orange-600 text-white',     // Endangered
    'VU': 'bg-yellow-600 text-white',     // Vulnerable
    'NT': 'bg-yellow-400 text-black',     // Near Threatened
    'LC': 'bg-green-600 text-white',      // Least Concern
    'DD': 'bg-gray-400 text-white',       // Data Deficient
    'NE': 'bg-gray-300 text-black',       // Not Evaluated
  };
  return statusColors[status] || 'bg-gray-300 text-black';
}

export function getConservationStatusLabel(status: string): string {
  const statusLabels: Record<string, string> = {
    'EX': 'Extinct',
    'EW': 'Extinct in Wild',
    'CR': 'Critically Endangered',
    'EN': 'Endangered',
    'VU': 'Vulnerable',
    'NT': 'Near Threatened',
    'LC': 'Least Concern',
    'DD': 'Data Deficient',
    'NE': 'Not Evaluated',
  };
  return statusLabels[status] || 'Unknown';
}

export function getThreatSeverityColor(severity: string): string {
  const severityColors: Record<string, string> = {
    'low': 'bg-green-100 text-green-800',
    'medium': 'bg-yellow-100 text-yellow-800',
    'high': 'bg-orange-100 text-orange-800',
    'very_high': 'bg-red-100 text-red-800',
  };
  return severityColors[severity] || 'bg-gray-100 text-gray-800';
}

export function capitalizeWords(str: string): string {
  return str
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}
