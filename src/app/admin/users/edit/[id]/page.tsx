'use client';
import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Select, Toggle, Button } from '../../../../../components/admin/FormElements';
import MediaUpload from '../../../../../components/admin/MediaUpload';
import { ArrowLeft, Save, User, Settings, BadgeCheck, Loader2 } from 'lucide-react';

export default function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    avatar: '',
    role: 'user',
    status: 'active',
    email_verified: false,
    phone: '',
    country: '',
  });

  useEffect(() => {
    if (id) {
      fetchUserDetails();
    }
  }, [id]);

  const fetchUserDetails = async () => {
    setIsFetching(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/users/${id}`);
      if (!res.ok) {
        console.error('Failed to fetch user:', res.status, res.statusText);
        setIsFetching(false);
        return;
      }
      const data = await res.json();
      console.log('User data:', data);
      setFormData({
        name: data.name || '',
        email: data.email || '',
        avatar: data.avatar || '',
        role: data.role || 'user',
        status: data.status || 'active',
        email_verified: !!data.email_verified,
        phone: data.phone || '',
        country: data.country || '',
      });
    } catch (err) {
      console.error("Error fetching user details", err);
    } finally {
      setIsFetching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        router.push('/admin/users');
      } else {
        alert('Failed to update user');
      }
    } catch (err) {
      console.error(err);
      alert('Error updating user');
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-32 space-y-3">
        <Loader2 size={36} className="animate-spin text-indigo-600" />
        <p className="text-sm font-medium text-slate-500">Retrieving profile parameters...</p>
      </div>
    );
  }

  return (
    <div className="w-full px-6 mx-auto pb-16">
      {/* Top Professional Header Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-5 border-b border-slate-200">
        <div>
          <button 
            type="button"
            onClick={() => router.push('/admin/users')} 
            className="flex items-center gap-1.5 text-slate-500 hover:text-slate-800 transition-colors mb-2 text-xs font-bold uppercase tracking-wider"
          >
            <ArrowLeft size={14} />
            Back to Users
          </button>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Edit User: <span className="font-normal text-slate-500">{formData.name || formData.email}</span>
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">Modify database attributes, global permissions, and operational health status.</p>
        </div>

        {/* Floating Quick Actions Header */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button type="button" variant="secondary" onClick={() => router.push('/admin/users')}>
            Cancel
          </Button>
          <Button type="submit" form="edit-user-form" isLoading={isLoading} className="gap-2 px-5 shadow-sm">
            <Save size={16} />
            Update User Record
          </Button>
        </div>
      </div>

      {/* Main Two-Column Layout Workspace */}
      <form id="edit-user-form" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* LEFT COLUMN: Identity Details (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-5">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100 text-slate-800 font-semibold text-base">
              <User size={18} className="text-indigo-500" />
              Profile Registry Details
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Input 
                label="Full Name" 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})} 
                placeholder="John Doe"
                required 
              />
              <Input 
                label="Email Address" 
                type="email"
                value={formData.email} 
                onChange={(e) => setFormData({...formData, email: e.target.value})} 
                placeholder="john@example.com"
                required 
              />
              <Input 
                label="Phone (optional)" 
                type="tel"
                value={formData.phone} 
                onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                placeholder="+1 234 567 8900"
              />
              <Input 
                label="Country" 
                value={formData.country} 
                onChange={(e) => setFormData({...formData, country: e.target.value})} 
                placeholder="e.g. United Kingdom"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Avatar Image</label>
              <MediaUpload
                value={formData.avatar}
                onChange={(value) => setFormData({...formData, avatar: value})}
                accept="image"
                folder="users"
              />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Governance, Status, Permissions (Sticky 1/3 panel) */}
        <div className="space-y-6 lg:sticky lg:top-6">
          
          {/* Access Control Box */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-5">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100 font-semibold text-base text-slate-800">
              <Settings size={18} className="text-indigo-500" />
              Access & Governance
            </div>
            
            <div className="space-y-4">
              <Select 
                label="Account Role"
                options={[
                  { value: 'user', label: 'User (Standard)' },
                  { value: 'editor', label: 'Editor (Content Manager)' },
                  { value: 'admin', label: 'Administrator (Full Access)' }
                ]}
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
              />

              <Select 
                label="System Status"
                options={[
                  { value: 'active', label: 'Active / Healthy' },
                  { value: 'pending', label: 'Pending Verification' },
                  { value: 'blocked', label: 'Blocked / Suspended' }
                ]}
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
              />
            </div>
          </div>

          {/* Account Verification States */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100 text-slate-800 font-semibold text-base">
              <BadgeCheck size={18} className="text-emerald-500" />
              Security Settings
            </div>
            
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 flex items-center justify-between">
             
              <Toggle 
                label="Email Verification Status"
                checked={formData.email_verified}
                onChange={(e) => setFormData({...formData, email_verified: e.target.checked})}
              />
            </div>
          </div>

        </div>
      </form>
    </div>
  );
}