"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  TrendingUp,
  ShoppingBag,
  Package,
  Star,
  Plus,
  ExternalLink,
  ShieldAlert,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  AlertTriangle,
  CreditCard,
  Printer,
  ChevronRight,
  Boxes,
  Store,
  DollarSign,
  Download,
  Calendar,
  Wallet,
  ArrowRight
} from 'lucide-react';

export default function SellerDashboardPage() {
  const [dateRange, setDateRange] = useState<'today' | 'week' | 'month' | 'year'>('week');
  const [isVerified, setIsVerified] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  // Weekly Revenue Mock Data for Chart
  const weeklyData = [
    { day: 'Sat', amount: 38000, height: '55%' },
    { day: 'Sun', amount: 52000, height: '75%' },
    { day: 'Mon', amount: 44000, height: '62%' },
    { day: 'Tue', amount: 68000, height: '95%' },
    { day: 'Wed', amount: 49000, height: '70%' },
    { day: 'Thu', amount: 59000, height: '82%' },
    { day: 'Fri', amount: 71200, height: '100%' },
  ];

  const recentOrders = [
    {
      id: '#ORD-9821',
      product: 'Exclusive Silk Embroidered Panjabi',
      customer: 'Kamrul Hasan',
      location: 'Dhanmondi, Dhaka',
      amount: '৳ 3,700',
      paymentMethod: 'bKash',
      status: 'Pending',
      time: '12 mins ago',
      image: '/assets/products/prod_mens_panjabi.jpg',
    },
    {
      id: '#ORD-9820',
      product: 'iPhone 15 Pro Max (Titanium)',
      customer: 'Sultan Al-Otaibi',
      location: 'Riyadh, Saudi Arabia',
      amount: '﷼ 4,450',
      paymentMethod: 'Mada',
      status: 'Processing',
      time: '1 hour ago',
      image: '/assets/products/prod_iphone15.jpg',
    },
    {
      id: '#ORD-9819',
      product: 'Yamaha R15 V4 Carbon Parts',
      customer: 'Tanvir Ahmed',
      location: 'Chittagong Port',
      amount: '৳ 8,500',
      paymentMethod: 'Nagad',
      status: 'Shipped',
      time: 'Yesterday',
      image: '/assets/products/prod_yamaha_r15.jpg',
    },
    {
      id: '#ORD-9818',
      product: 'Premium Leather Executive Wallet',
      customer: 'Farhan Kabir',
      location: 'Uttara, Dhaka',
      amount: '৳ 1,450',
      paymentMethod: 'Visa',
      status: 'Delivered',
      time: '2 days ago',
      image: '/assets/categories/cat_electronics.jpg',
    },
  ];

  const topProducts = [
    {
      name: 'Exclusive Silk Embroidered Panjabi',
      sales: 42,
      revenue: '৳ 1,55,400',
      stock: 14,
      image: '/assets/products/prod_mens_panjabi.jpg',
      category: 'Clothing & Fashion',
    },
    {
      name: 'iPhone 15 Pro Max 256GB',
      sales: 28,
      revenue: '৳ 38,64,000',
      stock: 3,
      image: '/assets/products/prod_iphone15.jpg',
      category: 'Electronics',
    },
    {
      name: 'MacBook Air M2 16GB',
      sales: 19,
      revenue: '৳ 23,56,000',
      stock: 0,
      image: '/assets/products/prod_macbook_m2.jpg',
      category: 'Laptops',
    },
    {
      name: 'Toyota Corolla Cross Hybrid Filter',
      sales: 15,
      revenue: '৳ 72,500',
      stock: 32,
      image: '/assets/products/prod_toyota_corolla.jpg',
      category: 'Auto Parts',
    },
  ];

  return (
    <div className="pb-16 max-w-7xl mx-auto space-y-7 animate-in fade-in duration-300">
      
      {/* 1. Action Required: Verification Banner */}
      {!isVerified && (
        <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border-l-4 border-amber-500 p-5 rounded-2xl border border-amber-500/20 backdrop-blur-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-xs">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 bg-amber-500/15 text-amber-700 dark:text-amber-400 rounded-xl mt-0.5">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-foreground">Action Required: Complete Merchant KYC Verification</h3>
                <span className="text-[10px] bg-amber-500/20 text-amber-800 dark:text-amber-300 font-extrabold px-2 py-0.5 rounded-full uppercase">Step 2 of 3</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1 max-w-2xl leading-relaxed">
                Your shop is currently in review mode. Submit your National ID (NID) or Trade License to unlock instant customer checkouts, featured badge, and escrow payouts.
              </p>
            </div>
          </div>
          <Link
            href="/seller/verification"
            className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-md transition-all whitespace-nowrap active:scale-95"
          >
            Verify Identity Now
          </Link>
        </div>
      )}

      {/* 2. Welcome Header with Period Selector */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-[#064e3b]/15 via-emerald-900/10 to-transparent p-6 sm:p-7 rounded-3xl border border-emerald-900/20 dark:border-white/10 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">Dream Fashion Official Store</span>
            <span className="text-xs text-muted-foreground">• BD 🇧🇩 &amp; SA 🇸🇦 Merchant</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
            Seller Central Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
            Real-time analytics, order tracking, and store performance overview.
          </p>
        </div>

        {/* Date Filter & Actions */}
        <div className="flex items-center flex-wrap gap-2.5 w-full sm:w-auto">
          <div className="bg-surface-container rounded-xl p-1 border border-outline-variant flex text-xs font-bold">
            {(['today', 'week', 'month', 'year'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setDateRange(period)}
                className={`px-3 py-1.5 rounded-lg capitalize transition-all ${
                  dateRange === period
                    ? 'bg-[#00895e] text-white shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {period === 'today' ? 'Today' : period === 'week' ? '7 Days' : period === 'month' ? '30 Days' : 'This Year'}
              </button>
            ))}
          </div>

          <Link
            href="/seller/add-product"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#00895e] hover:bg-[#00744f] text-white font-bold text-xs shadow-md transition-all active:scale-95"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add Product</span>
          </Link>
        </div>
      </div>

      {/* 3. KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Gross Revenue */}
        <div className="bg-surface-container-lowest border border-outline-variant/80 rounded-2xl p-5 shadow-xs hover:border-[#00895e]/50 transition-all group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Gross Revenue</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-[#00895e] dark:text-emerald-400 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-foreground">৳ 3,45,200</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs">
            <span className="flex items-center gap-1 text-emerald-600 font-bold">
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[3]" /> +14.2%
            </span>
            <span className="text-muted-foreground font-medium">vs last {dateRange}</span>
          </div>
        </div>

        {/* Active Orders */}
        <div className="bg-surface-container-lowest border border-outline-variant/80 rounded-2xl p-5 shadow-xs hover:border-[#00895e]/50 transition-all group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Active Orders</span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-foreground">18</span>
            <span className="text-xs text-muted-foreground font-medium">orders</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs">
            <span className="flex items-center gap-1 text-blue-600 font-bold">
              <Clock className="w-3.5 h-3.5" /> 5 Pending
            </span>
            <span className="text-muted-foreground font-medium">ready to ship</span>
          </div>
        </div>

        {/* Total Products */}
        <div className="bg-surface-container-lowest border border-outline-variant/80 rounded-2xl p-5 shadow-xs hover:border-[#00895e]/50 transition-all group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Total Listings</span>
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-foreground">124</span>
            <span className="text-xs text-muted-foreground font-medium">items</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs">
            <span className="flex items-center gap-1 text-amber-600 font-bold">
              <AlertTriangle className="w-3.5 h-3.5" /> 3 Low Stock
            </span>
            <span className="text-muted-foreground font-medium">98.2% in stock</span>
          </div>
        </div>

        {/* Store Trust & Rating */}
        <div className="bg-surface-container-lowest border border-outline-variant/80 rounded-2xl p-5 shadow-xs hover:border-[#D4AF37]/50 transition-all group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Store Rating</span>
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 text-[#B8860B] dark:text-[#D4AF37] flex items-center justify-center">
              <Star className="w-5 h-5 fill-current" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-foreground">4.9</span>
            <span className="text-xs text-muted-foreground font-medium">/ 5.0</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs">
            <span className="text-emerald-700 dark:text-emerald-400 font-bold">148 Reviews</span>
            <span className="text-muted-foreground font-medium">99% Positive</span>
          </div>
        </div>

      </div>

      {/* 4. Chart & Quick Actions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Interactive Revenue Performance Chart (2 Cols) */}
        <div className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant/80 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-extrabold text-base text-foreground">Revenue &amp; Sales Velocity</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Daily volume over the past 7 days</p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5 font-bold text-foreground">
                  <span className="w-3 h-3 rounded-full bg-[#00895e]"></span> BD Market (72%)
                </span>
                <span className="flex items-center gap-1.5 font-bold text-muted-foreground">
                  <span className="w-3 h-3 rounded-full bg-[#D4AF37]"></span> SA Market (28%)
                </span>
              </div>
            </div>

            {/* Visual Bar Chart */}
            <div className="h-56 w-full flex items-end justify-between gap-3 pt-6 pb-2 px-2 border-b border-outline-variant/60">
              {weeklyData.map((item, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer h-full justify-end">
                  <div className="text-[10px] font-mono font-bold text-muted-foreground group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100 mb-1">
                    ৳ {(item.amount / 1000).toFixed(0)}k
                  </div>
                  <div className="w-full max-w-[42px] bg-surface-container rounded-t-xl overflow-hidden flex flex-col justify-end h-full">
                    <div
                      className="w-full bg-gradient-to-t from-[#00895e] to-emerald-400 rounded-t-xl group-hover:from-emerald-600 group-hover:to-[#D4AF37] transition-all duration-300"
                      style={{ height: item.height }}
                    />
                  </div>
                  <span className="text-xs font-bold text-muted-foreground group-hover:text-foreground">
                    {item.day}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-4">
              <div>
                <p className="text-muted-foreground font-medium">Avg. Daily Revenue</p>
                <p className="text-sm font-black text-foreground">৳ 49,314</p>
              </div>
              <div className="h-8 w-px bg-outline-variant"></div>
              <div>
                <p className="text-muted-foreground font-medium">Avg. Order Value</p>
                <p className="text-sm font-black text-foreground">৳ 2,450</p>
              </div>
            </div>

            <button
              onClick={() => setShowWithdrawModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-[#00895e] dark:text-emerald-400 font-bold transition-all"
            >
              <Wallet className="w-4 h-4" />
              <span>Available Payout: ৳ 48,500</span>
            </button>
          </div>
        </div>

        {/* Right: Quick Action Hub (1 Col) */}
        <div className="bg-surface-container-lowest border border-outline-variant/80 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <h3 className="font-extrabold text-base text-foreground mb-1">Quick Actions Hub</h3>
            <p className="text-xs text-muted-foreground mb-4">Fast shortcuts for daily merchant tasks</p>
            
            <div className="space-y-2.5">
              <Link
                href="/seller/add-product"
                className="flex items-center justify-between p-3 rounded-2xl bg-surface-container/60 hover:bg-surface-container border border-outline-variant/60 hover:border-[#00895e]/40 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#00895e]/15 text-[#00895e] flex items-center justify-center">
                    <Plus className="w-4 h-4 stroke-[3]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-foreground group-hover:text-[#00895e] transition-colors">List New Product</h4>
                    <p className="text-[11px] text-muted-foreground">Add to catalog with variants</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                href="/seller/orders"
                className="flex items-center justify-between p-3 rounded-2xl bg-surface-container/60 hover:bg-surface-container border border-outline-variant/60 hover:border-blue-500/40 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/15 text-blue-600 flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-foreground group-hover:text-blue-600 transition-colors">Process Orders</h4>
                    <p className="text-[11px] text-muted-foreground">Print slips &amp; mark shipped</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                href="/seller/products"
                className="flex items-center justify-between p-3 rounded-2xl bg-surface-container/60 hover:bg-surface-container border border-outline-variant/60 hover:border-purple-500/40 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/15 text-purple-600 flex items-center justify-center">
                    <Boxes className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-foreground group-hover:text-purple-600 transition-colors">Inventory Control</h4>
                    <p className="text-[11px] text-muted-foreground">Barcode labels &amp; quick stock</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                href="/shop/demo-shop-123"
                target="_blank"
                className="flex items-center justify-between p-3 rounded-2xl bg-surface-container/60 hover:bg-surface-container border border-outline-variant/60 hover:border-[#D4AF37]/40 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/15 text-[#B8860B] dark:text-[#D4AF37] flex items-center justify-center">
                    <Store className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-foreground group-hover:text-[#B8860B] transition-colors">Preview Live Store</h4>
                    <p className="text-[11px] text-muted-foreground">Customer storefront view</p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
              </Link>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-teal-950/30 border border-emerald-500/20 text-xs text-emerald-800 dark:text-emerald-300">
            <p className="font-bold flex items-center gap-1.5">
              <span>⚡ Pro Tip:</span>
            </p>
            <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
              Orders packed and shipped within 24 hours receive 30% higher buyer satisfaction and priority search ranking.
            </p>
          </div>
        </div>

      </div>

      {/* 5. Bottom Two Columns: Recent Orders & Top Selling Items */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Recent Orders (2 Cols) */}
        <div className="xl:col-span-2 bg-surface-container-lowest border border-outline-variant/80 rounded-3xl p-6 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-extrabold text-base text-foreground">Recent Customer Orders</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Real-time incoming orders across BD &amp; Saudi Arabia</p>
            </div>
            <Link
              href="/seller/orders"
              className="text-xs font-bold text-[#00895e] hover:text-[#00744f] flex items-center gap-1"
            >
              <span>View All Orders</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[650px]">
              <thead>
                <tr className="border-b border-outline-variant/60 text-muted-foreground text-[11px] uppercase tracking-wider font-bold">
                  <th className="pb-3">Order &amp; Item</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Total Amount</th>
                  <th className="pb-3">Payment</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/40 text-xs">
                {recentOrders.map((order, i) => (
                  <tr key={i} className="hover:bg-surface-container/30 transition-colors group">
                    <td className="py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-surface-container shrink-0">
                          <Image src={order.image} alt={order.product} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="font-mono font-bold text-foreground text-xs">{order.id}</p>
                          <p className="font-medium text-muted-foreground truncate max-w-[180px]">{order.product}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5">
                      <p className="font-bold text-foreground">{order.customer}</p>
                      <p className="text-[11px] text-muted-foreground truncate max-w-[140px]">{order.location}</p>
                    </td>
                    <td className="py-3.5 font-black text-foreground text-sm">
                      {order.amount}
                    </td>
                    <td className="py-3.5">
                      <span className="font-bold text-[11px] px-2 py-0.5 rounded-md bg-surface-container text-foreground border border-outline-variant">
                        {order.paymentMethod}
                      </span>
                    </td>
                    <td className="py-3.5">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black border ${
                        order.status === 'Pending' ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30' :
                        order.status === 'Processing' ? 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/30' :
                        order.status === 'Shipped' ? 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/30' :
                        'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-right">
                      <Link
                        href="/seller/orders"
                        className="px-2.5 py-1 rounded-lg border border-outline-variant hover:bg-surface-container text-[11px] font-bold text-foreground"
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Selling Products (1 Col) */}
        <div className="bg-surface-container-lowest border border-outline-variant/80 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-extrabold text-base text-foreground">Top Performing Items</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Highest revenue contributors</p>
              </div>
              <Link href="/seller/products" className="text-xs font-bold text-[#00895e]">
                View All
              </Link>
            </div>

            <div className="space-y-3.5">
              {topProducts.map((prod, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-2xl border border-outline-variant/60 hover:border-[#00895e]/40 transition-all bg-surface-container/20 group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-surface-container shrink-0 border border-outline-variant/50">
                      <Image src={prod.image} alt={prod.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-xs text-foreground truncate max-w-[140px] group-hover:text-[#00895e] transition-colors">{prod.name}</h4>
                      <p className="text-[11px] text-muted-foreground">{prod.sales} units sold • {prod.revenue}</p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      prod.stock === 0 ? 'bg-rose-500/10 text-rose-600 border-rose-500/20' :
                      prod.stock <= 3 ? 'bg-amber-500/10 text-amber-600 border-amber-500/20' :
                      'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                    }`}>
                      {prod.stock === 0 ? 'Out of Stock' : `${prod.stock} in stock`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-outline-variant/60 mt-4 flex items-center justify-between text-xs text-muted-foreground">
            <span>Showing top 4 products</span>
            <Link href="/seller/products" className="font-bold text-foreground hover:text-[#00895e] transition-colors">
              Manage Inventory →
            </Link>
          </div>
        </div>

      </div>

      {/* 6. Withdraw Payouts Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-3xl w-full max-w-md overflow-hidden shadow-2xl p-6 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant">
              <div className="flex items-center gap-2">
                <Wallet className="w-5 h-5 text-[#00895e]" />
                <h3 className="font-bold text-base text-foreground">Merchant Wallet &amp; Payouts</h3>
              </div>
              <button
                onClick={() => setShowWithdrawModal(false)}
                className="text-muted-foreground hover:text-foreground text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-1">
              <p className="text-xs text-muted-foreground font-semibold">Available for Immediate Payout</p>
              <h2 className="text-3xl font-black text-foreground">৳ 48,500</h2>
              <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-bold">Pending Escrow: ৳ 12,200 (releasing upon delivery)</p>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase text-muted-foreground">Select Destination Account</label>
              <div className="p-3 rounded-xl border border-outline-variant flex items-center justify-between cursor-pointer hover:border-[#00895e] bg-surface">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-pink-100 dark:bg-pink-950 text-pink-600 font-bold text-xs flex items-center justify-center">
                    bK
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground">bKash Merchant (01711-XXXXXX)</p>
                    <p className="text-[10px] text-muted-foreground">Instant Transfer (Fee: 0%)</p>
                  </div>
                </div>
                <CheckCircle2 className="w-4 h-4 text-[#00895e]" />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowWithdrawModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-outline-variant text-xs font-bold hover:bg-surface-container"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Payout request submitted successfully!');
                  setShowWithdrawModal(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#00895e] text-white text-xs font-bold hover:bg-[#00744f] shadow-md"
              >
                Request ৳ 48,500
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
