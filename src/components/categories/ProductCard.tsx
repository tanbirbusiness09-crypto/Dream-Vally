'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Heart, 
  MapPin, 
  Star, 
  ShieldCheck, 
  MessageSquare, 
  Truck, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { CatalogProduct } from '@/lib/catalogData';

interface ProductCardProps {
  product: CatalogProduct;
  isLiked?: boolean;
  likesCount?: number;
  onToggleLike?: (productId: string, e: React.MouseEvent) => void;
}

export default function ProductCard({
  product,
  isLiked = false,
  likesCount = product.likesCount,
  onToggleLike,
}: ProductCardProps) {
  const [localLiked, setLocalLiked] = useState(isLiked);
  const [localLikes, setLocalLikes] = useState(likesCount);
  const [heartPulsing, setHeartPulsing] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setHeartPulsing(true);
    setTimeout(() => setHeartPulsing(false), 500);

    const nextLiked = !localLiked;
    setLocalLiked(nextLiked);
    setLocalLikes(prev => nextLiked ? prev + 1 : prev - 1);

    if (onToggleLike) {
      onToggleLike(product.id, e);
    }
  };

  return (
    <div className="group relative bg-white dark:bg-surface-container-low rounded-2xl sm:rounded-3xl border border-gray-200/90 dark:border-outline-variant/30 hover:border-emerald-500/60 dark:hover:border-emerald-500/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
      
      {/* 1. Image Viewport with Badges & Love Button */}
      <Link href={`/product/${product.id}`} className="relative aspect-[4/3] w-full bg-gray-100 dark:bg-surface-container overflow-hidden block">
        <Image
          src={product.images[0] || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80'}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Top Badges: Condition & Discount */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md backdrop-blur-md ${product.badge.className}`}>
              {product.badge.label}
            </span>
          )}
          <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full border border-white/20 w-max">
            {product.condition}
          </span>
        </div>

        {/* Love / Wishlist Button */}
        <button
          onClick={handleLike}
          type="button"
          aria-label="Add to wishlist"
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all active:scale-90 z-20 flex items-center gap-1 shadow-md ${
            localLiked
              ? 'bg-red-500 text-white shadow-red-500/40 ring-2 ring-white/50'
              : 'bg-black/40 hover:bg-black/60 text-white/90 hover:text-white border border-white/20'
          }`}
        >
          <Heart
            className={`w-3.5 h-3.5 transition-all ${
              localLiked ? 'fill-white text-white' : ''
            } ${heartPulsing ? 'scale-125' : 'scale-100'}`}
          />
          <span className="text-[10px] font-bold">{localLikes}</span>
        </button>

        {/* Delivery Available Badge bottom-left */}
        {product.deliveryAvailable && (
          <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 bg-white/90 dark:bg-surface-container-high/90 backdrop-blur-md text-emerald-800 dark:text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm border border-emerald-500/20">
            <Truck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
            <span>Escrow Delivery</span>
          </div>
        )}
      </Link>

      {/* 2. Product Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Location */}
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1.5">
            <span className="font-semibold text-emerald-600 dark:text-emerald-400 text-[11px] truncate max-w-[140px]">
              {product.subCategory || product.categoryName}
            </span>
            <span className="flex items-center gap-1 text-[11px]">
              <MapPin className="w-3 h-3 text-gray-400 flex-shrink-0" />
              <span className="truncate max-w-[120px]">{product.city}</span>
            </span>
          </div>

          {/* Title */}
          <Link href={`/product/${product.id}`} className="block">
            <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
              {product.title}
            </h3>
          </Link>

          {/* Pricing & Discount */}
          <div className="mt-2.5 flex items-baseline gap-2 flex-wrap">
            <span className="text-base sm:text-lg font-extrabold text-emerald-700 dark:text-emerald-400">
              {product.price}
            </span>
            {product.regularPrice && (
              <span className="text-xs text-gray-400 line-through">
                {product.regularPrice}
              </span>
            )}
            {product.savings && (
              <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-1.5 py-0.5 rounded">
                Save {product.savings.split(' ')[0]}
              </span>
            )}
          </div>
        </div>

        {/* 3. Seller Meta & Actions */}
        <div className="mt-4 pt-3 border-t border-gray-100 dark:border-outline-variant/30 flex items-center justify-between gap-2">
          {/* Seller info */}
          <div className="flex items-center gap-1.5 min-w-0">
            <div className="relative w-6 h-6 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
              <Image
                src={product.seller.avatar}
                alt={product.seller.name}
                fill
                className="object-cover"
                sizes="24px"
              />
            </div>
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate max-w-[100px]">
              {product.seller.name}
            </span>
            {product.seller.verified && (
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 text-xs font-bold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-md border border-amber-200/60 dark:border-amber-800/50 flex-shrink-0">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{product.rating}</span>
          </div>
        </div>

        {/* 4. Action Buttons (Direct Contact & View) */}
        <div className="mt-3 grid grid-cols-2 gap-2 pt-1">
          <Link
            href={`/chat?seller=${encodeURIComponent(product.seller.name)}&ad=${encodeURIComponent(product.title)}`}
            className="inline-flex items-center justify-center gap-1 bg-gray-100 dark:bg-surface-container hover:bg-gray-200 dark:hover:bg-surface-container-high text-gray-800 dark:text-gray-200 text-xs font-semibold py-2 px-2.5 rounded-xl transition-all"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            Chat
          </Link>

          <Link
            href={`/product/${product.id}`}
            className="inline-flex items-center justify-center gap-1 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold py-2 px-2.5 rounded-xl shadow-sm transition-all"
          >
            <span>View</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
