// Utility functions for country detection and flags

export interface CountryInfo {
  code: string;
  name: string;
}

export const POPULAR_COUNTRIES: CountryInfo[] = [
  { code: 'IN', name: 'India' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'AU', name: 'Australia' },
  { code: 'DE', name: 'Germany' },
  { code: 'IE', name: 'Ireland' },
  { code: 'NZ', name: 'New Zealand' },
  { code: 'ZA', name: 'South Africa' },
  { code: 'BR', name: 'Brazil' },
  { code: 'JP', name: 'Japan' },
  { code: 'AE', name: 'UAE' },
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
 * Convert 2-letter ISO country code to flag emoji (fallback for non-Windows systems)
 */
export function getCountryFlagEmoji(countryCode?: string | null): string {
  if (!countryCode) return '🌐';
  const code = countryCode.trim().toUpperCase();
  if (code.length !== 2 || !/^[A-Z]{2}$/.test(code)) return '🌐';
  const codePoints = [...code].map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

/**
 * Deduce country from browser's resolved IANA timezone
 */
export function getCountryFromTimezone(): string | null {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (!tz) return null;

    if (tz.includes('Calcutta') || tz.includes('Kolkata')) return 'IN';
    if (tz.includes('London')) return 'GB';
    if (
      tz.startsWith('America/New_York') ||
      tz.startsWith('America/Chicago') ||
      tz.startsWith('America/Los_Angeles') ||
      tz.startsWith('America/Denver') ||
      tz.startsWith('America/Phoenix')
    ) return 'US';
    if (
      tz.startsWith('America/Toronto') ||
      tz.startsWith('America/Vancouver') ||
      tz.startsWith('America/Montreal') ||
      tz.startsWith('America/Edmonton')
    ) return 'CA';
    if (tz.startsWith('Australia/')) return 'AU';
    if (tz.startsWith('Europe/Berlin')) return 'DE';
    if (tz.startsWith('Europe/Paris')) return 'FR';
    if (tz.startsWith('Europe/Rome')) return 'IT';
    if (tz.startsWith('Europe/Madrid')) return 'ES';
    if (tz.startsWith('Asia/Dubai')) return 'AE';
    if (tz.startsWith('Asia/Singapore')) return 'SG';
    if (tz.startsWith('Asia/Tokyo')) return 'JP';
    if (tz.startsWith('Asia/Karachi')) return 'PK';
    if (tz.startsWith('Asia/Dhaka')) return 'BD';
    if (tz.startsWith('America/Sao_Paulo')) return 'BR';
    if (tz.startsWith('Africa/Johannesburg')) return 'ZA';
    if (tz.startsWith('Europe/Amsterdam')) return 'NL';
    if (tz.startsWith('Europe/Stockholm')) return 'SE';
    if (tz.startsWith('Europe/Oslo')) return 'NO';
    if (tz.startsWith('Europe/Helsinki')) return 'FI';
    if (tz.startsWith('Europe/Dublin')) return 'IE';
    if (tz.startsWith('Pacific/Auckland')) return 'NZ';
    return null;
  } catch {
    return null;
  }
}

/**
 * Detect user's country using fast edge IP geolocation
 * Multi-tiered fallback: api.country.is -> freeipapi.com -> ipwho.is -> timezone -> locale
 */
export async function detectUserCountry(): Promise<string> {
  // 1. Try api.country.is (Cloudflare Edge, ultra-fast, open CORS)
  try {
    const res = await fetch('https://api.country.is/');
    if (res.ok) {
      const data = await res.json();
      if (data.country && typeof data.country === 'string' && data.country.length === 2) {
        return data.country.toUpperCase();
      }
    }
  } catch {
    // try next
  }

  // 2. Try freeipapi.com
  try {
    const res = await fetch('https://freeipapi.com/api/json');
    if (res.ok) {
      const data = await res.json();
      if (data.countryCode && typeof data.countryCode === 'string' && data.countryCode.length === 2) {
        return data.countryCode.toUpperCase();
      }
    }
  } catch {
    // try next
  }

  // 3. Try ipwho.is (open CORS, free, fast)
  try {
    const res = await fetch('https://ipwho.is/');
    if (res.ok) {
      const data = await res.json();
      if (data.success !== false && data.country_code && typeof data.country_code === 'string' && data.country_code.length === 2) {
        return data.country_code.toUpperCase();
      }
    }
  } catch {
    // try next
  }

  // 4. Fallback to client timezone
  const tzCountry = getCountryFromTimezone();
  if (tzCountry) {
    return tzCountry;
  }

  // 5. Fallback to browser locale
  return getCountryFromLocale();
}

/**
 * Get country code from browser locale (fallback method)
 */
export function getCountryFromLocale(): string {
  if (typeof navigator === 'undefined' || !navigator.language) return 'US';
  const locale = navigator.language;
  const parts = locale.split(/[-_]/);
  if (parts.length > 1 && parts[1].length === 2) {
    return parts[1].toUpperCase();
  }
  return 'US';
}

/**
 * Store detected country in localStorage for persistence
 */
export function storeCountryCode(code: string): void {
  if (typeof window !== 'undefined') {
    const clean = code.trim().toUpperCase();
    localStorage.setItem('user_country', clean);
  }
}

/**
 * Get stored country code from localStorage
 */
export function getStoredCountryCode(): string | null {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('user_country');
    if (stored && stored.trim().length === 2) {
      return stored.trim().toUpperCase();
    }
  }
  return null;
}

let pendingDetectionPromise: Promise<string> | null = null;

/**
 * Get user country code (from storage or detect new)
 */
export async function getUserCountryCode(forceRefresh = false): Promise<string> {
  if (typeof window !== 'undefined') {
    const manual = localStorage.getItem('user_country_manual');
    if (manual && manual.trim().length === 2) {
      return manual.trim().toUpperCase();
    }
  }

  if (!forceRefresh) {
    const stored = getStoredCountryCode();
    const tzCountry = getCountryFromTimezone();
    // Invalidate stale locale-based GB cache if user is in Indian timezone
    if (stored && tzCountry && stored === 'GB' && tzCountry === 'IN') {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user_country');
      }
    } else if (stored) {
      return stored;
    }
  }

  if (pendingDetectionPromise) {
    return pendingDetectionPromise;
  }

  pendingDetectionPromise = detectUserCountry()
    .then((detected) => {
      const clean = (detected || 'US').toUpperCase();
      storeCountryCode(clean);
      pendingDetectionPromise = null;
      return clean;
    })
    .catch(() => {
      pendingDetectionPromise = null;
      return 'US';
    });

  return pendingDetectionPromise;
}
