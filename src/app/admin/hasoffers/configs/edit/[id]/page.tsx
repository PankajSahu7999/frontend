'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Input, Textarea, Select, Button } from '@/components/admin/FormElements';
import { ArrowLeft, Save, ExternalLink, Trash2 } from 'lucide-react';
import { buildApiUrl } from '@/config/api.config';

export default function EditHasOffersConfigPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [casinos, setCasinos] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    casino_id: '',
    network_domain: '',
    offer_id: '',
    postback_url: '',
    status: 'active',
    notes: ''
  });

  useEffect(() => {
    if (id) {
      fetchConfig();
    }
    fetchCasinos();
  }, [id]);

  const fetchConfig = async () => {
    try {
      const res = await fetch(buildApiUrl(`/admin/hasoffers/configs/${id}`));
      if (res.ok) {
        const data = await res.json();
        setFormData(data);
      }
    } catch (err) {
      console.error("Failed to fetch config", err);
    }
    setIsLoading(false);
  };

  const fetchCasinos = async () => {
    try {
      const res = await fetch(buildApiUrl('/admin/casinos'));
      const data = await res.json();
      setCasinos(Array.isArray(data) ? data : data.casinos || []);
    } catch (err) {
      console.error("Failed to fetch casinos", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const res = await fetch(buildApiUrl(`/admin/hasoffers/configs/${id}`), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        router.push('/admin/hasoffers/configs');
      } else {
        const error = await res.json();
        alert(error.error || 'Failed to update configuration');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to update configuration');
    }
    setIsSaving(false);
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this configuration?')) return;

    try {
      const res = await fetch(buildApiUrl(`/admin/hasoffers/configs/${id}`), {
        method: 'DELETE'
      });

      if (res.ok) {
        router.push('/admin/hasoffers/configs');
      } else {
        alert('Failed to delete configuration');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to delete configuration');
    }
  };

  const casinoOptions = casinos.map((c: any) => ({
    value: c.id,
    label: c.name
  }));

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'paused', label: 'Paused' }
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-10 h-10 border-4 border-indigo-150 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4"
        >
          <ArrowLeft size={18} />
          Back to Configurations
        </button>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Edit HasOffers Configuration</h1>
        <p className="text-sm text-slate-500 mt-1.5 font-medium">
          Update tracking configuration for this casino
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-slate-100 p-8">
        <Select
          label="Casino"
          placeholder="Select a casino"
          options={casinoOptions}
          value={formData.casino_id}
          onChange={(e) => setFormData({ ...formData, casino_id: e.target.value })}
          required
        />

        <Input
          label="Network Domain"
          placeholder="e.g., your-network.go2cloud.org"
          value={formData.network_domain}
          onChange={(e) => setFormData({ ...formData, network_domain: e.target.value })}
          required
          helperText="The HasOffers network domain without https://"
        />

        <Input
          label="Offer ID"
          placeholder="e.g., 123"
          value={formData.offer_id}
          onChange={(e) => setFormData({ ...formData, offer_id: e.target.value })}
          required
          helperText="The offer ID from your HasOffers network"
        />

        <Input
          label="Postback URL"
          value={formData.postback_url}
          onChange={(e) => setFormData({ ...formData, postback_url: e.target.value })}
          required
          helperText="This URL will receive conversion notifications from the HasOffers network"
        />

        <Select
          label="Status"
          options={statusOptions}
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        />

        <Textarea
          label="Notes (Optional)"
          placeholder="Add any notes about this configuration..."
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          rows={3}
        />

        {/* Setup Instructions */}
        <div className="mt-6 p-4 bg-indigo-50 border border-indigo-100 rounded-xl">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
              <ExternalLink size={16} className="text-indigo-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-indigo-900 mb-2">Setup Reminder</h3>
              <p className="text-xs text-indigo-700">
                Ensure the postback URL above is configured in your HasOffers network dashboard with the following macros enabled: transaction_id, offer_id, aff_sub, payout, sale_amount
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-8">
          <Button
            type="button"
            variant="secondary"
            onClick={handleDelete}
            className="gap-2 text-rose-600 hover:text-rose-700"
          >
            <Trash2 size={18} />
            Delete
          </Button>
          <div className="flex gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={() => router.back()}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button type="submit" isLoading={isSaving} className="gap-2">
              <Save size={18} />
              Save Changes
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}