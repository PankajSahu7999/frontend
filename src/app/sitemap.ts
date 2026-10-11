// import type { MetadataRoute } from "next";

// import { SITE } from "@/constants";

// import { getAllNews, getAllCasinos, getAllCategories, getAllGuides } from "@/lib/seo/seoApi";

// export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
//   const now = new Date();
//   const staticPages = [
//     "",
//     "/bonuses",
//     "/news",
//     "/compare-casinos",
//     "/casinos-by-country",
//     "/guides",
//     "/guides/how-to-win",
//     "/guides/crypto-gambling-101",
//     "/about-us",
//     "/contact-us",
//     "/responsible-gambling",
//     "/awards",
//     "/terms-and-services",
//     "/privacy-policy",
//     "/cookie-policy",
//     "/provably-fair",
//   ];

//   const staticPagesSitemap: MetadataRoute.Sitemap = staticPages.map((path) => ({
//     url: `${SITE.url}${path}`,
//     lastModified: new Date(),
//     changeFrequency: path === "" ? "daily" : "weekly",
//     priority: path === "" ? 1 : 0.8,
//   }));

//   /*
//   |--------------------------------------------------------------------------
//   | Dynamic Pages (News, Casinos, Categories, Guides)
//   |--------------------------------------------------------------------------
//   */

//   const [news, casinos, categories, guides] = await Promise.all([
//     getAllNews().catch(() => []),
//     getAllCasinos().catch(() => []),
//     getAllCategories().catch(() => []),
//     getAllGuides().catch(() => []),
//   ]);

//   const newsUrls: MetadataRoute.Sitemap = (Array.isArray(news) ? news : []).map(
//     (item: any) => ({
//       url: `${SITE.url}/news/${item.slug}`,
//       lastModified: new Date(item.updated_at ?? item.created_at ?? now),
//       changeFrequency: "daily",
//       priority: 0.8,
//     }),
//   );

//   const casinoUrls: MetadataRoute.Sitemap = (
//     Array.isArray(casinos) ? casinos : []
//   ).map((item: any) => ({
//     url: `${SITE.url}/casino/${item.slug}`,
//     lastModified: new Date(item.updated_at ?? item.created_at ?? now),
//     changeFrequency: "daily",
//     priority: 0.9,
//   }));

//   const categoryUrls: MetadataRoute.Sitemap = (
//     Array.isArray(categories) ? categories : []
//   ).map((item: any) => ({
//     url: `${SITE.url}/casinos/${item.slug}`,
//     lastModified: new Date(item.updated_at ?? item.created_at ?? now),
//     changeFrequency: "daily",
//     priority: 0.85,
//   }));

//   const guideUrls: MetadataRoute.Sitemap = (Array.isArray(guides) ? guides : []).map((item: any) => ({
//     url: `${SITE.url}/guides/${item.slug}`,
//     lastModified: new Date(item.updated_at ?? item.published_at ?? now),
//     changeFrequency: "weekly",
//     priority: 0.8,
//   }));

//   return [...staticPagesSitemap, ...newsUrls, ...casinoUrls, ...categoryUrls, ...guideUrls];
// }



import type { MetadataRoute } from "next";
import { SITE } from "@/constants";
import {
  getAllNews,
  getAllCasinos,
  getAllCategories,
  getAllGuides,
} from "@/lib/seo/seoApi";

type SitemapRecord = {
  slug?: string;
  updated_at?: string | Date | null;
  created_at?: string | Date | null;
  published_at?: string | Date | null;
};

function validDate(
  ...values: (string | Date | null | undefined)[]
): Date | undefined {
  for (const value of values) {
    if (!value) continue;

    const date = new Date(value);

    if (!Number.isNaN(date.getTime())) {
      return date;
    }
  }

  return undefined;
}

function pageUrl(path: string): string {
  return `${SITE.url.replace(/\/+$/, "")}${path}`;
}

function toEntries(
  items: SitemapRecord[],
  path: string,
  priority: number,
  frequency: "daily" | "weekly"
): MetadataRoute.Sitemap {
  return items
    .filter((item) => typeof item.slug === "string" && item.slug.length > 0)
    .map((item) => {
      const lastModified = validDate(
        item.updated_at,
        item.published_at,
        item.created_at
      );

      return {
        url: pageUrl(`${path}/${item.slug}`),
        ...(lastModified ? { lastModified } : {}),
        changeFrequency: frequency,
        priority,
      };
    });
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = [
    "",
    "/bonuses",
    "/news",
    "/compare-casinos",
    "/casinos-by-country",
    "/guides",
    "/guides/how-to-win",
    "/guides/crypto-gambling-101",
    "/about-us",
    "/contact-us",
    "/responsible-gambling",
    "/awards",
    "/terms-and-services",
    "/privacy-policy",
    "/cookie-policy",
    "/provably-fair",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: pageUrl(path),
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.7,
  }));

  const [news, casinos, categories, guides] = await Promise.all([
    getAllNews(),
    getAllCasinos(),
    getAllCategories(),
    getAllGuides(),
  ]);

  return [
    ...staticEntries,
    ...toEntries(news as SitemapRecord[], "/news", 0.8, "daily"),
    ...toEntries(casinos as SitemapRecord[], "/casino", 0.9, "weekly"),
    ...toEntries(categories as SitemapRecord[], "/casinos", 0.8, "weekly"),
    ...toEntries(guides as SitemapRecord[], "/guides", 0.8, "weekly"),
  ];
}