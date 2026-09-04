'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Table, Column } from '../../../components/admin/Table';
import { Button } from '../../../components/admin/FormElements';
import { Plus, Download, Upload, FileSpreadsheet, AlertCircle, GripVertical, ArrowUp, ArrowDown } from 'lucide-react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function DragHandle({ id }: any) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing text-slate-400 hover:text-slate-600 inline-flex">
      <GripVertical size={18} />
    </div>
  );
}

export default function CasinosPage() {
  const [casinos, setCasinos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isImporting, setIsImporting] = useState(false);
  const [importResult, setImportResult] = useState<{ success: number; failed: number; errors: string[] } | null>(null);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    fetchCasinos();
  }, []);

  const fetchCasinos = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/casinos`);
      const data = await res.json();
      setCasinos(data);
    } catch (err) {
      console.error("Failed to fetch casinos", err);
    }
    setIsLoading(false);
  };

  const handleExport = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/casinos/export/excel`);
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'casinos_export.xlsx';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (err) {
      console.error('Failed to export casinos:', err);
      alert('Failed to export casinos');
    }
  };

  const handleDownloadTemplate = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/casinos/export/template`);
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'casinos_template.xlsx';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (err) {
      console.error('Failed to download template:', err);
      alert('Failed to download template');
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    setImportResult(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/casinos/import/excel`, {
        method: 'POST',
        body: formData,
      });
      const result = await res.json();
      setImportResult(result);
      if (result.success > 0) {
        fetchCasinos();
      }
    } catch (err) {
      console.error('Failed to import casinos:', err);
      alert('Failed to import casinos');
    } finally {
      setIsImporting(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleEdit = (casino: any) => {
    router.push(`/admin/casinos/edit/${casino.id}`);
  };

  const handleDelete = async (casino: any) => {
    if (confirm(`Are you sure you want to delete ${casino.name}?`)) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/casinos/${casino.id}`, {
          method: 'DELETE'
        });
        if (res.ok) {
          fetchCasinos();
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setCasinos((items: any) => {
        const oldIndex = items.findIndex((item: any) => item.id === active.id);
        const newIndex = items.findIndex((item: any) => item.id === over?.id);
        const reordered = arrayMove(items, oldIndex, newIndex);
        
        // Update ranking_order for all casinos
        const rankings = reordered.map((casino: any, index: number) => ({
          id: casino.id,
          ranking_order: index
        }));
        
        // Send to backend
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/casinos/ranking/bulk`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ rankings })
        }).catch(err => console.error('Failed to update rankings:', err));
        
        return reordered;
      });
    }
  };

  const handlePositionChange = async (casinoId: string, position: 'top' | 'bottom') => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/casinos/${casinoId}/position`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ position })
      });
      if (res.ok) {
        fetchCasinos();
      }
    } catch (err) {
      console.error('Failed to update position:', err);
    }
  };

  const columns: Column[] = [
    { 
      header: '', 
      accessor: 'id',
      render: (val, row) => (
        <DragHandle id={row.id} />
      )
    },
    { 
      header: 'Casino Logo & Name', 
      accessor: 'name', 
      render: (val, row) => (
        <div className="flex items-center gap-3">
          {row.logo ? (
            <img src={row.logo} alt={val} className="w-10 h-10 rounded-xl object-cover border border-slate-100 shadow-sm" />
          ) : (
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm">
              {val ? val.charAt(0) : '?'}
            </div>
          )}
          <div>
            <span className="font-semibold text-slate-800 block text-base">{val}</span>
            <span className="text-xs text-slate-400 font-medium">{row.company_name || 'Independent'}</span>
          </div>
        </div>
      ) 
    },
    { header: 'Slug', accessor: 'slug' },
    { 
      header: 'Rating & Trust Score', 
      accessor: 'rating',
      render: (val, row) => (
        <div>
          <span className="font-semibold text-slate-700">{val ? `${val} / 5.0` : 'No rating'}</span>
          {row.trust_score && <span className="text-xs text-slate-400 block">Trust: {row.trust_score}%</span>}
        </div>
      )
    },
    { header: 'License Authority', accessor: 'license_authority' },
    { 
      header: 'Status', 
      accessor: 'status', 
      render: (val) => (
        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${val === 'active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-50 text-slate-600 border border-slate-200'}`}>
          {val}
        </span>
      ) 
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Casinos Directory</h1>
          <p className="text-sm text-slate-500 mt-1.5 font-medium">Manage your casino directory, detailed reviews, ratings, and affiliate links.</p>
        </div>
        <div className="flex gap-3">
          <Button
  onClick={handleDownloadTemplate}
  className="gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700"
>
  <FileSpreadsheet size={18} className="text-slate-700" />
  <span className="text-slate-700">Download Template</span>
</Button>
          <Button onClick={handleExport} className="gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700">
            <Download size={18}  className="text-slate-700" />
           <span  className="text-slate-700"> Export </span>
          </Button>
          <Button onClick={handleImportClick} className="gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700" disabled={isImporting}>
            <Upload size={18}  className="text-slate-700" />
           <span  className="text-slate-700">  {isImporting ? 'Importing...' : 'Import'} </span> 
          </Button>
          <Button onClick={() => router.push('/admin/casinos/new')} className="gap-2">
            <Plus size={18} />
            Add Casino
          </Button>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFileSelect}
        className="hidden"
      />

      {importResult && (
        <div className={`mb-6 p-4 rounded-lg border ${
          importResult.failed === 0 
            ? 'bg-emerald-50 border-emerald-200' 
            : 'bg-amber-50 border-amber-200'
        }`}>
          <div className="flex items-start gap-3">
            <AlertCircle className={`w-5 h-5 mt-0.5 ${
              importResult.failed === 0 ? 'text-emerald-600' : 'text-amber-600'
            }`} />
            <div className="flex-1">
              <p className={`font-semibold ${
                importResult.failed === 0 ? 'text-emerald-800' : 'text-amber-800'
              }`}>
                Import Complete
              </p>
              <p className="text-sm text-slate-600 mt-1">
                Successfully imported: {importResult.success} casinos
                {importResult.failed > 0 && ` | Failed: ${importResult.failed}`}
              </p>
              {importResult.errors.length > 0 && (
                <details className="mt-2">
                  <summary className="text-sm text-slate-500 cursor-pointer hover:text-slate-700">
                    View errors
                  </summary>
                  <ul className="mt-2 text-sm text-slate-600 list-disc list-inside">
                    {importResult.errors.map((error, idx) => (
                      <li key={idx}>{error}</li>
                    ))}
                  </ul>
                </details>
              )}
            </div>
            <button
              onClick={() => setImportResult(null)}
              className="text-slate-400 hover:text-slate-600"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-indigo-150 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="shadow-lg shadow-slate-100/50 rounded-xl overflow-hidden border border-slate-100 bg-white">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={casinos.map((c: any) => c.id)} strategy={verticalListSortingStrategy}>
              <Table columns={columns} data={casinos} onEdit={handleEdit} onDelete={handleDelete} />
            </SortableContext>
          </DndContext>
        </div>
      )}
    </div>
  );
}
