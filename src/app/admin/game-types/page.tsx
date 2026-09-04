'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Table, Column } from '../../../components/admin/Table';
import { Button } from '../../../components/admin/FormElements';
import { Plus } from 'lucide-react';

export default function GameTypesPage() {
  const [gameTypes, setGameTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchGameTypes();
  }, []);

  const fetchGameTypes = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/game-types`);
      const data = await res.json();
      setGameTypes(data);
    } catch (err) {
      console.error("Failed to fetch game types", err);
    }
    setIsLoading(false);
  };

  const handleEdit = (gameType: any) => {
    router.push(`/admin/game-types/edit/${gameType.id}`);
  };

  const handleDelete = async (gameType: any) => {
    if (confirm(`Are you sure you want to delete this game type?`)) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/game-types/${gameType.id}`, {
          method: 'DELETE'
        });
        if (res.ok) {
          fetchGameTypes();
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
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Game Types</h1>
          <p className="text-sm text-slate-500 mt-1.5 font-medium">Manage casino game types (e.g., Slots, Table Games).</p>
        </div>
        <Button onClick={() => router.push('/admin/game-types/new')} className="gap-2">
          <Plus size={18} />
          Add Game Type
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-indigo-150 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="shadow-lg shadow-slate-100/50 rounded-xl overflow-hidden border border-slate-100 bg-white">
          <Table columns={columns} data={gameTypes} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      )}
    </div>
  );
}
