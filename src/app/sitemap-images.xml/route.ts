import { NextResponse } from "next/server";
import { SITE } from "@/constants";
import { getAllCasinos, getAllNews } from "@/lib/seo/seoApi";

// --- SEO XML Helper Functions Built-in ---
function escapeXML(str: string): string {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function createXML(body: string): string {
  return `<?xml version="1.0" encoding="UTF-8"?>\n${body.trim()}`;
}

export const revalidate = 86400;

export async function GET() {
  try {
    // Resolve all asynchronous image datasets concurrently
    const [casinosData, newsData] = await Promise.all([
      getAllCasinos(),
      getAllNews(),
      // getAllGuides(), // Uncomment if guide images are to be included
    ]);

    // Safety fallback initialization to avoid runtime filter/loop crashes
    const casinos = Array.isArray(casinosData) ? casinosData : [];
    const news = Array.isArray(newsData) ? newsData : [];
    // const guides = Array.isArray(guidesData) ? guidesData : [];

    const urls: string[] = [];

    // Strip trailing slash from base URL to ensure clean path layout formatting
    const baseUrl = SITE.url.endsWith("/") ? SITE.url.slice(0, -1) : SITE.url;

    /*
    |--------------------------------------------------------------------------
    | Casino Images
    |--------------------------------------------------------------------------
    */
    casinos.forEach((casino: any) => {
      if (!casino?.slug) return;
      const images: string[] = [];
      const slug = casino.slug.startsWith("/")
        ? casino.slug.slice(1)
        : casino.slug;

      if (casino.logo) {
        images.push(`
    <image:image>
      <image:loc>${escapeXML(casino.logo)}</image:loc>
      <image:title>${escapeXML(casino.name || "Casino Logo")}</image:title>
      <image:caption>${escapeXML(casino.name || "Casino")}</image:caption>
    </image:image>`);
      }

      if (casino.screenshot) {
        images.push(`
    <image:image>
      <image:loc>${escapeXML(casino.featured_image)}</image:loc>
      <image:title>${escapeXML(casino.name || "Casino")} Screenshot</image:title>
         <image:caption>${escapeXML(casino.name || "Casino")}</image:caption>
    </image:image>`);
      }

      // Only push the URL node if at least one image exists for the casino page
      if (images.length > 0) {
        urls.push(`
  <url>
    <loc>${baseUrl}/casino/${slug}</loc>${images.join("")}
  </url>`);
      }
    });

    /*
    |--------------------------------------------------------------------------
    | News Images
    |--------------------------------------------------------------------------
    */
    news.forEach((article: any) => {
      if (!article?.slug || !article?.featured_image) return;
      const slug = article.slug.startsWith("/")
        ? article.slug.slice(1)
        : article.slug;

      urls.push(`
  <url>
    <loc>${baseUrl}/news/${slug}</loc>
    <image:image>
      <image:loc>${escapeXML(article.featured_image)}</image:loc>
      <image:title>${escapeXML(article.title || "News Image")}</image:title>
      <image:caption>${escapeXML(article.title || "News")}</image:caption>
    </image:image>
  </url>`);
    });

    /*
    |--------------------------------------------------------------------------
    | Guide Images
    |--------------------------------------------------------------------------
    */
    //     guides.forEach((guide: any) => {
    //       if (!guide?.slug || !guide?.image) return;
    //       const slug = guide.slug.startsWith('/') ? guide.slug.slice(1) : guide.slug;

    //       urls.push(`
    //   <url>
    //     <loc>${baseUrl}/guides/${slug}</loc>
    //     <image:image>
    //       <image:loc>${escapeXML(guide.image)}</image:loc>
    //       <image:title>${escapeXML(guide.title || 'Guide Image')}</image:title>
    //     </image:image>
    //   </url>`);
    //     });

    const xml = createXML(`
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${urls.join("").trim()}
</urlset>
    `);

    return new NextResponse(xml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control":
          "public, max-age=86400, s-maxage=86400, stale-while-revalidate=3600",
      },
    });
  } catch (error) {
    console.error("Image sitemap generation crashed:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
