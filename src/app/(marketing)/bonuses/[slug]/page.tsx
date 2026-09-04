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
      title: "Exclusive Casino Bonuses Not Found | Casino Review Book",
      description:
        "Discover top verified match bonuses, free spins, and promo deals.",
      path: `bonuses/${slug}`,
      noIndex: true,
    });
  }

  return generateSEO({
    title: `Best ${data?.category?.name} Casino Bonuses & Promotions (${new Date().getFullYear()})`,
    description: `Unlock the best ${data?.category?.name} casino bonuses including welcome bonuses, including match bonuses, free spins, no deposit bonuses, cashback offers and free spins from trusted online casinos.`,
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
      title: `Best ${data?.category?.name} Casino Bonuses - Casino Review Book (${new Date().getFullYear()})`,
      description:
        "Unlock the best casino bonuses including welcome bonuses, including match bonuses, free spins, no deposit bonuses, cashback offers and free spins from trusted online casinos.",
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
