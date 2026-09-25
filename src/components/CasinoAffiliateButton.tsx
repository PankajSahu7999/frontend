'use client';

import { useState, useEffect } from 'react';
import { getUserCountryCode } from '@/lib/countryDetection';

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
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
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

  return (
    <a
      href={affiliateUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      style={style}
      onClick={(e) => {
        if (isLoading) {
          e.preventDefault();
        }
      }}
    >
      {children}
    </a>
  );
}
