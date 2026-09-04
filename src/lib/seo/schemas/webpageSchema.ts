// src/lib/seo/webpageSchema.ts
import { SITE } from "@/constants";

export interface WebPageSchemaProps {
  url: string;
  title: string;
  description: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  language?: string;
  type?:
    | "WebPage"
    | "CollectionPage"
    | "AboutPage"
    | "ContactPage"
    | "FAQPage"
    | "ProfilePage"
    | "ItemPage";

  breadcrumbId?: string;
}

export function webpageSchema({
  url,
  title,
  description,
  image = SITE.ogImage,
  datePublished,
  dateModified,
  language = "en-US",
  type = "WebPage",
  breadcrumbId,
}: WebPageSchemaProps) {
  return {
    "@context": "https://schema.org",

    "@type": type,

    "@id": `${url}#webpage`,

    url,
    name: title,
    headline: title,
    description,
    inLanguage: language,

    isPartOf: {
      "@id": `${SITE.url}/#website`,
    },

    about: {
      "@id": `${SITE.url}/#organization`,
    },
    publisher: {
      "@id": `${SITE.url}/#organization`,
    },
    author: SITE.author,

    primaryImageOfPage: {
      "@id": `${url}#primaryimage`,
    },

    image: {
      "@id": `${url}#primaryimage`,
    },

    ...(breadcrumbId && {
      breadcrumb: {
        "@id": breadcrumbId,
      },
    }),

    potentialAction: {
      "@type": "ReadAction",
      target: [url],
    },
    keywords: SITE.keywords,

    ...(datePublished && {
      datePublished,
    }),

    ...(dateModified && {
      dateModified,
    }),
  };
}
