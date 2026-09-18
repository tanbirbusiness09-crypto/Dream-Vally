"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Search,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  LayoutGrid,
  ChevronLeft,
  ChevronRight,
  Flame,
  Clock,
  Zap,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Check,
  X,
} from "lucide-react";
import FadeIn from "./FadeIn";

const POPULAR_SEARCHES = ["iPhone", "Laptop", "Motorcycle", "Apartment", "Jobs"];

const CATEGORY_ITEMS = [
  {
    id: "mobiles",
    name: "Mobiles",
    bnName: "মোবাইল ও গ্যাজেট",
    image: "/assets/categories/cat_mobiles.jpg",
    count: "12,450+ Ads",
  },
  {
    id: "electronics",
    name: "Electronics",
    bnName: "ইলেকট্রনিক্স",
    image: "/assets/categories/cat_electronics.jpg",
    count: "8,320+ Ads",
  },
  {
    id: "vehicles",
    name: "Vehicles",
    bnName: "গাড়ি ও বাইক",
    image: "/assets/categories/cat_vehicles.jpg",
    count: "6,890+ Ads",
  },
  {
    id: "property",
    name: "Property",
    bnName: "জমি ও ফ্ল্যাট",
    image: "/assets/categories/cat_property.jpg",
    count: "4,150+ Ads",
  },
  {
    id: "jobs",
    name: "Jobs",
    bnName: "চাকরি ও ক্যারিয়ার",
    image: "/assets/categories/cat_jobs.jpg",
    count: "3,200+ Ads",
  },
  {
    id: "pets",
    name: "Pets",
    bnName: "পোষা প্রাণী",
    image: "/assets/categories/cat_pets.jpg",
    count: "1,980+ Ads",
  },
  {
    id: "services",
    name: "Services",
    bnName: "সার্ভিস ও সেবা",
    image: "/assets/categories/cat_services.jpg",
    count: "2,740+ Ads",
  },
  {
    id: "delivery",
    name: "Delivery",
    bnName: "ডেলিভারি",
    image: "/assets/categories/cat_delivery.jpg",
    count: "1,450+ Ads",
  },
];

// Option 3: Flash Deals Live Showcase Items with Real Product Assets
const FLASH_DEALS = [
  {
    id: "d1",
    title: "iPhone 15 Pro (256GB)",
    dealPrice: "৳ 1,18,000",
    regularPrice: "৳ 1,45,000",
    discount: "-19%",
    image: "/assets/products/prod_iphone15.jpg",
    location: "Gulshan, Dhaka",
    claimed: 84,
    badge: "Hot Deal",
  },
  {
    id: "d2",
    title: "Apple MacBook Air M2",
    dealPrice: "৳ 89,999",
    regularPrice: "৳ 1,10,000",
    discount: "-18%",
    image: "/assets/products/prod_macbook_m2.jpg",
    location: "Dhanmondi, Dhaka",
    claimed: 92,
    badge: "Super Saver",
  },
  {
    id: "d3",
    title: "Yamaha R15 V4 Racing Blue",
    dealPrice: "৳ 4,65,000",
    regularPrice: "৳ 5,20,000",
    discount: "-11%",
    image: "/assets/products/prod_yamaha_r15.jpg",
    location: "Agrabad, Chattogram",
    claimed: 76,
    badge: "Mega Drop",
  },
];

// Interactive 3D Promotional Slider Items with Discount Themes
const HERO_SLIDES = [
  {
    id: "app-shopping",
    image: "/assets/hero/hero_right_visual_cropped.png",
    alt: "Dreamvally Mobile App & Delivery Packages",
    script1: "Local Deals,",
    script2: "Bigger Dreams ♡",
    scriptColor: "text-[#00895e] dark:text-emerald-400",
    badgeLabel: "Official App",
  },
  {
    id: "discount-50",
    image: "/assets/hero/hero_slide_discount_50.png",
    alt: "Dreamvally 50% Off Special Mega Discounts",
    script1: "Mega Discounts,",
    script2: "Up to 50% Off ⚡",
    scriptColor: "text-amber-600 dark:text-amber-400",
    badgeLabel: "50% Discount",
  },
  {
    id: "flash-deals",
    image: "/assets/hero/hero_slide_flash_deals.png",
    alt: "Dreamvally Flash Sale Live Discounts",
    script1: "Flash Deals,",
    script2: "Limited Time! 🔥",
    scriptColor: "text-rose-600 dark:text-rose-400",
    badgeLabel: "Flash Sale",
  },
];

export default function HomeHero() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"buy" | "sell" | "connect">("buy");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 28, seconds: 45 });
  const [currentDeal, setCurrentDeal] = useState(0);
  const [isDealPaused, setIsDealPaused] = useState(false);
  const categoryDropdownRef = useRef<HTMLDivElement>(null);

  // Close category dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(event.target as Node)
      ) {
        setShowCategoryDropdown(false);
      }
    }
    if (showCategoryDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCategoryDropdown]);

  // Live ticking countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 4, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Rotate through flash deals every 3.8s
  useEffect(() => {
    if (isDealPaused) return;
    const dealTimer = setInterval(() => {
      setCurrentDeal((prev) => (prev + 1) % FLASH_DEALS.length);
    }, 3800);
    return () => clearInterval(dealTimer);
  }, [isDealPaused]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  // Auto-play slider every 4.5s
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (query) {
      router.push(`/categories?q=${encodeURIComponent(query)}&category=${encodeURIComponent(selectedCategory)}`);
    } else {
      router.push(`/categories?category=${encodeURIComponent(selectedCategory)}`);
    }
  };

  return (
    <section className="relative z-30 w-full pt-10 pb-9 sm:pt-13 sm:pb-12 lg:pt-16 lg:pb-14 flex items-center">
      
      {/* ========================================================================= */}
      {/* BACKGROUND: Attractive Dreamvally Emerald & Gold Silk Banner               */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <Image
          src="/assets/hero/dreamvally_attractive_hero_bg.jpg"
          alt="Dreamvally Luxury Emerald & Gold Waves Background"
          fill
          priority
          unoptimized
          className="object-cover object-center"
        />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          {/* 3-COLUMN SIDE-BY-SIDE LAYOUT: 1fr (Left) - 1.55fr (Center) - 1.05fr (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.55fr_1.05fr] gap-6 xl:gap-8 items-center">
            
            {/* BOX 1 (LEFT COLUMN): Option 3 - Live Countdown & Flash Deals Spotlight */}
            <div className="min-w-0 space-y-2.5">
              <h1 className="sr-only">Dreamvally - Bangladesh&apos;s Trusted Marketplace</h1>

              {/* Glowing Mint & Gold Flash Deals Pill Header */}
              <div className="flex items-center justify-between gap-2">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300/80 bg-white/95 dark:bg-emerald-950/70 backdrop-blur-md px-3 py-1 text-xs font-bold text-emerald-800 dark:text-emerald-300 shadow-2xs">
                  <Flame className="h-3.5 w-3.5 text-[#D4AF37] fill-[#D4AF37] animate-pulse" />
                  <span>Flash Deals Live</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 dark:bg-emerald-950/70 border border-emerald-300/70 dark:border-emerald-700/60 text-[11px] font-bold text-emerald-800 dark:text-emerald-300 shadow-2xs backdrop-blur-md">
                  <Clock className="h-3 w-3 text-[#00895e] dark:text-emerald-400" />
                  <span>Ends in 0{timeLeft.hours}h : {timeLeft.minutes < 10 ? `0${timeLeft.minutes}` : timeLeft.minutes}m : {timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds}s</span>
                </div>
              </div>

              {/* Main Animated Glassmorphism Spotlight Card */}
              <div className="rounded-3xl bg-white/90 dark:bg-surface-container/85 border border-emerald-100/90 dark:border-white/10 p-3.5 sm:p-4 shadow-[0_12px_35px_rgba(0,137,94,0.07)] backdrop-blur-md space-y-2.5">
                
                {/* Live Countdown Urgency Ribbon */}
                <div className="flex items-center justify-between bg-gradient-to-r from-emerald-500/10 via-amber-500/10 to-emerald-500/10 dark:from-emerald-950/40 dark:via-amber-950/30 dark:to-emerald-950/40 border border-emerald-200/70 dark:border-emerald-800/40 rounded-xl px-3 py-1.5">
                  <div className="flex items-center gap-1.5">
                    <Zap className="h-3.5 w-3.5 text-[#D4AF37] fill-[#D4AF37] animate-bounce" />
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#00895e] dark:text-emerald-400">
                      Limited Stock Offer
                    </span>
                  </div>
                  {/* Digital Clock Badges */}
                  <div className="flex items-center gap-1">
                    <div className="bg-[#064e3b] dark:bg-black text-white text-[11px] font-mono font-black px-1.5 py-0.5 rounded shadow-2xs border border-emerald-800/40">
                      0{timeLeft.hours}
                    </div>
                    <span className="text-emerald-800 dark:text-emerald-300 font-bold text-xs animate-pulse">:</span>
                    <div className="bg-[#064e3b] dark:bg-black text-white text-[11px] font-mono font-black px-1.5 py-0.5 rounded shadow-2xs border border-emerald-800/40">
                      {timeLeft.minutes < 10 ? `0${timeLeft.minutes}` : timeLeft.minutes}
                    </div>
                    <span className="text-emerald-800 dark:text-emerald-300 font-bold text-xs animate-pulse">:</span>
                    <div className="bg-[#00895e] text-[#D4AF37] text-[11px] font-mono font-black px-1.5 py-0.5 rounded shadow-2xs border border-[#D4AF37]/50 animate-pulse">
                      {timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds}
                    </div>
                  </div>
                </div>

                {/* Auto-Rotating Active Flash Deal Showcase */}
                {(() => {
                  const deal = FLASH_DEALS[currentDeal];
                  return (
                    <div
                      key={deal.id}
                      onMouseEnter={() => setIsDealPaused(true)}
                      onMouseLeave={() => setIsDealPaused(false)}
                      className="relative group/deal bg-gradient-to-br from-white/95 to-emerald-50/40 dark:from-white/5 dark:to-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-2xl p-3 transition-all duration-300 hover:shadow-md"
                    >
                      <div className="flex items-center gap-3.5">
                        {/* Enlarged Product Image with Discount Badge */}
                        <div className="relative h-28 w-28 sm:h-32 sm:w-32 rounded-2xl overflow-hidden shrink-0 bg-gray-100 dark:bg-gray-800 border border-gray-200/80 dark:border-white/10 shadow-sm">
                          <Image
                            key={deal.id}
                            src={deal.image}
                            alt={deal.title}
                            fill
                            unoptimized
                            className="object-cover transition-transform duration-500 group-hover/deal:scale-105"
                          />
                          <span className="absolute top-1.5 left-1.5 bg-[#00895e] text-white text-[10px] font-black px-2 py-0.5 rounded-lg shadow-sm border border-emerald-300/40">
                            {deal.discount}
                          </span>
                        </div>

                        {/* Product Details: Title, Location, Price & Claim Progress */}
                        <div className="min-w-0 flex-1 space-y-1.5">
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-[10px] font-extrabold text-amber-800 dark:text-amber-300 bg-amber-100/90 dark:bg-amber-950/60 px-2 py-0.5 rounded-md border border-amber-300/60 dark:border-amber-700/50">
                              {deal.badge}
                            </span>
                            <span className="text-[10px] text-gray-500 dark:text-gray-400 truncate font-medium">
                              📍 {deal.location}
                            </span>
                          </div>

                          <h4 className="text-xs sm:text-[13px] font-bold text-gray-900 dark:text-white truncate">
                            {deal.title}
                          </h4>

                          {/* Deal Price & Regular Discount Price */}
                          <div className="flex items-baseline gap-2">
                            <span className="text-base sm:text-lg font-black text-[#00895e] dark:text-emerald-400 leading-none">
                              {deal.dealPrice}
                            </span>
                            <span className="text-xs text-gray-400 line-through">
                              {deal.regularPrice}
                            </span>
                          </div>

                          {/* Progress bar: Claimed */}
                          <div className="space-y-1">
                            <div className="flex justify-between text-[9.5px] text-gray-500 dark:text-gray-400 font-medium">
                              <span>Claimed: {deal.claimed}%</span>
                              <span className="text-[#00895e] dark:text-emerald-400 font-bold">Only {100 - deal.claimed} left!</span>
                            </div>
                            <div className="w-full bg-gray-100 dark:bg-white/10 rounded-full h-1.5 overflow-hidden border border-emerald-100/50 dark:border-emerald-900/30">
                              <div
                                className="bg-gradient-to-r from-[#00895e] via-emerald-500 to-[#D4AF37] h-1.5 rounded-full transition-all duration-500"
                                style={{ width: `${deal.claimed}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Carousel Indicator Dots */}
                      <div className="flex items-center justify-center gap-1.5 mt-2.5 pt-1.5 border-t border-gray-100 dark:border-white/5">
                        {FLASH_DEALS.map((d, idx) => (
                          <button
                            key={d.id}
                            type="button"
                            onClick={() => setCurrentDeal(idx)}
                            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                              idx === currentDeal
                                ? "w-5 bg-[#00895e]"
                                : "w-1.5 bg-emerald-200/80 dark:bg-gray-700 hover:bg-emerald-400"
                            }`}
                            aria-label={`Deal ${idx + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })()}

                {/* Animated Call-to-Action Button - Emerald & Brand Gold Stars */}
                <Link
                  href="/categories?badge=deals"
                  className="group relative flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#00895e] to-[#006e4a] hover:from-[#007b54] hover:to-[#005e3f] text-white text-xs sm:text-sm font-black shadow-md shadow-emerald-700/25 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  <Sparkles className="h-4 w-4 text-[#D4AF37] animate-pulse" />
                  <span>Grab Flash Deals Now</span>
                  <ArrowRight className="h-4 w-4 text-[#D4AF37] transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* BOX 2 (CENTER COLUMN): Floating Tabbed Search Card - Pixel Perfect to Reference */}
            <div className={`min-w-0 relative ${showCategoryDropdown ? "z-40" : "z-20"}`}>
              {/* Stepped Tab Header Container - Seamlessly Flush on Left */}
              <div className="inline-flex items-center bg-white dark:bg-surface-container-low rounded-t-2xl px-2.5 pt-2 pb-1 border-t border-l border-r border-gray-100 dark:border-white/10 shadow-[0_-2px_8px_rgba(0,0,0,0.02)] -mb-px relative z-10">
                <button
                  type="button"
                  onClick={() => setActiveTab("buy")}
                  className={`px-5 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    activeTab === "buy"
                      ? "bg-[#00895e] text-white shadow-xs"
                      : "text-gray-700 dark:text-gray-300 hover:text-[#00895e]"
                  }`}
                >
                  Buy
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("sell")}
                  className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    activeTab === "sell"
                      ? "bg-[#00895e] text-white shadow-xs"
                      : "text-gray-700 dark:text-gray-300 hover:text-[#00895e]"
                  }`}
                >
                  Sell
                </button>
                <span className="text-gray-300 dark:text-gray-600 text-xs px-0.5">|</span>
                <button
                  type="button"
                  onClick={() => setActiveTab("connect")}
                  className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    activeTab === "connect"
                      ? "bg-[#00895e] text-white shadow-xs"
                      : "text-gray-700 dark:text-gray-300 hover:text-[#00895e]"
                  }`}
                >
                  Connect
                </button>
              </div>

              {/* Main Search Card Body */}
              <div className="bg-white dark:bg-surface-container-low border border-gray-100/90 dark:border-white/10 rounded-3xl rounded-tl-none p-5 sm:p-6 lg:p-7 shadow-[0_15px_45px_rgba(0,0,0,0.06)] space-y-4">
                {/* Search Inputs Row - Pixel Perfect Teal Pill Matching Reference */}
                <form
                  onSubmit={handleSearchSubmit}
                  className="flex items-center bg-white dark:bg-surface-container border-2 border-[#38b2ac]/50 dark:border-emerald-500/50 hover:border-[#00895e] focus-within:border-[#00895e] focus-within:ring-3 focus-within:ring-[#00895e]/15 rounded-full p-1.5 sm:p-2 pl-3.5 sm:pl-4 gap-2.5 shadow-sm transition-all"
                >
                  {/* Search Icon & Text Input - Full Visibility Without Truncation */}
                  <div className="flex-1 flex items-center gap-2.5 min-w-0">
                    <Search className="h-5 w-5 text-[#38b2ac] dark:text-emerald-400 shrink-0" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search for phones, cars, homes, fashion..."
                      className="w-full bg-transparent text-xs sm:text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none font-normal"
                    />
                  </div>

                  {/* Category Dropdown Selector */}
                  <div
                    ref={categoryDropdownRef}
                    className="relative border-l border-gray-200 dark:border-outline-variant/60 pl-2.5 sm:pl-3 pr-1 sm:pr-2 flex items-center shrink-0"
                  >
                    <button
                      type="button"
                      onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                      className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-[#00895e] whitespace-nowrap cursor-pointer py-1"
                    >
                      <LayoutGrid className="h-4.5 w-4.5 text-[#00895e]" />
                      <span className="hidden sm:inline font-bold">{selectedCategory}</span>
                      <ChevronDown
                        className={`h-3.5 w-3.5 text-gray-400 transition-transform duration-200 ${
                          showCategoryDropdown ? "rotate-180 text-[#00895e]" : ""
                        }`}
                      />
                    </button>

                    {/* Rich Category Mega-Menu Popover with Real Studio Images */}
                    {showCategoryDropdown && (
                      <div className="absolute right-[-70px] sm:right-[-60px] md:right-[-40px] lg:right-[-80px] top-full mt-3 w-[calc(100vw-36px)] max-w-[560px] sm:max-w-[620px] bg-white dark:bg-[#062019] backdrop-blur-2xl border-2 border-emerald-500/30 dark:border-emerald-500/50 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.22),0_10px_25px_rgba(0,137,94,0.15)] z-50 p-4 sm:p-5.5 animate-in fade-in zoom-in-95 duration-200">
                        
                        {/* Popover Header */}
                        <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-white/10">
                          <div className="flex items-center gap-2.5">
                            <div className="h-8 w-8 rounded-xl bg-[#00895e]/10 text-[#00895e] flex items-center justify-center shadow-2xs">
                              <LayoutGrid className="h-4.5 w-4.5" />
                            </div>
                            <div>
                              <h3 className="text-xs sm:text-sm font-black text-gray-900 dark:text-white leading-tight">
                                All Categories
                              </h3>
                              <p className="text-[11px] text-gray-500 dark:text-gray-400">
                                Select a category to filter your search
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            {/* All Categories Reset Button */}
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedCategory("All Categories");
                                setShowCategoryDropdown(false);
                              }}
                              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                                selectedCategory === "All Categories"
                                  ? "bg-[#00895e] text-white shadow-xs"
                                  : "bg-gray-100 hover:bg-emerald-50 text-gray-700 hover:text-[#00895e] dark:bg-white/10 dark:text-gray-300"
                              }`}
                            >
                              All Categories
                            </button>
                            <button
                              type="button"
                              onClick={() => setShowCategoryDropdown(false)}
                              className="h-7 w-7 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20 flex items-center justify-center text-gray-500 hover:text-gray-900 dark:text-gray-300 transition-colors cursor-pointer"
                              aria-label="Close categories"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        {/* 8 Category Cards with Real Studio Photos */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 py-3.5">
                          {CATEGORY_ITEMS.map((cat) => {
                            const isSelected = selectedCategory === cat.name;
                            return (
                              <button
                                key={cat.id}
                                type="button"
                                onClick={() => {
                                  setSelectedCategory(cat.name);
                                  setShowCategoryDropdown(false);
                                }}
                                className={`group/cat flex flex-col p-2 sm:p-2.5 rounded-2xl border transition-all duration-200 text-left cursor-pointer relative overflow-hidden ${
                                  isSelected
                                    ? "bg-emerald-50/90 dark:bg-emerald-950/60 border-[#00895e] ring-2 ring-[#00895e]/30 shadow-sm scale-[1.02]"
                                    : "bg-white hover:bg-emerald-50/40 dark:bg-white/5 dark:hover:bg-white/10 border-gray-100 dark:border-white/10 hover:border-emerald-300 hover:shadow-xs"
                                }`}
                              >
                                {/* Studio Photo Box */}
                                <div className="relative w-full h-20 sm:h-22 rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-800/60 mb-2 border border-gray-100 dark:border-white/5 shadow-2xs group-hover/cat:shadow-xs">
                                  <Image
                                    src={cat.image}
                                    alt={cat.name}
                                    fill
                                    unoptimized
                                    className="object-cover object-center transition-transform duration-500 group-hover/cat:scale-110"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover/cat:opacity-100 transition-opacity" />
                                  {isSelected && (
                                    <span className="absolute top-1.5 right-1.5 bg-[#00895e] text-white p-1 rounded-full shadow-xs">
                                      <Check className="h-3 w-3 stroke-[3]" />
                                    </span>
                                  )}
                                </div>

                                {/* Category Name & Details */}
                                <div className="min-w-0">
                                  <p className="text-xs sm:text-[13px] font-bold text-gray-900 dark:text-white truncate group-hover/cat:text-[#00895e] transition-colors">
                                    {cat.name}
                                  </p>
                                  <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate">
                                    {cat.bnName}
                                  </p>
                                  <span className="inline-block text-[9.5px] font-semibold text-emerald-700 dark:text-emerald-400 mt-0.5">
                                    {cat.count}
                                  </span>
                                </div>
                              </button>
                            );
                          })}
                        </div>

                        {/* Footer Action Strip */}
                        <div className="pt-2.5 border-t border-gray-100 dark:border-white/10 flex items-center justify-between text-xs">
                          <span className="text-gray-500 dark:text-gray-400 text-[11px]">
                            Selected: <strong className="text-[#00895e] dark:text-emerald-400 font-bold">{selectedCategory}</strong>
                          </span>
                          <Link
                            href="/categories"
                            onClick={() => setShowCategoryDropdown(false)}
                            className="inline-flex items-center gap-1 font-bold text-[#00895e] dark:text-emerald-400 hover:underline text-xs"
                          >
                            <span>Explore All Categories</span>
                            <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Search Action Button */}
                  <button
                    type="submit"
                    className="bg-[#00895e] hover:bg-[#00744f] text-white rounded-full px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-bold shadow-md shadow-emerald-700/20 transition-all active:scale-95 cursor-pointer flex items-center justify-center shrink-0"
                  >
                    Search
                  </button>
                </form>

                {/* Popular Searches Tags - All 5 tags in ONE single row */}
                <div className="flex items-center gap-2 text-xs pt-0.5 overflow-x-auto scrollbar-none">
                  <span className="text-gray-600 dark:text-gray-400 font-semibold text-[11px] sm:text-xs shrink-0">
                    Popular Searches:
                  </span>
                  <div className="flex items-center gap-1.5 flex-nowrap shrink-0">
                    {POPULAR_SEARCHES.map((term) => (
                      <Link
                        key={term}
                        href={`/categories?q=${encodeURIComponent(term)}`}
                        className="rounded-full border border-gray-200 dark:border-outline-variant/40 bg-white dark:bg-surface-container px-3.5 py-1 text-gray-600 dark:text-gray-300 hover:border-[#00895e] hover:text-[#00895e] hover:bg-emerald-50/50 transition-colors font-medium text-[11px] shadow-2xs whitespace-nowrap shrink-0"
                      >
                        {term}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* BOX 3 (RIGHT COLUMN): Interactive 3D Promotional Discount Slider */}
            <div
              className="min-w-0 relative flex flex-col items-center lg:items-end justify-end group"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Dynamic Slogan Script Badge Floated Above the Box on Top Right */}
              <div className="absolute -top-12 sm:-top-14 right-2 sm:right-6 z-20 transform rotate-[-4deg] select-none pointer-events-none transition-all duration-300">
                <span className="font-serif italic font-bold text-base lg:text-lg text-[#00744f] dark:text-emerald-300 drop-shadow-xs block text-right leading-tight">
                  {HERO_SLIDES[currentSlide].script1}
                </span>
                <span
                  className={`font-serif italic font-bold text-lg lg:text-xl drop-shadow-xs block text-right leading-tight transition-colors duration-300 ${HERO_SLIDES[currentSlide].scriptColor}`}
                >
                  {HERO_SLIDES[currentSlide].script2}
                </span>
              </div>

              {/* Slider Image Container - Fixed Dimensions to Maintain Strict Baseline */}
              <div className="relative w-full max-w-[420px] xl:max-w-[460px] h-[270px] sm:h-[290px] lg:h-[305px]">
                {HERO_SLIDES.map((slide, idx) => (
                  <div
                    key={slide.id}
                    className={`absolute inset-0 transition-all duration-700 ease-out flex items-end justify-center lg:justify-end ${
                      idx === currentSlide
                        ? "opacity-100 scale-100 translate-x-0 z-10"
                        : "opacity-0 scale-95 translate-x-4 pointer-events-none z-0"
                    }`}
                  >
                    <Image
                      src={slide.image}
                      alt={slide.alt}
                      fill
                      priority={idx === 0}
                      unoptimized
                      className="object-contain object-bottom drop-shadow-[0_20px_35px_rgba(0,0,0,0.18)]"
                      sizes="(max-width: 1024px) 100vw, 460px"
                    />
                  </div>
                ))}

                {/* Subtle Floating Prev / Next Arrow Controls on Hover */}
                <button
                  type="button"
                  onClick={prevSlide}
                  aria-label="Previous Slide"
                  className="absolute left-1 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-white/85 hover:bg-white dark:bg-black/50 dark:hover:bg-black/70 shadow-md backdrop-blur-md text-gray-800 dark:text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Next Slide"
                  className="absolute right-1 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-white/85 hover:bg-white dark:bg-black/50 dark:hover:bg-black/70 shadow-md backdrop-blur-md text-gray-800 dark:text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              {/* Slider Bottom Navigation Pill Indicators */}
              <div className="flex items-center gap-1.5 mt-2 z-20">
                {HERO_SLIDES.map((slide, idx) => (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setCurrentSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      idx === currentSlide
                        ? "w-7 bg-[#00895e] dark:bg-emerald-400 shadow-xs"
                        : "w-2 bg-gray-400/50 hover:bg-gray-400/80 dark:bg-white/30"
                    }`}
                  />
                ))}
              </div>
            </div>

          </div>
        </FadeIn>
      </div>

      {/* ========================================================================= */}
      {/* PROFESSIONAL SECTION DIVIDER: Layered Wave with Golden & Emerald Trim     */}
      {/* ========================================================================= */}
      <div className="absolute bottom-0 inset-x-0 overflow-hidden leading-none pointer-events-none z-10">
        <svg
          className="relative block w-full h-6 sm:h-9 lg:h-11 text-white dark:text-background"
          viewBox="0 0 1440 60"
          fill="none"
          preserveAspectRatio="none"
        >
          {/* Subtle Golden & Emerald Accent Wave */}
          <path
            d="M0,20 C320,44 680,6 1060,34 C1240,46 1360,26 1440,30 L1440,60 L0,60 Z"
            fill="url(#hero-divider-gradient)"
            opacity="0.4"
          />
          {/* Crisp Pure White Base Curve (Seamless transition to next section) */}
          <path
            d="M0,26 C300,48 660,12 1040,38 C1220,50 1350,30 1440,34 L1440,60 L0,60 Z"
            fill="currentColor"
          />
          <defs>
            <linearGradient id="hero-divider-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00895e" stopOpacity="0.8" />
              <stop offset="30%" stopColor="#D4AF37" stopOpacity="0.9" />
              <stop offset="65%" stopColor="#00895e" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.9" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
}