import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  let targetUrl = searchParams.get("url")?.trim();

  const noCacheHeaders = {
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
    Pragma: "no-cache",
    Expires: "0",
  };

  if (!targetUrl) {
    return NextResponse.json({ canEmbed: false }, { headers: noCacheHeaders });
  }

  if (!/^https?:\/\//i.test(targetUrl)) {
    targetUrl = `https://${targetUrl}`;
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);

    let response: Response;
    try {
      response = await fetch(targetUrl, {
        method: "HEAD",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        },
        signal: controller.signal,
        redirect: "follow",
      });

      if (response.status === 405 || response.status === 501) {
        response = await fetch(targetUrl, {
          method: "GET",
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          },
          signal: controller.signal,
          redirect: "follow",
        });
      }
    } finally {
      clearTimeout(timeout);
    }

    const xfo = (response.headers.get("x-frame-options") || "").toLowerCase();
    const csp = (response.headers.get("content-security-policy") || "").toLowerCase();

    // Check if the site explicitly forbids iframes via headers
    const hasFrameBlock =
      xfo.includes("deny") ||
      xfo.includes("sameorigin") ||
      csp.includes("frame-ancestors");

    // Only 404, 410, or 500+ are treated as broken/dead URLs.
    // 403 or 401 without frame-block headers is Cloudflare/WAF bot protection against server/datacenter IPs,
    // which real residential browser users load without issue.
    const isDeadUrl = response.status === 404 || response.status === 410 || response.status >= 500;

    const isBlocked = hasFrameBlock || isDeadUrl;

    return NextResponse.json({ canEmbed: !isBlocked }, { headers: noCacheHeaders });
  } catch {
    // If the server check times out or network fails, default to true so the browser gets the chance to load
    return NextResponse.json({ canEmbed: true }, { headers: noCacheHeaders });
  }
}
