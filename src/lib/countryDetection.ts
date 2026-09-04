// Utility functions for country detection

export interface CountryInfo {
  code: string;
  name: string;
}

/**
 * Detect user's country using IP geolocation
 * Falls back to browser locale if IP detection fails
 */
export async function detectUserCountry(): Promise<string> {
  try {
    // Try IP geolocation first
    const response = await fetch('https://ipapi.co/json/');
    if (response.ok) {
      const data = await response.json();
      return data.country_code || data.country || 'US';
    }
  } catch (error) {
    console.error('IP geolocation failed:', error);
  }

  // Fallback to browser locale
  const locale = navigator.language || 'en-US';
  const countryCode = locale.split('-')[1] || locale;
  return countryCode.toUpperCase();
}

/**
 * Get country code from browser locale (fallback method)
 */
export function getCountryFromLocale(): string {
  const locale = navigator.language || 'en-US';
  const countryCode = locale.split('-')[1] || locale;
  return countryCode.toUpperCase();
}

/**
 * Store detected country in localStorage for persistence
 */
export function storeCountryCode(code: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('user_country', code);
  }
}

/**
 * Get stored country code from localStorage
 */
export function getStoredCountryCode(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('user_country');
  }
  return null;
}

let pendingDetectionPromise: Promise<string> | null = null;

/**
 * Get user country code (from storage or detect new)
 */
export async function getUserCountryCode(): Promise<string> {
  const stored = getStoredCountryCode();
  if (stored) {
    return stored;
  }

  if (pendingDetectionPromise) {
    return pendingDetectionPromise;
  }

  pendingDetectionPromise = detectUserCountry().then((detected) => {
    storeCountryCode(detected);
    pendingDetectionPromise = null;
    return detected;
  });

  return pendingDetectionPromise;
}
