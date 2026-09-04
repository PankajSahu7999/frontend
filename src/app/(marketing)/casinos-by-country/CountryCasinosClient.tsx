'use client';

import React, { useEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import CountryCasinoFilter, { CountryOption } from '@/components/sections/CountryCasinoFilter';
import { FeaturedCasinos } from '@/components/sections/FeaturedCasinos';
import { BonuesSection2 } from '@/components/sections/BonusSection2';
import AllCasinoSection from '@/components/sections/AllCasinoSection';
import CasinoShowsSection from '@/components/sections/CasinoShowsSection';
import SpinRallySection from '@/components/sections/SpinRallySection';
import PopularCasinoSection from '@/components/sections/PopularCasinoSection';
import NewCasinoSection from '@/components/sections/NewCasino';
import ExploreCasinoSection from '@/components/sections/ExploreCasino';
import CategorySection from '@/components/sections/CategorySection';
import CasinoFilter from '@/components/sections/CasinoFilter';

import { buildApiUrl } from '@/config/api.config';

// Dynamic imports for below-the-fold components
const NewsCarousel = dynamic(() => import('@/components/sections/NewsCarousel').then((mod) => mod.NewsCarousel), {
  ssr: true,
});
const FAQSection = dynamic(() => import('@/components/sections/FAQSection').then((mod) => mod.FAQSection), {
  ssr: true,
});
const TelegramSection = dynamic(() => import('@/components/sections/TelegramSection').then((mod) => mod.TelegramSection), {
  ssr: true,
});

interface CountryCasinosClientProps {
  initialCasinos?: any[];
  initialCountries?: any[];
}

export default function CountryCasinosClient({
  initialCasinos = [],
  initialCountries = [],
}: CountryCasinosClientProps) {
  const [allCasinos, setAllCasinos] = useState<any[]>(initialCasinos);
  const [countries, setCountries] = useState<CountryOption[]>(initialCountries);
  const [selectedCountry, setSelectedCountry] = useState<string>('ALL');
  const [tagFilters, setTagFilters] = useState<string[]>([]);
  const [advancedFilters, setAdvancedFilters] = useState<any>({});
  const [loading, setLoading] = useState(initialCasinos.length === 0);

  // Fetch fresh casinos and country list
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch casinos
        const casinoRes = await fetch(buildApiUrl('/casinos'));
        if (casinoRes.ok) {
          const cData = await casinoRes.json();
          setAllCasinos(Array.isArray(cData) ? cData : cData.casinos || []);
        }

        // Fetch countries
        const countryRes = await fetch(buildApiUrl('/countries'));
        if (countryRes.ok) {
          const cntryData = await countryRes.json();
          if (Array.isArray(cntryData)) {
            setCountries(
              cntryData.map((c: any) => ({
                id: c.id,
                name: c.name,
                code: c.code || c.iso2 || '',
                flag: c.flag_url || c.flag || '',
              }))
            );
          }
        }
      } catch (err) {
        console.error('Failed to fetch country casinos data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter casinos based on selectedCountry, tags, categories, ratings, and features
  const filteredCasinos = useMemo(() => {
    let result = [...allCasinos];

    // 1. Country Filter
    if (selectedCountry && selectedCountry !== 'ALL') {
      const q = selectedCountry.toLowerCase().trim();
      result = result.filter((casino) => {
        // Check available_countries list
        const available = casino.available_countries || [];
        if (available.length > 0) {
          const hasMatch = available.some((ac: any) => {
            const cName = (ac.country?.name || ac.name || '').toLowerCase().trim();
            const cCode = (ac.country?.code || ac.code || '').toLowerCase().trim();
            return (
              cName === q ||
              cName.includes(q) ||
              q.includes(cName) ||
              cCode === q ||
              (q.length >= 2 && cName.startsWith(q))
            );
          });
          if (hasMatch) return true;
        }

        // Check restricted_countries list
        const restricted = casino.restricted_countries || [];
        if (restricted.length > 0) {
          const isRestricted = restricted.some((rc: any) => {
            const rName = (rc.country?.name || rc.name || '').toLowerCase().trim();
            const rCode = (rc.country?.code || rc.code || '').toLowerCase().trim();
            return (
              rName === q ||
              rName.includes(q) ||
              q.includes(rName) ||
              rCode === q
            );
          });
          if (isRestricted) return false;
        }

        // Fallback: If no explicit country restrictions on casino, show it if available is empty
        return available.length === 0;
      });
    }

    // 2. Tag Filter
    if (tagFilters.length > 0) {
      result = result.filter((casino) => {
        const casinoTagIds =
          casino.tags?.map((tag: any) => tag.tag?.id || tag.tag_id || tag.id) || [];
        return tagFilters.some((tagId) => casinoTagIds.includes(tagId));
      });
    }

    // 3. Advanced Filters (Categories, Features, Ratings, Sort)
    const { tags = [], categories = [], features = [], minRating, sortBy } = advancedFilters;

    if (tags.length > 0) {
      result = result.filter((casino) => {
        const casinoTagIds = casino.tags?.map((t: any) => t.tag?.id || t.tag_id || t.id) || [];
        return tags.some((tagId: string) => casinoTagIds.includes(tagId));
      });
    }

    if (categories.length > 0) {
      result = result.filter((casino) => {
        const casinoCatIds = casino.categories?.map((c: any) => c.category?.id || c.category_id || c.id) || [];
        return categories.some((catId: string) => casinoCatIds.includes(catId));
      });
    }

    if (features.length > 0) {
      result = result.filter((casino) => {
        return features.every((feat: string) => Boolean((casino as any)[feat]));
      });
    }

    if (minRating && minRating > 0) {
      result = result.filter((casino) => {
        const ratingNum = typeof casino.rating === 'number' ? casino.rating : parseFloat(String(casino.rating || '0'));
        return ratingNum >= minRating;
      });
    }

    if (sortBy === 'rating') {
      result.sort((a, b) => (Number(b.rating) || 0) - (Number(a.rating) || 0));
    } else if (sortBy === 'newest') {
      result.sort((a, b) => (b.established_year || 0) - (a.established_year || 0));
    }

    return result;
  }, [allCasinos, selectedCountry, tagFilters, advancedFilters]);

  const handleFilterChange = (selectedTagIds: string[]) => {
    setTagFilters(selectedTagIds);
  };

  const handleAdvancedFilterChange = (filters: any) => {
    setAdvancedFilters(filters);
  };

  return (
    <div className="overflow-x-hidden w-full pb-12">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { name: 'Casinos', url: '/casinos/online-casino' },
          { name: 'Casinos by Country' },
        ]}
        className="mb-3"
      />

      {/* BIG TOP COUNTRY FILTER */}
      <CountryCasinoFilter
        countries={countries}
        selectedCountry={selectedCountry}
        onSelectCountry={setSelectedCountry}
        filteredCount={filteredCasinos.length}
        totalCount={allCasinos.length}
      />

      {/* Standard Casino Tag & Feature Filter (90% match to casino category pages) */}
      <CasinoFilter
        onFilterChange={handleFilterChange}
        onAdvancedFilterChange={handleAdvancedFilterChange}
      />

      {/* 90% Matching Casino Layout Sections */}
      <NewCasinoSection casinos={filteredCasinos} />

      <CategorySection />

      <ExploreCasinoSection casinos={filteredCasinos} />

      <TelegramSection />

      <PopularCasinoSection casinos={filteredCasinos} />

      <CasinoShowsSection casinos={filteredCasinos} />

      <SpinRallySection casinos={filteredCasinos} />

      <BonuesSection2 />

      <AllCasinoSection casinos={filteredCasinos} />

      <NewsCarousel />

      <FAQSection
        category="country-casinos"
        title="Frequently Asked Questions about Country Gambling Regulations"
        pageUrl="https://casinoreviewsbook.com/casinos-by-country"
      />

      <TelegramSection />
    </div>
  );
}
