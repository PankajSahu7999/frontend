export const SITE = {
  name: "Casino Review Book",
  siteName: "Casino Review Book",
  shortName: "CRB",
  tagline: "Trusted Casino Reviews, Bonuses & Gambling Guides",

  url: "https://casinoreviewsbook.com",
  siteUrl: "https://casinoreviewsbook.com",
  baseUrl: new URL("https://casinoreviewsbook.com"),

  title:
    "Casino Review Book | Trusted Online Casino Reviews, Bonuses & Gambling Guides",

  description:
    "Casino Review Book is a trusted online casino review platform providing honest casino reviews, exclusive casino bonuses, sportsbook reviews, crypto casino guides, slot reviews, payment method guides, gambling strategies, and responsible gambling resources for players worldwide.",

  locale: "en_US",
  language: "en-US",

  type: "website",
  category: "Gambling",
  applicationName: "Casino Review Book",

  author: "Casino Review Book Editorial Team",
  publisher: "Casino Review Book",

  copyright: `© ${new Date().getFullYear()} Casino Review Book`,

  email: "contact@casinoreviewsbook.com",
  logo: "https://casinoreviewsbook.com/icons/logo.png",
  favicon: "/favicon.ico",
  ogImage: "https://casinoreviewsbook.com/icons/og-image.png",

  keywords: [
    "casino reviews",
    "online casino reviews",
    "best online casinos",
    "casino bonuses",
    "casino bonus",
    "sportsbook reviews",
    "crypto casino",
    "bitcoin casino",
    "ethereum casino",
    "slot reviews",
    "online slots",
    "gambling guides",
    "casino comparison",
    "casino promotions",
    "casino review book",
  ],

  searchURL: "https://casinoreviewsbook.com/search?q=",
  ids: {
    organizationId: "https://casinoreviewsbook.com/#organization",

    websiteId: "https://casinoreviewsbook.com/#website",

    publisherId: "https://casinoreviewsbook.com/#publisher",

    logoId: "https://casinoreviewsbook.com/#logo",

    defaultAuthorId: "https://casinoreviewsbook.com/#author",
  },
  searchAction: "https://casinoreviewsbook.com/search?q={search_term_string}",

  legalName: "Casino Review Book",
  foundingDate: "2024",
  foundingLocation: "India",

  priceRange: "Free",

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

    alt: "Casino Review Book",
  },
  geo: {
    audience: "Global",

    contentLanguage: "English",

    topic: "Online Casino Reviews, Gambling Guides, Bonuses, Crypto Gambling",
  },

  knowsAbout: [
    "Online casino reviews",
    "Casino welcome bonuses and wagering requirements",
    "Online casino licensing (MGA, UKGC, Curaçao GCB, Kahnawake)",
    "Cryptocurrency casinos and Bitcoin gambling",
    "Online slot machine RTP and volatility",
    "Live dealer casino games",
    "Sportsbook betting odds and markets",
    "Casino payment methods and withdrawal times",
    "Responsible gambling and self-exclusion tools",
    "RNG fairness testing and eCOGRA certification",
    "Casino Bonuses and Promotions",
    "Sportsbook Betting",
    "Cryptocurrency Gambling",
    "Slot Machine Games",
    "Responsible Gambling",
    "iGaming Regulation",
    "Payment Methods for Gambling",
    "Gambling Strategy",
  ],
} as const;

import type { Metadata } from "next";

export const DEFAULT_SEO: Metadata = {
  metadataBase: new URL(SITE.url),

  title: {
    default: SITE.title,

    template: "%s | Casino Review Book",
  },

  description: SITE.description,

  keywords: SITE.keywords,

  applicationName: SITE.applicationName,

  generator: "Next.js",

  referrer: "origin-when-cross-origin",

  creator: SITE.author,

  publisher: SITE.publisher,

  category: SITE.category,

  authors: [
    {
      name: SITE.author,
      url: SITE.url,
    },
  ],

  alternates: {
    canonical: SITE.url,
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || "",

    // bing: process.env.BING_SITE_VERIFICATION,
    // yandex: process.env.YANDEX_SITE_VERIFICATION,
    // baidu: process.env.BAIDU_SITE_VERIFICATION,
  },

  manifest: "/site.webmanifest",

  openGraph: {
    type: "website",

    url: SITE.url,

    locale: SITE.locale,

    siteName: SITE.siteName,

    title: SITE.title,

    description: SITE.description,

    images: [
      {
        url: SITE.ogImage,

        width: 1200,

        height: 630,

        alt: SITE.siteName,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    creator: SITE.name,

    site: SITE.siteName,

    title: SITE.name,

    description: SITE.description,

    // images: [SITE.twitterImage],
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
