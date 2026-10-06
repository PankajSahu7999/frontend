'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  FileCheck2,
  Wallet,
  Microscope,
  Scale,
  BadgeCheck,
  ChevronRight,
} from 'lucide-react';

export default function TrustEvidenceStrip() {
  const trustItems = [
    {
      icon: ShieldCheck,
      title: 'Licence Checks',
      description: 'Regulatory authority verification & active license number audits.',
      tag: 'Verified',
      href: '/about-us#licensing',
    },
    {
      icon: FileCheck2,
      title: 'Terms Analysis',
      description: 'Fine-print scan for wagering, rollover caps, and max win limits.',
      tag: 'Audited',
      href: '/about-us#terms',
    },
    {
      icon: Wallet,
      title: 'Payment Research',
      description: 'Real-money deposit checks, payout fees, and speed benchmarks.',
      tag: 'Tested',
      href: '/about-us#payments',
    },
    {
      icon: Microscope,
      title: 'Hands-on Testing',
      description: 'Live testing across mobile browsers, support response, and games.',
      tag: 'Hands-on',
      href: '/about-us#methodology',
    },
    {
      icon: Scale,
      title: 'Transparent Disclosure',
      description: 'Clear affiliate disclosure. Commercial terms never alter review scores.',
      tag: 'Independent',
      href: '/about-us#editorial',
    },
  ];

  return (
    <section className="w-full py-8">
      <div className="card-animated-border rounded-2xl p-[2px] shadow-sm">
        <div
          className="rounded-[14px] p-5 sm:p-6"
          style={{
            background:
              'linear-gradient(231.79deg, #D5EDFF 32.55%, #EEECFF 43.54%, #F9F3FF 53.23%, #F5FCFF 66.16%, #E9F5FF 79.08%)',
          }}
        >
          {/* Header row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-[#2E68FB20] mb-5">
            <div className="flex items-center gap-2">
              <div className="inline-flex rounded-full bg-[radial-gradient(circle_at_center,#B8CEFF_0%,#2E68FB_100%)] p-[1px]">
                <div className="flex items-center gap-1 rounded-full bg-[#E6EDFF] px-3 py-0.5">
                  <BadgeCheck className="w-3.5 h-3.5 text-[#2E68FB]" />
                  <span className="font-poppins text-[10px] font-bold uppercase text-[#2E68FB]">
                    Research Before The Rating
                  </span>
                </div>
              </div>
              <span className="text-xs font-semibold text-[#16171D]">
                Independent Casino Verification Standards
              </span>
            </div>

            <Link
              href="/about-us#methodology"
              className="text-xs font-bold text-[#2E68FB] hover:underline flex items-center gap-1 group"
            >
              <span>See Our 6-Step Testing Methodology</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* 5-pillar grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {trustItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Link
                  key={idx}
                  href={item.href}
                  className="bg-white/85 hover:bg-white border border-[#2E68FB20] hover:border-[#2E68FB60] rounded-xl p-3.5 flex flex-col justify-between transition-all hover:shadow-xs group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-8 h-8 rounded-lg bg-[#E6EDFF] text-[#2E68FB] flex items-center justify-center">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full bg-blue-50 text-[#2E68FB] border border-[#2E68FB20]">
                        {item.tag}
                      </span>
                    </div>
                    <h3 className="font-poppins text-xs font-bold text-[#16171D] group-hover:text-[#2E68FB] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-[#475467] leading-relaxed mt-1">
                      {item.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
