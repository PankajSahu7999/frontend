'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  Sparkles,
  Info,
  Layers,
  HelpCircle,
  Award,
  ChevronRight,
  TrendingUp,
  Percent,
  Play,
  Flame,
  ArrowRight
} from 'lucide-react';

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

export default function GamesHubClient({ recommended }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="bg-[#FAFBFD] min-h-screen text-[#16171D]">
      {/* 1. HERO TOP BANNER WITH GAME IMAGE */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#002661] via-[#0047A5] to-[#1C73E8] text-white py-14 sm:py-20 px-4">
        {/* Background ambient lighting */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_60%)] pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-blue-400/20 blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="max-w-2xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs border border-white/20 text-white text-xs font-bold uppercase tracking-wider mb-4">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>Hot Casino Game Categories</span>
              </div>

              <h1 className="font-poppins text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                Casino Games Hub
              </h1>

              <p className="mt-4 text-sm sm:text-base text-blue-100 font-normal leading-relaxed max-w-xl">
                Explore the world's most popular online casino games, compare house edges and RTPs, practice in free-play demo mode, and find verified licensed operators to play for real money.
              </p>

              {/* Category Quick Chips */}
              <div className="mt-8 flex flex-wrap gap-2.5">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`#${cat.slug}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-white/15 hover:bg-white text-white hover:text-blue-900 border border-white/25 shadow-sm transition-all active:scale-95"
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Hero Visual Game Showcase Box */}
            <div className="w-full lg:w-96 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-5 shadow-2xl relative">
              <div className="flex items-center justify-between pb-3 border-b border-white/15 mb-4">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wide flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Featured Game
                </span>
                <span className="text-[11px] font-semibold text-blue-200">Real Dealer Studios</span>
              </div>

              <div className="relative h-44 rounded-xl overflow-hidden mb-4 border border-white/10 group">
                <img
                  src="https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=800&auto=format&fit=crop&q=80"
                  alt="Hockey Fever Roulette"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4">
                  <div>
                    <h4 className="font-bold text-white text-lg leading-tight">Hockey Fever Roulette</h4>
                    <p className="text-xs text-blue-200 mt-0.5">RTP: 97.3% • European Single Zero</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-blue-100 mb-4 px-1">
                <span>Volatility: <strong className="text-white">Medium</strong></span>
                <span>Limits: <strong className="text-white">€0.25 - €1,000</strong></span>
              </div>

              <Link
                href="/games/hockey-fever-roulette"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-900 text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
              >
                <span>Play Demo & Read Review</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* 2. AFFILIATE DISCLOSURE & AUTHOR */}
        <div className="rounded-2xl border border-blue-150 bg-blue-50/60 p-4 sm:p-5 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600/10 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
              <Info className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Affiliate Disclosure
              </h4>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                Our content contains affiliate links and we may make a commission on operator registrations and deposits made through these links. We only recommend licensed operators and we would not endorse any brand that is not verified by our experts. Get the truth. Then play.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 pl-0 sm:pl-4 sm:border-l border-blue-200/80 shrink-0">
            <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-xs overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt="Petar Mitrovic"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Lead Casino Analyst</span>
              <span className="text-xs font-bold text-slate-900">Petar Mitrovic</span>
            </div>
          </div>
        </div>

        {/* 3. RECOMMENDED THIS MONTH */}
        <section className="mb-14">
          <div className="flex items-center gap-2 mb-2">
            <div className="inline-flex rounded-full bg-[radial-gradient(circle_at_center,#B8CEFF_0%,#2E68FB_100%)] p-[1px]">
              <div className="flex items-center gap-1 rounded-full bg-[#E6EDFF] px-3.5 py-0.5">
                <Award className="w-3.5 h-3.5 text-[#2E68FB]" />
                <span className="font-poppins text-[10px] font-bold uppercase text-[#2E68FB]">
                  Editor's Picks
                </span>
              </div>
            </div>
          </div>

          <h2 className="font-poppins text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-8">
            Recommended This Month
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* ONLINE POKER BLOCK */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                  <h3 className="font-poppins text-lg font-bold text-slate-900 flex items-center gap-2">
                    <span>♠️</span> Online Poker
                  </h3>
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                    5 Top Picks
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  Poker is one of the most played casino games in the world, but online poker has only boosted its popularity. Peruse our poker selection and find out what makes this game so timeless.
                </p>

                <div className="space-y-2.5">
                  {recommended.poker.map((game) => (
                    <Link
                      key={game.id}
                      href={`/games/${game.slug}`}
                      className="group flex items-center justify-between p-2.5 rounded-xl border border-slate-150 hover:border-blue-300 bg-slate-50/60 hover:bg-blue-50/30 transition"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-700 text-xs">
                          🃏
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition">
                            {game.title}
                          </div>
                          <div className="text-[11px] text-slate-400">{game.provider}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {game.rtp && (
                          <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                            {game.rtp}
                          </span>
                        )}
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* ONLINE ROULETTE BLOCK */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                  <h3 className="font-poppins text-lg font-bold text-slate-900 flex items-center gap-2">
                    <span>🎡</span> Online Roulette
                  </h3>
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                    5 Top Picks
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  Roulette has been popular for hundreds of years; today you don't even have to leave your home to spin the wheel. Find your new favourite online roulette games right here.
                </p>

                <div className="space-y-2.5">
                  {recommended.roulette.map((game) => (
                    <Link
                      key={game.id}
                      href={`/games/${game.slug}`}
                      className="group flex items-center justify-between p-2.5 rounded-xl border border-slate-150 hover:border-blue-300 bg-slate-50/60 hover:bg-blue-50/30 transition"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-700 text-xs">
                          🎯
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition">
                            {game.title}
                          </div>
                          <div className="text-[11px] text-slate-400">{game.provider}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {game.rtp && (
                          <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                            {game.rtp}
                          </span>
                        )}
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* ONLINE BLACKJACK BLOCK */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                  <h3 className="font-poppins text-lg font-bold text-slate-900 flex items-center gap-2">
                    <span>♣️</span> Online Blackjack
                  </h3>
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                    5 Top Picks
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  Blackjack never goes out of style, and online blackjack only makes it more accessible. Is number 21 in the cards for you?
                </p>

                <div className="space-y-2.5">
                  {recommended.blackjack.map((game) => (
                    <Link
                      key={game.id}
                      href={`/games/${game.slug}`}
                      className="group flex items-center justify-between p-2.5 rounded-xl border border-slate-150 hover:border-blue-300 bg-slate-50/60 hover:bg-blue-50/30 transition"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-700 text-xs">
                          21
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition">
                            {game.title}
                          </div>
                          <div className="text-[11px] text-slate-400">{game.provider}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {game.rtp && (
                          <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                            {game.rtp}
                          </span>
                        )}
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* ONLINE CRAPS BLOCK */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                  <h3 className="font-poppins text-lg font-bold text-slate-900 flex items-center gap-2">
                    <span>🎲</span> Online Craps
                  </h3>
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                    5 Top Picks
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  Looking for a fast-paced game with plenty of betting options? Take a seat at an online craps table.
                </p>

                <div className="space-y-2.5">
                  {recommended.craps.map((game) => (
                    <Link
                      key={game.id}
                      href={`/games/${game.slug}`}
                      className="group flex items-center justify-between p-2.5 rounded-xl border border-slate-150 hover:border-blue-300 bg-slate-50/60 hover:bg-blue-50/30 transition"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-700 text-xs">
                          🎲
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition">
                            {game.title}
                          </div>
                          <div className="text-[11px] text-slate-400">{game.provider}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {game.rtp && (
                          <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                            {game.rtp}
                          </span>
                        )}
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. EDITORIAL & STRATEGY GUIDE + TABLE OF CONTENTS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Main Article Text */}
          <article className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-8 text-sm sm:text-base leading-relaxed text-slate-700">
            <div>
              <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed">
                Whether you’re into blackjack, poker, live casino games or slots, you can find the best online casino games here and play them at your favourite online casino. Learn all there is about different types of casino games, check their odds, see which games are popular among players and choose the ones that suit you.
              </p>
            </div>

            <section id="what-are-casino-games" className="pt-4 border-t border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-3">
                What Are Casino Games?
              </h2>
              <p className="mb-3">
                Casino games are games of luck you can play in offshore and online casinos. The games give players a chance to win money, which is one of the main reasons why people engage in the first place.
              </p>
              <p className="mb-3">
                Although casino games are primarily games of luck, there’s a dose of skill involved, especially in table and card games. Different playing strategies exist for each game, which players research to increase their chances of winning.
              </p>
              <p>
                In addition, casino games are entertaining, especially if you play them in land-based casinos, where the social factor is also involved for specific games. On the other hand, there’s a great variety of online casino games, especially online slots. People can join slot and poker tournaments or enjoy live dealer games from the comfort of their homes.
              </p>
            </section>

            <section id="how-do-games-work" className="pt-4 border-t border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-3">
                How Do Casino Games Work?
              </h2>
              <p className="mb-3">
                All casino games provide a long-term advantage to the casino often referred to as “house”, while the players have a possibility to score some wins, but they lose in the long run. You should differentiate between gaming machines, table games and random number games because the mechanics and dynamics of each game is different.
              </p>
              <p className="mb-3">
                Gaming machines are slots and pachinko games. Online slots come with the return-to-player percentage and volatility, which shows what you can expect. They are purely based on luck. On the other hand, table games have a dose of skill and players either compete against the casino or each other. As the name suggests, random number games are based on the selection of random numbers.
              </p>
              <p>
                Some games combine these mechanics and roulette is the perfect example. It involves random numbers, while there’s a skill and social element involved where players try to beat the house.
              </p>
            </section>

            <section id="different-types" className="pt-4 border-t border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-3">
                Different Types of Casino Games
              </h2>
              <p className="mb-4">
                There is a large number of casino games you can play both in land-based and online casinos. Some of the most common games include:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                {['Slots', 'Table games', 'Card games', 'Dice games', 'Lottery', 'Bingo'].map((item) => (
                  <div key={item} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <p>
                In each of these categories, you can find different types of games. When we’re talking about slots, you can find classic, modern, progressive jackpot games, megaways, bonus buys, etc. The same can be done for all other games, as there are numerous versions for every game.
              </p>
            </section>

            <section id="top-games" className="pt-4 border-t border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-3">
                Top Casino Games You Can Play Online
              </h2>
              <p className="mb-4">
                The online casino games list is a long one, and each may have their own top 10 casino games. Let’s talk about some of the popular choices players make when they join online casinos:
              </p>

              <div className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-150">
                  <h3 className="font-bold text-slate-900 text-base mb-1">Slot Machines</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    A slot machine is one of the most played casino games, featuring reels that spin. When you place a bet and spin the reels, symbols randomly land on them. Modern online slots rely on Random Number Generators (RNG) generating thousands of numbers per second to ensure mathematically fair stop outcomes.
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-150">
                  <h3 className="font-bold text-slate-900 text-base mb-1">Poker</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Fixed-odds five-card draw games and video poker are among the best casino video games. Unlike slots, players must employ skill and optimal strategy to play the hand they are dealt based on traditional poker rankings.
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-150">
                  <h3 className="font-bold text-slate-900 text-base mb-1">Blackjack</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Enjoying the reputation of the most popular casino game in the world, blackjack employs 52-card decks with an aim to hit 21. Blackjack has gained vast popularity due to having the lowest house edge (down to 0.5% with perfect basic strategy).
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-150">
                  <h3 className="font-bold text-slate-900 text-base mb-1">Roulette</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Players bet on numbered compartments of a revolving wheel. European roulette features a single zero (2.7% house edge), while American roulette features a 0 and 00 (5.26% house edge).
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-150">
                  <h3 className="font-bold text-slate-900 text-base mb-1">Baccarat</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Simple two-party card-comparison game between the player and the banker. The low house edge on Banker bets (approx. 1.06%) makes it a high-roller staple worldwide.
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-150">
                  <h3 className="font-bold text-slate-900 text-base mb-1">Craps, Keno & Bingo</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Craps delivers high-energy dice betting action with Pass Line bets boasting high win rates, while lottery variations like Keno and Bingo provide thrilling number drawing entertainment.
                  </p>
                </div>
              </div>
            </section>

            <section id="winning-potential" className="pt-4 border-t border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-3">
                Casino Games With the Best Winning Potential
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200">
                  <h4 className="font-bold text-emerald-900 text-sm mb-1">Games With the Best Odds</h4>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    Blackjack has the best mathematical odds (~42% win, ~49% loss, ~9% tie, with a house edge as low as 0.5%). Baccarat Banker bets also maintain a low house edge of 1.06%.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200">
                  <h4 className="font-bold text-rose-900 text-sm mb-1">Games With the Worst Odds</h4>
                  <p className="text-xs text-rose-800 leading-relaxed">
                    Keno and national lottery games come with high house edges (often exceeding 20-30%). Guessing exact numbers is statistically harder, though jackpots can be life-changing.
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>Highest Win Rate:</strong> Video poker, blackjack and baccarat exceed 98% RTP. Top slots include <em>Mega Joker (99%)</em>, <em>Blood Suckers (98%)</em>, and <em>Ultra Stack Feature Rose (97.93%)</em>.
              </p>
            </section>

            <section id="strategy-vs-luck" className="pt-4 border-t border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-3">
                Strategy-Based vs. Luck-Based Casino Games
              </h2>
              <p className="mb-3">
                Before we head further, we have to say that all casino games are luck-based. However, there’s a clear division between games that use strategy and games which are purely based on luck.
              </p>
              <p>
                Casino games using strategy are mostly card games such as blackjack and poker. By utilising the right strategy, you can increase your chances of winning and walk out of the casino profitable. That is why games such as slots and roulette are always popular—you can enjoy them without having to worry too much about complex charts.
              </p>
            </section>

            <section id="free-vs-real" className="pt-4 border-t border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-3">
                Free vs. Real Money Casino Games
              </h2>
              <p className="mb-3">
                The only difference between free vs. real money casino games is in the deposit. With free games, you can enjoy the game without the stress of potentially losing your money. Free games are completely risk-free and you can play them to test mechanics and volatility.
              </p>
              <p>
                However, depositing money to a casino to play the best casino games online adds another layer of excitement. It’s the potential of winning real cash or triggering a bonus round that keeps players engaged.
              </p>
            </section>

            <section id="providers" className="pt-4 border-t border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-3">
                Casino Game Providers and Software
              </h2>
              <p className="mb-3">
                All the casino games you can play online come from software companies that specialise in creating games for gambling websites. Top software giants include <strong>NetEnt</strong>, <strong>Games Global</strong>, <strong>Pragmatic Play</strong>, <strong>Betsoft</strong>, <strong>Evolution Gaming</strong>, and <strong>Real Dealer Studios</strong>.
              </p>
              <p>
                All game suppliers must ensure certified fairness by submitting their RNG algorithms to independent testing laboratories such as <strong>eCOGRA</strong>, <strong>iTech Labs</strong>, and <strong>BMM Testlabs</strong>.
              </p>
            </section>
          </article>

          {/* Sticky Table of Contents Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-600" />
                Table of Contents
              </h3>

              <nav className="space-y-2 text-xs font-semibold text-slate-600">
                {[
                  { id: 'what-are-casino-games', title: 'What Are Casino Games?' },
                  { id: 'how-do-games-work', title: 'How Do Casino Games Work?' },
                  { id: 'different-types', title: 'Different Types of Casino Games' },
                  { id: 'top-games', title: 'Top Casino Games You Can Play Online' },
                  { id: 'winning-potential', title: 'Casino Games With Best Winning Potential' },
                  { id: 'strategy-vs-luck', title: 'Strategy-Based vs. Luck-Based Games' },
                  { id: 'free-vs-real', title: 'Free vs. Real Money Casino Games' },
                  { id: 'providers', title: 'Casino Game Providers and Software' },
                  { id: 'faqs', title: 'Frequently Asked Questions (FAQ)' },
                ].map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block py-1.5 px-2.5 rounded-lg hover:bg-slate-100 hover:text-blue-600 transition"
                  >
                    {item.title}
                  </a>
                ))}
              </nav>

              {/* Quick Helper Box */}
              <div className="mt-6 pt-5 border-t border-slate-150">
                <div className="rounded-xl bg-blue-50/70 p-3.5 border border-blue-150">
                  <span className="text-[11px] font-bold text-blue-900 block mb-1">Looking for a specific game?</span>
                  <p className="text-[11px] text-blue-700 leading-relaxed mb-3">
                    Check out individual game reviews for RTP breakdowns, betting limits, and free demo launchers.
                  </p>
                  <Link
                    href="/games/hockey-fever-roulette"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:underline"
                  >
                    <span>View Hockey Fever Roulette</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* 5. FAQ SECTION */}
        <section id="faqs" className="mb-14">
          <div className="flex items-center gap-2 mb-2">
            <div className="inline-flex rounded-full bg-[radial-gradient(circle_at_center,#B8CEFF_0%,#2E68FB_100%)] p-[1px]">
              <div className="flex items-center gap-1 rounded-full bg-[#E6EDFF] px-3.5 py-0.5">
                <HelpCircle className="w-3.5 h-3.5 text-[#2E68FB]" />
                <span className="font-poppins text-[10px] font-bold uppercase text-[#2E68FB]">
                  Common Questions
                </span>
              </div>
            </div>
          </div>

          <h2 className="font-poppins text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-6">
            Frequently Asked Questions
          </h2>

          <div className="space-y-3 max-w-4xl">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs transition"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-blue-600 transition"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-blue-600' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-4 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
