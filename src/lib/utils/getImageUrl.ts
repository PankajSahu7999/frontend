import { getMediaUrl } from '@/config/api.config';

export const getImageUrl = (input?: any): string => {
  if (!input) return '/images/888.png';

  let path: string | null = null;

  if (typeof input === 'string') {
    path = input;
  } else if (typeof input === 'object') {
    path = input.logo || input.logo_url || input.featured_image || null;
  }

  if (!path || typeof path !== 'string' || path.trim() === '') {
    return '/images/888.png';
  }

  return getMediaUrl(path) || '/images/888.png';
};
