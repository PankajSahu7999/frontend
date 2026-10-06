'use client';

import React from 'react';
import Link from 'next/link';
import {
  Globe2,
  AlertTriangle,
  BadgeCheck,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';
import { CircleFlag } from 'react-circle-flags';

export default function CountryLegalSection() {
  const regions = [
    {
      countryCode: 'gb',
      countryName: 'United Kingdom',
      regulator: 'UKGC (UK Gambling Commission)',
      status: 'Fully Regulated',
      statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      summary:
        'Research operators with mandatory UKGC oversight, strict GamStop integration, transparent RTP reporting, and certified debit-card banking.',
      href: '/casinos/casinos-by-country',
    },
    {
      countryCode: 'in',
      countryName: 'India',
      regulator: 'State Laws & Central IT Rules',
      status: 'Jurisdiction-Specific',
      statusColor: 'bg-amber-100 text-amber-800 border-amber-200',
      summary:
        'Understand evolving state-level gambling legislation (e.g. Sikkim, Goa) and online money gaming regulations before researching operators.',
      href: '/casinos/casinos-by-country',
    },
    {
      countryCode: 'ru',
      countryName: 'Russia',
      regulator: 'Federal Law No. 244-FZ',
      status: 'Strict Regulatory Controls',
      statusColor: 'bg-rose-100 text-rose-800 border-rose-200',
      summary:
        'Explore statutory restrictions, payment processing regulations, and licensing rules under Roskomnadzor and central regulatory frameworks.',
      href: '/casinos/casinos-by-country',
    },
  ];

  return (
    <section className="w-full py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex rounded-full bg-[radial-gradient(circle_at_center,#B8CEFF_0%,#2E68FB_100%)] p-[1px]">
            <div className="flex items-center gap-1 rounded-full bg-[#E6EDFF] px-4 py-1">
              <Globe2 className="w-3.5 h-3.5 text-[#2E68FB]" />
              <span className="font-poppins text-[10px] font-medium uppercase text-[#2E68FB]">
                Jurisdiction &amp; Local Laws
              </span>
            </div>
          </div>
          <h2 className="font-poppins text-[26px] sm:text-[34px] font-bold leading-tight text-[#16171D] mt-3 mb-2">
            Casino Reviews by Country &amp; Local Rules
          </h2>
          <p className="text-xs sm:text-sm text-[#475467] max-w-2xl leading-relaxed">
            Casino availability is never universal. The operator, licence, payment gateways, and
            legality change depending on your physical location. Our regional indices separate
            practical operator data from local regulatory context.
          </p>
        </div>

        <Link
          href="/casinos/casinos-by-country"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2E68FB] hover:underline"
        >
          <span>Browse All Supported Countries</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* 3 Regional Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        {regions.map((region, idx) => (
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
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full overflow-hidden shadow-xs border border-white shrink-0">
                      <CircleFlag countryCode={region.countryCode} className="w-full h-full" />
                    </div>
                    <h3 className="font-poppins font-bold text-base text-[#16171D]">
                      {region.countryName}
                    </h3>
                  </div>

                  <span
                    className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border ${region.statusColor}`}
                  >
                    {region.status}
                  </span>
                </div>

                <div className="mb-3 p-2 bg-white/70 rounded-lg border border-[#2E68FB20]">
                  <span className="text-[10px] font-bold text-[#2E68FB] uppercase block">
                    Regulatory Framework
                  </span>
                  <span className="text-xs font-semibold text-gray-800">{region.regulator}</span>
                </div>

                <p className="text-xs text-[#475467] leading-relaxed mb-4">{region.summary}</p>
              </div>

              <div className="pt-3 border-t border-[#2E68FB20]">
                <Link
                  href={region.href}
                  className="inline-flex items-center justify-between w-full text-xs font-bold text-[#2E68FB] hover:underline group"
                >
                  <span>Explore {region.countryName} Hub</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      
    </section>
  );
}
