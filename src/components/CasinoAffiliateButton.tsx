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
      try {
        const countryCode = await getUserCountryCode();
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/casino-affiliate-links/casino/${casinoId}/country/${countryCode}`
        );

        if (res.ok) {
          const data = await res.json();
          if (data.affiliate_url) {
            setAffiliateUrl(data.affiliate_url);
          }
        }
      } catch (error) {
        console.error('Error fetching affiliate link:', error);
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
