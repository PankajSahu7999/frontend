'use client';
import React, { useState, useEffect } from 'react';
import { Table, Column } from '@/components/admin/Table';
import { Button, Select, Input } from '@/components/admin/FormElements';
import { BarChart3, DollarSign, TrendingUp, Filter, Download, Eye } from 'lucide-react';
import { buildApiUrl } from '@/config/api.config';

interface ConversionData {
  conversions: any[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
  };
}

export default function HasOffersConversionsPage() {
  const [conversions, setConversions] = useState<any[]>([]);
  const [casinos, setCasinos] = useState<any[]>([]);
  const [selectedCasino, setSelectedCasino] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [pagination, setPagination] = useState({ total: 0, limit: 50, offset: 0 });

  useEffect(() => {
    fetchCasinos();
  }, []);

  useEffect(() => {
    if (selectedCasino) {
      fetchConversions();
    }
  }, [selectedCasino, statusFilter, startDate, endDate, pagination.offset]);

  const fetchCasinos = async () => {
    try {
      const res = await fetch(buildApiUrl('/admin/casinos'));
      const data = await res.json();
      const list = Array.isArray(data) ? data : data.casinos || [];
      setCasinos(list);
      if (list.length > 0) {
        setSelectedCasino(list[0].id);
      }
    } catch (err) {
      console.error("Failed to fetch casinos", err);
    }
  };

  const fetchConversions = async () => {
    if (!selectedCasino) return;
    
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        limit: pagination.limit.toString(),
        offset: pagination.offset.toString()
      });

      if (statusFilter) params.append('status', statusFilter);
      if (startDate) params.append('start_date', startDate);
      if (endDate) params.append('end_date', endDate);

      const res = await fetch(
        buildApiUrl(`/hasoffers/conversions/${selectedCasino}?${params}`)
      );
      
      if (res.ok) {
        const data: ConversionData = await res.json();
        setConversions(Array.isArray(data.conversions) ? data.conversions : []);
        setPagination(data.pagination || { total: 0, limit: 50, offset: 0 });
      }
    } catch (err) {
      console.error("Failed to fetch conversions", err);
    }
    setIsLoading(false);
  };

  const handleViewDetails = (conversion: any) => {
    // You could implement a modal or navigate to a details page
    alert(`Conversion Details:\n\nTransaction ID: ${conversion.transaction_id}\nOffer ID: ${conversion.offer_id}\nType: ${conversion.conversion_type}\nPayout: $${conversion.payout}\nSale Amount: $${conversion.sale_amount}\nStatus: ${conversion.status}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const formatCurrency = (amount: string | number) => {
    return `$${parseFloat(String(amount)).toFixed(2)}`;
  };

  const columns: Column[] = [
    { 
      header: 'Transaction ID', 
      accessor: 'transaction_id',
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
      header: 'Type', 
      accessor: 'conversion_type',
      render: (val) => (
        <span className="capitalize text-sm text-slate-700">{val}</span>
      )
    },
    { 
      header: 'Payout', 
      accessor: 'payout',
      render: (val) => (
        <span className="font-semibold text-emerald-600">{formatCurrency(val || 0)}</span>
      )
    },
    { 
      header: 'Revenue', 
      accessor: 'sale_amount',
      render: (val) => (
        <span className="font-semibold text-slate-700">{formatCurrency(val || 0)}</span>
      )
    },
    { 
      header: 'Status', 
      accessor: 'status', 
      render: (val) => (
        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
          val === 'approved' 
            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
            : val === 'pending'
            ? 'bg-amber-50 text-amber-700 border border-amber-200'
            : val === 'rejected'
            ? 'bg-rose-50 text-rose-700 border border-rose-200'
            : 'bg-slate-50 text-slate-600 border border-slate-200'
        }`}>
          {val}
        </span>
      )
    },
    {
      header: 'Date',
      accessor: 'conversion_time',
      render: (val) => (
        <span className="text-sm text-slate-600">{formatDate(val)}</span>
      )
    }
  ];

  const casinoOptions = [
    { value: '', label: 'All Casinos' },
    ...casinos.map((c: any) => ({
      value: c.id,
      label: c.name
    }))
  ];

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Conversion Tracking</h1>
          <p className="text-sm text-slate-500 mt-1.5 font-medium">
            View and analyze affiliate conversion data
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClick={() => setShowFilters(!showFilters)}
            className="gap-2"
          >
            <Filter size={18} />
            Filters
          </Button>
          <Button variant="secondary" className="gap-2">
            <Download size={18} />
            Export
          </Button>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select
              label="Casino"
              options={casinoOptions}
              value={selectedCasino}
              onChange={(e) => setSelectedCasino(e.target.value)}
            />
            <Select
              label="Status"
              options={statusOptions}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            />
            <Input
              label="Start Date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <Input
              label="End Date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
      )}

      {/* Stats Summary */}
      {selectedCasino && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                <BarChart3 size={20} className="text-indigo-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Total Conversions</p>
                <p className="text-lg font-bold text-slate-900">{pagination.total}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                <DollarSign size={20} className="text-emerald-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Total Revenue</p>
                <p className="text-lg font-bold text-slate-900">
                  ${conversions.reduce((sum: number, c: any) => sum + parseFloat(c.sale_amount || 0), 0).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                <TrendingUp size={20} className="text-amber-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Total Payout</p>
                <p className="text-lg font-bold text-slate-900">
                  ${conversions.reduce((sum: number, c: any) => sum + parseFloat(c.payout || 0), 0).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                <Eye size={20} className="text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Approved Rate</p>
                <p className="text-lg font-bold text-slate-900">
                  {conversions.length > 0 
                    ? ((conversions.filter((c: any) => c.status === 'approved').length / conversions.length) * 100).toFixed(1)
                    : 0}%
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {!selectedCasino ? (
        <div className="text-center py-16 bg-white rounded-xl border border-slate-100">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <BarChart3 size={32} className="text-slate-300" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Select a Casino</h3>
          <p className="text-slate-500">Choose a casino to view its conversion data</p>
        </div>
      ) : isLoading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-indigo-150 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
      ) : conversions.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-slate-100">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp size={32} className="text-slate-300" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No Conversions Found</h3>
          <p className="text-slate-500 mb-6">No conversions match the current filters</p>
          <Button variant="secondary" onClick={() => {
            setStatusFilter('');
            setStartDate('');
            setEndDate('');
          }}>
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="shadow-lg shadow-slate-100/50 rounded-xl overflow-hidden border border-slate-100 bg-white">
          <Table 
            columns={columns} 
            data={conversions} 
            onView={handleViewDetails}
            showActions={true}
          />
          
          {/* Pagination */}
          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
            <p className="text-sm text-slate-500">
              Showing {pagination.offset + 1} to {Math.min(pagination.offset + pagination.limit, pagination.total)} of {pagination.total} conversions
            </p>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                onClick={() => setPagination({ ...pagination, offset: Math.max(0, pagination.offset - pagination.limit) })}
                disabled={pagination.offset === 0}
              >
                Previous
              </Button>
              <Button
                variant="secondary"
                onClick={() => setPagination({ ...pagination, offset: pagination.offset + pagination.limit })}
                disabled={pagination.offset + pagination.limit >= pagination.total}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}