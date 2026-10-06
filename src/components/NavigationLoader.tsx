'use client';

import { useEffect, useState, useRef, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

function NavigationLoaderContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isNavigating, setIsNavigating] = useState(false);
  const [showContentLoader, setShowContentLoader] = useState(false);
  const [progress, setProgress] = useState(0);

  const loaderTimerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const safetyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // When pathname or searchParams change, route transition is finished
  useEffect(() => {
    if (isNavigating) {
      setProgress(100);
      const timer = setTimeout(() => {
        setIsNavigating(false);
        setShowContentLoader(false);
        setProgress(0);
      }, 150);

      if (loaderTimerRef.current) clearTimeout(loaderTimerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      if (safetyTimeoutRef.current) clearTimeout(safetyTimeoutRef.current);

      return () => clearTimeout(timer);
    }
  }, [pathname, searchParams]);

  const startLoading = () => {
    setIsNavigating(true);
    setProgress(20);

    // Smooth incremental progress bar
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 85) {
          if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
          return 85;
        }
        return prev + Math.floor(Math.random() * 12) + 6;
      });
    }, 120);

    // If page is ready quickly (< 350ms), content loader is never shown.
    // Only if it takes > 350ms do we show the subtle content-area indicator.
    if (loaderTimerRef.current) clearTimeout(loaderTimerRef.current);
    loaderTimerRef.current = setTimeout(() => {
      setShowContentLoader(true);
    }, 350);

    // Safety timeout: reset if navigation fails or aborts
    if (safetyTimeoutRef.current) clearTimeout(safetyTimeoutRef.current);
    safetyTimeoutRef.current = setTimeout(() => {
      setIsNavigating(false);
      setShowContentLoader(false);
      setProgress(0);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    }, 8000);
  };

  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;

      const target = (e.target as HTMLElement)?.closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (!href) return;

      if (target.target && target.target !== '_self') return;
      if (target.hasAttribute('download')) return;
      if (
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('javascript:')
      )
        return;

      try {
        const targetUrl = new URL(target.href, window.location.href);
        const currentUrl = new URL(window.location.href);

        if (targetUrl.origin !== currentUrl.origin) return;
        if (targetUrl.pathname === currentUrl.pathname && targetUrl.search === currentUrl.search) {
          return;
        }

        startLoading();
      } catch {
        // Ignore invalid URL
      }
    };

    const handlePopState = () => {
      startLoading();
    };

    const handleCustomNavStart = () => {
      startLoading();
    };

    document.addEventListener('click', handleAnchorClick, { capture: true });
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('app:navigation-start', handleCustomNavStart);

    return () => {
      document.removeEventListener('click', handleAnchorClick, { capture: true });
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('app:navigation-start', handleCustomNavStart);
      if (loaderTimerRef.current) clearTimeout(loaderTimerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      if (safetyTimeoutRef.current) clearTimeout(safetyTimeoutRef.current);
    };
  }, []);

  return (
    <>
      {/* Top Thin Progress Bar */}
      {isNavigating && (
        <div className="fixed top-0 left-0 right-0 h-[3px] z-[999999] pointer-events-none bg-transparent">
          <div
            className="h-full bg-gradient-to-r from-[#2E68FB] via-[#FF990A] to-[#2E68FB] shadow-[0_0_8px_rgba(46,104,251,0.6)]"
            style={{
              width: `${progress}%`,
              transition: progress === 100 ? 'width 100ms ease-out, opacity 150ms ease 100ms' : 'width 150ms ease-out',
            }}
          />
        </div>
      )}

      {/* Lightweight Content Area Indicator:
          Leaves Navbar (top-20) and Sidebar (lg:left-[260px]) fully visible and untouched.
          Only visible if the page takes longer than 350ms to load. */}
      {showContentLoader && (
        <div className="fixed inset-x-0 bottom-0 top-20 lg:left-[260px] z-[40] flex items-center justify-center bg-[#EEF3FE]/60 backdrop-blur-xs animate-in fade-in duration-150 pointer-events-none select-none">
          <div className="bg-white/95 border border-[#2E68FB25] shadow-lg px-4 py-2 rounded-full flex items-center gap-2.5">
            <div className="w-4 h-4 rounded-full border-2 border-blue-500/20 border-t-[#2E68FB] animate-spin shrink-0" />
            <span className="text-xs font-bold text-[#16171D]">Loading page...</span>
          </div>
        </div>
      )}
    </>
  );
}

export default function NavigationLoader() {
  return (
    <Suspense fallback={null}>
      <NavigationLoaderContent />
    </Suspense>
  );
}
