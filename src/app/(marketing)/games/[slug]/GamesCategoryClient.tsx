"use client";

import { useEffect, useState } from "react";

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
import CategoryContentGuide from "@/components/sections/CategoryContentGuide";
import React from "react";

export default function CategoryCasinoPage({
  initialData,
  slug,
}: {
  initialData: any;
  slug?: string;
}) {
  const [categoryData, setCategoryData] = useState<any>(initialData?.category || null);
  const [casinosData, setCasinosData] = useState<any[]>(initialData?.casinos || []);
  const [filteredCasinos, setFilteredCasinos] = useState<any[]>(initialData?.casinos || []);

  useEffect(() => {
    if (initialData?.category) {
      setCategoryData(initialData.category);
      setCasinosData(initialData.casinos || []);
      setFilteredCasinos(initialData.casinos || []);
    }
  }, [initialData]);

  // Client-side fetch fallback to ensure fresh data and guide content
  useEffect(() => {
    if (!slug) return;
    const fetchFreshData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
        const res = await fetch(`${apiUrl}/casinos/category/${slug}`, {
          cache: 'no-store'
        });
        if (res.ok) {
          const data = await res.json();
          if (data.category) {
            setCategoryData(data.category);
            if (data.casinos) {
              setCasinosData(data.casinos);
              setFilteredCasinos(data.casinos);
            }
          }
        }
      } catch (err) {
        console.error('Failed to fetch category casinos on client:', err);
      }
    };

    fetchFreshData();
  }, [slug]);

  const handleFilterChange = (selectedTagIds: string[]) => {
    if (selectedTagIds.length === 0) {
      setFilteredCasinos(casinosData);
      return;
    }

    const filtered = casinosData.filter((casino: any) => {
      const casinoTagIds =
        casino.tags?.map((tag: any) => {
          return tag.tag?.id || tag.tag_id;
        }) || [];

      return selectedTagIds.some((tagId) => casinoTagIds.includes(tagId));
    });

    setFilteredCasinos(filtered);
  };

  const category = categoryData || initialData?.category;
  const contentSections = category?.content_sections || [];

  //   if (loading) {
  //     return (
  //       <div className="min-h-screen flex items-center justify-center">
  //         Loading casinos...
  //       </div>
  //     );
  //   }

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

      {/* Content Guide Section */}
      {category?.content_sections && category.content_sections.length > 0 && (
        <CategoryContentGuide 
          contentSections={category.content_sections} 
          categoryName={category?.name || category}
        />
      )}

      <NewsCarousel />

      <FAQSection 
        category={category?.slug || (typeof slug === 'string' ? slug : undefined)}
        title={`Frequently Asked Questions about ${category?.name || 'Casino Games'}`}
        pageUrl={`https://casinoreviewsbook.com/games/${category?.slug || slug || ''}`}
      />

      <TelegramSection />
    </div>
  );
}
