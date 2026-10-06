'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Table, Column } from '../../../components/admin/Table';
import { Button } from '../../../components/admin/FormElements';
import { Plus, Search, Filter, HelpCircle } from 'lucide-react';

export const CATEGORY_LABELS: Record<string, string> = {
  home: 'Home Page',
  General: 'General',
  'online-casino': 'Online Casino',
  'crypto-casinos': 'Crypto Casinos',
  'fast-withdrawal-casinos': 'Fast Withdrawal',
  'live-casinos': 'Live Casinos',
  'mobile-casinos': 'Mobile Casinos',
  'newest-casinos': 'Newest Casinos',
  'casino-bonuses': 'Casino Bonuses',
  Bonuses: 'Bonuses',
  slots: 'Slots',
  'casino-games': 'Casino Games',
  'table-games': 'Table Games',
  'sports-betting': 'Sports Betting',
};

export default function FaqsPage() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/faqs`);
      const data = await res.json();
      setFaqs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch FAQs', err);
    }
    setIsLoading(false);
  };

  const handleEdit = (faq: any) => {
    router.push(`/admin/faqs/edit/${faq.id}`);
  };

  const handleDelete = async (faq: any) => {
    if (confirm(`Are you sure you want to delete this FAQ:\n\n"${faq.question}"?`)) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/faqs/${faq.id}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          fetchFaqs();
        }
      } catch (err) {
        console.error('Error deleting FAQ:', err);
      }
    }
  };

  // Get distinct categories present in data
  const availableCategories = useMemo(() => {
    const set = new Set<string>();
    faqs.forEach((f) => {
      if (f.category) set.add(f.category);
    });
    return Array.from(set).sort();
  }, [faqs]);

  // Filtered FAQs
  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesCategory =
        selectedCategory === 'all' ||
        (faq.category && faq.category.toLowerCase() === selectedCategory.toLowerCase());

      const matchesSearch =
        !searchQuery ||
        (faq.question && faq.question.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (faq.answer && faq.answer.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [faqs, selectedCategory, searchQuery]);

  const columns: Column[] = [
    {
      header: 'Question & Answer',
      accessor: 'question',
      render: (val, row) => (
        <div className="max-w-xl py-1">
          <div className="font-bold text-slate-900 text-sm">{val}</div>
          <div className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
            {row.answer}
          </div>
        </div>
      ),
    },
    {
      header: 'Category',
      accessor: 'category',
      render: (val) => {
        const catKey = val || 'General';
        const label = CATEGORY_LABELS[catKey] || catKey;
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-[#2E68FB] border border-blue-200">
            {label}
          </span>
        );
      },
    },
    {
      header: 'Sort Order',
      accessor: 'sort_order',
      render: (val) => <span className="font-mono text-xs text-slate-600">{val ?? 0}</span>,
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (val) => (
        <span
          className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
            val
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              : 'bg-slate-50 text-slate-500 border border-slate-200'
          }`}
        >
          {val ? 'Active' : 'Inactive'}
        </span>
      ),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto pb-16">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Category FAQs</h1>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
              {filteredFaqs.length} items
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1.5 font-medium">
            Manage dynamic frequently asked questions for the homepage and category landing pages.
          </p>
        </div>

        <Button onClick={() => router.push('/admin/faqs/new')} className="gap-2 shrink-0">
          <Plus size={18} />
          Add New FAQ
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search questions or answers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#2E68FB]/20 focus:border-[#2E68FB]"
          />
        </div>

        {/* Category Dropdown */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full md:w-64 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#2E68FB]/20 focus:border-[#2E68FB]"
          >
            <option value="all">All Categories ({faqs.length})</option>
            {availableCategories.map((cat) => {
              const count = faqs.filter((f) => f.category === cat).length;
              return (
                <option key={cat} value={cat}>
                  {CATEGORY_LABELS[cat] || cat} ({count})
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {/* Table Content */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-indigo-150 border-t-indigo-600 rounded-full animate-spin" />
        </div>
      ) : filteredFaqs.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-xs">
          <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800 mb-1">No FAQs Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mb-5">
            {selectedCategory !== 'all'
              ? `No FAQs exist in the "${CATEGORY_LABELS[selectedCategory] || selectedCategory}" category yet.`
              : 'No frequently asked questions match your current search query.'}
          </p>
          <Button onClick={() => router.push('/admin/faqs/new')} className="gap-2">
            <Plus size={16} />
            Create First FAQ for this Category
          </Button>
        </div>
      ) : (
        <div className="shadow-lg shadow-slate-100/50 rounded-2xl overflow-hidden border border-slate-200 bg-white">
          <Table columns={columns} data={filteredFaqs} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      )}
    </div>
  );
}
