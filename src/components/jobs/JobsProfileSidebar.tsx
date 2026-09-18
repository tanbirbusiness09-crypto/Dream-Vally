'use client';

import React from 'react';
import Image from 'next/image';
import { 
  Bookmark, 
  Send, 
  Bell, 
  FileText, 
  Eye, 
  TrendingUp, 
  Sparkles, 
  ShieldCheck, 
  Settings2,
  CheckCircle2,
  Briefcase
} from 'lucide-react';
import { CandidateProfile } from '@/lib/jobsData';

interface JobsProfileSidebarProps {
  profile: CandidateProfile;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onToggleOpenToWork: () => void;
}

export default function JobsProfileSidebar({
  profile,
  activeTab,
  setActiveTab,
  onToggleOpenToWork,
}: JobsProfileSidebarProps) {
  return (
    <aside className="w-full space-y-4">
      {/* 1. Main LinkedIn-style Profile Card */}
      <div className="bg-white dark:bg-surface-container-low rounded-2xl border border-gray-200/80 dark:border-outline-variant/30 shadow-sm overflow-hidden transition-all">
        {/* Cover Photo */}
        <div className="relative h-20 w-full bg-gradient-to-r from-emerald-800 via-teal-700 to-emerald-900">
          <Image
            src={profile.coverImage}
            alt="Cover"
            fill
            className="object-cover opacity-70"
            sizes="(max-width: 768px) 100vw, 300px"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
        </div>

        {/* Profile Avatar & Info */}
        <div className="px-4 pb-4 pt-0 relative">
          <div className="flex justify-between items-end -mt-10 mb-3">
            <div className="relative">
              <div className={`relative h-18 w-18 sm:h-20 sm:w-20 rounded-full border-4 border-white dark:border-surface-container-low shadow-md overflow-hidden ${profile.isOpenToWork ? 'ring-2 ring-emerald-500' : ''}`}>
                <Image
                  src={profile.avatar}
                  alt={profile.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              {profile.isOpenToWork && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full whitespace-nowrap shadow-sm border border-white dark:border-gray-900 flex items-center gap-0.5">
                  <Sparkles className="w-2.5 h-2.5" /> Open to Work
                </span>
              )}
            </div>

            {/* Open to Work Switch */}
            <button
              onClick={onToggleOpenToWork}
              type="button"
              className={`text-xs font-semibold px-2.5 py-1.5 rounded-full border transition-all flex items-center gap-1.5 ${
                profile.isOpenToWork
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800 hover:bg-emerald-100'
                  : 'bg-gray-100 dark:bg-surface-container text-gray-600 dark:text-gray-300 border-gray-300 dark:border-outline-variant/50 hover:bg-gray-200'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${profile.isOpenToWork ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'}`} />
              {profile.isOpenToWork ? 'Open for Jobs' : 'Not Looking'}
            </button>
          </div>

          {/* User Bio */}
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white leading-tight">
                {profile.name}
              </h2>
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 line-clamp-2 leading-relaxed font-normal">
              {profile.headline}
            </p>
            <p className="text-[11px] text-gray-400 dark:text-gray-400 mt-1">
              📍 {profile.location}
            </p>
          </div>

          {/* LinkedIn Metrics Bar */}
          <div className="mt-4 pt-3 border-t border-gray-100 dark:border-outline-variant/30 space-y-2">
            <div className="flex justify-between items-center text-xs text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer group transition-colors">
              <span className="flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-gray-400 group-hover:text-emerald-500" />
                Profile viewers
              </span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                {profile.profileViews}
              </span>
            </div>

            <div className="flex justify-between items-center text-xs text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer group transition-colors">
              <span className="flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-gray-400 group-hover:text-emerald-500" />
                Post impressions
              </span>
              <span className="font-bold text-gray-900 dark:text-white">
                {profile.postImpressions.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between items-center text-xs text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer group transition-colors">
              <span className="flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-gray-400 group-hover:text-emerald-500" />
                Search appearances
              </span>
              <span className="font-bold text-gray-900 dark:text-white">
                {profile.searchAppearances}
              </span>
            </div>
          </div>
        </div>

        {/* Profile Strength Indicator */}
        <div className="px-4 py-3 bg-gray-50/70 dark:bg-surface-container/60 border-t border-gray-100 dark:border-outline-variant/30">
          <div className="flex justify-between items-center text-xs mb-1.5">
            <span className="font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Profile Strength
            </span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">{profile.profileStrength}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-surface-container-high h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${profile.profileStrength}%` }}
            />
          </div>
          <p className="text-[10px] text-gray-400 dark:text-gray-400 mt-1">
            Excellent! Recruiters are 3.5x more likely to contact you.
          </p>
        </div>
      </div>

      {/* 2. Fast Navigation & My Job Actions */}
      <div className="bg-white dark:bg-surface-container-low rounded-2xl border border-gray-200/80 dark:border-outline-variant/30 shadow-sm p-3 space-y-1">
        <button
          onClick={() => setActiveTab('all')}
          type="button"
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
            activeTab === 'all'
              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-surface-container'
          }`}
        >
          <span className="flex items-center gap-2.5">
            <Briefcase className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            Explore Jobs
          </span>
          <span className="text-[10px] bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 px-1.5 py-0.5 rounded-full">
            All
          </span>
        </button>

        <button
          onClick={() => setActiveTab('saved')}
          type="button"
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
            activeTab === 'saved'
              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-surface-container'
          }`}
        >
          <span className="flex items-center gap-2.5">
            <Bookmark className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            My Saved Jobs
          </span>
          <span className="text-[10px] font-bold bg-gray-100 dark:bg-surface-container text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full">
            {profile.savedJobIds.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('applied')}
          type="button"
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
            activeTab === 'applied'
              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-surface-container'
          }`}
        >
          <span className="flex items-center gap-2.5">
            <Send className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            Applied Jobs
          </span>
          <span className="text-[10px] font-bold bg-gray-100 dark:bg-surface-container text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full">
            {profile.appliedJobIds.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('alerts')}
          type="button"
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
            activeTab === 'alerts'
              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-surface-container'
          }`}
        >
          <span className="flex items-center gap-2.5">
            <Bell className="w-4 h-4 text-amber-500" />
            Job Alerts
          </span>
          <span className="text-[10px] font-bold bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded-full">
            3 New
          </span>
        </button>
      </div>

      {/* 3. Job Seeker Preferences */}
      <div className="bg-white dark:bg-surface-container-low rounded-2xl border border-gray-200/80 dark:border-outline-variant/30 shadow-sm p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
            <Settings2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            Target Career
          </h3>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold cursor-pointer hover:underline">
            Edit
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {profile.targetRoles.map((role) => (
            <span
              key={role}
              className="text-[11px] font-medium bg-gray-100 dark:bg-surface-container text-gray-700 dark:text-gray-300 px-2.5 py-1 rounded-lg border border-gray-200/60 dark:border-outline-variant/40"
            >
              {role}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}
