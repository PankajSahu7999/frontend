import React from 'react';
import { Users, Building2, TrendingUp, Mail } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Users', value: '1,248', icon: Users, color: 'bg-indigo-500', trend: '+12% this month' },
    { label: 'Active Casinos', value: '34', icon: Building2, color: 'bg-emerald-500', trend: '+3 this month' },
    { label: 'Total Revenue', value: '$45,231', icon: TrendingUp, color: 'bg-blue-500', trend: '+18% this month' },
    { label: 'Email Campaigns', value: '12', icon: Mail, color: 'bg-purple-500', trend: '2 active' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Dashboard Overview</h1>
        <p className="text-slate-500 mt-1">Welcome back! Here's what's happening with your platform today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col transition-all hover:shadow-md">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl text-white shadow-sm ${stat.color}`}>
                <stat.icon size={22} />
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-slate-800 mb-1 tracking-tight">{stat.value}</h3>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <p className="text-xs text-slate-400 mt-3 font-medium bg-slate-50 inline-block px-2 py-1 rounded-md">{stat.trend}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-6 min-h-[300px]">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Traffic Overview</h2>
          <div className="flex flex-col items-center justify-center h-full text-slate-400">
            <div className="w-16 h-16 border-4 border-dashed border-slate-200 rounded-full mb-3 flex items-center justify-center">
              <TrendingUp size={24} className="text-slate-300" />
            </div>
            <p>Chart data will appear here.</p>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 min-h-[300px]">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Recent Activity</h2>
          <div className="space-y-4 mt-6">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-2 h-2 mt-2 rounded-full bg-indigo-500"></div>
                <div>
                  <p className="text-sm font-medium text-slate-700">New user registered</p>
                  <p className="text-xs text-slate-500">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
