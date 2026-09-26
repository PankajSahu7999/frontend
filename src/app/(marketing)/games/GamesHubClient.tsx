'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  Info,
  Layers,
  ChevronRight,
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Gamepad2,
  Flame,
  Award
} from 'lucide-react';
import StarRating from '@/components/ui/StarRating';
import CasinoCardBadge from '@/components/casino/CasinoCardBadge';
import CasinoAffiliateButton from '@/components/CasinoAffiliateButton';
import CasinoCardDisclaimer from '@/components/CasinoCardDisclaimer';
import { getImageUrl } from '@/lib/utils/getImageUrl';
import { formatPayoutTime } from '@/lib/utils';

interface GameItem {
  id: string;
  title: string;
  slug: string;
  game_type?: string;
  category?: string;
  provider?: string;
  thumbnail?: string;
  rtp?: string;
  volatility?: string;
  min_bet?: number;
  max_bet?: number;
  is_recommended?: boolean;
  is_sponsored?: boolean;
}

interface RecommendedData {
  poker: GameItem[];
  roulette: GameItem[];
  blackjack: GameItem[];
  craps: GameItem[];
  sponsored: GameItem[];
  all: GameItem[];
}

interface Props {
  recommended: RecommendedData;
  topCasinos?: any[];
}

const CATEGORIES = [
  { name: 'Slots', slug: 'slots', icon: '🎰' },
  { name: 'Lottery Games', slug: 'lottery', icon: '🎟️' },
  { name: 'Table Games', slug: 'table', icon: '🎡' },
  { name: 'Card Games', slug: 'card', icon: '♠️' },
  { name: 'Dice Games', slug: 'dice', icon: '🎲' },
];

const FAQS = [
  {
    q: 'Why are casino games so popular?',
    a: 'The primary reason behind the popularity of casino games is the blend of excitement and reward potential. They offer a thrilling mix of chance and strategy, guaranteeing fun and the opportunity to win money. The variety of games, from slots to poker, caters to diverse preferences, enhancing their widespread appeal.',
  },
  {
    q: 'What are the different types of casino games?',
    a: 'Casino games encompass various categories, including table games like roulette; dice games, such as craps or hazard; card games like poker and blackjack; specialty games like bingo and keno; different types of slot machines; and immersive live-dealer games.',
  },
  {
    q: 'Are online casino games fair?',
    a: 'Yes, online casino games are fair if they are operated by reputable and regulated platforms that use certified random number generators to ensure randomness. Audited and licensed casinos adhere to strict standards, ensuring transparency and fairness.',
  },
  {
    q: 'What are the best casino games?',
    a: 'The best casino games vary based on personal preferences. For instance, players choose blackjack for its strategic depth, slot machines for their simplicity and potential for big wins, poker for its skill-based competition, while players who enjoy the thrill of chance pick roulette and craps.',
  },
  {
    q: 'How do casino games work?',
    a: 'Casino games are based on the principle of chance and odds, with a built-in house edge. In digital games, such as online slots, outcomes are determined by random number generators (RNGs). Although strategy and skill influence the outcomes of casino games to a varying degree, luck plays a significant role in all of them.',
  },
];

export default function GamesHubClient({ recommended, topCasinos = [] }: Props) {
  return (
    <div className="mx-auto px-4 py-8 font-sans text-gray-800 min-h-screen max-w-7xl">
      {/* 1. HERO CARD - EXACT THEME MATCH WITH CASINO REVIEW HERO */}
      <div className="card-animated-border rounded-2xl p-[2px] bg-[linear-gradient(158.37deg,_#FF9C2C_2.3%,_#FFF1CC_15.9%,_#B45B1B_24.24%,_#FFC170_62.4%,_#FEE5B3_75.76%,_#9F5E26_90.07%)] mb-10">
        <div
          className="rounded-[14px] p-6 sm:p-8 shadow-sm flex flex-col lg:flex-row gap-8 items-center justify-between"
          style={{
            background:
              'linear-gradient(231.79deg, #D5EDFF 32.55%, #EEECFF 43.54%, #F9F3FF 53.23%, #F5FCFF 66.16%, #E9F5FF 79.08%)',
          }}
        >
          <div className="max-w-2xl text-center lg:text-left">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-white text-[11px] font-semibold border border-[#F59E0B4D] bg-[linear-gradient(90deg,_#F59E0B_0%,_#D97706_100%)]">
                Hot Casino Game Categories
              </span>
            </div>

            <h1 className="font-poppins text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
              Casino Games Hub
            </h1>

            <p className="mt-3 text-sm text-[#475467] leading-relaxed max-w-xl">
              Explore the world's most popular online casino games, compare house edges and RTPs,
              practice in free-play demo mode, and find verified licensed operators to play for real
              money.
            </p>

            {/* Category Quick Chips */}
            <div className="mt-6 flex flex-wrap justify-center lg:justify-start gap-2">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`#${cat.slug}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white/80 hover:bg-white text-[#16171D] hover:text-[#2E68FB] border border-[#2E68FB30] shadow-xs transition"
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Featured Game Card */}
          <div className="w-full sm:w-[320px] rounded-2xl bg-white/70 p-4 border border-[#2E68FB40] shadow-xs shrink-0">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#EEF2FF]">
              <span className="text-[11px] font-bold text-[#F59E0B] uppercase flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Featured Game
              </span>
              <span className="text-[11px] font-semibold text-gray-500">Real Dealer Studios</span>
            </div>

            <div className="relative h-40 rounded-xl overflow-hidden mb-3 border border-[#2E68FB20]">
              <img
                src="https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=800&auto=format&fit=crop&q=80"
                alt="Hockey Fever Roulette"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-3">
                <div>
                  <h4 className="font-bold text-white text-base leading-tight">
                    Hockey Fever Roulette
                  </h4>
                  <p className="text-[11px] text-blue-200 mt-0.5">
                    RTP: 97.3% • European Single Zero
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="/games/hockey-fever-roulette"
              className="w-full py-2.5 rounded-xl text-[#16171D] text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition"
              style={{
                background: 'linear-gradient(180deg, #FFE11F 0%, #FF8533 100%)',
                boxShadow: '0px 2px 0px 0px #E36D1F',
              }}
            >
              <span>Play Demo & Review</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* 2. AFFILIATE DISCLOSURE & AUTHOR */}
      <div
        className="rounded-2xl p-6 mb-10 border border-[#2E68FB] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        style={{
          background:
            'linear-gradient(231.79deg, #D5EDFF 32.55%, #F5FCFF 66.16%, #E9F5FF 79.08%)',
        }}
      >
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#2E68FB]/10 text-[#2E68FB] flex items-center justify-center shrink-0 mt-0.5">
            <Info className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#16171D] uppercase tracking-wider">
              Affiliate Disclosure
            </h4>
            <p className="text-xs text-[#475467] mt-1 leading-relaxed">
              Our content contains affiliate links and we may make a commission on operator
              registrations and deposits made through these links. We only recommend licensed
              operators and we would not endorse any brand that is not verified by our experts. Get
              the truth. Then play.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 pl-0 md:pl-6 md:border-l border-[#2E68FB30] shrink-0">
          <div className="w-11 h-11 rounded-full bg-[#E6EDFF] border border-[#2E68FB30] shadow-xs overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
              alt="Petar Mitrovic"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-gray-400 block">
              Lead Casino Analyst
            </span>
            <span className="text-sm font-bold text-[#16171D]">Petar Mitrovic</span>
          </div>
        </div>
      </div>

      {/* 3. RECOMMENDED THIS MONTH - PASTEL GRADIENT CARDS */}
      <section className="mb-14">
        <div className="inline-flex rounded-full bg-[radial-gradient(circle_at_center,#B8CEFF_0%,#2E68FB_100%)] p-[1px]">
          <div className="flex items-center gap-1 rounded-full bg-[#E6EDFF] px-4 py-1">
            <BadgeCheck className="w-3.5 h-3.5 text-[#2E68FB]" />
            <span className="font-poppins text-[10px] font-medium uppercase text-[#2E68FB]">
              Editor's Picks
            </span>
          </div>
        </div>

        <h2 className="font-poppins text-[24px] font-bold leading-[24px] tracking-normal text-[#16171D] mb-6 mt-3">
          Recommended This Month
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ONLINE POKER BLOCK */}
          <div className="card-animated-border rounded-[24px] p-[2px] flex flex-col h-full">
            <div
              className="rounded-[22px] p-6 flex flex-col justify-between h-full"
              style={{
                background:
                  'linear-gradient(231.79deg, #D5EDFF 32.55%, #EEECFF 43.54%, #F9F3FF 53.23%, #F5FCFF 66.16%, #E9F5FF 79.08%)',
              }}
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#2E68FB20] mb-3">
                  <h3 className="font-poppins text-lg font-bold text-gray-900 flex items-center gap-2">
                    <span>♠️</span> Online Poker
                  </h3>
                  <span className="text-xs font-semibold text-[#2E68FB] bg-[#E6EDFF] px-2.5 py-0.5 rounded-full border border-[#B8CEFF]">
                    Top Picks
                  </span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed mb-4">
                  Poker is one of the most played casino games in the world, but online poker has
                  only boosted its popularity. Peruse our poker selection and find out what makes
                  this game so timeless.
                </p>

                <div className="space-y-2.5">
                  {recommended.poker.map((game) => (
                    <Link
                      key={game.id}
                      href={`/games/${game.slug}`}
                      className="group flex items-center justify-between p-2.5 rounded-xl border border-[#2E68FB20] hover:border-[#2E68FB] bg-white/80 hover:bg-white transition"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#E6EDFF] border border-[#2E68FB30] flex items-center justify-center font-bold text-[#2E68FB] text-xs">
                          🃏
                        </div>
                        <div>
                          <div className="text-xs font-bold text-gray-900 group-hover:text-[#2E68FB] transition">
                            {game.title}
                          </div>
                          <div className="text-[11px] text-gray-500">{game.provider}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {game.rtp && (
                          <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            {game.rtp}
                          </span>
                        )}
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#2E68FB] group-hover:translate-x-0.5 transition" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ONLINE ROULETTE BLOCK */}
          <div className="card-animated-border rounded-[24px] p-[2px] flex flex-col h-full">
            <div
              className="rounded-[22px] p-6 flex flex-col justify-between h-full"
              style={{
                background:
                  'linear-gradient(231.79deg, #D5EDFF 32.55%, #EEECFF 43.54%, #F9F3FF 53.23%, #F5FCFF 66.16%, #E9F5FF 79.08%)',
              }}
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#2E68FB20] mb-3">
                  <h3 className="font-poppins text-lg font-bold text-gray-900 flex items-center gap-2">
                    <span>🎡</span> Online Roulette
                  </h3>
                  <span className="text-xs font-semibold text-[#2E68FB] bg-[#E6EDFF] px-2.5 py-0.5 rounded-full border border-[#B8CEFF]">
                    Top Picks
                  </span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed mb-4">
                  Roulette has been popular for hundreds of years; today you don't even have to leave
                  your home to spin the wheel. Find your new favourite online roulette games right
                  here.
                </p>

                <div className="space-y-2.5">
                  {recommended.roulette.map((game) => (
                    <Link
                      key={game.id}
                      href={`/games/${game.slug}`}
                      className="group flex items-center justify-between p-2.5 rounded-xl border border-[#2E68FB20] hover:border-[#2E68FB] bg-white/80 hover:bg-white transition"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#E6EDFF] border border-[#2E68FB30] flex items-center justify-center font-bold text-[#2E68FB] text-xs">
                          🎯
                        </div>
                        <div>
                          <div className="text-xs font-bold text-gray-900 group-hover:text-[#2E68FB] transition">
                            {game.title}
                          </div>
                          <div className="text-[11px] text-gray-500">{game.provider}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {game.rtp && (
                          <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            {game.rtp}
                          </span>
                        )}
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#2E68FB] group-hover:translate-x-0.5 transition" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ONLINE BLACKJACK BLOCK */}
          <div className="card-animated-border rounded-[24px] p-[2px] flex flex-col h-full">
            <div
              className="rounded-[22px] p-6 flex flex-col justify-between h-full"
              style={{
                background:
                  'linear-gradient(231.79deg, #D5EDFF 32.55%, #EEECFF 43.54%, #F9F3FF 53.23%, #F5FCFF 66.16%, #E9F5FF 79.08%)',
              }}
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#2E68FB20] mb-3">
                  <h3 className="font-poppins text-lg font-bold text-gray-900 flex items-center gap-2">
                    <span>♣️</span> Online Blackjack
                  </h3>
                  <span className="text-xs font-semibold text-[#2E68FB] bg-[#E6EDFF] px-2.5 py-0.5 rounded-full border border-[#B8CEFF]">
                    Top Picks
                  </span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed mb-4">
                  Blackjack never goes out of style, and online blackjack only makes it more
                  accessible. Is number 21 in the cards for you?
                </p>

                <div className="space-y-2.5">
                  {recommended.blackjack.map((game) => (
                    <Link
                      key={game.id}
                      href={`/games/${game.slug}`}
                      className="group flex items-center justify-between p-2.5 rounded-xl border border-[#2E68FB20] hover:border-[#2E68FB] bg-white/80 hover:bg-white transition"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#E6EDFF] border border-[#2E68FB30] flex items-center justify-center font-bold text-[#2E68FB] text-xs">
                          21
                        </div>
                        <div>
                          <div className="text-xs font-bold text-gray-900 group-hover:text-[#2E68FB] transition">
                            {game.title}
                          </div>
                          <div className="text-[11px] text-gray-500">{game.provider}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {game.rtp && (
                          <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            {game.rtp}
                          </span>
                        )}
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#2E68FB] group-hover:translate-x-0.5 transition" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ONLINE CRAPS BLOCK */}
          <div className="card-animated-border rounded-[24px] p-[2px] flex flex-col h-full">
            <div
              className="rounded-[22px] p-6 flex flex-col justify-between h-full"
              style={{
                background:
                  'linear-gradient(231.79deg, #D5EDFF 32.55%, #EEECFF 43.54%, #F9F3FF 53.23%, #F5FCFF 66.16%, #E9F5FF 79.08%)',
              }}
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#2E68FB20] mb-3">
                  <h3 className="font-poppins text-lg font-bold text-gray-900 flex items-center gap-2">
                    <span>🎲</span> Online Craps
                  </h3>
                  <span className="text-xs font-semibold text-[#2E68FB] bg-[#E6EDFF] px-2.5 py-0.5 rounded-full border border-[#B8CEFF]">
                    Top Picks
                  </span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed mb-4">
                  Looking for a fast-paced game with plenty of betting options? Take a seat at an
                  online craps table.
                </p>

                <div className="space-y-2.5">
                  {recommended.craps.map((game) => (
                    <Link
                      key={game.id}
                      href={`/games/${game.slug}`}
                      className="group flex items-center justify-between p-2.5 rounded-xl border border-[#2E68FB20] hover:border-[#2E68FB] bg-white/80 hover:bg-white transition"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#E6EDFF] border border-[#2E68FB30] flex items-center justify-center font-bold text-[#2E68FB] text-xs">
                          🎲
                        </div>
                        <div>
                          <div className="text-xs font-bold text-gray-900 group-hover:text-[#2E68FB] transition">
                            {game.title}
                          </div>
                          <div className="text-[11px] text-gray-500">{game.provider}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {game.rtp && (
                          <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            {game.rtp}
                          </span>
                        )}
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#2E68FB] group-hover:translate-x-0.5 transition" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. REAL DATABASE CASINOS SECTION - WHERE TO PLAY */}
      {topCasinos.length > 0 && (
        <section className="mb-14">
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
              Top Rated Casinos for Table & Slot Games
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 max-w-2xl">
              Play these certified games at authorized, licensed online casinos featuring fast
              withdrawals and generous bonuses.
            </p>
          </div>

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
        </section>
      )}

      {/* 5. EDITORIAL & STRATEGY GUIDE + TABLE OF CONTENTS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Main Article Text */}
        <article className="lg:col-span-8 space-y-8 text-sm sm:text-base leading-relaxed text-[#475467]">
          <div
            className="rounded-2xl p-6 border border-[#2E68FB] shadow-sm"
            style={{
              background:
                'linear-gradient(231.79deg, #D5EDFF 32.55%, #F5FCFF 66.16%, #E9F5FF 79.08%)',
            }}
          >
            <p className="text-base sm:text-lg font-medium text-[#16171D] leading-relaxed">
              Whether you’re into blackjack, poker, live casino games or slots, you can find the
              best online casino games here and play them at your favourite online casino. Learn all
              there is about different types of casino games, check their odds, see which games are
              popular among players and choose the ones that suit you.
            </p>
          </div>

          <section id="what-are-casino-games" className="pt-4 border-t border-gray-200">
            <h2 className="font-poppins text-[22px] font-bold text-[#16171D] mb-3">
              What Are Casino Games?
            </h2>
            <p className="mb-3">
              Casino games are games of luck you can play in offshore and online casinos. The games
              give players a chance to win money, which is one of the main reasons why people
              engage in the first place.
            </p>
            <p className="mb-3">
              Although casino games are primarily games of luck, there’s a dose of skill involved,
              especially in table and card games. Different playing strategies exist for each game,
              which players research to increase their chances of winning.
            </p>
            <p>
              In addition, casino games are entertaining, especially if you play them in
              land-based casinos, where the social factor is also involved for specific games. On
              the other hand, there’s a great variety of online casino games, especially online
              slots. People can join slot and poker tournaments or enjoy live dealer games from the
              comfort of their homes.
            </p>
          </section>

          <section id="how-do-games-work" className="pt-4 border-t border-gray-200">
            <h2 className="font-poppins text-[22px] font-bold text-[#16171D] mb-3">
              How Do Casino Games Work?
            </h2>
            <p className="mb-3">
              All casino games provide a long-term advantage to the casino often referred to as
              “house”, while the players have a possibility to score some wins, but they lose in the
              long run. You should differentiate between gaming machines, table games and random
              number games because the mechanics and dynamics of each game is different.
            </p>
            <p className="mb-3">
              Gaming machines are slots and pachinko games. Online slots come with the
              return-to-player percentage and volatility, which shows what you can expect. They are
              purely based on luck. On the other hand, table games have a dose of skill and players
              either compete against the casino or each other.
            </p>
            <p>
              Some games combine these mechanics and roulette is the perfect example. It involves
              random numbers, while there’s a skill and social element involved where players try to
              beat the house.
            </p>
          </section>

          <section id="different-types" className="pt-4 border-t border-gray-200">
            <h2 className="font-poppins text-[22px] font-bold text-[#16171D] mb-3">
              Different Types of Casino Games
            </h2>
            <p className="mb-4">
              There is a large number of casino games you can play both in land-based and online
              casinos. Some of the most common games include:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
              {['Slots', 'Table games', 'Card games', 'Dice games', 'Lottery', 'Bingo'].map(
                (item) => (
                  <div
                    key={item}
                    className="p-3 bg-white rounded-xl border border-[#2E68FB40] text-xs font-bold text-[#16171D] flex items-center gap-2 shadow-2xs"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#2E68FB]" />
                    <span>{item}</span>
                  </div>
                ),
              )}
            </div>
            <p>
              In each of these categories, you can find different types of games. When we’re talking
              about slots, you can find classic, modern, progressive jackpot games, megaways, bonus
              buys, etc. The same can be done for all other games, as there are numerous versions for
              every game.
            </p>
          </section>

          <section id="winning-potential" className="pt-4 border-t border-gray-200">
            <h2 className="font-poppins text-[22px] font-bold text-[#16171D] mb-3">
              Casino Games With the Best Winning Potential
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="p-5 rounded-2xl bg-[#F2FFF7] border border-[#22C55E]">
                <h4 className="font-bold text-[#22C55E] text-sm mb-1 uppercase tracking-wider">
                  Games With the Best Odds
                </h4>
                <p className="text-xs text-gray-800 leading-relaxed mt-2">
                  Blackjack has the best mathematical odds (~42% win, ~49% loss, ~9% tie, with a
                  house edge as low as 0.5%). Baccarat Banker bets also maintain a low house edge
                  of 1.06%.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-[#FFF5F5] border border-[#FF5A5A]">
                <h4 className="font-bold text-[#FF5A5A] text-sm mb-1 uppercase tracking-wider">
                  Games With the Worst Odds
                </h4>
                <p className="text-xs text-gray-800 leading-relaxed mt-2">
                  Keno and national lottery games come with high house edges (often exceeding
                  20-30%). Guessing exact numbers is statistically harder, though jackpots can be
                  substantial.
                </p>
              </div>
            </div>
          </section>
        </article>

        {/* Sticky Table of Contents Sidebar */}
        <aside className="lg:col-span-4">
          <div className="sticky top-24 bg-white rounded-2xl p-6 border border-[#2E68FB40] shadow-xs">
            <h3 className="font-bold text-[#16171D] text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#2E68FB]" />
              Table of Contents
            </h3>

            <nav className="space-y-2 text-xs font-semibold text-gray-600">
              {[
                { id: 'what-are-casino-games', title: 'What Are Casino Games?' },
                { id: 'how-do-games-work', title: 'How Do Casino Games Work?' },
                { id: 'different-types', title: 'Different Types of Casino Games' },
                { id: 'winning-potential', title: 'Casino Games With Best Winning Potential' },
                { id: 'faqs', title: 'Frequently Asked Questions (FAQ)' },
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="block py-1.5 px-2.5 rounded-lg hover:bg-[#E6EDFF] hover:text-[#2E68FB] transition"
                >
                  {item.title}
                </a>
              ))}
            </nav>

            {/* Quick Helper Box */}
            <div className="mt-6 pt-5 border-t border-gray-150">
              <div
                className="rounded-xl p-3.5 border border-[#2E68FB30]"
                style={{
                  background:
                    'linear-gradient(231.79deg, #D5EDFF 32.55%, #F5FCFF 66.16%, #E9F5FF 79.08%)',
                }}
              >
                <span className="text-[11px] font-bold text-[#16171D] block mb-1">
                  Looking for a specific game?
                </span>
                <p className="text-[11px] text-[#475467] leading-relaxed mb-3">
                  Check out individual game reviews for RTP breakdowns, betting limits, and free
                  demo launchers.
                </p>
                <Link
                  href="/games/hockey-fever-roulette"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2E68FB] hover:underline"
                >
                  <span>View Hockey Fever Roulette</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* 6. FAQ SECTION - EXACT MATCH WITH REVIEW PAGE */}
      <section id="faqs" className="mb-14">
        <div className="inline-flex rounded-full bg-[radial-gradient(circle_at_center,#B8CEFF_0%,#2E68FB_100%)] p-[1px]">
          <div className="flex items-center gap-1 rounded-full bg-[#E6EDFF] px-4 py-1">
            <BadgeCheck className="w-3.5 h-3.5 text-[#2E68FB]" />
            <span className="font-poppins text-[10px] font-medium uppercase text-[#2E68FB]">
              Common Questions
            </span>
          </div>
        </div>

        <h2 className="font-poppins text-[24px] font-bold leading-[24px] tracking-normal text-[#16171D] mb-6 mt-3">
          Frequently Asked Questions
        </h2>

        <div className="overflow-hidden rounded-[16px] bg-white border border-[#EEF2FF]">
          <div className="h-1 bg-[#2E68FB]" />
          {FAQS.map((faq, index) => (
            <details
              key={index}
              open={index === 0}
              className={`group ${index !== FAQS.length - 1 ? 'border-b border-[#EEF2FF]' : ''}`}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between px-6 py-5 font-semibold text-[#16171D] group-open:text-[#2E68FB]">
                {faq.q}
                <ChevronRight className="h-5 w-5 transition group-open:rotate-90 text-[#2E68FB]" />
              </summary>
              <p className="px-6 pb-6 text-[14px] text-[#7C7C7C] leading-7">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
