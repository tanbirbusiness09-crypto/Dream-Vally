'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Heart, 
  MapPin, 
  Star, 
  Sparkles, 
  ShieldCheck, 
  Briefcase, 
  ExternalLink,
  Eye,
  CheckCircle2
} from 'lucide-react';
import { TalentProfile } from '@/lib/talentData';

interface TalentCardProps {
  talent: TalentProfile;
  isLiked: boolean;
  likesCount: number;
  onToggleLike: (talentId: string, e: React.MouseEvent) => void;
  onViewProfile: (talent: TalentProfile, e?: React.MouseEvent) => void;
  onHire: (talent: TalentProfile, e: React.MouseEvent) => void;
}

export default function TalentCard({
  talent,
  isLiked,
  likesCount,
  onToggleLike,
  onViewProfile,
  onHire,
}: TalentCardProps) {
  const [animatingHeart, setAnimatingHeart] = useState(false);

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAnimatingHeart(true);
    setTimeout(() => setAnimatingHeart(false), 600);
    onToggleLike(talent.id, e);
  };

  return (
    <div 
      onClick={(e) => onViewProfile(talent, e)}
      className="group bg-white dark:bg-surface-container-low rounded-3xl border border-gray-200/90 dark:border-outline-variant/30 hover:border-emerald-500/60 dark:hover:border-emerald-500/60 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col cursor-pointer"
    >
      {/* 1. Cover Photo & Top Badges */}
      <div className="relative h-28 w-full bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-950 overflow-hidden">
        <Image
          src={talent.coverImage}
          alt={talent.name}
          fill
          className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/70" />

        {/* Availability Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1 bg-black/50 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full border border-white/20">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          {talent.availability}
        </div>

        {/* Love / Like Button on Banner */}
        <button
          onClick={handleHeartClick}
          type="button"
          aria-label="Give Love"
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all active:scale-90 flex items-center gap-1.5 shadow-md ${
            isLiked
              ? 'bg-red-500/90 text-white shadow-red-500/30 ring-2 ring-white/50'
              : 'bg-black/40 hover:bg-black/60 text-white/90 hover:text-white border border-white/20'
          }`}
        >
          <Heart
            className={`w-4 h-4 transition-all ${
              isLiked ? 'fill-white text-white' : ''
            } ${animatingHeart ? 'scale-125' : 'scale-100'}`}
          />
          <span className="text-[11px] font-bold">{likesCount}</span>
        </button>
      </div>

      {/* 2. Avatar & Identity Section */}
      <div className="px-5 pt-0 pb-5 flex-1 flex flex-col">
        <div className="flex justify-between items-end -mt-10 mb-3">
          {/* Avatar with Open to Work Ring */}
          <div className="relative">
            <div className="relative h-20 w-20 rounded-2xl border-4 border-white dark:border-surface-container-low shadow-md overflow-hidden bg-gray-100 dark:bg-surface-container ring-2 ring-emerald-500">
              <Image
                src={talent.avatar}
                alt={talent.name}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>
            {talent.isOpenToWork && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap shadow-sm border border-white dark:border-gray-900 flex items-center gap-0.5">
                <Sparkles className="w-2.5 h-2.5 text-amber-300" /> Open to Work
              </span>
            )}
          </div>

          {/* Rating Badge */}
          <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 text-xs font-bold px-2.5 py-1 rounded-xl">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{talent.rating}</span>
            <span className="text-[10px] text-gray-400 dark:text-gray-500">({talent.reviewsCount})</span>
          </div>
        </div>

        {/* Name & Headline */}
        <div>
          <div className="flex items-center gap-1.5">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              {talent.name}
            </h3>
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
          </div>
          <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mt-0.5">
            {talent.title}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 line-clamp-2 leading-relaxed font-normal">
            {talent.headline}
          </p>
        </div>

        {/* Location & Preference & Rate */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs border-t border-gray-100 dark:border-outline-variant/30 pt-3">
          <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
            <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
            <span className="truncate max-w-[150px]">{talent.location}</span>
          </span>

          <span className="font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-200/60 dark:border-emerald-800/50">
            💰 {talent.rateOrSalary}
          </span>
        </div>

        {/* Skill Pills */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {talent.skills.slice(0, 4).map((skill) => (
            <span
              key={skill}
              className="text-[10px] font-medium bg-gray-100 dark:bg-surface-container text-gray-700 dark:text-gray-300 px-2.5 py-1 rounded-md border border-gray-200/60 dark:border-outline-variant/30"
            >
              {skill}
            </span>
          ))}
          {talent.skills.length > 4 && (
            <span className="text-[10px] text-gray-400 font-medium self-center">
              +{talent.skills.length - 4} more
            </span>
          )}
        </div>

        {/* Action Buttons: View Profile & Hire */}
        <div className="mt-5 pt-3 border-t border-gray-100 dark:border-outline-variant/30 flex items-center gap-2.5">
          {/* View Profile */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewProfile(talent, e);
            }}
            type="button"
            className="flex-1 inline-flex items-center justify-center gap-1.5 bg-gray-100 dark:bg-surface-container hover:bg-gray-200 dark:hover:bg-surface-container-high text-gray-800 dark:text-gray-200 text-xs font-bold py-2.5 px-3 rounded-xl transition-all"
          >
            <Eye className="w-3.5 h-3.5" />
            View Profile
          </button>

          {/* Hire Me */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onHire(talent, e);
            }}
            type="button"
            className="flex-1 inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold py-2.5 px-3 rounded-xl shadow-md transition-all"
          >
            <Briefcase className="w-3.5 h-3.5" />
            Hire Me
          </button>
        </div>
      </div>
    </div>
  );
}
