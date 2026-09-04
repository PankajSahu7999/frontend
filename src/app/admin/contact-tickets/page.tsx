'use client';

import React, { useState, useEffect } from 'react';
import { Table, Column } from '../../../components/admin/Table';
import { Modal } from '../../../components/admin/Modal';
import { 
  MessageSquare, 
  Trash2, 
  Mail, 
  User, 
  Calendar, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Search, 
  ShieldAlert, 
  Filter 
} from 'lucide-react';

interface ContactTicket {
  id: string;
  name: string;
  email: string;
  department: string;
  casino_name?: string | null;
  subject: string;
  message: string;
  status: string;
  created_at: string;
  user?: {
    id: string;
    name?: string | null;
    email: string;
    avatar?: string | null;
  } | null;
}

export default function ContactTicketsAdminPage() {
  const [tickets, setTickets] = useState<ContactTicket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<ContactTicket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState<ContactTicket | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deptFilter, setDeptFilter] = useState('all');

  useEffect(() => {
    fetchTickets();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, statusFilter, deptFilter, tickets]);

  const fetchTickets = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/contact-tickets`);
      if (res.ok) {
        const data = await res.json();
        setTickets(data);
      }
    } catch (err) {
      console.error('Failed to fetch contact tickets:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let result = [...tickets];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(term) ||
          t.email.toLowerCase().includes(term) ||
          t.subject.toLowerCase().includes(term) ||
          t.message.toLowerCase().includes(term)
      );
    }

    if (statusFilter !== 'all') {
      result = result.filter((t) => t.status === statusFilter);
    }

    if (deptFilter !== 'all') {
      result = result.filter((t) => t.department === deptFilter);
    }

    setFilteredTickets(result);
  };

  const handleUpdateStatus = async (status: string) => {
    if (!selectedTicket) return;
    setUpdatingStatus(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/contact-tickets/${selectedTicket.id}/status`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status }),
        }
      );

      if (res.ok) {
        const updated = await res.json();
        setTickets((prev) =>
          prev.map((t) => (t.id === updated.id ? { ...t, status: updated.status } : t))
        );
        setSelectedTicket((prev) => (prev ? { ...prev, status: updated.status } : null));
      } else {
        alert('Failed to update status');
      }
    } catch (err) {
      console.error(err);
      alert('Error updating status');
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleDeleteTicket = async (ticketId: string) => {
    if (!confirm('Are you sure you want to delete this contact ticket? This cannot be undone.')) {
      return;
    }
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/contact-tickets/${ticketId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setTickets((prev) => prev.filter((t) => t.id !== ticketId));
        setIsModalOpen(false);
        setSelectedTicket(null);
      } else {
        alert('Failed to delete ticket');
      }
    } catch (err) {
      console.error(err);
      alert('Error deleting ticket');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'resolved':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 size={12} />
            Resolved
          </span>
        );
      case 'reviewed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <Clock size={12} />
            Reviewed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <AlertCircle size={12} />
            Pending
          </span>
        );
    }
  };

  const getDeptLabel = (dept: string) => {
    switch (dept) {
      case 'dispute':
        return 'Dispute Support';
      case 'editorial':
        return 'Editorial Corrections';
      case 'partnerships':
        return 'Partnership Dept';
      case 'legal':
        return 'Legal & Compliance';
      default:
        return 'General Inquiry';
    }
  };

  const columns: Column[] = [
    {
      header: 'Sender',
      accessor: 'name',
      render: (val, row) => (
        <div className="flex items-center gap-3">
          {row.user?.avatar ? (
            <img
              src={row.user.avatar}
              alt={val}
              className="w-10 h-10 rounded-xl object-cover border border-slate-100 shadow-sm"
            />
          ) : (
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm uppercase">
              {val.substring(0, 2)}
            </div>
          )}
          <div>
            <div className="font-semibold text-slate-800 text-sm">{val}</div>
            <div className="text-xs text-slate-400 font-medium">{row.email}</div>
          </div>
        </div>
      ),
    },
    {
      header: 'Department',
      accessor: 'department',
      render: (val) => (
        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-xs font-semibold">
          {getDeptLabel(val)}
        </span>
      ),
    },
    {
      header: 'Subject',
      accessor: 'subject',
      render: (val, row) => (
        <div className="max-w-xs truncate">
          <div className="font-medium text-slate-700 text-sm truncate">{val}</div>
          <div className="text-xs text-slate-400 truncate">{row.message}</div>
        </div>
      ),
    },
    {
      header: 'Submitted At',
      accessor: 'created_at',
      render: (val) => (
        <div className="text-xs text-slate-500 font-medium flex items-center gap-1">
          <Calendar size={13} className="text-slate-400" />
          {new Date(val).toLocaleDateString()}
        </div>
      ),
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (val) => getStatusBadge(val),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto pb-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
         <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
           
            Contact Tickets
          </h1>
          <p className="text-sm text-slate-500 mt-1.5 font-medium">
            Review inquiries, manage disputes, and set ticket statuses from global casino players.
          </p>
        </div>
      </div>

      {/* Filter and Search Panel */}
    <div className="mb-6 flex flex-col md:flex-row gap-4 items-center">
  {/* Search */}
  <div className="relative flex-1 w-full">
    <Search className="absolute left-3 top-3 text-slate-400 w-4 h-4" />

    <input
      type="text"
      placeholder="Search tickets by sender, email, subject..."
      className="w-full pl-10 pr-4 py-2
        border border-slate-200 rounded-lg
        text-sm text-slate-900
        placeholder:text-slate-900
        bg-white
        focus:outline-none
        focus:border-indigo-500
        focus:ring-1
        focus:ring-indigo-500"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>

  <div className="flex gap-4 w-full md:w-auto">
    {/* Status Filter */}
    <div className="flex-1 md:flex-none relative">
      <select
        className="w-full md:w-44 px-3 py-2
          border border-slate-200 rounded-lg
          text-sm text-slate-900
          bg-white
          appearance-none
          pr-8
          focus:outline-none
          focus:border-indigo-500
          cursor-pointer"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="all">All Statuses</option>
        <option value="pending">Pending</option>
        <option value="reviewed">Reviewed</option>
        <option value="resolved">Resolved</option>
      </select>

      <Filter className="absolute right-3 top-3 text-slate-400 w-3.5 h-3.5 pointer-events-none" />
    </div>

    {/* Department Filter */}
    <div className="flex-1 md:flex-none relative">
      <select
        className="w-full md:w-48 px-3 py-2
          border border-slate-200 rounded-lg
          text-sm text-slate-900
          bg-white
          appearance-none
          pr-8
          focus:outline-none
          focus:border-indigo-500
          cursor-pointer"
        value={deptFilter}
        onChange={(e) => setDeptFilter(e.target.value)}
      >
        <option value="all">All Departments</option>
        <option value="general">General Inquiry</option>
        <option value="dispute">Dispute Support</option>
        <option value="editorial">Editorial Corrections</option>
        <option value="partnerships">Partnership Dept</option>
        <option value="legal">Legal & Compliance</option>
      </select>

      <Filter className="absolute right-3 top-3 text-slate-400 w-3.5 h-3.5 pointer-events-none" />
    </div>
  </div>
</div>

      {/* Main Table View */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-indigo-150 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="shadow-lg shadow-slate-100/50 rounded-xl overflow-hidden border border-slate-100 bg-white">
          <Table
            columns={columns}
            data={filteredTickets}
            onEdit={(row) => {
              setSelectedTicket(row);
              setIsModalOpen(true);
            }}
            onDelete={(row) => handleDeleteTicket(row.id)}
          />
        </div>
      )}

      {/* Ticket Details & Action Modal */}
      {selectedTicket && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={`Ticket Detail: ${selectedTicket.subject}`}
          size="medium"
        >
          <div className="space-y-6">
            {/* Header info */}
            <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-100">
              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Sender</span>
                <span className="text-sm font-bold text-slate-700">{selectedTicket.name}</span>
                <span className="block text-xs text-slate-500">{selectedTicket.email}</span>
              </div>
              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Date Submitted</span>
                <span className="text-sm font-semibold text-slate-700">
                  {new Date(selectedTicket.created_at).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-100">
              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Department</span>
                <span className="px-2 py-0.5 text-xs font-bold rounded bg-slate-100 text-slate-700">
                  {getDeptLabel(selectedTicket.department)}
                </span>
              </div>
              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Casino Reference</span>
                <span className="text-sm font-semibold text-slate-700">
                  {selectedTicket.casino_name || 'N/A'}
                </span>
              </div>
            </div>

            {/* Message Body */}
            <div>
              <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Message Inquiry</span>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm text-slate-700 leading-relaxed max-h-60 overflow-y-auto whitespace-pre-wrap">
                {selectedTicket.message}
              </div>
            </div>

            {/* Registered User info badge if applicable */}
            {selectedTicket.user && (
              <div className="p-3.5 bg-indigo-50/60 rounded-xl border border-indigo-100 flex items-center gap-3">
                <ShieldAlert className="text-indigo-600 w-5 h-5" />
                <div className="text-xs">
                  <span className="font-bold text-indigo-900">Registered User Match:</span> This ticket was submitted by a registered casino player.
                  <span className="block mt-0.5 text-indigo-500 font-medium">User ID: {selectedTicket.user.id}</span>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
              <div className="flex gap-2">
                <button
                  onClick={() => handleUpdateStatus('pending')}
                  disabled={selectedTicket.status === 'pending' || updatingStatus}
                  className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 disabled:opacity-50 transition cursor-pointer"
                >
                  Set Pending
                </button>
                <button
                  onClick={() => handleUpdateStatus('reviewed')}
                  disabled={selectedTicket.status === 'reviewed' || updatingStatus}
                  className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold disabled:opacity-50 transition cursor-pointer"
                >
                  Set Reviewed
                </button>
                <button
                  onClick={() => handleUpdateStatus('resolved')}
                  disabled={selectedTicket.status === 'resolved' || updatingStatus}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold disabled:opacity-50 transition cursor-pointer"
                >
                  Set Resolved
                </button>
              </div>

              <button
                onClick={() => handleDeleteTicket(selectedTicket.id)}
                className="px-3.5 py-1.5 rounded-lg bg-rose-50 border border-rose-200 hover:bg-rose-100 text-rose-700 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
              >
                <Trash2 size={13} />
                Delete Ticket
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
