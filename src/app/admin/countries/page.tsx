'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Table, Column } from '../../../components/admin/Table';
import { Button } from '../../../components/admin/FormElements';
import { Plus } from 'lucide-react';

export default function CountriesPage() {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/countries`);
      const data = await res.json();
      setCountries(data);
    } catch (err) {
      console.error("Failed to fetch countries", err);
    }
    setIsLoading(false);
  };

  const handleEdit = (country: any) => {
    router.push(`/admin/countries/edit/${country.id}`);
  };

  const handleDelete = async (country: any) => {
    if (confirm(`Are you sure you want to delete this country?`)) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/countries/${country.id}`, {
          method: 'DELETE'
        });
        if (res.ok) {
          fetchCountries();
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const columns: Column[] = [
    { 
      header: 'Name', 
      accessor: 'name',
      render: (val) => (
        <span className="font-semibold text-slate-800">{val}</span>
      )
    },
    { 
      header: 'Code', 
      accessor: 'code',
    },
    {
      header: 'Region',
      accessor: 'region',
      render: (val) => (
        val ? (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
            {val.name}
          </span>
        ) : (
          <span className="text-slate-400 text-xs italic">No region</span>
        )
      )
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Countries</h1>
          <p className="text-sm text-slate-500 mt-1.5 font-medium">Manage available countries.</p>
        </div>
        <Button onClick={() => router.push('/admin/countries/new')} className="gap-2">
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
