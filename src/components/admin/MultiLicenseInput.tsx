'use client';

import React, { useState } from 'react';
import { Plus, X, ShieldCheck } from 'lucide-react';

interface MultiLicenseInputProps {
  label?: string;
  value: string;
  onChange: (val: string) => void;
  helperText?: string;
}

const COMMON_LICENSES = [
  'Malta Gaming Authority (MGA)',
  'Curacao eGaming',
  'UK Gambling Commission (UKGC)',
  'Gibraltar Regulatory Authority',
  'Kahnawake Gaming Commission',
  'Isle of Man GSC',
  'Anjouan Gaming',
  'Swedish Gambling Authority (SGA)',
  'Ontario (AGCO / iGO)',
];

export default function MultiLicenseInput({
  label = 'License Jurisdiction Authorities',
  value = '',
  onChange,
  helperText = 'Select preset licensing jurisdictions or type custom ones below.',
}: MultiLicenseInputProps) {
  const [customInput, setCustomInput] = useState('');

  // Parse current licenses array from comma or semicolon separated string
  const currentLicenses = value
    ? value
        .split(/[,;]/)
        .map((l) => l.trim())
        .filter((l) => l.length > 0)
    : [];

  const updateLicenses = (licenses: string[]) => {
    onChange(licenses.join(', '));
  };

  const toggleLicense = (licenseName: string) => {
    const exists = currentLicenses.some(
      (l) => l.toLowerCase() === licenseName.toLowerCase()
    );
    if (exists) {
      const filtered = currentLicenses.filter(
        (l) => l.toLowerCase() !== licenseName.toLowerCase()
      );
      updateLicenses(filtered);
    } else {
      updateLicenses([...currentLicenses, licenseName]);
    }
  };

  const handleAddCustom = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = customInput.trim();
    if (!trimmed) return;

    const exists = currentLicenses.some(
      (l) => l.toLowerCase() === trimmed.toLowerCase()
    );
    if (!exists) {
      updateLicenses([...currentLicenses, trimmed]);
    }
    setCustomInput('');
  };

  const handleRemove = (indexToRemove: number) => {
    const updated = currentLicenses.filter((_, idx) => idx !== indexToRemove);
    updateLicenses(updated);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-semibold text-slate-700 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          {label}
        </label>
        {currentLicenses.length > 0 && (
          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
            {currentLicenses.length} Selected
          </span>
        )}
      </div>

      {helperText && (
        <p className="text-xs text-slate-500">{helperText}</p>
      )}

      {/* Selected License Chips */}
      {currentLicenses.length > 0 && (
        <div className="flex flex-wrap gap-2 p-3 rounded-xl bg-blue-50/50 border border-blue-100">
          {currentLicenses.map((lic, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-blue-900 bg-white border border-blue-200 shadow-sm"
            >
              <span>{lic}</span>
              <button
                type="button"
                onClick={() => handleRemove(idx)}
                className="w-4 h-4 rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                title="Remove license"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Custom License Input Field */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddCustom();
            }
          }}
          placeholder="Type custom license authority (e.g. Kahnawake M-1204)..."
          className="flex-1 px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
        />
        <button
          type="button"
          onClick={() => handleAddCustom()}
          className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition shadow-sm flex items-center gap-1 shrink-0"
        >
          <Plus className="w-4 h-4" />
          Add
        </button>
      </div>

      {/* Preset Quick-Select Badges */}
      <div className="pt-1">
        <p className="text-xs font-medium text-slate-500 mb-2">Quick Presets:</p>
        <div className="flex flex-wrap gap-1.5">
          {COMMON_LICENSES.map((lic) => {
            const isSelected = currentLicenses.some(
              (l) => l.toLowerCase() === lic.toLowerCase()
            );
            return (
              <button
                key={lic}
                type="button"
                onClick={() => toggleLicense(lic)}
                className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all ${
                  isSelected
                    ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200/60'
                }`}
              >
                {isSelected ? '✓ ' : '+ '}
                {lic}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
