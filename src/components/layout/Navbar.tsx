'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Menu, Search, ChevronDown, LogOut, Star, X, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { clearCurrentUser } from '@/store/slices/userSlice';
import RegisterModal from '@/components/RegisterModal';
import { getImageUrl } from '@/lib/utils/getImageUrl';
import { API_CONFIG } from '@/config/api.config';
import {
  getUserCountryCode,
  getCountryFlagUrl,
  POPULAR_COUNTRIES,
  storeCountryCode,
} from '@/lib/countryDetection';
import { formatRating } from '@/components/ui/StarRating';

interface NavbarProps {
  onMenuClick: () => void;
}

// Generate a DiceBear cartoon avatar URL from a seed string
function getAvatarUrl(seed: string): string {
  const encoded = encodeURIComponent(seed);
  return `https://api.dicebear.com/8.x/adventurer/svg?seed=${encoded}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf&radius=50`;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const reduxCasinos = useSelector((state: RootState) => state.casinos?.casinos || []);
  const [modalOpen, setModalOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [userCountry, setUserCountry] = useState<string>('US');
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const countryRef = useRef<HTMLDivElement>(null);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    getUserCountryCode()
      .then((code) => {
        if (code) setUserCountry(code);
      })
      .catch((err) => {
        console.warn('Failed to detect user country:', err);
      });
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
      if (countryRef.current && !countryRef.current.contains(event.target as Node)) {
        setCountryDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced live search
  useEffect(() => {
    const trimmed = searchQuery.trim().toLowerCase();
    if (!trimmed) {
      setResults([]);
      setIsOpen(false);
      setIsLoading(false);
      return;
    }

    setIsOpen(true);

    if (reduxCasinos && reduxCasinos.length > 0) {
      const matched = reduxCasinos.filter((c: any) =>
        (c.name && c.name.toLowerCase().includes(trimmed)) ||
        (c.slug && c.slug.toLowerCase().includes(trimmed)) ||
        (c.short_description && c.short_description.toLowerCase().includes(trimmed))
      );
      setResults(matched.slice(0, 10));
      setIsLoading(false);
    } else {
      setIsLoading(true);
      const timer = setTimeout(async () => {
        try {
          const baseUrl = API_CONFIG.baseURL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
          const res = await fetch(`${baseUrl}/casinos?search=${encodeURIComponent(trimmed)}&limit=10`);
          if (res.ok) {
            const data = await res.json();
            setResults(Array.isArray(data) ? data : []);
          }
        } catch (err) {
          console.error('Failed to search casinos:', err);
        } finally {
          setIsLoading(false);
        }
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [searchQuery, reduxCasinos]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (results.length > 0) {
      router.push(`/casino/${results[0].slug}`);
      setIsOpen(false);
    } else if (searchQuery.trim()) {
      setIsOpen(true);
    }
  };

  const firstName = currentUser?.name?.split(' ')[0] || 'User';
  const avatarSeed = currentUser?.email || currentUser?.name || 'default';

  return (
    <>
      <header
        className="
          fixed top-0 right-0 z-30
          left-0 lg:left-[260px]
          bg-[#EEF3FE]/90 backdrop-blur-md
         
        "
      >
        <div className="h-20 flex items-center justify-between px-3 sm:px-6 gap-2 sm:gap-5">

          {/* Sidebar Toggle - only visible on mobile */}
          <button
            onClick={onMenuClick}
            className="flex lg:hidden items-center justify-center shrink-0 w-9 h-9 rounded-lg "
            aria-label="Toggle sidebar"
          >
            <Menu size={20} className="text-slate-700" />
          </button>

          {/* Search Bar */}
          <div ref={searchRef} className="relative flex-1 max-w-[671px] min-w-0">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => {
                  if (searchQuery.trim()) setIsOpen(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') setIsOpen(false);
                }}
                placeholder="Games, Categories"
                className="
                    w-full
                    h-[40px] sm:h-[45px]
                    rounded-[32px]
                    border
                    border-[#2E68FB40]
                    bg-[#46108E0D]
                    pl-4 sm:pl-6
                    pr-20 sm:pr-24
                    text-xs sm:text-sm
                    text-slate-700
                    placeholder:text-slate-500
                    outline-none
                    focus:border-[#2E68FB]
                    focus:bg-white
                    shadow-sm
                    transition-all
                "
              />

              {/* Clear button */}
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setIsOpen(false);
                  }}
                  className="absolute right-11 sm:right-14 text-slate-400 hover:text-slate-600 transition-colors p-1 cursor-pointer"
                  aria-label="Clear search"
                >
                  <X size={15} />
                </button>
              )}

              {/* Search Button */}
              <button
                type="submit"
                aria-label="Search"
                className="
                    absolute
                    right-[1px]
                    top-[1px]
                    w-[38px] sm:w-[43px]
                    h-[38px] sm:h-[43px]
                    rounded-full
                    bg-[linear-gradient(180deg,#CDDCFB_0%,#588CF3_100%)]
                    flex
                    items-center
                    justify-center
                    text-white
                    hover:opacity-90
                    transition-opacity
                    active:scale-95
                    cursor-pointer
                "
              >
                {isLoading ? (
                  <Loader2 size={16} className="sm:w-[18px] sm:h-[18px] animate-spin" />
                ) : (
                  <Search size={16} className="sm:w-[18px] sm:h-[18px]" />
                )}
              </button>
            </form>

            {/* Live Search Results Dropdown */}
            {isOpen && searchQuery.trim() !== '' && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50 animate-fadeIn">
                {/* Dropdown Header */}
                <div className="flex items-center justify-between px-4 py-2 bg-slate-50 border-b border-slate-100 text-xs text-slate-500">
                  <span className="font-semibold text-slate-600">
                    {isLoading
                      ? 'Searching...'
                      : `${results.length} Casino${results.length === 1 ? '' : 's'} Found`}
                  </span>
                  {results.length > 0 && (
                    <span className="text-[11px] text-[#2E68FB]">Click to view review</span>
                  )}
                </div>

                {/* Results List */}
                <div className="max-h-[360px] overflow-y-auto p-2 divide-y divide-slate-100">
                  {isLoading ? (
                    <div className="flex items-center justify-center py-8 text-slate-400 gap-2">
                      <Loader2 className="w-5 h-5 animate-spin text-[#2E68FB]" />
                      <span className="text-sm">Searching casinos...</span>
                    </div>
                  ) : results.length > 0 ? (
                    results.map((casino) => {
                      const logoSrc = getImageUrl(casino.logo || casino.featured_image || '/images/888.png');
                      return (
                        <Link
                          key={casino.id || casino.slug}
                          href={`/casino/${casino.slug}`}
                          onClick={() => {
                            setIsOpen(false);
                          }}
                          className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#F4F8FF] transition-all group cursor-pointer"
                        >
                          {/* Casino Logo */}
                          <div className="relative w-11 h-11 rounded-lg bg-white border border-slate-200/80 p-1 flex items-center justify-center shrink-0 shadow-sm overflow-hidden group-hover:border-[#2E68FB]/40 transition-colors">
                            <Image
                              src={logoSrc}
                              alt={casino.name || 'Casino Logo'}
                              fill
                              className="object-contain p-0.5"
                              unoptimized
                            />
                          </div>

                          {/* Casino Title & Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-bold text-slate-800 group-hover:text-[#2E68FB] transition-colors truncate">
                                {casino.name}
                              </h4>
                              {casino.rating && (
                                <span className="flex items-center gap-0.5 text-[11px] font-semibold text-amber-500 bg-amber-50 px-1.5 py-0.5 rounded shrink-0">
                                  <Star size={11} fill="#F59E0B" className="text-amber-500" />
                                  {formatRating(casino.rating)}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-400 truncate mt-0.5">
                              {casino.short_description || 'Online Casino Review & Bonuses'}
                            </p>
                          </div>

                          {/* View Review Link */}
                          <div className="shrink-0 text-xs font-semibold text-[#2E68FB] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                            <span>Review</span>
                            <span>→</span>
                          </div>
                        </Link>
                      );
                    })
                  ) : (
                    <div className="text-center py-8 px-4 text-slate-500">
                      <p className="text-sm font-semibold text-slate-700">No casinos found</p>
                      <p className="text-xs text-slate-400 mt-1">
                        No results matching &ldquo;{searchQuery}&rdquo;
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-1 sm:gap-4">

            {/* User Country Badge */}
           <div ref={countryRef} className="relative">
  <div
    className="
      hidden md:flex
      items-center
      justify-center
      gap-2.5
      h-[48px]
      rounded-[20px]
      px-3.5
      text-sm
      font-bold
      text-[#1E293B]
      whitespace-nowrap
    "
    title={mounted ? `Current Location: ${userCountry}` : 'Detecting location...'}
  >
    {/* Flag Image */}
    <div className="h-[20px] rounded-[3px] overflow-hidden shadow-xs border border-slate-200/80 shrink-0 flex items-center justify-center bg-slate-100">
      {mounted ? (
        <img
          src={getCountryFlagUrl(userCountry)}
          alt={`${userCountry} flag`}
          className="w-full h-full object-cover"
          loading="eager"
          onError={(e) => {
            e.currentTarget.src = `https://react-circle-flags.pages.dev/${userCountry.toLowerCase()}.svg`;
          }}
        />
      ) : (
        <span className="text-sm">🌐</span>
      )}
    </div>

    {/* Country Code */}
    <span className="text-sm uppercase tracking-wider text-slate-800 font-extrabold">
      {mounted ? userCountry : '--'}
    </span>
  </div>
</div>

            {/* Register Button OR User Pill */}
            {mounted && currentUser ? (
              /* ── Registered User Pill ── */
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen((v) => !v)}
                  className="
                    hidden sm:flex
                    items-center
                    gap-2.5
                    h-[48px]
                    px-4
                    rounded-[20px]
                    font-semibold
                    text-[13px]
                    text-[#16203A]
                    whitespace-nowrap
                    transition-all
                    hover:bg-[#CDDCFB]/60
                    active:scale-95
                  "
                  style={{
                    border: '1.5px solid rgba(88,140,243,0.35)',
                    background: 'rgba(205,220,251,0.35)',
                  }}
                >
                  {/* DiceBear cartoon avatar */}
                  <span
                    className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, #CDDCFB, #588CF3)',
                      boxShadow: '0 0 0 2px #fff, 0 0 0 3.5px #588CF3',
                    }}
                  >
                    <Image
                      src={getAvatarUrl(avatarSeed)}
                      alt={firstName}
                      width={32}
                      height={32}
                      unoptimized
                      className="w-full h-full object-cover"
                    />
                  </span>
                  <span>{firstName}</span>
                  <ChevronDown
                    size={14}
                    className="text-[#588CF3] transition-transform"
                    style={{ transform: userMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  />
                </button>

                {/* Dropdown */}
                {userMenuOpen && (
                  <div
                    className="absolute right-0 top-[56px] w-48 rounded-2xl shadow-xl z-50 overflow-hidden"
                    style={{
                      background: 'rgba(255,255,255,0.95)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(88,140,243,0.2)',
                      animation: 'slideDown 0.15s ease',
                    }}
                  >
                    <style>{`@keyframes slideDown { from { opacity: 0; transform: translateY(-6px) } to { opacity: 1; transform: translateY(0) } }`}</style>
                    <div className="px-4 py-3 border-b border-slate-100">
                      <p className="text-sm font-semibold text-slate-800 truncate">{currentUser.name}</p>
                      <p className="text-xs text-slate-400 truncate">{currentUser.email}</p>
                    </div>
                    <button
                      onClick={() => { dispatch(clearCurrentUser()); setUserMenuOpen(false); }}
                      className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={15} />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* ── Register Button ── */
              <button
                onClick={() => setModalOpen(true)}
                className="
                  hidden sm:flex
                  items-center
                  justify-center
                  w-auto px-3 sm:w-[137px] sm:px-[22px]
                  h-[40px] sm:h-[48px]
                  rounded-[20px]
                  font-bold
                  text-[12px] sm:text-[14px]
                  text-[#16203A]
                  whitespace-nowrap
                  bg-[linear-gradient(180deg,_#CDDCFB_0%,_#588CF3_100%)]
                  shadow-[0px_2px_0px_0px_#2E68FB]
                  hover:opacity-90
                  active:scale-95
                  transition-all
                "
              >
                REGISTER
              </button>
            )}

            {/* Play Now Button */}
            <button
              className="
                flex
                items-center
                justify-center
                w-auto px-3 sm:w-[165px] sm:px-6
                h-[40px] sm:h-[48px]
                rounded-[80px]
                font-bold
                text-[12px] sm:text-[14px]
                text-[#16203A]
                whitespace-nowrap
                bg-[linear-gradient(180deg,_#FFE11F_0%,_#FF8533_100%)]
                shadow-[0px_2px_0px_0px_#E36D1F]
              "
            >
              PLAY NOW
            </button>

          </div>
        </div>
      </header>

      {/* Registration Modal */}
      <RegisterModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}