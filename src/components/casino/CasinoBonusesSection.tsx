'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ExternalLink, Copy, Check, Info } from 'lucide-react';

export interface CasinoBonusItem {
  id?: string;
  title: string;
  type?: string;
  amount?: string;
  bonus_code?: string | null;
  wagering_requirement?: string | null;
  minimum_deposit?: string | null;
  bonus_percentage?: string | null;
  affiliate_url?: string | null;
  terms_url?: string | null;
  sort_order?: number;
}

interface CasinoBonusesSectionProps {
  casinoId?: string;
  casinoName: string;
  defaultAffiliateUrl?: string;
  bonuses?: CasinoBonusItem[];
}

export default function CasinoBonusesSection({
  casinoId,
  casinoName,
  defaultAffiliateUrl,
  bonuses = [],
}: CasinoBonusesSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeModalBonus, setActiveModalBonus] = useState<CasinoBonusItem | null>(null);

  // If no bonuses configured in database, provide standard defaults based on casino
  const displayBonuses: CasinoBonusItem[] =
    bonuses.length > 0
      ? bonuses
      : [
          {
            title: `200% up to $2,000 + 100 Free Spins, 1st Deposit Bonus`,
            type: 'Welcome Bonus',
            minimum_deposit: '$15',
            wagering_requirement: '30x(d+b)',
            bonus_percentage: '200%',
            affiliate_url: defaultAffiliateUrl,
          },
          {
            title: `100% up to $2,000 + 100 Free Spins, 2nd Deposit Bonus`,
            type: 'Match Deposit Bonus',
            minimum_deposit: '$15',
            wagering_requirement: '30x(d+b)',
            bonus_percentage: '100%',
            affiliate_url: defaultAffiliateUrl,
          },
          {
            title: `75% up to $2,000 + 100 Free Spins, 3rd Deposit Bonus`,
            type: 'Match Deposit Bonus',
            minimum_deposit: '$15',
            wagering_requirement: '30x(d+b)',
            bonus_percentage: '75%',
            affiliate_url: defaultAffiliateUrl,
          },
          {
            title: `125% up to $2,000 + 100 Free Spins, 4th Deposit Bonus`,
            type: 'Match Deposit Bonus',
            minimum_deposit: '$15',
            wagering_requirement: '30x(d+b)',
            bonus_percentage: '125%',
            affiliate_url: defaultAffiliateUrl,
          },
        ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <section className="mt-10">
      {/* Blue Banner Outer Container - Matches media_1790358377405.png */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#0051B3] via-[#0B5FD7] to-[#1C73E8] shadow-xl overflow-hidden">
        {/* Subtle decorative glow accents */}
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-blue-400/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />

        {/* Header Row */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight inline-block border-b-2 border-white/70 pb-1">
              {casinoName} Bonuses
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-blue-100 font-medium max-w-xl">
              Check out other {casinoName} bonuses and pick one that suits your preferences best.
            </p>
          </div>

          {/* Action buttons on right */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            <Link
              href="/bonuses"
              className="inline-flex items-center justify-center px-4 py-2 rounded-full text-xs font-bold text-[#0051B3] bg-white hover:bg-blue-50 active:scale-95 transition-all shadow-sm"
            >
              Discover all
            </Link>

            {/* Slider arrows */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => scroll('left')}
                aria-label="Previous bonuses"
                className="w-8 h-8 rounded-full border border-white/50 bg-white/10 hover:bg-white/25 active:scale-90 flex items-center justify-center text-white transition-all backdrop-blur-xs"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scroll('right')}
                aria-label="Next bonuses"
                className="w-8 h-8 rounded-full border border-white/50 bg-white/10 hover:bg-white/25 active:scale-90 flex items-center justify-center text-white transition-all backdrop-blur-xs"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel / Cards Horizontal Container */}
        <div
          ref={scrollContainerRef}
          className="relative z-10 flex gap-4 sm:gap-5 overflow-x-auto pb-4 pt-1 scrollbar-none snap-x scroll-smooth -mx-2 px-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {displayBonuses.map((bonus, idx) => {
            const affiliateTarget = bonus.affiliate_url || defaultAffiliateUrl || '#';
            const badgeType = bonus.type || 'Welcome Bonus';
            const minDeposit = bonus.minimum_deposit || '$15';
            const wagering = bonus.wagering_requirement || '30x(d+b)';
            const bonusPercentage = bonus.bonus_percentage || (bonus.amount ? bonus.amount : '100%');

            return (
              <div
                key={bonus.id || idx}
                className="snap-start shrink-0 w-[270px] sm:w-[295px] bg-white rounded-2xl p-5 sm:p-6 shadow-lg border border-slate-100 flex flex-col justify-between text-slate-800 transition-transform duration-200 hover:-translate-y-1"
              >
                <div>
                  {/* Top Badge */}
                  <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-semibold text-slate-600 bg-slate-100 border border-slate-200/60 tracking-tight">
                    {badgeType}
                  </span>

                  {/* Title */}
                  <h3 className="mt-3.5 font-bold text-[15px] sm:text-[16px] text-slate-900 leading-snug min-h-[44px] line-clamp-2">
                    {bonus.title}
                  </h3>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 gap-x-2 gap-y-3 mt-4 pt-4 border-t border-slate-100 text-left">
                    <div>
                      <span className="text-[11px] text-slate-400 font-medium block">
                        Minimum Deposit
                      </span>
                      <span className="text-sm font-bold text-slate-900 block mt-0.5">
                        {minDeposit}
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] text-slate-400 font-medium block">
                        Wagering Requirements
                      </span>
                      <span className="text-sm font-bold text-slate-900 block mt-0.5">
                        {wagering}
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] text-slate-400 font-medium block">
                        Bonus Percentage
                      </span>
                      <span className="text-sm font-bold text-slate-900 block mt-0.5">
                        {bonusPercentage}
                      </span>
                    </div>

                    {bonus.bonus_code ? (
                      <div>
                        <span className="text-[11px] text-slate-400 font-medium block">
                          Bonus Code
                        </span>
                        <div className="mt-0.5 inline-flex items-center gap-1 px-2 py-0.5 bg-slate-50 border border-dashed border-slate-300 rounded font-mono text-xs font-bold text-slate-800">
                          <span>{bonus.bonus_code}</span>
                          <button
                            type="button"
                            onClick={() => handleCopyCode(bonus.bonus_code!)}
                            title="Copy Code"
                            className="p-0.5 text-slate-400 hover:text-blue-600 transition"
                          >
                            {copiedCode === bonus.bonus_code ? (
                              <Check className="w-3 h-3 text-emerald-600" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <span className="text-[11px] text-slate-400 font-medium block">
                          Bonus Value
                        </span>
                        <span className="text-sm font-bold text-slate-900 block mt-0.5">
                          {bonus.amount || 'Instant'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-5 pt-3">
                  {/* More info link */}
                  <button
                    type="button"
                    onClick={() => setActiveModalBonus(bonus)}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 underline block mb-3 text-left transition"
                  >
                    More info
                  </button>

                  {/* Claim Bonus CTA button with distinct affiliate link */}
                  <a
                    href={affiliateTarget}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl font-bold text-sm text-white bg-[#0070EB] hover:bg-[#005ec7] active:scale-98 flex items-center justify-center gap-2 shadow-md shadow-blue-500/25 transition-all"
                  >
                    <span>Claim bonus</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  {/* T&Cs Apply */}
                  <p className="text-[11px] text-slate-400 hover:text-slate-600 text-center mt-2.5 cursor-pointer underline">
                    T&Cs Apply
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bonus Details Modal */}
      {activeModalBonus && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3 mb-4">
              <div>
                <span className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider">
                  {activeModalBonus.type || 'Bonus Terms'}
                </span>
                <h4 className="text-lg font-bold text-slate-900 mt-1">
                  {activeModalBonus.title}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalBonus(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Minimum Deposit:</span>
                <span className="font-bold text-slate-900">{activeModalBonus.minimum_deposit || '$15'}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Wagering Requirement:</span>
                <span className="font-bold text-slate-900">{activeModalBonus.wagering_requirement || '30x(d+b)'}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Bonus Percentage:</span>
                <span className="font-bold text-slate-900">{activeModalBonus.bonus_percentage || '100%'}</span>
              </div>
              {activeModalBonus.bonus_code && (
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Promo Code:</span>
                  <span className="font-mono font-bold text-blue-600">{activeModalBonus.bonus_code}</span>
                </div>
              )}
              <div className="pt-2">
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  18+ only. Valid for verified players only. Full terms and conditions apply. Play responsibly.
                </p>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <a
                href={activeModalBonus.affiliate_url || defaultAffiliateUrl || '#'}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="flex-1 py-2.5 px-4 bg-[#0070EB] hover:bg-[#005ec7] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition"
              >
                <span>Claim This Bonus</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                type="button"
                onClick={() => setActiveModalBonus(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
