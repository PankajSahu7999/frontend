'use client';

import { useState, useEffect } from 'react';
import { Hero } from "@/components/sections/Hero";
import TrustEvidenceStrip from "@/components/sections/TrustEvidenceStrip";
import CasinoFilter, { AdvancedFilterState } from "@/components/sections/CasinoFilter";
import NewCasinoSection from "@/components/sections/NewCasino";
import CategorySection from "@/components/sections/CategorySection";
import ReviewMethodologySection from "@/components/sections/ReviewMethodologySection";
import ExploreCasinoSection from "@/components/sections/ExploreCasino";
import CompareByNeedSection from "@/components/sections/CompareByNeedSection";
import PopularCasinoSection from "@/components/sections/PopularCasinoSection";
import CasinoShowsSection from "@/components/sections/CasinoShowsSection";
import CountryLegalSection from "@/components/sections/CountryLegalSection";
import SpinRallySection from "@/components/sections/SpinRallySection";
import { BonuesSection2 } from "@/components/sections/BonusSection2";
import AllCasinoSection from "@/components/sections/AllCasinoSection";
import { useAppDispatch, useCasinos } from "@/hooks/useRedux";
import { filterCasinosByTags, filterCasinosAdvanced, setInitialCasinos } from "@/store/slices/casinoSlice";
import { setInitialNews } from "@/store/slices/newsSlice";
import { NewsCarousel } from "@/components/sections/NewsCarousel";
import { HomeSEOSection } from "@/components/sections/HomeSEOSection";
import ResponsiblePlayBanner from "@/components/sections/ResponsiblePlayBanner";
import { FAQSection } from "@/components/sections/FAQSection";
import { TelegramSection } from "@/components/sections/TelegramSection";

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
      {/* 1. Hero with Verification-First proposition & Search */}
      <Hero isHomepage={true} />

    
      {/* 3. Interactive Filter */}
      <CasinoFilter 
        onFilterChange={handleFilterChange} 
        onAdvancedFilterChange={handleAdvancedFilterChange}
      />

      {/* 4. New Casinos Carousel */}
      <NewCasinoSection casinos={activeCasinos} />
  

      {/* 5. Casino Categories Quick Chips */}
      <CategorySection />
{/* 2. Trust & Evidence Strip */}
      <TrustEvidenceStrip />
      {/* 6. Review Methodology (E-E-A-T 6-Step Verification Timeline) */}
      {/* <ReviewMethodologySection /> */}

      {/* 7. Explore Casinos Section */}
      <ExploreCasinoSection casinos={activeCasinos} />

      {/* 8. Compare by What Matters (Intent Cards: Withdrawals, Bonus, Mobile, License) */}
      <CompareByNeedSection />

      {/* 9. Popular Casinos Carousel */}
      <PopularCasinoSection casinos={activeCasinos} />

      {/* 10. Live Casino Shows Section */}
      <CasinoShowsSection casinos={activeCasinos} />

      {/* 11. Jurisdiction & Local Rules (UK, India, Russia Context + Disclaimers) */}
      <CountryLegalSection />

      {/* 12. Spin Rally Section */}
      <SpinRallySection casinos={activeCasinos} />

      {/* 13. Featured Bonuses Section */}
      <BonuesSection2 />

      {/* 14. All Casinos Directory List */}
      <AllCasinoSection casinos={activeCasinos} />
      
      {/* 15. Latest Industry News Carousel */}
      <NewsCarousel news={initialNews} />

      {/* 16. Topical Authority Editorial Section */}
      <HomeSEOSection />

      {/* 17. Responsible Gaming Advisory Panel (18+ & Hotlines) */}
      <ResponsiblePlayBanner />

      {/* 18. AEO-Optimized Frequently Asked Questions */}
      <FAQSection category="home" />

      {/* 19. Community Telegram Section */}
      <TelegramSection />
    </div>
  );
}
