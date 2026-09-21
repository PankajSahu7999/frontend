import {
  breadcrumbSchema,
  buildSchemaGraph,
  collectionPageSchema,
  itemListSchema,
  webpageSchema,
} from "@/lib/seo/schemas";
import NewsPageClient from "./NewsPageClient";
import { generateSEO, getAllNews } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";

export const metadata = generateSEO({
  title: "iGaming & Casino News | Latest Industry Updates, Trends & Insights",
  description:
    "Discover the latest news and insights on iGaming and Casino. Stay informed with our comprehensive coverage of industry trends, player safety, and legal updates.",
  path: "/news",
  keywords: [
    "casino news",
    "igaming news",
    "online casino updates",
    "gambling industry news",
    "casino industry trends",
    "online gambling regulation",
    "casino technology news",
    "responsible gambling news",
  ],
});

const PAGE_URL = "https://casinoreviewsbook.com/news";

export default async function Page() {
  const news = await getAllNews();
  const newsList = Array.isArray(news) ? news : [];

  const graph = buildSchemaGraph({
    webpage: webpageSchema({
      url: PAGE_URL,
      title: "iGaming & Casino News | Latest Industry Updates, Trends & Insights",
      description:
        "Latest iGaming and casino industry news covering regulations, technology, trends, player safety, and market developments.",
    }),
    collectionPage: collectionPageSchema({
      pageUrl: PAGE_URL,
      title: "iGaming & Casino News | Latest Industry Updates, Trends & Insights",
      description:
        "Latest iGaming and casino industry news covering regulations, technology, trends, player safety, and market developments.",
    }),
    breadcrumb: breadcrumbSchema({
      pageUrl: PAGE_URL,
      items: [
        {
          name: "Home",
          url: "https://casinoreviewsbook.com",
        },
        {
          name: "News",
          url: PAGE_URL,
        },
      ],
    }),
    itemList: itemListSchema({
      pageUrl: PAGE_URL,
      itemListName: "Latest iGaming & Casino News",
      items: newsList.map((item: any, index: number) => ({
        position: index + 1,
        name: item.title,
        url: `https://casinoreviewsbook.com/news/${item.slug}`,
      })),
    }),
  });

  return (
    <>
      <JsonLd data={graph} />
      <NewsPageClient />
    </>
  );
}
