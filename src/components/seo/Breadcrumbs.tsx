import React from 'react';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import { SITE } from '@/constants';

export interface BreadcrumbItem {
  name: string;
  url?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  const siteUrl = SITE.url.replace(/\/+$/, '');

  const breadcrumbsList = [
    { name: 'Home', url: '/' },
    ...items,
  ];

  // Schema.org BreadcrumbList JSON-LD
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbsList.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url ? (item.url.startsWith('http') ? item.url : `${siteUrl}${item.url.startsWith('/') ? item.url : `/${item.url}`}`) : undefined,
    })),
  };

  return (
    <>
      {/* Schema.org BreadcrumbList structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <nav aria-label="Breadcrumb" className={`py-3 px-1 text-xs text-slate-500 overflow-x-auto ${className}`}>
        <ol className="flex items-center gap-1.5 whitespace-nowrap">
          {breadcrumbsList.map((item, index) => {
            const isLast = index === breadcrumbsList.length - 1;

            return (
              <li key={index} className="flex items-center gap-1.5">
                {index === 0 ? (
                  <Link
                    href="/"
                    className="flex items-center gap-1 font-medium text-slate-500 hover:text-blue-600 transition-colors"
                  >
                    <Home className="w-3.5 h-3.5" />
                    <span>Home</span>
                  </Link>
                ) : isLast || !item.url ? (
                  <span className="font-semibold text-slate-800 truncate max-w-[200px] sm:max-w-none" aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.url}
                    className="font-medium text-slate-500 hover:text-blue-600 transition-colors"
                  >
                    {item.name}
                  </Link>
                )}

                {!isLast && (
                  <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
