'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Table, Column } from '../../../components/admin/Table';
import { Button } from '../../../components/admin/FormElements';
import { Plus } from 'lucide-react';

export default function BannersPage() {
  const [banners, setBanners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/banners`);
      const data = await res.json();
      setBanners(data);
    } catch (err) {
      console.error("Failed to fetch banners", err);
    }
    setIsLoading(false);
  };

  const handleEdit = (banner: any) => {
    router.push(`/admin/banners/edit/${banner.id}`);
  };

  const handleDelete = async (banner: any) => {
    if (confirm(`Are you sure you want to delete "${banner.title}"?`)) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/banners/${banner.id}`, {
          method: 'DELETE'
        });
        if (res.ok) {
          fetchBanners();
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const columns: Column[] = [
    { 
      header: 'Title', 
      accessor: 'title',
      render: (val) => (
        <span className="font-semibold text-slate-800">{val}</span>
      )
    },
    { 
      header: 'Position', 
      accessor: 'position'
    },
    { 
      header: 'Status', 
      accessor: 'status', 
      render: (val) => (
        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
          val ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-50 text-slate-600 border border-slate-200'
        }`}>
          {val ? 'Active' : 'Inactive'}
        </span>
      )
    },
    { 
      header: 'Start Date', 
      accessor: 'start_date',
      render: (val) => val ? new Date(val).toLocaleDateString() : 'N/A'
    },
    { 
      header: 'End Date', 
      accessor: 'end_date',
      render: (val) => val ? new Date(val).toLocaleDateString() : 'N/A'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Banners</h1>
          <p className="text-sm text-slate-500 mt-1.5 font-medium">Manage promotional banners and ads.</p>
        </div>
        <Button onClick={() => router.push('/admin/banners/new')} className="gap-2">
          <Plus size={18} />
          Add Banner
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-indigo-150 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="shadow-lg shadow-slate-100/50 rounded-xl overflow-hidden border border-slate-100 bg-white">
          <Table columns={columns} data={banners} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      )}
    </div>
  );
}
