'use client';

import React, { useState, useRef, useCallback } from 'react';
import { Upload, X, Image as ImageIcon, Video, Loader2 } from 'lucide-react';
import MediaLibraryModal from './MediaLibraryModal';
import { buildApiUrl, getMediaUrl } from '../../config/api.config';

interface MediaUploadProps {
  value?: string;
  onChange: (value: string) => void;
  accept?: 'image' | 'video' | 'both';
  folder?: string;
  multiple?: boolean;
  className?: string;
  allowVideoUrl?: boolean;
}

export default function MediaUpload({
  value,
  onChange,
  accept = 'both',
  folder = 'general',
  multiple = false,
  className = '',
  allowVideoUrl = false,
}: MediaUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [preview, setPreview] = useState<string | null>(value || null);
  const [showLibrary, setShowLibrary] = useState(false);
  const [showVideoUrlInput, setShowVideoUrlInput] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isImage = accept === 'image' || accept === 'both';
  const isVideo = accept === 'video' || accept === 'both';

  const getAcceptTypes = () => {
    if (accept === 'image') return 'image/*';
    if (accept === 'video') return 'video/*';
    return 'image/*,video/*';
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      await uploadFile(files[0]);
    }
  }, [folder]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      await uploadFile(files[0]);
    }
  };

  const uploadFile = async (file: File) => {
    // Validate file type
    const fileName = file.name.toLowerCase();
    const isImageFile =
      file.type.startsWith('image/') ||
      /\.(jpg|jpeg|png|webp|gif|svg|avif|ico|bmp|tiff|jfif|apng|heic)$/i.test(fileName);
    const isVideoFile =
      file.type.startsWith('video/') ||
      /\.(mp4|webm|ogg|mov|avi|mkv|3gp)$/i.test(fileName);

    if (!isImageFile && !isVideoFile) {
      alert('Only image and video files are allowed');
      return;
    }

    if (accept === 'image' && !isImageFile) {
      alert('Only images are allowed');
      return;
    }

    if (accept === 'video' && !isVideoFile) {
      alert('Only videos are allowed');
      return;
    }

    // Validate file size
    const maxSize = isImageFile ? 20 * 1024 * 1024 : 50 * 1024 * 1024; // 20MB for images, 50MB for videos
    if (file.size > maxSize) {
      alert(`File size exceeds ${isImageFile ? '20MB' : '50MB'} limit`);
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      const response = await fetch(buildApiUrl('/admin/media/upload'), {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        alert(errorData.error || 'Upload failed. Please try a different file.');
        return;
      }

      const data = await response.json();
      const fileUrl = getMediaUrl(data.file_url);
      setPreview(fileUrl);
      onChange(fileUrl);
    } catch (error: any) {
      console.error('Upload error:', error);
      alert(error?.message || 'Failed to upload file. Please check connection and try again.');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onChange('');
  };

  const handleSelectFromLibrary = (mediaUrl: string) => {
    setPreview(mediaUrl);
    onChange(mediaUrl);
    setShowLibrary(false);
  };

  const isValidVideoUrl = (url: string) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
    const vimeoRegex = /^(https?:\/\/)?(www\.)?vimeo\.com\/.+/;
    return youtubeRegex.test(url) || vimeoRegex.test(url);
  };

  const handleVideoUrlSubmit = () => {
    if (!videoUrl.trim()) {
      alert('Please enter a video URL');
      return;
    }

    if (!isValidVideoUrl(videoUrl)) {
      alert('Please enter a valid YouTube or Vimeo URL');
      return;
    }

    setPreview(videoUrl);
    onChange(videoUrl);
    setVideoUrl('');
    setShowVideoUrlInput(false);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className={`media-upload ${className}`}>
      {preview ? (
        <div className="relative group">
          <div className="relative w-full h-48 rounded-lg overflow-hidden border border-gray-300">
            {preview.endsWith('.mp4') || preview.endsWith('.webm') || preview.endsWith('.ogg') ? (
              <video
                src={preview}
                controls
                className="w-full h-full object-cover"
              />
            ) : isValidVideoUrl(preview) ? (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <div className="text-center">
                  <Video className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Video URL</p>
                  <p className="text-xs text-gray-400 truncate max-w-xs">{preview}</p>
                </div>
              </div>
            ) : (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="absolute top-2 right-2 flex gap-2">
            <button
              type="button"
              onClick={() => setShowLibrary(true)}
              className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
              title="Choose from library"
            >
              <ImageIcon className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                fileInputRef.current?.click();
              }}
              className="p-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition-colors"
              title="Upload new file"
            >
              <Upload className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                handleRemove();
              }}
              className="p-2 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition-colors"
              title="Remove"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept={getAcceptTypes()}
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragging
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {showVideoUrlInput ? (
            <div className="flex flex-col items-center">
              <input
                type="text"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="Enter YouTube or Vimeo URL"
                className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleVideoUrlSubmit}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Add URL
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowVideoUrlInput(false);
                    setVideoUrl('');
                  }}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-2">Supports YouTube and Vimeo URLs</p>
            </div>
          ) : isUploading ? (
            <div className="flex flex-col items-center">
              <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
              <p className="text-sm text-gray-600">Uploading... {uploadProgress}%</p>
            </div>
          ) : (
            <>
              <div className="flex flex-col items-center mb-4">
                {isImage && !isVideo && <ImageIcon className="w-12 h-12 text-gray-400 mb-2" />}
                {isVideo && !isImage && <Video className="w-12 h-12 text-gray-400 mb-2" />}
                {isImage && isVideo && <Upload className="w-12 h-12 text-gray-400 mb-2" />}
                <p className="text-sm text-gray-600">
                  Drag and drop a file here, or click to browse
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {isImage && 'Images: JPEG, PNG, WebP, GIF (max 10MB)'}
                  {isVideo && 'Videos: MP4, WebM (max 50MB)'}
                  {isImage && isVideo && 'Images (max 10MB) or Videos (max 50MB)'}
                </p>
              </div>
              <div className="flex gap-2 justify-center flex-wrap">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Upload File
                </button>
                <button
                  type="button"
                  onClick={() => setShowLibrary(true)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors flex items-center gap-2"
                >
                  <ImageIcon className="w-4 h-4" />
                  Media Library
                </button>
                {allowVideoUrl && isVideo && (
                  <button
                    type="button"
                    onClick={() => setShowVideoUrlInput(true)}
                    className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors flex items-center gap-2"
                  >
                    <Video className="w-4 h-4" />
                    Video URL
                  </button>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept={getAcceptTypes()}
                onChange={handleFileSelect}
                className="hidden"
              />
            </>
          )}
        </div>
      )}

      {showLibrary && (
        <MediaLibraryModal
          isOpen={showLibrary}
          onClose={() => setShowLibrary(false)}
          onSelect={handleSelectFromLibrary}
          accept={accept}
        />
      )}
    </div>
  );
}
