/**
 * Utility to generate fresh unique click IDs and construct dynamic tracking links for every user click.
 */
export function buildAffiliateClickUrl(
  baseUrl?: string | null,
  casinoId?: string | null
): { url: string; clickId: string } {
  const clickId = `clk_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  const url = baseUrl || 'https://casinoreviewsbook.com/go/moolzy';

  let finalUrl = url;
  if (finalUrl.includes('{click_id}')) {
    finalUrl = finalUrl.replace(/\{click_id\}/g, clickId);
  } else if (finalUrl.includes('{affclickid}')) {
    finalUrl = finalUrl.replace(/\{affclickid\}/g, clickId);
  } else if (/affclickid=[^&]*/i.test(finalUrl)) {
    finalUrl = finalUrl.replace(/affclickid=[^&]*/i, `affclickid=${clickId}`);
  } else {
    const separator = finalUrl.includes('?') ? '&' : '?';
    finalUrl = `${finalUrl}${separator}affclickid=${clickId}`;
  }

  // Record the click in the database asynchronously (fire-and-forget)
  if (casinoId && typeof window !== 'undefined') {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.casinoreviewsbook.com/api';
      fetch(`${apiUrl}/hasoffers/click`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          casino_id: casinoId,
          click_id: clickId,
          source: window.location.pathname,
        }),
        keepalive: true,
      }).catch(() => {});
    } catch {}
  }

  return { url: finalUrl, clickId };
}
