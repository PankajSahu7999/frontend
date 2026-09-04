'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Textarea, Select, Button } from '../../../../components/admin/FormElements';
import { ArrowLeft, Send } from 'lucide-react';

export default function NewEmailCampaignPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    subject: '',
    body: '',
    target: 'newsletter',
    status: 'draft'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/email-campaigns/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        router.push('/admin/email-campaigns');
      } else {
        alert('Failed to create campaign');
      }
    } catch (err) {
      console.error(err);
      alert('Error creating campaign');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <button 
        onClick={() => router.push('/admin/email-campaigns')} 
        className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-6 text-sm font-semibold uppercase tracking-wider"
      >
        <ArrowLeft size={16} />
        Back to Campaigns
      </button>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-xl overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50">
          <h1 className="text-2xl font-bold text-slate-800">Create New Email Campaign</h1>
          <p className="text-sm text-slate-500 mt-1">Draft and schedule a new email campaign.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <Input 
            label="Subject" 
            value={formData.subject} 
            onChange={(e) => setFormData({...formData, subject: e.target.value})} 
            placeholder="Campaign subject line"
            required 
          />

          <Textarea 
            label="Email Body (HTML)" 
            value={formData.body} 
            onChange={(e) => setFormData({...formData, body: e.target.value})} 
            placeholder="<h1>Hello!</h1><p>Check out our latest bonuses...</p>"
            rows={12}
            required
          />

          <Select 
            label="Target Audience" 
            options={[
              {value: 'newsletter', label: 'Newsletter Subscribers'},
              {value: 'all_users', label: 'All Users'}
            ]}
            value={formData.target}
            onChange={(e) => setFormData({...formData, target: e.target.value})}
          />

          <div className="flex justify-end gap-4 pt-6 border-t border-slate-100">
            <Button type="button" variant="secondary" onClick={() => router.push('/admin/email-campaigns')}>Cancel</Button>
            <Button type="submit" isLoading={isLoading} className="gap-2">
              <Send size={16} />
              Create & Send Campaign
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
