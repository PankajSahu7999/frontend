// src/lib/seo/newsArticleSchema.ts

export interface NewsArticleSchemaProps {
  url: string;
  title: string;
  description: string;
  image: string;
  authorName: string;
  authorUrl: string;
  published: string;
  modified: string;
  articleSection?: string;
  keywords?: string[];
}

export function newsArticleSchema({
  title,
  description,
  url,
  image,
  authorName,
  authorUrl,
  articleSection,
  keywords,
  published,
  modified,
}: NewsArticleSchemaProps) {
  return {
    "@context": "https://schema.org",

    "@type": "NewsArticle",

    "@id": `${url}#newsarticle`,

    headline: title,

    description,

    url,

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
    },

    image: {
      "@type": "ImageObject",
      url: image,
    },

    author: {
      "@type": "Person",
      name: authorName,
      url: authorUrl,
    },

    publisher: {
      "@id": "https://casinoreviewsbook.com/#organization",
    },

    datePublished: published,

    dateModified: modified,
    articleSection,

    keywords: keywords?.join(", "),

    inLanguage: "en-US",

    potentialAction: {
      "@type": "ReadAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: url,
      },
    },

    isAccessibleForFree: true,
  };
}
