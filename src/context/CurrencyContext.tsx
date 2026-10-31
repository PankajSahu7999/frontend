'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';
import {
  getUserCountryCode,
  setManualCountry,
  getManualCountry,
} from '@/lib/countryDetection';

export type CurrencyType =
  | 'USD'
  | 'GBP'
  | 'CAD'
  | 'AUD'
  | 'NZD'
  | 'EUR'
  | 'INR'
  | string;

export interface CurrencyConfig {
  code: CurrencyType;
  symbol: string;
  defaultRate: number;
}

export const COUNTRY_CURRENCY_MAP: Record<string, CurrencyConfig> = {
  CA: { code: 'CAD', symbol: 'CAD $', defaultRate: 1.3966 },
  AU: { code: 'AUD', symbol: 'AU$', defaultRate: 1.4223 },
  NZ: { code: 'NZ', symbol: 'NZ$', defaultRate: 1.7755 },
  GB: { code: 'GBP', symbol: '£', defaultRate: 0.7471 },
  UK: { code: 'GBP', symbol: '£', defaultRate: 0.7471 },
  DE: { code: 'EUR', symbol: '€', defaultRate: 0.8956 },
  IE: { code: 'EUR', symbol: '€', defaultRate: 0.8956 },
  FR: { code: 'EUR', symbol: '€', defaultRate: 0.8956 },
  ES: { code: 'EUR', symbol: '€', defaultRate: 0.8956 },
  IT: { code: 'EUR', symbol: '€', defaultRate: 0.8956 },
  NL: { code: 'EUR', symbol: '€', defaultRate: 0.8956 },
  IN: { code: 'INR', symbol: '₹', defaultRate: 95.07 },
  US: { code: 'USD', symbol: '$', defaultRate: 1.0 },
};

export const DEFAULT_CURRENCY_CONFIG: CurrencyConfig = {
  code: 'USD',
  symbol: '$',
  defaultRate: 1.0,
};

const DEFAULT_RATES: Record<string, number> = {
  USD: 1.0,
  GBP: 0.7471,
  CAD: 1.3966,
  AUD: 1.4223,
  NZD: 1.7755,
  EUR: 0.8956,
  INR: 95.07,
};

const CACHE_KEY = 'casino_exchange_rates_v1';
const CACHE_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

interface CurrencyContextType {
  countryCode: string | null;
  currency: CurrencyType;
  symbol: string;
  rate: number;
  isUK: boolean;
  isCanada: boolean;
  isAustralia: boolean;
  isNewZealand: boolean;
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
  rate: 1.0,
  isUK: false,
  isCanada: false,
  isAustralia: false,
  isNewZealand: false,
  isLoading: true,
  setCountry: () => {},
  refreshCountry: async () => {},
  formatAmount: () => '$0',
  formatBonusText: (text) => text || '',
});

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [countryCode, setCountryCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [rates, setRates] = useState<Record<string, number>>(DEFAULT_RATES);

  // 1. Resolve user location
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

  // 2. Fetch live exchange rates (with 12h localStorage cache)
  useEffect(() => {
    let isMounted = true;

    // Check cached rates
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (
          parsed.timestamp &&
          Date.now() - parsed.timestamp < CACHE_TTL_MS &&
          parsed.rates
        ) {
          setRates((prev) => ({ ...prev, ...parsed.rates }));
        }
      }
    } catch {}

    // Fetch updated live rates in background
    const fetchLiveRates = async () => {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 4000);
        const res = await fetch('https://open.er-api.com/v6/latest/USD', {
          signal: controller.signal,
        });
        clearTimeout(timeout);

        if (res.ok) {
          const data = await res.json();
          if (data && data.rates && isMounted) {
            const updated: Record<string, number> = {
              USD: 1.0,
              CAD: data.rates.CAD || DEFAULT_RATES.CAD,
              AUD: data.rates.AUD || DEFAULT_RATES.AUD,
              NZD: data.rates.NZD || DEFAULT_RATES.NZD,
              GBP: data.rates.GBP || DEFAULT_RATES.GBP,
              EUR: data.rates.EUR || DEFAULT_RATES.EUR,
              INR: data.rates.INR || DEFAULT_RATES.INR,
            };
            setRates((prev) => ({ ...prev, ...updated }));
            try {
              localStorage.setItem(
                CACHE_KEY,
                JSON.stringify({ timestamp: Date.now(), rates: updated })
              );
            } catch {}
          }
        }
      } catch {
        // Silently use defaults or cached rates on network failure
      }
    };

    fetchLiveRates();
    return () => {
      isMounted = false;
    };
  }, []);

  const setCountry = useCallback(
    (code: string | null) => {
      if (!code || code === 'AUTO') {
        setManualCountry(null);
        resolveCountry(true);
      } else {
        const upper = code.trim().toUpperCase();
        setManualCountry(upper);
        setCountryCode(upper);
      }
    },
    [resolveCountry]
  );

  const refreshCountry = useCallback(async () => {
    setIsLoading(true);
    await resolveCountry(true);
  }, [resolveCountry]);

  // Determine active config based on country
  const config = useMemo<CurrencyConfig>(() => {
    if (!countryCode) return DEFAULT_CURRENCY_CONFIG;
    return COUNTRY_CURRENCY_MAP[countryCode] || DEFAULT_CURRENCY_CONFIG;
  }, [countryCode]);

  const currency = config.code;
  const symbol = config.symbol;
  const rate = rates[currency] ?? config.defaultRate ?? 1.0;

  const isUK = countryCode === 'GB' || countryCode === 'UK';
  const isCanada = countryCode === 'CA';
  const isAustralia = countryCode === 'AU';
  const isNewZealand = countryCode === 'NZ';

  /**
   * Replace $ amounts inside promotional text with the converted target currency amount
   */
  const formatBonusText = useCallback(
    (text?: string | null): string => {
      if (!text || typeof text !== 'string') return '';
      if (currency === 'USD' && Math.abs(rate - 1.0) < 0.0001) {
        return text;
      }

      return text.replace(
        /\$\s?([0-9]{1,3}(?:,[0-9]{3})*(?:\.[0-9]+)?|[0-9]+(?:\.[0-9]+)?)/g,
        (match, numStr) => {
          const cleanNum = parseFloat(numStr.replace(/,/g, ''));
          if (isNaN(cleanNum)) return match;

          let converted: string;
          if (cleanNum < 1 && cleanNum > 0) {
            converted = (cleanNum * rate).toFixed(2);
          } else {
            converted = Math.round(cleanNum * rate).toLocaleString('en-US');
          }
          return `${symbol}${converted}`;
        }
      );
    },
    [currency, rate, symbol]
  );

  /**
   * Format any standalone number, numeric string, or existing $ amount into localized currency
   */
  const formatAmount = useCallback(
    (amount?: number | string | null, fallback = ''): string => {
      if (amount === null || amount === undefined || amount === '') {
        return fallback;
      }

      const str = String(amount).trim();
      // Strip leading currency prefixes like $, £, €, ₹, CAD $, AU$, NZ$
      const cleanStr = str
        .replace(/^([£$€₹]|CAD\s?\$?|AU\s?\$?|NZ\s?\$?)+/i, '')
        .trim();
      const numeric = parseFloat(cleanStr.replace(/,/g, ''));

      if (isNaN(numeric)) {
        return formatBonusText(str) || fallback || str;
      }

      let converted: string;
      if (numeric < 1 && numeric > 0) {
        converted = (numeric * rate).toFixed(2);
      } else {
        converted = Math.round(numeric * rate).toLocaleString('en-US');
      }
      return `${symbol}${converted}`;
    },
    [rate, symbol, formatBonusText]
  );

  const contextValue = useMemo(
    () => ({
      countryCode,
      currency,
      symbol,
      rate,
      isUK,
      isCanada,
      isAustralia,
      isNewZealand,
      isLoading,
      setCountry,
      refreshCountry,
      formatAmount,
      formatBonusText,
    }),
    [
      countryCode,
      currency,
      symbol,
      rate,
      isUK,
      isCanada,
      isAustralia,
      isNewZealand,
      isLoading,
      setCountry,
      refreshCountry,
      formatAmount,
      formatBonusText,
    ]
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
