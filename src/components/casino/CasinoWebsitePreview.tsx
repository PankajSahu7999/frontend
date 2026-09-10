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
  const cleanAffiliateUrl = (affiliateUrl || '').trim();

  const [canEmbed, setCanEmbed] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState<boolean>(Boolean(cleanAffiliateUrl));

  useEffect(() => {
    if (!cleanAffiliateUrl) {
      setCanEmbed(false);
      setIsChecking(false);
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
            setIsChecking(false);
          }
        } else {
          // If check endpoint is unreachable or 404, fallback to admin banner
          if (isMounted) {
            setCanEmbed(false);
            setIsChecking(false);
          }
        }
      } catch {
        if (isMounted) {
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

  // While checking: render the admin banner image immediately so there is zero layout shift or delay
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

  // If the website refuses to connect (X-Frame-Options: SAMEORIGIN / CSP frame-ancestors / blocked) -> SHOW BANNER IMAGE
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
        src={cleanAffiliateUrl}
        title={casinoName || 'Casino Live Preview'}
        className="w-full h-full border-0"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
        loading="eager"
        onError={() => setCanEmbed(false)}
      />
    </div>
  );
}
