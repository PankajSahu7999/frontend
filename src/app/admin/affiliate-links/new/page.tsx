'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Select, Toggle, Button } from '../../../../components/admin/FormElements';
import { ArrowLeft, Save } from 'lucide-react';

export default function NewAffiliateLinkPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [casinos, setCasinos] = useState([]);

  const [formData, setFormData] = useState({
    title: '',
    casino_id: '',
    affiliate_url: '',
    button_text: 'Play Now',
    status: true
  });

  useEffect(() => {
    fetchCasinos();
  }, []);

  const fetchCasinos = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/casinos`);
      const data = await res.json();
      setCasinos(data);
    } catch (err) {
      console.error("Failed to fetch casinos", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/affiliate-links`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        router.push('/admin/affiliate-links');
      } else {
        alert('Failed to save affiliate link');
      }
    } catch (err) {
      console.error(err);
      alert('Error saving affiliate link');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <button 
        onClick={() => router.push('/admin/affiliate-links')} 
        className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-6 text-sm font-semibold uppercase tracking-wider"
      >
        <ArrowLeft size={16} />
        Back to Affiliate Links
      </button>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-xl overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50">
          <h1 className="text-2xl font-bold text-slate-800">Create New Affiliate Link</h1>
          <p className="text-sm text-slate-500 mt-1">Add a new affiliate tracking link.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <Input 
            label="Title" 
            value={formData.title} 
            onChange={(e) => setFormData({...formData, title: e.target.value})} 
            placeholder="Link title"
            required 
          />

          <Select 
            label="Casino (Optional)" 
            options={[{value: '', label: 'General'}, ...casinos.map((c: any) => ({ value: c.id, label: c.name }))]}
            value={formData.casino_id}
            onChange={(e) => setFormData({...formData, casino_id: e.target.value})}
          />

          <Input 
            label="Affiliate URL" 
            value={formData.affiliate_url} 
            onChange={(e) => setFormData({...formData, affiliate_url: e.target.value})} 
            placeholder="https://affiliate.link/click?id=123"
            required 
          />

          <Input 
            label="Button Text" 
            value={formData.button_text} 
            onChange={(e) => setFormData({...formData, button_text: e.target.value})} 
            placeholder="Play Now"
          />

          <Toggle 
            label="Active" 
            checked={formData.status} 
            onChange={(e) => setFormData({...formData, status: e.target.checked})} 
          />

          <div className="flex justify-end gap-4 pt-6 border-t border-slate-100">
            <Button type="button" variant="secondary" onClick={() => router.push('/admin/affiliate-links')}>Cancel</Button>
            <Button type="submit" isLoading={isLoading} className="gap-2">
              <Save size={16} />
              Save Affiliate Link
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
