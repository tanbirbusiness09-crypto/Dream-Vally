"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  Heart,
  UserCheck,
  Sparkles,
  ArrowRight,
  Quote,
  CheckCircle2,
  Users,
} from "lucide-react";
import { MATRIMONY_SUCCESS_STORIES } from "@/lib/matrimonyData";

export default function MatrimonyTrustAndHowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Create Free Biodata",
      bnTitle: "বায়োডাটা তৈরি করুন",
      desc: "Fill in your personal, educational, family, and partner preference details in just 3 minutes. Completely free.",
    },
    {
      step: "02",
      title: "Discover Verified Matches",
      bnTitle: "কাঙ্ক্ষিত পাত্র/পাত্রী খুঁজুন",
      desc: "Filter through thousands of 100% NID-verified profiles across Bangladesh and Saudi Arabia expatriates.",
    },
    {
      step: "03",
      title: "Family Connect & Nikkah",
      bnTitle: "পারিবারিক যোগাযোগ ও শুভ পরিণয়",
      desc: "Express interest, exchange family contact details, and arrange safe, dignified guardian-assisted meetings.",
    },
  ];

  const safetyPillars = [
    {
      icon: ShieldCheck,
      title: "100% Verified Profiles",
      desc: "Every biodata undergoes NID and educational document verification by our dedicated team.",
    },
    {
      icon: Lock,
      title: "Strict Photo & Data Privacy",
      desc: "You control who sees your photos and contact numbers with one-click privacy blur.",
    },
    {
      icon: Users,
      title: "Family-Assisted Protocol",
      desc: "Designed specifically with Bangladeshi family ethics and respectful matchmaking standards.",
    },
    {
      icon: CheckCircle2,
      title: "Direct Dual-Market Reach",
      desc: "Seamlessly connect with professionals living in Bangladesh as well as Saudi Arabia NRB expatriates.",
    },
  ];

  return (
    <div className="w-full space-y-16 py-12">
      
      {/* 1. HOW IT WORKS SECTION */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <span className="text-xs font-black uppercase tracking-widest text-[#00895e] dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-300/40">
            Simple & Transparent Process
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            How Dreamvally Matrimony Works
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            A trusted 3-step journey from creating your biodata to your blessed wedding day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {steps.map((item, idx) => (
            <div
              key={item.step}
              className="relative p-6 sm:p-7 rounded-3xl bg-white dark:bg-surface-container-low border border-gray-100 dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(0,137,94,0.08)] transition-all space-y-3"
            >
              <span className="font-mono text-3xl sm:text-4xl font-black text-[#D4AF37] block">
                {item.step}
              </span>
              <h3 className="font-display text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                {item.title}
                <span className="block text-xs font-serif text-[#00895e] dark:text-emerald-400 mt-0.5">
                  {item.bnTitle}
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 2. TRUST & SAFETY ARCHITECTURE */}
      <section className="w-full bg-gradient-to-br from-emerald-900 via-[#064e3b] to-[#043427] text-white py-14">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] bg-white/10 px-3 py-1 rounded-full border border-white/15">
              Trust & Confidentiality
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
              Why Thousands of Families Trust Us
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/80">
              Built with zero compromises on privacy, dignity, and authentic credential verification.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {safetyPillars.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2.5"
                >
                  <div className="h-10 w-10 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-sm text-white">{p.title}</h4>
                  <p className="text-xs text-emerald-100/80 leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. REAL SUCCESS STORIES */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <span className="text-xs font-black uppercase tracking-widest text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-3 py-1 rounded-full border border-rose-300/40">
            Real Stories of Love & Faith
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            Matched on Dreamvally Matrimony
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            Hear from real couples who found their lifelong companions through our platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MATRIMONY_SUCCESS_STORIES.map((story) => (
            <div
              key={story.id}
              className="rounded-3xl bg-white dark:bg-surface-container-low border border-gray-100 dark:border-white/10 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col"
            >
              <div className="relative h-48 w-full bg-gray-100 dark:bg-gray-800">
                <Image
                  src={story.image}
                  alt={story.coupleNames}
                  fill
                  unoptimized
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <h4 className="font-bold text-base">{story.coupleNames}</h4>
                  <p className="text-xs text-emerald-300 font-semibold">{story.marriageYear} • {story.location}</p>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 italic leading-relaxed">
                  &ldquo;{story.quote}&rdquo;
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-100 dark:border-white/10">
                  {story.story}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FINAL CTA BANNER */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#064e3b] via-[#005a3c] to-[#013220] p-8 sm:p-12 text-white shadow-xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#D4AF37] text-black">
              <Sparkles className="h-3.5 w-3.5 fill-black" />
              <span>100% Free Registration for Families</span>
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-black leading-tight text-white">
              Take the Blessed First Step Towards Marriage
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
              Create your biodata in 3 minutes, set your family preferences, and browse thousands of verified profiles today.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                href="/post-matrimony-profile"
                className="py-3 px-6 rounded-2xl bg-[#D4AF37] hover:bg-[#c49f2e] text-black font-black text-xs sm:text-sm shadow-lg transition-transform active:scale-95 flex items-center gap-2"
              >
                <span>Create Free Biodata (বায়োডাটা পোস্ট করুন)</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
