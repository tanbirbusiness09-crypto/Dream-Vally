"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SellerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // If we are on the registration page, don't show the seller sidebar
  if (pathname === '/seller/register') {
    return <>{children}</>;
  }

  const navItems = [
    { name: 'Dashboard', href: '/seller/dashboard', icon: '📊' },
    { name: 'Verification', href: '/seller/verification', icon: '🛡️' },
    { name: 'Add Product', href: '/seller/add-product', icon: '➕' },
    { name: 'My Products', href: '/seller/products', icon: '📦' },
    { name: 'Orders', href: '/seller/orders', icon: '🛒' },
    { name: 'View Shop', href: '/shop/demo-shop-123', icon: '🏪' },
  ];

  return (
    <div className="flex min-h-screen bg-surface">
      {/* Seller Sidebar */}
      <aside className="w-64 bg-surface-container-lowest border-r border-outline-variant flex flex-col">
        <div className="p-6 border-b border-outline-variant">
          <h2 className="text-xl font-bold text-primary">Seller Central</h2>
          <p className="text-xs text-on-surface-variant mt-1">Stitch Marketplace</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                  isActive 
                    ? 'bg-primary-container text-on-primary-container' 
                    : 'text-on-surface hover:bg-surface-container'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-outline-variant">
          <Link href="/" className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors text-sm font-medium">
            <span className="text-lg">⬅️</span> Back to Main Site
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-surface-container-lowest border-b border-outline-variant flex items-center justify-between px-8 shrink-0">
          <h1 className="text-xl font-semibold text-foreground capitalize">
            {pathname.split('/').pop()?.replace('-', ' ')}
          </h1>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors">
              🔔
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-2 bg-surface-container px-3 py-1.5 rounded-full cursor-pointer border border-outline-variant">
              <div className="w-7 h-7 bg-primary text-on-primary rounded-full flex items-center justify-center font-bold text-xs">
                JD
              </div>
              <span className="text-sm font-medium pr-1">Dream Fashion</span>
            </div>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <div className="flex-1 overflow-y-auto p-8 bg-surface">
          {children}
        </div>
      </main>
    </div>
  );
}
