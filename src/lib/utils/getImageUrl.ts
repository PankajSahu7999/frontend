import { getMediaUrl } from '@/config/api.config';

export const getImageUrl = (url?: string | null): string => {
  if (!url) return '/images/888.png';
  // getMediaUrl handles rewriting localhost-stored URLs to the production origin
  return getMediaUrl(url) || '/images/888.png';
};
