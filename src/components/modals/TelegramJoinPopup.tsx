'use client';

import React, { useState, useEffect } from 'react';
import { Send, X, Gift, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';

export default function TelegramJoinPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show popup shortly after landing if not dismissed in the current session
    const isDismissed = sessionStorage.getItem('crb_telegram_dismissed');
    if (!isDismissed) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1200); // 1.2 second smooth entry delay

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('crb_telegram_dismissed', 'true');
  };

  const handleJoin = () => {
    sessionStorage.setItem('crb_telegram_dismissed', 'true');
    window.open('https://t.me/casinoreviewsbook', '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-blue-100 animate-in zoom-in-95 duration-300"
        style={{
          boxShadow: '0 25px 50px -12px rgba(46, 104, 251, 0.25)',
        }}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors"
          aria-label="Close Telegram Popup"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Hero Gradient */}
        <div 
          className="relative px-6 pt-8 pb-6 text-center text-white"
          style={{
            background: 'linear-gradient(135deg, #0088cc 0%, #2E68FB 50%, #1a4cd8 100%)',
          }}
        >
          {/* Telegram Icon Circle */}
          <div className="mx-auto w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-lg mb-3">
            <Send className="w-8 h-8 text-white -translate-x-0.5 translate-y-0.5" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-bold tracking-wide uppercase mb-2 border border-white/25">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            VIP Community Access
          </div>

          <h3 className="text-2xl font-extrabold text-white tracking-tight">
            Join Our Telegram!
          </h3>
          <p className="text-blue-100 text-xs mt-1 max-w-xs mx-auto">
            Get instant access to exclusive no-deposit bonuses, secret promo codes, and daily crypto giveaways.
          </p>
        </div>

        {/* Benefits List */}
        <div className="p-6 space-y-3">
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <Gift className="w-4 h-4" />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-slate-800">Exclusive VIP Promo Codes</p>
              <p className="text-[11px] text-slate-500">Unlocks bonuses not available anywhere else</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-slate-800">Instant Alert &amp; Scam Warnings</p>
              <p className="text-[11px] text-slate-500">Real-time alerts on new verified casino launches</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 space-y-2">
            <button
              onClick={handleJoin}
              className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 transition-all hover:brightness-105 active:scale-[0.99]"
              style={{
                background: 'linear-gradient(90deg, #0088cc 0%, #2E68FB 100%)',
              }}
            >
              <Send className="w-4 h-4" />
              <span>Join Telegram Now — It&apos;s Free</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={handleClose}
              className="w-full py-2 text-xs font-semibold text-slate-400 hover:text-slate-600 text-center transition-colors"
            >
              Maybe later
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
