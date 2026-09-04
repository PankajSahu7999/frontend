'use client';

import React, { useState } from 'react';
import { Info, X, ShieldAlert } from 'lucide-react';

interface CasinoCardDisclaimerProps {
  casinoName?: string;
  customText?: string;
}

export default function CasinoCardDisclaimer({
  casinoName = 'this casino',
  customText,
}: CasinoCardDisclaimerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fullDisclaimer =
    customText ||
    `18+ only. New customers only. Welcome bonus wagering requirements apply (standard 35x-40x). Minimum deposit $10-$20 required. Max bet with active bonus applies. Valid for 30 days. Full terms and conditions apply. Play responsibly. Need help? Visit begambleaware.org or call 1-800-GAMBLER.`;

  return (
    <div className="relative mt-2.5 pt-2 border-t border-slate-200/50 text-center">
      {/* Disclaimer Trigger Button (Hover & Click) */}
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        onMouseEnter={() => setIsModalOpen(true)}
        className="inline-flex items-center justify-center gap-1 text-[10px] text-slate-500 hover:text-blue-600 transition-colors group cursor-pointer"
        title="View full disclaimer and bonus terms"
      >
        <span className="truncate max-w-[280px]">
          * 18+ | T&amp;Cs Apply | Play Responsibly
        </span>
        <Info className="w-3 h-3 text-slate-400 group-hover:text-blue-600 shrink-0" />
      </button>

      {/* Popover Modal (Renders when isModalOpen is true) */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-full max-w-sm bg-white rounded-2xl p-5 shadow-2xl border border-slate-200 text-left animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
            onMouseLeave={() => setIsModalOpen(false)}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    Important Terms &amp; Disclaimer
                  </h4>
                  <p className="text-[10px] text-slate-500">{casinoName}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Full Disclaimer Body */}
            <div className="space-y-2.5 text-xs text-slate-600 leading-relaxed">
              <p>{fullDisclaimer}</p>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <p className="text-[11px] font-bold text-slate-800">Key Terms Summary:</p>
                <ul className="text-[11px] text-slate-600 space-y-0.5 list-disc list-inside">
                  <li>Age 18+ (21+ where applicable by law)</li>
                  <li>Wagering &amp; game weightings apply</li>
                  <li>Withdrawal limits based on player tier</li>
                </ul>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
              <span>BeGambleAware.org</span>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-3 py-1 rounded-lg bg-blue-50 text-blue-600 font-bold hover:bg-blue-100 transition-colors"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
