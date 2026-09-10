'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import BannedPage from '@/components/BannedPage';
import TelegramJoinPopup from "@/components/modals/TelegramJoinPopup";
import { getUserCountryCode } from '@/lib/countryDetection';
import { isCrawlerOrBot } from '@/lib/crawlerDetection';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isBanned, setIsBanned] = useState(false);

  useEffect(() => {
    // Skip country check for search crawlers / bots so SEO crawling and indexing are never blocked
    if (isCrawlerOrBot()) return;

    const checkCountry = async () => {
      try {
        const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
        const baseApiUrl = rawApiUrl.replace(/\/api\/?$/, '');

        const [bannedRes, userCountryCode] = await Promise.all([
          fetch(`${baseApiUrl}/api/banned-countries`),
          getUserCountryCode(),
        ]);

        if (!bannedRes.ok) return;

        const bannedCodes: string[] = await bannedRes.json();
        const upperCode = (userCountryCode || '').toUpperCase();

        if (upperCode && Array.isArray(bannedCodes) && bannedCodes.includes(upperCode)) {
          setIsBanned(true);
        }
      } catch {
        // Silently fail - if detection fails, allow access
      }
    };

    checkCountry();
  }, []);

  if (isBanned) {
    return <BannedPage />;
  }

  return (
    <div className="min-h-screen bg-[#EEF3FE] font-sans overflow-x-hidden">
      {/* Telegram Entry Join Modal */}
      <TelegramJoinPopup />

      {/* Fixed Navbar */}
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex pt-20">
        {/* Mobile overlay backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Fixed Sidebar */}
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main Content */}
        <main
          className="
            flex-1
            min-w-0
            overflow-x-hidden
            ml-0
            lg:ml-[260px]
            px-4
            sm:px-6
            py-0
            sm:py-0
            lg:py-6
          "
        >
          {children}
          <Footer />
        </main>
      </div>
    </div>
  );
}