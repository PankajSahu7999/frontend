import HomeContent from "./HomeContent";
import JsonLd from "@/components/seo/JsonLd";
import {
  buildSchemaGraph,
  organizationSchema,
  webpageSchema,
  websiteSchema,
} from "@/lib/seo/schemas";

const graph = buildSchemaGraph({
  organization: organizationSchema(),
  website: websiteSchema(),
  webpage: webpageSchema({
    url: "https://casinoreviewsbook.com",
    title:
      "Casino Review Book | Trusted Online Casino Reviews, Bonuses & Gambling Guides",
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
