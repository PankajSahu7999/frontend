export interface ArticleSchemaProps {
  title: string;
  description: string;
  url: string;
  published: string;
  modified: string;
  authorUrl: string;
  articleSection?: string;
  keywords?: string[];
  wordCount?: number;
  type?: "Article" | "TechArticle";
}

export function articleSchema({
  title,
  description,
  url,
  authorUrl,
  published,
  modified,
  articleSection,
  keywords,
  type = "Article",
}: ArticleSchemaProps) {
  return {
    "@context": "https://schema.org",

    "@type": type,

    "@id": `${url}#article`,

    url,

    headline: title,

    description,

    mainEntityOfPage: {
      "@id": `${url}#webpage`,
    },

    image: {
      "@id": `${url}#primaryimage`,
    },

    author: {
      "@id": `${authorUrl}#person`,
    },

    publisher: {
      "@id": "https://casinoreviewsbook.com/#organization",
    },

    isPartOf: {
      "@id": "https://casinoreviewsbook.com/#website",
    },

    datePublished: published,

    dateModified: modified,

    inLanguage: "en",

    ...(articleSection && { articleSection }),

    ...(keywords?.length && {
      keywords: keywords.join(", "),
    }),
  };
}