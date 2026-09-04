"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { FeaturedCasinos } from "@/components/sections/FeaturedCasinos";
import { BonuesSection2 } from "@/components/sections/BonusSection2";
import AllCasinoSection from "@/components/sections/AllCasinoSection";
import CasinoShowsSection from "@/components/sections/CasinoShowsSection";
import SpinRallySection from "@/components/sections/SpinRallySection";
import PopularCasinoSection from "@/components/sections/PopularCasinoSection";
import NewCasinoSection from "@/components/sections/NewCasino";
import ExploreCasinoSection from "@/components/sections/ExploreCasino";
import CategorySection from "@/components/sections/CategorySection";
import CasinoFilter from "@/components/sections/CasinoFilter";
import CategoryContentGuide from "@/components/sections/CategoryContentGuide";
import Breadcrumbs from "@/components/seo/Breadcrumbs";

// Dynamic imports for below-the-fold components
const NewsCarousel = dynamic(() => import("@/components/sections/NewsCarousel").then(mod => mod.NewsCarousel), {
  ssr: true,
});
const FAQSection = dynamic(() => import("@/components/sections/FAQSection").then(mod => mod.FAQSection), {
  ssr: true,
});
const TelegramSection = dynamic(() => import("@/components/sections/TelegramSection").then(mod => mod.TelegramSection), {
  ssr: true,
});

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
          return tag.tag?.id || tag.tag_id || tag.id;
        }) || [];

      return selectedTagIds.some((tagId) => casinoTagIds.includes(tagId));
    });

    setFilteredCasinos(filtered);
  };

  const handleAdvancedFilterChange = (filters: any) => {
    const { tags = [], categories = [], features = [], minRating, sortBy } = filters;
    let result = [...casinosData];

    if (tags.length > 0) {
      result = result.filter((casino: any) => {
        const casinoTagIds = casino.tags?.map((t: any) => t.tag?.id || t.tag_id || t.id) || [];
        return tags.some((tagId: string) => casinoTagIds.includes(tagId));
      });
    }

    if (categories.length > 0) {
      result = result.filter((casino: any) => {
        const casinoCatIds = casino.categories?.map((c: any) => c.category?.id || c.category_id || c.id) || [];
        return categories.some((catId: string) => casinoCatIds.includes(catId));
      });
    }

    if (features.length > 0) {
      result = result.filter((casino: any) => {
        return features.every((feat: string) => Boolean((casino as any)[feat]));
      });
    }

    if (minRating && minRating > 0) {
      result = result.filter((casino: any) => {
        const ratingNum = typeof casino.rating === 'number' ? casino.rating : parseFloat(String(casino.rating || '0'));
        return ratingNum >= minRating;
      });
    }

    if (sortBy === 'rating') {
      result.sort((a: any, b: any) => (Number(b.rating) || 0) - (Number(a.rating) || 0));
    } else if (sortBy === 'newest') {
      result.sort((a: any, b: any) => (b.established_year || 0) - (a.established_year || 0));
    }

    setFilteredCasinos(result);
  };

  const category = categoryData || initialData?.category;
  const contentSections = category?.content_sections || [];

  useEffect(() => {
    if (category) {
      console.log('[CasinoClient] Loaded category:', category.name, 'Sections:', contentSections.length, contentSections);
    }
  }, [category, contentSections]);

  return (
    <div className="overflow-x-hidden w-full">
      {/* Breadcrumb Navigation & Schema */}
      <Breadcrumbs
        items={[
          { name: 'Casinos', url: '/casinos/online-casino' },
          { name: category?.name || (typeof slug === 'string' ? slug.replace(/-/g, ' ') : 'Category') },
        ]}
        className="mb-2"
      />

      {/* Optional category hero/header */}
      <Hero
        title={category?.name || (typeof slug === 'string' ? slug.replace(/-/g, ' ') : 'Casinos')}
        subtitle="Explore the best online casinos in this category"
      />
      {/* Filter only category casinos */}
      <CasinoFilter 
        onFilterChange={handleFilterChange} 
        onAdvancedFilterChange={handleAdvancedFilterChange}
      />

      {/* Your Home sections */}
      <NewCasinoSection casinos={filteredCasinos} />

      <CategorySection />

      <ExploreCasinoSection casinos={filteredCasinos} />

      <TelegramSection />

      <PopularCasinoSection casinos={filteredCasinos} />

      <CasinoShowsSection casinos={filteredCasinos} />

      <SpinRallySection casinos={filteredCasinos} />

      <BonuesSection2 />

      <AllCasinoSection casinos={filteredCasinos} />

      {/* Content Guide Section */}
      {contentSections && contentSections.length > 0 && (
        <CategoryContentGuide 
          contentSections={contentSections} 
          categoryName={category?.name || 'Casinos'}
        />
      )}

      <NewsCarousel />

      <FAQSection 
        category={category?.slug || (typeof slug === 'string' ? slug : undefined)}
        title={`Frequently Asked Questions about ${category?.name || 'Online Casinos'}`}
        pageUrl={`https://casinoreviewsbook.com/casinos/${category?.slug || slug || ''}`}
      />

      <TelegramSection />
    </div>
  );
}
