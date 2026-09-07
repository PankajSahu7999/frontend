import { Metadata } from "next";
import Link from "next/link";
import {
  Trophy,
  Award,
  Medal,
  Star,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Flame,
  Scale,
  Users,
  Lock,
  Clock,
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
  title: "iGaming Awards & Excellence - Casino Reviews Book",
  description:
    "Explore the official Casino Reviews Book Annual Awards. Discover the best online casinos, fastest payout platforms, top crypto casinos, and trusted operators vetted by industry experts.",
  path: "/awards",
  keywords: [
    "casino awards",
    "best online casino awards",
    "iGaming awards",
    "trusted casino awards",
    "crypto casino awards",
    "fast payout casino awards",
    "casino review book awards",
  ],
});

const awardCategories = [
  {
    badge: "Gold Standard",
    title: "Best Online Casino Overall",
    winner: "Top-Rated Global Casino",
    desc: "Awarded to the operator demonstrating unmatched licensing compliance, pristine payout history, 24/7 localized support, and fair wagering policies.",
    criteria: ["MGA/UKGC licensed", "Payouts under 2 hours", "98%+ RTP transparency"],
    icon: Trophy,
    color: "from-amber-400 to-yellow-600",
  },
  {
    badge: "Crypto Innovation",
    title: "Best Crypto & Web3 Casino",
    winner: "Premier Blockchain Operator",
    desc: "Recognizing industry leadership in anonymous instant payouts, provably fair games, multi-network token support, and Web3 wallet integration.",
    criteria: ["Instant blockchain payouts", "Provably fair hash verification", "Zero hidden gas fees"],
    icon: Sparkles,
    color: "from-blue-500 to-indigo-600",
  },
  {
    badge: "Speed & Reliability",
    title: "Fastest Withdrawal Casino",
    winner: "Express Payout Leader",
    desc: "Honoring the operator with the shortest verifiable mystery-shopped withdrawal times across e-wallets, crypto, and direct bank rails.",
    criteria: ["Average withdrawal < 15 mins", "Zero processing fee", "Automated KYC clearance"],
    icon: Zap,
    color: "from-emerald-400 to-green-600",
  },
  {
    badge: "Safety First",
    title: "Most Trusted Operator",
    winner: "Player Advocacy Champion",
    desc: "Selected for flawless record of dispute resolution, proactive responsible gambling tools, and zero predatory terms in promotions.",
    criteria: ["Zero blacklisted complaints", "Strict deposit limit tooling", "Independent RNG audits"],
    icon: ShieldCheck,
    color: "from-cyan-500 to-blue-600",
  },
  {
    badge: "Mobile Excellence",
    title: "Best Mobile Casino Experience",
    winner: "Mobile Gaming Innovator",
    desc: "Awarded to platforms offering lightning-fast iOS & Android native web apps, touch-optimized gameplay, and single-tap banking.",
    criteria: ["< 1.2s page load speed", "1,500+ mobile-first slots", "Biometric login support"],
    icon: Medal,
    color: "from-purple-500 to-pink-600",
  },
  {
    badge: "Community Favorite",
    title: "Player Choice Award",
    winner: "Community Ranked #1",
    desc: "Determined directly by verified player reviews, satisfaction scores, and withdrawal test submissions from our community of over 50,000 members.",
    criteria: ["4.9/5 player rating", "10,000+ verified votes", "Active VIP program"],
    icon: Users,
    color: "from-rose-500 to-red-600",
  },
];

const auditMetrics = [
  {
    metric: "350+",
    label: "Casinos Audited Annually",
    desc: "Every candidate undergoes mystery shopping testing with real deposits.",
  },
  {
    metric: "100%",
    label: "Independent Scoring",
    desc: "Zero paid placements. Rankings are strictly algorithm and data driven.",
  },
  {
    metric: "48-Hour",
    label: "Dispute Stress-Test",
    desc: "Operators are tested on how they handle complex verification and payout queries.",
  },
  {
    metric: "$50K+",
    label: "Real-Money Testing Pool",
    desc: "Real funds wagered and withdrawn to test true cash-out processing times.",
  },
];

const faqs = [
  {
    question: "How are the Casino Reviews Book Awards determined?",
    answer:
      "Our awards are based on an objective multi-stage audit: valid license verification, mystery-shopped real money deposits and withdrawals, bonus term inspection, customer support response benchmark, and community sentiment analysis.",
  },
  {
    question: "Can an online casino pay to win an award?",
    answer:
      "No. Casino Reviews Book maintains a strict editorial firewall. Commercial partnerships never influence award nominations or winners. Operators that breach fair gaming standards are blacklisted regardless of size.",
  },
  {
    question: "How frequently are awards updated?",
    answer:
      "Awards are announced annually, with quarterly compliance reviews. If any awarded operator changes terms unfavorably or delays legitimate payouts, their badge is rescinded immediately.",
  },
  {
    question: "How can players submit their feedback for Player Choice awards?",
    answer:
      "Registered users can submit authenticated reviews and dispute reports directly through our platform. All submissions are verified against deposit receipts before counting toward rankings.",
  },
];

export default function AwardsPage() {
  const graph = buildSchemaGraph({
    webpage: webpageSchema({
      url: "https://casinoreviewsbook.com/awards",
      title: "Annual iGaming Awards - Casino Reviews Book",
      description:
        "Official Casino Reviews Book Annual Awards celebrating top-performing, secure, and audited online casino operators worldwide.",
      type: "WebPage",
      breadcrumbId: "https://casinoreviewsbook.com/awards/#breadcrumb",
    }),
    breadcrumb: breadcrumbSchema({
      pageUrl: "https://casinoreviewsbook.com/awards",
      items: [
        { name: "Home", url: "https://casinoreviewsbook.com" },
        { name: "Awards", url: "https://casinoreviewsbook.com/awards" },
      ],
    }),
    itemList: itemListSchema({
      pageUrl: "https://casinoreviewsbook.com/awards",
      itemListName: "Casino Reviews Book Annual Awards",
      items: awardCategories.map((c, i) => ({
        position: i + 1,
        name: c.title,
        url: `https://casinoreviewsbook.com/awards#category-${i + 1}`,
      })),
    }),
    faq: faqSchema({
      pageUrl: "https://casinoreviewsbook.com/awards/#faq",
      faqs,
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
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-amber-300 shadow-xs text-xs font-bold uppercase tracking-wider text-amber-900 mb-5">
              <Trophy className="w-4 h-4 text-amber-500" />
              Annual iGaming Industry Excellence
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0F172A] tracking-tight leading-[1.12] max-w-4xl mx-auto">
              Casino Reviews Book <br />
              <span className="text-[#2E68FB]">Annual Awards {new Date().getFullYear()}</span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-[#475569] leading-relaxed max-w-2xl mx-auto font-normal">
              Recognizing the world&apos;s most trustworthy, fastest-paying, and player-friendly online casinos.
              Every award recipient has passed our rigorous, independent hands-on auditing process.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/casinos/online-casino"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2E68FB] hover:bg-[#2556D6] text-white text-sm font-bold shadow-md shadow-blue-500/20 transition-all active:scale-95"
              >
                Browse Audited Casinos
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/compare-casinos"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-sm font-bold shadow-xs transition-all"
              >
                Compare Side-by-Side
              </Link>
            </div>
          </div>
        </section>

        {/* Audit Metrics */}
        <section className="py-10 ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {auditMetrics.map((item, idx) => (
                <div key={idx} className="text-center p-4">
                  <div className="text-3xl lg:text-4xl font-black text-[#2E68FB]">
                    {item.metric}
                  </div>
                  <div className="text-sm font-bold text-[#0F172A] mt-1">
                    {item.label}
                  </div>
                  <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Award Categories */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2E68FB] mb-2 block">
              Recognition of Excellence
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A]">
              Official Award Categories
            </h2>
            <p className="mt-3 text-[#475569] text-sm sm:text-base">
              Each category highlights an essential pillar of player protection, software fairness, and gaming quality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {awardCategories.map((cat, idx) => {
              const IconComp = cat.icon;
              return (
                <div
                  key={idx}
                  id={`category-${idx + 1}`}
                  className="rounded-2xl bg-white border border-slate-200/90 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 p-6 flex flex-col justify-between group"
                >
                  <div>
                    {/* Header with Icon and Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${cat.color} text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform`}
                      >
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                        {cat.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-[#0F172A] group-hover:text-[#2E68FB] transition-colors">
                      {cat.title}
                    </h3>

                    <p className="text-xs text-[#64748B] mt-2 leading-relaxed">
                      {cat.desc}
                    </p>

                    {/* Criteria */}
                    <div className="mt-5 pt-4 border-t border-slate-100">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                        Benchmark Criteria:
                      </span>
                      <ul className="space-y-1.5">
                        {cat.criteria.map((crit, cIdx) => (
                          <li
                            key={cIdx}
                            className="flex items-center gap-2 text-xs font-medium text-slate-700"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span>{crit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4" /> Audited & Verified
                    </span>
                    <Link
                      href="/casinos/online-casino"
                      className="text-xs font-bold text-[#2E68FB] hover:underline flex items-center gap-1"
                    >
                      View Nominees <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Methodology Framework */}
        <section className="py-14 ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2E68FB] mb-2 block">
                Editorial Integrity
              </span>
              <h2 className="text-3xl font-bold text-[#0F172A]">
                Our 5-Point Award Selection Methodology
              </h2>
              <p className="mt-3 text-sm text-[#475569]">
                Unlike sponsored award ceremonies where titles are purchased, our winners are audited against strict technical requirements.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                {
                  step: "01",
                  title: "License Check",
                  desc: "Active verification with UKGC, MGA, Curacao, or provincial regulators.",
                },
                {
                  step: "02",
                  title: "Real Cash Audits",
                  desc: "Testing withdrawal speeds with real player deposits across banking rails.",
                },
                {
                  step: "03",
                  title: "Bonus Fine-Print",
                  desc: "Screening out predatory maximum win caps and misleading wagering terms.",
                },
                {
                  step: "04",
                  title: "RNG & Game Fair Play",
                  desc: "Verifying eCOGRA, iTechLabs, or provably fair cryptographic seeds.",
                },
                {
                  step: "05",
                  title: "Player Sentiment",
                  desc: "Analyzing authenticated dispute rates and genuine player reviews.",
                },
              ].map((step, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200/80"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#2E68FB] text-white font-bold flex items-center justify-center text-xs mb-3">
                    {step.step}
                  </div>
                  <h4 className="font-bold text-sm text-[#0F172A] mb-1.5">
                    {step.title}
                  </h4>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2E68FB] mb-2 block">
              Got Questions?
            </span>
            <h2 className="text-3xl font-bold text-[#0F172A]">
              Frequently Asked Questions About Our Awards
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs"
              >
                <h3 className="font-bold text-base text-[#0F172A] flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-500 shrink-0" />
                  {faq.question}
                </h3>
                <p className="mt-2 text-sm text-[#475569] leading-relaxed pl-6">
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
