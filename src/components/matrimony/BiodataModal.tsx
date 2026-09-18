"use client";

import { useState } from "react";
import Image from "next/image";
import {
  X,
  Heart,
  ShieldCheck,
  MapPin,
  Briefcase,
  GraduationCap,
  Sparkles,
  Users,
  Compass,
  CheckCircle2,
  Share2,
  MessageCircle,
  Phone,
  Eye,
  EyeOff,
} from "lucide-react";
import type { MatrimonyProfile } from "@/lib/matrimonyData";

interface BiodataModalProps {
  profile: MatrimonyProfile | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorited: boolean;
  onToggleFavorite: (id: string) => void;
  isInterestSent: boolean;
  onSendInterest: (id: string) => void;
}

export default function BiodataModal({
  profile,
  isOpen,
  onClose,
  isFavorited,
  onToggleFavorite,
  isInterestSent,
  onSendInterest,
}: BiodataModalProps) {
  const [activeTab, setActiveTab] = useState<"personal" | "education" | "family" | "expectations">("personal");
  const [isPhotoBlurred, setIsPhotoBlurred] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen || !profile) return null;

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-4xl bg-white dark:bg-[#07241c] border-2 border-emerald-500/30 rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.4)] overflow-hidden z-10 my-auto flex flex-col max-h-[90vh]">
        
        {/* Top Gold & Emerald Decorative Border */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#064e3b] via-[#D4AF37] to-[#064e3b]" />

        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 sm:px-7 sm:py-5 border-b border-gray-100 dark:border-white/10 bg-gradient-to-r from-emerald-50/50 via-white to-amber-50/30 dark:from-emerald-950/40 dark:via-transparent dark:to-amber-950/20">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-[#064e3b] text-[#D4AF37] shadow-xs">
              <Sparkles className="h-3 w-3 fill-[#D4AF37]" />
              <span>{profile.code}</span>
            </span>
            {profile.verified && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100/80 dark:bg-emerald-950/70 px-2.5 py-0.5 rounded-full border border-emerald-300/60">
                <ShieldCheck className="h-3.5 w-3.5 text-[#00895e]" />
                <span>NID Verified Biodata</span>
              </span>
            )}
            {profile.isKsaExpat && (
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 dark:text-amber-300 bg-amber-100/90 dark:bg-amber-950/70 px-2.5 py-0.5 rounded-full border border-amber-300/60">
                <span>🇸🇦 KSA Expat Professional</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyLink}
              title="Copy Biodata Link"
              className="h-8 w-8 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-emerald-100 flex items-center justify-center text-gray-600 dark:text-gray-300 transition-colors cursor-pointer"
            >
              <Share2 className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="h-8 w-8 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-rose-100 hover:text-rose-600 dark:hover:bg-rose-950/40 flex items-center justify-center text-gray-500 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
          {/* Top Profile Summary Bar with Photo */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-emerald-50/70 to-white dark:from-white/5 dark:to-transparent border border-emerald-100 dark:border-white/10">
            {/* Photo Box with Privacy Blur Option */}
            <div className="relative h-32 w-32 sm:h-36 sm:w-36 rounded-2xl overflow-hidden shrink-0 bg-gray-100 border-2 border-[#D4AF37]/50 shadow-md">
              <Image
                src={profile.image}
                alt={profile.name}
                fill
                unoptimized
                className={`object-cover transition-all duration-500 ${
                  isPhotoBlurred ? "blur-xl scale-110" : ""
                }`}
              />
              <button
                type="button"
                onClick={() => setIsPhotoBlurred(!isPhotoBlurred)}
                title={isPhotoBlurred ? "Show Photo" : "Privacy Blur Photo"}
                className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-black/60 text-white hover:bg-black/80 transition-colors cursor-pointer"
              >
                {isPhotoBlurred ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
              </button>
            </div>

            {/* Core Info */}
            <div className="flex-1 text-center sm:text-left space-y-1.5 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="font-display text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
                  {profile.name}
                </h3>
                <span className="text-xs font-bold text-[#00895e] dark:text-emerald-400 bg-emerald-100/60 dark:bg-emerald-950/50 px-3 py-1 rounded-full self-center sm:self-auto border border-emerald-300/40">
                  {profile.gender === "bride" ? "👰 Looking for Groom" : "🤵 Looking for Bride"}
                </span>
              </div>

              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center justify-center sm:justify-start gap-1.5 flex-wrap">
                <Briefcase className="h-4 w-4 text-[#00895e] shrink-0" />
                <span>{profile.profession}</span>
                <span className="text-gray-300 dark:text-gray-600">•</span>
                <GraduationCap className="h-4 w-4 text-[#D4AF37] shrink-0" />
                <span>{profile.education}</span>
              </p>

              <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center sm:justify-start gap-1">
                <MapPin className="h-3.5 w-3.5 text-rose-500 shrink-0" />
                <span>{profile.location}, {profile.district}</span>
              </p>

              <p className="text-xs sm:text-[13px] text-gray-600 dark:text-gray-300 italic pt-1 leading-relaxed">
                &ldquo;{profile.shortBio}&rdquo;
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1.5 border-b border-gray-100 dark:border-white/10 overflow-x-auto pb-1 scrollbar-none">
            <button
              type="button"
              onClick={() => setActiveTab("personal")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "personal"
                  ? "bg-[#064e3b] text-white shadow-xs"
                  : "text-gray-600 hover:text-[#064e3b] dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5"
              }`}
            >
              Personal & Physical
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("education")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "education"
                  ? "bg-[#064e3b] text-white shadow-xs"
                  : "text-gray-600 hover:text-[#064e3b] dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5"
              }`}
            >
              Education & Career
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("family")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "family"
                  ? "bg-[#064e3b] text-white shadow-xs"
                  : "text-gray-600 hover:text-[#064e3b] dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5"
              }`}
            >
              Family Background
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("expectations")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "expectations"
                  ? "bg-[#064e3b] text-white shadow-xs"
                  : "text-gray-600 hover:text-[#064e3b] dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5"
              }`}
            >
              Partner Expectations
            </button>
          </div>

          {/* Tab 1: Personal & Physical Details */}
          {activeTab === "personal" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 animate-in fade-in duration-200">
              <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                <span className="text-[11px] text-gray-400 font-semibold block">Age & Date of Birth</span>
                <span className="text-sm font-bold text-gray-800 dark:text-white mt-0.5 block">{profile.age} Years</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                <span className="text-[11px] text-gray-400 font-semibold block">Height</span>
                <span className="text-sm font-bold text-gray-800 dark:text-white mt-0.5 block">{profile.height}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                <span className="text-[11px] text-gray-400 font-semibold block">Complexion</span>
                <span className="text-sm font-bold text-gray-800 dark:text-white mt-0.5 block">{profile.complexion}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                <span className="text-[11px] text-gray-400 font-semibold block">Blood Group</span>
                <span className="text-sm font-bold text-gray-800 dark:text-white mt-0.5 block">{profile.bloodGroup}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                <span className="text-[11px] text-gray-400 font-semibold block">Religion & Sect</span>
                <span className="text-sm font-bold text-gray-800 dark:text-white mt-0.5 block">
                  {profile.religion} {profile.sect ? `(${profile.sect})` : ""}
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                <span className="text-[11px] text-gray-400 font-semibold block">Marital Status</span>
                <span className="text-sm font-bold text-gray-800 dark:text-white mt-0.5 block">{profile.maritalStatus}</span>
              </div>
            </div>
          )}

          {/* Tab 2: Education & Career */}
          {activeTab === "education" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 space-y-1.5">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4.5 w-4.5 text-[#00895e]" />
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Educational Qualification</span>
                </div>
                <h4 className="text-sm sm:text-base font-black text-gray-900 dark:text-white">{profile.education}</h4>
                <p className="text-xs text-gray-600 dark:text-gray-300">{profile.educationDetail}</p>
              </div>

              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 space-y-1.5">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4.5 w-4.5 text-[#D4AF37]" />
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Professional Career</span>
                </div>
                <h4 className="text-sm sm:text-base font-black text-gray-900 dark:text-white">{profile.profession}</h4>
                <p className="text-xs text-gray-600 dark:text-gray-300">{profile.professionDetail}</p>
              </div>
            </div>
          )}

          {/* Tab 3: Family Background */}
          {activeTab === "family" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in duration-200">
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 space-y-1">
                <span className="text-[11px] text-gray-400 font-semibold">Family Type & Status</span>
                <p className="text-sm font-bold text-gray-800 dark:text-white">{profile.familyType}</p>
              </div>
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 space-y-1">
                <span className="text-[11px] text-gray-400 font-semibold">Father&apos;s Occupation</span>
                <p className="text-sm font-bold text-gray-800 dark:text-white">{profile.fatherProfession}</p>
              </div>
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 space-y-1">
                <span className="text-[11px] text-gray-400 font-semibold">Mother&apos;s Occupation</span>
                <p className="text-sm font-bold text-gray-800 dark:text-white">{profile.motherProfession}</p>
              </div>
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 space-y-1">
                <span className="text-[11px] text-gray-400 font-semibold">Brothers & Sisters</span>
                <p className="text-sm font-bold text-gray-800 dark:text-white">{profile.siblings}</p>
              </div>
            </div>
          )}

          {/* Tab 4: Partner Expectations */}
          {activeTab === "expectations" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-900/30">
                  <span className="text-[11px] text-amber-700 dark:text-amber-400 font-semibold block">Desired Age Range</span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white mt-0.5 block">{profile.partnerExpectations.ageRange}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-900/30">
                  <span className="text-[11px] text-amber-700 dark:text-amber-400 font-semibold block">Desired Height</span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white mt-0.5 block">{profile.partnerExpectations.heightRange}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-900/30">
                  <span className="text-[11px] text-amber-700 dark:text-amber-400 font-semibold block">Location Preference</span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white mt-0.5 block">{profile.partnerExpectations.locationPreference}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 space-y-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Education & Profession Preferences</span>
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  <strong>Education:</strong> {profile.partnerExpectations.education}
                </p>
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  <strong>Profession:</strong> {profile.partnerExpectations.profession}
                </p>
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 italic pt-1">
                  <strong>Special Note:</strong> {profile.partnerExpectations.notes}
                </p>
              </div>
            </div>
          )}

          {/* Guardian Privacy & Safety Ribbon */}
          <div className="p-3.5 rounded-2xl bg-emerald-500/10 dark:bg-emerald-950/30 border border-emerald-500/25 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-[#00895e] dark:text-emerald-400 font-bold">
              <ShieldCheck className="h-4 w-4 shrink-0" />
              <span>Guardian & Family Assisted Verification Protocol</span>
            </div>
            <span className="text-[11px] text-gray-500 dark:text-gray-400 hidden sm:inline">
              Verified by Dreamvally Concierge
            </span>
          </div>
        </div>

        {/* Modal Footer Action Buttons */}
        <div className="flex items-center justify-between gap-3 px-5 py-4 sm:px-7 sm:py-4.5 border-t border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-[#061e17]">
          <button
            type="button"
            onClick={() => onToggleFavorite(profile.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              isFavorited
                ? "bg-rose-50 dark:bg-rose-950/50 border-rose-400 text-rose-600 shadow-xs"
                : "bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:border-rose-400 hover:text-rose-600"
            }`}
          >
            <Heart className={`h-4 w-4 ${isFavorited ? "fill-rose-500 text-rose-500" : ""}`} />
            <span>{isFavorited ? "Shortlisted" : "Shortlist"}</span>
          </button>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => onSendInterest(profile.id)}
              className={`flex items-center gap-2 px-5 sm:px-7 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer shadow-md ${
                isInterestSent
                  ? "bg-emerald-600 text-white"
                  : "bg-gradient-to-r from-[#064e3b] to-[#00895e] hover:from-[#00744f] hover:to-[#005a3c] text-white hover:scale-[1.02] active:scale-[0.98]"
              }`}
            >
              {isInterestSent ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-[#D4AF37]" />
                  <span>Interest Sent!</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 text-[#D4AF37]" />
                  <span>Express Interest (যোগাযোগ করুন)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
