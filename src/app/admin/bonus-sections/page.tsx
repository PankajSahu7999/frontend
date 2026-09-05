'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../../../components/admin/FormElements';
import {
  Plus,
  Search,
  Gift,
  Sparkles,
  Flame,
  Coins,
  Percent,
  Trophy,
  Edit2,
  Trash2,
  ExternalLink,
  Layers,
  ArrowUpDown,
} from 'lucide-react';
import { buildApiUrl } from '@/config/api.config';
import Link from 'next/link';

const ICON_MAP: Record<string, any> = {
  Gift,
  Sparkles,
  Flame,
  Coins,
  Percent,
  Trophy,
};

export default function AdminBonusSectionsPage() {
  const router = useRouter();
  const [sections, setSections] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchSections();
  }, [statusFilter]);

  const fetchSections = async () => {
    setIsLoading(true);
    try {
      let endpoint = '/admin/bonus-sections?all=true';
      if (statusFilter !== 'all') {
        endpoint += `&status=${statusFilter}`;
      }
      const res = await fetch(buildApiUrl(endpoint));
      if (res.ok) {
        const data = await res.json();
        setSections(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error('Failed to fetch bonus sections:', err);
    }
    setIsLoading(false);
  };

  const handleDelete = async (section: any) => {
    if (confirm(`Are you sure you want to delete "${section.title}"? This will also remove all casino offers in this section.`)) {
      try {
        const res = await fetch(buildApiUrl(`/admin/bonus-sections/${section.id}`), {
          method: 'DELETE',
        });
        if (res.ok) {
          fetchSections();
        }
      } catch (err) {
        console.error('Failed to delete section:', err);
      }
    }
  };

  const filteredSections = sections.filter((s) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      s.title.toLowerCase().includes(q) ||
      s.slug.toLowerCase().includes(q) ||
      (s.badge_text && s.badge_text.toLowerCase().includes(q)) ||
      (s.description && s.description.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-200">
              <Gift size={20} />
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-slate-800">
              Bonus Sections & Offers
            </h1>
          </div>
          <p className="text-sm text-slate-500">
            Create, organize, and assign customized casino promotions and bonus categories.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Link
            href="/casino-bonuses"
            target="_blank"
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs flex items-center gap-1.5 transition-colors"
          >
            <ExternalLink size={14} />
            View Public Page
          </Link>
          <Button
            onClick={() => router.push('/admin/bonus-sections/new')}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20"
          >
            <Plus size={16} />
            Create Section
          </Button>
        </div>
      </div>

      {/* Control Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Search sections by title or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active Only</option>
            <option value="draft">Drafts Only</option>
          </select>

          <span className="text-xs text-slate-400 font-medium">
            Total: <strong className="text-slate-800">{filteredSections.length}</strong> sections
          </span>
        </div>
      </div>

      {/* Sections Cards Grid */}
      {isLoading ? (
        <div className="py-20 text-center bg-white rounded-xl border border-slate-200 p-8 shadow-xs">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-600 border-t-transparent mb-3" />
          <p className="text-xs text-slate-500 font-medium">Loading bonus sections...</p>
        </div>
      ) : filteredSections.length === 0 ? (
        <div className="py-16 text-center bg-white border border-slate-200 rounded-xl p-8 shadow-xs">
          <Gift className="mx-auto text-slate-300 mb-3" size={40} />
          <h3 className="text-base font-bold text-slate-800 mb-1">No Bonus Sections Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {searchQuery
              ? `No sections matching "${searchQuery}".`
              : 'Create your first promotional bonus section with casinos and custom offers.'}
          </p>
          <Button
            onClick={() => router.push('/admin/bonus-sections/new')}
            className="mt-4 text-xs"
          >
            <Plus size={14} className="mr-1.5" />
            Create Bonus Section
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredSections.map((section) => {
            const IconComponent = ICON_MAP[section.icon_name] || Gift;
            const itemsCount = section.items?.length || 0;

            return (
              <div
                key={section.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 p-5 shadow-xs transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0">
                    <IconComponent size={24} />
                  </div>

                  {/* Details */}
                  <div>
                    <div className="flex items-center gap-2.5 flex-wrap mb-1">
                      <h3 className="text-base font-bold text-slate-800">{section.title}</h3>
                      {section.badge_text && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                          {section.badge_text}
                        </span>
                      )}
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          section.status === 'active'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}
                      >
                        {section.status === 'active' ? 'Active' : 'Draft'}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 line-clamp-2 max-w-2xl mb-2">
                      {section.description || 'No description provided.'}
                    </p>

                    <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                      <span>slug: /{section.slug}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1 font-sans text-slate-600 font-semibold">
                        <Layers size={13} className="text-indigo-500" />
                        {itemsCount} {itemsCount === 1 ? 'casino offer' : 'casino offers'}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 font-sans text-slate-500">
                        <ArrowUpDown size={12} />
                        Order: {section.sort_order || 0}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0 self-end md:self-center border-t md:border-t-0 pt-3 md:pt-0 w-full md:w-auto justify-end">
                  <button
                    onClick={() => router.push(`/admin/bonus-sections/edit/${section.id}`)}
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
                  >
                    <Edit2 size={13} />
                    Edit & Manage Casinos
                  </button>
                  <button
                    onClick={() => handleDelete(section)}
                    className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
                    title="Delete section"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
