// import { notFound } from "next/navigation";
// import { CircleFlag } from "react-circle-flags";
// import SimilarCasinosSection from "@/components/sections/SimilarCasinosSection";
// import UserReviewsSection from "@/components/sections/UserReviewsSection";
// import CasinoAffiliateButton from "@/components/CasinoAffiliateButton";
// import {
//   ShieldCheck,
//   Lock,
//   TriangleAlert,
//   BadgeCheck,
//   BookOpen,
//   Globe,
//   Star,
//   ChevronRight,
// } from "lucide-react";
// interface Casino {
//   id: string;
//   name: string;
//   slug: string;
//   logo: string;
//   featured_image: string;
//   rating: string;
//   short_description: string;
//   website_url: string;
//   affiliate_url: string;
//   established_year: number;
//   minimum_deposit: string;
//   withdrawal_time: string;
//   bonuses: {
//     id: string;
//     title: string;
//     amount: string;
//     type: string;
//   }[];
// }
// async function getCasino(slug: string): Promise<any | null> {
//   const url = `${process.env.NEXT_PUBLIC_API_URL}/casinos/slug/${slug}`;

//   console.log("API URL:", url);

//   const res = await fetch(url, {
//     cache: "no-store",
//   });

//   const text = await res.text();

//   if (!res.ok) return null;

//   return JSON.parse(text);
// }

// export default async function CasinoPage({
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }) {
//   const { slug } = await params;
//   const casino = await getCasino(slug);

//   if (!casino) {
//     notFound();
//   }
//   interface Game {
//     icon: string;
//     title: string;
//     count: string;
//     color: string;
//     arrow: string;
//   }
//   // Fallback bonus text if none exists in the array
//   const mainBonusTitle =
//     casino.bonuses?.[0]?.title || "100% up to $1,500 + 150 Free Spins";
//   const games: Game[] =
//     casino.game_types && casino.game_types.length > 0
//       ? casino.game_types.map(
//           (gt: any, i: number): Game => ({
//             icon: ["🎰", "🎥", "🏴‍☠️", "🎡", "♠️", "💎"][i % 6],
//             title: gt.game_type?.name || "Game",
//             count: "Available",
//             color: [
//               "border-[#F59E0B] bg-[#FFF8F0]",
//               "border-[#FF5A5A] bg-[#FFF5F5]",
//               "border-[#22C55E] bg-[#F2FFF7]",
//               "border-[#D946EF] bg-[#FFF3FF]",
//               "border-[#EC4899] bg-[#FFF0F7]",
//               "border-[#EAB308] bg-[#FFFFF2]",
//             ][i % 6],
//             arrow: [
//               "text-[#F59E0B]",
//               "text-[#FF5A5A]",
//               "text-[#22C55E]",
//               "text-[#D946EF]",
//               "text-[#EC4899]",
//               "text-[#EAB308]",
//             ][i % 6],
//           }),
//         )
//       : [
//           {
//             icon: "🎰",
//             title: "Slots",
//             count: "3,200+ titles",
//             color: "border-[#F59E0B] bg-[#FFF8F0]",
//             arrow: "text-[#F59E0B]",
//           },
//           {
//             icon: "🎥",
//             title: "Live Casino",
//             count: "200+ titles",
//             color: "border-[#FF5A5A] bg-[#FFF5F5]",
//             arrow: "text-[#FF5A5A]",
//           },
//           {
//             icon: "🏴‍☠️",
//             title: "Blackjack",
//             count: "85+ titles",
//             color: "border-[#22C55E] bg-[#F2FFF7]",
//             arrow: "text-[#22C55E]",
//           },
//           {
//             icon: "🎡",
//             title: "Roulette",
//             count: "60+ titles",
//             color: "border-[#D946EF] bg-[#FFF3FF]",
//             arrow: "text-[#D946EF]",
//           },
//           {
//             icon: "♠️",
//             title: "Poker",
//             count: "40+ titles",
//             color: "border-[#EC4899] bg-[#FFF0F7]",
//             arrow: "text-[#EC4899]",
//           },
//           {
//             icon: "💎",
//             title: "Baccarat",
//             count: "32+ titles",
//             color: "border-[#EAB308] bg-[#FFFFF2]",
//             arrow: "text-[#EAB308]",
//           },
//         ];
//   const mappedCountries: any[] = [];
//   if (
//     casino.available_countries?.length > 0 ||
//     casino.restricted_countries?.length > 0
//   ) {
//     casino.available_countries?.forEach((c: any) =>
//       mappedCountries.push({
//         code: c.country?.code || "us",
//         name: c.country?.name || "Country",
//         available: true,
//       }),
//     );
//     casino.restricted_countries?.forEach((c: any) =>
//       mappedCountries.push({
//         code: c.country?.code || "us",
//         name: c.country?.name || "Country",
//         available: false,
//       }),
//     );
//   }
//   const countries =
//     mappedCountries.length > 0
//       ? mappedCountries
//       : [
//           { code: "gb", name: "United Kingdom", available: true },
//           { code: "ca", name: "Canada", available: true },
//           { code: "de", name: "Germany", available: true },
//           { code: "au", name: "Australia", available: true },
//           { code: "nz", name: "New Zealand", available: true },
//           { code: "in", name: "India", available: true },
//           { code: "ie", name: "Ireland", available: true },
//           { code: "fi", name: "Finland", available: true },
//           { code: "no", name: "Norway", available: true },
//           { code: "se", name: "Sweden", available: true },
//           { code: "us", name: "USA", available: false },
//           { code: "fr", name: "France", available: false },
//         ];
//   const review = {
//     initials: "JH",
//     name: "James Hawthorne",
//     role: "Chief Casino Analyst 12 years experience",
//     verdict: "4.8/5.0",
//   };
//   const securityCards = [
//     {
//       icon: <ShieldCheck className="w-7 h-7 text-[#00D084]" />,
//       title: "Licensed & Regulated",
//       subtitle: "MGA / Curacao",
//       badge: "✓ Verified by auditor",
//       badgeColor: "text-[#00D084]",
//     },
//     {
//       icon: <Lock className="w-7 h-7 text-[#2E68FB]" />,
//       title: "256-bit SSL",
//       subtitle: "Bank-grade encryption for all data",
//       badge: "✓ PCI DSS compliant",
//       badgeColor: "text-[#2E68FB]",
//     },
//     {
//       icon: <TriangleAlert className="w-7 h-7 text-[#F59E0B]" />,
//       title: "Responsible Gaming",
//       subtitle: "Self-exclusion & deposit limits",
//       badge: "✓ GamCare partner",
//       badgeColor: "text-[#F59E0B]",
//     },
//   ];

//   const trustBadges: string[] =
//     casino.badges && casino.badges.length > 0
//       ? casino.badges.map((b: any) => b.badge?.name).filter(Boolean)
//       : [
//           "eCOGRA",
//           "iTech Labs",
//           "GambleAware",
//           "GamCare",
//           "RNG Certified",
//           "Fair Gaming",
//         ];

//   const faqs =
//     casino.faqs && casino.faqs.length > 0
//       ? casino.faqs
//       : [
//           {
//             question: "What should I look for in a casino review?",
//             answer:
//               "Our reviews give you a nice overview of what you can expect at an online casino. We recommend looking at the games selection, banking methods and bonuses to help you decide which casino fits you best.",
//           },
//           {
//             question: "What information do your casino reviews include?",
//             answer:
//               "We review licensing, bonuses, banking, security, games, and support.",
//           },
//           {
//             question: "How do I choose the best online casino?",
//             answer:
//               "Compare licensing, games, bonuses, payment methods, and withdrawal times.",
//           },
//           {
//             question: "What banking methods should I look for?",
//             answer:
//               "Visa, Mastercard, Skrill, Neteller, PayPal, bank transfers, and crypto.",
//           },
//         ];

//   return (
//     <div className=" mx-auto px-4 py-10 font-sans text-gray-800 min-h-screen">
//       {/* 1. HERO TOP HEADER CARD */}
//       <div className="rounded-2xl p-[2px] bg-[linear-gradient(158.37deg,_#FF9C2C_2.3%,_#FFF1CC_15.9%,_#B45B1B_24.24%,_#FFC170_62.4%,_#FEE5B3_75.76%,_#9F5E26_90.07%)]">
//         <div
//           className="rounded-[14px] p-6 shadow-sm flex flex-col md:flex-row gap-6 items-center justify-between"
//           style={{
//             background:
//               "linear-gradient(231.79deg, #D5EDFF 32.55%, #EEECFF 43.54%, #F9F3FF 53.23%, #F5FCFF 66.16%, #E9F5FF 79.08%)",
//           }}
//         >
//           {/* Left Side: Logo & Image container */}
//           <div className="flex flex-col sm:flex-row gap-6 items-center w-full md:w-auto">
//             <div className="w-[290px] h-[194px]  rounded-xl flex items-center justify-center p-4 shrink-0 ">
//               <img
//                 src={casino.logo}
//                 alt={casino.name}
//                 className="max-h-full max-w-full rounded-2xl object-contain"
//               />
//             </div>

//             {/* Center Details */}
//             <div className="flex-1 text-center sm:text-left">
//               <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
//                 <span className="px-3 py-1 rounded-full text-white text-[11px] font-semibold border border-[#F59E0B4D] bg-[linear-gradient(90deg,_#F59E0B_0%,_#D97706_100%)]">
//                   Founded: {casino.established_year}
//                 </span>
//               </div>

//               <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
//                 <h1 className="text-[24px] font-bold text-gray-900">
//                   {casino.name}
//                 </h1>
//                 <div className="flex items-center ml-28 gap-1 text-amber-400">
//                   <span className="text-[24px]">★★★★★</span>
//                   <span className="text-gray-900 font-bold text-[18px] ml-1">
//                     {casino.rating}
//                   </span>
//                   <span className="text-gray-400 text-[16]">(11,847)</span>
//                 </div>
//               </div>

//               {/* Micro Specs */}
//               <div className="grid grid-cols-2  gap-x-0 gap-y-1 mt-3 text-xs text-gray-600">
//                 <p>
//                   🎥<span className="font-semibold">MIN DEPOSIT:</span> $
//                   {casino.minimum_deposit}
//                 </p>
//                 <p>
//                   🎡<span className="font-semibold">PAYOUT:</span> Instant - 12h
//                 </p>
//                 <p>
//                   🎰 <span className="font-semibold">GAMES:</span> 3,800+
//                 </p>
//                 <p>
//                   💎 <span className="font-semibold">WITHDRAWAL:</span>{" "}
//                   {casino.withdrawal_time}
//                 </p>
//               </div>

//               <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-2 text-xs">
//                 <span className="font-semibold text-gray-500">
//                   Payments Methods:
//                 </span>
//                 <div className="flex gap-1 items-center bg-gray-50 px-2 py-1 rounded border">
//                   <span className="text-[10px] font-bold text-gray-400">
//                     VISA / MC / Crypto
//                   </span>
//                 </div>
//               </div>

//               <p className="text-emerald-500 text-xs font-medium mt-2 flex items-center gap-1">
//                 ✓ Verified terms No hidden fees
//               </p>
//             </div>
//           </div>

//           {/* Right Side: CTA Block */}
//           <div className="w-full lg:w-[260px] flex flex-col justify-center">
//             <div className="text-center mb-5">
//               <h3 className="text-[18px] leading-tight font-black text-slate-900">
//                 {mainBonusTitle}
//               </h3>
//             </div>

//             {/* Play Now */}
//             <CasinoAffiliateButton
//               casinoId={casino.id}
//               defaultUrl={
//                 casino.affiliate_url ||
//                 casino.default_affiliate_url ||
//                 casino.website_url
//               }
//               className="h-14 rounded-2xl text-white text-lg font-bold flex items-center justify-center transition-all hover:brightness-105 active:translate-y-[1px]"
//               style={{
//                 background: "linear-gradient(180deg, #CDDCFB 0%, #588CF3 100%)",
//                 boxShadow: "0px 2px 0px 0px #2E68FB",
//               }}
//             >
//               Play Now ▶
//             </CasinoAffiliateButton>
//           </div>
//         </div>
//       </div>

//       {/* OVERVIEW SUB-NAV */}
//       <div className="mt-8 mb-4">
//         <span className="text-[18px] font-bold text-[#2E68FB] tracking-wider pb-1 uppercase">
//           Overview
//         </span>
//       </div>

//       {/* 2. ABOUT BOX */}
//       <div
//         className="rounded-2xl p-6 mb-8 border border-[#2E68FB] shadow-sm"
//         style={{
//           background:
//             "linear-gradient(231.79deg, #D5EDFF 32.55%, #F5FCFF 66.16%, #E9F5FF 79.08%)",
//         }}
//       >
//         <h2 className="font-poppins text-[24px] font-bold leading-[24px] tracking-normal text-[#16171D] mb-3">
//           About {casino.name}
//         </h2>
//         <p className="font-poppins text-[14px] font-normal leading-[23px] tracking-normal text-[#475467]">
//           {casino.overview}
//         </p>
//       </div>

//       {/* 3. REVIEW GRID DETAILS */}
//       <div id="review" className="mb-10">
//         <h2 className="font-poppins text-[24px] font-bold leading-[24px] tracking-normal text-[#16171D] mb-3">
//           {casino.name} Review
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//           {/* Item 1 */}
//           <div className=" border border-[#2E68FB] rounded-xl p-3 flex flex-col justify-between">
//             <span className="text-[10px] font-bold text-[#2E68FB] tracking-wider uppercase">
//               Founded
//             </span>
//             <span className="text-[14px] font-bold text-[#2E68FB] mt-1">
//               {casino.established_year}
//             </span>
//           </div>

//           {/* Item 2 */}
//           <div className="border border-[#2E68FB] rounded-xl p-3 flex flex-col justify-between">
//             <span className="text-[10px] font-bold text-[#2E68FB] tracking-wider uppercase">
//               License
//             </span>
//             <span className="text-[14px] font-bold text-[#2E68FB] mt-1">
//               CuraÃ§ao eGaming #3048/JAZ
//             </span>
//           </div>

//           {/* Item 3 */}
//           <div className="border border-[#2E68FB] rounded-xl p-3 flex flex-col justify-between">
//             <span className="text-[10px] font-bold text-[#2E68FB] tracking-wider uppercase">
//               Software Providers
//             </span>
//             <span className="text-[14px] font-bold text-[#2E68FB] mt-1">
//               Microgaming, NetEnt, Evolution, Pragmatic Play (15+)
//             </span>
//           </div>

//           {/* Item 4 */}
//           <div className="border border-[#2E68FB] rounded-xl p-3 flex flex-col justify-between">
//             <span className="text-[10px] font-bold text-[#2E68FB] tracking-wider uppercase">
//               Games Available
//             </span>
//             <span className="text-[14px] font-bold text-[#2E68FB] mt-1">
//               3,800+
//             </span>
//           </div>

//           {/* Item 5 */}
//           <div className="border border-[#2E68FB] rounded-xl p-3 flex flex-col justify-between">
//             <span className="text-[10px] font-bold text-[#2E68FB] tracking-wider uppercase">
//               Currencies
//             </span>
//             <span className="text-[14px] font-bold text-[#2E68FB] mt-1">
//               USD, EUR, BTC, LTC, ETH
//             </span>
//           </div>

//           {/* Item 6 */}
//           <div className="border border-[#2E68FB] rounded-xl p-3 flex flex-col justify-between">
//             <span className="text-[10px] font-bold text-[#2E68FB] tracking-wider uppercase">
//               Languages
//             </span>
//             <span className="text-[14px] font-bold text-[#2E68FB] mt-1">
//               English, German, Spanish, French
//             </span>
//           </div>

//           {/* Item 7 */}
//           <div className="border border-[#2E68FB] rounded-xl p-3 flex flex-col justify-between">
//             <span className="text-[10px] font-bold text-[#2E68FB] tracking-wider uppercase">
//               Min Deposit
//             </span>
//             <span className="text-[14px] font-bold text-[#2E68FB] mt-1">
//               ${casino.minimum_deposit}
//             </span>
//           </div>

//           {/* Item 8 */}
//           <div className="border border-[#2E68FB] rounded-xl p-3 flex flex-col justify-between">
//             <span className="text-[10px] font-bold text-[#2E68FB] tracking-wider uppercase">
//               Payout Speed
//             </span>
//             <span className="text-[14px] font-bold text-[#2E68FB] mt-1">
//               {casino.withdrawal_time}
//             </span>
//           </div>
//         </div>
//       </div>
//       <div className="w-full h-auto mb-10 rounded-2xl overflow-hidden">
//         <img
//           src={casino.featured_image}
//           alt={casino.name}
//           className="w-full h-full object-cover"
//         />
//       </div>
//       {/* 4. WELCOME BONUS & PROMOTIONS SECTION */}
//       <div>
//         <h2 className="font-poppins text-[24px] font-bold leading-[24px] tracking-normal text-[#16171D] mb-3">
//           Welcome Bonus & Promotions
//         </h2>

//         <div className="rounded-2xl bg-[linear-gradient(158.37deg,#FF9C2C_2.3%,#FFF1CC_15.9%,#B45B1B_24.24%,#FFC170_62.4%,#FEE5B3_75.76%,#9F5E26_90.07%)] p-[1px]">
//           <div className="rounded-2xl p-6 bg-[linear-gradient(0deg,rgba(255,255,255,0.033),rgba(255,255,255,0.033)),linear-gradient(231.79deg,#D5EDFF_32.55%,#EEECFF_43.54%,#F9F3FF_53.23%,#F5FCFF_66.16%,#E9F5FF_79.08%)]">
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-[#2E68FB]">
//               <div>
//                 <span
//                   className="inline-flex items-center px-2.5 py-1 rounded-md text-[9px] font-extrabold uppercase tracking-wide text-white border border-[#F59E0B4D]"
//                   style={{
//                     background:
//                       "linear-gradient(90deg, #F59E0B 0%, #D97706 100%)",
//                   }}
//                 >
//                   Welcome Offer
//                 </span>
//                 <h3 className="font-poppins font-semibold text-[26px] leading-[100%] tracking-normal text-[#111827] mt-2">
//                   {mainBonusTitle}
//                 </h3>
//                 <p className="font-poppins font-normal text-[12px] leading-[100%] tracking-[0.01em] text-[#4D4D4D] mt-0.5">
//                   No promo code required bonus credited automatically.
//                 </p>
//               </div>

//               <CasinoAffiliateButton
//                 casinoId={casino.id}
//                 defaultUrl={
//                   casino.affiliate_url ||
//                   casino.default_affiliate_url ||
//                   casino.website_url
//                 }
//                 className="
//     inline-flex items-center justify-center gap-[3px]
//     w-[195px] h-[52px]
//     px-[10px] py-[14px]
//     rounded-[12px]
//     font-poppins font-semibold
//     text-[14px] leading-[100%] tracking-normal
//     text-[#16171D]
//     bg-[linear-gradient(180deg,#FFE11F_0%,#FF8533_100%)]
//     shadow-[0px_2px_0px_0px_#E36D1F]
//     transition-all duration-200
//     hover:opacity-95
//     shrink-0
//   "
//               >
//                 Claim Bonus
//                 <span className="text-base">▶</span>
//               </CasinoAffiliateButton>
//             </div>

//             {/* Footer Grid Metrics inside the promo box */}
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 text-xs">
//               <div>
//                 <p className="font-bold text-black uppercase tracking-wider text-[12px]">
//                   Min Deposit:
//                 </p>
//                 <p className="font-bold text-gray-900 text-[16px] mt-1">
//                   ${casino.minimum_deposit}
//                 </p>
//               </div>
//               <div>
//                 <p className="font-bold text-black uppercase tracking-wider text-[12px]">
//                   Wagering:
//                 </p>
//                 <p className="font-bold text-gray-900 text-[16px] mt-1">35x</p>
//               </div>
//               <div>
//                 <p className="font-bold text-black uppercase tracking-wider text-[12px]">
//                   Max Cashout:
//                 </p>
//                 <p className="font-bold text-gray-900 text-[16px] mt-1">
//                   Unlimited
//                 </p>
//               </div>
//               <div>
//                 <p className="font-bold text-black uppercase tracking-wider text-[12px]">
//                   Validity:
//                 </p>
//                 <p className="font-bold text-gray-900 text-[16px] mt-1">
//                   30 days
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="mt-10">
//         {/* Badge */}
//         <div className="inline-flex rounded-full bg-[radial-gradient(circle_at_center,#FFE6B8_0%,#F1A214_100%)] p-[1px]">
//           <div className="inline-flex items-center gap-1 rounded-full bg-[#FFF8E6] px-3 py-1">
//             <span className="text-[10px]"></span>
//             <span className="font-poppins text-[10px] font-medium uppercase text-[#F1A214]">
//               Funding
//             </span>
//           </div>
//         </div>

//         {/* Title */}
//         <h2 className="font-poppins text-[24px] font-bold leading-[24px] tracking-normal text-[#16171D] mb-3 mt-3">
//           Deposit Information
//         </h2>

//         {/* Cards */}
//         <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
//           {/* Card 1 */}
//           <div className="rounded-[14px] border border-[#2E68FB70] bg-[linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.1)),linear-gradient(231.79deg,#D5EDFF_17.69%,#EEECFF_43.54%,#F9F3FF_53.23%,#F5FCFF_66.16%,#E9F5FF_79.08%)] p-5">
//             <h3 className="font-poppins font-normal text-[20px] leading-[100%] tracking-normal text-[#16171D]">
//               Minimum Deposit
//             </h3>
//             <p className="mt-3 font-poppins text-[34px] font-bold leading-none text-[#00D084]">
//               $10
//             </p>

//             <p className="mt-2  text-[12px] text-[#666]">
//               Low barrier to entry
//             </p>
//           </div>

//           {/* Card 2 */}
//           <div className="rounded-[14px] border border-[#2E68FB70] bg-[linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.1)),linear-gradient(231.79deg,#D5EDFF_17.69%,#EEECFF_43.54%,#F9F3FF_53.23%,#F5FCFF_66.16%,#E9F5FF_79.08%)] p-5">
//             <h3 className="font-poppins font-normal text-[20px] leading-[100%] tracking-normal text-[#16171D]">
//               Maximum Deposit
//             </h3>

//             <p className="mt-3 font-poppins text-[34px] font-bold leading-none text-[#2E68FB]">
//               $10,000
//             </p>

//             <p className="mt-2  text-[12px] text-[#666]">Per transaction</p>
//           </div>

//           {/* Card 3 */}
//           <div className="rounded-[14px] border border-[#2E68FB70] bg-[linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.1)),linear-gradient(231.79deg,#D5EDFF_17.69%,#EEECFF_43.54%,#F9F3FF_53.23%,#F5FCFF_66.16%,#E9F5FF_79.08%)] p-5">
//             <h3 className="font-poppins font-normal text-[20px] leading-[100%] tracking-normal text-[#16171D]">
//               Processing Time
//             </h3>

//             <p className="mt-3 font-poppins text-[34px] font-bold leading-none text-[#F59E0B]">
//               Instant
//             </p>

//             <p className="mt-2 text-[12px] text-[#666]">All methods</p>
//           </div>
//         </div>
//       </div>
//       <div className="mt-10">
//         <div className="inline-flex rounded-full bg-[radial-gradient(circle_at_center,#B8CEFF_0%,#2E68FB_100%)] p-[1px]">
//           <div className="flex items-center gap-1 rounded-full bg-[#E6EDFF] px-4 py-1">
//             <BookOpen className="w-3.5 h-3.5 text-[#2E68FB]" />
//             <span className="font-poppins text-[10px] font-medium uppercase text-[#2E68FB]">
//               Library
//             </span>
//           </div>
//         </div>
//         <h2 className="font-poppins text-[24px] font-bold leading-[24px] tracking-normal text-[#16171D] mb-3 mt-3">
//           Explore 3,800+ Games
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
//           {games.map((game) => (
//             <div
//               key={game.title}
//               className={`rounded-2xl border ${game.color} p-6 transition hover:shadow-md`}
//             >
//               <div className="text-3xl">{game.icon}</div>

//               <h3 className="mt-4 font-poppins text-[24px] font-semibold text-[#16171D]">
//                 {game.title}
//               </h3>

//               <p className="mt-1 text-[14px] text-[#4D4D4D]">{game.count}</p>

//               <div className="mt-2 flex items-center justify-between border-t pt-3">
//                 <span className="text-[12px] text-[#6B7280]">
//                   Top providers
//                 </span>

//                 <span className={`${game.arrow} text-lg`}>▶</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="mt-10">
//         <div className="inline-flex rounded-full bg-[radial-gradient(circle_at_center,#B8CEFF_0%,#2E68FB_100%)] p-[1px]">
//           <div className="flex items-center gap-1 rounded-full bg-[#E6EDFF] px-4 py-1">
//             <Globe className="w-3.5 h-3.5 text-[#2E68FB]" />
//             <span className="font-poppins text-[10px] font-medium uppercase text-[#2E68FB]">
//               Availability
//             </span>
//           </div>
//         </div>

//         <h2 className="font-poppins text-[24px] font-bold leading-[24px] tracking-normal text-[#16171D] mb-3 mt-3">
//           Supported Countries
//         </h2>

//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
//           {countries.map((country) => (
//             <div
//               key={country.code}
//               className={`rounded-2xl border p-5 ${
//                 country.available
//                   ? "border-[#22C55E] bg-[#F0FFF8]"
//                   : "border-[#EF4444] bg-[#FFF5F5]"
//               }`}
//             >
//               <div className="flex items-center gap-3">
//                 <CircleFlag
//                   countryCode={country.code.toLowerCase()}
//                   className="w-6 h-6 shrink-0"
//                 />

//                 <h3 className="font-poppins text-[20px] font-medium text-[#16171D]">
//                   {country.name}
//                 </h3>
//               </div>

//               <p
//                 className={`mt-5 text-[12px] font-medium uppercase ${
//                   country.available ? "text-[#22C55E]" : "text-[#EF4444]"
//                 }`}
//               >
//                 {country.available ? "✓ Available" : "✗ Restricted"}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="mt-10">
//         {/* Badge */}
//         <div className="inline-flex rounded-full bg-[radial-gradient(circle_at_center,#B8CEFF_0%,#2E68FB_100%)] p-[1px]">
//           <div className="flex items-center gap-1 rounded-full bg-[#E6EDFF] px-4 py-1">
//             <ShieldCheck className="w-3 h-3 text-[#2E68FB]" />
//             <span className="font-poppins text-[10px] font-medium uppercase text-[#2E68FB]">
//               Trust & Safety
//             </span>
//           </div>
//         </div>

//         {/* Heading */}
//         <h2 className="font-poppins text-[24px] font-bold leading-[24px] tracking-normal text-[#16171D] mb-3 mt-3">
//           Security & Licensing
//         </h2>

//         {/* Cards */}
//         <div className="mt-8 grid gap-6 md:grid-cols-3">
//           {securityCards.map((item) => (
//             <div
//               key={item.title}
//               className="rounded-2xl border border-[#2E68FB70] bg-white p-6"
//             >
//               {item.icon}

//               <h3 className="mt-2 font-poppins text-[22px] font-semibold text-[#16171D]">
//                 {item.title}
//               </h3>

//               <p className=" font-poppins text-[14px] text-[#4D4D4D]">
//                 {item.subtitle}
//               </p>

//               <p className={`mt-4 text-[10px] font-medium ${item.badgeColor}`}>
//                 {item.badge}
//               </p>
//             </div>
//           ))}
//         </div>

//         {/* Bottom Badges */}
//         <div className="mt-6 flex flex-wrap gap-3">
//           {trustBadges.map((badge) => (
//             <div
//               key={badge}
//               className="flex items-center gap-2 rounded-xl bg-white px-4 py-2"
//             >
//               <BadgeCheck className="w-4 h-4 text-[#00D084]" />
//               <span className="font-poppins text-[14px] font-medium text-[#00D084]">
//                 {badge}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="mt-10">
//         {/* Editorial Badge */}
//         <div className="inline-flex rounded-full bg-[radial-gradient(circle_at_center,#B8CEFF_0%,#2E68FB_100%)] p-[1px]">
//           <div className="flex items-center gap-1 rounded-full bg-[#E6EDFF] px-4 py-1">
//             <BadgeCheck className="w-3.5 h-3.5 text-[#2E68FB]" />
//             <span className="font-poppins text-[10px] font-medium uppercase text-[#2E68FB]">
//               Editorial
//             </span>
//           </div>
//         </div>

//         {/* Heading */}
//         <h2 className="font-poppins text-[24px] font-bold leading-[24px] tracking-normal text-[#16171D] mb-3 mt-3">
//           Expert Review
//         </h2>

//         {/* Review Card */}
//         <div
//           className="
//       mt-6 rounded-[20px] border border-[#F59E0B]
//       bg-[linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.1)),linear-gradient(231.79deg,#D5EDFF_17.69%,#EEECFF_43.54%,#F9F3FF_53.23%,#F5FCFF_66.16%,#E9F5FF_79.08%)]
//       p-6
//     "
//         >
//           {/* Header */}
//           <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
//             <div className="flex items-center gap-4">
//               <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#F59E0B]">
//                 <span className="font-poppins text-[30px] font-bold text-white">
//                   {review.initials}
//                 </span>
//               </div>

//               <div>
//                 <h3 className="font-poppins font-semibold text-[22px] leading-[100%] tracking-normal text-[#16171D]">
//                   {review.name}
//                 </h3>

//                 <p className="mt-1 text-[12px] text-[#666666]">{review.role}</p>
//               </div>
//             </div>

//             <div className="inline-flex rounded-full bg-[#F59E0B] p-[1px]">
//               <div className="flex items-center gap-2 rounded-full bg-[#FFF8E6] px-4 py-2">
//                 <BadgeCheck className="h-4 w-4 text-[#F59E0B]" />
//                 <span className="text-[11px] font-semibold uppercase text-[#F59E0B]">
//                   Verified Expert
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Divider */}
//           <div className="my-6 h-px bg-[#2E68FB]" />

//           {/* Content */}
//           <div className="space-y-2">
//             <p className="text-[16px] leading-9 font-medium text-[#16171D]">
//               {casino.editor_view}
//             </p>
//           </div>

//           {/* Bottom Divider */}
//           <div className="my-6 h-px bg-[#2E68FB]" />

//           {/* Footer */}
//           <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
//             <div>
//               <p className="text-[14px] text-[#666666]">Verdict</p>

//               <div className="mt-1 flex items-center gap-3">
//                 <span className="font-poppins text-[22px] font-bold text-[#16171D]">
//                   {review.verdict}
//                 </span>

//                 <div className="flex gap-1">
//                   {Array.from({ length: 5 }).map((_, i) => (
//                     <Star
//                       key={i}
//                       className="h-3 w-3 fill-[#F59E0B] text-[#F59E0B]"
//                     />
//                   ))}
//                 </div>
//               </div>
//             </div>

//             <CasinoAffiliateButton
//               casinoId={casino.id}
//               defaultUrl={
//                 casino.affiliate_url ||
//                 casino.default_affiliate_url ||
//                 casino.website_url
//               }
//               className="
//     inline-flex items-center justify-center gap-[4px]
//     w-[168px] h-[52px]
//     rounded-[12px]
//     px-[10px] py-[14px]
//     font-poppins font-semibold
//     text-[16px] leading-[100%] tracking-normal
//     text-[#16171D]
//     bg-[linear-gradient(180deg,#FFE11F_0%,#FF8533_100%)]
//     shadow-[0px_2px_0px_0px_#E36D1F]
//     transition-all duration-200
//     hover:opacity-95
//   "
//             >
//               Visit {casino.name}
//               <span className="text-[16px]">▶</span>
//             </CasinoAffiliateButton>
//           </div>
//         </div>
//       </div>

//       <div className="mt-10">
//         {/* Editorial Badge */}
//         <div className="inline-flex rounded-full bg-[radial-gradient(circle_at_center,#B8CEFF_0%,#2E68FB_100%)] p-[1px]">
//           <div className="flex items-center gap-1 rounded-full bg-[#E6EDFF] px-4 py-1">
//             <BadgeCheck className="w-3.5 h-3.5 text-[#2E68FB]" />
//             <span className="font-poppins text-[10px] font-medium uppercase text-[#2E68FB]">
//               Editorial
//             </span>
//           </div>
//         </div>

//         {/* Heading */}
//         <h2 className="font-poppins text-[24px] font-bold leading-[24px] tracking-normal text-[#16171D] mb-3 mt-3">
//           Frequently Asked Questions
//         </h2>

//         <div className="mt-6 overflow-hidden rounded-[16px] bg-white border border-[#EEF2FF]">
//           <div className="h-1 bg-[#2E68FB]" />

//           {faqs.map((faq: any, index: number) => (
//             <details
//               key={index}
//               open={index === 0}
//               className={`group ${index !== faqs.length - 1 ? "border-b border-[#EEF2FF]" : ""}`}
//             >
//               <summary className="flex cursor-pointer list-none items-center test-[18px] justify-between px-6 py-6 font-semibold text-[#2E68FB] group-open:text-[#2E68FB] text-[#16171D]">
//                 {faq.question}
//                 <ChevronRight className="h-5 w-5 transition group-open:rotate-90" />
//               </summary>

//               <p className="px-6 pb-6 text-[14px] text-[#7C7C7C] leading-7">
//                 {faq.answer}
//               </p>
//             </details>
//           ))}
//         </div>
//       </div>
//       <div className="mt-10">
//         <div className="inline-flex rounded-full bg-[radial-gradient(circle_at_center,#B8CEFF_0%,#2E68FB_100%)] p-[1px]">
//           <div className="flex items-center gap-1 rounded-full bg-[#E6EDFF] px-4 py-1">
//             <Star className="w-3.5 h-3.5 text-[#2E68FB]" />
//             <span className="font-poppins text-[10px] font-medium uppercase text-[#2E68FB]">
//               Reviews
//             </span>
//           </div>
//         </div>

//         <UserReviewsSection casinoId={casino.id} casinoName={casino.name} />
//       </div>

//       {/* Similar Casinos Section */}
//       <SimilarCasinosSection slug={slug} />
//     </div>
//   );
// }

"use client";

import { notFound } from "next/navigation";
import { CircleFlag } from "react-circle-flags";
import SimilarCasinosSection from "@/components/sections/SimilarCasinosSection";
import UserReviewsSection from "@/components/sections/UserReviewsSection";
import CasinoAffiliateButton from "@/components/CasinoAffiliateButton";
import {
  ShieldCheck,
  Lock,
  TriangleAlert,
  BadgeCheck,
  BookOpen,
  Globe,
  Star,
  ChevronRight,
} from "lucide-react";

interface Props {
  casino: any;
}

// interface Casino {
//   id: string;
//   name: string;
//   slug: string;
//   logo: string;
//   featured_image: string;
//   rating: string;
//   short_description: string;
//   website_url: string;
//   affiliate_url: string;
//   established_year: number;
//   minimum_deposit: string;
//   withdrawal_time: string;
//   bonuses: {
//     id: string;
//     title: string;
//     amount: string;
//     type: string;
//   }[];
// }

export default function CasinoReviewClient({ casino }: Props) {
  // Safe Fallbacks
  const mainBonusTitle =
    casino.bonuses?.[0]?.title || "100% up to $1,500 + 150 Free Spins";

  const games = casino.game_types?.length
    ? casino.game_types.map((gt: any, i: number) => ({
        icon: ["🎰", "🎥", "🏴‍☠️", "🎡", "♠️", "💎"][i % 6],
        title: gt.game_type?.name || "Game",
        count: "Available",
        color: [
          "border-[#F59E0B] bg-[#FFF8F0]",
          "border-[#FF5A5A] bg-[#FFF5F5]",
          "border-[#22C55E] bg-[#F2FFF7]",
          "border-[#D946EF] bg-[#FFF3FF]",
          "border-[#EC4899] bg-[#FFF0F7]",
          "border-[#EAB308] bg-[#FFFFF2]",
        ][i % 6],
        arrow: [
          "text-[#F59E0B]",
          "text-[#FF5A5A]",
          "text-[#22C55E]",
          "text-[#D946EF]",
          "text-[#EC4899]",
          "text-[#EAB308]",
        ][i % 6],
      }))
    : [
        {
          icon: "🎰",
          title: "Slots",
          count: "3,200+ titles",
          color: "border-[#F59E0B] bg-[#FFF8F0]",
          arrow: "text-[#F59E0B]",
        },
        {
          icon: "🎥",
          title: "Live Casino",
          count: "200+ titles",
          color: "border-[#FF5A5A] bg-[#FFF5F5]",
          arrow: "text-[#FF5A5A]",
        },
        {
          icon: "🏴‍☠️",
          title: "Blackjack",
          count: "85+ titles",
          color: "border-[#22C55E] bg-[#F2FFF7]",
          arrow: "text-[#22C55E]",
        },
        {
          icon: "🎡",
          title: "Roulette",
          count: "60+ titles",
          color: "border-[#D946EF] bg-[#FFF3FF]",
          arrow: "text-[#D946EF]",
        },
        {
          icon: "♠️",
          title: "Poker",
          count: "40+ titles",
          color: "border-[#EC4899] bg-[#FFF0F7]",
          arrow: "text-[#EC4899]",
        },
        {
          icon: "💎",
          title: "Baccarat",
          count: "32+ titles",
          color: "border-[#EAB308] bg-[#FFFFF2]",
          arrow: "text-[#EAB308]",
        },
      ];

  const mappedCountries: any[] = [];
  if (
    casino.available_countries?.length > 0 ||
    casino.restricted_countries?.length > 0
  ) {
    casino.available_countries?.forEach((c: any) =>
      mappedCountries.push({
        code: c.country?.code || "us",
        name: c.country?.name || "Country",
        available: true,
      }),
    );
    casino.restricted_countries?.forEach((c: any) =>
      mappedCountries.push({
        code: c.country?.code || "us",
        name: c.country?.name || "Country",
        available: false,
      }),
    );
  }

  const countries =
    mappedCountries.length > 0
      ? mappedCountries
      : [
          { code: "gb", name: "United Kingdom", available: true },
          { code: "ca", name: "Canada", available: true },
          { code: "de", name: "Germany", available: true },
          { code: "au", name: "Australia", available: true },
          { code: "nz", name: "New Zealand", available: true },
          { code: "in", name: "India", available: true },
          { code: "ie", name: "Ireland", available: true },
          { code: "fi", name: "Finland", available: true },
          { code: "no", name: "Norway", available: true },
          { code: "se", name: "Sweden", available: true },
          { code: "us", name: "USA", available: false },
          { code: "fr", name: "France", available: false },
        ];

  const review = {
    initials: "JH",
    name: "James Hawthorne",
    role: "Chief Casino Analyst 12 years experience",
    verdict: "4.8/5.0",
  };

  const securityCards = [
    {
      icon: <ShieldCheck className="w-7 h-7 text-[#00D084]" />,
      title: "Licensed & Regulated",
      subtitle: "MGA / Curacao",
      badge: "✓ Verified by auditor",
      badgeColor: "text-[#00D084]",
    },
    {
      icon: <Lock className="w-7 h-7 text-[#2E68FB]" />,
      title: "256-bit SSL",
      subtitle: "Bank-grade encryption for all data",
      badge: "✓ PCI DSS compliant",
      badgeColor: "text-[#2E68FB]",
    },
    {
      icon: <TriangleAlert className="w-7 h-7 text-[#F59E0B]" />,
      title: "Responsible Gaming",
      subtitle: "Self-exclusion & deposit limits",
      badge: "✓ GamCare partner",
      badgeColor: "text-[#F59E0B]",
    },
  ];

  const trustBadges: string[] =
    casino.badges?.length > 0
      ? casino.badges.map((b: any) => b.badge?.name).filter(Boolean)
      : [
          "eCOGRA",
          "iTech Labs",
          "GambleAware",
          "GamCare",
          "RNG Certified",
          "Fair Gaming",
        ];

  const faqs =
    casino.faqs?.length > 0
      ? casino.faqs
      : [
          {
            question: "What should I look for in a casino review?",
            answer:
              "Our reviews give you a nice overview of what you can expect at an online casino. We recommend looking at the games selection, banking methods and bonuses to help you decide which casino fits you best.",
          },
          {
            question: "What information do your casino reviews include?",
            answer:
              "We review licensing, bonuses, banking, security, games, and support.",
          },
          {
            question: "How do I choose the best online casino?",
            answer:
              "Compare licensing, games, bonuses, payment methods, and withdrawal times.",
          },
          {
            question: "What banking methods should I look for?",
            answer:
              "Visa, Mastercard, Skrill, Neteller, PayPal, bank transfers, and crypto.",
          },
        ];

  return (
    <div className="mx-auto px-4 py-10 font-sans text-gray-800 min-h-screen">
      {/* HERO */}
      <div className="rounded-2xl p-[2px] bg-[linear-gradient(158.37deg,_#FF9C2C_2.3%,_#FFF1CC_15.9%,_#B45B1B_24.24%,_#FFC170_62.4%,_#FEE5B3_75.76%,_#9F5E26_90.07%)]">
        <div
          className="rounded-[14px] p-6 shadow-sm flex flex-col md:flex-row gap-6 items-center justify-between"
          style={{
            background:
              "linear-gradient(231.79deg, #D5EDFF 32.55%, #EEECFF 43.54%, #F9F3FF 53.23%, #F5FCFF 66.16%, #E9F5FF 79.08%)",
          }}
        >
          <div className="flex flex-col sm:flex-row gap-6 items-center w-full md:w-auto">
            <div className="w-[290px] h-[194px] rounded-xl flex items-center justify-center p-4 shrink-0">
              <img
                src={casino.logo}
                alt={casino.name}
                className="max-h-full max-w-full rounded-2xl object-contain"
              />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                <span className="px-3 py-1 rounded-full text-white text-[11px] font-semibold border border-[#F59E0B4D] bg-[linear-gradient(90deg,_#F59E0B_0%,_#D97706_100%)]">
                  Founded: {casino.established_year}
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                <h1 className="text-[24px] font-bold text-gray-900">
                  {casino.name}
                </h1>
                <div className="flex items-center ml-28 gap-1 text-amber-400">
                  <span className="text-[24px]">★★★★★</span>
                  <span className="text-gray-900 font-bold text-[18px] ml-1">
                    {casino.rating}
                  </span>
                  <span className="text-gray-400 text-[16]">(11,847)</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-0 gap-y-1 mt-3 text-xs text-gray-600">
                <p>
                  🎥<span className="font-semibold">MIN DEPOSIT:</span> $
                  {casino.minimum_deposit}
                </p>
                <p>
                  🎡<span className="font-semibold">PAYOUT:</span> Instant - 12h
                </p>
                <p>
                  🎰 <span className="font-semibold">GAMES:</span> 3,800+
                </p>
                <p>
                  💎 <span className="font-semibold">WITHDRAWAL:</span>{" "}
                  {casino.withdrawal_time}
                </p>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-2 text-xs">
                <span className="font-semibold text-gray-500">
                  Payments Methods:
                </span>
                <div className="flex gap-1 items-center bg-gray-50 px-2 py-1 rounded border">
                  <span className="text-[10px] font-bold text-gray-400">
                    VISA / MC / Crypto
                  </span>
                </div>
              </div>
              <p className="text-emerald-500 text-xs font-medium mt-2 flex items-center gap-1">
                ✓ Verified terms No hidden fees
              </p>
            </div>
          </div>
          <div className="w-full lg:w-[260px] flex flex-col justify-center">
            <div className="text-center mb-5">
              <h3 className="text-[18px] leading-tight font-black text-slate-900">
                {mainBonusTitle}
              </h3>
            </div>
            <CasinoAffiliateButton
              casinoId={casino.id}
              defaultUrl={
                casino.affiliate_url ||
                casino.default_affiliate_url ||
                casino.website_url
              }
              className="h-14 rounded-2xl text-white text-lg font-bold flex items-center justify-center transition-all hover:brightness-105 active:translate-y-[1px]"
              style={{
                background: "linear-gradient(180deg, #CDDCFB 0%, #588CF3 100%)",
                boxShadow: "0px 2px 0px 0px #2E68FB",
              }}
            >
              Play Now ▶
            </CasinoAffiliateButton>
          </div>
        </div>
      </div>

      {/* OVERVIEW */}
      <div className="mt-8 mb-4">
        <span className="text-[18px] font-bold text-[#2E68FB] tracking-wider pb-1 uppercase">
          Overview
        </span>
      </div>

      {/* ABOUT */}
      <div
        className="rounded-2xl p-6 mb-8 border border-[#2E68FB] shadow-sm"
        style={{
          background:
            "linear-gradient(231.79deg, #D5EDFF 32.55%, #F5FCFF 66.16%, #E9F5FF 79.08%)",
        }}
      >
        <h2 className="font-poppins text-[24px] font-bold leading-[24px] tracking-normal text-[#16171D] mb-3">
          About {casino.name}
        </h2>
        <p className="font-poppins text-[14px] font-normal leading-[23px] tracking-normal text-[#475467]">
          {casino.overview || casino.short_description}
        </p>
      </div>

      {/* REVIEW GRID */}
      <div id="review" className="mb-10">
        <h2 className="font-poppins text-[24px] font-bold leading-[24px] tracking-normal text-[#16171D] mb-3">
          {casino.name} Review
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="border border-[#2E68FB] rounded-xl p-3">
            <span className="text-[10px] font-bold text-[#2E68FB] uppercase">
              Founded
            </span>
            <span className="text-[14px] font-bold text-[#2E68FB] mt-1 block">
              {casino.established_year}
            </span>
          </div>
          <div className="border border-[#2E68FB] rounded-xl p-3">
            <span className="text-[10px] font-bold text-[#2E68FB] uppercase">
              License
            </span>
            <span className="text-[14px] font-bold text-[#2E68FB] mt-1 block">
              Curaçao eGaming #3048/JAZ
            </span>
          </div>
          <div className="border border-[#2E68FB] rounded-xl p-3">
            <span className="text-[10px] font-bold text-[#2E68FB] uppercase">
              Software Providers
            </span>
            <span className="text-[14px] font-bold text-[#2E68FB] mt-1 block">
              Microgaming, NetEnt, Evolution, Pragmatic Play (15+)
            </span>
          </div>
          <div className="border border-[#2E68FB] rounded-xl p-3">
            <span className="text-[10px] font-bold text-[#2E68FB] uppercase">
              Games Available
            </span>
            <span className="text-[14px] font-bold text-[#2E68FB] mt-1 block">
              3,800+
            </span>
          </div>
          <div className="border border-[#2E68FB] rounded-xl p-3">
            <span className="text-[10px] font-bold text-[#2E68FB] uppercase">
              Currencies
            </span>
            <span className="text-[14px] font-bold text-[#2E68FB] mt-1 block">
              USD, EUR, BTC, LTC, ETH
            </span>
          </div>
          <div className="border border-[#2E68FB] rounded-xl p-3">
            <span className="text-[10px] font-bold text-[#2E68FB] uppercase">
              Languages
            </span>
            <span className="text-[14px] font-bold text-[#2E68FB] mt-1 block">
              English, German, Spanish, French
            </span>
          </div>
          <div className="border border-[#2E68FB] rounded-xl p-3">
            <span className="text-[10px] font-bold text-[#2E68FB] uppercase">
              Min Deposit
            </span>
            <span className="text-[14px] font-bold text-[#2E68FB] mt-1 block">
              ${casino.minimum_deposit}
            </span>
          </div>
          <div className="border border-[#2E68FB] rounded-xl p-3">
            <span className="text-[10px] font-bold text-[#2E68FB] uppercase">
              Payout Speed
            </span>
            <span className="text-[14px] font-bold text-[#2E68FB] mt-1 block">
              {casino.withdrawal_time}
            </span>
          </div>
        </div>
      </div>

      {/* FEATURED IMAGE */}
      <div className="w-full h-auto mb-10 rounded-2xl overflow-hidden">
        <img
          src={casino.featured_image}
          alt={casino.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* WELCOME BONUS */}
      <div>
        <h2 className="font-poppins text-[24px] font-bold leading-[24px] tracking-normal text-[#16171D] mb-3">
          Welcome Bonus & Promotions
        </h2>
        <div className="rounded-2xl bg-[linear-gradient(158.37deg,#FF9C2C_2.3%,#FFF1CC_15.9%,#B45B1B_24.24%,#FFC170_62.4%,#FEE5B3_75.76%,#9F5E26_90.07%)] p-[1px]">
          <div className="rounded-2xl p-6 bg-[linear-gradient(0deg,rgba(255,255,255,0.033),rgba(255,255,255,0.033)),linear-gradient(231.79deg,#D5EDFF_32.55%,#EEECFF_43.54%,#F9F3FF_53.23%,#F5FCFF_66.16%,#E9F5FF_79.08%)]">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-[#2E68FB]">
              <div>
                <span
                  className="inline-flex items-center px-2.5 py-1 rounded-md text-[9px] font-extrabold uppercase tracking-wide text-white border border-[#F59E0B4D]"
                  style={{
                    background:
                      "linear-gradient(90deg, #F59E0B 0%, #D97706 100%)",
                  }}
                >
                  Welcome Offer
                </span>
                <h3 className="font-poppins font-semibold text-[26px] leading-[100%] tracking-normal text-[#111827] mt-2">
                  {mainBonusTitle}
                </h3>
                <p className="font-poppins font-normal text-[12px] leading-[100%] tracking-[0.01em] text-[#4D4D4D] mt-0.5">
                  No promo code required bonus credited automatically.
                </p>
              </div>
              <CasinoAffiliateButton
                casinoId={casino.id}
                defaultUrl={
                  casino.affiliate_url ||
                  casino.default_affiliate_url ||
                  casino.website_url
                }
                className="inline-flex items-center justify-center gap-[3px] w-[195px] h-[52px] px-[10px] py-[14px] rounded-[12px] font-poppins font-semibold text-[14px] leading-[100%] tracking-normal text-[#16171D] bg-[linear-gradient(180deg,#FFE11F_0%,#FF8533_100%)] shadow-[0px_2px_0px_0px_#E36D1F] transition-all duration-200 hover:opacity-95 shrink-0"
              >
                Claim Bonus <span className="text-base">▶</span>
              </CasinoAffiliateButton>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 text-xs">
              <div>
                <p className="font-bold text-black uppercase tracking-wider text-[12px]">
                  Min Deposit:
                </p>
                <p className="font-bold text-gray-900 text-[16px] mt-1">
                  ${casino.minimum_deposit}
                </p>
              </div>
              <div>
                <p className="font-bold text-black uppercase tracking-wider text-[12px]">
                  Wagering:
                </p>
                <p className="font-bold text-gray-900 text-[16px] mt-1">35x</p>
              </div>
              <div>
                <p className="font-bold text-black uppercase tracking-wider text-[12px]">
                  Max Cashout:
                </p>
                <p className="font-bold text-gray-900 text-[16px] mt-1">
                  Unlimited
                </p>
              </div>
              <div>
                <p className="font-bold text-black uppercase tracking-wider text-[12px]">
                  Validity:
                </p>
                <p className="font-bold text-gray-900 text-[16px] mt-1">
                  30 days
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DEPOSIT INFO */}
      <div className="mt-10">
        <div className="inline-flex rounded-full bg-[radial-gradient(circle_at_center,#FFE6B8_0%,#F1A214_100%)] p-[1px]">
          <div className="inline-flex items-center gap-1 rounded-full bg-[#FFF8E6] px-3 py-1">
            <span className="font-poppins text-[10px] font-medium uppercase text-[#F1A214]">
              Funding
            </span>
          </div>
        </div>
        <h2 className="font-poppins text-[24px] font-bold leading-[24px] tracking-normal text-[#16171D] mb-3 mt-3">
          Deposit Information
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-[14px] border border-[#2E68FB70] bg-gradient-to-r from-[#D5EDFF] via-[#EEECFF] via-[#F9F3FF] to-[#E9F5FF] p-5">
            <h3 className="font-poppins font-normal text-[20px] leading-[100%] tracking-normal text-[#16171D]">
              Minimum Deposit
            </h3>
            <p className="mt-3 font-poppins text-[34px] font-bold leading-none text-[#00D084]">
              $10
            </p>
            <p className="mt-2 text-[12px] text-[#666]">Low barrier to entry</p>
          </div>
          <div className="rounded-[14px] border border-[#2E68FB70] bg-gradient-to-r from-[#D5EDFF] via-[#EEECFF] via-[#F9F3FF] to-[#E9F5FF] p-5">
            <h3 className="font-poppins font-normal text-[20px] leading-[100%] tracking-normal text-[#16171D]">
              Maximum Deposit
            </h3>
            <p className="mt-3 font-poppins text-[34px] font-bold leading-none text-[#2E68FB]">
              $10,000
            </p>
            <p className="mt-2 text-[12px] text-[#666]">Per transaction</p>
          </div>
          <div className="rounded-[14px] border border-[#2E68FB70] bg-gradient-to-r from-[#D5EDFF] via-[#EEECFF] via-[#F9F3FF] to-[#E9F5FF] p-5">
            <h3 className="font-poppins font-normal text-[20px] leading-[100%] tracking-normal text-[#16171D]">
              Processing Time
            </h3>
            <p className="mt-3 font-poppins text-[34px] font-bold leading-none text-[#F59E0B]">
              Instant
            </p>
            <p className="mt-2 text-[12px] text-[#666]">All methods</p>
          </div>
        </div>
      </div>

      {/* GAMES */}
      <div className="mt-10">
        <div className="inline-flex rounded-full bg-[radial-gradient(circle_at_center,#B8CEFF_0%,#2E68FB_100%)] p-[1px]">
          <div className="flex items-center gap-1 rounded-full bg-[#E6EDFF] px-4 py-1">
            <BookOpen className="w-3.5 h-3.5 text-[#2E68FB]" />
            <span className="font-poppins text-[10px] font-medium uppercase text-[#2E68FB]">
              Library
            </span>
          </div>
        </div>
        <h2 className="font-poppins text-[24px] font-bold leading-[24px] tracking-normal text-[#16171D] mb-3 mt-3">
          Explore 3,800+ Games
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {games.map((game: any) => (
            <div
              key={game.title}
              className={`rounded-2xl border ${game.color} p-6 transition hover:shadow-md`}
            >
              <div className="text-3xl">{game.icon}</div>
              <h3 className="mt-4 font-poppins text-[24px] font-semibold text-[#16171D]">
                {game.title}
              </h3>
              <p className="mt-1 text-[14px] text-[#4D4D4D]">{game.count}</p>
              <div className="mt-2 flex items-center justify-between border-t pt-3">
                <span className="text-[12px] text-[#6B7280]">
                  Top providers
                </span>
                <span className={`${game.arrow} text-lg`}>▶</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* COUNTRIES */}
      <div className="mt-10">
        <div className="inline-flex rounded-full bg-[radial-gradient(circle_at_center,#B8CEFF_0%,#2E68FB_100%)] p-[1px]">
          <div className="flex items-center gap-1 rounded-full bg-[#E6EDFF] px-4 py-1">
            <Globe className="w-3.5 h-3.5 text-[#2E68FB]" />
            <span className="font-poppins text-[10px] font-medium uppercase text-[#2E68FB]">
              Availability
            </span>
          </div>
        </div>
        <h2 className="font-poppins text-[24px] font-bold leading-[24px] tracking-normal text-[#16171D] mb-3 mt-3">
          Supported Countries
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
          {countries.map((country) => (
            <div
              key={country.code}
              className={`rounded-2xl border p-5 ${country.available ? "border-[#22C55E] bg-[#F0FFF8]" : "border-[#EF4444] bg-[#FFF5F5]"}`}
            >
              <div className="flex items-center gap-3">
                <CircleFlag
                  countryCode={country.code.toLowerCase()}
                  className="w-6 h-6 shrink-0"
                />
                <h3 className="font-poppins text-[20px] font-medium text-[#16171D]">
                  {country.name}
                </h3>
              </div>
              <p
                className={`mt-5 text-[12px] font-medium uppercase ${country.available ? "text-[#22C55E]" : "text-[#EF4444]"}`}
              >
                {country.available ? "✓ Available" : "✗ Restricted"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* SECURITY */}
      <div className="mt-10">
        <div className="inline-flex rounded-full bg-[radial-gradient(circle_at_center,#B8CEFF_0%,#2E68FB_100%)] p-[1px]">
          <div className="flex items-center gap-1 rounded-full bg-[#E6EDFF] px-4 py-1">
            <ShieldCheck className="w-3 h-3 text-[#2E68FB]" />
            <span className="font-poppins text-[10px] font-medium uppercase text-[#2E68FB]">
              Trust & Safety
            </span>
          </div>
        </div>
        <h2 className="font-poppins text-[24px] font-bold leading-[24px] tracking-normal text-[#16171D] mb-3 mt-3">
          Security & Licensing
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {securityCards.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-[#2E68FB70] bg-white p-6"
            >
              {item.icon}
              <h3 className="mt-2 font-poppins text-[22px] font-semibold text-[#16171D]">
                {item.title}
              </h3>
              <p className="font-poppins text-[14px] text-[#4D4D4D]">
                {item.subtitle}
              </p>
              <p className={`mt-4 text-[10px] font-medium ${item.badgeColor}`}>
                {item.badge}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          {trustBadges.map((badge) => (
            <div
              key={badge}
              className="flex items-center gap-2 rounded-xl bg-white px-4 py-2"
            >
              <BadgeCheck className="w-4 h-4 text-[#00D084]" />
              <span className="font-poppins text-[14px] font-medium text-[#00D084]">
                {badge}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* EXPERT REVIEW */}
      <div className="mt-10">
        <div className="inline-flex rounded-full bg-[radial-gradient(circle_at_center,#B8CEFF_0%,#2E68FB_100%)] p-[1px]">
          <div className="flex items-center gap-1 rounded-full bg-[#E6EDFF] px-4 py-1">
            <BadgeCheck className="w-3.5 h-3.5 text-[#2E68FB]" />
            <span className="font-poppins text-[10px] font-medium uppercase text-[#2E68FB]">
              Editorial
            </span>
          </div>
        </div>
        <h2 className="font-poppins text-[24px] font-bold leading-[24px] tracking-normal text-[#16171D] mb-3 mt-3">
          Expert Review
        </h2>
        <div className="mt-6 rounded-[20px] border border-[#F59E0B] bg-gradient-to-r from-[#D5EDFF]/20 via-[#EEECFF]/20 via-[#F9F3FF]/20 to-[#E9F5FF]/20 p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#F59E0B]">
                <span className="font-poppins text-[30px] font-bold text-white">
                  {review.initials}
                </span>
              </div>
              <div>
                <h3 className="font-poppins font-semibold text-[22px] leading-[100%] tracking-normal text-[#16171D]">
                  {review.name}
                </h3>
                <p className="mt-1 text-[12px] text-[#666666]">{review.role}</p>
              </div>
            </div>
            <div className="inline-flex rounded-full bg-[#F59E0B] p-[1px]">
              <div className="flex items-center gap-2 rounded-full bg-[#FFF8E6] px-4 py-2">
                <BadgeCheck className="h-4 w-4 text-[#F59E0B]" />
                <span className="text-[11px] font-semibold uppercase text-[#F59E0B]">
                  Verified Expert
                </span>
              </div>
            </div>
          </div>
          <div className="my-6 h-px bg-[#2E68FB]" />
          <div className="space-y-2">
            <p className="text-[16px] leading-9 font-medium text-[#16171D]">
              {casino.editor_view ||
                `After hands-on testing ${casino.name}, our analysts found excellent game variety, fast payouts, and robust licensing. Recommended for both new and experienced players.`}
            </p>
          </div>
          <div className="my-6 h-px bg-[#2E68FB]" />
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[14px] text-[#666666]">Verdict</p>
              <div className="mt-1 flex items-center gap-3">
                <span className="font-poppins text-[22px] font-bold text-[#16171D]">
                  {review.verdict}
                </span>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-3 w-3 fill-[#F59E0B] text-[#F59E0B]"
                    />
                  ))}
                </div>
              </div>
            </div>
            <CasinoAffiliateButton
              casinoId={casino.id}
              defaultUrl={
                casino.affiliate_url ||
                casino.default_affiliate_url ||
                casino.website_url
              }
              className="inline-flex items-center justify-center gap-[4px] w-[168px] h-[52px] rounded-[12px] px-[10px] py-[14px] font-poppins font-semibold text-[16px] leading-[100%] tracking-normal text-[#16171D] bg-[linear-gradient(180deg,#FFE11F_0%,#FF8533_100%)] shadow-[0px_2px_0px_0px_#E36D1F] transition-all duration-200 hover:opacity-95"
            >
              Visit {casino.name} <span className="text-[16px]">▶</span>
            </CasinoAffiliateButton>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="mt-10">
        <div className="inline-flex rounded-full bg-[radial-gradient(circle_at_center,#B8CEFF_0%,#2E68FB_100%)] p-[1px]">
          <div className="flex items-center gap-1 rounded-full bg-[#E6EDFF] px-4 py-1">
            <BadgeCheck className="w-3.5 h-3.5 text-[#2E68FB]" />
            <span className="font-poppins text-[10px] font-medium uppercase text-[#2E68FB]">
              Editorial
            </span>
          </div>
        </div>
        <h2 className="font-poppins text-[24px] font-bold leading-[24px] tracking-normal text-[#16171D] mb-3 mt-3">
          Frequently Asked Questions
        </h2>
        <div className="mt-6 overflow-hidden rounded-[16px] bg-white border border-[#EEF2FF]">
          <div className="h-1 bg-[#2E68FB]" />
          {faqs.map((faq: any, index: number) => (
            <details
              key={index}
              open={index === 0}
              className={`group ${index !== faqs.length - 1 ? "border-b border-[#EEF2FF]" : ""}`}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between px-6 py-6 font-semibold text-[#16171D] group-open:text-[#2E68FB]">
                {faq.question}
                <ChevronRight className="h-5 w-5 transition group-open:rotate-90 text-[#2E68FB]" />
              </summary>
              <p className="px-6 pb-6 text-[14px] text-[#7C7C7C] leading-7">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>

      {/* USER REVIEWS */}
      <div className="mt-10">
        <div className="inline-flex rounded-full bg-[radial-gradient(circle_at_center,#B8CEFF_0%,#2E68FB_100%)] p-[1px]">
          <div className="flex items-center gap-1 rounded-full bg-[#E6EDFF] px-4 py-1">
            <Star className="w-3.5 h-3.5 text-[#2E68FB]" />
            <span className="font-poppins text-[10px] font-medium uppercase text-[#2E68FB]">
              Reviews
            </span>
          </div>
        </div>
        <UserReviewsSection casinoId={casino.id} casinoName={casino.name} />
      </div>

      {/* SIMILAR */}
      <SimilarCasinosSection slug={casino.slug} />
    </div>
  );
}
