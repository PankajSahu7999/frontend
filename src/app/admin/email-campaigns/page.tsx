"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Send, Loader2, Target, Type, Mail, Sparkles, Plus } from 'lucide-react';
import { Table, Column } from '../../../components/admin/Table';
import { Button } from '../../../components/admin/FormElements';

export default function EmailCampaignsPage() {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState([]);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [target, setTarget] = useState('newsletter');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    setIsFetching(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/email-campaigns`);
      const data = await res.json();
      setCampaigns(data);
    } catch (err) {
      console.error("Failed to fetch campaigns", err);
    }
    setIsFetching(false);
  };

  const handleEdit = (campaign: any) => {
    router.push(`/admin/email-campaigns/edit/${campaign.id}`);
  };

  const handleDelete = async (campaign: any) => {
    if (confirm(`Are you sure you want to delete "${campaign.subject}"?`)) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/email-campaigns/${campaign.id}`, {
          method: 'DELETE'
        });
        if (res.ok) {
          fetchCampaigns();
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const columns: Column[] = [
    { 
      header: 'Subject', 
      accessor: 'subject',
      render: (val) => (
        <span className="font-semibold text-slate-800">{val}</span>
      )
    },
    { 
      header: 'Target', 
      accessor: 'target',
      render: (val) => val === 'newsletter' ? 'Newsletter' : 'All Users'
    },
    { 
      header: 'Status', 
      accessor: 'status', 
      render: (val) => (
        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
          val === 'completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 
          val === 'sending' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
          val === 'scheduling' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
          'bg-slate-50 text-slate-600 border border-slate-200'
        }`}>
          {val}
        </span>
      )
    },
    { 
      header: 'Sent Count', 
      accessor: 'sent_count'
    },
    { 
      header: 'Date', 
      accessor: 'created_at',
      render: (val) => new Date(val).toLocaleDateString()
    }
  ];

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/email-campaigns/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, body, target }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ type: 'success', text: 'Campaign scheduled successfully!' });
        setSubject('');
        setBody('');
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to schedule campaign' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Make sure the backend is running.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full px-6 mx-auto pb-16">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-5">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Email Campaigns</h1>
          <p className="text-sm text-slate-500 mt-0.5">Draft responsive marketing distributions and manage broadcast queues.</p>
        </div>

        {/* Global Primary Control Bar */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button onClick={() => router.push('/admin/email-campaigns/new')} className="gap-2">
            <Plus size={18} />
            New Campaign
          </Button>
        </div>
      </div>

      {/* Campaigns List */}
      {isFetching ? (
        <div className="flex justify-center py-20 mb-8">
          <div className="w-10 h-10 border-4 border-indigo-150 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
      ) : campaigns.length > 0 && (
        <div className="shadow-lg shadow-slate-100/50 rounded-xl overflow-hidden border border-slate-100 bg-white mb-8">
          <Table columns={columns} data={campaigns} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      )}

      {/* Global Message Banner */}
      {message && (
        <div className={`mb-6 p-4 rounded-xl text-sm font-medium border shadow-sm transition-all ${
          message.type === 'success' 
            ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
            : 'bg-rose-50 text-rose-800 border-rose-200'
        }`}>
          {message.text}
        </div>
      )}

     
    </div>
  );
}