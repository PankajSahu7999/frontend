'use client';

import React from 'react';
import Link from 'next/link';
import {
  Zap,
  Gift,
  Smartphone,
  ShieldCheck,
  BadgeCheck,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';

export default function CompareByNeedSection() {
  const cards = [
    {
      icon: Zap,
      title: 'Fast Withdrawals',
      badge: '0–24h Cashouts',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      description:
        'See which verified operators support instant crypto or same-day e-wallet processing without delayed KYC bottlenecks.',
      cta: 'View Fast Payout Casinos',
      href: '/casinos/fast-withdrawal-casinos',
    },
    {
      icon: Gift,
      title: 'Fairer Bonus Terms',
      badge: 'Transparent Rollover',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      description:
        'Compare reasonable wagering requirements (under 40x), realistic maximum cashout limits, and zero-wager promotions.',
      cta: 'Explore Bonus Reviews',
      href: '/casino-bonuses',
    },
    {
      icon: Smartphone,
      title: 'Mobile Casino Experience',
      badge: 'iOS & Android Tested',
      badgeColor: 'bg-blue-100 text-[#2E68FB] border-blue-200',
      description:
        'Evaluate touchscreen responsiveness, native web app performance, and touch-optimized live dealer tables.',
      cta: 'View Mobile Casinos',
      href: '/casinos/mobile-casinos',
    },
    {
      icon: ShieldCheck,
      title: 'Licensed & Regulated',
      badge: 'Strict Player Protection',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
      description:
        'Start with verified licenses (MGA, UKGC, Curacao) and jurisdiction compliance before depositing real funds.',
      cta: 'Browse Licensed Casinos',
      href: '/casinos/licensed-casinos',
    },
  ];

  return (
    <section className="w-full py-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex rounded-full bg-[radial-gradient(circle_at_center,#B8CEFF_0%,#2E68FB_100%)] p-[1px]">
            <div className="flex items-center gap-1 rounded-full bg-[#E6EDFF] px-4 py-1">
              <BadgeCheck className="w-3.5 h-3.5 text-[#2E68FB]" />
              <span className="font-poppins text-[10px] font-medium uppercase text-[#2E68FB]">
                Targeted Research
              </span>
            </div>
          </div>
          <h2 className="font-poppins text-[26px] sm:text-[34px] font-bold leading-tight text-[#16171D] mt-3 mb-2">
            Compare Casinos by What Matters to You
          </h2>
          <p className="text-xs sm:text-sm text-[#475467] max-w-2xl leading-relaxed">
            Skip generic lists. Filter our audited directory based on your specific criteria—whether
            you prioritize instant payouts, fair bonus conditions, or mobile usability.
          </p>
        </div>

        <Link
          href="/compare-casinos"
          className="inline-flex items-center gap-2 h-11 px-5 rounded-xl font-bold text-xs text-white shadow-xs shrink-0 transition active:scale-95"
          style={{
            background: 'linear-gradient(180deg, #CDDCFB 0%, #588CF3 100%)',
            boxShadow: '0px 2px 0px 0px #2E68FB',
          }}
        >
          <span>Open Side-by-Side Compare Tool</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="card-animated-border rounded-[22px] p-[2px] flex flex-col h-full"
            >
              <div
                className="rounded-[20px] p-5 flex flex-col justify-between h-full"
                style={{
                  background:
                    'linear-gradient(231.79deg, #D5EDFF 32.55%, #EEECFF 43.54%, #F9F3FF 53.23%, #F5FCFF 66.16%, #E9F5FF 79.08%)',
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#2E68FB20] text-[#2E68FB] flex items-center justify-center shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${card.badgeColor}`}
                    >
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="font-poppins text-base font-bold text-[#16171D] mb-2 leading-tight">
                    {card.title}
                  </h3>

                  <p className="text-xs text-[#475467] leading-relaxed mb-4">
                    {card.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#2E68FB20]">
                  <Link
                    href={card.href}
                    className="inline-flex items-center justify-between w-full text-xs font-bold text-[#2E68FB] hover:underline group"
                  >
                    <span>{card.cta}</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
