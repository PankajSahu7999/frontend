'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Zap,
  ShieldCheck,
  Award,
  Smartphone,
  Search,
  SlidersHorizontal,
  TrendingUp,
  X,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { getImageUrl } from '@/lib/utils/getImageUrl';

interface CasinoBonus {
  id: string;
  title: string;
  amount: string;
  type: string;
}

interface Casino {
  id: string;
  name: string;
  slug: string;
  logo: string | null;
  featured_image: string | null;
  rating: string | null;
  short_description: string | null;
  website_url: string | null;
  established_year: number | null;
  minimum_deposit: string | null;
  withdrawal_time: string | null;
  mobile_friendly: boolean | null;
  crypto_supported: boolean | null;
  live_casino: boolean | null;
  sports_betting: boolean | null;
  bonuses: CasinoBonus[];
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface CategoryPageContentProps {
  category: Category;
  casinos: Casino[];
}

type SortOption = 'default' | 'rating_desc' | 'rating_asc' | 'name_asc' | 'name_desc';

const ITEMS_PER_PAGE = 8;

/* ─────────────────────────────────────────
   CASINO CARD
───────────────────────────────────────── */
function CasinoCard({ casino, index }: { casino: Casino; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const imageUrl = getImageUrl(casino.logo || casino.featured_image);
  const welcomeBonus = casino.bonuses?.[0] || null;

  const features = [
    casino.mobile_friendly ? { text: 'Mobile Friendly', icon: Smartphone } : null,
    casino.crypto_supported ? { text: 'Crypto', icon: Zap } : null,
    casino.live_casino ? { text: 'Live Casino', icon: Award } : null,
    casino.sports_betting ? { text: 'Sports Betting', icon: ShieldCheck } : null,
  ].filter(Boolean) as { text: string; icon: React.ElementType }[];

  return (
    <div className="w-full bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden pt-8 lg:pt-0">
      <div className="absolute top-0 left-0 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold px-4 py-1 rounded-tl-2xl rounded-br-xl uppercase tracking-wider z-10">
        #{index + 1} Ranked
      </div>

      <div
        className="w-full rounded-xl border-[2.5px] p-4 sm:p-5 lg:p-6 flex flex-col lg:grid lg:grid-cols-[150px_1fr_220px] items-stretch gap-5"
        style={{
          background:
            'linear-gradient(231.79deg, #D5EDFF 32.55%, #EEECFF 43.54%, #F9F3FF 53.23%, #F5FCFF 66.16%, #E9F5FF 79.08%)',
          borderImage:
            'linear-gradient(158.37deg, #FF9C2C 2.3%, #FFF1CC 15.9%, #B45B1B 24.24%, #FFC170 62.4%, #FEE5B3 75.76%, #9F5E26 90.07%) 1',
        }}
      >
        {/* Logo */}
        <div className="flex flex-row lg:flex-col items-center justify-start lg:justify-center gap-4 shrink-0">
          <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-[140px] lg:h-[140px] rounded-2xl overflow-hidden shadow-md border border-slate-100 flex items-center justify-center bg-white p-2 shrink-0">
            <Image
              src={imageUrl}
              alt={casino.name || 'Casino'}
              width={140}
              height={140}
              className="w-full h-full object-contain mix-blend-multiply"
              unoptimized
            />
          </div>
          <div className="flex flex-col lg:hidden flex-1">
            <h2 className="font-bold text-lg text-slate-900 leading-tight">{casino.name}</h2>
            <div className="flex items-center gap-1 mt-1">
              <Star size={12} className="fill-amber-400 text-amber-400" />
              <span className="text-xs font-bold text-slate-800">
                {casino.rating ? Number(casino.rating).toFixed(1) : 'N/A'}
              </span>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center lg:px-2">
          <div className="hidden lg:flex items-center justify-between gap-3 border-b border-slate-200/60 pb-3 mb-3">
            <div>
              <h2 className="font-bold text-2xl text-slate-900 tracking-tight">{casino.name}</h2>
              <p className="text-xs text-slate-400 mt-0.5">Est. {casino.established_year || 'N/A'}</p>
            </div>
            <div className="flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-xl border border-slate-200/50 shrink-0">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={14}
                  className={
                    star <= Math.round(Number(casino.rating) || 0)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-slate-200'
                  }
                />
              ))}
              <span className="text-sm font-bold text-slate-800 ml-1">
                {casino.rating ? Number(casino.rating).toFixed(1) : 'N/A'}
              </span>
            </div>
          </div>

          <div className={`${expanded ? 'flex' : 'hidden lg:flex'} flex-col gap-3`}>
            {features.length > 0 && (
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {features.map((feat, i) => {
                  const Icon = feat.icon;
                  return (
                    <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-600">
                      <Icon size={14} className="text-indigo-400 shrink-0" />
                      <span>{feat.text}</span>
                    </div>
                  );
                })}
              </div>
            )}
            {casino.short_description && (
              <p className="text-xs text-slate-500 line-clamp-2 hidden lg:block">
                {casino.short_description}
              </p>
            )}
            <div className="grid grid-cols-2 gap-2 bg-white/60 rounded-xl p-2.5 border border-slate-200/40 text-center">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Min Deposit
                </p>
                <p className="text-xs font-semibold text-slate-800 mt-0.5">
                  {casino.minimum_deposit ? `$${casino.minimum_deposit}` : 'N/A'}
                </p>
              </div>
              <div className="border-l border-slate-200">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Withdrawal
                </p>
                <p className="text-xs font-semibold text-slate-800 mt-0.5">
                  {casino.withdrawal_time || 'N/A'}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setExpanded(!expanded)}
            className="flex lg:hidden items-center justify-center gap-1 mt-3 py-2 px-4 rounded-xl border border-slate-200 bg-white/40 text-slate-600 text-xs font-bold hover:bg-white/80 transition-colors w-full"
          >
            {expanded ? (
              <>Hide Details <ChevronUp size={14} /></>
            ) : (
              <>Show Details <ChevronDown size={14} /></>
            )}
          </button>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center lg:items-stretch justify-center border-t lg:border-t-0 lg:border-l border-slate-200/60 pt-4 lg:pt-0 lg:pl-5 shrink-0">
          <div className="text-center mb-4 w-full">
            <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-1">
              Exclusive Offer
            </p>
            <h3 className="text-base font-black text-slate-900 leading-snug px-1">
              {welcomeBonus ? welcomeBonus.title : casino.short_description || '100% Welcome Bonus'}
            </h3>
          </div>
          <div className="w-full flex flex-col gap-2.5 max-w-xs lg:max-w-none">
            <a
              href={casino.website_url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-5 rounded-xl font-bold text-sm text-white bg-gradient-to-b from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 active:scale-[0.98] transition-all shadow-md shadow-indigo-100 flex items-center justify-center gap-2"
            >
              <span>Claim Bonus</span>
              <span>&#8599;</span>
            </a>
            <Link
              href={`/casino/${casino.slug}`}
              className="w-full py-3 px-5 rounded-xl font-bold text-sm text-slate-700 bg-white hover:bg-slate-50 active:scale-[0.98] transition-all flex items-center justify-center border border-slate-200 shadow-sm"
            >
              Read Review
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────── */
export default function CategoryPageContent({ category, casinos }: CategoryPageContentProps) {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortOption>('default');
  const [currentPage, setCurrentPage] = useState(1);
  const [showSortMenu, setShowSortMenu] = useState(false);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, sort]);

  const sortLabel: Record<SortOption, string> = {
    default: 'Default',
    rating_desc: 'Rating: High to Low',
    rating_asc: 'Rating: Low to High',
    name_asc: 'Name: A\u2013Z',
    name_desc: 'Name: Z\u2013A',
  };

  const processed = useCallback(() => {
    let list = [...casinos];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (c) =>
          (c.name || '').toLowerCase().includes(q) ||
          (c.short_description || '').toLowerCase().includes(q)
      );
    }
    switch (sort) {
      case 'rating_desc':
        list.sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0));
        break;
      case 'rating_asc':
        list.sort((a, b) => Number(a.rating || 0) - Number(b.rating || 0));
        break;
      case 'name_asc':
        list.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
        break;
      case 'name_desc':
        list.sort((a, b) => (b.name || '').localeCompare(a.name || ''));
        break;
    }
    return list;
  }, [casinos, search, sort]);

  const filtered = processed();
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-6 md:py-8">
      {/* ── Hero Banner ── */}
      <div className="relative rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 p-6 sm:p-8 md:p-10 mb-8 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-white/5 blur-2xl" />
          <div className="absolute bottom-0 left-1/3 w-48 h-48 rounded-full bg-purple-400/20 blur-3xl" />
        </div>

        <nav className="flex items-center gap-1.5 text-indigo-200 text-xs mb-4 relative flex-wrap">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight size={12} />
          <span className="text-white font-bold">{category.name}</span>
        </nav>

        <div className="relative flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-3">
              <TrendingUp size={13} />
              <span>{casinos.length} Casinos Available</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              {category.name}
            </h1>
            <p className="text-indigo-200 text-sm mt-2 max-w-xl">
              Discover the best {category.name} platforms, expertly reviewed and ranked for players
              who demand the highest quality.
            </p>
          </div>
          <div className="hidden sm:flex flex-col items-center gap-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 shrink-0 text-center">
            <span className="text-3xl font-black text-white">{casinos.length}</span>
            <span className="text-indigo-200 text-xs font-medium">Top Casinos</span>
          </div>
        </div>
      </div>

      {/* ── Controls ── */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            id={`search-casinos-${category.slug}`}
            placeholder={`Search ${category.name} casinos...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 bg-white shadow-sm text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X size={15} />
            </button>
          )}
        </div>

        <div className="relative">
          <button
            id={`sort-btn-${category.slug}`}
            onClick={() => setShowSortMenu(!showSortMenu)}
            className="flex items-center gap-2 px-4 py-3 rounded-xl border border-slate-200 bg-white shadow-sm text-sm font-medium text-slate-700 hover:border-indigo-300 hover:text-indigo-600 transition whitespace-nowrap"
          >
            <SlidersHorizontal size={15} />
            <span>{sortLabel[sort]}</span>
            <ChevronDown
              size={14}
              className={`transition-transform ${showSortMenu ? 'rotate-180' : ''}`}
            />
          </button>

          {showSortMenu && (
            <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-xl border border-slate-100 z-50 overflow-hidden">
              {(Object.entries(sortLabel) as [SortOption, string][]).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => {
                    setSort(key);
                    setShowSortMenu(false);
                  }}
                  className={`w-full px-4 py-2.5 text-left text-sm transition-colors ${
                    sort === key
                      ? 'bg-indigo-50 text-indigo-700 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Count ── */}
      <p className="text-sm text-slate-500 mb-5">
        Showing <span className="font-semibold text-slate-800">{paginated.length}</span> of{' '}
        <span className="font-semibold text-slate-800">{filtered.length}</span> casinos
        {search && (
          <>
            {' '}matching &quot;
            <span className="font-semibold text-indigo-600">{search}</span>&quot;
          </>
        )}
      </p>

      {/* ── Cards or Empty ── */}
      {paginated.length === 0 ? (
        <div className="w-full bg-white rounded-2xl p-10 text-center border border-slate-100 shadow-sm">
          <div className="text-5xl mb-3">&#127920;</div>
          <h2 className="text-xl font-bold text-slate-700 mb-1">No Casinos Found</h2>
          <p className="text-slate-400 text-sm">
            {search
              ? `No results for "${search}". Try a different search.`
              : 'No casinos in this category yet.'}
          </p>
          {search && (
            <button
              onClick={() => setSearch('')}
              className="mt-4 px-5 py-2 rounded-xl bg-indigo-50 text-indigo-600 font-semibold text-sm hover:bg-indigo-100 transition"
            >
              Clear Search
            </button>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {paginated.map((casino, i) => (
            <CasinoCard
              key={casino.id}
              casino={casino}
              index={(currentPage - 1) * ITEMS_PER_PAGE + i}
            />
          ))}
        </div>
      )}

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-center mt-8 pt-6 border-t border-slate-200 gap-4">
          <p className="text-sm text-slate-500">
            Page <span className="font-semibold text-slate-800">{currentPage}</span> of{' '}
            <span className="font-semibold text-slate-800">{totalPages}</span>
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
            >
              <ChevronLeft size={18} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
              .reduce<(number | 'ellipsis')[]>((acc, p, idx, arr) => {
                if (idx > 0 && p - (arr[idx - 1] as number) > 1) acc.push('ellipsis');
                acc.push(p);
                return acc;
              }, [])
              .map((item, idx) =>
                item === 'ellipsis' ? (
                  <span
                    key={`e-${idx}`}
                    className="w-9 h-9 flex items-center justify-center text-slate-400 text-sm"
                  >
                    &hellip;
                  </span>
                ) : (
                  <button
                    key={item}
                    onClick={() => setCurrentPage(item as number)}
                    className={`w-9 h-9 rounded-lg text-sm font-semibold transition-all ${
                      currentPage === item
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-slate-600 border border-transparent hover:border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {item}
                  </button>
                )
              )}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
