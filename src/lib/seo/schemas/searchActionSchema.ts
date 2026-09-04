// src/lib/seo/searchActionSchema.ts

export interface SearchActionSchemaProps {
  siteUrl: string;
  searchPath?: string;
}

export function searchActionSchema({
  siteUrl,
  searchPath = "/search",
}: SearchActionSchemaProps) {
  return {
    "@type": "SearchAction",

    target: {
      "@type": "EntryPoint",

      urlTemplate:
        `${siteUrl}${searchPath}?q={search_term_string}`,
    },

    "query-input":
      "required name=search_term_string",
  };
}