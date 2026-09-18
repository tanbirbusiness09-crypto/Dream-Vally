'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Building2, 
  Plus, 
  Check, 
  Bell, 
  Sparkles, 
  FileText, 
  TrendingUp, 
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { TOP_HIRING_COMPANIES, HiringCompany } from '@/lib/jobsData';

export default function JobsRightSidebar() {
  const [companies, setCompanies] = useState<HiringCompany[]>(TOP_HIRING_COMPANIES);
  const [alertSubscribed, setAlertSubscribed] = useState(false);

  const toggleFollow = (companyId: string) => {
    setCompanies((prev) =>
      prev.map((c) =>
        c.id === companyId ? { ...c, isFollowing: !c.isFollowing } : c
      )
    );
  };

  return (
    <aside className="w-full space-y-4">
      {/* 1. Job Seeker Career Guidance */}
      <div className="bg-white dark:bg-surface-container-low rounded-2xl border border-gray-200/80 dark:border-outline-variant/30 shadow-sm p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
            Job Seeker Guidance
          </h3>
        </div>

        <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
          Explore our handpicked tools to prepare for tech interviews and boost your recruiter reach.
        </p>

        <div className="mt-3 space-y-2">
          <button
            type="button"
            onClick={() => alert("Resume Review tool opened!")}
            className="w-full flex items-center justify-between p-2.5 rounded-xl bg-gray-50 dark:bg-surface-container hover:bg-emerald-50 dark:hover:bg-emerald-950/30 text-xs font-semibold text-gray-800 dark:text-gray-200 transition-colors group"
          >
            <span className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Free AI Resume Review
            </span>
            <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-emerald-600" />
          </button>

          <button
            type="button"
            onClick={() => alert("Interview Preparation guide opened!")}
            className="w-full flex items-center justify-between p-2.5 rounded-xl bg-gray-50 dark:bg-surface-container hover:bg-emerald-50 dark:hover:bg-emerald-950/30 text-xs font-semibold text-gray-800 dark:text-gray-200 transition-colors group"
          >
            <span className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Salary Trends 2026
            </span>
            <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-emerald-600" />
          </button>
        </div>
      </div>

      {/* 2. Top Companies Hiring in Bangladesh */}
      <div className="bg-white dark:bg-surface-container-low rounded-2xl border border-gray-200/80 dark:border-outline-variant/30 shadow-sm p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            Top Hiring Companies
          </h3>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold cursor-pointer hover:underline">
            View all
          </span>
        </div>

        <div className="divide-y divide-gray-100 dark:divide-outline-variant/20">
          {companies.map((company) => (
            <div key={company.id} className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-2.5">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="relative h-9 w-9 rounded-xl border border-gray-100 dark:border-outline-variant/40 bg-gray-50 overflow-hidden flex-shrink-0">
                  <Image
                    src={company.logo}
                    alt={company.name}
                    fill
                    className="object-cover"
                    sizes="36px"
                  />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white truncate">
                    {company.name}
                  </h4>
                  <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                    {company.openRoles} open positions
                  </p>
                </div>
              </div>

              {/* Follow Button */}
              <button
                type="button"
                onClick={() => toggleFollow(company.id)}
                className={`text-[11px] font-bold px-2.5 py-1 rounded-full border transition-all flex items-center gap-1 flex-shrink-0 ${
                  company.isFollowing
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                    : 'bg-white dark:bg-surface-container hover:bg-gray-100 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-outline-variant/50'
                }`}
              >
                {company.isFollowing ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" /> Following
                  </>
                ) : (
                  <>
                    <Plus className="w-3 h-3 text-gray-600" /> Follow
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Job Alert Card */}
      <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-emerald-950 text-white rounded-2xl p-4 shadow-sm relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-emerald-300" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">Job Alert</span>
          </div>
          <h4 className="text-sm font-bold text-white leading-snug">
            Get instant alerts for &quot;Frontend Engineer&quot; jobs
          </h4>
          <p className="text-[11px] text-emerald-100/80 leading-relaxed">
            Never miss an opening. Receive daily curated matches straight to your inbox.
          </p>

          <button
            type="button"
            onClick={() => setAlertSubscribed(!alertSubscribed)}
            className={`w-full text-xs font-bold py-2 rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 ${
              alertSubscribed
                ? 'bg-emerald-400 text-emerald-950'
                : 'bg-emerald-500 hover:bg-emerald-400 text-white'
            }`}
          >
            {alertSubscribed ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" /> Alert Activated!
              </>
            ) : (
              <>
                <Bell className="w-3.5 h-3.5" /> Turn On Job Alert
              </>
            )}
          </button>
        </div>
      </div>

      {/* 4. Mini LinkedIn-style footer */}
      <div className="px-2 text-[11px] text-gray-400 dark:text-gray-500 space-y-2">
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          <span className="hover:underline cursor-pointer">About</span>
          <span className="hover:underline cursor-pointer">Accessibility</span>
          <span className="hover:underline cursor-pointer">Help Center</span>
          <span className="hover:underline cursor-pointer">Privacy & Terms</span>
          <span className="hover:underline cursor-pointer">Ad Choices</span>
        </div>
        <p className="text-[10px]">
          Dreamvally Career Platform © 2026. All rights reserved.
        </p>
      </div>
    </aside>
  );
}
