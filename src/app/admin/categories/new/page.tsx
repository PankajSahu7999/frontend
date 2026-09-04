'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Textarea, Button } from '../../../../components/admin/FormElements';
import { ArrowLeft, Save, Plus, Trash, ArrowUp, ArrowDown, CheckCircle2, AlertCircle } from 'lucide-react';

export default function NewCategoryPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    slug: ''
  });

  const [contentSections, setContentSections] = useState<any[]>([]);

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setFormData({
      ...formData,
      name,
      slug: generateSlug(name)
    });
  };

  const handleAddContentSection = () => {
    setContentSections([
      ...contentSections,
      { title: '', content: '', sort_order: contentSections.length }
    ]);
  };

  const handleRemoveContentSection = (index: number) => {
    setContentSections(contentSections.filter((_, i) => i !== index));
  };

  const handleMoveSection = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= contentSections.length) return;
    const updated = [...contentSections];
    const [moved] = updated.splice(index, 1);
    updated.splice(newIndex, 0, moved);
    setContentSections(updated.map((sec, idx) => ({ ...sec, sort_order: idx })));
  };

  const handleContentSectionChange = (index: number, field: string, value: any) => {
    const updated = [...contentSections];
    updated[index] = { ...updated[index], [field]: value };
    setContentSections(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setFeedback(null);

    const payload = {
      ...formData,
      content_sections: contentSections.map((sec, idx) => ({
        title: sec.title || '',
        content: sec.content || '',
        sort_order: idx
      }))
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setFeedback({ type: 'success', message: 'Category created successfully!' });
        setTimeout(() => {
          router.push('/admin/categories');
        }, 1200);
      } else {
        const errorData = await res.json().catch(() => ({}));
        setFeedback({ type: 'error', message: errorData.error || 'Failed to save category.' });
      }
    } catch (err) {
      console.error(err);
      setFeedback({ type: 'error', message: 'Error saving category' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <button 
        onClick={() => router.push('/admin/categories')} 
        className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-6 text-sm font-semibold uppercase tracking-wider"
      >
        <ArrowLeft size={16} />
        Back to Categories
      </button>

      {feedback && (
        <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 text-sm font-medium ${
          feedback.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {feedback.type === 'success' ? <CheckCircle2 size={20} className="text-emerald-600 shrink-0" /> : <AlertCircle size={20} className="text-red-600 shrink-0" />}
          <span>{feedback.message}</span>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-100 shadow-xl overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Create New Category</h1>
            <p className="text-sm text-slate-500 mt-1">Add category details and optional guide sections</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <Input 
            label="Category Name" 
            value={formData.name} 
            onChange={handleNameChange} 
            placeholder="e.g. Online Casino"
            required 
          />

          <Input 
            label="Category Slug (URL Path)" 
            value={formData.slug} 
            onChange={(e) => setFormData({...formData, slug: e.target.value})} 
            placeholder="online-casino"
            required
          />

          <div className="border-t border-slate-200 pt-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-800">Content Sections (Guide / FAQ)</h2>
                <p className="text-xs text-slate-500">These sections will appear below the casinos listing on the public category page.</p>
              </div>
              <Button type="button" onClick={handleAddContentSection} className="gap-2" variant="secondary">
                <Plus size={16} />
                Add Section
              </Button>
            </div>

            <div className="space-y-4">
              {contentSections.map((section, index) => (
                <div key={index} className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm transition-all hover:border-slate-300">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-600 bg-slate-200/80 px-2.5 py-1 rounded-md">
                      Section {index + 1}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        disabled={index === 0}
                        onClick={() => handleMoveSection(index, 'up')}
                        className="p-1.5 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded hover:bg-slate-200/60"
                        title="Move Up"
                      >
                        <ArrowUp size={16} />
                      </button>
                      <button
                        type="button"
                        disabled={index === contentSections.length - 1}
                        onClick={() => handleMoveSection(index, 'down')}
                        className="p-1.5 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded hover:bg-slate-200/60"
                        title="Move Down"
                      >
                        <ArrowDown size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveContentSection(index)}
                        className="p-1.5 text-red-500 hover:text-red-700 rounded hover:bg-red-50 ml-1"
                        title="Delete Section"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  </div>
                  <Input
                    label="Section Title"
                    value={section.title || ''}
                    onChange={(e) => handleContentSectionChange(index, 'title', e.target.value)}
                    placeholder="e.g. Why Are Online Casinos So Popular?"
                    required
                    className="mb-4"
                  />
                  <Textarea
                    label="Section Content"
                    value={section.content || ''}
                    onChange={(e) => handleContentSectionChange(index, 'content', e.target.value)}
                    placeholder="Write detailed guide content here..."
                    rows={6}
                    required
                  />
                </div>
              ))}
            </div>

            {contentSections.length === 0 && (
              <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                <p className="text-sm text-slate-500 font-medium">No content sections added yet.</p>
                <p className="text-xs text-slate-400 mt-1">Click "Add Section" to write guide content for this category page.</p>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t border-slate-100">
            <Button type="button" variant="secondary" onClick={() => router.push('/admin/categories')}>Cancel</Button>
            <Button type="submit" isLoading={isLoading} className="gap-2">
              <Save size={16} />
              Save Category
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
