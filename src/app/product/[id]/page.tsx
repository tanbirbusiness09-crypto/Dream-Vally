'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  ChevronRight, 
  MapPin, 
  Clock, 
  Eye, 
  ShieldCheck, 
  Star, 
  CheckCircle2, 
  Truck, 
  Sparkles, 
  ArrowLeft,
  Share2,
  Heart,
  Layers,
  HelpCircle
} from 'lucide-react';
import { 
  getProductById, 
  getRelatedProducts, 
  CatalogProduct 
} from '@/lib/catalogData';
import ProductGallery from '@/components/product/ProductGallery';
import SellerActionCard from '@/components/product/SellerActionCard';
import MakeOfferModal from '@/components/product/MakeOfferModal';
import ProductCard from '@/components/categories/ProductCard';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const resolvedParams = use(params);
  const productId = resolvedParams.id;
  const product = getProductById(productId);

  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);

  if (!product) {
    return (
      <main className="w-full min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-[#07130e] text-center">
        <div className="w-16 h-16 rounded-3xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
          <HelpCircle className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">Product Not Found</h1>
        <p className="text-sm text-gray-500 mt-1 max-w-sm">
          The item you are looking for may have been sold or removed by the seller.
        </p>
        <Link
          href="/categories"
          className="mt-6 inline-flex items-center gap-2 bg-emerald-600 text-white font-bold text-xs py-2.5 px-5 rounded-xl shadow-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse All Categories</span>
        </Link>
      </main>
    );
  }

  const relatedProducts = getRelatedProducts(product.categoryId, product.id);

  return (
    <main className="w-full min-h-screen bg-gray-50/60 dark:bg-[#07130e] text-gray-900 dark:text-gray-100 pb-24 transition-colors">
      
      {/* 1. Top Breadcrumbs Bar */}
      <section className="w-full bg-white dark:bg-surface-container-low border-b border-gray-200/80 dark:border-outline-variant/30 py-3.5 px-4 sticky top-16 z-30 shadow-xs">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs font-semibold text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none whitespace-nowrap">
            <Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-gray-400 flex-shrink-0" />
            <Link href="/categories" className="hover:text-emerald-600 transition-colors">Categories</Link>
            <ChevronRight className="w-3 h-3 text-gray-400 flex-shrink-0" />
            <Link 
              href={`/categories?id=${product.categoryId}`}
              className="hover:text-emerald-600 transition-colors"
            >
              {product.categoryName}
            </Link>
            <ChevronRight className="w-3 h-3 text-gray-400 flex-shrink-0" />
            <span className="text-gray-900 dark:text-white font-bold truncate max-w-[200px] sm:max-w-md">
              {product.title}
            </span>
          </div>

          <Link
            href="/categories"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors flex-shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Listings</span>
          </Link>
        </div>
      </section>

      {/* 2. Main Product Core Layout */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Gallery & Details (8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Multi-image Gallery Component */}
            <ProductGallery
              images={product.images}
              title={product.title}
              badge={product.badge}
              condition={product.condition}
              likesCount={product.likesCount}
            />

            {/* Product Title & Quick Meta */}
            <div className="bg-white dark:bg-surface-container-low rounded-3xl border border-gray-200/90 dark:border-outline-variant/30 p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 flex-wrap text-xs">
                <span className="font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-200/60 dark:border-emerald-800/50">
                  {product.categoryName}
                </span>
                {product.subCategory && (
                  <span className="font-semibold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-surface-container px-2.5 py-1 rounded-lg">
                    {product.subCategory}
                  </span>
                )}
                <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-lg">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Inspection
                </span>
              </div>

              <h1 className="text-xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-snug">
                {product.title}
              </h1>

              {/* Meta details: Location, Time, Views, Rating */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-100 dark:border-outline-variant/30">
                <span className="flex items-center gap-1.5 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  {product.location}, {product.country}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                  Posted {product.postedTime}
                </span>
                <span className="flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-gray-400" />
                  {product.viewsCount} Views
                </span>
                <span className="flex items-center gap-1 text-amber-800 dark:text-amber-300 font-bold bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-md border border-amber-200/60 dark:border-amber-800/40">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  {product.rating} ({product.reviewsCount} reviews)
                </span>
              </div>
            </div>

            {/* Structured Specifications Grid */}
            <div className="bg-white dark:bg-surface-container-low rounded-3xl border border-gray-200/90 dark:border-outline-variant/30 p-6 sm:p-8 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-outline-variant/30">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                  Technical Specifications
                </h3>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  100% Guaranteed Genuine
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {Object.entries(product.specs).map(([key, val]) => (
                  <div 
                    key={key}
                    className="p-3.5 rounded-2xl bg-gray-50/70 dark:bg-surface-container/60 border border-gray-100 dark:border-outline-variant/20 flex flex-col justify-between"
                  >
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      {key}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white mt-1">
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description & Key Highlights */}
            <div className="bg-white dark:bg-surface-container-low rounded-3xl border border-gray-200/90 dark:border-outline-variant/30 p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-3">
                  Product Overview & Description
                </h3>
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </div>

              {/* Key Features Bullet List */}
              {product.features && product.features.length > 0 && (
                <div className="pt-5 border-t border-gray-100 dark:border-outline-variant/30 space-y-3">
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                    Condition Highlights & Guarantees
                  </h4>
                  <ul className="space-y-2.5">
                    {product.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-700 dark:text-gray-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Seller Actions, Phone Reveal & Safety (4 Cols) */}
          <div className="lg:col-span-4 sticky top-28 space-y-6">
            <SellerActionCard
              product={product}
              onOpenOffer={() => setIsOfferModalOpen(true)}
            />
          </div>

        </div>

        {/* 3. Related Products Showcase */}
        {relatedProducts.length > 0 && (
          <div className="pt-10 border-t border-gray-200 dark:border-outline-variant/30 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white">
                  Similar & Recommended Listings
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Explore related items from the {product.categoryName} category
                </p>
              </div>

              <Link
                href={`/categories?id=${product.categoryId}`}
                className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                View All in {product.categoryName} →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
              {relatedProducts.map((relProduct) => (
                <ProductCard key={relProduct.id} product={relProduct} />
              ))}
            </div>
          </div>
        )}

      </section>

      {/* 4. Interactive Make An Offer Modal with MacBook animation */}
      <MakeOfferModal
        product={product}
        isOpen={isOfferModalOpen}
        onClose={() => setIsOfferModalOpen(false)}
      />

    </main>
  );
}
