'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Play,
  ExternalLink,
  ShieldCheck,
  Star,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  Layers,
  Sparkles,
  Info,
  Calendar,
  Gamepad2,
  ChevronRight,
  Maximize2,
  X
} from 'lucide-react';

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

const DEFAULT_WHERE_TO_PLAY = [
  { name: 'Campeonbet Casino', slug: 'campeonbet-casino', rating: 4.8, bonus: '140% up to €1,500' },
  { name: 'Winz.io Casino', slug: 'winz-io-casino', rating: 4.9, bonus: 'Up to 300 Free Spins' },
  { name: 'Winnerz Casino', slug: 'winnerz-casino', rating: 4.7, bonus: '350 Free Spins Welcome Package' },
  { name: 'TonyBet Casino', slug: 'tonybet-casino', rating: 4.8, bonus: '100% up to €120 + 120 FS' },
  { name: 'HellSpin Casino', slug: 'hellspin-casino', rating: 4.8, bonus: '100% up to €100 + 100 FS' },
  { name: 'Ivibet Casino', slug: 'ivibet-casino', rating: 4.7, bonus: '100% up to €150 + 120 FS' },
  { name: 'Slotbox Casino', slug: 'slotbox-casino', rating: 4.6, bonus: '100% up to €1,000 + 100 FS' },
  { name: 'Chanz Casino', slug: 'chanz-casino', rating: 4.7, bonus: '100% up to €100 + 300 FS' },
  { name: 'Coolbet Casino', slug: 'coolbet-casino', rating: 4.9, bonus: '100% up to €500 or 500 FS' },
  { name: 'bet365 Casino', slug: 'bet365-casino', rating: 4.9, bonus: '50 Free Spins on 1st Deposit' },
];

export default function GameDetailClient({ game, sponsoredSlots = DEFAULT_SPONSORED_SLOTS, topCasinos = DEFAULT_WHERE_TO_PLAY }: GameProps) {
  const [demoOpen, setDemoOpen] = useState(false);

  const realAffiliateUrl = game.affiliate_url || 'https://campeonbet.com/?aff=crb';
  const heroImage = game.hero_banner || game.thumbnail || 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=1600&auto=format&fit=crop&q=80';

  const specs = [
    { label: 'Game Type', value: game.game_type || 'Roulette' },
    { label: 'Game Provider', value: game.provider || 'Real Dealer Studios' },
    { label: 'RTP', value: game.rtp || '97.3%' },
    { label: 'Autoplay Option', value: game.autoplay !== false ? 'Yes' : 'No' },
    { label: 'Multiplier', value: game.multiplier !== false ? 'Yes' : 'No' },
    { label: 'Release Date', value: game.release_date ? new Date(game.release_date).toISOString().split('T')[0] : '2023-04-12' },
    { label: 'Volatility', value: game.volatility || 'Medium' },
    { label: 'Minimum bet amount', value: game.min_bet !== null ? `${game.min_bet}` : '0.25' },
    { label: 'Maximum bet amount', value: game.max_bet !== null ? `${game.max_bet}` : '1000' },
    { label: 'In-Game Interaction', value: game.in_game_interaction ? 'Yes' : 'No' },
    { label: 'Player Customisation', value: game.player_customisation !== false ? 'Yes' : 'No' },
    { label: 'Rebet Option', value: game.rebet !== false ? 'Yes' : 'No' },
    { label: 'Side Bet', value: game.side_bet !== false ? 'Yes' : 'No' },
    { label: 'Undo Option', value: game.undo !== false ? 'Yes' : 'No' },
    { label: 'Game History', value: game.game_history !== false ? 'Yes' : 'No' },
    { label: 'Bonus Features', value: game.bonus_features !== false ? 'Yes' : 'No' },
  ];

  return (
    <div className="bg-[#FAFBFD] min-h-screen text-[#16171D]">
      {/* 1. HERO TOP BANNER WITH GAME IMAGE */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#071739] via-[#0B2559] to-[#124285] text-white py-12 sm:py-16 px-4">
        {/* Background ambient texture */}
        <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay">
          <img src={heroImage} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-blue-200 mb-6">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <span>/</span>
            <Link href="/games" className="hover:text-white transition">Casino Games</Link>
            <span>/</span>
            <span className="text-white font-medium">{game.title}</span>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-white/15">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/30 text-blue-200 border border-blue-400/30">
                  {game.game_type || 'Online Game'}
                </span>
                <span className="text-xs text-blue-200">by <strong className="text-white">{game.provider || 'Real Dealer Studios'}</strong></span>
              </div>
              <h1 className="font-poppins text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                {game.title}
              </h1>
            </div>

            {/* Play Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
              <button
                type="button"
                onClick={() => setDemoOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-white/15 hover:bg-white/25 border border-white/30 text-white backdrop-blur-xs transition active:scale-95 shadow-sm"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Play for fun</span>
              </button>

              <div className="flex flex-col items-center">
                <a
                  href={realAffiliateUrl}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm bg-[#0070EB] hover:bg-[#005ec7] text-white shadow-lg shadow-blue-500/30 transition active:scale-95"
                >
                  <span>Play for real</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
                <span className="text-[10px] text-blue-200 mt-1 cursor-pointer hover:underline">
                  T&Cs Apply
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* 2. PLAYER REVIEWS NOTICE */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
          <div>
            <h3 className="font-poppins text-base font-bold text-slate-900 flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              Latest player review
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              There are no player reviews for this game yet. Be the first to share your thoughts with the community!
            </p>
          </div>
          <button
            type="button"
            onClick={() => alert('Review submission form will open shortly.')}
            className="px-4 py-2 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 rounded-xl hover:bg-blue-100 transition shrink-0"
          >
            Leave a Review
          </button>
        </div>

        {/* 3. SPONSORED SLOTS CAROUSEL */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-[11px] font-bold text-purple-600 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Sponsored Slots
              </span>
              <h3 className="font-poppins text-xl font-bold text-slate-900 mt-0.5">
                Looking for something fresh? Check out our partners' hottest slots
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
            {sponsoredSlots.map((slot, idx) => (
              <Link
                key={idx}
                href={`/games/${slot.slug || 'hockey-fever-roulette'}`}
                className="group bg-white rounded-2xl p-3 border border-slate-200 shadow-xs hover:shadow-md hover:border-purple-300 transition flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-28 rounded-xl overflow-hidden mb-2.5 bg-slate-100">
                    <img
                      src={slot.image || 'https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=400&auto=format&fit=crop&q=80'}
                      alt={slot.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-black/60 backdrop-blur-xs text-white">
                      {slot.tag || 'Video slots'}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 font-medium">{slot.provider}</div>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition line-clamp-2 mt-0.5">
                    {slot.title}
                  </h4>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] font-bold text-blue-600 flex items-center justify-between">
                  <span>Play Slot</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 4. MAIN CONTENT & DETAILS SPECIFICATION GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14">
          {/* Main Review Text */}
          <article className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-8 text-sm sm:text-base leading-relaxed text-slate-700">
            {/* Author Byline */}
            <div className="flex items-center justify-between pb-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-blue-100 overflow-hidden border border-slate-200">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                    alt={game.author_name || 'Bojan Jovanovic'}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 block uppercase">Written By</span>
                  <span className="font-bold text-slate-900 text-sm">{game.author_name || 'Bojan Jovanovic'}</span>
                </div>
              </div>
              <span className="text-xs text-slate-400">Verified Casino Review</span>
            </div>

            {/* Overview */}
            <section id="overview">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                {game.title} by {game.provider || 'Real Dealer Studios'} Overview
              </h2>
              <div className="space-y-4 leading-relaxed">
                <p>
                  {game.title} is an online roulette made by {game.provider || 'Real Dealer Studios'}, whose games are distributed through Games Global, one of the biggest software providers.
                </p>
                <p>
                  Unlike other similar casino table games, {game.title} comes with cool features. You can switch between a betboard and a racetrack where you’ll find popular roulette bets such as Orphelins, Tiers and Voisins.
                </p>
                <p>
                  Additionally, players can click on special bets and opt for a Zero Game, 007, Snake, Red Splits, Black Splits and various other versions. After you play a round you can always rebet and don’t have to click anything individually.
                </p>
                <p>
                  When you spin the roulette wheel, this is where the magic happens. You are transferred to a “real” roulette table where you can watch the ball as it lands on your selected numbers. Speaking of which, the roulette wheel in {game.title} comes with one 0 only. During the spinning of the wheel, the dealer is announcing the numbers and the outcome, which gives the game another dimension.
                </p>
                <p>
                  Although you’re playing {game.provider || 'Real Dealer Studios'}’ game at online casinos there’s a real element to it in one part of the game. So, you don’t have to search for roulette in live casinos.
                </p>
              </div>
            </section>

            {/* RTP and Limits */}
            <section id="rtp-limits" className="pt-6 border-t border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-3">
                RTP and Table Limits
              </h2>
              <p>
                Like other high-tier European roulette games, {game.title} comes with an RTP of <strong>{game.rtp || '97.30%'}</strong>. The volatility of the game is <strong>{game.volatility || 'Medium'}</strong>, while bet limits accommodate both casual players and high rollers, ranging from <strong>€{game.min_bet ?? '0.25'}</strong> to <strong>€{game.max_bet ?? '1,000'}</strong> per round.
              </p>
            </section>

            {/* Pros and Cons */}
            <section id="pros-cons" className="pt-6 border-t border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Pros and Cons of {game.title}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* PROS */}
                <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-5">
                  <h3 className="font-bold text-emerald-900 text-sm mb-3 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Pros
                  </h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-emerald-950">
                    {game.pros?.length > 0 ? (
                      game.pros.map((pro: string, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-emerald-600 font-bold">✓</span>
                          <span>{pro}</span>
                        </li>
                      ))
                    ) : (
                      <>
                        <li className="flex items-start gap-2"><span>✓</span><span>Live cinematic dealer footage</span></li>
                        <li className="flex items-start gap-2"><span>✓</span><span>Switch between betboard and racetrack</span></li>
                        <li className="flex items-start gap-2"><span>✓</span><span>Favourite and special bets (Voisins, Orphelins)</span></li>
                        <li className="flex items-start gap-2"><span>✓</span><span>Convenient rebet feature</span></li>
                      </>
                    )}
                  </ul>
                </div>

                {/* CONS */}
                <div className="rounded-xl border border-rose-200 bg-rose-50/50 p-5">
                  <h3 className="font-bold text-rose-900 text-sm mb-3 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-rose-600" />
                    Cons
                  </h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-rose-950">
                    {game.cons?.length > 0 ? (
                      game.cons.map((con: string, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-rose-600 font-bold">✕</span>
                          <span>{con}</span>
                        </li>
                      ))
                    ) : (
                      <li className="flex items-start gap-2">
                        <span>✕</span>
                        <span>Looks a bit outdated when placing bets</span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </section>
          </article>

          {/* Sidebar Specifications Matrix */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Table of Specifications */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
              <h3 className="font-bold text-slate-900 text-base mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <Gamepad2 className="w-5 h-5 text-blue-600" />
                {game.title} Details
              </h3>

              <div className="divide-y divide-slate-100 text-xs">
                {specs.map((item, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between">
                    <span className="text-slate-500 font-medium">{item.label}</span>
                    <span className="font-bold text-slate-900 text-right">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Table of Contents */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Contents
              </h4>
              <nav className="space-y-2 text-xs font-semibold text-slate-700">
                <a href="#overview" className="block hover:text-blue-600 transition">
                  • Overview
                </a>
                <a href="#rtp-limits" className="block hover:text-blue-600 transition">
                  • RTP and Table Limits
                </a>
                <a href="#pros-cons" className="block hover:text-blue-600 transition">
                  • Pros and Cons
                </a>
                <a href="#where-to-play" className="block hover:text-blue-600 transition">
                  • Where to Play {game.provider || 'Real Dealer Studios'} Games
                </a>
              </nav>
            </div>
          </aside>
        </div>

        {/* 5. WHERE TO PLAY CASINOS */}
        <section id="where-to-play" className="mb-14">
          <div className="mb-6">
            <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">
              Recommended Operators
            </span>
            <h2 className="font-poppins text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-1">
              Where to Play {game.provider || 'Real Dealer Studios'}’ {game.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
              Check if the casinos are operating in your jurisdiction and make sure to see the CasinoRank as well as read our review.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topCasinos.map((casino, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs hover:shadow-md transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-bold flex items-center justify-center text-sm shadow-xs shrink-0">
                    {casino.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm sm:text-base leading-tight">
                      {casino.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="flex items-center text-xs font-bold text-amber-500">
                        ★ {casino.rating}
                      </span>
                      <span className="text-xs text-slate-400">•</span>
                      <span className="text-xs text-emerald-600 font-semibold">{casino.bonus}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                  <Link
                    href={`/casino/${casino.slug}`}
                    className="px-3 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
                  >
                    Read review
                  </Link>
                  <a
                    href={realAffiliateUrl}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition"
                  >
                    Play
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* 6. PLAY FOR FUN DEMO MODAL */}
      {demoOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-slate-900 rounded-2xl w-full max-w-4xl overflow-hidden border border-slate-700 shadow-2xl flex flex-col h-[85vh]">
            {/* Modal Header */}
            <div className="p-4 bg-slate-800 border-b border-slate-700 flex items-center justify-between">
              <div>
                <span className="text-xs text-blue-400 font-semibold uppercase">Free Demo Mode</span>
                <h3 className="text-base font-bold text-white">{game.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setDemoOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700 transition"
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
                  <Gamepad2 className="w-16 h-16 text-blue-500 mx-auto mb-3 animate-pulse" />
                  <h4 className="text-lg font-bold text-white mb-1">Interactive Free Demo Loading</h4>
                  <p className="text-xs text-slate-400 max-w-md mx-auto mb-6">
                    Connect directly to the certified demo sandbox for {game.title} by {game.provider}.
                  </p>
                  <a
                    href={realAffiliateUrl}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition"
                  >
                    <span>Play For Real Money Instead</span>
                    <ExternalLink className="w-3.5 h-3.5" />
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
