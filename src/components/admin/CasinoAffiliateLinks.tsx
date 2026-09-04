'use client';

import { useState, useEffect } from 'react';
import { Input, Button, Select } from './FormElements';
import { Plus, Trash2, Globe } from 'lucide-react';

interface CasinoAffiliateLinksProps {
  casinoId: string;
}

export default function CasinoAffiliateLinks({ casinoId }: CasinoAffiliateLinksProps) {
  const [links, setLinks] = useState<any[]>([]);
  const [countries, setCountries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchCountries();
    if (casinoId) {
      fetchLinks();
    }
  }, [casinoId]);

  const fetchCountries = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/countries`);
      if (res.ok) {
        const data = await res.json();
        setCountries(data);
      }
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const fetchLinks = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/casino-affiliate-links/casino/${casinoId}`);
      if (res.ok) {
        const data = await res.json();
        setLinks(data);
      }
    } catch (error) {
      console.error('Error fetching affiliate links:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddLink = async () => {
    const newLink = {
      casino_id: casinoId,
      country_id: '',
      affiliate_url: ''
    };
    setLinks([...links, newLink]);
  };

  const handleUpdateLink = async (index: number, field: string, value: string) => {
    const updatedLinks = [...links];
    updatedLinks[index] = { ...updatedLinks[index], [field]: value };
    setLinks(updatedLinks);

    // If the link already has an ID, update it immediately
    if (updatedLinks[index].id && field === 'affiliate_url') {
      setIsSubmitting(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/casino-affiliate-links/${updatedLinks[index].id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ affiliate_url: value })
        });
        if (!res.ok) {
          console.error('Failed to update link');
        }
      } catch (error) {
        console.error('Error updating link:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleSaveLink = async (index: number) => {
    const link = links[index];
    if (!link.country_id || !link.affiliate_url) {
      alert('Please select a country and enter an affiliate URL');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/casino-affiliate-links`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          casino_id: casinoId,
          country_id: link.country_id,
          affiliate_url: link.affiliate_url
        })
      });

      if (res.ok) {
        const savedLink = await res.json();
        const updatedLinks = [...links];
        updatedLinks[index] = savedLink;
        setLinks(updatedLinks);
      } else {
        alert('Failed to save affiliate link');
      }
    } catch (error) {
      console.error('Error saving link:', error);
      alert('Error saving affiliate link');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteLink = async (id: string) => {
    if (!confirm('Are you sure you want to delete this affiliate link?')) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/casino-affiliate-links/${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        setLinks(links.filter(link => link.id !== id));
      }
    } catch (error) {
      console.error('Error deleting link:', error);
    }
  };

  if (loading) {
    return <div className="text-gray-500">Loading affiliate links...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Country-Specific Affiliate Links</h3>
        <Button type="button" onClick={handleAddLink} className="flex items-center gap-2">
          <Plus size={16} />
          Add Country Link
        </Button>
      </div>

      <div className="space-y-4">
        {links.length === 0 ? (
          <div className="text-center py-8 text-gray-500 border border-dashed border-gray-300 rounded-lg">
            No country-specific affiliate links yet. Add one to get started.
          </div>
        ) : (
          links.map((link, index) => (
            <div key={link.id || index} className="rounded-lg border border-gray-200 bg-white p-4">
              <div className="flex items-start gap-4">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                      Country
                    </label>
                    <Select
                      value={link.country_id || ''}
                      onChange={(e) => handleUpdateLink(index, 'country_id', e.target.value)}
                      options={countries.map(c => ({ value: c.id, label: c.name }))}
                      placeholder="Select country"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                      Affiliate URL
                    </label>
                    <Input
                      value={link.affiliate_url || ''}
                      onChange={(e) => handleUpdateLink(index, 'affiliate_url', e.target.value)}
                      placeholder="https://example.com/affiliate-link"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  {!link.id && (
                    <Button type="button" onClick={() => handleSaveLink(index)} disabled={isSubmitting} className="text-sm">
                      Save
                    </Button>
                  )}
                  {link.id && (
                    <button
                      type="button"
                      onClick={() => handleDeleteLink(link.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                      title="Delete link"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </div>

              {link.country && (
                <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                  <Globe size={14} />
                  <span>{link.country.name} ({link.country.code})</span>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> If a user's country doesn't have a specific affiliate link, the default affiliate link will be used.
        </p>
      </div>
    </div>
  );
}
