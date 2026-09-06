import type { MetadataRoute } from "next";

import { SITE } from "@/constants";

import { getAllNews, getAllCasinos, getAllCategories, getAllGuides } from "@/lib/seo/seoApi";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticPages = [
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
  ];

  const staticPagesSitemap: MetadataRoute.Sitemap = staticPages.map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  /*
  |--------------------------------------------------------------------------
  | Dynamic Pages (News, Casinos, Categories, Guides)
  |--------------------------------------------------------------------------
  */

  const [news, casinos, categories, guides] = await Promise.all([
    getAllNews().catch(() => []),
    getAllCasinos().catch(() => []),
    getAllCategories().catch(() => []),
    getAllGuides().catch(() => []),
  ]);

  const newsUrls: MetadataRoute.Sitemap = (Array.isArray(news) ? news : []).map(
    (item: any) => ({
      url: `${SITE.url}/news/${item.slug}`,
      lastModified: new Date(item.updated_at ?? item.created_at ?? now),
      changeFrequency: "daily",
      priority: 0.8,
    }),
  );

  const casinoUrls: MetadataRoute.Sitemap = (
    Array.isArray(casinos) ? casinos : []
  ).map((item: any) => ({
    url: `${SITE.url}/casino/${item.slug}`,
    lastModified: new Date(item.updated_at ?? item.created_at ?? now),
    changeFrequency: "daily",
    priority: 0.9,
  }));

  const categoryUrls: MetadataRoute.Sitemap = (
    Array.isArray(categories) ? categories : []
  ).map((item: any) => ({
    url: `${SITE.url}/casinos/${item.slug}`,
    lastModified: new Date(item.updated_at ?? item.created_at ?? now),
    changeFrequency: "daily",
    priority: 0.85,
  }));

  const guideUrls: MetadataRoute.Sitemap = (Array.isArray(guides) ? guides : []).map((item: any) => ({
    url: `${SITE.url}/guides/${item.slug}`,
    lastModified: new Date(item.updated_at ?? item.published_at ?? now),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticPagesSitemap, ...newsUrls, ...casinoUrls, ...categoryUrls, ...guideUrls];
}

