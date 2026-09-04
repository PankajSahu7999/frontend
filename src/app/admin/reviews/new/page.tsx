'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Textarea, Select, Button } from '../../../../components/admin/FormElements';
import { ArrowLeft, Save, AlertCircle } from 'lucide-react';

interface Casino {
  id: string;
  name: string;
}

export default function NewReviewPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [casinos, setCasinos] = useState<Casino[]>([]);
  const [casinosLoading, setCasinosLoading] = useState(true);
  const [formError, setFormError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    featured_image: '',
    content: '',
    rating: '4.5',
    casino_id: '',
    author_id: '',
    meta_title: '',
    meta_description: '',
    status: 'draft'
  });

  useEffect(() => {
    fetchCasinos();
  }, []);

  const fetchCasinos = async () => {
    setCasinosLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/casinos`);
      const data = await res.json();
      setCasinos(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch casinos', err);
      setCasinos([]);
    } finally {
      setCasinosLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setFormData({ ...formData, title: newTitle, slug: generateSlug(newTitle) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formData.casino_id) {
      setFormError('Please select a casino before saving.');
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        ...formData,
        author_id: formData.author_id || null,
        rating: formData.rating || null,
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        router.push('/admin/reviews');
      } else {
        const err = await res.json().catch(() => ({}));
        setFormError(err.error || 'Failed to save review. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setFormError('Network error. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <button 
        onClick={() => router.push('/admin/reviews')} 
        className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-6 text-sm font-semibold uppercase tracking-wider"
      >
        <ArrowLeft size={16} />
        Back to Reviews
      </button>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-xl overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50">
          <h1 className="text-2xl font-bold text-slate-800">Create New Review</h1>
          <p className="text-sm text-slate-500 mt-1">Write a detailed casino review.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">

          {/* Inline error banner */}
          {formError && (
            <div className="flex items-center gap-3 px-4 py-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-sm font-medium">
              <AlertCircle size={16} className="shrink-0" />
              {formError}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input 
              label="Title" 
              value={formData.title} 
              onChange={handleTitleChange} 
              placeholder="Review title"
              required 
            />
            <Input 
              label="Slug (Auto-generated)" 
              value={formData.slug} 
              onChange={(e) => setFormData({...formData, slug: e.target.value})} 
              placeholder="review-slug"
              required 
            />
          </div>

          {/* Casino selector with loading state */}
          {casinosLoading ? (
            <div className="mb-4">
              <div className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Casino</div>
              <div className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-400 animate-pulse">
                Loading casinos…
              </div>
            </div>
          ) : casinos.length === 0 ? (
            <div className="mb-4">
              <div className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Casino</div>
              <div className="flex items-center gap-2 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-700">
                <AlertCircle size={15} />
                No casinos found. <button type="button" onClick={fetchCasinos} className="underline font-semibold">Retry</button>
              </div>
            </div>
          ) : (
            <Select
              label="Casino *"
              placeholder="— Select a Casino —"
              options={casinos.map((c) => ({ value: c.id, label: c.name ?? c.id }))}
              value={formData.casino_id}
              onChange={(e) => {
                setFormData({...formData, casino_id: e.target.value});
                if (e.target.value) setFormError('');
              }}
              required
            />
          )}

          <Input 
            label="Rating (0.0 – 5.0)" 
            type="number"
            step="0.1"
            min="0" max="5"
            value={formData.rating} 
            onChange={(e) => setFormData({...formData, rating: e.target.value})} 
            placeholder="4.5"
            required
          />

          <Input 
            label="Featured Image URL" 
            value={formData.featured_image} 
            onChange={(e) => setFormData({...formData, featured_image: e.target.value})} 
            placeholder="https://example.com/image.jpg"
          />

          <Textarea 
            label="Content" 
            value={formData.content} 
            onChange={(e) => setFormData({...formData, content: e.target.value})} 
            placeholder="Detailed review content..."
            rows={12}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input 
              label="Meta Title" 
              value={formData.meta_title} 
              onChange={(e) => setFormData({...formData, meta_title: e.target.value})} 
              placeholder="SEO meta title"
            />
            <Input 
              label="Meta Description" 
              value={formData.meta_description} 
              onChange={(e) => setFormData({...formData, meta_description: e.target.value})} 
              placeholder="SEO meta description"
            />
          </div>

          <Select 
            label="Status" 
            options={[
              {value: 'draft', label: 'Draft'},
              {value: 'published', label: 'Published'}
            ]}
            value={formData.status}
            onChange={(e) => setFormData({...formData, status: e.target.value})}
          />

          <div className="flex justify-end gap-4 pt-6 border-t border-slate-100">
            <Button type="button" variant="secondary" onClick={() => router.push('/admin/reviews')}>Cancel</Button>
            <Button type="submit" isLoading={isLoading} disabled={casinosLoading || casinos.length === 0} className="gap-2">
              <Save size={16} />
              Save Review
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
