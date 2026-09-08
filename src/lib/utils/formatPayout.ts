/**
 * Formats verbose payout / withdrawal time strings into clean, 1-2 line card-friendly text.
 * e.g.:
 * - "EWallets: 0-1 hours Bank Transfers: 0-1 hours..." -> "Instant - 1 Hour"
 * - "EWallets: 0-24 hours Bank Transfers: 3-7 days..." -> "0-24 Hours"
 * - "EWallets: 24-48 hours..." -> "24-48 Hours"
 * - "24 hours" -> "24 Hours"
 * - "Instant / 24h" -> "Instant / 24h"
 */
export function formatPayoutTime(time?: string | null): string {
  if (!time || typeof time !== 'string') return 'Instant / 24h';
  const clean = time.trim();
  if (!clean) return 'Instant / 24h';

  // If already short and clean, return as is (with capitalized Hours/Days)
  if (clean.length <= 16 && !clean.includes(':')) {
    return clean
      .replace(/\bhours?\b/i, 'Hours')
      .replace(/\bdays?\b/i, 'Days')
      .replace(/\bmins?\b|\bminutes?\b/i, 'Mins');
  }

  // 1. Check for EWallets / Wallets
  const walletMatch = clean.match(/(?:E-?Wallets?|Wallets?):\s*([0-9-]+\s*(?:hours?|hrs?|days?|mins?|minutes?))/i);
  if (walletMatch) {
    const val = walletMatch[1].trim()
      .replace(/\bhours?\b/i, 'Hours')
      .replace(/\bdays?\b/i, 'Days')
      .replace(/\bmins?\b|\bminutes?\b/i, 'Mins');
    return val === '0-1 Hours' || val === '0-0 Hours' ? 'Instant - 1 Hour' : val;
  }

  // 2. Check for Card Payments
  const cardMatch = clean.match(/Card Payments?:\s*([0-9-]+\s*(?:hours?|hrs?|days?|mins?|minutes?))/i);
  if (cardMatch && !/not offered/i.test(cardMatch[1])) {
    return cardMatch[1].trim()
      .replace(/\bhours?\b/i, 'Hours')
      .replace(/\bdays?\b/i, 'Days')
      .replace(/\bmins?\b|\bminutes?\b/i, 'Mins');
  }

  // 3. Check for Bank Transfers
  const bankMatch = clean.match(/Bank Transfers?:\s*([0-9-]+\s*(?:hours?|hrs?|days?|mins?|minutes?))/i);
  if (bankMatch && !/not offered/i.test(bankMatch[1])) {
    return bankMatch[1].trim()
      .replace(/\bhours?\b/i, 'Hours')
      .replace(/\bdays?\b/i, 'Days')
      .replace(/\bmins?\b|\bminutes?\b/i, 'Mins');
  }

  // 4. Check for any general time range like "0-24 hours" or "1-3 days"
  const generalMatch = clean.match(/([0-9-]+\s*(?:hours?|hrs?|days?|mins?|minutes?))/i);
  if (generalMatch) {
    const val = generalMatch[1].trim()
      .replace(/\bhours?\b/i, 'Hours')
      .replace(/\bdays?\b/i, 'Days')
      .replace(/\bmins?\b|\bminutes?\b/i, 'Mins');
    return val === '0-1 Hours' || val === '0-0 Hours' ? 'Instant - 1 Hour' : val;
  }

  if (/instant/i.test(clean)) return 'Instant';

  // Truncate cleanly if still long
  return clean.length > 20 ? clean.slice(0, 18) + '...' : clean;
}
