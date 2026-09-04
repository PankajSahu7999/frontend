'use client';

import React, { useState } from 'react';
import { Plus, X, Check } from 'lucide-react';

interface CasinoAcceptanceInputProps {
  value: string; // Comma or newline separated
  onChange: (value: string) => void;
}

const COMMON_ACCEPTANCE_PRESETS = [
  'No KYC',
  'KYC Required',
  'UPI',
  'Crypto Payment',
  'Credit / Debit Cards',
  'E-Wallets',
  'Net Banking',
  'Instant Payouts',
  'VPN Friendly',
  'Provably Fair',
  'Mobile App (iOS/Android)',
  '24/7 Live Support',
];

export default function CasinoAcceptanceInput({
  value,
  onChange,
}: CasinoAcceptanceInputProps) {
  const [customInput, setCustomInput] = useState('');

  // Parse current items into unique array
  const currentItems = value
    ? value
        .split(/[\n,]/)
        .map((s) => s.trim())
        .filter((s) => s.length > 0)
    : [];

  const toggleItem = (item: string) => {
    let updated: string[];
    if (currentItems.includes(item)) {
      updated = currentItems.filter((i) => i !== item);
    } else {
      updated = [...currentItems, item];
    }
    onChange(updated.join('\n'));
  };

  const addCustomItem = () => {
    const trimmed = customInput.trim();
    if (!trimmed) return;

    if (!currentItems.includes(trimmed)) {
      const updated = [...currentItems, trimmed];
      onChange(updated.join('\n'));
    }
    setCustomInput('');
  };

  const removeItem = (item: string) => {
    const updated = currentItems.filter((i) => i !== item);
    onChange(updated.join('\n'));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addCustomItem();
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-slate-800 mb-1">
          Casino Acceptance &amp; Verification (KYC, UPI, Crypto, etc.)
        </label>
        <p className="text-xs text-slate-500 mb-3">
          Select or add acceptance criteria (e.g. No KYC, UPI, Crypto, Fast Payouts).
        </p>

        {/* Preset quick selection pills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {COMMON_ACCEPTANCE_PRESETS.map((preset) => {
            const isSelected = currentItems.includes(preset);
            return (
              <button
                key={preset}
                type="button"
                onClick={() => toggleItem(preset)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                <span>{preset}</span>
              </button>
            );
          })}
        </div>

        {/* Custom Input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add custom acceptance / feature (e.g. Google Pay, Fast ID Verification)..."
            className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="button"
            onClick={addCustomItem}
            className="inline-flex items-center gap-1 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>

      {/* Selected Items / Badges */}
      {currentItems.length > 0 && (
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
          <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
            Selected Acceptance Criteria ({currentItems.length})
          </span>
          <div className="flex flex-wrap gap-2">
            {currentItems.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-emerald-300 text-emerald-800 rounded-lg text-xs font-semibold shadow-2xs"
              >
                <span>{item}</span>
                <button
                  type="button"
                  onClick={() => removeItem(item)}
                  className="w-4 h-4 rounded-full bg-emerald-100 hover:bg-red-100 hover:text-red-600 flex items-center justify-center transition-colors text-emerald-700 ml-1"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
