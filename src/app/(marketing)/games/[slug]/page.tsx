// 'use client';

// import { useEffect, useState } from 'react';

// import { Hero } from "@/components/sections/Hero";
// import { FeaturedCasinos } from "@/components/sections/FeaturedCasinos";
// import { FAQSection } from "@/components/sections/FAQSection";
// import { NewsCarousel } from "@/components/sections/NewsCarousel";
// import { BonuesSection2 } from "@/components/sections/BonusSection2";
// import AllCasinoSection from "@/components/sections/AllCasinoSection";
// import CasinoShowsSection from "@/components/sections/CasinoShowsSection";
// import { TelegramSection } from "@/components/sections/TelegramSection";
// import SpinRallySection from "@/components/sections/SpinRallySection";
// import PopularCasinoSection from "@/components/sections/PopularCasinoSection";
// import NewCasinoSection from "@/components/sections/NewCasino";
// import ExploreCasinoSection from "@/components/sections/ExploreCasino";
// import CategorySection from "@/components/sections/CategorySection";
// import CasinoFilter from "@/components/sections/CasinoFilter";
// import React from 'react';

// export default function CategoryCasinoPage({
//     params,
// }: {
//     params: Promise<{ slug: string }>;
// }) {
//     const resolvedParams = React.use(params);
//     const category = resolvedParams.slug;
//     const [categoryCasinos, setCategoryCasinos] = useState<any[]>([]);
//     const [filteredCasinos, setFilteredCasinos] = useState<any[]>([]);
//     const [categoryData, setCategoryData] = useState<any>(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchCategoryCasinos = async () => {
//             try {
//                 const res = await fetch(
//                     `${process.env.NEXT_PUBLIC_API_URL}/casinos/category/${category}`,
//                     {
//                         cache: 'no-store',
//                     }
//                 );

//                 if (!res.ok) {
//                     throw new Error('Failed to fetch category casinos');
//                 }

//                 const data = await res.json();

//                 const casinos = data.casinos || [];
//                 console.log('Category API Response:', data);
//                 setCategoryData(data.category);
//                 setCategoryCasinos(casinos);
//                 setFilteredCasinos(casinos);
//             } catch (error) {
//                 console.error(error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchCategoryCasinos();
//     }, [category]);

//     const handleFilterChange = (selectedTagIds: string[]) => {
//         if (selectedTagIds.length === 0) {
//             setFilteredCasinos(categoryCasinos);
//             return;
//         }

//         const filtered = categoryCasinos.filter((casino) => {
//             const casinoTagIds =
//                 casino.tags?.map((tag: any) => {
//                     return tag.tag?.id || tag.tag_id;
//                 }) || [];

//             return selectedTagIds.some((tagId) =>
//                 casinoTagIds.includes(tagId)
//             );
//         });

//         setFilteredCasinos(filtered);
//     };

//     if (loading) {
//         return (
//             <div className="min-h-screen flex items-center justify-center">
//                 Loading casinos...
//             </div>
//         );
//     }

//     return (
//        <div className="overflow-x-hidden w-full">

//             {/* Optional category hero/header */}

//             <Hero
//                 title={categoryData?.name || category}
//                 subtitle="Explore the best online casinos in this category"
//             />
//             {/* Filter only category casinos */}
//             <CasinoFilter onFilterChange={handleFilterChange} />

//             {/* Your Home sections */}
//             <NewCasinoSection casinos={filteredCasinos} />

//             <CategorySection />

//             <ExploreCasinoSection casinos={filteredCasinos} />

//             <TelegramSection />

//             <PopularCasinoSection casinos={filteredCasinos} />

//             <CasinoShowsSection casinos={filteredCasinos} />

//             <SpinRallySection casinos={filteredCasinos} />

//             <BonuesSection2 />

//             <CasinoShowsSection casinos={filteredCasinos} />

//             <AllCasinoSection casinos={filteredCasinos} />

//             <NewsCarousel />

//             <FAQSection />

//             <TelegramSection />

//         </div>
//     );
// }

import { Metadata } from "next";
import { generateSEO, getCasinoCategoryBySlug } from "@/lib/seo";
import GamesCategoryClient from "./GamesCategoryClient";
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

  if (!data.category) {
    return generateSEO({
      title: "Casino Game Category Not Found - Casino Review Book",
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

export default async function Page({ params }: Props) {
  const { slug } = await params;
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
          name: data.category.name,
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
          question: `What is ${data.category.name}?`,
          answer: `${data.category.name} is a popular online casino game category available at licensed real-money casinos. Rules, RTP, volatility and bonus eligibility vary by game and casino.`,
        },
        {
          question: `Which casinos offer ${data.category.name}?`,
          answer: `We recommend licensed online casinos that provide secure gameplay, fair bonuses, reliable withdrawals and a quality selection of ${data.category.name} games.`,
        },
        {
          question: `Can I play ${data.category.name} on mobile?`,
          answer: `Yes. Most modern online casinos support ${data.category.name} games on Android, iPhone, tablets and desktop browsers.`,
        },
        {
          question: `How do you rank ${data.category.name} casinos?`,
          answer: `We compare licensing, RTP transparency, game providers, promotions, payment methods, withdrawal speed, mobile compatibility and responsible gambling tools.`,
        },
        {
          question: `Can I play ${data.category.name} at a casino?`,
          answer: `Yes, we provide a list of casinos offering ${data.category.name} games. You can also search for casinos by location, language and other criteria.`,
        },
        {
          question: `How We Review ${data.category.name} Casinos`,
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
