'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Heart, Share2, ZoomIn, Check, ShieldCheck, Sparkles } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  title: string;
  badge?: { label: string; className: string };
  condition: string;
  likesCount: number;
}

export default function ProductGallery({
  images,
  title,
  badge,
  condition,
  likesCount,
}: ProductGalleryProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(likesCount);
  const [copiedToast, setCopiedToast] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const displayImages = images.length > 0 
    ? images 
    : ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1000&q=85'];

  const handleToggleLike = () => {
    const next = !isLiked;
    setIsLiked(next);
    setCurrentLikes((prev) => (next ? prev + 1 : prev - 1));
  };

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2500);
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* 1. Main High-Res Viewport */}
      <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full rounded-3xl overflow-hidden bg-gray-100 dark:bg-surface-container border border-gray-200/90 dark:border-outline-variant/30 shadow-md group">
        <Image
          src={displayImages[activeImageIndex]}
          alt={title}
          fill
          priority
          className={`object-cover transition-transform duration-500 cursor-zoom-in ${
            isZoomed ? 'scale-125' : 'group-hover:scale-105'
          }`}
          onClick={() => setIsZoomed(!isZoomed)}
          sizes="(max-width: 1024px) 100vw, 60vw"
        />

        {/* Top Floating Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10 pointer-events-none">
          {badge && (
            <span className={`text-xs font-bold px-3 py-1 rounded-full shadow-lg backdrop-blur-md ${badge.className}`}>
              {badge.label}
            </span>
          )}
          <span className="bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/20 w-max shadow-sm">
            {condition}
          </span>
        </div>

        {/* Top Right Actions: Share & Love */}
        <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
          {/* Share Button */}
          <button
            onClick={handleShare}
            type="button"
            aria-label="Share product"
            className="p-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md border border-white/20 transition-all active:scale-90 shadow-md relative"
            title="Copy share link"
          >
            {copiedToast ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <Share2 className="w-4 h-4" />
            )}
            {copiedToast && (
              <span className="absolute -bottom-8 right-0 bg-black/80 text-white text-[10px] font-bold px-2 py-0.5 rounded whitespace-nowrap">
                Link Copied!
              </span>
            )}
          </button>

          {/* Wishlist Love Button */}
          <button
            onClick={handleToggleLike}
            type="button"
            aria-label="Add to wishlist"
            className={`p-2.5 rounded-full backdrop-blur-md transition-all active:scale-90 flex items-center gap-1.5 shadow-md ${
              isLiked
                ? 'bg-red-500 text-white shadow-red-500/40 ring-2 ring-white/50'
                : 'bg-black/40 hover:bg-black/60 text-white border border-white/20'
            }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-white text-white' : ''}`} />
            <span className="text-xs font-bold">{currentLikes}</span>
          </button>
        </div>

        {/* Zoom Hint Icon bottom-right */}
        <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-full border border-white/15 flex items-center gap-1.5 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
          <ZoomIn className="w-3.5 h-3.5" />
          <span>Click to {isZoomed ? 'Reset' : 'Zoom'}</span>
        </div>
      </div>

      {/* 2. Thumbnail Strip */}
      {displayImages.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
          {displayImages.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setActiveImageIndex(idx);
                setIsZoomed(false);
              }}
              className={`relative h-20 w-24 sm:h-24 sm:w-28 rounded-2xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                activeImageIndex === idx
                  ? 'border-emerald-600 ring-2 ring-emerald-500/40 shadow-md scale-102'
                  : 'border-transparent opacity-70 hover:opacity-100 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <Image
                src={img}
                alt={`${title} view ${idx + 1}`}
                fill
                className="object-cover"
                sizes="112px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
