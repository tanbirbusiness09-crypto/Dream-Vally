"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ShieldCheck,
  PlusCircle,
  PackageCheck,
  ShoppingBag,
  Store,
  ArrowLeft,
  Bell
} from 'lucide-react';

export default function SellerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // If we are on the registration page, don't show the seller sidebar
  if (pathname === '/seller/register') {
    return <>{children}</>;
  }

  const navItems = [
    { name: 'Dashboard', href: '/seller/dashboard', icon: LayoutDashboard },
    { name: 'Verification', href: '/seller/verification', icon: ShieldCheck },
    { name: 'Add Product', href: '/seller/add-product', icon: PlusCircle },
    { name: 'My Products', href: '/seller/products', icon: PackageCheck },
    { name: 'Orders', href: '/seller/orders', icon: ShoppingBag },
    { name: 'View Shop', href: '/shop/demo-shop-123', icon: Store },
  ];

  return (
    <div className="flex min-h-screen bg-surface">
      {/* Seller Sidebar */}
      <aside className="w-64 bg-surface-container-lowest border-r border-outline-variant flex flex-col shrink-0">
        <div className="p-6 border-b border-outline-variant">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#064e3b] flex items-center justify-center text-[#D4AF37] font-black text-sm shadow-sm">
              DV
            </div>
            <div>
              <h2 className="text-lg font-black text-foreground tracking-tight">Seller Central</h2>
              <p className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">Dreamvally Hub</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-sm transition-all ${
                  isActive 
                    ? 'bg-[#00895e] text-white shadow-sm' 
                    : 'text-on-surface hover:bg-surface-container hover:text-foreground'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-on-surface-variant'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-outline-variant">
          <Link href="/" className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors text-xs font-bold">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Main Marketplace</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden min-w-0">
        {/* Top Header */}
        <header className="h-16 bg-surface-container-lowest border-b border-outline-variant flex items-center justify-between px-6 sm:px-8 shrink-0">
          <h1 className="text-lg sm:text-xl font-extrabold text-foreground capitalize">
            {pathname.split('/').pop()?.replace('-', ' ')}
          </h1>
          <div className="flex items-center gap-3.5">
            <button className="relative p-2 text-on-surface-variant hover:bg-surface-container rounded-xl transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full animate-pulse"></span>
            </button>
            <div className="flex items-center gap-2.5 bg-surface-container px-3 py-1.5 rounded-full cursor-pointer border border-outline-variant hover:border-[#00895e]/50 transition-colors">
              <div className="w-7 h-7 bg-[#00895e] text-white rounded-full flex items-center justify-center font-black text-xs shadow-xs">
                DF
              </div>
              <div className="text-left hidden sm:block">
                <span className="text-xs font-bold block leading-none text-foreground">Dream Fashion</span>
                <span className="text-[10px] text-muted-foreground font-semibold">Verified Merchant</span>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-surface">
          {children}
        </div>
      </main>
    </div>
  );
}
