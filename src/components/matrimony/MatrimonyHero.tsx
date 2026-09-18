"use client";

import Link from "next/image";
import NextLink from "next/link";
import {
  Heart,
  Sparkles,
  ShieldCheck,
  Search,
  Users,
  UserPlus,
  Globe2,
  ChevronDown,
} from "lucide-react";

interface MatrimonyHeroProps {
  lookingFor: "all" | "bride" | "groom";
  setLookingFor: (val: "all" | "bride" | "groom") => void;
  selectedAgeRange: string;
  setSelectedAgeRange: (val: string) => void;
  selectedReligion: string;
  setSelectedReligion: (val: string) => void;
  selectedDistrict: string;
  setSelectedDistrict: (val: string) => void;
  onSearch: () => void;
}

export default function MatrimonyHero({
  lookingFor,
  setLookingFor,
  selectedAgeRange,
  setSelectedAgeRange,
  selectedReligion,
  setSelectedReligion,
  selectedDistrict,
  setSelectedDistrict,
  onSearch,
}: MatrimonyHeroProps) {
  return (
    <section className="relative w-full overflow-hidden pt-10 pb-12 sm:pt-14 sm:pb-16 bg-gradient-to-b from-[#032a1f] via-[#064e3b] to-[#043d2e] text-white">
      
      {/* Decorative Golden & Emerald Silk Wave Layers */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]" />
      
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Trust & Heritage Ribbon */}
        <div className="flex items-center justify-center gap-2 mb-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#D4AF37]/50 text-xs font-bold text-[#D4AF37] shadow-sm">
            <Heart className="h-3.5 w-3.5 fill-[#D4AF37] animate-pulse" />
            <span>Dreamvally Matrimonial • দ্বিমুখী নির্ভরযোগ্য ম্যাট্রিমনি</span>
            <Globe2 className="h-3.5 w-3.5 text-emerald-300" />
          </div>
        </div>

        {/* Hero Headlines */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-8 sm:mb-10">
          <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-sm">
            Find Your Perfect Life Partner
            <span className="block text-xl sm:text-3xl text-[#D4AF37] font-serif font-bold mt-1">
              আপনার আদর্শ জীবনসঙ্গী খুঁজুন
            </span>
          </h1>
          <p className="text-xs sm:text-base text-emerald-100/90 leading-relaxed font-normal max-w-2xl mx-auto">
            Connecting verified families across <strong>Bangladesh</strong> and <strong>Saudi Arabia Expatriates</strong>. 100% NID verified biodatas, family-assisted privacy, and respectful halal matchmaking.
          </p>
        </div>

        {/* Floating Matchmaker Quick Search Pill Card */}
        <div className="max-w-5xl mx-auto bg-white/95 dark:bg-[#07241c]/95 backdrop-blur-xl border-2 border-[#D4AF37]/60 rounded-3xl p-4 sm:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.3)] text-gray-900 dark:text-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 items-end">
            
            {/* 1. Looking For */}
            <div className="space-y-1.5 text-left">
              <label className="text-[11px] font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                I am looking for
              </label>
              <div className="relative">
                <select
                  value={lookingFor}
                  onChange={(e) => setLookingFor(e.target.value as "all" | "bride" | "groom")}
                  className="w-full appearance-none bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#00895e] cursor-pointer"
                >
                  <option value="all">Any (সব পাত্র ও পাত্রী)</option>
                  <option value="bride">👰 Bride (পাত্রী খুঁজছি)</option>
                  <option value="groom">🤵 Groom (পাত্র খুঁজছি)</option>
                </select>
                <ChevronDown className="h-4 w-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* 2. Age Range */}
            <div className="space-y-1.5 text-left">
              <label className="text-[11px] font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                Aged Between
              </label>
              <div className="relative">
                <select
                  value={selectedAgeRange}
                  onChange={(e) => setSelectedAgeRange(e.target.value)}
                  className="w-full appearance-none bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#00895e] cursor-pointer"
                >
                  <option value="all">Any Age (যেকোনো বয়স)</option>
                  <option value="18-25">18 - 25 Years</option>
                  <option value="26-30">26 - 30 Years</option>
                  <option value="31-35">31 - 35 Years</option>
                  <option value="36+">36+ Years</option>
                </select>
                <ChevronDown className="h-4 w-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* 3. Religion */}
            <div className="space-y-1.5 text-left">
              <label className="text-[11px] font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                Religion (ধর্ম)
              </label>
              <div className="relative">
                <select
                  value={selectedReligion}
                  onChange={(e) => setSelectedReligion(e.target.value)}
                  className="w-full appearance-none bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#00895e] cursor-pointer"
                >
                  <option value="all">All Religions (সব ধর্ম)</option>
                  <option value="Islam">Islam (ইসলাম)</option>
                  <option value="Hinduism">Hinduism (হিন্দুধর্ম)</option>
                  <option value="Christianity">Christianity (খ্রিস্টধর্ম)</option>
                </select>
                <ChevronDown className="h-4 w-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* 4. Location / District */}
            <div className="space-y-1.5 text-left">
              <label className="text-[11px] font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                District / Expat City
              </label>
              <div className="relative">
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full appearance-none bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#00895e] cursor-pointer"
                >
                  <option value="all">All Locations (সকল স্থান)</option>
                  <option value="Dhaka">Dhaka (ঢাকা)</option>
                  <option value="Chattogram">Chattogram (চট্টগ্রাম)</option>
                  <option value="Sylhet">Sylhet (সিলেট)</option>
                  <option value="Khulna">Khulna (খুলনা)</option>
                  <option value="Saudi Arabia">🇸🇦 Saudi Arabia Expats</option>
                </select>
                <ChevronDown className="h-4 w-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

          </div>

          {/* Quick Action Button & Direct Post Biodata Link */}
          <div className="mt-4 pt-3.5 border-t border-gray-100 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <ShieldCheck className="h-4 w-4 text-[#00895e]" />
              <span>Over 25,000+ Biodatas verified by family advisors</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <NextLink
                href="/post-matrimony-profile"
                className="w-full sm:w-auto py-2.5 px-4 rounded-xl border border-emerald-600 text-[#00895e] dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-white/5 text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5"
              >
                <UserPlus className="h-3.5 w-3.5" />
                <span>Post Free Biodata (বায়োডাটা দিন)</span>
              </NextLink>

              <button
                type="button"
                onClick={onSearch}
                className="w-full sm:w-auto py-2.5 px-6 rounded-xl bg-gradient-to-r from-[#064e3b] to-[#00895e] hover:from-[#00744f] hover:to-[#005a3c] text-white text-xs sm:text-sm font-black shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Search className="h-4 w-4 stroke-[2.5]" />
                <span>Search Matches</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4 Trust Highlights Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto mt-7 text-center">
          <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
            <span className="text-base sm:text-lg font-black text-[#D4AF37] block">100%</span>
            <span className="text-[11px] text-emerald-100 block">NID & Passport Verified</span>
          </div>
          <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
            <span className="text-base sm:text-lg font-black text-[#D4AF37] block">3,400+</span>
            <span className="text-[11px] text-emerald-100 block">Happy Marriages</span>
          </div>
          <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
            <span className="text-base sm:text-lg font-black text-[#D4AF37] block">Dual Market</span>
            <span className="text-[11px] text-emerald-100 block">Bangladesh & KSA Expats</span>
          </div>
          <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
            <span className="text-base sm:text-lg font-black text-[#D4AF37] block">Zero Cost</span>
            <span className="text-[11px] text-emerald-100 block">Free Biodata Submission</span>
          </div>
        </div>

      </div>
    </section>
  );
}
