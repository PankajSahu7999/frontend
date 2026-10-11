import { SITE } from "@/constants";

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,

    url: SITE.url,

    name: SITE.name,

    alternateName: SITE.shortName,

    description: SITE.description,

    inLanguage: SITE.language,

    publisher: {
      "@type": "Organization",
      name: SITE.name,
    },
    copyrightHolder: SITE.copyright,
    
  };
}
