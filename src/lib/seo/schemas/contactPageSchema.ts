import { SITE } from "@/constants";

interface ContactPageSchemaProps {
  url: string;
  email: string;
}

export function contactPageSchema({
  url,
  email,
}: ContactPageSchemaProps) {
  return {
    "@type": "ContactPage",

    "@id": `${url}#contactpage`,

    url,

    name: "Contact Casino Review Book",

    description:
      "Contact Casino Review Book for editorial questions, support, partnerships and responsible gambling inquiries.",

    isPartOf: {
      "@id": `${SITE.url}/#website`,
    },

    about: {
      "@id": `${SITE.url}/#organization`,
    },

    publisher: {
      "@id": `${SITE.url}/#organization`,
    },

    mainEntity: {
      "@type": "Organization",

      "@id": `${SITE.url}/#organization`,

      contactPoint: {
        "@type": "ContactPoint",

        email,

        contactType: "customer support",

        availableLanguage: ["English"],

        url,
      },
    },
  };
}