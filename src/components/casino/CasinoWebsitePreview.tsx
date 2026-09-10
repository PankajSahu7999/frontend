'use client';

import React, { useState } from 'react';
import { Globe, Lock, ExternalLink, RefreshCw, Eye, Monitor, ShieldCheck } from 'lucide-react';
import { getImageUrl } from '@/lib/utils/getImageUrl';

interface CasinoWebsitePreviewProps {
  websiteUrl?: string | null;
  casinoName?: string;
  featuredImage?: string | null;
  affiliateUrl?: string | null;
}

export default function CasinoWebsitePreview({
  websiteUrl,
  casinoName = 'Casino',
  featuredImage,
  affiliateUrl,
}: CasinoWebsitePreviewProps) {
  const [viewMode, setViewMode] = useState<'snapshot' | 'interactive'>('snapshot');
  const [isLoading, setIsLoading] = useState(true);
  const [hasSnapshotError, setHasSnapshotError] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  // Normalize target URL
  const targetUrl = (websiteUrl || '').trim();
  const directLink = affiliateUrl || targetUrl || '#';

  // Extract clean domain name for the address bar
  let displayDomain = targetUrl;
  let formattedUrl = targetUrl;
  try {
    if (targetUrl) {
      const urlObj = new URL(targetUrl.startsWith('http') ? targetUrl : `https://${targetUrl}`);
      displayDomain = urlObj.hostname.replace(/^www\./, '');
      formattedUrl = urlObj.toString();
    }
  } catch {
    displayDomain = targetUrl.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0] || 'casinowebsite.com';
    formattedUrl = targetUrl.startsWith('http') ? targetUrl : `https://${targetUrl}`;
  }

  // Live screenshot service URL
  const snapshotUrl = formattedUrl
    ? `https://s0.wp.com/mshots/v1/${encodeURIComponent(formattedUrl)}?w=1280`
    : null;

  // If no website URL and no featured image, don't render anything
  if (!targetUrl && !featuredImage) {
    return null;
  }

  return (
    <div className="w-full mb-10">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <h3 className="font-poppins text-[15px] font-bold text-[#16171D] uppercase tracking-wider">
            {casinoName} Live Website Preview
          </h3>
        </div>

        {targetUrl && (
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
            <button
              type="button"
              onClick={() => setViewMode('snapshot')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-medium transition-all ${
                viewMode === 'snapshot'
                  ? 'bg-white text-blue-600 shadow-sm font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Live</span> Snapshot
            </button>
            <button
              type="button"
              onClick={() => setViewMode('interactive')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-medium transition-all ${
                viewMode === 'interactive'
                  ? 'bg-white text-blue-600 shadow-sm font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              Interactive <span className="hidden sm:inline">Frame</span>
            </button>
          </div>
        )}
      </div>

      {/* Browser Window Mockup Frame */}
      <div className="w-full rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-xl">
        {/* Browser Top Navigation Bar */}
        <div className="bg-slate-100 border-b border-slate-200 px-4 py-2.5 flex items-center justify-between gap-3">
          {/* macOS window controls */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/40 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/40 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/40 inline-block"></span>
          </div>

          {/* Browser Address Bar Pill */}
          <div className="flex-1 max-w-xl mx-auto flex items-center justify-center">
            <div className="w-full bg-white border border-slate-200 rounded-full py-1 px-3.5 flex items-center justify-between text-xs text-slate-600 shadow-inner">
              <div className="flex items-center gap-1.5 truncate">
                <Lock className="w-3 h-3 text-emerald-600 shrink-0" />
                <span className="text-emerald-700 font-semibold select-none">https://</span>
                <span className="text-slate-800 font-medium truncate">{displayDomain}</span>
              </div>
              <span className="text-[10px] uppercase font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 shrink-0 ml-2">
                Live
              </span>
            </div>
          </div>

          {/* Actions: Reload & External Link */}
          <div className="flex items-center gap-1.5 shrink-0">
            {viewMode === 'interactive' && (
              <button
                type="button"
                onClick={() => {
                  setIsLoading(true);
                  setIframeKey((k) => k + 1);
                }}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200/70 transition-colors"
                title="Reload preview"
                aria-label="Reload preview"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            )}

            {directLink && directLink !== '#' && (
              <a
                href={directLink}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="inline-flex items-center gap-1 bg-[#2E68FB] hover:bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm transition-all"
              >
                <span>Visit Casino</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>

        {/* Viewport Content */}
        <div className="relative w-full bg-slate-950 overflow-hidden min-h-[360px] md:min-h-[480px] max-h-[580px] flex items-center justify-center">
          {/* Loading Indicator */}
          {isLoading && (
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm z-20 flex flex-col items-center justify-center text-white gap-3">
              <div className="w-8 h-8 border-3 border-white/20 border-t-blue-500 rounded-full animate-spin"></div>
              <span className="text-xs font-medium text-slate-300">
                Rendering {casinoName} preview...
              </span>
            </div>
          )}

          {/* Mode A: Live Snapshot (Default & 100% reliable) */}
          {viewMode === 'snapshot' && (
            <div className="relative w-full h-full group">
              {snapshotUrl && !hasSnapshotError ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={snapshotUrl}
                  src={snapshotUrl}
                  alt={`${casinoName} live website preview`}
                  className="w-full h-auto max-h-[580px] object-cover object-top transition-transform duration-500 group-hover:scale-[1.01]"
                  onLoad={() => setIsLoading(false)}
                  onError={() => {
                    setHasSnapshotError(true);
                    setIsLoading(false);
                  }}
                />
              ) : featuredImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={getImageUrl(featuredImage)}
                  alt={`${casinoName} banner`}
                  className="w-full h-auto max-h-[580px] object-cover object-top"
                  onLoad={() => setIsLoading(false)}
                  onError={() => setIsLoading(false)}
                />
              ) : (
                <div className="p-12 text-center text-slate-400">
                  <Globe className="w-12 h-12 mx-auto mb-3 opacity-40" />
                  <p className="text-sm">Preview available directly on the official site</p>
                </div>
              )}

              {/* Hover Overlay with Visit button */}
              {directLink && directLink !== '#' && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-6 z-10 pointer-events-none">
                  <div className="text-white">
                    <p className="font-bold text-lg">{casinoName}</p>
                    <p className="text-xs text-slate-300">Official Website Preview</p>
                  </div>
                  <a
                    href={directLink}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="pointer-events-auto bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 transition-transform hover:scale-105"
                  >
                    <span>Open {casinoName}</span>
                    <ExternalLink className="w-4 h-4 text-blue-600" />
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Mode B: Interactive iframe (when requested) */}
          {viewMode === 'interactive' && formattedUrl && (
            <div className="w-full h-[520px] relative bg-white">
              <iframe
                key={iframeKey}
                src={formattedUrl}
                title={`${casinoName} Website Live Preview`}
                className="w-full h-full border-0"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
                loading="lazy"
                onLoad={() => setIsLoading(false)}
              />

              {/* Notice bar for security headers */}
              <div className="absolute bottom-0 inset-x-0 bg-slate-900/90 backdrop-blur-sm text-slate-300 text-[11px] py-1.5 px-3 flex items-center justify-between border-t border-slate-700/50">
                <span className="flex items-center gap-1.5 truncate">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>Some casinos restrict direct iframe embedding. If blank, switch to Live Snapshot.</span>
                </span>
                <button
                  type="button"
                  onClick={() => setViewMode('snapshot')}
                  className="text-blue-400 hover:text-blue-300 font-semibold underline shrink-0 ml-2"
                >
                  Use Snapshot
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
