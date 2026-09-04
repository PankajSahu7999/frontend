'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Button } from '../../../../components/admin/FormElements';
import { ArrowLeft, Save } from 'lucide-react';

export default function NewTagPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    slug: ''
  });

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setFormData({
      ...formData,
      name,
      slug: generateSlug(name)
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/tags`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        router.push('/admin/tags');
      } else {
        alert('Failed to save tag');
      }
    } catch (err) {
      console.error(err);
      alert('Error saving tag');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <button 
        onClick={() => router.push('/admin/tags')} 
        className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-6 text-sm font-semibold uppercase tracking-wider"
      >
        <ArrowLeft size={16} />
        Back to Tags
      </button>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-xl overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50">
          <h1 className="text-2xl font-bold text-slate-800">Create New Tag</h1>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <Input 
            label="Name" 
            value={formData.name} 
            onChange={handleNameChange} 
            placeholder="e.g. Free Spins Bonus"
            required 
          />

          <Input 
            label="Slug" 
            value={formData.slug} 
            onChange={(e) => setFormData({...formData, slug: e.target.value})} 
            placeholder="free-spins-bonus"
            required
          />

          <div className="flex justify-end gap-4 pt-6 border-t border-slate-100">
            <Button type="button" variant="secondary" onClick={() => router.push('/admin/tags')}>Cancel</Button>
            <Button type="submit" isLoading={isLoading} className="gap-2">
              <Save size={16} />
              Save Tag
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
