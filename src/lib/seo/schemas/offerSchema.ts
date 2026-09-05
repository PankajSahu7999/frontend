// src/lib/seo/schemas/offerSchema.ts

export interface CasinoBonusInput {
  id: string;
  title: string;
  type: string; // e.g. "Welcome Bonus", "Free Spins", "Cashback", "No Deposit"
  amount: string; // free-text, e.g. "100% up to $500 + 50 Free Spins"
  bonus_code?: string | null;
  wagering_requirement?: string | null;
}

export interface OfferSchemaProps {
  pageUrl: string;
  casinoName: string;
  offerUrl?: string | null; // pass casino.affiliate_url ?? casino.website_url
  bonuses: CasinoBonusInput[];
}

/**
 * Builds Offer nodes for a casino's bonuses.
 *
 * IMPORTANT — read before editing:
 * We deliberately do NOT set `price` / `priceCurrency` here. A casino bonus
 * "amount" like "100% up to $500" or "50 Free Spins" is a promotional term,
 * not a literal purchase price. Inventing a numeric price to satisfy
 * Google's Product/Offer price expectations would be fabricated structured
 * data — exactly what Google's structured-data policies prohibit, and on a
 * YMYL (gambling) site that risks a manual action against the whole domain.
 *
 * If you later have a genuinely clean numeric bonus value + currency
 * straight from your database (not guessed/regex-parsed from the text),
 * use `withExactPrice()` below on a per-offer basis. Never auto-parse
 * `amount` to fake a price.
 */
export function offerSchema({
  pageUrl,
  casinoName,
  offerUrl,
  bonuses,
}: OfferSchemaProps) {
  if (!bonuses?.length) return null;

  return bonuses.slice(0, 10).map((bonus) => ({
    "@type": "Offer",
    "@id": `${pageUrl}#offer-${bonus.id}`,

    name: bonus.title || `${casinoName} ${bonus.type ?? "Bonus"}`,

    category: bonus.type || "Casino Bonus",

    description: [
      bonus.amount,
      bonus.wagering_requirement
        ? `Wagering requirement: ${bonus.wagering_requirement}`
        : null,
      bonus.bonus_code ? `Bonus code: ${bonus.bonus_code}` : null,
    ]
      .filter(Boolean)
      .join(". "),

    url: offerUrl || pageUrl,

    seller: {
      "@type": "Organization",
      name: casinoName,
    },

    itemOffered: {
      "@type": "Service",
      name: `${casinoName} — ${bonus.title || bonus.type || "Casino Bonus"}`,
      serviceType: "Online Casino Bonus Promotion",
    },

    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },

    availability: "https://schema.org/InStock",
  }));
}

/**
 * Opt-in helper — only call this where you have a REAL numeric bonus amount
 * and ISO currency code from your own database (not parsed from free text).
 * Adds a priceSpecification to one already-built offer node.
 */
export function withExactPrice<T extends Record<string, unknown>>(
  offer: T,
  price: number,
  priceCurrency: string,
): T & { priceSpecification: object } {
  return {
    ...offer,
    priceSpecification: {
      "@type": "PriceSpecification",
      price,
      priceCurrency,
    },
  };
}
