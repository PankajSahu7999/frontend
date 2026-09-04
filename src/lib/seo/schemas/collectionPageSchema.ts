// src/lib/seo/collectionPageSchema.ts

export interface CollectionPageSchemaProps {
  pageUrl: string;

  title: string;

  description: string;
}

export function collectionPageSchema({
  pageUrl,
  title,
  description,
}: CollectionPageSchemaProps) {
  return {
    "@context": "https://schema.org",

    "@type": "CollectionPage",

    "@id": `${pageUrl}#collectionpage`,

    url: pageUrl,

    name: title,

    description,

    isPartOf: {
      "@id":
        "https://casinoreviewsbook.com/#website",
    },

    about: {
      "@id":
        "https://casinoreviewsbook.com/#organization",
    },
  };
}