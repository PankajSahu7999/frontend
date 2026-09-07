import { Metadata } from "next";
import { notFound } from "next/navigation";
import CasinoReviewClient from "./CasinoReviewClient";
import JsonLd from "@/components/seo/JsonLd";
import { generateSEO } from "@/lib/seo";
import {
  buildSchemaGraph,
  aggregateRatingSchema,
  breadcrumbSchema,
  faqSchema,
  imageSchema,
  reviewSchema,
  webpageSchema,
  offerSchema,
} from "@/lib/seo/schemas";

const SITE_URL = "https://casinoreviewsbook.com";

async function getCasino(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/casinos/slug/${slug}`,
    {
      next: {
        revalidate: 3600,
      },
    },
  );

  if (!res.ok) return null;

  return res.json();
}

async function fetchReviews(casinoId: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/casino-reviews/casino/${casinoId}`,
    );

    if (!res.ok) return;

    return res.json();
  } catch (error) {
    console.error("Error fetching reviews:", error);
  }
}

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const casino = await getCasino(slug);

  if (!casino) {
    return generateSEO({
      title: "Casino Not Found",
      description: "Casino review not found.",
      path: `/casino/${slug}`,
      noIndex: true,
      // robots: { index: false, follow: false },
    });
  }

  return generateSEO({
    title: `${casino.name} Review ${new Date().getFullYear()}: Bonus, Games, RTP & Rating`,

    description:
      casino.meta_description?.trim() ||
      casino.overview?.trim() ||
      casino.short_description?.trim() ||
      `${casino.name} casino review covering bonuses, games, payments and player experience.`,

    path: `/casino/${casino.slug}`,

    image: casino.featured_image,

    keywords: [
      casino.name,
      `${casino.name} review`,
      `${casino.name} bonus`,
      `${casino.name} casino`,
      `${casino.name} promo`,
      `${casino.name} withdrawal`,
      `${casino.name} deposit`,
      "online casino review",
      "casino bonuses",
      "licensed casino",
      "casino rating",
    ],
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const casino = await getCasino(slug);
  const allReviews = casino ? await fetchReviews(casino.id) : [];

  if (!casino) {
    notFound();
  }

  const PAGE_URL = `${SITE_URL}/casino/${casino.slug}`;

  const graph = buildSchemaGraph({
    webpage: webpageSchema({
      url: PAGE_URL,
      title:
        casino.meta_title?.trim() ||
        `${casino.name} Review ${new Date().getFullYear()}`,
      description:
        casino.meta_description?.trim() ||
        casino.overview?.trim() ||
        casino.short_description?.trim() ||
        `${casino.name} casino review covering bonuses, games, payments and player experience.`,
    }),

    breadcrumb: breadcrumbSchema({
      pageUrl: PAGE_URL,
      items: [
        {
          name: "Home",
          url: SITE_URL,
        },
        {
          name: "Casinos",
          url: `${SITE_URL}/casino`,
        },
        {
          name: casino.name,
          url: PAGE_URL,
        },
      ],
    }),

    review: reviewSchema({
      pageUrl: PAGE_URL,
      casinoName: casino.name,
      casinoId: casino.id,
      reviews: allReviews || [],
    }),
    aggregateRating:
      aggregateRatingSchema({
        pageUrl: PAGE_URL,
        casinoName: casino.name,
        reviews: allReviews,
      }) ?? undefined,
    offer:
      //  casino?.bonuses?.length
      //     ? offerSchema({
      //         pageUrl: PAGE_URL,
      //         casinoName: casino.name,
      //         offerUrl:
      //           casino.affiliate_url ?? casino.website_url,
      //         bonuses: casino.bonuses,
      //       })
      //     : undefined,
      offerSchema({
        pageUrl: PAGE_URL,
        casinoName: casino.name,
        offerUrl: casino.affiliate_url ?? casino.website_url,
        bonuses: casino.bonuses || [],
      }) ?? undefined,

    image: casino.featured_image
      ? imageSchema({
          imageUrl: casino.featured_image,
          pageUrl: PAGE_URL,
          caption: `${casino.name} Casino Review`,
        })
      : undefined,

    faq: faqSchema({
      pageUrl: PAGE_URL,
      faqs: casino.faqs?.length
        ? casino.faqs
        : [
            {
              question: "Is this casino licensed and safe?",
              answer:
                "Yes, it holds a valid gaming license and uses SSL encryption.",
            },
            {
              question: "What bonuses are available?",
              answer: "New players can claim the welcome package listed above.",
            },
            {
              question: "What should I look for in a casino review?",
              answer:
                "Our reviews give you a nice overview of what you can expect at an online casino. We recommend looking at the games selection, banking methods and bonuses to help you decide which casino fits you best.",
            },
            {
              question: "What information do your casino reviews include?",
              answer:
                "We review licensing, bonuses, banking, security, games, and support.",
            },
            {
              question: "How do I choose the best online casino?",
              answer:
                "Compare licensing, games, bonuses, payment methods, and withdrawal times.",
            },
            {
              question: "What banking methods should I look for?",
              answer:
                "Visa, Mastercard, Skrill, Neteller, PayPal, bank transfers, and crypto.",
            },
          ],
    }),
  });

  return (
    <>
      <JsonLd data={graph} />
      <CasinoReviewClient casino={casino} />
    </>
  );
}
