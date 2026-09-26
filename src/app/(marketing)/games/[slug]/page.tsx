import { Metadata } from "next";
import { generateSEO, getCasinoCategoryBySlug } from "@/lib/seo";
import { buildApiUrl } from "@/config/api.config";
import GamesCategoryClient from "./GamesCategoryClient";
import GameDetailClient from "../GameDetailClient";
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

async function getGameBySlug(slug: string) {
  try {
    const res = await fetch(buildApiUrl(`/games/slug/${encodeURIComponent(slug)}`), {
      cache: "no-store",
    });
    if (res.ok) {
      return await res.json();
    }
    return null;
  } catch (err) {
    return null;
  }
}

async function getSponsoredSlots() {
  try {
    const res = await fetch(buildApiUrl(`/games?is_sponsored=true`), {
      cache: "no-store",
    });
    if (res.ok) {
      return await res.json();
    }
    return [];
  } catch (err) {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  // 1. Check if it's a specific game
  const game = await getGameBySlug(slug);
  if (game) {
    return generateSEO({
      title: `${game.title} Demo & Real Money Play (${game.provider || 'Casino Game'})`,
      description: `Play ${game.title} by ${game.provider || 'top providers'} for free or real money. Certified RTP of ${game.rtp || '97%'}, complete betting limits, strategy overview and best casinos.`,
      path: `/games/${slug}`,
      keywords: [
        game.title,
        game.provider,
        game.game_type,
        "play demo",
        "real money casino",
        "casino review"
      ].filter(Boolean),
    });
  }

  // 2. Check if it's a casino category
  const data = await getCasinoCategoryBySlug(slug);

  if (!data?.category) {
    return generateSEO({
      title: "Casino Game Not Found - Casino Reviews Book",
      description:
        "Browse our premium indices of real-money online slots, crash games, and table classics.",
      path: `/games/${slug}`,
      noIndex: true,
    });
  }

  return generateSEO({
    title: `Best ${data?.category?.name} Casinos (2026) - Play Real Money ${data?.category?.name} Games`,
    description: `Discover the top-rated online casinos offering ${data?.category?.name}. Read detailed mechanics guidelines, RTP percentages, volatility breakdowns, and claim free spin bonuses.`,
    path: `/games/${data.category.slug || slug}`,
    keywords: [
      data?.category?.name,
      "online casino",
      `play ${data?.category?.name.toLowerCase()} online`,
      `best ${data?.category?.name.toLowerCase()} sites`,
      "casino reviews",
      "casino bonus",
      "real money casino",
    ],
  });
}

async function getRealCasinos() {
  try {
    const res = await fetch(buildApiUrl("/casinos?limit=8"), {
      cache: "no-store",
    });
    if (res.ok) {
      return await res.json();
    }
    return [];
  } catch (err) {
    console.error("Error fetching real casinos for game detail:", err);
    return [];
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  // 1. Check if this is an individual game
  const game = await getGameBySlug(slug);
  if (game) {
    const [sponsored, topCasinos] = await Promise.all([
      getSponsoredSlots(),
      getRealCasinos(),
    ]);
    return (
      <GameDetailClient
        game={game}
        sponsoredSlots={sponsored.length > 0 ? sponsored : undefined}
        topCasinos={topCasinos}
      />
    );
  }

  // 2. Otherwise render category list
  const data = await getCasinoCategoryBySlug(slug);

  const graph = buildSchemaGraph({
    webpage: webpageSchema({
      url: `https://casinoreviewbook.com/games/${slug}`,
      title: `Best Play Real Money ${data?.category?.name} Games`,
      description: `Discover the top-rated online casinos offering ${data?.category?.name}. Read detailed mechanics guidelines, RTP percentages, volatility breakdowns, and claim free spin bonuses.`,
    }),
    collectionPage: collectionPageSchema({
      pageUrl: `https://casinoreviewbook.com/games/${slug}`,
      title: `${data?.category?.name} Games`,
      description: `Collection of trusted casinos featuring ${data?.category?.name} games.`,
    }),
    breadcrumb: breadcrumbSchema({
      pageUrl: `https://casinoreviewbook.com/games/${slug}`,
      items: [
        {
          name: "Home",
          url: "https://casinoreviewbook.com",
        },
        {
          name: "Games",
          url: "https://casinoreviewbook.com/games",
        },
        {
          name: data?.category?.name || slug,
          url: `https://casinoreviewbook.com/games/${slug}`,
        },
      ],
    }),
    itemList: itemListSchema({
      pageUrl: `https://casinoreviewbook.com/games/${slug}`,
      itemListName: `${data?.category?.name} Casinos List`,
      items:
        data.casinos?.map((casino: any, index: number) => ({
          position: index + 1,
          name: casino.name,
          url: `https://casinoreviewsbook.com/casino/${casino.slug}`,
        })) ?? [],
    }),
    faq: faqSchema({
      pageUrl: `https://casinoreviewbook.com/games/${slug}`,
      faqs: [
        {
          question: `What is ${data?.category?.name}?`,
          answer: `${data?.category?.name} is a popular online casino game category available at licensed real-money casinos. Rules, RTP, volatility and bonus eligibility vary by game and casino.`,
        },
        {
          question: `Which casinos offer ${data?.category?.name}?`,
          answer: `We recommend licensed online casinos that provide secure gameplay, fair bonuses, reliable withdrawals and a quality selection of ${data?.category?.name} games.`,
        },
        {
          question: `Can I play ${data?.category?.name} on mobile?`,
          answer: `Yes. Most modern online casinos support ${data?.category?.name} games on Android, iPhone, tablets and desktop browsers.`,
        },
        {
          question: `How do you rank ${data?.category?.name} casinos?`,
          answer: `We compare licensing, RTP transparency, game providers, promotions, payment methods, withdrawal speed, mobile compatibility and responsible gambling tools.`,
        },
        {
          question: `Can I play ${data?.category?.name} at a casino?`,
          answer: `Yes, we provide a list of casinos offering ${data?.category?.name} games. You can also search for casinos by location, language and other criteria.`,
        },
        {
          question: `How We Review ${data?.category?.name} Casinos`,
          answer: `We evaluate casinos based on their online casino license, RTP transparency, payment methods, game selection, bonus eligibility, withdrawal speed, mobile compatibility and responsible gambling tools.`,
        },
      ],
    }),
  });

  return (
    <>
      <JsonLd data={graph} />
      <GamesCategoryClient initialData={data} />
    </>
  );
}
