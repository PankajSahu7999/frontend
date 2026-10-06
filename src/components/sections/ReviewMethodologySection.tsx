'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  UserCheck,
  CreditCard,
  Gamepad2,
  Receipt,
  Headphones,
  BadgeCheck,
  ArrowRight,
} from 'lucide-react';

export default function ReviewMethodologySection() {
  const steps = [
    {
      num: '01',
      title: 'Licence & Ownership Check',
      icon: ShieldCheck,
      description:
        'We cross-reference stated regulatory licenses against official registers (MGA, UKGC, Curacao, Kahnawake) and verify corporate parent entity history.',
      check: 'Direct registry verification',
    },
    {
      num: '02',
      title: 'Account Setup & KYC Testing',
      icon: UserCheck,
      description:
        'Our researchers test sign-up ergonomics, identity verification response times, and examine document safety policies before any real deposit is made.',
      check: 'Privacy & KYC audit',
    },
    {
      num: '03',
      title: 'Deposit & Bonus Claim',
      icon: CreditCard,
      description:
        'We deposit real funds to test payment gateways, verify bonus code crediting, and analyze wagering rollover clauses for hidden predatory terms.',
      check: 'Fine-print terms audit',
    },
    {
      num: '04',
      title: 'Software & Game Testing',
      icon: Gamepad2,
      description:
        'We benchmark game library fairness, certified RNG auditors (eCOGRA, iTech Labs), live dealer latency, and responsiveness across mobile Safari and Chrome.',
      check: 'Certified RNG benchmark',
    },
    {
      num: '05',
      title: 'Real Money Withdrawal Audit',
      icon: Receipt,
      description:
        'We request real cashouts across crypto, e-wallets, and cards to record true payout processing durations, fee structures, and withdrawal caps.',
      check: 'Hands-on payout test',
    },
    {
      num: '06',
      title: 'Support Escalation Test',
      icon: Headphones,
      description:
        'We mystery-shop 24/7 customer support across live chat and email with complex compliance questions to measure genuine competence and response speed.',
      check: 'Response time measured',
    },
  ];

  return (
    <section id="methodology" className="w-full max-w-7xl mx-auto px-4 sm:px-6 my-14">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex rounded-full bg-[radial-gradient(circle_at_center,#B8CEFF_0%,#2E68FB_100%)] p-[1px]">
            <div className="flex items-center gap-1 rounded-full bg-[#E6EDFF] px-4 py-1">
              <BadgeCheck className="w-3.5 h-3.5 text-[#2E68FB]" />
              <span className="font-poppins text-[10px] font-medium uppercase text-[#2E68FB]">
                Methodology &amp; Verification
              </span>
            </div>
          </div>
          <h2 className="font-poppins text-[26px] sm:text-[34px] font-bold leading-tight text-[#16171D] mt-3 mb-2">
            How We Review Online Casinos
          </h2>
          <p className="text-xs sm:text-sm text-[#475467] max-w-2xl leading-relaxed">
            We do not believe a casino should be judged by its welcome bonus alone. Our structured
            review framework examines the six critical operational areas that materially affect a
            player&apos;s safety and experience.
          </p>
        </div>

        <Link
          href="/about-us"
          className="inline-flex items-center gap-2 h-11 px-5 rounded-xl font-bold text-xs text-[#16171D] shadow-xs shrink-0 transition active:scale-95"
          style={{
            background: 'linear-gradient(180deg, #FFE11F 0%, #FF8533 100%)',
            boxShadow: '0px 2px 0px 0px #E36D1F',
          }}
        >
          <span>Read Full Methodology</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 6-Step Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={idx}
              className="card-animated-border rounded-[22px] p-[2px] flex flex-col h-full"
            >
              <div
                className="rounded-[20px] p-5 sm:p-6 flex flex-col justify-between h-full"
                style={{
                  background:
                    'linear-gradient(231.79deg, #D5EDFF 32.55%, #EEECFF 43.54%, #F9F3FF 53.23%, #F5FCFF 66.16%, #E9F5FF 79.08%)',
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-poppins font-black text-2xl text-[#2E68FB] opacity-80">
                      {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#2E68FB20] text-[#2E68FB] flex items-center justify-center shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-poppins text-base font-bold text-[#16171D] mb-2 leading-snug">
                    {step.title}
                  </h3>

                  <p className="text-xs text-[#475467] leading-relaxed mb-4">
                    {step.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#2E68FB20] flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
                  <span>✓</span>
                  <span>{step.check}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
