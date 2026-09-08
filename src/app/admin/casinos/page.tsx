'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../../../components/admin/FormElements';
import {
  Plus,
  Download,
  Upload,
  FileSpreadsheet,
  AlertCircle,
  GripVertical,
  Edit,
  Trash2,
  Eye,
  Search,
  CheckCircle2,
  Loader2,
} from 'lucide-react';
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
import { formatRating } from '@/components/ui/StarRating';

interface RankInputProps {
  initialRank: number;
  total: number;
  onCommit: (newRank: number) => void;
}

function RankInput({ initialRank, total, onCommit }: RankInputProps) {
  const [val, setVal] = useState(String(initialRank));

  useEffect(() => {
    setVal(String(initialRank));
  }, [initialRank]);

  const commit = () => {
    const parsed = parseInt(val, 10);
    if (!isNaN(parsed) && parsed !== initialRank) {
      onCommit(parsed);
    } else {
      setVal(String(initialRank));
    }
  };

  return (
    <input
      type="number"
      min={1}
      max={total}
      value={val}
      onChange={(e) => setVal(e.target.value)}
      onBlur={commit}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.currentTarget.blur();
        } else if (e.key === 'Escape') {
          setVal(String(initialRank));
          e.currentTarget.blur();
        }
      }}
      title={`Rank #${initialRank}. Enter a number (1-${total}) and press Enter to change position.`}
      className="w-14 h-8 text-center font-bold text-slate-800 bg-white border border-slate-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none text-xs transition-all shadow-xs hover:border-slate-300"
    />
  );
}

interface SortableCasinoRowProps {
  casino: any;
  rank: number;
  totalCasinos: number;
  onRankCommit: (casinoId: string, currentRank: number, targetRank: number) => void;
  onStatusToggle: (casino: any) => void;
  onEdit: (casino: any) => void;
  onDelete: (casino: any) => void;
  isUpdatingStatus: boolean;
}

function SortableCasinoRow({
  casino,
  rank,
  totalCasinos,
  onRankCommit,
  onStatusToggle,
  onEdit,
  onDelete,
  isUpdatingStatus,
}: SortableCasinoRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: casino.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : undefined,
    position: isDragging ? ('relative' as const) : undefined,
    opacity: isDragging ? 0.6 : 1,
  };

  const isActive = casino.status === 'active';

  return (
    <tr
      ref={setNodeRef}
      style={style}
      className={`hover:bg-slate-50/70 transition-colors group ${
        isDragging ? 'bg-indigo-50/50 shadow-md' : ''
      }`}
    >
      {/* 1. Rank & Drag Handle */}
      <td className="px-4 py-3.5 whitespace-nowrap">
        <div className="flex items-center gap-2">
          {/* Drag Handle */}
          <div
            {...attributes}
            {...listeners}
            title="Click & drag to reorder"
            className="cursor-grab active:cursor-grabbing text-slate-300 hover:text-indigo-600 transition-colors p-1 rounded hover:bg-slate-100"
          >
            <GripVertical size={16} />
          </div>

          {/* Number Input for direct rank jump */}
          <RankInput
            initialRank={rank}
            total={totalCasinos}
            onCommit={(newRank) => onRankCommit(casino.id, rank, newRank)}
          />
        </div>
      </td>

      {/* 2. Casino Logo & Name */}
      <td className="px-6 py-3.5 whitespace-nowrap">
        <div className="flex items-center gap-3">
          {casino.logo ? (
            <img
              src={casino.logo}
              alt={casino.name}
              className="w-10 h-10 rounded-xl object-contain bg-white p-1 border border-slate-100 shadow-xs"
            />
          ) : (
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm">
              {casino.name ? casino.name.charAt(0) : '?'}
            </div>
          )}
          <div className="min-w-0 max-w-[220px]">
            <span
              className="font-semibold text-slate-800 block text-sm truncate"
              title={casino.name}
            >
              {casino.name}
            </span>
            <span className="text-xs text-slate-400 font-medium truncate block">
              {casino.company_name || 'Independent'}
            </span>
          </div>
        </div>
      </td>

      {/* 3. Slug */}
      <td className="px-6 py-3.5 text-sm text-slate-600 whitespace-nowrap">
        <span className="font-mono text-xs bg-slate-50 px-2 py-1 rounded border border-slate-200">
          {casino.slug}
        </span>
      </td>

      {/* 4. Rating & Trust Score */}
      <td className="px-6 py-3.5 whitespace-nowrap">
        <div>
          <div className="flex items-center gap-1 font-semibold text-slate-700 text-sm">
            <span className="text-amber-500">★</span>
            <span>{casino.rating ? formatRating(casino.rating) : 'No rating'}</span>
          </div>
          {casino.trust_score && (
            <span className="text-xs text-slate-400 block mt-0.5">
              Trust: {casino.trust_score}%
            </span>
          )}
        </div>
      </td>

      {/* 5. Status Chip (Click to change status) */}
      <td className="px-6 py-3.5 whitespace-nowrap">
        <button
          type="button"
          disabled={isUpdatingStatus}
          onClick={() => onStatusToggle(casino)}
          title={`Status is ${casino.status || 'inactive'}. Click to toggle to ${
            isActive ? 'inactive' : 'active'
          }.`}
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all cursor-pointer shadow-xs select-none ${
            isActive
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300'
              : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200 hover:border-slate-300'
          }`}
        >
          {isUpdatingStatus ? (
            <Loader2 size={12} className="animate-spin text-slate-500" />
          ) : (
            <span
              className={`w-2 h-2 rounded-full ${
                isActive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'
              }`}
            />
          )}
          <span className="capitalize">{casino.status || 'inactive'}</span>
        </button>
      </td>

      {/* 6. Actions */}
      <td className="px-6 py-3.5 text-right whitespace-nowrap">
        <div className="flex items-center justify-end gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
          <a
            href={`/casino/${casino.slug}`}
            target="_blank"
            rel="noreferrer"
            title="View Live Review"
            className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
          >
            <Eye size={16} />
          </a>
          <button
            onClick={() => onEdit(casino)}
            title="Edit Casino"
            className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => onDelete(casino)}
            title="Delete Casino"
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}
export default function CasinosPage() {
  const [casinos, setCasinos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isImporting, setIsImporting] = useState(false);
  const [importResult, setImportResult] = useState<{
    success: number;
    failed: number;
    errors: string[];
  } | null>(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [updatingStatusId, setUpdatingStatusId] = useState<string | null>(null);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
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
      setCasinos(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch casinos', err);
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
          method: 'DELETE',
        });
        if (res.ok) {
          fetchCasinos();
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  /**
   * Positional rank shifting:
   * When user changes number, casino jumps to target rank,
   * previous one slips down 1 rank, and all below it also slip 1 rank.
   */
  const handleRankCommit = async (casinoId: string, currentRank: number, targetRank: number) => {
    if (isNaN(targetRank) || targetRank < 1) return;
    const clampedTarget = Math.max(1, Math.min(targetRank, casinos.length));
    if (clampedTarget === currentRank) return;

    const oldIndex = casinos.findIndex((c) => c.id === casinoId);
    if (oldIndex === -1) return;
    const newIndex = clampedTarget - 1;

    const reordered = arrayMove(casinos, oldIndex, newIndex);
    setCasinos(reordered);
    setSaveMessage('Saving rankings...');

    const rankings = reordered.map((c: any, index: number) => ({
      id: c.id,
      ranking_order: index + 1,
    }));

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/casinos/ranking/bulk`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rankings }),
      });
      if (res.ok) {
        setSaveMessage('Rankings updated successfully!');
        setTimeout(() => setSaveMessage(null), 3000);
      } else {
        throw new Error('Failed to update rankings');
      }
    } catch (err) {
      console.error('Failed to update rankings:', err);
      setSaveMessage('Failed to save rankings.');
      fetchCasinos();
    }
  };

  /**
   * Drag-and-drop end handler
   */
  const handleDragEnd = async (event: any) => {
    const { active, over } = event;

    if (active && over && active.id !== over.id) {
      const oldIndex = casinos.findIndex((item: any) => item.id === active.id);
      const newIndex = casinos.findIndex((item: any) => item.id === over.id);
      if (oldIndex === -1 || newIndex === -1) return;

      const reordered = arrayMove(casinos, oldIndex, newIndex);
      setCasinos(reordered);
      setSaveMessage('Saving rankings...');

      const rankings = reordered.map((casino: any, index: number) => ({
        id: casino.id,
        ranking_order: index + 1,
      }));

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/casinos/ranking/bulk`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ rankings }),
        });
        if (res.ok) {
          setSaveMessage('Rankings updated successfully!');
          setTimeout(() => setSaveMessage(null), 3000);
        }
      } catch (err) {
        console.error('Failed to update rankings:', err);
        setSaveMessage('Failed to save rankings.');
        fetchCasinos();
      }
    }
  };

  /**
   * Toggle status through chips (active <-> inactive)
   */
  const handleToggleStatus = async (casino: any) => {
    const newStatus = casino.status === 'active' ? 'inactive' : 'active';
    setUpdatingStatusId(casino.id);

    // Optimistic UI update
    setCasinos((prev) =>
      prev.map((c) => (c.id === casino.id ? { ...c, status: newStatus } : c))
    );

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/casinos/${casino.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        throw new Error('Failed to update status');
      }
    } catch (err) {
      console.error('Failed to update casino status:', err);
      alert('Failed to update status. Reverting...');
      // Revert change
      setCasinos((prev) =>
        prev.map((c) => (c.id === casino.id ? { ...c, status: casino.status } : c))
      );
    } finally {
      setUpdatingStatusId(null);
    }
  };

  // Filtered list for search
  const filteredCasinos = searchFilter.trim()
    ? casinos.filter((c) => {
        const q = searchFilter.toLowerCase();
        return (
          (c.name && c.name.toLowerCase().includes(q)) ||
          (c.slug && c.slug.toLowerCase().includes(q))
        );
      })
    : casinos;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Casinos Directory
          </h1>
          <p className="text-sm text-slate-500 mt-1.5 font-medium">
            Manage your casino rankings, directory, live statuses, and affiliate reviews.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            onClick={handleDownloadTemplate}
            className="gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700"
          >
            <FileSpreadsheet size={18} className="text-slate-700" />
            <span className="text-slate-700">Download Template</span>
          </Button>
          <Button
            onClick={handleExport}
            className="gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700"
          >
            <Download size={18} className="text-slate-700" />
            <span className="text-slate-700">Export</span>
          </Button>
          <Button
            onClick={handleImportClick}
            className="gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700"
            disabled={isImporting}
          >
            <Upload size={18} className="text-slate-700" />
            <span className="text-slate-700">
              {isImporting ? 'Importing...' : 'Import'}
            </span>
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

      {/* Import Notification */}
      {importResult && (
        <div
          className={`mb-6 p-4 rounded-lg border ${
            importResult.failed === 0
              ? 'bg-emerald-50 border-emerald-200'
              : 'bg-amber-50 border-amber-200'
          }`}
        >
          <div className="flex items-start gap-3">
            <AlertCircle
              className={`w-5 h-5 mt-0.5 ${
                importResult.failed === 0 ? 'text-emerald-600' : 'text-amber-600'
              }`}
            />
            <div className="flex-1">
              <p
                className={`font-semibold ${
                  importResult.failed === 0 ? 'text-emerald-800' : 'text-amber-800'
                }`}
              >
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

      {/* Filter and Save Feedback Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search casinos by name or slug..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all shadow-xs"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          {saveMessage && (
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg animate-fadeIn">
              <CheckCircle2 size={14} className="text-emerald-600" />
              <span>{saveMessage}</span>
            </div>
          )}

          <div className="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg">
            Total: <span className="font-bold text-slate-700">{casinos.length}</span> Casinos
            {searchFilter && (
              <span>
                {' '}
                (Showing <span className="font-bold text-indigo-600">{filteredCasinos.length}</span>)
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Sortable Table View */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin" />
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-4 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider w-28">
                      # Rank
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Casino Logo & Name
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Slug
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Rating & Trust
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">
                      Actions
                    </th>
                  </tr>
                </thead>

                <SortableContext
                  items={filteredCasinos.map((c: any) => c.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <tbody className="divide-y divide-slate-100">
                    {filteredCasinos.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                          No casinos found matching &ldquo;{searchFilter}&rdquo;
                        </td>
                      </tr>
                    ) : (
                      filteredCasinos.map((casino) => {
                        // Master rank in original full list
                        const masterRank =
                          casinos.findIndex((c) => c.id === casino.id) + 1;

                        return (
                          <SortableCasinoRow
                            key={casino.id}
                            casino={casino}
                            rank={masterRank}
                            totalCasinos={casinos.length}
                            onRankCommit={handleRankCommit}
                            onStatusToggle={handleToggleStatus}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            isUpdatingStatus={updatingStatusId === casino.id}
                          />
                        );
                      })
                    )}
                  </tbody>
                </SortableContext>
              </table>
            </div>
          </DndContext>
        </div>
      )}
    </div>
  );
}
