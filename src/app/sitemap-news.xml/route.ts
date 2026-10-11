// import { NextResponse } from "next/server";
// import { SITE } from "@/constants";
// import { getAllNews } from "@/lib/seo";

// // --- SEO XML Helper Functions Built-in ---
// function escapeXML(str: string): string {
//   if (!str) return "";
//   return str
//     .replace(/&/g, "&amp;")
//     .replace(/</g, "&lt;")
//     .replace(/>/g, "&gt;")
//     .replace(/"/g, "&quot;")
//     .replace(/'/g, "&apos;");
// }

// function createXML(body: string): string {
//   return `<?xml version="1.0" encoding="UTF-8"?>\n${body.trim()}`;
// }

// export const revalidate = 3600;

// export async function GET() {
//   try {
//     const news = await getAllNews();

//     if (!Array.isArray(news)) {
//       console.error("Sitemap error: getAllNews did not return an array.");
//       return new NextResponse("Internal Server Error", { status: 500 });
//     }

//     const cutoff = new Date();

//     cutoff.setHours(cutoff.getHours() - 96);

//     const recentNews = news.filter((article: any) => {
//       if (!article?.published_at) return false;
//       const publishDate = new Date(article.published_at);
//       return publishDate >= cutoff;
//     });

//     const baseUrl = SITE.url.endsWith("/") ? SITE.url.slice(0, -1) : SITE.url;

//     const urls = recentNews.map((article: any) => {
//       const slug = article.slug.startsWith("/")
//         ? article.slug.slice(1)
//         : article.slug;

//       return `
//   <url>
//     <loc>${baseUrl}/news/${slug}</loc>
//     <news:news>
//       <news:publication>
//         <news:name>${escapeXML(SITE.name)}</news:name>
//         <news:language>en</news:language>
//       </news:publication>
//       <news:publication_date>${new Date(article.published_at).toISOString()}</news:publication_date>
//       <news:title>${escapeXML(article.title)}</news:title>
//     </news:news>
//   </url>`;
//     });

//     const xml = createXML(`
// <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
//   ${urls.join("").trim()}
// </urlset>
//     `);

//     return new NextResponse(xml, {
//       status: 200,
//       headers: {
//         "Content-Type": "application/xml; charset=utf-8",
//         "Cache-Control":
//           "public, max-age=3600, s-maxage=3600, stale-while-revalidate=600",
//       },
//     });
//   } catch (error) {
//     console.error("Google News sitemap generation crashed:", error);
//     return new NextResponse("Internal Server Error", { status: 500 });
//   }
// }


import { NextResponse } from "next/server";
import { SITE } from "@/constants";
import { getAllNews } from "@/lib/seo/seoApi";

type NewsItem = {
  slug: string;
  title: string;
  published_at?: string | Date | null;
  created_at?: string | Date | null;
};

function escapeXml(value: string): string {
  return value.replace(/[<>&'"]/g, (char) => {
    const entities: Record<string, string> = {
      "<": "&lt;",
      ">": "&gt;",
      "&": "&amp;",
      "'": "&apos;",
      '"': "&quot;",
    };

    return entities[char];
  });
}

export async function GET() {
  const allNews = (await getAllNews()) as NewsItem[];
  const now = Date.now();
  const cutoff = now - 2 * 24 * 60 * 60 * 1000;

  const recentNews = allNews.filter((item) => {
    const publishedDate = item.published_at ?? item.created_at;

    if (!item.slug || !item.title || !publishedDate) return false;

    const timestamp = new Date(publishedDate).getTime();

    return (
      Number.isFinite(timestamp) &&
      timestamp >= cutoff &&
      timestamp <= now
    );
  });

  const urls = recentNews
    .map((item) => {
      const date = new Date(item.published_at ?? item.created_at!);
      const loc = `${SITE.url.replace(/\/+$/, "")}/news/${item.slug}`;

      return `
        <url>
          <loc>${escapeXml(loc)}</loc>
          <news:news>
            <news:publication>
              <news:name>CasinoReviewsBook</news:name>
              <news:language>en</news:language>
            </news:publication>
            <news:publication_date>${date.toISOString()}</news:publication_date>
            <news:title>${escapeXml(item.title)}</news:title>
          </news:news>
        </url>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
      ${urls}
    </urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=900, s-maxage=900",
    },
  });
}