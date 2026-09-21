import { generateSEO, getCasinoCategoryBySlug } from "@/lib/seo";
import BonusCategoryClient from "./BonusCategoryClient";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import {
  breadcrumbSchema,
  buildSchemaGraph,
  collectionPageSchema,
  faqSchema,
  itemListSchema,
  webpageSchema,
} from "@/lib/seo/schemas";
import JsonLd from "@/components/seo/JsonLd";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getCasinoCategoryBySlug(slug);

  if (!data?.category) {
    return generateSEO({
      title: "Exclusive Casino Bonuses Not Found | Casino Reviews Book",
      description:
        "Discover top verified match bonuses, free spins, and promo deals.",
      path: `bonuses/${slug}`,
      noIndex: true,
    });
  }

  return generateSEO({
    title: `Best ${data?.category?.name} Casino Bonuses & Promotions (${new Date().getFullYear()})`,
    description: `Compare the best ${data?.category?.name} casino bonuses — welcome offers, match bonuses, free spins, no-deposit deals, and cashback — all with transparent wagering terms.`,
    path: `/bonuses/${data.category.slug || slug}`,
    keywords: [
      data?.category?.name,
      "casino bonuses",
      "promo codes",
      "free spins",
      "match bonuses",
      "exclusive promotions",
      "gambling offers",
    ],
  });
}

export default async function BonusCategoryPage({ params }: Props) {
  const { slug } = await params;
  const data = await getCasinoCategoryBySlug(slug);

  const graph = buildSchemaGraph({
    webpage: webpageSchema({
      url: `https://casinoreviewsbook.com/bonuses/${slug}/`,
      title: `Best ${data?.category?.name} Casino Bonuses - Casino Reviews Book (${new Date().getFullYear()})`,
      description:
        "Compare the best casino bonuses — welcome offers, match bonuses, free spins, no-deposit deals, and cashback — all with transparent wagering terms.",
    }),
    collectionPage: collectionPageSchema({
      pageUrl: `https://casinoreviewsbook.com/bonuses/${slug}/`,
      title: `Best ${data?.category?.name} Casino Bonuses`,
      description: `Collection of verified ${data.category.name} casino bonus offers.`,
    }),
    breadcrumb: breadcrumbSchema({
      pageUrl: `https://casinoreviewsbook.com/bonuses/${slug}/`,
      items: [
        {
          name: "Home",
          url: "https://casinoreviewsbook.com",
        },
        {
          name: "Bonuses",
          url: "https://casinoreviewsbook.com/bonuses",
        },
        {
          name: data.category.name,
          url: `https://casinoreviewsbook.com/bonuses/${slug}`,
        },
      ],
    }),
    itemList: itemListSchema({
      pageUrl: `https://casinoreviewsbook.com/bonuses/${slug}/`,
      itemListName: `${data?.category?.name} Casino Bonuses`,
      items:
        data.casinos?.map((casino: any, index: number) => ({
          position: index + 1,
          name: casino.name,
          url: `https://casinoreviewsbook.com/casino/${casino.slug}`,
        })) ?? [],
    }),
    faq: faqSchema({
      pageUrl: `https://casinoreviewsbook.com/bonuses/${slug}/#faq`,
      faqs: [
        {
          question: "What are casino bonuses?",
          answer:
            "Casino bonuses are free money offers provided by online casinos. They can include welcome bonuses, match bonuses, free spins, no deposit bonuses, and other promotions.",
        },
        {
          question: "Can bonus winnings be withdrawn?",
          answer:
            "Usually yes, but only after satisfying the wagering requirements and any maximum withdrawal limits specified in the bonus terms.",
        },
      ],
    }),
  });

  return (
    <>
      <JsonLd data={graph} />
      <BonusCategoryClient initialData={data} />
    </>
  );
}
