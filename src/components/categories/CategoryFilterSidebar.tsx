'use client';

import React from 'react';
import { 
  Filter, 
  RotateCcw, 
  MapPin, 
  Check, 
  ShieldCheck, 
  Truck, 
  DollarSign, 
  Tag, 
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { CATALOG_CATEGORIES } from '@/lib/catalogData';

interface CategoryFilterSidebarProps {
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedLocation: string;
  setSelectedLocation: (loc: string) => void;
  selectedCondition: string[];
  toggleCondition: (cond: string) => void;
  verifiedOnly: boolean;
  setVerifiedOnly: (val: boolean) => void;
  deliveryOnly: boolean;
  setDeliveryOnly: (val: boolean) => void;
  minPrice: string;
  setMinPrice: (val: string) => void;
  maxPrice: string;
  setMaxPrice: (val: string) => void;
  onReset: () => void;
  totalFiltered: number;
}

const LOCATIONS = [
  { id: 'all', label: 'All Locations (BD & SA)' },
  { id: 'Dhaka', label: 'Dhaka, Bangladesh' },
  { id: 'Chattogram', label: 'Chattogram, Bangladesh' },
  { id: 'Sylhet', label: 'Sylhet, Bangladesh' },
  { id: 'Riyadh', label: 'Riyadh, Saudi Arabia' },
  { id: 'Jeddah', label: 'Jeddah, Saudi Arabia' },
];

const CONDITIONS = [
  { id: 'Brand New', label: 'Brand New' },
  { id: 'Like New', label: 'Like New' },
  { id: 'Used', label: 'Used / Pre-Owned' },
];

export default function CategoryFilterSidebar({
  selectedCategory,
  setSelectedCategory,
  selectedLocation,
  setSelectedLocation,
  selectedCondition,
  toggleCondition,
  verifiedOnly,
  setVerifiedOnly,
  deliveryOnly,
  setDeliveryOnly,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  onReset,
  totalFiltered,
}: CategoryFilterSidebarProps) {
  return (
    <aside className="w-full lg:w-72 flex-shrink-0 space-y-5">
      <div className="bg-white dark:bg-surface-container-low rounded-3xl border border-gray-200/90 dark:border-outline-variant/30 p-5 shadow-sm space-y-6 sticky top-24">
        
        {/* Header with Results & Reset */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-outline-variant/30">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">Smart Filters</h3>
          </div>
          <button
            onClick={onReset}
            type="button"
            className="inline-flex items-center gap-1 text-[11px] font-bold text-gray-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        </div>

        {/* 1. Category Selector */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            Categories
          </label>
          <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`w-full text-left flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === 'all'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-surface-container'
              }`}
            >
              <span>All Categories</span>
              <span className="text-[10px] opacity-80">All</span>
            </button>

            {CATALOG_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full text-left flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-surface-container'
                  }`}
                >
                  <span className="truncate">{cat.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-gray-100 dark:bg-surface-container text-gray-500'
                  }`}>
                    {cat.itemCount}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Location Filter */}
        <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-outline-variant/30">
          <label className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            Location (BD & KSA)
          </label>
          <div className="relative">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full bg-gray-50 dark:bg-surface-container border border-gray-200 dark:border-outline-variant/40 rounded-xl px-3 py-2.5 text-xs font-semibold text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer appearance-none"
            >
              {LOCATIONS.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-3 pointer-events-none" />
          </div>
        </div>

        {/* 3. Condition Checkboxes */}
        <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-outline-variant/30">
          <label className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            Item Condition
          </label>
          <div className="space-y-1.5">
            {CONDITIONS.map((cond) => {
              const isChecked = selectedCondition.includes(cond.id);
              return (
                <button
                  key={cond.id}
                  type="button"
                  onClick={() => toggleCondition(cond.id)}
                  className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-surface-container transition-all text-xs text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-4 h-4 rounded-md flex items-center justify-center border transition-all ${
                      isChecked
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-surface-container'
                    }`}>
                      {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">{cond.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Price Range */}
        <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-outline-variant/30">
          <label className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            Price Range (৳)
          </label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <input
                type="number"
                placeholder="Min ৳"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full bg-gray-50 dark:bg-surface-container border border-gray-200 dark:border-outline-variant/40 rounded-xl px-3 py-2 text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
            <div>
              <input
                type="number"
                placeholder="Max ৳"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full bg-gray-50 dark:bg-surface-container border border-gray-200 dark:border-outline-variant/40 rounded-xl px-3 py-2 text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* 5. Trust & Escrow Toggles */}
        <div className="space-y-3 pt-2 border-t border-gray-100 dark:border-outline-variant/30">
          {/* Verified Seller Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <div>
                <p className="text-xs font-bold text-gray-900 dark:text-white">Verified Sellers</p>
                <p className="text-[10px] text-gray-400">100% ID inspected</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setVerifiedOnly(!verifiedOnly)}
              className={`w-10 h-6 rounded-full transition-colors relative ${
                verifiedOnly ? 'bg-emerald-600' : 'bg-gray-200 dark:bg-surface-container-high'
              }`}
            >
              <span className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                verifiedOnly ? 'translate-x-5' : 'translate-x-1'
              }`} />
            </button>
          </div>

          {/* Delivery Available Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <div>
                <p className="text-xs font-bold text-gray-900 dark:text-white">Escrow Delivery</p>
                <p className="text-[10px] text-gray-400">Cash on delivery</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setDeliveryOnly(!deliveryOnly)}
              className={`w-10 h-6 rounded-full transition-colors relative ${
                deliveryOnly ? 'bg-emerald-600' : 'bg-gray-200 dark:bg-surface-container-high'
              }`}
            >
              <span className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                deliveryOnly ? 'translate-x-5' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </div>

        {/* Results summary in sidebar */}
        <div className="pt-2 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
            Showing <strong className="text-emerald-600 dark:text-emerald-400 font-bold">{totalFiltered}</strong> listings
          </p>
        </div>

      </div>
    </aside>
  );
}
