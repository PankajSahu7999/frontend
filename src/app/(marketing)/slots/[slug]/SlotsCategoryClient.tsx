'use client';

import { useEffect, useState } from 'react';

import { Hero } from "@/components/sections/Hero";
import { FeaturedCasinos } from "@/components/sections/FeaturedCasinos";
import { FAQSection } from "@/components/sections/FAQSection";
import { NewsCarousel } from "@/components/sections/NewsCarousel";
import { BonuesSection2 } from "@/components/sections/BonusSection2";
import AllCasinoSection from "@/components/sections/AllCasinoSection";
import CasinoShowsSection from "@/components/sections/CasinoShowsSection";
import { TelegramSection } from "@/components/sections/TelegramSection";
import SpinRallySection from "@/components/sections/SpinRallySection";
import PopularCasinoSection from "@/components/sections/PopularCasinoSection";
import NewCasinoSection from "@/components/sections/NewCasino";
import ExploreCasinoSection from "@/components/sections/ExploreCasino";
import CategorySection from "@/components/sections/CategorySection";
import CasinoFilter from "@/components/sections/CasinoFilter";
import React from 'react';

export default function SlotsCategoryClient({
    initialData,
}: {
    initialData: any;
}) {
    // const resolvedParams = React.use(params);
    // const category = resolvedParams.slug;
    // const [categoryCasinos, setCategoryCasinos] = useState<any[]>([]);
    // const [filteredCasinos, setFilteredCasinos] = useState<any[]>([]);
    // const [categoryData, setCategoryData] = useState<any>(null);
    // const [loading, setLoading] = useState(true);

    const category = initialData.category;
    const casinos = initialData.casinos ?? [];
    const [filteredCasinos, setFilteredCasinos] = useState(casinos);

    // useEffect(() => {
    //     const fetchCategoryCasinos = async () => {
    //         try {
    //             const res = await fetch(
    //                 `${process.env.NEXT_PUBLIC_API_URL}/casinos/category/${category}`,
    //                 {
    //                     cache: 'no-store',
    //                 }
    //             );

    //             if (!res.ok) {
    //                 throw new Error('Failed to fetch category casinos');
    //             }

    //             const data = await res.json();

    //             const casinos = data.casinos || [];
    //             console.log('Category API Response:', data);
    //             setCategoryData(data.category);
    //             setCategoryCasinos(casinos);
    //             setFilteredCasinos(casinos);
    //         } catch (error) {
    //             console.error(error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchCategoryCasinos();
    // }, [category]);


    const handleFilterChange = (selectedTagIds: string[]) => {
        if (selectedTagIds.length === 0) {
            setFilteredCasinos(casinos);
            return;
        }

        const filtered = casinos.filter((casino: any) => {
            const casinoTagIds =
                casino.tags?.map((tag: any) => {
                    return tag.tag?.id || tag.tag_id;
                }) || [];

            return selectedTagIds.some((tagId) =>
                casinoTagIds.includes(tagId)
            );
        });

        setFilteredCasinos(filtered);
    };

    // if (loading) {
    //     return (
    //         <div className="min-h-screen flex items-center justify-center">
    //             Loading casinos...
    //         </div>
    //     );
    // }

    return (
       <div className="overflow-x-hidden w-full">

            {/* Optional category hero/header */}


            <Hero
                title={category?.name || category}
                subtitle="Explore the best online casinos in this category"
            />
            {/* Filter only category casinos */}
            <CasinoFilter onFilterChange={handleFilterChange} />

            {/* Your Home sections */}
            <NewCasinoSection casinos={filteredCasinos} />

            <CategorySection />

            <ExploreCasinoSection casinos={filteredCasinos} />

            <TelegramSection />

            <PopularCasinoSection casinos={filteredCasinos} />

            <CasinoShowsSection casinos={filteredCasinos} />

            <SpinRallySection casinos={filteredCasinos} />

            <BonuesSection2 />

            <CasinoShowsSection casinos={filteredCasinos} />

            <AllCasinoSection casinos={filteredCasinos} />

            <NewsCarousel />

            <FAQSection />

            <TelegramSection />

        </div>
    );
}