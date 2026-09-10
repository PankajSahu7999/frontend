/**
 * Utility to detect search engine crawlers, bots, and inspection tools.
 * Crawlers should not trigger client analytics, background polling,
 * rate-limited external geolocation APIs, or intrusive entry popups.
 */
export function isCrawlerOrBot(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false;
  }
  const ua = (navigator.userAgent || '').toLowerCase();
  return /googlebot|google-inspectiontool|bingbot|baiduspider|duckduckbot|yandexbot|sogou|exabot|facebot|facebookexternalhit|ia_archiver|chrome-lighthouse|lighthouse/i.test(
    ua
  );
}
