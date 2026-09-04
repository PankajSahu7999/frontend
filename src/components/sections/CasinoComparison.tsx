'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Check,
  ChevronDown,
  ChevronUp,
  Plus,
  Search,
  Star,
  X,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { useCasinos } from '@/hooks/useRedux';
import { getImageUrl } from '@/lib/utils/getImageUrl';

type CasinoFromStore = ReturnType<typeof useCasinos>['casinos'][number];

interface ComparisonCasino {
  id: string;
  name: string;
  slug?: string;
  logo?: string;
  featured_image?: string;
  rating?: string | number;
  short_description?: string;
  minimum_deposit?: string | number;
  withdrawal_time?: string;
  games_count?: string | number;
  established_year?: number;
  bonuses?: Array<{
    amount?: string | number;
    type?: string;
    free_spins?: string | number;
    max_bonus?: string | number;
  }>;
  website_url?: string;
  affiliate_url?: string;
  default_affiliate_url?: string;
  license?: string;
  languages?: string[];
  payment_methods?: string[];
  game_providers?: string[];
  mobile_app?: boolean;
  vip_program?: boolean;
  live_chat?: boolean;
  support?: string;
  max_withdrawal?: string;
  wagering_requirement?: string;
  crypto_support?: boolean;
}

const FALLBACK_LOGO = '/images/888.png';

export default function CasinoComparison() {
  const { casinos } = useCasinos();

  const [selectedCasinos, setSelectedCasinos] = useState<
    ComparisonCasino[]
  >([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    overview: true,
    bonuses: true,
    casino: true,
    banking: true,
    support: true,
    mobile: false,
  });

  const searchRef = useRef<HTMLDivElement>(null);

  const normalizedCasinos = useMemo<ComparisonCasino[]>(
    () => casinos as unknown as ComparisonCasino[],
    [casinos]
  );

  const filteredCasinos = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return normalizedCasinos.filter((casino) => {
      const matchesSearch = casino.name?.toLowerCase().includes(query);

      const notSelected = !selectedCasinos.some(
        (selected) => selected.id === casino.id
      );

      return matchesSearch && notSelected;
    });
  }, [normalizedCasinos, searchQuery, selectedCasinos]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const addCasino = (casino: ComparisonCasino) => {
    if (selectedCasinos.length >= 3) return;

    setSelectedCasinos((previous) => [...previous, casino]);

    setSearchQuery('');
    setShowDropdown(false);
  };

  const removeCasino = (casinoId: string) => {
    setSelectedCasinos((previous) =>
      previous.filter((casino) => casino.id !== casinoId)
    );
  };

  const clearAll = () => {
    setSelectedCasinos([]);
  };

  const toggleSection = (section: string) => {
    setExpandedSections((previous) => ({
      ...previous,
      [section]: !previous[section],
    }));
  };

  const getRating = (casino: ComparisonCasino) => {
    const rating = Number(casino.rating);

    return Number.isFinite(rating) ? rating : 0;
  };

  const getGames = (casino: ComparisonCasino) => {
    const value = Number(
      String(casino.games_count ?? '').replace(/[^\d.]/g, '')
    );

    return Number.isFinite(value) ? value : 0;
  };

  const getMinimumDeposit = (casino: ComparisonCasino) => {
    const value = Number(
      String(casino.minimum_deposit ?? '').replace(/[^\d.]/g, '')
    );

    return Number.isFinite(value) ? value : Number.MAX_SAFE_INTEGER;
  };

  const getBonus = (casino: ComparisonCasino) => {
    const bonus = casino.bonuses?.[0];

    return {
      amount: bonus?.amount || 'Not listed',
      type: bonus?.type || 'Welcome Bonus',
      freeSpins: bonus?.free_spins || 'Not listed',
      maxBonus: bonus?.max_bonus || 'Not listed',
    };
  };

  const getLogo = (casino: ComparisonCasino) => {
    return getImageUrl(
      casino.logo || casino.featured_image || FALLBACK_LOGO
    );
  };

  const getCasinoUrl = (casino: ComparisonCasino) => {
    return `/casino/${casino.slug || casino.id}`;
  };

  const getAffiliateUrl = (casino: ComparisonCasino) => {
    return (
      casino.affiliate_url ||
      casino.default_affiliate_url ||
      casino.website_url ||
      '#'
    );
  };

  const ratingWinner = useMemo(() => {
    if (selectedCasinos.length < 2) return -1;

    return selectedCasinos.reduce(
      (bestIndex, casino, index) =>
        getRating(casino) > getRating(selectedCasinos[bestIndex])
          ? index
          : bestIndex,
      0
    );
  }, [selectedCasinos]);

  const gamesWinner = useMemo(() => {
    if (selectedCasinos.length < 2) return -1;

    return selectedCasinos.reduce(
      (bestIndex, casino, index) =>
        getGames(casino) > getGames(selectedCasinos[bestIndex])
          ? index
          : bestIndex,
      0
    );
  }, [selectedCasinos]);

  const depositWinner = useMemo(() => {
    if (selectedCasinos.length < 2) return -1;

    return selectedCasinos.reduce(
      (bestIndex, casino, index) =>
        getMinimumDeposit(casino) <
          getMinimumDeposit(selectedCasinos[bestIndex])
          ? index
          : bestIndex,
      0
    );
  }, [selectedCasinos]);

  const renderStars = (rating: number) => {
    const roundedRating = Math.round(rating);

    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={12}
            strokeWidth={1.7}
            className={
              star <= roundedRating
                ? 'text-[#FFB000]'
                : 'text-gray-300'
            }
            fill={star <= roundedRating ? 'currentColor' : 'none'}
          />
        ))}
      </div>
    );
  };

  const WinnerBadge = () => (
    <span className="inline-flex items-center rounded-full bg-[#FFF4B8] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#8A6500]">
      Best
    </span>
  );

  const ValueCell = ({
    children,
    winner = false,
    muted = false,
  }: {
    children: React.ReactNode;
    winner?: boolean;
    muted?: boolean;
  }) => (
    <div
      className={[
        'flex min-h-[48px] items-center border-l border-gray-100 px-4 py-3 text-[13px] leading-5',
        winner ? 'bg-[#FFFBEA]' : 'bg-white',
        muted ? 'text-gray-400' : 'text-gray-700',
      ].join(' ')}
    >
      <div className="flex w-full items-center justify-between gap-3">
        <span>{children}</span>

        {winner && selectedCasinos.length > 1 ? <WinnerBadge /> : null}
      </div>
    </div>
  );

  const ComparisonRow = ({
    label,
    children,
  }: {
    label: string;
    children: React.ReactNode;
  }) => (
    <div className="grid min-w-[810px] grid-cols-[190px_repeat(3,minmax(205px,1fr))] border-t border-gray-100">
      <div className="sticky left-0 z-10 flex min-h-[48px] items-center border-r border-gray-100 bg-white px-4 py-3 text-[12px] font-medium text-gray-500">
        {label}
      </div>

      {children}
    </div>
  );

  const SectionHeader = ({
    id,
    title,
    description,
  }: {
    id: string;
    title: string;
    description?: string;
  }) => {
    const open = expandedSections[id];

    return (
      <button
        type="button"
        onClick={() => toggleSection(id)}
        className="flex w-full items-center justify-between gap-4 border-t border-gray-200 bg-[#F8FAFD] px-4 py-3.5 text-left transition hover:bg-[#F3F6FB]"
      >
        <div>
          <h3 className="text-[13px] font-bold text-[#111827]">
            {title}
          </h3>

          {description ? (
            <p className="mt-0.5 text-[11px] text-gray-400">
              {description}
            </p>
          ) : null}
        </div>

        {open ? (
          <ChevronUp size={17} className="shrink-0 text-gray-500" />
        ) : (
          <ChevronDown size={17} className="shrink-0 text-gray-500" />
        )}
      </button>
    );
  };

  return (
    <main className="min-h-screen ">
      <div className="">
        {/* Page heading */}
        <div className="mb-7">
          <div className="mb-2 inline-flex items-center rounded-full border border-[#DCE7FC] bg-[#EEF3FE] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#2E68FB]">
            Casino Comparison
          </div>

          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <h1 className="text-2xl font-bold tracking-tight text-[#111827] sm:text-3xl lg:text-[34px]">
                Compare the best online casinos
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                Compare bonuses, ratings, games, banking options,
                withdrawals and support side by side before choosing
                your casino.
              </p>
            </div>


          </div>
        </div>

        {/* Search / Add */}
        <div
          ref={searchRef}
          className="relative mb-7"
        >
          <div className="  p-3  border
                  border-[#2E68FB40]
                  rounded-[32px] sm:p-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              <div className="flex items-center gap-3 md:min-w-[220px]">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EEF3FE]">
                  <Plus size={18} className="text-[#2E68FB]" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Add a casino
                  </p>
                  <p className="text-[11px] text-gray-400">
                    Choose up to three
                  </p>
                </div>
              </div>

            
              <div
                className="
    relative flex-1
    h-12
    overflow-hidden
    rounded-[32px]
    border border-[#2E68FB40]
    bg-[#46108E0D]
    transition-all duration-200
    focus-within:border-[#2E68FB80]
    focus-within:bg-white
    focus-within:shadow-[0_0_0_3px_#2E68FB12]
  "
              >
                <Search
                  size={17}
                  strokeWidth={2}
                  className="
      pointer-events-none
      absolute
      left-4
      top-1/2
      -translate-y-1/2
      text-[#6B7280]
      transition-colors
      duration-200
      peer-focus:text-[#2E68FB]
    "
                />

                <input
                  type="text"
                  value={searchQuery}
                  disabled={selectedCasinos.length >= 3}
                  onFocus={() => {
                    if (selectedCasinos.length < 3) {
                      setShowDropdown(true);
                    }
                  }}
                  onChange={(event) => {
                    setSearchQuery(event.target.value);
                    setShowDropdown(true);
                  }}
                  placeholder={
                    selectedCasinos.length >= 3
                      ? 'Maximum of 3 casinos selected'
                      : 'Search casino by name...'
                  }
                  className="
      peer
      h-full
      w-full
      border-0
      bg-transparent
      pl-11
      pr-4
      text-sm
      font-medium
      text-[#111827]
      outline-none
      ring-0
      placeholder:text-[#9CA3AF]
      focus:border-0
      focus:outline-none
      focus:ring-0
      disabled:cursor-not-allowed
      disabled:text-gray-400
    "
                />
              </div>
              ```


              <div className="hidden text-right md:block">
                <p className="text-[10px] uppercase tracking-wide text-gray-400">
                  Comparison slots
                </p>

                <div className="mt-1 flex justify-end gap-1.5">
                  {[0, 1, 2].map((slot) => (
                    <span
                      key={slot}
                      className={`h-1.5 w-8 rounded-full ${slot < selectedCasinos.length
                          ? 'bg-[#588CF3]'
                          : 'bg-gray-200'
                        }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Search results */}
          {showDropdown &&
            searchQuery.trim() &&
            selectedCasinos.length < 3 ? (
            <div className="absolute left-0 right-0 top-[82px] z-50 max-h-[360px] overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-2xl">
              {filteredCasinos.length > 0 ? (
                filteredCasinos.map((casino) => (
                  <button
                    key={casino.id}
                    type="button"
                    onClick={() => addCasino(casino)}
                    className="flex w-full items-center gap-3 border-b border-gray-100 px-4 py-3 text-left transition last:border-b-0 hover:bg-[#F7F9FC]"
                  >
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-white p-1">
                      <Image
                        src={getLogo(casino)}
                        alt={casino.name}
                        fill
                        sizes="40px"
                        className="object-contain p-1"
                        unoptimized
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-gray-900">
                        {casino.name}
                      </p>

                      <div className="mt-1 flex items-center gap-2">
                        {renderStars(getRating(casino))}
                        <span className="text-[11px] text-gray-500">
                          {getRating(casino)
                            ? `${getRating(casino).toFixed(1)}/5`
                            : 'Not rated'}
                        </span>
                      </div>
                    </div>

                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#EEF3FE] text-[#2E68FB]">
                      <Plus size={16} />
                    </span>
                  </button>
                ))
              ) : (
                <div className="px-5 py-10 text-center">
                  <p className="text-sm font-semibold text-gray-700">
                    No casinos found
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    Try searching with another casino name.
                  </p>
                </div>
              )}
            </div>
          ) : null}
        </div>

        {/* Empty state */}
        {selectedCasinos.length === 0 ? (
          <div className="overflow-hidden rounded-2xl border  border
                  border-[#2E68FB40]
                  bg-[#46108E0D] ">
            <div className="relative overflow-hidden px-6 py-14 text-center sm:px-10 sm:py-20">
              <div className="absolute left-1/2 top-0 h-40 w-80 -translate-x-1/2 rounded-full bg-[#EEF3FE] blur-3xl" />

              <div className="relative">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EEF3FE]">
                  <Search size={24} className="text-[#588CF3]" />
                </div>

                <h2 className="mt-5 text-xl font-bold text-gray-900">
                  Start your comparison
                </h2>

                <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-gray-500">
                  Select two or three casinos above to compare their
                  bonuses, ratings, games, payment methods and overall
                  features in one view.
                </p>

                <Link
                  href="/casinos/online-casino"
                  className="mt-6 inline-flex items-center rounded-lg bg-[#588CF3] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#477DE8]"
                >
                  Browse all casinos
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl  ">
            {/* Selected casino header */}
            <div className="overflow-x-auto">
              <div className="min-w-[810px]">
                <div className="grid grid-cols-[190px_repeat(3,minmax(205px,1fr))] border-b border-gray-200">
                  <div className="sticky left-0 z-20 flex flex-col justify-center border-r border-gray-200 bg-[#111827] px-4 py-5">
                    <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#9CA3AF]">
                      Compare
                    </span>

                    <span className="mt-1 text-sm font-semibold text-white">
                      Casino overview
                    </span>
                  </div>

                  {selectedCasinos.map((casino, index) => {
                    const rating = getRating(casino);
                    const bonus = getBonus(casino);

                    return (
                      <div
                        key={casino.id}
                        className={`relative border-l border-gray-200 px-4 py-5 ${index === ratingWinner
                            ? 'bg-[#FFFDF2]'
                            : 'bg-white'
                          }`}
                      >
                        {index === ratingWinner &&
                          selectedCasinos.length > 1 ? (
                          <div className="absolute left-3 top-3 rounded-full bg-[#FFE11F] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-[#6B5200]">
                            Top Rated
                          </div>
                        ) : null}

                        <button
                          type="button"
                          onClick={() => removeCasino(casino.id)}
                          aria-label={`Remove ${casino.name}`}
                          className="absolute right-3 top-3 rounded-md p-1 text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                        >
                          <X size={15} />
                        </button>

                        <div className="mt-4 flex items-center gap-3">
                          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-white p-1 shadow-sm">
                            <Image
                              src={getLogo(casino)}
                              alt={casino.name}
                              fill
                              sizes="56px"
                              className="object-contain p-1"
                              unoptimized
                            />
                          </div>

                          <div className="min-w-0">
                            <h2 className="truncate pr-4 text-sm font-bold text-gray-900">
                              {casino.name}
                            </h2>

                            <div className="mt-1.5 flex items-center gap-2">
                              {renderStars(rating)}

                              <span className="text-xs font-bold text-gray-800">
                                {rating ? rating.toFixed(1) : 'N/A'}
                              </span>
                            </div>

                            <p className="mt-1 text-[10px] text-gray-400">
                              Expert rating
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-2">
                          <div className="rounded-lg bg-[#F7F9FC] px-2.5 py-2">
                            <p className="text-[9px] uppercase tracking-wide text-gray-400">
                              Bonus
                            </p>
                            <p className="mt-0.5 truncate text-xs font-semibold text-gray-900">
                              {bonus.amount}
                            </p>
                          </div>

                          <div className="rounded-lg bg-[#F7F9FC] px-2.5 py-2">
                            <p className="text-[9px] uppercase tracking-wide text-gray-400">
                              Games
                            </p>
                            <p className="mt-0.5 text-xs font-semibold text-gray-900">
                              {casino.games_count || 'N/A'}
                            </p>
                          </div>
                        </div>

                        <div className="mt-3 grid grid-cols-2 gap-2">
                          <Link
                            href={getCasinoUrl(casino)}
                            className="rounded-md border border-gray-200 bg-white px-2 py-2 text-center text-[11px] font-semibold text-gray-700 transition hover:border-[#588CF3] hover:text-[#588CF3]"
                          >
                            Review
                          </Link>

                          <a
                            href={getAffiliateUrl(casino)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-md bg-[#588CF3] px-2 py-2 text-center text-[11px] font-semibold text-white transition hover:bg-[#477DE8]"
                          >
                            Play Now
                          </a>
                        </div>
                      </div>
                    );
                  })}

                  {Array.from({
                    length: 3 - selectedCasinos.length,
                  }).map((_, index) => (
                    <div
                      key={`empty-${index}`}
                      className="border-l border-dashed border-gray-200 bg-[#FAFBFD] px-4 py-5"
                    >
                      <div className="flex h-full min-h-[190px] flex-col items-center justify-center text-center">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-gray-200">
                          <Plus size={18} className="text-[#588CF3]" />
                        </div>

                        <p className="mt-3 text-xs font-semibold text-gray-600">
                          Add casino
                        </p>

                        <p className="mt-1 text-[10px] text-gray-400">
                          Compare another option
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* At a glance */}
                <SectionHeader
                  id="overview"
                  title="At a Glance"
                  description="The key differences you should check first"
                />

                {expandedSections.overview ? (
                  <>
                  

                    <ComparisonRow label="Welcome Bonus">
                      {selectedCasinos.map((casino) => (
                        <ValueCell key={casino.id}>
                          <strong>{getBonus(casino).amount}</strong>
                        </ValueCell>
                      ))}

                      {Array.from({
                        length: 3 - selectedCasinos.length,
                      }).map((_, index) => (
                        <ValueCell key={`bonus-empty-${index}`} muted>
                          —
                        </ValueCell>
                      ))}
                    </ComparisonRow>

                    <ComparisonRow label="Games">
                      {selectedCasinos.map((casino, index) => (
                        <ValueCell
                          key={casino.id}
                          winner={index === gamesWinner}
                        >
                          <strong>
                            {casino.games_count || 'Not listed'}
                          </strong>
                        </ValueCell>
                      ))}

                      {Array.from({
                        length: 3 - selectedCasinos.length,
                      }).map((_, index) => (
                        <ValueCell key={`games-empty-${index}`} muted>
                          —
                        </ValueCell>
                      ))}
                    </ComparisonRow>

                    <ComparisonRow label="Minimum Deposit">
                      {selectedCasinos.map((casino, index) => (
                        <ValueCell
                          key={casino.id}
                          winner={index === depositWinner}
                        >
                          <strong>
                            {casino.minimum_deposit
                              ? `£${casino.minimum_deposit}`
                              : 'Not listed'}
                          </strong>
                        </ValueCell>
                      ))}

                      {Array.from({
                        length: 3 - selectedCasinos.length,
                      }).map((_, index) => (
                        <ValueCell key={`deposit-empty-${index}`} muted>
                          —
                        </ValueCell>
                      ))}
                    </ComparisonRow>

                    <ComparisonRow label="Withdrawal Time">
                      {selectedCasinos.map((casino) => (
                        <ValueCell key={casino.id}>
                          {casino.withdrawal_time || 'Not listed'}
                        </ValueCell>
                      ))}

                      {Array.from({
                        length: 3 - selectedCasinos.length,
                      }).map((_, index) => (
                        <ValueCell key={`withdraw-empty-${index}`} muted>
                          —
                        </ValueCell>
                      ))}
                    </ComparisonRow>
                  </>
                ) : null}

                {/* Bonuses */}
                <SectionHeader
                  id="bonuses"
                  title="Bonuses & Promotions"
                  description="Compare the main promotional terms"
                />

                {expandedSections.bonuses ? (
                  <>
                    <ComparisonRow label="Bonus Type">
                      {selectedCasinos.map((casino) => (
                        <ValueCell key={casino.id}>
                          {getBonus(casino).type}
                        </ValueCell>
                      ))}

                      {Array.from({
                        length: 3 - selectedCasinos.length,
                      }).map((_, index) => (
                        <ValueCell key={`type-empty-${index}`} muted>
                          —
                        </ValueCell>
                      ))}
                    </ComparisonRow>

                    <ComparisonRow label="Free Spins">
                      {selectedCasinos.map((casino) => (
                        <ValueCell key={casino.id}>
                          {getBonus(casino).freeSpins}
                        </ValueCell>
                      ))}

                      {Array.from({
                        length: 3 - selectedCasinos.length,
                      }).map((_, index) => (
                        <ValueCell key={`spins-empty-${index}`} muted>
                          —
                        </ValueCell>
                      ))}
                    </ComparisonRow>

                    <ComparisonRow label="Wagering Requirement">
                      {selectedCasinos.map((casino) => (
                        <ValueCell key={casino.id}>
                          {casino.wagering_requirement || 'Not listed'}
                        </ValueCell>
                      ))}

                      {Array.from({
                        length: 3 - selectedCasinos.length,
                      }).map((_, index) => (
                        <ValueCell key={`wager-empty-${index}`} muted>
                          —
                        </ValueCell>
                      ))}
                    </ComparisonRow>

                    <ComparisonRow label="Maximum Bonus">
                      {selectedCasinos.map((casino) => (
                        <ValueCell key={casino.id}>
                          {getBonus(casino).maxBonus}
                        </ValueCell>
                      ))}

                      {Array.from({
                        length: 3 - selectedCasinos.length,
                      }).map((_, index) => (
                        <ValueCell key={`max-empty-${index}`} muted>
                          —
                        </ValueCell>
                      ))}
                    </ComparisonRow>
                  </>
                ) : null}

                {/* Casino details */}
                <SectionHeader
                  id="casino"
                  title="Casino Details"
                  description="Licensing, games and core casino information"
                />

                {expandedSections.casino ? (
                  <>
                    <ComparisonRow label="Established">
                      {selectedCasinos.map((casino) => (
                        <ValueCell key={casino.id}>
                          {casino.established_year || 'Not listed'}
                        </ValueCell>
                      ))}

                      {Array.from({
                        length: 3 - selectedCasinos.length,
                      }).map((_, index) => (
                        <ValueCell key={`year-empty-${index}`} muted>
                          —
                        </ValueCell>
                      ))}
                    </ComparisonRow>

                    <ComparisonRow label="Licence">
                      {selectedCasinos.map((casino) => (
                        <ValueCell key={casino.id}>
                          {casino.license || 'Not listed'}
                        </ValueCell>
                      ))}

                      {Array.from({
                        length: 3 - selectedCasinos.length,
                      }).map((_, index) => (
                        <ValueCell key={`license-empty-${index}`} muted>
                          —
                        </ValueCell>
                      ))}
                    </ComparisonRow>

                    <ComparisonRow label="Languages">
                      {selectedCasinos.map((casino) => (
                        <ValueCell key={casino.id}>
                          {casino.languages?.length
                            ? casino.languages.join(', ')
                            : 'Not listed'}
                        </ValueCell>
                      ))}

                      {Array.from({
                        length: 3 - selectedCasinos.length,
                      }).map((_, index) => (
                        <ValueCell key={`language-empty-${index}`} muted>
                          —
                        </ValueCell>
                      ))}
                    </ComparisonRow>

                    <ComparisonRow label="Game Providers">
                      {selectedCasinos.map((casino) => (
                        <ValueCell key={casino.id}>
                          {casino.game_providers?.length
                            ? casino.game_providers.join(', ')
                            : 'Not listed'}
                        </ValueCell>
                      ))}

                      {Array.from({
                        length: 3 - selectedCasinos.length,
                      }).map((_, index) => (
                        <ValueCell key={`provider-empty-${index}`} muted>
                          —
                        </ValueCell>
                      ))}
                    </ComparisonRow>
                  </>
                ) : null}

                {/* Banking */}
                <SectionHeader
                  id="banking"
                  title="Banking & Withdrawals"
                  description="Deposits, withdrawals and payment options"
                />

                {expandedSections.banking ? (
                  <>
                    <ComparisonRow label="Minimum Deposit">
                      {selectedCasinos.map((casino, index) => (
                        <ValueCell
                          key={casino.id}
                          winner={index === depositWinner}
                        >
                          {casino.minimum_deposit
                            ? `£${casino.minimum_deposit}`
                            : 'Not listed'}
                        </ValueCell>
                      ))}

                      {Array.from({
                        length: 3 - selectedCasinos.length,
                      }).map((_, index) => (
                        <ValueCell key={`bank-deposit-${index}`} muted>
                          —
                        </ValueCell>
                      ))}
                    </ComparisonRow>

                    <ComparisonRow label="Withdrawal Time">
                      {selectedCasinos.map((casino) => (
                        <ValueCell key={casino.id}>
                          {casino.withdrawal_time || 'Not listed'}
                        </ValueCell>
                      ))}

                      {Array.from({
                        length: 3 - selectedCasinos.length,
                      }).map((_, index) => (
                        <ValueCell key={`bank-time-${index}`} muted>
                          —
                        </ValueCell>
                      ))}
                    </ComparisonRow>

                    <ComparisonRow label="Payment Methods">
                      {selectedCasinos.map((casino) => (
                        <ValueCell key={casino.id}>
                          {casino.payment_methods?.length
                            ? casino.payment_methods.join(', ')
                            : 'Not listed'}
                        </ValueCell>
                      ))}

                      {Array.from({
                        length: 3 - selectedCasinos.length,
                      }).map((_, index) => (
                        <ValueCell key={`payment-empty-${index}`} muted>
                          —
                        </ValueCell>
                      ))}
                    </ComparisonRow>

                    <ComparisonRow label="Crypto Support">
                      {selectedCasinos.map((casino) => (
                        <ValueCell key={casino.id}>
                          {casino.crypto_support ? (
                            <span className="inline-flex items-center gap-1.5 font-medium text-green-600">
                              <Check size={14} />
                              Supported
                            </span>
                          ) : (
                            <span className="text-gray-400">
                              Not listed
                            </span>
                          )}
                        </ValueCell>
                      ))}

                      {Array.from({
                        length: 3 - selectedCasinos.length,
                      }).map((_, index) => (
                        <ValueCell key={`crypto-empty-${index}`} muted>
                          —
                        </ValueCell>
                      ))}
                    </ComparisonRow>

                    <ComparisonRow label="Maximum Withdrawal">
                      {selectedCasinos.map((casino) => (
                        <ValueCell key={casino.id}>
                          {casino.max_withdrawal || 'Not listed'}
                        </ValueCell>
                      ))}

                      {Array.from({
                        length: 3 - selectedCasinos.length,
                      }).map((_, index) => (
                        <ValueCell key={`max-withdraw-${index}`} muted>
                          —
                        </ValueCell>
                      ))}
                    </ComparisonRow>
                  </>
                ) : null}

                {/* Support */}
                <SectionHeader
                  id="support"
                  title="Customer Support"
                  description="Available support channels and availability"
                />

                {expandedSections.support ? (
                  <>
                    <ComparisonRow label="Live Chat">
                      {selectedCasinos.map((casino) => (
                        <ValueCell key={casino.id}>
                          {casino.live_chat ? (
                            <span className="inline-flex items-center gap-1.5 font-medium text-green-600">
                              <Check size={14} />
                              Available
                            </span>
                          ) : (
                            <span className="text-gray-400">
                              Not listed
                            </span>
                          )}
                        </ValueCell>
                      ))}

                      {Array.from({
                        length: 3 - selectedCasinos.length,
                      }).map((_, index) => (
                        <ValueCell key={`chat-empty-${index}`} muted>
                          —
                        </ValueCell>
                      ))}
                    </ComparisonRow>

                    <ComparisonRow label="Support">
                      {selectedCasinos.map((casino) => (
                        <ValueCell key={casino.id}>
                          {casino.support || 'Not listed'}
                        </ValueCell>
                      ))}

                      {Array.from({
                        length: 3 - selectedCasinos.length,
                      }).map((_, index) => (
                        <ValueCell key={`support-empty-${index}`} muted>
                          —
                        </ValueCell>
                      ))}
                    </ComparisonRow>

                    <ComparisonRow label="24/7 Support">
                      {selectedCasinos.map((casino) => (
                        <ValueCell key={casino.id}>
                          <span className="inline-flex items-center gap-1.5 font-medium text-green-600">
                            <Check size={14} />
                            Available
                          </span>
                        </ValueCell>
                      ))}

                      {Array.from({
                        length: 3 - selectedCasinos.length,
                      }).map((_, index) => (
                        <ValueCell key={`247-empty-${index}`} muted>
                          —
                        </ValueCell>
                      ))}
                    </ComparisonRow>
                  </>
                ) : null}

                {/* Mobile */}
                <SectionHeader
                  id="mobile"
                  title="Mobile Experience"
                  description="Mobile app and responsive casino experience"
                />

                {expandedSections.mobile ? (
                  <>
                    <ComparisonRow label="Mobile App">
                      {selectedCasinos.map((casino) => (
                        <ValueCell key={casino.id}>
                          {casino.mobile_app ? (
                            <span className="inline-flex items-center gap-1.5 font-medium text-green-600">
                              <Check size={14} />
                              Available
                            </span>
                          ) : (
                            <span className="text-gray-400">
                              Not listed
                            </span>
                          )}
                        </ValueCell>
                      ))}

                      {Array.from({
                        length: 3 - selectedCasinos.length,
                      }).map((_, index) => (
                        <ValueCell key={`app-empty-${index}`} muted>
                          —
                        </ValueCell>
                      ))}
                    </ComparisonRow>

                    <ComparisonRow label="Mobile Website">
                      {selectedCasinos.map((casino) => (
                        <ValueCell key={casino.id}>
                          <span className="inline-flex items-center gap-1.5 font-medium text-green-600">
                            <Check size={14} />
                            Optimised
                          </span>
                        </ValueCell>
                      ))}

                      {Array.from({
                        length: 3 - selectedCasinos.length,
                      }).map((_, index) => (
                        <ValueCell key={`mobile-empty-${index}`} muted>
                          —
                        </ValueCell>
                      ))}
                    </ComparisonRow>
                  </>
                ) : null}

                {/* Bottom actions */}
                <div className="grid grid-cols-[190px_repeat(3,minmax(205px,1fr))] border-t border-gray-200 bg-[#F8FAFD]">
                  <div className="sticky left-0 z-10 flex items-center bg-[#F8FAFD] px-4 py-5">
                    <div>
                      <p className="text-xs font-bold text-gray-800">
                        Ready to choose?
                      </p>
                      <p className="mt-0.5 text-[10px] text-gray-400">
                        Visit the casino or read our review.
                      </p>
                    </div>
                  </div>

                  {selectedCasinos.map((casino) => (
                    <div
                      key={casino.id}
                      className="border-l border-gray-200 p-4"
                    >
                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          href={getCasinoUrl(casino)}
                          className="rounded-md border border-gray-200 bg-white px-2 py-2.5 text-center text-[11px] font-semibold text-gray-700 transition hover:border-[#588CF3] hover:text-[#588CF3]"
                        >
                          Full Review
                        </Link>

                        <a
                          href={getAffiliateUrl(casino)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-md bg-[#FFE11F] px-2 py-2.5 text-center text-[11px] font-bold text-[#111827] transition hover:bg-[#FFD900]"
                        >
                          Play Now
                        </a>
                      </div>
                    </div>
                  ))}

                  {Array.from({
                    length: 3 - selectedCasinos.length,
                  }).map((_, index) => (
                    <div
                      key={`action-empty-${index}`}
                      className="border-l border-gray-200"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile scroll notice */}
            <div className="border-t border-gray-100 bg-[#FAFBFD] px-4 py-2.5 text-center text-[10px] font-medium text-gray-400 sm:hidden">
              Swipe horizontally to compare all casinos
            </div>
          </div>
        )}

        {/* Bottom note */}
        {selectedCasinos.length > 0 ? (
          <div className="mt-4 flex flex-col gap-2 text-[11px] leading-5 text-gray-400 sm:flex-row sm:items-center sm:justify-between">
            <p>
              Comparison information is based on the latest available
              casino data.
            </p>

            <Link
              href="/casinos/online-casino"
              className="font-semibold text-[#588CF3] hover:underline"
            >
              View all casinos
            </Link>
          </div>
        ) : null}
      </div>
    </main>
  );
}