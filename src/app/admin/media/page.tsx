'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../../../components/admin/FormElements';
import { Plus, Trash2, Image as ImageIcon, FileText, Film } from 'lucide-react';
import { buildApiUrl, getMediaUrl } from '../../../config/api.config';

export default function MediaPage() {
  const [media, setMedia] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(buildApiUrl('/admin/media'));
      const data = await res.json();
      setMedia(data);
    } catch (err) {
      console.error("Failed to fetch media", err);
    }
    setIsLoading(false);
  };

  const handleDelete = async (item: any) => {
    if (confirm(`Are you sure you want to delete "${item.file_name}"?`)) {
      try {
        const res = await fetch(buildApiUrl(`/admin/media/${item.id}`), {
          method: 'DELETE'
        });
        if (res.ok) {
          fetchMedia();
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const getFileIcon = (type: string) => {
    if (type?.includes('image')) return <ImageIcon size={24} className="text-indigo-500" />;
    if (type?.includes('video')) return <Film size={24} className="text-rose-500" />;
    return <FileText size={24} className="text-slate-500" />;
  };

  const formatFileSize = (bytes: any) => {
    if (!bytes) return 'N/A';
    const num = Number(bytes);
    if (isNaN(num)) return 'N/A';
    if (num < 1024) return num + ' B';
    if (num < 1024 * 1024) return (num / 1024).toFixed(1) + ' KB';
    return (num / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Media Library</h1>
          <p className="text-sm text-slate-500 mt-1.5 font-medium">Manage your media files and assets.</p>
        </div>
        <Button onClick={() => alert('File upload functionality would be implemented here')} className="gap-2">
          <Plus size={18} />
          Upload Media
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-indigo-150 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
      ) : media.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-slate-200 rounded-2xl">
          <ImageIcon size={48} className="mx-auto text-slate-300 mb-4" />
          <p className="text-slate-500 font-medium">No media files yet</p>
          <p className="text-slate-400 text-sm mt-1">Upload your first media file to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {media.map((item: any) => (
            <div key={item.id} className="group relative bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-square bg-slate-50 flex items-center justify-center">
                {item.file_type?.includes('image') && item.file_url ? (
                  <img 
                    src={getMediaUrl(item.file_url)}
                    alt={item.file_name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2">
                   {getFileIcon(item.file_type)}
                    <span className="text-xs text-slate-400">{item.file_type || 'Unknown'}</span>
                  </div>
                )}
              </div>
              <div className="p-3 border-t border-slate-100">
                <p className="text-sm font-medium text-slate-800 truncate" title={item.file_name}>
                  {item.file_name}
                </p>
                <p className="text-xs text-slate-400 mt-1">{formatFileSize(item.file_size)}</p>
              </div>
              <button
                onClick={() => handleDelete(item)}
                className="absolute top-2 right-2 bg-rose-500 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
