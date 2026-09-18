'use client';

import React from 'react';
import { Search, MapPin, X, SlidersHorizontal, Sparkles, Zap } from 'lucide-react';

interface JobsFilterBarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  locationQuery: string;
  setLocationQuery: (loc: string) => void;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  totalJobsCount: number;
}

const FILTER_PILLS = [
  { id: 'all', label: 'All Jobs' },
  { id: 'easy-apply', label: 'Easy Apply', icon: Zap, iconClass: 'text-amber-500 fill-amber-500' },
  { id: 'remote', label: 'Remote' },
  { id: 'hybrid', label: 'Hybrid' },
  { id: 'tech', label: 'Tech & Engineering' },
  { id: 'full-time', label: 'Full-time' },
  { id: 'high-salary', label: '৳1.2L+ Salary' },
];

export default function JobsFilterBar({
  searchQuery,
  setSearchQuery,
  locationQuery,
  setLocationQuery,
  activeFilter,
  setActiveFilter,
  sortBy,
  setSortBy,
  totalJobsCount,
}: JobsFilterBarProps) {
  return (
    <div className="w-full space-y-3">
      {/* 1. LinkedIn Search Bar */}
      <div className="bg-white dark:bg-surface-container-low rounded-2xl border border-gray-200/90 dark:border-outline-variant/30 shadow-sm p-2">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          {/* Job Title / Skill input */}
          <div className="flex-1 flex items-center bg-gray-50 dark:bg-surface-container rounded-xl px-3 py-2.5 border border-transparent focus-within:border-emerald-500/50 focus-within:bg-white dark:focus-within:bg-surface-container-high transition-all">
            <Search className="w-4 h-4 text-gray-400 mr-2.5 flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, skill, or company..."
              className="w-full bg-transparent text-xs sm:text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="hidden sm:block w-px h-7 bg-gray-200 dark:bg-outline-variant/40" />

          {/* Location input */}
          <div className="sm:w-64 flex items-center bg-gray-50 dark:bg-surface-container rounded-xl px-3 py-2.5 border border-transparent focus-within:border-emerald-500/50 focus-within:bg-white dark:focus-within:bg-surface-container-high transition-all">
            <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mr-2.5 flex-shrink-0" />
            <input
              type="text"
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
              placeholder="City, or Remote (e.g. Dhaka)"
              className="w-full bg-transparent text-xs sm:text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
            />
            {locationQuery && (
              <button
                type="button"
                onClick={() => setLocationQuery('')}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. Filter Pills Row & Sort Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        {/* Scrollable Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none">
          {FILTER_PILLS.map((pill) => {
            const Icon = pill.icon;
            const isActive = activeFilter === pill.id;
            return (
              <button
                key={pill.id}
                type="button"
                onClick={() => setActiveFilter(pill.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                  isActive
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-white dark:bg-surface-container-low text-gray-700 dark:text-gray-300 border-gray-200/80 dark:border-outline-variant/30 hover:bg-gray-50 dark:hover:bg-surface-container'
                }`}
              >
                {Icon && <Icon className={`w-3.5 h-3.5 ${pill.iconClass || ''}`} />}
                {pill.label}
              </button>
            );
          })}
        </div>

        {/* Sort & Count */}
        <div className="flex items-center justify-between sm:justify-end gap-3 flex-shrink-0 text-xs">
          <span className="text-gray-500 dark:text-gray-400 font-medium">
            <strong className="text-gray-900 dark:text-white font-bold">{totalJobsCount}</strong> jobs found
          </span>

          <div className="flex items-center gap-1.5">
            <span className="text-gray-400">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white dark:bg-surface-container-low border border-gray-200 dark:border-outline-variant/30 text-gray-800 dark:text-gray-200 text-xs rounded-lg px-2.5 py-1 font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
            >
              <option value="recent">Most Recent</option>
              <option value="salary">Highest Salary</option>
              <option value="applicants">Least Applicants</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
