const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export const API_CONFIG = {
  baseURL: rawApiUrl,
  mediaBaseURL: rawApiUrl.replace(/\/api\/?$/, ''),
  frontendURL: process.env.NEXT_PUBLIC_FRONTEND_URL || '',
  isDevelopment: process.env.NODE_ENV !== 'production',
  timeout: 10000,
};

export const buildApiUrl = (path: string) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_CONFIG.baseURL}${normalizedPath}`;
};

export const getMediaUrl = (path?: string) => {
  if (!path) return '';

  if (/^https?:\/\//i.test(path)) {
    try {
      const parsedUrl = new URL(path);
      const baseUrl = API_CONFIG.mediaBaseURL || process.env.NEXT_PUBLIC_API_URL || '';
      if (!baseUrl) return path;

      const configuredOrigin = new URL(baseUrl.replace(/\/api\/?$/, '')).origin;

      // If this is an uploaded media file, ensure it points to the active environment origin
      if (parsedUrl.pathname.startsWith('/uploads/')) {
        return `${configuredOrigin}${parsedUrl.pathname}${parsedUrl.search}${parsedUrl.hash}`;
      }
      return path;
    } catch {
      return path;
    }
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_CONFIG.mediaBaseURL}${normalizedPath}`;
};

export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  REFRESH: '/auth/refresh',
  
  // Casinos
  CASINOS: '/casinos',
  CASINO_BY_ID: (id: string) => `/casinos/${id}`,
  FEATURED_CASINOS: '/casinos/featured',
  
  // Bonuses
  BONUSES: '/bonuses',
  BONUS_BY_ID: (id: string) => `/bonuses/${id}`,
  
  // Reviews
  REVIEWS: '/reviews',
  REVIEW_BY_ID: (id: string) => `/reviews/${id}`,
  CASINO_REVIEWS: (casinoId: string) => `/reviews/casino/${casinoId}`,
  
  // Categories
  CATEGORIES: '/categories',
  CATEGORY_BY_ID: (id: string) => `/categories/${id}`,
  
  // News
  NEWS: '/news',
  NEWS_BY_ID: (id: string) => `/news/${id}`,
  
  // Newsletter
  NEWSLETTER_SUBSCRIBE: '/newsletter/subscribe',
  NEWSLETTER_UNSUBSCRIBE: '/newsletter/unsubscribe',
  
  // Email Campaigns
  EMAIL_CAMPAIGNS: '/email-campaigns',
  SEND_CAMPAIGN: (id: string) => `/email-campaigns/${id}/send`,
  
  // Site Settings
  SITE_SETTINGS: '/settings',
  
  // Users
  USER_PROFILE: '/users/profile',
  UPDATE_PROFILE: '/users/profile',
} as const;
