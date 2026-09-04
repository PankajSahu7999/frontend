export interface CountryItem {
  id?: string;
  name: string;
  code: string;
}

// Full list of world countries with ISO codes for emoji flag rendering
export const ALL_WORLD_COUNTRIES: CountryItem[] = [
  { name: 'All Countries', code: 'ALL' },
  { name: 'United States', code: 'US' },
  { name: 'United Kingdom', code: 'GB' },
  { name: 'Canada', code: 'CA' },
  { name: 'Australia', code: 'AU' },
  { name: 'Germany', code: 'DE' },
  { name: 'India', code: 'IN' },
  { name: 'Sweden', code: 'SE' },
  { name: 'Norway', code: 'NO' },
  { name: 'Finland', code: 'FI' },
  { name: 'Brazil', code: 'BR' },
  { name: 'Japan', code: 'JP' },
  { name: 'New Zealand', code: 'NZ' },
  { name: 'Ireland', code: 'IE' },
  { name: 'Netherlands', code: 'NL' },
  { name: 'France', code: 'FR' },
  { name: 'Spain', code: 'ES' },
  { name: 'Italy', code: 'IT' },
  { name: 'Austria', code: 'AT' },
  { name: 'Switzerland', code: 'CH' },
  { name: 'Denmark', code: 'DK' },
  { name: 'Poland', code: 'PL' },
  { name: 'Portugal', code: 'PT' },
  { name: 'South Africa', code: 'ZA' },
  { name: 'Mexico', code: 'MX' },
  { name: 'Argentina', code: 'AR' },
  { name: 'Chile', code: 'CL' },
  { name: 'Colombia', code: 'CO' },
  { name: 'Peru', code: 'PE' },
  { name: 'Singapore', code: 'SG' },
  { name: 'Malaysia', code: 'MY' },
  { name: 'Philippines', code: 'PH' },
  { name: 'Thailand', code: 'TH' },
  { name: 'Vietnam', code: 'VN' },
  { name: 'Indonesia', code: 'ID' },
  { name: 'United Arab Emirates', code: 'AE' },
  { name: 'Saudi Arabia', code: 'SA' },
  { name: 'Turkey', code: 'TR' },
  { name: 'Greece', code: 'GR' },
  { name: 'Czech Republic', code: 'CZ' },
  { name: 'Romania', code: 'RO' },
  { name: 'Hungary', code: 'HU' },
  { name: 'Belgium', code: 'BE' },
  { name: 'Croatia', code: 'HR' },
  { name: 'Bulgaria', code: 'BG' },
  { name: 'Slovakia', code: 'SK' },
  { name: 'Slovenia', code: 'SI' },
  { name: 'Estonia', code: 'EE' },
  { name: 'Latvia', code: 'LV' },
  { name: 'Lithuania', code: 'LT' },
  { name: 'Cyprus', code: 'CY' },
  { name: 'Malta', code: 'MT' },
  { name: 'Luxembourg', code: 'LU' },
  { name: 'Iceland', code: 'IS' },
  { name: 'Israel', code: 'IL' },
  { name: 'South Korea', code: 'KR' },
  { name: 'Nigeria', code: 'NG' },
  { name: 'Kenya', code: 'KE' },
  { name: 'Ghana', code: 'GH' },
  { name: 'Egypt', code: 'EG' },
  { name: 'Morocco', code: 'MA' },
];

export const getCountryEmoji = (code?: string): string => {
  if (!code || code === 'ALL' || code.length !== 2) return '🌍';
  const upper = code.toUpperCase();
  const codePoints = [...upper].map((c) => 127397 + c.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};
