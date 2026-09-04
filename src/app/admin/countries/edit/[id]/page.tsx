'use client';
import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Select, Button } from '../../../../../components/admin/FormElements';
import { ArrowLeft, Save } from 'lucide-react';

interface Region {
  id: string;
  name: string;
  slug: string;
}

export default function EditCountryPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [regions, setRegions] = useState<Region[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    regionId: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch regions and country data in parallel
        const [regionsRes, countryRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/regions`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/countries/${resolvedParams.id}`)
        ]);

        if (regionsRes.ok) {
          const regionsData = await regionsRes.json();
          setRegions(regionsData);
        }

        if (countryRes.ok) {
          const data = await countryRes.json();
          setFormData({
            name: data.name,
            code: data.code,
            regionId: data.regionId || ''
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsFetching(false);
      }
    };
    fetchData();
  }, [resolvedParams.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/countries/${resolvedParams.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          code: formData.code,
          regionId: formData.regionId || null
        })
      });
      if (res.ok) {
        router.push('/admin/countries');
      } else {
        alert('Failed to save country');
      }
    } catch (err) {
      console.error(err);
      alert('Error saving country');
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) return <div className="p-10 text-center">Loading...</div>;

  const regionOptions = regions.map(r => ({ value: r.id, label: r.name }));

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <button 
        onClick={() => router.push('/admin/countries')} 
        className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-6 text-sm font-semibold uppercase tracking-wider"
      >
        <ArrowLeft size={16} />
        Back to Countries
      </button>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-xl overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50">
          <h1 className="text-2xl font-bold text-slate-800">Edit Country</h1>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <Input 
            label="Name" 
            value={formData.name} 
            onChange={(e) => setFormData({...formData, name: e.target.value})} 
            placeholder="e.g. Canada"
            required 
          />

          <Input 
            label="Code" 
            value={formData.code} 
            onChange={(e) => setFormData({...formData, code: e.target.value})} 
            placeholder="e.g. CA"
            required
          />

          <Select
            label="Region"
            value={formData.regionId}
            onChange={(e) => setFormData({...formData, regionId: e.target.value})}
            placeholder="Select a region (optional)"
            options={[{ value: '', label: 'No Region' }, ...regionOptions]}
          />

          <div className="flex justify-end gap-4 pt-6 border-t border-slate-100">
            <Button type="button" variant="secondary" onClick={() => router.push('/admin/countries')}>Cancel</Button>
            <Button type="submit" isLoading={isLoading} className="gap-2">
              <Save size={16} />
              Save Country
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
