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
      title: "Casino Brand Review Not Found - Casino Review Book",
      description:
        "Explore our up-to-date catalog of secure, licensed, and reviewed online casinos.",
      path: `/casinos/${slug}`,
      noIndex: true,
    });
  }
  
  return generateSEO({
    title: `Best ${data?.category?.name} Casinos - Casino Review Book`,
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
