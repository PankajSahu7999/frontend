'use client';
import React, { useState, useEffect } from 'react';
import { Table, Column } from '../../../components/admin/Table';
import { Button } from '../../../components/admin/FormElements';
import { Trash2 } from 'lucide-react';

export default function LogsPage() {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/logs`);
      const data = await res.json();
      setLogs(data);
    } catch (err) {
      console.error("Failed to fetch logs", err);
    }
    setIsLoading(false);
  };

  const handleDelete = async (log: any) => {
    if (confirm('Are you sure you want to delete this log entry?')) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/logs/${log.id}`, {
          method: 'DELETE'
        });
        if (res.ok) {
          fetchLogs();
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const columns: Column[] = [
    { 
      header: 'Admin', 
      accessor: 'admin',
      render: (val) => val?.name || 'System'
    },
    { 
      header: 'Action', 
      accessor: 'action',
      render: (val) => (
        <span className="font-medium text-slate-800">{val}</span>
      )
    },
    { 
      header: 'Table', 
      accessor: 'table_name'
    },
    { 
      header: 'Record ID', 
      accessor: 'record_id',
      render: (val) => (
        <span className="font-mono text-xs text-slate-500">{val?.substring(0, 8)}...</span>
      )
    },
    { 
      header: 'IP Address', 
      accessor: 'ip_address'
    },
    { 
      header: 'Date', 
      accessor: 'created_at',
      render: (val) => new Date(val).toLocaleString()
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Activity Logs</h1>
          <p className="text-sm text-slate-500 mt-1.5 font-medium">View admin activity and system events.</p>
        </div>
        <Button onClick={() => { if(confirm('Clear all logs?')) fetchLogs(); }} variant="secondary" className="gap-2">
          <Trash2 size={18} />
          Clear All
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-indigo-150 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
      ) : logs.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-slate-200 rounded-2xl">
          <p className="text-slate-500 font-medium">No activity logs yet</p>
          <p className="text-slate-400 text-sm mt-1">Logs will appear here as admins perform actions</p>
        </div>
      ) : (
        <div className="shadow-lg shadow-slate-100/50 rounded-xl overflow-hidden border border-slate-100 bg-white">
          <Table columns={columns} data={logs} onDelete={handleDelete} />
        </div>
      )}
    </div>
  );
}
