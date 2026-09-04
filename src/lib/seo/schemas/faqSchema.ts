// src/lib/seo/faqSchema.ts

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQSchemaProps {
  pageUrl: string;
  faqs: FAQItem[];
}

export function faqSchema({
  pageUrl,
  faqs,
}: FAQSchemaProps) {
  return {
     "@context": "https://schema.org",
    "@type": "FAQPage",

    "@id": `${pageUrl}#faq`,

    mainEntity: faqs.map((faq) => ({
      "@type": "Question",

      name: faq.question,

      acceptedAnswer: {
        "@type": "Answer",

        text: faq.answer,
      },
    })),
  };
}