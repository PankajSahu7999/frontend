import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get("url");

  const noCacheHeaders = {
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
    Pragma: "no-cache",
    Expires: "0",
  };

  if (!targetUrl || (!targetUrl.startsWith("http://") && !targetUrl.startsWith("https://"))) {
    return NextResponse.json({ canEmbed: false }, { headers: noCacheHeaders });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3500);

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

    const isBlocked =
      !response.ok ||
      response.status >= 400 ||
      xfo.includes("deny") ||
      xfo.includes("sameorigin") ||
      csp.includes("frame-ancestors");

    return NextResponse.json({ canEmbed: !isBlocked }, { headers: noCacheHeaders });
  } catch {
    return NextResponse.json({ canEmbed: false }, { headers: noCacheHeaders });
  }
}
