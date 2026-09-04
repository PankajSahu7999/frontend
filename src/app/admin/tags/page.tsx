'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Table, Column } from '../../../components/admin/Table';
import { Button } from '../../../components/admin/FormElements';
import { Plus } from 'lucide-react';

export default function TagsPage() {
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/tags`);
      const data = await res.json();
      setTags(data);
    } catch (err) {
      console.error("Failed to fetch tags", err);
    }
    setIsLoading(false);
  };

  const handleEdit = (tag: any) => {
    router.push(`/admin/tags/edit/${tag.id}`);
  };

  const handleDelete = async (tag: any) => {
    if (confirm(`Are you sure you want to delete this tag?`)) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/tags/${tag.id}`, {
          method: 'DELETE'
        });
        if (res.ok) {
          fetchTags();
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
      header: 'Slug', 
      accessor: 'slug',
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Casino Tags</h1>
          <p className="text-sm text-slate-500 mt-1.5 font-medium">Manage casino tags.</p>
        </div>
        <Button onClick={() => router.push('/admin/tags/new')} className="gap-2">
          <Plus size={18} />
          Add Tag
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-indigo-150 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="shadow-lg shadow-slate-100/50 rounded-xl overflow-hidden border border-slate-100 bg-white">
          <Table columns={columns} data={tags} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      )}
    </div>
  );
}
