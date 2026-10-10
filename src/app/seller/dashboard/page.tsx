"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { Loader2 } from 'lucide-react';
import {
  TrendingUp,
  ShoppingBag,
  Package,
  Star,
  Plus,
  ArrowUpRight,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  Boxes,
  Store,
  Wallet
} from 'lucide-react';

const timeAgo = (iso: string) => {
  const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return days === 1 ? 'Yesterday' : `${days}d ago`;
};

export default function SellerDashboardPage() {
  const [dateRange, setDateRange] = useState<'today' | '7d' | '30d' | 'year'>('7d');
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const { data: session } = useSession();
  const shopSlug =
    (session?.user as { shopSlug?: string | null } | undefined)?.shopSlug || '';

  // Real stats from database
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [stats, setStats] = useState({
    totalListings: 0,
    activeListings: 0,
    draftListings: 0,
    lowStockCount: 0,
    totalStock: 0,
    totalViews: 0,
    ordersCount: 0,
    totalRevenue: 0,
    avgOrderValue: 0,
    availableBalance: 0,
    sellerRating: 5,
    totalReviews: 0,
    isKycVerified: false,
  });
  type RecentOrder = {
    id: string;
    product: string;
    customer: string;
    location: string;
    amount: number;
    status: string;
    createdAt: string;
  };
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [topProducts, setTopProducts] = useState<
    { name: string; stock: number; views: number; image: string }[]
  >([]);
  const [weeklyData, setWeeklyData] = useState<{ day: string; amount: string; height: string }[]>([]);

  useEffect(() => {
    fetch('/api/seller/stats')
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((json) => {
        setStats(json.stats);
        setRecentOrders(json.recentOrders || []);
        setTopProducts(json.topListings || []);
        setWeeklyData(
          (json.weeklyChart || []).map((c: { day: string; amount: string; height: string }) => ({
            day: c.day,
            amount: c.amount,
            height: c.height,
          }))
        );
      })
      .catch(() => setLoadError('Could not load dashboard stats from database'))
      .finally(() => setLoading(false));
  }, []);

  const formatMoney = (n: number) => `৳ ${Math.round(n).toLocaleString('en-IN')}`;

  const statusLabel = (s: string): string =>
    ({
      PENDING_PAYMENT: 'Pending',
      PAID_ESCROW: 'Processing',
      SHIPPED: 'Shipped',
      OUT_FOR_DELIVERY: 'Shipped',
      DELIVERED: 'Delivered',
      COMPLETED: 'Delivered',
      CANCELLED: 'Cancelled',
      DISPUTED: 'Disputed',
    }[s] || s);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-2">
        <Loader2 className="w-6 h-6 text-emerald-600 animate-spin" />
        <p className="text-xs text-muted-foreground font-medium">Loading dashboard from database...</p>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3">
        <AlertTriangle className="w-6 h-6 text-amber-500" />
        <p className="text-xs text-muted-foreground">{loadError}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="pb-12 max-w-7xl mx-auto space-y-5 animate-in fade-in duration-200">
      
      {/* 1. Sleek, Compact Minimalist Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-outline-variant/60">
        <div>
          <h1 className="text-xl font-bold text-foreground tracking-tight">Overview</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Store performance and fulfillment analytics
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
          {/* Compact Period Switcher */}
          <div className="inline-flex p-0.5 rounded-lg bg-surface-container border border-outline-variant text-xs font-semibold">
            {[
              { id: 'today', label: 'Today' },
              { id: '7d', label: '7D' },
              { id: '30d', label: '30D' },
              { id: 'year', label: '1Y' },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => setDateRange(p.id as 'today' | '7d' | '30d' | 'year')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  dateRange === p.id
                    ? 'bg-surface text-foreground shadow-xs font-bold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <Link
            href="/seller/add-product"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00895e] hover:bg-[#00744f] text-white text-xs font-bold transition-all shadow-xs flex-1 sm:flex-initial justify-center"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>Add Product</span>
          </Link>
        </div>
      </div>

      {/* 2. Compact KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        
        {/* Gross Revenue */}
        <div className="bg-surface-container-lowest border border-outline-variant/80 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground text-xs mb-1.5">
            <span>Gross Revenue</span>
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="text-xl font-bold text-foreground">{formatMoney(stats.totalRevenue)}</div>
          <div className="mt-2 flex items-center gap-1 text-[11px] text-emerald-600 font-semibold">
            <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
            <span>{stats.ordersCount} orders</span>
            <span className="text-muted-foreground font-normal">all time</span>
          </div>
        </div>

        {/* Active Orders */}
        <div className="bg-surface-container-lowest border border-outline-variant/80 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground text-xs mb-1.5">
            <span>Total Orders</span>
            <ShoppingBag className="w-3.5 h-3.5 text-blue-600" />
          </div>
          <div className="text-xl font-bold text-foreground">{stats.ordersCount}</div>
          <div className="mt-2 flex items-center gap-1.5 text-[11px] text-blue-600 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            <span>{stats.avgOrderValue > 0 ? `Avg ${formatMoney(stats.avgOrderValue)}` : 'No orders yet'}</span>
          </div>
        </div>

        {/* Total Listings */}
        <div className="bg-surface-container-lowest border border-outline-variant/80 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground text-xs mb-1.5">
            <span>Total Listings</span>
            <Package className="w-3.5 h-3.5 text-purple-600" />
          </div>
          <div className="text-xl font-bold text-foreground">{stats.totalListings}</div>
          <div className="mt-2 flex items-center gap-1.5 text-[11px] text-amber-600 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
            <span>{stats.lowStockCount} low stock items</span>
          </div>
        </div>

        {/* Store Rating */}
        <div className="bg-surface-container-lowest border border-outline-variant/80 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground text-xs mb-1.5">
            <span>Store Rating</span>
            <Star className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
          </div>
          <div className="text-xl font-bold text-foreground">{stats.sellerRating.toFixed(1)} <span className="text-xs font-normal text-muted-foreground">/ 5.0</span></div>
          <div className="mt-2 flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <span>{stats.totalReviews} customer reviews</span>
          </div>
        </div>

      </div>

      {/* 3. Performance Chart & Quick Shortcuts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Left: Compact Sales Velocity (2 Cols) */}
        <div className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant/80 rounded-xl p-4 sm:p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
              <div>
                <h3 className="font-bold text-sm text-foreground">Sales Velocity</h3>
                <p className="text-[11px] text-muted-foreground">Daily order volume · last 7 days (database)</p>
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground font-medium">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#00895e]"></span> Orders
                </span>
              </div>
            </div>

            {/* Compact Bar Chart */}
            <div className="h-40 w-full flex items-end justify-between gap-2.5 pt-4 pb-1 border-b border-outline-variant/50">
              {weeklyData.map((item, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                  <div className="text-[10px] font-mono text-muted-foreground group-hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.amount}
                  </div>
                  <div className="w-full max-w-[32px] bg-surface-container rounded-t-md overflow-hidden flex flex-col justify-end h-full">
                    <div
                      className="w-full bg-[#00895e] group-hover:bg-[#00744f] rounded-t-md transition-all duration-200"
                      style={{ height: item.height }}
                    />
                  </div>
                  <span className="text-[11px] font-medium text-muted-foreground">
                    {item.day}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="text-muted-foreground">
              Average Order Value: <strong className="text-foreground">{formatMoney(stats.avgOrderValue)}</strong>
            </span>
            <button
              onClick={() => setShowWithdrawModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface-container hover:bg-surface-container-high border border-outline-variant text-foreground font-semibold text-xs transition-colors"
            >
              <Wallet className="w-3.5 h-3.5 text-[#00895e]" />
              <span>Available: {formatMoney(stats.availableBalance)}</span>
            </button>
          </div>
        </div>

        {/* Right: Quick Shortcuts (1 Col) */}
        <div className="bg-surface-container-lowest border border-outline-variant/80 rounded-xl p-4 sm:p-5 shadow-xs flex flex-col justify-between space-y-3">
          <div>
            <h3 className="font-bold text-sm text-foreground mb-1">Quick Shortcuts</h3>
            <p className="text-[11px] text-muted-foreground mb-3">Direct portal navigation</p>

            <div className="space-y-1.5">
              {[
                { title: 'Add Product', desc: 'Create new catalog item', href: '/seller/add-product', icon: Plus },
                { title: 'Orders Pipeline', desc: 'Fulfill & generate slips', href: '/seller/orders', icon: ShoppingBag },
                { title: 'Inventory Control', desc: 'Barcodes & stock stepper', href: '/seller/products', icon: Boxes },
                { title: 'Preview Storefront', desc: 'Buyer view of shop', href: shopSlug ? `/shop/${shopSlug}` : '/shop', icon: Store, external: true },
              ].map((link, idx) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={idx}
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-surface-container transition-colors group border border-transparent hover:border-outline-variant/50"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-md bg-surface-container flex items-center justify-center text-muted-foreground group-hover:text-foreground">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-foreground leading-none">{link.title}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{link.desc}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="pt-2 border-t border-outline-variant/50 text-[11px] text-muted-foreground flex items-center justify-between">
            <span>Shop: {shopSlug ? `/${shopSlug}` : '—'}</span>
            <span className="font-medium text-emerald-600">
              {stats.isKycVerified ? 'Verified Merchant' : 'Active Seller'}
            </span>
          </div>
        </div>

      </div>

      {/* 4. Recent Orders & Top Items */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        
        {/* Recent Orders (2 Cols) */}
        <div className="xl:col-span-2 bg-surface-container-lowest border border-outline-variant/80 rounded-xl p-4 sm:p-5 shadow-xs overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-bold text-sm text-foreground">Recent Orders</h3>
              <p className="text-[11px] text-muted-foreground">Incoming buyer orders across BD &amp; SA</p>
            </div>
            <Link
              href="/seller/orders"
              className="text-xs font-semibold text-[#00895e] hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[550px]">
              <thead>
                <tr className="border-b border-outline-variant/60 text-muted-foreground text-[10px] uppercase font-bold">
                  <th className="pb-2">Order</th>
                  <th className="pb-2">Customer</th>
                  <th className="pb-2">Amount</th>
                  <th className="pb-2">Payment</th>
                  <th className="pb-2">Status</th>
                  <th className="pb-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/40 text-xs">
                {recentOrders.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-xs text-muted-foreground">
                      No orders yet — orders will appear here once buyers purchase.
                    </td>
                  </tr>
                )}
                {recentOrders.map((order, i) => (
                  <tr key={i} className="hover:bg-surface-container/30 transition-colors">
                    <td className="py-2.5">
                      <span className="font-mono font-bold text-foreground text-xs">{order.id}</span>
                      <p className="text-[10px] text-muted-foreground truncate max-w-[140px]">{order.product}</p>
                    </td>
                    <td className="py-2.5">
                      <p className="font-medium text-foreground">{order.customer}</p>
                      <p className="text-[10px] text-muted-foreground">{order.location}</p>
                    </td>
                    <td className="py-2.5 font-bold text-foreground">
                      {formatMoney(order.amount)}
                    </td>
                    <td className="py-2.5">
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-surface-container text-foreground border border-outline-variant">
                        {timeAgo(order.createdAt)}
                      </span>
                    </td>
                    <td className="py-2.5">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        statusLabel(order.status) === 'Pending' ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400' :
                        statusLabel(order.status) === 'Processing' ? 'bg-blue-500/10 text-blue-700 dark:text-blue-400' :
                        statusLabel(order.status) === 'Shipped' ? 'bg-purple-500/10 text-purple-700 dark:text-purple-400' :
                        statusLabel(order.status) === 'Cancelled' || statusLabel(order.status) === 'Disputed' ? 'bg-rose-500/10 text-rose-600' :
                        'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
                      }`}>
                        {statusLabel(order.status)}
                      </span>
                    </td>
                    <td className="py-2.5 text-right">
                      <Link
                        href="/seller/orders"
                        className="px-2 py-1 rounded border border-outline-variant hover:bg-surface-container text-[11px] font-medium text-foreground"
                      >
                        Slip
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Items (1 Col) */}
        <div className="bg-surface-container-lowest border border-outline-variant/80 rounded-xl p-4 sm:p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-bold text-sm text-foreground">Top Items</h3>
                <p className="text-[11px] text-muted-foreground">Volume leaders</p>
              </div>
              <Link href="/seller/products" className="text-xs font-semibold text-[#00895e]">
                Inventory
              </Link>
            </div>

            <div className="space-y-2.5">
              {topProducts.length === 0 && (
                <p className="text-xs text-muted-foreground py-4 text-center">No products yet</p>
              )}
              {topProducts.map((prod, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-surface-container/50 transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="relative w-8 h-8 rounded-md overflow-hidden bg-surface-container shrink-0 border border-outline-variant/50">
                      <Image src={prod.image} alt={prod.name} fill className="object-cover" sizes="32px" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-xs text-foreground truncate max-w-[120px]">{prod.name}</h4>
                      <p className="text-[10px] text-muted-foreground">{prod.views} views</p>
                    </div>
                  </div>

                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                    prod.stock === 0 ? 'bg-rose-500/10 text-rose-600' :
                    prod.stock <= 3 ? 'bg-amber-500/10 text-amber-600' :
                    'bg-emerald-500/10 text-emerald-600'
                  }`}>
                    {prod.stock === 0 ? 'Out' : `${prod.stock} left`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-outline-variant/50 mt-3 text-right">
            <Link href="/seller/products" className="text-xs font-semibold text-[#00895e] hover:underline">
              View all products →
            </Link>
          </div>
        </div>

      </div>

      {/* 5. Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl w-full max-w-sm overflow-hidden shadow-xl p-5 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-outline-variant">
              <h3 className="font-bold text-sm text-foreground">Available Payout</h3>
              <button
                onClick={() => setShowWithdrawModal(false)}
                className="text-muted-foreground hover:text-foreground text-xs"
              >
                ✕
              </button>
            </div>

            <div className="p-3 rounded-xl bg-surface-container text-center space-y-0.5">
              <p className="text-[11px] text-muted-foreground font-medium">Ready for Transfer</p>
              <h2 className="text-2xl font-bold text-foreground">{formatMoney(stats.availableBalance)}</h2>
              <p className="text-[10px] text-emerald-600 font-semibold">From {stats.ordersCount} completed orders</p>
            </div>

            <div className="p-2.5 rounded-lg border border-outline-variant text-xs flex items-center justify-between bg-surface">
              <div>
                <p className="font-bold text-foreground">bKash (01711-XXXXXX)</p>
                <p className="text-[10px] text-muted-foreground">Instant Transfer</p>
              </div>
              <CheckCircle2 className="w-4 h-4 text-[#00895e]" />
            </div>

            <div className="flex gap-2 pt-1">
              <button
                onClick={() => setShowWithdrawModal(false)}
                className="flex-1 py-2 rounded-lg border border-outline-variant text-xs font-semibold hover:bg-surface-container"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Payout request submitted!');
                  setShowWithdrawModal(false);
                }}
                className="flex-1 py-2 rounded-lg bg-[#00895e] text-white text-xs font-bold hover:bg-[#00744f]"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
