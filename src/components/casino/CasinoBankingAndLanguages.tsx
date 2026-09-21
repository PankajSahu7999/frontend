'use client';

import React, { useState } from 'react';
import { CircleFlag } from 'react-circle-flags';
import { Wallet, Globe, ChevronDown, ChevronUp } from 'lucide-react';

interface Props {
  paymentMethods?: any[];
  languages?: any[];
}

const LANGUAGE_CODE_MAP: Record<string, string> = {
  english: 'gb',
  russian: 'ru',
  french: 'fr',
  spanish: 'es',
  german: 'de',
  portuguese: 'pt',
  dutch: 'nl',
  finnish: 'fi',
  norwegian: 'no',
  swedish: 'se',
  italian: 'it',
  hungarian: 'hu',
  romanian: 'ro',
  bulgarian: 'bg',
  slovak: 'sk',
  slovenian: 'si',
  croatian: 'hr',
  greek: 'gr',
  serbian: 'rs',
  japanese: 'jp',
  indonesian: 'id',
  danish: 'dk',
  polish: 'pl',
  czech: 'cz',
  turkish: 'tr',
  chinese: 'cn',
  mandarin: 'cn',
  cantonese: 'hk',
  arabic: 'sa',
  hindi: 'in',
  korean: 'kr',
  thai: 'th',
  vietnamese: 'vn',
  ukrainian: 'ua',
  estonian: 'ee',
  latvian: 'lv',
  lithuanian: 'lt',
};

function getCountryCodeForLanguage(langName: string): string {
  const normalized = langName.trim().toLowerCase();
  return LANGUAGE_CODE_MAP[normalized] || 'un';
}

function PaymentMethodIcon({ name }: { name: string }) {
  const lower = name.toLowerCase();

  if (lower.includes('visa')) {
    return (
      <span className="text-[#1A1F71] font-black italic tracking-tighter text-xs">
        VISA
      </span>
    );
  }

  if (lower.includes('mastercard') || lower.includes('master card')) {
    return (
      <div className="flex items-center -space-x-1.5 shrink-0">
        <div className="w-3.5 h-3.5 rounded-full bg-[#EB001B]" />
        <div className="w-3.5 h-3.5 rounded-full bg-[#F79E1B]/90" />
      </div>
    );
  }

  if (lower.includes('bitcoin') || lower.includes('btc')) {
    return (
      <div className="w-4 h-4 rounded-full bg-[#F7931A] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
        ₿
      </div>
    );
  }

  if (lower.includes('ethereum') || lower.includes('eth')) {
    return (
      <div className="w-4 h-4 flex items-center justify-center text-[#627EEA] font-bold text-xs shrink-0">
        ◆
      </div>
    );
  }

  if (lower.includes('litecoin') || lower.includes('ltc')) {
    return (
      <div className="w-4 h-4 rounded-full bg-[#345D9D] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
        Ł
      </div>
    );
  }

  if (lower.includes('dogecoin') || lower.includes('doge')) {
    return (
      <div className="w-4 h-4 rounded-full bg-[#C2A633] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
        Ð
      </div>
    );
  }

  if (lower.includes('tether') || lower.includes('usdt')) {
    return (
      <div className="w-4 h-4 rounded-full bg-[#26A17B] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
        ₮
      </div>
    );
  }

  if (lower.includes('skrill')) {
    return (
      <span className="text-[#811244] font-black text-[11px] tracking-tight">
        skrill
      </span>
    );
  }

  if (lower.includes('neteller')) {
    return (
      <span className="text-[#85B81C] font-black text-[10px] tracking-tight">
        NETELLER
      </span>
    );
  }

  if (lower.includes('upi')) {
    return (
      <div className="flex items-center gap-0.5 shrink-0">
        <span className="text-[#5F259F] font-bold text-[10px]">UPI</span>
        <span className="text-[#097939] text-xs">▶</span>
      </div>
    );
  }

  if (lower.includes('paysafe')) {
    return (
      <span className="text-[#0088CC] font-bold text-[10px]">
        paysafe
      </span>
    );
  }

  if (lower.includes('jeton')) {
    return (
      <span className="text-[#FF5722] font-bold text-[10px]">
        Jeton
      </span>
    );
  }

  if (lower.includes('mifinity')) {
    return (
      <span className="text-[#E01E37] font-bold text-[10px]">
        MiFinity
      </span>
    );
  }

  if (lower.includes('wallet')) {
    return <Wallet className="w-3.5 h-3.5 text-slate-700 shrink-0" />;
  }

  // Generic fallback
  return <Wallet className="w-3.5 h-3.5 text-slate-500 shrink-0" />;
}

export default function CasinoBankingAndLanguages({ paymentMethods = [], languages = [] }: Props) {
  const [showAllPayments, setShowAllPayments] = useState(false);
  const [showAllLanguages, setShowAllLanguages] = useState(false);

  // Normalize payment methods
  const rawPayments = paymentMethods.map((p) =>
    typeof p === 'string' ? p : p.method_name || p.name
  ).filter(Boolean);

  const finalPayments = rawPayments.length > 0
    ? rawPayments
    : ['Visa', 'Mastercard', 'E-Wallet', 'Skrill', 'UPI', 'Bitcoin', 'Ethereum', 'Litecoin'];

  // Normalize languages
  const rawLanguages = languages.map((l) =>
    typeof l === 'string' ? l : l.language || l.name
  ).filter(Boolean);

  const finalLanguages = rawLanguages.length > 0
    ? rawLanguages
    : ['English', 'Russian', 'French', 'Spanish', 'German', 'Portuguese', 'Dutch', 'Finnish'];

  // Initial display is 7 items so that the 8th slot is "+X more" in a 2-column grid
  const INITIAL_LIMIT = 7;
  const hasMorePayments = finalPayments.length > 8;
  const visiblePayments = showAllPayments || !hasMorePayments
    ? finalPayments
    : finalPayments.slice(0, INITIAL_LIMIT);

  const hasMoreLanguages = finalLanguages.length > 8;
  const visibleLanguages = showAllLanguages || !hasMoreLanguages
    ? finalLanguages
    : finalLanguages.slice(0, INITIAL_LIMIT);

  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
      {/* 1. DEPOSIT METHODS CARD */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm">
        <h2 className="font-poppins text-[22px] font-bold leading-tight text-[#16171D] mb-5">
          Deposit Methods
        </h2>

        <div className="grid grid-cols-2 gap-3">
          {visiblePayments.map((method, idx) => (
            <div
              key={`${method}-${idx}`}
              className="border border-slate-200/80 rounded-full px-4 py-2.5 flex items-center gap-2.5 bg-white text-[13px] font-medium text-slate-800 shadow-2xs hover:border-blue-400 hover:shadow-xs transition-all"
            >
              <div className="w-5 flex items-center justify-center shrink-0">
                <PaymentMethodIcon name={method} />
              </div>
              <span className="truncate">{method}</span>
            </div>
          ))}

          {/* "+X more" or "Show less" toggle */}
          {hasMorePayments && (
            <button
              type="button"
              onClick={() => setShowAllPayments(!showAllPayments)}
              className="border border-slate-200/80 rounded-full px-4 py-2.5 flex items-center justify-center gap-1.5 bg-white text-[13px] font-medium text-slate-600 hover:text-[#2E68FB] hover:border-[#2E68FB] shadow-2xs transition-colors cursor-pointer"
            >
              {showAllPayments ? (
                <>
                  <span>Show less</span>
                  <ChevronUp size={14} />
                </>
              ) : (
                <>
                  <span>+{finalPayments.length - INITIAL_LIMIT} more</span>
                  <ChevronDown size={14} />
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* 2. LANGUAGES CARD */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm">
        <h2 className="font-poppins text-[22px] font-bold leading-tight text-[#16171D] mb-5">
          Languages
        </h2>

        <div className="grid grid-cols-2 gap-3">
          {visibleLanguages.map((lang, idx) => {
            const countryCode = getCountryCodeForLanguage(lang);

            return (
              <div
                key={`${lang}-${idx}`}
                className="border border-slate-200/80 rounded-full px-4 py-2.5 flex items-center gap-2.5 bg-white text-[13px] font-medium text-slate-800 shadow-2xs hover:border-blue-400 hover:shadow-xs transition-all"
              >
                <div className="w-5 h-5 rounded-full overflow-hidden shrink-0 flex items-center justify-center bg-slate-100">
                  <CircleFlag countryCode={countryCode} className="w-5 h-5 object-cover" />
                </div>
                <span className="truncate">{lang}</span>
              </div>
            );
          })}

          {/* "+X more" or "Show less" toggle */}
          {hasMoreLanguages && (
            <button
              type="button"
              onClick={() => setShowAllLanguages(!showAllLanguages)}
              className="border border-slate-200/80 rounded-full px-4 py-2.5 flex items-center justify-center gap-1.5 bg-white text-[13px] font-medium text-slate-600 hover:text-[#2E68FB] hover:border-[#2E68FB] shadow-2xs transition-colors cursor-pointer"
            >
              {showAllLanguages ? (
                <>
                  <span>Show less</span>
                  <ChevronUp size={14} />
                </>
              ) : (
                <>
                  <span>+{finalLanguages.length - INITIAL_LIMIT} more</span>
                  <ChevronDown size={14} />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
