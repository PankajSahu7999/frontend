import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;
  const cleanSlug = (slug || '').toLowerCase().trim();

  // Generate unique click ID
  const clickId = `clk_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

  // Default Moolzy offer URL
  let targetUrl = 'https://lo.moolzy.com/u/b/2958076/vVeeD8G4iA9Z/';

  // If specific known casino or query param passed
  const customUrl = request.nextUrl.searchParams.get('url');
  if (customUrl) {
    targetUrl = customUrl;
  }

  const separator = targetUrl.includes('?') ? '&' : '?';
  const destination = `${targetUrl}${separator}affclickid=${clickId}`;

  return NextResponse.redirect(destination, { status: 302 });
}
