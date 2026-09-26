'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Play,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  Layers,
  Sparkles,
  Gamepad2,
  ChevronRight,
  X,
  BadgeCheck,
  Award,
  ArrowRight
} from 'lucide-react';
import StarRating from '@/components/ui/StarRating';
import CasinoCardBadge from '@/components/casino/CasinoCardBadge';
import CasinoAffiliateButton from '@/components/CasinoAffiliateButton';
import CasinoCardDisclaimer from '@/components/CasinoCardDisclaimer';
import { getImageUrl } from '@/lib/utils/getImageUrl';
import { formatPayoutTime } from '@/lib/utils';

interface GameProps {
  game: any;
  sponsoredSlots?: any[];
  topCasinos?: any[];
}

const DEFAULT_SPONSORED_SLOTS = [
  {
    title: 'Lucky Foxilian Hold And Win',
    provider: '1spin4win',
    slug: 'lucky-foxilian-hold-and-win-1spin4win',
    tag: 'Video slots',
    image: 'https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=400&auto=format&fit=crop&q=80',
  },
  {
    title: '3 Piggies of Bank',
    provider: 'Yggdrasil Gaming',
    slug: '3-piggies-of-bank-yggdrasil-gaming',
    tag: 'Video slots',
    image: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=400&auto=format&fit=crop&q=80',
  },
  {
    title: 'Throne of Elements: Platinum',
    provider: 'Wazdan',
    slug: 'throne-of-elements-platinum-wazdan',
    tag: 'Video slots',
    image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=400&auto=format&fit=crop&q=80',
  },
  {
    title: 'Blessings of Caishen',
    provider: 'AvatarUX',
    slug: 'blessings-of-caishen-avatar-ux',
    tag: 'Video slots',
    image: 'https://images.unsplash.com/photo-1541278107931-e006523892df?w=400&auto=format&fit=crop&q=80',
  },
  {
    title: 'Death Dominion',
    provider: 'Pragmatic Play',
    slug: 'death-dominion-pragmatic-play',
    tag: 'Video slots',
    image: 'https://images.unsplash.com/photo-1520697830682-bbb6e85e2b0b?w=400&auto=format&fit=crop&q=80',
  },
];

export default function GameDetailClient({
  game,
  sponsoredSlots = DEFAULT_SPONSORED_SLOTS,
  topCasinos = [],
}: GameProps) {
  const [demoOpen, setDemoOpen] = useState(false);

  const heroImage =
    game.hero_banner ||
    game.thumbnail ||
    'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=1600&auto=format&fit=crop&q=80';

  const specs = [
    { label: 'Game Type', value: game.game_type || 'Roulette' },
    { label: 'Game Provider', value: game.provider || 'Real Dealer Studios' },
    { label: 'RTP', value: game.rtp || '97.3%' },
    { label: 'Autoplay Option', value: game.autoplay !== false ? 'Yes' : 'No' },
    { label: 'Multiplier', value: game.multiplier !== false ? 'Yes' : 'No' },
    {
      label: 'Release Date',
      value: game.release_date
        ? new Date(game.release_date).toISOString().split('T')[0]
        : '2023-04-12',
    },
    { label: 'Volatility', value: game.volatility || 'Medium' },
    {
      label: 'Minimum Bet',
      value: game.min_bet !== null && game.min_bet !== undefined ? `$${game.min_bet}` : '$0.25',
    },
    {
      label: 'Maximum Bet',
      value: game.max_bet !== null && game.max_bet !== undefined ? `$${game.max_bet}` : '$1,000',
    },
    { label: 'In-Game Interaction', value: game.in_game_interaction ? 'Yes' : 'No' },
    { label: 'Player Customisation', value: game.player_customisation !== false ? 'Yes' : 'No' },
    { label: 'Rebet Option', value: game.rebet !== false ? 'Yes' : 'No' },
    { label: 'Side Bet', value: game.side_bet !== false ? 'Yes' : 'No' },
    { label: 'Undo Option', value: game.undo !== false ? 'Yes' : 'No' },
    { label: 'Game History', value: game.game_history !== false ? 'Yes' : 'No' },
    { label: 'Bonus Features', value: game.bonus_features !== false ? 'Yes' : 'No' },
  ];

  return (
    <div className="mx-auto px-4 py-8 font-sans text-gray-800 min-h-screen max-w-7xl">
      {/* 1. BREADCRUMBS */}
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
        <Link href="/" className="hover:text-[#2E68FB] transition">
          Home
        </Link>
        <span>/</span>
        <Link href="/games" className="hover:text-[#2E68FB] transition">
          Casino Games
        </Link>
        <span>/</span>
        <span className="text-[#16171D] font-semibold">{game.title}</span>
      </div>

      {/* 2. HERO CARD - EXACT THEME MATCH WITH CASINO REVIEW HERO */}
      <div className="card-animated-border rounded-2xl p-[2px] bg-[linear-gradient(158.37deg,_#FF9C2C_2.3%,_#FFF1CC_15.9%,_#B45B1B_24.24%,_#FFC170_62.4%,_#FEE5B3_75.76%,_#9F5E26_90.07%)] mb-10">
        <div
          className="rounded-[14px] p-6 shadow-sm flex flex-col lg:flex-row gap-6 items-center justify-between"
          style={{
            background:
              'linear-gradient(231.79deg, #D5EDFF 32.55%, #EEECFF 43.54%, #F9F3FF 53.23%, #F5FCFF 66.16%, #E9F5FF 79.08%)',
          }}
        >
          <div className="flex flex-col sm:flex-row gap-6 items-center w-full lg:w-auto">
            {/* Visual Thumbnail */}
            <div className="w-[280px] h-[190px] rounded-xl overflow-hidden shadow-sm flex items-center justify-center p-2 bg-white/70 border border-white/80 shrink-0">
              <img
                src={heroImage}
                alt={game.title || 'Game'}
                className="max-h-full max-w-full rounded-xl object-cover"
              />
            </div>

            {/* Details */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
                <span className="px-3 py-1 rounded-full text-white text-[11px] font-semibold border border-[#F59E0B4D] bg-[linear-gradient(90deg,_#F59E0B_0%,_#D97706_100%)]">
                  {game.game_type || 'Table Game'}
                </span>
                <span className="text-xs font-semibold text-[#2E68FB] bg-[#E6EDFF] px-2.5 py-0.5 rounded-full border border-[#B8CEFF]">
                  Provider: {game.provider || 'Real Dealer Studios'}
                </span>
              </div>

              <h1 className="text-[26px] sm:text-[32px] font-bold text-gray-900 leading-tight">
                {game.title}
              </h1>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3 text-xs text-gray-700">
                <div className="p-2 bg-white/60 rounded-lg border border-[#2E68FB20]">
                  <span className="text-[10px] font-bold text-[#2E68FB] uppercase block">RTP</span>
                  <span className="font-bold text-emerald-600 text-sm">{game.rtp || '97.3%'}</span>
                </div>
                <div className="p-2 bg-white/60 rounded-lg border border-[#2E68FB20]">
                  <span className="text-[10px] font-bold text-[#2E68FB] uppercase block">Volatility</span>
                  <span className="font-bold text-gray-800 text-sm">{game.volatility || 'Medium'}</span>
                </div>
                <div className="p-2 bg-white/60 rounded-lg border border-[#2E68FB20]">
                  <span className="text-[10px] font-bold text-[#2E68FB] uppercase block">Min Bet</span>
                  <span className="font-bold text-gray-800 text-sm">${game.min_bet ?? '0.25'}</span>
                </div>
                <div className="p-2 bg-white/60 rounded-lg border border-[#2E68FB20]">
                  <span className="text-[10px] font-bold text-[#2E68FB] uppercase block">Max Bet</span>
                  <span className="font-bold text-gray-800 text-sm">${game.max_bet ?? '1,000'}</span>
                </div>
              </div>

              <p className="text-emerald-600 text-xs font-medium mt-3 flex items-center gap-1 justify-center sm:justify-start">
                ✓ Certified Random Number Generator (RNG) & Fair Play Verified
              </p>
            </div>
          </div>

          {/* Action Column */}
          <div className="w-full lg:w-[240px] flex flex-col justify-center gap-3">
            <button
              type="button"
              onClick={() => setDemoOpen(true)}
              className="h-12 rounded-xl text-white text-base font-bold flex items-center justify-center gap-2 shadow-sm transition active:scale-95 cursor-pointer"
              style={{
                background: 'linear-gradient(180deg, #CDDCFB 0%, #588CF3 100%)',
                boxShadow: '0px 2px 0px 0px #2E68FB',
              }}
            >
              <Play className="w-4 h-4 fill-white" />
              Play Free Demo
            </button>
            <a
              href="#where-to-play"
              className="h-12 rounded-xl text-[#16171D] text-sm font-bold flex items-center justify-center gap-1.5 shadow-sm transition active:scale-95"
              style={{
                background: 'linear-gradient(180deg, #FFE11F 0%, #FF8533 100%)',
                boxShadow: '0px 2px 0px 0px #E36D1F',
              }}
            >
              Where to Play ▶
            </a>
          </div>
        </div>
      </div>

      {/* 3. SIMILAR & SPONSORED SLOTS SLIDER */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="inline-flex rounded-full bg-[radial-gradient(circle_at_center,#B8CEFF_0%,#2E68FB_100%)] p-[1px]">
              <div className="flex items-center gap-1 rounded-full bg-[#E6EDFF] px-3.5 py-0.5">
                <Sparkles className="w-3.5 h-3.5 text-[#2E68FB]" />
                <span className="font-poppins text-[10px] font-bold uppercase text-[#2E68FB]">
                  Sponsored Slots
                </span>
              </div>
            </div>
          </div>
          <span className="text-xs text-gray-500 font-medium">Free play demo available</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
          {sponsoredSlots.map((slot, idx) => (
            <Link
              key={idx}
              href={`/games/${slot.slug || 'hockey-fever-roulette'}`}
              className="card-animated-border rounded-[20px] p-[2px] cursor-pointer flex flex-col h-full group"
            >
              <div
                className="rounded-[18px] p-3 flex flex-col justify-between h-full"
                style={{
                  background:
                    'linear-gradient(231.79deg, #D5EDFF 32.55%, #EEECFF 43.54%, #F9F3FF 53.23%, #F5FCFF 66.16%, #E9F5FF 79.08%)',
                }}
              >
                <div>
                  <div className="relative h-28 rounded-xl overflow-hidden mb-2 bg-white/70 border border-white/80">
                    <img
                      src={
                        slot.image ||
                        'https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=400&auto=format&fit=crop&q=80'
                      }
                      alt={slot.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-[#16171D]/80 backdrop-blur-xs text-white">
                      {slot.tag || 'Video slots'}
                    </span>
                  </div>
                  <div className="text-[11px] text-gray-500 font-medium">{slot.provider}</div>
                  <h4 className="text-xs font-bold text-[#16171D] group-hover:text-[#2E68FB] transition line-clamp-1 mt-0.5">
                    {slot.title}
                  </h4>
                </div>
                <div className="mt-2.5 pt-2 border-t border-[#2E68FB20] text-[11px] font-bold text-[#2E68FB] flex items-center justify-between">
                  <span>Play Slot</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. MAIN CONTENT & DETAILS SPECIFICATION GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14">
        {/* Main Review Text */}
        <article className="lg:col-span-8 space-y-8 text-sm sm:text-base leading-relaxed text-[#475467]">
          {/* Author Byline */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#E6EDFF] overflow-hidden border border-[#2E68FB30]">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt={game.author_name || 'Bojan Jovanovic'}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-400 block uppercase">
                  Written By
                </span>
                <span className="font-bold text-[#16171D] text-sm">
                  {game.author_name || 'Bojan Jovanovic'}
                </span>
              </div>
            </div>
            <div className="inline-flex rounded-full bg-[radial-gradient(circle_at_center,#B8CEFF_0%,#2E68FB_100%)] p-[1px]">
              <div className="flex items-center gap-1 rounded-full bg-[#E6EDFF] px-3 py-1">
                <BadgeCheck className="w-3.5 h-3.5 text-[#2E68FB]" />
                <span className="font-poppins text-[10px] font-medium uppercase text-[#2E68FB]">
                  Verified Game Review
                </span>
              </div>
            </div>
          </div>

          {/* Overview */}
          <section id="overview">
            <div
              className="rounded-2xl p-6 border border-[#2E68FB] shadow-sm"
              style={{
                background:
                  'linear-gradient(231.79deg, #D5EDFF 32.55%, #F5FCFF 66.16%, #E9F5FF 79.08%)',
              }}
            >
              <h2 className="font-poppins text-[22px] font-bold text-[#16171D] mb-3">
                {game.title} by {game.provider || 'Real Dealer Studios'} Overview
              </h2>
              <div className="space-y-4 text-sm font-normal text-[#475467] leading-relaxed">
                <p>
                  {game.title} is a premier online casino game engineered by{' '}
                  {game.provider || 'Real Dealer Studios'}, offering top-tier cinematic graphics,
                  certified random number generation, and seamless mobile gameplay.
                </p>
                <p>
                  Unlike standard casino software, {game.title} provides player-centric features
                  such as intuitive betboards, custom racetrack wagers, and detailed statistical
                  history charts so you can monitor historical outcomes.
                </p>
                <p>
                  Whether you are testing strategies with free virtual credits or spinning with real
                  money stakes, every round is verified by independent testing laboratories to
                  guarantee mathematical fairness.
                </p>
              </div>
            </div>
          </section>

          {/* RTP and Limits */}
          <section id="rtp-limits" className="pt-4 border-t border-gray-200">
            <h2 className="font-poppins text-[22px] font-bold text-[#16171D] mb-3">
              RTP and Table Limits
            </h2>
            <p className="text-sm text-[#475467] leading-relaxed">
              Like other high-tier releases, {game.title} features an RTP of{' '}
              <strong className="text-emerald-600 font-bold">{game.rtp || '97.30%'}</strong>. The
              volatility of the game is rated as{' '}
              <strong className="text-gray-900 font-bold">{game.volatility || 'Medium'}</strong>,
              while betting limits accommodate both recreational players and high rollers, ranging
              from{' '}
              <strong className="text-gray-900 font-bold">
                ${game.min_bet !== null && game.min_bet !== undefined ? game.min_bet : '0.25'}
              </strong>{' '}
              to{' '}
              <strong className="text-gray-900 font-bold">
                ${game.max_bet !== null && game.max_bet !== undefined ? game.max_bet : '1,000'}
              </strong>{' '}
              per round.
            </p>
          </section>

          {/* Pros and Cons */}
          <section id="pros-cons" className="pt-4 border-t border-gray-200">
            <h2 className="font-poppins text-[22px] font-bold text-[#16171D] mb-4">
              Pros and Cons of {game.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* PROS */}
              <div className="rounded-2xl border border-[#22C55E] bg-[#F2FFF7] p-5">
                <h3 className="font-bold text-[#22C55E] text-sm mb-3 flex items-center gap-1.5 uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                  Pros
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-gray-800">
                  {game.pros?.length > 0 ? (
                    game.pros.map((pro: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#22C55E] font-bold">✓</span>
                        <span>{pro}</span>
                      </li>
                    ))
                  ) : (
                    <>
                      <li className="flex items-start gap-2">
                        <span className="text-[#22C55E] font-bold">✓</span>
                        <span>Cinematic dealer footage & RNG certified fair play</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#22C55E] font-bold">✓</span>
                        <span>High theoretical return to player (RTP: {game.rtp || '97.3%'})</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#22C55E] font-bold">✓</span>
                        <span>Convenient one-click rebet and autoplay option</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>

              {/* CONS */}
              <div className="rounded-2xl border border-[#FF5A5A] bg-[#FFF5F5] p-5">
                <h3 className="font-bold text-[#FF5A5A] text-sm mb-3 flex items-center gap-1.5 uppercase tracking-wider">
                  <XCircle className="w-4 h-4 text-[#FF5A5A]" />
                  Cons
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-gray-800">
                  {game.cons?.length > 0 ? (
                    game.cons.map((con: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#FF5A5A] font-bold">✕</span>
                        <span>{con}</span>
                      </li>
                    ))
                  ) : (
                    <li className="flex items-start gap-2">
                      <span className="text-[#FF5A5A] font-bold">✕</span>
                      <span>Requires stable high-speed internet for HD video rendering</span>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </section>
        </article>

        {/* Sidebar Specifications Grid */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="rounded-2xl p-6 border border-[#2E68FB] bg-white shadow-xs">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#EEF2FF]">
              <Gamepad2 className="w-5 h-5 text-[#2E68FB]" />
              <h3 className="font-poppins font-bold text-[18px] text-[#16171D]">
                {game.title} Details
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
              {specs.map((item, idx) => (
                <div
                  key={idx}
                  className="border border-[#2E68FB40] rounded-xl p-2.5 bg-[#F8FAFF] flex items-center justify-between"
                >
                  <span className="text-[10px] font-bold text-[#2E68FB] uppercase tracking-wider">
                    {item.label}
                  </span>
                  <span className="text-[13px] font-bold text-[#16171D] text-right">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Table of Contents */}
          <div className="rounded-2xl p-6 border border-gray-200 bg-white shadow-xs">
            <h4 className="text-xs font-bold text-[#2E68FB] uppercase tracking-wider mb-3">
              Contents
            </h4>
            <nav className="space-y-2 text-xs font-semibold text-gray-700">
              <a href="#overview" className="block hover:text-[#2E68FB] transition">
                • Overview
              </a>
              <a href="#rtp-limits" className="block hover:text-[#2E68FB] transition">
                • RTP and Table Limits
              </a>
              <a href="#pros-cons" className="block hover:text-[#2E68FB] transition">
                • Pros and Cons
              </a>
              <a href="#where-to-play" className="block hover:text-[#2E68FB] transition">
                • Where to Play {game.title}
              </a>
            </nav>
          </div>
        </aside>
      </div>

      {/* 5. WHERE TO PLAY CASINOS - ONLY REAL CASINOS FROM DATABASE */}
      <section id="where-to-play" className="mb-14">
        <div className="mb-6">
          <div className="inline-flex rounded-full bg-[radial-gradient(circle_at_center,#B8CEFF_0%,#2E68FB_100%)] p-[1px]">
            <div className="flex items-center gap-1 rounded-full bg-[#E6EDFF] px-4 py-1">
              <BadgeCheck className="w-3.5 h-3.5 text-[#2E68FB]" />
              <span className="font-poppins text-[10px] font-medium uppercase text-[#2E68FB]">
                Verified Casinos
              </span>
            </div>
          </div>
          <h2 className="font-poppins text-[24px] font-bold leading-[24px] tracking-normal text-[#16171D] mb-2 mt-3">
            Where to Play {game.title}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 max-w-2xl">
            Only verified operators from our licensed database offering secure gameplay, verified
            bonuses, and instant payouts.
          </p>
        </div>

        {topCasinos.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-2xl border border-gray-200">
            <p className="text-gray-500 font-medium text-sm">
              Loading licensed casino operators from our database...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topCasinos.map((casino) => {
              const welcomeBonus =
                casino.bonuses?.[0]?.amount ||
                casino.bonuses?.[0]?.title ||
                '100% up to $1,500 + 150 Free Spins';
              const imageUrl = getImageUrl(
                casino.logo || casino.featured_image || '/images/888.png',
              );

              return (
                <div
                  key={casino.id}
                  className="card-animated-border rounded-[24px] p-[2px] cursor-pointer flex flex-col h-full relative group"
                >
                  {/* Top-Right Corner Tag / Badge */}
                  <div className="absolute top-2 right-3 z-20">
                    <CasinoCardBadge badge={casino.card_badge} isHot={casino.hot_casino} />
                  </div>

                  <div
                    className="flex flex-col p-5 rounded-[22px] justify-between flex-1 w-full h-full relative"
                    style={{
                      background:
                        'linear-gradient(231.79deg, #D5EDFF 32.55%, #EEECFF 43.54%, #F9F3FF 53.23%, #F5FCFF 66.16%, #E9F5FF 79.08%)',
                    }}
                  >
                    <div>
                      {/* Logo + Name */}
                      <div className="flex gap-4 items-center">
                        <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-xl overflow-hidden shadow-sm flex-shrink-0 border border-gray-100 p-1">
                          <Image
                            src={imageUrl}
                            alt={casino.name || 'Casino'}
                            fill
                            className="object-contain p-1"
                            unoptimized
                          />
                        </div>
                        <div className="min-w-0 flex-1 pr-12">
                          <Link href={`/casino/${casino.slug}`}>
                            <h3
                              className="text-[18px] sm:text-[20px] font-bold text-[#151515] leading-tight truncate hover:text-[#2E68FB] transition"
                              title={casino.name}
                            >
                              {casino.name}
                            </h3>
                          </Link>
                          <p className="text-[12px] text-[#666] mt-1 line-clamp-2 leading-[17px]">
                            {casino.short_description ||
                              'Certified real money online casino with verified games.'}
                          </p>
                        </div>
                      </div>

                      {/* Rating & Chips */}
                      <div className="flex items-center justify-between mt-3">
                        <StarRating rating={casino.rating || 5} size={14} />
                        <div className="flex gap-1">
                          <span className="text-[9px] font-bold text-white px-2 py-0.5 rounded-md bg-gradient-to-r from-[#FFB000] to-[#FF8A00]">
                            Top Pick
                          </span>
                          <span className="text-[9px] font-bold text-white px-2 py-0.5 rounded-md bg-[#00B67A]">
                            Fast Pay
                          </span>
                        </div>
                      </div>

                      {/* Bonus Banner */}
                      <div className="mt-3 px-3 py-2 rounded-xl bg-[#2E68FB] text-white flex flex-col justify-center h-[54px]">
                        <span className="text-[9px] font-semibold tracking-wider uppercase text-blue-100 block">
                          Exclusive Welcome Bonus
                        </span>
                        <span
                          className="text-[13px] font-bold mt-0.5 leading-snug line-clamp-1 truncate"
                          title={welcomeBonus}
                        >
                          {welcomeBonus}
                        </span>
                      </div>

                      {/* Min Deposit & Payout */}
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        <div className="p-2 bg-white/50 border border-[#2E68FB20] rounded-lg h-[50px] flex flex-col justify-center">
                          <span className="block text-[9px] font-semibold text-[#2E68FB] uppercase">
                            Min Deposit
                          </span>
                          <span className="text-[12px] font-bold text-[#363636] truncate">
                            {casino.minimum_deposit ? `$${casino.minimum_deposit}` : '$20'}
                          </span>
                        </div>

                        <div className="p-2 bg-white/50 border border-[#2E68FB20] rounded-lg h-[50px] flex flex-col justify-center">
                          <span className="block text-[9px] font-semibold text-[#2E68FB] uppercase">
                            Payout time
                          </span>
                          <span className="text-[12px] font-bold text-[#363636] truncate">
                            {formatPayoutTime(casino.withdrawal_time)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Dual Action Buttons */}
                    <div>
                      <div className="grid grid-cols-2 gap-2 mt-4">
                        <Link
                          href={`/casino/${casino.slug}`}
                          className="h-11 rounded-xl flex items-center justify-center font-bold text-[13px] text-[#16171D] transition"
                          style={{
                            background: 'linear-gradient(180deg, #FFE11F 0%, #FF8533 100%)',
                            boxShadow: '0px 2px 0px 0px #E36D1F',
                          }}
                        >
                          Read Review
                        </Link>
                        <CasinoAffiliateButton
                          casinoId={casino.id}
                          defaultUrl={
                            casino.affiliate_url ||
                            casino.default_affiliate_url ||
                            casino.website_url
                          }
                          className="h-11 rounded-xl flex items-center justify-center font-bold text-[13px] text-white shadow-sm transition"
                          style={{
                            background: 'linear-gradient(180deg, #CDDCFB 0%, #588CF3 100%)',
                            boxShadow: '0px 2px 0px 0px #2E68FB',
                          }}
                        >
                          Play Now ▶
                        </CasinoAffiliateButton>
                      </div>

                      <CasinoCardDisclaimer casinoName={casino.name} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 6. PLAY FOR FUN DEMO MODAL */}
      {demoOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-[#16171D] rounded-2xl w-full max-w-4xl overflow-hidden border border-[#2E68FB40] shadow-2xl flex flex-col h-[85vh]">
            {/* Modal Header */}
            <div className="p-4 bg-[#1f2129] border-b border-[#2E68FB30] flex items-center justify-between">
              <div>
                <span className="text-xs text-[#2E68FB] font-semibold uppercase">
                  Free Play Demo Mode
                </span>
                <h3 className="text-base font-bold text-white">{game.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setDemoOpen(false)}
                className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Viewport Frame */}
            <div className="flex-1 bg-black relative flex items-center justify-center">
              {game.demo_url ? (
                <iframe
                  src={game.demo_url}
                  title={game.title}
                  className="w-full h-full border-none"
                  allowFullScreen
                />
              ) : (
                <div className="text-center p-8">
                  <Gamepad2 className="w-16 h-16 text-[#2E68FB] mx-auto mb-3 animate-pulse" />
                  <h4 className="text-lg font-bold text-white mb-2">Live Demo Simulator</h4>
                  <p className="text-xs text-gray-400 max-w-md mx-auto mb-6">
                    Direct provider embed for {game.title} is available via verified casino
                    partners. Claim demo tokens or play for real money.
                  </p>
                  <a
                    href="#where-to-play"
                    onClick={() => setDemoOpen(false)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs text-[#16171D]"
                    style={{
                      background: 'linear-gradient(180deg, #FFE11F 0%, #FF8533 100%)',
                    }}
                  >
                    <span>View Partner Casinos</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
