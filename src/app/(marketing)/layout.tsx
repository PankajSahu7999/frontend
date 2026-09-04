'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import BannedPage from '@/components/BannedPage';
import GlobalLoader from "@/components/GlobalLoader";
import TelegramJoinPopup from "@/components/modals/TelegramJoinPopup";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isBanned, setIsBanned] = useState(false);
  const [checking, setChecking] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
 useEffect(() => {
  const checkCountry = async () => {
    try {
      await Promise.all([
        new Promise((resolve) => setTimeout(resolve, 1000)), // Show loader for at least 3 seconds

        (async () => {
          const [bannedRes, ipRes] = await Promise.all([
            fetch(`${API_URL}/api/banned-countries`),
            fetch('https://ipapi.co/json/'),
          ]);

          if (!bannedRes.ok || !ipRes.ok) return;

          const bannedCodes: string[] = await bannedRes.json();
          const ipData = await ipRes.json();

          const userCountryCode = (
            ipData.country_code ||
            ipData.countryCode ||
            ''
          ).toUpperCase();

          if (bannedCodes.includes(userCountryCode)) {
            setIsBanned(true);
          }
        })(),
      ]);
    } catch {
      // Silently fail - if detection fails, allow access
    } finally {
      setChecking(false);
    }
  };

  checkCountry();
}, [API_URL]);

 if (checking) {
  return <GlobalLoader />;
}
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