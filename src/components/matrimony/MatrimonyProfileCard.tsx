"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Heart,
  ShieldCheck,
  MapPin,
  Briefcase,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";
import type { MatrimonyProfile } from "@/lib/matrimonyData";

interface MatrimonyProfileCardProps {
  profile: MatrimonyProfile;
  isFavorited: boolean;
  onToggleFavorite: (id: string) => void;
  isInterestSent: boolean;
  onSendInterest: (id: string) => void;
  onViewBiodata: (profile: MatrimonyProfile) => void;
}

export default function MatrimonyProfileCard({
  profile,
  isFavorited,
  onToggleFavorite,
  isInterestSent,
  onSendInterest,
  onViewBiodata,
}: MatrimonyProfileCardProps) {
  const [isPhotoBlurred, setIsPhotoBlurred] = useState(false);

  return (
    <div
      onClick={() => onViewBiodata(profile)}
      className="group relative aspect-[3/4] sm:aspect-[4/5] w-full rounded-3xl overflow-hidden bg-gray-950 border-2 border-emerald-950/20 dark:border-emerald-500/20 hover:border-[#D4AF37] shadow-[0_6px_25px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)] transition-all duration-500 cursor-pointer select-none"
    >
      
      {/* 1. FULL-BLEED PORTRAIT BACKGROUND PHOTO */}
      <Image
        src={profile.image}
        alt={profile.name}
        fill
        unoptimized
        className={`object-cover object-center transition-transform duration-700 group-hover:scale-105 ${
          isPhotoBlurred ? "blur-2xl scale-110" : ""
        }`}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />

      {/* Ambient Dark Bottom Gradient for Name Legibility in Default State */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-opacity duration-300 group-hover:opacity-40 pointer-events-none" />

      {/* 2. TOP HEADER BAR: Profile Code & Privacy Blur Button */}
      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 z-10">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10.5px] font-black bg-[#064e3b]/90 text-[#D4AF37] shadow-sm backdrop-blur-md border border-[#D4AF37]/50">
            <Sparkles className="h-3 w-3 fill-[#D4AF37]" />
            <span>{profile.code}</span>
          </span>

          {profile.isKsaExpat && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/90 text-white backdrop-blur-md shadow-sm">
              <span>🇸🇦 KSA Expat</span>
            </span>
          )}
        </div>

        {/* Privacy Blur Eye Toggle */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsPhotoBlurred(!isPhotoBlurred);
          }}
          title={isPhotoBlurred ? "Show Photo" : "Privacy Blur Photo"}
          className="h-8 w-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md transition-all shadow-sm cursor-pointer"
        >
          {isPhotoBlurred ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
        </button>
      </div>

      {/* 3. DEFAULT STATE (NO HOVER): ONLY CANDIDATE NAME & MINIMAL DETAILS DISPLAYED */}
      <div className="absolute bottom-4 left-4 right-4 z-10 transition-all duration-300 group-hover:opacity-0 group-hover:translate-y-3 pointer-events-none space-y-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-display text-xl sm:text-2xl font-black text-white drop-shadow-md truncate">
            {profile.name}
          </h3>
          {profile.verified && (
            <span className="shrink-0 flex items-center gap-1 text-[10.5px] font-bold text-emerald-300 bg-[#064e3b]/85 border border-emerald-400/50 px-2 py-0.5 rounded-full shadow-xs">
              <ShieldCheck className="h-3 w-3" />
              <span>Verified</span>
            </span>
          )}
        </div>
        <p className="text-xs text-emerald-200/90 font-medium drop-shadow-xs truncate">
          {profile.age} yrs • {profile.profession}
        </p>
      </div>

      {/* 4. HOVER STATE: FULL BIODATA, BIO QUOTE, LOVE & CONTACT BUTTONS SLIDE-UP OVERLAY */}
      <div
        className="absolute inset-0 z-20 flex flex-col justify-end p-4 sm:p-5 bg-gradient-to-t from-black/95 via-[#06241b]/95 to-black/65 backdrop-blur-md translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out space-y-3"
      >
        
        {/* Profile Header in Hover Card */}
        <div className="space-y-0.5">
          <div className="flex items-center justify-between gap-1">
            <h3 className="font-display text-lg sm:text-xl font-black text-white truncate">
              {profile.name}
            </h3>
            <span className="text-[10.5px] font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-400/30 px-2 py-0.5 rounded-full shrink-0">
              {profile.gender === "bride" ? "👰 Bride" : "🤵 Groom"}
            </span>
          </div>
          <p className="text-xs font-semibold text-[#D4AF37]">
            {profile.age} yrs • {profile.height} • {profile.religion} {profile.sect ? `(${profile.sect})` : ""}
          </p>
        </div>

        {/* Biodata Credentials List */}
        <div className="space-y-1 text-xs text-gray-200">
          <div className="flex items-center gap-2 font-bold truncate">
            <Briefcase className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
            <span className="truncate">{profile.profession}</span>
          </div>
          <div className="flex items-center gap-2 font-medium text-gray-300 truncate">
            <GraduationCap className="h-3.5 w-3.5 text-[#D4AF37] shrink-0" />
            <span className="truncate">{profile.education}</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-gray-300 truncate">
            <MapPin className="h-3.5 w-3.5 text-rose-400 shrink-0" />
            <span className="truncate">{profile.location} ({profile.district})</span>
          </div>
        </div>

        {/* Short Bio Quote */}
        <p className="text-[11px] text-gray-300 italic line-clamp-2 bg-white/10 p-2.5 rounded-xl border border-white/10 leading-relaxed">
          &ldquo;{profile.shortBio}&rdquo;
        </p>

        {/* Interactive Action Strip: Love Button, View Biodata, and Contact/Interest */}
        <div className="pt-2 border-t border-white/15 flex items-center gap-2">
          {/* Love / Shortlist Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(profile.id);
            }}
            title={isFavorited ? "Remove from Shortlist" : "Add to Shortlist"}
            className={`h-10 w-10 rounded-xl flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-md ${
              isFavorited
                ? "bg-rose-500 text-white scale-105"
                : "bg-white/15 hover:bg-rose-500 hover:text-white text-gray-200 border border-white/20"
            }`}
          >
            <Heart className={`h-4.5 w-4.5 ${isFavorited ? "fill-white" : ""}`} />
          </button>

          {/* View Biodata Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onViewBiodata(profile);
            }}
            className="flex-1 py-2.5 px-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer border border-white/20"
          >
            <span>Biodata</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>

          {/* Contact / Express Interest Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSendInterest(profile.id);
            }}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md ${
              isInterestSent
                ? "bg-emerald-600 text-white"
                : "bg-gradient-to-r from-[#00895e] to-[#047857] hover:from-[#00744f] hover:to-[#036246] text-white hover:scale-[1.02] active:scale-[0.98]"
            }`}
          >
            {isInterestSent ? (
              <>
                <CheckCircle2 className="h-3.5 w-3.5 text-[#D4AF37]" />
                <span>Sent</span>
              </>
            ) : (
              <>
                <Sparkles className="h-3.5 w-3.5 text-[#D4AF37]" />
                <span>Contact</span>
              </>
            )}
          </button>
        </div>

      </div>

    </div>
  );
}
