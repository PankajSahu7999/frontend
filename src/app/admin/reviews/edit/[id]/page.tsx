'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Input, Textarea, Select, Button } from '../../../../../components/admin/FormElements';
import { ArrowLeft, Save } from 'lucide-react';

export default function EditReviewPage() {
  const router = useRouter();
  const params = useParams();
  const reviewId = params.id as string;
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [casinos, setCasinos] = useState([]);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    featured_image: '',
    content: '',
    rating: '4.5',
    casino_id: '',
    meta_title: '',
    meta_description: '',
    status: 'draft'
  });

  useEffect(() => {
    fetchReview();
    fetchCasinos();
  }, [reviewId]);

  const fetchReview = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/reviews/${reviewId}`);
      const data = await res.json();
      setFormData(data);
    } catch (err) {
      console.error("Failed to fetch review", err);
    }
    setIsLoading(false);
  };

  const fetchCasinos = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/casinos`);
      const data = await res.json();
      setCasinos(data);
    } catch (err) {
      console.error("Failed to fetch casinos", err);
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
    setIsSaving(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/reviews/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        router.push('/admin/reviews');
      } else {
        alert('Failed to update review');
      }
    } catch (err) {
      console.error(err);
      alert('Error updating review');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-10 h-10 border-4 border-indigo-150 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

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
          <h1 className="text-2xl font-bold text-slate-800">Edit Review</h1>
          <p className="text-sm text-slate-500 mt-1">Update your casino review.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input 
              label="Title" 
              value={formData.title} 
              onChange={handleTitleChange} 
              placeholder="Review title"
              required 
            />
            <Input 
              label="Slug" 
              value={formData.slug} 
              onChange={(e) => setFormData({...formData, slug: e.target.value})} 
              placeholder="review-slug"
              required 
            />
          </div>

          <Select 
            label="Casino" 
            options={casinos.map((c: any) => ({ value: c.id, label: c.name }))}
            value={formData.casino_id}
            onChange={(e) => setFormData({...formData, casino_id: e.target.value})}
            required
          />

          <Input 
            label="Rating (0.0 - 5.0)" 
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
            <Button type="submit" isLoading={isSaving} className="gap-2">
              <Save size={16} />
              Update Review
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
