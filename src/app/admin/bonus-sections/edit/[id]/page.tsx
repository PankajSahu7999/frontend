'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Input, Textarea, Select, Button } from '../../../../../components/admin/FormElements';
import {
  ArrowLeft,
  AlertCircle,
  Save,
  Plus,
  Trash2,
  Gift,
  Sparkles,
  Flame,
  Coins,
  Percent,
  Trophy,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';
import { buildApiUrl, getMediaUrl } from '@/config/api.config';
import Image from 'next/image';

const ICON_OPTIONS = [
  { value: 'Gift', label: '🎁 Gift (Welcome & General)' },
  { value: 'Sparkles', label: '✨ Sparkles (Free Spins & No Deposit)' },
  { value: 'Flame', label: '🔥 Flame (High Roller & VIP)' },
  { value: 'Coins', label: '🪙 Coins (Crypto & Deposit Match)' },
  { value: 'Percent', label: '🏷️ Percent (Cashback & Reload)' },
  { value: 'Trophy', label: '🏆 Trophy (Tournaments & High Stakes)' },
];

export default function EditBonusSectionPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [formError, setFormError] = useState('');

  // Available casinos to select from
  const [availableCasinos, setAvailableCasinos] = useState<any[]>([]);
  const [selectedCasinoIdToAdd, setSelectedCasinoIdToAdd] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    badge_text: '',
    description: '',
    icon_name: 'Gift',
    status: 'active',
    sort_order: 0,
  });

  // Items / Casino Offers in this section
  const [sectionItems, setSectionItems] = useState<any[]>([]);

  useEffect(() => {
    fetchAvailableCasinos();
    if (id) {
      fetchSectionDetails();
    }
  }, [id]);

  const fetchAvailableCasinos = async () => {
    try {
      const res = await fetch(buildApiUrl('/casinos'));
      if (res.ok) {
        const data = await res.json();
        setAvailableCasinos(Array.isArray(data) ? data : data.casinos || []);
      }
    } catch (err) {
      console.error('Failed to fetch available casinos:', err);
    }
  };

  const fetchSectionDetails = async () => {
    setIsFetching(true);
    try {
      const res = await fetch(buildApiUrl(`/admin/bonus-sections/${id}`));
      if (res.ok) {
        const data = await res.json();
        setFormData({
          title: data.title || '',
          slug: data.slug || '',
          badge_text: data.badge_text || '',
          description: data.description || '',
          icon_name: data.icon_name || 'Gift',
          status: data.status || 'active',
          sort_order: data.sort_order || 0,
        });

        if (Array.isArray(data.items)) {
          setSectionItems(
            data.items.map((item: any, idx: number) => ({
              casino_id: item.casino_id,
              casino: item.casino,
              custom_title: item.custom_title || '',
              bonus_code: item.bonus_code || '',
              wagering_requirement: item.wagering_requirement || '',
              min_deposit: item.min_deposit || '',
              exclusive: Boolean(item.exclusive),
              highlight_badge: item.highlight_badge || '',
              claim_url: item.claim_url || '',
              sort_order: item.sort_order !== undefined ? item.sort_order : idx,
            }))
          );
        }
      } else {
        setFormError('Failed to load bonus section details.');
      }
    } catch (err) {
      console.error('Failed to fetch section details:', err);
      setFormError('Network error loading section.');
    } finally {
      setIsFetching(false);
    }
  };

  const handleAddCasino = () => {
    if (!selectedCasinoIdToAdd) return;

    const casino = availableCasinos.find((c) => c.id === selectedCasinoIdToAdd);
    if (!casino) return;

    // Check if already in list
    if (sectionItems.some((item) => item.casino_id === casino.id)) {
      alert('This casino is already in this section.');
      return;
    }

    const newItem = {
      casino_id: casino.id,
      casino,
      custom_title: `${casino.name} 100% Welcome Bonus up to $1,000`,
      bonus_code: '',
      wagering_requirement: '30x Bonus',
      min_deposit: '$20',
      exclusive: false,
      highlight_badge: 'Featured Offer',
      claim_url: '',
      sort_order: sectionItems.length,
    };

    setSectionItems([...sectionItems, newItem]);
    setSelectedCasinoIdToAdd('');
  };

  const handleRemoveItem = (index: number) => {
    setSectionItems(sectionItems.filter((_, idx) => idx !== index));
  };

  const handleItemChange = (index: number, field: string, value: any) => {
    const updated = [...sectionItems];
    updated[index] = { ...updated[index], [field]: value };
    setSectionItems(updated);
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === sectionItems.length - 1)
    ) {
      return;
    }

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const updated = [...sectionItems];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setSectionItems(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formData.title.trim()) {
      setFormError('Section Title is required.');
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        ...formData,
        items: sectionItems.map((item, idx) => ({
          casino_id: item.casino_id,
          custom_title: item.custom_title,
          bonus_code: item.bonus_code,
          wagering_requirement: item.wagering_requirement,
          min_deposit: item.min_deposit,
          exclusive: item.exclusive,
          highlight_badge: item.highlight_badge,
          claim_url: item.claim_url,
          sort_order: idx,
        })),
      };

      const res = await fetch(buildApiUrl(`/admin/bonus-sections/${id}`), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push('/admin/bonus-sections');
      } else {
        const err = await res.json().catch(() => ({}));
        setFormError(err.error || err.message || `Failed to update bonus section (Server HTTP ${res.status}).`);
      }
    } catch (err: any) {
      console.error(err);
      setFormError(err?.message || 'Network error. Please check backend connection.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="max-w-5xl mx-auto py-20 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-600 border-t-transparent mb-3" />
        <p className="text-xs text-slate-500 font-medium">Loading bonus section...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto pb-20">
      <button
        onClick={() => router.push('/admin/bonus-sections')}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-6 text-sm font-semibold uppercase tracking-wider"
      >
        <ArrowLeft size={16} />
        Back to Bonus Sections
      </button>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
        {/* Top Header */}
        <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Edit Bonus Section</h1>
            <p className="text-sm text-slate-500 mt-1">
              Modify promotional category metadata and update casino offer terms.
            </p>
          </div>
          <span className="px-3 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-full text-xs font-semibold">
            Section Editor
          </span>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {formError && (
            <div className="flex items-center gap-3 px-4 py-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-sm font-medium">
              <AlertCircle size={16} className="shrink-0" />
              {formError}
            </div>
          )}

          {/* Section Settings */}
          <div className="space-y-6">
            <h2 className="text-base font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-2">
              <Gift size={18} className="text-indigo-600" />
              1. Section Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Section Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Exclusive Welcome Packages"
                required
              />

              <Input
                label="Slug (URL Identifier)"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="welcome-packages"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Input
                label="Badge Tag (Optional)"
                value={formData.badge_text}
                onChange={(e) => setFormData({ ...formData, badge_text: e.target.value })}
                placeholder="e.g. Most Popular, Zero Wager"
              />

              <Select
                label="Section Icon"
                value={formData.icon_name}
                onChange={(e) => setFormData({ ...formData, icon_name: e.target.value })}
                options={ICON_OPTIONS}
              />

              <Select
                label="Status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                options={[
                  { value: 'active', label: 'Active (Visible on public page)' },
                  { value: 'draft', label: 'Draft (Admin only)' },
                ]}
              />
            </div>

            <Textarea
              label="Section Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={2}
              placeholder="Brief explanation highlighting the advantages of bonuses in this category..."
            />
          </div>

          {/* Casino Offers Manager */}
          <div className="space-y-6 pt-4 border-t border-slate-100">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                  <Sparkles size={18} className="text-amber-500" />
                  2. Assigned Casinos & Promotional Offers ({sectionItems.length})
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Select casinos from your directory and configure custom bonus titles, codes, and wagering requirements.
                </p>
              </div>

              {/* Add Casino Selector */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <select
                  value={selectedCasinoIdToAdd}
                  onChange={(e) => setSelectedCasinoIdToAdd(e.target.value)}
                  className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 max-w-[220px]"
                >
                  <option value="">Select a Casino to Add...</option>
                  {availableCasinos.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} (★ {c.rating || 'N/A'})
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={handleAddCasino}
                  disabled={!selectedCasinoIdToAdd}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shrink-0"
                >
                  <Plus size={14} />
                  Add Casino
                </button>
              </div>
            </div>

            {/* List of Added Casino Offers */}
            {sectionItems.length === 0 ? (
              <div className="p-8 text-center bg-slate-50/60 rounded-2xl border-2 border-dashed border-slate-200">
                <Gift className="mx-auto text-slate-300 mb-2" size={32} />
                <p className="text-xs font-semibold text-slate-600">No casinos added to this section yet.</p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Select a casino above and click &quot;Add Casino&quot; to customize its bonus deal.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {sectionItems.map((item, index) => {
                  const casinoLogo = item.casino?.logo_url ? getMediaUrl(item.casino.logo_url) : '';

                  return (
                    <div
                      key={item.casino_id || index}
                      className="bg-slate-50/80 border border-slate-200 rounded-2xl p-5 transition-all space-y-4"
                    >
                      {/* Top Bar of Card */}
                      <div className="flex items-center justify-between border-b border-slate-200 pb-3 flex-wrap gap-2">
                        <div className="flex items-center gap-3">
                          {casinoLogo ? (
                            <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-white border border-slate-200 flex items-center justify-center shrink-0">
                              <Image
                                src={casinoLogo}
                                alt={item.casino?.name || 'Casino'}
                                fill
                                className="object-contain p-1"
                              />
                            </div>
                          ) : (
                            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center">
                              {item.casino?.name?.substring(0, 2) || 'CL'}
                            </div>
                          )}
                          <div>
                            <h4 className="text-sm font-bold text-slate-800">{item.casino?.name}</h4>
                            <span className="text-[11px] text-slate-400">Position #{index + 1}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => moveItem(index, 'up')}
                            disabled={index === 0}
                            className="p-1.5 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded-lg hover:bg-slate-200"
                            title="Move Up"
                          >
                            <ArrowUp size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => moveItem(index, 'down')}
                            disabled={index === sectionItems.length - 1}
                            className="p-1.5 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded-lg hover:bg-slate-200"
                            title="Move Down"
                          >
                            <ArrowDown size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(index)}
                            className="p-1.5 text-rose-500 hover:bg-rose-100 rounded-lg transition-colors ml-2"
                            title="Remove from section"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>

                      {/* Fields */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="lg:col-span-2">
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Custom Offer Headline *
                          </label>
                          <input
                            type="text"
                            value={item.custom_title}
                            onChange={(e) => handleItemChange(index, 'custom_title', e.target.value)}
                            placeholder="e.g. 200% Match up to $1,500 + 100 Free Spins"
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Bonus Code (Optional)
                          </label>
                          <input
                            type="text"
                            value={item.bonus_code || ''}
                            onChange={(e) => handleItemChange(index, 'bonus_code', e.target.value)}
                            placeholder="e.g. WELCOME200"
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-mono font-bold text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 uppercase"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Wagering Requirement
                          </label>
                          <input
                            type="text"
                            value={item.wagering_requirement || ''}
                            onChange={(e) => handleItemChange(index, 'wagering_requirement', e.target.value)}
                            placeholder="e.g. 30x Bonus, 0x (No Wager)"
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Min Deposit
                          </label>
                          <input
                            type="text"
                            value={item.min_deposit || ''}
                            onChange={(e) => handleItemChange(index, 'min_deposit', e.target.value)}
                            placeholder="e.g. $10, $20, $0 (Free)"
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Highlight Badge
                          </label>
                          <input
                            type="text"
                            value={item.highlight_badge || ''}
                            onChange={(e) => handleItemChange(index, 'highlight_badge', e.target.value)}
                            placeholder="e.g. Exclusive Offer, Zero Wager"
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                          />
                        </div>
                      </div>

                      {/* Exclusive checkbox */}
                      <div className="flex items-center gap-2 pt-1">
                        <input
                          type="checkbox"
                          id={`exclusive-${index}`}
                          checked={Boolean(item.exclusive)}
                          onChange={(e) => handleItemChange(index, 'exclusive', e.target.checked)}
                          className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
                        />
                        <label
                          htmlFor={`exclusive-${index}`}
                          className="text-xs font-semibold text-slate-700 cursor-pointer select-none"
                        >
                          Mark as CasinoLab Exclusive Deal
                        </label>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
            <Button
              type="button"
              variant="secondary"
              onClick={() => router.push('/admin/bonus-sections')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={handleSubmit}
              isLoading={isLoading}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20"
            >
              <Save size={16} />
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
