'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Table, Column } from '@/components/admin/Table';
import { Button } from '@/components/admin/FormElements';
import { Plus } from 'lucide-react';

export default function BannedCountriesPage() {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => { fetchBannedCountries(); }, []);

  const fetchBannedCountries = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/banned-countries`);
      const data = await res.json();
      setCountries(data);
    } catch (err) {
      console.error("Failed to fetch banned countries", err);
    }
    setIsLoading(false);
  };

  const handleEdit = (country: any) => {
    router.push(`/admin/banned-countries/edit/${country.id}`);
  };

  const handleDelete = async (country: any) => {
    if (confirm(`Remove ${country.country_name} from banned list?`)) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/banned-countries/${country.id}`, { method: 'DELETE' });
        if (res.ok) fetchBannedCountries();
      } catch (err) { console.error(err); }
    }
  };

  const columns: Column[] = [
    { header: 'Country Name', accessor: 'country_name', render: (val) => (<span className="font-semibold text-slate-800">{val}</span>) },
    { header: 'Country Code', accessor: 'country_code' },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Banned Countries</h1>
          <p className="text-sm text-slate-500 mt-1.5 font-medium">Restrict access from these countries.</p>
        </div>
        <Button onClick={() => router.push('/admin/banned-countries/new')} className="gap-2">
          <Plus size={18} />
          Add Country
        </Button>
      </div>
      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-indigo-150 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="shadow-lg shadow-slate-100/50 rounded-xl overflow-hidden border border-slate-100 bg-white">
          <Table columns={columns} data={countries} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      )}
    </div>
  );
}
