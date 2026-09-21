import {
  breadcrumbSchema,
  buildSchemaGraph,
  faqSchema,
  webpageSchema,
} from "@/lib/seo/schemas";
import AboutUsClient from "./AboutUsClient";
import { generateSEO } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";

export const metadata = generateSEO({
  title:
    "About Us - Casino Reviews Book | Independent Casino Experts",
  description:
    "Casino Reviews Book is an independent iGaming research team. We conduct hands-on testing, audit payouts,and review bonus terms to protect players worldwide",
  path: "/about-us",
  keywords: [
    "about Casino Reviews Book",

    "trusted casino reviews",

    "online casino research",

    "iGaming experts",

    "casino analysis platform",
  ],
});

export default function Page() {
  const graph = buildSchemaGraph({
    webpage: webpageSchema({
      url: "https://casinoreviewsbook.com/about-us",
      title:
        "About Us-Casino Reviews Book | Independent Casino Experts",
      description:
        "Casino Reviews Book is an independent iGaming research platform providing trusted casino reviews, bonus analysis, payment guides, gambling education and responsible gambling resources for players worldwide.",
      type: "WebPage",
      breadcrumbId: `https://casinoreviewsbook.com/about-us/#breadcrumb`,
    }),
    breadcrumb: breadcrumbSchema({
      pageUrl: "https://casinoreviewsbook.com/about-us/",
      items: [
        {
          name: "Home",
          url: "https://casinoreviewsbook.com/",
        },
        {
          name: "About Us",
          url: "https://casinoreviewsbook.com/about-us",
        },
      ],
    }),
    faq: faqSchema({
      pageUrl: "https://casinoreviewsbook.com/about-us/#faq",
      faqs: [
        {
          question: "What does Casino Reviews Book do?",
          answer:
            "We analyze online casinos by reviewing licensing information,security standards, payment options, bonus conditions,software providers and overall player experience.",
        },
        {
          question: "How are casino reviews created?",
          answer:
            "We conduct hands-on testing, audit payouts, and analyze bonus terms to protect players in regulated gaming markets globally.",
        },
        {
          question: "Are casino reviews for Casino Reviews Book independent?",
          answer:
            "Yes, Casino Reviews Book is an independent iGaming directory and research portal.",
        },
        {
          question: "Is Casino Reviews Book a casino operator?",
          answer:
            "No, Casino Reviews Book is not a casino operator, but we provide trusted casino reviews, payment guides, gambling education, and responsible gambling resources for players worldwide.",
        },
        {
          question: "How does Casino Reviews Book help players?",
          answer:
            "We provide trusted casino reviews, payment guides, gambling education, and responsible gambling resources.",
        },
        {
          question: "How does Casino Reviews Book protect players?",
          answer:
            "We conduct hands-on testing, audit payouts, and analyze bonus terms to protect players in regulated gaming markets globally.",
        },
      ],
    }),
  });
  return (
    <div>
      <JsonLd data={graph} />
      <AboutUsClient />
    </div>
  );
}
