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
import SlotsCategoryClient from "./SlotsCategoryClient";
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
      title: "Online Slots Category Not Found - Casino Review Book",
      description:
        "Browse our premium indices of real-money online slots, progressives, and high-RTP games.",
      path: `/slots/${slug}`,
      noIndex: true,
    });
  }

  return generateSEO({
    title: `Best ${data?.category?.name} Slots Sites (2026) - Play Real Money ${data?.category?.name}`,
    description: `Discover top-rated online casinos offering verified ${data?.category?.name} slot machines. Compare payout percentages (RTP), maximum win potential, and claim free spins.`,
    path: `/slots/${data?.category?.slug || slug}`,
    keywords: [
      data?.category?.name.toLowerCase(),
      "best online slots",
      "real money slots",
      "high rtp slot sites",
      "free spins bonuses",
      "slot games",
      "free spins",
      "jackpot slots",
    ],
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const data = await getCasinoCategoryBySlug(slug);

  const graph = buildSchemaGraph({
    webpage: webpageSchema({
      url: `https://casinoreviewbook.com/slots/${data?.category?.slug || slug}`,
      title: `Best ${data?.category?.name} Slots Sites (2026) - Play Real Money ${data?.category?.name}`,
      description: `Discover top-rated online casinos offering verified ${data?.category?.name} slot machines. Compare payout percentages (RTP), maximum win potential, and claim free spins.`,
    }),
    collectionPage: collectionPageSchema({
      pageUrl: `https://casinoreviewbook.com/slots/${data?.category?.slug || slug}`,
      title: `${data.category.name} Slots`,
      description: `Collection of trusted casinos offering ${data.category.name} slot games.`,
    }),
    breadcrumb: breadcrumbSchema({
      pageUrl: `https://casinoreviewbook.com/slots/${data?.category?.slug || slug}`,
      items: [
        {
          name: "Home",
          url: "https://casinoreviewbook.com",
        },
        {
          name: "Slots",
          url: "https://casinoreviewbook.com/slots",
        },
        {
          name: data.category.name,
          url: `https://casinoreviewbook.com/slots/${data?.category?.slug || slug}`,
        },
      ],
    }),
    itemList: itemListSchema({
      pageUrl: `https://casinoreviewbook.com/slots/${data?.category?.slug || slug}`,
      itemListName: `${data.category.name} Slots`,
      items:
        data.casinos?.map((casino: any, index: number) => ({
          position: index + 1,
          name: casino.name,
          url: `https://casinoreviewsbook.com/casino/${casino.slug}`,
        })) ?? [],
    }),
    faq: faqSchema({
      pageUrl: `https://casinoreviewbook.com/slots/${data?.category?.slug || slug}`,
      faqs: [
        {
          question: "How do I claim a free spin bonus?",
          answer:
            "To claim a free spin bonus, simply visit the casino's website and follow the instructions provided to claim the bonus.",
        },
        {
          question: `What are ${data.category.name} slots?`,
          answer: `${data.category.name} slots are a category of online slot games featuring unique gameplay mechanics, RTP percentages, volatility levels and bonus features depending on the software provider.`,
        },
        {
          question: `Which casinos offer ${data.category.name} slots?`,
          answer: `We recommend licensed online casinos that provide verified ${data.category.name} slot games, fair promotions, secure payments and reliable withdrawals.`,
        },
        {
          question: `Can I play ${data.category.name} slots on mobile?`,
          answer: `Yes. Most modern online casinos support ${data.category.name} slot games on Android, iPhone, tablets and desktop browsers.`,
        },
        {
          question: `How do you rank slot casinos?`,
          answer: `Our rankings consider licensing, RTP transparency, game providers, bonus value, payment methods, withdrawal speed, mobile compatibility and responsible gambling tools.`,
        },
      ],
    }),
  });

  return (
    <>
      <JsonLd data={graph} />
      <SlotsCategoryClient initialData={data} />
    </>
  );
}
