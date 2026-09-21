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
    const category = initialData.category;
    const casinos = initialData.casinos ?? [];
    const [filteredCasinos, setFilteredCasinos] = useState(casinos);

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

    return (
       <div className="overflow-x-hidden w-full">
            <Hero
                title={category?.name || category || 'Slots'}
                subtitle="Explore the best online slot casinos in this category"
                bannerImage="/images/hero/slots-hero.jpg"
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