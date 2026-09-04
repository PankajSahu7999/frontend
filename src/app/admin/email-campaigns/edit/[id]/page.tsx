'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  Input,
  Textarea,
  Select,
  Button
} from '../../../../../components/admin/FormElements';
import { ArrowLeft, Save } from 'lucide-react';

export default function EditEmailCampaignPage() {
  const router = useRouter();
  const params = useParams();

  const id = params.id as string;

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    subject: '',
    body: '',
    target: 'newsletter',
    status: 'draft'
  });

  useEffect(() => {
    if (id) {
      fetchCampaign();
    }
  }, [id]);

  const fetchCampaign = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/email-campaigns/${id}`
      );

      if (!res.ok) {
        throw new Error('Failed to fetch campaign');
      }

      const data = await res.json();

      setFormData({
        subject: data.subject || '',
        body: data.body || '',
        target: data.target || 'newsletter',
        status: data.status || 'draft'
      });
    } catch (err) {
      console.error('Failed to fetch campaign:', err);
      alert('Failed to load campaign');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id) {
      alert('Campaign ID is missing');
      return;
    }

    setIsSaving(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/email-campaigns/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      if (res.ok) {
        router.push('/admin/email-campaigns');
      } else {
        const error = await res.json();
        alert(error.message || 'Failed to update campaign');
      }
    } catch (err) {
      console.error(err);
      alert('Error updating campaign');
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
        onClick={() => router.push('/admin/email-campaigns')}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-6 text-sm font-semibold uppercase tracking-wider"
      >
        <ArrowLeft size={16} />
        Back to Campaigns
      </button>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-xl overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50">
          <h1 className="text-2xl font-bold text-slate-800">
            Edit Email Campaign
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Update this email campaign.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <Input
            label="Subject"
            value={formData.subject}
            onChange={(e) =>
              setFormData({
                ...formData,
                subject: e.target.value
              })
            }
            placeholder="Campaign subject line"
            required
          />

          <Textarea
            label="Email Body (HTML)"
            value={formData.body}
            onChange={(e) =>
              setFormData({
                ...formData,
                body: e.target.value
              })
            }
            placeholder="<h1>Hello!</h1><p>Check out our latest bonuses...</p>"
            rows={12}
            required
          />

          <Select
            label="Target Audience"
            options={[
              {
                value: 'newsletter',
                label: 'Newsletter Subscribers'
              },
              {
                value: 'all_users',
                label: 'All Users'
              }
            ]}
            value={formData.target}
            onChange={(e) =>
              setFormData({
                ...formData,
                target: e.target.value
              })
            }
          />

          <Select
            label="Status"
            options={[
              {
                value: 'draft',
                label: 'Draft'
              },
              {
                value: 'scheduling',
                label: 'Scheduling'
              },
              {
                value: 'sending',
                label: 'Sending'
              },
              {
                value: 'completed',
                label: 'Completed'
              }
            ]}
            value={formData.status}
            onChange={(e) =>
              setFormData({
                ...formData,
                status: e.target.value
              })
            }
          />

          <div className="flex justify-end gap-4 pt-6 border-t border-slate-100">
            <Button
              type="button"
              variant="secondary"
              onClick={() => router.push('/admin/email-campaigns')}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              isLoading={isSaving}
              className="gap-2"
            >
              <Save size={16} />
              Update Campaign
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}