'use client';

import { useState, useEffect, useRef } from 'react';
import { SlidersHorizontal, X, Check, Star, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import { API_CONFIG } from '@/config/api.config';

interface Tag {
  id: string;
  name: string;
  slug: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface AdvancedFilterState {
  tags: string[];
  categories: string[];
  features: string[];
  minRating: number;
  sortBy: string;
}

interface CasinoFilterProps {
  onFilterChange: (selectedTags: string[]) => void;
  onAdvancedFilterChange?: (filters: AdvancedFilterState) => void;
}

const FEATURE_OPTIONS = [
  { id: 'crypto_supported', label: '🪙 Crypto Friendly' },
  { id: 'mobile_friendly', label: '📱 Mobile Friendly' },
  { id: 'live_casino', label: '🎥 Live Dealer' },
  { id: 'sports_betting', label: '⚽ Sports Betting' },
  { id: 'certified_casino', label: '🛡️ Certified Casino' },
  { id: 'hot_casino', label: '🔥 Hot & Trending' },
];

const RATING_OPTIONS = [
  { value: 0, label: 'All Ratings' },
  { value: 4.5, label: '4.5+ ★' },
  { value: 4.0, label: '4.0+ ★' },
  { value: 3.5, label: '3.5+ ★' },
];

const SORT_OPTIONS = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest Established' },
];

export default function CasinoFilter({
  onFilterChange,
  onAdvancedFilterChange,
}: CasinoFilterProps) {
  const [tags, setTags] = useState<Tag[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Quick tag selection on the pill bar
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Modal filter states
  const [modalCategories, setModalCategories] = useState<string[]>([]);
  const [modalTags, setModalTags] = useState<string[]>([]);
  const [modalFeatures, setModalFeatures] = useState<string[]>([]);
  const [modalMinRating, setModalMinRating] = useState<number>(0);
  const [modalSortBy, setModalSortBy] = useState<string>('recommended');

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const baseUrl = API_CONFIG.baseURL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tagsRes, catsRes] = await Promise.all([
          fetch(`${baseUrl}/admin/tags`).catch(() => null),
          fetch(`${baseUrl}/admin/categories`).catch(() => null),
        ]);

        if (tagsRes && tagsRes.ok) {
          const tagsData = await tagsRes.json();
          setTags(tagsData || []);
        }
        if (catsRes && catsRes.ok) {
          const catsData = await catsRes.json();
          setCategories(catsData || []);
        }
      } catch (error) {
        console.error('Error fetching filter data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [baseUrl]);

  // Sync quick pill clicks with advanced filter
  const toggleTag = (tagId: string) => {
    if (tagId === 'all') {
      setSelectedTags([]);
      setModalTags([]);
      onFilterChange([]);
      if (onAdvancedFilterChange) {
        onAdvancedFilterChange({
          tags: [],
          categories: modalCategories,
          features: modalFeatures,
          minRating: modalMinRating,
          sortBy: modalSortBy,
        });
      }
    } else {
      const newSelectedTags = selectedTags.includes(tagId)
        ? selectedTags.filter((id) => id !== tagId)
        : [...selectedTags, tagId];

      setSelectedTags(newSelectedTags);
      setModalTags(newSelectedTags);
      onFilterChange(newSelectedTags);
      if (onAdvancedFilterChange) {
        onAdvancedFilterChange({
          tags: newSelectedTags,
          categories: modalCategories,
          features: modalFeatures,
          minRating: modalMinRating,
          sortBy: modalSortBy,
        });
      }
    }
  };

  // Modal Category Toggle
  const toggleModalCategory = (catId: string) => {
    setModalCategories((prev) =>
      prev.includes(catId) ? prev.filter((id) => id !== catId) : [...prev, catId]
    );
  };

  // Modal Tag Toggle
  const toggleModalTag = (tagId: string) => {
    setModalTags((prev) =>
      prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]
    );
  };

  // Modal Feature Toggle
  const toggleModalFeature = (featId: string) => {
    setModalFeatures((prev) =>
      prev.includes(featId) ? prev.filter((id) => id !== featId) : [...prev, featId]
    );
  };

  // Reset all filters in modal
  const handleResetFilters = () => {
    setSelectedTags([]);
    setModalCategories([]);
    setModalTags([]);
    setModalFeatures([]);
    setModalMinRating(0);
    setModalSortBy('recommended');

    onFilterChange([]);
    if (onAdvancedFilterChange) {
      onAdvancedFilterChange({
        tags: [],
        categories: [],
        features: [],
        minRating: 0,
        sortBy: 'recommended',
      });
    }
    setIsModalOpen(false);
  };

  // Apply filters from modal
  const handleApplyFilters = () => {
    setSelectedTags(modalTags);
    onFilterChange(modalTags);
    if (onAdvancedFilterChange) {
      onAdvancedFilterChange({
        tags: modalTags,
        categories: modalCategories,
        features: modalFeatures,
        minRating: modalMinRating,
        sortBy: modalSortBy,
      });
    }
    setIsModalOpen(false);
  };

  // Count active modal filters
  const activeFiltersCount =
    modalCategories.length +
    modalTags.length +
    modalFeatures.length +
    (modalMinRating > 0 ? 1 : 0) +
    (modalSortBy !== 'recommended' ? 1 : 0);

  if (loading) {
    return (
      <div className="w-full py-6 flex justify-center">
        <p className="text-[#6F758F]">Loading filters...</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Filter Buttons Row */}
      <div className="relative flex items-center gap-2 mt-6 w-full">
        {/* Filter Popup Button on LEFT of ALL button */}
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className={`shrink-0 flex items-center gap-2 rounded-full px-5 py-2 transition-all duration-200
font-poppins font-semibold text-[14px] leading-[100%] tracking-[0.02em] uppercase border-2 whitespace-nowrap
${
  activeFiltersCount > 0
    ? 'bg-gradient-to-b from-[#F4F8FF] to-[#E8F0FF] border-[#2E68FB] text-[#2E68FB] shadow-[0px_4px_10px_rgba(46,104,251,0.15)]'
    : 'bg-[#FFFFFF6C] border-[#FFFFFF80] text-[#6F758F] shadow-[0px_3px_6px_rgba(255,255,255,0.5)] hover:bg-[#FFFFFF80] hover:text-[#2E68FB]'
}`}
        >
          <SlidersHorizontal className="w-4 h-4 text-[#2E68FB]" />
          <span>Filters</span>
          {activeFiltersCount > 0 && (
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#2E68FB] text-white text-[11px] font-bold">
              {activeFiltersCount}
            </span>
          )}
        </button>

        {/* Scroll Left Button */}
       

        {/* Horizontally Scrollable Pills Container */}
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-2 overflow-x-auto py-1 scroll-smooth flex-1 scrollbar-hide [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {/* All button */}
          <button
            key="all"
            type="button"
            onClick={() => toggleTag('all')}
            className={`shrink-0 whitespace-nowrap rounded-full px-5 py-2 transition-all duration-200
font-poppins font-semibold text-[14px] leading-[100%] tracking-[0.02em] uppercase
border-2
${
  selectedTags.length === 0 && modalCategories.length === 0 && modalFeatures.length === 0 && modalMinRating === 0
    ? 'bg-gradient-to-b from-[#F4F8FF] to-[#E8F0FF] border-[#BFD4FF] text-[#2E68FB] shadow-[0px_4px_10px_rgba(46,104,251,0.12)]'
    : 'bg-[#FFFFFF6C] border-[#FFFFFF80] text-[#6F758F] shadow-[0px_3px_6px_rgba(255,255,255,0.5)] hover:bg-[#FFFFFF80]'
}`}
          >
            All
          </button>

          {/* Quick Tag Pills */}
          {tags.map((tag) => {
            const selected = selectedTags.includes(tag.id);

            return (
              <button
                key={tag.id}
                type="button"
                onClick={() => toggleTag(tag.id)}
                className={`shrink-0 whitespace-nowrap rounded-full px-5 py-2 transition-all duration-200
font-poppins font-semibold text-[14px] leading-[100%] tracking-[0.02em] uppercase
border-2
${
  selected
    ? 'bg-gradient-to-b from-[#F4F8FF] to-[#E8F0FF] border-[#BFD4FF] text-[#2E68FB] shadow-[0px_4px_10px_rgba(46,104,251,0.12)]'
    : 'bg-[#FFFFFF6C] border-[#FFFFFF80] text-[#6F758F] shadow-[0px_3px_6px_rgba(255,255,255,0.5)] hover:bg-[#FFFFFF80]'
}`}
              >
                {tag.name}
              </button>
            );
          })}
        </div>

        {/* Scroll Right Button */}
      
      </div>

      {/* FILTER POPUP MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
          {/* Modal Container */}
          <div
            className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-100 animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-[#2E68FB]" />
                <h3 className="text-xl font-bold text-slate-900">Filter Casinos</h3>
                {activeFiltersCount > 0 && (
                  <span className="px-2 py-0.5 text-xs font-semibold text-white bg-[#2E68FB] rounded-full">
                    {activeFiltersCount} active
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800">
              {/* 1. Features */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Casino Features
                </h4>
                <div className="flex flex-wrap gap-2">
                  {FEATURE_OPTIONS.map((feat) => {
                    const isSelected = modalFeatures.includes(feat.id);
                    return (
                      <button
                        key={feat.id}
                        type="button"
                        onClick={() => toggleModalFeature(feat.id)}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                          isSelected
                            ? 'bg-[#2E68FB] text-white shadow-md shadow-blue-500/20'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {feat.label}
                        {isSelected && <Check className="w-3.5 h-3.5 ml-1" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Minimum Rating */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Minimum Rating
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {RATING_OPTIONS.map((r) => {
                    const isSelected = modalMinRating === r.value;
                    return (
                      <button
                        key={r.value}
                        type="button"
                        onClick={() => setModalMinRating(r.value)}
                        className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-sm font-semibold transition-all border ${
                          isSelected
                            ? 'bg-[#2E68FB] text-white border-[#2E68FB] shadow-md shadow-blue-500/20'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {r.value > 0 && <Star className="w-3.5 h-3.5 fill-current" />}
                        <span>{r.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Sort Order */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Sort By
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {SORT_OPTIONS.map((sort) => {
                    const isSelected = modalSortBy === sort.value;
                    return (
                      <button
                        key={sort.value}
                        type="button"
                        onClick={() => setModalSortBy(sort.value)}
                        className={`py-2 px-3 rounded-xl text-sm font-semibold transition-all border ${
                          isSelected
                            ? 'bg-[#2E68FB] text-white border-[#2E68FB] shadow-md shadow-blue-500/20'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {sort.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4. Tags / Bonus Deals */}
              {tags.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">
                    Bonus &amp; Deal Tags
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => {
                      const isSelected = modalTags.includes(tag.id);
                      return (
                        <button
                          key={tag.id}
                          type="button"
                          onClick={() => toggleModalTag(tag.id)}
                          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                            isSelected
                              ? 'bg-[#2E68FB] text-white shadow-md shadow-blue-500/20'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          {tag.name}
                          {isSelected && <Check className="w-3.5 h-3.5 ml-1" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 5. Categories */}
              {categories.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">
                    Casino Categories
                  </h4>
                  <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-1">
                    {categories.map((cat) => {
                      const isSelected = modalCategories.includes(cat.id);
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => toggleModalCategory(cat.id)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                            isSelected
                              ? 'bg-[#2E68FB] text-white'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          {cat.name}
                          {isSelected && <Check className="w-3 h-3 ml-1" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/50">
              <button
                type="button"
                onClick={handleResetFilters}
                className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Reset All
              </button>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleApplyFilters}
                  className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md shadow-blue-500/20 hover:brightness-105 active:scale-95 transition-all"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}