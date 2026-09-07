'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef } from 'react';
import {
  Star,
  Check,
  ChevronLeft,
  ChevronRight,
  Zap,
  ShieldCheck,
  Award,
  Smartphone,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

import { useCasinos } from '@/hooks/useRedux';
import { getImageUrl } from '@/lib/utils/getImageUrl';
import CasinoCardDisclaimer from '@/components/CasinoCardDisclaimer';

export default function AllCasinoSection({
  casinos,
}: {
  casinos?: any[];
}) {
  const {
    casinos: reduxCasinos,
    filteredCasinos,
    loading,
  } = useCasinos();

  const scrollContainerRef =
    useRef<HTMLDivElement>(null);

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  /**
   * Category page:
   *     use casinos prop
   *
   * Home page:
   *     use Redux filtered casinos
   */
  const allCasinos =
    casinos !== undefined
      ? casinos
      : filteredCasinos.length > 0
        ? filteredCasinos
        : reduxCasinos;

  const totalPages = Math.ceil(
    allCasinos.length / itemsPerPage
  );

  const displayCasinos = allCasinos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading && casinos === undefined) {
    return (
      <section className="w-full flex flex-col items-center py-12 px-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-pulse text-slate-500 font-medium">
            Loading premium casinos...
          </div>
        </div>
      </section>
    );
  }

  if (displayCasinos.length === 0) {
    return null;
  }

    return (
        <section className="w-full flex flex-col items-center py-12 px-4 max-w-7xl mx-auto">
            {/* Heading Section */}
            <div className="mb-10 text-center">
                <h2 className="font-poppins font-bold text-3xl md:text-4xl tracking-tight text-slate-900">
                    Best Online Casinos Reviewed
                </h2>
                <p className="text-slate-500 mt-2 text-sm md:text-base max-w-2xl mx-auto">
                    Compare verified platforms, check welcome offers, and discover licensed sites offering top payouts.
                </p>
            </div>

            {/* Casino Cards Wrapper */}
            <div className="w-full flex flex-col gap-6 items-center">
                {displayCasinos.map((casino, index) => (
                    <CasinoCard key={casino.id} casino={casino} index={index} />
                ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="w-full flex flex-col sm:flex-row justify-between items-center mt-10 pt-6 border-t border-slate-200 gap-4">
                    <p className="text-sm text-slate-500 order-2 sm:order-1">
                        Showing <span className="font-semibold text-slate-800">{displayCasinos.length}</span> of <span className="font-semibold text-slate-800">{displayCasinos.length}</span> verified platforms
                    </p>

                    <div className="flex items-center gap-1 order-1 sm:order-2">
                        <button
                            className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft size={18} />
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                className={`w-8 h-8 rounded-lg text-sm font-semibold transition-all ${currentPage === page
                                    ? 'bg-[#4F46E5] text-white shadow-sm'
                                    : 'text-slate-600 border border-transparent hover:border-slate-200 hover:bg-slate-50'
                                    }`}
                                onClick={() => setCurrentPage(page)}
                            >
                                {page}
                            </button>
                        ))}

                        <button
                            className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}

function CasinoCard({ casino, index }: { casino: any; index: number }) {
    const [isOpen, setIsOpen] = useState(false);
    const welcomeBonus = casino.bonuses?.[0] || null;
    const imageUrl = getImageUrl(casino.logo || casino.featured_image);

    const features = [
        casino.mobile_friendly ? { text: 'Mobile Friendly', icon: Smartphone } : null,
        casino.crypto_supported ? { text: 'Crypto Supported', icon: Zap } : null,
        casino.live_casino ? { text: 'Live Dealer Lounge', icon: Award } : null,
        casino.sports_betting ? { text: 'Sports Betting Arena', icon: ShieldCheck } : null,
    ].filter(Boolean) as { text: string; icon: any }[];

    const softwareProviders = casino.software_providers || ['NetEnt', 'Microgaming', 'Pragmatic Play', 'Evolution'];
    const payoutSpeed = casino.payout_speed || 'Instant - 24 Hours';
    const winRate = casino.win_rate || '98.2%';

    return (
        <div className="card-animated-border w-full rounded-[16px] p-[2px] shadow-sm relative pt-8 lg:pt-[2px] cursor-pointer">
            {/* Top Badge Tag */}
            <div className="absolute top-0 left-0 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] sm:text-xs font-bold px-4 py-1 rounded-tl-[14px] rounded-br-xl uppercase tracking-wider z-10">
                Rank #{index + 1} Best Choice
            </div>

            {/* Changed from flex to grid on desktop to force precise allocations */}
            <div
                className="w-full rounded-[14px] p-4 sm:p-5 lg:p-6 flex flex-col lg:grid lg:grid-cols-[160px_1fr_240px] items-stretch justify-between gap-6"
                style={{
                    background: 'linear-gradient(231.79deg, #D5EDFF 32.55%, #EEECFF 43.54%, #F9F3FF 53.23%, #F5FCFF 66.16%, #E9F5FF 79.08%)',
                }}
            >
                {/* 1. Brand Logo Container */}
                <div className="flex flex-row lg:flex-col items-center justify-start lg:justify-center gap-4 shrink-0">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-[150px] lg:h-[150px] rounded-2xl overflow-hidden shadow-md border border-slate-100 flex items-center justify-center bg-slate-50 p-2 relative shrink-0">
                        <Image
                            src={imageUrl}
                            alt={casino.name || 'Casino Logo'}
                            width={150}
                            height={150}
                            className="w-full h-full object-contain mix-blend-multiply"
                            unoptimized
                        />
                    </div>
                    {/* Mobile Header Info */}
                    <div className="flex flex-col lg:hidden flex-1">
                        <h3 className="font-bold text-xl sm:text-2xl text-slate-900 tracking-tight leading-tight">
                            {casino.name}
                        </h3>
                        <p className="text-[11px] text-slate-500 mt-0.5">License: Curacao</p>
                        <div className="flex items-center gap-1.5 mt-1.5 bg-slate-50/80 border border-slate-100 px-2 py-0.5 rounded-lg w-fit">
                            <Star size={13} className="fill-amber-400 text-amber-400" />
                            <span className="text-xs font-bold text-slate-800">
                                {casino.rating ? Number(casino.rating).toFixed(1) : '9.4'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* 2. Middle Dense Specs Area */}
                <div className="flex flex-col justify-center lg:px-2">
                    {/* Desktop Header Row */}
                    <div className="hidden lg:flex items-center justify-between gap-3 border-b border-slate-200/60 pb-3">
                        <div>
                            <h3 className="font-bold text-2xl lg:text-3xl text-slate-900 tracking-tight">
                                {casino.name}
                            </h3>
                            <p className="text-xs text-slate-400 mt-0.5">Established: {casino.established_year || '2022'} • License: Curacao</p>
                        </div>

                        <div className="flex items-center gap-2 bg-white/80 px-3 py-1.5 rounded-xl border border-slate-200/50 shrink-0">
                            <div className="flex items-center gap-0.5">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        size={15}
                                        className={star <= Math.round(casino.rating || 0) ? "fill-amber-400 text-amber-400" : "text-slate-200"}
                                    />
                                ))}
                            </div>
                            <span className="text-base font-bold text-slate-800">
                                {casino.rating ? Number(casino.rating).toFixed(1) : '9.4'}
                            </span>
                        </div>
                    </div>

                    {/* Collapsible content area */}
                    <div className={`${isOpen ? 'flex' : 'hidden lg:flex'} flex-col`}>
                        {/* Features Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5 my-4 pt-2 lg:pt-0">
                            {features.map((feature, idx) => {
                                const Icon = feature.icon;
                                return (
                                    <div key={idx} className="flex items-center gap-2.5 text-sm font-medium text-slate-700">
                                       
                                        <Icon size={16} className="text-slate-400 shrink-0" />
                                        <span className="truncate">{feature.text}</span>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Meta Spec Highlights */}
                        <div className="grid grid-cols-3 gap-2 bg-white/60 rounded-xl p-3 border border-slate-200/40 text-center mb-4">
                            <div>
                                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Payout Speed</p>
                                <p className="text-xs font-semibold text-slate-800 mt-0.5">{payoutSpeed}</p>
                            </div>
                            <div className="border-x border-slate-200">
                                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Win Rate</p>
                                <p className="text-xs font-bold text-emerald-600 mt-0.5">{winRate}</p>
                            </div>
                            <div>
                                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Software</p>
                                <p className="text-xs font-semibold text-slate-800 mt-0.5 truncate px-1" title={softwareProviders.join(', ')}>
                                    {softwareProviders.slice(0, 2).join(', ')}...
                                </p>
                            </div>
                        </div>

                        {/* Payment Gateways */}
                        <div className="flex flex-wrap items-center gap-2.5 pt-1 border-t border-slate-200/40 lg:border-none mt-2 lg:mt-0 pt-3 lg:pt-0">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Accepted Systems:</span>
                            <div className="flex flex-wrap items-center gap-1.5">
                                <div className="px-2 py-0.5 rounded border border-slate-200 bg-white shadow-sm text-[10px] font-black text-blue-800">VISA</div>
                                <div className="px-2 py-0.5 rounded border border-slate-200 bg-white shadow-sm text-[10px] font-black text-red-600">MASTERCARD</div>
                                <div className="px-2 py-0.5 rounded border border-slate-200 bg-white shadow-sm text-[10px] font-bold text-amber-500 bg-amber-50/30">BITCOIN</div>
                                <div className="px-2 py-0.5 rounded border border-slate-200 bg-white shadow-sm text-[10px] font-extrabold text-blue-600">PAYPAL</div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Trigger */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex lg:hidden items-center justify-center gap-1 mt-3 py-2 px-4 rounded-xl border border-slate-200 bg-white/40 text-slate-600 text-xs font-bold hover:bg-white/80 transition-colors w-full"
                    >
                        {isOpen ? (
                            <>Hide Platform Details <ChevronUp size={14} /></>
                        ) : (
                            <>Show Platform Details <ChevronDown size={14} /></>
                        )}
                    </button>
                </div>

                {/* 3. Action Block Area (CTA) */}
                {/* Added w-full and items-stretch to make buttons occupy the entire grid column width */}
                {/* 3. Action Block Area (CTA) */}
                <div className="w-full flex flex-col items-center lg:items-stretch justify-center bg-white/40 lg:bg-transparent border-t lg:border-t-0 lg:border-l border-slate-200/60 p-5 lg:p-0 lg:pl-6 shrink-0 rounded-b-xl lg:rounded-none">
                    <div className="text-center mb-5 lg:mb-6 w-full">
                        <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-1.5">Exclusive Offer</p>
                        <h3 className="text-lg lg:text-xl font-black text-slate-900 leading-snug px-1">
                            {welcomeBonus ? welcomeBonus.title : casino.short_description || '100% Welcome Bonus'}
                        </h3>
                    </div>

                    {/* Buttons with rich internal vertical padding (py) instead of strict heights */}
                    <div className="w-full flex flex-col gap-3 max-w-sm lg:max-w-none px-2 lg:px-0">
                        <button
                            className="btn-play-now w-full py-3.5 lg:py-4 px-6 rounded-xl font-bold text-sm lg:text-base text-white bg-gradient-to-b from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 flex items-center justify-center gap-2 shadow-md shadow-indigo-100"
                            onClick={() => {
                                if (casino.website_url) {
                                    window.open(casino.website_url, '_blank', 'noopener,noreferrer');
                                }
                            }}
                        >
                            <span>Claim Bonus</span>
                            <span className="text-xs lg:text-sm">↗</span>
                        </button>

                        <Link
                            href={`/casino/${casino.slug}`}
                            className="btn-review w-full py-3.5 lg:py-4 px-6 rounded-xl font-bold text-sm lg:text-base text-slate-700 bg-white hover:bg-slate-50 flex items-center justify-center border border-slate-200 shadow-sm"
                        >
                            Read Review
                        </Link>
                    </div>

                    {/* Disclaimer Hover / Modal Link */}
                    <div className="w-full">
                        <CasinoCardDisclaimer casinoName={casino.name} />
                    </div>
                </div>

            </div>
        </div>
    );
}