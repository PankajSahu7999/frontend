'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Table, Column } from '@/components/admin/Table';
import { Button } from '@/components/admin/FormElements';
import { Plus, ExternalLink, Copy, Check } from 'lucide-react';

export default function HasOffersConfigsPage() {
  const [configs, setConfigs] = useState<any[]>([]);
  const [casinos, setCasinos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [configsRes, casinosRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/hasoffers/configs`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/casinos`)
      ]);

      if (configsRes.ok && casinosRes.ok) {
        const configsData = await configsRes.json();
        const casinosData = await casinosRes.json();
        setConfigs(configsData);
        setCasinos(casinosData);
      }
    } catch (err) {
      console.error("Failed to fetch data", err);
    }
    setIsLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this configuration?')) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/hasoffers/configs/${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        fetchData();
      } else {
        alert('Failed to delete configuration');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to delete configuration');
    }
  };

  const copyToClipboard = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(id);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const columns: Column[] = [
    {
      header: 'Casino',
      accessor: 'casino_id',
      render: (val) => {
        const casino = casinos.find((c: any) => c.id === val);
        return casino ? casino.name : 'Unknown';
      }
    },
    {
      header: 'Network Domain',
      accessor: 'network_domain',
      render: (val) => (
        <span className="font-mono text-sm text-slate-600">{val}</span>
      )
    },
    {
      header: 'Offer ID',
      accessor: 'offer_id',
      render: (val) => (
        <span className="bg-slate-100 px-2 py-1 rounded text-sm font-mono">{val}</span>
      )
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (val) => (
        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
          val === 'active' 
            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
            : val === 'paused'
            ? 'bg-amber-50 text-amber-700 border border-amber-200'
            : 'bg-slate-50 text-slate-600 border border-slate-200'
        }`}>
          {val}
        </span>
      )
    },
    {
      header: 'Postback URL',
      accessor: 'postback_url',
      render: (val, row) => (
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-slate-500 max-w-[200px] truncate">{val}</span>
          <button
            onClick={() => copyToClipboard(val, row.id)}
            className="text-slate-400 hover:text-slate-600"
            title="Copy URL"
          >
            {copiedUrl === row.id ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
          </button>
        </div>
      )
    }
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-10 h-10 border-4 border-indigo-150 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">HasOffers Configurations</h1>
          <p className="text-sm text-slate-500 mt-1.5 font-medium">
            Manage affiliate tracking configurations for your casinos
          </p>
        </div>
        <Button onClick={() => router.push('/admin/hasoffers/configs/new')} className="gap-2">
          <Plus size={18} />
          Add Configuration
        </Button>
      </div>

      {configs.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-slate-100">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <ExternalLink size={32} className="text-slate-300" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No Configurations Yet</h3>
          <p className="text-slate-500 mb-6">
            Set up your first HasOffers tracking configuration to start monitoring affiliate conversions.
          </p>
          <Button onClick={() => router.push('/admin/hasoffers/configs/new')} className="gap-2">
            <Plus size={18} />
            Add Configuration
          </Button>
        </div>
      ) : (
        <div className="shadow-lg shadow-slate-100/50 rounded-xl overflow-hidden border border-slate-100 bg-white">
          <Table 
            columns={columns} 
            data={configs} 
            onEdit={(row) => router.push(`/admin/hasoffers/configs/edit/${row.id}`)}
            onDelete={handleDelete}
            showActions={true}
          />
        </div>
      )}
    </div>
  );
}