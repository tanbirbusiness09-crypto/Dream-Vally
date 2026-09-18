'use client';

import React from 'react';
import Image from 'next/image';
import { 
  Smartphone, 
  Laptop, 
  Car, 
  Home, 
  Sparkles, 
  Sofa, 
  HeartHandshake, 
  Wrench,
  ArrowRight,
  Layers
} from 'lucide-react';
import { CATALOG_CATEGORIES, CatalogCategory } from '@/lib/catalogData';

interface CategoryDirectoryGridProps {
  onSelectCategory: (categoryId: string) => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Smartphone,
  Laptop,
  Car,
  Home,
  Sparkles,
  Sofa,
  HeartHandshake,
  Wrench,
};

export default function CategoryDirectoryGrid({ onSelectCategory }: CategoryDirectoryGridProps) {
  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white">
            Explore All Categories
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Browse verified marketplace sectors across Bangladesh and Saudi Arabia
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800/40">
          <Layers className="w-3.5 h-3.5" />
          <span>8 Core Categories</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
        {CATALOG_CATEGORIES.map((cat) => {
          const Icon = ICON_MAP[cat.iconName] || Smartphone;
          return (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="group relative bg-white dark:bg-surface-container-low rounded-3xl border border-gray-200/90 dark:border-outline-variant/30 hover:border-emerald-500/60 dark:hover:border-emerald-500/60 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col cursor-pointer"
            >
              {/* Image Banner */}
              <div className="relative h-36 w-full bg-gray-100 dark:bg-surface-container overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-108 transition-transform duration-500 opacity-80"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Item Count Pill */}
                <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full border border-white/20">
                  {cat.itemCount}+ listings
                </div>

                {/* Icon Floating Badge */}
                <div className="absolute bottom-3 left-4 flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg ring-2 ring-white/50">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-white">
                    <span className="text-[10px] font-semibold text-emerald-300">{cat.bnName}</span>
                    <h3 className="text-base font-extrabold leading-tight text-white drop-shadow-sm">
                      {cat.name}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>

                {/* Subcategories tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {cat.subCategories.slice(0, 3).map((sub) => (
                    <span
                      key={sub}
                      className="text-[10px] font-medium bg-gray-100 dark:bg-surface-container text-gray-700 dark:text-gray-300 px-2.5 py-1 rounded-md border border-gray-200/60 dark:border-outline-variant/30"
                    >
                      {sub}
                    </span>
                  ))}
                  {cat.subCategories.length > 3 && (
                    <span className="text-[10px] text-gray-400 font-semibold self-center">
                      +{cat.subCategories.length - 3} more
                    </span>
                  )}
                </div>

                {/* Bottom Action */}
                <div className="pt-2 border-t border-gray-100 dark:border-outline-variant/30 flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform">
                  <span>Browse {cat.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
