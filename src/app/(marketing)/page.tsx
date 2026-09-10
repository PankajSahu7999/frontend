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
  title: SITE.title,
  description: SITE.description,
  path: "/",
  keywords: [
    "best online casinos",
    "casino reviews",
    "casino bonuses",
    "top rated online casinos",
    "safe online gambling",
    "verified casino sites",
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
      title: SITE.title,
      description: SITE.description,
    }),
    faq: faqSchema({
      pageUrl: "https://casinoreviewsbook.com/",
      faqs: [
        {
          question: "How are casinos reviewed on Casino Reviews Book?",
          answer:
            "Each casino is tested by our team for licensing validity, payout speed, game fairness, and bonus terms before publishing a rating.",
        },
        {
          question: "Are the casino bonuses verified?",
          answer:
            "Yes, all listed bonuses are manually checked for accuracy, including wagering requirements and expiry terms, before publication.",
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
