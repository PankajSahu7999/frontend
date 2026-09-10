'use client';

import React, { useState, useEffect } from 'react';
import { getImageUrl } from '@/lib/utils/getImageUrl';

interface CasinoWebsitePreviewProps {
  affiliateUrl?: string | null;
  featuredImage?: string | null;
  casinoName?: string;
}

// In-memory cache across client navigations to prevent re-fetching and state bleed
const embedStatusCache = new Map<string, boolean>();

export default function CasinoWebsitePreview({
  affiliateUrl,
  featuredImage,
  casinoName = 'Casino',
}: CasinoWebsitePreviewProps) {
  const cleanAffiliateUrl = (affiliateUrl || '').trim();

  // Initialize from client cache if already inspected during this session
  const cachedStatus = cleanAffiliateUrl ? embedStatusCache.get(cleanAffiliateUrl) : undefined;

  const [canEmbed, setCanEmbed] = useState<boolean | null>(
    cachedStatus !== undefined ? cachedStatus : null
  );
  const [isChecking, setIsChecking] = useState<boolean>(
    Boolean(cleanAffiliateUrl) && cachedStatus === undefined
  );

  useEffect(() => {
    // If no affiliate URL, immediately fallback to admin banner
    if (!cleanAffiliateUrl) {
      setCanEmbed(false);
      setIsChecking(false);
      return;
    }

    // If already in client-side memory cache, use cached decision instantly
    if (embedStatusCache.has(cleanAffiliateUrl)) {
      const cached = embedStatusCache.get(cleanAffiliateUrl)!;
      setCanEmbed(cached);
      setIsChecking(false);
      return;
    }

    setCanEmbed(null);
    setIsChecking(true);

    let isMounted = true;

    const checkEmbeddable = async () => {
      try {
        let canEmbedResult: boolean | null = null;

        // Priority 1: Check internal Next.js frontend route /api/check-frame
        try {
          const localRes = await fetch(
            `/api/check-frame?url=${encodeURIComponent(cleanAffiliateUrl)}`,
            { cache: 'no-store' }
          );
          if (localRes.ok) {
            const data = await localRes.json();
            if (typeof data.canEmbed === 'boolean') {
              canEmbedResult = data.canEmbed;
            }
          }
        } catch {
          // Local endpoint not reachable, proceed to backend fallback
        }

        // Priority 2: Fallback to backend API check-frame if local route was unreachable
        if (canEmbedResult === null) {
          try {
            const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
            const baseApiUrl = rawApiUrl.replace(/\/api\/?$/, '');
            const backendRes = await fetch(
              `${baseApiUrl}/api/check-frame?url=${encodeURIComponent(cleanAffiliateUrl)}`,
              { cache: 'no-store' }
            );
            if (backendRes.ok) {
              const data = await backendRes.json();
              if (typeof data.canEmbed === 'boolean') {
                canEmbedResult = data.canEmbed;
              }
            }
          } catch {
            // Backend endpoint also not reachable
          }
        }

        const finalCanEmbed = canEmbedResult ?? false;
        embedStatusCache.set(cleanAffiliateUrl, finalCanEmbed);

        if (isMounted) {
          setCanEmbed(finalCanEmbed);
          setIsChecking(false);
        }
      } catch {
        if (isMounted) {
          embedStatusCache.set(cleanAffiliateUrl, false);
          setCanEmbed(false);
          setIsChecking(false);
        }
      }
    };

    checkEmbeddable();

    return () => {
      isMounted = false;
    };
  }, [cleanAffiliateUrl]);

  // If neither affiliate URL nor featured image exists
  if (!cleanAffiliateUrl && !featuredImage) {
    return null;
  }

  // While checking: render admin banner image so there is zero layout flicker
  if (isChecking) {
    if (featuredImage) {
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
    return (
      <div className="w-full h-[360px] sm:h-[450px] mb-10 rounded-2xl overflow-hidden shadow-sm bg-slate-900 flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-white/20 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  // If the website refuses to connect or blocks embedding -> show admin banner image
  if (!canEmbed || !cleanAffiliateUrl) {
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

  // Live interactive frame (pure banner type, zero text, zero sections)
  return (
    <div className="w-full h-[450px] sm:h-[520px] lg:h-[600px] mb-10 rounded-2xl overflow-hidden shadow-md bg-slate-950 relative">
      <iframe
        key={cleanAffiliateUrl}
        src={cleanAffiliateUrl}
        title={casinoName || 'Casino Live Preview'}
        className="w-full h-full border-0"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
        loading="eager"
      />
    </div>
  );
}
