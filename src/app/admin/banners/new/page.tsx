'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Toggle, Button } from '../../../../components/admin/FormElements';
import MediaUpload from '../../../../components/admin/MediaUpload';
import { ArrowLeft, Save } from 'lucide-react';

export default function NewBannerPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    image_url: '',
    redirect_url: '',
    position: 'homepage',
    status: true,
    start_date: '',
    end_date: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/banners`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        router.push('/admin/banners');
      } else {
        alert('Failed to save banner');
      }
    } catch (err) {
      console.error(err);
      alert('Error saving banner');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <button 
        onClick={() => router.push('/admin/banners')} 
        className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-6 text-sm font-semibold uppercase tracking-wider"
      >
        <ArrowLeft size={16} />
        Back to Banners
      </button>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-xl overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50">
          <h1 className="text-2xl font-bold text-slate-800">Create New Banner</h1>
          <p className="text-sm text-slate-500 mt-1">Add a new promotional banner.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <Input 
            label="Title" 
            value={formData.title} 
            onChange={(e) => setFormData({...formData, title: e.target.value})} 
            placeholder="Banner title"
            required 
          />

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Banner Image</label>
            <MediaUpload
              value={formData.image_url}
              onChange={(value) => setFormData({...formData, image_url: value})}
              accept="image"
              folder="banners"
            />
          </div>

          <Input 
            label="Redirect URL" 
            value={formData.redirect_url} 
            onChange={(e) => setFormData({...formData, redirect_url: e.target.value})} 
            placeholder="https://example.com/destination"
          />

          <Input 
            label="Position" 
            value={formData.position} 
            onChange={(e) => setFormData({...formData, position: e.target.value})} 
            placeholder="homepage"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input 
              label="Start Date" 
              type="date"
              value={formData.start_date} 
              onChange={(e) => setFormData({...formData, start_date: e.target.value})} 
            />
            <Input 
              label="End Date" 
              type="date"
              value={formData.end_date} 
              onChange={(e) => setFormData({...formData, end_date: e.target.value})} 
            />
          </div>

          <Toggle 
            label="Active" 
            checked={formData.status} 
            onChange={(e) => setFormData({...formData, status: e.target.checked})} 
          />

          <div className="flex justify-end gap-4 pt-6 border-t border-slate-100">
            <Button type="button" variant="secondary" onClick={() => router.push('/admin/banners')}>Cancel</Button>
            <Button type="submit" isLoading={isLoading} className="gap-2">
              <Save size={16} />
              Save Banner
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
