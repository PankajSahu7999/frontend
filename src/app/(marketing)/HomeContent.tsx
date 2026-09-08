'use client';

import { useState, useEffect } from 'react';
import { Hero } from "@/components/sections/Hero";
import NewCasinoSection from "@/components/sections/NewCasino";
import CategorySection from "@/components/sections/CategorySection";
import ExploreCasinoSection from "@/components/sections/ExploreCasino";
import PopularCasinoSection from "@/components/sections/PopularCasinoSection";
import CasinoShowsSection from "@/components/sections/CasinoShowsSection";
import SpinRallySection from "@/components/sections/SpinRallySection";
import { BonuesSection2 } from "@/components/sections/BonusSection2";
import AllCasinoSection from "@/components/sections/AllCasinoSection";
import CasinoFilter, { AdvancedFilterState } from "@/components/sections/CasinoFilter";
import { useAppDispatch, useCasinos } from "@/hooks/useRedux";
import { filterCasinosByTags, filterCasinosAdvanced, setInitialCasinos } from "@/store/slices/casinoSlice";
import { setInitialNews } from "@/store/slices/newsSlice";
import { NewsCarousel } from "@/components/sections/NewsCarousel";
import { FAQSection } from "@/components/sections/FAQSection";
import { TelegramSection } from "@/components/sections/TelegramSection";
import { HomeSEOSection } from "@/components/sections/HomeSEOSection";

export default function HomeContent({
  initialCasinos = [],
  initialNews = [],
}: {
  initialCasinos?: any[];
  initialNews?: any[];
}) {
  const dispatch = useAppDispatch();
  const [hasFilter, setHasFilter] = useState(false);
  const { filteredCasinos, casinos: reduxCasinos } = useCasinos();

  useEffect(() => {
    if (initialCasinos.length > 0) {
      dispatch(setInitialCasinos(initialCasinos));
    }
    if (initialNews.length > 0) {
      dispatch(setInitialNews(initialNews));
    }
  }, [dispatch, initialCasinos, initialNews]);

  const activeCasinos = hasFilter
    ? filteredCasinos
    : (initialCasinos.length > 0 ? initialCasinos : (filteredCasinos.length > 0 ? filteredCasinos : reduxCasinos));

  const handleFilterChange = (selectedTagIds: string[]) => {
    setHasFilter(selectedTagIds.length > 0);
    dispatch(filterCasinosByTags(selectedTagIds));
  };

  const handleAdvancedFilterChange = (filters: AdvancedFilterState) => {
    setHasFilter(true);
    dispatch(filterCasinosAdvanced(filters));
  };

  return (
    <div className="overflow-x-hidden w-full">
      <Hero />
      <CasinoFilter 
        onFilterChange={handleFilterChange} 
        onAdvancedFilterChange={handleAdvancedFilterChange}
      />
      <NewCasinoSection casinos={activeCasinos} />
      <CategorySection />

      <ExploreCasinoSection casinos={activeCasinos} />
      <PopularCasinoSection casinos={activeCasinos} />
      <CasinoShowsSection casinos={activeCasinos} />
      <SpinRallySection casinos={activeCasinos} />
      <BonuesSection2 />
      <AllCasinoSection casinos={activeCasinos} />
      
      {/* Below-the-fold sections */}
      <NewsCarousel news={initialNews} />
      <HomeSEOSection />
      <FAQSection />
      <TelegramSection />
    </div>
  );
}
