import type { Metadata } from "next";

const SITE_URL = "https://casinoreviewsbook.com";

export const SITE = {
  name: "Casino Reviews Book",
  shortName: "CRB",
  url: SITE_URL,
  tagline: "Online Casino Reviews, Bonuses & Gambling Guides",

  title: "Online Casino Reviews & Ratings | Casino Reviews Book",

  description:
    "Compare online casino reviews, licensing, bonus terms, payments and payout policies. Explore independent ratings and gambling guides before choosing a casino.",

  locale: "en_US",
  language: "en-US",

  category: "Gambling",
  applicationName: "Casino Reviews Book",

  author: "Casino Reviews Book Editorial Team",
  publisher: "Casino Reviews Book",

  email: "contact@casinoreviewsbook.com",

  logo: `${SITE_URL}/icons/logo.png`,
  favicon: "/favicon.ico",
  ogImage: `${SITE_URL}/icons/og-image.png`,

  copyright: `© ${new Date().getFullYear()} Casino Reviews Book`,

  ids: {
    organization: `${SITE_URL}/#organization`,
    website: `${SITE_URL}/#website`,
    logo: `${SITE_URL}/#logo`,
    publisher: `${SITE_URL}/#organization`,
    author: "https://casinoreviewsbook.com/#author",
  },

  searchAction: "https://casinoreviewsbook.com/search?q=",

  twitter: "@casinoreviewsbook",

  telegram: "https://t.me/casinoreviewsbook",

  sameAs: [
    "https://casinoreviewsbook.com",
    "https://www.facebook.com/casinoreviewsbook",
    "https://www.instagram.com/casinoreviewsbook",
    "https://www.linkedin.com/company/casinoreviewsbook",
    "https://www.youtube.com/@casinoreviewsbook",
    "https://t.me/casinoreviewsbook",
    "https://twitter.com/casinoreviewsbook",
    "https://github.com/casinoreviewsbook",
  ],

  image: {
    url: "https://casinoreviewsbook.com/icons/og-image.png",
    width: 1200,
    height: 630,
    alt: "Casino Reviews Book online casino reviews and ratings",
  },
} as const;

export const DEFAULT_SEO: Metadata = {
  metadataBase: new URL(SITE.url),

  title: SITE.title,

  description: SITE.description,

  keywords: [
    "online casino reviews",
    "casino ratings",
    "casino licensing",
    "casino bonus terms",
    "wagering requirements",
    "casino withdrawal times",
    "casino payment methods",
    "online casino safety",
    "responsible gambling",
  ],

  applicationName: SITE.applicationName,

  creator: SITE.author,
  publisher: SITE.publisher,
  category: SITE.category,

  authors: [
    {
      name: SITE.author,
      url: SITE.url,
    },
  ],

  referrer: "strict-origin-when-cross-origin",

  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
      "x-default": "/",
    },
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  verification: {
    ...(process.env.GOOGLE_SITE_VERIFICATION
      ? {
          google: process.env.GOOGLE_SITE_VERIFICATION,
        }
      : {}),

    other: {
      ...(process.env.BING_SITE_VERIFICATION
        ? {
            "msvalidate.01": process.env.BING_SITE_VERIFICATION,
          }
        : {}),

      ...(process.env.YANDEX_SITE_VERIFICATION
        ? {
            "yandex-verification": process.env.YANDEX_SITE_VERIFICATION,
          }
        : {}),

      ...(process.env.BAIDU_SITE_VERIFICATION
        ? {
            "baidu-site-verification": process.env.BAIDU_SITE_VERIFICATION,
          }
        : {}),
    },
  },

  manifest: "/site.webmanifest",

  openGraph: {
    type: "website",
    url: SITE.url,
    locale: SITE.locale,
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    images: [
      {
        url: SITE.ogImage,
        width: 1200,
        height: 630,
        alt: "Casino Reviews Book — casino reviews and gambling guides",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    creator: SITE.name,
    site: SITE.name,
    title: SITE.name,
    description: SITE.description,
    images: [
      { url: SITE.ogImage, width: 1200, height: 630, alt: "Casino Reviews Book — casino reviews and gambling guides" },
    ],
  },

  icons: {
    icon: [
      {
        url: "/favicon.ico",
      },

      {
        url: "/icons/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },

      {
        url: "/icons/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },

      {
        url: "/icons/favicon-48x48.png",
        sizes: "48x48",
        type: "image/png",
      },

      {
        url: "/icons/favicon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
    ],

    apple: "/apple-icon.png",
    shortcut: "/favicon.ico",

    other: [
      {
        rel: "manifest",
        url: "/site.webmanifest",
      },

      {
        rel: "icon",
        url: "/icons/android-chrome-192x192.png",
      },

      {
        rel: "icon",
        url: "/icons/android-chrome-512x512.png",
      },
    ],
  },
};
