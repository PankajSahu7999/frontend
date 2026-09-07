'use client';

import dynamic from 'next/dynamic';
import { Hero } from "@/components/sections/Hero";
import { FeaturedCasinos } from "@/components/sections/FeaturedCasinos";
import NewCasinoSection from "@/components/sections/NewCasino";
import CategorySection from "@/components/sections/CategorySection";
import ExploreCasinoSection from "@/components/sections/ExploreCasino";
import PopularCasinoSection from "@/components/sections/PopularCasinoSection";
import CasinoShowsSection from "@/components/sections/CasinoShowsSection";
import SpinRallySection from "@/components/sections/SpinRallySection";
import { BonuesSection2 } from "@/components/sections/BonusSection2";
import AllCasinoSection from "@/components/sections/AllCasinoSection";
import CasinoFilter, { AdvancedFilterState } from "@/components/sections/CasinoFilter";
import { useAppDispatch } from "@/hooks/useRedux";
import { filterCasinosByTags, filterCasinosAdvanced } from "@/store/slices/casinoSlice";

// Dynamic imports for below-the-fold components to reduce initial JS payload
const NewsCarousel = dynamic(() => import("@/components/sections/NewsCarousel").then(mod => mod.NewsCarousel), {
  ssr: true,
});
const FAQSection = dynamic(() => import("@/components/sections/FAQSection").then(mod => mod.FAQSection), {
  ssr: true,
});
const TelegramSection = dynamic(() => import("@/components/sections/TelegramSection").then(mod => mod.TelegramSection), {
  ssr: true,
});

import { HomeSEOSection } from "@/components/sections/HomeSEOSection";

export default function HomeContent() {
  const dispatch = useAppDispatch();

  const handleFilterChange = (selectedTagIds: string[]) => {
    dispatch(filterCasinosByTags(selectedTagIds));
  };

  const handleAdvancedFilterChange = (filters: AdvancedFilterState) => {
    dispatch(filterCasinosAdvanced(filters));
  };

  return (
    <div className="overflow-x-hidden w-full">
      <Hero />
      <CasinoFilter 
        onFilterChange={handleFilterChange} 
        onAdvancedFilterChange={handleAdvancedFilterChange}
      />
      <NewCasinoSection />
      <CategorySection />

      <ExploreCasinoSection />
      <PopularCasinoSection />
      <CasinoShowsSection />
      <SpinRallySection />
      <BonuesSection2 />
      <AllCasinoSection />
      
      {/* Below-the-fold sections */}
      <NewsCarousel />
      <HomeSEOSection />
      <FAQSection />
      <TelegramSection />
    </div>
  );
}
