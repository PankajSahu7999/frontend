'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Button } from '@/components/admin/FormElements';
import { ArrowLeft, Save } from 'lucide-react';

export default function NewBannedCountryPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ country_code: '', country_name: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/banned-countries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) router.push('/admin/banned-countries');
      else alert('Failed to save');
    } catch (err) {
      console.error(err);
      alert('Error saving');
    } finally { setIsLoading(false); }
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <button onClick={() => router.push('/admin/banned-countries')} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-6 text-sm font-semibold uppercase tracking-wider">
        <ArrowLeft size={16} />
        Back to Banned Countries
      </button>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xl overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50">
          <h1 className="text-2xl font-bold text-slate-800">Add Banned Country</h1>
        </div>
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <Input label="Country Name" value={formData.country_name} onChange={(e) => setFormData({...formData, country_name: e.target.value})} placeholder="e.g. North Korea" required />
          <Input label="Country Code" value={formData.country_code} onChange={(e) => setFormData({...formData, country_code: e.target.value})} placeholder="e.g. KP" required />
          <div className="flex justify-end gap-4 pt-6 border-t border-slate-100">
            <Button type="button" variant="secondary" onClick={() => router.push('/admin/banned-countries')}>Cancel</Button>
            <Button type="submit" isLoading={isLoading} className="gap-2"><Save size={16} /> Save</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
