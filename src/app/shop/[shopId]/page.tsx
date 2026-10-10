"use client";

import React, { use, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Star,
  MapPin,
  Calendar,
  ShieldCheck,
  MessageCircle,
  Share2,
  Store,
  BadgeCheck,
  CheckCircle2,
  Search,
  Loader2
} from 'lucide-react';
import ListingCard from '@/components/layout/ListingCard';

interface ShopInfo {
  id: string;
  name: string;
  handle: string;
  slug: string | null;
  description: string | null;
  logo: string | null;
  banner: string | null;
  rating: number;
  reviewsCount: number;
  isVerified: boolean;
  location: string;
  joinedDate: string;
  listingCount: number;
}

interface ShopProduct {
  id: string;
  title: string;
  price: number | string;
  city: string | null;
  createdAt: string;
  category?: { name: string } | null;
  images: { url: string }[];
}

const timeAgo = (iso: string) => {
  const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 60) return `${Math.max(1, mins)}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString();
};

export default function ShopStorefrontPage({ params }: { params: Promise<{ shopId: string }> }) {
  const unwrappedParams = use(params);
  const { shopId } = unwrappedParams;

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [shopData, setShopData] = useState<ShopInfo | null>(null);
  const [shopProducts, setShopProducts] = useState<ShopProduct[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch(`/api/shops/${encodeURIComponent(shopId)}`)
      .then((r) => {
        if (r.status === 404) throw new Error('notfound');
        if (!r.ok) throw new Error('error');
        return r.json();
      })
      .then((json) => {
        setShopData(json.shop);
        setShopProducts(json.listings || []);
      })
      .catch((e) => {
        if (e?.message === 'notfound') setNotFound(true);
        else setNotFound(true);
      })
      .finally(() => setLoading(false));
  }, [shopId]);

  const formatPrice = (p: number | string) =>
    `৳ ${Number(p).toLocaleString('en-IN')}`;

  const filteredProducts = shopProducts.filter((p) => {
    const catName = p.category?.name || 'Others';
    const matchesCat = selectedCategory === 'All' || catName === selectedCategory;
    const matchesQ = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQ;
  });

  // Category counts derived from DB listings
  const categoryCounts = React.useMemo(() => {
    const map = new Map<string, number>();
    for (const p of shopProducts) {
      const name = p.category?.name || 'Others';
      map.set(name, (map.get(name) || 0) + 1);
    }
    return [
      { name: 'All', count: shopProducts.length },
      ...Array.from(map.entries()).map(([name, count]) => ({ name, count })),
    ];
  }, [shopProducts]);

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-6 h-6 text-emerald-600 animate-spin" />
        <p className="text-xs text-muted-foreground font-medium">Loading shop...</p>
      </div>
    );
  }

  if (notFound || !shopData) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center gap-4 px-4 text-center">
        <Store className="w-10 h-10 text-muted-foreground" />
        <div>
          <h1 className="text-xl font-bold text-foreground">Shop not found</h1>
          <p className="text-xs text-muted-foreground mt-1">
            The shop you are looking for does not exist or has been removed.
          </p>
        </div>
        <Link
          href="/categories"
          className="px-5 py-2.5 rounded-xl bg-[#00895e] text-white text-xs font-bold hover:bg-[#00744f] transition-colors"
        >
          Browse Marketplace
        </Link>
      </div>
    );
  }

  const initials = shopData.name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'SH';

  return (
    <div className="min-h-screen bg-surface pb-20">
      
      {/* 1. Shop Banner Header */}
      <div className="bg-surface-container-lowest border-b border-outline-variant">
        <div className="w-full h-48 md:h-64 relative overflow-hidden bg-gradient-to-r from-[#064e3b] via-[#00895e] to-emerald-950">
          {shopData.banner && (
            <Image
              src={shopData.banner}
              alt={shopData.name}
              fill
              className="object-cover opacity-60"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative -mt-16 sm:-mt-20 sm:flex sm:items-end sm:space-x-5 pb-8">
            <div className="relative inline-block h-32 w-32 sm:h-40 sm:w-40 rounded-3xl bg-surface border-4 border-surface p-1 shadow-2xl shrink-0 overflow-hidden">
              {shopData.logo ? (
                <Image src={shopData.logo} alt={shopData.name} fill className="object-cover rounded-2xl" sizes="160px" />
              ) : (
                <div className="w-full h-full bg-[#064e3b] text-[#D4AF37] rounded-2xl flex flex-col items-center justify-center font-black shadow-inner">
                  <Store className="w-8 h-8 mb-1" />
                  <span className="text-xl">{initials}</span>
                </div>
              )}
            </div>
            
            <div className="mt-6 sm:mt-0 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-between sm:space-x-6 sm:pb-1">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black text-foreground truncate">{shopData.name}</h1>
                  {shopData.isVerified && (
                    <BadgeCheck className="w-5 h-5 text-[#D4AF37] fill-[#D4AF37] shrink-0" aria-label="Verified Merchant" />
                  )}
                </div>
                <p className="text-muted-foreground text-xs font-semibold mt-0.5">
                  {shopData.handle} • {shopData.listingCount} products live
                </p>
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
                  onClick={() => alert(`Starting chat with ${shopData.name}...`)}
                  className="px-5 py-2.5 rounded-xl bg-[#00895e] hover:bg-[#00744f] text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat with Merchant</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="p-2.5 rounded-xl border border-outline-variant hover:bg-surface-container text-foreground transition-all"
                  title="Share Store"
                >
                  {copied ? <CheckCircle2 className="w-4 h-4 text-[#00895e]" /> : <Share2 className="w-4 h-4" />}
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
                {shopData.description || 'No description provided yet.'}
              </p>
              <div className="space-y-3 pt-2 border-t border-outline-variant/60 text-xs">
                {shopData.isVerified && (
                  <div className="flex items-center gap-2.5 text-muted-foreground">
                    <ShieldCheck className="w-4 h-4 text-[#00895e]" />
                    <span>Verified Trade License &amp; KYC</span>
                  </div>
                )}
                <div className="flex items-center gap-2.5 text-muted-foreground">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>Member since {shopData.joinedDate}</span>
                </div>
                <div className="flex items-center gap-2.5 text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-[#00895e]" />
                  <span>Escrow-protected transactions</span>
                </div>
              </div>
            </div>

            {/* Store Categories Filter */}
            <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/80 shadow-xs space-y-3">
              <h3 className="font-extrabold text-sm text-foreground">Shop Categories</h3>
              <div className="space-y-1.5 text-xs font-bold">
                {categoryCounts.map((c) => (
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
            {filteredProducts.length === 0 ? (
              <div className="bg-surface-container-lowest p-10 rounded-3xl border border-outline-variant/80 text-center">
                <Store className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm font-bold text-foreground">No products found</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {shopProducts.length === 0
                    ? 'This shop has not listed any products yet.'
                    : 'Try a different search or category.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="relative group">
                    <ListingCard
                      id={product.id}
                      title={product.title}
                      price={formatPrice(product.price)}
                      location={product.city || 'Bangladesh'}
                      postedTime={timeAgo(product.createdAt)}
                      image={product.images[0]?.url || 'https://placehold.co/400x400/e2e8f0/64748b?text=No+Image'}
                    />
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>
      </div>

    </div>
  );
}
