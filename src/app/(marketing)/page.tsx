import { Metadata } from "next";
import HomeContent from "./HomeContent";
import JsonLd from "@/components/seo/JsonLd";
import { DEFAULT_SEO } from "@/constants";
import {
  buildSchemaGraph,
  organizationSchema,
  webpageSchema,
  websiteSchema,
} from "@/lib/seo/schemas";
import { generateSEO } from "@/lib/seo/metadata";


// export const metadata: Metadata = DEFAULT_SEO;
export const metadata = generateSEO({
  title:
    "Casino Review Book | Trusted Online Casino Reviews, Bonuses & Gambling Guides",
  description:
    "Independent, hands-on casino reviews, exclusive bonus offers, crypto casino guides, slot reviews, and responsible gambling resources — audited and updated for players worldwide.",
  path: "/",
  keywords: [
    "casino reviews",
    "online casino reviews",
    "best online casinos",
    "casino bonuses",
    "trusted casino reviews",
  ],
});


const graph = buildSchemaGraph({
  organization: organizationSchema(),
  website: websiteSchema(),
  webpage: webpageSchema({
    url: "https://casinoreviewsbook.com",
    title:
      "Casino Review Book, Trusted Online Casino Reviews, Bonuses & Gambling Guides",
    description:
      "Casino Review Book is a trusted online casino review platform providing honest casino reviews, exclusive casino bonuses, sportsbook reviews, crypto casino guides, slot reviews, payment method guides, gambling strategies, and responsible gambling resources for players worldwide.",
  }),
});

export default function Home() {
  return (
    <>
      <JsonLd data={graph} />
      <HomeContent />
    </>
  );
}
