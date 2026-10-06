import { SITE } from "@/constants";
import { generateSEO, getAllCasinos, getAllNews } from "@/lib/seo";
import {
  buildSchemaGraph,
  organizationSchema,
  websiteSchema,
  webpageSchema,
  faqSchema,
} from "@/lib/seo/schemas";
import JsonLd from "@/components/seo/JsonLd";
import HomeContent from "./HomeContent";

export const metadata = generateSEO({
  title: "Casino Reviews & Ratings | Casino Reviews Book",
  description:
    "Compare independent online casino reviews, ratings, licensing, bonus terms, payment methods and payout research. See what we verify before you choose.",
  path: "/",
  keywords: [
    "casino reviews",
    "online casino reviews",
    "independent casino reviews",
    "casino ratings",
    "licensed casino reviews",
    "casino withdrawal reviews",
    "safe online gambling",
  ],
});

export default async function Home() {
  const [initialCasinos, initialNews] = await Promise.all([
    getAllCasinos().catch(() => []),
    getAllNews().catch(() => []),
  ]);

  const homeSchema = buildSchemaGraph({
    organization: organizationSchema(),
    website: websiteSchema(),
    webpage: webpageSchema({
      url: SITE.url,
      title: "Casino Reviews & Ratings | Casino Reviews Book",
      description:
        "Compare independent online casino reviews, ratings, licensing, bonus terms, payment methods and payout research.",
    }),
    faq: faqSchema({
      pageUrl: "https://casinoreviewsbook.com/",
      faqs: [
        {
          question: "What is Casino Reviews Book?",
          answer:
            "Casino Reviews Book is an independent iGaming research and review platform covering online casino reviews, licensing information, bonus terms, payments, withdrawals, player support and related gambling guides.",
        },
        {
          question: "How do you review online casinos?",
          answer:
            "We use a structured review methodology covering licensing and ownership, KYC and account setup, deposits and bonuses, games and platform experience, withdrawals, and customer support.",
        },
        {
          question: "Are rankings paid for?",
          answer:
            "Affiliate relationships may fund the site, but operators cannot buy higher editorial rankings or alter ratings. All review scores strictly reflect our independent scoring rubric and hands-on testing.",
        },
        {
          question: "Do you guarantee payouts?",
          answer:
            "No. We do not operate casinos, hold player funds or guarantee operator payouts. We audit and report operator withdrawal rules, payment methods, and processing records.",
        },
        {
          question: "Are online casinos legal everywhere?",
          answer:
            "No. Availability and legality vary by jurisdiction. Local laws and regional regulations must always be verified before participating in real-money gambling.",
        },
      ],
    }),
  });

  return (
    <>
      <JsonLd data={homeSchema} />
      <HomeContent
        initialCasinos={initialCasinos || []}
        initialNews={initialNews || []}
      />
    </>
  );
}
