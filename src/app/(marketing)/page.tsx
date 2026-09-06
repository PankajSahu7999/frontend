import { SITE } from "@/constants";
import { generateSEO } from "@/lib/seo";
import {
  buildSchemaGraph,
  organizationSchema,
  websiteSchema,
  webpageSchema,
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

export default function Home() {
  const homeSchema = buildSchemaGraph({
    organization: organizationSchema(),
    website: websiteSchema(),
    webpage: webpageSchema({
      url: SITE.url,
      title: SITE.title,
      description: SITE.description,
    }),
  });

  return (
    <>
      <JsonLd data={homeSchema} />
      <HomeContent />
    </>
  );
}
