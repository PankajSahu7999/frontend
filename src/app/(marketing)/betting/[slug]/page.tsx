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
//     <div className="overflow-x-hidden w-full">

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
import { generateSEO, getBettingCategoryBySlug } from "@/lib/seo";
import BettingClient from "./BettingClient";
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
  const data = await getBettingCategoryBySlug(slug);

  if (!data?.category) {
    return generateSEO({
      title: "Betting Category Not Found | Casino Review Book",
      description:
        "The requested betting category could not be found. Browse our latest betting guides, casino reviews, sportsbook comparisons and bonus offers.",
      path: `betting/${slug}`,
      noIndex: true,
    });
  }

  const category = data.category;

  return generateSEO({
    title: `Best ${category.name} Betting Sites & Bonuses - Casino Review Book (${new Date().getFullYear()})`,
    description: `Compare top-rated online ${category.name} gambling options. Real player reviews, sign-up bonuses, and secure platforms.`,
    path: `/betting/${category.slug || slug}`,
    keywords: [
      `${category.name} betting`,
      `${category.name} betting sites`,
      `${category.name} sportsbooks`,
      `${category.name} casinos`,
      "betting",
      "betting sites",
      "casino bonuses",
      "online casino",
      "casino reviews",
      "gambling offers",
    ],
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const data = await getBettingCategoryBySlug(slug);
  const graph = buildSchemaGraph({
    webpage: webpageSchema({
      url: `https://casinoreviewsbook.com/betting/${slug}/`,
      title: `Best ${data?.category?.name} Betting Sites - Casino Review Book (${new Date().getFullYear()})`,
      description: `Compare top-rated online ${data?.category?.name} gambling options. Real player reviews, sign-up bonuses, and secure platforms.`,
      image: "/images/logo.png",
      breadcrumbId: `https://casinoreviewsbook.com/betting/${slug}/#breadcrumb`,
    }),
    collectionPage: collectionPageSchema({
      pageUrl: `https://casinoreviewsbook.com/betting/${slug}/`,
      title: `Best ${data?.category?.name} Betting Sites`,
      description: `Compare trusted ${data?.category?.name} betting sites, bonuses, payment methods and expert reviews.`,
    }),
    breadcrumb: breadcrumbSchema({
      pageUrl: `https://casinoreviewsbook.com/betting/${slug}/`,
      items: [
        {
          name: "Home",
          url: "https://casinoreviewsbook.com",
        },
        {
          name: "Betting",
          url: "https://casinoreviewsbook.com/betting",
        },
        {
          name: data.category.name,
          url: `https://casinoreviewsbook.com/betting/${slug}`,
        },
      ],
    }),

    itemList: itemListSchema({
      pageUrl: `https://casinoreviewsbook.com/betting/${slug}/`,
      itemListName: data?.category?.name,
      items:
        data.casinos?.map((casino: any, index: number) => ({
          position: index + 1,
          name: casino.name,
          url: `https://casinoreviewsbook.com/casino/${casino.slug}`,
        })) ?? [],
    }),

    faq: faqSchema({
      pageUrl: `https://casinoreviewsbook.com/betting/${slug}/#faq`,
      faqs: [
        {
          question: `What is ${data.category.name} betting?`,
          answer: `${data.category.name} betting allows players to place wagers on events or games related to ${data?.category.name}. Players should choose licensed operators, compare odds, review bonus terms, and use responsible gambling tools.`,
        },
        {
          question: `How do we rank ${data.category.name} betting sites?`,
          answer:
            "We evaluate licensing, security, payment options, welcome bonuses, betting markets, payout speed, customer support, mobile experience, and responsible gambling features.",
        },
        {
          question: "What is a Betting Category?",
          answer:
            "A Betting Category is a grouping of casinos based on their betting options. It can include sportsbooks, live casinos, and other online gambling options.",
        },
        {
          question: "Are these betting sites safe?",
          answer:
            "We prioritize operators that hold recognized gaming licenses, use SSL encryption, support secure payment methods, and provide responsible gambling controls.",
        },
        {
          question: "How we review betting sites",
          answer:
            "Casino Review Book independently researches betting operators by examining    licensing, security, payment methods, betting markets, promotional terms, user experience, mobile compatibility, and responsible gambling tools. Our goal is to help players compare betting platforms using transparent, research-based information.",
        },
      ],
    }),
  });

  return (
    <>
      <JsonLd data={graph} />
      <BettingClient initialData={data} />
    </>
  );
  // return <BettingClient initialData={data} slug={slug} />;
}
