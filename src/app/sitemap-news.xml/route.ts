import { NextResponse } from "next/server";
import { SITE } from "@/constants";
import { getAllNews } from "@/lib/seo";

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

export const revalidate = 3600;

export async function GET() {
  try {
    const news = await getAllNews();

    if (!Array.isArray(news)) {
      console.error("Sitemap error: getAllNews did not return an array.");
      return new NextResponse("Internal Server Error", { status: 500 });
    }

    const cutoff = new Date();

    cutoff.setHours(cutoff.getHours() - 96);

    const recentNews = news.filter((article: any) => {
      if (!article?.published_at) return false;
      const publishDate = new Date(article.published_at);
      return publishDate >= cutoff;
      //   return true; // For now, include all news articles
    });

    const baseUrl = SITE.url.endsWith("/") ? SITE.url.slice(0, -1) : SITE.url;

    const urls = recentNews.map((article: any) => {
      const slug = article.slug.startsWith("/")
        ? article.slug.slice(1)
        : article.slug;

      return `
  <url>
    <loc>${baseUrl}/news/${slug}</loc>
    <news:news>
      <news:publication>
        <news:name>${escapeXML(SITE.name)}</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${new Date(article.published_at).toISOString()}</news:publication_date>
      <news:title>${escapeXML(article.title)}</news:title>
    </news:news>
  </url>`;
    });

    const xml = createXML(`
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  ${urls.join("").trim()}
</urlset>
    `);

    return new NextResponse(xml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control":
          "public, max-age=3600, s-maxage=3600, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    console.error("Google News sitemap generation crashed:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
