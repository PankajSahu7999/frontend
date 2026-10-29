import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  // 1. Check Cloudflare Edge country header
  const cfCountry = request.headers.get('cf-ipcountry');
  if (cfCountry && cfCountry.length === 2 && cfCountry !== 'XX' && cfCountry !== 'T1') {
    return NextResponse.json(
      { country: cfCountry.toUpperCase(), source: 'cloudflare' },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      }
    );
  }

  // 2. Extract client IP from forwarding headers
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  let clientIp = '';

  if (forwardedFor) {
    clientIp = forwardedFor.split(',')[0].trim();
  } else if (realIp) {
    clientIp = realIp.trim();
  }

  // Clean IPv6 prefix if present (e.g., ::ffff:192.0.2.1)
  if (clientIp.startsWith('::ffff:')) {
    clientIp = clientIp.replace('::ffff:', '');
  }

  // If local or private IP, return null so client fallback can run
  const isPrivateIp =
    !clientIp ||
    clientIp === '127.0.0.1' ||
    clientIp === '::1' ||
    clientIp.startsWith('192.168.') ||
    clientIp.startsWith('10.') ||
    clientIp.startsWith('172.16.');

  if (!isPrivateIp) {
    // 3. Server-side IP lookup via api.country.is
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);
      const res = await fetch(`https://api.country.is/${clientIp}`, {
        signal: controller.signal,
        cache: 'no-store',
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (data.country && typeof data.country === 'string' && data.country.length === 2) {
          return NextResponse.json(
            { country: data.country.toUpperCase(), ip: clientIp, source: 'server-api.country.is' },
            { headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' } }
          );
        }
      }
    } catch {
      // try fallback
    }

    // 4. Server-side fallback via ipwho.is
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);
      const res = await fetch(`https://ipwho.is/${clientIp}`, {
        signal: controller.signal,
        cache: 'no-store',
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (data.success !== false && data.country_code && data.country_code.length === 2) {
          return NextResponse.json(
            { country: data.country_code.toUpperCase(), ip: clientIp, source: 'server-ipwho.is' },
            { headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' } }
          );
        }
      }
    } catch {
      // ignore
    }
  }

  return NextResponse.json(
    { country: null, ip: clientIp || null, source: 'unknown' },
    { headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' } }
  );
}
