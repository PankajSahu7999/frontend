export interface ArticleSchemaProps {
  title: string;
  description: string;
  url: string;
  image: string | string[];
  mainEntityOfPage: { "@type": "WebPage"; "@id": string };
  publisher: {
    "@type": "Organization";
    name: string;
    logo?: { "@type": "ImageObject"; url: string };
  };
  author: { "@type": "Person" | "Organization"; name: string; url?: string };
  published: string;
  modified: string;
  articleSection?: string;
  keywords?: string[];
  wordCount?: number;
  type?: "Article" | "TechArticle";
}

export function articleSchema({
  url,
  title,
  description,
  image,
  author,
  published,
  modified,
  articleSection,
  mainEntityOfPage,
  publisher,
  keywords,
  wordCount,
  type = "Article",
}: ArticleSchemaProps) {
  return {
    "@type": type,

    "@id": `${url}#article`,

    url,

    headline: title,

    description,

    mainEntityOfPage,

    image,

    author,

    publisher,

    isPartOf: {
      "@id": "https://casinoreviewsbook.com/#website",
    },

    datePublished: published,

    dateModified: modified || published,

    inLanguage: "en",

    ...(articleSection ? { articleSection } : {}),

    ...(keywords?.length ? { keywords: keywords.join(", ") } : {}),
    ...(wordCount && wordCount > 0 ? { wordCount } : {}),
  };
}
