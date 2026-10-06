'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldAlert, HeartHandshake, PhoneCall, ExternalLink, ArrowRight } from 'lucide-react';

export default function ResponsiblePlayBanner() {
  return (
    <section className="w-full py-8">
      <div className="card-animated-border rounded-[24px] p-[2px] shadow-sm">
        <div
          className="rounded-[22px] p-6 sm:p-8"
          style={{
            background:
              'linear-gradient(231.79deg, #D5EDFF 32.55%, #EEECFF 43.54%, #F9F3FF 53.23%, #F5FCFF 66.16%, #E9F5FF 79.08%)',
          }}
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-8 rounded-full bg-rose-500 text-white font-extrabold text-xs flex items-center justify-center shrink-0 shadow-xs">
                  18+
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-[#2E68FB]">
                  Player Protection &amp; Safer Gambling
                </span>
              </div>

              <h2 className="font-poppins text-2xl sm:text-3xl font-bold text-[#16171D] leading-tight mb-2">
                Gambling Should Always Be a Controlled Choice
              </h2>

              <p className="text-xs sm:text-sm text-[#475467] leading-relaxed">
                Casino Reviews Book operates strictly as an independent research portal. Gambling
                carries inherent financial risk, and no operator review can eliminate that risk.
                Never gamble with money you cannot afford to lose, set mandatory deposit limits, and
                treat gaming exclusively as entertainment.
              </p>

              {/* Resource chips */}
              <div className="mt-5 flex flex-wrap gap-2.5">
                <a
                  href="https://www.begambleaware.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-[#2E68FB30] text-[#16171D] hover:text-[#2E68FB] transition shadow-2xs"
                >
                  <HeartHandshake className="w-3.5 h-3.5 text-rose-500" />
                  <span>BeGambleAware.org</span>
                  <ExternalLink className="w-3 h-3 text-gray-400" />
                </a>

                <a
                  href="https://www.gamcare.org.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-[#2E68FB30] text-[#16171D] hover:text-[#2E68FB] transition shadow-2xs"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                  <span>GamCare Helpline (0808 8020 133)</span>
                  <ExternalLink className="w-3 h-3 text-gray-400" />
                </a>

                <a
                  href="https://www.gamblingtherapy.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-[#2E68FB30] text-[#16171D] hover:text-[#2E68FB] transition shadow-2xs"
                >
                  <span>Gambling Therapy Global</span>
                  <ExternalLink className="w-3 h-3 text-gray-400" />
                </a>
              </div>
            </div>

            {/* CTA to Internal Responsible Gambling Page */}
            <div className="w-full lg:w-auto shrink-0">
              <Link
                href="/responsible-gambling"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-6 rounded-xl font-bold text-xs text-[#16171D] shadow-xs transition active:scale-95"
                style={{
                  background: 'linear-gradient(180deg, #FFE11F 0%, #FF8533 100%)',
                  boxShadow: '0px 2px 0px 0px #E36D1F',
                }}
              >
                <span>Responsible Gaming Tools</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
