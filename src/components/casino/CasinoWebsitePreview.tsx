'use client';

import React, { useState } from 'react';
import { getImageUrl } from '@/lib/utils/getImageUrl';

interface CasinoWebsitePreviewProps {
  affiliateUrl?: string | null;
  featuredImage?: string | null;
  casinoName?: string;
}

export default function CasinoWebsitePreview({
  affiliateUrl,
  featuredImage,
  casinoName = 'Casino',
}: CasinoWebsitePreviewProps) {
  const cleanAffiliateUrl = (affiliateUrl || '').trim();

  // If no affiliate URL at all, show banner
  const [hasError, setHasError] = useState(!cleanAffiliateUrl);
  const [isLoading, setIsLoading] = useState(Boolean(cleanAffiliateUrl));

  // If neither affiliate URL nor featured image exists
  if (!cleanAffiliateUrl && !featuredImage) {
    return null;
  }

  // If no affiliate URL or if iframe explicitly errored out, show admin banner image
  if (hasError || !cleanAffiliateUrl) {
    if (!featuredImage) return null;
    return (
      <div className="w-full h-auto mb-10 rounded-2xl overflow-hidden shadow-sm">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={getImageUrl(featuredImage)}
          alt={casinoName || 'Casino Banner'}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  // Live interactive frame (pure banner type, zero text, no premature fallback)
  return (
    <div className="w-full h-[450px] sm:h-[520px] lg:h-[600px] mb-10 rounded-2xl overflow-hidden shadow-md bg-slate-950 relative">
      {/* Loading overlay while iframe is fetching the site */}
      {isLoading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-900/80 backdrop-blur-sm text-white gap-3 pointer-events-none">
          <div className="w-10 h-10 border-3 border-white/20 border-t-blue-500 rounded-full animate-spin" />
          <span className="text-xs font-medium text-slate-300">
            Loading live preview...
          </span>
        </div>
      )}

      <iframe
        src={cleanAffiliateUrl}
        title={casinoName || 'Casino Live Preview'}
        className="w-full h-full border-0"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
        loading="eager"
        onLoad={() => {
          setIsLoading(false);
        }}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
      />
    </div>
  );
}
