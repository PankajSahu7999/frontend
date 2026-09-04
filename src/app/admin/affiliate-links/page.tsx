'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Table, Column } from '../../../components/admin/Table';
import { Button } from '../../../components/admin/FormElements';
import { Plus } from 'lucide-react';

export default function AffiliateLinksPage() {
  const [links, setLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/affiliate-links`);
      const data = await res.json();
      setLinks(data);
    } catch (err) {
      console.error("Failed to fetch affiliate links", err);
    }
    setIsLoading(false);
  };

  const handleEdit = (link: any) => {
    router.push(`/admin/affiliate-links/edit/${link.id}`);
  };

  const handleDelete = async (link: any) => {
    if (confirm(`Are you sure you want to delete "${link.title}"?`)) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/affiliate-links/${link.id}`, {
          method: 'DELETE'
        });
        if (res.ok) {
          fetchLinks();
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
      header: 'Casino', 
      accessor: 'casino',
      render: (val) => val?.name || 'General'
    },
    { 
      header: 'Button Text', 
      accessor: 'button_text'
    },
    { 
      header: 'Clicks', 
      accessor: 'clicks'
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
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Affiliate Links</h1>
          <p className="text-sm text-slate-500 mt-1.5 font-medium">Manage affiliate tracking links.</p>
        </div>
        <Button onClick={() => router.push('/admin/affiliate-links/new')} className="gap-2">
          <Plus size={18} />
          Add Link
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-indigo-150 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="shadow-lg shadow-slate-100/50 rounded-xl overflow-hidden border border-slate-100 bg-white">
          <Table columns={columns} data={links} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      )}
    </div>
  );
}
