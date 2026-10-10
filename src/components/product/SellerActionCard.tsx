'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Phone, 
  MessageSquare, 
  ShieldCheck, 
  Star, 
  Truck, 
  DollarSign, 
  AlertCircle, 
  CheckCircle2, 
  Clock
} from 'lucide-react';
import { CatalogProduct } from '@/lib/catalogData';

interface SellerActionCardProps {
  product: CatalogProduct;
  onOpenOffer: () => void;
}

export default function SellerActionCard({ product, onOpenOffer }: SellerActionCardProps) {
  const [phoneRevealed, setPhoneRevealed] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [shippingAddress, setShippingAddress] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderError, setOrderError] = useState('');
  const [orderSuccess, setOrderSuccess] = useState('');

  const seller = product.seller;

  const handleOrderDelivery = async (e: React.FormEvent) => {
    e.preventDefault();
    setOrderError('');
    setOrderLoading(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          listingId: product.id,
          shippingAddress,
          contactPhone,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setOrderError(json.error || 'Failed to place order');
        setOrderLoading(false);
        return;
      }
      setOrderLoading(false);
      setShowOrderForm(false);
      setOrderSuccess(`Order ${json.order.orderNumber} created — pay to start escrow!`);
      setTimeout(() => setOrderSuccess(''), 5000);
    } catch {
      setOrderError('Network error — please try again');
      setOrderLoading(false);
    }
  };

  return (
    <div className="w-full space-y-5">
      {/* 1. Main Action & Contact Card */}
      <div className="bg-white dark:bg-surface-container-low rounded-3xl border border-gray-200/90 dark:border-outline-variant/30 p-5 sm:p-6 shadow-sm space-y-5">
        
        {/* Price & Savings Header */}
        <div>
          <span className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider">
            Total Price
          </span>
          <div className="flex items-baseline gap-2.5 mt-0.5 flex-wrap">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-700 dark:text-emerald-400">
              {product.price}
            </span>
            {product.regularPrice && (
              <span className="text-sm text-gray-400 line-through">
                {product.regularPrice}
              </span>
            )}
            {product.savings && (
              <span className="text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-2 py-0.5 rounded-full">
                {product.savings}
              </span>
            )}
          </div>
          {product.warranty && (
            <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{product.warranty}</span>
            </p>
          )}
        </div>

        {/* Primary Action Buttons */}
        <div className="space-y-2.5 pt-2 border-t border-gray-100 dark:border-outline-variant/30">
          {/* Call Button / Phone Reveal */}
          {phoneRevealed ? (
            <a
              href={`tel:${seller.phone.replace(/[^0-9+]/g, '')}`}
              className="w-full inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 active:scale-98 text-white font-extrabold text-sm py-3.5 px-4 rounded-2xl shadow-md transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>Call: {seller.phone}</span>
            </a>
          ) : (
            <button
              onClick={() => setPhoneRevealed(true)}
              type="button"
              className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-extrabold text-sm py-3.5 px-4 rounded-2xl shadow-md transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>Show Phone Number</span>
              <span className="text-[11px] bg-white/20 px-2 py-0.5 rounded-full font-semibold">
                Click to Reveal
              </span>
            </button>
          )}

          {/* Chat with Seller */}
          <Link
            href={`/chat?seller=${encodeURIComponent(seller.name)}&ad=${encodeURIComponent(product.title)}`}
            className="w-full inline-flex items-center justify-center gap-2 bg-gray-100 dark:bg-surface-container hover:bg-gray-200 dark:hover:bg-surface-container-high text-gray-800 dark:text-gray-200 font-bold text-sm py-3 px-4 rounded-2xl transition-all"
          >
            <MessageSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Chat with Seller</span>
          </Link>

          {/* Secondary Grid: Make an Offer & Buy with Delivery */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={onOpenOffer}
              type="button"
              className="inline-flex items-center justify-center gap-1.5 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 text-amber-900 dark:text-amber-200 border border-amber-200/80 dark:border-amber-800/60 font-bold text-xs py-2.5 px-3 rounded-xl transition-all"
            >
              <DollarSign className="w-3.5 h-3.5 text-amber-600" />
              <span>Make Offer</span>
            </button>

            <button
              onClick={() => {
                setOrderError('');
                setShowOrderForm((v) => !v);
              }}
              type="button"
              className="inline-flex items-center justify-center gap-1.5 bg-teal-50 dark:bg-teal-950/40 hover:bg-teal-100 text-teal-900 dark:text-teal-200 border border-teal-200/80 dark:border-teal-800/60 font-bold text-xs py-2.5 px-3 rounded-xl transition-all"
            >
              <Truck className="w-3.5 h-3.5 text-teal-600" />
              <span>Safe Delivery</span>
            </button>
          </div>

          {/* Escrow Order Form */}
          {showOrderForm && (
            <form onSubmit={handleOrderDelivery} className="pt-2 space-y-2">
              {orderError && (
                <div className="p-2.5 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 rounded-xl text-xs text-rose-700 dark:text-rose-300 font-semibold">
                  {orderError}
                </div>
              )}
              <input
                type="text"
                required
                placeholder="Delivery address (House, Road, Area, City)"
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                className="w-full bg-gray-50 dark:bg-surface-container border border-gray-200 dark:border-outline-variant/40 rounded-xl px-3 py-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <input
                type="tel"
                required
                placeholder="Contact phone (+880 1...)"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="w-full bg-gray-50 dark:bg-surface-container border border-gray-200 dark:border-outline-variant/40 rounded-xl px-3 py-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="submit"
                disabled={orderLoading}
                className="w-full bg-teal-600 hover:bg-teal-700 disabled:opacity-60 text-white font-bold text-xs py-2.5 rounded-xl transition-all active:scale-98 flex items-center justify-center gap-1.5"
              >
                <Truck className="w-3.5 h-3.5" />
                <span>{orderLoading ? 'Placing Order...' : 'Place Escrow Order'}</span>
              </button>
            </form>
          )}

          {/* Order status toast */}
          {orderSuccess && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>{orderSuccess}</span>
            </div>
          )}
          {!orderSuccess && orderError && !showOrderForm && (
            <div className="p-3 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 rounded-xl text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
              <span>{orderError}</span>
            </div>
          )}
        </div>

        {/* 2. Seller Profile Box */}
        <div className="pt-4 border-t border-gray-100 dark:border-outline-variant/30 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Seller Information
            </span>
            <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <Clock className="w-3 h-3" /> {seller.responseTime}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-gray-100 ring-2 ring-emerald-500/60 flex-shrink-0">
              <Image
                src={seller.avatar}
                alt={seller.name}
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h4 className="text-sm font-bold text-gray-900 dark:text-white truncate">
                  {seller.name}
                </h4>
                {seller.verified && (
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                )}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Member since {seller.memberSince} • {seller.totalAds} ads
              </p>
            </div>
          </div>

          {/* Seller Trust Metrics */}
          <div className="grid grid-cols-2 gap-2 pt-1 text-center">
            <div className="p-2 rounded-xl bg-gray-50 dark:bg-surface-container border border-gray-100 dark:border-outline-variant/20">
              <div className="flex items-center justify-center gap-1 text-xs font-bold text-amber-600">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{seller.rating} / 5.0</span>
              </div>
              <span className="text-[10px] text-gray-400">({seller.reviewsCount} reviews)</span>
            </div>

            <div className="p-2 rounded-xl bg-gray-50 dark:bg-surface-container border border-gray-100 dark:border-outline-variant/20">
              <span className="text-xs font-bold text-gray-900 dark:text-white block">100% ID</span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">Verified Merchant</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Safety & Buyer Protection Card */}
      <div className="bg-emerald-50/70 dark:bg-surface-container-low rounded-3xl border border-emerald-100 dark:border-outline-variant/30 p-5 space-y-2.5">
        <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-200 font-bold text-xs">
          <AlertCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>Dreamvally Safety Guarantee</span>
        </div>
        <ul className="text-[11px] text-gray-600 dark:text-gray-400 space-y-1.5 list-disc list-inside leading-relaxed">
          <li>Never transfer advance booking money to unverified personal accounts.</li>
          <li>For high-value items, meet the seller in safe, public locations or use Dreamvally Escrow.</li>
          <li>Thoroughly inspect the product condition and specifications before payment.</li>
        </ul>
      </div>
    </div>
  );
}
