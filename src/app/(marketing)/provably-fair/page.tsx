import { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  Cpu,
  RefreshCw,
  Hash,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Flame,
  Code2,
  Terminal,
} from "lucide-react";
import { generateSEO } from "@/lib/seo";
import {
  breadcrumbSchema,
  buildSchemaGraph,
  faqSchema,
  itemListSchema,
  webpageSchema,
} from "@/lib/seo/schemas";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = generateSEO({
  title: "Provably Fair Casinos: Complete Guide & Verification - Casino Reviews Book",
  description:
    "Learn how Provably Fair algorithms work in crypto and online casinos. Understand SHA-256 hashes, server seeds, client seeds, and how to mathematically verify every bet outcome.",
  path: "/provably-fair",
  keywords: [
    "provably fair",
    "provably fair gambling",
    "crypto casino fairness",
    "server seed client seed nonce",
    "verify casino bet",
    "provably fair crash plinko dice",
  ],
});

const fairFaqs = [
  {
    question: "What does 'Provably Fair' mean in online gambling?",
    answer:
      "Provably Fair is a cryptographic technology used primarily in crypto and modern online casinos that enables players to independently verify that every game outcome was mathematically generated without casino tampering or prior manipulation.",
  },
  {
    question: "Can an online casino manipulate a Provably Fair game?",
    answer:
      "No. Because the casino commits to a hashed server seed BEFORE you place your bet, and the outcome depends partly on your client seed (which you control) and a sequential nonce, the casino cannot alter the outcome without creating a hash mismatch that exposes the fraud.",
  },
  {
    question: "What is the difference between Provably Fair and standard RNG audits?",
    answer:
      "Traditional casinos rely on third-party auditing firms (like eCOGRA or iTech Labs) that test random number generators periodically in laboratory settings. Provably Fair allows you, the player, to verify every individual wager yourself instantly in real-time.",
  },
  {
    question: "Which games support Provably Fair verification?",
    answer:
      "Common provably fair games include Crash (Aviator), Dice, Plinko, Mines, Limbo, Hilo, and custom crypto roulette/blackjack titles developed by platforms like Spribe, BGaming, and in-house proprietary engines.",
  },
];

export default function ProvablyFairPage() {
  const graph = buildSchemaGraph({
    webpage: webpageSchema({
      url: "https://casinoreviewsbook.com/provably-fair",
      title: "Provably Fair Casinos: Complete Guide & Verification",
      description:
        "Comprehensive educational guide on provably fair blockchain gambling, cryptographic seeds, hashing algorithms, and verification tools.",
      type: "WebPage",
      breadcrumbId: "https://casinoreviewsbook.com/provably-fair/#breadcrumb",
    }),
    breadcrumb: breadcrumbSchema({
      pageUrl: "https://casinoreviewsbook.com/provably-fair",
      items: [
        { name: "Home", url: "https://casinoreviewsbook.com" },
        { name: "Provably Fair", url: "https://casinoreviewsbook.com/provably-fair" },
      ],
    }),
    faq: faqSchema({
      pageUrl: "https://casinoreviewsbook.com/provably-fair/#faq",
      faqs: fairFaqs,
    }),
  });

  return (
    <>
      <JsonLd data={graph} />

      <main className="min-h-screen ">
        {/* Hero Section */}
        <section
          className="relative overflow-hidden py-14 sm:py-20"
          style={{
            background:
              "linear-gradient(135deg, #EEF3FE 0%, #F5F3FF 50%, #EEF3FE 100%)",
          }}
        >
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-emerald-300 shadow-2xs text-xs font-bold uppercase tracking-wider text-emerald-800 mb-4">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Cryptographic Transparency
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0F172A] tracking-tight leading-[1.12]">
              What is <span className="text-[#2E68FB]">Provably Fair</span> Gambling?
            </h1>

            <p className="mt-4 text-base sm:text-lg text-[#475569] max-w-2xl mx-auto font-normal">
              Say goodbye to &quot;black box&quot; casino algorithms. Provably Fair technology gives players mathematical proof that no spin, roll, or crash outcome was rigged.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/casinos/crypto-casinos"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2E68FB] hover:bg-[#2556D6] text-white text-sm font-bold shadow-md shadow-blue-500/20 transition-all active:scale-95"
              >
                Explore Top Crypto Casinos
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-sm font-bold shadow-2xs transition-all"
              >
                How The Math Works
              </a>
            </div>
          </div>
        </section>

        {/* 3 Pillars of Provably Fair */}
        <section id="how-it-works" className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2E68FB] mb-2 block">
              The Cryptographic Triad
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A]">
              How Provably Fair Algorithms Work
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#475569]">
              Every bet outcome is deterministically calculated by combining three cryptographic variables:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Component 1 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#2E68FB] flex items-center justify-center font-bold mb-4 border border-blue-100">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-[#0F172A]">1. Server Seed</h3>
              <p className="text-xs text-[#64748B] mt-2 leading-relaxed">
                Generated secretly by the casino server. Before you bet, the casino displays a cryptographic SHA-256 hash of this seed so it cannot alter it later.
              </p>
            </div>

            {/* Component 2 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold mb-4 border border-purple-100">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-[#0F172A]">2. Client Seed</h3>
              <p className="text-xs text-[#64748B] mt-2 leading-relaxed">
                Supplied by your own browser (or customized manually by you). The casino has no control over your client seed, making it impossible to predict in advance.
              </p>
            </div>

            {/* Component 3 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold mb-4 border border-emerald-100">
                <Hash className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-[#0F172A]">3. Nonce Counter</h3>
              <p className="text-xs text-[#64748B] mt-2 leading-relaxed">
                A simple integer that starts at 0 or 1 and increments by 1 with each consecutive bet you place, guaranteeing unique outcomes for every round.
              </p>
            </div>

          </div>
        </section>

        {/* Code Formula Simulation */}
        <section className="py-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-[#0F172A] text-slate-200 p-6 sm:p-8 shadow-xl font-mono text-xs sm:text-sm">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4 text-slate-400">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>Cryptographic Verification Pipeline</span>
              </div>
              <span className="text-[11px] text-emerald-400">SHA-256 HMAC</span>
            </div>

            <div className="space-y-3 leading-relaxed">
              <p className="text-slate-400">// Step 1: Pre-Bet Commitment (Shown before wager)</p>
              <p className="text-amber-300">
                Server_Seed_Hash = SHA256(Unrevealed_Server_Seed);
              </p>

              <p className="text-slate-400 pt-2">// Step 2: Bet Execution & Outcome Calculation</p>
              <p className="text-cyan-300">
                Combined_HMAC = HMAC_SHA256(Server_Seed, Client_Seed + &quot;:&quot; + Nonce);
              </p>
              <p className="text-emerald-300">
                Game_Result = (First_5_Hex_Chars(Combined_HMAC) % 10000) / 100;
              </p>

              <p className="text-slate-400 pt-2">// Step 3: Player Verification Post-Game</p>
              <p className="text-slate-300">
                The casino reveals <span className="text-amber-300">Unrevealed_Server_Seed</span>. You re-run the SHA256 hash to confirm it matches the initial hash committed before your bet.
              </p>
            </div>
          </div>
        </section>

        {/* Comparison: Provably Fair vs Traditional RNG */}
        <section className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2E68FB] mb-2 block">
              Old vs New
            </span>
            <h2 className="text-3xl font-bold text-[#0F172A]">
              Provably Fair vs Traditional RNG Audits
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            <div className="p-6 rounded-2xl bg-white border border-slate-200/90">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                Traditional Online Casinos
              </span>
              <h3 className="font-bold text-lg text-slate-800 mb-3">
                Periodic Laboratory Audits
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✕</span>
                  <span>Results generated behind closed server walls.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✕</span>
                  <span>Players must place 100% blind faith in the operator.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">~</span>
                  <span>Tested every 6–12 months by external testing agencies.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✕</span>
                  <span>Impossible for a single player to verify an unlucky streak.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-blue-200 shadow-md shadow-blue-900/5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2E68FB] block mb-2">
                Provably Fair Casinos
              </span>
              <h3 className="font-bold text-lg text-[#0F172A] mb-3">
                Real-Time Mathematical Proof
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Every individual wager has an open cryptographic trail.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>The player contributes their own entropy via client seed.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Verify outcomes instantly using independent open-source tools.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Zero possibility of retroactively altering game results.</span>
                </li>
              </ul>
            </div>

          </div>
        </section>

        {/* Popular Games */}
        <section className="py-12 ">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2E68FB] mb-2 block">
                Player Favorites
              </span>
              <h2 className="text-3xl font-bold text-[#0F172A]">
                Popular Provably Fair Casino Games
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  title: "Crash / Aviator",
                  desc: "Watch the multiplier rise from 1.00x upwards. Cash out before the rocket crashes.",
                },
                {
                  title: "Crypto Plinko",
                  desc: "Drop balls through pyramid pegs to hit high payout multiplier slots on the edges.",
                },
                {
                  title: "Crypto Dice",
                  desc: "Pick roll-over or roll-under odds from 0.00 to 99.99 with configurable house edge.",
                },
                {
                  title: "Mines",
                  desc: "Clear safe grid tiles without triggering hidden explosive mines.",
                },
              ].map((g, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200/80"
                >
                  <h4 className="font-bold text-base text-[#0F172A] mb-1">
                    {g.title}
                  </h4>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    {g.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-[#0F172A] mb-6 text-center">
            Provably Fair FAQs
          </h3>
          <div className="space-y-4">
            {fairFaqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs"
              >
                <h4 className="font-bold text-sm text-[#0F172A] flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#2E68FB] shrink-0" />
                  {faq.question}
                </h4>
                <p className="mt-2 text-xs sm:text-sm text-[#64748B] pl-6 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
