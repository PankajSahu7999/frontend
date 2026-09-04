import type { MetadataRoute } from "next";

import { SITE } from "@/constants";

import { getAllNews, getAllCasinos, getAllCategories } from "@/lib/seo/seoApi";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // const staticPages: MetadataRoute.Sitemap = [
  //   {
  //     url: SITE.url,
  //     lastModified: now,
  //     changeFrequency: "daily",
  //     priority: 1,
  //   },
  //   {
  //     url: `${SITE.url}/news`,
  //     lastModified: now,
  //     changeFrequency: "hourly",
  //     priority: 0.9,
  //   },
  //   {
  //     url: `${SITE.url}/casinos`,
  //     lastModified: now,
  //     changeFrequency: "daily",
  //     priority: 0.9,
  //   },
  //   {
  //     url: `${SITE.url}/bonuses`,
  //     lastModified: now,
  //     changeFrequency: "daily",
  //     priority: 0.9,
  //   },
  //   {
  //     url: `${SITE.url}/about-us`,
  //     lastModified: now,
  //     changeFrequency: "monthly",
  //     priority: 0.5,
  //   },
  //   {
  //     url: `${SITE.url}/contact-us`,
  //     lastModified: now,
  //     changeFrequency: "monthly",
  //     priority: 0.5,
  //   },
  //   {
  //     url: `${SITE.url}/responsible-gambling`,
  //     lastModified: now,
  //     changeFrequency: "monthly",
  //     priority: 0.6,
  //   },
  // ];

  const staticPages = [
    "",
    "/casinos",
    "/bonuses",
    "/games",
    "/news",
    "/compare-casinos",
    "/casinos-by-country",
    "/guides/how-to-win",
    "/guides/crypto-gambling-101",
    "/about-us",
    "/contact-us",
    "/responsible-gambling",
    "/editorial-policy",
  ]; 
  
  const staticPagesSitemap: MetadataRoute.Sitemap = staticPages.map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  /*
  |--------------------------------------------------------------------------
  | Dynamic Pages (News, Casinos, Categories)
  |--------------------------------------------------------------------------
  */

  const [news, casinos, categories] = await Promise.all([
    getAllNews(),
    getAllCasinos(),
    getAllCategories(),
  ]);

  const newsUrls: MetadataRoute.Sitemap = (Array.isArray(news) ? news : []).map((item: any) => ({
    url: `${SITE.url}/news/${item.slug}`,
    lastModified: new Date(item.updated_at ?? item.created_at ?? now),
    changeFrequency: "daily",
    priority: 0.8,
  }));

  const casinoUrls: MetadataRoute.Sitemap = (Array.isArray(casinos) ? casinos : []).map((item: any) => ({
    url: `${SITE.url}/casino/${item.slug}`,
    lastModified: new Date(item.updated_at ?? item.created_at ?? now),
    changeFrequency: "daily",
    priority: 0.9,
  }));

  const categoryUrls: MetadataRoute.Sitemap = (Array.isArray(categories) ? categories : []).map((item: any) => ({
    url: `${SITE.url}/casinos/${item.slug}`,
    lastModified: new Date(item.updated_at ?? item.created_at ?? now),
    changeFrequency: "daily",
    priority: 0.85,
  }));

  return [...staticPagesSitemap, ...newsUrls, ...casinoUrls, ...categoryUrls];
}
