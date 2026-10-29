// Utility functions for country detection and flags

export interface CountryInfo {
  code: string;
  name: string;
  currencySymbol?: string;
}

export const POPULAR_COUNTRIES: CountryInfo[] = [
  { code: 'GB', name: 'United Kingdom', currencySymbol: '£' },
  { code: 'US', name: 'United States', currencySymbol: '$' },
  { code: 'CA', name: 'Canada', currencySymbol: '$' },
  { code: 'AU', name: 'Australia', currencySymbol: '$' },
  { code: 'DE', name: 'Germany', currencySymbol: '€' },
  { code: 'IN', name: 'India', currencySymbol: '$' },
  { code: 'IE', name: 'Ireland', currencySymbol: '€' },
  { code: 'NZ', name: 'New Zealand', currencySymbol: '$' },
  { code: 'ZA', name: 'South Africa', currencySymbol: 'R' },
  { code: 'BR', name: 'Brazil', currencySymbol: 'R$' },
  { code: 'JP', name: 'Japan', currencySymbol: '¥' },
  { code: 'AE', name: 'UAE', currencySymbol: 'AED' },
];

/**
 * Get country flag image URL using FlagCDN
 */
export function getCountryFlagUrl(countryCode?: string | null): string {
  if (!countryCode) return 'https://flagcdn.com/w40/un.png';
  const code = countryCode.trim().toLowerCase();
  return `https://flagcdn.com/w40/${code}.png`;
}

/**
 * Convert 2-letter ISO country code to flag emoji
 */
export function getCountryFlagEmoji(countryCode?: string | null): string {
  if (!countryCode) return '🌐';
  const code = countryCode.trim().toUpperCase();
  if (code.length !== 2 || !/^[A-Z]{2}$/.test(code)) return '🌐';
  const codePoints = [...code].map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

/**
 * Detect user's country using multi-tiered resolution:
 * 1. Internal /api/detect-country route (same-origin, reads Cloudflare & proxy IP headers)
 * 2. Client-side api.country.is
 * 3. Client-side ipwho.is
 * 4. Fallback to US
 */
export async function detectUserCountry(): Promise<{ country: string; ip?: string }> {
  // 1. Try internal Next.js API route first (guaranteed same-origin, no CSP block)
  try {
    const res = await fetch('/api/detect-country', {
      cache: 'no-store',
      headers: { Accept: 'application/json' },
    });
    if (res.ok) {
      const data = await res.json();
      if (data.country && typeof data.country === 'string' && data.country.length === 2) {
        return { country: data.country.toUpperCase(), ip: data.ip };
      }
    }
  } catch {}

  // 2. Try api.country.is (fast Cloudflare edge)
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);
    const res = await fetch('https://api.country.is/', {
      cache: 'no-store',
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (res.ok) {
      const data = await res.json();
      if (data.country && typeof data.country === 'string' && data.country.length === 2) {
        return { country: data.country.toUpperCase(), ip: data.ip };
      }
    }
  } catch {}

  // 3. Try ipwho.is
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);
    const res = await fetch('https://ipwho.is/', {
      cache: 'no-store',
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (res.ok) {
      const data = await res.json();
      if (data.success !== false && data.country_code && data.country_code.length === 2) {
        return { country: data.country_code.toUpperCase(), ip: data.ip };
      }
    }
  } catch {}

  return { country: 'US' };
}

/**
 * Set manual country override by user
 */
export function setManualCountry(code: string | null): void {
  if (typeof window === 'undefined') return;
  if (!code || code === 'AUTO') {
    localStorage.removeItem('user_country_manual');
    sessionStorage.removeItem('user_country_cache');
  } else {
    localStorage.setItem('user_country_manual', code.trim().toUpperCase());
  }
}

/**
 * Get manual country override if chosen by user
 */
export function getManualCountry(): string | null {
  if (typeof window === 'undefined') return null;
  const manual = localStorage.getItem('user_country_manual');
  if (manual && manual.trim().length === 2) {
    return manual.trim().toUpperCase();
  }
  return null;
}

export function storeCountryCode(code: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('user_country', code.trim().toUpperCase());
  }
}

export function getStoredCountryCode(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('user_country');
  }
  return null;
}

let activeDetectionPromise: Promise<string> | null = null;

/**
 * Get user country code.
 * Always resolves accurately to current IP/VPN unless user set a manual override.
 */
export async function getUserCountryCode(forceRefresh = false): Promise<string> {
  if (typeof window !== 'undefined') {
    const manual = getManualCountry();
    if (manual) {
      return manual;
    }

    if (!forceRefresh) {
      try {
        const cached = sessionStorage.getItem('user_country_cache');
        if (cached && cached.trim().length === 2) {
          return cached.trim().toUpperCase();
        }
      } catch {}
    }
  }

  if (activeDetectionPromise && !forceRefresh) {
    return activeDetectionPromise;
  }

  activeDetectionPromise = detectUserCountry()
    .then((result) => {
      const code = (result.country || 'US').toUpperCase();
      if (typeof window !== 'undefined') {
        try {
          sessionStorage.setItem('user_country_cache', code);
        } catch {}
      }
      activeDetectionPromise = null;
      return code;
    })
    .catch(() => {
      activeDetectionPromise = null;
      return 'US';
    });

  return activeDetectionPromise;
}
