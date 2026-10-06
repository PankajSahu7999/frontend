'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Textarea, Toggle, Button, Select } from '../../../../components/admin/FormElements';
import { ArrowLeft, Save } from 'lucide-react';

const PRESET_CATEGORIES = [
  { value: 'home', label: 'Home Page (Default)' },
  { value: 'online-casino', label: 'Online Casinos (/casinos/online-casino)' },
  { value: 'crypto-casinos', label: 'Crypto Casinos (/casinos/crypto-casinos)' },
  { value: 'fast-withdrawal-casinos', label: 'Fast Withdrawal Casinos' },
  { value: 'live-casinos', label: 'Live Casinos' },
  { value: 'mobile-casinos', label: 'Mobile Casinos' },
  { value: 'newest-casinos', label: 'Newest Casinos' },
  { value: 'casino-bonuses', label: 'Casino Bonuses (/casino-bonuses)' },
  { value: 'slots', label: 'Slots (/slots)' },
  { value: 'casino-games', label: 'Casino Games & Tables (/games)' },
  { value: 'sports-betting', label: 'Sports Betting (/betting)' },
  { value: 'General', label: 'General' },
  { value: 'custom', label: '✏️ Custom Category Slug...' },
];

export default function NewFaqPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategoryType, setSelectedCategoryType] = useState('home');
  const [customCategory, setCustomCategory] = useState('');

  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    sort_order: '0',
    status: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const resolvedCategory =
      selectedCategoryType === 'custom'
        ? customCategory.trim() || 'home'
        : selectedCategoryType;

    const payload = {
      ...formData,
      category: resolvedCategory,
      sort_order: Number(formData.sort_order) || 0,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/faqs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push('/admin/faqs');
      } else {
        alert('Failed to save FAQ. Please check inputs.');
      }
    } catch (err) {
      console.error(err);
      alert('Error saving FAQ');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <button
        onClick={() => router.push('/admin/faqs')}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-6 text-sm font-semibold uppercase tracking-wider"
      >
        <ArrowLeft size={16} />
        Back to FAQs
      </button>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50">
          <h1 className="text-2xl font-bold text-slate-800">Create New Category FAQ</h1>
          <p className="text-sm text-slate-500 mt-1">
            Add a frequently asked question linked to the Home page or a specific category landing page.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Category Selector */}
          <div>
            <Select
              label="Page / Category Destination"
              value={selectedCategoryType}
              onChange={(e) => setSelectedCategoryType(e.target.value)}
              options={PRESET_CATEGORIES}
              required
            />
            {selectedCategoryType === 'custom' && (
              <div className="mt-3">
                <Input
                  label="Custom Category Slug"
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  placeholder="e.g. sweepstakes-casinos or high-roller-bonuses"
                  helperText="Enter the exact slug used in the category page URL."
                  required
                />
              </div>
            )}
          </div>

          <Input
            label="Question"
            value={formData.question}
            onChange={(e) => setFormData({ ...formData, question: e.target.value })}
            placeholder="e.g. What is the minimum deposit?"
            required
          />

          <Textarea
            label="Answer"
            value={formData.answer}
            onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
            placeholder="Provide a clear, detailed, and factual answer..."
            rows={5}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Input
              label="Sort Order"
              type="number"
              value={formData.sort_order}
              onChange={(e) => setFormData({ ...formData, sort_order: e.target.value })}
              placeholder="0"
              helperText="Lower numbers appear first in the FAQ list."
            />

            <div className="flex items-end mb-4">
              <div className="w-full">
                <Toggle
                  label="Publish Status (Active)"
                  checked={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.checked })}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t border-slate-100">
            <Button type="button" variant="secondary" onClick={() => router.push('/admin/faqs')}>
              Cancel
            </Button>
            <Button type="submit" isLoading={isLoading} className="gap-2">
              <Save size={16} />
              Save FAQ
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
