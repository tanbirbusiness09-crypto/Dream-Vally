"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import {
  Bell,
  UserRound,
  ChevronDown,
  ChevronRight,
  Heart,
  Truck,
  Plus,
  Search,
  CheckCheck,
  Package,
  MessageSquare,
  Settings,
  LogOut,
  Store,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import LocationSelector from "./LocationSelector";
import ThemeToggle from "./ThemeToggle";
import { Button } from "@/components/ui/button";

export default function TopNavBar() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [searchQuery, setSearchQuery] = useState("");
  const [showCategoriesMenu, setShowCategoriesMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Welcome to Dreamvally Marketplace!",
      desc: "Post your first ad for free and connect with verified buyers nationwide.",
      time: "Just now",
      unread: true,
    },
    {
      id: 2,
      title: "Special Offer: Top Deals Active",
      desc: "Explore discounts up to 30% on verified electronics and mobiles across Bangladesh.",
      time: "2 hours ago",
      unread: true,
    },
  ]);

  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

  interface NavCategory {
    name: string;
    bnName: string;
    image: string;
    href: string;
    count: string;
  }

  const [navCategories, setNavCategories] = useState<NavCategory[]>([
    { name: "Mobiles", bnName: "মোবাইল", image: "/assets/categories/cat_mobiles.jpg", href: "/categories?id=mobiles", count: "0 Ads" },
    { name: "Electronics", bnName: "ইলেকট্রনিক্স", image: "/assets/categories/cat_electronics.jpg", href: "/categories?id=electronics", count: "0 Ads" },
    { name: "Vehicles", bnName: "গাড়ি ও বাইক", image: "/assets/categories/cat_vehicles.jpg", href: "/categories?id=vehicles", count: "0 Ads" },
    { name: "Property", bnName: "জমি ও ফ্ল্যাট", image: "/assets/categories/cat_property.jpg", href: "/property", count: "0 Ads" },
    { name: "Pets", bnName: "পোষা প্রাণী", image: "/assets/categories/cat_pets.jpg", href: "/categories?id=pets", count: "0 Ads" },
    { name: "Services", bnName: "সার্ভিস", image: "/assets/categories/cat_services.jpg", href: "/services", count: "0 Ads" },
    { name: "Delivery", bnName: "ডেলিভারি", image: "/assets/categories/cat_delivery.jpg", href: "/delivery", count: "0 Ads" },
  ]);

  // Load categories from database (with active listing counts)
  useEffect(() => {
    let cancelled = false;
    fetch("/api/categories")
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        if (cancelled || !json?.data?.length) return;
        const bn: Record<string, string> = {
          mobiles: "মোবাইল",
          electronics: "ইলেকট্রনিক্স",
          vehicles: "গাড়ি ও বাইক",
          property: "জমি ও ফ্ল্যাট",
          fashion: "ফ্যাশন",
          home: "হোম ও ফার্নিচার",
          pets: "পোষা প্রাণী",
          services: "সার্ভিস",
          delivery: "ডেলিভারি",
        };
        const paths: Record<string, string> = {
          property: "/property",
          services: "/services",
          delivery: "/delivery",
        };
        setNavCategories(
          json.data.map(
            (c: { slug: string; name: string; imageUrl: string | null; listingCount: number }) => ({
              name: c.name,
              bnName: bn[c.slug] || c.name,
              image: c.imageUrl || "/assets/categories/cat_electronics.jpg",
              href: paths[c.slug] || `/categories?id=${c.slug}`,
              count: `${c.listingCount} Ads`,
            })
          )
        );
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const role = (session?.user as { role?: string } | undefined)?.role || "";
  const isAuthenticated = status === "authenticated";
  const isSeller = role === "SELLER" || role === "VERIFIED_MERCHANT" || role === "ADMIN";
  const memberName =
    (session?.user as { shopName?: string | null } | undefined)?.shopName ||
    session?.user?.name ||
    "Dreamvally Member";
  const initials = memberName
    .split(" ")
    .map((w: string) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase() || "DV";

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (notifRef.current && !notifRef.current.contains(target)) {
        setShowNotifications(false);
      }
      if (userRef.current && !userRef.current.contains(target)) {
        setShowUserMenu(false);
      }
      if (categoriesRef.current && !categoriesRef.current.contains(target)) {
        setShowCategoriesMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (query) {
      router.push(`/categories?q=${encodeURIComponent(query)}`);
    } else {
      router.push("/categories");
    }
    setMobileMenuOpen(false);
  };

  const markAllAsRead = () => {
    setUnreadCount(0);
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  return (
    <header className="sticky top-0 z-50 bg-[#064e3b] dark:bg-[#021f17] border-b border-[#D4AF37]/30 shadow-[0_4px_20px_rgba(0,0,0,0.12)] transition-colors w-full">
      <div className="w-full max-w-[1440px] mx-auto h-[64px] px-3 sm:px-5 lg:px-6 flex items-center justify-between gap-2 lg:gap-3">
        
        {/* ========================================================================= */}
        {/* LEFT: Official Dreamvally Golden Star Logo                               */}
        {/* ========================================================================= */}
        <div className="flex items-center gap-3 lg:gap-4 shrink-0">
          <Link href="/" className="flex items-center gap-2 group py-1" aria-label="Dreamvally Home">
            <div className="relative h-10 sm:h-11 w-36 sm:w-42 flex items-center">
              <Image
                src="/assets/logo/dreamvally_header_logo.png"
                alt="Dreamvally Logo"
                fill
                priority
                unoptimized
                className="object-contain object-left drop-shadow-sm transition-transform group-hover:scale-105 duration-200"
                sizes="(max-width: 768px) 144px, 168px"
              />
            </div>
          </Link>

          {/* ========================================================================= */}
          {/* NAV LINKS: Home, Categories, Deals, Martimony, Delivery                   */}
          {/* ========================================================================= */}
          <nav className="hidden lg:flex items-center gap-1 text-xs font-bold">
            {/* Active Home Button - Frosted Pill */}
            <Link
              href="/"
              className="bg-white/20 hover:bg-white/30 text-white border border-white/30 px-3.5 py-1.5 rounded-full font-bold shadow-xs transition-all text-xs"
            >
              Home
            </Link>

            {/* Categories Dropdown (Hover List Format) */}
            <div
              className="relative"
              ref={categoriesRef}
              onMouseEnter={() => setShowCategoriesMenu(true)}
              onMouseLeave={() => setShowCategoriesMenu(false)}
            >
              <button
                type="button"
                onClick={() => setShowCategoriesMenu(!showCategoriesMenu)}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-white/90 hover:text-[#D4AF37] hover:bg-white/10 transition-colors rounded-full cursor-pointer text-xs font-bold"
              >
                <span>Categories</span>
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    showCategoriesMenu ? "rotate-180 text-[#D4AF37]" : "text-white/70"
                  }`}
                />
              </button>

              {/* Categories Menu Popover (Single-Column Vertical List) */}
              {showCategoriesMenu && (
                <div
                  className="absolute left-0 top-full pt-2 w-[310px] z-50 animate-in fade-in zoom-in-95 duration-150"
                >
                  <div className="bg-white dark:bg-[#07241c] border border-emerald-500/30 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.25)] p-2.5 backdrop-blur-xl">
                    {/* Header Strip */}
                    <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100 dark:border-white/10 mb-1.5">
                      <span className="text-[11px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-wider">
                        All Categories
                      </span>
                      <Link
                        href="/categories"
                        onClick={() => setShowCategoriesMenu(false)}
                        className="text-[11px] font-bold text-[#00895e] dark:text-emerald-400 hover:underline flex items-center gap-0.5"
                      >
                        <span>View All</span>
                        <ChevronRight className="h-3 w-3" />
                      </Link>
                    </div>

                    {/* Vertical List of Categories */}
                    <div className="flex flex-col gap-0.5 max-h-[380px] overflow-y-auto">
                      {navCategories.map((cat) => (
                        <Link
                          key={cat.name}
                          href={cat.href}
                          onClick={() => setShowCategoriesMenu(false)}
                          className="group flex items-center justify-between p-2 rounded-xl hover:bg-emerald-50/80 dark:hover:bg-white/5 transition-all"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="relative h-9 w-9 rounded-lg overflow-hidden shrink-0 bg-gray-100 border border-gray-200/70 shadow-2xs">
                              <Image
                                src={cat.image}
                                alt={cat.name}
                                fill
                                unoptimized
                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-gray-800 dark:text-gray-100 group-hover:text-[#00895e] dark:group-hover:text-emerald-400 transition-colors truncate">
                                {cat.name}
                              </p>
                              <p className="text-[10.5px] text-gray-400 dark:text-gray-500 truncate">
                                {cat.bnName}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">
                              {cat.count}
                            </span>
                            <ChevronRight className="h-3.5 w-3.5 text-gray-300 dark:text-gray-600 group-hover:text-[#00895e] dark:group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Deals Link */}
            <Link
              href="/categories?badge=deals"
              className="px-2.5 py-1.5 text-white/90 hover:text-[#D4AF37] hover:bg-white/10 transition-colors rounded-full text-xs font-bold"
            >
              Deals
            </Link>

            {/* Martimony Link with Gold Heart */}
            <Link
              href="/matrimony"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-white/90 hover:text-[#D4AF37] hover:bg-white/10 transition-colors rounded-full text-xs font-bold"
            >
              <Heart className="h-3.5 w-3.5 fill-[#D4AF37] text-[#D4AF37]" />
              <span>Martimony</span>
            </Link>

            {/* Delivery Link with Gold Truck */}
            <Link
              href="/delivery"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-white/90 hover:text-[#D4AF37] hover:bg-white/10 transition-colors rounded-full text-xs font-bold"
            >
              <Truck className="h-3.5 w-3.5 text-[#D4AF37]" />
              <span>Delivery</span>
            </Link>
          </nav>
        </div>

        {/* ========================================================================= */}
        {/* CENTER: Functional Search Bar - Guaranteed Width, Never Squashed          */}
        {/* ========================================================================= */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden md:flex items-center flex-1 min-w-[200px] lg:min-w-[240px] xl:min-w-[280px] max-w-sm lg:max-w-md mx-2 relative bg-white dark:bg-surface-container border border-white/30 dark:border-white/10 rounded-full pl-3.5 pr-1 py-1 h-10 shadow-xs focus-within:ring-2 focus-within:ring-[#D4AF37]/50 transition-all"
        >
          <Search className="h-4 w-4 text-[#00895e] dark:text-emerald-400 shrink-0 mr-2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for phones, cars, homes, fashion..."
            className="w-full bg-transparent text-xs sm:text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none font-medium min-w-0"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 mr-1 cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
          <button
            type="submit"
            aria-label="Search"
            className="w-8 h-8 rounded-full bg-[#00895e] hover:bg-[#00744f] text-white flex items-center justify-center shadow-xs shrink-0 transition-transform active:scale-95 cursor-pointer font-bold"
          >
            <Search className="h-3.5 w-3.5 stroke-[2.5]" />
          </button>
        </form>

        {/* ========================================================================= */}
        {/* RIGHT: Location, Theme Toggle, Notifications, Account, + Post Ad          */}
        {/* ========================================================================= */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Location Selector (Functional Bangladesh Cities) */}
          <LocationSelector variant="navbar" />

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Functional Notification Button with Dropdown Popover */}
          <div className="relative" ref={notifRef}>
            <button
              type="button"
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowUserMenu(false);
              }}
              aria-label="Notifications"
              className="relative p-2 text-white/90 hover:text-white hover:bg-white/15 rounded-full transition-all cursor-pointer"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-[#064e3b] animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Interactive Notifications Panel */}
            {showNotifications && (
              <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white dark:bg-surface-container-lowest border border-gray-100 dark:border-outline-variant/30 rounded-2xl shadow-2xl py-3 z-50 text-gray-900 dark:text-white animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between px-4 pb-2.5 border-b border-gray-100 dark:border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs sm:text-sm">Notifications</span>
                    {unreadCount > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-[#00895e]/10 text-[#00895e] text-[10px] font-bold">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      type="button"
                      onClick={markAllAsRead}
                      className="text-[11px] text-[#00895e] dark:text-emerald-400 font-semibold hover:underline cursor-pointer inline-flex items-center gap-1"
                    >
                      <CheckCheck className="h-3 w-3" />
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-gray-100 dark:divide-white/5">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer ${
                        n.unread ? "bg-emerald-50/40 dark:bg-emerald-950/20" : ""
                      }`}
                      onClick={() => markAllAsRead()}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-xs font-bold text-gray-900 dark:text-white leading-tight">
                          {n.title}
                        </p>
                        <span className="text-[10px] text-gray-400 shrink-0">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-gray-600 dark:text-gray-300 mt-1 line-clamp-2 leading-relaxed">
                        {n.desc}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="px-4 pt-2.5 border-t border-gray-100 dark:border-white/5 text-center">
                  <Link
                    href="/dashboard"
                    onClick={() => setShowNotifications(false)}
                    className="text-xs text-[#00895e] dark:text-emerald-400 font-bold hover:underline"
                  >
                    View notification center →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Functional User Account Button with Dropdown Menu */}
          <div className="relative" ref={userRef}>
            <button
              type="button"
              onClick={() => {
                setShowUserMenu(!showUserMenu);
                setShowNotifications(false);
              }}
              aria-label="Account"
              className="p-2 text-white/90 hover:text-white hover:bg-white/15 rounded-full transition-all cursor-pointer"
            >
              <UserRound className="h-5 w-5" />
            </button>

            {/* Interactive User Account Menu */}
            {showUserMenu && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-surface-container-lowest border border-gray-100 dark:border-outline-variant/30 rounded-2xl shadow-2xl py-3 z-50 text-gray-900 dark:text-white animate-in fade-in zoom-in-95 duration-150">
                {/* User Identity Card */}
                <div className="px-4 pb-3 border-b border-gray-100 dark:border-white/5">
                  <div className="flex items-center gap-2.5">
                    <div className="h-10 w-10 rounded-full bg-[#D4AF37] text-gray-950 font-black flex items-center justify-center text-sm shadow-xs">
                      {initials}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold truncate">{memberName}</p>
                      <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                        {isAuthenticated
                          ? isSeller
                            ? `✓ ${role === "VERIFIED_MERCHANT" ? "Verified Merchant" : "Seller Account"}`
                            : "✓ Registered Buyer"
                          : "Sign in to your account"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Account Navigation Links */}
                <div className="py-2 space-y-0.5">
                  {!isAuthenticated ? (
                    <>
                      <Link
                        href="/login"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 hover:text-[#00895e] transition-colors"
                      >
                        <UserRound className="h-4 w-4 text-gray-400" />
                        <span>Sign In</span>
                      </Link>
                      <Link
                        href="/register"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 hover:text-[#00895e] transition-colors"
                      >
                        <Sparkles className="h-4 w-4 text-gray-400" />
                        <span>Create Account</span>
                      </Link>
                    </>
                  ) : isSeller ? (
                    <>
                      <Link
                        href="/seller/dashboard"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 hover:text-[#00895e] transition-colors"
                      >
                        <Store className="h-4 w-4 text-gray-400" />
                        <span>Seller Dashboard</span>
                      </Link>
                      <Link
                        href="/seller/products"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 hover:text-[#00895e] transition-colors"
                      >
                        <Package className="h-4 w-4 text-gray-400" />
                        <span>My Ads & Listings</span>
                      </Link>
                      <Link
                        href="/seller/settings"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 hover:text-[#00895e] transition-colors"
                      >
                        <Settings className="h-4 w-4 text-gray-400" />
                        <span>Shop Settings</span>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/seller/register"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 transition-colors"
                      >
                        <Store className="h-4 w-4" />
                        <span>Become a Seller</span>
                      </Link>
                      <Link
                        href="/dashboard"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 hover:text-[#00895e] transition-colors"
                      >
                        <MessageSquare className="h-4 w-4 text-gray-400" />
                        <span>Messages & Inquiries</span>
                      </Link>
                      <Link
                        href="/dashboard"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 hover:text-[#00895e] transition-colors"
                      >
                        <Settings className="h-4 w-4 text-gray-400" />
                        <span>Account Settings</span>
                      </Link>
                    </>
                  )}
                </div>

                {/* Logout / Switch User */}
                {isAuthenticated && (
                  <div className="pt-2 border-t border-gray-100 dark:border-white/5 px-2">
                    <button
                      type="button"
                      onClick={() => {
                        setShowUserMenu(false);
                        signOut({ callbackUrl: "/" });
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-1.5 text-xs font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-colors cursor-pointer"
                    >
                      <LogOut className="h-4 w-4 text-rose-500" />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ========================================================================= */}
          {/* CTA: Golden Star + Post Ad Button                                         */}
          {/* ========================================================================= */}
          <Button
            asChild
            className="rounded-full bg-[#D4AF37] hover:bg-[#c49f27] text-gray-950 text-xs sm:text-sm font-black px-4 sm:px-5 h-10 shadow-md shadow-black/20 transition-all hover:scale-105 active:scale-95 cursor-pointer tracking-wide"
          >
            <Link href="/post-ad" className="inline-flex items-center gap-1.5">
              <Plus className="h-4 w-4 stroke-[3]" />
              <span>Post Ad</span>
            </Link>
          </Button>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
            className="xl:hidden p-2 text-white/90 hover:text-white hover:bg-white/10 rounded-full transition-all cursor-pointer ml-0.5"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* MOBILE DRAWER: Interactive Navigation Menu for Small Screens              */}
      {/* ========================================================================= */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#053d2e] border-t border-white/10 px-4 py-4 space-y-4 animate-in slide-in-from-top-4 duration-200">
          {/* Mobile Search Bar */}
          <form onSubmit={handleSearchSubmit} className="flex items-center bg-white rounded-full px-3.5 py-2 border border-white/20 shadow-xs">
            <Search className="h-4 w-4 text-[#00895e] mr-2 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search marketplace..."
              className="w-full bg-transparent text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none font-medium"
            />
            <button type="submit" className="px-3.5 py-1.5 bg-[#00895e] hover:bg-[#00744f] text-white rounded-full font-bold text-xs shrink-0 cursor-pointer">
              Search
            </button>
          </form>

          {/* Mobile Navigation Links */}
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-white/10 text-white font-bold flex items-center gap-2"
            >
              <span>🏠 Home</span>
            </Link>
            <Link
              href="/categories"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-white/10 text-white font-bold flex items-center gap-2"
            >
              <span>📦 Categories</span>
            </Link>
            <Link
              href="/categories?badge=deals"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-white/10 text-white font-bold flex items-center gap-2"
            >
              <span>🔥 Deals</span>
            </Link>
            <Link
              href="/matrimony"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-white/10 text-white font-bold flex items-center gap-2"
            >
              <span>💍 Martimony</span>
            </Link>
            <Link
              href="/delivery"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-white/10 text-white font-bold flex items-center gap-2"
            >
              <span>🚚 Delivery</span>
            </Link>
            <Link
              href={isSeller ? "/seller/products" : isAuthenticated ? "/seller/register" : "/login"}
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-white/10 text-white font-bold flex items-center gap-2"
            >
              <span>{isSeller ? "📋 My Listings" : "🏪 Become a Seller"}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}