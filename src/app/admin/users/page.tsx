'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Table, Column } from '../../../components/admin/Table';
import { Button } from '../../../components/admin/FormElements';
import { Plus, Phone, Globe } from 'lucide-react';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/users`);
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
    setIsLoading(false);
  };

  const handleEdit = (user: any) => {
    router.push(`/admin/users/edit/${user.id}`);
  };

  const handleDelete = async (user: any) => {
    if (confirm(`Are you sure you want to delete ${user.name || user.email}?`)) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/users/${user.id}`, {
          method: 'DELETE'
        });
        if (res.ok) {
          fetchUsers();
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const columns: Column[] = [
    { 
      header: 'Name', 
      accessor: 'name', 
      render: (val, row) => (
        <div className="flex items-center gap-3">
          {row.avatar ? (
            <img src={row.avatar} alt={val} className="w-10 h-10 rounded-xl object-cover border border-slate-100 shadow-sm" />
          ) : (
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #CDDCFB, #588CF3)' }}
            >
              <img
                src={`https://api.dicebear.com/8.x/adventurer/svg?seed=${encodeURIComponent(row.email || val || 'user')}&backgroundColor=b6e3f4,c0aede&radius=50`}
                alt={val || 'User'}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div>
            <div className="font-semibold text-slate-800 text-base">{val || 'Unnamed User'}</div>
            <div className="text-xs text-slate-400 font-medium">{row.email}</div>
          </div>
        </div>
      ) 
    },
    { 
      header: 'Role', 
      accessor: 'role', 
      render: (val) => (
        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${val === 'admin' ? 'bg-purple-50 text-purple-700 border border-purple-200' : 'bg-slate-50 text-slate-600 border border-slate-200'}`}>
          {val}
        </span>
      ) 
    },
    {
      header: 'Phone',
      accessor: 'phone',
      render: (val) => val ? (
        <div className="flex items-center gap-1.5 text-slate-600 text-sm">
          <Phone size={13} className="text-slate-400" />
          {val}
        </div>
      ) : (
        <span className="text-slate-300 text-xs">—</span>
      )
    },
    {
      header: 'Country',
      accessor: 'country',
      render: (val) => val ? (
        <div className="flex items-center gap-1.5 text-slate-600 text-sm">
          <Globe size={13} className="text-slate-400" />
          {val}
        </div>
      ) : (
        <span className="text-slate-300 text-xs">—</span>
      )
    },
    { 
      header: 'Verified', 
      accessor: 'email_verified', 
      render: (val) => (
        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${val ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'}`}>
          {val ? 'VERIFIED' : 'PENDING'}
        </span>
      ) 
    },
    { 
      header: 'Status', 
      accessor: 'status', 
      render: (val) => (
        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${val === 'active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'}`}>
          {val}
        </span>
      ) 
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">System Users</h1>
          <p className="text-sm text-slate-500 mt-1.5 font-medium">Manage registration details, verify emails, assign admin roles, and suspend user accounts.</p>
        </div>
        <Button onClick={() => router.push('/admin/users/new')} className="gap-2">
          <Plus size={18} />
          Add User
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-indigo-150 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="shadow-lg shadow-slate-100/50 rounded-xl overflow-hidden border border-slate-100 bg-white">
          <Table columns={columns} data={users} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      )}
    </div>
  );
}
