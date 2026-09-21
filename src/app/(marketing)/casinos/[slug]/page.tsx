import { Metadata } from "next";
import CasinoClient from "./CasinoClient";
import { getCasinoCategoryBySlug } from "@/lib/seo/seoApi";
import { generateSEO } from "@/lib/seo";
import {
  breadcrumbSchema,
  buildSchemaGraph,
  collectionPageSchema,
  faqSchema,
  itemListSchema,
  webpageSchema,
} from "@/lib/seo/schemas";
import JsonLd from "@/components/seo/JsonLd";

export const dynamic = 'force-dynamic';

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
      title: "Casino Brand Review Not Found - Casino Reviews Book",
      description:
        "Explore our up-to-date catalog of secure, licensed, and reviewed online casinos.",
      path: `/casinos/${slug}`,
      noIndex: true,
    });
  }
  
  return generateSEO({
    title: `Best ${data?.category?.name} Casinos - Casino Reviews Book`,
    description: `Discover the best ${data?.category?.name} casinos with expert reviews, featuring top bonuses, free spins,  welcome bonuses, supported games, payment methods, licensing information and fast withdrawals.`,
    path: `/casinos/${data.category.slug || slug}`,
    keywords: [
      data?.category.name,
      "online casino",
      "casino reviews",
      "casino bonus",
      "licensed casinos",
      "real money casinos",
      "trusted casinos",
    ],
  });
}

export default async function CategoryCasinoPage({ params }: Props) {
  const { slug } = await params;
  const data = await getCasinoCategoryBySlug(slug);

  const graph = buildSchemaGraph({
    webpage: webpageSchema({
      url: `https://casinoreviewsbook.com/casinos/${slug}/`,
      title: `Best ${data?.category?.name} Casinos (${new Date().getFullYear()})`,
      description:
        "Discover trusted ${category.name} casinos with expert reviews, bonuses, games, payment methods and licensing information.",
    }),
    collectionPage: collectionPageSchema({
      pageUrl: `https://casinoreviewsbook.com/casinos/${slug}/`,
      title: `Best ${data?.category?.name} Casinos`,
      description: `Collection of verified ${data.category.name} online casinos reviewed by Casino Review Book. Explore trusted casinos, bonuses, games, payment methods and licensing information.`,
    }),
    breadcrumb: breadcrumbSchema({
      pageUrl: `https://casinoreviewsbook.com/casinos/${slug}/`,
      items: [
        {
          name: "Home",
          url: "https://casinoreviewsbook.com",
        },
        {
          name: "Casinos",
          url: "https://casinoreviewsbook.com/casinos",
        },
        {
          name: data.category.name,
          url: `https://casinoreviewsbook.com/casinos/${slug}`,
        },
      ],
    }),
    itemList: itemListSchema({
      pageUrl: `https://casinoreviewsbook.com/casinos/${slug}/`,
      itemListName: `Best ${data?.category?.name} Casinos`,
      items:
        data.casinos?.map((casino: any, index: number) => ({
          position: index + 1,
          name: casino.name,
          url: `https://casinoreviewsbook.com/casino/${casino.slug}`,
        })) ?? [],
    }),
    faq: faqSchema({
      pageUrl: `https://casinoreviewsbook.com/casinos/${slug}/`,
      faqs: [
        {
          question: `What are ${data.category.name} casinos?`,
          answer: `${data.category.name} casinos are online casinos that specialize in this category while offering licensed gaming, secure payment methods, fair games and responsible gambling features.`,
        },
        {
          question: "How are these casinos ranked?",
          answer:
            "We evaluate licensing, player safety, bonuses, game selection, banking methods, withdrawal speed, customer support and overall user experience.",
        },
        {
          question: "Are these casinos licensed?",
          answer:
            "We prioritize casinos that hold licenses from recognized gambling authorities whenever available.",
        },
        {
          question: "Do these casinos accept real money?",
          answer:
            "Yes. Most listed casinos support real-money gambling using various payment methods depending on local availability.",
        },
        {
          question: `How We Review ${data.category.name} Casinos`,
          answer:
            " We carefully evaluate the features, security, and customer support of each casino. We consider licensing, payment options, game selection, customer service, bonuses, and overall user experience.",
        },
        {
          question: "Which payment methods are supported?",
          answer:
            "We prioritize casinos that accept popular payment methods like credit cards, debit cards, and digital wallets. Additionally, we consider the availability and security of these methods.",
        },
        {
          question:
            "How do you ensure the security of my personal information?",
          answer:
            "We implement industry-standard security measures to protect your personal information, including encryption, access controls, and regular security audits.",
        },
      ],
    }),
  });

  return (
    <>
      <JsonLd data={graph} />
      <CasinoClient initialData={data} />
    </>
  );
  // return <CasinoClient initialData={data} slug={slug} />;
}
