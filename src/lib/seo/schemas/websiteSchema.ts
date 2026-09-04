import { SITE } from "@/constants";

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
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
    searchAction: SITE.searchAction,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",

        urlTemplate: `${SITE.searchURL}{search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}
