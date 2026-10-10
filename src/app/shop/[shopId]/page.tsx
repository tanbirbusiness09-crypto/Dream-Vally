"use client";

import React, { use, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Star,
  MapPin,
  Calendar,
  ShieldCheck,
  Phone,
  MessageCircle,
  Share2,
  Heart,
  Store,
  BadgeCheck,
  CheckCircle2,
  Search,
  Filter,
  ArrowRight
} from 'lucide-react';
import ListingCard from '@/components/layout/ListingCard';

export default function ShopStorefrontPage({ params }: { params: Promise<{ shopId: string }> }) {
  const unwrappedParams = use(params);
  const { shopId } = unwrappedParams;

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Shop Data
  const shopData = {
    name: "Dream Fashion Official Store",
    handle: "@dreamfashion",
    tagline: "Premier ethnic & contemporary fashion across Dhaka & Riyadh",
    description: "Your verified one-stop merchant for luxury panjabis, festive sarees, and authentic lifestyle accessories. Offering insured escrow delivery across Bangladesh and GCC Saudi Arabia.",
    joinedDate: "October 2024",
    location: "Gulshan-2, Dhaka • Riyadh Delivery Hub",
    rating: "4.9",
    reviewsCount: 148,
    followers: 1240,
    bannerImage: "/assets/hero/dreamvally_attractive_hero_bg.jpg",
  };

  const shopProducts = [
    {
      id: "prod_mens_panjabi",
      title: "Exclusive Embroidered Cotton Panjabi",
      price: "৳ 1,850",
      location: "Gulshan, Dhaka",
      postedTime: "Today, 10:23 AM",
      image: "/assets/products/prod_mens_panjabi.jpg",
      category: "Men's Fashion",
    },
    {
      id: "prod_iphone15",
      title: "iPhone 15 Pro Max (Titanium 256GB)",
      price: "৳ 1,38,000",
      location: "Gulshan, Dhaka",
      postedTime: "Yesterday",
      image: "/assets/products/prod_iphone15.jpg",
      category: "Gadgets",
    },
    {
      id: "prod_macbook_m2",
      title: "Apple MacBook Air M2 16GB",
      price: "৳ 1,24,000",
      location: "Gulshan, Dhaka",
      postedTime: "2 days ago",
      image: "/assets/products/prod_macbook_m2.jpg",
      category: "Laptops",
    },
    {
      id: "prod_yamaha_r15",
      title: "Yamaha R15 V4 Racing Blue Special",
      price: "৳ 5,95,000",
      location: "Dhaka Metro",
      postedTime: "3 days ago",
      image: "/assets/products/prod_yamaha_r15.jpg",
      category: "Vehicles",
    },
  ];

  const filteredProducts = shopProducts.filter((p) => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesQ = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQ;
  });

  return (
    <div className="min-h-screen bg-surface pb-20">
      
      {/* 1. Shop Banner Header */}
      <div className="bg-surface-container-lowest border-b border-outline-variant">
        <div className="w-full h-48 md:h-64 relative overflow-hidden bg-gradient-to-r from-[#064e3b] via-[#00895e] to-emerald-950">
          <Image
            src={shopData.bannerImage}
            alt={shopData.name}
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative -mt-16 sm:-mt-20 sm:flex sm:items-end sm:space-x-5 pb-8">
            <div className="relative inline-block h-32 w-32 sm:h-40 sm:w-40 rounded-3xl bg-surface border-4 border-surface p-1 shadow-2xl shrink-0 overflow-hidden">
              <div className="w-full h-full bg-[#064e3b] text-[#D4AF37] rounded-2xl flex flex-col items-center justify-center font-black shadow-inner">
                <Store className="w-8 h-8 mb-1" />
                <span className="text-xl">DF</span>
              </div>
            </div>
            
            <div className="mt-6 sm:mt-0 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-between sm:space-x-6 sm:pb-1">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black text-foreground truncate">{shopData.name}</h1>
                  <BadgeCheck className="w-5 h-5 text-[#D4AF37] fill-[#D4AF37] shrink-0" title="Verified Merchant" />
                </div>
                <p className="text-muted-foreground text-xs font-semibold mt-0.5">{shopData.handle} • {shopData.tagline}</p>
                <div className="flex items-center gap-3 mt-2 text-xs">
                  <span className="flex items-center gap-1 font-bold text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-current" /> {shopData.rating} ({shopData.reviewsCount} reviews)
                  </span>
                  <span className="text-muted-foreground">•</span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="w-3.5 h-3.5 text-[#00895e]" /> {shopData.location}
                  </span>
                </div>
              </div>

              <div className="mt-4 sm:mt-0 flex items-center gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={() => alert('Starting chat with Dream Fashion Store...')}
                  className="px-5 py-2.5 rounded-xl bg-[#00895e] hover:bg-[#00744f] text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat with Merchant</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Shop link copied to clipboard!');
                  }}
                  className="p-2.5 rounded-xl border border-outline-variant hover:bg-surface-container text-foreground transition-all"
                  title="Share Store"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Store Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left: Store Meta Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/80 shadow-xs space-y-4">
              <h3 className="font-extrabold text-sm text-foreground">About Merchant</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {shopData.description}
              </p>
              <div className="space-y-3 pt-2 border-t border-outline-variant/60 text-xs">
                <div className="flex items-center gap-2.5 text-muted-foreground">
                  <ShieldCheck className="w-4 h-4 text-[#00895e]" />
                  <span>Verified Trade License &amp; KYC</span>
                </div>
                <div className="flex items-center gap-2.5 text-muted-foreground">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>Member since {shopData.joinedDate}</span>
                </div>
                <div className="flex items-center gap-2.5 text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-[#00895e]" />
                  <span>100% Authentic Product Guarantee</span>
                </div>
              </div>
            </div>

            {/* Store Categories Filter */}
            <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/80 shadow-xs space-y-3">
              <h3 className="font-extrabold text-sm text-foreground">Shop Categories</h3>
              <div className="space-y-1.5 text-xs font-bold">
                {[
                  { name: 'All', count: shopProducts.length },
                  { name: "Men's Fashion", count: 1 },
                  { name: 'Gadgets', count: 1 },
                  { name: 'Laptops', count: 1 },
                  { name: 'Vehicles', count: 1 },
                ].map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setSelectedCategory(c.name)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all ${
                      selectedCategory === c.name
                        ? 'bg-[#00895e] text-white shadow-xs'
                        : 'text-muted-foreground hover:bg-surface-container hover:text-foreground'
                    }`}
                  >
                    <span>{c.name === 'All' ? 'All Products' : c.name}</span>
                    <span className="text-[10px] opacity-80">{c.count}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Products Showcase */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Search & Sort Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/80">
              <div className="relative flex-1 w-full sm:max-w-md">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products in this shop..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-outline-variant bg-surface text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#00895e]"
                />
              </div>

              <span className="text-xs text-muted-foreground font-semibold">
                Showing {filteredProducts.length} items
              </span>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProducts.map((product) => (
                <div key={product.id} className="relative group">
                  <ListingCard
                    id={product.id}
                    title={product.title}
                    price={product.price}
                    location={product.location}
                    postedTime={product.postedTime}
                    image={product.image}
                  />
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
