'use client';

// import React, { useState, useMemo } from 'react';
// import Link from 'next/link';
// import {
//   TrendingUp,
//   Percent,
//   Wallet,
//   Gift,
//   ShieldCheck,
//   AlertTriangle,
//   Brain,
//   CheckCircle2,
//   HelpCircle,
//   ChevronDown,
//   Calculator,
//   Search,
//   Filter,
//   Flame,
//   Award,
//   Layers,
//   Sparkles,
//   ArrowRight,
//   Check,
// } from 'lucide-react';

// // --- Types & Data ---
// interface SlotGame {
//   name: string;
//   provider: string;
//   rtp: number;
//   volatility: 'Low' | 'Medium' | 'High';
//   maxWin: string;
//   badge?: string;
// }

// const HIGH_RTP_SLOTS: SlotGame[] = [
//   { name: 'Mega Joker', provider: 'NetEnt', rtp: 99.0, volatility: 'High', maxWin: '2,000x', badge: 'Highest RTP' },
//   { name: '1429 Uncharted Seas', provider: 'Thunderkick', rtp: 98.6, volatility: 'Low', maxWin: '670x' },
//   { name: 'Blood Suckers', provider: 'NetEnt', rtp: 98.0, volatility: 'Low', maxWin: '1,014x', badge: 'Bonus Favorite' },
//   { name: 'Jokerizer', provider: 'Yggdrasil', rtp: 98.0, volatility: 'High', maxWin: '6,000x' },
//   { name: 'Starmania', provider: 'NextGen', rtp: 97.87, volatility: 'Low', maxWin: '500x' },
//   { name: 'White Rabbit Megaways', provider: 'Big Time Gaming', rtp: 97.77, volatility: 'High', maxWin: '17,420x', badge: 'Feature Buy' },
//   { name: 'Zeus Lightning Power Reels', provider: 'Red Tiger', rtp: 97.73, volatility: 'High', maxWin: '4,500x' },
// ];

// export default function HowToWinClient() {
//   // 1. Bankroll Calculator State
//   const [bankroll, setBankroll] = useState<number>(200);
//   const [riskTolerance, setRiskTolerance] = useState<'low' | 'medium' | 'high'>('medium');

//   // 2. Slot Filter State
//   const [searchQuery, setSearchQuery] = useState<string>('');
//   const [volatilityFilter, setVolatilityFilter] = useState<string>('All');

//   // 3. Interactive Checklist State
//   const [checkedSteps, setCheckedSteps] = useState<Record<number, boolean>>({});

//   // 4. Tabbed Table Game Guide State
//   const [activeGameTab, setActiveGameTab] = useState<'blackjack' | 'baccarat' | 'roulette' | 'craps'>('blackjack');

//   // 5. FAQ Accordion State
//   const [openFaq, setOpenFaq] = useState<number | null>(null);

//   // Dynamic Bankroll Calculations
//   const calculatedMetrics = useMemo(() => {
//     let betPercentage = 0.02; // Default Medium
//     let stopLossPct = 0.5;
//     let takeProfitPct = 1.5;

//     if (riskTolerance === 'low') {
//       betPercentage = 0.01;
//       stopLossPct = 0.3;
//       takeProfitPct = 1.25;
//     } else if (riskTolerance === 'high') {
//       betPercentage = 0.05;
//       stopLossPct = 0.7;
//       takeProfitPct = 2.0;
//     }

//     const recommendedBet = Math.max(1, Math.floor(bankroll * betPercentage));
//     const maxLoss = Math.floor(bankroll * stopLossPct);
//     const targetCashout = Math.floor(bankroll * takeProfitPct);
//     const totalSpinsHands = Math.floor(bankroll / recommendedBet);

//     return { recommendedBet, maxLoss, targetCashout, totalSpinsHands };
//   }, [bankroll, riskTolerance]);

//   // Filtered Slot List
//   const filteredSlots = useMemo(() => {
//     return HIGH_RTP_SLOTS.filter((slot) => {
//       classNameMatches: {
//         const matchesSearch = slot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                               slot.provider.toLowerCase().includes(searchQuery.toLowerCase());
//         const matchesVol = volatilityFilter === 'All' || slot.volatility === volatilityFilter;
//         return matchesSearch && matchesVol;
//       }
//     });
//   }, [searchQuery, volatilityFilter]);

//   const toggleCheck = (id: number) => {
//     setCheckedSteps((prev) => ({ ...prev, [id]: !prev[id] }));
//   };

//   const checklistItems = [
//     { id: 1, title: 'Check Casino License & Auditing', desc: 'Ensure the site is regulated by eCOGRA, MGA, or UKGC for verified RNG randomness.' },
//     { id: 2, title: 'Verify Game RTP above 96.5%', desc: 'Check the game info tab before playing to ensure the casino hasn\'t reduced default RTP.' },
//     { id: 3, title: 'Set Stop-Loss and Take-Profit Limits', desc: 'Decide exact numbers before your first bet and stick to them strictly.' },
//     { id: 4, title: 'Read Bonus Wagering Terms', desc: 'Avoid bonuses with wagering over 40x or max-cashout caps on deposit funds.' },
//   ];

//   const faqs = [
//     {
//       q: 'Is there a guaranteed trick to beat online casinos?',
//       a: 'No. All regulated casino games rely on Random Number Generators (RNGs) or house edges that guarantee the casino an advantage in the long run. Anyone selling a "100% winning system" is attempting a scam.',
//     },
//     {
//       q: 'Which online casino games offer the best odds of winning?',
//       a: 'Blackjack (with basic strategy) offers a low house edge around 0.5%. European/French Roulette (~2.7% edge) and Baccarat banker bets (~1.06% edge) offer significantly better odds than most slot machines.',
//     },
//     {
//       q: 'What is RTP and why is it important?',
//       a: 'RTP stands for Return to Player. It indicates the theoretical percentage of wagered money a game pays back over millions of spins/hands. Choosing games with 96%+ RTP improves your statistical longevity.',
//     },
//     {
//       q: 'How do casino bonuses help you win?',
//       a: 'Bonuses boost your initial bankroll, allowing more playtime and opportunities to hit a payout. However, always check wagering requirements and max bet limits before claiming.',
//     },
//   ];

//   return (
//     <main className="min-h-screen ">
//       {/* ================= 1. HERO SECTION ================= */}
//       <section
//         className="relative overflow-hidden border-b border-blue-100/60 pt-20 pb-16 lg:pt-28 lg:pb-20"
//         style={{
//           backgroundColor: '#EEF3FE',
//           backgroundImage:
//             'radial-gradient(circle at 50% 30%, #EFF6FF 0%, #E0E7FF 40%, #F0F5FE 75%, #EEF3FE 100%)',
//         }}
//       >
//         <div className=" relative z-10">
//           <div className="text-center max-w-3xl mx-auto space-y-4">
//             <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-blue-200/80 shadow-xs text-xs font-bold tracking-wider uppercase text-[#2E68FB]">
//               <TrendingUp className="w-4 h-4 text-[#2E68FB]" />
//               Smart Player Strategy Guide
//             </div>

//             <h1 className="text-4xl sm:text-5xl font-black text-[#0F172A] tracking-tight">
//               How to Win at Online Casinos <br />
//               <span className="text-[#2E68FB]">Odds, RTP & Smart Strategies</span>
//             </h1>

//             <p className="text-base sm:text-lg text-[#475569] leading-relaxed font-normal">
//               Master the math, calculate your bankroll, and use high-RTP selections to minimize the house edge and optimize every session.
//             </p>

//             <div className="pt-4 flex flex-wrap justify-center gap-6 text-xs font-semibold text-[#475569]">
//               <span className="flex items-center gap-1.5">
//                 <CheckCircle2 className="w-4 h-4 text-[#00B67A]" /> Mathematically Verified
//               </span>
//               <span className="flex items-center gap-1.5">
//                 <Percent className="w-4 h-4 text-[#2E68FB]" /> High RTP Game Database
//               </span>
//               <span className="flex items-center gap-1.5">
//                 <Calculator className="w-4 h-4 text-purple-600" /> Interactive Bet Sizer
//               </span>
//             </div>
//           </div>
//         </div>
//       </section>

      

//       {/* ================= 3. INTERACTIVE BANKROLL CALCULATOR ================= */}
//       <section className="py-0">
//         <div className="bg-white border border-gray-200/90 rounded-3xl p-6 sm:p-10 shadow-xs">
//           <div className="flex items-center gap-3 mb-6">
//             <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
//               <Calculator className="w-5 h-5" />
//             </div>
//             <div>
//               <h2 className="text-2xl font-bold text-[#0F172A]">Interactive Bankroll & Bet Sizer</h2>
//               <p className="text-xs text-[#64748B]">Calculate safe bet sizes and target limits based on your session budget.</p>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
//             {/* Inputs */}
//             <div className="lg:col-span-6 space-y-6 bg-[#F8FAFC] p-6 rounded-2xl border border-gray-200/80">
//               <div>
//                 <div className="flex justify-between items-center mb-2">
//                   <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">Total Session Bankroll</label>
//                   <span className="text-lg font-extrabold text-[#2E68FB]">${bankroll}</span>
//                 </div>
//                 <input
//                   type="range"
//                   min="20"
//                   max="2000"
//                   step="10"
//                   value={bankroll}
//                   onChange={(e) => setBankroll(Number(e.target.value))}
//                   className="w-full accent-[#2E68FB] cursor-pointer"
//                 />
//               </div>

//               <div>
//                 <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider block mb-2">Risk Strategy</label>
//                 <div className="grid grid-cols-3 gap-3">
//                   {(['low', 'medium', 'high'] as const).map((mode) => (
//                     <button
//                       key={mode}
//                       onClick={() => setRiskTolerance(mode)}
//                       className={`py-2 px-3 rounded-xl text-xs font-bold capitalize transition ${
//                         riskTolerance === mode
//                           ? 'bg-[#2E68FB] text-white shadow-xs'
//                           : 'bg-white border border-gray-200 text-[#475569] hover:bg-gray-50'
//                       }`}
//                     >
//                       {mode} Risk
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Dynamic Results Grid */}
//             <div className="lg:col-span-6 grid grid-cols-2 gap-4">
//               <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100">
//                 <span className="text-xs font-semibold text-[#475569] block mb-1">Optimal Bet / Spin</span>
//                 <span className="text-2xl font-black text-[#2E68FB]">${calculatedMetrics.recommendedBet}</span>
//                 <span className="text-[11px] text-[#64748B] block mt-1">
//                   ({riskTolerance === 'low' ? '1%' : riskTolerance === 'medium' ? '2%' : '5%'} of total budget)
//                 </span>
//               </div>

//               <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100">
//                 <span className="text-xs font-semibold text-[#475569] block mb-1">Take-Profit Target</span>
//                 <span className="text-2xl font-black text-[#00B67A]">${calculatedMetrics.targetCashout}</span>
//                 <span className="text-[11px] text-[#64748B] block mt-1">Walk away if reached</span>
//               </div>

//               <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100">
//                 <span className="text-xs font-semibold text-[#475569] block mb-1">Strict Stop-Loss Limit</span>
//                 <span className="text-2xl font-black text-rose-600">${calculatedMetrics.maxLoss}</span>
//                 <span className="text-[11px] text-[#64748B] block mt-1">Max session loss limit</span>
//               </div>

//               <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100">
//                 <span className="text-xs font-semibold text-[#475569] block mb-1">Total Play Rounds</span>
//                 <span className="text-2xl font-black text-purple-700">~{calculatedMetrics.totalSpinsHands}</span>
//                 <span className="text-[11px] text-[#64748B] block mt-1">Spins or hands buffer</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ================= 4. TABBED TABLE GAME GUIDES ================= */}
//       <section className="py-10 ">
//         <div className="text-center max-w-3xl mx-auto mb-10">
//           <span className="text-xs font-bold uppercase tracking-wider text-[#2E68FB] mb-2 block">
//             Optimal Game Playbooks
//           </span>
//           <h2 className="text-3xl font-bold text-[#0F172A]">Game-by-Game Strategy Breakdown</h2>
//         </div>

//         {/* Tabs */}
//         <div className="flex justify-center gap-2 mb-8 overflow-x-auto pb-2">
//           {(['blackjack', 'baccarat', 'roulette', 'craps'] as const).map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveGameTab(tab)}
//               className={`px-5 py-2.5 rounded-xl text-xs font-bold capitalize transition ${
//                 activeGameTab === tab
//                   ? 'bg-[#0F172A] text-white shadow-md'
//                   : 'bg-white border border-gray-200 text-[#475569] hover:bg-gray-50'
//               }`}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>

//         {/* Tab Content Box */}
//         <div className="bg-white border border-gray-200/90 rounded-3xl p-6 sm:p-10 shadow-xs">
//           {activeGameTab === 'blackjack' && (
//             <div className="space-y-4">
//               <div className="flex items-center justify-between flex-wrap gap-2">
//                 <h3 className="text-xl font-bold text-[#0F172A]">Blackjack Optimization (House Edge: ~0.5%)</h3>
//                 <span className="px-3 py-1 rounded-full bg-emerald-50 text-[#00B67A] border border-emerald-200 font-bold text-xs">Lowest Edge</span>
//               </div>
//               <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
//                 Blackjack offers the best mathematical returns when paired with strict Basic Strategy charts.
//               </p>
//               <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs text-[#0F172A]">
//                 <li className="flex items-center gap-2 p-3 rounded-xl bg-[#F8FAFC] border border-gray-200/80">
//                   <Check className="w-4 h-4 text-[#00B67A]" /> Always Split Aces and 8s. Never split 10s or 5s.
//                 </li>
//                 <li className="flex items-center gap-2 p-3 rounded-xl bg-[#F8FAFC] border border-gray-200/80">
//                   <Check className="w-4 h-4 text-[#00B67A]" /> Double Down on 11 if dealer shows 2 through 10.
//                 </li>
//                 <li className="flex items-center gap-2 p-3 rounded-xl bg-[#F8FAFC] border border-gray-200/80">
//                   <Check className="w-4 h-4 text-[#00B67A]" /> Avoid Insurance Bets—statistically a negative EV wager.
//                 </li>
//                 <li className="flex items-center gap-2 p-3 rounded-xl bg-[#F8FAFC] border border-gray-200/80">
//                   <Check className="w-4 h-4 text-[#00B67A]" /> Prefer 3:2 payout tables over 6:5 tables.
//                 </li>
//               </ul>
//             </div>
//           )}

//           {activeGameTab === 'baccarat' && (
//             <div className="space-y-4">
//               <div className="flex items-center justify-between flex-wrap gap-2">
//                 <h3 className="text-xl font-bold text-[#0F172A]">Baccarat Strategy (House Edge: ~1.06%)</h3>
//                 <span className="px-3 py-1 rounded-full bg-emerald-50 text-[#00B67A] border border-emerald-200 font-bold text-xs">High Consistency</span>
//               </div>
//               <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
//                 Baccarat requires zero skill execution during gameplay, making it perfect for simple, low-variance betting.
//               </p>
//               <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs text-[#0F172A]">
//                 <li className="flex items-center gap-2 p-3 rounded-xl bg-[#F8FAFC] border border-gray-200/80">
//                   <Check className="w-4 h-4 text-[#00B67A]" /> Always Bet on the Banker (1.06% edge vs 1.24% Player).
//                 </li>
//                 <li className="flex items-center gap-2 p-3 rounded-xl bg-[#F8FAFC] border border-gray-200/80">
//                   <Check className="w-4 h-4 text-[#00B67A]" /> Completely Ignore the "Tie" Bet (14.36% massive house edge).
//                 </li>
//               </ul>
//             </div>
//           )}

//           {activeGameTab === 'roulette' && (
//             <div className="space-y-4">
//               <div className="flex items-center justify-between flex-wrap gap-2">
//                 <h3 className="text-xl font-bold text-[#0F172A]">Roulette Strategy (House Edge: 1.35% – 2.70%)</h3>
//                 <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-200 font-bold text-xs">Table Favorite</span>
//               </div>
//               <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
//                 Wheel variant selection matters more than any progression system like Martingale.
//               </p>
//               <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs text-[#0F172A]">
//                 <li className="flex items-center gap-2 p-3 rounded-xl bg-[#F8FAFC] border border-gray-200/80">
//                   <Check className="w-4 h-4 text-[#00B67A]" /> Play French Roulette with "La Partage" (1.35% house edge).
//                 </li>
//                 <li className="flex items-center gap-2 p-3 rounded-xl bg-[#F8FAFC] border border-gray-200/80">
//                   <Check className="w-4 h-4 text-[#00B67A]" /> Avoid American Roulette (5.26% edge due to Double Zero).
//                 </li>
//               </ul>
//             </div>
//           )}

//           {activeGameTab === 'craps' && (
//             <div className="space-y-4">
//               <div className="flex items-center justify-between flex-wrap gap-2">
//                 <h3 className="text-xl font-bold text-[#0F172A]">Craps Strategy (House Edge: Down to 0.00% on Odds)</h3>
//                 <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-600 border border-purple-200 font-bold text-xs">Best Zero-Edge Odds</span>
//               </div>
//               <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
//                 Craps features some of the best odds in the casino when avoiding proposition bets.
//               </p>
//               <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs text-[#0F172A]">
//                 <li className="flex items-center gap-2 p-3 rounded-xl bg-[#F8FAFC] border border-gray-200/80">
//                   <Check className="w-4 h-4 text-[#00B67A]" /> Stick to Pass Line / Don't Pass Line bets (1.41% / 1.36% edge).
//                 </li>
//                 <li className="flex items-center gap-2 p-3 rounded-xl bg-[#F8FAFC] border border-gray-200/80">
//                   <Check className="w-4 h-4 text-[#00B67A]" /> Always Take/Lay Max Odds (0% true mathematical house edge).
//                 </li>
//               </ul>
//             </div>
//           )}
//         </div>
//       </section>

//       {/* ================= 5. INTERACTIVE HIGH-RTP SLOT FINDER ================= */}
//       <section className="py-10 ">
//         <div className="bg-white border border-gray-200/90 rounded-3xl p-6 sm:p-10 shadow-xs space-y-6">
//           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//             <div>
//               <span className="text-xs font-bold uppercase tracking-wider text-[#2E68FB] block">Filterable Database</span>
//               <h2 className="text-2xl font-bold text-[#0F172A]">Highest RTP Slots (97%+ RTP)</h2>
//             </div>

//             {/* Filters */}
//             <div className="flex flex-wrap items-center gap-3">
//               <div className="relative">
//                 <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
//                 <input
//                   type="text"
//                   placeholder="Search slot or provider..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="pl-9 pr-4 py-2 text-xs rounded-xl bg-[#F8FAFC] border border-gray-200 focus:outline-none focus:border-[#2E68FB]"
//                 />
//               </div>

//               <select
//                 value={volatilityFilter}
//                 onChange={(e) => setVolatilityFilter(e.target.value)}
//                 className="px-3 py-2 text-xs rounded-xl bg-[#F8FAFC] border border-gray-200 text-[#0F172A] focus:outline-none"
//               >
//                 <option value="All">All Volatility</option>
//                 <option value="Low">Low Volatility</option>
//                 <option value="High">High Volatility</option>
//               </select>
//             </div>
//           </div>

//           {/* Table */}
//           <div className="overflow-x-auto">
//             <table className="w-full text-left border-collapse">
//               <thead>
//                 <tr className="border-b border-gray-200 text-xs font-bold text-[#0F172A] uppercase tracking-wider bg-[#F8FAFC]">
//                   <th className="py-3 px-4">Slot Name</th>
//                   <th className="py-3 px-4">Provider</th>
//                   <th className="py-3 px-4">Theoretical RTP</th>
//                   <th className="py-3 px-4">Volatility</th>
//                   <th className="py-3 px-4">Max Win</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100 text-xs sm:text-sm text-[#475569]">
//                 {filteredSlots.length > 0 ? (
//                   filteredSlots.map((slot, idx) => (
//                     <tr key={idx} className="hover:bg-blue-50/30 transition">
//                       <td className="py-3.5 px-4 font-bold text-[#0F172A] flex items-center gap-2">
//                         {slot.name}
//                         {slot.badge && (
//                           <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
//                             {slot.badge}
//                           </span>
//                         )}
//                       </td>
//                       <td className="py-3.5 px-4">{slot.provider}</td>
//                       <td className="py-3.5 px-4 font-mono font-bold text-[#00B67A]">{slot.rtp}%</td>
//                       <td className="py-3.5 px-4">{slot.volatility}</td>
//                       <td className="py-3.5 px-4 font-mono">{slot.maxWin}</td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan={5} className="py-8 text-center text-xs text-gray-400">
//                       No slots matching your query found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </section>

//       {/* ================= 6. INTERACTIVE PRE-SESSION CHECKLIST ================= */}
//       <section className="py-10 ">
//         <div className="p-8 rounded-3xl bg-linear-to-r from-slate-900 to-slate-800 text-white shadow-xl">
//           <div className="max-w-2xl mb-6">
//             <span className="text-xs font-bold uppercase tracking-wider text-blue-400 block mb-1">Interactive Protocol</span>
//             <h2 className="text-2xl font-bold">Pre-Session Checklist</h2>
//             <p className="text-xs text-slate-300">Complete these steps before making a deposit.</p>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             {checklistItems.map((item) => {
//               const isChecked = !!checkedSteps[item.id];
//               return (
//                 <div
//                   key={item.id}
//                   onClick={() => toggleCheck(item.id)}
//                   className={`p-4 rounded-2xl border cursor-pointer transition flex items-start gap-3 ${
//                     isChecked
//                       ? 'bg-blue-950/60 border-blue-500/60'
//                       : 'bg-slate-800/60 border-slate-700/80 hover:border-slate-600'
//                   }`}
//                 >
//                   <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${
//                     isChecked ? 'bg-[#2E68FB] text-white' : 'border border-slate-500'
//                   }`}>
//                     {isChecked && <Check className="w-3.5 h-3.5" />}
//                   </div>
//                   <div>
//                     <h4 className={`text-xs font-bold ${isChecked ? 'text-blue-300 line-through' : 'text-white'}`}>
//                       {item.title}
//                     </h4>
//                     <p className="text-[11px] text-slate-400 mt-1">{item.desc}</p>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* ================= 7. FAQ ACCORDION ================= */}
//       <section className=" py-10">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-10">
//             <span className="text-xs font-bold uppercase tracking-wider text-[#2E68FB] mb-2 block">
//               Player FAQs
//             </span>
//             <h2 className="text-3xl font-bold text-[#0F172A]">Frequently Asked Winning Questions</h2>
//           </div>

//           <div className="space-y-3">
//             {faqs.map((faq, idx) => (
//               <div key={idx} className="rounded-2xl bg-[#F8FAFC] border border-gray-200/80 overflow-hidden">
//                 <button
//                   onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
//                   className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-[#0F172A]"
//                 >
//                   <span className="flex items-center gap-2">
//                     <HelpCircle className="w-4 h-4 text-[#2E68FB] shrink-0" />
//                     {faq.q}
//                   </span>
//                   <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
//                 </button>

//                 {openFaq === idx && (
//                   <div className="px-5 pb-5 text-xs text-[#64748B] leading-relaxed border-t border-gray-100 pt-3">
//                     {faq.a}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }


'use client';

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  BookOpen,
  Sparkles,
  Clock,
  Layers,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { getGuideDisplayImage } from "@/utils/guideImages";
import { buildApiUrl } from "@/config/api.config";

interface Guide {
  id: string;
  category: string;
  title: string;
  slug: string;
  featured_image?: string;
  excerpt: string;
  published_at: string;
  sort_order?: number;
}

const CATEGORY_ORDER = [
  "Slots Guides",
  "Blackjack Guides",
  "Roulette Guides",
  "Baccarat Guides",
  "Craps Guides",
  "Poker Guides",
  "More Guides",
];

export default function HowToWinClient() {
const [guides, setGuides] = useState<Guide[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetchGuides();
  }, []);

  const fetchGuides = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(buildApiUrl("/guides?status=published"));
      if (res.ok) {
        const data = await res.json();
        setGuides(data.guides || data || []);
      }
    } catch (err) {
      console.error("Failed to fetch guides", err);
    }
    setIsLoading(false);
  };

  // Group and filter guides
  const filteredGuides = useMemo(() => {
    return guides.filter((g) => {
      const matchesCat =
        selectedCategory === "All" ||
        g.category?.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        g.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.category?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [guides, selectedCategory, searchQuery]);

  // Group by category for section layout
  const groupedByCategory = useMemo(() => {
    const map: Record<string, Guide[]> = {};

    CATEGORY_ORDER.forEach((cat) => {
      map[cat] = [];
    });

    filteredGuides.forEach((g) => {
      const cat = g.category || "More Guides";
      if (!map[cat]) {
        map[cat] = [];
      }
      map[cat].push(g);
    });

    return map;
  }, [filteredGuides]);

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
    try {
      const d = new Date(dateStr);
      const day = String(d.getDate()).padStart(2, "0");
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const year = d.getFullYear();
      const hours = String(d.getHours()).padStart(2, "0");
      const mins = String(d.getMinutes()).padStart(2, "0");
      return `${day}/${month}/${year} ${hours}:${mins}`;
    } catch {
      return dateStr;
    }
  };




 return (
    <div className="w-full pb-16">
      {/* Hero Card matching the site's design language */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-[0px_4px_16px_rgba(38,123,220,0.08)] p-6 sm:p-10 mb-8">
        <div className="max-w-5xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-white text-xs font-semibold border border-[#F59E0B4D] bg-[linear-gradient(90deg,_#F59E0B_0%,_#D97706_100%)] mb-4">
            <Sparkles size={14} />
            <span>Expert Casino Strategy & Rules Hub</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4">
            Casino Guides:{" "}
            <span className="text-transparent bg-clip-text bg-[linear-gradient(90deg,_#F59E0B_0%,_#D97706_100%)]">
              Your Hub for Blackjack, Roulette, Slots & More
            </span>
          </h1>

          <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-normal mb-8">
            Everything you need to play smarter, in one place. Our complete
            library of expert casino guides covers blackjack, roulette,
            baccarat, slots, craps, poker, video poker, and more - whether
            you&apos;re learning the rules for the first time or refining a
            winning strategy, you&apos;ll find clear, no-nonsense advice from
            seasoned players in every guide.
          </p>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 flex-wrap pt-1">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-150 border ${
                selectedCategory === "All"
                  ? "bg-[linear-gradient(90deg,_#F59E0B_0%,_#D97706_100%)] text-white border-[#F59E0B] shadow-sm scale-105"
                  : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-gray-300"
              }`}
            >
              All Guides ({guides.length})
            </button>
            {CATEGORY_ORDER.map((cat) => {
              const count = guides.filter(
                (g) => g.category?.toLowerCase() === cat.toLowerCase(),
              ).length;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-150 border flex items-center gap-1.5 ${
                    selectedCategory === cat
                      ? "bg-[linear-gradient(90deg,_#F59E0B_0%,_#D97706_100%)] text-white border-[#F59E0B] shadow-sm scale-105"
                      : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-gray-300"
                  }`}
                >
                  <span>{cat}</span>
                  {count > 0 && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                        selectedCategory === cat
                          ? "bg-white/20 text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Search & Control Bar */}
      <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs p-4 mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search guides by game, strategy, RTP, or variant..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-medium"
          />
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500 shrink-0 font-medium">
          <Layers size={15} className="text-amber-500" />
          <span>
            Showing{" "}
            <span className="font-bold text-gray-900">
              {filteredGuides.length}
            </span>{" "}
            guides
          </span>
        </div>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="py-20 text-center bg-white rounded-2xl border border-gray-200/80 p-8 shadow-xs">
          <div className="inline-block animate-spin rounded-full h-9 w-9 border-4 border-amber-500 border-t-transparent mb-3" />
          <p className="text-sm text-gray-500 font-medium">
            Loading casino guides...
          </p>
        </div>
      ) : filteredGuides.length === 0 ? (
        <div className="py-16 text-center bg-white border border-gray-200/80 rounded-2xl p-8 shadow-xs">
          <BookOpen className="mx-auto text-gray-400 mb-3" size={38} />
          <h3 className="text-lg font-bold text-gray-900 mb-1">
            No Guides Found
          </h3>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            We couldn&apos;t find any guides matching &quot;{searchQuery}&quot;.
            Try choosing a different category or resetting your search.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
            className="mt-4 px-4 py-2 bg-[linear-gradient(90deg,_#F59E0B_0%,_#D97706_100%)] text-white font-bold rounded-xl text-xs shadow-sm hover:brightness-105 transition-all"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        /* Categorized Guide Sections */
        <div className="space-y-12">
          {Object.entries(groupedByCategory).map(([categoryName, items]) => {
            if (items.length === 0) return null;

            return (
              <section
                key={categoryName}
                id={categoryName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
                className="scroll-mt-24"
              >
                {/* Section Title */}
                <div className="flex items-center justify-between pb-3 mb-6 border-b border-gray-200">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-6 rounded-full bg-[linear-gradient(180deg,_#F59E0B_0%,_#D97706_100%)]" />
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                      {categoryName}
                    </h2>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                      {items.length} {items.length === 1 ? "guide" : "guides"}
                    </span>
                  </div>
                </div>

                {/* Cards Grid with Proper Photo Cover Images */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((guide) => {
                    const imgSrc = getGuideDisplayImage(guide);
                    return (
                      <Link
                        key={guide.id || guide.slug}
                        href={`/guides/${guide.slug}`}
                        className="group flex flex-col justify-between bg-white hover:bg-slate-50/50 border border-gray-200/90 hover:border-amber-400 rounded-2xl p-4 shadow-[0px_4px_16px_rgba(38,123,220,0.06)] hover:shadow-lg transition-all duration-200 hover:-translate-y-1 overflow-hidden"
                      >
                        <div>
                          {/* Rich Photo Cover */}
                          <div className="relative w-full h-44 rounded-xl overflow-hidden mb-4 bg-slate-900">
                            <Image
                              src={imgSrc}
                              alt={guide.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300 brightness-95 group-hover:brightness-100"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                            <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-white text-[11px] font-bold shadow-sm">
                              {guide.category}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="text-base font-bold text-gray-900 group-hover:text-amber-600 transition-colors leading-snug mb-2 line-clamp-2">
                            {guide.title}
                          </h3>

                          {/* Excerpt */}
                          <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-4">
                            {guide.excerpt}
                          </p>
                        </div>

                        {/* Footer: Date & Read Link */}
                        <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-[11px]">
                          <div className="flex items-center gap-1.5 text-gray-400 font-medium">
                            <Clock size={12} className="text-gray-400" />
                            <span>{formatDate(guide.published_at)}</span>
                          </div>

                          <span className="inline-flex items-center font-bold text-amber-600 group-hover:text-amber-700 transition-colors">
                            Read Guide
                            <ChevronRight
                              size={13}
                              className="ml-0.5 group-hover:translate-x-0.5 transition-transform"
                            />
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      )}

      {/* Bottom Trust & E-E-A-T Guarantee Banner */}
      <div className="mt-14 bg-white border border-gray-200/80 rounded-2xl p-6 sm:p-8 shadow-[0px_4px_16px_rgba(38,123,220,0.06)] flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0">
            <ShieldCheck size={26} />
          </div>
          <div>
            <h4 className="text-base font-bold text-gray-900">
              100% Independent & Verified Casino Strategies
            </h4>
            <p className="text-xs text-gray-600 mt-1 max-w-xl">
              Every guide is reviewed by experienced casino analysts,
              prioritizing transparent mathematics, house edge awareness, and
              responsible gaming principles.
            </p>
          </div>
        </div>
        <Link
          href="/responsible-gambling"
          className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-bold border border-gray-300 transition-colors shrink-0"
        >
          Responsible Gaming
        </Link>
      </div>
    </div>
  );
}