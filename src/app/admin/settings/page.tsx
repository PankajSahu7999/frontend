'use client';
import React, { useState, useEffect } from 'react';
import { Input, Toggle, Button } from '../../../components/admin/FormElements';
import MediaUpload from '../../../components/admin/MediaUpload';
import { Save } from 'lucide-react';

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    site_name: '',
    site_logo: '',
    favicon: '',
    contact_email: '',
    footer_text: '',
    facebook_url: '',
    twitter_url: '',
    instagram_url: '',
    maintenance_mode: false
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/settings`);
      const data = await res.json();
      setFormData(data);
    } catch (err) {
      console.error("Failed to fetch settings", err);
    }
    setIsLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        alert('Settings saved successfully!');
      } else {
        alert('Failed to save settings');
      }
    } catch (err) {
      console.error(err);
      alert('Error saving settings');
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
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Site Settings</h1>
        <p className="text-sm text-slate-500 mt-1.5 font-medium">Configure your site-wide settings and preferences.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-xl overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50">
          <h2 className="text-xl font-bold text-slate-800">General Settings</h2>
          <p className="text-sm text-slate-500 mt-1">Basic site configuration</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <Input 
            label="Site Name" 
            value={formData.site_name} 
            onChange={(e) => setFormData({...formData, site_name: e.target.value})} 
            placeholder="CasinoLab"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Site Logo</label>
              <MediaUpload
                value={formData.site_logo}
                onChange={(value) => setFormData({...formData, site_logo: value})}
                accept="image"
                folder="settings"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Favicon</label>
              <MediaUpload
                value={formData.favicon}
                onChange={(value) => setFormData({...formData, favicon: value})}
                accept="image"
                folder="settings"
              />
            </div>
          </div>

          <Input 
            label="Contact Email" 
            value={formData.contact_email} 
            onChange={(e) => setFormData({...formData, contact_email: e.target.value})} 
            placeholder="contact@example.com"
          />

          <Input 
            label="Footer Text" 
            value={formData.footer_text} 
            onChange={(e) => setFormData({...formData, footer_text: e.target.value})} 
            placeholder="© 2024 CasinoLab. All rights reserved."
          />

          <div className="pt-6 border-t border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Social Media Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Input 
                label="Facebook URL" 
                value={formData.facebook_url} 
                onChange={(e) => setFormData({...formData, facebook_url: e.target.value})} 
                placeholder="https://facebook.com/casinolab"
              />
              <Input 
                label="Twitter URL" 
                value={formData.twitter_url} 
                onChange={(e) => setFormData({...formData, twitter_url: e.target.value})} 
                placeholder="https://twitter.com/casinolab"
              />
              <Input 
                label="Instagram URL" 
                value={formData.instagram_url} 
                onChange={(e) => setFormData({...formData, instagram_url: e.target.value})} 
                placeholder="https://instagram.com/casinolab"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100">
            <Toggle 
              label="Maintenance Mode" 
              checked={formData.maintenance_mode} 
              onChange={(e) => setFormData({...formData, maintenance_mode: e.target.checked})} 
            />
            <p className="text-xs text-slate-400 mt-2">When enabled, the site will show a maintenance page to visitors.</p>
          </div>

          <div className="flex justify-end pt-6 border-t border-slate-100">
            <Button type="submit" isLoading={isSaving} className="gap-2">
              <Save size={16} />
              Save Settings
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
