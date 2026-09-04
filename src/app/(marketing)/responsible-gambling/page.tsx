// 'use client';

// import React, { useState } from 'react';
// import Link from 'next/link';
// import {
//   ShieldAlert,
//   HeartHandshake,
//   AlertTriangle,
//   HelpCircle,
//   ExternalLink,
//   Lock,
//   Phone,
//   CheckCircle2,
//   Clock,
//   Ban,
//   Scale,
//   Sparkles,
//   ArrowRight,
//   ShieldCheck,
//   FileText,
//   UserX,
//   DollarSign,
//   Flame,
// } from 'lucide-react';

// export default function ResponsibleGamblingPage() {
//   // Simple interactive self-assessment quiz state
//   const [answers, setAnswers] = useState<Record<number, boolean>>({});

//   const quizQuestions = [
//     'Do you ever stay away from work, college, or school to gamble?',
//     'Do you gamble to escape a boring or unhappy life?',
//     'When gambling and running out of money, do you feel lost and desperate to gamble again as soon as possible?',
//     'Do you gamble until your last penny is gone, even the fare home or the cost of a cup of tea?',
//     'Have you ever lied to cover up the amount of money or time you have spent gambling?',
//     'Have others ever criticized your gambling?',
//     'Have you lost interest in your family, friends, or hobbies due to gambling?',
//     'After losing, do you feel you must try and win back your losses as soon as possible?',
//   ];

//   const handleQuizChange = (index: number, val: boolean) => {
//     setAnswers({ ...answers, [index]: val });
//   };

//   const yesCount = Object.values(answers).filter(Boolean).length;

//   return (
//     <main className="min-h-screen ">
//       {/* ================= 1. LIGHT HERO SECTION WITH CUSTOM CENTER GRADIENT ================= */}
//      <section
//         className="relative overflow-hidden  pt-10 pb-16 lg:pt-18 lg:pb-20"
//         style={{
//           background:
//             'linear-gradient(135deg, #EEF3FE 0%, #EEF3FE 40%, #EEF3FE 70%, #EEF3FE 100%)',
//         }}
//       >
//         <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl pointer-events-none" />
//         <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl pointer-events-none" />

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//           <div className="text-center  mx-auto space-y-4">
//             <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-amber-200/80 shadow-sm text-xs font-bold tracking-wider uppercase text-amber-800">
//               <ShieldAlert className="w-4 h-4 text-amber-600" />
//               Player Safety & Advocacy Commitment
//             </div>

//             <h1 className="text-4xl sm:text-5xl font-black text-[#0F172A] tracking-tight">
//               Responsible Gambling <br />
//               <span className="text-[#2E68FB]">& Player Protection Directive</span>
//             </h1>

//             <p className="text-base sm:text-lg text-[#475569] leading-relaxed font-normal">
//               At Casino Reviews Book, player safety comes before commercial interest. Gambling should remain a controlled form of entertainment—never a financial solution or alternative income source.
//             </p>

//             <div className="pt-4 flex flex-wrap justify-center gap-6 text-xs font-semibold text-[#475569]">
//               <span className="flex items-center gap-1.5">
//                 <CheckCircle2 className="w-4 h-4 text-[#00B67A]" /> Independent Auditing
//               </span>
//               <span className="flex items-center gap-1.5">
//                 <Lock className="w-4 h-4 text-[#2E68FB]" /> Strict 18+ Verification
//               </span>
//               <span className="flex items-center gap-1.5">
//                 <HeartHandshake className="w-4 h-4 text-amber-600" /> Free Global Support Access
//               </span>
//             </div>
//           </div>
//         </div>
//       </section>
//       {/* ================= 2. EMERGENCY DIRECT HELP BANNER ================= */}
//       <section className="py-10 relative z-20">
//         <div className="p-6 sm:p-8 rounded-3xl bg-white border border-red-200 shadow-xl shadow-red-900/5 flex flex-col md:flex-row items-center justify-between gap-6">
//           <div className="flex items-start gap-4">
//             <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-red-600 shrink-0">
//               <Phone className="w-6 h-6" />
//             </div>
//             <div>
//               <h3 className="text-lg font-bold text-[#0F172A]">Need Immediate Help or Confidential Advice?</h3>
//               <p className="text-xs sm:text-sm text-[#64748B] mt-1">
//                 If you or someone you know is struggling with gambling addiction, free and confidential support is available 24/7.
//               </p>
//             </div>
//           </div>

//           <div className="flex flex-wrap gap-3 shrink-0 w-full md:w-auto">
//             <a
//               href="https://www.begambleaware.org"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="w-full sm:w-auto h-11 px-5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-md shadow-red-500/20"
//             >
//               BeGambleAware <ExternalLink className="w-3.5 h-3.5" />
//             </a>
//             <a
//               href="https://www.gamblingtherapy.org"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="w-full sm:w-auto h-11 px-5 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#0F172A] font-bold text-xs flex items-center justify-center gap-2 transition"
//             >
//               Gambling Therapy <ExternalLink className="w-3.5 h-3.5" />
//             </a>
//           </div>
//         </div>
//       </section>

//       {/* ================= 3. CORE PRINCIPLES OF RESPONSIBLE PLAY ================= */}
//       <section className="py-10 ">
//         <div className="text-center max-w-3xl mx-auto mb-12">
//           <span className="text-xs font-bold uppercase tracking-wider text-[#2E68FB] mb-2 block">
//             Golden Rules
//           </span>
//           <h2 className="text-3xl font-bold text-[#0F172A]">
//             Essential Rules for Safe Gambling
//           </h2>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           <div className="p-6 rounded-2xl bg-white border border-gray-200/90 shadow-sm space-y-3">
//             <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2E68FB] flex items-center justify-center font-bold">
//               <DollarSign className="w-5 h-5" />
//             </div>
//             <h3 className="font-bold text-base text-[#0F172A]">Set a Loss Limit</h3>
//             <p className="text-xs text-[#64748B] leading-relaxed">
//               Never gamble money allocated for essential living costs such as rent, bills, groceries, or savings. Decide a disposable limit before playing.
//             </p>
//           </div>

//           <div className="p-6 rounded-2xl bg-white border border-gray-200/90 shadow-sm space-y-3">
//             <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2E68FB] flex items-center justify-center font-bold">
//               <Clock className="w-5 h-5" />
//             </div>
//             <h3 className="font-bold text-base text-[#0F172A]">Cap Your Playing Time</h3>
//             <p className="text-xs text-[#64748B] leading-relaxed">
//               Track how long you play. Set alarms or use platform session reminders to avoid losing track of time and extending sessions unnecessarily.
//             </p>
//           </div>

//           <div className="p-6 rounded-2xl bg-white border border-gray-200/90 shadow-sm space-y-3">
//             <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2E68FB] flex items-center justify-center font-bold">
//               <Flame className="w-5 h-5" />
//             </div>
//             <h3 className="font-bold text-base text-[#0F172A]">Never Chase Losses</h3>
//             <p className="text-xs text-[#64748B] leading-relaxed">
//               Trying to win back lost money usually leads to further losses. Accept that losses are a cost of entertainment and walk away.
//             </p>
//           </div>

//           <div className="p-6 rounded-2xl bg-white border border-gray-200/90 shadow-sm space-y-3">
//             <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2E68FB] flex items-center justify-center font-bold">
//               <UserX className="w-5 h-5" />
//             </div>
//             <h3 className="font-bold text-base text-[#0F172A]">Do Not Play Distracted</h3>
//             <p className="text-xs text-[#64748B] leading-relaxed">
//               Never gamble when under the influence of alcohol or drugs, or when experiencing extreme emotional distress, anger, or depression.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* ================= 4. INTERACTIVE SELF-ASSESSMENT QUIZ ================= */}
//       <section className="py-10">
//         <div className="bg-white border border-gray-200/90 rounded-3xl p-8 sm:p-12 shadow-sm">
//           <div className="max-w-3xl mb-8">
//             <span className="text-xs font-bold uppercase tracking-wider text-[#2E68FB] mb-2 block">
//               Self-Assessment
//             </span>
//             <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">
//               Is Gambling Becoming a Problem for You?
//             </h2>
//             <p className="mt-2 text-xs sm:text-sm text-[#64748B] leading-relaxed">
//               Answering these quick questions can help you evaluate whether your gambling habits are remaining within healthy boundaries.
//             </p>
//           </div>

//           <div className="space-y-4">
//             {quizQuestions.map((question, idx) => (
//               <div
//                 key={idx}
//                 className="p-4 rounded-xl bg-[#F8FAFC] border border-gray-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
//               >
//                 <span className="text-xs sm:text-sm font-semibold text-[#0F172A]">
//                   {idx + 1}. {question}
//                 </span>

//                 <div className="flex items-center gap-3 shrink-0">
//                   <button
//                     type="button"
//                     onClick={() => handleQuizChange(idx, true)}
//                     className={`h-8 px-4 rounded-lg text-xs font-bold transition ${answers[idx] === true
//                         ? 'bg-red-600 text-white'
//                         : 'bg-white border border-gray-300 text-[#0F172A] hover:bg-gray-50'
//                       }`}
//                   >
//                     Yes
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => handleQuizChange(idx, false)}
//                     className={`h-8 px-4 rounded-lg text-xs font-bold transition ${answers[idx] === false
//                         ? 'bg-emerald-600 text-white'
//                         : 'bg-white border border-gray-300 text-[#0F172A] hover:bg-gray-50'
//                       }`}
//                   >
//                     No
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Quiz Score Summary */}
//           {Object.keys(answers).length > 0 && (
//             <div className="mt-8 p-6 rounded-2xl bg-amber-50 border border-amber-200 text-[#0F172A] space-y-2">
//               <h3 className="font-bold text-base flex items-center gap-2">
//                 <AlertTriangle className="w-5 h-5 text-amber-700" />
//                 Assessment Result: {yesCount} "Yes" Answer(s)
//               </h3>
//               <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
//                 {yesCount >= 3
//                   ? 'Answering "Yes" to 3 or more questions indicates that gambling may be negatively impacting your life. We strongly encourage utilizing self-exclusion tools or contacting one of the free support helplines below.'
//                   : 'Your answers suggest a relatively healthy approach, but always stay vigilant. Re-evaluate your limits regularly.'}
//               </p>
//             </div>
//           )}
//         </div>
//       </section>

//       {/* ================= 5. CASINO TOOLS FOR PLAYER CONTROL ================= */}
//       <section className=" py-10">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center max-w-3xl mx-auto mb-16">
//             <span className="text-xs font-bold uppercase tracking-wider text-[#2E68FB] mb-3 block">
//               Operator Auditing Standard
//             </span>
//             <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A]">
//               Tools Every Audited Casino Must Provide
//             </h2>
//             <p className="mt-4 text-[#475569] text-base">
//               As part of our rating system, we heavily penalize or blacklist operators that do not offer accessible self-limitation and exclusion tools.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-gray-200/90 space-y-3">
//               <div className="w-10 h-10 rounded-xl bg-[#2E68FB] text-white flex items-center justify-center font-bold">
//                 1
//               </div>
//               <h3 className="font-bold text-lg text-[#0F172A]">Deposit & Wager Limits</h3>
//               <p className="text-xs text-[#64748B] leading-relaxed">
//                 Allows players to cap daily, weekly, or monthly deposit ceilings. Decreases take effect instantly, while limit increases require a 24-hour cooling-off period.
//               </p>
//             </div>

//             <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-gray-200/90 space-y-3">
//               <div className="w-10 h-10 rounded-xl bg-[#2E68FB] text-white flex items-center justify-center font-bold">
//                 2
//               </div>
//               <h3 className="font-bold text-lg text-[#0F172A]">Time-Out / Cooling Off</h3>
//               <p className="text-xs text-[#64748B] leading-relaxed">
//                 Temporarily suspends your casino account for periods ranging from 24 hours to 6 weeks. During this window, operators cannot send marketing emails.
//               </p>
//             </div>

//             <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-gray-200/90 space-y-3">
//               <div className="w-10 h-10 rounded-xl bg-[#2E68FB] text-white flex items-center justify-center font-bold">
//                 3
//               </div>
//               <h3 className="font-bold text-lg text-[#0F172A]">Self-Exclusion</h3>
//               <p className="text-xs text-[#64748B] leading-relaxed">
//                 Formally seals your account for 6 months to 5 years (or permanently). Operators are legally prohibited from reopening self-excluded accounts until the period expires.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ================= 6. INTERNATIONAL SUPPORT HELPLINES ================= */}
//       <section className="py-10 ">
//         <div className="text-center max-w-3xl mx-auto mb-16">
//           <span className="text-xs font-bold uppercase tracking-wider text-[#2E68FB] mb-3 block">
//             Global Support Directory
//           </span>
//           <h2 className="text-3xl font-bold text-[#0F172A]">
//             Confidential Helplines by Region
//           </h2>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {/* UK & Europe */}
//           <div className="p-6 rounded-2xl bg-white border border-gray-200/90 shadow-sm space-y-3">
//             <span className="text-xs font-bold text-[#2E68FB] uppercase tracking-wider">United Kingdom & Europe</span>
//             <h3 className="font-bold text-lg text-[#0F172A]">GamCare & GamStop</h3>
//             <p className="text-xs text-[#64748B]">Free support helpline and multi-operator self-exclusion registry across the UK.</p>
//             <div className="pt-2 text-xs space-y-1 font-mono">
//               <p className="text-[#0F172A] font-bold">Phone: 0808 8020 133</p>
//               <a href="https://www.gamstop.co.uk" target="_blank" rel="noopener noreferrer" className="text-[#2E68FB] underline block">www.gamstop.co.uk</a>
//             </div>
//           </div>

//           {/* North America */}
//           <div className="p-6 rounded-2xl bg-white border border-gray-200/90 shadow-sm space-y-3">
//             <span className="text-xs font-bold text-[#2E68FB] uppercase tracking-wider">United States</span>
//             <h3 className="font-bold text-lg text-[#0F172A]">NCPG (1-800-GAMBLER)</h3>
//             <p className="text-xs text-[#64748B]">National Council on Problem Gambling providing 24/7 confidential phone and text support.</p>
//             <div className="pt-2 text-xs space-y-1 font-mono">
//               <p className="text-[#0F172A] font-bold">Phone: 1-800-522-4700</p>
//               <a href="https://www.ncpgambling.org" target="_blank" rel="noopener noreferrer" className="text-[#2E68FB] underline block">www.ncpgambling.org</a>
//             </div>
//           </div>

//           {/* Canada */}
//           <div className="p-6 rounded-2xl bg-white border border-gray-200/90 shadow-sm space-y-3">
//             <span className="text-xs font-bold text-[#2E68FB] uppercase tracking-wider">Canada</span>
//             <h3 className="font-bold text-lg text-[#0F172A]">CPGCB & ConnexOntario</h3>
//             <p className="text-xs text-[#64748B]">Provincial addiction support networks and helpline services across Canada.</p>
//             <div className="pt-2 text-xs space-y-1 font-mono">
//               <p className="text-[#0F172A] font-bold">Phone: 1-866-531-2600</p>
//               <a href="https://www.connexontario.ca" target="_blank" rel="noopener noreferrer" className="text-[#2E68FB] underline block">www.connexontario.ca</a>
//             </div>
//           </div>

//           {/* Australia */}
//           <div className="p-6 rounded-2xl bg-white border border-gray-200/90 shadow-sm space-y-3">
//             <span className="text-xs font-bold text-[#2E68FB] uppercase tracking-wider">Australia</span>
//             <h3 className="font-bold text-lg text-[#0F172A]">Gambling Help Online</h3>
//             <p className="text-xs text-[#64748B]">National counseling service funded by state and territory governments.</p>
//             <div className="pt-2 text-xs space-y-1 font-mono">
//               <p className="text-[#0F172A] font-bold">Phone: 1800 858 858</p>
//               <a href="https://www.gamblinghelponline.org.au" target="_blank" rel="noopener noreferrer" className="text-[#2E68FB] underline block">www.gamblinghelponline.org.au</a>
//             </div>
//           </div>

//           {/* International */}
//           <div className="p-6 rounded-2xl bg-white border border-gray-200/90 shadow-sm space-y-3">
//             <span className="text-xs font-bold text-[#2E68FB] uppercase tracking-wider">Global Coverage</span>
//             <h3 className="font-bold text-lg text-[#0F172A]">Gamblers Anonymous</h3>
//             <p className="text-xs text-[#64748B]">Global fellowship of men and women sharing experience to solve common problem gambling.</p>
//             <div className="pt-2 text-xs space-y-1 font-mono">
//               <a href="https://www.gamblersanonymous.org" target="_blank" rel="noopener noreferrer" className="text-[#2E68FB] underline block">www.gamblersanonymous.org</a>
//             </div>
//           </div>

//           {/* Software Blockers */}
//           <div className="p-6 rounded-2xl bg-white border border-gray-200/90 shadow-sm space-y-3">
//             <span className="text-xs font-bold text-[#2E68FB] uppercase tracking-wider">Blocking Software</span>
//             <h3 className="font-bold text-lg text-[#0F172A]">Gamban & NetNanny</h3>
//             <p className="text-xs text-[#64748B]">Software applications that block access to thousands of gambling websites worldwide.</p>
//             <div className="pt-2 text-xs space-y-1 font-mono">
//               <a href="https://www.gamban.com" target="_blank" rel="noopener noreferrer" className="text-[#2E68FB] underline block">www.gamban.com</a>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ================= 7. UNDERAGE PROTECTION ================= */}
//       <section className=" py-10">

//           <div className="p-8 rounded-3xl bg-red-50/60 border border-blue-100 flex flex-col md:flex-row items-center justify-between gap-6">
//             <div className="space-y-2 max-w-2xl">
//               <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2E68FB]">
//                 <Ban className="w-4 h-4 text-red-500" /> Strict Underage Protection Policy
//               </div>
//               <h3 className="text-2xl font-bold text-[#0F172A]">18+ / 21+ Age Verification Standard</h3>
//               <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
//                 Gambling under the legal age is an offense. Casino Reviews Book strictly enforces age checks across all promotional links and does not knowingly target or collect data from minors. We advise parents to utilize filtering software such as NetNanny or CyberSitter to block access to gambling websites on shared devices.
//               </p>
//             </div>
//             <div className="w-20 h-20 rounded-2xl bg-white border border-blue-200 flex items-center justify-center font-black text-2xl text-[#2E68FB] shrink-0 shadow-sm">
//               18+
//             </div>
//           </div>

//       </section>
//     </main>
//   );
// }

import {
  articleSchema,
  breadcrumbSchema,
  buildSchemaGraph,
  faqSchema,
  searchActionSchema,
  webpageSchema,
} from "@/lib/seo/schemas";
import ResponsibleGamblingClient from "./ResponsibleGamblingClient";
import { generateSEO } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";

export const metadata = generateSEO({
  title: "Responsible Gambling | Player Safety & Gambling Support",
  description:
    "Learn responsible gambling practices, bankroll management, self-exclusion options, warning signs of gambling harm, and support organizations that help players gamble safely.",
  path: "/responsible-gambling",
  keywords: [
    "responsible gambling",
    "safe gambling",
    "gambling support",
    "self exclusion",
    "problem gambling",
    "gambling addiction",
    "bankroll management",
    "player protection",
    "responsible gaming",
    "gambling help",
  ],
});

const PAGE_URL = "https://casinoreviewsbook.com/responsible-gambling";

const graph = buildSchemaGraph({
  webpage: webpageSchema({
    url: PAGE_URL,
    title: "Responsible Gambling | Player Safety & Gambling Support",
    description:
      "Educational guide about responsible gambling, bankroll management, self-exclusion, and player protection.",
  }),

  breadcrumb: breadcrumbSchema({
    pageUrl: PAGE_URL,
    items: [
      {
        name: "Home",
        url: "https://casinoreviewsbook.com",
      },
      {
        name: "Responsible Gambling",
        url: PAGE_URL,
      },
    ],
  }),

  article: articleSchema({
    title: "Responsible Gambling | Player Safety & Gambling Support",
    description:
      "Comprehensive guide covering responsible gambling practices, self-exclusion, gambling support organizations, bankroll management, and recognizing the signs of gambling-related harm.",
    url: PAGE_URL,
    authorUrl: "https://casinoreviewsbook.com/about",
    published: "2026-02-23",
    modified: `${new Date().toISOString()}`,
    articleSection: "Responsible Gambling",
    keywords: [
      "Responsible Gambling",
      "Player Protection",
      "Self Exclusion",
      "Problem Gambling",
      "Bankroll Management",
      "Gambling Addiction",
      "Gambling Support",
      "Responsible Gaming",
    ],
  }),
  faq: faqSchema({
    pageUrl: PAGE_URL,
    faqs: [
      {
        question: "What is responsible gambling?",
        answer:
          "Responsible gambling means treating gambling as a form of entertainment rather than a way to earn money. It includes setting personal spending and time limits, gambling only with money you can afford to lose, understanding the odds, and stopping play when gambling is no longer enjoyable.",
      },
      {
        question: "What are the signs of problem gambling?",
        answer:
          "Warning signs may include spending more money or time gambling than intended, chasing losses, borrowing money to gamble, hiding gambling activity from family or friends, neglecting work or personal responsibilities, or feeling anxious or stressed about gambling. If these signs appear, consider taking a break and seeking professional support.",
      },
      {
        question: "What is self-exclusion?",
        answer:
          "Self-exclusion is a voluntary program that allows players to block access to gambling services for a chosen period of time. Many licensed gambling operators offer self-exclusion tools, and some jurisdictions also provide national self-exclusion programs covering multiple operators.",
      },
      {
        question: "How can I set a gambling budget?",
        answer:
          "Decide on a fixed entertainment budget before you begin playing and never exceed it. Set deposit, loss, and session time limits where available, avoid increasing your budget to recover losses, and stop gambling once your planned spending limit has been reached.",
      },
      {
        question: "Can I make money consistently from gambling?",
        answer:
          "No. Gambling outcomes are based on chance or game mathematics, and no strategy can guarantee consistent profits. While some games have better odds than others, every licensed casino game has a house edge, and losses are always possible.",
      },
      {
        question:
          "What tools do online casinos offer for responsible gambling?",
        answer:
          "Many licensed online casinos provide responsible gambling tools such as deposit limits, loss limits, wagering limits, session reminders, cooling-off periods, account history, reality checks, and self-exclusion. The available features depend on the operator and its licensing jurisdiction.",
      },
      {
        question:
          "What should I do if I think my gambling is becoming a problem?",
        answer:
          "Take a break from gambling, use available responsible gambling tools such as deposit limits or self-exclusion, speak with trusted family or friends if appropriate, and consider contacting a qualified gambling support organization in your country for confidential advice and assistance.",
      },
      {
        question:
          "Can responsible gambling tools guarantee that I won't overspend?",
        answer:
          "Responsible gambling tools can help you manage your gambling activity, but they cannot guarantee that you will not exceed your limits. They work best when combined with personal discipline, realistic expectations, and regular review of your gambling habits.",
      },
    ],
  }),

  searchAction: searchActionSchema({
    siteUrl: "https://casinoreviewsbook.com",
    searchPath: "/search",
  }),
});

export default function Page() {
  return (
    <>
      <JsonLd data={graph} />
      <ResponsibleGamblingClient />
    </>
  );
}
