'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useCasinos } from '@/hooks/useRedux';
import { getImageUrl } from '@/lib/utils/getImageUrl';
import Link from "next/link";
import CasinoCardDisclaimer from '@/components/CasinoCardDisclaimer';
import { formatPayoutTime } from '@/lib/utils';
export default function PopularCasinoSection( {
  casinos,
}: {
  casinos?: any[];
}) {
  const {
    casinos: reduxCasinos,
    filteredCasinos,
    loading,
  } = useCasinos();

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  /**
   * If casinos prop is passed:
   *     use category casinos
   *
   * If casinos prop is not passed:
   *     use Redux filtered casinos
   */
  const displayCasinos =
    casinos !== undefined
      ? casinos
      : filteredCasinos.length > 0
        ? filteredCasinos
        : reduxCasinos;

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

  if (loading) {
    return (
      <section className="w-full py-8">
        <div className="flex items-center justify-center">
          <div className="text-slate-500">Loading casinos...</div>
        </div>
      </section>
    );
  }

  if (displayCasinos.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-8">
      {/* Header */}
    <div className="mb-6">
        {/* First Row */}
        <div className="flex items-center justify-between">
         <div className="flex items-center gap-3">
          <Star
            size={22}
            fill="#B8C5FF"
            color="#B8C5FF"
          />

          <h2 className="text-[24px] sm:text-[36px] font-semibold text-[#111827]">
            Popular
          </h2>
        </div>

          <div className="flex items-center gap-3">
            <button className="hidden md:flex items-center bg-white px-4 py-2 rounded-full text-sm font-medium shadow-sm text-[#16171D]">
              See all
              <span className="ml-2 text-[#98A2B3]">{displayCasinos.length}</span>
            </button>
            <button
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100"
              onClick={scrollLeft}
            >
              <ChevronLeft size={18} className="text-[#16171D]" />
            </button>

            <button
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100"
              onClick={scrollRight}
            >
              <ChevronRight size={18} className="text-[#16171D]" />
            </button>
          </div>
        </div>

        {/* Second Row */}
        <p className="text-[15px] text-[#5F6368] mt-2">
          New Rally
          <span className="text-[#2E68FB]"> every 20 minutes</span> – spin and win!
        </p>
      </div>

      {/* Cards */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto pb-2 scroll-smooth items-stretch"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {displayCasinos.map((casino, index) => (
           <CasinoCard key={casino.id || index} casino={casino} />
        ))}
      </div>
    </section>
  );
}
function CasinoCard({ casino }: { casino: any }) {
  // Extract dynamic bonus values or fall back to your hardcoded defaults
  const welcomeBonus = casino.bonuses?.[0]?.amount || '$2,500 + 10% Cashback';
  const imageUrl = getImageUrl(casino.logo || casino.featured_image || '/images/888.png');

  return (
    <div className="card-animated-border rounded-[24px] p-[2px] shrink-0 cursor-pointer flex flex-col h-full">
      <div
        className="flex flex-col p-4 rounded-[22px] justify-between flex-1 w-full h-full transition-colors duration-200"
        style={{
          width: "340px",
          background:
            "linear-gradient(231.79deg, #D5EDFF 32.55%, #EEECFF 43.54%, #F9F3FF 53.23%, #F5FCFF 66.16%, #E9F5FF 79.08%)",
        }}
      >
        {/* 1. Header (Logo + Title) */}
        <div className="flex gap-3 items-center">
          <div className="relative w-20 h-20 bg-white rounded-xl overflow-hidden shadow-sm flex-shrink-0 border border-gray-100 p-1 group-hover:scale-105 transition-transform duration-200">
            <Image
              src={imageUrl}
              alt={casino.name || 'Casino'}
              fill
              className="object-contain p-1"
              unoptimized
            />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-[20px] font-bold text-[#151515] leading-tight hover:text-[#2E68FB] transition-colors truncate" title={casino.name || 'Casino'}>
              {casino.name || 'BC Game Casino'}
            </h3>
            <p
              className="text-[11px] text-[#666] mt-0.5 line-clamp-2 h-[34px] leading-[17px] overflow-hidden"
              title={casino.short_description}
            >
              {casino.short_description || 'Premium Casino Experience'}
            </p>
          </div>
        </div>

        {/* 2. Rating & Badges Row */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-1">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={13} fill="#FFB000" color="#FFB000" />
              ))}
            </div>
            <span className="text-[12px] font-bold text-[#363636] ml-1">
              {casino.rating || '4.9'}
            </span>
          </div>

          <div className="flex gap-1">
            <span className="text-[9px] font-bold text-white px-2 py-0.5 rounded-md bg-gradient-to-r from-[#FFB000] to-[#FF8A00] shadow-2xs">
              Top Pick
            </span>
            <span className="text-[9px] font-bold text-white px-2 py-0.5 rounded-md bg-[#00B67A] shadow-2xs">
              Fast Pay
            </span>
          </div>
        </div>

        {/* 3. Main Welcome Bonus Box */}
        <div className="mt-3 px-3 py-2 rounded-xl bg-[#2E68FB] text-white flex flex-col justify-center h-[54px] shadow-sm">
          <span className="text-[9px] font-semibold tracking-wider uppercase text-blue-100 block">
            Exclusive Welcome
          </span>
          <span className="text-[13px] font-bold mt-0.5 leading-snug line-clamp-1 truncate" title={welcomeBonus}>
            {welcomeBonus}
          </span>
        </div>

        {/* 4. Details 2x2 Info Grid */}
        <div className="grid grid-cols-2 gap-2 mt-3">
          {/* Min Deposit */}
          <div className="p-2 bg-white/50 border border-[#2E68FB20] rounded-lg h-[50px] flex flex-col justify-center">
            <span className="block text-[9px] font-semibold text-[#2E68FB] uppercase">
              Min Deposit
            </span>
            <span className="text-[12px] font-bold text-[#363636] truncate">
              {casino.minimum_deposit ? `$${casino.minimum_deposit}` : '€20'}
            </span>
          </div>

          {/* Payout */}
          <div
            className="p-2 bg-white/50 border border-[#2E68FB20] rounded-lg h-[50px] flex flex-col justify-center"
            title={casino.withdrawal_time || '2-4 Hours'}
          >
            <span className="block text-[9px] font-semibold text-[#2E68FB] uppercase">
              Payout
            </span>
            <span className="text-[12px] font-bold text-[#363636] line-clamp-1 truncate">
              {formatPayoutTime(casino.withdrawal_time)}
            </span>
          </div>

          {/* Games */}
          <div className="p-2 bg-white/50 border border-[#2E68FB20] rounded-lg h-[50px] flex flex-col justify-center">
            <span className="block text-[9px] font-semibold text-[#00B67A] uppercase">
              Games
            </span>
            <span className="text-[12px] font-bold text-[#00B67A] truncate">
              {casino.games_count || '2400+ Games'}
            </span>
          </div>

          {/* Established Year */}
          <div className="p-2 bg-white/50 border border-[#2E68FB20] rounded-lg h-[50px] flex flex-col justify-center">
            <span className="block text-[9px] font-semibold text-[#2E68FB] uppercase">
              Established Year
            </span>
            <span className="text-[12px] font-bold text-[#363636] truncate">
              {casino.established_year || '2020'}
            </span>
          </div>
        </div>

      {/* 5. Bottom Buttons Row */}
      <div className="flex gap-2 mt-4">
        <button
          style={{
            height: '36px',
            borderRadius: '12px',
            boxShadow: '0px 2px 0px 0px #2E68FB',
            background: 'linear-gradient(180deg, #CDDCFB 0%, #588CF3 100%)',
          }}
          className="btn-play-now flex-1 text-white text-[12px] font-bold flex items-center justify-center cursor-pointer"
          onClick={() => {
            if (casino.website_url) {
              window.open(casino.website_url, '_blank');
            }
          }}
        >
          Visit Casino ↗
        </button>

        <Link
          href={`/casino/${casino.slug}`}
          style={{
            width: "90px",
            height: "36px",
            borderRadius: "12px",
            background: "linear-gradient(180deg, #FFE11F 0%, #FF8533 100%)",
          }}
          className="btn-review inline-flex items-center justify-center text-[#1F1F1F] text-[12px] font-bold cursor-pointer"
        >
          Reviews
        </Link>
      </div>

      {/* Disclaimer Hover/Modal Link */}
      <CasinoCardDisclaimer casinoName={casino.name} />
      </div>
    </div>
  );
}