"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {
  LayoutDashboard,
  ShieldCheck,
  PlusCircle,
  PackageCheck,
  ShoppingBag,
  Store,
  Settings,
  ArrowLeft,
  Bell,
  Menu,
  X
} from 'lucide-react';

export default function SellerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session } = useSession();

  const shopName =
    (session?.user as { shopName?: string | null } | undefined)?.shopName || 'My Shop';
  const shopSlug =
    (session?.user as { shopSlug?: string | null } | undefined)?.shopSlug || '';
  const initials = shopName
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'DV';

  // Close mobile drawer on route change (state adjustment during render)
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    if (mobileMenuOpen) setMobileMenuOpen(false);
  }

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
    { name: 'Settings', href: '/seller/settings', icon: Settings },
    ...(shopSlug ? [{ name: 'View Shop', href: `/shop/${shopSlug}`, icon: Store }] : []),
  ];

  const currentSectionName = pathname.split('/').pop()?.replace('-', ' ') || 'Dashboard';

  const sidebarContent = (
    <>
      <div className="h-14 px-5 border-b border-border/60 flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-emerald-900 text-amber-300 flex items-center justify-center font-black text-xs shadow-xs">
          {initials}
        </div>
        <div className="min-w-0">
          <h2 className="text-sm font-bold text-foreground tracking-tight leading-none truncate">{shopName}</h2>
          <p className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 mt-0.5">Seller Central</p>
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
    </>
  );

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-60 bg-card border-r border-border/70 flex-col shrink-0 h-full">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Sidebar */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
            onClick={() => setMobileMenuOpen(false)}
          />
          {/* Drawer */}
          <aside className="absolute inset-y-0 left-0 w-64 bg-card border-r border-border/70 flex flex-col shadow-xl animate-in slide-in-from-left duration-200">
            <div className="h-14 px-5 border-b border-border/60 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-900 text-amber-300 flex items-center justify-center font-black text-xs shadow-xs">
                  {initials}
                </div>
                <div className="min-w-0">
                  <h2 className="text-sm font-bold text-foreground tracking-tight leading-none truncate">{shopName}</h2>
                  <p className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 mt-0.5">Seller Central</p>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 -mr-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label="Close menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
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
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden min-w-0">
        {/* Top Header */}
        <header className="h-14 bg-card border-b border-border/70 flex items-center justify-between px-3 sm:px-5 md:px-6 shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-1.5 -ml-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shrink-0"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground truncate">
              <span className="hidden sm:inline">Seller Central</span>
              <span className="hidden sm:inline text-border">/</span>
              <span className="text-foreground font-semibold capitalize">{currentSectionName}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button className="relative p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-rose-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-2 bg-muted/50 px-2 py-1 sm:px-2.5 sm:py-1 rounded-full border border-border/60">
              <div className="w-5 h-5 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-[10px]">
                {initials}
              </div>
              <div className="text-left hidden sm:block">
                <span className="text-xs font-medium block leading-none text-foreground truncate max-w-[120px]">{shopName}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 bg-background">
          {children}
        </div>
      </main>
    </div>
  );
}
