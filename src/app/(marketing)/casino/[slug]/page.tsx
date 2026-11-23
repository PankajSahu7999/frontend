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

import { buildApiUrl } from "@/config/api.config";

const SITE_URL = "https://casinoreviewsbook.com";

async function getCasino(slug: string) {
  try {
    const res = await fetch(
      buildApiUrl(`/casinos/slug/${slug}`),
      {
        next: {
          revalidate: 3600,
        },
      },
    );

    if (!res.ok) return null;

    return res.json();
  } catch (err) {
    console.error(`Error fetching casino ${slug}:`, err);
    return null;
  }
}

async function fetchReviews(casinoId: string) {
  try {
    const res = await fetch(
      buildApiUrl(`/casino-reviews/casino/${casinoId}`),
    );

    if (!res.ok) return [];

    const data = await res.json();
    return Array.isArray(data) ? data : data?.reviews || [];
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
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

  const casinoName = casino?.name?.trim() || "Online Casino";

  if (!casino) {
    return generateSEO({
      title: "Casino Not Found",
      description: "Casino review not found.",
      path: `/casino/${slug}`,
      noIndex: true,
      // robots: { index: false, follow: false },
    });
  }

  const currentYear = new Date().getFullYear();
  const ratingNum = casino.rating ? Number(casino.rating) : null;
  const ratingFormatted =
    ratingNum && ratingNum >= 1 && ratingNum <= 5
      ? ` (★ ${ratingNum.toFixed(1)}/5)`
      : "";
  const licenseText = casino.license_authority?.trim()
    ? `Licensed by ${casino.license_authority.trim()}`
    : "Verified Licensing";

  return generateSEO({
    title: `${casinoName} Review ${currentYear}${ratingFormatted}: Is It Legit? Bonuses & Payout Speed`,

    description:
      casino.meta_description?.trim() ||
      `Comprehensive ${currentYear} review of ${casinoName}. ${licenseText}. Discover safety ratings, withdrawal speed, RTP fairness, and player experience. Is ${casinoName} safe? Find out here.`,

    path: `/casino/${casino.slug}`,

    image: casino.featured_image,

    keywords: [
      casinoName,
      `${casinoName} review`,
      `${casinoName} bonus`,
      `${casinoName} casino`,
      `${casinoName} promo`,
      `${casinoName} withdrawal`,
      `${casinoName} deposit`,
      `is ${casinoName.toLowerCase()} legit`,
      `is ${casinoName.toLowerCase()} safe`,
      `${casinoName} payout speed`,
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
          url: `${SITE_URL}/casinos`,
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
      editorialReview: {
        rating: casino.rating,
        authorName: "Casino Reviews Book Editorial Team",
        reviewBody:
          casino.editor_view ||
          casino.overview ||
          casino.short_description,
        datePublished: casino.created_at,
        dateModified: casino.updated_at,
      },
    }),
    aggregateRating:
      aggregateRatingSchema({
        pageUrl: PAGE_URL,
        casinoName: casino.name,
        reviews: allReviews || [],
        fallbackRating: casino.rating,
        fallbackCount: casino.visits
          ? Math.max(Math.min(Math.floor(Number(casino.visits) / 50), 250), 15)
          : 15,
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
