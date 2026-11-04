'use client';

import { useState, useEffect } from 'react';
import { getUserCountryCode } from '@/lib/countryDetection';
import { buildAffiliateClickUrl } from '@/lib/tracking';

interface CasinoAffiliateButtonProps {
  casinoId: string;
  defaultUrl: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export default function CasinoAffiliateButton({
  casinoId,
  defaultUrl,
  className = '',
  style,
  children
}: CasinoAffiliateButtonProps) {
  const [affiliateUrl, setAffiliateUrl] = useState(defaultUrl);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAffiliateLink = async () => {
      if (!casinoId) {
        setIsLoading(false);
        return;
      }
      try {
        const countryCode = await getUserCountryCode();
        if (!countryCode) {
          setIsLoading(false);
          return;
        }
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.casinoreviewsbook.com/api';
        const res = await fetch(
          `${apiUrl}/casino-affiliate-links/casino/${encodeURIComponent(casinoId)}/country/${encodeURIComponent(countryCode)}`
        );

        if (res.ok) {
          const data = await res.json();
          if (data.affiliate_url) {
            setAffiliateUrl(data.affiliate_url);
          }
        }
      } catch (error) {
        console.warn('Error fetching affiliate link:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAffiliateLink();
  }, [casinoId, defaultUrl]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isLoading) {
      e.preventDefault();
      return;
    }

    // Generate a fresh unique click ID for every user click
    const { url } = buildAffiliateClickUrl(affiliateUrl || defaultUrl, casinoId);
    e.currentTarget.href = url;
  };

  return (
    <a
      href={affiliateUrl || defaultUrl || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      style={style}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
