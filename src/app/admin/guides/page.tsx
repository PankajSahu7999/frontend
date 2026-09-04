'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Table, Column } from '../../../components/admin/Table';
import { Button } from '../../../components/admin/FormElements';
import { Plus, Search, Filter, BookOpen } from 'lucide-react';
import { buildApiUrl } from '@/config/api.config';

export default function GuidesAdminPage() {
  const [guides, setGuides] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const router = useRouter();

  useEffect(() => {
    fetchGuides();
  }, [selectedCategory]);

  const fetchGuides = async () => {
    setIsLoading(true);
    try {
      let endpoint = '/admin/guides';
      if (selectedCategory && selectedCategory !== 'All') {
        endpoint += `?category=${encodeURIComponent(selectedCategory)}`;
      }
      const res = await fetch(buildApiUrl(endpoint));
      const data = await res.json();
      setGuides(data.guides || data || []);
    } catch (err) {
      console.error('Failed to fetch guides', err);
    }
    setIsLoading(false);
  };

  const handleEdit = (guide: any) => {
    router.push(`/admin/guides/edit/${guide.id}`);
  };

  const handleDelete = async (guide: any) => {
    if (confirm(`Are you sure you want to delete "${guide.title}"?`)) {
      try {
        const res = await fetch(buildApiUrl(`/admin/guides/${guide.id}`), {
          method: 'DELETE',
        });
        if (res.ok) {
          fetchGuides();
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const categories = [
    'All',
    'Slots Guides',
    'Blackjack Guides',
    'Roulette Guides',
    'Baccarat Guides',
    'Craps Guides',
    'Poker Guides',
    'More Guides',
  ];

  const filteredGuides = guides.filter((g) => {
    const matchesSearch =
      !searchQuery ||
      g.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.slug?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const columns: Column[] = [
    {
      header: 'Title',
      accessor: 'title',
      render: (_: any, row: any) => (
        <div className="flex flex-col">
          <span className="font-semibold text-slate-900 line-clamp-1">{row.title}</span>
          <span className="text-xs text-slate-400">/guides/{row.slug}</span>
        </div>
      ),
    },
    {
      header: 'Category',
      accessor: 'category',
      render: (_: any, row: any) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
          {row.category}
        </span>
      ),
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (_: any, row: any) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
            row.status === 'published'
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              : 'bg-amber-50 text-amber-700 border border-amber-200'
          }`}
        >
          {row.status || 'draft'}
        </span>
      ),
    },
    {
      header: 'Published Date',
      accessor: 'published_at',
      render: (_: any, row: any) => (
        <span className="text-xs text-slate-600">
          {row.published_at ? new Date(row.published_at).toLocaleDateString('en-GB') : '-'}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <BookOpen className="text-indigo-600" size={26} />
            Casino Guides Management
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Create, edit, and organize expert guides across all casino game categories.
          </p>
        </div>
        <Button
          onClick={() => router.push('/admin/guides/new')}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20"
        >
          <Plus size={16} />
          Create New Guide
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search guides by title, slug, or content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <Filter size={16} className="text-slate-400 shrink-0" />
          <div className="flex gap-1.5 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="bg-white rounded-xl border border-slate-200/80 p-12 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-600 border-t-transparent mb-3" />
          <p className="text-xs text-slate-500 font-medium">Loading casino guides...</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
          <Table
            columns={columns}
            data={filteredGuides}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      )}
    </div>
  );
}
