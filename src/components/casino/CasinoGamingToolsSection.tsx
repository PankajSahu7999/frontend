'use client';

import React from 'react';
import {
  ShieldCheck,
  Clock,
  Wallet,
  Ban,
  Hourglass,
  Sliders,
  FileText,
  HelpCircle,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

interface GamingToolsSectionProps {
  casinoName: string;
  gamingTools?: string[];
}

interface ToolDefinition {
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
}

const DEFAULT_TOOL_DEFINITIONS: Record<string, { description: string; icon: React.ReactNode }> = {
  'deposit limit': {
    description: 'Set daily, weekly, or monthly caps on how much real money you can deposit.',
    icon: <Wallet className="w-5 h-5 text-blue-600" />,
  },
  'loss limit': {
    description: 'Cap your net losses over a selected period to protect your bankroll.',
    icon: <Sliders className="w-5 h-5 text-amber-600" />,
  },
  'wager limit': {
    description: 'Restrict the total wagered turnover amount within a set timeframe.',
    icon: <Sliders className="w-5 h-5 text-indigo-600" />,
  },
  'session time limit / reality check': {
    description: 'Receive automated onscreen reminders showing your session duration and net spend.',
    icon: <Clock className="w-5 h-5 text-purple-600" />,
  },
  'session limit': {
    description: 'Receive automated onscreen reminders showing your session duration and net spend.',
    icon: <Clock className="w-5 h-5 text-purple-600" />,
  },
  'reality check': {
    description: 'Pop-up notifications summarizing playtime and balance changes at preset intervals.',
    icon: <Clock className="w-5 h-5 text-purple-600" />,
  },
  'cool-off / time-out period': {
    description: 'Take a temporary breather from 24 hours up to 6 weeks with zero marketing contact.',
    icon: <Hourglass className="w-5 h-5 text-amber-600" />,
  },
  'cool-off': {
    description: 'Take a temporary breather from 24 hours up to 6 weeks with zero marketing contact.',
    icon: <Hourglass className="w-5 h-5 text-amber-600" />,
  },
  'self-exclusion': {
    description: 'Block access to your account and casino network from 6 months up to permanently.',
    icon: <Ban className="w-5 h-5 text-rose-600" />,
  },
  'account history & statements': {
    description: 'Full transparent access to all deposits, withdrawals, and game outcome histories.',
    icon: <FileText className="w-5 h-5 text-teal-600" />,
  },
  'self-assessment test': {
    description: 'Confidential quiz to help you understand your playing habits and risk level.',
    icon: <HelpCircle className="w-5 h-5 text-sky-600" />,
  },
};

export default function CasinoGamingToolsSection({
  casinoName,
  gamingTools = [],
}: GamingToolsSectionProps) {
  // If no tools explicitly configured, use standard top player protection tools
  const toolsList =
    gamingTools.length > 0
      ? gamingTools
      : [
          'Deposit Limit',
          'Session Time Limit / Reality Check',
          'Cool-Off / Time-Out Period',
          'Self-Exclusion',
          'Account History & Statements',
          'Self-Assessment Test',
        ];

  return (
    <section className="mt-10">
      {/* Header Badge */}
      <div className="inline-flex rounded-full bg-[radial-gradient(circle_at_center,#B8CEFF_0%,#2E68FB_100%)] p-[1px]">
        <div className="flex items-center gap-1 rounded-full bg-[#E6EDFF] px-4 py-1">
          <ShieldCheck className="w-3.5 h-3.5 text-[#2E68FB]" />
          <span className="font-poppins text-[10px] font-medium uppercase text-[#2E68FB]">
            Player Protection & Safety
          </span>
        </div>
      </div>

      <h2 className="font-poppins text-[24px] font-bold leading-[24px] tracking-normal text-[#16171D] mb-3 mt-3">
        Responsible Gaming Tools at {casinoName}
      </h2>
      <p className="text-sm text-gray-500 max-w-2xl mb-6">
        Safe gambling is our highest priority. {casinoName} provides player control features directly inside your account profile to ensure your gaming remains safe, measured, and entertaining.
      </p>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {toolsList.map((toolName, idx) => {
          const lowerKey = toolName.toLowerCase().trim();
          const matched =
            DEFAULT_TOOL_DEFINITIONS[lowerKey] || {
              description: 'Configurable player protection tool available in your account settings or via live support.',
              icon: <ShieldCheck className="w-5 h-5 text-blue-600" />,
            };

          return (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition hover:shadow-md hover:border-blue-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-150 flex items-center justify-center">
                    {matched.icon}
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Available
                  </span>
                </div>

                <h3 className="font-poppins text-[16px] font-bold text-slate-900">
                  {toolName}
                </h3>
                <p className="mt-1.5 text-xs text-slate-600 leading-relaxed font-normal">
                  {matched.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>Activation</span>
                <span className="font-semibold text-slate-700">Account Dashboard</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Helpline & Resources Card */}
      <div className="mt-6 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50/70 via-indigo-50/40 to-white p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              Need free, confidential advice about gambling habits?
            </h4>
            <p className="text-xs text-slate-600 mt-0.5">
              Certified independent organizations like GamCare and Gambling Therapy offer 24/7 free helpline support.
            </p>
          </div>
        </div>

        <div className="flex gap-2 shrink-0">
          <a
            href="https://www.gamcare.org.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-blue-700 bg-white border border-blue-200 hover:bg-blue-50 transition shadow-2xs"
          >
            <span>GamCare</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="https://www.gamblingtherapy.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-indigo-700 bg-white border border-indigo-200 hover:bg-indigo-50 transition shadow-2xs"
          >
            <span>Gambling Therapy</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </section>
  );
}
