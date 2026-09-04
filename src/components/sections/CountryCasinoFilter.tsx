'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  Search,
  Globe,
  ChevronDown,
  X,
  Check,
  ShieldCheck,
} from 'lucide-react';
import { ALL_WORLD_COUNTRIES, getCountryEmoji, CountryItem } from '@/utils/countryData';

export interface CountryOption {
  id?: string;
  name: string;
  code?: string;
}

const POPULAR_COUNTRIES: CountryItem[] = [
  { name: 'All Countries', code: 'ALL' },
  { name: 'United States', code: 'US' },
  { name: 'United Kingdom', code: 'GB' },
  { name: 'Canada', code: 'CA' },
  { name: 'Australia', code: 'AU' },
  { name: 'Germany', code: 'DE' },
  { name: 'India', code: 'IN' },
  { name: 'Sweden', code: 'SE' },
  { name: 'Brazil', code: 'BR' },
  { name: 'Japan', code: 'JP' },
  { name: 'Norway', code: 'NO' },
  { name: 'Finland', code: 'FI' },
  { name: 'New Zealand', code: 'NZ' },
];

interface CountryCasinoFilterProps {
  countries?: CountryOption[];
  selectedCountry: string; // 'ALL' or country name/code
  onSelectCountry: (country: string) => void;
  filteredCount: number;
  totalCount: number;
}

export default function CountryCasinoFilter({
  countries = [],
  selectedCountry,
  onSelectCountry,
  filteredCount,
  totalCount,
}: CountryCasinoFilterProps) {
  const [searchInput, setSearchInput] = useState(
    selectedCountry === 'ALL' ? '' : selectedCountry
  );
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Sync search input when selectedCountry changes externally (e.g. from pills or dropdown)
  useEffect(() => {
    if (selectedCountry === 'ALL') {
      setSearchInput('');
    } else {
      setSearchInput(selectedCountry);
    }
  }, [selectedCountry]);

  // Merge database countries with master world countries list without duplicates
  const allCountriesList = useMemo(() => {
    const map = new Map<string, CountryItem>();

    // Start with all standard world countries
    ALL_WORLD_COUNTRIES.forEach((c) => {
      map.set(c.name.toLowerCase(), c);
    });

    // Add / overlay any custom countries from DB
    countries.forEach((c) => {
      if (c.name) {
        map.set(c.name.toLowerCase(), {
          id: c.id,
          name: c.name,
          code: c.code || '',
        });
      }
    });

    return Array.from(map.values()).sort((a, b) => {
      if (a.code === 'ALL') return -1;
      if (b.code === 'ALL') return 1;
      return a.name.localeCompare(b.name);
    });
  }, [countries]);

  // Autocomplete suggestions based on searchInput
  const searchSuggestions = useMemo(() => {
    if (!searchInput.trim()) {
      return allCountriesList.slice(0, 15);
    }
    const q = searchInput.toLowerCase().trim();
    return allCountriesList.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        (c.code && c.code.toLowerCase().includes(q))
    ).slice(0, 15);
  }, [allCountriesList, searchInput]);

  // Click outside listener for search suggestions
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchInput(val);
    setShowSuggestions(true);

    if (!val.trim()) {
      onSelectCountry('ALL');
    } else {
      onSelectCountry(val.trim());
    }
  };

  const handleSelectCountryItem = (item: CountryItem) => {
    if (item.code === 'ALL') {
      setSearchInput('');
      onSelectCountry('ALL');
    } else {
      setSearchInput(item.name);
      onSelectCountry(item.name);
    }
    setShowSuggestions(false);
  };

  const handleDropdownSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === 'ALL' || !val) {
      setSearchInput('');
      onSelectCountry('ALL');
    } else {
      setSearchInput(val);
      onSelectCountry(val);
    }
  };

  const activeCountryCode = useMemo(() => {
    if (selectedCountry === 'ALL' || !selectedCountry) return 'ALL';
    const found = allCountriesList.find(
      (c) =>
        c.name.toLowerCase() === selectedCountry.toLowerCase() ||
        c.code.toLowerCase() === selectedCountry.toLowerCase()
    );
    return found ? found.code : '';
  }, [allCountriesList, selectedCountry]);

  return (
    <div className="w-full mb-4">
      {/* Compact Header & Result Bar */}
      <div className="mb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-white text-[11px] font-semibold border border-[#F59E0B4D] bg-[linear-gradient(90deg,_#F59E0B_0%,_#D97706_100%)] mb-1.5">
            <Globe size={12} />
            <span>Geo-Targeted Casino Finder</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            Best Online Casinos by Country:{' '}
            <span className="text-transparent bg-clip-text bg-[linear-gradient(90deg,_#F59E0B_0%,_#D97706_100%)]">
              Verified Legal & Licensed
            </span>
          </h1>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-1.5 text-xs text-gray-600 bg-white border border-gray-200/80 px-3 py-1.5 rounded-xl shadow-2xs shrink-0 self-start sm:self-auto">
          <ShieldCheck size={15} className="text-emerald-500 shrink-0" />
          <span>
            Showing <strong className="text-gray-900 font-bold">{filteredCount}</strong> of{' '}
            <strong className="text-gray-900 font-bold">{totalCount}</strong> casinos for{' '}
            <strong className="text-amber-700 font-bold">
              {selectedCountry !== 'ALL' && selectedCountry
                ? `${getCountryEmoji(activeCountryCode)} ${selectedCountry}`
                : '🌍 Global'}
            </strong>
          </span>
        </div>
      </div>

      {/* COMPACT SEARCH & DROPDOWN ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2.5">
        {/* 1. Real-time Search Input with Autocomplete */}
        <div className="relative" ref={searchContainerRef}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
            <input
              type="text"
              placeholder="Search by country name (e.g. United Kingdom, India)..."
              value={searchInput}
              onFocus={() => setShowSuggestions(true)}
              onChange={handleSearchChange}
              className="w-full pl-9 pr-8 py-2.5 bg-white border border-gray-200/90 rounded-xl text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-medium shadow-2xs"
            />
            {searchInput && (
              <button
                type="button"
                onClick={() => {
                  setSearchInput('');
                  onSelectCountry('ALL');
                  setShowSuggestions(false);
                }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* Autocomplete Popup */}
          {showSuggestions && (
            <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-60 overflow-y-auto p-1.5">
              <button
                type="button"
                onClick={() => handleSelectCountryItem({ name: 'All Countries', code: 'ALL' })}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold transition-colors ${
                  selectedCountry === 'ALL'
                    ? 'bg-amber-50 text-amber-900 border border-amber-200'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>🌍</span>
                  <span>All Countries (Show All Casinos)</span>
                </span>
                {selectedCountry === 'ALL' && <Check size={13} className="text-amber-600" />}
              </button>

              <div className="my-1 border-t border-gray-100" />

              {searchSuggestions.length === 0 ? (
                <div className="p-3 text-center text-xs text-gray-400 font-medium">
                  No matching countries found
                </div>
              ) : (
                searchSuggestions
                  .filter((c) => c.code !== 'ALL')
                  .map((c) => {
                    const isSelected =
                      selectedCountry.toLowerCase() === c.name.toLowerCase() ||
                      selectedCountry.toLowerCase() === c.code.toLowerCase();

                    return (
                      <button
                        key={c.code || c.name}
                        type="button"
                        onClick={() => handleSelectCountryItem(c)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                          isSelected
                            ? 'bg-amber-50 text-amber-900 font-bold border border-amber-200'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-base leading-none">{getCountryEmoji(c.code)}</span>
                          <span className="font-semibold text-gray-800">{c.name}</span>
                          {c.code && (
                            <span className="text-[10px] uppercase font-mono px-1 py-0.2 rounded bg-gray-100 text-gray-500">
                              {c.code}
                            </span>
                          )}
                        </span>
                        {isSelected && <Check size={13} className="text-amber-600" />}
                      </button>
                    );
                  })
              )}
            </div>
          )}
        </div>

        {/* 2. Direct Country Dropdown Selector */}
        <div className="relative">
          <select
            value={selectedCountry === 'ALL' ? '' : selectedCountry}
            onChange={handleDropdownSelect}
            className="w-full appearance-none pl-4 pr-10 py-2.5 bg-white border border-gray-200/90 hover:border-amber-400 focus:border-amber-500 rounded-xl text-xs sm:text-sm font-semibold text-gray-900 shadow-2xs focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all cursor-pointer"
          >
            <option value="">🌍 All Countries ({allCountriesList.length - 1} Available)</option>
            {allCountriesList
              .filter((c) => c.code !== 'ALL')
              .map((country) => (
                <option key={country.code || country.name} value={country.name}>
                  {getCountryEmoji(country.code)} {country.name} {country.code ? `(${country.code})` : ''}
                </option>
              ))}
          </select>
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            <ChevronDown size={16} />
          </div>
        </div>
      </div>

      {/* COMPACT QUICK-SELECT POPULAR COUNTRY PILLS */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mr-1 shrink-0">
          Popular:
        </span>
        {POPULAR_COUNTRIES.map((pop) => {
          const isSelected =
            (pop.code === 'ALL' && (selectedCountry === 'ALL' || !selectedCountry)) ||
            selectedCountry.toLowerCase() === pop.name.toLowerCase() ||
            selectedCountry.toLowerCase() === pop.code.toLowerCase();

          return (
            <button
              key={pop.code}
              type="button"
              onClick={() => handleSelectCountryItem(pop)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all duration-150 border flex items-center gap-1 shrink-0 ${
                isSelected
                  ? 'bg-[linear-gradient(90deg,_#F59E0B_0%,_#D97706_100%)] text-white border-[#F59E0B] shadow-2xs scale-102 font-bold'
                  : 'bg-white text-gray-700 border-gray-200/90 hover:bg-gray-50 hover:border-gray-300'
              }`}
            >
              <span>{pop.code === 'ALL' ? '🌍' : getCountryEmoji(pop.code)}</span>
              <span>{pop.name}</span>
            </button>
          );
        })}
        {selectedCountry !== 'ALL' && selectedCountry && (
          <button
            type="button"
            onClick={() => handleSelectCountryItem({ name: 'All Countries', code: 'ALL' })}
            className="text-[11px] font-bold text-amber-600 hover:text-amber-700 underline ml-1 shrink-0"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
