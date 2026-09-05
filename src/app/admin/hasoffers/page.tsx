'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/admin/FormElements';
import { BarChart3, TrendingUp, DollarSign, Users, MousePointerClick, AlertCircle } from 'lucide-react';
import { buildApiUrl } from '@/config/api.config';

interface DashboardStats {
  total_conversions: number;
  total_clicks: number;
  conversion_rate: number;
  total_revenue: number;
  total_payout: number;
  active_configs: number;
  pending_conversions: number;
  approved_conversions: number;
  rejected_conversions: number;
}

interface CasinoStats {
  casino_id: string;
  casino_name: string;
  total_conversions: number;
  total_clicks: number;
  conversion_rate: number;
  total_revenue: number;
  total_payout: number;
}

export default function HasOffersDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [casinoStats, setCasinoStats] = useState<CasinoStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Fetch overall stats
      const [configsRes, casinosRes] = await Promise.all([
        fetch(buildApiUrl('/admin/hasoffers/configs')),
        fetch(buildApiUrl('/admin/casinos'))
      ]);

      if (!configsRes.ok || !casinosRes.ok) {
        throw new Error('Failed to fetch dashboard data');
      }

      const configsRaw = await configsRes.json();
      const casinosRaw = await casinosRes.json();
      const configs = Array.isArray(configsRaw) ? configsRaw : [];
      const casinos = Array.isArray(casinosRaw) ? casinosRaw : casinosRaw.casinos || [];

      // Calculate overall stats
      const activeConfigs = configs.filter((c: any) => c.status === 'active').length;
      
      // Get stats for each casino
      const casinoStatsData = await Promise.all(
        casinos.map(async (casino: any) => {
          try {
            const analyticsRes = await fetch(
              buildApiUrl(`/hasoffers/analytics/${casino.id}`)
            );
            if (analyticsRes.ok) {
              const analytics = await analyticsRes.json();
              return {
                casino_id: casino.id,
                casino_name: casino.name,
                total_conversions: analytics.overview?.total_conversions || 0,
                total_clicks: analytics.overview?.total_clicks || 0,
                conversion_rate: analytics.overview?.conversion_rate || 0,
                total_revenue: parseFloat(analytics.overview?.total_revenue) || 0,
                total_payout: parseFloat(analytics.overview?.total_payout) || 0
              };
            }
            return null;
          } catch (err) {
            console.error(`Failed to fetch stats for ${casino.name}:`, err);
            return null;
          }
        })
      );

      const validCasinoStats = casinoStatsData.filter((s): s is CasinoStats => s !== null);

      // Aggregate overall stats
      const overallStats: DashboardStats = {
        total_conversions: validCasinoStats.reduce((sum, s) => sum + s.total_conversions, 0),
        total_clicks: validCasinoStats.reduce((sum, s) => sum + s.total_clicks, 0),
        conversion_rate: validCasinoStats.length > 0 
          ? validCasinoStats.reduce((sum, s) => sum + s.total_conversions, 0) / 
            validCasinoStats.reduce((sum, s) => sum + s.total_clicks, 0) * 100 
          : 0,
        total_revenue: validCasinoStats.reduce((sum, s) => sum + s.total_revenue, 0),
        total_payout: validCasinoStats.reduce((sum, s) => sum + s.total_payout, 0),
        active_configs: activeConfigs,
        pending_conversions: 0, // Would need detailed conversion data
        approved_conversions: 0,
        rejected_conversions: 0
      };

      setStats(overallStats);
      setCasinoStats(validCasinoStats);
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
      setError('Failed to load dashboard data');
    }
    setIsLoading(false);
  };

  const StatCard = ({ title, value, icon: Icon, trend, color = 'indigo' }: any) => (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
            <p className="text-2xl font-bold text-slate-900">{value}</p>
            {trend && (
              <p className={`text-xs mt-1 ${trend > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
              </p>
            )}
          </div>
          <div className={`w-12 h-12 rounded-lg bg-${color}-50 flex items-center justify-center`}>
            <Icon className={`text-${color}-600`} size={24} />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-10 h-10 border-4 border-indigo-150 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <AlertCircle className="text-rose-500 mb-4" size={48} />
        <p className="text-slate-600">{error}</p>
        <button 
          onClick={fetchDashboardData}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">HasOffers Tracking Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1.5 font-medium">
          Monitor affiliate conversion performance across all casinos
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Conversions"
          value={stats?.total_conversions || 0}
          icon={TrendingUp}
          color="emerald"
        />
        <StatCard
          title="Total Clicks"
          value={stats?.total_clicks || 0}
          icon={MousePointerClick}
          color="blue"
        />
        <StatCard
          title="Conversion Rate"
          value={`${stats?.conversion_rate.toFixed(2) || 0}%`}
          icon={BarChart3}
          color="purple"
        />
        <StatCard
          title="Total Revenue"
          value={`$${(stats?.total_revenue || 0).toFixed(2)}`}
          icon={DollarSign}
          color="amber"
        />
        <StatCard
          title="Total Payout"
          value={`$${(stats?.total_payout || 0).toFixed(2)}`}
          icon={DollarSign}
          color="rose"
        />
        <StatCard
          title="Active Configs"
          value={stats?.active_configs || 0}
          icon={Users}
          color="indigo"
        />
      </div>

      {/* Casino Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Casino Performance</CardTitle>
        </CardHeader>
        <CardContent>
          {casinoStats.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              No conversion data available. Set up HasOffers configurations to start tracking.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Casino</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-slate-600">Conversions</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-slate-600">Clicks</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-slate-600">Conv. Rate</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-slate-600">Revenue</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-slate-600">Payout</th>
                  </tr>
                </thead>
                <tbody>
                  {casinoStats.map((casino) => (
                    <tr key={casino.casino_id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-3 px-4 text-sm font-medium text-slate-900">{casino.casino_name}</td>
                      <td className="py-3 px-4 text-sm text-right text-slate-600">{casino.total_conversions}</td>
                      <td className="py-3 px-4 text-sm text-right text-slate-600">{casino.total_clicks}</td>
                      <td className="py-3 px-4 text-sm text-right text-slate-600">{casino.conversion_rate.toFixed(2)}%</td>
                      <td className="py-3 px-4 text-sm text-right text-slate-600">${casino.total_revenue.toFixed(2)}</td>
                      <td className="py-3 px-4 text-sm text-right text-slate-600">${casino.total_payout.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white border-0">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-2">Set Up New Configuration</h3>
            <p className="text-indigo-100 text-sm mb-4">
              Add a new HasOffers network configuration for a casino to start tracking conversions.
            </p>
            <button 
              onClick={() => window.location.href = '/admin/hasoffers/configs/new'}
              className="w-full py-2 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
            >
              Add Configuration
            </button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-0">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-2">View Conversion Details</h3>
            <p className="text-emerald-100 text-sm mb-4">
              View detailed conversion data and analytics for all configured casinos.
            </p>
            <button 
              onClick={() => window.location.href = '/admin/hasoffers/conversions'}
              className="w-full py-2 bg-white text-emerald-600 rounded-lg font-semibold hover:bg-emerald-50 transition-colors"
            >
              View Conversions
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}