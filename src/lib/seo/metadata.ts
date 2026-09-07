import { SITE } from "@/constants";
import { Metadata } from "next";

export interface SEOProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: string[];
  type?: "website" | "article";
  noIndex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
  tags?: string[];
}

export function generateSEO({
  title,
  description,
  path = "",
  image = "/icons/og-image.png",
  keywords = [],
  noIndex = false,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  section,
  tags,
}: SEOProps): Metadata {
  // const url = `${SITE.url}${path}`;
  const cleanPath = path ? (path.startsWith("/") ? path : `/${path}`) : "";
  const siteUrl = SITE.url.replace(/\/+$/, "");
  const url = `${siteUrl}${cleanPath}`;
  const ogImage = image || SITE.ogImage || "/icons/og-image.png";
  const absoluteOgImage = ogImage.startsWith("http")
    ? ogImage
    : `${siteUrl}${ogImage.startsWith("/") ? ogImage : `/${ogImage}`}`;

  return {
    metadataBase: new URL(SITE.url),
    title,
    description,
    keywords: [...SITE.keywords, ...keywords],
    applicationName: SITE.applicationName,
    category: "Casino",
    referrer: "origin-when-cross-origin",
    authors: authors?.length
      ? authors.map((name) => ({ name }))
      : [{ name: SITE.author || SITE.name }],
    creator: SITE.author || SITE.name,
    publisher: SITE.publisher || SITE.name,

    robots: {
      index: !noIndex,
      follow: !noIndex,
      nocache: false,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-image-preview": "large",
        "max-video-preview": -1,
        "max-snippet": -1,
      },
    },

    openGraph: {
      title,
      description,
      url,
      siteName: SITE.siteName,
      locale: SITE.locale || "en_US",
      type,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(publishedTime && {
        publishedTime,
      }),

      ...(modifiedTime && {
        modifiedTime,
      }),
    },

    twitter: {
      card: "summary_large_image",
      site: SITE.siteName,
      title,
      description,
      creator: SITE.author || SITE.name,
      images: [ogImage],
    },
    appleWebApp: {
      capable: true,
      title: SITE.siteName,
      statusBarStyle: "default",
    },

    formatDetection: {
      telephone: false,
      address: false,
      email: false,
    },
    appLinks: {
      web: {
        url: url,
        should_fallback: true,
      },
    },
    archives: [url],

    other: {
      "theme-color": "#0F172A",

      "color-scheme": "light",
      "article:section": section ?? "",

      "article:tag": tags?.join(", ") ?? "",

      HandheldFriendly: "true",

      MobileOptimized: "320",

      rating: "general",
    },
  };
}
