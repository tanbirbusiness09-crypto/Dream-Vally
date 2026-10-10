import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import HomeHero from "@/components/home/HomeHero";
import FadeIn from "@/components/home/FadeIn";
import CategoryProductSection from "@/components/home/CategoryProductSection";
import {
  getHomeCategories,
  getPopularProducts,
  getHomeShowcases,
  getFlashDeals,
  type HomeCategory,
  type HomeProduct,
} from "@/lib/home-data";
import {
  ChevronRight,
  ChevronLeft,
  Flame,
  ShieldCheck,
  Truck,
  Headphones,
  UserCheck,
  ArrowRight,
  Heart,
  LayoutGrid,
  Star,
  Check,
} from "lucide-react";

function SectionSkeleton({ className = "h-40" }: { className?: string }) {
  return (
    <div
      className={`w-full animate-pulse rounded-2xl bg-gray-100 dark:bg-surface-container ${className}`}
    />
  );
}

// 1. Top Categories Section (Pastel Circular Icon Badges matching reference)
function TopCategories({ categories }: { categories: HomeCategory[] }) {
  if (categories.length === 0) return null;
  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-1 sm:pt-2 pb-8 sm:pb-10">
      <FadeIn>
        {/* Section Header */}
        <div className="flex justify-between items-end mb-6 gap-3">
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2.5">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-[#00895e]/10 text-[#00895e]">
                <LayoutGrid className="h-4.5 w-4.5" />
              </span>
              Top Categories
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              Browse what people buy and sell most.
            </p>
          </div>
          <Link
            href="/categories"
            className="inline-flex items-center gap-1 text-[#00895e] dark:text-emerald-400 font-semibold text-xs sm:text-sm hover:underline"
          >
            View all categories
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Infinite Slow-Motion Sliding Category Carousel */}
        <div className="slider-container group/slider relative w-full overflow-hidden py-1">
          {/* Left Gradient Edge Fade */}
          <div className="absolute left-0 inset-y-0 w-8 sm:w-20 bg-gradient-to-r from-white dark:from-background to-transparent z-10 pointer-events-none" />

          {/* Right Gradient Edge Fade */}
          <div className="absolute right-0 inset-y-0 w-8 sm:w-20 bg-gradient-to-l from-white dark:from-background to-transparent z-10 pointer-events-none" />

          {/* Slow-Motion Marquee Track */}
          <div className="animate-slow-marquee group-hover/slider:[animation-play-state:paused] flex gap-3.5 sm:gap-5 py-2">
            {[...categories, ...categories].map((cat, idx) => (
              <Link
                key={`${cat.id}-${idx}`}
                href={cat.path}
                title={cat.name}
                className="group relative block w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 shrink-0 rounded-2xl sm:rounded-3xl overflow-hidden bg-white dark:bg-surface-container-low border-2 border-gray-100/90 dark:border-white/10 hover:border-[#00895e] dark:hover:border-emerald-500/60 shadow-[0_4px_14px_rgba(0,0,0,0.05)] hover:shadow-[0_14px_30px_rgba(0,137,94,0.22)] hover:-translate-y-2 transition-all duration-300"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  unoptimized
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 130px, 180px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

// 2. Trust Strip & App Promo Banner (Pixel-perfect matching reference design)
function TrustAndApp() {
  const trustList = [
    {
      icon: ShieldCheck,
      title: "বিশ্বাস ও নিরাপত্তা",
      desc: "সুরক্ষিত লেনদেন, নিশ্চিত কেনাকাটা",
    },
    {
      icon: Truck,
      title: "দ্রুত ডেলিভারি",
      desc: "সারা বাংলাদেশে",
    },
    {
      icon: Headphones,
      title: "২৪/৭ সাপোর্ট",
      desc: "সব সময় আপনার পাশে",
    },
    {
      icon: UserCheck,
      title: "প্রমাণিত বিক্রেতা",
      desc: "বিশ্বস্ত ও নিরীক্ষিত",
    },
  ];

  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-10">
      <FadeIn>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
          {/* Left: 4 Bengali Trust Badges in a Clean 4-Column Row (White Card) */}
          <div className="lg:col-span-8 bg-white dark:bg-surface-container-low border border-gray-100/90 dark:border-outline-variant/30 rounded-3xl p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] grid grid-cols-2 md:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-gray-100 dark:divide-white/10">
            {trustList.map(({ icon: Icon, title, desc }, idx) => (
              <div
                key={title}
                className={`flex items-center gap-3 ${idx !== 0 ? "md:pl-4" : ""} pt-3 md:pt-0 min-w-0`}
              >
                <div className="h-12 w-12 rounded-full bg-[#e8f7f0] dark:bg-emerald-950/60 text-[#00895e] flex items-center justify-center shrink-0 shadow-2xs">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white leading-tight">
                    {title}
                  </p>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 leading-tight line-clamp-1">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Dreamally App Banner */}
          <div className="lg:col-span-4 relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#006e4a] to-[#00895e] text-white p-5 sm:p-6 flex items-center justify-between gap-4 shadow-[0_10px_30px_rgba(0,110,74,0.15)]">
            {/* Ambient Background Glow */}
            <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-white/10 rounded-full blur-xl pointer-events-none" />

            {/* Phone Screen Preview */}
            <div className="relative h-22 w-13 sm:h-26 sm:w-15 shrink-0 rounded-xl overflow-hidden border-2 border-white/40 shadow-lg hidden sm:block">
              <Image
                src="/assets/hero/hero_app_shopping.jpg"
                alt="Dreamally App"
                fill
                className="object-cover"
                sizes="70px"
              />
            </div>

            {/* App Info & Badges */}
            <div className="flex-1 min-w-0">
              <h3 className="font-display font-bold text-base sm:text-lg leading-snug">
                Dreamally App
              </h3>
              <p className="text-xs text-emerald-100 font-medium mb-3">
                Better Deals, On The Go!
              </p>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-black/80 hover:bg-black px-2.5 py-1 text-[10px] font-semibold text-white shadow-xs cursor-pointer transition-colors">
                  Google Play
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-black/80 hover:bg-black px-2.5 py-1 text-[10px] font-semibold text-white shadow-xs cursor-pointer transition-colors">
                  App Store
                </span>
              </div>
            </div>

            {/* Circular Arrow Action Button */}
            <Link
              href="/categories"
              className="shrink-0 h-11 w-11 rounded-full border border-white/40 bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all shadow-sm"
              aria-label="Download App"
            >
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

// 3. Popular Products Section
function PopularProducts({ products }: { products: HomeProduct[] }) {
  if (products.length === 0) return null;
  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-10 sm:pb-12">
      <FadeIn>
        {/* Header */}
        <div className="flex justify-between items-end mb-6 gap-3">
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Flame className="h-5 w-5 text-rose-500" />
              Popular Products
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              Trending items you might like
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="h-8 w-8 rounded-full border border-gray-200 dark:border-outline-variant/40 text-gray-500 hover:bg-gray-100 dark:hover:bg-surface-container flex items-center justify-center transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="h-8 w-8 rounded-full border border-gray-200 dark:border-outline-variant/40 text-gray-500 hover:bg-gray-100 dark:hover:bg-surface-container flex items-center justify-center transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Product Cards Grid (6 Items) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {products.map((prod) => (
            <Link
              key={prod.id}
              href={`/product/${prod.id}`}
              className="group flex flex-col rounded-2xl bg-white dark:bg-surface-container-low border border-gray-100 dark:border-outline-variant/30 shadow-[0_4px_14px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_22px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 p-3 relative min-w-0"
            >
              {/* Product Image Box */}
              <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-gray-50 dark:bg-surface-container mb-3 flex items-center justify-center">
                <Image
                  src={prod.image}
                  alt={prod.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 220px"
                />

                {/* Status Badge top left */}
                {prod.badge && (
                  <span
                    className={`absolute top-2 left-2 rounded-full px-2 py-0.5 text-[10px] font-bold shadow-sm ${prod.badge.className}`}
                  >
                    {prod.badge.label}
                  </span>
                )}

                {/* Heart Icon top right */}
                <button
                  type="button"
                  aria-label="Add to favorites"
                  className="absolute top-2 right-2 h-7 w-7 rounded-full bg-white/90 dark:bg-surface-container-lowest/90 text-gray-400 hover:text-rose-500 flex items-center justify-center shadow-sm transition-colors"
                >
                  <Heart className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Product Details */}
              <div className="flex-1 flex flex-col justify-between">
                <h3 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white truncate">
                  {prod.title}
                </h3>
                <p className="text-sm sm:text-base font-extrabold text-[#00895e] dark:text-emerald-400 mt-1">
                  {prod.price}
                </p>

                {/* Rating & Reviews */}
                <div className="flex items-center gap-1 mt-1 text-gray-500 dark:text-gray-400 text-[11px]">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    {prod.rating}
                  </span>
                  <span>({prod.reviews})</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}

// 4. Shop Smart, Live Better Bottom Banner
function ShopSmartBanner() {
  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-14 sm:pb-16">
      <FadeIn>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#013220] via-[#005a3c] to-[#014d33] text-white p-6 sm:p-8 md:p-10 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left Copy & CTA */}
            <div className="lg:col-span-5 space-y-4">
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">
                Shop Smart, Live Better
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-sm">
                Discover amazing deals, trusted sellers and everything you need — all in one place.
              </p>
              <Link
                href="/categories"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs sm:text-sm px-5 py-2.5 shadow-md shadow-emerald-950/40 transition-all"
              >
                Explore Now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Center Product Showcase */}
            <div className="lg:col-span-4 relative flex items-center justify-center">
              <div className="relative w-full max-w-[280px] aspect-[4/3] rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
                <Image
                  src="/assets/categories/cat_electronics.jpg"
                  alt="Featured Gadgets"
                  fill
                  className="object-cover"
                  sizes="280px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute bottom-2 left-3 text-[11px] font-semibold text-white/90">
                  Best Tech & Gadget Deals
                </span>
              </div>
            </div>

            {/* Right Trust Highlights & Signature */}
            <div className="lg:col-span-3 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-center gap-2.5">
              <div className="flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-3.5 py-1.5 text-xs text-white border border-white/15">
                <Check className="h-3.5 w-3.5 text-emerald-300" />
                <span>Best Deals</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-3.5 py-1.5 text-xs text-white border border-white/15">
                <Check className="h-3.5 w-3.5 text-emerald-300" />
                <span>Verified Sellers</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-3.5 py-1.5 text-xs text-white border border-white/15">
                <Check className="h-3.5 w-3.5 text-emerald-300" />
                <span>Secure Payment</span>
              </div>

              <p className="text-emerald-200/80 text-xs italic mt-2 font-medium">
                Dreamally - Your Trusted Marketplace ♡
              </p>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

export default async function HomePage() {
  const [categories, popularProducts, showcases, deals] = await Promise.all([
    getHomeCategories(),
    getPopularProducts(),
    getHomeShowcases(),
    getFlashDeals(),
  ]);

  return (
    <main className="w-full max-w-full overflow-x-hidden flex flex-col items-center bg-white dark:bg-background">
      <Suspense fallback={<SectionSkeleton className="h-[460px]" />}>
        <div className="relative z-30 w-full">
          <HomeHero categories={categories} deals={deals} />
        </div>
      </Suspense>

      <Suspense fallback={<SectionSkeleton className="max-w-[1440px] mx-auto h-48 px-4 sm:px-6 lg:px-8" />}>
        <div className="relative z-10 w-full">
          <TopCategories categories={categories} />
        </div>
      </Suspense>

      <Suspense fallback={<SectionSkeleton className="max-w-[1440px] mx-auto h-28 px-4 sm:px-6 lg:px-8" />}>
        <TrustAndApp />
      </Suspense>

      <Suspense fallback={<SectionSkeleton className="max-w-[1440px] mx-auto h-72 px-4 sm:px-6 lg:px-8" />}>
        <PopularProducts products={popularProducts} />
      </Suspense>

      {/* Category-Wise Product Showcases with Titles */}
      {showcases.map((showcase) => (
        <Suspense key={showcase.id} fallback={<SectionSkeleton className="max-w-[1440px] mx-auto h-72 px-4 sm:px-6 lg:px-8" />}>
          <CategoryProductSection showcase={showcase} />
        </Suspense>
      ))}

      <Suspense fallback={<SectionSkeleton className="max-w-[1440px] mx-auto h-48 px-4 sm:px-6 lg:px-8" />}>
        <ShopSmartBanner />
      </Suspense>
    </main>
  );
}