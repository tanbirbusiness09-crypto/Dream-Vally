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
    { name: 'Products', href: '/seller/products', icon: PackageCheck },
    { name: 'Add Product', href: '/seller/add-product', icon: PlusCircle },
    { name: 'Orders', href: '/seller/orders', icon: ShoppingBag },
    { name: 'Verification', href: '/seller/verification', icon: ShieldCheck },
    { name: 'View Shop', href: '/shop/demo-shop-123', icon: Store },
  ];

  const currentSectionName = pathname.split('/').pop()?.replace('-', ' ') || 'Dashboard';

  return (
    <div className="flex min-h-screen bg-background">
      {/* Seller Sidebar */}
      <aside className="w-60 bg-card border-r border-border/70 flex flex-col shrink-0">
        <div className="h-14 px-5 border-b border-border/60 flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-emerald-900 text-amber-300 flex items-center justify-center font-black text-xs shadow-xs">
            DV
          </div>
          <div>
            <h2 className="text-sm font-bold text-foreground tracking-tight leading-none">Seller Central</h2>
            <p className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 mt-0.5">Dreamvally Store</p>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg font-medium text-xs transition-colors ${
                  isActive 
                    ? 'bg-emerald-600 text-white shadow-xs' 
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-muted-foreground'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-border/60">
          <Link
            href="/"
            className="flex items-center gap-2 px-2 py-1.5 text-muted-foreground hover:text-foreground transition-colors text-xs font-medium rounded-lg hover:bg-muted"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Marketplace</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden min-w-0">
        {/* Top Header */}
        <header className="h-14 bg-card border-b border-border/70 flex items-center justify-between px-5 sm:px-6 shrink-0">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <span>Seller Central</span>
            <span className="text-border">/</span>
            <span className="text-foreground font-semibold capitalize">{currentSectionName}</span>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-rose-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-2 bg-muted/50 px-2.5 py-1 rounded-full border border-border/60">
              <div className="w-5 h-5 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-[10px]">
                DF
              </div>
              <div className="text-left hidden sm:block">
                <span className="text-xs font-medium block leading-none text-foreground">Dream Fashion</span>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-background">
          {children}
        </div>
      </main>
    </div>
  );
}
