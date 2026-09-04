'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Table, Column } from '../../../components/admin/Table';
import { Button } from '../../../components/admin/FormElements';
import { Plus } from 'lucide-react';

export default function FaqsPage() {
  const [faqs, setFaqs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/faqs`);
      const data = await res.json();
      setFaqs(data);
    } catch (err) {
      console.error("Failed to fetch FAQs", err);
    }
    setIsLoading(false);
  };

  const handleEdit = (faq: any) => {
    router.push(`/admin/faqs/edit/${faq.id}`);
  };

  const handleDelete = async (faq: any) => {
    if (confirm(`Are you sure you want to delete this FAQ?`)) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/faqs/${faq.id}`, {
          method: 'DELETE'
        });
        if (res.ok) {
          fetchFaqs();
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const columns: Column[] = [
    { 
      header: 'Question', 
      accessor: 'question',
      render: (val) => (
        <span className="font-semibold text-slate-800">{val}</span>
      )
    },
    { 
      header: 'Category', 
      accessor: 'category',
      render: (val) => val || 'General'
    },
    { 
      header: 'Sort Order', 
      accessor: 'sort_order'
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
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">FAQs</h1>
          <p className="text-sm text-slate-500 mt-1.5 font-medium">Manage frequently asked questions.</p>
        </div>
        <Button onClick={() => router.push('/admin/faqs/new')} className="gap-2">
          <Plus size={18} />
          Add FAQ
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-indigo-150 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="shadow-lg shadow-slate-100/50 rounded-xl overflow-hidden border border-slate-100 bg-white">
          <Table columns={columns} data={faqs} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      )}
    </div>
  );
}
