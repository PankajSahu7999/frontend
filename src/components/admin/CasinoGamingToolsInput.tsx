'use client';

import React, { useState } from 'react';
import { Plus, X, Check, ShieldCheck } from 'lucide-react';

interface CasinoGamingToolsInputProps {
  value: string; // Comma or newline separated
  onChange: (value: string) => void;
}

const COMMON_GAMING_TOOLS_PRESETS = [
  'Deposit Limit',
  'Loss Limit',
  'Wager Limit',
  'Session Time Limit / Reality Check',
  'Cool-Off / Time-Out Period',
  'Self-Exclusion',
  'Account History & Statements',
  'Self-Assessment Test',
  'GamCare Partner Links',
  'Gambling Therapy Links',
  'Gamblers Anonymous Links',
  'Budget Calculator',
];

export default function CasinoGamingToolsInput({
  value,
  onChange,
}: CasinoGamingToolsInputProps) {
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

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <label className="block text-sm font-semibold text-slate-800">
            Responsible Gaming Tools & Player Safety Features
          </label>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Select the responsible gambling and player control tools supported by this casino. These will be highlighted on the casino review page.
        </p>
      </div>

      {/* Quick Select Presets */}
      <div>
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
          Quick Preset Tools (Click to toggle)
        </span>
        <div className="flex flex-wrap gap-2">
          {COMMON_GAMING_TOOLS_PRESETS.map((preset) => {
            const isSelected = currentItems.includes(preset);
            return (
              <button
                key={preset}
                type="button"
                onClick={() => toggleItem(preset)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-600/30'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/60'
                }`}
              >
                {isSelected ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  <Plus className="w-3.5 h-3.5 text-slate-400" />
                )}
                <span>{preset}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Selected Tools */}
      {currentItems.length > 0 && (
        <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100">
          <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block mb-2">
            Selected Tools ({currentItems.length}):
          </span>
          <div className="flex flex-wrap gap-2">
            {currentItems.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white text-emerald-900 border border-emerald-300 shadow-2xs"
              >
                <Check className="w-3 h-3 text-emerald-600" />
                <span>{item}</span>
                <button
                  type="button"
                  onClick={() => removeItem(item)}
                  className="p-0.5 text-slate-400 hover:text-rose-600 rounded-full hover:bg-rose-50 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Add Custom Tool Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addCustomItem();
            }
          }}
          placeholder="Add custom gaming tool (e.g., Mandatory Cooling-Off)"
          className="flex-1 px-3.5 py-2 text-xs rounded-lg border border-slate-200 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
        />
        <button
          type="button"
          onClick={addCustomItem}
          disabled={!customInput.trim()}
          className="inline-flex items-center gap-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-lg text-xs font-semibold transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add Tool</span>
        </button>
      </div>
    </div>
  );
}
