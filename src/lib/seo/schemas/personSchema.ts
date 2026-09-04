// src/lib/seo/personSchema.ts

export interface PersonSchemaProps {
  name: string;
  url: string;
  image?: string;
  jobTitle?: string;
  description?: string;
  sameAs?: string[];
}

export function personSchema({
  name,
  url,
  image,
  jobTitle = "Author",
  description,
  sameAs = [],
}: PersonSchemaProps) {
  return {
    "@context": "https://schema.org",

    "@type": "Person",

    "@id": `${url}#person`,

    name,

    url,

    ...(image && {
      image: {
        "@type": "ImageObject",
        url: image,
      },
    }),

    jobTitle,

    ...(description && {
      description,
    }),

    worksFor: {
      "@id": "https://casinoreviewsbook.com/#organization",
    },

    ...(sameAs.length > 0 && {
      sameAs,
    }),
  };
}