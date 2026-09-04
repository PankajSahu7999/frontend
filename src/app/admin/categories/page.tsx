'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Table, Column } from '../../../components/admin/Table';
import { Button } from '../../../components/admin/FormElements';
import { Plus, GripVertical } from 'lucide-react';
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

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/categories`);
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
    setIsLoading(false);
  };

  const handleEdit = (category: any) => {
    router.push(`/admin/categories/edit/${category.id}`);
  };

  const handleDelete = async (category: any) => {
    if (confirm(`Are you sure you want to delete this category?`)) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/categories/${category.id}`, {
          method: 'DELETE'
        });
        if (res.ok) {
          fetchCategories();
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setCategories((items: any) => {
        const oldIndex = items.findIndex((item: any) => item.id === active.id);
        const newIndex = items.findIndex((item: any) => item.id === over?.id);
        const reordered = arrayMove(items, oldIndex, newIndex);
        
        // Update sort_order for all categories
        const rankings = reordered.map((category: any, index: number) => ({
          id: category.id,
          sort_order: index
        }));
        
        // Send to backend
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/categories/ranking/bulk`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ rankings })
        }).catch(err => console.error('Failed to update rankings:', err));
        
        return reordered;
      });
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
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Casino Types (Categories)</h1>
          <p className="text-sm text-slate-500 mt-1.5 font-medium">Manage casino types and categories. Drag to reorder.</p>
        </div>
        <Button onClick={() => router.push('/admin/categories/new')} className="gap-2">
          <Plus size={18} />
          Add Category
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-indigo-150 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="shadow-lg shadow-slate-100/50 rounded-xl overflow-hidden border border-slate-100 bg-white">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={categories.map((c: any) => c.id)} strategy={verticalListSortingStrategy}>
              <Table columns={columns} data={categories} onEdit={handleEdit} onDelete={handleDelete} />
            </SortableContext>
          </DndContext>
        </div>
      )}
    </div>
  );
}
