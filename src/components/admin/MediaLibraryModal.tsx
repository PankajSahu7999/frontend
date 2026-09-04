'use client';

import React, { useState, useEffect } from 'react';
import { X, Search, Grid, List, Copy, Trash2, Calendar, FileText, Image as ImageIcon, Video, ArrowUpDown } from 'lucide-react';
import { Modal } from './Modal';
import { buildApiUrl, getMediaUrl } from '../../config/api.config';

interface MediaLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
  accept?: 'image' | 'video' | 'both';
}

interface MediaItem {
  id: string;
  file_name: string;
  original_name: string;
  file_url: string;
  file_type: string;
  mime_type: string;
  file_size: number;
  width: number | null;
  height: number | null;
  folder: string;
  created_at: string;
}

export default function MediaLibraryModal({
  isOpen,
  onClose,
  onSelect,
  accept = 'both',
}: MediaLibraryModalProps) {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'image' | 'video'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'file_size' | 'file_name'>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchMedia();
    }
  }, [isOpen, search, typeFilter, sortBy]);

  const fetchMedia = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (typeFilter !== 'all') params.append('type', typeFilter);
      params.append('sort', sortBy);

      const response = await fetch(`${buildApiUrl('/admin/media')}?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setMedia(data);
      }
    } catch (error) {
      console.error('Error fetching media:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (item: MediaItem) => {
    const url = getMediaUrl(item.file_url);
    onSelect(url);
  };

  const handleCopyUrl = async (item: MediaItem) => {
    const url = getMediaUrl(item.file_url);
    await navigator.clipboard.writeText(url);
    alert('URL copied to clipboard');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this file?')) return;

    try {
      const response = await fetch(buildApiUrl(`/admin/media/${id}`), {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchMedia();
      }
    } catch (error) {
      console.error('Error deleting media:', error);
      alert('Failed to delete media');
    }
  };

  const formatFileSize = (bytes: number) => {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const filteredMedia = media.filter((item) => {
    if (accept === 'image' && item.file_type !== 'image') return false;
    if (accept === 'video' && item.file_type !== 'video') return false;
    return true;
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Media Library" size="large" maxWidth="max-w-6xl">
      <div className="flex flex-col h-[600px]">
        {/* Search and Filters */}
        <div className="flex gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search media..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Types</option>
            <option value="image">Images</option>
            <option value="video">Videos</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="file_size">File Size</option>
            <option value="file_name">File Name</option>
          </select>
          <div className="flex border border-gray-300 rounded-md">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-2 ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Media Grid/List */}
        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-gray-500">Loading...</div>
            </div>
          ) : filteredMedia.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-gray-500">No media found</div>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-4 gap-4">
              {filteredMedia.map((item) => (
                <div
                  key={item.id}
                  className="relative group border border-gray-300 rounded-lg overflow-hidden cursor-pointer hover:border-blue-500 transition-colors"
                  onClick={() => handleSelect(item)}
                >
                  <div className="aspect-square bg-gray-100">
                    {item.file_type === 'video' ? (
                      <video
                        src={getMediaUrl(item.file_url)}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          console.error('Video load error:', e);
                          (e.target as HTMLVideoElement).poster = '';
                        }}
                      />
                    ) : (
                      <img
                        src={getMediaUrl(item.file_url)}
                        alt={item.original_name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          console.error('Image load error:', item.file_url, e);
                          (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="%23999" stroke-width="2"%3E%3Crect x="3" y="3" width="18" height="18" rx="2" ry="2"%3E%3C/rect%3E%3Ccircle cx="8.5" cy="8.5" r="1.5"%3E%3C/circle%3E%3Cpolyline points="21 15 16 10 5 21"%3E%3C/polyline%3E%3C/svg%3E';
                        }}
                      />
                    )}
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyUrl(item);
                      }}
                      className="p-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100"
                      title="Copy URL"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(item.id);
                      }}
                      className="p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="p-2 bg-white">
                    <p className="text-xs text-gray-600 truncate">{item.original_name}</p>
                    <p className="text-xs text-gray-400">{formatFileSize(Number(item.file_size))}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Preview</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Name</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Type</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Size</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Dimensions</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Folder</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Date</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMedia.map((item) => (
                    <tr
                      key={item.id}
                      className="border-t border-gray-200 hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleSelect(item)}
                    >
                      <td className="px-4 py-2">
                        <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden">
                          {item.file_type === 'video' ? (
                            <Video className="w-full h-full p-2 text-gray-400" />
                          ) : (
                            <img
                              src={getMediaUrl(item.file_url)}
                              alt={item.original_name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                console.error('List view image load error:', item.file_url, e);
                                (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="%23999" stroke-width="2"%3E%3Crect x="3" y="3" width="18" height="18" rx="2" ry="2"%3E%3C/rect%3E%3Ccircle cx="8.5" cy="8.5" r="1.5"%3E%3C/circle%3E%3Cpolyline points="21 15 16 10 5 21"%3E%3C/polyline%3E%3C/svg%3E';
                              }}
                            />
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-900">{item.original_name}</td>
                      <td className="px-4 py-2 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          {item.file_type === 'video' ? (
                            <Video className="w-4 h-4" />
                          ) : (
                            <ImageIcon className="w-4 h-4" />
                          )}
                          {item.mime_type}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-600">{formatFileSize(Number(item.file_size))}</td>
                      <td className="px-4 py-2 text-sm text-gray-600">
                        {item.width && item.height ? `${item.width}x${item.height}` : '-'}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-600">{item.folder}</td>
                      <td className="px-4 py-2 text-sm text-gray-600">{formatDate(item.created_at)}</td>
                      <td className="px-4 py-2">
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopyUrl(item);
                            }}
                            className="p-1 hover:bg-gray-200 rounded"
                            title="Copy URL"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(item.id);
                            }}
                            className="p-1 hover:bg-red-100 text-red-500 rounded"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
