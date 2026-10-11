import { SITE } from "@/constants";
import { MetadataRoute } from "next";


export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.NODE_ENV === "production";
  if (!isProduction) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/login/", "/dashboard/", "/private/","/account/"],
      },
      {
        userAgent: ["Googlebot", "Bingbot", "DuckDuckBot"],
        allow: "/",
        disallow: ["/admin/", "/api/", "/private/"],
      },
      {
        userAgent: ["Googlebot-News", "Googlebot-Image", "Googlebot-Video","OAI-SearchBot"],
        allow:"/"
      },
      {
        userAgent: ["GPTBot", "ChatGPT-User", "ClaudeBot", "PerplexityBot", "Google-Extended"],
        allow: "/",
        disallow: ["/admin/", "/api/", "/private/"],
      },
    ],
        sitemap: [
      `${SITE.url}/sitemap.xml`,
      `${SITE.url}/sitemap-news.xml`,
      `${SITE.url}/sitemap-images.xml`,
      `${SITE.url}/video-sitemap.xml`,
    ],
  };
}
