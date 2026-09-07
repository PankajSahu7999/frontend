import { SITE } from "@/constants";

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,

    url: SITE.url,

    name: SITE.siteName,

    alternateName: SITE.shortName,

    description: SITE.description,

    inLanguage: SITE.language,

    publisher: {
      "@type": "Organization",
      name: SITE.name,
    },
    copyrightHolder: SITE.copyright,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",

        urlTemplate: `${SITE.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}
