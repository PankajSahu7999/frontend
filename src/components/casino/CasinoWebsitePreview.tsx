'use client';

import React, { useState, useEffect } from 'react';
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
  const [canEmbed, setCanEmbed] = useState<boolean | null>(null);

  const cleanAffiliateUrl = (affiliateUrl || '').trim();

  useEffect(() => {
    // If no affiliate URL is provided, immediately switch to admin banner
    if (!cleanAffiliateUrl) {
      setCanEmbed(false);
      return;
    }

    let isMounted = true;

    const checkEmbeddable = async () => {
      try {
        const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
        const baseApiUrl = rawApiUrl.replace(/\/api\/?$/, '');

        const res = await fetch(
          `${baseApiUrl}/api/check-frame?url=${encodeURIComponent(cleanAffiliateUrl)}`
        );

        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            setCanEmbed(data.canEmbed === true);
          }
        } else {
          // If the endpoint is unavailable or returns an error, fallback to banner image
          if (isMounted) setCanEmbed(false);
        }
      } catch {
        if (isMounted) setCanEmbed(false);
      }
    };

    checkEmbeddable();

    return () => {
      isMounted = false;
    };
  }, [cleanAffiliateUrl]);

  // If neither affiliate URL nor featured image exists, render nothing
  if (!cleanAffiliateUrl && !featuredImage) {
    return null;
  }

  // If live interactive preview is not available or blocked, automatically display admin banner
  if (canEmbed === false || !cleanAffiliateUrl) {
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

  // Live interactive frame (fills simple banner container with zero extra text/sections)
  return (
    <div className="w-full h-[400px] sm:h-[480px] lg:h-[550px] mb-10 rounded-2xl overflow-hidden shadow-md bg-slate-950 relative">
      {canEmbed === true && (
        <iframe
          src={cleanAffiliateUrl}
          title={casinoName || 'Casino Live Preview'}
          className="w-full h-full border-0"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
          loading="lazy"
          onError={() => setCanEmbed(false)}
        />
      )}

      {canEmbed === null && (
        featuredImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={getImageUrl(featuredImage)}
            alt={casinoName || 'Casino Banner'}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-900">
            <div className="w-8 h-8 border-3 border-white/20 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        )
      )}
    </div>
  );
}
