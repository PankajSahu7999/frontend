'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Textarea, Toggle, Button } from '../../../../../components/admin/FormElements';
import { ArrowLeft, Save } from 'lucide-react';

export default function EditFaqPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [id, setId] = useState<string>('');

  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: 'General',
    sort_order: '0',
    status: true
  });

  useEffect(() => {
    const init = async () => {
      const resolvedParams = await params;
      setId(resolvedParams.id);
      fetchFaq(resolvedParams.id);
    };
    init();
  }, [params]);

  const fetchFaq = async (faqId: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/faqs/${faqId}`);
      const data = await res.json();
      setFormData(data);
    } catch (err) {
      console.error("Failed to fetch FAQ", err);
    }
    setIsLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/faqs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        router.push('/admin/faqs');
      } else {
        alert('Failed to update FAQ');
      }
    } catch (err) {
      console.error(err);
      alert('Error updating FAQ');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-10 h-10 border-4 border-indigo-150 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <button 
        onClick={() => router.push('/admin/faqs')} 
        className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-6 text-sm font-semibold uppercase tracking-wider"
      >
        <ArrowLeft size={16} />
        Back to FAQs
      </button>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-xl overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50">
          <h1 className="text-2xl font-bold text-slate-800">Edit FAQ</h1>
          <p className="text-sm text-slate-500 mt-1">Update this frequently asked question.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <Input 
            label="Question" 
            value={formData.question} 
            onChange={(e) => setFormData({...formData, question: e.target.value})} 
            placeholder="What is the minimum deposit?"
            required 
          />

          <Textarea 
            label="Answer" 
            value={formData.answer} 
            onChange={(e) => setFormData({...formData, answer: e.target.value})} 
            placeholder="The minimum deposit is $10."
            rows={4}
            required
          />

          <Input 
            label="Category" 
            value={formData.category} 
            onChange={(e) => setFormData({...formData, category: e.target.value})} 
            placeholder="General"
          />

          <Input 
            label="Sort Order" 
            type="number"
            value={formData.sort_order} 
            onChange={(e) => setFormData({...formData, sort_order: e.target.value})} 
            placeholder="0"
          />

          <Toggle 
            label="Active" 
            checked={formData.status} 
            onChange={(e) => setFormData({...formData, status: e.target.checked})} 
          />

          <div className="flex justify-end gap-4 pt-6 border-t border-slate-100">
            <Button type="button" variant="secondary" onClick={() => router.push('/admin/faqs')}>Cancel</Button>
            <Button type="submit" isLoading={isSaving} className="gap-2">
              <Save size={16} />
              Update FAQ
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
