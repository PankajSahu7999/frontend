'use client';

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { getUserCountryCode } from '@/lib/countryDetection';

export type CurrencyType = 'USD' | 'GBP';

interface CurrencyContextType {
  countryCode: string | null;
  currency: CurrencyType;
  symbol: string;
  isUK: boolean;
  isLoading: boolean;
  formatAmount: (amount?: number | string | null, fallback?: string) => string;
  formatBonusText: (text?: string | null) => string;
}

const CurrencyContext = createContext<CurrencyContextType>({
  countryCode: null,
  currency: 'USD',
  symbol: '$',
  isUK: false,
  isLoading: true,
  formatAmount: () => '$0',
  formatBonusText: (text) => text || '',
});

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [countryCode, setCountryCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function initCountry() {
      try {
        const code = await getUserCountryCode();
        if (isMounted && code) {
          setCountryCode(code.trim().toUpperCase());
        }
      } catch (err) {
        console.warn('CurrencyProvider: failed to resolve country code', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    initCountry();
    return () => {
      isMounted = false;
    };
  }, []);

  const isUK = countryCode === 'GB' || countryCode === 'UK';
  const currency: CurrencyType = isUK ? 'GBP' : 'USD';
  const symbol = isUK ? '£' : '$';

  const formatAmount = useMemo(() => {
    return (amount?: number | string | null, fallback = ''): string => {
      if (amount === null || amount === undefined || amount === '') {
        return fallback;
      }

      // Convert to clean string
      const str = String(amount).trim();
      // Remove any existing leading currency symbols or clean up
      const numericPart = str.replace(/^[£$€₹?]+/, '').trim();
      if (!numericPart && fallback) return fallback;

      return `${symbol}${numericPart || str}`;
    };
  }, [symbol]);

  const formatBonusText = useMemo(() => {
    return (text?: string | null): string => {
      if (!text || typeof text !== 'string') return '';
      if (!isUK) return text;
      // Replace $ with £ for UK users
      return text.replace(/\$/g, '£');
    };
  }, [isUK]);

  const contextValue = useMemo(
    () => ({
      countryCode,
      currency,
      symbol,
      isUK,
      isLoading,
      formatAmount,
      formatBonusText,
    }),
    [countryCode, currency, symbol, isUK, isLoading, formatAmount, formatBonusText]
  );

  return (
    <CurrencyContext.Provider value={contextValue}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
