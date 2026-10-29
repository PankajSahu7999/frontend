'use client';

import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { getUserCountryCode, setManualCountry, getManualCountry } from '@/lib/countryDetection';

export type CurrencyType = 'USD' | 'GBP';

interface CurrencyContextType {
  countryCode: string | null;
  currency: CurrencyType;
  symbol: string;
  isUK: boolean;
  isLoading: boolean;
  setCountry: (code: string | null) => void;
  refreshCountry: () => Promise<void>;
  formatAmount: (amount?: number | string | null, fallback?: string) => string;
  formatBonusText: (text?: string | null) => string;
}

const CurrencyContext = createContext<CurrencyContextType>({
  countryCode: null,
  currency: 'USD',
  symbol: '$',
  isUK: false,
  isLoading: true,
  setCountry: () => {},
  refreshCountry: async () => {},
  formatAmount: () => '$0',
  formatBonusText: (text) => text || '',
});

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [countryCode, setCountryCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const resolveCountry = useCallback(async (force = false) => {
    try {
      const code = await getUserCountryCode(force);
      if (code) {
        setCountryCode(code.trim().toUpperCase());
      }
    } catch (err) {
      console.warn('CurrencyProvider: failed to resolve country code', err);
      setCountryCode('US');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    resolveCountry();
  }, [resolveCountry]);

  const setCountry = useCallback((code: string | null) => {
    if (!code || code === 'AUTO') {
      setManualCountry(null);
      resolveCountry(true);
    } else {
      const upper = code.trim().toUpperCase();
      setManualCountry(upper);
      setCountryCode(upper);
    }
  }, [resolveCountry]);

  const refreshCountry = useCallback(async () => {
    setIsLoading(true);
    await resolveCountry(true);
  }, [resolveCountry]);

  const isUK = countryCode === 'GB' || countryCode === 'UK';
  const currency: CurrencyType = isUK ? 'GBP' : 'USD';
  const symbol = isUK ? '£' : '$';

  const formatAmount = useMemo(() => {
    return (amount?: number | string | null, fallback = ''): string => {
      if (amount === null || amount === undefined || amount === '') {
        return fallback;
      }

      const str = String(amount).trim();
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
      setCountry,
      refreshCountry,
      formatAmount,
      formatBonusText,
    }),
    [countryCode, currency, symbol, isUK, isLoading, setCountry, refreshCountry, formatAmount, formatBonusText]
  );

  return (
    <CurrencyContext.Provider value={contextValue}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency(): CurrencyContextType {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
