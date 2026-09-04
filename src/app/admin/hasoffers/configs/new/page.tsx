'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Textarea, Select, Button } from '@/components/admin/FormElements';
import { ArrowLeft, Save, ExternalLink } from 'lucide-react';

export default function NewHasOffersConfigPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [casinos, setCasinos] = useState([]);
  const [formData, setFormData] = useState({
    casino_id: '',
    network_domain: '',
    offer_id: '',
    postback_url: '',
    status: 'active',
    notes: ''
  });

  useEffect(() => {
    fetchCasinos();
    // Set default postback URL
    const defaultUrl = `${window.location.origin}/api/hasoffers/postback`;
    setFormData(prev => ({ ...prev, postback_url: defaultUrl }));
  }, []);

  const fetchCasinos = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/casinos`);
      const data = await res.json();
      setCasinos(data);
    } catch (err) {
      console.error("Failed to fetch casinos", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/hasoffers/configs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        router.push('/admin/hasoffers/configs');
      } else {
        const error = await res.json();
        alert(error.error || 'Failed to create configuration');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to create configuration');
    }
    setIsLoading(false);
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
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">New HasOffers Configuration</h1>
        <p className="text-sm text-slate-500 mt-1.5 font-medium">
          Set up tracking for a casino with a HasOffers network
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
              <h3 className="text-sm font-semibold text-indigo-900 mb-2">Next Steps</h3>
              <ol className="text-xs text-indigo-700 space-y-1 list-decimal list-inside">
                <li>Save this configuration</li>
                <li>Copy the postback URL above</li>
                <li>Go to your HasOffers network dashboard</li>
                <li>Navigate to the offer settings</li>
                <li>Add the postback URL to the offer's postback configuration</li>
                <li>Enable macros: transaction_id, offer_id, aff_sub, payout, sale_amount</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.back()}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" isLoading={isLoading} className="gap-2">
            <Save size={18} />
            Create Configuration
          </Button>
        </div>
      </form>
    </div>
  );
}