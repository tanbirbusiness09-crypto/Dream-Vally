"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Smartphone,
  Laptop,
  Car,
  Home,
  Briefcase,
  PawPrint,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Heart,
  Star,
  MapPin,
  Sparkles,
} from "lucide-react";
import type { CategoryShowcase } from "@/lib/categoryProductsData";

// Icon mapping helper
const ICON_MAP: Record<string, React.ElementType> = {
  Smartphone,
  Laptop,
  Car,
  Home,
  Briefcase,
  PawPrint,
};

interface CategoryProductSectionProps {
  showcase: CategoryShowcase;
}

export default function CategoryProductSection({ showcase }: CategoryProductSectionProps) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const IconComponent = ICON_MAP[showcase.iconName] || Sparkles;

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-10 sm:pb-12">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-3">
        <div className="flex items-start gap-3">
          <div
            className={`h-11 w-11 rounded-2xl flex items-center justify-center shrink-0 shadow-xs ${showcase.accentColor}`}
          >
            <IconComponent className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2 flex-wrap">
              <span>{showcase.title}</span>
              <span className="text-xs font-serif font-bold text-[#00895e] dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-300/40">
                {showcase.bnTitle}
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5 truncate">
              {showcase.subtitle}
            </p>
          </div>
        </div>

        {/* View All & Navigation Controls */}
        <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
          <Link
            href={showcase.viewAllPath}
            className="inline-flex items-center gap-1 text-[#00895e] dark:text-emerald-400 font-semibold text-xs sm:text-sm hover:underline"
          >
            <span>View all in {showcase.title.split(" ")[0]}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Product Cards Grid (6 Items) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
        {showcase.products.map((prod) => {
          const isFav = favorites.includes(prod.id);
          return (
            <Link
              key={prod.id}
              href={`/product/${prod.id}`}
              className="group flex flex-col rounded-2xl bg-white dark:bg-surface-container-low border border-gray-100 dark:border-white/10 shadow-[0_4px_14px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_28px_rgba(0,137,94,0.12)] hover:-translate-y-1 transition-all duration-300 p-2.5 sm:p-3 relative min-w-0"
            >
              {/* Product Image Box */}
              <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-gray-50 dark:bg-surface-container mb-2.5 flex items-center justify-center border border-gray-100 dark:border-white/5">
                <Image
                  src={prod.image}
                  alt={prod.title}
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                />

                {/* Status Badge top left */}
                {prod.badge && (
                  <span
                    className={`absolute top-2 left-2 rounded-full px-2 py-0.5 text-[9.5px] font-bold shadow-sm ${prod.badge.className}`}
                  >
                    {prod.badge.label}
                  </span>
                )}

                {/* Heart Wishlist Icon top right */}
                <button
                  type="button"
                  onClick={(e) => toggleFavorite(prod.id, e)}
                  aria-label={isFav ? "Remove from wishlist" : "Add to wishlist"}
                  className={`absolute top-2 right-2 h-7 w-7 rounded-full flex items-center justify-center backdrop-blur-xs transition-all shadow-xs cursor-pointer ${
                    isFav
                      ? "bg-rose-500 text-white scale-105"
                      : "bg-white/85 dark:bg-black/50 text-gray-400 hover:text-rose-500 hover:bg-white"
                  }`}
                >
                  <Heart className={`h-3.5 w-3.5 ${isFav ? "fill-white" : ""}`} />
                </button>
              </div>

              {/* Product Details */}
              <div className="flex-1 flex flex-col justify-between space-y-1.5 min-w-0">
                <div>
                  <h3 className="text-xs sm:text-[13px] font-bold text-gray-900 dark:text-white truncate group-hover:text-[#00895e] dark:group-hover:text-emerald-400 transition-colors">
                    {prod.title}
                  </h3>
                  
                  {/* Price */}
                  <div className="flex items-baseline gap-1.5 mt-1 flex-wrap">
                    <span className="text-xs sm:text-sm font-extrabold text-[#00895e] dark:text-emerald-400 leading-none">
                      {prod.price}
                    </span>
                    {prod.regularPrice && (
                      <span className="text-[10px] text-gray-400 line-through">
                        {prod.regularPrice}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Metadata: Location & Star Rating */}
                <div className="pt-1 border-t border-gray-100 dark:border-white/5 flex items-center justify-between text-[10.5px] text-gray-500 dark:text-gray-400 gap-1">
                  <span className="truncate flex items-center gap-0.5">
                    <MapPin className="h-3 w-3 text-gray-400 shrink-0" />
                    <span className="truncate">{prod.location.split(",")[0]}</span>
                  </span>

                  <div className="flex items-center gap-0.5 shrink-0 font-semibold text-gray-700 dark:text-gray-300">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    <span>{prod.rating}</span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
