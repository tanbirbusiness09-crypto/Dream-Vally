'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  Search, 
  X, 
  ChevronRight, 
  LayoutGrid, 
  Layers, 
  SlidersHorizontal, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  FilterX, 
  ArrowUpDown,
  Tag
} from 'lucide-react';
import { 
  CATALOG_CATEGORIES, 
  CATALOG_PRODUCTS, 
  CatalogProduct, 
  CatalogCategory 
} from '@/lib/catalogData';
import ProductCard from '@/components/categories/ProductCard';
import CategoryFilterSidebar from '@/components/categories/CategoryFilterSidebar';
import CategoryDirectoryGrid from '@/components/categories/CategoryDirectoryGrid';

function CategoriesContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('id') || 'all';

  // State Management
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedCondition, setSelectedCondition] = useState<string[]>([]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [deliveryOnly, setDeliveryOnly] = useState(false);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'listings' | 'categories'>(
    initialCategory === 'all' ? 'listings' : 'listings'
  );

  // Toggle Condition
  const toggleCondition = (cond: string) => {
    setSelectedCondition((prev) =>
      prev.includes(cond) ? prev.filter((c) => c !== cond) : [...prev, cond]
    );
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSelectedLocation('all');
    setSelectedCondition([]);
    setVerifiedOnly(false);
    setDeliveryOnly(false);
    setMinPrice('');
    setMaxPrice('');
    setSortBy('featured');
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let list = [...CATALOG_PRODUCTS];

    // Category Filter
    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.categoryId === selectedCategory);
    }

    // Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          (p.subCategory && p.subCategory.toLowerCase().includes(q)) ||
          p.location.toLowerCase().includes(q)
      );
    }

    // Location Filter
    if (selectedLocation !== 'all') {
      list = list.filter((p) => p.city.toLowerCase().includes(selectedLocation.toLowerCase()));
    }

    // Condition Filter
    if (selectedCondition.length > 0) {
      list = list.filter((p) => selectedCondition.includes(p.condition));
    }

    // Verified Seller Only
    if (verifiedOnly) {
      list = list.filter((p) => p.seller.verified);
    }

    // Delivery Available Only
    if (deliveryOnly) {
      list = list.filter((p) => p.deliveryAvailable);
    }

    // Price Range Filter
    if (minPrice) {
      const min = Number(minPrice);
      if (!isNaN(min)) {
        list = list.filter((p) => p.numericPrice >= min);
      }
    }
    if (maxPrice) {
      const max = Number(maxPrice);
      if (!isNaN(max)) {
        list = list.filter((p) => p.numericPrice <= max);
      }
    }

    // Sorting
    if (sortBy === 'price_low') {
      list.sort((a, b) => a.numericPrice - b.numericPrice);
    } else if (sortBy === 'price_high') {
      list.sort((a, b) => b.numericPrice - a.numericPrice);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'popular') {
      list.sort((a, b) => b.viewsCount - a.viewsCount);
    }

    return list;
  }, [
    selectedCategory,
    searchQuery,
    selectedLocation,
    selectedCondition,
    verifiedOnly,
    deliveryOnly,
    minPrice,
    maxPrice,
    sortBy,
  ]);

  // Current category name
  const currentCat = CATALOG_CATEGORIES.find((c) => c.id === selectedCategory);

  return (
    <main className="w-full min-h-screen bg-gray-50/60 dark:bg-[#07130e] text-gray-900 dark:text-gray-100 pb-24 transition-colors">
      
      {/* 1. Hero Header Banner */}
      <section className="w-full bg-gradient-to-b from-emerald-950 via-emerald-900 to-teal-950 text-white pt-10 pb-12 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-emerald-200/80 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />
            <Link 
              href="/categories" 
              onClick={() => setSelectedCategory('all')} 
              className="hover:text-white transition-colors"
            >
              All Categories
            </Link>
            {currentCat && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-white font-bold">{currentCat.name}</span>
              </>
            )}
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md text-emerald-200 border border-white/20 text-xs font-bold px-3 py-1 rounded-full mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Verified Classifieds Marketplace
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                {currentCat ? currentCat.name : 'Explore All Categories & Products'}
              </h1>
              <p className="text-xs sm:text-sm text-emerald-100/80 mt-1.5 max-w-xl">
                {currentCat 
                  ? currentCat.description 
                  : 'Browse verified listings across electronics, vehicles, property, fashion & services in BD & Saudi Arabia.'}
              </p>
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md p-1.5 rounded-2xl border border-white/20 self-start md:self-auto">
              <button
                type="button"
                onClick={() => setViewMode('listings')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  viewMode === 'listings'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-white/80 hover:text-white hover:bg-white/5'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Product Listings</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('categories')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  viewMode === 'categories'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-white/80 hover:text-white hover:bg-white/5'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Category Hub</span>
              </button>
            </div>
          </div>

          {/* Quick Horizontal Category Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pt-6 pb-1 scrollbar-none">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                selectedCategory === 'all'
                  ? 'bg-white text-emerald-950 border-white font-bold shadow-md'
                  : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
              }`}
            >
              All Categories
            </button>
            {CATALOG_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.id);
                  if (viewMode === 'categories') setViewMode('listings');
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                  selectedCategory === cat.id
                    ? 'bg-white text-emerald-950 border-white font-bold shadow-md'
                    : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Main Content Area */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        
        {/* Search Bar & Results Counter */}
        <div className="bg-white dark:bg-surface-container-low rounded-2xl border border-gray-200/90 dark:border-outline-variant/30 shadow-sm p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          {/* Search Input */}
          <div className="flex-1 flex items-center bg-gray-50 dark:bg-surface-container rounded-xl px-4 py-2.5 border border-transparent focus-within:border-emerald-500/50 focus-within:bg-white dark:focus-within:bg-surface-container-high transition-all">
            <Search className="w-4 h-4 text-gray-400 mr-3 flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products by brand, model, title, or location..."
              className="w-full bg-transparent text-xs sm:text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Selector & Count */}
          <div className="flex items-center justify-between sm:justify-end gap-3 text-xs flex-shrink-0">
            <span className="text-gray-500 dark:text-gray-400">
              <strong className="text-gray-900 dark:text-white font-bold">{filteredProducts.length}</strong> items found
            </span>

            <div className="flex items-center gap-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-50 dark:bg-surface-container border border-gray-200 dark:border-outline-variant/40 text-gray-800 dark:text-gray-200 text-xs rounded-xl px-2.5 py-1.5 font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="rating">Highest Rated ★</option>
                <option value="popular">Most Viewed</option>
              </select>
            </div>
          </div>
        </div>

        {/* View Mode: Category Directory Grid */}
        {viewMode === 'categories' ? (
          <CategoryDirectoryGrid
            onSelectCategory={(catId) => {
              setSelectedCategory(catId);
              setViewMode('listings');
            }}
          />
        ) : (
          /* View Mode: Sidebar + Product Listings Grid */
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            {/* Left Filter Sidebar */}
            <CategoryFilterSidebar
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              selectedCondition={selectedCondition}
              toggleCondition={toggleCondition}
              verifiedOnly={verifiedOnly}
              setVerifiedOnly={setVerifiedOnly}
              deliveryOnly={deliveryOnly}
              setDeliveryOnly={setDeliveryOnly}
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              onReset={handleResetFilters}
              totalFiltered={filteredProducts.length}
            />

            {/* Right Product Grid */}
            <div className="flex-1 w-full space-y-6">
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                /* Empty Results State */
                <div className="bg-white dark:bg-surface-container-low rounded-3xl border border-gray-200 dark:border-outline-variant/30 p-12 text-center space-y-3">
                  <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-surface-container text-gray-400 flex items-center justify-center mx-auto">
                    <FilterX className="w-8 h-8" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">
                    No products found matching your filters
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                    Try broadening your search query, adjusting your price range, or reset all active filters.
                  </p>
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl transition-all shadow-sm"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 3. Marketplace Trust Highlights */}
        <div className="mt-12 bg-white dark:bg-surface-container-low rounded-3xl border border-gray-200/90 dark:border-outline-variant/30 p-6 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">100% Verified Sellers</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                  Every certified merchant and individual seller undergoes phone and national ID verification.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">Safe Escrow Delivery</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                  Inspect your goods upon doorstep delivery before payment is released to the seller.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">Zero Middleman Fees</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                  Direct peer-to-peer and merchant connections with instant messaging and live phone contact.
                </p>
              </div>
            </div>
          </div>
        </div>

      </section>
    </main>
  );
}

export default function CategoriesPage() {
  return (
    <Suspense fallback={
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#07130e]">
        <div className="w-8 h-8 rounded-full border-4 border-emerald-600 border-t-transparent animate-spin" />
      </div>
    }>
      <CategoriesContent />
    </Suspense>
  );
}
