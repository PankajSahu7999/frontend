'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Textarea, Select, Button } from '../../../../components/admin/FormElements';
import MediaUpload from '../../../../components/admin/MediaUpload';
import { ArrowLeft, AlertCircle, Save, Sparkles, RefreshCw } from 'lucide-react';
import { buildApiUrl } from '@/config/api.config';

const CATEGORIES = [
  'Slots Guides',
  'Blackjack Guides',
  'Roulette Guides',
  'Baccarat Guides',
  'Craps Guides',
  'Poker Guides',
  'More Guides',
];

export default function NewGuidePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [customCategory, setCustomCategory] = useState(false);
  const [manualSlug, setManualSlug] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Slots Guides',
    featured_image: '',
    excerpt: '',
    content: '',
    meta_title: '',
    meta_description: '',
    status: 'published',
    author_name: 'Casino Expert',
    published_at: new Date().toISOString().split('T')[0],
  });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title: newTitle,
      slug: manualSlug ? prev.slug : generateSlug(newTitle),
      meta_title: prev.meta_title ? prev.meta_title : (newTitle ? `${newTitle} | Casino Guides` : ''),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formData.title.trim()) {
      setFormError('Guide Title is required.');
      return;
    }

    if (!formData.category.trim()) {
      setFormError('Category is required.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch(buildApiUrl('/admin/guides'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push('/admin/guides');
      } else {
        const err = await res.json().catch(() => ({}));
        setFormError(err.error || 'Failed to save guide. Please check your inputs.');
      }
    } catch (err: any) {
      console.error(err);
      setFormError(err?.message || 'Network error. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <button
        onClick={() => router.push('/admin/guides')}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-6 text-sm font-semibold uppercase tracking-wider"
      >
        <ArrowLeft size={16} />
        Back to Guides
      </button>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Create New Casino Guide</h1>
            <p className="text-sm text-slate-500 mt-1">
              Add expert gameplay rules, strategy advice, and SEO-optimized guide content.
            </p>
          </div>
          <span className="px-3 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-full text-xs font-semibold">
            Guide Editor
          </span>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {formError && (
            <div className="flex items-center gap-3 px-4 py-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-sm font-medium">
              <AlertCircle size={16} className="shrink-0" />
              {formError}
            </div>
          )}

          {/* Title and Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Guide Title"
              value={formData.title}
              onChange={handleTitleChange}
              placeholder="e.g. Cluster Pays Slots: How They Work and Which to Play"
              required
            />

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Category
              </label>
              {!customCategory ? (
                <div className="flex gap-2">
                  <select
                    value={formData.category}
                    onChange={(e) => {
                      if (e.target.value === '__custom__') {
                        setCustomCategory(true);
                        setFormData({ ...formData, category: '' });
                      } else {
                        setFormData({ ...formData, category: e.target.value });
                      }
                    }}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-800 font-medium"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                    <option value="__custom__">+ Add Custom Category...</option>
                  </select>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Input
                    label=""
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Enter custom category name..."
                    required
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setCustomCategory(false);
                      setFormData({ ...formData, category: 'Slots Guides' });
                    }}
                    className="text-xs text-indigo-600 underline shrink-0 mt-2 font-medium"
                  >
                    Preset list
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Slug and Published Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-semibold text-slate-700">
                  Slug (URL Path)
                </label>
                <button
                  type="button"
                  onClick={() => {
                    const s = generateSlug(formData.title);
                    setFormData({ ...formData, slug: s });
                    setManualSlug(false);
                  }}
                  className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center gap-1 font-medium"
                >
                  <RefreshCw size={11} />
                  Auto Generate
                </button>
              </div>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => {
                  setManualSlug(true);
                  setFormData({ ...formData, slug: e.target.value });
                }}
                placeholder="cluster-pays-slots"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-800"
              />
            </div>

            <Input
              label="Published Date"
              type="date"
              value={formData.published_at}
              onChange={(e) => setFormData({ ...formData, published_at: e.target.value })}
              required
            />
          </div>

          {/* Status & Author */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="Status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              options={[
                { value: 'published', label: 'Published (Visible to public)' },
                { value: 'draft', label: 'Draft (Admin only)' },
              ]}
            />

            <Input
              label="Author Name"
              value={formData.author_name}
              onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
              placeholder="e.g. Casino Expert"
            />
          </div>

          {/* Featured Image */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Featured Image (Optional)</label>
            <MediaUpload
              value={formData.featured_image}
              onChange={(url) => setFormData({ ...formData, featured_image: url })}
            />
          </div>

          {/* Excerpt / Summary */}
          <Textarea
            label="Short Excerpt / Summary (Displayed on Card & Search)"
            value={formData.excerpt}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                excerpt: e.target.value,
                meta_description: prev.meta_description ? prev.meta_description : e.target.value,
              }))
            }
            rows={3}
            placeholder="Brief overview explaining what players will learn from this guide..."
          />

          {/* Full Content */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-semibold text-slate-700">
                Full Guide Content (Markdown / HTML Supported)
              </label>
              <span className="text-xs text-slate-400">Supports headers (##), bold (**text**), lists, etc.</span>
            </div>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={14}
              placeholder="Write the full comprehensive guide article here..."
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-800 leading-relaxed"
            />
          </div>

          {/* SEO Metadata Section */}
          <div className="border-t border-slate-100 pt-6 mt-6 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
              <Sparkles size={16} className="text-amber-500" />
              SEO & Metadata Settings
            </h3>
            <Input
              label="Meta Title"
              value={formData.meta_title}
              onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
              placeholder="SEO Meta Title (Defaults to Title | Casino Guides)"
            />
            <Textarea
              label="Meta Description"
              value={formData.meta_description}
              onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
              rows={2}
              placeholder="SEO Meta Description (Defaults to Excerpt)"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Button
              type="button"
              variant="secondary"
              onClick={() => router.push('/admin/guides')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={isLoading}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20"
            >
              <Save size={16} />
              Publish Guide
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
