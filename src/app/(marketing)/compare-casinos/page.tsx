import CasinoComparison from "@/components/sections/CasinoComparison";
import JsonLd from "@/components/seo/JsonLd";
import { generateSEO, getAllCasinos } from "@/lib/seo";
import {
  breadcrumbSchema,
  buildSchemaGraph,
  collectionPageSchema,
  itemListSchema,
  searchActionSchema,
  webpageSchema,
} from "@/lib/seo/schemas";

export const metadata = generateSEO({
  title: "Compare Online Casinos | Side-by-Side Casino Comparison Tool",
  description:
    "Compare top online casinos side by side. Analyze welcome bonuses, RTP, withdrawal speed, payment methods, licensing, security, supported countries, games, and player ratings to choose the best casino.",
  path: "/compare-casinos",
  keywords: [
    "compare casinos",
    "casino comparison",
    "online casino comparison",
    "best online casinos",
    "casino ratings",
    "casino bonuses",
    "casino withdrawal comparison",
    "licensed online casinos",
    "casino payment methods",
    "casino review comparison",
  ],
});

const PAGE_URL = "https://casinoreviewsbook.com/compare-casinos";

const casinos = await getAllCasinos();

const graph = buildSchemaGraph({
  webpage: webpageSchema({
    url: PAGE_URL,

    title: "Compare Online Casinos | Side-by-Side Casino Comparison Tool",

    description:
      "Compare licensed online casinos by bonuses, payouts, games, licensing, banking methods and player ratings.",
  }),

  collectionPage: collectionPageSchema({
    pageUrl: PAGE_URL,

    title: "Compare Online Casinos",

    description:
      "Browse and compare trusted online casinos using detailed comparison data.",
  }),

  breadcrumb: breadcrumbSchema({
    pageUrl: PAGE_URL,

    items: [
      {
        name: "Home",

        url: "https://casinoreviewsbook.com",
      },

      {
        name: "Compare Casinos",

        url: PAGE_URL,
      },
    ],
  }),

  itemList: itemListSchema({
    pageUrl: PAGE_URL,

    itemListName: "Casino Comparison List",

    items:
      casinos?.map((casino: any, index: number) => ({
        position: index + 1,
        name: casino.name,
        url: `https://casinoreviewsbook.com/casino/${casino.slug}`,
      })) ?? [],
  }),

  searchAction: searchActionSchema({
    siteUrl: "https://casinoreviewsbook.com",

    searchPath: "/search",
  }),
});

export default function CompareCasinosPage() {
  return (
    <>
      <JsonLd data={graph} />

      <CasinoComparison />
    </>
  );
}
