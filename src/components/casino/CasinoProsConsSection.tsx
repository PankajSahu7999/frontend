'use client';

import React from 'react';
import { Check, X, ThumbsUp, ThumbsDown } from 'lucide-react';

interface ProsConsProps {
  casinoName: string;
  pros?: (string | { id?: string; content: string })[];
  cons?: (string | { id?: string; content: string })[];
}

export default function CasinoProsConsSection({
  casinoName,
  pros = [],
  cons = [],
}: ProsConsProps) {
  // Normalize strings
  const prosList: string[] =
    pros.length > 0
      ? pros
          .map((p) => (typeof p === 'string' ? p : p.content))
          .filter(Boolean)
      : [
          'Extensive library with 3,800+ slots, live dealer, and crash games',
          'Fast payouts with crypto and instant e-wallets',
          'Generous welcome bonus packages with clear wagering terms',
          '24/7 responsive live chat support with multi-language assistance',
          'Fully mobile-optimized browser experience across iOS and Android',
        ];

  const consList: string[] =
    cons.length > 0
      ? cons
          .map((c) => (typeof c === 'string' ? c : c.content))
          .filter(Boolean)
      : [
          'Restricted in several jurisdictions including USA and UK without VPN',
          'Telephone customer support is not offered',
          'Certain deposit methods excluded from initial welcome bonus',
        ];

  return (
    <section className="mt-10">
      {/* Header Badge */}
      <div className="inline-flex rounded-full bg-[radial-gradient(circle_at_center,#B8CEFF_0%,#2E68FB_100%)] p-[1px]">
        <div className="flex items-center gap-1 rounded-full bg-[#E6EDFF] px-4 py-1">
          <ThumbsUp className="w-3.5 h-3.5 text-[#2E68FB]" />
          <span className="font-poppins text-[10px] font-medium uppercase text-[#2E68FB]">
            Honest Evaluation
          </span>
        </div>
      </div>

      <h2 className="font-poppins text-[24px] font-bold leading-[24px] tracking-normal text-[#16171D] mb-6 mt-3">
        {casinoName} Pros & Cons
      </h2>
    

      {/* Dual Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* PROS CARD */}
        <div className="rounded-2xl border border-emerald-200/90 bg-gradient-to-b from-[#F2FFF7] via-white to-white p-6 shadow-sm transition hover:shadow-md">
          <div className="flex items-center gap-3 pb-4 border-b border-emerald-100 mb-4">
           
            <div>
              <h3 className="font-poppins text-lg font-bold text-slate-900">
                What We Like (Pros)
              </h3>
              <p className="text-xs text-emerald-700 font-medium">
                Verified platform advantages
              </p>
            </div>
          </div>

          <ul className="space-y-3.5">
            {prosList.map((pro, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </span>
                <span className="text-[14px] text-slate-700 leading-relaxed font-medium">
                  {pro}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* CONS CARD */}
        <div className="rounded-2xl border border-rose-200/90 bg-gradient-to-b from-[#FFF5F5] via-white to-white p-6 shadow-sm transition hover:shadow-md">
          <div className="flex items-center gap-3 pb-4 border-b border-rose-100 mb-4">
          
            <div>
              <h3 className="font-poppins text-lg font-bold text-slate-900">
                What Could Be Better (Cons)
              </h3>
              <p className="text-xs text-rose-700 font-medium">
                Points to consider before playing
              </p>
            </div>
          </div>

          <ul className="space-y-3.5">
            {consList.map((con, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center text-rose-700">
                  <X className="w-3.5 h-3.5 stroke-[2.5]" />
                </span>
                <span className="text-[14px] text-slate-700 leading-relaxed font-medium">
                  {con}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
