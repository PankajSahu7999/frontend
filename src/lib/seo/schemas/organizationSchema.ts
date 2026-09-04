import { SITE } from "@/constants";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,

    name: SITE.siteName,
    legalName: SITE.name,

    url: SITE.url,

    logo: {
      "@type": "ImageObject",
      url: SITE.logo,
    },

    image: SITE.logo,

    description: SITE.description,

    email: SITE.email,

    knowsAbout: [
      "Online Casinos",
      "Casino Reviews",
      "Casino Bonuses",
      "Sports Betting",
      "Slot Games",
      "Live Casino",
      "Crypto Casinos",
      "Responsible Gambling",
      "Affiliate Marketing",
      "Payment Methods",
    ],

    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },

    contactPoint: {
      "@type": "ContactPoint",

      contactType: "Customer Support",

      availableLanguage: "English",
    },
    publishingPrinciples: "https://casinoreviewsbook.com/policies/privacy-policy",
    foundingDate: SITE.foundingDate,
    sameAs:SITE.sameAs.filter(Boolean),
  };
}
