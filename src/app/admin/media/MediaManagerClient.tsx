'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  Upload, Copy, Check, Trash2, Search, Filter,
  Image as ImageIcon, Eye, X, RefreshCw, AlertCircle
} from 'lucide-react';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

interface MediaItem {
  name: string;
  url: string;
  size: string;
  sizeBytes: number;
  category: string;
  modifiedAt: string;
  isDeletable: boolean;
}

export default function MediaManagerClient() {
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [previewItem, setPreviewItem] = useState<MediaItem | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchMedia = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      const res = await fetch('/api/media');
      if (!res.ok) throw new Error('Failed to load media files');
      const data = await res.json();
      setMediaList(data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error fetching media';
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2200);
  };

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    setErrorMessage('');

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch('/api/media', {
          method: 'POST',
          body: formData
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Upload failed');
      }

      await fetchMedia();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error uploading file';
      setErrorMessage(msg);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDelete = async (url: string) => {
    if (!confirm('Are you sure you want to delete this uploaded image?')) return;

    try {
      const res = await fetch('/api/media', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Delete failed');

      setMediaList((prev) => prev.filter((item) => item.url !== url));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to delete file';
      alert(msg);
    }
  };

  const categories = ['All', ...Array.from(new Set(mediaList.map((m) => m.category)))];

  const filteredMedia = mediaList.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#102C63]">
            Media Library &amp; Activity Photography
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Upload original photos of children, distribution drives, and community welfare. Copy any image URL with 1-click to use in campaigns, hero slides, or initiatives.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => handleFileUpload(e.target.files)}
            accept="image/*"
            multiple
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-2 bg-[#D52D2D] hover:bg-[#b82424] text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition shadow-xs disabled:opacity-50"
          >
            <Upload className="w-4 h-4" />
            <span>{uploading ? 'Uploading...' : 'Upload New Photographs'}</span>
          </button>

          <button
            onClick={fetchMedia}
            disabled={loading}
            className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
            title="Refresh Library"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Error message */}
      {errorMessage && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Drag & Drop Upload Banner */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFileUpload(e.dataTransfer.files);
        }}
        onClick={() => fileInputRef.current?.click()}
        className="p-8 border-2 border-dashed border-slate-300 hover:border-[#183F91] rounded-2xl bg-white hover:bg-slate-50/50 transition cursor-pointer text-center group"
      >
        <div className="w-12 h-12 rounded-full bg-blue-50 text-[#183F91] group-hover:scale-110 flex items-center justify-center mx-auto mb-3 transition-transform">
          <Upload className="w-6 h-6" />
        </div>
        <h3 className="text-sm font-bold text-[#102C63]">
          Drop client activity photographs here, or <span className="text-[#183F91] underline">browse your files</span>
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Supports JPG, PNG, WEBP up to 15MB each. Natural aspect ratios preserved automatically.
        </p>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search photographs by filename..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-1 focus:ring-[#183F91] focus:outline-none bg-white"
          />
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#183F91] text-white shadow-2xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="p-12 text-center text-slate-400 text-sm">
          Loading photographs...
        </div>
      ) : filteredMedia.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-sm">
          No photographs found matching your filter.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredMedia.map((item) => {
            const isCopied = copiedUrl === item.url;
            return (
              <div
                key={item.url}
                className="group bg-white rounded-xl overflow-hidden border border-slate-200/80 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                {/* Image Preview with Natural Aspect Ratio */}
                <div
                  onClick={() => setPreviewItem(item)}
                  className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden cursor-pointer"
                >
                  <ImageWithFallback
                    src={item.url}
                    fallbackSrc="/images/placeholder-general.svg"
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-102 transition-transform duration-200"
                  />
                  <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                    {item.category}
                  </div>
                </div>

                {/* Info & Copy Action */}
                <div className="p-3 space-y-2">
                  <div className="text-xs font-medium text-slate-700 truncate" title={item.name}>
                    {item.name}
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>{item.size}</span>
                    {item.isDeletable && (
                      <button
                        onClick={() => handleDelete(item.url)}
                        className="text-red-500 hover:text-red-700 p-1"
                        title="Delete uploaded photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* 1-Click Copy URL Button */}
                  <button
                    onClick={() => handleCopyUrl(item.url)}
                    className={`w-full inline-flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-semibold transition ${
                      isCopied
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 hover:bg-[#183F91] text-slate-700 hover:text-white'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied URL!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy URL</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Preview Modal */}
      {previewItem && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setPreviewItem(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl space-y-4 p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-sm sm:text-base text-[#102C63]">
                  {previewItem.name}
                </h3>
                <span className="text-xs text-slate-400">
                  {previewItem.category} • {previewItem.size}
                </span>
              </div>
              <button
                onClick={() => setPreviewItem(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-[16/10] w-full bg-slate-900 rounded-xl overflow-hidden">
              <ImageWithFallback
                src={previewItem.url}
                fallbackSrc="/images/placeholder-general.svg"
                alt={previewItem.name}
                fill
                className="object-contain"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <code className="text-xs font-mono bg-slate-100 px-3 py-1.5 rounded-lg text-slate-700 truncate max-w-md">
                {previewItem.url}
              </code>
              <button
                onClick={() => handleCopyUrl(previewItem.url)}
                className="inline-flex items-center gap-1.5 bg-[#183F91] text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-[#102C63] transition"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedUrl === previewItem.url ? 'Copied URL!' : 'Copy Image URL'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
