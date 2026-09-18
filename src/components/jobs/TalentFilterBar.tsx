'use client';

import React from 'react';
import { Search, X, Heart, Sparkles, Filter, Briefcase, Zap, Star } from 'lucide-react';

interface TalentFilterBarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  totalCount: number;
}

const CATEGORY_PILLS = [
  { id: 'all', label: 'All Talent' },
  { id: 'tech', label: 'Software & Tech', icon: Sparkles },
  { id: 'design', label: 'UI/UX & Design' },
  { id: 'marketing', label: 'Growth & Marketing' },
  { id: 'product', label: 'Product Leaders' },
  { id: 'finance', label: 'Finance & Accounts' },
  { id: 'immediate', label: '⚡ Immediately Available' },
  { id: 'loved', label: '❤️ Top Loved' },
];

export default function TalentFilterBar({
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory,
  sortBy,
  setSortBy,
  totalCount,
}: TalentFilterBarProps) {
  return (
    <div className="w-full space-y-4">
      {/* Search Input Bar */}
      <div className="bg-white dark:bg-surface-container-low rounded-2xl border border-gray-200/90 dark:border-outline-variant/30 shadow-sm p-2 sm:p-2.5">
        <div className="flex items-center bg-gray-50 dark:bg-surface-container rounded-xl px-4 py-2.5 border border-transparent focus-within:border-emerald-500/50 focus-within:bg-white dark:focus-within:bg-surface-container-high transition-all">
          <Search className="w-4 h-4 text-gray-400 mr-3 flex-shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by candidate name, designation (e.g. Next.js, UI/UX, Python, Accountant)..."
            className="w-full bg-transparent text-xs sm:text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Category Pills & Sort Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Horizontal Scrollable Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORY_PILLS.map((pill) => {
            const Icon = pill.icon;
            const isActive = activeCategory === pill.id;
            return (
              <button
                key={pill.id}
                type="button"
                onClick={() => setActiveCategory(pill.id)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                  isActive
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-white dark:bg-surface-container-low text-gray-700 dark:text-gray-300 border-gray-200/80 dark:border-outline-variant/30 hover:bg-gray-50 dark:hover:bg-surface-container'
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5 text-amber-300" />}
                {pill.label}
              </button>
            );
          })}
        </div>

        {/* Count & Sort Selector */}
        <div className="flex items-center justify-between sm:justify-end gap-3 flex-shrink-0 text-xs">
          <span className="text-gray-500 dark:text-gray-400 font-medium">
            <strong className="text-gray-900 dark:text-white font-bold">{totalCount}</strong> candidates available
          </span>

          <div className="flex items-center gap-1.5">
            <span className="text-gray-400">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white dark:bg-surface-container-low border border-gray-200 dark:border-outline-variant/30 text-gray-800 dark:text-gray-200 text-xs rounded-lg px-2.5 py-1 font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
            >
              <option value="loved">Most Loved ❤️</option>
              <option value="rating">Highest Rated ★</option>
              <option value="experience">Most Experienced</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
