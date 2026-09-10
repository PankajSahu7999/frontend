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
  const rawAffiliate = (affiliateUrl || '').trim();
  const cleanAffiliateUrl =
    rawAffiliate && !/^https?:\/\//i.test(rawAffiliate)
      ? `https://${rawAffiliate}`
      : rawAffiliate;

  // Initialize from client cache if already inspected during this session
  const cachedStatus = cleanAffiliateUrl ? embedStatusCache.get(cleanAffiliateUrl) : undefined;

  // Priority is to show web preview first!
  // If known to be blocked (cachedStatus === false), show banner immediately.
  // Otherwise default to true so live web preview mounts and loads first.
  const [canEmbed, setCanEmbed] = useState<boolean>(cachedStatus !== false);

  useEffect(() => {
    // If no affiliate URL, fallback to admin banner
    if (!cleanAffiliateUrl) {
      setCanEmbed(false);
      return;
    }

    // If already in client-side memory cache, use cached decision instantly
    if (embedStatusCache.has(cleanAffiliateUrl)) {
      setCanEmbed(embedStatusCache.get(cleanAffiliateUrl)!);
      return;
    }

    // Default to true (priority to show web preview first) while checking in background
    setCanEmbed(true);

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

        // Only switch to false if explicitly confirmed blocked
        const finalCanEmbed = canEmbedResult ?? true;
        embedStatusCache.set(cleanAffiliateUrl, finalCanEmbed);

        if (isMounted) {
          setCanEmbed(finalCanEmbed);
        }
      } catch {
        // In case of unexpected check error, retain web preview
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

  // If the website refuses to connect, blocks embedding, or has no affiliate URL -> show admin banner image
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

  // Live interactive frame (pure banner type container, web preview loads first)
  return (
    <div className="w-full h-[450px] sm:h-[520px] lg:h-[600px] mb-10 rounded-2xl overflow-hidden shadow-md bg-slate-950 relative">
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-0 pointer-events-none">
        <div className="w-8 h-8 border-3 border-white/20 border-t-amber-500 rounded-full animate-spin" />
        <span className="text-xs text-white/50 font-medium">Loading live preview...</span>
      </div>
      <iframe
        key={cleanAffiliateUrl}
        src={cleanAffiliateUrl}
        title={casinoName || 'Casino Live Preview'}
        className="w-full h-full border-0 relative z-10 bg-transparent"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
        loading="eager"
      />
    </div>
  );
}
